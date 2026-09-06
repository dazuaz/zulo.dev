---
title: "What changes when an agent can do the boring part?"
description: "A proposed loan onboarding workflow, and how I would judge whether faster fixes create a better product and a stronger business."
pubDate: 2026-03-24
updatedDate: 2026-09-05
heroImage: "/blog/building-products-for-agents/hero-ink-line-art.webp"
heroImageWidth: 1376
heroImageHeight: 768
heroImageAlt: "Ink line drawing on cream paper of a code terminal, a human and agent workflow loop, and a hand correcting a form that feeds back into code."
tags:
  - Codex
  - Workflow
  - AI
  - Developer Experience
  - Product
---

Most loan onboarding software does a plain job. It reads a record from one system, reshapes the fields, moves the documents, and writes everything to another API.

The happy path is easy. Production data is not. A date arrives in an unexpected format. A legacy API returns a field nobody documented. One loan has six documents where the test fixture had two. People notice this work only when the transfer fails or the new record is incomplete.

The usual response is familiar. A user reports the problem, a developer searches the logs, and somebody opens an issue. The fix waits in a queue.

A coding agent could shorten that loop. The workflow below is a design proposal. It describes how I would connect an operational failure to a reviewed product change.

Consider a loan transfer that fails because a date arrives in an unexpected format. The agent would inspect the result and logs, locate the parsing code, and propose a fix. It would test that change against a controlled reproduction of the failure. A reviewer would then have the original error, the proposed change, and the test result together.

## The loop I want

1. Define the operation, its owner, and what a complete loan record must contain.
2. Capture failures with enough detail to reproduce them in a controlled environment.
3. Let the agent propose a fix and test it against both the failed case and existing cases.
4. Have engineering review the change and the operational owner confirm the expected behavior before release.
5. Retry the approved operation with checks for duplicate records and documents, then verify the destination against the source.

The regression test stays with the product. The person handling the loan gets an explanation of what changed and whether the record is now complete.

## What would make this worth building?

Before investing in this, I would want to understand how often transfers fail, what each failure costs the customer, and who has a reason to pay for a better result. An occasional annoyance and a daily operational bottleneck deserve different products.

I would measure time to a verified resolution, repeat failures, and the amount of review the workflow asks of the operations team. Then I would compare the cost of running and supporting it with the value it creates for the customer. Faster fixes need to translate into something the customer notices and values.

Product and engineering need to agree on which failures qualify for this loop, who can approve a change, and which cases should stop for a policy decision. Those boundaries are part of the design.

That is the opportunity I want to pursue: each difficult production case making the next transfer more reliable. I would start with one recurring failure, prove the improvement with the people doing the work, and use that evidence to decide whether to expand.
