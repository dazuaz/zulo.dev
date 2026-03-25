/**
 * Regenerate blog hero with Gemini image API (Nano Banana / gemini-3.1-flash-image-preview).
 *
 * Usage:
 *   export GEMINI_API_KEY="your-key"
 *   node scripts/generate-hero-gemini.mjs
 *
 * Output: public/blog/building-products-for-agents/hero-gemini.webp (PNG from API; rename/extension as needed)
 *
 * Docs: https://ai.google.dev/gemini-api/docs/image-generation
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../public/blog/building-products-for-agents");
const OUT_PNG = path.join(OUT_DIR, "hero-gemini.png");

const PROMPT = `Editorial blog hero illustration, 16:9 wide composition.

Theme: building software products when humans and LLM agents share the same tools—abstract operational loop around data import / onboarding (generic, not a real brand).

Include: (1) A terminal or code panel with abstract lines suggesting a callable import function and log output—no readable real text or proprietary names. (2) A circular workflow with six small nodes and arrows: execute, diagnose, repair, verify, human review, improve code—minimal marks. (3) A stylized form or record with a hand and pen correcting a field, dashed arrow feeding back toward code.

Style (strict): black and white ink line art only; varied line weight; cross-hatching for shadows—no smooth gray gradients; hand-drawn pen texture with slight wobble; warm off-white cream paper background with subtle paper grain; high contrast; editorial technical illustration, not comic, not photorealistic.`;

const key = process.env.GEMINI_API_KEY;
if (!key) {
  console.error("Set GEMINI_API_KEY (see https://aistudio.google.com/apikey)");
  process.exit(1);
}

const url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent";

const body = {
  contents: [
    {
      role: "user",
      parts: [{ text: PROMPT }],
    },
  ],
  generationConfig: {
    responseModalities: ["IMAGE"],
    imageConfig: {
      aspectRatio: "16:9",
      imageSize: "2K",
    },
  },
};

const res = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-goog-api-key": key,
  },
  body: JSON.stringify(body),
});

if (!res.ok) {
  const t = await res.text();
  console.error(res.status, t);
  process.exit(1);
}

const data = await res.json();
const parts = data?.candidates?.[0]?.content?.parts ?? [];
let b64 = null;
for (const part of parts) {
  if (part.inlineData?.data) {
    b64 = part.inlineData.data;
    break;
  }
}
if (!b64) {
  console.error("No image in response:", JSON.stringify(data, null, 2).slice(0, 2000));
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_PNG, Buffer.from(b64, "base64"));
console.log("Wrote", OUT_PNG);
