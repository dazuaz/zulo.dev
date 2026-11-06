# Bauhaus

Verdict: the viewed round 2 achieves bold asymmetry but sacrifices the street scene. Round 3 is the final candidate, regenerated to restore building and tree recognition while keeping that composition. Round 3 is structurally checked but has not been rendered or viewed, following the explicit instruction. Its visual success remains unverified.

## Mechanics that carry the style

An oversized red rectangle bleeds past the viewBox. A mask removes an exact quarter-circle terrace and a row of square window openings. Black right-edge and base bars give the building structure. The foreground road is a local rectangle, clipped userSpaceOnUse lane-mark pattern, and shared rotation. One unit quarter-circle path is instanced at different scales and rotations within the three circular crowns. The palette stays at three primaries, black, and warm paper. Visible forms are pure geometry; there are no text elements.

## Round 1: viewed after the orchestrator rendered it

The initial local Chrome attempt failed; render-failure.txt is the historical record. The orchestrator then provided bauhaus-r1.png, which was viewed before round 2. The result was clean and coherent but too static: three box-like buildings in a row, repeated canopy icons, a centered lot frame, and a stabilizing horizontal road. The original prompt is retained in bauhaus-r1-prompt.md; the original SVG and supplied PNG are unchanged.

## Round 2: viewed before the final revision

Replaced the centered layout with a huge cropped red mass, small staggered primary-colored counterweights, a large quarter-circle cutout, unequal circles, and a diagonal black road. The orchestrator supplied bauhaus-r2.png. Read review-r2.md and viewed that PNG before writing the final prompt.

The new scale, left bleed, displaced shapes, and diagonal produce the requested force and asymmetry. But the visible scene is mostly abstract: the red form is difficult to identify as architecture, the circles lack trunks, and the small blocks offer little building information. The review asks to preserve the composition while restoring immediate city-block recognition. Round-2 prompt and files are preserved unchanged.

## Round 3: prompt revised first, SVG generated afresh

bauhaus-prompt.md is the final reusable prompt, also saved verbatim as bauhaus-r3-prompt.md. Generated bauhaus-r3.svg from that self-contained prompt; did not edit an earlier round's SVG.

The prompt now specifies:

- A compressed street-elevation collage, giving upright windows and doors a consistent architectural role without adding perspective detail.
- The same oversized red facade at x=-32–256,y=24–240, open-ended lot boundary, structural black bars, and radius-96 quarter-circle terrace.
- Six square paper window cutouts, including a four-window lower row, replacing the detached abstract roof marks. One mask handles both the terrace and these apertures.
- A black ground-reaching entrance within a paper surround that interrupts the base. The red form now has explicit facade cues.
- Two small offset neighbors with paired square windows, a door reaching each building's ground edge, and a supporting black edge/base.
- One thin rectangular trunk below each of the three differently sized and colored circular crowns. The trunk is drawn behind its crown so only its lower extension remains visible.
- Retention of the black road's -8 degree rotation, lane pattern, viewBox crops, restrained five-color palette, and quiet paper field.

## What still needs inspection

No round-3 renderer was invoked and no round-3 image was viewed. The next raster should establish whether the windows, entrances, and trunks restore one-second recognition without weakening the abstract poster. The oversized terrace may still compete with the facade reading; the collage's varied scales also need visual assessment. These are pending inspection targets, not observed final-round defects. No external image or model API was called.

## Checks and files

- bauhaus-r1.svg: 2,497 bytes; retained with supplied PNG.
- bauhaus-r2.svg: 3,499 bytes; retained with supplied PNG; strongest visually verified composition, with scene recognition still deficient.
- bauhaus-r3.svg: 4,058 bytes; recommended current candidate, pending the orchestrator's final render/review.
- All three round prompts are archived. bauhaus-prompt.md is the final round-3 prompt.
- Round 3 passes xmllint --noout; xmlns and viewBox="0 0 560 336" are set; root has no width/height; under 60 KB.
- Structural check: 6 unique IDs, 6 resolved local references, no missing references, no text/image/script/animation elements.
- Five visible palette colors use CSS custom properties and var(). Technical white/black in the mask controls transparency only.

Biggest lesson: bold geometry still needs a few unmistakable nouns. A row of windows, a ground-reaching door, and an exposed trunk can supply the scene while scale, cropping, and direction carry the poster.
