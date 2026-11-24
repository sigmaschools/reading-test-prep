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
      const rec = Object.assign(P.newRecord(), { b: band, f: ["single", "vocab", "sentence", "multi", "two-part", "order"], n: 6 });
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
