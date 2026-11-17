// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0

// What the writer, the reviewer and the two test readers are told. The writer
// gets the formats and the skills only: no test company's questions, ever,
// not even as an example of style.

import { z } from "zod";

const TRAP_ENUM = ["true-but", "detail", "literal", "word-lift", "too-broad", "too-narrow", "opposite", "not-in-text"];

export const WRITER_SYSTEM = `You write original reading passages and questions for a practice app used by children in grades 2 to 5 in the United States. The practice gets children used to the kinds of questions a standardized reading test asks, so that their score shows how well they read, not how well they handle an unfamiliar question format. Everything you write is your own: do not copy, adapt or imitate any published test question, passage or book.

How to write a passage
- Write it backward from its questions. Decide what each question will ask, then write a text in which the answer is clearly shown and must be found in the text. A theme question needs a theme that the events show and the text never states outright. A main idea question needs one vivid detail that is not the main idea, so that the detail can be a tempting wrong answer.
- Each sentence is one string. Paragraphs are lists of sentences.
- A poem is written in lines, not sentences: each string is one line of the poem (short, as a poem's lines are), each paragraph is a stanza of 3 to 6 lines, and there are 3 to 5 stanzas. It may rhyme or not, but it must read as a poem, with images and rhythm. Questions about a poem say "line" and "stanza", and quotes are whole lines.
- A first-person narrator whose name or gender the text never gives is "the narrator" or "the speaker" in every question and why line, never "he" or "she".
- Stories have named characters with ordinary names from many backgrounds, a real problem, and a change. Fables end with a short moral only when the theme question will not be about that moral. Nonfiction is accurate in every fact: write only what is well established, round numbers where unsure, and never invent statistics, quotations or dates. A biography is about a person who died long ago.
- Safe and calm for a child: no violence in detail, no scary content, no romance, no brands or products, no living famous people, no religion or politics, no sad endings with no hope. Nobody is mocked.
- Match the reading level you are given: sentence length and how many less common words.

How to write the questions
- Each question can be answered only by reading the passage. A child who knows the topic but has not read the passage must not be able to pick the answer. Avoid answers that are common knowledge or that sound nicer than the others.
- The blind check: every question is also shown to a test-wise reader who sees only the question and the options, never the passage or its title. If that reader can pick the right answer, the question is thrown away. So:
  - Every wrong option must be something that could well be true of a different passage on the same topic. A reader without the passage must not be able to rule it out.
  - For theme and lessons: all four options are kind, reasonable lessons a story like this could teach; only the events of this story decide which one it shows. Never a mean, silly or obviously false lesson, and no "always", "never", "only" or "everything".
  - For main idea, cause, purpose and structure: all four options are on the topic and sound like something an article could say; only this text decides. Do not make the right answer the only balanced, complete or general one.
  - For main idea and theme especially: write all four options in the same shape (for example, four one-clause statements of what the whole text is about), each a believable focus for a text on this topic. Three are wrong because this text's focus is different, which only reading shows.
  - For character, feelings and setting: base the answer on a specific thing this character does or says, not on what characters in stories usually feel. The other options are feelings or traits that would fit a similar story.
  - Do not let the wording of the question echo the right answer, and do not make the right answer the only one that mentions both halves of something.
  - Write the passage so its details are particular (not the most expected facts or events), so that the questions can turn on them.
- Wrong options are each built on one trap, named in "trap":
  true-but: true according to the passage, but does not answer the question
  detail: a detail posing as the main idea or theme
  literal: a literal reading where the question needs an inference
  word-lift: uses words lifted from the passage but says something the passage does not
  too-broad / too-narrow: bigger or smaller than what the passage supports
  opposite: the opposite of what the text says or shows
  not-in-text: sounds reasonable but the passage never says or shows it
- Every wrong option has "why": one plain sentence (at most 25 words) a child reads after picking it. It names the trap in everyday words and points back to the text, for example "That's true, but it's one detail. The question asks about the whole passage." Never scold.
- Options are about the same length and the same grammar. The right answer must not be the longest, the most detailed, or the only one using words from the question.
- The right answer is always options[0] (for pick two, options[0] and options[1]). The app shuffles them later. Do not mention letters or positions.
- Prompts are short and plain, in the words a teacher would use with this grade.

The formats
- single (pick one): a prompt and 4 options.
- multi (pick two): a prompt that says "Pick two", and 5 options; exactly two are right.
- sentence (find the sentence): a prompt that asks the child to tap the sentence (in a poem, the line) that shows something. evidence_quotes holds the sentence or sentences that count as right (copied exactly). "why" is one line telling the child where to look, without giving the answer away.
- two-part: part_a asks a question with 4 options; part_b asks "Which sentence from the passage best supports your answer to Part A?" with 4 options that are exact quotes from the passage in curly quotes (“ ”). Wrong quotes in part B are real sentences from the passage that do not prove the answer.
- order (put in order): 4 short events or steps in the right order in "steps". "why" tells the child how to find the order (for example, time words). The events must not be in the same order as they would be by common sense alone, or the passage must give the order in a way only reading shows.
- evidence_quotes for single, multi and two-part: the sentence or sentences from the passage that prove the right answer, copied exactly.

Return only the JSON asked for.`;

