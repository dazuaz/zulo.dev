Write one standalone SVG illustration.

Subject: A hypothetical city block on a quiet South Florida street: one focus building on its own lot, two or three neighboring buildings, a few round-canopy trees, and a frontage road along the front edge. The focus building is the single point of emphasis.

Style: a three-drum risograph print, like a small-press zine poster. Fluorescent pink, teal and yellow inks on warm off-white paper. Flat, confident shapes, no outlines, no gradients. Use a frontal street elevation with a shallow right-side face on each building so there is a little depth. The focus building is printed in solid pink; neighbors are teal at screen tints; tree canopies are teal over yellow so they overprint to green. Where pink and teal overlap they multiply to a deep plum: use that deliberately for the focus building's windows and shaded side. The pink drum is visibly misregistered from the others. Ink has grain and speckle; paper shows through.

Palette (CSS custom properties on `svg {}` in a `<style>` block, referenced with `var()` through CSS classes, not presentation attributes): --paper #f4eee1, --teal #00839a, --pink #ff4f9a, --yellow #ffd03a.

SVG mechanics:
1. One `<g>` per ink drum (yellow, teal, pink, in that order), each drawing only in its own ink. Tints are halftone dot `<pattern>`s (circles in a 4-unit grid, `patternUnits="userSpaceOnUse"`, rotated with `patternTransform`: teal 15°, pink 75°, yellow 0°), never opacity.
2. Every ink group has `style="mix-blend-mode:multiply"` so overlaps darken like real overprint. Offset the pink group with `transform="translate(2.5,1.5)"` and the yellow group by about (-1,1).
3. Ink filter on each drum group (`filterUnits="userSpaceOnUse"`, region covering the whole 560×336 viewBox): low-frequency feTurbulence → feDisplacementMap at scale ~2 for slightly wobbly edges; then high-frequency fractalNoise (baseFrequency ~0.9) → feColorMatrix that maps one channel to a hard-thresholded alpha → feComposite `operator="in"` so roughly 10% of the ink drops out as speckle.
4. Paper: a full-bleed `--paper` rect with its own filter: fine feTurbulence → feColorMatrix producing a warm brown speck at 5–15% alpha, composited over the paper.
5. Where a light ink must print on top of a darker one (road centerline), knock the darker ink out with a `<mask>` and print the light ink in the gap, as a real riso separation would.

Avoid: strokes, gradients, more than three inks, grain heavy enough to look dirty, and details smaller than about 4 units that the grain will eat. No text. viewBox="0 0 560 336", xmlns set, no width/height, under 60 KB.
