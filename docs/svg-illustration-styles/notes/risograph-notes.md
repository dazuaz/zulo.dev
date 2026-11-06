# risograph: notes

**Verdict:** works. r3 reads as a real three-drum riso print: grainy solid inks, pink-over-teal plum where they overprint, teal-over-yellow green canopies, visible misregistration, clean warm paper.

**Best file:** `risograph-r3.svg` (7.6 KB) / `risograph-r3.png`. Final prompt: `risograph-prompt.md` (same as `risograph-prompt-r3.md`).

## The clever SVG mechanic

- **Separations as groups.** One `<g>` per ink drum, each drawn in one color only, each with `mix-blend-mode:multiply`. The overprint colors (plum windows, orange where the sun sits behind the building, green trees) are never specified; they fall out of multiply, the way they do on a real duplicator.
- **Misregistration is one `transform`.** The pink drum is `translate(2.5,1.5)`, so every pink shape drifts off its teal partner together, like a real drum offset.
- **Ink filter per drum:** fine fractalNoise thresholded to alpha (speckle voids), times low-frequency noise mapped to 0.78–1 alpha (uneven ink density), combined with `feComposite arithmetic k1=1`, then `in` against the slightly displaced artwork.
- **Separation knock-outs with `<mask>`.** The yellow road centerline prints into a hole masked out of the teal road, and the breeze-block screen is a pattern of black circles in a mask over the pink facade.
- **Halftone tints are `<pattern>` dots, not opacity.**

## Rounds

- **r1:** 15° halftones on a 4-unit grid for most surfaces, low-frequency displacement (baseFrequency 0.045, scale 2.2), strong paper speckle. Result: good riso palette and overprint, but the paper looked like sandpaper, halftone was everywhere (busy), and the neighbor buildings visibly **leaned** like parallelograms.
- **r2:** prompt changed to solid inks by default, halftone only on secondary surfaces and on a 3-unit grid, displacement limited to high frequency at scale ≤1.2, an ink-density noise term added, paper speck capped at about 5% alpha. Paper and grain fixed and the road gained convincing uneven density. The lean **persisted**, so it was not the displacement.
- **r3:** the lean was the halftone itself: at 15°, the clipped rows of dots along a rectangle's edge read as a slanted edge. The prompt now requires 45° and a 3.5-unit cell (which also cuts moiré). The lean is gone. The composition is unchanged from r2 because only that clause changed.

## What still fails or is weak

- The upper third is empty paper with a sun. That is fine for a poster but sparse for a blog figure.
- The yellow lawn strip with a teal tint reads as sand more than grass.
- Speckle voids are horizontally elongated at 2x. That passes as riso, but up close it looks a little like scratches.
- Six full-canvas filter passes (three drums, each with three turbulences). Tested in Chrome only; not tested in Safari or Firefox, where feTurbulence resolution differs.

## Biggest lesson

The thing that broke the illusion was not the filter. It was **pattern geometry interacting with shape edges**: a rotated halftone grid makes rectangles look skewed. If you only describe the filters in the prompt, you miss this. The prompt has to pin the screen angle.
