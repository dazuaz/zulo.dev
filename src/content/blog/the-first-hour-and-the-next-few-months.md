---
title: "The first hour and the next few months"
description: "Building with AI can move faster than your understanding of the app. The long work is learning what exists, how it fits together, and what to ask for next."
pubDate: 2026-09-06
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

The first prompt can get you something that feels 80% finished in an hour. You can spend months on the remaining 20%.

I keep coming back to that gap. The first hour gives you so much to look at: screens, buttons, records moving through a workflow. You can click around and recognize the application you had in mind. Something that was a loose idea before lunch now has a shape.

Then you try to keep building it.

A feature you thought would be small touches three other features. You ask for a capability and discover a version of it already exists somewhere. You fix one behavior and realize you no longer know which parts of the application depend on it. There is more software every day, but your understanding of it is struggling to catch up.

The percentages describe a feeling, not a measurement. That first version might contain most of the screens and only a fraction of the decisions the finished product needs. Still, the feeling matters. It sets your expectations for the work that follows, and those expectations can make a useful first hour feel like a broken promise a month later.

## The app grows ahead of you

When you write an application yourself, some understanding comes from the time spent making it. You choose where a rule belongs. You notice that two features need the same data. You remember the awkward case because you spent an afternoon dealing with it. You can still lose track, but the act of implementation gives you repeated contact with the design.

With an LLM, it is possible to approve a result without having formed that understanding. You asked for an import screen, saw an import screen, and moved on. The code underneath may contain validation rules, retry behavior, and decisions about duplicate records that you have barely considered.

Those decisions still shape the application. You just did not spend much time with them.

This creates a particular kind of confusion: you know what you asked for, but you are less sure what you have. Your memory follows the conversation. The application follows the code. After enough changes, those two accounts can drift apart.

Losing track of capabilities makes this worse. Perhaps an operation exists in a background process but has never been exposed in the interface. Perhaps two screens implement slightly different versions of the same rule. The next request can add another version simply because neither you nor the agent has checked what is already there.

Generating more code is easy to mistake for progress when you cannot yet see how much of the next feature you already own.

## Learning where the behavior lives

Imagine building a small application that imports customer records. The initial prompt asks for file upload, a preview, and an import button. The first version looks convincing. Records arrive where they should.

Later, you ask for a button to retry failed imports.

The interface change is small. The meaning of “retry” takes more thought. If an import created eight records and failed on the ninth, should the retry start over? How does it recognize the eight records already created? Does the application save progress, or only a final success or failure message?

These questions reveal the architecture through behavior. You need to know where progress is stored, which part of the code creates records, and how the system decides that a record has already been imported. A folder diagram alone will not answer them.

This is the level of understanding I want to develop: enough to follow a real operation through the application and explain the important decisions along the way. I do not need to remember every function. I need to know where to look, what should remain true, and how to check it.

For this import app, that might mean following one file from upload to saved records, then deliberately trying a file that fails halfway through. The failed run could teach more about the design than another tour of the successful screen.

The agent can help with that investigation. Ask it to trace the operation, point to the implementation, and identify what it cannot establish from the code alone. Then compare the explanation with what happens when you run it. A confident explanation is still something to verify.

## Better prompts come from knowing the app

At the beginning, prompts describe the product you want to see.

“Build an app that imports customer records and shows me the results.”

That is a reasonable place to start. You may not know enough yet to ask for much more. Working with the first version gives you something concrete to question.

Suppose that investigation reveals the importer already saves a completion marker for each successful record. You have checked a partially failed run and found the eight markers you expected. That discovery changes the request:

“Add a way to retry failed records from the import history. The importer already saves a completion marker for each successful record; use those markers to skip completed work. Check whether the existing record creation path can process just the failed records. Identify any missing state before implementing this. Verify by retrying a partially failed import: the eight completed records should remain unduplicated, and the failed record should be created once.”

The second prompt carries knowledge of the application and a way to judge the result. Its value comes from the decisions inside it. Adding more words to the first prompt would not necessarily supply those decisions.

The existing completion markers give you something to build on. The retry check gives you a way to catch a mistake. You can leave other implementation choices open because you know which outcomes matter.

Some of that precision only becomes available after you have used the product. An initial prompt cannot reasonably contain everything you will learn from months of work. Trying to perfect it forever can delay the very experience that would improve it.

The next request can begin with what you found in the running application, including capabilities you never explicitly asked for.

## Give that knowledge somewhere to stay

Understanding is easy to lose if it lives only in the latest conversation. You return after a week, start another session, or work on a different part of the app, and have to reconstruct decisions you already made.

I like the idea of keeping a small, practical account of the system alongside the code. It should answer ordinary questions: What can the app do today? Where does each important operation begin? Which rules do several features depend on? What is incomplete?

For the import example, a useful note might say that upload and retry share the same record creation path, that completed records are tracked individually, and that a failed run can leave some records successfully imported. It should point to the relevant implementation and checks. That is information you can use when deciding what to build next.

The note has to change when the behavior changes. Otherwise, it becomes another convincing account of an application that no longer exists.

There is also value in asking, before a feature request, “What parts of this do we already support?” The answer may reveal a missing interface, an unfinished path, or existing behavior that needs extending. You can spend the next hour connecting pieces instead of creating overlapping ones.

The next feature can become a smaller change because you recognize what is reusable and understand the limits of that reuse. The time spent investigating starts paying back.

## What the remaining work contains

Some of the long tail is straightforward finishing work: error messages, awkward states, missing controls. Some of it is repairing assumptions that were convenient in the first version. Some of it is discovering what the application ought to do through actual use.

Those are different kinds of work, even when they all appear under the same heading of “almost done.”

In the import app, adding a retry button might expose a missing progress model. It might also reveal a product question: should the user correct a failed record inside the app or upload a revised file? You cannot answer that simply by generating the button faster. You have to decide how the workflow should feel for someone who is already dealing with a failed import.

The remaining 20% can contain decisions that change the meaning of the first 80%.

That does not make every month of additional work inevitable or useful. Sometimes you are expanding the scope. Sometimes the right move is to remove a feature, accept a limitation, or ship what works. Understanding the app helps with those decisions too. You can tell the difference between a missing safeguard, an unnecessary refinement, and a new product hiding inside a small request.

I still want the first hour to be fast. Getting an idea into a form I can use and question is valuable. But after that, I want a different kind of progress to become visible: fewer surprises about what exists, clearer reasons for where behavior belongs, and requests that build on earlier decisions.

Months later, the next feature may be smaller than anything generated on the first day. You can explain why it fits, what it reuses, and how you will know it works.
