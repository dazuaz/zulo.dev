A hypothetical city block on a quiet South Florida street: one focus building on its own lot, two or three neighboring buildings, a few round-canopy trees, and a frontage road along the front edge. The focus building is the single point of emphasis.

Make an Isotype counting picture in straight-on elevation. One pictogram equals ONE STOREY, not one whole house. Assemble four buildings from the exact same storey unit: left to right 3, 5, 4, 2 units. These are invented heights in a hypothetical scene, not reported data. The four-storey building is the sole vermilion accent. Preserve identical unit dimensions, spacing and windows so the heights can actually be counted. Wide low floor slabs suggest warm-climate architecture. Generous paper sky; no perspective, outlines, shadows, texture, labels, statistics or ornament.

Use five flat colors only: paper #F3EBD7, lot #E0E3CF, muted building green #829487, dark green #284D3D, vermilion #DE6343. Put these in CSS custom properties on svg and reference var(). Use exactly these five mechanics:
1. Define one 64-by-24 storey symbol: full-width slab at y0 height4; facade x4 y4 width56 height20; three identical paper windows x12,28,44, each8 by12 at y8. Positive shapes inherit currentColor. No distinct ground-floor or roof glyph.
2. Repeat this symbol with use at a vertical pitch of28, counting upward from the shared bottom y224. Building left edges x56,184,312,440; counts3,5,4,2. Every focus storey inherits vermilion; all others muted green. Paper gaps between units remain visible.
3. Repeat a 96-by176 lot symbol at x40,168,296,424 and y64: pale rectangle and centered paper path x40 y160 width16 height32, reaching below the lot to y256. Equal lots, no focus border.
4. Define one identical tree unit, circle radius12 centered(12,12), trunk x10 y20 width4 height12. Repeat three times at x132,260,388, y224. Their common baseline is256 and they obstruct no storeys.
5. Repeat one 56-by32 dark-green road segment ten times at y280. Each has a paper dash x16 y14 width24 height4. A dark-green sidewalk is x24 y256 width512 height4. Leave20 paper units before the road.

One standalone hand-authored SVG; viewBox="0 0 560 336", xmlns set, no root width/height, under60KB. Accessible title and desc must identify hypothetical storey counts; no visible text. The countable modules and the sole warm pigment carry the composition.
