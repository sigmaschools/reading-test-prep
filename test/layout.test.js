// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0
"use strict";
// What a student sees, checked in a browser at the screen sizes students use.
//
// Two bugs shaped these checks. First, Check sat below the bottom of a short
// iPad screen inside a box that scrolled on its own, and inside the Compass
// shell that box did not scroll, so the student was stuck. Then a fix pinned
// Check to the bottom edge, where it covered answers. So these tests ask:
// - nothing on the page scrolls except the page itself;
// - nothing a student can tap is covered by anything else;
// - after picking an answer, Check is fully on screen without scrolling;
// - after a miss, the same holds.
//
// SHOTS=dir saves a screenshot of every question at the iPad size, to look at.
// Needs Playwright's Chromium (CI installs it). Without it these tests skip.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const P = require("../prep.js");
const BANK = require("../bank/bank.js");

let chromium = null;
try { chromium = require("playwright").chromium; } catch (e) { /* skipped below */ }
const skip = chromium ? false : "playwright is not installed";

const PICKER = "bb41aac7-6d24-4dcf-aae0-30203739a8fe"; // the level switch shows for this account
const today = "2026-11-23";
const page = "file://" + path.resolve(__dirname, "../index.html");
const SHOTS = process.env.SHOTS || "";

// The iPad size is the app's view inside the Compass shell on the founder's
// iPad (measured from a screenshot: the shell's bar takes the top, and the
// page is drawn about 1.2 times larger than CSS pixels).
const IPAD = { name: "iPad in Compass", width: 1052, height: 646, scale: 2.45 };
const SCREENS = [
  IPAD,
  { name: "iPad portrait in Compass", width: 740, height: 980 },
  { name: "iPad full screen", width: 1194, height: 770 },
  { name: "iPhone landscape", width: 844, height: 340 },
  { name: "iPhone portrait", width: 390, height: 700 },
  { name: "laptop", width: 1280, height: 720 },
];

function url(record, id) {
  const claims = Buffer.from(JSON.stringify({ student: { id, grade: 5 } })).toString("base64url");
  const q = new URLSearchParams({ compass_contract: "1", compass_today: today, compass_state: JSON.stringify(record) });
  return page + "?" + q + "#compass_profile=x." + claims + ".y";
}

// Today's session with every format, saved as if the student had stopped before question `at`.
function recordAt(band, at) {
  const r = Object.assign(P.newRecord(), { b: band, f: ["single", "vocab", "sentence", "multi", "two-part", "order"], n: 6 });
  const s = P.plan(r, BANK, null, today);
  s.at = at;
  s.results = [];
  s.seen = [1, 2, 3];
  r.t = s;
  return r;
}

/** Elements other than the page that scroll: there must be none. */
function innerScrollers(p) {
  return p.evaluate(() => {
    const out = [];
    for (const e of document.querySelectorAll("body *")) {
      const oy = getComputedStyle(e).overflowY;
      if ((oy === "auto" || oy === "scroll") && e.scrollHeight > e.clientHeight + 1) out.push(e.id || e.className || e.tagName);
    }
    return out;
  });
}

/** Tappable things covered by something else, each checked after scrolling the page to it. */
function covered(p) {
  return p.evaluate(() => {
    const sel = ".opt:not([disabled]), #check:not(.hidden), #levels button, .order button, .tapping .s";
    const out = [];
    for (const e of document.querySelectorAll(sel)) {
      if (!e.offsetParent) continue;
      e.scrollIntoView({ block: "center" });
      // A sentence wraps over lines: check its first line's box.
      const r = e.getClientRects()[0];
      for (const [x, y] of [[r.left + 4, r.top + r.height / 2], [r.right - 4, r.top + r.height / 2], [r.left + r.width / 2, r.top + r.height / 2]]) {
        const hit = document.elementFromPoint(x, y);
        if (hit !== e && !e.contains(hit)) { out.push((e.id || e.textContent.slice(0, 30)) + " under " + (hit && (hit.id || hit.className || hit.tagName))); break; }
      }
    }
    window.scrollTo(0, 0);
    return out;
  });
}

