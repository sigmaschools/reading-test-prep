// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0
"use strict";
// Today's session for the browser tests, with every format in it. The planner
// teaches formats gradually and rarely picks "put in order", so the second
// passage is swapped for one whose questions include an order question.
const P = require("../../prep.js");
const BANK = require("../../bank/bank.js");

const ALL = ["single", "vocab", "sentence", "multi", "two-part", "order"];

function sessionRecord(band, today) {
  const r = Object.assign(P.newRecord(), { b: band, f: ALL.slice(), n: 6 });
  const s = P.plan(r, BANK, null, today);
  const first = s.steps[0].passage;
  const p = BANK.passages.find((x) => x.band === band && x.id !== first && x.items.some((i) => i.format === "order") && x.items.some((i) => i.format === "multi"));
  if (!p) throw new Error("no passage with an order question at " + band);
  const order = p.items.find((i) => i.format === "order");
  const others = [p.items.find((i) => i.format === "single" || i.format === "sentence"), p.items.find((i) => i.format === "multi")];
  const at = s.steps.findIndex((st) => st.passage && st.passage !== first);
  s.steps.splice(at, 3, { passage: p.id, item: others[0].id }, { passage: p.id, item: order.id }, { passage: p.id, item: others[1].id });
  s.passages = [first, p.id];
  r.t = s;
  return r;
}

module.exports = { sessionRecord };
