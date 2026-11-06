# Isotype — three rounds, round 3 preferred

## Verdict and mechanic

**Round 3 works as a restrained counting illustration.** One `storey` symbol is one hypothetical storey, repeated with `use` in groups of3,5,4,2. Identical dimensions, equal windows and4-unit paper separators make the units countable. The third building's four instances inherit vermilion through `currentColor`; no other shape takes the accent. Lot, tree and road symbols supply the remaining repeated units. This is an invented block, not a statistical claim.

Best: `isotype-r3.svg` and `isotype-r3.png`. Final paste-ready prompt: `isotype-prompt.md`, verbatim copy of `isotype-prompt-r3.md`.

## Prompt-first history

- **R1:** whole-building symbols repeated four times. The original Chrome render attempt failed; the reviewer later supplied `isotype-r1.png`, which I have now viewed. Clean, but the review is right: identical houses function as an icon set rather than a count. The unequal window slot also adds an unnecessary irregularity. The initial prompt is now archived as `isotype-prompt-r1.md`.
- **R2:** revised the prompt BEFORE writing a new SVG. Replaced the whole-house glyph with a single floor unit;3/5/4/2 repeated floors, equal windows, three identical tree units. Viewed the resvg PNG. Counting works, but the tall pale lot panels compete as four additional bars and color the floor separators. The dark full-width road dominates the lower image. See `critique-r2.md`, written before the r3 prompt.
- **R3:** revised the prompt BEFORE hand-authoring the new SVG. Restricted lots to the shallow strip below the building baseline, leaving every floor silhouette and separator against paper. Made road and sidewalk pale, halved road depth, and slightly strengthened the muted building pigment. Viewed the resulting resvg PNG. The warm four-storey stack is the immediate emphasis; the five-storey neighbor gives the count a real comparison without needing another graphic device. No post-preview SVG patching.

## What still fails or stays limited

It remains a deliberately schematic census picture. South Florida character is only weakly suggested by broad floor slabs and flat rooflines; there are no tropical-specific botanical details. The pale road is legible at the supplied preview size but has low contrast. The trees sit in a separate ground register, and counting would need a visible key if this were real data. No key is necessary here because the subject is hypothetical and the accessible description gives the invented counts. The sole accent establishes the focus even though a neighbor is taller.

## Render and source verification

R1 PNG was supplied by the reviewer from Chrome. R2 and R3 were rendered and actually viewed at1120×672 using:

`node ../codex-masks/render-fallback.cjs isotype-r2.svg isotype-r3.svg`

Run from this folder; the fallback script resolves palette variables for resvg in memory. Delivered SVGs retain CSS custom properties and `var()` references. These are resvg previews; final Chrome inspection remains with the reviewer. Flat shapes use no filters or blend modes.

SVG sizes: R1 **2,953 bytes**; R2 **3,121 bytes**; R3 **3,269 bytes**. All under60KB. R2/R3 source audit: `source-checks-r23.json`; common viewBox/namespace, internal references, no root size attributes, no raster/external references/scripts/animation/visible text, exact palette counts, correct repeated floor counts.

No image/model API used. SVGs were hand-authored; no site source changed.

## Biggest lesson

Repeated symbols are not enough to make Isotype. Choose a meaningful, equal unit that can be counted; then keep the surroundings quiet enough for that count to be seen.
