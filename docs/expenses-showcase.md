# Vaster Expenses showcase

Source reviewed: `/Volumes/FastSSD/Code/ai-expense-draft` on 2026-09-06. The user called this project `expense-loan-draft`; the local README names it Vaster Expenses. The provided public URL, https://expenses.vaster.app, returned HTTP 200 to a read-only HEAD request. No authenticated production screens or customer records were accessed.

## Presentation provenance

`src/components/ExpensesShowcase.astro` is an illustrated HTML/CSS product workflow, explicitly labeled as such on the page. It is not a production screen capture. The vendor Example Inspection Co., invoice DEMO-1042, $480 amount, filename, request, and all activity events are fictional. No client information or production attachments are used. The last scene stops at finance follow-up; it does not represent execution of a payment.

## Capability evidence

- `src/lib/server/expense-fns.ts`: typed extraction of invoices/receipts, transaction list classification, available fields, categories and unresolved information; conversation-to-draft parsing.
- `src/routes/api/chat-expense.ts`: planner for add, update, remove, clear, reorder and field edits; explicit clarification for ambiguous references.
- `src/lib/draft-operations.ts`: application of structured operations to current draft.
- `src/lib/file-matching.ts`: file association by extracted values and confidence; `src/lib/expense-parsing.ts` and `src/lib/expense-draft.ts`: transaction deduplication and draft assembly. The showcase avoids claiming perfect matching or fraud detection.
- `src/lib/request-constants.ts`: vendor payment, reimbursement, company card approval; categories for Vaster's property, licensing, professional service and other expenses; payment rail/timing values.
- `src/routes/api/requests/submit.ts`: creates the submitted request, items, attachment links, initial comment and submission event in one database transaction. Draft-level payment preferences and vendor invoice references are not all persisted as structured submission fields; the presentation keeps invoice reference in the draft scene and treats the invoice as a supporting document during review.
- `src/routes/api/approve-request.ts`: enforces approval/status transitions, writes decisions atomically with status updates, handles concurrent changes, then notifies requester and finance.
- `src/lib/attention-utils.ts`: separate pending approval and approved finance queues.
- `src/lib/notifications.ts`: approval requests, status updates, comments, finance handoffs, and notification delivery history.
- `src/lib/server/admin-fns.ts`: role-based access and combined request activity history.
- `src/lib/request-type-correction.ts`: permissioned workflow type correction based on request status, full item review, and retained known fields.

No live integration reliability, measured savings, autonomous payment execution, accounting/CRM integration, or compliance certification is claimed.

## Behavior

Four chapters progress every seven seconds only while visible. Chapter selection pauses playback; the playback button resumes it. Reduced-motion starts paused and removes scene animation. Each scene is native text, with inactive scenes hidden from assistive technology. The first chapter remains usable with JavaScript disabled.

## Validation

Local browser check at 1440px and 390px: all four chapter controls select exactly one visible scene; reduced-motion starts paused; no horizontal overflow in any mobile chapter; no browser page errors. Visually inspected desktop and mobile screenshots. Parent agent runs integrated production build and SEO checks.
