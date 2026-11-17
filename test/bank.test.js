// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0
"use strict";
const test = require("node:test");
const assert = require("node:assert");
const P = require("../prep.js");
const V = require("../tools/lib/validate.js");
const B = require("../bank/bank.js");

const sample = B.version.startsWith("sample");

test("every passage and vocabulary question in the live bank follows the bank rules", () => {
  for (const p of B.passages) {
    const problems = V.passage(p, B).filter((x) => !(sample && x.includes("3 pick-one")));
    assert.deepStrictEqual(problems, [], p.id);
  }
  for (const v of B.vocab) assert.deepStrictEqual(V.vocab(v, B), [], v.id);
});

test("ids are unique across the bank", () => {
  const ids = [...B.passages.map((p) => p.id), ...B.passages.flatMap((p) => p.items.map((q) => q.id)), ...B.vocab.map((v) => v.id)];
  assert.strictEqual(new Set(ids).size, ids.length);
});

test("the right answer is spread across positions, not always first", { skip: sample }, () => {
  const keys = [...B.passages.flatMap((p) => p.items.filter((q) => q.format === "single").map((q) => q.key)), ...B.vocab.map((v) => v.key)];
  for (let k = 0; k < 4; k++) {
    const share = keys.filter((x) => x === k).length / keys.length;
    assert.ok(share > 0.12 && share < 0.4, `position ${k}: ${share.toFixed(2)}`);
  }
});

test("a fifth grader's first session has 8 questions on two passages", { skip: sample }, () => {
  const r = P.newRecord();
  const s = P.plan(r, B, { grade: "5", levels: [] }, "2026-11-18");
  assert.strictEqual(s.steps.length, 8);
  assert.strictEqual(s.passages.length, 2);
});
