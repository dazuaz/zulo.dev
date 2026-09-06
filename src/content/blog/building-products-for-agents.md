---
title: "What changes when an agent can do the boring part?"
description: "A personal note on loan onboarding, AI agents, and the small shift that happens when software can run the work, show its mistakes, and get corrected."
pubDate: 2026-03-24
heroImage: "/blog/building-products-for-agents/hero-ink-line-art.webp"
heroImageWidth: 1376
heroImageHeight: 768
heroImageAlt: "Ink line drawing on cream paper: a code terminal, a circular human-and-agent workflow loop, and a hand correcting a form that feeds back into code, with black ink and cross-hatched shadows."
tags:
  - Codex
  - Workflow
  - AI
  - Developer Experience
  - Product
---

AI Feedback loop inside product features.

Imagine a simple tool that takes the data from one system and onboards it onto another system. It's a pretty simple tool that uses APIs, takes shapes of data from the source and converts into it's destination shapes. With legacy tools and poorly documented APIs, there will alwyas be edge cases when you actually use with production data. Most of the work is the kind people only notice when it breaks: map this field, normalize that date, move these documents, make sure the resulting record is complete.

So, when something breaks or is not working as expected, the users need to identify the issues, or the developers need to review the logs, or you could have a QA tool that points out the issues, then you create a ticket or github issue to track the problem.

But instead of clicking the button that runs the app, you tell the AI coding agent to run the extraction with accesss to the source code of the program, for example onboard Loan 1234, the AI agent calls the onboarding function, it reads the output, it reads the logs and will be aware of a failing parse or validation, then right there it will fix the code, run it again and validate the source and the target match.

## The ideal AI loop

1. Run the real production operation 
2. Great observability and evals.
3. Allow AI Agent to handle fixes.
4. Users provide validation or steering.
5. Turn the users input into product feedback.
6. AI Agent implements the new changes.

Over time the AI agent learns from the feedback and improves its ability to handle issues and implement changes. The Applications are constantly learning and adapting to new production data and user feedback.
