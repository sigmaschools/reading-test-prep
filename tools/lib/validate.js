// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0
"use strict";

// Checks a passage or vocabulary question against the bank rules in
// docs/ITEM-BANK.md, and shuffles options so the right answer is not always
// first. Each check returns a list of problems in plain words; empty means it
// passes. Used by the writer (to send problems back for a rewrite), by the
// build, and by the tests.

const Prep = require("../../prep.js");

const TRAPS = ["true-but", "detail", "literal", "word-lift", "too-broad", "too-narrow", "opposite", "not-in-text"];
const PASSAGE_FORMATS = ["single", "sentence", "multi", "two-part", "order"];
const OPTION_COUNT = { single: 4, multi: 5, vocab: 4 };
// A right answer this much longer than every wrong one gives itself away.
const LONGEST_RATIO = 1.4;

const words = (s) => String(s).split(/\s+/).filter(Boolean).length;

function skillsOf(area) {
  const a = Prep.AREAS.find((x) => x.id === area);
  return a ? a.skills : null;
}

function checkOptions(id, options, keys, count, out) {
  if (!Array.isArray(options) || options.length !== count) {
    out.push(id + ": needs " + count + " options");
    return;
  }
  const texts = options.map((o) => String(o.text || "").trim().toLowerCase());
  if (new Set(texts).size !== texts.length || texts.includes("")) out.push(id + ": options must be different and not empty");
  for (const k of keys) if (!(k >= 0 && k < count)) out.push(id + ": key " + k + " is not an option");
  options.forEach((o, i) => {
    if (keys.includes(i)) return;
    if (!o.why) out.push(id + ": wrong option " + i + " needs a why line");
    if (o.trap && !TRAPS.includes(o.trap)) out.push(id + ": unknown trap " + o.trap);
  });
  const wrongMax = Math.max(...options.filter((_, i) => !keys.includes(i)).map((o) => String(o.text).length));
  for (const k of keys) {
    if (options[k] && String(options[k].text).length > LONGEST_RATIO * wrongMax) out.push(id + ": the right answer is by far the longest option");
  }
}

function checkEvidence(id, list, n, out, required) {
  if (!Array.isArray(list) || !list.length) {
    if (required) out.push(id + ": needs evidence sentences");
    return;
  }
  for (const e of list) if (!(Number.isInteger(e) && e >= 0 && e < n)) out.push(id + ": sentence " + e + " is not in the passage");
}

