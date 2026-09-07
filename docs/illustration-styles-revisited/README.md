# Illustration styles, revisited

Status: all 26 images generated and visually inspected through Vercel AI Gateway. Completed article passed all three final editorial reviews. Original post unchanged. Publication authorized by the user on September 6, 2026; draft flag disabled for production.

User brief: create a new post following the old pattern, comparing GPT Image 2 and Nano Banana 2 visually across the same 11 styles.

Thesis: a fixed scene makes differences in material interpretation and scene fidelity visible; aesthetics and instruction following deserve separate observations.

Reader: designers and builders seeking reusable illustration prompts. Preserve all 11 styles, exact original prompt blocks, bicycle scene, and side-by-side comparisons.

Voice: personal, concrete, candid. Existing posts supply voice context only. Do not invent hands-on experience or results.

## Evidence ledger

- GPT Image 2 identity and capabilities: https://developers.openai.com/api/docs/models/gpt-image-2 (fetched September 6, 2026).
- Nano Banana 2 model ID and distinction from Pro: https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-image and https://ai.google.dev/gemini-api/docs/image-generation (fetched September 6, 2026).
- Output settings: provider image-generation guides. GPT Image 2 high quality and Gemini 1K do not imply equal compute or cost.
- Original prompts: extracted verbatim from src/content/blog/ai-illustration-styles-for-ai-prompts.md, stored in prompts.json and openai-jobs.jsonl.
- Actual image results: all 22 original PNGs retained. All pairs inspected; specific observations in observations.json and article. Every image is 1024×1024. All requests succeeded on one provider attempt with no warnings. Recorded gateway cost: $3.059785. Preferences are limited to this sample; no reliability benchmark or universal model ranking claimed.

## Generation protocol

Use direct named-model calls. One successful output per style/model; no aesthetic rerolls, edits, reference images, search grounding, or prompt augmentation. Preserve all original wording, including the ambiguous phrase “red bicycle courier” and palette conflicts, since these are part of the original comparison. Record API failures separately and disclose them. Any changed prompt/settings require a separately labeled run. Record returned model version when available, request settings, timestamps, and asset hashes. Keep full PNG outputs; create WebP display copies only after inspecting them.

The original preparation used bundled OpenAI CLI jobs and a Gemini REST script for dry runs only. Actual generation used the Vercel AI Gateway execution described below. Credentials belong in the already ignored .env file; never commit them or include them in logs.

## Completed checklist

- [x] Generate and inspect every image; confirm true provider/model provenance.
- [x] Replace HTML insertion markers with real image pairs and accurate alt text; no broken image placeholders.
- [x] Write concrete observations from the actual pairs and revise intro/method to reflect what ran.
- [x] Pick the hero from the new assets, keeping its model attribution.
- [x] Commission three editorial reviews and final checks after incorporating evidence.
- Prose count: 1,739 words. Assets verified; final build recorded below. Draft remains true until publication is requested.

## Preparation review — September 6, 2026

Three independent editorial agents reviewed the preparatory manuscript. All found the brief preserved and all withheld publication readiness because the 22 images and resulting observations are missing. Revisions clarify the inherited “red” ambiguity, distinguish preferences from explicit prompt requirements, remove an unnecessary opening aside, and vary section openings. This is a preparation check, not final review of a completed comparison.

Dry runs validated all 11 shared prompts for both exact model IDs without paid API calls. New post remains excluded from publication by draft: true.

## Gateway execution

The user requested AI_GATEWAY on September 6. Its authenticated Vercel model catalog confirmed both exact requested models. Execution uses scripts/generate-illustration-comparison-gateway.mjs and the official AI SDK (ai 7.0.93, @ai-sdk/gateway 4.0.75) in a separate temporary runtime. This supersedes the prepared direct-provider CLI jobs and Gemini script, which were dry-run only. No OpenAI API key is needed for this gateway route.

Each saved run record contains the exact prompt, nonsecret request body, requested model, returned routing/provider metadata, settings, image dimensions, timestamp, and SHA-256. SDK retries are disabled; any gateway provider attempts remain visible in the metadata. No alternative model is requested. Original PNGs are in output/imagegen/illustration-styles-revisited; WebP display copies are in public/blog/illustration-styles-revisited.

## Completed generation

All 22 outputs succeeded. results.json summarizes exact requests, dimensions, timestamps, hashes, and recorded cost; runs/ contains provider routing records. All 11 pairs were visually inspected. GPT Image 2’s paper-cut output is reused as the hero, so no additional image was generated for the cover. Article links open the full-size 1024px WebP display copy.

## Final editorial decisions

All three independent editors returned ready after reviewing the completed manuscript and final revisions, each with fidelity 5/5. The synthesis preserves the original prompts and distinguishes style fidelity from visual preference, limiting conclusions to the actual outputs. Final polish replaced ambiguous sunset wording with a warm orange reflection and made all 22 alt descriptions distinct. No material editorial or evidence blockers remain.

Desktop and mobile rendering checks confirmed 11 pairs, all 23 images (including the reused hero) loaded at 1024×1024, two desktop columns, one mobile column, no horizontal overflow, and no browser errors.

Final validation: `pnpm build` and `git diff --check` passed. The build includes the unchanged original post and excludes the new draft. Temporary preview route removed.

## September 7 expansion brief

User request: “just update and rewrite to 13 styles.” Integrate cyanotype-inspired and embroidered textile treatments as sections 12 and 13, with four new model-specific outputs and a revised title, introduction, method, and ending. Preserve the published URL, original publication date, first 11 prompts and outputs, and separate original post. Same audience and thesis: designers should judge how a material changes the scene, alongside framing and their intended use. Retain the established AI disclosure and one-output limits.

New prompts are stored verbatim in prompts.json. Generation continues through the previously authorized AI Gateway with unchanged model/settings/selection protocol. Cyanotype process reference: https://www.kew.org/read-and-watch/cyanotype-photography (read September 7). Embroidery visual context: https://www.vam.ac.uk/collections/textiles (read September 7). Generated appearances will be inspected before comparison prose is written; neither is evidence of a physical craft process.

Expansion evidence: all four added requests succeeded, bringing the set to 26 images. Each requested model matched the routing record, all outputs are 1024×1024 PNGs, prompts and hashes verified, and both new pairs visually inspected at 600px per image. Four WebP display copies generated. Added cost approximately $0.56; recorded set total $3.616227. Specific observations are in observations.json. The expanded article passed all three independent editorial reviews.

Final expansion review: idea, technical, and voice editors all returned ready with fidelity 5/5. Article is 1,770 prose words. The synthesis integrates both styles into the title, method, numbered sequence, and conclusion; retains the material-legibility observation; and distinguishes generated cyanotype appearance from a physical process. An optional ending rephrase was not necessary: the existing sentence is explained concretely by the preceding embroidery comparison. No factual or fidelity blockers remain. An isolated production-baseline build and SEO audit passed, covering 16 pages and 7 articles.

Browser verification: all 27 rendered images loaded (26 comparisons plus the reused hero), two desktop columns, one mobile column, no horizontal overflow, and no page errors.
