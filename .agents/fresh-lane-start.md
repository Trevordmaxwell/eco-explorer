# Fresh Lane Agent Start

Use this file when starting a brand-new agent with no prior chat context.

## Current Director Gate

The active shared branch is `main`.

The only lane that should begin implementation flow immediately is lane 1, and its first actionable item is the packet `182` integration signoff scout step:

- `ECO-20260428-scout-489`

The packet `192` lane-parallel sprint is parked behind:

- `ECO-20260428-critic-489`

That means:

- lane 1 may begin now by taking the first actionable lane-1 item in queue order
- lanes 2, 3, and 4 should not implement their packet `192` work yet unless the queue has been promoted or the user explicitly overrides the gate
- if a lane 2, 3, or 4 agent is started before the gate closes, it may do read-only orientation and report that its next sprint item is parked

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

Verify git branch is main. Take the first actionable item in lane-1 queue order. The current director gate says lane 1 may begin now with packet 182 integration signoff. Work only inside lane 1 scope, update the queue when done, run required validation/tests, and do not open lane 2-4 work.
```

### Lane 2

```text
You are the lane-2 runner for /Users/trevormaxwell/Desktop/game.

Start with no prior chat context. Read AGENTS.md, .agents/fresh-lane-start.md, .agents/lane-runner.md, .agents/project-memory.md, .agents/work-queue.md, .agents/lanes/lane-2.md, the packet linked from your first lane-2 queue item, and the matching role file in .agents/roles/.

Verify git branch is main. Take the first actionable item in lane-2 queue order only if it is READY or the user explicitly overrides the current director gate. If lane-2 work is still PARKED behind packet 182, do read-only orientation, report that status, and do not edit files.
```

### Lane 3

```text
You are the lane-3 runner for /Users/trevormaxwell/Desktop/game.

Start with no prior chat context. Read AGENTS.md, .agents/fresh-lane-start.md, .agents/lane-runner.md, .agents/project-memory.md, .agents/work-queue.md, .agents/lanes/lane-3.md, the packet linked from your first lane-3 queue item, and the matching role file in .agents/roles/.

Verify git branch is main. Take the first actionable item in lane-3 queue order only if it is READY or the user explicitly overrides the current director gate. If lane-3 work is still PARKED behind packet 182, do read-only orientation, report that status, and do not edit files.
```

### Lane 4

```text
You are the lane-4 runner for /Users/trevormaxwell/Desktop/game.

Start with no prior chat context. Read AGENTS.md, .agents/fresh-lane-start.md, .agents/lane-runner.md, .agents/project-memory.md, .agents/work-queue.md, .agents/lanes/lane-4.md, the packet linked from your first lane-4 queue item, and the matching role file in .agents/roles/.

Verify git branch is main. Take the first actionable item in lane-4 queue order only if it is READY or the user explicitly overrides the current director gate. If lane-4 work is still PARKED behind packet 182, do read-only orientation, report that status, and do not edit files.
```

## Sprint Intelligence

Use these GPT-5.5 Codex reasoning-effort defaults for the parked packet `192` sprint:

- lane 1: `xhigh`
- lane 2: `high`
- lane 3: `high`
- lane 4: `high`

Use `xhigh` outside lane 1 only if an item becomes cross-lane or touches engine camera/climb behavior, route implementation breadth, station architecture, save schema, or another high-risk shared seam.

## Quick Status Phrase

If a fresh lane agent is unsure what to do, it should answer with this shape:

```text
I am on main. My assigned lane is lane-N. The first actionable item I found is ECO-... with Owner ... and Status ...

I will proceed / I am parked behind ... and will not edit files.
```
