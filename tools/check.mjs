// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0

// Checks written passages before they may enter the bank (docs/ITEM-BANK.md):
//   blind test  each question alone, without the passage, three times; one
//               answered right every time can be answered without reading
//   key test    a Gemini model answers with the passage, and must pick the
//               key and find no other option defensible; it also checks
//               facts and content
//   review      a fresh Claude reviewer reads every question cold
// A passage that fails gets up to two rewrites by the writer, each checked again.
//
//   node tools/check.mjs b4 [--only b4-l01] [--cheap]
//
// --cheap runs only the blind and key tests (about 3 cents a passage), for
// passages written and reviewed in a working thread (tools/add.mjs): there is
// no API review and no API rewrite; a failing passage is rejected with its
// problems, for the thread to fix and add again.

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { claudeJSON, geminiJSON, MODELS, pool, spend } from "./lib/ai.mjs";
import { WRITER_SYSTEM, PassageSchema, writerRequest } from "./lib/prompts.mjs";
import { toPassage, measure, textOf } from "./lib/convert.mjs";
import { BANDS } from "./lib/plan.mjs";
import { blind, keyTest, review } from "./lib/checks.mjs";

const require = createRequire(import.meta.url);
const V = require("./lib/validate.js");
const BANK = { bands: require("../test/fixtures/sample-bank.js").bands };

const args = process.argv.slice(2);
const band = args[0];
const cheap = args.includes("--cheap");
const only = args.includes("--only") ? args[args.indexOf("--only") + 1].split(",") : null;
const dir = new URL(`./work/${band}/`, import.meta.url);
const [LO, HI] = BANDS[band];
const guidance = measure([{ id: "g", target: Math.round((LO + HI) / 2) }])[0].guidance;
// Right this many times in three without the passage, and the question needs no
// reading. A passage may keep one such question: even a small model is more
// test-wise than a child, and a theme or main idea question is the hardest to
// hide; every other check must pass for every question.
const BLIND_LIMIT = 3;
const BLIND_ALLOWED = 1;
const REWRITES = cheap ? 0 : 2;
const NO_REVIEW = { passage_ok: true, passage_problem: null, questions: [] };

async function checkPassage(p) {
  const [b, k, r] = await Promise.all([blind(p), keyTest(p), cheap ? NO_REVIEW : review(p)]);
  const fails = [];
  const blindFails = [];
  for (const x of b) if (x.right >= BLIND_LIMIT) blindFails.push(`${x.id}${x.part ? " part " + x.part.toUpperCase() : ""}: a reader who has not seen the passage picked the right answer ${x.right} times in 3. Make it need the passage: wrong options that are just as plausible without reading, or a question about something only this text shows.`);
  for (const x of k.per) if (!x.ok) fails.push(`${x.id}${x.part ? " part " + x.part.toUpperCase() : ""}: a careful reader with the passage answered ${x.answer.join(",") || "nothing"}${x.other.length ? ` and also found ${x.other.join(",")} defensible` : ""}. Their note: ${x.note}`);
  if (k.facts) fails.push(`Facts: ${k.facts}`);
  if (k.content) fails.push(`Content: ${k.content}`);
  if (!r.passage_ok) fails.push(`Reviewer on the passage: ${r.passage_problem}`);
  for (const q of r.questions) if (!q.ok) fails.push(`Reviewer on question ${q.number}: ${q.problem}`);
  return { blind: b, key: k, review: r, fails, blindFails, pass: !fails.length && blindFails.length <= BLIND_ALLOWED };
}

async function repair(rec, fails) {
  const messages = [
    {
      role: "user",
      content: `${writerRequest(rec.slot, guidance)}\n\nYou already wrote this (right answers first, sentence numbers from 0):\n${JSON.stringify(rec.passage)}\n\nChecks found these problems. Fix them, keep everything that works, keep the level between ${LO} and ${HI}, and return the whole passage and all five questions:\n- ${fails.join("\n- ")}`,
    },
  ];
  let out;
  for (let round = 0; round < 2; round++) {
    const { data, message } = await claudeJSON({ model: MODELS.writer, system: WRITER_SYSTEM, schema: PassageSchema, effort: "high", messages });
    const { passage, problems } = toPassage(rec.slot, data);
    problems.push(...V.passage(passage, BANK));
    const m = measure([{ id: passage.id, text: textOf(passage), target: Math.round((LO + HI) / 2) }])[0];
    if (m.level < LO - 30 || m.level > HI + 30) problems.push(`The passage measures ${m.level}, outside ${LO} to ${HI}. ${(m.advice || []).join(" ")}`);
    out = { passage, problems, level: m.level };
    if (!problems.length) break;
    messages.push({ role: "assistant", content: message.content });
    messages.push({ role: "user", content: "Please fix these problems too and return everything again:\n- " + problems.join("\n- ") });
  }
  return out;
}

