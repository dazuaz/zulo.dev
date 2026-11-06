A hypothetical city block on a quiet South Florida street: one focus building on its own lot, two or three neighboring buildings, a few round-canopy trees, and a frontage road along the front edge. The focus building is the single point of emphasis.

Style: a topographic survey sheet. Plan view, north up, the frontage road running left to right along the bottom. The whole scene is treated as terrain and described only by elevation contour lines, with the restraint of a USGS quad: no fills, no shading, no labels. Buildings are flat-topped plateaus with steep sides, trees are small round knolls, the ground is a gentle slope rising away from the street, and the focus building is the summit, the highest ground on the sheet.

Palette, as CSS custom properties on `svg` in a `<style>` block: `--paper: #f2efe6; --contour: #a07a52; --index: #6b4a2b; --ink: #1f231f; --accent: #c8432a;`.

SVG mechanics (compute the contours with a short script; the output must be plain static SVG):

1. Height field: define elevation H(x, y) over the 560 × 336 sheet as the maximum of (a) the ground: a gentle rise away from the road plus one slow sine undulation so ground contours wander; (b) one plateau per building: full height on its footprint, falling smoothly (smoothstep of the distance outside the footprint) to ground over about 16 units, so the slope sits just outside the walls and the flat top matches the footprint; (c) a small Gaussian knoll per tree. Heights: focus 36, neighbors 14 to 22, trees 6.
2. Contours by marching squares: sample H on a grid of about 3 units, extract iso-lines every 2 height units, chain segments into polylines, simplify (Ramer-Douglas-Peucker, tolerance about 0.3) and write each level as `<path>` data with 1-decimal coordinates. All intermediate contours go in one `<path>` (stroke `--contour`, width 0.5); every fifth level is an index contour in a second `<path>` (stroke `--index`, width 1.1). `stroke-linejoin="round"`, `fill="none"`.
3. Summit emphasis by level, not by decoration: every contour above the tallest neighbor's height is drawn in `--accent`, so only the focus building's upper slopes and summit carry color. Mark the summit's flat top with a small spot-height triangle (three lines) and a cross.
4. Escarpment ticks from a dashed stroke: trace each building footprint with a wide stroke (width about 5) that uses `stroke-dasharray="0.7 2.3"` and butt caps, clipped by an even-odd `<clipPath>` (sheet rectangle minus the footprint) so only the outer half survives: a comb of short downhill ticks along the wall, the cartographic cliff symbol. Draw the footprint edge itself as a thin `--ink` line.
5. Cultural features in `--ink`: the road as two solid curb lines with a dashed center line (`stroke-dasharray="10 6"`); contours stop at the road, using a `<clipPath>` that excludes the roadway. The focus lot boundary is a thin dash-dot line.
6. A neat line frame inset 10 units, and a graduated border just outside it made from one stroke of width 3 with `stroke-dasharray="20 20"`.

Output: one standalone SVG, `viewBox="0 0 560 336"`, `xmlns` set, no width/height, under 60 KB, no text, no raster, no script, no animation.
