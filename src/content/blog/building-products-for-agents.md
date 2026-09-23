---
title: "What changes when an agent can do the boring part?"
description: "A proposal for turning each failed loan transfer into a tested fix, and how I'd decide whether it's worth building."
pubDate: 2026-03-24
updatedDate: 2026-09-23
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

Loan onboarding software does unglamorous work. It reads a record from one system, reshapes the fields, moves the documents, and writes it all to another API.

The happy path is easy. Production data isn't. A date arrives in a format nobody expected. A legacy API returns an undocumented field. A loan has six documents where the test fixture had two. When a transfer fails, a user reports it, a developer digs through logs, someone files an issue, and the fix sits in a queue.

A coding agent can shorten that loop. What follows is a proposal, not something I've shipped.

## The loop

Say a transfer fails on a date format. The agent reads the logs, finds the parsing code, writes a fix, and runs it against a reproduction of the failure. The reviewer then gets the original error, the change, and the test result together.

1. Define what a complete loan record must contain, and who owns the operation.
2. Capture failures in enough detail to reproduce them.
3. Have the agent propose a fix and test it against the failed case and the existing ones.
4. Engineering reviews the code; the operations owner confirms the behavior.
5. Retry the transfer, check for duplicate records and documents, and verify the destination against the source.

The regression test stays in the codebase, so each hard case makes the next transfer more reliable. The person handling the loan is told what changed and whether the record is now complete.

<figure class="blog-figure blog-figure--wide" data-blog-figure="failure-loop" aria-labelledby="failure-loop-title">
  <p class="blog-figure__kicker">Figure 01 · Hypothetical example</p>
  <h3 id="failure-loop-title">One failed transfer, through the loop</h3>
  <p class="blog-figure__intro">A loan transfer fails on a closing date the parser doesn't recognize. Each stage produces something a person can check, and people make the two calls the agent can't.</p>
  <div data-figure-stage>
    <ol>
      <li><strong>Capture (system):</strong> the failed transfer is recorded with the field, the raw value <code>03/04/26</code>, the source API, and how many of its six documents were written.</li>
      <li><strong>Reproduce (agent):</strong> the agent turns the record into a redacted fixture and a test that fails the same way.</li>
      <li><strong>Fix (agent):</strong> the agent changes the date parser to accept the legacy format, and the new test passes along with the 214 existing cases.</li>
      <li><strong>Review (engineer and operations owner):</strong> the engineer reviews the change. The operations owner confirms that <code>03/04/26</code> means March 4, not April 3.</li>
      <li><strong>Retry and verify (system):</strong> the transfer is retried with no duplicate record or documents, the destination is checked against the source, and the loan officer is told the record is complete. The new test stays, so the next transfer in this format passes.</li>
    </ol>
  </div>
  <figcaption>Hypothetical loan, values, and test counts, used to illustrate the proposed workflow.</figcaption>
</figure>

## Is it worth building?

That depends on how often transfers fail and what each failure costs. An occasional annoyance and a daily bottleneck call for different products. I'd measure time to a verified fix, repeat failures, and how much review the loop asks of the operations team, then check whether customers would notice and pay for the difference.

Product and engineering would also have to agree on which failures qualify, who approves a change, and which cases stop for a policy decision. I'd start with one recurring failure and expand only if that worked.
