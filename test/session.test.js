// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0
"use strict";
// Whole sessions in a browser, as a student plays them: start, eight
// questions answered right, right after a miss, and wrong twice; leaving and
// coming back mid-question and between questions; the end screen; and one
// session report, never two, since Compass awards XP from it.
//
// Needs Playwright's Chromium (CI installs it). Without it these tests skip.
const test = require("node:test");
const assert = require("node:assert");
const path = require("node:path");
const P = require("../prep.js");
const BANK = require("../bank/bank.js");
const { sessionRecord } = require("./fixtures/sessions.js");

let chromium = null;
try { chromium = require("playwright").chromium; } catch (e) { /* skipped below */ }
const skip = chromium ? false : "playwright is not installed";

const PICKER = "bb41aac7-6d24-4dcf-aae0-30203739a8fe";
const today = "2026-11-23";
const page = "file://" + path.resolve(__dirname, "../index.html");

function url(state, id) {
  const claims = Buffer.from(JSON.stringify({ student: { id, grade: 5 } })).toString("base64url");
  const q = new URLSearchParams({ compass_contract: "1", compass_today: today });
  if (state) q.set("compass_state", state);
  return page + "?" + q + "#compass_profile=x." + claims + ".y";
}

const reports = (p, kind) => p.$$eval(`script[data-compass-report][data-compass-kind="${kind}"]`, (s) => s.map((e) => JSON.parse(e.textContent)));
const visible = (p, id) => p.$eval("#" + id, (e) => !e.classList.contains("hidden"));
const step = (p, ms) => p.clock.runFor(ms);

async function current(p, rec) {
  // The question on screen, from the session the page last saved.
  const st = (await reports(p, "state"))[0];
  const r = st ? JSON.parse(st.data) : rec;
  const s = r.t;
  return P.findItem(BANK, s.steps[s.at].item);
}

/** Put the choice right for this item, from whatever is chosen now. */
async function answerRight(p, it) {
  if (it.format === "single" || it.format === "vocab") return p.locator("#ask .opt").nth(it.key).click();
  if (it.format === "multi") {
    for (const k of it.keys) if (!(await p.locator("#ask .opt").nth(k).evaluate((e) => e.classList.contains("sel")))) await p.locator("#ask .opt").nth(k).click();
    return;
  }
  if (it.format === "two-part") {
    for (const [n, part] of [[0, it.a], [1, it.b]]) {
      const o = p.locator("#ask .part").nth(n).locator(".opt").nth(part.key);
      if (!(await o.evaluate((e) => e.classList.contains("sel")))) await o.click();
    }
    return;
  }
  if (it.format === "sentence") return p.locator("#passage .s").nth(it.keys[0]).click();
  if (it.format === "order") {
    // Sort by the arrows, as a student would.
    for (let guard = 0; guard < 40; guard++) {
      const order = await p.$$eval(".order .t", (ts) => ts.map((t) => t.textContent));
      const idx = order.map((t) => it.steps.indexOf(t));
      const i = idx.findIndex((v, j) => j > 0 && idx[j - 1] > v);
      if (i < 0) return;
      await p.locator(".order li").nth(i).locator('button[aria-label="Move up"]').click();
    }
    throw new Error("could not sort " + it.id);
  }
}

/** Make a wrong answer ready, avoiding options already struck out. */
async function answerWrong(p, it, nth) {
  if (it.format === "single" || it.format === "vocab") {
    const n = it.options.length;
    return p.locator("#ask .opt").nth((it.key + nth) % n).click();
  }
  if (it.format === "multi") {
    const wrong = it.options.map((_, i) => i).filter((i) => it.keys.indexOf(i) < 0);
    // Keep exactly one key and one wrong option chosen.
    const sel = await p.$$eval("#ask .opt", (os) => os.map((o, i) => (o.classList.contains("sel") ? i : -1)).filter((i) => i >= 0));
    if (sel.indexOf(it.keys[0]) < 0) await p.locator("#ask .opt").nth(it.keys[0]).click();
    return p.locator("#ask .opt").nth(wrong[nth - 1]).click();
  }
  if (it.format === "two-part") {
    await p.locator("#ask .part").nth(0).locator(".opt").nth((it.a.key + nth) % it.a.options.length).click();
    return p.locator("#ask .part").nth(1).locator(".opt").nth(it.b.key).click();
  }
  if (it.format === "sentence") {
    const n = await p.locator("#passage .s").count();
    const wrong = [...Array(n).keys()].filter((i) => it.keys.indexOf(i) < 0);
    return p.locator("#passage .s").nth(wrong[nth - 1]).click();
  }
  // order: the starting order is never right, and a miss leaves it as it was
}

async function check(p) {
  assert.ok(await p.$eval("#check", (b) => !b.disabled && !b.classList.contains("hidden")), "Check ready");
  await p.click("#check");
}

