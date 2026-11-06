# Nocturne

Verdict: visually successful in the fallback renderer; required Chrome visual acceptance remains unverified. Best: `nocturne-r2.svg` and its PNG.

## Mechanic

Darkness is the default state. Radial alpha masks reveal each neighbor locally, reveal the focus's two vertical walls at different intensities, and put a weak wash on its roof. Separate screen-blended contributions add the entrance spill, window cores and road pools. Ground geometry and illumination share an isometric matrix, making ground circles into correctly oriented ellipses. Wall and road clips prevent illumination crossing surface boundaries. A radial site mask dissolves the block perimeter. Reused window symbols supply small luminous cores with limited halation.

## Prompt-driven rounds

1. Wrote `nocturne-prompt-r1.md` before authoring round one. Rendered and viewed the fallback PNG. Composition and focus were clear, but roof outlines, evenly visible neighbors, a crisp curb and glossy trees made an illuminated massing model. Lighting needed to determine what existed in the picture.
2. Added explicit illumination calibration to the prompt, saved verbatim in final `nocturne-prompt.md` and `nocturne-prompt-r2.md`, then hand-authored a new SVG. It removes continuous outlines and roof equipment, masks every neighbor, fades the site, broadens the pools and uses partial tree crescents. Rendered and viewed its fallback PNG before choosing it. The entrance dominates and outer buildings are inferred. Stopped after two rounds.

No round SVG was edited after its first render. Prompt changes preceded regeneration.

## Remaining limitations

The entrance wedge has a noticeable straight cutoff; it reads as directed spill but could be softer. The rightmost tree is mostly a dark disk. Low rooflines and rounded trees suggest the setting without strongly identifying South Florida. Actual Chrome handling of CSS variables, masks and screen blending remains visually unverified.

## Rendering and size

The unmodified `../render.sh` was invoked for both rounds with absolute paths. Both Chrome processes aborted before creating a PNG. Both delivered PNGs are provisional resvg 2.6.2 renders, 1120 × 672, and both were opened with the image viewing tool before critique. CSS palette variables were resolved in memory for fallback rendering; SVG source was unchanged. See `render-notes.md`.

- Round 1: 9,001 bytes.
- Round 2: 8,821 bytes.
- Both pass XML parsing, use the required namespace and viewBox, omit root width/height, and remain below 60 KB. Six CSS palette colors. No text, raster images, external references, scripts or animation.

Biggest lesson: lowering every plane's opacity is insufficient. Mask the whole neighborhood around localized light; let unlit silhouettes and fading ground do the work.
