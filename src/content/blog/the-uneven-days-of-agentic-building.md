---
title: "The uneven days of building with agents"
description: "Some days agentic coding feels like flight. Other days you wander into alleys you did not mean to enter. A personal note on flow, dread, tools, and what still matters when the frontier keeps moving."
pubDate: 2026-06-05
heroImage: "/blog/the-uneven-days-of-agentic-building/hero-ink-line-art.webp"
heroImageAlt: "Ink line drawing on cream paper: a developer at a fork between a calm sailing path and tangled alleyways, with sun and cloud above and abstract code on a laptop."
draft: false
tags:
  - Codex
  - Workflow
  - AI
  - Developer Experience
  - Product
---

I have been building applications differently for a while now, and the honest summary is that it does not feel like one experience. It feels like weather.

Some days everything clicks. You describe what you want, the agent runs with it, the pieces land in the right places, and you end the day further along than you had any right to be. The work has momentum. You are not fighting the tools. You are not second-guessing every turn. It feels like smooth sailing, and for a few hours you remember why you got into this in the first place.

Other days are the opposite.

You move slowly. You re-explain things you thought were already clear. You follow a path that looked promising an hour ago and realize it has taken you further from the goal, not closer. You end up in alleys: refactors nobody asked for, abstractions that seemed clever at 2 p.m. and embarrassing by 5, dependency rabbit holes, a pile of half-finished branches and a product that is somehow more confusing than when you started.

Both kinds of days can happen in the same week. Sometimes in the same afternoon.

## Flow is real, and it is not a personality trait

I used to think flow was mostly about focus: good sleep, fewer meetings, the right music. Agentic building added a second variable. Now flow also depends on whether the problem, the codebase, and the agent are aligned on what "done" means.

When that alignment is there, the feeling is almost unfair. You are not typing every line. You are steering. You make a judgment call, the agent carries the mechanical work, you review, you correct, you move on. Hours compress. You ship something that would have taken days before, and it mostly works.

When alignment is missing, flow does not just slow down. It inverts. You spend more time cleaning up than creating. You argue with generated code that is plausible but wrong in subtle ways. You lose the thread of what you were building because the conversation forked three times and each fork seemed reasonable at the time. The agent is not failing on purpose. It is doing exactly what you asked, or what it inferred you asked, which is often worse.

I have started treating flow as a signal, not a mood. A good day usually means the task was well-scoped, the interfaces were clear, and the feedback loop was tight enough that mistakes got caught early. A bad day usually means one of those was missing, and I tried to brute-force through it with more prompts instead of fixing the shape of the work.

That reframe helps a little. It turns "I am bad at this today" into "something about this problem is not legible yet."

## The new mess

Every previous shift in how we build software came with mess. This one is just faster.

More tools. More models. More agents. More ways to run code in parallel, more worktrees, more MCP servers, more "just connect your repo and it will figure it out" promises. More half-adopted conventions in every team chat. More screenshots of workflows that worked once.

The mess is not only technical. It is cognitive. You are constantly deciding what to delegate, what to verify, what to throw away, and what to keep even though you did not write it yourself. You are learning new failure modes: confident wrong answers, changes that compile and pass lint and still miss the point, entire features built against requirements you only implied.

And because the tooling changes every few months, there is a low-grade dread sitting under the excitement.

You finish something hard, a pipeline, an integration, a product slice, and part of you wonders whether it will matter in six months. Not because the user problem will disappear, but because the next frontier model might make your current scaffolding feel antique. The prompting patterns, the guardrails, the custom tooling, the careful abstractions you built so agents would not wreck the repo: all of it up for revision again.

I feel that dread regularly, and I do not think it is irrational. The frontier does move. What felt like a clever orchestration layer in January can feel like overhead by June. Skills, hooks, subagents, new context windows, new image models, new "just do the whole app" demos. Each one whispers that you should have waited, or built less, or built differently.

The trap is letting that whisper turn into paralysis.

## What I am trying not to waste

If everything technical is on a moving floor, the question becomes: what is actually worth the time? I keep coming back to a short list.

**User value that survives the model cycle.** People still need loans onboarded, records corrected, workflows that do not depend on heroics, software that explains itself when something breaks. An agent can change how fast you get there. It does not change whether the destination was worth reaching.

**Judgment made visible.** The best work I have done with agents still has a human in the loop at the points that matter: policy, taste, accountability, the call you are willing to sign your name to. That is not a temporary patch until models get smarter. It is the product.

**Revenue as a forcing function.** Excitement scales easily. Shipping something someone will pay for does not. Revenue is crude, but it cuts through a lot of fog. It asks whether the thing you built actually mattered to someone outside your terminal. In a period where it is cheap to generate code, that question feels more important, not less.

**Assets that compound.** Documentation that teaches the next person (or the next agent) how the system actually works. Callable operations with readable errors. Tests around the parts that break in production. Domain knowledge encoded in code instead of trapped in someone's head. These age better than prompt tricks.

I am not pretending this list solves the dread. It just gives me somewhere to stand when the tools change again.

## Differentiation in a world where code is cheap

If more people can spin up an app in an afternoon, differentiation stops being "we have software" and starts being everything around the software:

- **Speed to trust.** How fast a new user believes the product will not make their life worse.
- **Specificity.** Whether the product understands a real workflow deeply enough to handle the boring edge cases, not just the demo path.
- **Operational fit.** Whether it plugs into the systems, habits, and constraints that already exist, instead of asking everyone to pretend they work at a greenfield startup.
- **Distribution and reputation.** Whether the right people hear about it, and whether past users would recommend it.
- **Accountability.** Whether there is a human on the other side when the import fails at 4:47 p.m.

Agents raise the floor on implementation. They do not automatically raise the ceiling on product.

That is uncomfortable if you spent years being the person who could "just build it." It is also freeing. The differentiator is less about whether you can produce code and more about whether you can see the real problem, earn trust, and stay with the work long enough to make it reliable.

## Paths and alleys

One thing I did not expect: how often agentic building feels like navigation rather than construction.

You start with a destination. The agent proposes a route. Sometimes it is a highway. Sometimes it is a scenic detour through dependencies you did not know you had. Sometimes you end up in an alley, turn around, and realize the alley taught you something: a bad assumption, a missing interface, a requirement you had not written down.

I am learning to notice earlier when a path is widening scope instead of reducing risk. A refactor that "will only take a minute." A new abstraction because the current file is annoying. A tool integration because it looked cool in a demo. The agent will happily walk with you into any of these. It does not feel tired, and it does not have a launch date. That part is on you.

On the good days, the same tendency becomes leverage. You can explore three approaches before lunch. You can harden the boring path because the agent will actually do the boring part. You can keep the main branch calm while experiments run somewhere else.

The difference between a good day and a bad day is often whether you knew which kind of path you were on.

## What I think I am actually learning

I am learning that agentic coding is not a single skill. It is a bundle of them: scoping, reviewing, knowing when to stop prompting and fix the system, knowing when to accept "good enough" and ship, knowing when the emotional drag is really fear of obsolescence dressed up as perfectionism.

I am learning that excitement and dread can coexist without canceling each other out. The excitement is real: whole categories of work are finally movable. The dread is real too: the floor keeps rising, and your old advantages decay faster.

I am learning that the work still has a center, even when the tools do not. Users, revenue, trust, problems that exist on Monday morning regardless of which model launched over the weekend.

Some days that center is easy to see. Other days you have to walk back out of an alley first. Both are part of the job now.
