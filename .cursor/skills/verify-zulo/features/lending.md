# Lending

`/lending` tells a private lender what the staff workspace does, how an engagement starts, and where to write.

## Sub-features

- `lending-title`. The document title is `Private Lending Systems | Zulo`.
- `lending-nav`. The header contains a Lending link to `/lending`.
- `lending-proof`. The page links to `/work/vaster` and `/work/vaster-agent`.
- `lending-demo`. Step 02 links to `/demo`.
- `lending-contact`. The closer links to `/contact` and `mailto:daniel@zulo.dev`.

## How to get to it (user POV)

- Choose Lending in the header.
- Open `/lending` directly.

Below 640px the header labels collapse into the Menu control. Lending is one of those menu links.

## Driving it with curl

Preconditions: `bun run build` has written `.vercel/output/static`, and the static server is on port 4323.

- Request `http://127.0.0.1:4323/lending/`. The title is `Private Lending Systems | Zulo`. The body contains `>Lending<`, `href="/demo"`, `href="/work/vaster"`, `href="/work/vaster-agent"`, `href="/contact"`, and `mailto:daniel@zulo.dev`.
- Or run `.cursor/skills/verify-zulo/scripts/drive-lending.sh` from the repo root. It checks the title, Lending, `/demo`, and `/work/vaster-agent`, and writes `/tmp/verify-zulo-evidence/lending.txt`.

## Gotchas

- `bun run check:seo` fails on `href="/demo"` until that page exists. The drive still passes, because it only checks that the link is present.
- The page has one `h1`. A second `h1` fails the SEO audit for a different reason than the demo link.
