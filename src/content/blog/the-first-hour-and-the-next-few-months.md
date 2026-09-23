---
title: "The first hour and the next few months"
description: "AI can build an app faster than you can understand it. The long part is learning what you have, so you know what to ask for next."
pubDate: 2026-09-06
updatedDate: 2026-09-23
heroImage: "/blog/the-first-hour-and-the-next-few-months/hero-ink-line-art.png"
heroImageWidth: 1672
heroImageHeight: 941
heroImageAlt: "Black ink illustration on cream paper of a builder studying plans beside an app-shaped model, with its cutaway revealing connected rooms, stairs, and pipes."
draft: false
tags:
  - AI
  - Workflow
  - Developer Experience
  - Product
---

With AI, the first hour can get you something that feels 80% finished. The remaining 20% can take months.

Those numbers describe a feeling, not a measurement. The first version has most of the screens and only a fraction of the decisions. But the feeling sets your expectations, and a month later that fast first hour can feel like a broken promise.

Then you try to keep building. A feature you expected to be small touches three others. You ask for something and find a version of it already exists. You fix one behavior and realize you don't know what depends on it. The app grows every day, and your understanding of it falls behind.

## You know what you asked for, not what you have

When you write code yourself, you learn the design by making it. You decide where a rule belongs. You notice two features need the same data. You remember the awkward edge case because it cost you an afternoon.

With an LLM you can approve a result without that contact. You asked for an import screen, got one, and moved on. Underneath are validation rules, retry behavior, and decisions about duplicate records you barely looked at. They still shape the app.

Your memory follows the conversation, while the app follows the code, and after enough changes the two drift apart. An operation exists in a background job but was never exposed in the UI. Two screens implement slightly different versions of the same rule. The next request adds a third, because neither you nor the agent checked what was already there.

## Follow one operation through

Say you built an app that imports customer records: upload a file, preview it, click import. It works.

Then you ask for a button to retry failed imports. The button is trivial. What "retry" means is not. If the import created eight records and failed on the ninth, does retry start over? How does it know about the first eight? Does the app save progress per record, or only a final success or failure?

Answering those questions means knowing where progress is stored, what code creates records, and how the app decides a record already exists. A folder diagram won't tell you. You have to follow a real operation: upload one file, watch it land, then feed it a file that fails halfway through. The failed run teaches you more about the design than another look at the working screen.

The agent can help. Ask it to trace the operation, point to the code, and say what it can't determine from the code alone. Then run it and compare. A confident explanation still needs checking.

You don't need to remember every function. You need to know where to look, what should stay true, and how to check it.

## Better prompts come from knowing the app

Your first prompt describes the product you want to see:

"Build an app that imports customer records and shows me the results."

That's the right place to start. You don't know enough to ask for more. Now suppose your investigation found that the importer already saves a completion marker for each successful record, and you confirmed eight markers after a partial failure. The retry request becomes:

"Add a way to retry failed records from the import history. The importer already saves a completion marker for each successful record; use those markers to skip completed work. Check whether the existing record creation path can process just the failed records. Identify any missing state before implementing this. Verify by retrying a partially failed import: the eight completed records should remain unduplicated, and the failed record should be created once."

What makes it better isn't the length. It's the knowledge: what already exists to build on, and a check that will catch a mistake. You couldn't have written it on day one, and no amount of polishing the first prompt would have gotten you there. You had to use the thing.

## Write down what you learned

If that understanding only lives in a chat session, you lose it the next time you open a new one. Keep a short note next to the code that answers plain questions. What can the app do today? Where does each important operation start? Which rules do several features depend on? What's unfinished?

For the import app it might say: upload and retry share one record-creation path, completion is tracked per record, and a failed run can leave some records imported. Update it when the behavior changes, or it becomes a convincing description of an app that no longer exists.

Before each feature, ask: "What parts of this do we already support?" The answer often turns up a missing UI, a half-built path, or behavior that only needs extending, and you spend the hour connecting pieces instead of duplicating them.

## What's in the last 20%

Some of it is finishing work: error messages, awkward states, missing controls. Some is fixing assumptions that were convenient for the first version. Some is discovering what the app should do by using it.

The retry button might expose a missing progress model. It might also raise a product question: should the user fix a failed record in the app, or upload a corrected file? Generating the button faster doesn't answer that. You have to decide what the workflow should feel like for someone already dealing with a failed import.

The last 20% can contain decisions that change what the first 80% means. Understanding the app is also how you tell a missing safeguard from an unnecessary refinement, or from a new product hiding inside a small request, and sometimes the right move is to cut a feature and ship.

I still want the first hour to be fast. After that, progress looks different: fewer surprises about what exists, and requests that build on earlier decisions. Months in, the next feature may be smaller than anything from the first day, and you can explain why it fits, what it reuses, and how you'll know it works.