/** After a first miss: tap the proof sentence when asked. */
async function afterMiss(p, it) {
  const fb = await p.textContent("#feedback");
  assert.match(fb, /Not quite/);
  if (/Tap the sentence/.test(fb)) {
    await p.locator("#passage .s").nth(it.evidence[0]).click();
    assert.match(await p.textContent("#feedback"), /Now answer again/);
  }
}

// What each question gets: 0 right first time, 1 right after a miss, 2 wrong twice.
const PLAN = [0, 1, 2, 0, 1, 0, 2, 1];

for (const band of ["b3", "b4", "b5"]) {
  test(`a whole session at ${band}: answers, leaving and coming back, one report`, { skip, timeout: 120000 }, async () => {
    const browser = await chromium.launch();
    try {
      const ctx = await browser.newContext({ viewport: { width: 1052, height: 646 } });
      const p = await ctx.newPage();
      await p.clock.install();
      const id = "student-" + band; // not the test account: once a day applies
      const rec = sessionRecord(band, today); // every format, an order question included
      await p.goto(url(JSON.stringify(rec), id));
      assert.ok(await visible(p, "intro"));
      await p.click("#start");

      for (let at = 0; at < 8; at++) {
        if (!(await visible(p, "question"))) await step(p, 3500); // a part's opening card
        assert.ok(await visible(p, "question"), "question " + (at + 1) + " shown");
        assert.match(await p.textContent(".progress-text"), new RegExp("Question " + (at + 1) + " of 8"));
        const it = await current(p, rec);

        if (at === 4) {
          // Leave between questions and come back: same question, nothing lost.
          const st = (await reports(p, "state"))[0].data;
          await p.goto(url(st, id));
          assert.match(await p.textContent("#intro-text"), /4 questions left/);
          await p.click("#start");
          if (!(await visible(p, "question"))) await step(p, 3500);
          assert.match(await p.textContent(".progress-text"), /Question 5 of 8/);
        }

        if (PLAN[at] === 0) {
          await answerRight(p, it);
          await check(p);
          assert.match(await p.textContent("#feedback"), /Right/);
        } else {
          await answerWrong(p, it, 1);
          await check(p);
          await afterMiss(p, it);
          if (at === 1) {
            // Leave right after a miss and come back: the miss still counts.
            const st = (await reports(p, "state"))[0].data;
            await p.goto(url(st, id));
            await p.click("#start");
            if (!(await visible(p, "question"))) await step(p, 3500);
            assert.match(await p.textContent("#feedback"), /tried this one before/);
          }
          if (PLAN[at] === 1) {
            await answerRight(p, it);
            await check(p);
            assert.match(await p.textContent("#feedback"), /Right/);
          } else {
            await answerWrong(p, it, 2);
            await check(p);
            assert.match(await p.textContent("#feedback"), /right answer/);
          }
        }
        await step(p, 6500); // on to the next by itself
      }

      assert.ok(await visible(p, "finished"), "end screen");
      const parts = await reports(p, "part");
      assert.strictEqual(parts.length, 1, "one session report");
      const r = parts[0];
      assert.strictEqual(r.items.length, 8);
      assert.ok(r.items.some((x) => x.format === "order"), "an order question was played");
      assert.deepStrictEqual(r.items.map((x) => x.correct), PLAN.map((v) => v === 0));
      assert.deepStrictEqual(r.items.map((x) => x.rightAfterCorrection), PLAN.map((v) => v === 1));
      assert.strictEqual(r.correct, PLAN.filter((v) => v !== 2).length);
      assert.strictEqual(r.wrong, PLAN.filter((v) => v === 2).length);
      for (const x of r.items) assert.ok(!("xp" in x));
      assert.ok(!("xp" in r), "the app never sends XP");

      // Opening again the same day: the end screen, and no second report.
      const st = (await reports(p, "state"))[0].data;
      await p.goto(url(st, id));
      assert.ok(await visible(p, "finished"));
      assert.strictEqual((await reports(p, "part")).length, 0);
      await ctx.close();
    } finally {
      await browser.close();
    }
  });
}

test("the level row switches the test account to that level", { skip }, async () => {
  const browser = await chromium.launch();
  try {
    const p = await browser.newPage({ viewport: { width: 1052, height: 646 } });
    await p.goto(url(null, PICKER));
    await p.click('#levels button:has-text("Harder")');
    assert.ok(await visible(p, "intro"));
    assert.strictEqual(await p.getAttribute('#levels button:has-text("Harder")', "aria-pressed"), "true");
  } finally {
    await browser.close();
  }
});