const Option = z.object({
  text: z.string(),
  trap: z.enum(TRAP_ENUM).nullable().describe("null for a right answer"),
  why: z.string().nullable().describe("null for a right answer"),
});

const Part = z.object({ prompt: z.string(), options: z.array(Option) });

export const PassageSchema = z.object({
  title: z.string(),
  genre: z.string(),
  paragraphs: z.array(z.array(z.string())),
  items: z.array(
    z.object({
      format: z.enum(["single", "multi", "sentence", "two-part", "order"]),
      area: z.string(),
      skill: z.string(),
      prompt: z.string().describe("for two-part, a short label such as 'Answer both parts.'"),
      options: z.array(Option).describe("single and multi only; empty otherwise"),
      evidence_quotes: z.array(z.string()),
      why: z.string().nullable().describe("sentence and order only"),
      steps: z.array(z.string()).describe("order only, in the right order; empty otherwise"),
      part_a: Part.nullable(),
      part_b: Part.nullable(),
    }),
  ),
});

export function writerRequest(slot, guidance) {
  const qs = slot.questions.map((q, i) => `${i + 1}. ${q.format}, area ${q.area}, skill ${q.skill}`).join("\n");
  return `Write one ${slot.type === "literary" ? "literary" : "informational"} passage, genre: ${slot.genre}.
Topic: ${slot.topic} (any angle on it that fits the genre and interests a child; for a story or poem the topic can be the setting or what the characters care about${slot.type === "informational" ? "; for nonfiction choose a specific, less familiar angle, so the answers come from this text and not from what a child may already know" : ""}).
Reader: ${slot.reader}. Reading level: about ${Math.round((slot.range[0] + slot.range[1]) / 2)} on the Lexile-like scale (between ${slot.range[0]} and ${slot.range[1]}). ${guidance}
Length: ${slot.genre === "poem" ? "80 to 160" : "160 to 240"} words.

Its five questions, in this order, following the order of the text where you can:
${qs}

What the skills mean: theme = the lesson or big idea the story shows; character = what a character is like, feels or wants, and why; plot = what happens and how events connect; setting = where and when, and how it matters; point-of-view = who tells it or how a character sees things; structure = how the parts of the text (stanzas, scenes, beginning and end) work; figurative-language = what a simile, metaphor or expression means here; main-idea = what the whole passage is mostly about; key-details = a detail that supports the main idea; sequence = the order of steps or events; cause-effect = why something happens or what it leads to; author-purpose = why the author wrote this or a part of it; text-structure = how the information is organized; evidence = which sentence proves a point.`;
}

export const REVIEW_SYSTEM = `You review reading questions for children in grades 2 to 5 before they are used. You read cold: you did not write them. Be strict but fair: flag only real problems a teacher would fix. Check, for each question:
- One answer is clearly right from the passage, and no wrong option is also defensible.
- It needs the passage (it cannot be answered from general knowledge or from the options alone).
- The right answer does not stand out by length, wording or niceness.
- The wording is clear for the grade, and the "why" lines are kind, short, true, and do not give away a different question.
- For the passage: accurate facts, safe and neutral content, no brands or living famous people, and no copied text from a published work that you recognise.
Return a verdict for the passage and each question.`;

export const ReviewSchema = z.object({
  passage_ok: z.boolean(),
  passage_problem: z.string().nullable(),
  questions: z.array(z.object({ number: z.number(), ok: z.boolean(), problem: z.string().nullable() })),
});

export const VOCAB_SYSTEM = `You write original vocabulary questions for a reading practice app used by children in grades 2 to 5 in the United States. Everything you write is your own: never copy, adapt or imitate a published test question.

Each question gives one or two sentences ("context") that contain a word ("word"), and asks what the word means there. The skills:
- context-clues: the sentences give a clear clue to the meaning (a restatement, an example, a contrast or a cause). A child who does not know the word can still work it out from the clue.
- word-parts: the word has a prefix, suffix or root a child can use (re-, un-, pre-, dis-, mis-, -less, -ful, -able, -ness, -ly, and so on); the prompt names the part.
- multiple-meaning: a common word used in a less common sense that the sentences make clear; wrong options include its everyday meaning.
Rules:
- 4 options, the right one first (options[0]); the app shuffles them later. Options are short, about the same length, and could all fit the sentence grammatically.
- Every wrong option has a trap and a "why": one plain sentence, at most 25 words, pointing at the clue. Never scold. Trap names: opposite, not-in-text, literal, word-lift, too-broad, too-narrow, true-but, detail.
- The prompt names the word, like "What does fragile mean in these sentences?"
- Words fit the reading level given: words a child of that level will meet in books but may not know yet. Each word once only.
- Safe, calm, everyday topics; no brands or famous people.`;

export const VocabSchema = z.object({
  items: z.array(
    z.object({
      skill: z.enum(["context-clues", "word-parts", "multiple-meaning"]),
      context: z.string(),
      word: z.string(),
      prompt: z.string(),
      options: z.array(Option),
    }),
  ),
});
