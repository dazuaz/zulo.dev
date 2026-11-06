# halftone — notes

**Verdict:** works. Best file: `halftone-r3.svg` (6.8 KB), PNG `halftone-r3.png`, 1x check `halftone-r3-560.png`.

## The clever SVG mechanic
A real amplitude-modulated screen, built from one pattern, one opacity, and one colour matrix:
- Each ink has a grey **tone map** (plain shapes and gradients; white = no ink).
- A 5x5 `<pattern>` holds one rect filled with a radial "cone" gradient (dark centre, light corners), rotated with `patternTransform` (45deg key, 15deg red).
- The screen rect sits on top of the tone map at `opacity=.5`, so ordinary alpha compositing produces `0.5*tone + 0.5*cone`.
- One `feColorMatrix` (alpha row `-12 0 0 0 6`) thresholds that at 0.5 with a short soft edge: ink wherever tone + cone < 1. Dot radius therefore grows as the tone darkens. `feFlood` with `flood-color:var(--key)` + `feComposite in` colours it, so the palette stays in CSS custom properties.
- The red group overprints with `mix-blend-mode:multiply`.
Grey fills never print as grey; every visible mark is a dot or a solid line. The tone map is tiny, so the file stays under 7 KB. (A `<mask>` can't threshold, so masks aren't used here; the modulation comes from the tone map plus the filter.)

## Rounds
- **r1:** mechanism worked first time, but a linear cone (value proportional to distance) makes coverage go with the square of darkness: light and mid tones printed almost nothing, so the picture was pale, and 1.5-unit outlines broke into dotted lines.
- **r2:** prompt switched to a quadratic cone and gave grey targets, plus 2-unit outlines. The cone values were overshot (coverage about 1.57x the intended amount), so glass and the road plugged to solid black. The key screen also covered the red front of the focus building, and the 45/15 screens mixed into a muddy red-black rosette there.
- **r3:** prompt gives the exact area-linear stops (value = 1.571 x offset squared: 0 / .3 #242424 / .5 #646464 / .65 #a8a8a8 / .7071 #c8c8c8 / .798 #fff). It also tells the key map to keep the focus front near white so only red dots sit there. The result has a full tonal range, the dark areas stay open, and the focus building is the only red object. (r3 changed only the five values the prompt changed, so it was made by editing r2's file to the new prompt values.)

## What still fails / watch-outs
- The cast-shadow parallelograms on the lawn are crude blocks; tree shadows are fine.
- At 560x336 the 5-unit screen survives well. Pitch below about 4 would start to alias. The 45/15 pair gives no visible moire.
- The stop values are the real point. A fresh model given only "use a radial gradient cone" will repeat the r1 mistake, so the exact stops must stay in the prompt.
- Chrome-tested only. `flood-color` via `style` + `var()` and `mix-blend-mode` on a filtered group are worth checking in Safari/Firefox before shipping.
