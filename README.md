# zulo.dev

AI transformation partner website for Daniel Zuloaga’s Zulo practice. Built with Astro, Tailwind CSS, and deployed on Vercel.

Positioning research: [AI transformation research](docs/ai-transformation-research.md). Visual direction: [Design system](DESIGN.md).

## Commands

| Command        | Action                                      |
| :------------- | :------------------------------------------ |
| `pnpm install` | Install dependencies                        |
| `pnpm dev`     | Start dev server at `localhost:4321`        |
| `pnpm build`   | Build for production to `./dist/`           |
| `pnpm check:seo` | Audit production SEO output after building (Python 3) |
| `pnpm preview` | Preview the production build locally        |

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
