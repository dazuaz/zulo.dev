---
name: verify-zulo
description: Prove a change on zulo.dev, Daniel Zuloaga's Astro site. Use after editing a page, the nav, the sitemap, or the SEO audit. Launch the built static site, check titles and links, and keep the evidence.
---

# Verify zulo.dev

The site is a prerendered Astro app on the Vercel adapter. A user opens a URL in a browser. Proof is the built HTML, not a typecheck.

`astro preview` does not run here. The adapter prints `The @astrojs/vercel adapter does not support the preview command.` Serve `.vercel/output/static` instead.

Two servers can run at once. Give each one its own port. The files are read-only, so they do not share session state.

## Launch

From the repo root:

```bash
bun run build
```

Ready when the log prints `[build] Complete!` and `.vercel/output/static/lending/index.html` exists.

Serve that directory:

```bash
python3 -m http.server 4323 --bind 127.0.0.1 --directory .vercel/output/static
```

Ready when `curl -sf -o /dev/null http://127.0.0.1:4323/lending/` returns exit 0.

`bun run dev` is the other way to read a page while editing. It listens on port 4321. Do not point the audit at the dev server. `scripts/check-seo.py` reads `.vercel/output/static` only.

## Doctor

Run this before a drive when something looks wrong.

```bash
test -f .vercel/output/static/lending/index.html && echo 'build html present'
curl -sf http://127.0.0.1:4323/lending/ | grep -F 'Private Lending Systems | Zulo'
```

The port must be the one this run started. A connection refused means the server is down. A missing HTML file means the build did not finish. Do not drive that instance.

## Drive

The feature map is `features/README.md`. Drive the lending page with:

```bash
.cursor/skills/verify-zulo/scripts/drive-lending.sh
```

The script starts the server on port 4323 when it is not already running, requests `/lending/`, and checks the title, the Lending link, the sample-demo link, and the staff case-study link. It writes the title and description to `/tmp/verify-zulo-evidence/lending.txt`.

Use the matching feature file for `/work` and `/work/vaster-agent`. Do not call a page verified because a different URL returned 200.

## Evidence

Save proof under `/tmp/verify-zulo-evidence/`. A lending proof is the curl body checks in `lending.txt` plus the HTTP status. A visual proof is a screenshot of the same URL after the action, at 1440px wide and at 390px wide.

`bun run check:seo` is the sitemap and link audit. On this branch it fails with `broken a target /demo` until `/demo` exists. That failure is the audit working. Do not delete the link and do not add an exception to make the audit pass.

## Cleanup

Stop the server this run started. Read the pid from `/tmp/verify-zulo-server.pid` and kill that pid. Do not kill by process name.

```bash
if [ -f /tmp/verify-zulo-server.pid ]; then kill "$(cat /tmp/verify-zulo-server.pid)" || true; rm -f /tmp/verify-zulo-server.pid; fi
```

Leave `/tmp/verify-zulo-evidence/` in place. Cleanup that deletes the proof has failed.

## Helpers

`scripts/drive-lending.sh` is the lending drive. Run it from the repo root. It refuses to start when the lending HTML is missing.
