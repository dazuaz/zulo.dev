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

**TL;DR:** AI access is now a business dependency. Dependencies fail. Design workflows with model roles, fallback paths, and data boundaries — so losing the frontier model costs you capability, not continuity.

---

The lesson from Fable 5 is not that proprietary AI is bad, or that open models are morally superior. That is the wrong frame.

The real lesson is operational: AI access is now a business dependency, and dependencies fail.

Anthropic said a U.S. government directive required it to suspend access to Fable 5 and Mythos 5 for foreign nationals, which led the company to disable both models globally. David Sacks argued on X that the government acted because Fable was effectively a guarded version of Mythos, and those guardrails had been bypassed. The technical and political details will keep moving.

The business signal is already clear.

If your workflow depends on one model, one vendor, one cloud, one jurisdiction, or one policy interpretation, you have not built an AI system. You have built an API dependency with a good interface.

> You have not built an AI system. You have built an API dependency with a good interface.

That may be fine for experiments. It is not enough for core operations.

## The future stack should be hybrid

The best frontier models will keep mattering. They are where you send the hardest work: complex reasoning, strategic synthesis, high-value analysis, advanced coding, and cases where quality matters more than every other constraint.

But not every workflow should route to the frontier by default.

To see why, imagine the company a few years from now where AI is not a sidecar chatbot. It is the operating layer. It reads the contracts, closes the books, handles the first pass of customer support, watches for compliance issues, coordinates vendors, monitors devices, and turns messy business events into structured work.

In that world, model quality becomes operational leverage.

We already see a smaller version of this in software development. A developer with access to a frontier coding model has a hard time justifying a meaningfully weaker one for serious work. The weaker model does not just answer worse. It changes the economics of the day. It misses context, creates more review burden, proposes brittle code, and slows down the person who was supposed to move faster.

If one engineering team is building with a frontier model and another is building with a clearly inferior one, that gap compounds.

The same pressure will hit fully AI-dependent organizations. If AI is running finance ops, reviewing exceptions, managing internal knowledge, and coordinating work across the business, leaders will naturally ask why any critical workflow is using a weaker model. Customers will feel the difference. Operators will feel the difference. Competitors will feel the difference.

By 70% model, I mean a capable but non-frontier model: strong enough for most business work, but not the state of the art. It is not the aspirational model. It is the continuity model.

A model that performs at 70% of the flagship benchmark can still be the right model for a large portion of the work when the work is repetitive, private, auditable, latency-sensitive, or operationally critical. It may not be the model you choose for the hardest reasoning task. It may be the model that keeps the business alive when the frontier model is unavailable, inappropriate for the data, restricted by policy, or too centralized to trust as the only path.

In finance and back-office operations, this matters immediately. Invoice classification, reconciliation support, exception triage, document extraction, internal policy lookup, audit prep, and month-end close support do not always need the most powerful model available. They need a model that is stable, inspectable, bounded, and available when the business needs to keep moving.

The same pattern applies at the edge: homes, devices, factories, vehicles, clinics, and field operations. If the network drops, a provider changes access rules, or a policy decision cuts off a model, the baseline intelligence should not disappear. A local model may be less capable, but it is present.

Presence matters.

## Reliability beats peak intelligence for routine work

Most business workflows are not a single clever answer. They are a chain of small decisions.

Read this document. Classify it. Extract the fields. Compare them against policy. Flag the exceptions. Ask a person for judgment when the system is uncertain. Keep the audit trail.

That kind of workflow does not need one magic model. It needs an architecture that can degrade gracefully — where losing the frontier model costs you capability, not continuity.

If the frontier model is available, use it where it earns its keep. If it is unavailable, restricted, too exposed for the data, or inappropriate for the environment, the workflow should still run in a reduced mode. Maybe the local model handles classification and extraction. Maybe sensitive context stays inside the company boundary. Maybe the system queues only the hardest exceptions for later escalation.

The point is not to avoid frontier models. The point is to avoid making them the only path through the business.

## Design workflows around model roles

Founders should stop thinking about "the model" and start thinking about model roles.

Some models are good routers. Some are good extractors. Some are good summarizers. Some are good private assistants over internal documents. Some are good escalation engines for difficult judgment calls. Some are good enough to run locally on a device and keep the workflow alive when the cloud is unavailable.

Once you see models as replaceable components, the architecture changes.

You add routing logic instead of hardcoding one provider. You keep evaluations so model swaps are measured, not improvised. You define data boundaries so the system knows what can leave the environment and what must stay local. You keep logs that show what the model saw, what it decided, and where a human approved or corrected the result.

That is less exciting than a demo. It is also what makes the workflow durable.

## A practical architecture pattern

For business workflows, I would design the stack in layers:

1. **Local or private models** for routine work, sensitive data, and continuity.
2. **Cloud frontier models** for hard reasoning, synthesis, and escalation.
3. **Routing logic** that picks the right model class for each task.
4. **Fallback paths** when a provider, region, or model is unavailable.
5. **Evaluation harnesses** that track whether model swaps improve or degrade the workflow.
6. **Data boundary rules** that decide what can leave the company, device, or home.
7. **Human review points** for policy, accountability, and irreversible actions.

In finance ops, that could mean a private model handles document intake and first-pass extraction, a rules engine checks known constraints, and a frontier model only sees redacted exception bundles that require higher-level reasoning.

At the edge, that could mean a home or device keeps basic intent recognition, scheduling, sensor interpretation, and routine automation local, while cloud intelligence is used only for complex requests. The house should not forget how to work because an API is down.

The same principle applies everywhere: use the strongest model when strength matters, but keep the workflow alive without it.

## This is not an open-source argument

There is a real debate about open source, open weights, model safety, export controls, and national strategy. That debate matters, but it is not the point here.

The founder question is narrower: can your business keep operating if access changes?

If a model is rate-limited, region-blocked, deprecated, repriced, filtered, or pulled back, what happens to the workflow? If the answer is "we wait for the vendor," then the workflow is not resilient. If the answer is "we drop into a lower-capability mode and keep moving," then you are closer to infrastructure.

AI is becoming infrastructure. Infrastructure has to survive politics, outages, regulation, vendor incentives, privacy constraints, and market shocks.

The winning companies will not be the ones that bet everything on one model. They will be the ones that treat models as replaceable components inside durable workflows.

If Fable 5 going dark for a weekend is a crisis, you have not built a workflow. You have built a fragile dependency dressed up as one.

Design accordingly.

---

Sources: [Anthropic's statement](https://www.anthropic.com/news/fable-mythos-access), [Anthropic on X](https://x.com/AnthropicAI/status/2065597531644743999), [David Sacks on X](https://x.com/DavidSacks/status/2065853007619588171), [FreeFable open letter](https://freefable.org/), and the Open Source Initiative's [Open Source AI Definition](https://opensource.org/ai/open-source-ai-definition).
