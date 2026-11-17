---
title: "What makes a product agent-first?"
description: "When a customer asks an agent to find two seats, the ticket seller is still up for grabs. Where agent experience matters more than mobile design."
pubDate: 2026-10-28
updatedDate: 2026-11-17
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

If I ask my agent to find two seats for Saturday's game, whose ticket app did I just open?

I might have a favorite. I might have season tickets and only ever use the team's exchange. But suppose all I care about is taking my kid to the game. We have $150 to spend, we want to sit together, and I'd like my kid to be able to see over the bench. In this hypothetical purchase I already know who’s coming, which game we want, and what I can spend. The seller is still up for grabs.

That's where I think agent experience (AX) can matter more than mobile UX. When I open your app, you've made it into consideration. When I give the job to my agent, your first chance to earn the sale may come before I see a single screen you designed.

## What gets a pair of seats onto the shortlist?

Picture the inventory from the ticket seller's side. There's a pair for $128 including fees. On the seat map, two blue dots touch. Tap one and a panel slides up with the row, the total price, and a photo taken from that section. Someone worked out which details a parent would need and put them within reach of a thumb.

Suppose the arena’s event page lists two ticket exchanges for Saturday. The agent follows both links. The first exchange offers *Section 112, tickets from $58*. Does that mean there are two tickets together? Could two people get in for $150? The agent could open the map, select seats, and go through checkout far enough to find out. It could also try the next seller. If that seller comes back with *Section 114, row G, seats 7 and 8, $142 for the pair including fees*, the agent already has one option it can put in front of me.

The first seller has the cheaper pair. As far as the parent knows, the second seller might have the only pair. That's a product problem you could miss entirely by watching recordings of people using the seat map. The parent who missed your offer never got that far.

## Design backward from the answer

In an agent-first product, the work a customer wants to delegate can start in their own agent and carry through to the point where they want to take over. I'd start the design by writing down what the agent ought to be able to tell the parent.

Suppose the first exchange now lets the agent look up a specific pair and see the same details I could see on the map. It can tell me those seats are together and cost $128 in total. The sightline is trickier. A photo taken from the front of the section tells me roughly where I'll be relative to the court. It tells me very little about what a child in row J will see when the bench stands up. If the seller knows which rows sit above the bench, that detail is worth making available alongside the price. If all it has is the photo, I'd want the agent to show me where it was taken. I can decide how much weight to give it.

Suppose I pick the $128 pair. The useful handoff is a checkout with those two seats selected, the seller named, and the current total visible before I pay. Sending me to a home page with instructions to search Section 112 again would throw away most of the work. If the seats sold while I was looking at the photo, I'd want to find that out before I agree to buy anything else.

This gives a product team a fairly demanding test. Start outside your app. Ask for something a customer would actually want, using their words. See whether the agent can find your offer, explain why it fits, and carry the customer's choice through to purchase. Adding a chat box above the seat map answers a different question. It helps a customer who's already there.

## When I still want the screen

Some evenings I'd happily spend twenty minutes on a stadium map with my kid, zooming in behind the basket and debating whether we'd rather see the players up close or watch a play develop from higher up. Browsing together is part of the fun. Give me the good map.

On a busy afternoon I'd delegate the search and gladly spend ten seconds looking at two views on my phone. That may be the most valuable mobile screen in the whole purchase. It lets me make the one judgment I wanted to keep. I've written about [where to put that human decision in a workflow](/blog/building-products-for-agents).

So I'd decide how much to invest in AX by asking which part of the job customers would happily hand over. If it's comparing seats, the design review should start one step earlier than the home screen. Put the $128 pair back in inventory. Give an agent the parent's request. Does that pair ever make it onto the parent's phone?
