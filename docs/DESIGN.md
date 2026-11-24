# Reading Test Prep: design

Short, honest practice with the kinds of questions a standardized reading test asks, so a student's score shows how well they read and not how well they handle an unfamiliar format. It runs inside Compass, before the reading app on scheduled days. Pictures of a full session: [one full session](https://claude.ai/artifact/XkkLDSFS4sfR7QBpeBfx4r) (owner-only page).

## What must stay true

- **Separate from the reading app.** Its own look (warm paper, a printed-page serif, one teal), no character, no chat, no read-aloud. It never mentions the reading app and the reading app never mentions it.
- **Short and fixed.** 8 questions that count, about 8 minutes. One path: no menu, no skip, no "I don't know". A longer session is never the answer; more days are, through the Compass schedule.
- **Honest, in few words.** The first screen is the title, "8 questions. There's no timer." and Start. Fewer words and fewer clicks for the student throughout.
- **Go back to the text.** No timer. An answer faster than the passage could be read is checked like any other and marked for guides; a right answer is never held back.
- **Every miss is corrected and acted on.** One plain line names the trap the wrong answer fell into, the wrong answer is crossed out, the student taps the sentence that proves the right answer, then answers again. A second miss shows the right answer with its reason. Only the first try counts toward the student's record.
- **No overall score for the student.** Right or wrong per question, and a progress bar with one mark per question, grouped by part, above "Question 3 of 8". Guides see the detail.
- **Every new text is announced.** Before each part a short card names it ("New article" and its title, or "Word questions") and moves on by itself after 3 seconds. Questions move on by themselves too: a second after a right answer, six seconds after a shown answer. Word questions fill one centred column.

## A session

1. Two passages, one literary (story, fable or poem) and one informational, 3 questions each, then 2 vocabulary questions on one or two sentences. Passages are chosen at the student's level band, preferring the student's interests from the Compass profile, never one already read until the band's passages run out.
2. Questions are chosen so the skills due back come first, formats are mixed, and they follow the order of the text.
3. New formats come in slowly: the first session uses only the two pick-one formats, and after that at most one new format joins per session. There is no worked-example screen (the owner cut it, 18 Nov): the student goes straight to the question, and a format that needs a word of how-to carries one short line on the question itself ("Pick 2.", "Tap a sentence in the passage.", "Use the arrows…").
4. The end screen ("Done. That's it for today.") is the Compass done signal. Compass then opens the reading app.

A student who has picked an answer must never have to hunt for the way on, and nothing may cover what they read or tap.

- Only the page scrolls, never a box inside it. Inside the Compass shell on an iPad, a box that scrolled on its own did not move under a finger, and a student was stuck with Check below the bottom of the screen.
- Check sits right under the answers and covers nothing. Picking an option scrolls the page just enough to show Check; after Check, it scrolls just enough to show what Check said. A tap in the passage or on an order arrow never moves the page under the student's finger.
- After a miss, the explanation stays while the student looks for the proof sentence; a wrong tap marks that sentence briefly where the finger is.
- After a second miss, the right answer and why are shown together where they fit; where they don't, the why comes first.
- On a wide screen the question column stays in view as the passage scrolls, while it fits on the screen. When a message makes it taller, it scrolls with the page instead, and the page moves so the column does not jump.
- `test/layout.test.js` checks one session at each level at iPad (inside Compass, and full screen), iPhone and laptop sizes: nothing scrolls inside the page, nothing tappable is covered, taps in the passage and on arrows don't move the page, Check is on screen once an option is picked, and the messages after Check, after a proof tap and after a second miss are on screen. `test/fixtures/sessions.js` puts every format, order included, in the tested session. `SHOTS=dir` saves the iPad screenshots to look at. `test/session.test.js` plays whole sessions: right, right after a miss, wrong twice, leaving and coming back, and exactly one session report.

If a session is interrupted, it resumes where it stopped the same day; it is saved after every question. A session from an earlier day is dropped, so missed days never pile up.

## Formats

| Format | The student | Trains |
| --- | --- | --- |
| Pick one | picks one of four | reading every option |
| What a word means | works out a word from one or two sentences, or from its parts | word meaning in context |
| Find the sentence | taps a sentence in the passage | finding evidence |
| Pick two | picks exactly two; Check stays off until two are picked | not stopping at the first right answer |
| Two-part | Part A an answer, Part B its proof | tying a conclusion to evidence |
| Put in order | moves events with arrows | sequence and structure |

## Difficulty and spacing

- Six level bands on the approximate Lexile scale. The start band comes from the reading level the reading app reports in the Compass profile, else from grade.
- After each session the band moves up at 95% or more right first time and down below 60%, aiming at about 80 to 85% first-try.
- A missed skill comes back next session, then a week later, then three weeks later; a miss starts it over.
- The staging Test Learner, and no one else, gets a small Level switch (Easier, Middle, Harder: the bands that have passages) in a slim row at the top of every screen but the end screen, and no once-a-day limit. A tap drops the unfinished session and starts a fresh one at that level, which stays the learner's level. This lets the owner judge each level's difficulty in one sitting; a real student's level moves only by results. The check is the learner id in the Compass profile (`Prep.canPickLevel`).

## What Compass gets

- One `part` report per finished session (`part: "session"`), with every question as an item: `id`, `skill` (`reading.<area>.<skill>`), `prompt`, the first `answer`, `correct` for the first try, `ms`, and extra fields `format`, `rightAfterCorrection` and `rapid`. Its `correct` and `wrong` count questions right by the end, after the second chance.
- A `state` report with the record (about 1.5 KB after a session, at most about 3 KB with a year of passages read): band, formats taught, skills due back, the last 120 passages read, today's unfinished session including a missed first try, so leaving after a miss does not erase it. A student who finished today gets the end screen again on reopening.
- A `mastery` report at every save, so a visit stopped partway still updates the chart.
- The `mastery` chart, "Reading test practice": every skill, grouped the way score reports group them. A skill is `mastered` only after right first tries on three different days with no miss since.
- XP comes from the registry entry: 8 per finished session, full at 85% right by the end, half at 70%, none below. The app never sends an XP number.

The app has no server, no accounts and no storage of its own, like Spell. It scales with static hosting: the repository is private and the page is served by Vercel from `main` (decided 17 Nov), with no build step.

## Skill names

Shared with the reading app so guides see both in the same terms (compass-lab issue 403). Areas: `literary-key-ideas`, `literary-craft`, `informational-key-ideas`, `informational-craft`, `vocabulary`. The names shown for areas live in one table in `prep.js` and can be renamed to match a school's score report without changing ids.

## Not yet decided or built

- The rest of the question bank (docs/ITEM-BANK.md). Built so far: the grades 4 to 5 band (b4), 26 passages (16 stories, fables and poems, 10 nonfiction) and 40 vocabulary questions, every one through all the checks. Next: the rest of b4, then b3 and b5, after the owner has played sessions.
- A guide view of first-try accuracy by area with at least 10 answers per area; today guides get the mastery chart and the session record.
- Two levels of the test exist (grades 2 to 5, and 6 and up). The first bank targets grades 2 to 5.
