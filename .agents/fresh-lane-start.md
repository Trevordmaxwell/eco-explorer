# Fresh Lane Agent Start

Use this file when starting a brand-new agent with no prior chat context.

## Current Director Gate

The active shared branch is `main`.

The active model is director plus two implementation lanes.

Packet `182` is closed, and packet `192` is closed with clean route-loop cohesion signoff.

Lane 1 is currently clear for packet `192` and has no actionable lane-1 item.

Lane 2 is currently clear for packet `192` and has no actionable lane-2 item.

That means:

- lane 1 should park unless a future queue update promotes another lane-1 item
- lane 2 should park unless a future queue update promotes another lane-2 item
- former lane 3 work now routes through lane 2
- former lane 4 work now routes through lane 1

## Fresh Lane Runner Contract

Each lane runner is one agent wearing the `scout-agent`, `main-agent`, and `critic-agent` hats as the queue requires.

The runner must:

- stay in exactly one lane unless reassigned
- read the full chain before each queue item
- use the queue item's `Owner` field as its role
- promote only the next explicitly dependent step when the current item says to do so
- update `.agents/work-queue.md` after every completed step
- run `npm run validate:agents` after queue or packet edits
- run relevant tests and `npm run build` after runtime code changes
- stop rather than pushing if unrelated dirty files appear

## Copy-Paste Prompts

### Lane 1

```text
You are the lane-1 runner for /Users/trevormaxwell/Desktop/game.

Start with no prior chat context. Read AGENTS.md, .agents/fresh-lane-start.md, .agents/lane-runner.md, .agents/project-memory.md, .agents/work-queue.md, .agents/lanes/lane-1.md, the packet linked from your first lane-1 queue item, and the matching role file in .agents/roles/.

Verify git branch is main. Take the first actionable item in lane-1 queue order only if it is READY. Packet `192` is currently closed; if no lane-1 item is READY, report that lane 1 is clear and parked.
```

### Lane 2

```text
You are the lane-2 runner for /Users/trevormaxwell/Desktop/game.

Start with no prior chat context. Read AGENTS.md, .agents/fresh-lane-start.md, .agents/lane-runner.md, .agents/project-memory.md, .agents/work-queue.md, .agents/lanes/lane-2.md, the packet linked from your first lane-2 queue item, and the matching role file in .agents/roles/.

Verify git branch is main. Take the first actionable item in lane-2 queue order only if it is READY. Lane 2 owns both old content-richness work and old spatial/vertical work; if no lane-2 item is READY, report that lane 2 is clear and parked.
```

### Former Lane 3

```text
Lane 3 is not active in the current operating model. If you were assigned lane 3, read .agents/fresh-lane-start.md and ask whether the intended work should route through lane 2.
```

### Former Lane 4

```text
Lane 4 is not active in the current operating model. If you were assigned lane 4, read .agents/fresh-lane-start.md and ask whether the intended work should route through lane 1.
```

## Sprint Intelligence

Use these GPT-5.5 Codex reasoning-effort defaults:

- director: `xhigh`
- lane 1: `xhigh` while critical handheld-readability work is active, otherwise `high`
- lane 2: `high`

Use `xhigh` for lane 2 only if an item becomes cross-lane or touches engine camera/climb behavior, route implementation breadth, station architecture, save schema, or another high-risk shared seam.

## Quick Status Phrase

If a fresh lane agent is unsure what to do, it should answer with this shape:

```text
I am on main. My assigned lane is lane-N. The first actionable item I found is ECO-... with Owner ... and Status ...

I will proceed / I am parked behind ... and will not edit files.
```
