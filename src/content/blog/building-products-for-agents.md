---
title: "What changes when an agent can do the boring part?"
description: "A personal note on loan onboarding, AI agents, and the small shift that happens when software can run the work, show its mistakes, and get corrected."
pubDate: 2026-03-24
heroImage: "/blog/building-products-for-agents/hero-ink-line-art.webp"
heroImageAlt: "Ink line drawing on cream paper: a code terminal, a circular human-and-agent workflow loop, and a hand correcting a form that feeds back into code, with black ink and cross-hatched shadows."
tags:
  - Codex
  - Workflow
  - AI
  - Developer Experience
  - Product
---

I have been thinking about a small internal tool more than it probably deserves.

It onboards new loans into our servicing platform. That is not a glamorous sentence. Most of the work is the kind of work people only notice when it breaks: *map this field, normalize that date, move these documents,* make sure the resulting record looks like the loan everyone thinks we bought.

For a long time, this was the kind of thing I understood as a workflow. A person has a task. The product gives them screens. Maybe there is a checklist. Maybe there are a few scripts hiding behind the scenes. The person does the work, cleans up the edge cases, and carries a lot of the real knowledge in their head.

Lately the shape feels different.

Now I can open Codex and ask it to run the importer for a specific loan. **It calls the same function I would have called.** It reads the output. If the importer breaks, it can usually see where. Sometimes it patches the mapper, reruns the job, and gets us to a cleaner result *before I have finished mentally loading the whole problem.*

Then I still open the servicing system and look.

That last part matters. The agent can do a lot of the boring part, but **it does not know what I am willing to stand behind.** It does not know which mismatch is harmless, which missing value is policy, or which strange-looking record is actually correct because the deal was strange. *I still make those calls.*

The interesting part is what happens after.

When I change something manually, I can tell the agent what I changed and why. Not in a big formal ceremony. Just: *this field came from the wrong source, this date should follow the note, this borrower name was normalized too aggressively.* Then the agent can trace that correction back into the importer and adjust the code so the next loan is closer.

That is the shift I keep coming back to.

> **The manual fix is no longer just cleanup. It can become a lesson the system keeps.**

## The old feeling

Most operations software has a quiet leak in it.

**People learn things while doing the work, but the product does not always learn with them.** A person notices that a certain lender formats escrow data differently. They remember it. They tell someone on Slack. They add a note to a spreadsheet. A month later, someone else hits the same issue and either asks around or solves it again.

This is normal, and *it is exhausting.*

It is also why so many internal tools age badly. The official workflow sits in the app, but the real workflow lives in *habits, exceptions, screenshots, and "ask me before you do that one" knowledge.*

Agents do not magically fix this. **If anything, they expose it.** When you ask an agent to run a messy operation, it immediately runs into all the places where the system depends on human memory.

But that exposure is useful.

If the work can be *run programmatically, observed clearly, and corrected in a way that points back to code,* then every weird case has a chance to improve the system instead of becoming another private memory.

## The loop I want more of

The loop is simple:

1. **Run** the real operation, not a toy version of it.
2. **Read** the result in enough detail to know what happened.
3. **Let software** handle the mechanical fixes.
4. **Let a person** make the judgment calls.
5. **Turn** the person's correction into a durable change.

That sounds obvious, but a lot of software is not built this way.

The operation might only exist as a sequence of clicks. The logs might say *"validation failed"* without saying what changed or why. The review screen might make it easy to fix a record but impossible to explain the fix. The code might be far enough from the work that nobody bothers to close the loop.

Agents make those gaps more expensive, because they are very literal. They need *entry points.* They need *output.* They need *names for things.* They need *errors that say more than "something went wrong."* In a strange way, **designing for agents often means finally designing for the tired human who has been doing the job all along.**

## What I would design for now

**I would make more operations callable.**

Not every task needs a polished UI first. Sometimes the most important interface is a boring function, job, or command that can be run with a clear input and a clear result. *If an agent can call it, a test can call it. If a test can call it, the team can reason about it.*

**I would make failures easier to read.**

A good error is not just a red light. It says *which record failed, which field was questionable, what the system expected, and what it actually saw.* That helps an agent, but it also helps the person who gets pulled in at 4:47 p.m. and has to make a call.

**I would treat human edits as product signal.**

When someone fixes a field after an import, that is not just a local patch. *It is evidence.* Maybe the mapper is wrong. Maybe the source data is inconsistent. Maybe the business rule is not written down. The product should make those edits addressable enough that they can flow back into *code, config, or documentation.*

**I would keep judgment visibly human.**

There are parts of this work I do not want to hide inside automation. I want the system to say, *"Here is what I did, here is what I am unsure about, and here is where a person needs to decide."* That is a healthier shape than pretending the agent is certain because the screen is green.

## The part I do not want to lose

The best version of this is not a future where nobody touches the work.

It is a future where people spend less time on the *mechanical drag* around the work. Less retyping. Less spelunking through logs. Less remembering that one exception from two months ago. More attention on the parts that actually require **taste, policy, accountability, and context.**

That is why this small loan importer has stayed in my head. *It is not about loan imports.* It is about a different relationship with software.

The product is not only the screen. It is:

- the **function** the agent can call
- the **report** that explains itself
- the **correction** that becomes code
- the **review surface** where a person can say, *"yes, this is right,"* with enough confidence to own the result

Agents are useful when they make that loop tighter.

**Not because they replace the operator, but because they give the operator a better way to teach the system what the work really is.**
