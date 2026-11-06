# topographic: notes

**Verdict:** mostly works. It reads as a survey sheet in which the focus building is clearly the summit, ringed in red. The trees became almost invisible in the final round.

**Best file:** `topographic-r3.svg` (16.5 KB). Use `topographic-r2.svg` (30.3 KB) if visible tree knolls matter more than clean roofs. r1 is 13.6 KB.

## The clever SVG mechanic

- **The drawing is a computed height field, contoured.** Each building is a flat-topped plateau with an apron, each tree a Gaussian knoll, and the ground a slope with a sine undulation. Marching squares turns that into contour lines, and they merge into saddles between buildings the way real terrain does. A script is required. Nested `rect rx` offsets can't merge, so they would look like target rings.
- **Emphasis comes from elevation, not decoration.** Every contour above the tallest neighbour's roof is drawn in `--accent`, so only the focus building carries colour. Index contours (every fifth level) sit in a separate, heavier path.
- **The cliff symbol comes from one dashed stroke.** Each building footprint is stroked 4 units wide with `stroke-dasharray=".7 2.3"` and butt caps, then clipped by an even-odd `<clipPath>` (the sheet minus the footprints), so only a comb of short outward ticks survives.
- A `<clipPath>` stops the contours at the road. The graduated map border is one 2-unit stroke with `stroke-dasharray="20 20"`.

## Rounds

- **r1:**
  - Buildings read as thick-bordered boxes, because about 18 contours sat in a 16-unit smoothstep band.
  - Ground contours crossed the roofs, because the roof height was ground plus h and so varied with the ground.
  - The ground had too few contours, the red summit was 3 thin rings, and an empty strip lay below the road.
- **r2 prompt:**
  - Aprons became `h(1 − d/36)²`, summed so neighbouring aprons form saddles. Roofs got a flat override.
  - More ground relief, the road moved to the frame edge, the focus building got taller (44), and the border got quieter.
  - I added midpoint-quadratic smoothing to the prompt.
  - Result: real terrain feel. But the smoothing cut the corners of the tight rings and pulled rounded contours onto the roofs of the focus building and building A. The roof elevation also ignored the apron sum, so the rim was higher than the roof.
- **r3 prompt:**
  - Roof elevation became the maximum H just outside the outline, and the apron became `(1 − d/44)^1.6` to open up the red band.
  - Spline smoothing was dropped in favour of a finer 2.5-unit grid with plain polylines, with the reason stated in the prompt.
  - Result: roofs are clean and the summit band is legible.

## What still fails

- **Trees.** A 6-unit knoll added onto a sloping apron only bends the contours and does not close a ring, so 3 of the 4 trees disappeared in r3. In r2 they survived, because the aprons were narrower. Untested fix for a 4th round: "combine tree knolls with `max(H, local ground + 8)` instead of adding them, and keep trees outside the building aprons."
- The red band around the focus building is still dense, about 1.2 units between lines. It reads as emphasis, but it is close to a solid border.
- The building walls are legible mainly through the tick comb. Without it, the buildings would read as hills.

## Lessons

- A contour style lives or dies on the height model. Each failure here was a modelling choice: smoothstep bands, roofs relative to the ground, additive knolls. None was an SVG problem.
- Never spline-smooth RDP-simplified rings: corner-cutting moves the contours across features.
- The geometry comes from `topo_gen.py <round> <out.svg>`. Each round's branch follows that round's prompt.
