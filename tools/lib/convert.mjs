// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0

// Turns the writer's JSON into the bank's passage shape: quotes become
// sentence numbers, the right answer sits first until the build shuffles it.

import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const norm = (s) => String(s).toLowerCase().replace(/[“”"'‘’]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

/** Sentence numbers for quotes, with a problem for each quote not found. */
export function locate(sentences, quotes, id, problems) {
  const ns = sentences.map(norm);
  const out = [];
  for (const q of quotes || []) {
    const nq = norm(q);
    let i = ns.indexOf(nq);
    if (i < 0 && nq.length > 12) i = ns.findIndex((s) => s.includes(nq) || nq.includes(s));
    if (i < 0) problems.push(`${id}: the quote "${q}" is not a sentence of the passage; quote one whole sentence exactly`);
    else if (!out.includes(i)) out.push(i);
  }
  return out.sort((a, b) => a - b);
}

const opt = (o) => {
  const x = { text: o.text };
  if (o.trap) x.trap = o.trap;
  if (o.why) x.why = o.why;
  return x;
};

export function toPassage(slot, w) {
  const problems = [];
  const paragraphs = w.paragraphs.map((p) => p.map((s) => s.trim()).filter(Boolean)).filter((p) => p.length);
  const sentences = paragraphs.flat();
  const p = { id: slot.id, type: slot.type, genre: slot.genre, title: w.title, band: slot.band, topics: slot.topics, paragraphs, items: [] };
  w.items.forEach((q, i) => {
    const id = `${slot.id}-${i + 1}`;
    const want = slot.questions[i];
    if (want && (q.format !== want.format || q.skill !== want.skill)) problems.push(`${id}: should be ${want.format} on ${want.skill}`);
    const item = { id, order: i + 1, format: q.format, area: (want && want.area) || q.area, skill: q.skill };
    if (q.format === "single" || q.format === "multi") {
      item.prompt = q.prompt;
      if (q.format === "single") item.key = 0;
      else item.keys = [0, 1];
      item.evidence = locate(sentences, q.evidence_quotes, id, problems);
      item.options = q.options.map(opt);
    } else if (q.format === "sentence") {
      item.prompt = q.prompt;
      item.keys = locate(sentences, q.evidence_quotes, id, problems);
      item.why = q.why;
    } else if (q.format === "two-part") {
      item.evidence = locate(sentences, q.evidence_quotes, id, problems);
      for (const part of ["a", "b"]) {
        const src = q["part_" + part];
        if (src) item[part] = { prompt: src.prompt, key: 0, options: src.options.map(opt) };
      }
      if (item.a && !/^Part A/i.test(item.a.prompt)) item.a.prompt = "Part A: " + item.a.prompt;
      if (item.b && !/^Part B/i.test(item.b.prompt)) item.b.prompt = "Part B: " + item.b.prompt;
      if (item.b) locate(sentences, item.b.options.map((o) => o.text), id + " part B", problems);
    } else if (q.format === "order") {
      item.prompt = q.prompt;
      item.why = q.why;
      item.steps = q.steps;
    }
    p.items.push(item);
  });
  return { passage: p, problems };
}

const LEVEL_DIR = fileURLToPath(new URL("../level/", import.meta.url));

/** Runs the Compass reading-level measure on texts: [{id, text, target}] or [{id, target}] for guidance. */
export function measure(list) {
  const out = execFileSync("go", ["run", "."], { cwd: LEVEL_DIR, input: JSON.stringify(list), encoding: "utf8" });
  return JSON.parse(out);
}

// For the level measure, where a line break ends a sentence: a poem's lines run
// on within a stanza, so its sentences are measured, not its short lines.
export const textOf = (p) => (p.genre === "poem" ? p.paragraphs.map((s) => s.join(" ")).join("\n") : p.paragraphs.flat().join("\n"));
