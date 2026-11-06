Draw a hand-authored SVG illustration.

Subject: A hypothetical city block on a quiet South Florida street: one focus building on its own lot, two or three neighboring buildings, a few round-canopy trees, and a frontage road along the front edge. The focus building is the single point of emphasis.

Style: a banknote or share certificate. The scene is an engraved vignette set into an oval window, the way a bank note shows a building or a landscape, surrounded by a decorative frame of guilloche: interlaced wave bands and spirograph rosettes. Everything is drawn in fine lines only, as if cut by an engraving machine: tone comes from line screens (spacing, weight, direction, crosshatch), never from flat fills. Two security inks on pale paper: a deep green-black for the engraving and a red-brown for the guilloche ornaments, with a pale green tint underprint behind everything. No text, numerals, portraits or seals.

Layout: a double-rule border near the edge, then a guilloche wave band about 14 units wide running all round, with a small rosette medallion at each corner. Inside, an oval vignette (about 390 x 250) left of centre holds the scene; to its right a large circular guilloche rosette (radius about 44) sits on the tint underprint, like a note's security medallion.

Scene inside the oval: a street elevation with shallow oblique depth (front face, narrow right side face, thin roof strip from a depth offset of about +16, -9). Sun from the upper left. The focus building stands in the middle, taller, mid-century modern with ribbon windows and a cantilevered entrance canopy; behind it a sunburst of fine rays fans up into the sky, the classic engraving device for drawing the eye. Two lower, plainer neighbours left and right, engraved lighter. Three round-canopy trees. A lawn strip, then the frontage road along the bottom of the oval with a dashed centre line left as bare paper.

Palette (CSS custom properties on `svg` in a `<style>` block): `--paper: #f0ead8`, `--ink: #1d3b31`, `--orn: #8b3a2b`, `--tint: #b9d0c0`.

SVG mechanics:
1. Line screens as `<pattern patternUnits="userSpaceOnUse">` tiles holding one or two `<path>` strokes: light horizontal lines (pitch 3, width 0.45), medium (pitch 3, width 0.8), vertical lines for side faces, a 45-degree crosshatch for the darkest areas (two rotated patterns layered), short vertical grass ticks for the lawn, small looping curls for foliage. Use `patternTransform` to rotate. Keep every pitch at 2.5 units or more so the screens survive at 560 px wide without moire.
2. Graded tone with masks: where a surface needs a gradient (sky fading toward the horizon, the shadow side of each canopy, the right half of each front face), fill the area with a darker line screen and attach a `<mask>` whose content is a rect filled with a `linearGradient` or `radialGradient` from white to black, so the extra lines fade in smoothly over the base screen.
3. The vignette is a `<clipPath>` ellipse applied to the whole scene group; stroke the same ellipse twice (0.8 and 0.4, 3 units apart) as the window's engraved edge.
4. Rosettes by repetition: define one ellipse or circle in `<defs>` and `<use>` it many times with `transform="rotate(a cx cy)"` at even steps (for example 36 circles of radius 18 whose centres sit on a ring of radius 24, plus 18 ellipses 44 x 14 at 10-degree steps), stroked at 0.35 to 0.5 with no fill. The overlap of the copies is what makes the guilloche net. Use the same method, smaller, for the four corner medallions and the sunburst rays.
5. The wave band is a pattern tile of two or three phase-shifted sine curves (cubic Beziers) that interlace; fill the top and bottom band strips with it, and a 90-degree rotated copy for the left and right strips.
6. The tint underprint is a very fine wavy-line pattern in `--tint` filling the inner panel behind everything.

Building outlines and window frames are 0.7 to 0.9 strokes in `--ink`. Windows are crosshatch; the focus building gets the densest, crispest engraving and the neighbours stay light so the eye goes to the centre.

Constraints: `viewBox="0 0 560 336"`, xmlns set, no width/height, no text, no raster images, no filters, no scripts or animation, under 60 KB.
