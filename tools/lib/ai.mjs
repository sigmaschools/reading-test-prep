// Copyright 2026 Sigma
// SPDX-License-Identifier: Apache-2.0

// The two model families the pipeline uses: Claude writes, reviews and takes
// the blind test; a Gemini model takes the key test, so the key is confirmed
// by a reader that did not write it. Keys come from the environment:
// EVAL_ANTHROPIC_API_KEY (or ANTHROPIC_API_KEY) and GEMINI_API_KEY.

import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";

export const MODELS = {
  writer: "claude-opus-5-5",
  reviewer: "claude-opus-5-5",
  // The blind reader is a small model on purpose: a frontier model is far more
  // test-wise than a child and answers most questions from the options alone.
  blind: "claude-haiku-5-5",
  key: "gemini-3.8-flash",
};

// Dollars per million tokens, input and output, for the running cost line.
const PRICE = {
  "claude-opus-5-5": [4, 20],
  "claude-sonnet-5-5": [2, 10],
  "claude-haiku-5-5": [0.1, 0.5],
  "gemini-3.8-flash": [0.5, 3],
};

export const spend = { dollars: 0, calls: 0 };
function count(model, input, output) {
  const p = PRICE[model] || [0, 0];
  spend.dollars += (input * p[0] + output * p[1]) / 1e6;
  spend.calls += 1;
}

let client;
function claudeClient() {
  if (!client) {
    const apiKey = process.env.EVAL_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error("Set EVAL_ANTHROPIC_API_KEY or ANTHROPIC_API_KEY");
    client = new Anthropic({ apiKey, maxRetries: 4 });
  }
  return client;
}

/**
 * One Claude call that must come back as JSON matching a Zod schema.
 * `messages` is the whole conversation so far; returns { data, message }.
 */
export async function claudeJSON({ model, system, messages, schema, effort = "medium", maxTokens = 20000 }) {
  const response = await claudeClient().messages.parse({
    model,
    max_tokens: maxTokens,
    system,
    messages,
    output_config: { format: zodOutputFormat(schema), effort },
  });
  count(model, response.usage.input_tokens + (response.usage.cache_read_input_tokens || 0), response.usage.output_tokens);
  if (response.stop_reason === "refusal") throw new Error("refused: " + (response.stop_details?.explanation || ""));
  if (response.stop_reason === "max_tokens") throw new Error("ran out of tokens");
  if (!response.parsed_output) throw new Error("no parsed output");
  return { data: response.parsed_output, message: response };
}

/** One Gemini call that must come back as JSON matching a plain JSON schema. */
export async function geminiJSON({ prompt, schema, model = MODELS.key }) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("Set GEMINI_API_KEY");
  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json", responseJsonSchema: schema },
  };
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify(body),
    });
    if ((res.status === 429 || res.status >= 500) && attempt < 4) {
      await new Promise((r) => setTimeout(r, 2000 * 2 ** attempt));
      continue;
    }
    if (!res.ok) throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 300)}`);
    const json = await res.json();
    const u = json.usageMetadata || {};
    count(model, u.promptTokenCount || 0, (u.candidatesTokenCount || 0) + (u.thoughtsTokenCount || 0));
    const text = (json.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("");
    return JSON.parse(text);
  }
}

/** Runs `fn` over `list` with at most `limit` at a time. */
export async function pool(list, limit, fn) {
  const out = new Array(list.length);
  let next = 0;
  async function worker() {
    while (next < list.length) {
      const i = next++;
      out[i] = await fn(list[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, list.length) }, worker));
  return out;
}
