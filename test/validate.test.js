// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0
"use strict";
const test = require("node:test");
const assert = require("node:assert");
const V = require("../tools/lib/validate.js");
const S = require("./fixtures/sample-bank.js");

const clone = (x) => JSON.parse(JSON.stringify(x));
const has = (problems, text) => problems.some((p) => p.includes(text));

// The sample was written before the rule of three pick-one questions a passage,
// so that is the only problem it may have.
const sampleOk = (p) => V.passage(p, S).filter((x) => !x.includes("3 pick-one"));

test("the hand-written sample passages and vocabulary pass", () => {
  for (const p of S.passages) assert.deepStrictEqual(sampleOk(p), [], p.id);
  for (const v of S.vocab) assert.deepStrictEqual(V.vocab(v, S), [], v.id);
});

test("a passage with too few pick-one questions or formats is caught", () => {
  const p = clone(S.passages[0]);
  for (const q of p.items) if (q.format !== "single") Object.assign(q, { format: "sentence", keys: [0], why: "x" });
  const problems = V.passage(p, S);
  assert.ok(has(problems, "pick-one") && has(problems, "3 formats"), problems.join("\n"));
});

test("a sentence index past the end of the passage is caught", () => {
  const p = clone(S.passages[1]);
  p.items[3].keys = [99];
  assert.ok(has(V.passage(p, S), "q-0002-4"));
});

test("a wrong option without a trap line is caught", () => {
  const p = clone(S.passages[1]);
  delete p.items[0].options[2].why;
  assert.ok(has(V.passage(p, S), "why"));
});

test("a right answer much longer than every wrong one is caught as a giveaway", () => {
  const p = clone(S.passages[1]);
  p.items[4].options[0].text = "To show the reader each of the steps beavers take, one after another, in the order they happen";
  assert.ok(has(V.passage(p, S), "longest"));
});

test("a question on the wrong kind of passage is caught", () => {
  const p = clone(S.passages[1]);
  p.items[0].area = "literary-key-ideas";
  p.items[0].skill = "theme";
  assert.ok(has(V.passage(p, S), "area"));
});

test("a vocabulary question whose word is not in its sentences is caught", () => {
  const v = clone(S.vocab[0]);
  v.word = "trailhead";
  assert.ok(has(V.vocab(v, S), "word"));
});

test("shuffling moves the right answer and keeps every key pointing at it", () => {
  const p = clone(S.passages[1]);
  const before = p.items.map((q) => (q.options ? (q.keys || [q.key]).map((k) => q.options[k].text) : null));
  V.shuffle(p);
  p.items.forEach((q, i) => {
    if (!q.options) return;
    assert.deepStrictEqual((q.keys || [q.key]).map((k) => q.options[k].text).sort(), before[i].slice().sort(), q.id);
  });
  const keys = p.items.filter((q) => q.format === "single").map((q) => q.key);
  assert.ok(keys.some((k) => k !== 0), "every key still first: " + keys);
  assert.deepStrictEqual(sampleOk(p), []);
  const again = clone(S.passages[1]);
  V.shuffle(again);
  assert.deepStrictEqual(again, p, "the same every build");
});
