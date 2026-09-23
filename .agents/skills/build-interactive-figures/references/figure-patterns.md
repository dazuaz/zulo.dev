# Interactive figure patterns

Use only the sections relevant to the figure being built.

## 1. Deterministic timeline

Represent the animation as a pure mapping from time to view state. Avoid chains of timeouts that mutate unrelated elements.

```ts
type Timeline = {
  duration: number;
  render: (elapsed: number) => void;
  initialTime: number;
  reducedMotionTime: number;
};
```

The playback loop owns one `elapsed` value:

```ts
let frame = 0;
let previous: number | null = null;
let elapsed = timeline.initialTime;

function tick(now: number) {
  if (previous !== null) elapsed += Math.min(now - previous, 100);
  previous = now;
  timeline.render(elapsed);
  frame = requestAnimationFrame(tick);
}
```

Cancel and restart the loop through one `syncPlayback()` function. Gate playback on all of these conditions:

- The user has not paused.
- The figure intersects the viewport by a meaningful threshold.
- `document.hidden` is false.
- Reduced motion is not requested.

Use an `AbortController` for event listeners and disconnect observers during cleanup.

## 2. Phased narrative

For a process with three to six meaningful states, expose phase buttons with `aria-pressed`. The visible phase must also be stated in text; do not make the reader infer it from motion alone.

When a phase is selected:

- Set the exact timeline position for that phase.
- Pause autoplay.
- Update the narrative, diagram state, progress indicator, and accessible description together.
- Keep focus on the activating button.

Replay should start from the beginning. Play after manual inspection may continue from the selected phase if that behavior is clear.

## 3. Scrubbable time

Use a range input only when intermediate time is meaningful. Provide a visible unit and an `aria-label`, update an output element, and pause while the reader scrubs.

```html
<label>
  Illustrative time
  <input type="range" min="0" max="40" step="0.1" value="0" aria-label="Seek the request timeline" />
</label>
<output>0.0 / 40 illustrative units</output>
```

If values are illustrative, label them as illustrative. Never make invented values look like production measurements.

## 4. SVG paths with HTML labels

For system and flow diagrams:

- Lay out labeled nodes with Grid or absolute positioning in an aspect-ratio stage.
- Draw connector rails in an overlaid SVG with a stable `viewBox`.
- Use `<path>` elements for lines and arrowheads.
- Animate tokens along rails with SVG `animateMotion` for simple loops, or calculate transforms from timeline progress when pause, scrub, or phase inspection must be exact.
- Keep node labels in HTML for wrapping, responsive layout, and assistive technology.

Decorative motion SVGs should be hidden from assistive technology. The figure's text and accessible description should explain the same relationships.

## 5. Responsive transformation

Do not scale down a dense desktop diagram until labels become unreadable. Choose a deliberate mobile transformation:

- Reflow columns into a vertical sequence.
- Collapse secondary detail into captions.
- Turn side-by-side comparisons into stacked cards sharing the same legend.
- Replace a dense overview with phase-by-phase inspection.
- Allow internal scrolling only when the information is inherently tabular or temporal, and provide a visible cue.

Test at roughly 320px, 768px, and a wide desktop viewport. Check zoom as well as viewport width.

## 6. Reduced motion and no-JavaScript states

The reduced-motion state should be complete, not blank or frozen halfway through. Good defaults include:

- The final state with all important paths visible.
- A representative steady state with a textual explanation.
- All phases stacked as a static comparison.

The no-JavaScript state should retain the title, claim, labels, and caption. Controls may be inserted by the enhancer so inert buttons never appear without JavaScript.

## 7. Accessible inspection

Use native buttons and inputs. For inspectable marks:

- Provide a concise accessible name that includes the entity and value/state.
- Make hover behavior available on focus and touch.
- Prefer the site's Radix Tooltip wrapper for React figures.
- If many marks are keyboard-focusable, implement roving focus only when it reduces excessive Tab stops. Arrow-key behavior must be described by an accessible label.
- Provide an adjacent summary for relationships that cannot be efficiently traversed mark by mark.

Do not announce every animation frame through a live region. Announce user-selected phases or discrete state changes only when the announcement helps.

## 8. Performance boundaries

- Lazy-load interactive code near the viewport.
- Avoid continuous layout reads inside the animation loop.
- Update transforms, opacity, CSS custom properties, and text only when their values change.
- Pause offscreen and in hidden tabs.
- Prefer a few semantic DOM nodes over hundreds of decorative elements.
- Add a charting dependency only when it materially reduces complex scale or interaction logic.

## 9. Completion checklist

A figure is complete when:

- Its explanatory claim is understandable from the static state.
- Animation exposes cause, sequence, accumulation, or comparison rather than merely adding movement.
- Controls and inspectable items work with keyboard and touch.
- Reduced motion, offscreen pausing, hidden-tab pausing, and cleanup work.
- Mobile and wide layouts are intentionally designed.
- The figure uses zulo.dev's visual language and does not imitate another publisher's look.
- The production build succeeds and the rendered article has no page-level overflow.
