// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0
"use strict";
// The Check button must be on screen, and not covered, on every question at
// every screen size a student uses. A word question once put it below the
// bottom of a short iPad screen, inside a box that scrolled only where the
// text was, so a student could pick an answer and have no way on.
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

const PICKER = "bb41aac7-6d24-4dcf-aae0-30203739a8fe"; // the level switch shows for this account
const today = "2026-11-23";
const page = "file://" + path.resolve(__dirname, "../index.html");

// Screens a student might have: iPad in a window and full, iPhone both ways, a laptop.
const SCREENS = [
  { name: "iPad, short window", width: 1052, height: 600 },
  { name: "iPad landscape", width: 1194, height: 760 },
  { name: "iPad portrait", width: 834, height: 1100 },
  { name: "iPhone landscape", width: 844, height: 340 },
  { name: "iPhone portrait", width: 390, height: 700 },
  { name: "laptop", width: 1280, height: 720 },
];

function url(record, id) {
  const claims = Buffer.from(JSON.stringify({ student: { id, grade: 5 } })).toString("base64url");
  const q = new URLSearchParams({ compass_contract: "1", compass_today: today, compass_state: JSON.stringify(record) });
  return page + "?" + q + "#compass_profile=x." + claims + ".y";
}

// Today's session, saved as if the student had stopped before question `at`.
function recordAt(band, at) {
  const r = Object.assign(P.newRecord(), { b: band, f: ["single", "vocab", "sentence", "multi", "two-part", "order"], n: 6 });
  const s = P.plan(r, BANK, null, today);
  s.at = at;
  s.results = s.results || [];
  s.seen = [1, 2, 3];
  r.t = s;
  return r;
}

async function checkIsReachable(p) {
  return p.evaluate(() => {
    const b = document.getElementById("check");
    if (b.classList.contains("hidden")) return "hidden";
    const r = b.getBoundingClientRect();
    if (r.top < 0 || r.bottom > innerHeight || r.left < 0 || r.right > innerWidth) {
      return "off screen: " + JSON.stringify({ top: r.top, bottom: r.bottom, h: innerHeight });
    }
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    if (hit !== b && !b.contains(hit)) return "covered by " + (hit && (hit.id || hit.className || hit.tagName));
    return "ok";
  });
}

test("the Check button is on screen and uncovered for every question", { skip }, async () => {
  const browser = await chromium.launch();
  try {
    const bands = P.levels(BANK).map((l) => l.band);
    for (const screen of SCREENS) {
      const ctx = await browser.newContext({ viewport: { width: screen.width, height: screen.height } });
      const p = await ctx.newPage();
      for (const id of [PICKER, "someone-else"]) {
        for (const band of bands) {
          for (let at = 0; at < 8; at++) {
            await p.goto(url(recordAt(band, at), id));
            await p.click("#start");
            await p.waitForSelector("#question:not(.hidden)");
            // On a phone the passage comes first and the page scrolls down to the
            // question; on a wider screen nothing should need scrolling.
            if (screen.width <= 760) await p.evaluate(() => document.getElementById("ask").scrollIntoView({ block: "start" }));
            const where = await p.textContent(".progress-text");
            const got = await checkIsReachable(p);
            assert.strictEqual(got, "ok", `${screen.name}, ${id === PICKER ? "with" : "without"} the level switch, ${band}: ${where}`);
          }
        }
      }
      await ctx.close();
    }
  } finally {
    await browser.close();
  }
});
