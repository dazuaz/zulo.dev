# wet-ink: notes

**Verdict:** works. r3 reads as an architect's ink-and-wash sketch: transparent washes with soft, pooled, darker rims that drift off crisp overshooting pen lines, a graded sky painted around the focus building (which leaves a bare-paper halo that does the emphasis work), a dry-brush road, and faint cold-press tooth. It is good rather than spectacular: the pen drawing is ruler-straight and fairly sparse.

**Best file:** `wet-ink-r3.svg` (8.9 KB) / `wet-ink-r3.png`. Final prompt: `wet-ink-prompt.md` (same as `wet-ink-prompt-r3.md`).

## The clever SVG mechanic

- **Pooled edge = shape minus its own blur.** `feComposite operator="arithmetic" k2=1 k3=-1` between the displaced shape and a 2.5 blur of it gives a band that is strongest at the edge and fades inward. That is how drying pigment migrates to a wash's rim. The rim is darkened with feColorMatrix and gated by low-frequency noise so the pooling comes and goes along the edge.
- **Bleed:** feTurbulence → feDisplacementMap (scale 10, 3 octaves), then a 0.5 blur so the edges stay soft and wet.
- **Glazing:** each wash is `mix-blend-mode:multiply`, so a second coral pass plus a thin blue on the focus building's side builds shade the way layered washes do.
- **Graded sky:** a soft-curved wash shape faded by a `<mask>` holding an elliptical `radialGradient` centered over the focus building.
- **Dry brush:** an anisotropic `baseFrequency="0.006 0.22"` turbulence, hard-thresholded into alpha, breaks the road wash into horizontal streaks of bare paper.
- **Paper:** feTurbulence → feDiffuseLighting → feComponentTransfer squeezed to about 0.96–1.02 → feBlend multiply.
- **Pen layer:** unfiltered. The overshooting corners are separate segments. Tree canopies are open loops made from `pathLength="100"` plus a single dash of ~85.

## Rounds

- **r1:** feMorphology-erode rim, low-octave displacement at scale 7, wash shapes that copied the pen rectangles, a cloud-blob sky, and strong diffuse-lit paper. Result: paper like stucco, a constant-width rim that read as a cartoon outline, washes that traced the lines exactly, a sausage-shaped sky, and muddy blue-over-coral windows.
- **r2:** the prompt switched the rim to blur-subtract with noise gating, required loose wash shapes offset from the lines with bare slivers, used pen hatching (not blue wash) for glazing, added the dry-brush road and a graded linear-gradient sky, and made the paper much finer and fainter. The washes now look like watercolor, and the side-face glazes are the best passage. Remaining problems: the sky was a rectangle with a stepped notch, and with 4 octaves at scale 12 every edge looked like **torn paper**.
- **r3:** displacement dropped to 3 octaves at scale 10 with a 0.5 post-blur, the sky became soft curves faded by an elliptical radial-gradient mask, and the paper was squeezed further. Torn-paper edges are gone, and the sky now frames the focus building.

## What still fails or is weak

- The tree and shadow washes around the right tree pile up into a slightly muddy green-blue cluster.
- The darker tree accents are round blobs; real wash would be a brushy crescent.
- The pen lines are perfectly straight. A hand would wobble a little. The prompt deliberately keeps pen lines unfiltered so they stay crisp, so the only hand cue is overshoot.
- About 12 full-canvas filter instances (every wash uses a userSpaceOnUse region). That is fine for a still, but could be slow to paint on a long page at retina. Tested in Chrome only.

## Biggest lesson

The filter recipe matters less than **what you ask the wash shapes to be**. Washes that copy the line geometry look like a colored-in diagram no matter how good the filter is. A morphology rim reads as an outline, and a blur-subtract rim reads as pigment. The prompt also has to give explicit limits on noise octaves and paper contrast, because the model's defaults overshoot into torn paper and stucco.
