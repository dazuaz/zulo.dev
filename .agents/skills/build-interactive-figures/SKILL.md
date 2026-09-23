---
name: build-interactive-figures
description: Design and implement custom accessible explanatory figures and animated diagrams for zulo.dev blog posts. Use when a post needs a system diagram, process animation, timeline, comparison, simulation, or other interactive editorial visual; do not use for decorative illustrations or ordinary data charts that are better served by a charting library.
---

# Build Interactive Figures

Create editorial figures with the functional qualities of OpenAI's engineering-post diagrams: semantic structure, clear storytelling, responsive layout, controlled animation, and strong accessibility. Build an original visual language that matches zulo.dev; do not copy another publication's artwork or styling.

## Start with the explanation

Before coding, identify:

- The single claim the figure should make.
- The entities, relationships, states, and time sequence required to make that claim visible.
- What readers must understand from the static state before any animation runs.
- Whether interaction adds genuine explanatory value. Prefer a static figure when it does not.

If the figure's content is underspecified, derive a reasonable model from the post and flag factual assumptions. Ask only when different interpretations would materially change the explanation.

## Inspect the host before choosing an implementation

Read the target post, its rendering path, nearby components, global styles, and package manifest. Reuse the site's typography, color tokens, spacing, focus treatment, and existing dependencies.

For this repository, read [references/zulo-architecture.md](references/zulo-architecture.md) before implementing or embedding a figure. The Markdown rendering path has constraints that affect how interactive code is mounted.

## Choose the lightest suitable mechanism

- **Static HTML/CSS/SVG:** Use for architecture diagrams, labeled flows, and comparisons that need no user-controlled state.
- **Astro component plus a custom element:** Prefer for a small number of phases, autoplay/replay, or lightweight progressive enhancement.
- **React island:** Use when the figure needs coordinated controls, scrubbing, tooltips, or nontrivial state and the host can mount a component cleanly.
- **Charting library:** Use only for quantitative axes, scales, data joins, or zooming that would be wasteful to rebuild. Do not add D3, Visx, Recharts, or another dependency merely to draw boxes and connectors.

Treat the visual as a small explanatory application rather than a video. Model state explicitly and render deterministically from state or elapsed time.

## Build semantics first

Every figure must have a useful non-animated reading:

- Use a real `figure` with a stable label relationship.
- Include a figure number or kicker when the post uses them, a short title, a concise explanation, and a caption or source note when appropriate.
- Keep essential labels as HTML when practical; use SVG for rails, connectors, and marks. Do not bake important text into a raster image.
- Provide a compact textual description of relationships or sequence. Animation and color may reinforce meaning but must not be the only carriers of meaning.
- Mark decorative SVG and motion layers `aria-hidden="true"`. Give meaningful graphic regions a useful accessible name.

## Add interaction deliberately

For timed or phased figures, normally provide replay and play/pause. Add a scrubber or phase selector only when readers benefit from inspecting intermediate state.

Follow these invariants:

- Autoplay only while the figure is meaningfully visible and the document is visible.
- Respect `prefers-reduced-motion`; show a stable, information-complete state and do not autoplay.
- A user-selected phase pauses autoplay until they explicitly resume or replay.
- Use `requestAnimationFrame` for continuous playback, clamp large frame deltas, and derive the view from one timeline value.
- Cancel frames, observers, listeners, and timers when the figure disconnects.
- Buttons have current-state labels such as “Pause animation” and “Play animation,” visible focus styles, and at least a 44px target where layout permits.
- Tooltip-only information must also be reachable with a keyboard and available to touch users. Reuse the existing Radix Tooltip wrapper for React figures.
- Do not trap arrow keys or Tab. If a diagram exposes many inspectable items, use a documented roving-focus pattern and provide an exit path.

Read [references/figure-patterns.md](references/figure-patterns.md) when implementing animation, controls, progressive enhancement, or wide editorial layout.

## Visual and responsive direction

Match zulo.dev's design tokens and typography. Aim for restrained editorial polish: crisp hierarchy, a limited semantic palette, subtle depth, and motion that reveals causality.

- Design the mobile layout intentionally; do not merely shrink the desktop canvas.
- Let complex figures break out of the prose column without causing page-level horizontal overflow.
- Prefer CSS Grid/Flexbox for labeled structure and SVG paths for connectors.
- Keep animation on `transform` and `opacity` when possible.
- Use color consistently for semantic roles and pair it with shape, label, position, or pattern.
- Keep illustrative numbers visibly identified as illustrative when they are not measured data.

## Verification

Verify behavior, not only compilation:

- Build the site with the repository's package manager.
- Check narrow mobile, prose-width, and wide desktop layouts.
- Check keyboard navigation, visible focus, play/pause/replay, phase selection, and scrubbing when present.
- Check reduced-motion behavior and a useful initial/static state.
- Confirm the animation stops offscreen and when the tab is hidden.
- Confirm no figure causes page-level horizontal scrolling.
- Confirm labels and controls remain understandable without relying on color.

When browser tooling is available, inspect the rendered page and exercise at least one full playback or all user-selectable phases. Report what was implemented, where the figure is embedded, and the verification performed.
