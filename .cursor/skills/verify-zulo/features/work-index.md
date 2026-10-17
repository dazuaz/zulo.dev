# Selected work

`/work` lists the case studies. Vaster Agent sits between the borrower portal and Vaster Expenses.

## Sub-features

- `index-order`. The kickers read `01 / VASTER`, `02 / VASTER AGENT`, and `03 / VASTER EXPENSES`.
- `index-link`. The Vaster Agent card links to `/work/vaster-agent`.
- `index-diagram`. The card's figure is labeled `DIAGRAM · NOT A SCREENSHOT`.

## How to get to it (user POV)

- Choose Work in the header.
- Open `/work` directly.

## Driving it with curl

Preconditions: the built static server is on port 4323.

- Request `http://127.0.0.1:4323/work/`.
- The body contains `02 / VASTER AGENT`, `href="/work/vaster-agent"`, and `DIAGRAM · NOT A SCREENSHOT`.
- The body still contains `href="/work/vaster"` and `href="/work/expenses"`.

## Gotchas

- The Vaster and Expenses cards mount animated showcases. The Agent card does not. A missing custom element on that card is intentional.
- The diagram label is the illustration label. Do not replace it with a screenshot that has not been approved.
