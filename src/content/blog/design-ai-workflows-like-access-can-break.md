---
title: "Design AI workflows like access can break"
description: "AI access is now a business dependency. Dependencies fail. Here is how to build workflows that survive."
pubDate: 2026-06-16
updatedDate: 2026-09-05
heroImage: "/blog/design-ai-workflows-like-access-can-break/hero-ai-workflows-access.webp"
heroImageWidth: 1672
heroImageHeight: 941
heroImageAlt: "Editorial ink illustration of a resilient AI workflow map connecting finance documents, a central routing model, cloud compute, local private compute, and home edge devices with fallback paths."
tags:
  - AI
  - Workflow
  - Product
  - Operations
  - Infrastructure
---

AI access is now a business dependency, and dependencies fail. Build workflows that can fall back to another model or run in a reduced mode. Losing the frontier model should reduce capability without stopping the work.

The lesson from Fable 5 reaches into the business. If I sell a product that depends on AI, the customer is relying on a promise I made. A provider changing its access rules does not make that promise disappear.

Anthropic said a U.S. government directive required it to suspend access to Fable 5 and Mythos 5 for foreign nationals, so the company disabled both models globally. David Sacks argued on X that the government acted because Fable was a guarded version of Mythos whose restrictions had been bypassed.

*Update, September 5, 2026: Anthropic [announced Fable 5's global return for July 1](https://www.anthropic.com/news/redeploying-fable-5), with Mythos access restored for a set of U.S. organizations. This article was written during the June suspension. The interruption remains a useful case for planning continuity.*

Depending on one provider may be reasonable for an experiment. For a core operation, I would want an explicit decision about which work can pause, which work must continue, and who owns the response.

## The future stack should be hybrid

Frontier models still matter. Send them the work where their extra capability earns its cost, such as hard reasoning or advanced coding. Routine work should not route there by default.

Imagine AI moving beyond the sidecar chatbot and into daily operations. It reads contracts, handles the first pass of support, and flags compliance exceptions. A weaker model can miss context, create more review work, and slow down the operator it was meant to help. Model quality changes the economics of the day.

Peak quality is one requirement. Another is a fallback model that passes the team's evaluations for a defined set of routine tasks, even if it cannot handle the hardest cases.

That model may be the right choice for repetitive work, private data, or tasks that must remain available during an outage. Finance teams do not always need the strongest model to classify an invoice or extract fields from a document. They need one they can inspect and run when the business has to keep moving.

Local availability can help with continuity, but it still needs to be tested against the work the team expects it to carry.

## Reliability beats peak intelligence for routine work

Most business workflows are a chain of small decisions, not one clever answer.

Read this document. Classify it. Extract the fields. Compare them against policy. Flag the exceptions. Ask a person for judgment when the system is uncertain. Keep the audit trail.

That workflow does not need one magic model. It needs a reduced mode. A local model might handle classification and extraction while the system queues hard exceptions for later. Sensitive context can stay inside the company boundary.

The operational owner should know what will continue, what will queue, and how much additional review the reduced mode requires.

## Design workflows around model roles

Stop asking which model should run the whole system. Ask what job each model owns.

One model can route requests. Another can extract fields. A private model can search internal documents, while a frontier model handles difficult judgment calls. A small local model can keep a device working when the cloud is unavailable.

Treating models as replaceable parts changes the architecture. Routing logic replaces a hardcoded provider. Evaluations show whether a swap helped. Data rules decide what may leave the environment. Logs record what the model saw and where a person corrected it.

This work is less exciting than a demo. It is what keeps the demo running on a bad day.

## A practical architecture pattern

For business workflows, I would split the stack into explicit jobs:

1. Run routine work and sensitive data on local or private models.
2. Send hard reasoning and escalations to cloud frontier models.
3. Route each task by its requirements.
4. Keep a fallback for every provider, region, or model that can fail.
5. Measure model swaps against saved evaluations.
6. Define what data may leave the company, device, or home.
7. Require human review for policy decisions and irreversible actions.

In finance operations, a private model could handle document intake and extraction. A rules engine would check known constraints. The frontier model would see only redacted exceptions that need more reasoning.

A home or device could keep basic intent recognition and routine automation local, then use cloud intelligence for complex requests. The house should not forget how to work because an API is down.

## Decide what the business can promise

Before calling a workflow ready, I would ask the team to demonstrate an outage: disable the primary provider, run a representative workload, and show what completes, what waits, and what the operator sees.

That exercise needs an owner and an acceptable recovery time. It also needs a capacity check. A fallback that sends every case to an already busy operations team can move the bottleneck without resolving it.

A provider can rate-limit, region-block, deprecate, reprice, filter, or withdraw a model. If the response is "wait for the vendor," the workflow is fragile. A lower-capability mode lets the work continue.

I would weigh the cost of continuity against the cost of interruption: lost business, extra support, and damage to customer trust. Some work can wait. Where a customer depends on the product to operate, the price and the operating plan need to support the promise we make.

Sources: [Anthropic's statement](https://www.anthropic.com/news/fable-mythos-access), [Anthropic on X](https://x.com/AnthropicAI/status/2065597531644743999), [David Sacks on X](https://x.com/DavidSacks/status/2065853007619588171), [FreeFable open letter](https://freefable.org/), and the Open Source Initiative's [Open Source AI Definition](https://opensource.org/ai/open-source-ai-definition).
