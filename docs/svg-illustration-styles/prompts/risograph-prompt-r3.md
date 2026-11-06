Write one standalone SVG illustration.

Subject: A hypothetical city block on a quiet South Florida street: one focus building on its own lot, two or three neighboring buildings, a few round-canopy trees, and a frontage road along the front edge. The focus building is the single point of emphasis.

Style: a three-drum risograph print, like a small-press zine poster. Fluorescent pink, teal and yellow inks on warm off-white paper. Flat, confident shapes, no outlines, no gradients. Use a frontal street elevation with a shallow right-side face on each building so there is a little depth. The focus building is printed in solid pink; neighbors are teal; tree canopies are teal over yellow so they overprint to green. Where pink and teal overlap they multiply to a deep plum: use that deliberately for the focus building's windows and shaded side. The pink drum is visibly misregistered from the others. Ink has fine grain, slightly uneven density and speckle; paper shows through. The paper itself should read as clean, warm stock, not as noise.

Palette (CSS custom properties on `svg {}` in a `<style>` block, referenced with `var()` through CSS classes, not presentation attributes): --paper #f4eee1, --teal #00839a, --pink #ff4f9a, --yellow #ffd03a.

SVG mechanics:
1. One `<g>` per ink drum (yellow, teal, pink, in that order), each drawing only in its own ink. Most shapes are solid ink; the overprints do the shading. Use halftone dot `<pattern>`s (circles in a 3.5-unit grid, `patternUnits="userSpaceOnUse"`, `patternTransform="rotate(45)"`) for at most two tints, only on secondary surfaces like neighbor facades and the sidewalk. Use 45° only: at shallow angles like 15° the clipped rows of dots along a rectangle edge make the whole building look like it leans, and fine grids moiré. Never use opacity for tints.
2. Every ink group has `style="mix-blend-mode:multiply"` so overlaps darken like real overprint. Offset the pink group with `transform="translate(2.5,1.5)"` and the yellow group by about (-1,1).
3. Ink filter per drum (`filterUnits="userSpaceOnUse"`, region covering the whole 560×336 viewBox, a different seed per drum):
   - edge roughness: feTurbulence at a fairly high baseFrequency (~0.12) → feDisplacementMap at scale ≤1.2. Do not use low-frequency displacement; it bends whole buildings.
   - speckle: fractalNoise baseFrequency ~0.9 → feColorMatrix mapping the R channel to a hard-thresholded alpha so about 8% of the ink drops out.
   - density: fractalNoise baseFrequency ~0.02 → feColorMatrix to alpha in the 0.78–1.0 range.
   - combine speckle × density with feComposite `operator="arithmetic" k1="1"`, then feComposite `operator="in"` with the displaced ink.
4. Paper: a full-bleed `--paper` rect with a filter adding only a faint warm fiber: fine feTurbulence (baseFrequency ~1.1) → feColorMatrix to a warm brown at no more than ~5% alpha, composited over the paper.
5. Where a light ink must print on top of a darker one (road centerline), knock the darker ink out with a `<mask>` and print the light ink in the gap, as a real riso separation would.

Avoid: strokes, gradients, more than three inks, grain heavy enough to look dirty, details smaller than about 4 units that the grain will eat, and halftone on large areas. No text. viewBox="0 0 560 336", xmlns set, no width/height, under 60 KB.
