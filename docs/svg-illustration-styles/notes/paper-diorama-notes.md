# paper-diorama: notes

**Verdict:** works. Best file: `paper-diorama-r3.svg` (7.6 KB) / `paper-diorama-r3.png`.

## The clever SVG mechanic
- One `<filter>` per sheet does everything: `feDisplacementMap` from low-frequency noise gives a hand-cut edge wobble; `feTurbulence → feDiffuseLighting` makes a fibre bump map that is multiplied onto the sheet (`feComposite arithmetic`) and kept inside it (`operator="in"`); then two shadows from the cut alpha, a tight contact shadow and a soft ambient one, merged under the sheet. The two-shadow stack is what makes it read as physical depth rather than a generic drop shadow.
- Windows are holes cut with a `<mask>` on an inner `<g>`, with the filter on the outer `<g>`. The shadow is built from the masked alpha, so every window shows the sheet behind with a shadow on its top and left inner edges. Up close this is the most convincing part.
- Depth is coded into shadow offset: normal sheets use `#paper` (4/5 px ambient), the focus building uses `#paper-lift` (8/10 px, softer). The focus building reads as mounted further forward with no change of colour or size.
- A whole-box light pool from `feDiffuseLighting` + `feSpotLight` on a flat flood, multiplied over the scene at low opacity. Clouds in the same cream as the sky exist only through their shadows.

## Rounds
- **r1:** six sheets, filter as specified. Texture far too strong (surfaceScale 1.2, k1 0.9): it read as stucco or sandpaper. Sheets barely overlapped, so most shadows fell on empty sky and depth was weak. Rectangles were perfectly straight (not cut paper). The hedge path ended short of the right edge.
- **r2 prompt changes:** seven sheets, with the trees on their own sheet overlapping the neighbours and the focus overlapping the trees ("overlap is what makes the depth read"); edge wobble via `feDisplacementMap`; fibre turned down (k1 0.3/k2 0.72); a second lifted filter for the focus; the spotlight overlay; a shallower road band. Result: depth reads properly. The far band was hidden behind the neighbours, the palms were invisible, and the sky looked grey under the light pool.
- **r3 prompt changes:** the far sheet is tall enough to show (roofs at 45% height, palm crowns above neighbour roofs), plus a sun and cut clouds on that sheet; uneven hedge bumps instead of regular scallops; fibre slightly up (k1 0.45/k2 0.58); a wider, weaker light cone (0.22) so the cream stays clean.

## What still fails
- Up close the fibre reads as pebbled or embossed leather, not paper. Isotropic fractal noise through `feDiffuseLighting` gives stucco. Real paper fibre probably needs anisotropic, very low-amplitude noise. At article width it is fine.
- The light pool is subtle enough that most readers won't notice it.
- Palms are crude. A prompt can't art-direct a palm silhouette well; it only gets "a palm".
- Process caveat: r2 and r3 were written by applying each prompt revision to the previous output, not regenerated from a blank slate, so fresh-model fidelity is approximate. The prompt now carries every decision that mattered.

File size r3: 7,652 bytes.
