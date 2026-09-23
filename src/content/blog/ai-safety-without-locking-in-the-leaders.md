---
title: "AI safety without locking in the leaders"
description: "Pacing frontier AI could buy time for safety while entrenching the labs setting the pace. The rules need to survive cheaper, more widely available capabilities."
pubDate: 2026-09-12
updatedDate: 2026-09-23
heroImage: "/blog/ai-safety-without-locking-in-the-leaders/hero-the-cost-of-entry.webp"
heroImageAlt: "Ink-and-watercolor illustration of a small lab climbing a staircase made of paperwork while an established lab has a level walkway to the same inspection checkpoint."
heroImageWidth: 1536
heroImageHeight: 1024
draft: false
tags:
  - AI
  - Policy
  - Competition
---

Two AI labs face the same safety requirement. One has a legal department, a policy team, and people who already know the evaluators. The other has enough money for its next experiment.

Both should have to show their work is safe. But a requirement to staff a permanent review team, negotiate an approval process, and wait for a decision lands very differently on each. The first absorbs it. The second may run out of money before anyone evaluates its model.

A safety rule can be well intended and still decide who gets to compete.

In his September essay, [Dario Amodei proposes pacing the frontier](https://darioamodei.com/post/we-must-pace-the-frontier): embedded outside evaluators, coordination among frontier labs in democracies, and eventually global coordination. He prefers checks tied to capabilities and observed safety, and also considers limits on compute and on AI-assisted AI development. The argument is that slower progress gives safety work time to catch up.

I take that seriously. My worry is what it does to everyone outside the group setting the pace. If the rules make today's leading labs the only practical way to build powerful AI, that cost could outlast whatever time the rules buy.

## The cost of being allowed to try

The question I'd ask of any concrete proposal: how much does a new entrant have to spend before it can even show it meets the standard?

A demanding test can be justified by the danger. Requiring every applicant to build an institution around the test is a separate choice. Shared testing facilities, published requirements, and a predictable review keep the test and lower the cost of reaching it.

If a new lab and an established one both pass the same independent evaluation, that's a standard. If the new lab first has to negotiate access to a process its competitors designed and run, the process is a competitive advantage.

Nobody has to conspire for that to happen. People write requirements around the systems they understand. Incumbent labs have staff to explain their practices, attend meetings, and propose revisions, so their procedures become the ones regulators know. Approved firms gather customers and revenue, their compliance methods become the accepted ones, and challengers have to pay for both a technical alternative and the work of getting it recognized. That's a plausible path to entrenchment even if everyone starts out sincere.

For anyone building products on these models, it means fewer suppliers and less leverage on access, price, and permitted uses.

## Capabilities get cheaper even when the frontier doesn't

The strongest case for concentrated oversight is practical: a few large facilities are easier to inspect than thousands of projects.

Amodei's [January 2025 essay on DeepSeek](https://darioamodei.com/post/on-deepseek-and-export-controls) argues that efficiency gains get reinvested in bigger training runs, so cheaper progress doesn't make it cheaper to compete for first place. I think he's right. But that exposes the limit: watching the most advanced model and keeping a capability out of wide circulation are different problems. A capability can get cheaper while the leader spends more to move past it, and a model doesn't become harmless because something smarter exists.

Distillation is one way that happens. DeepSeek [released smaller models trained on R1's outputs](https://github.com/deepseek-ai/DeepSeek-R1), from 1.5 to 70 billion parameters. They don't reproduce everything the large model does, but they show that useful behavior can transfer without repeating the original training.

That doesn't show any particular dangerous capability has escaped. It shows why compute is a moving proxy. Suppose a dangerous capability first requires a training run above the review threshold, and later someone adapts a released model to get the same capability below it. A rule that only counts new training compute misses exactly what it was meant to catch.

This also shifts the economics of entry. If the technical cost of reaching a capability falls while the cost of approval stays fixed, compliance becomes a bigger share of what a challenger has to raise. The barrier grows even as the compute threshold gets worse at finding the dangerous work.

<figure class="blog-figure blog-figure--wide" data-blog-figure="capability-cost" aria-labelledby="capability-cost-title">
  <p class="blog-figure__kicker">Figure 01 · Illustrative</p>
  <h3 id="capability-cost-title">The capability gets cheaper. The approval doesn't.</h3>
  <p class="blog-figure__intro">Capability X first appears in a frontier training run, then gets cheaper to reproduce through distillation and efficiency gains. A compute trigger stops seeing it; a capability trigger keeps seeing it, but its fixed cost becomes most of what a new lab pays.</p>
  <div data-figure-stage>
    <table>
      <thead>
        <tr><th scope="col">Year</th><th scope="col">Frontier run</th><th scope="col">Compute for Capability X</th><th scope="col">Reviewed under a compute trigger (50)?</th><th scope="col">Entrant cost under a capability trigger (compute + 60 approval)</th></tr>
      </thead>
      <tbody>
        <tr><td>0</td><td>100</td><td>100</td><td>Yes</td><td>160</td></tr>
        <tr><td>1</td><td>150</td><td>60</td><td>Yes</td><td>120</td></tr>
        <tr><td>2</td><td>225</td><td>36</td><td>No</td><td>96</td></tr>
        <tr><td>3</td><td>338</td><td>22</td><td>No</td><td>82</td></tr>
        <tr><td>4</td><td>506</td><td>13</td><td>No</td><td>73</td></tr>
        <tr><td>5</td><td>759</td><td>8</td><td>No</td><td>68</td></tr>
        <tr><td>6</td><td>1,139</td><td>5</td><td>No</td><td>65</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption>Illustrative numbers, not measurements. The frontier run grows 50% a year, the compute needed for Capability X falls 40% a year, and approval costs a fixed 60. Costs use the same units as compute.</figcaption>
</figure>

## A restriction should prove it's working

Amodei proposes chip controls, protection against model theft, and limits on unauthorized distillation to preserve room for pacing, and he acknowledges that global agreement is hard. Where I differ is on how long that room lasts. If competitors can reproduce a capability, a domestic restriction may just move the work somewhere no evaluator can see, while fewer experiments at regulated companies look like success. What matters is how much dangerous work a rule actually delays, where it goes, and what safety progress happens in the meantime.

The two risks also move differently. Capability risk can jump with a single new ability. Concentration builds slowly as approvals, customers, and influence reinforce each other, until officials depend on a few providers and hesitate to interrupt them even when a safety concern appears. Protecting today's leaders by making entry harder also weakens the ecosystem that would produce their successors.

An imminent, well-supported danger can justify a temporary restriction despite what it costs competition. But it should say what the extra time is for and what evidence would change it, and it should measure the barriers it puts in front of new labs along with the capabilities it constrains. Otherwise "prove it's safe" becomes a permanent reason to keep the current arrangement.
