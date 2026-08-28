---
title: "What changes when an agent can do the boring part?"
description: "A loan onboarding agent can run the job, inspect its errors, patch the code, and ask a person to verify the result."
pubDate: 2026-03-24
heroImage: "/blog/building-products-for-agents/hero-ink-line-art.webp"
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

A coding agent creates a tighter loop. Give it a concrete job such as "onboard Loan 1234." The agent calls the onboarding function, reads the result and logs, and sees the failed parse or validation. Because it can also read the source, it can patch the code, run the job again, and compare the source record with the destination.

## The loop I want

1. Run the real operation against production data.
2. Record enough detail to explain every failure.
3. Let the agent propose and test a fix.
4. Ask a person to verify the result.
5. Turn that correction into a test and a product change.

This is more useful than an agent that only fills out a form faster. Each ugly production case can improve the software that handles the next one. The user's correction changes the product instead of disappearing into a ticket queue.
