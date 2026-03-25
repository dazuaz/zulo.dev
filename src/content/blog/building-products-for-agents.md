---
title: "Building products when the operator is an agent"
description: "A loan-onboarding story reframed: what to design for when humans and LLM agents share the same tools—and how to turn judgment into durable software."
pubDate: 2026-03-24
heroImage: "/blog/building-products-for-agents/hero-ink-line-art.webp"
heroImageAlt: "Ink line drawing on cream paper: a code terminal, a circular human-and-agent workflow loop, and a hand correcting a form that feeds back into code—black ink with cross-hatched shadows."
tags:
  - Codex
  - Workflow
  - AI
  - Developer Experience
  - Product
---

I shipped a small internal tool to onboard new loans into our servicing platform. On paper, the happy path is simple: point it at a loan, run the import, done.

That tool is still the product. What changed is **who runs it and how the work closes**.

Instead of clicking through for each loan myself, I open Codex and ask it to **invoke the import function** for that case. The agent reads the output, chases failures, patches code when the bug is ours, runs verification, and I still do a human pass on the record. Then I describe what I changed manually—and that feedback updates the importer so the next loan is closer to right.

This post is not a pitch for “use AI for imports.” It is a way to think about **what good product shape looks like** when LLMs and agents are part of the operating model, not a bolt-on chat window.

## The loop (one concrete instance)

1. **Execute** — The agent runs the same code path a human would, with full access to stdout, stderr, stack traces, and logs.

2. **Diagnose** — It interprets partial success, validation errors, and mapper edge cases in context.

3. **Repair** — When the failure is in our code, it proposes a fix and re-runs, shrinking the distance between “broken” and “known good” without constant context switching.

4. **Verify** — A second agent-style pass can check invariants: expected rows, consistency with similar loans, obvious contradictions.

5. **Human pass** — I open the servicing UI. Some fields need policy judgment, nuance, or a decision that is not worth encoding as rules yet.

6. **Teach the product** — I tell the agent what I changed and why. It reconciles that with the importer and mapping logic and updates the code. Manual work becomes **training signal for the software**, not a one-off correction.

If you squint, this is a product requirement: **executable operations, observable outcomes, reversible human edits, and a path from exception to code.**

## How this should change how you build

### 1. Treat “callable” as a first-class interface

Agents do not thrive on vibes; they thrive on **entry points**. Scripts, CLIs, jobs, and well-named functions beat “open the admin panel and do the thing” when you want automation or assistance to scale.

If the only way to onboard a loan is a sequence of clicks, the agent is stuck simulating a human at a GUI. If the import is `runLoanImport(id)` (or equivalent) with predictable inputs, the agent can operate the same substrate you test in CI.

**Product implication:** invest in the same boundaries you would for APIs and batch jobs—whether or not you expose them to customers. Internal operators and agents are both “clients.”

### 2. Design for observation, not just success

The slow part of operations is rarely “running the job.” It is **reconciling intent with effect**: what did the system do, what did we mean, and where did the model or the rules diverge?

Structured errors, correlation IDs, and logs that answer “what object failed and why” matter more than ever. Unstructured dumps are better than silence, but **machine- and human-legible** beats both.

**Product implication:** when something fails, optimize for answers: field-level validation, explicit state transitions, and reports that an agent (or a tired human) can scan in one pass.

### 3. Separate judgment from mechanics

Agents are strong at mechanics: run, read, diff, patch, re-run. They are weak at **stakeholder truth**—what this loan should mean under your policy, or what you will defend in an audit.

The product pattern that holds up is: **automate the pipeline; reserve the UI for review and judgment** on the exceptions that matter.

**Product implication:** make correction easy where humans must intervene, and make those corrections **addressable** (which record, which field, what changed) so they can flow back into rules and code.

### 4. Close the loop into the codebase

Spreadsheets and sticky corrections are where product learning goes to die. The agent era makes it cheaper to **encode** what you learned—if you ritualize “I changed X because Y; update the mapper.”

That is not the model “learning” in the ML sense. It is **software learning**: your repository becomes the memory of edge cases.

**Product implication:** treat post-import edits as first-class events. Even a lightweight habit—describe deltas, patch code—beats heroic manual cleanup with no upstream fix.

### 5. Verification is part of the product, not QA theater

“Did it work?” should be answerable without tribal knowledge. Checklists, invariant checks, or comparison against a golden path for a known loan family turn verification into something an agent can help run—and a human can trust.

**Product implication:** if only one senior person can tell whether an import is sane, you have a reliability problem that AI will not solve; you have a **specification** problem.

## What stays the same

You still own outcomes, compliance, and customer impact. Agents compress iteration time; they do not remove accountability.

You still need a product story normal humans understand. The agent is an operator mode, not a replacement for clarity of purpose.

## A compact checklist for “agent-era” product shape

- **One obvious way to run the operation** programmatically (CLI, job, function, API).
- **Rich, structured feedback** on failure and partial success.
- **A review surface** where humans apply judgment without fighting the tool.
- **A habit or automation path** from human correction to code or config.
- **Verifiable success criteria** that do not depend on a single expert’s glance.

---

The loan importer was a small tool. The general pattern is larger: **build so that both people and agents can act, see, correct, and improve the system**—and so improvements accumulate in the product instead of in someone’s head.

