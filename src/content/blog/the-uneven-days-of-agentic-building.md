---
title: "The uneven days of building with agents"
description: "Some days agents make building feel light; others you end up lost in side alleys. What separates the two, and what still matters when code is cheap."
pubDate: 2026-06-05
updatedDate: 2026-09-23
heroImage: "/blog/the-uneven-days-of-agentic-building/hero-ink-line-art.webp"
heroImageWidth: 1536
heroImageHeight: 1024
heroImageAlt: "Ink line drawing on cream paper of a developer choosing between a calm sailing path and tangled alleys, with abstract code on a laptop."
draft: false
tags:
  - Codex
  - Workflow
  - AI
  - Developer Experience
  - Product
---

Building with agents feels like weather.

On good days you describe what you want, the agent runs with it, and by evening you're further along than you had any right to be. Building software feels light again.

On bad days you keep re-explaining things you thought were clear. A promising path turns out to lead away from the goal. You finish with a refactor nobody asked for, an abstraction that seemed clever at 2 p.m. and embarrassing by 5, and a pile of half-finished branches. The product is more confusing than when you started.

Both can happen in the same week, sometimes in the same afternoon.

## Flow is a signal

I used to think flow came from focus: good sleep, fewer meetings. With agents there's another variable. The problem, the codebase, and the agent have to agree on what "done" means.

When they agree, you make the judgment calls, the agent does the mechanical work, and you review. Something that would have taken days ships in an afternoon, and it mostly works.

When they don't, you spend more time cleaning up than building. The generated code looks plausible and is wrong in ways that take an hour to explain. The conversation forks three times, every fork sounds reasonable, and you lose the thread. The agent is doing what you asked, or what it guessed you asked, and the guess is usually worse.

Looking back, my good days had tasks with clear boundaries, where mistakes showed up early. On the bad days I kept pushing an unclear task forward with more prompts. When a day starts going that way, the fix is rarely a better prompt. It's a smaller task, or a decision to stop.

## The agent will walk down any alley

An agent doesn't get tired and doesn't have a launch date. That's useful: I can try two approaches before lunch and send the agent through the boring work of hardening the better one, with each experiment in its own worktree so the main branch stays calm.

It will also happily follow any detour. The refactor that will "only take a minute." The abstraction that makes an annoying file more interesting. The tool integration that looked good in a demo. Noticing when a path widens the scope without reducing risk is my job, not the agent's.

The failure modes are new too. An answer is confident and wrong. A change passes lint and misses the point. A whole feature follows a requirement I never wrote down. Every week brings more models, agents, and MCP servers to try, and each one I adopt is something the team has to maintain, which may look dated in six months.

## When code is cheap

It's easy to confuse momentum with progress. I can have a very productive afternoon answering a question that has nothing to do with whether anyone needs the product.

If anyone can build an app in an afternoon, "we have software" is no longer an advantage. The hard parts are around the code:

- A new user needs evidence that the product won't make their day worse.
- The product has to handle the boring edge cases after the demo.
- It has to fit the systems and habits people already have.
- People have to hear about it from someone they trust.
- Someone has to answer when the import fails at 4:47 p.m.

Agents raise the floor on implementation. They don't raise the ceiling on product. That's uncomfortable if you spent years being the person who could "just build it." Revenue is a crude test, but it cuts through the fog. Excitement is easy to produce. A customer who pays is not, and cheap code makes that the more useful test.

The work that ages well is the work that helps people depend on the system: documentation that teaches the next person and the next agent, errors an operator can read, and a regression test for every production failure. Someone still has to make the policy calls and own them. That isn't a stopgap until models get smarter; it's part of the product.

Users need help on Monday morning no matter which model launched over the weekend. Some days it's obvious how to get there. On others you have to walk back out of an alley first.
