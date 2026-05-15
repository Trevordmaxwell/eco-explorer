# Fresh Lane Agent Start

Use this file when starting a brand-new agent with no prior chat context.

## Current Director Gate

The active shared branch is `main`.

The active model is director plus two implementation lanes.

Packet `182` is closed, and packet `192` is closed with clean route-loop cohesion signoff.

Packet `193` is closed with clean RC playtest readiness signoff.

Lane 1 has no remaining actionable packet `193` item after:

- `ECO-20260515-critic-03`

Lane 2 has no remaining actionable packet `193` item after:

- `ECO-20260515-critic-02`

That means:

- no lane should continue packet `193`
- external observed sessions may begin with the refreshed playtest kit
- after real sessions exist, synthesize repeated evidence before approving new feature expansion, route work, new station pages, content breadth, or old external-feedback packet tails
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

Verify git branch is main. Take the first actionable item in lane-1 queue order only if it is READY. The current director gate says packet 193 is closed with clean readiness signoff; lane 1 has no remaining actionable packet 193 item after ECO-20260515-critic-03. Do not start feature expansion, new route work, new station pages, or content breadth unless the queue promotes a new lane-1 item.
```

### Lane 2

```text
You are the lane-2 runner for /Users/trevormaxwell/Desktop/game.

Start with no prior chat context. Read AGENTS.md, .agents/fresh-lane-start.md, .agents/lane-runner.md, .agents/project-memory.md, .agents/work-queue.md, .agents/lanes/lane-2.md, the packet linked from your first lane-2 queue item, and the matching role file in .agents/roles/.

Verify git branch is main. Take the first actionable item in lane-2 queue order only if it is READY. The current director gate says packet 193 is active, but lane 2 has cleared its observer-doc gate through ECO-20260515-critic-02 and is parked unless the queue promotes a new lane-2 item or the user explicitly overrides the gate. Do not edit runtime, station, route, map, save, overlay, or progression files.
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
- lane 1: `high`; use `xhigh` only if a smoke blocker touches save, route, station, or overlay behavior
- lane 2: `high`

Use `xhigh` for lane 2 only if an item becomes cross-lane or touches engine camera/climb behavior, route implementation breadth, station architecture, save schema, or another high-risk shared seam.

## Quick Status Phrase

If a fresh lane agent is unsure what to do, it should answer with this shape:

```text
I am on main. My assigned lane is lane-N. The first actionable item I found is ECO-... with Owner ... and Status ...

I will proceed / I am parked behind ... and will not edit files.
```
