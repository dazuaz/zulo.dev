---
name: zulo.dev
description: A direct, grounded personal site for Daniel Zuloaga — notes, essays, and conversation.
colors:
  bg: "oklch(0.965 0.007 255)"
  surface: "oklch(0.995 0.002 255)"
  ink: "oklch(0.18 0.025 255)"
  ink-deep: "oklch(0.14 0.03 250)"
  muted: "oklch(0.42 0.02 255)"
  meta: "oklch(0.5 0.018 255)"
  border: "oklch(0.82 0.012 255)"
  accent: "oklch(0.42 0.14 220)"
  accent-hover: "oklch(0.36 0.14 220)"
  accent-subtle: "oklch(0.93 0.035 220)"
  danger: "oklch(0.52 0.18 25)"
typography:
  display:
    fontFamily: "'Sora', 'Segoe UI', sans-serif"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  section:
    fontFamily: "'Sora', 'Segoe UI', sans-serif"
    fontSize: "clamp(1.25rem, 1.5vw + 0.85rem, 1.5625rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Literata', 'Georgia', serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  ui:
    fontFamily: "'Sora', 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "6px"
  md: "12px"
  lg: "18px"
  xl: "24px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    padding: "10px 16px"
    height: "44px"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
    height: "44px"
---

# Design System: zulo.dev

## Overview

**Creative North Star: "The Workshop Ledger"**

This system treats zulo.dev like a workshop desk with an open ledger: ruled sections, asymmetric layout, readable prose. Structure comes from horizontal rules, type scale, and a persistent nav, not from stacked rounded cards. The site rejects SaaS landing-page grammar and AI-default personal branding.

Depth is tonal. A deep ink band carries the primary CTA; sky-teal marks links and actions on the light ground. Prose runs in Literata; UI and headings use Sora.

**Key Characteristics:**

- Cool tinted neutrals with committed ink-band moments (~30% on CTA sections)
- Sora for display and UI; Literata for long-form body copy
- Ruled sections and row-based post lists instead of identical card grids
- Rectangular portrait, sticky nav, minimal chrome
- 44px minimum touch targets; WCAG 2.1 AA focus rings throughout

## Colors

A cool, low-chroma page with a single sky-teal accent. Warm cream and sand neutrals are explicitly avoided.

### Primary

- **Sky Teal** (oklch(0.48 0.12 230)): Primary actions, links, focus rings, breadcrumb active state. Used sparingly; rarity is the point.

### Neutral

- **Cool Page** (oklch(0.98 0.006 240)): Page background with subtle radial accent washes at corners.
- **White Surface** (oklch(1 0 0)): Cards, panels, form fields.
- **Ink** (oklch(0.22 0.03 250)): Headings and primary body emphasis.
- **Muted** (oklch(0.45 0.02 250)): Body copy and secondary prose.
- **Meta** (oklch(0.52 0.02 250)): Dates, breadcrumbs, metadata (minimum contrast tier).
- **Border** (oklch(0.84 0.015 250)): Surface borders, input strokes, dividers.
- **Accent Subtle** (oklch(0.94 0.03 230)): Blockquote backgrounds, tinted callouts.
- **Danger** (oklch(0.52 0.18 25)): Form errors and validation messages.

### Named Rules

**The One Accent Rule.** Sky teal appears on buttons, links, focus, and one hero label. It never fills large background areas.

**The No-Cream Rule.** Page background stays cool and near-neutral. Warmth lives in copy and photography, not in `#faf7f2`-family tints.

## Typography

**Display / UI Font:** Sora (with metric-matched fallback)
**Body Font:** Literata (with metric-matched fallback)

**Character:** Geometric sans for headings and UI; serif for long-form reading. Headings feel precise; prose feels editorial.

### Hierarchy

- **Display** (600, fluid clamp 2.25–3.75rem, line-height 1.1): Page titles and hero name. `text-wrap: balance` on h1–h3.
- **Section** (600, clamp 1.25–1.5625rem): Section headings and post row titles.
- **Body** (400–500, 1rem, line-height 1.75): Prose and descriptions. Cap line length at 65ch via `--measure-prose`.
- **UI** (500–600, 0.875rem): Nav, buttons, dates, tags, form labels. Sentence case only; no tracked uppercase eyebrows.

### Named Rules

**The Hierarchy Rule.** Section structure is communicated by heading size and weight, not by small caps labels above every block.

## Elevation

Flat-by-default. Structure comes from horizontal rules and ink bands, not stacked card shadows.

### Shadow Vocabulary

- **Surface** (`--shadow-surface`): Subtle hairline on prompt-copy controls only.

### Named Rules

**The Solid Surface Rule.** Containers use opaque surfaces and 1px borders. No backdrop blur on structural panels or navigation.

## Components

### Buttons

- **Shape:** Rounded rectangles (12px) for primary/outline; pills (full radius) for secondary chips.
- **Primary:** Sky teal background, white text, 44px min-height, semibold 14px label.
- **Hover:** Darker accent (`accent-hover`). No transform bounce.
- **Focus:** 2px accent outline, 2px offset (`.focus-ring`).
- **Secondary:** White surface, muted text, 1px border, rounded rectangle for social links.
- **Outline:** White surface, ink text, bordered; used for secondary CTAs.

### Chips

- **Style:** `.tag` — white surface, border, muted text, sentence-case labels.
- **Size:** Min-height 32px, padding 6px 12px.

### Cards / Containers

- **Corner Style:** 8px (`0.5rem`) for panels and buttons.
- **Background:** `--color-surface` via `.content-panel` (forms only).
- **Border:** 1px `--color-border`.
- **Internal Padding:** Fluid via `--space-lg` to `--space-2xl`.

### Inputs / Fields

- **Style:** `.field-input` — 12px radius, 1px border, white background.
- **Focus:** Accent border + 3px accent glow ring.
- **Error:** Danger border and glow; `aria-invalid` with per-field error text below.

### Navigation

- **Breadcrumb:** `.breadcrumb` — 14px medium weight, accent color for links, meta color for separator (`aria-hidden`).
- **Skip link:** Fixed position, appears on focus, accent background.

## Do's and Don'ts

### Do:

- **Do** use Sora for h1–h3 and UI chrome; Literata for long-form body copy.
- **Do** keep body copy in `--color-muted` on white surfaces; bump toward `--color-ink` when contrast is close.
- **Do** apply `.focus-ring` to every link, button, and card-as-link pattern.
- **Do** respect `prefers-reduced-motion: reduce` on entrance animations.
- **Do** pair form errors to fields with `aria-invalid` and `aria-describedby`.

### Don't:

- **Don't** use uppercase tracked eyebrows above every section. One simple hero label is the ceiling.
- **Don't** use glassmorphism, `backdrop-filter` blur, or translucent card backgrounds.
- **Don't** use side-stripe borders (`border-left` > 1px) on blockquotes, cards, or callouts.
- **Don't** use gradient text, hero metrics, or identical icon-card grids.
- **Don't** use IBM Plex Sans, Inter, Fraunces, or other reflex-reject fonts.
- **Don't** default to cream, sand, or warm near-white page backgrounds.
