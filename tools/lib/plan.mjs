// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0

// What to write for a band: a fixed list of passage slots, each with its kind
// of text, a topic from the Compass topic map and the five questions it must
// carry (format, area, skill). The same band always gives the same list, so a
// rerun picks up where it stopped.

import { readFileSync } from "node:fs";

const topics = JSON.parse(readFileSync(new URL("../topics.json", import.meta.url))).roots;

// Topics a passage is not written about: brands and franchises we may not
// use, living or current public figures, and subjects that are not neutral
// for a child's practice test.
const EXCLUDE = new Set([
  "minecraft", "pokemon", "roblox", "fortnite", "mario", "star-wars", "harry-potter", "lego-technic", "superheroes", "manga", "anime-drawing",
  "lionel-messi", "cristiano-ronaldo", "nba", "wnba", "nfl", "super-bowl", "mlb", "formula-1", "nascar", "world-cup",
  "chatbots", "smartphones", "us-presidents", "christopher-columbus", "christmas", "halloween", "world-war-i", "world-war-ii", "gladiators",
  "civil-rights-movement", "american-revolution", "ufos", "scratch-coding", "dragons", "mythical-creatures",
]);

export const BANDS = { b3: [701, 850], b4: [851, 1000], b5: [1001, 1150] };

// The test's grade 2 to 5 version, by band: the reader we write for.
const READER = { b3: "a third grader", b4: "a fourth or fifth grader", b5: "a strong fifth grader" };

const LIT_GENRES = ["story", "story", "fable", "story", "poem", "story", "story", "fable", "story", "poem", "story", "story", "story", "poem", "story", "fable", "story", "poem"];
const INFO_GENRES = ["article", "article", "biography", "how-it-works", "article", "history", "article", "how-it-works", "article", "biography", "article", "history", "article", "how-it-works", "article", "history", "article", "biography"];

// The two formats besides the three pick-one questions, in turn.
const LIT_EXTRA = [["sentence", "two-part"], ["order", "multi"], ["two-part", "sentence"], ["multi", "order"], ["sentence", "multi"], ["two-part", "order"]];
const POEM_EXTRA = [["sentence", "two-part"], ["multi", "sentence"], ["two-part", "multi"]];
const INFO_EXTRA = [["multi", "sentence"], ["order", "two-part"], ["sentence", "multi"], ["two-part", "order"], ["multi", "two-part"], ["sentence", "order"]];

const LIT_SKILLS = [
  ["literary-key-ideas", "theme"], ["literary-key-ideas", "character"], ["literary-craft", "point-of-view"], ["literary-key-ideas", "setting"],
  ["literary-craft", "figurative-language"], ["literary-key-ideas", "plot"], ["literary-craft", "structure"],
];
const POEM_SKILLS = [["literary-craft", "figurative-language"], ["literary-key-ideas", "theme"], ["literary-craft", "structure"], ["literary-craft", "point-of-view"], ["literary-key-ideas", "character"]];
const INFO_SKILLS = [
  ["informational-key-ideas", "main-idea"], ["informational-key-ideas", "key-details"], ["informational-craft", "author-purpose"],
  ["informational-key-ideas", "cause-effect"], ["informational-craft", "text-structure"], ["informational-craft", "evidence"], ["informational-key-ideas", "sequence"],
];

function topicList() {
  // Round robin over the subject areas, so a band covers them all evenly.
  const roots = Object.keys(topics).map((r) => topics[r].filter((t) => !EXCLUDE.has(t.id)));
  const out = [];
  for (let i = 0; out.length < 400; i++) {
    for (const list of roots) if (list.length) out.push(list[(i * 7) % list.length]);
  }
  return out;
}

function questions(type, genre, extra, n) {
  const skills = genre === "poem" ? POEM_SKILLS : type === "literary" ? LIT_SKILLS : INFO_SKILLS;
  const big = type === "literary" ? ["literary-key-ideas", "theme"] : ["informational-key-ideas", "main-idea"];
  const orderSkill = type === "literary" ? ["literary-key-ideas", "plot"] : ["informational-key-ideas", "sequence"];
  // Every passage opens with its theme or main idea, the skill the test asks most.
  const out = [{ format: "single", area: big[0], skill: big[1] }];
  const used = new Set([big[1]]);
  let s = n * 3;
  for (const f of ["single", "single", ...extra]) {
    let pick;
    if (f === "order") pick = orderSkill;
    else {
      do pick = skills[s++ % skills.length];
      while (used.has(pick[1]) || (pick[1] === orderSkill[1] && (extra.includes("order") || f === "multi")));
    }
    used.add(pick[1]);
    out.push({ format: f, area: pick[0], skill: pick[1] });
  }
  return out;
}

/** The passage slots for a band: `count` of each type. */
export function slots(band, count = 18) {
  if (!BANDS[band]) throw new Error("unknown band " + band);
  const all = topicList();
  const offset = { b3: 0, b4: 40, b5: 80 }[band];
  const out = [];
  for (let i = 0; i < count; i++) {
    for (const type of ["literary", "informational"]) {
      const n = out.length;
      const genre = (type === "literary" ? LIT_GENRES : INFO_GENRES)[i % 18];
      const extra = genre === "poem" ? POEM_EXTRA[i % 3] : (type === "literary" ? LIT_EXTRA : INFO_EXTRA)[i % 6];
      const topic = all[offset + n];
      out.push({
        id: `${band}-${type === "literary" ? "l" : "i"}${String(i + 1).padStart(2, "0")}`,
        band,
        type,
        genre,
        topic: topic.label,
        topics: topic.chain,
        reader: READER[band],
        range: BANDS[band],
        questions: questions(type, genre, extra, n),
      });
    }
  }
  return out;
}
