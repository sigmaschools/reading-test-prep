# Reading Test Prep

Short practice with the kinds of questions a standardized reading test asks (pick one, pick two, two-part, find the sentence, put in order, what a word means), built for [Compass](https://github.com/sigmaschools) with its public app kit. It is a plain web page: no server, no accounts, no storage of its own.

- **8 questions, about 8 minutes**, on a story or poem, a nonfiction passage and two word questions. No timer, no score shown to the student.
- **Every miss is corrected and acted on**: the trap is named, the student taps the sentence that proves the right answer, then answers again. Only first tries count toward the record.
- **New kinds of question come in slowly**, at most one per session, with a one-line how-to on the question itself.
- **Difficulty** starts at the student's reading level and moves toward about 80 to 85% right first time; missed skills come back after one session, a week and three weeks.

The design: [docs/DESIGN.md](docs/DESIGN.md). The question bank: [docs/ITEM-BANK.md](docs/ITEM-BANK.md).

## Run it

```sh
compass app dev .            # the app beside a panel showing what Compass reads
node --test test/*.test.js   # the learning logic's tests
```

The logic is in `prep.js`, the page in `index.html`, `app.js` and `style.css`, the questions in `bank/`. `compass-app.js` is the Compass helper.

## Licence

Apache 2.0. See [LICENSE](LICENSE).
