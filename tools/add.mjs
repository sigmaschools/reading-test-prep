// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0

// Adds passages and vocabulary questions written outside the API writer (for
// example by Claude in a working thread) to tools/work/<band>/, checked by the
// same rules and level measure as tools/write.mjs. Then run
// `node tools/check.mjs <band> --cheap` for the blind and key tests.
//
//   node tools/add.mjs b5 drafts.json
//
// drafts.json: { "passages": [{ "slot": "b5-l01", ...PassageSchema }], "vocab": [{ ...one VocabSchema item }] }
// A passage replaces a slot's file unless that slot is already accepted.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { slots, BANDS } from "./lib/plan.mjs";
import { toPassage, measure, textOf } from "./lib/convert.mjs";

const require = createRequire(import.meta.url);
const V = require("./lib/validate.js");
const BANK = { bands: require("../test/fixtures/sample-bank.js").bands };

const [band, file] = process.argv.slice(2);
const [lo, hi] = BANDS[band];
const target = Math.round((lo + hi) / 2);
const SLACK = 30;
const dir = new URL(`./work/${band}/`, import.meta.url);
mkdirSync(dir, { recursive: true });
const drafts = JSON.parse(readFileSync(file, "utf8"));
const bySlot = Object.fromEntries(slots(band).map((s) => [s.id, s]));

const blank = (o) => ({ trap: null, why: null, ...o });
const fill = (q) => ({
  options: [],
  evidence_quotes: [],
  why: null,
  steps: [],
  part_a: null,
  part_b: null,
  ...q,
  ...(q.options ? { options: q.options.map(blank) } : {}),
  ...(q.part_a ? { part_a: { ...q.part_a, options: q.part_a.options.map(blank) } } : {}),
  ...(q.part_b ? { part_b: { ...q.part_b, options: q.part_b.options.map(blank) } } : {}),
});

const todo = [];
for (const d of drafts.passages || []) {
  const slot = bySlot[d.slot];
  if (!slot) {
    console.log(`${d.slot}: no such slot in ${band}`);
    continue;
  }
  const path = new URL(`${slot.id}.json`, dir);
  if (existsSync(path) && JSON.parse(readFileSync(path, "utf8")).status === "accepted") {
    console.log(`${slot.id}: already accepted, left alone`);
    continue;
  }
  const { passage, problems } = toPassage(slot, { ...d, items: d.items.map(fill) });
  problems.push(...V.passage(passage, BANK));
  todo.push({ slot, passage, problems, path });
}
const levels = todo.length ? measure(todo.map((t) => ({ id: t.slot.id, text: textOf(t.passage), target }))) : [];
todo.forEach((t, i) => {
  const m = levels[i];
  if (m.level < lo - SLACK || m.level > hi + SLACK) t.problems.push(`measures ${m.level}, outside ${lo} to ${hi}. ${(m.advice || []).join(" ")}`);
  const rec = { slot: t.slot, status: t.problems.length ? "rejected" : "written", passage: t.passage, level: m.level, problems: t.problems, author: "thread" };
  writeFileSync(t.path, JSON.stringify(rec, null, 1));
  console.log(`${t.slot.id}: level ${m.level}, ${t.problems.length ? "problems:\n  " + t.problems.join("\n  ") : "written"}`);
});

if (drafts.vocab && drafts.vocab.length) {
  const path = new URL("vocab.json", dir);
  const have = existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : [];
  const rejPath = new URL("vocab-rejected.json", dir);
  const old = existsSync(rejPath) ? JSON.parse(readFileSync(rejPath, "utf8")) : [];
  const used = have.concat(old).map((v) => v.word.toLowerCase());
  let n = Math.max(0, ...have.concat(old).map((v) => Number(v.id.split("-v")[1]) || 0));
  for (const q of drafts.vocab) {
    const v = { id: `${band}-v${String(++n).padStart(2, "0")}`, band, format: "vocab", area: "vocabulary", skill: q.skill, context: q.context, word: q.word, prompt: q.prompt, key: 0, options: q.options };
    const problems = V.vocab(v, BANK);
    if (used.includes(v.word.toLowerCase())) problems.push("word used before");
    if (problems.length) console.log(`vocab ${v.word}: ${problems.join("; ")}`);
    else {
      have.push(v);
      used.push(v.word.toLowerCase());
    }
  }
  writeFileSync(path, JSON.stringify(have, null, 1));
  console.log(`vocab: ${have.length} in ${band}`);
}
