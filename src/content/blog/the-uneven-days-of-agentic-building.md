---
title: "The uneven days of building with agents"
description: "Some days an agent carries the work. Other days it leads you into a refactor nobody asked for. Both are part of building this way."
pubDate: 2026-06-05
heroImage: "/blog/the-uneven-days-of-agentic-building/hero-ink-line-art.webp"
heroImageAlt: "Ink line drawing on cream paper of a developer choosing between a calm sailing path and tangled alleys, with abstract code on a laptop."
draft: false
tags:
  - Codex
  - Workflow
  - AI
  - Developer Experience
  - Product
---

I have been building applications with agents for a while now. The honest summary is that it feels like weather.

Some days everything clicks. You describe what you want, the agent runs with it, and you end the day further along than you had any right to be. You are not fighting the tool or second-guessing every turn. For a few hours, building software feels light again.

Other days are the opposite.

You move slowly. You re-explain things you thought were clear. A path that looked promising an hour ago has taken you further from the goal. You end up with a refactor nobody asked for, an abstraction that seemed clever at 2 p.m. and embarrassing by 5, and a pile of half-finished branches. Somehow the product is more confusing than when you started.

Both kinds of days can happen in the same week. Sometimes in the same afternoon.

## Flow is real, and it is not a personality trait

I used to think flow was mostly about focus. Good sleep helped. Fewer meetings helped. Agentic building added another variable. The problem, the codebase, and the agent have to agree on what "done" means.

When they agree, the feeling is almost unfair. You make a judgment call, the agent carries the mechanical work, and you review the result. Hours compress. You ship something that would have taken days before, and it mostly works.

When they disagree, flow inverts. You spend more time cleaning up than creating. The generated code looks plausible but is wrong in ways that take an hour to explain. The conversation forks three times, each fork sounds reasonable, and you lose the thread. The agent is doing exactly what you asked, or what it inferred you asked. The second version is often worse.

I have started treating flow as a signal instead of a mood. A good day usually means the task had a clear boundary and mistakes surfaced early. On a bad day, I often tried to force an unclear task forward with more prompts.

That distinction helps a little. "I am bad at this today" becomes "I have not made this problem clear yet."

## The new mess

Every previous shift in how we build software came with mess. This one is just faster.

More tools. More models. More agents. More worktrees and MCP servers. More "connect your repo and it will figure it out" promises. Every team chat has a half-adopted convention and a screenshot of a workflow that worked once.

The mess gets into your head. You have to decide what to delegate, what to verify, and what to throw away. New failure modes appear. A confident answer is wrong. A change passes lint and still misses the point. An entire feature follows a requirement you never wrote down.

Because the tooling changes every few months, a low-grade dread sits under the excitement.

You finish a hard integration and wonder whether it will matter in six months. The user problem will still exist, but the next frontier model might make your setup feel antique. Prompting patterns, guardrails, and custom tools built to keep agents from wrecking the repo are all up for revision again.

I feel that dread regularly, and it is not irrational. What felt like a clever orchestration layer in January can feel like overhead by June. A new context window or "build the whole app" demo suggests that you should have waited, built less, or chosen another approach.

The trap is letting that whisper turn into paralysis.

## What still seems worth the time

If the technical floor keeps moving, what is worth the time?

People still need loans onboarded and records corrected. They need workflows that do not depend on heroics and software that explains a failure. An agent can change how fast I get there. It cannot tell me whether the destination was worth reaching.

The best work I have done with agents keeps a person involved where judgment carries consequences. Someone must make the policy call and accept responsibility for it. That is part of the product, not a temporary patch until models get smarter.

Revenue is a crude test, but it cuts through the fog. Excitement scales easily. Shipping something a customer will pay for does not. Cheap code makes that test more useful.

Documentation should teach the next person and the next agent how the system works. Operations need readable errors. Production failures need tests. Domain knowledge captured this way ages better than a prompt trick.

None of this removes the dread. It gives me work that should survive the next model release.

## Differentiation in a world where code is cheap

If more people can spin up an app in an afternoon, "we have software" is no longer much of an advantage. The hard parts sit around the code.

- A new user needs evidence that the product will not make the day worse.
- The product has to handle boring edge cases after the demo.
- It has to fit the systems and habits people already use.
- The right people still have to hear about it from someone they trust.
- A person has to answer when the import fails at 4:47 p.m.

Agents raise the floor on implementation. They do not automatically raise the ceiling on product.

That is uncomfortable if you spent years being the person who could "just build it." It is also freeing. Producing code matters less than seeing the real problem and staying long enough to make the result reliable.

## Paths and alleys

I did not expect agentic building to feel so much like navigation.

You start with a destination, and the agent proposes a route. Sometimes it is a highway. Sometimes it detours through dependencies you did not know you had. An alley can still expose a bad assumption or a requirement you forgot to write down.

I am learning to notice earlier when a path widens scope without reducing risk. A refactor will "only take a minute." A new abstraction makes an annoying file more interesting. A tool integration looked good in a demo. The agent will walk into any of them. It does not get tired, and it does not have a launch date. That part is on me.

On a good day, that willingness to explore is useful. I can test two approaches before lunch, then send the agent through the boring work of hardening the better one. Experiments stay in another worktree, and the main branch stays calm.

The difference between a good day and a bad day is often whether you knew which kind of path you were on.

## What I am learning

Agentic coding is not one skill. It requires scoping and review, plus knowing when to stop prompting and fix the system. It also requires knowing when "good enough" should ship. Some days, what looks like perfectionism is fear that the work will soon become obsolete.

Excitement and dread can coexist. Whole categories of work are finally movable. The floor also keeps rising, and old advantages decay faster.

The tools do not have a center, but the work does. Users still need help on Monday morning regardless of which model launched over the weekend.

Some days that center is easy to see. Other days you have to walk back out of an alley first. Both are part of the job now.
