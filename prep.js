// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0

// prep.js: the learning logic of Reading Test Prep, with no page and no clock.
// The page (app.js) calls it; the tests (test/) call it directly.
//
// A session is 8 questions that count: two passages (one story or poem, one
// nonfiction) with 3 questions each, and 2 vocabulary questions. Only the
// first try counts toward the student's record; a miss gets a correction and
// a second chance, which counts toward finishing the session well.

(function (global) {
  "use strict";

  /** The six question formats, in the order a new student meets them: the first two together, then one new format per session at most. */
  var FORMATS = ["single", "vocab", "sentence", "multi", "two-part", "order"];

  /** Names a person reads for each format. */
  var FORMAT_NAMES = {
    single: "Pick one answer",
    vocab: "What a word means",
    sentence: "Find the sentence",
    multi: "Pick two answers",
    "two-part": "Two-part question",
    order: "Put in order",
  };

  /**
   * The areas a reading test reports, and the skills under each. Skill ids are
   * shared with the reading app so both report in the same terms
   * (`reading.<area>.<skill>`). Areas are worded the way score reports group them.
   */
  var AREAS = [
    { id: "literary-key-ideas", name: "Stories and poems: key ideas", skills: ["theme", "character", "plot", "setting"] },
    { id: "literary-craft", name: "Stories and poems: craft and structure", skills: ["point-of-view", "structure", "figurative-language"] },
    { id: "informational-key-ideas", name: "Nonfiction: key ideas", skills: ["main-idea", "key-details", "sequence", "cause-effect"] },
    { id: "informational-craft", name: "Nonfiction: craft and structure", skills: ["author-purpose", "text-structure", "evidence"] },
    { id: "vocabulary", name: "Vocabulary", skills: ["context-clues", "word-parts", "multiple-meaning"] },
  ];

  /** Days until a missed skill comes back, after each miss: next session, then a week, then three weeks. */
  var RETURN_DAYS = [1, 7, 21];

  /** Reading speed used to tell a too-quick answer: faster than this is not reading. */
  var SKIM_WORDS_PER_MINUTE = 400;

  function words(text) {
    return String(text).split(/\s+/).filter(Boolean).length;
  }

  function addDays(day, n) {
    var p = day.split("-");
    var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2] + n));
    return d.toISOString().slice(0, 10);
  }

  /** The full skill id the record and the reports use. */
  function skillId(item) {
    return "reading." + item.area + "." + item.skill;
  }

  /** A new student's record. */
  function newRecord() {
    // v: record version; b: level band; f: formats taught; s: skills due back
    // (skill id -> [due day, misses]); p: passages seen; n: sessions finished;
    // m: formats missed last session; t: today's unfinished session.
    // h: skill id -> [days with a right first try since the last miss, last such day].
    // d: the last day a session was finished.
    return { v: 1, b: null, f: [], s: {}, p: [], n: 0, m: [], t: null, h: {}, d: null };
  }

  /** The record from `compass_state`, or a new one when it is missing or unreadable. */
  function readRecord(text) {
    if (!text) return newRecord();
    try {
      var r = JSON.parse(text);
      if (!r || r.v !== 1) return newRecord();
      var base = newRecord();
      for (var k in base) if (!(k in r)) r[k] = base[k];
      return r;
    } catch (e) {
      return newRecord();
    }
  }

  /**
   * The band a student starts in: from the reading level the reading app
   * reported, else from grade, else the middle band.
   */
  function startBand(bank, profile) {
    var bands = bank.bands;
    var lexile = null;
    var levels = (profile && profile.levels) || [];
    for (var i = 0; i < levels.length; i++) {
      if (levels[i].scale === "lexile" && levels[i].subject === "reading") lexile = levels[i].value;
    }
    if (lexile === null && profile && profile.grade) {
      var g = profile.grade === "K" ? 0 : Number(profile.grade);
      if (g >= 0) lexile = 300 + 120 * g; // a typical level for the grade
    }
    if (lexile === null) return bands[Math.floor(bands.length / 2)].id;
    for (var j = 0; j < bands.length; j++) {
      if (lexile < bands[j].to) return bands[j].id;
    }
    return bands[bands.length - 1].id;
  }

  /** Which formats this session may use, and the one it teaches, if any. */
  function formatsFor(record) {
    var taught = record.f.slice();
    // The first session teaches the two plain pick-one formats together.
    if (!taught.length) return { allowed: ["single", "vocab"], teach: ["single", "vocab"] };
    var next = null;
    for (var i = 0; i < FORMATS.length; i++) {
      if (taught.indexOf(FORMATS[i]) < 0) {
        next = FORMATS[i];
        break;
      }
    }
    // A format missed last session gets its worked example again.
    var again = record.m.filter(function (f) { return taught.indexOf(f) >= 0; });
    return { allowed: next ? taught.concat([next]) : taught, teach: next ? [next] : again.slice(0, 1) };
  }

  /** How much a skill is owed today: 2 when due back after a miss, 0 otherwise. */
  function owed(record, item, today) {
    var s = record.s[skillId(item)];
    return s && s[0] <= today ? 2 : 0;
  }

  function interestScore(passage, profile) {
    var ints = (profile && profile.interests) || [];
    for (var i = 0; i < ints.length; i++) {
      if ((passage.topics || []).indexOf(ints[i].topic) >= 0) return ints.length - i;
    }
    return 0;
  }

  /**
   * Choose `n` questions from a list: questions on skills that are due first,
   * then mixed formats, never two of the same format when another will do.
   */
  function pick(items, n, record, today, allowed, teach) {
    var ok = items.filter(function (q) { return allowed.indexOf(q.format) >= 0; });
    ok.sort(function (a, b) {
      var t = (teach.indexOf(b.format) >= 0) - (teach.indexOf(a.format) >= 0);
      return t || owed(record, b, today) - owed(record, a, today) || a.order - b.order;
    });
    var out = [];
    var formats = {};
    for (var pass = 0; pass < 2 && out.length < n; pass++) {
      for (var i = 0; i < ok.length && out.length < n; i++) {
        if (out.indexOf(ok[i]) >= 0) continue;
        if (pass === 0 && formats[ok[i].format]) continue;
        out.push(ok[i]);
        formats[ok[i].format] = true;
      }
    }
    // Keep the passage's own order, so questions follow the text.
    return out.sort(function (a, b) { return a.order - b.order; });
  }

  /**
   * Plan today's session: the passages, the questions and which worked
   * examples come first. Returns null when the bank has nothing left to give.
   */
  /** The band with passages nearest to `band` (the band itself when it has them), or null. */
  function nearestBand(bank, band) {
    var ids = bank.bands.map(function (b) { return b.id; });
    var at = Math.max(0, ids.indexOf(band));
    for (var d = 0; d < ids.length; d++) {
      var tries = d === 0 ? [at] : [at - d, at + d];
      for (var i = 0; i < tries.length; i++) {
        var id = ids[tries[i]];
        if (id && bank.passages.some(function (p) { return p.band === id; })) return id;
      }
    }
    return null;
  }

  /** Whether a saved session still matches the bank (a new bank can drop questions). */
  function sessionValid(bank, session) {
    if (!session || !session.steps || !session.steps.length) return false;
    return session.steps.every(function (s) {
      return findItem(bank, s.item) && (!s.passage || findPassage(bank, s.passage));
    });
  }

  function plan(record, bank, profile, today) {
    var band = nearestBand(bank, record.b || startBand(bank, profile));
    if (band === null) return null;
    var f = formatsFor(record);
    var steps = [];
    var used = [];
    ["literary", "informational"].forEach(function (type) {
      var choices = bank.passages.filter(function (p) {
        return p.type === type && p.band === band && record.p.indexOf(p.id) < 0;
      });
      if (!choices.length) {
        // Every passage at this band has been read: reuse the one read longest ago.
        choices = bank.passages.filter(function (p) { return p.type === type && p.band === band; });
        choices.sort(function (a, b) { return record.p.indexOf(a.id) - record.p.indexOf(b.id); });
        choices = choices.slice(0, 1);
      }
      choices.sort(function (a, b) {
        return interestScore(b, profile) - interestScore(a, profile) || (a.id < b.id ? -1 : 1);
      });
      var p = choices[0];
      if (!p) return;
      used.push(p.id);
      pick(p.items, 3, record, today, f.allowed, f.teach).forEach(function (q) {
        steps.push({ passage: p.id, item: q.id });
      });
    });
    var vocab = bank.vocab.filter(function (q) { return q.band === band; });
    pick(vocab, 2, record, today, f.allowed, f.teach).forEach(function (q) {
      steps.push({ passage: null, item: q.id });
    });
    if (!steps.length) return null;
    var formatsUsed = steps.map(function (s) { return findItem(bank, s.item).format; });
    return {
      day: today,
      band: band,
      passages: used,
      steps: steps,
      teach: f.teach.filter(function (x) { return formatsUsed.indexOf(x) >= 0; }),
      at: 0,
      results: [],
    };
  }

  function findItem(bank, id) {
    for (var i = 0; i < bank.passages.length; i++) {
      var p = bank.passages[i];
      for (var j = 0; j < p.items.length; j++) if (p.items[j].id === id) return p.items[j];
    }
    for (var k = 0; k < bank.vocab.length; k++) if (bank.vocab[k].id === id) return bank.vocab[k];
    return null;
  }

  /** A passage's sentences in order; a sentence's index is its id in questions. */
  function sentences(passage) {
    var out = [];
    for (var i = 0; i < passage.paragraphs.length; i++) out = out.concat(passage.paragraphs[i]);
    return out;
  }

  function findPassage(bank, id) {
    for (var i = 0; i < bank.passages.length; i++) if (bank.passages[i].id === id) return bank.passages[i];
    return null;
  }

  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    var x = a.slice().sort();
    var y = b.slice().sort();
    for (var i = 0; i < x.length; i++) if (x[i] !== y[i]) return false;
    return true;
  }

  /**
   * Check an answer. `answer` is an option index (single, vocab), a list of
   * option indexes (multi), a sentence index (sentence), [partA, partB]
   * (two-part), or a list of step indexes in the order given (order).
   * Returns { correct, why }: why is the one plain line for a miss.
   */
  function check(item, answer) {
    var right;
    var why = item.why || "";
    if (item.format === "single" || item.format === "vocab") {
      right = answer === item.key;
      if (!right && item.options[answer]) why = item.options[answer].why || why;
    } else if (item.format === "multi") {
      right = sameSet(answer, item.keys);
      if (!right) {
        for (var i = 0; i < answer.length; i++) {
          if (item.keys.indexOf(answer[i]) < 0 && item.options[answer[i]].why) {
            why = item.options[answer[i]].why;
            break;
          }
        }
      }
    } else if (item.format === "sentence") {
      right = item.keys.indexOf(answer) >= 0;
    } else if (item.format === "two-part") {
      var a = answer[0] === item.a.key;
      var b = answer[1] === item.b.key;
      right = a && b;
      if (!a && item.a.options[answer[0]]) why = item.a.options[answer[0]].why || why;
      else if (!b && item.b.options[answer[1]]) why = item.b.options[answer[1]].why || why;
    } else if (item.format === "order") {
      right = answer.every(function (s, i) { return s === i; }) && answer.length === item.steps.length;
    }
    return { correct: right, why: why };
  }

  /**
   * The fewest seconds a careful answer takes. The first question on a
   * passage includes reading it; every question includes reading itself.
   */
  function minSeconds(item, passage, first) {
    var text = item.prompt || (item.a && item.a.prompt) || "";
    var n = words(text);
    var opts = item.options || (item.a && item.a.options) || [];
    for (var i = 0; i < opts.length; i++) n += words(opts[i].text);
    if (first && passage) n += words(sentences(passage).join(" "));
    if (!passage && item.context) n += words(item.context);
    return Math.max(3, Math.round((n / SKIM_WORDS_PER_MINUTE) * 60));
  }

  /**
   * Record one finished question in the student's record. `first` is whether
   * the first try was right; `rapid` whether it came faster than reading allows.
   */
  function recordAnswer(record, item, first, today) {
    var id = skillId(item);
    var s = record.s[id];
    var h = record.h[id] || [0, ""];
    if (first) {
      if (h[1] !== today) record.h[id] = [h[0] + 1, today];
      // Right on the day it was due: the skill moves to its next gap, or is clear.
      if (s && s[0] <= today) {
        var nextGap = RETURN_DAYS[Math.min(s[1], RETURN_DAYS.length - 1)];
        if (s[1] >= RETURN_DAYS.length) delete record.s[id];
        else record.s[id] = [addDays(today, nextGap), s[1] + 1];
      }
    } else {
      record.s[id] = [addDays(today, RETURN_DAYS[0]), 1];
      record.h[id] = [0, today];
    }
  }

  /**
   * Finish today's session: mark passages seen, formats taught, move the
   * band toward about 80 to 85 percent right on the first try.
   */
  function finishSession(record, bank, session) {
    var firsts = session.results.filter(function (r) { return r.first; }).length;
    var total = session.results.length || 1;
    var pct = (100 * firsts) / total;
    session.passages.forEach(function (id) {
      record.p = record.p.filter(function (x) { return x !== id; });
      record.p.push(id);
    });
    // Enough to avoid repeats for a year at four sessions a week, and short
    // enough that the record stays well inside the launch address limit.
    if (record.p.length > 120) record.p = record.p.slice(-120);
    var formats = session.steps.map(function (s) { return findItem(bank, s.item).format; });
    formats.forEach(function (f) { if (record.f.indexOf(f) < 0) record.f.push(f); });
    record.m = [];
    session.results.forEach(function (r, i) {
      var f = formats[i];
      if (!r.first && record.m.indexOf(f) < 0) record.m.push(f);
    });
    var ids = bank.bands.map(function (b) { return b.id; });
    var at = ids.indexOf(session.band);
    // Move only to a band that has passages, so a student is never left with nothing.
    var hasPassages = function (i) { return bank.passages.some(function (p) { return p.band === ids[i]; }); };
    if (pct >= 95 && at < ids.length - 1 && hasPassages(at + 1)) at += 1;
    else if (pct < 60 && at > 0 && hasPassages(at - 1)) at -= 1;
    record.b = ids[at];
    record.d = session.day;
    record.n += 1;
    record.t = null;
    return { firstTry: firsts, total: session.results.length, percent: Math.round(pct) };
  }

  /**
   * The mastery chart for guides: one square per skill, grouped by area.
   * A skill is "mastered" only after first-try right answers on three
   * different days with no miss since; one session never proves it.
   */
  function mastery(record) {
    return {
      title: "Reading test practice",
      subject: "reading",
      groups: AREAS.map(function (a) {
        return {
          name: a.name,
          items: a.skills.map(function (s) {
            var id = "reading." + a.id + "." + s;
            var h = record.h[id];
            var stage = "unseen";
            if (h) {
              if (record.s[id] || h[0] === 0) stage = "learning";
              else if (h[0] >= 3) stage = "mastered";
              else stage = "fluent";
            }
            return { label: s.replace(/-/g, " "), stage: stage };
          }),
        };
      }),
    };
  }

  var api = {
    FORMATS: FORMATS,
    FORMAT_NAMES: FORMAT_NAMES,
    AREAS: AREAS,
    newRecord: newRecord,
    readRecord: readRecord,
    startBand: startBand,
    plan: plan,
    findItem: findItem,
    findPassage: findPassage,
    sentences: sentences,
    nearestBand: nearestBand,
    sessionValid: sessionValid,
    check: check,
    minSeconds: minSeconds,
    recordAnswer: recordAnswer,
    finishSession: finishSession,
    mastery: mastery,
    skillId: skillId,
    addDays: addDays,
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else global.Prep = api;
})(this);
