# Vector lab brief: prompt-only SVG styles

We're preparing a blog post for zulo.dev in the spirit of an earlier one that showed 13 illustration styles applied to one shared scene. This time every image is a hand-authored SVG written by a language model from a text prompt. Earlier tests showed the obvious styles (flat isometric massing model, monoline, simple hatching) already work. We now want styles that are **completely different from each other**, high quality, and that use SVG in **novel, clever ways**: filters, patterns, masks, clip paths, blend modes, <use>/<symbol> repetition, textPath, gradients, stroke-dasharray, mathematical construction, and so on. The cleverness should be in what SVG makes possible, not in piling on detail.

## Shared subject (keep it in every prompt, word for word)

> A hypothetical city block on a quiet South Florida street: one focus building on its own lot, two or three neighboring buildings, a few round-canopy trees, and a frontage road along the front edge. The focus building is the single point of emphasis.

Each style may pick its own viewpoint (isometric, plan, elevation, perspective) when that suits the style.

## Output rules for every SVG

- One standalone SVG, `viewBox="0 0 560 336"`, `xmlns` set, no width/height attributes. Under 60 KB.
- No raster images, no external references, no scripts, no animation (it must look complete as a still).
- Put the palette in a `<style>` block inside the SVG as CSS custom properties on `svg { --name: value; }` and reference them with `var()`. 3–6 colors per style.
- No text elements, unless the style is about type.

## Method (this is the important part)

For each style you own:

1. Write a **reusable prompt**: the shared subject sentence + a style block that names the technique, the palette, and the 3–6 SVG mechanics that make it work. A good style block reads like an art director's brief plus a few precise technical constraints.
2. Generate the SVG **strictly from that prompt**, as a fresh model would that sees only the prompt. Do not use knowledge from earlier attempts that is not in the prompt.
3. Render it: `/private/tmp/claude-501/-Volumes-FastSSD-Code-zulo-dev/c0db1cfe-518d-4d22-8110-adaa4c761265/scratchpad/lab/render.sh <file.svg>`, then look at the PNG.
4. Critique it honestly. If it fails, **revise the prompt** (not the SVG by hand) and regenerate. Up to 3 rounds. Keep each round's files (`<style>-r1.svg`, `-r2`, …).
5. Stop when the output is genuinely good or when you've learned why the style doesn't work from prompt alone. A failed style with a clear lesson is a useful result.

## Deliverables (in your folder under lab/)

For each style: `<style>-prompt.md` (the final prompt, verbatim, ready to paste), the round SVGs and PNGs, and `<style>-notes.md`: what the clever SVG mechanic is, what changed between rounds and why, what still fails, file size.

Final reply: per style, a 3–5 line summary (verdict, mechanic, best file path, biggest lesson). Keep it short; the files hold the detail.
