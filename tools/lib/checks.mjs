// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0

// The three checks a passage passes before it may enter the bank
// (docs/ITEM-BANK.md): the blind test, the key test and the cold review.

import { createRequire } from "node:module";
import { z } from "zod";
import { claudeJSON, geminiJSON, MODELS } from "./ai.mjs";
import { REVIEW_SYSTEM, ReviewSchema } from "./prompts.mjs";

const require = createRequire(import.meta.url);
const V = require("./validate.js");

const L = "ABCDE";
const clone = (x) => JSON.parse(JSON.stringify(x));

// The questions as a reader sees them: options shuffled, lettered, no keys.
export function render(p, { withSentences }) {
  const s = clone(p);
  V.shuffle(s);
  const lines = [];
  const answers = [];
  s.items.forEach((q, i) => {
    const n = i + 1;
    const opts = (os) => os.map((o, j) => `   ${L[j]}. ${o.text}`).join("\n");
    if (q.format === "single") {
      lines.push(`${n}. (pick one) ${q.prompt}\n${opts(q.options)}`);
      answers.push({ n, kind: "pick", key: [L[q.key]], q });
    } else if (q.format === "multi") {
      lines.push(`${n}. (pick two) ${q.prompt}\n${opts(q.options)}`);
      answers.push({ n, kind: "pick", key: q.keys.map((k) => L[k]), q });
    } else if (q.format === "two-part") {
      lines.push(`${n}. (pick one) ${q.a.prompt.replace(/^Part A:\s*/, "")}\n${opts(q.a.options)}`);
      answers.push({ n, kind: "pick", key: [L[q.a.key]], q, part: "a" });
      if (withSentences) {
        lines.push(`${n}b. (pick one) ${q.b.prompt.replace(/^Part B:\s*/, "")}\n${opts(q.b.options)}`);
        answers.push({ n: n + 0.5, kind: "pick", key: [L[q.b.key]], q, part: "b" });
      }
    } else if (q.format === "order") {
      // Shown in a fixed scrambled order; the answer is the letters in time order.
      const idx = q.steps.map((_, j) => j).sort((a, b) => ((a * 7 + 3) % 5) - ((b * 7 + 3) % 5));
      lines.push(`${n}. (put in order: answer with the letters in the right order) ${q.prompt}\n${idx.map((j, k) => `   ${L[k]}. ${q.steps[j]}`).join("\n")}`);
      answers.push({ n, kind: "order", key: q.steps.map((_, j) => L[idx.indexOf(j)]), q });
    } else if (q.format === "sentence" && withSentences) {
      lines.push(`${n}. (answer with the sentence number) ${q.prompt}`);
      answers.push({ n, kind: "sentence", key: q.keys.map(String), q });
    }
  });
  answers.forEach((a, i) => (a.text = lines[i]));
  return { text: lines.join("\n\n"), answers };
}

export const numbered = (p) => {
  let k = 0;
  return p.paragraphs.map((par) => par.map((s) => `[${k++}] ${s}`).join(" ")).join("\n\n");
};

const same = (a, b) => a.length === b.length && a.every((x) => b.includes(x));
const norm = (xs) => (xs || []).map((x) => String(x).trim().toUpperCase().replace(/[^A-Z0-9]/g, "")).filter(Boolean);

const BlindSchema = z.object({ answer: z.array(z.string()) });

/**
 * Each question on its own, without the passage, its title or the other
 * questions, three times. Returns how many times each was answered right.
 */
export async function blind(p, model = MODELS.blind) {
  const { answers } = render(p, { withSentences: false });
  return Promise.all(
    answers.map(async (a) => {
      const ask = `This is a question from a reading test about a passage you cannot see. Answer it anyway with your best guess: give the letter${a.kind === "pick" && a.key.length === 2 ? "s of two options" : a.kind === "order" ? "s in the right order" : ""}.\n\n${a.text.replace(/^\d+\.\s*/, "")}`;
      const tries = await Promise.all(
        [0, 1, 2].map(() => claudeJSON({ model, effort: "low", maxTokens: 8000, schema: BlindSchema, messages: [{ role: "user", content: ask }] }).then((r) => norm(r.data.answer))),
      );
      const right = tries.filter((got) => (a.kind === "order" ? got.join("") === a.key.join("") : same(got, a.key))).length;
      return { id: a.q.id, part: a.part, right };
    }),
  );
}

