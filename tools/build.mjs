// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0

// Builds bank/bank.js from every accepted passage and vocabulary question in
// tools/work/<band>/. The routine, the bands and the worked examples are kept
// from the bank.js already there. Options are put in a fixed shuffled order.
//
//   node tools/build.mjs b3 b4 b5

import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const V = require("./lib/validate.js");
const bankPath = new URL("../bank/bank.js", import.meta.url);
const base = require("../bank/bank.js");

const bands = process.argv.slice(2);
const passages = [];
const vocab = [];
const counts = {};
for (const band of bands) {
  const dir = new URL(`./work/${band}/`, import.meta.url);
  const files = readdirSync(dir).filter((f) => /^b\d-[li]\d+\.json$/.test(f)).sort();
  for (const f of files) {
    const rec = JSON.parse(readFileSync(new URL(f, dir), "utf8"));
    if (rec.status !== "accepted") continue;
    const p = V.shuffle(rec.passage);
    p.level = rec.level;
    passages.push(p);
  }
  const vPath = new URL("vocab.json", dir);
  const vs = existsSync(vPath) ? JSON.parse(readFileSync(vPath, "utf8")) : [];
  vs.forEach((v, i) => {
    const q = V.shuffle({ ...v, order: i + 1 });
    delete q.check;
    vocab.push(q);
  });
  counts[band] = { passages: passages.filter((p) => p.band === band).length, vocab: vs.length };
}

const problems = [];
for (const p of passages) problems.push(...V.passage(p, base));
for (const v of vocab) problems.push(...V.vocab(v, base));
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const bank = {
  version: new Date().toISOString().slice(0, 10) + "-" + passages.length + "p" + vocab.length + "v",
  routine: base.routine,
  bands: base.bands,
  passages,
  vocab,
  examples: base.examples,
};

writeFileSync(
  bankPath,
  `// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0

// The question bank, built by tools/build.mjs from passages written and
// checked by the pipeline in tools/ (docs/ITEM-BANK.md). Every passage and
// question is original to this app. Do not edit by hand: change the pipeline
// or the work files and build again. The routine, bands and worked examples
// below are kept from build to build and may be edited here.
//
// A sentence's index in a passage (counting across paragraphs, from 0) is how
// questions point at it; in a poem each string is a line. Each wrong option
// carries \`why\`: the one plain line a student reads after picking it.

var READING_BANK = ${JSON.stringify(bank, null, 1)};

if (typeof module !== "undefined" && module.exports) module.exports = READING_BANK;
`,
);
console.log(JSON.stringify(counts), "version", bank.version);