/** Whether Check is fully on screen right now, without scrolling. */
function checkOnScreen(p) {
  return p.evaluate(() => {
    const b = document.getElementById("check");
    if (b.classList.contains("hidden")) return "hidden";
    const r = b.getBoundingClientRect();
    if (r.top < 0 || r.bottom > innerHeight) return "off screen: top " + Math.round(r.top) + " of " + innerHeight;
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return hit === b || b.contains(hit) ? "ok" : "covered by " + (hit && (hit.id || hit.className));
  });
}

/** Make an answer ready to check (wrong where the format allows), as a student would. */
async function pickAnswer(p, item) {
  if (item.format === "single" || item.format === "vocab") {
    await p.locator("#ask .opt").nth((item.key + 1) % item.options.length).click();
  } else if (item.format === "multi") {
    const wrong = item.options.map((_, i) => i).filter((i) => item.keys.indexOf(i) < 0);
    for (const i of [item.keys[0], wrong[0]]) await p.locator("#ask .opt").nth(i).click();
  } else if (item.format === "two-part") {
    await p.locator("#ask .part").nth(0).locator(".opt").nth((item.a.key + 1) % item.a.options.length).click();
    await p.locator("#ask .part").nth(1).locator(".opt").nth(item.b.key).click();
  } else if (item.format === "sentence") {
    const n = await p.locator("#passage .s").count();
    const wrong = [...Array(n).keys()].find((i) => item.keys.indexOf(i) < 0);
    await p.locator("#passage .s").nth(wrong).click();
  } else if (item.format === "order") {
    await p.locator(".order button").first().click();
  }
}

test("what a student sees: no inner scrolling, nothing covered, Check on screen after picking", { skip, timeout: 600000 }, async () => {
  const browser = await chromium.launch();
  if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });
  const problems = [];
  try {
    const bands = P.levels(BANK).map((l) => l.band);
    for (const screen of SCREENS) {
      const ctx = await browser.newContext({ viewport: { width: screen.width, height: screen.height }, deviceScaleFactor: SHOTS && screen === IPAD ? screen.scale : 1, colorScheme: "dark" });
      const p = await ctx.newPage();
      // The level switch shows only for the test account; check without it on two sizes.
      const ids = screen === IPAD || screen.name === "iPhone portrait" ? [PICKER, "someone-else"] : [PICKER];
      for (const id of ids) {
        for (const band of bands) {
          for (let at = 0; at < 8; at++) {
            const rec = recordAt(band, at);
            const item = P.findItem(BANK, rec.t.steps[at].item);
            await p.goto(url(rec, id));
            await p.click("#start");
            await p.waitForSelector("#question:not(.hidden)");
            const what = `${screen.name}, ${id === PICKER ? "with" : "without"} the level switch, ${band}, question ${at + 1} (${item.format})`;
            const say = (m) => problems.push(what + ": " + m);

            const inner = await innerScrollers(p);
            if (inner.length) say("scrolls inside " + inner.join(", "));
            for (const c of await covered(p)) say("covered: " + c);

            await pickAnswer(p, item);
            const after = await checkOnScreen(p);
            if (after !== "ok") say("after picking, Check " + after);
            if (SHOTS && screen === IPAD && id === PICKER) await p.screenshot({ path: path.join(SHOTS, `${band}-q${at + 1}-picked.png`) });

            await p.click("#check");
            const fb = await p.textContent("#feedback");
            // What Check said must be on screen without hunting for it.
            const fbSeen = await p.evaluate(() => {
              const r = document.getElementById("feedback").getBoundingClientRect();
              return r.top >= 0 && Math.min(r.bottom, r.top + 120) <= innerHeight;
            });
            if (!fbSeen) say("after Check, its message is off screen");
            if (!/Not quite|Right/.test(fb)) say("no feedback after Check: " + JSON.stringify(fb));
            if (/Not quite/.test(fb)) {
              if (SHOTS && screen === IPAD && id === PICKER) await p.screenshot({ path: path.join(SHOTS, `${band}-q${at + 1}-miss.png`) });
              for (const c of await covered(p)) say("after a miss, covered: " + c);
              const inner2 = await innerScrollers(p);
              if (inner2.length) say("after a miss, scrolls inside " + inner2.join(", "));
            }
          }
        }
      }
      await ctx.close();
    }
  } finally {
    await browser.close();
  }
  assert.deepStrictEqual(problems.slice(0, 40), [], problems.length + " problems");
});
