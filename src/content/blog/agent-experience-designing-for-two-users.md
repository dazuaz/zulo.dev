---
title: "AX: designing for the agent your customer brings"
description: "A smarter model can work through a rough interface. It can't grant itself authority. Why agent experience is about delegation, and why your app should let in any agent a customer brings."
pubDate: 2026-10-28
updatedDate: 2026-11-09
heroImage: "/blog/agent-experience-designing-for-two-users/hero-ink-handoff.webp"
heroImageWidth: 1920
heroImageHeight: 1072
heroImageAlt: "Ink and watercolor cutaway of a small workshop: a person looks in through the front window at dials and buttons, while a long paper ribbon of text feeds through a back slot, along guides and a gate, to a desk where another person signs a single card."
draft: false
tags:
  - AI
  - Agents
  - Design
  - Product
  - Developer Experience
---

Every interface I've built assumed someone was looking at it. A button is a promise to a pair of eyes: this is here, it does that, press it.

Some of software's users now never look at anything. An agent reads a description, calls an endpoint, and decides its next move from the text that comes back. Designing for that user has had a name, agent experience or AX, since [Netlify's Mathias Biilmann wrote about it](https://biilmann.blog/articles/introducing-ax/) in January 2025. Most AX advice since then is about making the agent's work easier: tidier tools, docs a model can read, errors that say what to try next.

That advice is aging, because the models keep getting better at coping without it. What no model can supply is authority. An agent always works for someone, and that person still answers for what it does. So the first design question is whose agent gets in and what it may do once it's there. My answer to the first half: whichever agent your customer brings.

## The agent can already use your app

Agents used to lean much harder on an interface built for them. Today's need less.

In August, a federal appeals court had to describe how Perplexity's Comet assistant shops on Amazon. [The opinion](https://cdn.ca9.uscourts.gov/datastore/opinions/2026/08/04/26-1444.pdf) records that the assistant reads the page the browser has already displayed on the user's computer and acts on it. Nobody built it an API or wrote it a tool description. It uses the store made for eyes.

Cloudflare shows the same shift from the other side. Its API has more than 2,500 endpoints. Described one by one as tools, [they would take 1.17 million tokens](https://blog.cloudflare.com/code-mode-mcp/). Its Code Mode server offers two tools instead, at about 1,000 tokens: one lets the agent write code that searches the API spec, the other runs code against the API. That is still design for agents, but it's a spec and a sandbox, and the agent does the integration work a developer used to do.

What's left of agent-facing craft is mostly cost. An agent pays for everything it reads. Vercel measured one of its own pages at [about 500 KB as HTML and 3 KB as Markdown](https://vercel.com/blog/making-agent-friendly-pages-with-content-negotiation). Serving the small one, offering search before a full listing, and writing errors that name the fix all make your customer's agent faster and cheaper. They're worth doing, and I expect each model release to make them matter a little less.

Authority is different. A smarter agent can't make itself accountable. It can't decide how much of your customer's money it may spend, or which messages they'd want to read before they go out. Those answers live with the person and with your app.

## Locking agents out picks the worst door

This fall several large companies answered the first question with no, or with partners only. Delta told TechCrunch it has no partnership or integration that lets a third-party agent book flights, and Yelp said it admits only agents that pay for its data licensing program, in a [roundup of sites turning agents away](https://techcrunch.com/2026/10/06/the-next-hurdle-for-ai-agents-getting-websites-to-let-them-in/). Jamie Dimon said JPMorgan is [not going to allow "just any … outside agent"](https://www.cnbc.com/2026/10/13/jpmorgan-ai-agents-account-access.html) into the bank: "You don't want rogue agents, and it could be thousands of them."

Their worry is right. Look at what JPMorgan says it's blocking: third parties "obtaining customers' banking credentials and logging in on their behalf." That agent holds the whole password. To the bank it looks exactly like the customer. It can do anything the customer can, and the record will say the customer did it.

That is a terrible design, and it's the one you get by default. An agent that can use a screen, plus a customer who wants the work done, equals a shared password. If you build nothing better, the agents still come, and you can't tell them from customers.

The Amazon case shows how weak the lock is. According to the opinion, the core of the dispute was Perplexity's decision not to send a user-agent string announcing that an AI agent was active, which "would allow Amazon to block" it. Amazon won an injunction in March. In August the Ninth Circuit vacated it: "It is the user who 'accesses' Amazon's computers, with the help of the Assistant." The ruling is narrow. The court wrote, "We do not establish a new legal regime governing agentic AI," and noted that Amazon can still set terms of service for its users. The case goes on. The practical lesson doesn't need a final verdict: when the agent runs in your customer's own browser, blocking it means fighting your customer.

That leaves two options: an agent you can't identify holding all of the customer's power, or one you can identify holding some of it.

## The door worth building

The pieces for the second option exist. Some have shipped and some are still drafts.

**It asks who's knocking.** An IETF working group is standardizing [a way for automated clients to sign their requests](https://datatracker.ietf.org/doc/html/draft-ietf-webbotauth-httpsig-protocol), written by engineers at Cloudflare and Google, so a site can check the identity a caller claims instead of guessing from traffic patterns. The draft is blunt about its limit: it "does not define authorization or delegation." An identity is a name to put in the record and a thing to revoke. It grants nothing. Linear's [agent guidelines](https://linear.app/developers/aig) put the matching duty on the agent: it should always disclose that it's an agent.

**The customer grants the permission, and the server enforces it.** A prompt can ask an agent to stay inside a limit. Only a token lets your server refuse. The Model Context Protocol's [client registration rules](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/client-registration) let a client name itself with a URL, designed for "the common MCP scenario where servers and clients have no pre-existing relationship." Registration only tells your app what the client calls itself. The permission comes from the [OAuth sign-in](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization) that follows, where the customer approves the agent and your server decides what that approval covers, including whether to trust that client at all. In the figure below, it covers rescheduling jobs and sending texts the owner already approved, and nothing else.

Stripe's [shared payment tokens](https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens) put the same kind of limit on a payment, with the agent doing the issuing: it hands a seller a token good for that seller, up to a maximum amount, in one currency, until an expiration, and can revoke it.

**It stops in the right places.** The agent should stop when an action spends money, can't be undone, speaks in the person's name, or makes them the owner of something. Everywhere else it should be free to work. Netlify shows how low the bar can go when the stakes are low: an agent can [deploy a site with no account at all](https://www.netlify.com/changelog/2026-03-27-create-and-deploy-anything-netlify-clis-improved-ax/), and identity only matters when a person claims the site, within the hour. Stripe's docs draw a line at the other end: an agent may not operate Affirm's loan application for the buyer, who has to navigate and confirm it. When the person does need a screen, [MCP Apps](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/) lets a tool return one inside the conversation.

**It keeps a record with two names on it.** In Linear, [assigning an issue to an agent makes it the delegate, not the assignee](https://linear.app/developers/agents). A person still owns the work, so the record should name both and offer the person an undo. The last line of Linear's guidelines is the reason for all of it: "An agent cannot be held accountable."

To test the door, run an agent you didn't build through a real task in your product and read the transcript. Mark every action your customer wouldn't have approved. Netlify open-sourced a framework, [AXIS](https://www.netlify.com/blog/how-we-measure-netlify-agent-experience), that runs agents against a service and scores how they did.

## Why anyone's agent

You could build that door and open it only to your own assistant, or to a few partners. I think that's a mistake.

Your customer's agent knows things your app never will. A built-in assistant sees one product. The agent a person brings has their inbox, their calendar, and every other tool they use. Work crosses products, and only one of those agents crosses with it.

<figure class="blog-figure blog-figure--wide" data-blog-figure="three-doors" aria-labelledby="three-doors-title">
  <p class="blog-figure__kicker">Figure 01 · Hypothetical example</p>
  <h3 id="three-doors-title">One reschedule, three doors</h3>
  <p class="blog-figure__intro">An electrician tells an agent: move the Garcia panel upgrade to Thursday and let her know. The scheduling app has two open windows on Thursday, 10 a.m.–noon and 3–5 p.m. Garcia's email saying she's only home after 3 is in the owner's inbox, not in the app.</p>
  <div data-figure-stage>
    <table>
      <thead>
        <tr><th scope="col"></th><th scope="col">Locked out, so the owner's agent signs in as the owner</th><th scope="col">The app's built-in assistant</th><th scope="col">The owner's agent, with a grant</th></tr>
      </thead>
      <tbody>
        <tr><th scope="row">How it gets in</th><td>With the owner's password, through the screen made for eyes.</td><td>It's already inside. The app runs it.</td><td>It identifies itself. The owner approved it once, for rescheduling jobs and sending approved texts.</td></tr>
        <tr><th scope="row">Who the app sees</th><td>The owner.</td><td>Its own assistant.</td><td>An agent, acting for the owner.</td></tr>
        <tr><th scope="row">What it can do</th><td>Everything the owner can, including refunds and deleting customers.</td><td>Whatever the app's team built it to do.</td><td>What the grant covers. The server refuses the rest.</td></tr>
        <tr><th scope="row">What it knows</th><td>The owner's inbox and calendar, plus what it can read off the screen.</td><td>Only what's in the app.</td><td>The owner's inbox and calendar, plus the app's answer: two open windows on Thursday.</td></tr>
        <tr><th scope="row">Picking the window</th><td>3–5 p.m., after clicking through the calendar.</td><td>Asks the owner, or guesses. It can't see the email.</td><td>3–5 p.m.</td></tr>
        <tr><th scope="row">Telling Garcia</th><td>Types a free-form text as the owner.</td><td>Sends the approved “rescheduled” text.</td><td>Sends the approved text. Anything free-form goes to the owner first.</td></tr>
        <tr><th scope="row">The record</th><td>“Moved by the owner.”</td><td>“Moved by the app's assistant.”</td><td>“Moved by an agent, for the owner,” with an undo.</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption>Hypothetical app, grant, and messages, used to illustrate the comparison. The first door gets the right answer with no limits. The second has limits and can't get the answer on its own. The third has both.</figcaption>
</figure>

Partners-only fails for a plainer reason: your customers change tools faster than you can sign deals.

The web settled this decades ago. The HTTP standard [defines a user agent](https://www.rfc-editor.org/rfc/rfc9110.html#section-3.5) as "any of the various client programs that initiate a request," and says the browser is "only a small percentage of implementations." A site never chose which browser its customers used. It chose who could sign in and what an account could do. An AI agent is a new user agent, and the same split works: the customer picks the client, and you set the rules.

A browser does what the person clicks, and an agent decides, so the rules have to carry more than they used to. That's what the grant is for. Dimon's thousands of rogue agents are a real risk at the password door, where each one holds everything. At this door a bad agent holds one grant, capped and revocable, with its name on the record.

None of this closes the password door. Perplexity got in by not announcing itself, and a local agent still can. What the granted door can do is make the password door the worse deal. Driving a screen costs an agent more tokens and breaks when the layout changes. A door built for it shouldn't. That's the job left for the cheap, tidy interface from earlier. I expect agents to announce themselves once that's the easier way in.

Announcing plans for an agent standard, Meta [said](https://techcrunch.com/2026/10/06/the-next-hurdle-for-ai-agents-getting-websites-to-let-them-in/), "Turning away a personal agent means turning away the customer behind it." Meta sells a personal agent. I don't, and I'd say the same. An agent comparing two vendors has no habit to break, so the one it can't get into loses the task.

By anyone's agent I mean one that says what it is, carries a grant from your customer, and stays inside limits your server enforces. Keep your own assistant if it's good. It shouldn't be the only one allowed in.

## Two users, one handoff

I've written before about [the calls an agent can't make](/blog/building-products-for-agents) in a workflow. An app that serves agents has to know where those calls are, because that's where the work passes back to the person.

I expect most of the work to come from a user who never looks, running a model you didn't choose, for a customer you want to keep. That customer will look only when money moves or a message goes out in their name.
