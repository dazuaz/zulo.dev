---
title: "Design AI workflows like access can break"
description: "AI access is a business dependency, and dependencies fail. Give every workflow a reduced mode that keeps running without the frontier model."
pubDate: 2026-06-16
updatedDate: 2026-09-23
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

If your product depends on a model, your customers are depending on that model's provider too. Losing it should cost you capability, not stop the work.

In June, Anthropic [suspended Fable 5 and Mythos 5 globally](https://www.anthropic.com/news/fable-mythos-access) after a U.S. government directive. Fable [came back on July 1](https://www.anthropic.com/news/redeploying-fable-5), but for a few weeks every workflow built on it had nothing to fall back on. Providers can also rate-limit, region-block, deprecate, reprice, or filter a model. If your plan for any of those is "wait for the vendor," the workflow is fragile.

## Most work doesn't need the best model

A typical business workflow is a chain of small steps: read a document, classify it, extract fields, compare them to policy, flag exceptions, ask a person when unsure, keep an audit trail.

Classifying an invoice doesn't take the strongest model available. It takes one that passes your evaluations for that task and that you can still run during an outage. That might be a smaller model, a private deployment, or something local. Save the frontier model for the work where its extra capability pays for itself: hard reasoning, difficult exceptions, advanced coding.

## Give each model a job

Instead of asking which model runs the system, ask what each model is responsible for:

1. Routine work and sensitive data run on local or private models.
2. Hard reasoning and escalations go to a frontier model.
3. A router sends each task by its requirements, not a hardcoded provider.
4. Every provider, region, or model that can fail has a fallback.
5. Saved evaluations show whether a model swap made things better or worse.
6. Written rules decide what data can leave the company, the device, or the home.
7. Policy decisions and irreversible actions go to a person.

In finance operations, that could mean a private model handles intake and extraction, a rules engine checks the known constraints, and the frontier model only sees redacted exceptions. At home, intent recognition and routine automation run locally and the cloud handles complex requests. The house shouldn't stop working because an API is down.

<figure class="blog-figure blog-figure--wide" data-blog-figure="model-outage" aria-labelledby="model-outage-title">
  <p class="blog-figure__kicker">Figure 01 · Illustrative</p>
  <h3 id="model-outage-title">The same outage, three designs</h3>
  <p class="blog-figure__intro">A day of 100 invoices, 12 of them hard exceptions. When the frontier model goes down, one design stops, one buries the operations team, and one keeps doing routine work and queues only what needs the frontier model.</p>
  <div data-figure-stage>
    <table>
      <thead>
        <tr><th scope="col">Step</th><th scope="col">One provider for everything</th><th scope="col">Send everything to people</th><th scope="col">A model for each job</th></tr>
      </thead>
      <tbody>
        <tr><td>Read and classify</td><td>Frontier model: stopped</td><td>Operations team: by hand</td><td>Private model: running</td></tr>
        <tr><td>Extract fields</td><td>Frontier model: stopped</td><td>Operations team: by hand</td><td>Private model: running</td></tr>
        <tr><td>Check against policy</td><td>Frontier model: stopped</td><td>Operations team: by hand</td><td>Rules engine: running</td></tr>
        <tr><td>Resolve hard exceptions</td><td>Frontier model: stopped</td><td>Operations team: by hand</td><td>Frontier model, redacted: queued</td></tr>
        <tr><td>Decide policy calls</td><td>Person: nothing arrives</td><td>Operations team: behind</td><td>Person: waits on queued exceptions</td></tr>
        <tr><th scope="row">Result with the frontier model down</th><td>0 of 100 finished, 100 stuck</td><td>20 of 100 finished, 80 backlogged</td><td>88 of 100 finished, 12 queued</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption>Illustrative volumes, not measurements. Assumes the operations team can work about 20 invoices a day by hand. With every provider up, all three designs finish all 100 invoices.</figcaption>
</figure>

## Rehearse the outage

Before calling a workflow ready, turn off the primary provider, run a realistic workload, and watch what finishes, what queues, and what the operator sees.

Watch the humans as well as the software. A reduced mode that routes every case to an already busy operations team just moves the bottleneck. Someone should own the response, and there should be an agreed recovery time.

Continuity costs money, and so does an interruption: lost business, extra support, damaged trust. Some work can wait a day. For work that can't, the price and the operating plan have to support what you promised the customer.
