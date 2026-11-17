// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0

// Writes passages and their questions for a band, fixing what the rules and
// the level measure catch, and saves each to tools/work/<band>/<id>.json.
//
//   node tools/write.mjs b4 [--limit 6] [--only b4-l01,b4-i01] [--vocab 40]
//
// A slot already written is skipped, so a run can be stopped and resumed.

import { mkdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { claudeJSON, MODELS, pool, spend } from "./lib/ai.mjs";
import { slots, BANDS } from "./lib/plan.mjs";
import { WRITER_SYSTEM, PassageSchema, writerRequest, VOCAB_SYSTEM, VocabSchema } from "./lib/prompts.mjs";
import { toPassage, measure, textOf } from "./lib/convert.mjs";

const require = createRequire(import.meta.url);
const V = require("./lib/validate.js");
const BANK = { bands: require("../test/fixtures/sample-bank.js").bands };

const args = process.argv.slice(2);
const band = args[0];
const flag = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : null);
const limit = Number(flag("--limit") || 1e9);
const only = flag("--only") ? flag("--only").split(",") : null;
const vocabCount = Number(flag("--vocab") || 0);
const ROUNDS = 3; // the first draft plus two fixes

const dir = new URL(`./work/${band}/`, import.meta.url);
mkdirSync(dir, { recursive: true });
const [lo, hi] = BANDS[band];
const target = Math.round((lo + hi) / 2);
const guidance = measure([{ id: "g", target }])[0].guidance;
// The measure is noisy on one short text; allow a little either side of the band.
const SLACK = 30;

function levelProblem(p) {
  const m = measure([{ id: p.id, text: textOf(p), target }])[0];
  if (m.level >= lo - SLACK && m.level <= hi + SLACK) return { level: m.level, problem: null };
  return {
    level: m.level,
    problem: `The passage measures ${m.level}, outside ${lo} to ${hi}. ${(m.advice || []).join(" ")} Keep the story, the questions and the answers the same; change sentence length and word choice.`,
  };
}

async function writeSlot(slot) {
  const file = new URL(`${slot.id}.json`, dir);
  if (existsSync(file)) return JSON.parse(readFileSync(file, "utf8"));
  const messages = [{ role: "user", content: writerRequest(slot, guidance) }];
  let result;
  for (let round = 1; round <= ROUNDS; round++) {
    let data, message;
    try {
      ({ data, message } = await claudeJSON({ model: MODELS.writer, system: WRITER_SYSTEM, messages, schema: PassageSchema, effort: "high" }));
    } catch (e) {
      result = { slot, status: "failed", error: String(e.message || e), rounds: round };
      break;
    }
    const { passage, problems } = toPassage(slot, data);
    problems.push(...V.passage(passage, BANK));
    const lv = levelProblem(passage);
    if (lv.problem) problems.push(lv.problem);
    result = { slot, status: problems.length ? "rejected" : "written", passage, level: lv.level, problems, rounds: round };
    console.log(`${slot.id} round ${round}: level ${lv.level}, ${problems.length} problems, $${spend.dollars.toFixed(2)} so far`);
    if (!problems.length) break;
    messages.push({ role: "assistant", content: message.content });
    messages.push({ role: "user", content: "Please fix these problems and return the whole passage and all five questions again:\n- " + problems.join("\n- ") });
  }
  writeFileSync(file, JSON.stringify(result, null, 1));
  return result;
}

async function writeVocab(n) {
  const file = new URL(`vocab.json`, dir);
  const have = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : [];
  const per = 10;
  while (have.length < n) {
    const used = have.map((v) => v.word.toLowerCase());
    const ask = `Write ${per} vocabulary questions for ${{ b3: "a third grader", b4: "a fourth or fifth grader", b5: "a strong fifth grader" }[band]}, reading level about ${target} (between ${lo} and ${hi}). ${guidance}
Skills: 5 context-clues, 3 word-parts, 2 multiple-meaning. Vary the topics of the sentences.${used.length ? " Do not use these words again: " + used.join(", ") + "." : ""}`;
    const { data } = await claudeJSON({ model: MODELS.writer, system: VOCAB_SYSTEM, messages: [{ role: "user", content: ask }], schema: VocabSchema, effort: "high" });
    for (const q of data.items) {
      const v = {
        id: `${band}-v${String(have.length + 1).padStart(2, "0")}`,
        band,
        format: "vocab",
        area: "vocabulary",
        skill: q.skill,
        context: q.context,
        word: q.word,
        prompt: q.prompt,
        key: 0,
        options: q.options.map((o) => Object.fromEntries(Object.entries(o).filter(([, x]) => x != null))),
      };
      const problems = V.vocab(v, BANK);
      if (used.includes(v.word.toLowerCase())) problems.push("word used twice");
      if (problems.length) console.log(`vocab ${v.word}: ${problems.join("; ")}`);
      else {
        have.push(v);
        used.push(v.word.toLowerCase());
      }
      if (have.length >= n) break;
    }
    writeFileSync(file, JSON.stringify(have, null, 1));
    console.log(`vocab: ${have.length} of ${n}, $${spend.dollars.toFixed(2)} so far`);
  }
}

let list = slots(band);
if (only) list = list.filter((s) => only.includes(s.id));
list = list.slice(0, limit);
const results = await pool(list, 4, writeSlot);
if (vocabCount) await writeVocab(vocabCount);
const by = {};
for (const r of results) by[r.status] = (by[r.status] || 0) + 1;
console.log(JSON.stringify(by), `spent about $${spend.dollars.toFixed(2)} in ${spend.calls} calls`);
