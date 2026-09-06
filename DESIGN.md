# Zulo design system

Zulo is Daniel Zuloaga’s AI transformation practice. Its identity combines business judgment, product thinking, and engineering depth.

## Visual direction

A confident technical practice: charcoal framing, electric lime accents, generous typography, and diagrams that explain the work. Light content sections make detailed service descriptions and writing easy to read. Alternate the hero, capability sections, founder introduction, and closing invitation to create a clear narrative rhythm.

## Palette

- Charcoal `#151915`: navigation, hero, founder section, closing invitation.
- Lime `#c7f36b`: actions and focal points on dark surfaces.
- Page `#f5f6f3`: primary reading surface.
- White `#ffffff`: service panels and form fields.
- Ink `#191d19`: headings and body emphasis.
- Muted `#535c52`: supporting copy on light surfaces.
- Green `#365c23`: accessible links and buttons on light surfaces.
- Border `#d4dad0`: structure and separation.

## Typography and layout

Sora carries headings and navigation. Manrope carries body text. System monospace identifies stages and diagram labels. Main body text starts at 16px; secondary metadata at 12px. Headlines scale fluidly. Marketing sections use a 78rem container; writing retains its narrower reading measures.

Use four-to-six-pixel corners, thin borders, and restrained shadows. The connected-operation diagram is explanatory HTML and SVG, not a live product dashboard. Its labels must never imply actual customer performance.

## Content

Write original, specific copy about strategy, implementation, and adoption. Identify Daniel directly as the practitioner. Workflow opportunities are illustrative and labeled accordingly. Do not add unsupported client names, testimonials, certifications, financial results, delivery guarantees, or team-size claims.

## Interaction and access

- Keep the contact form’s existing validation, status announcements, BotID protection, and Resend email delivery.
- Use native details elements for mobile navigation and FAQs.
- Provide visible keyboard focus, at least 44px action targets, a skip link, and reduced-motion handling.
- Collapse multi-column content for small screens; keep diagrams readable without horizontal scrolling.
- Preserve existing article images and social-preview images.

## Architecture

Astro, Tailwind, React islands, and the Vercel server adapter remain in place. Shared colors live in `src/styles/global.css`. The existing backend has not been migrated to another hosting provider.
