# Micrography

Verdict: the viewed round 2 establishes a distinctive, working type-built scene. Round 3 is the final candidate, regenerated to correct its reading direction, corner collisions, faint neighbors, and lack of facade cues. Round 3 is structurally checked but has not been rendered or viewed, following the explicit instruction. Its visual success remains unverified.

## Mechanics that carry the style

Words are the surface material. Independent invisible textPaths carry whole phrases; positive-determinant affine transforms put the type on roof, front, and right planes. textLength fits complete vocabulary runs without a clipped pattern boundary. Shrinking semicircular arcs carry inward-spiralling canopy/shade text; use repeats that construction at three sizes. The foreground road is five parallel runs in a single oblique coordinate plane. The background is the sole solid visible shape. There are no pattern tiles, masks, clip paths, solid window icons, or conventional linework.

## Round 1: viewed after the orchestrator rendered it

The initial local Chrome attempt failed; render-failure.txt is the historical record. The orchestrator then provided micrography-r1.png, which was viewed before round 2. TextPath edge words worked, but tiled fill text produced hard vertical seams and chopped words. A detached uppercase caption was unnecessary, the repeated building texture limited emphasis, and the road read as unrelated bands. The original prompt is retained in micrography-r1-prompt.md; the original SVG and supplied PNG are unchanged.

## Round 2: viewed before the final revision

Replaced the tiled plan with a three-plane axonometric slab, authored whole-word roof/wall rows, open terrace, inward canopy spirals, and one coherent oblique road. The orchestrator supplied micrography-r2.png. Read review-r2.md and viewed that PNG before writing the final prompt.

The roof and two wall planes make the building convincing, and the road and spiral trees retain the typographic construction rather than borrowing ordinary illustrated shapes. Those are clear improvements over round 1. The review called the result the most original image in the lab; that is the reviewer's assessment, not an independently verified comparison with other lab entries.

Observed defects: reverse-directed perimeter segments turn some words upside down, notably the lower lot edge and parts of the roof/terrace. Multiple runs crowd the roof/wall junctions. Neighbor roofs are ghostlike and lack the full three-plane construction. The focus has neither window cues nor an entrance. Round-2 prompt and files are preserved unchanged.

## Round 3: prompt revised first, SVG generated afresh

micrography-prompt.md is the final reusable prompt, also saved verbatim as micrography-r3-prompt.md. Generated micrography-r3.svg from that self-contained prompt; did not edit an earlier round's SVG.

The prompt now specifies:

- Four independent open lot-edge paths. Top and bottom edges both read left-to-right; rising edges run bottom-left to top-right. The closed word perimeter is removed.
- A canvas-space direction rule for every straight text baseline: positive horizontal direction, or upward when vertical. Both horizontal roof/terrace edges use increasing local x; both slanted edges use decreasing local y. All glyph transforms have positive determinant. Circular canopy spirals remain the deliberate exception.
- Focus corner guards of 12 local units, 6–8 at neighbors, shorter complete phrases, and no duplicate word run on a shared roof/wall edge. Main outline type is slightly smaller than in round 2.
- A front window row made from four independent runs of the whole word "window". Split lower wall rows and base leave an entrance void reaching the ground, with tiny entry/door words on its jambs and lintel. All of this remains text, without solid window/door shapes.
- Two complete three-plane neighbors with front and right walls, window vocabulary, 22-unit wall depth, 60% opacity instead of 38%, regular 3.7 px fill and 4.6 px outline type. They remain smaller, lighter, and less dense than the focus.
- Retention of the working spiral canopies, oblique text road, four-color palette, and caption-free composition.

## What still needs inspection

No round-3 renderer was invoked and no round-3 image was viewed. The source removes reversed straight baselines and establishes corner gaps, but the raster still needs checking for perceived glyph orientation after shear, collisions at terrace corners, the legibility of the new entrance/window treatment, and whether stronger neighbors remain subordinate. These are pending inspection targets, not observed final-round defects. No external image or model API was called.

## Checks and files

- micrography-r1.svg: 6,488 bytes; retained with supplied PNG.
- micrography-r2.svg: 11,772 bytes; retained with supplied PNG; strongest visually verified round so far.
- micrography-r3.svg: 14,717 bytes; recommended current candidate, pending the orchestrator's final render/review.
- All three round prompts are archived. micrography-prompt.md is the final round-3 prompt.
- Round 3 passes xmllint --noout; xmlns and viewBox="0 0 560 336" are set; root has no width/height; under 60 KB.
- Structural check: 47 unique IDs, 74 resolved local references, no missing references, one background rectangle, no patterns/clips/masks/images/scripts/animation.
- A source-level transform audit expands the use-cloned buildings and checks every straight writing guide in canvas coordinates: all 78 straight run instances point left-to-right or vertically bottom-to-top. All glyph transforms have positive determinant. Three circular canopy instances are intentionally excluded from the straight-run rule. This audit is not a render.

Biggest lesson: direction and endpoint clearance are part of the typography. A word-built surface can depict architecture, but geometric closure must not override readable baselines and uncluttered corners.
