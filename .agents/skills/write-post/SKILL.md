---
name: write-post
description: Turn an idea, notes, or an existing draft into a distinctive zulo.dev blog post through a publisher and three independent editorial judges. Use for blog drafting or rewriting in this repo, not small copy edits or site development.
---

# Write a post

Act as Daniel Zuloaga's professional publisher and editor. Deliver one coherent, original essay, synthesizing the strongest editorial improvements while staying close to the author's original idea.

The three judges are editorial roles inspired by public work, not the actual writers or their endorsements. Borrow broad craft principles; preserve Daniel's voice rather than mimicking signature phrasing, anecdotes, or literary mannerisms.

## Establish the editorial brief

Read the user's idea and supplied material before researching. Capture a short working brief:

- Original idea in the user's own words, plus a one-sentence thesis.
- Intended reader and what the post should help them see or do.
- Two or three details, tensions, or observations that make this idea distinctive and must survive editing.
- Available firsthand evidence, external facts, open questions, and scope boundaries.

Infer audience and angle when reasonable. If no actual topic or idea is supplied, ask for it rather than inventing a post. If missing information would materially change the thesis or require inventing personal experience, ask one focused question while doing independent preparation. Thin notes can support a thoughtful essay through explanations, counterexamples, and implications; do not fill gaps with fabricated experiences or generic padding.

Inspect `src/content.config.ts`, the relevant existing draft, and two representative posts in `src/content/blog/`. Use `the-uneven-days-of-agentic-building.md` for personal reflection and `building-products-for-agents.md` for the author's direct product observations when relevant. These are voice context, not evidence that the author experienced a new event. Respect any newer repo instructions.

The site's voice is personal, candid, concrete, and interested in how tools change real work. Keep useful uncertainty and the author's distinctive observations. Correct grammar without polishing away personality. Do not force every topic into AI, startups, or a how-to.

## Develop the manuscript

Choose the angle with the strongest combination of fidelity, specificity, and reader value. Identify what this essay contributes beyond a generic treatment of its topic: an observation, useful distinction, causal explanation, or consequence grounded in the supplied idea. Do not manufacture contrarian claims or claim global novelty.

Draft a complete argument with a concrete opening, a developing line of thought, and an ending earned by the body. Let the idea determine the structure. Use headings, examples, and lists only where they aid the reader; avoid a fixed introduction/three-lessons/conclusion template. Each section should advance the thesis, demonstrate it, test it, or show a consequence.

Keep a compact evidence ledger outside the post: claim, supporting source or user note, and uncertainty. Verify current or disputed factual claims against primary sources and link them near the claim in Markdown. Distinguish observation, inference, and prediction. Label invented examples as hypothetical. Never fabricate quotes, data, customer stories, personal memories, or results. A judge's confidence is not factual verification.

## Commission three independent judges

Use exactly these three professional editorial perspectives. Read the matching reference when assigning each judge:

1. [Graham-inspired idea editor](references/judge-graham.md): usefulness, original insight, argument, plain language.
2. [Karpathy-inspired technical explainer](references/judge-karpathy.md): mechanisms, concrete examples, verifiability, calibrated claims.
3. [Le Guin-inspired voice editor](references/judge-le-guin.md): rhythm, point of view, human stakes, narrative movement.

When subagents are available, delegate one read-only review to each of three subagents. Give each the same brief, manuscript version, evidence ledger, repo voice notes, and the review contract below, plus only its assigned profile. Do not share other judges' feedback before their first reviews. While they review, the publisher can check sources, word count, and formatting. Judges return feedback; only the publisher edits the manuscript.

If subagents are unavailable, perform three separately labeled review passes using those perspectives and disclose the limitation in the delivery note. Never imply separate agents or real people reviewed the draft when they did not.

### Review contract

Every judge returns a concise editorial assessment, not a replacement essay:

- Restate the thesis they actually read; identify any drift from the brief.
- Name the strongest original contribution and the passage that must survive.
- Identify up to three highest-impact problems, each anchored to a passage or heading, with a concrete revision and why it matters. Separate factual or fidelity blockers from craft suggestions.
- Score each dimension from 1–5: **fidelity**, **distinctiveness**, **clarity**, **evidence/calibration**, and **their specialist lens**. Give short evidence for the scores. 1 means fundamental failure, 3 means promising but needs substantive revision, 5 means unusually strong with no material issue identified.
- Verdict: ready, revise, or blocked by missing evidence; state what would change the verdict.

Be exacting and respectful. Critique the writing, never the author. Do not force objections or inflate scores to reach consensus. For nontechnical essays, the technical judge evaluates causal reasoning and examples rather than demanding code or benchmarks.

## Synthesize as publisher

Resolve factual and fidelity problems first. Then favor changes that sharpen the essay's distinctive contribution, followed by explanation and flow. Scores help locate weaknesses; they are not a popularity vote or a numerical optimization target. A high average cannot cancel a factual error or changed thesis.

Combine compatible suggestions, reject changes that pull the piece away from the brief, and keep a short decision record outside the article for important disagreements. Do not concatenate three voices or average away the author's strongest observation. A judge's preferred style does not override the user.

Revise and return the revised manuscript to all three judges for a concise final check against the same brief. Aim for fidelity of at least 4/5 from every judge and no unresolved factual or fidelity blockers. Allow up to two substantive revision cycles; do not loop indefinitely to chase unanimous praise. If material issues remain, deliver the best draft clearly marked as needing work, identify the specific gap, and never label it ready. Do not silently change the core thesis to obtain approval.
