# Reading Test Prep

A first-party Compass app: short practice with reading test question formats. Read [docs/DESIGN.md](docs/DESIGN.md) before changing what a student sees, and [docs/ITEM-BANK.md](docs/ITEM-BANK.md) before adding questions.

- Test with `node --test test/*.test.js`. Write the test first.
- Every passage and question is our own. Never copy or paraphrase a test company's items, and never give one to a writer model as an example.
- Releasable files carry no real people's names, no competitors and no research references; give the reason instead.
- The app reports work; Compass applies the XP rate. Never send an XP number.
- Commit as `Claude <noreply@anthropic.com>` with a `Signed-off-by` trailer. Changes go through pull requests to `main`.
