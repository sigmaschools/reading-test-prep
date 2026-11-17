// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0
"use strict";
const test = require("node:test");
const assert = require("node:assert");
const P = require("../prep.js");
const B = require("../bank/bank.js");

const day = "2026-11-18";
const formatsOf = (s) => s.steps.map((x) => P.findItem(B, x.item).format);

test("a new student starts with the two pick-one formats only, both taught", () => {
  const s = P.plan(P.newRecord(), B, null, day);
  assert.deepStrictEqual(s.teach.sort(), ["single", "vocab"]);
  for (const f of formatsOf(s)) assert.ok(f === "single" || f === "vocab", f);
});

test("a later session teaches at most one new format, with 8 questions on a story and a nonfiction passage", () => {
  const r = Object.assign(P.newRecord(), { b: "b4", f: ["single", "vocab", "sentence", "multi"], n: 4 });
  const s = P.plan(r, B, null, day);
  assert.strictEqual(s.steps.length, 8);
  assert.deepStrictEqual(s.teach, ["two-part"]);
  assert.ok(!formatsOf(s).includes("order"));
  const types = s.passages.map((id) => P.findPassage(B, id).type).sort();
  assert.deepStrictEqual(types, ["informational", "literary"]);
});

test("the band starts from the reading level, then from grade", () => {
  assert.strictEqual(P.startBand(B, { levels: [{ subject: "reading", scale: "lexile", value: 620 }] }), "b2");
  assert.strictEqual(P.startBand(B, { grade: "5", levels: [] }), "b4");
});

test("every format checks right and wrong answers", () => {
  const it = (id) => P.findItem(B, id);
  assert.ok(P.check(it("q-0001-1"), 0).correct);
  const miss = P.check(it("q-0001-1"), 1);
  assert.ok(!miss.correct && /detail/.test(miss.why));
  assert.ok(P.check(it("q-0002-2"), [1, 0]).correct);
  assert.ok(!P.check(it("q-0002-2"), [0, 3]).correct);
  assert.ok(P.check(it("q-0001-2"), 7).correct);
  assert.ok(!P.check(it("q-0001-2"), 6).correct);
  assert.ok(P.check(it("q-0001-3"), [0, 0]).correct);
  assert.ok(!P.check(it("q-0001-3"), [0, 1]).correct);
  assert.ok(P.check(it("q-0002-3"), [0, 1, 2, 3]).correct);
  assert.ok(!P.check(it("q-0002-3"), [1, 0, 2, 3]).correct);
});

test("a missed skill comes back next session, then after a week and three weeks", () => {
  const r = P.newRecord();
  const item = P.findItem(B, "q-0001-1");
  P.recordAnswer(r, item, false, day);
  const id = P.skillId(item);
  assert.deepStrictEqual(r.s[id], ["2026-11-19", 1]);
  P.recordAnswer(r, item, true, "2026-11-19");
  assert.deepStrictEqual(r.s[id], ["2026-11-26", 2]);
  P.recordAnswer(r, item, true, "2026-11-26");
  assert.deepStrictEqual(r.s[id], ["2026-12-17", 3]);
  P.recordAnswer(r, item, true, "2026-12-17");
  assert.strictEqual(r.s[id], undefined);
});

test("mastered needs right first tries on three different days", () => {
  const r = P.newRecord();
  const item = P.findItem(B, "q-0002-1");
  const stage = () => P.mastery(r).groups[2].items[0].stage;
  assert.strictEqual(stage(), "unseen");
  P.recordAnswer(r, item, true, day);
  P.recordAnswer(r, item, true, day);
  assert.strictEqual(stage(), "fluent");
  P.recordAnswer(r, item, true, "2026-11-20");
  P.recordAnswer(r, item, true, "2026-11-25");
  assert.strictEqual(stage(), "mastered");
  P.recordAnswer(r, item, false, "2026-11-26");
  assert.strictEqual(stage(), "learning");
});

test("the band moves toward about 80 to 85 percent first-try", () => {
  // A bank with passages in the bands either side of b4.
  const wide = Object.assign({}, B, {
    passages: B.passages.concat(
      B.passages.map((p) => Object.assign({}, p, { id: p.id + "-up", band: "b5" })),
      B.passages.map((p) => Object.assign({}, p, { id: p.id + "-down", band: "b3" }))
    ),
  });
  const r = Object.assign(P.newRecord(), { b: "b4", f: ["single", "vocab"] });
  const s = P.plan(r, wide, null, day);
  s.results = s.steps.map(() => ({ first: true, final: true }));
  P.finishSession(r, wide, s);
  assert.strictEqual(r.b, "b5");
  const r2 = Object.assign(P.newRecord(), { b: "b4" });
  const s2 = P.plan(r2, wide, null, day);
  s2.results = s2.steps.map(() => ({ first: false, final: true }));
  P.finishSession(r2, wide, s2);
  assert.strictEqual(r2.b, "b3");
});

test("an unreadable record is a new student", () => {
  assert.deepStrictEqual(P.readRecord("not json"), P.newRecord());
  assert.deepStrictEqual(P.readRecord(null), P.newRecord());
});

test("a too-quick answer is under the reading time of the passage", () => {
  const p = P.findPassage(B, "p-0001");
  const first = P.minSeconds(P.findItem(B, "q-0001-1"), p, true);
  const later = P.minSeconds(P.findItem(B, "q-0001-5"), p, false);
  assert.ok(first > 30 && later < 10, first + " " + later);
});

test("every bank question points at real sentences and options", () => {
  for (const p of B.passages) {
    const n = P.sentences(p).length;
    for (const q of p.items) {
      for (const e of q.evidence || []) assert.ok(e < n, q.id);
      for (const k of q.keys || []) assert.ok(q.format !== "sentence" || k < n, q.id);
      const opts = q.options || [];
      opts.forEach((o, i) => { if (i !== q.key && !(q.keys || []).includes(i)) assert.ok(o.why, q.id + " option " + i + " needs a why"); });
    }
  }
});

test("a band with no passages falls back to the nearest one that has them", () => {
  for (const b of ["b1", "b2", "b3", "b5", "b6"]) {
    const s = P.plan(Object.assign(P.newRecord(), { b }), B, null, day);
    assert.ok(s && s.steps.length, b);
    assert.strictEqual(s.band, "b4");
  }
});

test("a perfect session never moves the band to one with no passages", () => {
  const r = Object.assign(P.newRecord(), { b: "b4", f: ["single", "vocab"] });
  const s = P.plan(r, B, null, day);
  s.results = s.steps.map(() => ({ first: true, final: true }));
  P.finishSession(r, B, s);
  assert.strictEqual(r.b, "b4");
  assert.strictEqual(r.d, day);
});

test("a saved session that names a question the bank no longer has is not valid", () => {
  const s = P.plan(P.newRecord(), B, null, day);
  assert.ok(P.sessionValid(B, s));
  s.steps[0].item = "q-gone";
  assert.ok(!P.sessionValid(B, s));
  assert.ok(!P.sessionValid(B, null));
});
