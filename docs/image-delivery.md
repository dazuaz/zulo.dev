# Article image delivery

The implementation follows [Astro's image guidance](https://docs.astro.build/en/guides/images/): public URL strings and raw `<img>` markup do not trigger optimization, while imported image metadata can be passed to the native `getImage()` pipeline.

`src/lib/blog-images.ts` explicitly imports the existing blog files as Astro image metadata. This was verified against the installed Astro version in both the production build and browser checks. It preserves established `/blog/...` URLs for full-size images and old external links. New image assets can be placed under `src/` if those compatibility URLs are not needed.

Astro handles conversion, caching, hashed output URLs, and source-size limits. The layout uses its generated output for heroes and social metadata. The shared Markdown wrapper transforms only image nodes with an HTML parser, so inline/raw-HTML images also receive optimized URLs, dimensions, `srcset`, and `sizes`. Full-size links, alt text, and escaped code samples stay intact. Remote images are left alone.

## Resolution and quality

- Candidate widths: 320, 640, 960, 1280, 1600, and 1920 pixels. Astro caps them at the original resolution and does not enlarge the source.
- Measured desktop article width: approximately 634 CSS pixels. Comparison columns: approximately 309 CSS pixels. At a 390px mobile viewport, article images occupy 350 CSS pixels.
- Eager hero sizes reflect the reading column and mobile/tablet gutters. Lazy inline images use `sizes="auto, ..."` to select from their actual rendered width where supported, with layout-specific fallback sizes.
- Illustrations use WebP quality 90; the text-heavy Git diagram uses 95. The native Sharp service uses maximum encoding effort and sharper chroma subsampling.
- Existing WebPs are retained unchanged for the full-resolution candidate, avoiding a lossy re-encode that could enlarge the file or discard detail. Smaller candidates are generated as needed. Original links remain available.
- `cwebp` was used locally as a reference for the ink illustration and diagram. Production uses Astro's native Sharp/libwebp service so cloud builds do not depend on a Homebrew binary.

A 1920px variant can support 3× at this reading width only when the source contains that many pixels. Some existing square illustrations are 1024px, the ink hero is 1672px, and the Git diagram is 1536px. They retain their available detail instead of being artificially enlarged. Comparison columns generally need 640px at 2× and 960px at 3×.

## Validation

`bun run build`, `bun run check:seo`, and `bun run test:images` verify the production pages, actual variant files, dimensions, canonical host, and safe image-markup transformations.

An isolated Chrome review exercised a 390px viewport at 3× and a 1440px viewport at 2× and 3×. It loaded the hero, inline diagram, and comparison images and verified that the selected resource met the rendered width × device density, limited by source resolution. Desktop comparison images selected 640px at 2× and 960px at 3×. Mobile ink and diagram images selected 1280px; desktop 3× used their full available source resolution. The mobile ink image and a pixel-scale desktop diagram crop were visually inspected for legibility and detail.

The local regression tests use synthetic image metadata to check that optimization preserves full-size links, alt text, escaped HTML code examples, external images, and explicit loading choices. This complements the build audit; it is not a Core Web Vitals measurement.