// Issue 15: the proof step after a miss could be passed by tapping every
// sentence. Now the second wrong tap marks the paragraph, leaving does not
// skip the step, and the report says how many wrong taps it took.
test("tapping every sentence after a miss: the paragraph is marked, the count is reported", { skip, timeout: 60000 }, async () => {
  const browser = await chromium.launch();
  try {
    const p = await browser.newPage({ viewport: { width: 1194, height: 834 } });
    await p.clock.install();
    const id = "student-proof";
    const rec = sessionRecord("b4", today);
    await p.goto(url(JSON.stringify(rec), id));
    await p.click("#start");
    await step(p, 3500);
    const it = await current(p, rec);
    assert.ok(it.evidence && it.evidence.length, "the first question asks for proof after a miss");
    const passage = P.findPassage(BANK, rec.t.steps[0].passage);
    const marked = P.proofParagraph(it, passage);
    const hinted = () => p.$$eval("#passage p.proof-hint", (ps) => ps.map((e) => Number(e.dataset.p)));

    await answerWrong(p, it, 1);
    await check(p);
    assert.match(await p.textContent("#feedback"), /Tap the sentence/);

    // Tap from the bottom of the passage up, skipping nothing.
    const n = await p.locator("#passage .s").count();
    let wrong = 0;
    for (let i = n - 1; i >= 0; i--) {
      await p.locator("#passage .s").nth(i).click();
      if (it.evidence.indexOf(i) >= 0) break;
      wrong++;
      if (wrong === 1) {
        assert.deepStrictEqual(await hinted(), [], "nothing is marked after one wrong tap");
        assert.match(await p.textContent("#feedback"), /Not that one\. Look for/);
      }
      if (wrong === 2) {
        assert.deepStrictEqual(await hinted(), [marked], "the second wrong tap marks the proof's paragraph");
        assert.match(await p.textContent("#feedback"), /marked paragraph/);
        // Leave now and come back: still the proof step, still marked, count kept.
        const st = (await reports(p, "state"))[0].data;
        assert.strictEqual(JSON.parse(st).t.pending.proofTaps, 2);
        await p.goto(url(st, id));
        await p.click("#start");
        if (!(await visible(p, "question"))) await step(p, 3500);
        assert.match(await p.textContent("#feedback"), /tried this one before\. Tap the sentence/);
        assert.deepStrictEqual(await hinted(), [marked]);
        assert.ok(await p.$eval("#check", (b) => b.disabled), "no answering again before the proof is found");
      }
    }
    assert.ok(wrong >= 2, "the sweep passed the mark and the reload");
    assert.match(await p.textContent("#feedback"), /Now answer again/);
    assert.deepStrictEqual(await hinted(), [], "the mark goes once the proof is found");

    // Finish the session right, then read the report.
    await answerRight(p, it);
    await check(p);
    for (let at = 1; at < 8; at++) {
      await step(p, 3500);
      if (!(await visible(p, "question"))) await step(p, 3500);
      const q = await current(p, rec);
      await answerRight(p, q);
      await check(p);
    }
    await step(p, 2000);
    assert.ok(await visible(p, "finished"));
    const items = (await reports(p, "part"))[0].items;
    assert.strictEqual(items[0].proofTaps, wrong);
    assert.strictEqual(items[0].rightAfterCorrection, true);
    for (const x of items.slice(1)) assert.ok(!("proofTaps" in x), "no count on a question without the proof step");
  } finally {
    await browser.close();
  }
});

// The end screen says only what is true wherever the app was opened from:
// on a subject's last step, or opened alone from the Tests page, nothing
// comes next, so the button is "Close" and never promises a next step. The
// test account has no once-a-day limit, so it is not told "that's it for today".
test("the end screen promises nothing that may not come", { skip }, async () => {
  const browser = await chromium.launch();
  try {
    // The app's view inside Compass on the owner's iPad.
    const ctx = await browser.newContext({ viewport: { width: 1052, height: 646 }, deviceScaleFactor: 2 });
    const p = await ctx.newPage();
    const ending = async () => ({
      text: (await p.innerText("#finished")).replace(/\s+/g, " ").trim(),
      button: (await p.textContent("#continue")).trim(),
    });

    // Someone with the once-a-day limit, back after today's session.
    const done = Object.assign(P.newRecord(), { d: today });
    await p.goto(url(JSON.stringify(done), "someone"));
    let e = await ending();
    assert.match(e.text, /That's it for today/);
    assert.strictEqual(e.button, "Close");
    await p.click("#continue");
    assert.doesNotMatch((await ending()).button, /next/i);

    // The test account plays a whole session, all right: no daily limit, so no "for today".
    await p.clock.install();
    const rec = sessionRecord("b4", today);
    await p.goto(url(JSON.stringify(rec), PICKER));
    await p.click("#start");
    for (let at = 0; at < 8; at++) {
      if (!(await visible(p, "question"))) await step(p, 3500);
      await answerRight(p, await current(p, rec));
      await check(p);
      await step(p, 6500);
    }
    assert.ok(await visible(p, "finished"), "end screen");
    if (process.env.SHOTS) await p.screenshot({ path: path.join(process.env.SHOTS, "end-screen-test-account.png") });
    e = await ending();
    assert.doesNotMatch(e.text, /for today|another day/);
    assert.strictEqual(e.button, "Close");
    await p.click("#continue");
    assert.doesNotMatch((await ending()).button, /next/i);
    await ctx.close();
  } finally {
    await browser.close();
  }
});
