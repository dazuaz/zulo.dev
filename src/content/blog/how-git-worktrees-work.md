---
title: "How Git worktrees work"
description: "A practical mental model for using Git worktrees so you and your AI agents can work in parallel."
pubDate: 2026-02-17
tags:
  - Codex
  - Git
  - Workflow
  - AI
  - Developer Experience
---

Once you start using Codex daily, it is worth understanding Git worktrees and when to use them.

Worktrees do not make a full copy of your repository. They create an additional working directory that shares the same underlying Git history and object database. Each worktree has its own working directory and index, so uncommitted changes stay isolated to the folder where they were made, but all commits still go into the same shared repository.

![Git worktree mental model diagram](/blog/how-git-worktrees-work.png)

## The problem worktrees solve

If an agent is actively editing your repository for 15 to 60 minutes, your main working directory is no longer a safe place to do unrelated work. You can wait, but that wastes time. You can interrupt, but that breaks momentum.

Worktrees solve this by giving you multiple working directories for the same repository, each with its own checked-out branch.

## The mental model

Think of a worktree as:

- One Git repository history and object store
- Multiple independent folders on disk
- One active branch per folder

So instead of one folder constantly switching branches, you have multiple folders, each stable on its own branch.

## Create one

```bash
git worktree add ../games-worktrees/agent-track-17 -b agent/track-17 main
```

This command:

1. Creates a new folder at `../games-worktrees/agent-track-17`
2. Creates a new branch `agent/track-17` from `main`
3. Checks that branch out in the new folder

Now your main folder can stay on `main` (or any other branch) while the agent works in the worktree.

## Core rules and gotchas

1. You cannot check out the same branch in two worktrees at once.
2. Uncommitted changes are isolated to the folder where they were made.
3. Commits still belong to the same repository and can be merged normally.
4. You cannot delete a branch if it is currently checked out in any worktree.

Because all worktrees share the same underlying `.git` directory and object database, commits created in any worktree immediately become part of the same repository history.

To see active worktrees:

```bash
git worktree list
```

## Reviewing an agent branch while it is active

If `agent/track-17` is already checked out in its worktree, your main folder cannot check out that branch directly.

For quick inspection, switch to the latest commit in detached HEAD state:

```bash
git switch --detach agent/track-17
```

Detached HEAD simply means you are looking at a specific commit instead of a branch pointer. As long as you do not create new commits there, it is perfectly safe for inspection and testing. If you need to make edits, either:

1. Move into the worktree folder, or
2. Create a new branch from that detached commit

## Cleanup

When work is merged and you are done:

```bash
git worktree remove ../games-worktrees/agent-track-17
git worktree prune
```

## Why this works well with AI agents

In my workflow, each agent creates its own worktree and branch before writing code. The agent only touches that folder. I keep working in my main folder.

That gives me:

1. Isolation between concurrent tasks
2. Fewer stash/checkout interruptions
3. Clean, reviewable branches and PRs

If you remember one sentence, use this: Git worktrees let you keep multiple branches checked out at the same time, in separate folders, on the same machine.
