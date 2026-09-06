# Vaster showcase

The case study at `/work/vaster` presents the application as part of Vaster's lending operation. The shared `VasterShowcase.astro` component appears on the homepage, work index, and case study.

## Presentation

Five chapters cover intake, HubSpot records, identity/consent, Box Sign, and Oscar/MCP. The interface is implemented with native HTML/CSS and a small custom-element controller; no animation dependency or remote embed is required.

- Each chapter runs for 7.5 seconds.
- Selecting a chapter pauses playback; Play resumes.
- Playback stops offscreen and when the document is hidden.
- Reduced motion disables autoplay and scene transitions.
- The first chapter and direct capability links remain available without JavaScript.
- Each chapter links to its corresponding case-study explanation.

The CRM, identity, signature, and Oscar panels are explicitly labeled workflow illustrations with demonstration data. They visualize verified implementation behavior; they are not recordings of live HubSpot, Box, or Slack sessions. The Oscar exchange is illustrative, not a captured model response. No outcome metrics or production integration test results are claimed.

## Capability evidence

Sources were read on 2026-09-06 in the adjacent repositories.

| Capability | Source |
| --- | --- |
| CRM contacts, guarantor/broker roles, property listings, document handoff | `../private-loan-application/src/lib/application-submission.ts`, `src/lib/hubspot.ts` |
| Preserve pipeline, stage, close date on existing-deal updates | `../private-loan-application/src/lib/hubspot.ts` (`dealPropertiesForUpdate`) |
| Encompass import and missing-field handling | `../private-loan-application/src/app/(dashboard)/admin/encompass/[loanId]/create-application/actions.ts` |
| Encrypted SSN storage, masking, consent-gated reveal | `../private-loan-application/src/lib/ssn-pii.ts`, `src/lib/ssn-reveal.ts` |
| Reveal reason, recorded outcome, 30-second display expiry | `../private-loan-application/src/app/(dashboard)/admin/submissions/[uuid]/actions.ts`, `reveal-ssn-dialog.tsx` |
| Online/phone credit authorization and companion PDF evidence | `../private-loan-application/src/lib/credit-authorization-receipt.ts` |
| Parallel signing, reminders, request reuse, signed PDF attachment | `../private-loan-application/src/lib/box-sign-client.ts`, `src/app/apply/[uuid]/sign-application/actions.production.ts`, `src/app/api/box/webhook/route.ts` |
| Application discovery, draft validation/updates, PDFs, document attachment | `../private-loan-application/src/lib/mcp/register-tools.ts` |
| Oscar Slack connection to the application MCP endpoint | `../oscar-agent/agent/connections/vaster-loans.ts` |
| Operations-team membership and approval boundaries | `../oscar-agent/README.md`, `agent/vaster-approval.ts`, `agent/slack-user-group.ts` |
| Original Slack attachment transfer | `../oscar-agent/agent/tools/attach_workspace_document.ts` |
| Oscar's responsibilities and limits | `../oscar-agent/agent/instructions.md` |

## Actual interface captures

The first chapter uses an actual application screenshot. Three full captures remain in the expandable borrower-interface gallery. They were captured on 2026-09-06 from the local `pnpm simulate:borrower` runtime with loopback-only browser requests and local Redis.

The demonstration is a $450,000 refinance on an estimated $750,000 property, with a fictional Example Avenue address and Biscayne Example Holdings LLC. The app's simulation owner is visible. Loan terms and property were saved locally; the entity capture is a filled draft. No production application was submitted.

`public/work/vaster/{terms,property,borrower}.webp` are lossless 1440 × 1000 captures. Only Next.js development indicators were hidden. Application content was not redesigned or retouched.

## Validation

Run `pnpm build` then `pnpm check:seo` for route, metadata, link, and sitemap validation. Browser verification covers all five chapters, matching detail anchors, pause/resume, reduced motion, offscreen behavior, narrow viewports, and no-JavaScript fallback. Capability claims are based on source inspection, not a live end-to-end check of external services.