const KeySchema = {
  type: "object",
  properties: {
    answers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          number: { type: "string" },
          answer: { type: "array", items: { type: "string" } },
          also_defensible: { type: "array", items: { type: "string" }, description: "other options a careful reader could defend as right" },
          note: { type: "string" },
        },
        required: ["number", "answer", "also_defensible", "note"],
      },
    },
    facts_ok: { type: "boolean" },
    facts_problem: { type: "string" },
    content_ok: { type: "boolean" },
    content_problem: { type: "string" },
  },
  required: ["answers", "facts_ok", "facts_problem", "content_ok", "content_problem"],
};

export async function keyTest(p) {
  const { text, answers } = render(p, { withSentences: true });
  const r = await geminiJSON({
    schema: KeySchema,
    prompt: `You are checking a reading passage and its questions for children in grades 2 to 5. Read the passage (sentences are numbered), then answer every question as a careful reader. For each, also list any other option that a careful reader could reasonably defend as right; leave it empty if none. For "pick two" give two letters; for "put in order" give all letters in order; for a sentence question give the sentence number.
Then say whether every fact in the passage is accurate (facts_ok; for a story, whether real-world facts in it are accurate), and whether the content is safe and neutral for young children (content_ok), with the problem if not.

PASSAGE: ${p.title}
${numbered(p)}

QUESTIONS
${text}`,
  });
  const per = answers.map((a) => {
    const got = r.answers.find((x) => String(x.number).replace(/[^0-9b]/gi, "").toLowerCase() === String(a.n).replace(".5", "b"))
      || r.answers.find((x) => Number.parseFloat(String(x.number)) === a.n && !/b/i.test(String(x.number)));
    const ans = norm(got && got.answer);
    let ok;
    if (a.kind === "order") ok = ans.join("") === a.key.join("");
    else if (a.kind === "sentence") ok = ans.length > 0 && ans.every((x) => a.key.includes(x));
    else ok = same(ans, a.key);
    const other = norm(got && got.also_defensible).filter((x) => !a.key.includes(x));
    return { id: a.q.id, part: a.part, ok: ok && (a.kind !== "pick" || other.length === 0), answer: ans, other, note: got ? got.note : "no answer" };
  });
  return { per, facts: r.facts_ok ? null : r.facts_problem, content: r.content_ok ? null : r.content_problem };
}

export async function review(p) {
  const lines = p.items.map((q, i) => {
    const o = (os, keys) => os.map((x, j) => `   ${keys.includes(j) ? "(right) " : ""}${x.text}${x.why ? `  [why line: ${x.why}]` : ""}`).join("\n");
    if (q.format === "two-part") return `${i + 1}. two-part\n  ${q.a.prompt}\n${o(q.a.options, [q.a.key])}\n  ${q.b.prompt}\n${o(q.b.options, [q.b.key])}`;
    if (q.format === "order") return `${i + 1}. put in order: ${q.prompt}\n   right order: ${q.steps.join(" / ")}\n   [why line: ${q.why}]`;
    if (q.format === "sentence") return `${i + 1}. find the sentence: ${q.prompt}\n   right: sentence ${q.keys.join(", ")}\n   [why line: ${q.why}]`;
    return `${i + 1}. ${q.format === "multi" ? "pick two" : "pick one"}: ${q.prompt}\n${o(q.options, q.keys || [q.key])}`;
  });
  const { data } = await claudeJSON({
    model: MODELS.reviewer,
    system: REVIEW_SYSTEM,
    schema: ReviewSchema,
    messages: [{ role: "user", content: `${p.type} passage, ${p.genre}, band ${p.band}: ${p.title}\n${numbered(p)}\n\nQUESTIONS (the app shuffles options)\n${lines.join("\n\n")}` }],
  });
  return data;
}

