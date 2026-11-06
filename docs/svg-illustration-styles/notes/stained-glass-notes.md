# stained-glass: notes

**Verdict:** works, with a cartoon edge. Best file: `stained-glass-r3.svg` (13.7 KB) / `stained-glass-r3.png`.

## The clever SVG mechanic
- **One geometry, two passes, switched by inherited CSS custom properties.** Every pane is defined once in `<defs><g id="panes">` with `fill:var(--glass-on, var(--c)); stroke:var(--came, none); stroke-width:var(--w, 2.5)`. `<use href="#panes"/>` renders the glass. The same `<use>` with `style="--glass-on:#000; --came:#fff"` inside a `<mask>` renders the came network: each later pane's black fill erases the hidden edges of panes behind it. A `--lead` rect painted through that mask is the leading. Custom properties inherit into the `<use>` shadow tree, which is what makes this work. Came width varies per pane with `--w` (border 9, main shapes 5–6, subdivisions 2.5).
- **Lead as lit metal:** the lead group's filter blurs its alpha, runs `feSpecularLighting` with a `feDistantLight` to get a rounded highlight along each strip, and also lays a blurred dark halo under the came. That halo makes each pane darker at the lead and brightest in its centre, the way backlit glass looks, and it did more for "light through glass" than any glow did.
- **Glass:** an anisotropic `feTurbulence` mottle (brightness-neutral `arithmetic` blend), a low-strength screen bloom, a `feComponentTransfer` gamma lift for backlit luminance, and a screen-blended radial sun glow. Tone variation between same-colour panes comes from `color-mix()` on the palette variables.

## Rounds
- **r1:** the prompt said to render the lead pass as a second `<use>` with `fill:none`. That is a real bug in the method: every edge hidden behind a later pane showed through, so sky facet lines ran across all the buildings. The sun glow (r=420) washed the right-hand buildings to grey. Pale tones mixed with black made the sky muddy. Radial canopy wedges looked like a car logo.
- **r2 prompt changes:** the masked lead pass (with an explicit "do NOT use fill:none, here's why"); glow radius 200 with a "buildings must stay saturated" check; pale variants mixed only toward amber or cobalt; off-centre curved canopy leads; a weaker lead highlight. Structurally correct now. The sky was still grey because the mottle composite (k1 0.55/k2 0.5) darkened everything by about 20%.
- **r3 prompt changes:** a brightness-neutral mottle (k1 0.6/k2 0.7, with the reason stated), a gamma lift on the glass, and the edge-falloff halo under the lead. Luminous and clearly glass.

## What still fails
- The gamma lift pushes ruby toward pink and the whole thing toward toy-like pastels. Real stained glass is darker and more saturated with brighter highlights. A local glow (sun only) plus no global lift might be better.
- The geometry is rectilinear clip-art: buildings are rectangles, so the leading follows a grid. Real windows have irregular, hand-cut panes and the leading carries the drawing. A prompt would need to ask for "no pane larger than X, every rectangle broken by a diagonal lead".
- Process caveat: SVGs were emitted by a small Python generator (`gen/sg.py`) that I revised alongside the prompt each round, not regenerated from a blank slate.

File size r3: 13,685 bytes.
