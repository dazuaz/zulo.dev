# guilloche — notes

**Verdict:** works; reads as a bank-note vignette. Best file: `guilloche-r3.svg` (15 KB), PNG `guilloche-r3.png`, 1x check `guilloche-r3-560.png`.

## The clever SVG mechanics
- **Line screens as tiny `<pattern>` tiles** (horizontal, vertical, 45deg crosshatch via `patternTransform`, grass ticks, foliage curls). Base screens carry their own paper rect, so nearer faces occlude the sky rays; overlay screens are transparent.
- **Graded engraving via `<mask>` + gradients:** a darker screen is laid over a base screen and faded by a mask whose content is a gradient rect in `maskContentUnits="objectBoundingBox"`. One mask is reused for every front face, one for every canopy, and one for the sky. A userSpace radial mask fades the sunburst rays outward.
- **Rosettes from `<use>` + rotate:** the security medallion is 36 circles on a ring, 24 rotated ellipses and 24 small inner circles, all one `<circle>`/`<ellipse>` reused. The corner medallions and the 33 sunburst rays work the same way.
- **Rope band:** one 24x14 pattern of two 4-line sine ribbons half a period apart. The side strips reuse it through `<pattern href="#wT" patternTransform="rotate(90)">`, with `y` offsets computed so the tile lines up with each strip.
- **Milled coin-edge ring:** an ellipse stroked 6 wide with `stroke-dasharray=".5 1.6"` turns into radial ticks.
- **Vignette:** a `clipPath` ellipse over the whole scene.

## Rounds
- **r1:** the banknote read came through at once, but the 4-curve band read as a sparse chain of loops. The rosette was small, and the focus building had the same screens as its neighbours, so nothing won.
- **r2:** the prompt added an explicit tone hierarchy (neighbours light only; focus gets the medium screen, a crosshatched side and near-black windows with paper mullions; the road is the darkest band), a three-family rosette at r=54, and "opaque base screens". Emphasis and rosette fixed. But six evenly phased sines produced an even diamond mesh, not a rope, and the canopies stayed pale.
- **r3:** the band is now two 4-line ribbons half a period apart, which gives a real twisted cable. A milled dasharray ring ties the oval into the ornament. Canopies got a denser curl tile and a wider shadow mask. The oval shrank so the ring clears the medallion.

## What still fails / watch-outs
- The canopies are still lighter than intended. A masked 0.6-weight crosshatch over curls doesn't get dark enough; it would need a heavier overlay or a second one.
- The road crosshatch (pitch 3 at 45deg) shows faint texture shimmer at 1x, but no strong moire. The sky lines, tint waves and side-face screens are clean at 560 px. The 2.5–3 unit pitch floor in the prompt is what keeps it clean; finer pitches would turn to grey mush at 1x.
- Prompt detail matters. The rope wording had to name the ribbon structure, because "phase-shifted sines" alone gives a mesh, and the rosette needed explicit radii and counts.
- r2/r3 were emitted by a small Python script I wrote to expand the repeated `<use>` lists (`scratchpad/gen/guil.py`). All coordinates and structure are hand-authored; the script only does the loops.