/** Problems with one passage and its questions. */
function passage(p, bank) {
  const out = [];
  const id = p.id || "passage";
  if (!["literary", "informational"].includes(p.type)) out.push(id + ": type must be literary or informational");
  if (!p.title) out.push(id + ": needs a title");
  if (!p.genre) out.push(id + ": needs a genre");
  if (!bank.bands.some((b) => b.id === p.band)) out.push(id + ": unknown band " + p.band);
  if (!Array.isArray(p.topics) || !p.topics.length) out.push(id + ": needs topics");
  if (!Array.isArray(p.paragraphs) || !p.paragraphs.length || p.paragraphs.some((x) => !Array.isArray(x) || !x.length)) {
    out.push(id + ": needs paragraphs of sentences");
    return out;
  }
  const sentences = Prep.sentences(p);
  const n = sentences.length;
  const w = words(sentences.join(" "));
  const min = p.genre === "poem" ? 60 : 100;
  if (w < min || w > 250) out.push(id + ": is " + w + " words; it must be " + min + " to 250");

  const items = p.items || [];
  if (items.length !== 5) out.push(id + ": needs 5 questions, has " + items.length);
  const formats = items.map((q) => q.format);
  if (formats.filter((f) => f === "single").length < 3) out.push(id + ": needs at least 3 pick-one questions");
  if (new Set(formats).size < 3) out.push(id + ": needs at least 3 formats");
  const ids = new Set();

  items.forEach((q, i) => {
    const qid = q.id || id + " question " + (i + 1);
    if (ids.has(qid)) out.push(qid + ": id used twice");
    ids.add(qid);
    if (!PASSAGE_FORMATS.includes(q.format)) out.push(qid + ": unknown format " + q.format);
    if (!String(q.area || "").startsWith(p.type + "-")) out.push(qid + ": area " + q.area + " does not fit a " + p.type + " passage");
    const skills = skillsOf(q.area);
    if (skills && !skills.includes(q.skill)) out.push(qid + ": skill " + q.skill + " is not in " + q.area);
    if (q.order !== i + 1) out.push(qid + ": order should be " + (i + 1));

    if (q.format === "single") {
      if (!q.prompt) out.push(qid + ": needs a prompt");
      checkOptions(qid, q.options, [q.key], OPTION_COUNT.single, out);
      checkEvidence(qid, q.evidence, n, out, true);
    } else if (q.format === "multi") {
      if (!q.prompt) out.push(qid + ": needs a prompt");
      if (!Array.isArray(q.keys) || q.keys.length !== 2 || q.keys[0] === q.keys[1]) out.push(qid + ": pick two needs exactly two keys");
      else checkOptions(qid, q.options, q.keys, OPTION_COUNT.multi, out);
      checkEvidence(qid, q.evidence, n, out, true);
    } else if (q.format === "sentence") {
      if (!q.prompt) out.push(qid + ": needs a prompt");
      if (!q.why) out.push(qid + ": needs a why line");
      checkEvidence(qid, q.keys, n, out, true);
    } else if (q.format === "two-part") {
      for (const part of ["a", "b"]) {
        if (!q[part] || !q[part].prompt) out.push(qid + ": needs part " + part.toUpperCase());
        else checkOptions(qid + part, q[part].options, [q[part].key], 4, out);
      }
      checkEvidence(qid, q.evidence, n, out, true);
    } else if (q.format === "order") {
      if (!q.prompt) out.push(qid + ": needs a prompt");
      if (!q.why) out.push(qid + ": needs a why line");
      if (!Array.isArray(q.steps) || q.steps.length < 3 || q.steps.length > 5) out.push(qid + ": needs 3 to 5 steps");
      else if (new Set(q.steps).size !== q.steps.length) out.push(qid + ": steps must be different");
    }
  });
  return out;
}

/** Problems with one vocabulary question. */
function vocab(v, bank) {
  const out = [];
  const id = v.id || "vocab";
  if (v.format !== "vocab" || v.area !== "vocabulary") out.push(id + ": must be a vocab question in the vocabulary area");
  if (!skillsOf("vocabulary").includes(v.skill)) out.push(id + ": unknown skill " + v.skill);
  if (!bank.bands.some((b) => b.id === v.band)) out.push(id + ": unknown band " + v.band);
  if (!v.context || !v.word) out.push(id + ": needs a context and a word");
  else if (!v.context.toLowerCase().includes(String(v.word).toLowerCase())) out.push(id + ": the word is not in its sentences");
  if (!v.prompt || !String(v.prompt).toLowerCase().includes(String(v.word).toLowerCase())) out.push(id + ": the prompt must name the word");
  checkOptions(id, v.options, [v.key], OPTION_COUNT.vocab, out);
  return out;
}

// A small seeded random generator, so a build shuffles the same way every time.
function seeded(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

function shuffleOptions(seed, holder, keyField) {
  const rand = seeded(seed);
  const order = holder.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  holder.options = order.map((i) => holder.options[i]);
  if (keyField === "keys") holder.keys = holder.keys.map((k) => order.indexOf(k)).sort((a, b) => a - b);
  else holder.key = order.indexOf(holder.key);
}

/** Puts every question's options in a fixed random order, moving its keys with them. */
function shuffle(p) {
  const list = p.items || [p];
  for (const q of list) {
    if (q.format === "single" || q.format === "vocab") shuffleOptions(q.id, q, "key");
    else if (q.format === "multi") shuffleOptions(q.id, q, "keys");
    else if (q.format === "two-part") {
      shuffleOptions(q.id + "a", q.a, "key");
      shuffleOptions(q.id + "b", q.b, "key");
    }
  }
  return p;
}

module.exports = { passage, vocab, shuffle, TRAPS, words };
