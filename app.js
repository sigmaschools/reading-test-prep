// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0

// The page: shows today's session one question at a time and tells Compass
// what was done. The learning rules live in prep.js.

(function () {
  "use strict";

  var VERSION = "0.2.1";
  var compass = CompassApp.launch({ appVersion: VERSION });
  var bank = READING_BANK;
  var today = compass.today;
  var profile = compass.profile;
  var record = Prep.readRecord(compass.state);
  var $ = function (id) { return document.getElementById(id); };
  var LETTERS = "ABCDEFGH";
  // The Test Learner gets a level switch and no once-a-day limit (prep.js says why).
  var picker = Prep.canPickLevel(profile);

  // Continue on the end screen: only inside Compass, which acts on it. The
  // click itself does nothing but say what is coming, so it is harmless on a
  // shell too old to act on it (that shell moves on by itself).
  var inCompass = new URLSearchParams(location.search).has("compass_contract");
  $("continue").classList.toggle("hidden", !inCompass);
  $("continue").addEventListener("click", function () {
    $("continue").disabled = true;
    $("continue").textContent = "Opening the next step…";
  });

  function show(id) {
    var all = document.querySelectorAll("body > section");
    for (var i = 0; i < all.length; i++) all[i].classList.toggle("hidden", all[i].id !== id);
    $("levels").classList.toggle("hidden", !picker || id === "finished" || !session);
    window.scrollTo(0, 0);
  }

  function el(tag, attrs) {
    var e = document.createElement(tag);
    for (var k in attrs || {}) {
      if (k === "text") e.textContent = attrs[k];
      else if (k === "cls") e.className = attrs[k];
      else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), attrs[k]);
      else e.setAttribute(k, attrs[k]);
    }
    for (var i = 2; i < arguments.length; i++) if (arguments[i] != null) e.append(arguments[i]);
    return e;
  }

  // ---------- today's session ----------

  // A later major version of the contract: show the end screen, report nothing.
  var contract = new URLSearchParams(location.search).get("compass_contract");
  if (contract && contract !== CompassApp.contract) {
    show("finished");
    return;
  }

  // Already done today: the end screen again, so Compass moves on.
  if (record.d === today && !picker) {
    $("finished-note").textContent = "Your next practice is on another day.";
    show("finished");
    return;
  }

  var saved = record.t && record.t.day === today && Prep.sessionValid(bank, record.t) ? record.t : null;
  var session = saved || Prep.plan(record, bank, profile, today);
  var visitStart = Date.now();

  // Nothing in the bank for this student: end at once rather than leave them stuck.
  if (!session) {
    show("finished");
    return;
  }
  session.secs = session.secs || 0;
  session.seen = session.seen || []; // parts whose opening card was shown
  var parts = Prep.parts(session);

  function save() {
    var now = Date.now();
    session.secs += (now - visitStart) / 1000;
    visitStart = now;
    record.t = session;
    compass.saveState(JSON.stringify(record));
    writeMastery(Prep.mastery(record));
  }

  // ---------- intro ----------

  function intro() {
    var total = session.steps.length;
    var first = record.n === 0 && session.at === 0;
    $("intro-title").textContent = first ? "Reading Test Practice" : session.at ? "Pick up where you left off" : "Test prep";
    // The first screen's title already names the app, so the small label above it goes.
    $("intro").querySelector(".eyebrow").classList.toggle("hidden", first);
    var box = $("intro-text");
    box.textContent = "";
    if (first) {
      [
        total + " questions. There's no timer.",
      ].forEach(function (t) { box.append(el("p", { text: t })); });
    } else {
      var left = total - session.at;
      box.append(el("p", { text: (left === total ? total + " questions." : left + (left === 1 ? " question left." : " questions left.")) + " Take your time, and go back to the text." }));
    }
    show("intro");
  }
  $("start").addEventListener("click", function () { nextStep(); });

  // ---------- parts and progress ----------

  function partAt(at) {
    for (var i = 0; i < parts.length; i++) if (at >= parts[i].from && at <= parts[i].to) return parts[i];
    return parts[parts.length - 1];
  }

  var KIND = { story: "Story", fable: "Fable", poem: "Poem", biography: "Article", history: "Article" };

  // Before each part, a short card naming what comes next; it moves on by itself.
  var PART_MS = 3000;

  function partCard(part, then) {
    var box = $("part-body");
    box.textContent = "";
    box.append(progressBar(session.at));
    if (part.passage) {
      var p = Prep.findPassage(bank, part.passage);
      var kind = KIND[p.genre] || "Article";
      box.append(el("h1", { text: (part.n === 1 ? "" : "New ") + (part.n === 1 ? kind : kind.toLowerCase()) }));
      box.append(el("p", { cls: "lead", text: p.title }));
    } else {
      box.append(el("h1", { text: "Word questions" }));
    }
    show("part");
    session.seen.push(part.n);
    save();
    setTimeout(then, PART_MS);
  }

  // One mark per question, grouped by part: done, this one, still to come.
  function progressBar(at) {
    var bar = el("div", { cls: "bar", role: "img", "aria-label": "Question " + (at + 1) + " of " + session.steps.length });
    parts.forEach(function (part) {
      var g = el("div", { cls: "bar-group" });
      for (var i = part.from; i <= part.to; i++) g.append(el("span", { cls: "bar-step" + (i < at ? " done" : i === at ? " now" : "") }));
      bar.append(g);
    });
    return bar;
  }

  // ---------- one question ----------

  var q = null; // the question on screen and what has happened to it

  function nextStep() {
    if (session.at >= session.steps.length) return finish();
    var step = session.steps[session.at];
    var part = partAt(session.at);
    if (part.from === session.at && session.seen.indexOf(part.n) < 0) return partCard(part, nextStep);
    var item = Prep.findItem(bank, step.item);
    ask(step, item);
  }

  function ask(step, item) {
    var passage = step.passage ? Prep.findPassage(bank, step.passage) : null;
    var prev = session.at > 0 ? session.steps[session.at - 1] : null;
    q = {
      step: step,
      item: item,
      passage: passage,
      phase: "answer", // answer, evidence, retry, done
      tries: 0,
      first: null,
      rapid: false,
      firstAnswer: null,
      shownAt: Date.now(),
      min: Prep.minSeconds(item, passage, !prev || prev.passage !== step.passage) * 1000,
      choice: initialChoice(item),
      struck: [],
    };
    // A first try already made on an earlier visit today still counts as the first try.
    var p = session.pending;
    if (p && p.at === session.at) {
      q.tries = 1;
      q.first = p.first;
      q.firstAnswer = p.firstAnswer;
      q.ms = p.ms;
      q.rapid = p.rapid;
      q.phase = "retry";
      strikeWrong();
    }
    drawPassage();
    drawAsk();
    $("feedback").textContent = "";
    if (q.tries === 1) feedback("do", "You tried this one before. Answer it again.");
    var prog = $("progress");
    prog.textContent = "";
    prog.append(progressBar(session.at));
    var part = partAt(session.at);
    var where = part.passage ? "Passage " + part.n + ": " + passage.title : "Word questions";
    prog.append(el("p", { cls: "progress-text", text: "Question " + (session.at + 1) + " of " + session.steps.length + " · " + where }));
    $("question").classList.toggle("solo", !passage);
    $("check").classList.remove("hidden");
    updateCheck();
    show("question");
    $("side").scrollTop = 0;
    $("passage").scrollTop = 0;
  }

  function initialChoice(item) {
    if (item.format === "multi") return [];
    if (item.format === "two-part") return [null, null];
    if (item.format === "order") {
      // A fixed shuffle, never already in order, the same for every student.
      var n = item.steps.length;
      var out = [];
      for (var i = 0; i < n; i++) out.push((i * 3 + 1) % n);
      if (new Set(out).size !== n) out = item.steps.map(function (_, i) { return n - 1 - i; });
      return out;
    }
    return null;
  }

  function drawPassage() {
    var box = $("passage");
    box.textContent = "";
    box.className = "passage text";
    var p = q.passage;
    if (!p) return; // a word question: one column, nothing on the left
    box.append(el("h2", { text: p.title }));
    // A poem's strings are its lines, one under the other; a stanza is a paragraph.
    box.classList.toggle("poem", p.genre === "poem");
    var idx = 0;
    p.paragraphs.forEach(function (para) {
      var pe = el("p");
      para.forEach(function (s, j) {
        var i = idx++;
        var span = el("span", { cls: "s", "data-i": String(i), text: s });
        span.addEventListener("click", function () { tapSentence(i); });
        pe.append(span);
        if (j < para.length - 1) pe.append(" ");
      });
      box.append(pe);
    });
    var tapping = q.item.format === "sentence" && q.phase !== "done";
    box.classList.toggle("tapping", tapping || q.phase === "evidence");
  }

  function sentenceEl(i) {
    return $("passage").querySelector('.s[data-i="' + i + '"]');
  }

  function optionList(opts, selected, onPick, multi, partKey) {
    var ul = el("ul", { cls: "opts" });
    opts.forEach(function (o, i) {
      var b = el(
        "button",
        { type: "button", cls: "opt" + (multi ? " multi" : ""), "aria-pressed": "false" },
        el("span", { cls: "l", text: LETTERS[i] }),
        el("span", { text: o.text })
      );
      var isSel = multi ? selected.indexOf(i) >= 0 : selected === i;
      if (isSel) { b.classList.add("sel"); b.setAttribute("aria-pressed", "true"); }
      var struckKey = (partKey || "") + i;
      if (q.struck.indexOf(struckKey) >= 0) { b.classList.add("struck"); b.disabled = true; }
      if (q.phase === "done" && q.reveal) {
        var right = partKey === "a" ? q.item.a.key : partKey === "b" ? q.item.b.key : q.item.key;
        if (multi ? q.item.keys.indexOf(i) >= 0 : right === i) b.classList.add("is-right");
        b.disabled = true;
      } else if (q.phase === "done" || q.phase === "evidence") {
        b.disabled = true;
      }
      b.addEventListener("click", function () { onPick(i); });
      ul.append(el("li", null, b));
    });
    return ul;
  }

  function drawAsk() {
    var box = $("ask");
    box.textContent = "";
    var it = q.item;
    if (it.format === "vocab") {
      var ctx = el("div", { cls: "context" });
      var parts = it.context.split(it.word);
      parts.forEach(function (part, i) {
        ctx.append(part);
        if (i < parts.length - 1) ctx.append(el("b", { text: it.word }));
      });
      box.append(ctx);
    }
    if (it.format === "two-part") {
      ["a", "b"].forEach(function (k, n) {
        var part = it[k];
        box.append(el("div", { cls: "part" },
          el("p", { cls: "prompt", text: part.prompt }),
          optionList(part.options, q.choice[n], function (i) { q.choice[n] = i; redraw(); }, false, k)));
      });
      return;
    }
    box.append(el("p", { cls: "prompt", text: it.prompt }));
    if (it.format === "single" || it.format === "vocab") {
      box.append(optionList(it.options, q.choice, function (i) { q.choice = i; redraw(); }));
    } else if (it.format === "multi") {
      box.append(el("p", { cls: "hint", text: "Pick " + it.keys.length + "." }));
      box.append(optionList(it.options, q.choice, function (i) {
        var at = q.choice.indexOf(i);
        if (at >= 0) q.choice.splice(at, 1);
        else q.choice.push(i);
        redraw();
      }, true));
    } else if (it.format === "sentence") {
      var picked = q.choice === null ? "Tap a sentence in the passage." : "You picked: “" + Prep.sentences(q.passage)[q.choice] + "”";
      box.append(el("p", { cls: "hint", text: picked }));
    } else if (it.format === "order") {
      box.append(el("p", { cls: "hint", text: "Use the arrows to move each one. First at the top." }));
      var ol = el("ol", { cls: "order" });
      q.choice.forEach(function (s, pos) {
        var li = el("li", null, el("span", { cls: "n", text: String(pos + 1) }), el("span", { cls: "t", text: it.steps[s] }));
        if (q.phase === "done" && q.reveal) li.classList.add("is-right");
        if (q.phase !== "done") {
          li.append(el("button", { type: "button", "aria-label": "Move up", text: "↑", onclick: function () { move(pos, -1); } }));
          li.append(el("button", { type: "button", "aria-label": "Move down", text: "↓", onclick: function () { move(pos, 1); } }));
        }
        ol.append(li);
      });
      box.append(ol);
    }
  }

  function move(pos, d) {
    var to = pos + d;
    if (to < 0 || to >= q.choice.length) return;
    var t = q.choice[pos];
    q.choice[pos] = q.choice[to];
    q.choice[to] = t;
    redraw();
  }

  function redraw() {
    drawAsk();
    if (q.item.format === "sentence") markSentences();
    updateCheck();
  }

  function markSentences() {
    var all = $("passage").querySelectorAll(".s");
    for (var i = 0; i < all.length; i++) all[i].classList.toggle("picked", q.item.format === "sentence" && Number(all[i].dataset.i) === q.choice);
  }

  function ready() {
    var c = q.choice;
    var f = q.item.format;
    if (f === "multi") return c.length === q.item.keys.length;
    if (f === "two-part") return c[0] !== null && c[1] !== null;
    if (f === "order") return true;
    return c !== null;
  }

  function updateCheck() {
    $("check").disabled = !(q.phase === "answer" || q.phase === "retry") || !ready();
  }

  function feedback(cls, html) {
    var box = $("feedback");
    box.textContent = "";
    if (html) box.append(el("div", { cls: "fb " + cls }, html));
  }

  function tapSentence(i) {
    if (q.phase === "evidence") {
      var good = q.item.evidence.indexOf(i) >= 0;
      if (good) {
        sentenceEl(i).classList.add("good");
        q.phase = "retry";
        $("passage").classList.remove("tapping");
        feedback("do", "Yes, that's the one. Now answer again.");
        redraw();
      } else {
        feedback("do", "Not that one. Look for the sentence that proves the right answer.");
      }
      return;
    }
    if (q.item.format === "sentence" && (q.phase === "answer" || q.phase === "retry")) {
      q.choice = i;
      redraw();
    }
  }

  function answerValue() {
    return Array.isArray(q.choice) ? q.choice.slice() : q.choice;
  }

  $("check").addEventListener("click", function () {
    if ($("check").disabled) return;
    var ms = Date.now() - q.shownAt;
    var res = Prep.check(q.item, answerValue());
    q.tries += 1;
    if (q.tries === 1) {
      q.first = res.correct;
      q.firstAnswer = answerValue();
      q.ms = ms;
      // Faster than the passage could be read: checked like any answer, and
      // marked for guides only.
      q.rapid = ms < q.min;
    }
    if (q.tries === 1 && !res.correct) {
      // Keep the miss even if the student leaves now.
      session.pending = { at: session.at, first: false, firstAnswer: q.firstAnswer, ms: q.ms, rapid: q.rapid };
      save();
    }
    if (res.correct) {
      q.phase = "done";
      q.final = true;
      feedback("right", "Right.");
      return done();
    }
    if (q.tries === 1) {
      strikeWrong();
      var box = el("div");
      box.append(el("strong", { text: "Not quite. " }), res.why);
      feedback("miss", box);
      if (q.passage && q.item.evidence && q.item.evidence.length) {
        q.phase = "evidence";
        $("feedback").append(el("div", { cls: "fb do", text: "Tap the sentence in the passage that shows the right answer." }));
        $("passage").classList.add("tapping");
      } else {
        q.phase = "retry";
        $("feedback").append(el("div", { cls: "fb do", text: "Try again." }));
      }
      resetChoice();
      redraw();
      return;
    }
    // A second miss: show the right answer and why, then move on.
    q.phase = "done";
    q.final = false;
    q.reveal = true;
    showRight();
    var b2 = el("div");
    b2.append(el("strong", { text: "Here's the right answer. " }), res.why);
    feedback("miss", b2);
    redraw();
    done();
  });

  function strikeWrong() {
    var it = q.item;
    var a = q.firstAnswer;
    if (it.format === "single" || it.format === "vocab") q.struck.push(String(a));
    if (it.format === "multi") a.forEach(function (i) { if (it.keys.indexOf(i) < 0) q.struck.push(String(i)); });
    if (it.format === "two-part") {
      if (a[0] !== it.a.key) q.struck.push("a" + a[0]);
      if (a[1] !== it.b.key) q.struck.push("b" + a[1]);
    }
  }

  function resetChoice() {
    var it = q.item;
    if (it.format === "single" || it.format === "vocab" || it.format === "sentence") q.choice = null;
    if (it.format === "multi") q.choice = q.choice.filter(function (i) { return it.keys.indexOf(i) >= 0; });
    if (it.format === "two-part") {
      if (q.choice[0] !== it.a.key) q.choice[0] = null;
      if (q.choice[1] !== it.b.key) q.choice[1] = null;
    }
  }

  function showRight() {
    var it = q.item;
    if (it.format === "sentence") {
      it.keys.forEach(function (k) { sentenceEl(k).classList.add("good"); });
      q.choice = it.keys[0];
    }
    if (it.format === "order") q.choice = it.steps.map(function (_, i) { return i; });
    if (it.format === "two-part") q.choice = [it.a.key, it.b.key];
    if (it.format === "multi") q.choice = it.keys.slice();
    if (it.format === "single" || it.format === "vocab") q.choice = it.key;
    $("passage").classList.remove("tapping");
  }

  function done() {
    session.results[session.at] = {
      item: q.item.id,
      first: q.first,
      final: q.final,
      rapid: q.rapid,
      ms: q.ms,
      answer: describe(q.item, q.firstAnswer),
    };
    Prep.recordAnswer(record, q.item, q.first, today);
    session.pending = null;
    session.at += 1;
    save();
    $("passage").classList.remove("tapping");
    $("check").classList.add("hidden");
    // On to the next question by itself: soon after a right answer, and after
    // time to read the right answer and why when it was shown.
    var wait = q.reveal ? REVEAL_MS : RIGHT_MS;
    var at = session.at;
    var was = session;
    setTimeout(function () { if (session === was && session.at === at) nextStep(); }, wait);
  }

  var RIGHT_MS = 1200;
  var REVEAL_MS = 6000;


  /** The student's first answer in words, for the session record adults see. */
  function describe(item, a) {
    var f = item.format;
    if (f === "single" || f === "vocab") return item.options[a].text;
    if (f === "multi") return a.map(function (i) { return item.options[i].text; }).join(" + ");
    if (f === "two-part") return "A: " + item.a.options[a[0]].text + " / B: " + item.b.options[a[1]].text;
    if (f === "sentence") return Prep.sentences(q.passage)[a];
    if (f === "order") return a.map(function (i) { return item.steps[i]; }).join(" > ");
    return "";
  }

  function promptOf(item) {
    return (item.prompt || (item.a.prompt + " " + item.b.prompt)).slice(0, 500);
  }

  // ---------- the end ----------

  function finish() {
    var titles = session.passages.map(function (id) { return Prep.findPassage(bank, id).title; });
    var finals = session.results.filter(function (r) { return r.final; }).length;
    save();
    var items = session.results.map(function (r) {
      var it = Prep.findItem(bank, r.item);
      return {
        id: it.id,
        skill: Prep.skillId(it),
        prompt: promptOf(it),
        answer: r.answer,
        correct: r.first,
        ms: Math.round(r.ms || 0),
        format: it.format,
        rightAfterCorrection: !r.first && r.final,
        rapid: r.rapid,
      };
    });
    Prep.finishSession(record, bank, session);
    compass.finishPart({
      part: "session",
      title: "Test prep: " + titles.join(" and "),
      correct: finals,
      wrong: session.results.length - finals,
      seconds: Math.round(session.secs),
      items: items,
    });
    compass.saveState(JSON.stringify(record));
    writeMastery(Prep.mastery(record));
    show("finished");
  }

  function writeMastery(report) {
    var old = document.querySelector('script[data-compass-kind="mastery"]');
    if (old) old.remove();
    var s = document.createElement("script");
    s.type = "application/json";
    s.setAttribute("data-compass-report", "");
    s.setAttribute("data-compass-kind", "mastery");
    report.kind = "mastery";
    report.appVersion = VERSION;
    s.textContent = JSON.stringify(report);
    document.body.append(s);
  }

  // ---------- the level switch (Test Learner only) ----------

  function drawLevels() {
    var box = $("levels");
    box.textContent = "";
    box.append(el("span", { text: "Level" }));
    Prep.levels(bank).forEach(function (l) {
      var on = l.band === session.band;
      box.append(el("button", {
        type: "button",
        cls: on ? "on" : "",
        "aria-pressed": on ? "true" : "false",
        text: l.label,
        onclick: function () { pickLevel(l.band); },
      }));
    });
  }

  function pickLevel(band) {
    var next = Prep.pickLevel(record, bank, profile, today, band);
    if (!next) return;
    session = next;
    session.secs = 0;
    session.seen = [];
    parts = Prep.parts(session);
    visitStart = Date.now();
    save();
    drawLevels();
    intro();
  }

  if (picker) {
    document.body.classList.add("picking");
    drawLevels();
  }
  intro();
})();
