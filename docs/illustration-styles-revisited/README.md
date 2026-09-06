# Illustration styles, revisited

Status: prompts and manuscript prepared; all 22 new images and result observations pending API credentials. Original post unchanged. New post stays a draft.

User brief: create a new post following the old pattern, comparing GPT Image 2 and Nano Banana 2 visually across the same 11 styles.

Thesis: a fixed scene makes differences in material interpretation and scene fidelity visible; aesthetics and instruction following deserve separate observations.

Reader: designers and builders seeking reusable illustration prompts. Preserve all 11 styles, exact original prompt blocks, bicycle scene, and side-by-side comparisons.

Voice: personal, concrete, candid. Existing posts supply voice context only. Do not invent hands-on experience or results.

## Evidence ledger

- GPT Image 2 identity and capabilities: https://developers.openai.com/api/docs/models/gpt-image-2 (fetched September 6, 2026).
- Nano Banana 2 model ID and distinction from Pro: https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-image and https://ai.google.dev/gemini-api/docs/image-generation (fetched September 6, 2026).
- Output settings: provider image-generation guides. GPT Image 2 high quality and Gemini 1K do not imply equal compute or cost.
- Original prompts: extracted verbatim from src/content/blog/ai-illustration-styles-for-ai-prompts.md, stored in prompts.json and openai-jobs.jsonl.
- Actual image results: absent. No model ranking, observed failure, or success claim is justified yet. Style paragraphs are criteria to inspect, not observations.

## Generation protocol

Use direct named-model calls. One successful output per style/model; no aesthetic rerolls, edits, reference images, search grounding, or prompt augmentation. Preserve all original wording, including the ambiguous phrase “red bicycle courier” and palette conflicts, since these are part of the original comparison. Record API failures separately and disclose them. Any changed prompt/settings require a separately labeled run. Record returned model version when available, request settings, timestamps, and asset hashes. Keep full PNG outputs; create WebP display copies only after inspecting them.

OpenAI jobs use the bundled imagegen CLI, --no-augment and --max-attempts 1. Gemini requests use the repo's established generateContent REST approach with the current model ID. Credentials belong in the already ignored .env file; never commit them or include them in logs.

## Completion checklist

- Generate and inspect every image; confirm true provider/model provenance.
- Replace HTML insertion markers with real image pairs and accurate alt text; no broken image placeholders.
- Write concrete observations from the actual pairs and revise intro/method to reflect what ran.
- Pick the hero from the new assets, keeping its model attribution.
- Commission three editorial reviews and final checks after incorporating evidence.
- Count prose, verify all assets, and run pnpm build. Keep draft true until publication is requested.

## Preparation review — September 6, 2026

Three independent editorial agents reviewed the preparatory manuscript. All found the brief preserved and all withheld publication readiness because the 22 images and resulting observations are missing. Revisions clarify the inherited “red” ambiguity, distinguish preferences from explicit prompt requirements, remove an unnecessary opening aside, and vary section openings. This is a preparation check, not final review of a completed comparison.

Dry runs validated all 11 shared prompts for both exact model IDs without paid API calls. New post remains excluded from publication by draft: true.
