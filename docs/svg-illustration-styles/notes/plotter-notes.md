# plotter: notes

**Verdict:** works. r3 reads as an AxiDraw print: one pen width, tone only from line density, and a red second pen on the focus building.

**Best file:** `plotter-r3.svg` (23.9 KB). r1 is 27.8 KB, r2 23.7 KB.

## The clever SVG mechanic

- **An isometric drawing built from flat drawings under `matrix()`.** Each wall is drawn in its own elevation coordinates and each roof and the ground in plan coordinates, inside a `<g transform="matrix(...)">` that maps that rectangle onto its isometric face. So hatching is just horizontal or vertical runs inside a rectangle, and the focus roof's "concentric offset fill" is just nested `<rect>`s. The model never has to compute a skewed polygon.
- **`vector-effect: non-scaling-stroke`, set in CSS** for the drawing group, keeps one physical pen width through every skew and at every display size, which is the plotter look.
- **Windows as holes where the pen lifted.** Each wall's hatch takes a `<mask>` made of one thick black line per floor with `stroke-dasharray`, so each dashed stroke cuts a row of window openings. Because the mask sits in the wall's local coordinates, the holes come out as correct isometric parallelograms.
- **Hidden-line removal with `<mask>`.** Nothing is filled, so each object is masked by the `<use>`d silhouettes of every nearer object.
- `stroke-dasharray="0 5"` with round caps turns lines into rows of dots for the lawn. Tree canopies are concentric circles whose centres drift toward the shade, so the rings crowd on the dark side.

## Rounds

- **r1:** already strong. Two problems:
  - The framing drifted: the top margin was about 6 units and the drawing sat right of centre. The prompt asked for a 24-unit margin but gave no way to get it.
  - `non-scaling-stroke` was on attributes for the walls only. Tree rings scaled with the viewBox and drew about 2x heavier than the hatching.
  - Shadows at spacing 1.5 read as solid grey.
- **r2 prompt:**
  - Asked the model to compute the projected bounding box and fit it with at least 24 units of margin.
  - Moved `non-scaling-stroke` to a CSS rule on all shapes.
  - Opened the shadow spacing to 2.2 and added parapet lines on the neighbour roofs.
  - Result: centred and consistent. But the global CSS rule also reached the `<mask>` contents, so the window-hole strokes shrank to 4.5 screen pixels and the windows nearly vanished (seen at zoom).
- **r3 prompt:**
  - Scoped the rule to `.pen` only and said explicitly that it must never reach mask or clipPath contents.
  - Required butt caps and window holes at least two hatch spacings tall.
  - Result: the window grid reads clearly on the cross-hatched walls.

## What still fails

- On the lit walls, the hatch runs parallel to the window rows, so a hole in a line still looks like a dash rather than an opening. The likely fix is vertical hatching on lit walls. I didn't test it because the 3-round cap was reached.
- Cast shadows are drawn on the ground only and are hidden where a building stands, so the focus building's shadow does not fall across the roof of the neighbour behind it.
- The diagonal isometric footprint leaves empty paper in the top-left and bottom-right corners.

## Lessons

- `non-scaling-stroke` is the key to a plotter feel in a skewed drawing, but a CSS selector broad enough to reach mask content silently breaks the masks.
- The geometry was computed with a short Python script, as the prompt allows (`plotter_gen_r1.py` to `plotter_gen_r3.py`). Writing it by hand is possible, because every hatch is a run of lines inside a rectangle, but long.
