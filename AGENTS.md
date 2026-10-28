# zulo.dev

Daniel Zuloaga's site for Zulo, his founder-led AI transformation practice: service pages, case studies under `/work`, and essays under `/blog`. Readers are developers, product leaders, and operators, many in fintech, deciding whether Daniel thinks clearly about software and AI-assisted work.

## Content rules

These apply to every page, post, figure, and image prompt.

- Make no claim the repo can't support: no client names beyond the published case studies, and no testimonials, results, metrics, certifications, guarantees, or team-size claims.
- State shipped work as fact only when it traces to source. Case-study claims cite the adjacent repositories, as in `docs/vaster-showcase.md` and `docs/expenses-showcase.md`.
- Label unbuilt work as a proposal and invented examples as hypothetical, in the text and in figure kickers and captions.
- Keep client weaknesses out of public copy: open bugs, security gaps, and internal incidents found in client code stay private, even when they would make a good example.
- Never invent quotes, data, customer stories, or personal experiences. Verify current or disputed facts against primary sources and link them near the claim.
- Voice: first person, plain language over polish, specificity over pitch. It should read like a person wrote it.

## Writing and revising posts

- Use the `write-post` skill for drafting or rewriting a post, and `build-interactive-figures` for figures.
- When revising a published post, set `updatedDate` in its frontmatter.
- Link related posts and the matching `/work` case study where they help the reader.

## Design

Visual direction, palette, type, and accessibility rules are in `DESIGN.md`. Image handling is in `docs/image-delivery.md`.

## Checks

Before finishing a change, run `bun run build`, then `bun run check:seo`. Run `bun run test:images` when a change touches article images.
