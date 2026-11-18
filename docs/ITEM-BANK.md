# The question bank

Every passage and question is written for this app. No test company's items are copied, paraphrased or given to a writer as a model; the writer gets only the format and the skill.

## Shape

The bank is data in the repository, versioned, built ahead of time and never written live. A passage has an id, `type` (literary or informational), `genre`, `title`, `band`, its measured level, interest `topics` (ids from the Compass topic map) and `paragraphs` of sentences; a question points at sentences by index. Each wrong option carries the trap it is built on and the one line a student reads after picking it:

- true, but does not answer the question
- a detail posing as the main idea
- a literal reading where the question needs an inference
- a word lifted from the passage that sounds right
- too broad or too narrow
- the opposite of what the text says
- not in the text

Each passage has five questions in at least three formats, at least three of them pick-one, so a new student's first session still has three per passage. Passages are 100 to 250 words; about half literary (a poem about one time in five) and half informational. A passage is written backward from its questions: a theme question needs a theme that is shown and never stated; a main idea question needs a vivid detail that is not the main idea.

## Size

First build: grades 2 to 5, three bands around a fifth grader (b3 to b5), 36 passages per band (18 of each type) and 40 vocabulary questions per band. At two sessions a week a student reads a band's passages for about 18 weeks before any repeats. Lower and higher bands follow, then the grades 6 and up bank.

## Checks before a question is used

1. **Rules.** Every passage and question is checked against the shape above (`tools/lib/validate.js`): five questions, at least three pick-one, at least three formats, every quote a real sentence, every wrong option with its trap line, and no right answer that gives itself away by being much the longest.
2. **Level.** The passage is measured with the Compass reading-level measure and must fall inside its band, give or take 30. The writer is told the band's sentence length and word mix before it writes, and gets the measure's advice when it misses.
3. **Blind test.** Each question is shown on its own, without the passage, its title or the other questions, to a small model three times. A question it gets right all three times can be answered without reading. A passage may keep one such question, because even a small model is far more test-wise than a child and a theme or main idea question is the hardest to hide; two or more and it is rewritten.
4. **Key test.** A model from a different family answers every question with the passage. It must pick the key and find no other option defensible. It also checks the facts (for nonfiction, every fact) and that the content is safe and neutral for children.
5. **Review.** A fresh reviewer reads every passage and question cold: one clearly right answer, needs the passage, no giveaway, clear wording, kind and true trap lines, accurate and safe content.
6. **Owner.** The owner plays full sessions before any student sees a band.

A passage that fails a check is rewritten up to twice with the problems named, and checked again from the start; a slot that still fails gets one fresh passage. Vocabulary questions have no blind test (the sentences are part of the question) and get the rules and the key test.

## Building the bank

The pipeline lives in `tools/` (Node, plus Go for the level measure, which needs a `compass-lab` checkout beside this repository). It needs `EVAL_ANTHROPIC_API_KEY` (or `ANTHROPIC_API_KEY`) and `GEMINI_API_KEY` in the environment.

```
cd tools && npm ci && cd ..
sh tools/run-band.sh b4          # write, check, retry rejected slots, top up vocabulary
node tools/build.mjs b3 b4 b5    # accepted work becomes bank/bank.js, options shuffled
node --test test/*.test.js
```

Passages can also be written by hand (or by Claude in a working thread) instead of by the writer model, which costs far less. `node tools/add.mjs b5 drafts.json` checks them against the same rules and level measure, and `node tools/check.mjs b5 --cheap` runs the blind and key tests without the review model and its rewrites. A rejected passage is fixed by hand and added again.

Work files (`tools/work/`) are not committed; `bank/bank.js` is. Which passages a band gets (kind, genre, topic and the five questions' formats and skills) is fixed by `tools/lib/plan.mjs`, so a rerun picks up where it stopped. Topics come from the Compass topic map, leaving out brands, franchises, living public figures and subjects that are not neutral for children.

## After launch

From the session records: drop or fix questions nearly everyone gets right first time, questions strong readers miss more often than weak ones, and wrong options nobody picks.
