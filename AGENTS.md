# zulo.dev

The site for Zulo, the AI transformation firm led by Daniel Zuloaga: service pages, case studies under `/work`, and essays under `/blog`. The buyers are executives, operations leaders, and product and engineering leaders at companies deciding whether Zulo can run an AI program across their operation. Developers and operators also read the essays to judge whether Daniel thinks clearly about software and AI-assisted work.

## Positioning

These apply to the marketing pages: home, services, approach, work, about, and contact.

- Sell programs across a client's operation, in three stages: diagnose, deliver, run. Lead with the client's operation and the work, and keep the copy industry-neutral.
- Don't frame the offer around the buyer's stage. A prototype or a stalled initiative is one way in, never the headline.
- Describe staffing as a model: Daniel leads every engagement, and engineers, designers, and domain consultants join for the workstreams that need them. Never state or imply a headcount, a bench, or named team members.
- Present the Vaster work as one program with two workstreams, lending and finance operations. Don't claim which came first.
- The firm speaks as "we" on marketing pages. Daniel speaks as "I" in his bio on `/about` and in every post.

## Content rules

These apply to every page, post, figure, and image prompt.

- Make no claim the repo can't support: no client names beyond the published case studies, and no testimonials, results, metrics, certifications, guarantees, or team-size claims.
- State shipped work as fact only when it traces to source. Case-study claims cite the adjacent repositories, as in `docs/vaster-showcase.md` and `docs/expenses-showcase.md`.
- Label unbuilt work as a proposal and invented examples as hypothetical, in the text and in figure kickers and captions.
- Keep client weaknesses out of public copy: open bugs, security gaps, and internal incidents found in client code stay private, even when they would make a good example.
- Never invent quotes, data, customer stories, or personal experiences. Verify current or disputed facts against primary sources and link them near the claim.
- Voice: plain language over polish, specificity over pitch. It should read like a person wrote it.

## Writing and revising posts

- Use the `write-post` skill for drafting or rewriting a post, and `build-interactive-figures` for figures.
- When revising a published post, set `updatedDate` in its frontmatter.
- Link related posts and the matching `/work` case study where they help the reader.

## Design

Visual direction, palette, type, and accessibility rules are in `DESIGN.md`. Image handling is in `docs/image-delivery.md`.

## Checks

Before finishing a change, run `bun run build`, then `bun run check:seo`. Run `bun run test:images` when a change touches article images.

To see how the live site is doing in Google and AI search, run `bun run seo:report`. It checks Google index coverage per sitemap URL, Search Console clicks and queries, and Vercel traffic by channel, including AI-assistant referrals. It compares against the last snapshot in `.seo-reports/` (gitignored, kept out of this public repo). It needs gcloud application-default credentials with the `webmasters.readonly` scope (see the script header) and a linked Vercel CLI.
