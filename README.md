# zulo.dev

AI transformation partner website for Daniel Zuloaga’s Zulo practice. Built with Astro, Tailwind CSS, and deployed on Vercel.

Positioning research: [AI transformation research](docs/ai-transformation-research.md). Visual direction: [Design system](DESIGN.md).

## Commands

| Command        | Action                                      |
| :------------- | :------------------------------------------ |
| `bun install` | Install dependencies                        |
| `bun run dev`     | Start dev server at `localhost:4321`        |
| `bun run build`   | Build for production to `./dist/`           |
| `bun run check:seo` | Audit production SEO output after building (Python 3) |
| `bun run preview` | Preview the production build locally        |

## Structure

```text
src/
  components/   React islands and UI primitives
  content/      Blog posts (Astro content collections)
  layouts/      Page shells
  pages/        Routes and API endpoints
  styles/       Global CSS and design tokens
```

SEO and AI discoverability: [Review, implementation, and deployment checks](docs/seo-aio-review.md). Public pages and discovery feeds are prerendered; publish content changes with a new build/deployment. The contact API remains server-rendered.

Article images use Astro’s native `getImage()` pipeline, including raw HTML in Markdown. Responsive widths, original-file compatibility, and high-DPI checks are documented in [Image delivery](docs/image-delivery.md). Run `bun run test:images` for markup regression checks.

## Social share card

The default Open Graph and Twitter card is `/og/zulo.png`, a 1200×630 PNG
prerendered with [Vercel OG](https://vercel.com/docs/og-image-generation) on every
build. Edit `src/lib/social-card.tsx` to change the artwork. Sora and Manrope font
files and their SIL Open Font Licenses live in `src/assets/fonts`; rendering needs
no external font requests. Shared metadata lives in `src/lib/seo.ts`. Articles
with a hero image continue to use that image. The original `/og.jpg` remains
available for existing links. A future redesign should use a new image path to
help social platforms refresh their image caches. `@vercel/og` is pinned to
0.11.1 because 1.0.2 fails in Node ESM during Astro prerendering with a dynamic
`require("fs")` error; verify `bun run build` before upgrading.

## Contact form email

`/api/contact` validates submissions, checks BotID, then sends the inquiry through
[Resend](https://resend.com/docs/api-reference/emails/send-email). Replies go to the
visitor's email address. Notion is no longer used for new submissions.

Set these server-only variables in `.env` for local development and in the Vercel
project's environment variables for Production (and Preview if needed):

- `RESEND_API_KEY`: a Resend API key with sending access to the verified `zulo.dev` domain.
- `CONTACT_TO_EMAIL`: the inbox that should receive inquiries (one email address).
- `CONTACT_FROM_EMAIL`: optional; defaults to `Zulo <contact@zulo.dev>`.

Restart the dev server after local changes; redeploy after changing Vercel variables.
The old `NOTION_API_KEY` and `NOTION_CONTACT_DATABASE_ID` variables can be removed.

Run `node --experimental-vm-modules --test tests/contact.test.ts` for isolated
contact endpoint checks; these mock Resend and BotID and send no email. After deploying,
submit one inquiry through `/contact` and verify that it arrives and Reply targets
the visitor's address. API acceptance alone does not confirm inbox delivery.
