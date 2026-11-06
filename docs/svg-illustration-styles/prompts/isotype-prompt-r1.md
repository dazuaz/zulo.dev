A hypothetical city block on a quiet South Florida street: one focus building on its own lot, two or three neighboring buildings, a few round-canopy trees, and a frontage road along the front edge. The focus building is the single point of emphasis.

Make a spare Otto Neurath / Gerd Arntz Isotype print: a straight-on elevation, four identical modest buildings in one measured row, generous empty paper above, and a horizontal road below. Read like a visual census, with the focus identified ONLY by changing its building pigment to vermilion. No perspective, outlines, texture, shadows, labels, ornamental border, or invented statistics. Broad low eaves and simple window slots should suggest warm-climate buildings without adding scenic detail.

Use exactly six flat colors: warm paper #F3EBD7, pale lot green #DFE2CC, muted building green #829487, deep tree green #284D3D, road gray #B7B9A5, vermilion #DE6343. Put them in a style block as custom properties on svg, and reference the palette with var(). Paper-colored cutouts form windows and doors.

Use these five mechanics:
1. Define ONE building symbol (80 by 96 units) with a broad shallow roof, square facade, four upper window slots, and a centered door flanked by two ground-floor windows. All its positive shapes use currentColor; all openings use the paper variable. Every building is exactly the same size and geometry.
2. Place that symbol four times with use on a strict 8-unit grid, centered at x=96,216,336,456, from y=120 to216. Only the third use changes color to vermilion.
3. Define ONE lot symbol, a 112-by-144 pale rectangle with a narrow paper path running from the facade to its front boundary. Repeat at x=40,160,280,400, y=96. The facade sits wholly on its own lot. No special marking around the focus lot.
4. Define ONE round-canopy tree symbol: a single solid circle, short rectangular trunk, no internal details. Three uses sit in the interstices near x=32,272,528, trunks meeting a common y=240 baseline. Avoid hiding any building openings.
5. Define ONE 56-by-48 road segment with a flat gray body and one short paper lane dash. Repeat ten uses across the full width at y=264. A slim gray sidewalk spans x=24 to536 at y=240; leave a paper curb gap above the road.

Standalone hand-authored SVG only; viewBox="0 0 560 336", xmlns set, no width or height on the root, under 60 KB. Use accessible title and desc to identify this as a hypothetical scene, but no visible text. Crisp flat silhouette construction, quiet spacing, and reusable glyphs are the entire image.
