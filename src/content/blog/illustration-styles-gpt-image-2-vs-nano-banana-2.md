---
title: "13 illustration styles, revisited: GPT Image 2 vs. Nano Banana 2"
description: "26 images, 13 styles, one shared scene: a side-by-side comparison of GPT Image 2 and Nano Banana 2, with notes on style, detail, and composition."
pubDate: 2026-09-06
updatedDate: 2026-09-23
draft: false
heroImage: "/blog/illustration-styles-revisited/paper-cut-gpt-image-2.webp"
heroImageAlt: "GPT Image 2 paper-cut illustration of a red bicycle courier on an arched stone bridge, framed by layered paper trees at sunrise."
heroImageWidth: 1024
heroImageHeight: 1024
tags:
  - AI
  - Illustration
  - Prompt Engineering
  - Design
  - Creative Workflow
---

> The images and prose were produced with AI tools. The notes describe the specific outputs shown. The hero is GPT Image 2’s paper-cut result, also included below.

I reran the scene and 11 style treatments from my [original illustration style post](/blog/ai-illustration-styles-for-ai-prompts/) on two newer models, and added cyanotype and embroidery: **13 styles, 26 images**.

The scene is a red bicycle courier crossing a stone bridge at sunrise. The bridge has broad surfaces, the bicycle has fine structure, and the water has reflections, so each style has to decide what to do with all three. The question I kept asking: does the material shape the scene, or just sit on top of it?

## Setup

