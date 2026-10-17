# Vaster Agent

`/work/vaster-agent` is the staff-workspace case study. It is not the borrower portal at `/work/vaster`.

## Sub-features

- `agent-title`. The document title is `Vaster Agent — The Staff Loan File | Zulo`.
- `agent-h1`. The only `h1` is `Vaster Agent`.
- `agent-outcome`. The outcome says a person approves the file.
- `agent-sibling`. The page links to `/work/vaster` and `/lending`.

## How to get to it (user POV)

- From Selected work, open the Vaster Agent card.
- From `/lending`, open the staff-workspace proof link.
- Open `/work/vaster-agent` directly.

## Driving it with curl

Preconditions: the built static server is on port 4323.

- Request `http://127.0.0.1:4323/work/vaster-agent/`. The title is `Vaster Agent — The Staff Loan File | Zulo`.
- The body contains one `<h1`, `href="/work/vaster"`, and `href="/lending"`.
- The HTML source contains `TODO: outcome figures are not approved`.

## Gotchas

- There is no public visit link on this page. A missing external app URL is intentional.
- Do not treat `/work/vaster` as this feature. That page is the borrower portal.
