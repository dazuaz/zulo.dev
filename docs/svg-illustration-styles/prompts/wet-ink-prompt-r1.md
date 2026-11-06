Write one standalone SVG illustration.

Subject: A hypothetical city block on a quiet South Florida street: one focus building on its own lot, two or three neighboring buildings, a few round-canopy trees, and a frontage road along the front edge. The focus building is the single point of emphasis.

Style: an architect's ink-and-wash sketch on cold-press watercolor paper. Loose transparent watercolor washes laid first, then a crisp, fine pen drawing on top. The washes wander a little off the lines, bleed at their edges, and pool darker pigment along their rims the way a drying wash does; some areas stay bare paper for light. Shadows are glazed on as a second blue wash over the first. The focus building carries the only warm color (a coral/terracotta wash); everything else is cool and quiet. Viewpoint: an elevated three-quarter oblique view, front faces toward the viewer and depth receding up and to the right, so roofs, lots and tree shadows are visible.

Palette (CSS custom properties on `svg {}` in a `<style>` block, referenced with `var()` through CSS classes): --paper #f7f3ea, --ink #2a2933, --blue #7aa3c4, --green #93b37d, --sand #dbc8a4, --coral #e2876a.

SVG mechanics:
1. Wash filter (one `<filter>`, reused): feTurbulence (fractalNoise, baseFrequency ~0.035, numOctaves 3) → feDisplacementMap on SourceGraphic, scale ~7, for organic bleed edges. Then pooled rim: feMorphology `erode` (radius ~1.6) on the displaced shape, feComposite `operator="out"` to keep only the rim, a tiny feGaussianBlur, and feColorMatrix to darken the rim's RGB and raise its alpha. The body gets alpha ~0.6, granulated by feComposite `operator="in"` against a fine fractalNoise mapped to alpha 0.75–1. feMerge body + rim.
2. Each wash shape (or group of non-touching shapes of one color) gets the wash filter and `mix-blend-mode:multiply`, so a blue shadow wash laid over the coral or sand wash glazes darker exactly where they overlap.
3. Pen layer: unfiltered strokes in `--ink`, stroke-width 0.7–1.1, round caps and joins, `fill="none"`. Make it read as drawn by hand: lines overshoot corners by 3–5 units, tree canopies are open loops that don't close, a few parallel hatch strokes on shaded faces, windows as small rectangles. Road centerline with `stroke-dasharray`.
4. Paper: a full-bleed rect in --paper whose filter builds cold-press tooth with feTurbulence (baseFrequency ~0.15, numOctaves 3) → feDiffuseLighting with feDistantLight (elevation ~55), remapped with feComponentTransfer to a narrow 0.9–1.0 range and feBlend `mode="multiply"` onto the paper color.
5. Sky is one loose blue wash blob that fades out before the canvas edges, not a full-bleed rectangle; ground washes also stop short of the frame, vignette-style.

Avoid: washes that exactly fill the pen outlines, opaque fills, black heavy outlines, filters on the pen lines, gradients standing in for washes. No text. viewBox="0 0 560 336", xmlns set, no width/height, under 60 KB.