- **Models:** [GPT Image 2](https://developers.openai.com/api/docs/models/gpt-image-2) (`openai/gpt-image-2`, 1024 × 1024, high quality) and [Nano Banana 2](https://ai.google.dev/gemini-api/docs/image-generation), Google's Gemini 3.1 Flash Image (`google/gemini-3.1-flash-image`, 1K, 1:1). Nano Banana 2 is not the Pro model from the original post.
- **Access:** both through [Vercel AI Gateway](https://vercel.com/docs/ai-gateway/modalities/image-generation/ai-sdk), on September 6–7, 2026.
- **Prompts:** the same base prompt plus one style block. The first 11 blocks are unchanged from the original post.
- **Selection:** the first successful output, with no rerolls, reference images, or edits. One image per style shows what a model can do, not how reliably it does it.

The output settings are practical defaults, not matched compute budgets or a cost benchmark. "Red bicycle courier" doesn't specify whether the bike, the clothes, or both are red, and some palettes conflict with red, so the models' different readings show up in the notes.

## Base prompt

```text
Draw a red bicycle courier crossing a stone bridge over a calm river at sunrise,
small city skyline in the background, trees on both sides, soft morning mist,
centered composition, full scene, no text or logos.
```

In each pair, GPT Image 2 is first and Nano Banana 2 second. Select an image to see it at full size.

## 1) Flat Vector Editorial

Nano Banana 2 gives the trees distinct geometric silhouettes and keeps large areas of the sky cream. GPT Image 2 fills the banks with smaller leaves, rocks, and layered shading. Nano Banana's is closer to the simplified shapes the style block asks for. (It also gave the courier a cargo bike, which is a scene choice, not a style one.)

Prompt adjustment:

```text
Style treatment: flat vector editorial illustration, clean geometric shapes,
crisp edges, minimal shading, limited palette of teal coral cream,
subtle grain texture.
```

<div class="mt-sm grid grid-cols-1 gap-md md:grid-cols-2">
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">GPT Image 2</figcaption>
<a href="/blog/illustration-styles-revisited/flat-vector-gpt-image-2.webp" aria-label="View GPT Image 2 flat vector editorial image at full size">
<img src="/blog/illustration-styles-revisited/flat-vector-gpt-image-2.webp" alt="GPT Image 2: A small courier on a conventional bicycle crosses a bridge amid detailed teal foliage and a warm orange skyline." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">Nano Banana 2</figcaption>
<a href="/blog/illustration-styles-revisited/flat-vector-nano-banana-2.webp" aria-label="View Nano Banana 2 flat vector editorial image at full size">
<img src="/blog/illustration-styles-revisited/flat-vector-nano-banana-2.webp" alt="Nano Banana 2: A courier rides a red cargo bicycle across a bridge, surrounded by geometric teal and coral trees." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
</div>

## 2) Isometric Illustration

GPT Image 2 produces a detailed aerial scene with textured stone, leafy trees, and atmospheric distance. Nano Banana 2 uses clean parallel bridge edges, outlined tree shapes, and a small cluster of geometric buildings.

For a technical illustration I'd start with Nano Banana's. GPT's is a nice environment render, but looking down at a bridge isn't the same as drawing isometrically.

Prompt adjustment:

```text
Style treatment: isometric technical illustration, axonometric perspective,
precise geometry, long soft shadows, muted cyan and warm orange palette.
```

<div class="mt-sm grid grid-cols-1 gap-md md:grid-cols-2">
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">GPT Image 2</figcaption>
<a href="/blog/illustration-styles-revisited/isometric-gpt-image-2.webp" aria-label="View GPT Image 2 isometric illustration image at full size">
<img src="/blog/illustration-styles-revisited/isometric-gpt-image-2.webp" alt="GPT Image 2: An aerial view of a stone bridge, a small bicycle courier, leafy trees, and a detailed city at sunrise." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">Nano Banana 2</figcaption>
<a href="/blog/illustration-styles-revisited/isometric-nano-banana-2.webp" aria-label="View Nano Banana 2 isometric illustration image at full size">
<img src="/blog/illustration-styles-revisited/isometric-nano-banana-2.webp" alt="Nano Banana 2: An outlined diagonal bridge with parallel edges, a bicycle courier, geometric trees, and pale cyan buildings." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
</div>

## 3) Ink Line Art

GPT Image 2 commits to monochrome. Dense marks build the trees and riverbanks around a single broad bridge arch, while the distant city fades into the paper. Nano Banana 2 draws a lighter three-arch bridge and presents the illustration as a sheet casting a small shadow.

Nano Banana keeps red on the backpack and bicycle. The scene asks for red and the style asks for black and white; for a strictly monochrome brief, I prefer GPT's resolution.

Prompt adjustment:

```text
Style treatment: black and white ink line art, varied line weight,
cross-hatching for shadows, hand-drawn texture on off-white paper.
```

<div class="mt-sm grid grid-cols-1 gap-md md:grid-cols-2">
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">GPT Image 2</figcaption>
<a href="/blog/illustration-styles-revisited/ink-line-art-gpt-image-2.webp" aria-label="View GPT Image 2 ink line art image at full size">
<img src="/blog/illustration-styles-revisited/ink-line-art-gpt-image-2.webp" alt="GPT Image 2: Monochrome ink drawing of a courier above one broad bridge arch, with dense hatching in the riverbanks and trees." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">Nano Banana 2</figcaption>
<a href="/blog/illustration-styles-revisited/ink-line-art-nano-banana-2.webp" aria-label="View Nano Banana 2 ink line art image at full size">
<img src="/blog/illustration-styles-revisited/ink-line-art-nano-banana-2.webp" alt="Nano Banana 2: Ink drawing on a depicted sheet of paper: a courier with red accents crosses a three-arch bridge." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
</div>

## 4) Watercolor

GPT Image 2 lets the washes fill the frame, with a bright warm orange reflection and darker, granular banks. The courier is small against that landscape. Nano Banana 2 leaves an irregular white margin, outlines more of the stonework, and makes the rider larger.

GPT's is a landscape painting that happens to contain a courier; Nano Banana's is an illustration organized around one. For a small editorial image, Nano Banana's larger subject is easier to spot.

Prompt adjustment:

```text
Style treatment: watercolor illustration on cold-press paper,
transparent washes, soft edges, pigment blooms, light granulation.
```

<div class="mt-sm grid grid-cols-1 gap-md md:grid-cols-2">
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">GPT Image 2</figcaption>
<a href="/blog/illustration-styles-revisited/watercolor-gpt-image-2.webp" aria-label="View GPT Image 2 watercolor image at full size">
<img src="/blog/illustration-styles-revisited/watercolor-gpt-image-2.webp" alt="GPT Image 2: A small courier crosses a bridge in a full-frame watercolor landscape with granular banks and a bright orange reflection." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">Nano Banana 2</figcaption>
<a href="/blog/illustration-styles-revisited/watercolor-nano-banana-2.webp" aria-label="View Nano Banana 2 watercolor image at full size">
<img src="/blog/illustration-styles-revisited/watercolor-nano-banana-2.webp" alt="Nano Banana 2: A larger courier and outlined stone bridge sit within soft watercolor washes and an irregular white paper margin." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
</div>

## 5) Storybook Gouache

Both models move toward warmer, more opaque-looking paint than in the watercolor pair. GPT Image 2 uses a saturated yellow sky, dense foliage, and a broad arch reflected in the river. Nano Banana 2 gives the courier more space and uses larger, easier-to-read painted shapes in the water and clouds.

GPT's has the better atmosphere as a landscape; Nano Banana's clearer focus on the character suits a storybook page.

Prompt adjustment:

```text
Style treatment: storybook gouache painting, matte opaque brush strokes,
rich warm palette, layered painted texture.
```

<div class="mt-sm grid grid-cols-1 gap-md md:grid-cols-2">
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">GPT Image 2</figcaption>
<a href="/blog/illustration-styles-revisited/storybook-gouache-gpt-image-2.webp" aria-label="View GPT Image 2 storybook gouache image at full size">
<img src="/blog/illustration-styles-revisited/storybook-gouache-gpt-image-2.webp" alt="GPT Image 2: A courier crosses one broad bridge arch beneath a saturated yellow sky and dense painted foliage." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">Nano Banana 2</figcaption>
<a href="/blog/illustration-styles-revisited/storybook-gouache-nano-banana-2.webp" aria-label="View Nano Banana 2 storybook gouache image at full size">
<img src="/blog/illustration-styles-revisited/storybook-gouache-nano-banana-2.webp" alt="Nano Banana 2: A prominent courier crosses a three-arch bridge, with broad painted shapes in the warm sky and reflected water." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
</div>

## 6) Paper-Cut Collage

GPT Image 2 gives the clouds, leaves, and foreground reeds thick-looking edges and pronounced shadows. Its paper grain is visible across the scene. Nano Banana 2 uses smoother layers, a lighter palette, and a winding river assembled from pale shapes.

GPT's feels more tactile; Nano Banana's is cleaner and more graphic. Both keep the bicycle finely detailed, which contrasts with the broad paper shapes around it.

Prompt adjustment:

```text
Style treatment: paper-cut collage illustration, layered cut-paper shapes,
tactile paper fibers, soft depth shadows between layers.
```

<div class="mt-sm grid grid-cols-1 gap-md md:grid-cols-2">
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">GPT Image 2</figcaption>
<a href="/blog/illustration-styles-revisited/paper-cut-gpt-image-2.webp" aria-label="View GPT Image 2 paper-cut collage image at full size">
<img src="/blog/illustration-styles-revisited/paper-cut-gpt-image-2.webp" alt="GPT Image 2: A red bicycle courier crosses a bridge framed by thick layered paper leaves, pronounced shadows, and visible paper grain." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">Nano Banana 2</figcaption>
<a href="/blog/illustration-styles-revisited/paper-cut-nano-banana-2.webp" aria-label="View Nano Banana 2 paper-cut collage image at full size">
<img src="/blog/illustration-styles-revisited/paper-cut-nano-banana-2.webp" alt="Nano Banana 2: A bicycle courier crosses a pale stone bridge in a smooth paper-cut scene with a winding layered river." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
</div>

## 7) Risograph Print

GPT Image 2 pushes the pink and teal much harder: the sky is pink, the banks are teal, and coarse speckling covers the printed surface. Nano Banana 2 is more restrained in its color, with a finely screened landscape and conspicuous pink-and-teal offsets around the rider and rectangular image border.

For a bold two-color poster, I'd pick GPT's. Nano Banana's reads more like a worn printed photograph.

Prompt adjustment:

```text
Style treatment: risograph print aesthetic, two-color spot inks
(fluorescent pink and teal), halftone dots, slight misregistration,
vintage poster feel.
```

<div class="mt-sm grid grid-cols-1 gap-md md:grid-cols-2">
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">GPT Image 2</figcaption>
<a href="/blog/illustration-styles-revisited/risograph-gpt-image-2.webp" aria-label="View GPT Image 2 risograph print image at full size">
<img src="/blog/illustration-styles-revisited/risograph-gpt-image-2.webp" alt="GPT Image 2: A courier and bridge rendered in strongly saturated pink and teal with coarse speckling across the printed scene." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">Nano Banana 2</figcaption>
<a href="/blog/illustration-styles-revisited/risograph-nano-banana-2.webp" aria-label="View Nano Banana 2 risograph print image at full size">
<img src="/blog/illustration-styles-revisited/risograph-nano-banana-2.webp" alt="Nano Banana 2: A finely screened bridge landscape with pink and teal offsets around a large courier and the rectangular print border." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
</div>

## 8) Clay 3D / Claymation Look

Both outputs convincingly turn the rider, bridge, and trees into a miniature scene. GPT Image 2 gives the stones and foliage rougher surfaces, with a softly blurred city behind them. Nano Banana 2 builds more regular cobbles and trees covered in small, repeated leaf shapes.

Both keep the water glossy, which keeps the sunrise legible. This is the closest pair in the set; the differences are mostly surface texture.

Prompt adjustment:

```text
Style treatment: 3D claymation miniature style, rounded handcrafted forms,
soft studio lighting, tactile clay texture, shallow depth of field.
```

<div class="mt-sm grid grid-cols-1 gap-md md:grid-cols-2">
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">GPT Image 2</figcaption>
<a href="/blog/illustration-styles-revisited/clay-3d-gpt-image-2.webp" aria-label="View GPT Image 2 clay 3d / claymation look image at full size">
<img src="/blog/illustration-styles-revisited/clay-3d-gpt-image-2.webp" alt="GPT Image 2: A clay courier crosses a rough stone miniature bridge, with lumpy foliage, glossy water, and a blurred skyline." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">Nano Banana 2</figcaption>
<a href="/blog/illustration-styles-revisited/clay-3d-nano-banana-2.webp" aria-label="View Nano Banana 2 clay 3d / claymation look image at full size">
<img src="/blog/illustration-styles-revisited/clay-3d-nano-banana-2.webp" alt="Nano Banana 2: A clay courier crosses a cobbled miniature bridge between trees covered in small repeated leaf shapes." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
</div>

## 9) Synthetic Cubism

GPT Image 2 spreads colored planes across the sky, bridge, water, and trees, with painted texture connecting the pieces. Nano Banana 2 gives those planes dark outlines and a strong rectangular border, producing something closer to a stained-glass or mosaic effect. Its larger courier is broken into angular shapes too.

Both keep a conventional, recognizable bridge scene, so these are geometric takes on the prompt more than real Synthetic Cubism. I prefer GPT's continuous color planes.

Prompt adjustment:

```text
Style treatment: bright colored Synthetic Cubism illustration, angular fractured planes,
overlapping geometric forms, bold contrasting color blocks, subtle painted texture.
```

<div class="mt-sm grid grid-cols-1 gap-md md:grid-cols-2">
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">GPT Image 2</figcaption>
<a href="/blog/illustration-styles-revisited/synthetic-cubism-gpt-image-2.webp" aria-label="View GPT Image 2 synthetic cubism image at full size">
<img src="/blog/illustration-styles-revisited/synthetic-cubism-gpt-image-2.webp" alt="GPT Image 2: Painted colored planes extend continuously across a bicycle courier, arched bridge, sunrise, and reflected water." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">Nano Banana 2</figcaption>
<a href="/blog/illustration-styles-revisited/synthetic-cubism-nano-banana-2.webp" aria-label="View Nano Banana 2 synthetic cubism image at full size">
<img src="/blog/illustration-styles-revisited/synthetic-cubism-nano-banana-2.webp" alt="Nano Banana 2: A large faceted courier rides through a bridge scene with dark-outlined mosaic shapes and a rectangular border." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
</div>

## 10) Linocut Print

GPT Image 2 interprets “two-tone” as rusty red against cream paper. Fine scraped-looking marks describe the water, foliage, and stone. Nano Banana 2 adds heavy black shapes alongside the red, carving the leaves and reflections into a much stronger contrast.

Nano Banana's dark foreground makes the bridge heavier and the rider more prominent. I'd pick it for a forceful print and GPT's for a quieter single-ink look.

Prompt adjustment:

```text
Style treatment: linocut print illustration, carved line textures, high contrast two-tone ink,
rough hand-carved edges, handmade press texture.
```

<div class="mt-sm grid grid-cols-1 gap-md md:grid-cols-2">
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">GPT Image 2</figcaption>
<a href="/blog/illustration-styles-revisited/linocut-gpt-image-2.webp" aria-label="View GPT Image 2 linocut print image at full size">
<img src="/blog/illustration-styles-revisited/linocut-gpt-image-2.webp" alt="GPT Image 2: Rusty red ink on cream paper forms a courier and bridge, with fine scraped-looking marks in foliage and water." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">Nano Banana 2</figcaption>
<a href="/blog/illustration-styles-revisited/linocut-nano-banana-2.webp" aria-label="View Nano Banana 2 linocut print image at full size">
<img src="/blog/illustration-styles-revisited/linocut-nano-banana-2.webp" alt="Nano Banana 2: Heavy black and rusty red carved shapes frame a prominent courier and bridge above sharply patterned reflections." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
</div>

## 11) Art Nouveau Poster Illustration

GPT Image 2 wraps the landscape in long gold curves, red flowers, and an oval opening. Nano Banana 2 uses a denser rectangular botanical border and carries the ornament onto the bridge itself. Both leave out lettering, as requested.

GPT's border frames a fairly naturalistic landscape; Nano Banana's ornament runs into the scene itself. I prefer Nano Banana's integration, though GPT's curves make a stronger poster silhouette.

Prompt adjustment:

```text
Style treatment: Art Nouveau poster illustration, flowing organic lines, ornamental botanical motifs,
flat decorative color fields, vintage print texture, elegant composition, no typography.
```

<div class="mt-sm grid grid-cols-1 gap-md md:grid-cols-2">
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">GPT Image 2</figcaption>
<a href="/blog/illustration-styles-revisited/art-nouveau-gpt-image-2.webp" aria-label="View GPT Image 2 art nouveau poster illustration image at full size">
<img src="/blog/illustration-styles-revisited/art-nouveau-gpt-image-2.webp" alt="GPT Image 2: A bicycle courier and stone bridge are enclosed by an oval opening, sweeping gold curves, and red flowers." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">Nano Banana 2</figcaption>
<a href="/blog/illustration-styles-revisited/art-nouveau-nano-banana-2.webp" aria-label="View Nano Banana 2 art nouveau poster illustration image at full size">
<img src="/blog/illustration-styles-revisited/art-nouveau-nano-banana-2.webp" alt="Nano Banana 2: A bicycle courier crosses an ornate bridge surrounded by a dense rectangular botanical border and repeated leaf motifs." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
</div>

## 12) Cyanotype-Inspired Illustration

Cyanotype is a photographic printing process; these images imitate its appearance. [Kew’s process guide](https://www.kew.org/read-and-watch/cyanotype-photography) shows the characteristic Prussian blue and white.

Both outputs use blue tones and brushed borders, but neither makes the courier a pale negative silhouette. GPT Image 2 builds a clouded sky and detailed banks around one broad arch. Nano Banana 2 uses three arches, a larger rider, and a visible sun. I prefer GPT’s atmospheric print effect; Nano Banana’s simpler silhouette reads faster.

Prompt adjustment:

```text
Style treatment: cyanotype-inspired illustration, deep Prussian blue and paper white,
delicate negative silhouettes, soft exposure edges, brushed emulsion border,
textured cotton paper, strictly monochrome.
```

<div class="mt-sm grid grid-cols-1 gap-md md:grid-cols-2">
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">GPT Image 2</figcaption>
<a href="/blog/illustration-styles-revisited/cyanotype-gpt-image-2.webp" aria-label="View GPT Image 2 cyanotype-inspired image at full size">
<img src="/blog/illustration-styles-revisited/cyanotype-gpt-image-2.webp" alt="GPT Image 2: A small blue courier crosses one broad bridge arch beneath a clouded sky, with detailed trees and brushed blue print edges." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">Nano Banana 2</figcaption>
<a href="/blog/illustration-styles-revisited/cyanotype-nano-banana-2.webp" aria-label="View Nano Banana 2 cyanotype-inspired image at full size">
<img src="/blog/illustration-styles-revisited/cyanotype-nano-banana-2.webp" alt="Nano Banana 2: A larger blue courier crosses a three-arch bridge below a pale sun, framed by blue brush marks and cream paper." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
</div>

## 13) Embroidered Textile Illustration

GPT Image 2 uses fine stitch-like marks to hold a soft mist, distant skyline, and glowing reflection together. Nano Banana 2 makes the construction more obvious: long diagonal threads cross the sky, horizontal stitches fill the water, and chunky leaves rise from the linen.

GPT's reads like a landscape reproduced in thread; Nano Banana's larger rider and outlined bridge read as embroidery, and would stay recognizable at small sizes.

Prompt adjustment:

```text
Style treatment: hand-embroidered textile illustration on natural linen,
satin-stitch color fields, fine backstitch outlines, directional thread shading,
visible woven ground, subtle raised fibers, entire scene rendered in stitches.
```

<div class="mt-sm grid grid-cols-1 gap-md md:grid-cols-2">
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">GPT Image 2</figcaption>
<a href="/blog/illustration-styles-revisited/embroidered-textile-gpt-image-2.webp" aria-label="View GPT Image 2 embroidered textile image at full size">
<img src="/blog/illustration-styles-revisited/embroidered-textile-gpt-image-2.webp" alt="GPT Image 2: Fine stitch-like marks on linen depict a small red courier, misty skyline, stone arch, and warm reflection." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
<figure class="m-0">
<figcaption class="mb-2xs font-ui text-sm font-semibold leading-ui text-meta">Nano Banana 2</figcaption>
<a href="/blog/illustration-styles-revisited/embroidered-textile-nano-banana-2.webp" aria-label="View Nano Banana 2 embroidered textile image at full size">
<img src="/blog/illustration-styles-revisited/embroidered-textile-nano-banana-2.webp" alt="Nano Banana 2: A prominent red courier crosses an outlined stone bridge surrounded by raised leaves, diagonal sky threads, and horizontal water stitches." width="1024" height="1024" loading="lazy" decoding="async" />
</a>
</figure>
</div>

## What I'd take into the next image

Nano Banana 2 is my starting point for flat or technical illustration; it follows those style blocks more literally. GPT Image 2 gives me the paper texture I prefer and commits to monochrome when asked.

Framing matters as much as style. Nano Banana tends to make the courier larger (watercolor, gouache, cubism), which helps at small sizes. GPT gives more room to the landscape, and its fine detail can blur the very texture that makes a material recognizable, as in the embroidery pair.

If you're choosing a style for a project, run two or three treatments with your actual subject and look at them where they'll be used: the thumbnail, the page, the poster. A beautiful river reflection doesn't help if the courier disappears at that size.

## References

- [The original 11-style comparison](/blog/ai-illustration-styles-for-ai-prompts/)
- [OpenAI: GPT Image 2](https://developers.openai.com/api/docs/models/gpt-image-2)
- [OpenAI: Image generation guide](https://developers.openai.com/api/docs/guides/image-generation)
- [Google: Nano Banana image generation](https://ai.google.dev/gemini-api/docs/image-generation)
- [Google: Gemini 3.1 Flash Image](https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-image)
