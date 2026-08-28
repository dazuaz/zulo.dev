---
title: "Design AI workflows like access can break"
description: "AI access is now a business dependency. Dependencies fail. Here is how to build workflows that survive."
pubDate: 2026-06-16
heroImage: "/blog/design-ai-workflows-like-access-can-break/hero-ai-workflows-access.webp"
heroImageAlt: "Editorial ink illustration of a resilient AI workflow map connecting finance documents, a central routing model, cloud compute, local private compute, and home edge devices with fallback paths."
tags:
  - AI
  - Workflow
  - Product
  - Operations
  - Infrastructure
---

AI access is now a business dependency, and dependencies fail. Build workflows that can fall back to another model or run in a reduced mode. Losing the frontier model should reduce capability without stopping the work.

The lesson from Fable 5 is operational. This is not an argument that proprietary AI is bad or that open models are morally superior.

Anthropic said a U.S. government directive required it to suspend access to Fable 5 and Mythos 5 for foreign nationals, so the company disabled both models globally. David Sacks argued on X that the government acted because Fable was a guarded version of Mythos whose restrictions had been bypassed.

Teams lost access either way.

If a workflow depends on one model, vendor, cloud, jurisdiction, or policy interpretation, you have built an API dependency with a good interface.

> You have not built an AI system. You have built an API dependency with a good interface.

That may be fine for an experiment. It is not enough for a core operation.

## The future stack should be hybrid

Frontier models still matter. Send them the work where their extra capability earns its cost, such as hard reasoning or advanced coding. Routine work should not route there by default.

Imagine AI moving beyond the sidecar chatbot and into daily operations. It reads contracts, handles the first pass of support, and flags compliance exceptions. A weaker model can miss context, create more review work, and slow down the operator it was meant to help. Model quality changes the economics of the day.

But peak quality is not the only requirement. By a 70% model, I mean a capable non-frontier model that handles ordinary business work but does not lead the benchmarks. It is the continuity model.

That model may be the right choice for repetitive work, private data, or tasks that must remain available during an outage. Finance teams do not always need the strongest model to classify an invoice or extract fields from a document. They need one they can inspect and run when the business has to keep moving.

The same applies to homes, devices, factories, and field operations. If the network drops or a provider changes its access rules, the baseline intelligence should not disappear. A local model may be less capable, but it is present.

Presence matters.

## Reliability beats peak intelligence for routine work

Most business workflows are a chain of small decisions, not one clever answer.

Read this document. Classify it. Extract the fields. Compare them against policy. Flag the exceptions. Ask a person for judgment when the system is uncertain. Keep the audit trail.

That workflow does not need one magic model. It needs a reduced mode. A local model might handle classification and extraction while the system queues hard exceptions for later. Sensitive context can stay inside the company boundary.

Use the frontier model where it earns its keep. Do not make it the only path through the business.

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

## This is not an open-source argument

The debate about open source, open weights, model safety, export controls, and national strategy matters. It is not the question I am answering here.

The business question is narrower. Can the company keep operating if access changes?

A provider can rate-limit, region-block, deprecate, reprice, filter, or withdraw a model. If the response is "wait for the vendor," the workflow is fragile. A lower-capability mode lets the work continue.

If Fable 5 going dark for a weekend creates a crisis, the dependency is wearing a workflow costume. Build the fallback before you need it.

Sources: [Anthropic's statement](https://www.anthropic.com/news/fable-mythos-access), [Anthropic on X](https://x.com/AnthropicAI/status/2065597531644743999), [David Sacks on X](https://x.com/DavidSacks/status/2065853007619588171), [FreeFable open letter](https://freefable.org/), and the Open Source Initiative's [Open Source AI Definition](https://opensource.org/ai/open-source-ai-definition).
