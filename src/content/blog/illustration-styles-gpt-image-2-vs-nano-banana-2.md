---
title: "11 illustration styles, revisited: GPT Image 2 vs. Nano Banana 2"
description: "The same bicycle scene and 11 illustration prompts, prepared for a fresh visual comparison of GPT Image 2 and Nano Banana 2."
pubDate: 2026-09-06
draft: true
tags:
  - AI
  - Illustration
  - Prompt Engineering
  - Design
  - Creative Workflow
---

> Working draft: image generation and observations are pending. The sections below describe what to inspect, not results from completed tests.

A red bicycle courier crosses a stone bridge at sunrise. There is a river below, a city behind, and enough morning mist to soften the distance. It is the same scene from my [original illustration style comparison](/blog/ai-illustration-styles-for-ai-prompts/), and I want to keep it that way.

Keeping the scene gives us something useful to compare. The bridge has broad surfaces, the bicycle has fine structure, and the water has reflections. Each style has to decide what to do with all three.

This time the pair is **GPT Image 2** and **Nano Banana 2**. The question is how each interprets a recognizable illustration technique when it receives the same words. Which parts of the scene remain clear? Where does the requested material change the image, and where does it become decoration?

## Two models, one set of prompts

OpenAI describes GPT Image 2 (`gpt-image-2`) as its current image generation and editing model, with flexible dimensions and high-fidelity image inputs. [OpenAI model documentation](https://developers.openai.com/api/docs/models/gpt-image-2).

Nano Banana 2 is Google's Gemini 3.1 Flash Image (`gemini-3.1-flash-image`). Google positions it as a general-purpose image model balancing quality, speed, and cost. It is a different model from Nano Banana Pro, which appeared in the original post. [Google image generation guide](https://ai.google.dev/gemini-api/docs/image-generation).

That makes this a continuation of the original exercise with a new pair. The old examples remain in the old post with their original model labels.

## How this comparison will work

Each model will receive the original scene prompt followed by exactly one original style block. There are no reference images, follow-up edits, or search tools. The plan is one successful image per style and model: 22 images, with no rerolls to choose a more flattering result.

Both outputs will be square: GPT Image 2 at 1024 × 1024 with high quality, and Nano Banana 2 at its 1K setting with a 1:1 aspect ratio. Those are documented controls, not equivalent compute budgets. This is a visual exercise, not a cost or latency benchmark. [OpenAI output controls](https://developers.openai.com/api/docs/guides/image-generation#customize-image-output), [Gemini image controls](https://ai.google.dev/gemini-api/docs/image-generation).

I am also preserving the original ambiguities: “red bicycle courier” leaves open whether the bicycle, clothing, or both should be red, and some style palettes conflict with that color. Those interpretations belong in the observations, not automatically in a list of errors.

The identical prompt keeps the instructions comparable. It does not guarantee identical framing, a recurring character, or the same interpretation of every word. One output per style can reveal a difference worth investigating; it cannot establish how reliably either model repeats it.

## Base prompt

```text
Draw a red bicycle courier crossing a stone bridge over a calm river at sunrise,
small city skyline in the background, trees on both sides, soft morning mist,
centered composition, full scene, no text or logos.
```

Append one of the following treatments without changing the scene. In each pair, GPT Image 2 will appear first and Nano Banana 2 second.

## 1) Flat Vector Editorial

Flat illustration makes a useful opening test because there is little texture to hide behind. The courier, bridge, and skyline have to read through silhouettes and color blocks. At thumbnail size, look for a bicycle that remains distinct from the rider and a bridge that does not dissolve into the river.

The palette instruction also creates a tension: the base prompt includes “red,” while the style specifies teal, coral, and cream. Notice how each model resolves that choice.

Prompt adjustment:

```text
Style treatment: flat vector editorial illustration, clean geometric shapes,
crisp edges, minimal shading, limited palette of teal coral cream,
subtle grain texture.
```

<!-- comparison:flat-vector — insert verified image pair and observed differences after generation -->

## 2) Isometric Illustration

Here the test is perspective. Follow the bridge edges and the building faces: do they suggest a coherent set of axes, or does the scene slip back into ordinary perspective? A raised camera angle alone does not establish an isometric treatment.

The prompt leaves the exact angle open. That gives each model room to interpret the scene, but it also means differences in framing should be described separately from differences in geometric consistency.

Prompt adjustment:

```text
Style treatment: isometric technical illustration, axonometric perspective,
precise geometry, long soft shadows, muted cyan and warm orange palette.
```

<!-- comparison:isometric — insert verified image pair and observed differences after generation -->

## 3) Ink Line Art

Ink removes most of the palette and puts the work into marks. Look at how each image separates the mist, water, and distant buildings with line weight, spacing, or hatching. A gray gradient may look attractive while sidestepping the requested technique.

The bicycle is a useful stress point. Its thin frame and overlapping spokes ask the model to keep small structures legible without turning the whole foreground into a knot of black lines.

Prompt adjustment:

```text
Style treatment: black and white ink line art, varied line weight,
cross-hatching for shadows, hand-drawn texture on off-white paper.
```

<!-- comparison:ink-line-art — insert verified image pair and observed differences after generation -->

## 4) Watercolor

Watercolor asks for softness without losing the subject. The river and morning mist offer room for transparent washes; the bicycle still needs enough definition to be recognizable. Look for changes in pigment density and edges that feel absorbed into paper.

A paper texture laid over a smooth digital painting is a different interpretation. The comparison should make that distinction visible, rather than treating every pale, softly colored image as equally successful watercolor.

Prompt adjustment:

```text
Style treatment: watercolor illustration on cold-press paper,
transparent washes, soft edges, pigment blooms, light granulation.
```

<!-- comparison:watercolor — insert verified image pair and observed differences after generation -->

## 5) Storybook Gouache

Gouache gives us a neighboring style with a different material logic. The prompt asks for opaque paint, matte surfaces, and layered brushwork. Compare the bridge and skyline with their watercolor counterparts: do the painted shapes feel built up rather than washed in?

For a storybook illustration, I would also want an inviting focal point. That is a preference beyond the literal prompt. Rich surface texture may appeal less to me if it makes the courier difficult to find.

Prompt adjustment:

```text
Style treatment: storybook gouache painting, matte opaque brush strokes,
rich warm palette, layered painted texture.
```

<!-- comparison:storybook-gouache — insert verified image pair and observed differences after generation -->

## 6) Paper-Cut Collage

Does the bicycle seem made from the same paper as the bridge? That is the first detail I would inspect here. Paper-cut collage turns depth into layers, with cut edges and small cast shadows separating the rider, river, and skyline.

A photographed miniature can satisfy this prompt too. The useful question is whether paper fibers, cut edges, and layering remain visible. Preferring a flatter composition would be an aesthetic choice, not evidence that the model ignored the instruction.

Prompt adjustment:

```text
Style treatment: paper-cut collage illustration, layered cut-paper shapes,
tactile paper fibers, soft depth shadows between layers.
```

<!-- comparison:paper-cut — insert verified image pair and observed differences after generation -->

## 7) Risograph Print

The risograph treatment is a test of restraint. Two spot colors, halftone dots, and slight misregistration give it a specific print vocabulary. Extra colors and smooth lighting may enrich the scene while weakening that vocabulary.

Look where the inks appear to overlap. Does the image suggest separate printed layers, or simply use pink and teal as a general palette? The distinction is small in words and easy to see when the images sit together.

Prompt adjustment:

```text
Style treatment: risograph print aesthetic, two-color spot inks
(fluorescent pink and teal), halftone dots, slight misregistration,
vintage poster feel.
```

<!-- comparison:risograph — insert verified image pair and observed differences after generation -->

## 8) Clay 3D / Claymation Look

What happens to the river when the scene becomes clay? It could become another sculpted surface or retain the look of real water. That choice may do as much to establish a miniature world as the rounded courier and handmade bridge. Surface irregularities and soft lighting offer other clues.

Shallow depth of field is part of this prompt, so background softness is expected. Check whether it supports the miniature effect without blurring away the requested city skyline entirely.

Prompt adjustment:

```text
Style treatment: 3D claymation miniature style, rounded handcrafted forms,
soft studio lighting, tactile clay texture, shallow depth of field.
```

<!-- comparison:clay-3d — insert verified image pair and observed differences after generation -->

## 9) Synthetic Cubism

Synthetic Cubism gives the models permission to break the scene into overlapping planes. The challenge is to preserve enough relationships for the courier, bridge, and river to remain readable while changing how space is represented.

Look beyond a layer of triangles. Does the geometry reorganize the scene, or merely decorate an otherwise conventional picture? This is a useful place to separate an adventurous interpretation from a recognizable subject wearing a geometric surface treatment.

Prompt adjustment:

```text
Style treatment: bright colored Synthetic Cubism illustration, angular fractured planes,
overlapping geometric forms, bold contrasting color blocks, subtle painted texture.
```

<!-- comparison:synthetic-cubism — insert verified image pair and observed differences after generation -->

## 10) Linocut Print

The bridge offers broad shapes; the bicycle asks for fine detail. Linocut puts those competing demands into the relationship between ink and the areas left unprinted. Does simplifying the bicycle keep it readable beside the larger printed forms?

The prompt asks for carved marks, rough edges, and two-tone contrast. Shadows that seem constructed from cuts carry a different character from soft shading. This pair should make the models’ choices about detail and simplification particularly visible.

Prompt adjustment:

```text
Style treatment: linocut print illustration, carved line textures, high contrast two-tone ink,
rough hand-carved edges, handmade press texture.
```

<!-- comparison:linocut — insert verified image pair and observed differences after generation -->

## 11) Art Nouveau Poster Illustration

Art Nouveau brings ornament into the composition. Flowing lines and botanical motifs can connect the trees, bridge, and frame, but they can also compete with the courier. Look for decoration that helps organize the scene.

The prompt explicitly excludes typography, even though it asks for a poster treatment. That makes any invented lettering worth recording. Decorative richness and instruction following are separate observations, and neither should disappear inside a single overall judgment.

Prompt adjustment:

```text
Style treatment: Art Nouveau poster illustration, flowing organic lines, ornamental botanical motifs,
flat decorative color fields, vintage print texture, elegant composition, no typography.
```

<!-- comparison:art-nouveau — insert verified image pair and observed differences after generation -->

## What to look for across the pairs

Start with the scene, then the style. Is the courier crossing a recognizable bridge? Does the bicycle hold together? Can you still find the river and skyline? After that, inspect the treatment: edges, palette, materials, and the way depth is constructed.

An image can be appealing and miss part of the instruction. It can also follow the prompt closely without being the picture you would choose for a particular page. Keeping those judgments separate makes the comparison more useful than assigning a winner from first impressions.

For your own project, choose a few styles that fit the intended use and repeat the exercise with your actual subject. A technique that works for this bicycle scene may behave differently with a portrait, a crowded room, or a diagram. Keep the prompt blocks as a starting point, and judge the result at the size and in the context where you actually plan to use it.

## References

- [The original 11-style comparison](/blog/ai-illustration-styles-for-ai-prompts/)
- [OpenAI: GPT Image 2](https://developers.openai.com/api/docs/models/gpt-image-2)
- [OpenAI: Image generation guide](https://developers.openai.com/api/docs/guides/image-generation)
- [Google: Nano Banana image generation](https://ai.google.dev/gemini-api/docs/image-generation)
- [Google: Gemini 3.1 Flash Image](https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-image)
