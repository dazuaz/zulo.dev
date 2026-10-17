# zulo.dev verification map

Read this index, then the feature file for the page you are proving. The built files live in `.vercel/output/static` after `bun run build`.

## Baseline preconditions

- The production build has finished. `.vercel/output/static/lending/index.html` exists.
- A static server for that directory is on `http://127.0.0.1:4323`, started by this run.
- Do not use `astro preview`. The Vercel adapter rejects it.
- Do not drive a server you did not start.

## Driving conventions

- Request the page with curl. Check the title, the description, and the links named in the feature file.
- For a visual check, open the same URL at 1440px wide and at 390px wide.
- A 200 from a different URL is not proof for this feature.

## Proof and skip reporting

- Record the URL, the title, and the description.
- Keep that record under `/tmp/verify-zulo-evidence/`.
- If a link target does not exist yet, report the missing path. Do not remove the link.

## Features

- [Lending](./lending.md) is the page for private lenders.
- [Vaster Agent](./vaster-agent.md) is the staff-workspace case study.
- [Selected work](./work-index.md) lists that case study.
