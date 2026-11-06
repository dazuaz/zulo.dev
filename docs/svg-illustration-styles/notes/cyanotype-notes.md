# Cyanotype

Verdict: qualified visual success in the fallback renderer. Round three is the strongest contact-print interpretation; required Chrome visual acceptance remains unverified. Best: `cyanotype-r3.svg` and its PNG.

## Mechanic

Blue emulsion exists inside an irregular, gently displaced alpha mask, exposing a warm paper margin. The focus house uses an even-odd silhouette with actual transparent window, doorway and porch apertures. Contact halos and localized offset exposures build the pale photographic form with screen blending. A clip confines exposure variation to the house. A reusable crown symbol has a continuous lobed silhouette, radial contact tones and a few pinholes. Tree overlaps with neighboring houses accumulate exposure rather than behave as opaque occlusions.

## Prompt-driven rounds

1. Wrote `cyanotype-prompt-r1.md` before authoring the plan. Rendered and viewed the fallback PNG. Hierarchy was clear, but roof borders, doubled seams, hard lot panels, bubble canopies and detached edge strokes made a vector map colored blue.
2. Revised the prompt before writing a fresh SVG; preserved it as `cyanotype-prompt-r2.md`. Asked for irregular contact edges, continuous canopies, no detached brush frame, and feathered lots. Rendered and viewed the fallback PNG. Material edges improved, but the plan remained diagrammatic. Separated roof seams looked like isolated diagram marks and the main footprint was still an abstract rectangle.
3. Rewrote the prompt as an elevation photogram, saved verbatim in final `cyanotype-prompt.md` and `cyanotype-prompt-r3.md`. Regenerated with a low hipped roof, actual negative apertures, no roof seams, translucent neighbors and overlapping tree exposures. Rendered and viewed the fallback PNG. Elevation makes the cut-paper metaphor and main house readable. Blue windows are holes in the exposure. Stopped at the three-round limit.

No round SVG was edited after its first render. Each change was expressed in the next prompt before regeneration.

## Remaining limitations

This is a cyanotype-inspired illustration, not a physically exact photographic simulation. Clean architecture, narrow luminous fringes and a broadly even blue bath retain a digital quality. The small rear tree has a long straight trunk, and porch bands remain rather geometric. The setting is suggested by rooflines and vegetation rather than distinctive regional details. Chrome filter and blend fidelity remain unverified.

## Rendering and size

The unmodified `../render.sh` was invoked for all three rounds with absolute paths. All three Chrome processes aborted before producing PNGs. All delivered PNGs are provisional resvg 2.6.2 renders at 1120 × 672. Every PNG was opened with the image viewing tool before critique and selection. CSS variables were resolved in memory for fallback compatibility; SVG source was unchanged. See `render-notes.md`.

- Round 1: 7,219 bytes.
- Round 2: 7,614 bytes.
- Round 3: 8,009 bytes.
- All pass XML parsing, use the required namespace and viewBox, omit root width/height, and remain below 60 KB. Five CSS palette colors. No text, raster images, external references, scripts or animation.

Biggest lesson: translucent silhouettes, real negative apertures and exposure overlaps carry the photogram. Fine plan linework pulls the image toward a blueprint even after its paper edges improve.