async function run(file) {
  const path = new URL(file, dir);
  const rec = JSON.parse(readFileSync(path, "utf8"));
  if (rec.status !== "written") return rec.status;
  let c = await checkPassage(rec.passage);
  rec.checks = [c];
  for (let n = 0; n < REWRITES && !c.pass && rec.status === "written"; n++) {
    const all = [...c.fails, ...c.blindFails];
    console.log(`${rec.slot.id}: ${all.length} problems, rewrite ${n + 1}`);
    const fixed = await repair(rec, all);
    if (fixed.problems.length) {
      rec.status = "rejected";
      rec.problems = fixed.problems;
    } else {
      rec.previous = rec.passage;
      rec.passage = fixed.passage;
      rec.level = fixed.level;
      c = await checkPassage(rec.passage);
      rec.checks.push(c);
    }
  }
  if (rec.status === "written") {
    rec.status = c.pass ? "accepted" : "rejected";
    rec.problems = [...c.fails, ...c.blindFails];
  }
  console.log(`${rec.slot.id}: ${rec.status}${rec.status === "rejected" ? "\n  " + rec.problems.join("\n  ") : ""}  ($${spend.dollars.toFixed(2)} so far)`);
  writeFileSync(path, JSON.stringify(rec, null, 1));
  return rec.status;
}

// Vocabulary: the key test only (the sentences are given, so there is no blind
// test). A question that fails is moved out, and the writer tops the list up.
async function checkVocab() {
  const path = new URL("vocab.json", dir);
  let list;
  try {
    list = JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return;
  }
  const todo = list.filter((v) => !v.check);
  for (let i = 0; i < todo.length; i += 10) {
    const batch = todo.slice(i, i + 10).map((v) => V.shuffle(JSON.parse(JSON.stringify(v))));
    const text = batch.map((v, n) => `${n + 1}. ${v.context}\n${v.prompt}\n${v.options.map((o, j) => `   ${"ABCD"[j]}. ${o.text}`).join("\n")}`).join("\n\n");
    const r = await geminiJSON({
      schema: VOCAB_KEY_SCHEMA,
      prompt: `Answer each vocabulary question as a careful reader, using the sentences given. For each, also list any other option a careful reader could reasonably defend as right (empty if none), and say whether the sentences are safe and neutral for young children.\n\n${text}`,
    });
    batch.forEach((v, n) => {
      const got = r.answers.find((a) => Number.parseInt(a.number, 10) === n + 1) || { answer: "", also_defensible: [], note: "no answer" };
      const key = "ABCD"[v.key];
      const others = (got.also_defensible || []).map((x) => String(x).trim().toUpperCase()).filter((x) => x && x !== key);
      const ok = String(got.answer).trim().toUpperCase() === key && !others.length && got.safe !== false;
      list.find((x) => x.id === v.id).check = { ok, note: got.note };
    });
  }
  const bad = list.filter((v) => !v.check.ok);
  if (bad.length) {
    const rejPath = new URL("vocab-rejected.json", dir);
    let old = [];
    try { old = JSON.parse(readFileSync(rejPath, "utf8")); } catch {}
    writeFileSync(rejPath, JSON.stringify(old.concat(bad), null, 1));
  }
  writeFileSync(path, JSON.stringify(list.filter((v) => v.check.ok), null, 1));
  console.log(`vocab: ${list.length - bad.length} passed, ${bad.length} moved out`);
}

const VOCAB_KEY_SCHEMA = {
  type: "object",
  properties: {
    answers: {
      type: "array",
      items: {
        type: "object",
        properties: { number: { type: "string" }, answer: { type: "string" }, also_defensible: { type: "array", items: { type: "string" } }, safe: { type: "boolean" }, note: { type: "string" } },
        required: ["number", "answer", "also_defensible", "safe", "note"],
      },
    },
  },
  required: ["answers"],
};

let files = readdirSync(dir).filter((f) => /^b\d-[li]\d+\.json$/.test(f));
if (only) files = files.filter((f) => only.includes(f.replace(".json", "")));
const results = await pool(files, 3, (f) =>
  run(f).catch((e) => {
    console.log(`${f}: stopped by an error, left to retry: ${e.message}`);
    return "error";
  }),
);
await checkVocab();
const by = {};
for (const r of results) by[r] = (by[r] || 0) + 1;
console.log(JSON.stringify(by), `spent about $${spend.dollars.toFixed(2)} in ${spend.calls} calls`);
