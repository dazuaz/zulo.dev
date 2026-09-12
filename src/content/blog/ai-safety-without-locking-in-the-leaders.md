---
title: "AI safety without locking in the leaders"
description: "Pacing frontier AI could buy time for safety while entrenching the labs setting the pace. The rules need to survive cheaper, more widely available capabilities."
pubDate: 2026-09-12
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

Imagine two AI labs trying to satisfy the same safety requirement. One has a legal department, a policy team, and people who already work with the evaluators. The other has enough money for its next experiment.

Both have to demonstrate that their work is safe. But a requirement to maintain a permanent review team, negotiate an approval process, and wait for a decision lands differently at each company. The first can absorb it into operations. The second may have to stop before anyone evaluates its model.

That is the part of pacing AI development that worries me. A safety rule can be well intended and still decide who gets to compete.

In his September essay, [Dario Amodei proposes embedded outside evaluators, coordination among frontier labs in democracies, and eventual global coordination](https://darioamodei.com/post/we-must-pace-the-frontier). He prefers checks tied to capabilities and observed safety, while also considering limits on compute and AI-assisted AI development. His argument is that slower progress could give safety work time to catch up.

I take that possibility seriously. I also want to know what happens to everyone outside the group setting the pace. If the rules make today's leading labs the only practical route to building powerful AI, the cost could outlast whatever breathing room those rules buy.

## The cost of being allowed to try

For an actual proposal, I would ask how much a new entrant must spend before it can demonstrate that it meets the standard.

A demanding evaluation might be justified by the danger involved. Requiring every applicant to build an institution around that evaluation is a separate choice. Shared testing facilities, published requirements, and a predictable review process could preserve the test while lowering the cost of reaching it.

Consider a new lab whose model reaches the same capability threshold as an established competitor. If both must pass the same independent evaluation, that is a standard. If the new lab must first negotiate access to a process designed and administered by its competitors, the process itself becomes a competitive advantage.

No secret agreement is necessary. People write requirements around systems they understand. Existing labs have staff available to explain their practices, attend meetings, and propose revisions. A procedure can become familiar to regulators before an alternative has had a chance to prove itself.

Over time, I would expect that familiarity to matter. Approved firms accumulate customers and revenue. Their compliance methods become the accepted methods. Challengers have to finance both a technical alternative and the effort to get it recognized. This is a plausible route to entrenched control even if everyone involved starts with a sincere concern about safety.

For people building products on top of these models, that could mean fewer suppliers and less room to negotiate access, price, or how the technology can be used. The choice of who may develop a model reaches well beyond the research lab.

## The frontier can stay expensive while capabilities get cheaper

The strongest case for concentrating oversight is practical. A small number of large facilities should be easier to inspect than thousands of independent projects. If the dangerous work depends on those facilities, supervision there could accomplish a great deal.

But keeping track of the most advanced model and keeping a particular capability out of wider circulation are different problems.

Amodei already has an answer to the efficiency argument. In his [January 2025 essay on DeepSeek and export controls](https://darioamodei.com/post/on-deepseek-and-export-controls), he argues that efficiency gains can be reinvested in larger training runs. Cheaper progress at a given capability level does not imply cheaper competition for first place. I think that distinction is right.

It also exposes a limit of frontier control. A capability can become accessible to more people while the leading lab spends more to move beyond it. A model does not become harmless when something smarter arrives.

Distillation offers another route. DeepSeek [released smaller models trained using outputs from R1](https://github.com/deepseek-ai/DeepSeek-R1), with checkpoints ranging from 1.5 billion to 70 billion parameters. Those models do not reproduce every ability of the larger system. They show that some useful behavior can be transferred without each recipient repeating the original development process.

The distillation example does not establish that a specific dangerous capability has escaped control. It illustrates why the relationship between compute and capability needs repeated measurement. Imagine that a dangerous capability initially requires a training run above the threshold for review. Later, adapting a released model produces the same capability below that threshold. A rule that counts only the new training compute would miss the behavior it was designed to catch.

Distributed innovation does not require a volunteer network to train the world's best model. It can mean many teams improving different parts of an existing system. If those improvements make a restricted capability widely affordable, oversight must follow that capability beyond the handful of labs that first produced it.

This also changes the economics of entry. If the technical cost of reaching a capability falls while the cost of obtaining approval stays fixed, compliance becomes a larger share of what a challenger must finance. Where approval requirements still apply, they could remain a barrier to entrants even as compute thresholds become less effective at identifying the dangerous work.

## A domestic rule needs a global account of its effects

Amodei explicitly addresses international competition. He proposes chip controls, protection against model theft, and restrictions on unauthorized distillation to preserve room for pacing. He also treats comprehensive global agreement as difficult. My disagreement is about how durable that room would be. [His proposal spells out those assumptions](https://darioamodei.com/post/we-must-pace-the-frontier).

A domestic restriction could reduce risk if it delays a dangerous capability that competitors cannot yet reproduce. It could also shift investment and experimentation elsewhere if comparable work remains feasible abroad. Neither outcome follows automatically from the existence of a rule.

The distinction matters for what we count as success. Fewer experiments at regulated companies could look reassuring while the same work expands somewhere evaluators cannot inspect. Conversely, an imperfect restriction might still buy useful time. The relevant evidence is how much dangerous work it delays, where that work moves, and what safety improvements happen during the delay.

There is a longer-term competitive risk too. Protecting current leaders while making entry harder could weaken the ecosystem that produces their successors. A country's ability to develop AI should not be measured only by the position of its largest companies.

## A restriction needs a way to change

I do not think we can honestly rank capability risk and concentration risk with a single growth rate. One could rise abruptly with a dangerous new ability; the other could build as approvals, customers, and influence reinforce one another. Dependence on a few providers could also make officials reluctant to interrupt them, even when safety concerns appear.

An imminent, well-supported danger could justify a temporary restriction despite its competitive cost. But the restriction should identify what the extra time is for and what evidence would allow it to change. Otherwise the burden of proving safety can turn into an indefinite requirement to preserve the existing arrangement.

I would want a pacing policy to include the means to discover that it is no longer working. That means measuring both the capabilities it constrains and the barriers it creates for a new lab trying to meet the same standard.

## Make safety possible for the next entrant

I would start with a demanding safety standard and make the route to meeting it available beyond the existing leaders.

Evaluations should follow demonstrated capabilities and the conditions under which a system will operate. Compute can help identify projects that need scrutiny, but it should not be the only trigger. A smaller system that poses the same danger should face the same substantive requirement.

An entrant should be able to use publicly supported testing facilities and reusable tools instead of financing every part of evaluation from scratch. The evaluator would still need access to relevant systems and the freedom to report adverse findings. Public methods would let applicants understand the process, while sensitive test details could remain private to limit gaming.

That entrant also needs a decision deadline and an independent appeal. If leading labs help write a standard, the reasons for adopting it should be public, and competing approaches should have a way to qualify. Meeting the safety requirement should not depend on adopting a competitor's organizational structure.

Across borders, I would start with verifiable commitments around specific dangerous activities and incident reporting. Broader pacing agreements should be judged partly by whether they reduce dangerous work or move it outside the reach of inspection.

These proposals still depend on difficult evaluations and imperfect enforcement. They are a direction for designing policy, not a claim that the hard technical problems have been solved.

The test I keep coming back to is the second lab in the opening example. It should have to demonstrate that its work is safe, even if doing so is expensive. It should also be able to find out what evidence is required, obtain an independent judgment, and qualify without permission from the companies it hopes to challenge.
