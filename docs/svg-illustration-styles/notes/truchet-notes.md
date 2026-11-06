# Truchet — three rounds, round 3 preferred with a legibility limit

## Verdict and mechanic

**Round 3 succeeds as a connected Truchet architectural textile; it is still an abstract street plan.** A radius14 quarter arc is reused twice in each28-unit tile, with edge-midpoint ports that always match neighboring tiles. Seeded mixed rotations fill the canvas. Forced alternating column rotations in the bottom three rows yield two long sinuous routes; coloring only the appropriate half-arcs distinguishes the street without adding a separately drawn road. Straight paired-line tiles replace the curved rule inside solid roof planes. Four curved tiles close into each clipped canopy ring. Three colors suffice: paper, sage, deep green. The dark inverted roof is the focus.

Best: `truchet-r3.svg` and `truchet-r3.png`. Final paste-ready prompt: `truchet-prompt.md`, verbatim copy of `truchet-prompt-r3.md`. Reproducible local geometry: `generate-truchet-r2.cjs` and `generate-truchet-r3.cjs` (plain Node, no dependencies or APIs).

## Prompt-first history

- **R1:** diagonal mosaics and a separate wave strip. The initial renderer failed; I have now viewed the reviewer-supplied Chrome PNG. The scene reads as decorative bands rather than a coherent network. Its colored square dominates but does not become a convincing roof. Initial prompt archived as `truchet-prompt-r1.md`.
- **R2:** revised prompt first, then emitted geometry from it. Replaced diagonals with true paired quarter arcs across a20-by12 grid; forced bottom rows; three-color focus inversion; trees close from the same arcs. Viewed the resvg PNG. Neighbor roofs reduce to thin vertical bars, the entire dark band includes extra U-shaped hooks, and the low-bit arithmetic formula yields repetitious ground bands. Tree rings look hollow. These are explicit prompt failures, not renderer failures. See `critique-r2.md`, written before r3.
- **R3:** revised prompt first, then wrote a fresh deterministic emitter. Used xorshift32 seeded0x5EED1234 for varied ground orientation. Gave neighboring roofs real sage areas with paper seams. Filled the tree interiors sage. Split the paired tile into reusable half-arcs, highlighting only SE in local row9, both in10, NW in11, before whole-tile rotation. This produces exactly two dark paths from one side of the canvas to the other. Viewed the resvg PNG. The hierarchy and roof legibility improve substantially; the ground is no longer a few repeated bands. No post-preview SVG patching.

## What still fails or stays limited

The street remains two exaggerated sinuous lanes, which read more like a woven map than a literal quiet South Florida road. Round canopies and roofs are readable in plan, but regional character is weak. The focus is emphatic partly because it is larger, not solely because of inversion/order. Paper lot masks deliberately interrupt the underlying network around buildings; the full grid exists beneath them, while exposed tile-to-tile ports connect exactly. Half-tile lot setbacks crop a few ground arcs to tiny stubs. At small sizes the general texture may still compete with the scene. This is the limit to report after three rounds, not a claim of literal streetscape realism.

## Render and source verification

R1 PNG supplied by the reviewer from Chrome. R2 and R3 rendered and actually viewed at1120×672 with:

`node ../codex-masks/render-fallback.cjs truchet-r2.svg truchet-r3.svg`

Run from this folder. The resvg helper resolves CSS custom properties in memory; delivered SVGs retain the palette variables. No filters or blend modes. Reviewer will inspect the finals in Chrome.

SVG sizes: R1 **5,610 bytes**; R2 **21,656 bytes**; R3 **48,554 bytes**. All under60KB. R3 uses explicit per-half-arc instances to make route coloring inspectable; the additional size pays for controllable continuity. R2/R3 audit in `source-checks-r23.json`: XML, internal references, palette counts, root attributes and prohibited elements. Route geometry is also checked independently: two connected dark components, each spanning x0 to560, with no internal loose endpoints. Scripts reproduce the saved SVGs byte for byte.

No image/model APIs, external assets or libraries used to generate geometry. No site source changed.

## Biggest lesson

A true Truchet scene needs compatible ports and spatial rules, not scattered tile decorations. Correct connectivity alone still does not make a building or street readable: roof area, contrast and which connected routes receive emphasis matter.
