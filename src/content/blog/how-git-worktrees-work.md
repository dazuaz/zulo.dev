---
title: "How Git worktrees work"
description: "Git worktrees give each coding agent its own folder and branch without duplicating the repository."
pubDate: 2026-02-17
updatedDate: 2026-09-23
tags:
  - Codex
  - Git
  - Workflow
  - AI
  - Developer Experience
---

If an agent spends 30 minutes editing your repository, you can't use that folder for anything else in the meantime. You can wait, or you can interrupt it. Worktrees give you a third option: a second folder on a different branch, backed by the same repository.

A worktree is not a copy. Every worktree shares one Git history and object database. Each one has its own working directory and index, so uncommitted changes stay in the folder where you made them, but a commit made in any worktree lands in the same repository.

![Git worktree mental model diagram](/blog/how-git-worktrees-work.png)

The mental model:

- One repository history
- Many folders on disk
- One checked-out branch per folder

## Create one

```bash
git worktree add ../games-worktrees/agent-track-17 -b agent/track-17 main
```

This creates the folder `../games-worktrees/agent-track-17`, creates branch `agent/track-17` from `main`, and checks it out there. Your main folder stays on whatever branch it was on.

List what you have:

```bash
git worktree list
```

## The rules

1. A branch can be checked out in only one worktree at a time.
2. Uncommitted changes stay in their folder.
3. Commits are shared immediately and merge like any other branch.
4. You can't delete a branch that is checked out in any worktree.

## Looking at an agent's branch while it works

Because of rule 1, you can't `git switch agent/track-17` from your main folder. Check out its latest commit in detached HEAD instead:

```bash
git switch --detach agent/track-17
```

That works for reading and running tests. Detached HEAD has no branch, so don't commit there. To make changes, work inside the agent's folder or create a new branch from that commit.

## Cleanup

```bash
git worktree remove ../games-worktrees/agent-track-17
git worktree prune
```

## How I use them

Every agent task starts by creating its own worktree and branch, and the agent touches only that folder. I keep working in the main one. I rarely stash anymore, parallel tasks can't step on each other, and each task leaves a branch I can review and merge or throw away.
