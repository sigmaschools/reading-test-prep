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
const { sessionRecord } = require("./fixtures/sessions.js");

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

// Today's session with every format (order included), saved as if the student had stopped before question `at`.
function recordAt(band, at) {
  const r = sessionRecord(band, today);
  r.t.at = at;
  r.t.seen = [1, 2, 3];
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

/** Tap where a thing is on screen now, as a finger does: no scrolling first. */
async function tapInPlace(p, locator) {
  await locator.evaluate((e) => { const r = e.getClientRects()[0]; if (r.top < 60 || r.bottom > innerHeight - 60) e.scrollIntoView({ block: "center" }); });
  const r = await locator.evaluate((e) => { const b = e.getClientRects()[0]; return { x: b.left + Math.min(20, b.width / 2), y: b.top + b.height / 2 }; });
  const before = await p.evaluate(() => scrollY);
  await p.mouse.click(r.x, r.y);
  return (await p.evaluate(() => scrollY)) - before;
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
    return tapInPlace(p, p.locator("#passage .s").nth(wrong));
  } else if (item.format === "order") {
    let moved = 0;
    for (let k = 0; k < 3; k++) moved += Math.abs(await tapInPlace(p, p.locator('.order button[aria-label="Move down"]').first()));
    return moved;
  }
  return 0;
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

            const jump = await pickAnswer(p, item);
            if (jump) say("the page jumped " + jump + "px under a tap in the passage or on an arrow");
            // Picking an option brings Check on screen. A tap in the passage or on an
            // order arrow never moves the page, so there Check need only be reachable.
            if (item.format !== "sentence" && item.format !== "order") {
              const after = await checkOnScreen(p);
              if (after !== "ok") say("after picking, Check " + after);
            } else {
              await p.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
              const after = await checkOnScreen(p);
              if (after !== "ok") say("scrolled to the end, Check " + after);
            }
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
              if (/Tap the sentence/.test(fb)) {
                // A wrong tap answers where the finger is; the explanation stays.
                const n = await p.locator("#passage .s").count();
                const wrong = [...Array(n).keys()].find((i) => item.evidence.indexOf(i) < 0);
                const s = p.locator("#passage .s").nth(wrong);
                const jump2 = await tapInPlace(p, s);
                if (jump2) say("the page jumped under a proof tap");
                if (!(await s.evaluate((e) => e.classList.contains("nope")))) say("a wrong proof tap shows nothing where it was tapped");
                if (!/Not quite/.test(await p.textContent("#feedback"))) say("a wrong proof tap erased the explanation");
                await tapInPlace(p, p.locator("#passage .s").nth(item.evidence[0]));
                const ok = await p.evaluate(() => { const r = document.getElementById("feedback").getBoundingClientRect(); return /Now answer again/.test(document.getElementById("feedback").textContent) && r.top >= 0 && r.top < innerHeight - 40; });
                if (!ok) say("after the right proof tap, 'Now answer again' is not on screen");
              }
              for (const c of await covered(p)) say("after a miss, covered: " + c);
              const inner2 = await innerScrollers(p);
              if (inner2.length) say("after a miss, scrolls inside " + inner2.join(", "));
              // A second miss: the right answer and why, on screen together where they fit.
              if (item.format === "single" || item.format === "vocab" || item.format === "two-part" || item.format === "multi") {
                if (item.format === "single" || item.format === "vocab") await p.locator("#ask .opt:not([disabled])").first().evaluate((e, k) => { const all = [...document.querySelectorAll("#ask .opt")]; const pick = all.find((o, i) => !o.disabled && i !== k); pick.click(); }, item.key);
                if (item.format === "two-part") await p.locator("#ask .part").nth(0).locator(".opt:not([disabled])").evaluateAll((os, k) => { const pick = os.find((o) => [...o.parentNode.parentNode.children].indexOf(o.parentNode) !== k); pick.click(); }, item.a.key);
                if (item.format === "multi") {
                  const wrong = item.options.map((_, i) => i).filter((i) => item.keys.indexOf(i) < 0);
                  await p.evaluate((w) => { const o = document.querySelectorAll("#ask .opt")[w]; if (!o.disabled) o.click(); }, wrong[1]);
                }
                if (await p.$eval("#check", (b) => !b.disabled)) {
                  await p.click("#check");
                  if (/right answer/.test(await p.textContent("#feedback"))) {
                    const seen = await p.evaluate(() => {
                      const els = [...document.querySelectorAll("#question .is-right, #feedback")];
                      const rs = els.map((e) => e.getBoundingClientRect());
                      const top = Math.min(...rs.map((r) => r.top)), bottom = Math.max(...rs.map((r) => r.bottom));
                      const fits = bottom - top <= innerHeight - 24;
                      // Where they don't fit, the why comes first: the message is on screen.
                      const f = document.getElementById("feedback").getBoundingClientRect();
                      return fits ? top >= 0 && bottom <= innerHeight : f.top >= 0 && f.top < innerHeight - 40;
                    });
                    if (!seen) say("after two misses, the right answer is not on screen");
                    if (SHOTS && screen === IPAD && id === PICKER) await p.screenshot({ path: path.join(SHOTS, `${band}-q${at + 1}-reveal.png`) });
                  }
                }
              }
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
