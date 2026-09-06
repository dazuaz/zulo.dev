---
title: "11 illustration styles, revisited: GPT Image 2 vs. Nano Banana 2"
description: "22 fresh images, 11 unchanged prompts: a side-by-side comparison of GPT Image 2 and Nano Banana 2, with notes on style, detail, and composition."
pubDate: 2026-09-06
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

> The images and draft prose were produced with AI tools. The notes describe the specific outputs shown. The hero is GPT Image 2’s paper-cut result, also included below.

A red bicycle courier crosses a stone bridge at sunrise. There is a river below, a city behind, and enough morning mist to soften the distance. It is the same scene from my [original illustration style comparison](/blog/ai-illustration-styles-for-ai-prompts/), with the same 11 style prompts.

Keeping the scene gives us something useful to compare. The bridge has broad surfaces, the bicycle has fine structure, and the water has reflections. Each style has to decide what to do with all three.

This time the pair is **GPT Image 2** and **Nano Banana 2**. The question is how each interprets a recognizable illustration technique when it receives the same words. Which parts of the scene remain clear? Where does the requested material change the image, and where does it become decoration?

## Two models, one set of prompts

OpenAI describes GPT Image 2 (`gpt-image-2`) as its current image generation and editing model, with flexible dimensions and high-fidelity image inputs. [OpenAI model documentation](https://developers.openai.com/api/docs/models/gpt-image-2).

Nano Banana 2 is Google's Gemini 3.1 Flash Image (`gemini-3.1-flash-image`). Google positions it as a general-purpose image model balancing quality, speed, and cost. It is a different model from Nano Banana Pro, which appeared in the original post. [Google image generation guide](https://ai.google.dev/gemini-api/docs/image-generation).

That makes this a continuation of the original exercise with a new pair. The old examples remain in the old post with their original model labels.

## How I ran the comparison

On September 6, 2026, I generated these 22 images through Vercel AI Gateway, selecting `openai/gpt-image-2` and `google/gemini-3.1-flash-image`. [Gateway image generation guide](https://vercel.com/docs/ai-gateway/modalities/image-generation/ai-sdk).

Each request used the original scene prompt followed by exactly one original style block. There are no reference images, follow-up edits, or search tools. I kept the first successful image per style and model, with no rerolls to choose a more flattering result.

The requested outputs were square: GPT Image 2 at 1024 × 1024 with high quality, and Nano Banana 2 at its 1K setting with a 1:1 aspect ratio. Those are documented controls, not equivalent compute budgets. These settings make the visual comparison practical; they do not support a cost or latency ranking. [OpenAI output controls](https://developers.openai.com/api/docs/guides/image-generation#customize-image-output), [Gemini image controls](https://ai.google.dev/gemini-api/docs/image-generation).

I am also preserving the original ambiguities: “red bicycle courier” leaves open whether the bicycle, clothing, or both should be red, and some style palettes conflict with that color. Those interpretations belong in the observations, not automatically in a list of errors.

The identical prompt keeps the instructions comparable. It does not guarantee identical framing, a recurring character, or the same interpretation of every word. One output per style can reveal a difference worth investigating; it cannot establish how reliably either model repeats it.

## Base prompt

```text
Draw a red bicycle courier crossing a stone bridge over a calm river at sunrise,
small city skyline in the background, trees on both sides, soft morning mist,
centered composition, full scene, no text or logos.
```

Append one treatment to the base prompt. In each pair, GPT Image 2 appears first and Nano Banana 2 second. Select an image to see it at full size.

## 1) Flat Vector Editorial

Nano Banana 2 gives the trees distinct geometric silhouettes and keeps large areas of the sky cream. GPT Image 2 fills the banks with smaller leaves, rocks, and layered shading. Both produce an inviting sunrise, but Nano Banana's output is closer to the simplified shapes in the style block.

They also interpret the courier differently: GPT uses a conventional bicycle; Nano Banana adds a front cargo box. That is a scene choice, separate from the question of which image feels more convincingly flat.

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

The bridge runs diagonally through both images, but the treatment differs sharply. GPT Image 2 produces a detailed aerial scene with textured stone, leafy trees, and atmospheric distance. Nano Banana 2 uses clean parallel bridge edges, outlined tree shapes, and a small cluster of geometric buildings.

For this technical illustration brief, I would start with Nano Banana's version. GPT's is appealing as an environment rendering, but looking down at a bridge is not by itself the same as adopting an isometric drawing language.

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

Nano Banana also retains red on the backpack and bicycle. The base scene includes “red”; the style asks for black and white. Here the models visibly resolve that conflict differently, and I prefer GPT's choice for a strictly monochrome brief.

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

Both show paper texture and softened pigment edges. The distinction I notice is between a landscape painting that contains a courier and an illustration organized around that courier. For a small editorial image, Nano Banana's larger subject is easier to pick out.

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

I prefer GPT's atmosphere as a landscape and Nano Banana's clearer character emphasis for a storybook page. Those are choices about the intended use; neither preference proves that one model reproduces gouache more faithfully in general.

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

This is one of the clearest material comparisons. GPT Image 2 gives the clouds, leaves, and foreground reeds thick-looking edges and pronounced shadows. Its paper grain is visible across the scene. Nano Banana 2 uses smoother layers, a lighter palette, and a winding river assembled from pale shapes.

Both read as paper constructions. GPT's version feels more tactile to me; Nano Banana's feels cleaner and more graphic. The bicycle remains finely detailed in both, which creates a contrast with the broad cut-paper forms around it.

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

Both retain substantial scenery detail. For a bold two-color poster, I would choose GPT's output from this pair. Nano Banana's version interests me more as an image of a worn printed photograph.

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

The water stays glossy and reflective in both. That keeps the sunrise legible while contrasting with the modeled surfaces around it. This pair feels closer in overall interpretation than the flat-vector or isometric examples; the differences are mostly in surface texture and construction.

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

Both keep a recognizable, conventionally arranged bridge scene. I would describe these as geometric interpretations of the prompt rather than use either image as a definitive example of Synthetic Cubism. GPT's continuous color planes are my preference here.

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

The difference changes how the bridge reads: GPT's arch sits within a broad printed landscape; Nano Banana's dark foreground makes the structure feel heavier and the rider more prominent. I would choose Nano Banana's version for a forceful print treatment, and GPT's for the quieter single-ink effect.

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

The distinction is where the decoration lives. GPT's sweeping border frames a relatively naturalistic landscape; Nano Banana's outlines and repeated motifs extend further into the scene. I prefer Nano Banana's more integrated ornament here, though GPT's broad curves give it a strong poster silhouette.

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

## What I would take into the next image

In these outputs, Nano Banana 2 is my starting point for flat or technical illustration. Its geometric trees and cleaner isometric bridge respond more directly to those style blocks. GPT Image 2 gives me the paper texture I prefer and resolves the ink prompt's color conflict in favor of monochrome.

Framing matters too. Nano Banana's courier is larger in the watercolor, gouache, and cubism pairs, which helps at small display sizes. GPT often gives more space to the landscape. Neither choice is automatically better; a storybook page and a landscape print ask different things of the same scene.

For your next project, pick two or three treatments and run them with the subject you actually need. Inspect the image where it will be used: the thumbnail, the page, the poster. A beautiful river reflection is little help if the courier disappears at that size.

## References

- [The original 11-style comparison](/blog/ai-illustration-styles-for-ai-prompts/)
- [OpenAI: GPT Image 2](https://developers.openai.com/api/docs/models/gpt-image-2)
- [OpenAI: Image generation guide](https://developers.openai.com/api/docs/guides/image-generation)
- [Google: Nano Banana image generation](https://ai.google.dev/gemini-api/docs/image-generation)
- [Google: Gemini 3.1 Flash Image](https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-image)
