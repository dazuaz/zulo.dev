# zulo.dev figure integration

Read this reference before adding an interactive figure to this repository. Reinspect the named files because the architecture may evolve.

## Current stack

- Astro renders the site and content collection.
- React is available through `@astrojs/react`.
- Tailwind is available, but established components also use scoped Astro CSS.
- Radix Tooltip is wrapped by `src/components/ui/tooltip.tsx`.
- Blog entries live under `src/content/blog/` and are rendered by `src/pages/blog/[slug].astro` through `src/layouts/BlogPost.astro`.
- `src/components/ui/MarkdownProse.astro` renders the post slot to an HTML string and injects it with `set:html` after image optimization.

The last point matters: do not assume an Astro or React component placed inside a plain Markdown post will hydrate correctly. Inspect the current renderer before selecting an embedding pattern.

## Preferred embedding paths

### Plain Markdown: semantic placeholder plus progressive enhancer

For the existing `.md` pipeline, keep semantic fallback markup in the post and enhance it after render.

Use a stable attribute such as:

```html
<figure class="blog-figure blog-figure--wide" data-blog-figure="request-lifecycle" aria-labelledby="request-lifecycle-title">
  <p class="blog-figure__kicker">Figure 01 · Request lifecycle</p>
  <h3 id="request-lifecycle-title">One request, four handoffs</h3>
  <p>The request moves from intake through review to a recorded decision and finance handoff.</p>
  <div data-figure-stage role="img" aria-label="A four-step request lifecycle: intake, preparation, approval, and finance handoff."></div>
  <figcaption>Illustrative workflow.</figcaption>
</figure>
```

Add or reuse a small runtime loaded from `BlogPost.astro`. It should discover `[data-blog-figure]` roots and lazily load a matching enhancer. Preserve the fallback title, explanation, and accessible description if JavaScript fails.

Prefer a registry based on `import.meta.glob()` over a growing switch statement. Load modules lazily so an unrelated post does not pay for every figure.

A useful module contract is:

```ts
export const id = 'request-lifecycle';

export function enhance(root: HTMLElement) {
  // Add controls, construct the interactive stage, and begin only when visible.
  return () => {
    // Abort listeners, disconnect observers, and cancel animation frames.
  };
}
```

Keep post-specific enhancers and styles together under a discoverable folder such as:

```text
src/components/blog-figures/
  runtime.ts
  request-lifecycle/
    enhance.ts
    figure.css
```

If a runtime already exists, extend it rather than creating another global scanner.

### Astro component or custom element

Use an `.astro` component when the figure is embedded from an Astro page/layout rather than plain Markdown. The repository's `ExpensesShowcase.astro` and `VasterShowcase.astro` demonstrate useful runtime behaviors: visibility-aware playback, document visibility handling, `prefers-reduced-motion`, phase buttons, and cleanup.

Keep each custom element name unique and guard registration:

```ts
if (!customElements.get('request-lifecycle-figure')) {
  customElements.define('request-lifecycle-figure', RequestLifecycleFigure);
}
```

### React island

Use React for richer state, coordinated tooltips, or complex inspection controls. Mount with `client:visible` when possible. Reuse `src/components/ui/tooltip.tsx` instead of importing Radix primitives directly.

Do not add MDX support or change the whole content pipeline solely to mount one figure unless the user asks for that architectural change and the benefit clearly justifies it.

## Styling within the prose column

Blog content is constrained to approximately `65ch`, and prose utilities style descendant headings, images, links, and lists. A figure's scoped stylesheet must deliberately establish its own typography and spacing so prose selectors do not accidentally control the diagram.

For a wide figure nested in the prose column, use a safe breakout pattern and test it at small widths:

```css
.blog-figure--wide {
  width: min(72rem, calc(100vw - 2rem));
  max-width: none;
  margin-inline: 50%;
  transform: translateX(-50%);
}
```

Never rely on a fixed desktop width. The document must not gain horizontal scrolling.

## Existing design language

Reuse the CSS custom properties and fonts defined in `src/styles/global.css`, including the site's background, ink, muted, border, accent, display, UI, and mono roles. Prefer the established focus-ring treatment from nearby components.

Do not visually clone OpenAI's figures. Borrow functional ideas—semantic HTML, inline SVG rails, deterministic playback, replay controls, accessible inspection—and express them in zulo.dev's own palette and typography.

## Build command

Use the package manager declared in `package.json`. At the time this reference was written, that is Bun, so the normal verification command is:

```bash
bun run build
```
