# Agent Operating Guide

This project is set up so new agents can plug in without needing prior chat context.

## Active Working Branch

The active shared working branch is currently `main`.

Before editing code or docs, agents should verify the current branch with `git branch --show-current`. If it is not `main`, switch to that branch before continuing unless the user explicitly assigns a different branch.

## Start Here

Read these files in order before doing work:

1. `AGENTS.md`
2. `.agents/lane-runner.md` if you are a single agent covering multiple roles in one lane
3. `.agents/project-memory.md`
4. `.agents/work-queue.md`
5. your lane brief in `.agents/lanes/` if the queue item has a `Lane:`
6. any packet linked from your queue item in `.agents/packets/`
7. your role file in `.agents/roles/`
8. `.agents/critic-brief.md` if you are reviewing, refining, or planning
9. the latest relevant report in `docs/reports/`
10. `progress.md`
11. Product and system docs as needed:
   - `docs/architecture.md`
   - `docs/content-authoring.md`
   - `README.md`

## Agent Roles

Current active roles:

- `main-agent`: implements the next approved chunk of work
- `critic-agent`: stress-tests direction, flags risks, and writes review reports
- `scout-agent`: explores, audits, and prepares small next chunks for the queue

Role details live in:

- `.agents/roles/main-agent.md`
- `.agents/roles/critic-agent.md`
- `.agents/roles/scout-agent.md`

## Shared Sources Of Truth

- `.agents/project-memory.md`: durable product and process decisions
- `.agents/work-queue.md`: shared task queue across agents
- `.agents/lane-runner.md`: the restartable instruction chain for one agent wearing multiple hats
- `.agents/lanes/`: lane briefs and scope boundaries for parallel workstreams
- `.agents/packets/`: structured handoff packets that add machine-friendly context to queue work
- `.agents/critic-brief.md`: standing critique lens and guardrails
- `docs/reports/`: dated reports and handoff memos
- `progress.md`: chronological project history

## Lane Runners

This repo now supports one agent wearing all three hats inside a single lane.

Rules:

- one lane runner should own one lane at a time
- before every new queue item, the agent should restart the read chain from the top instead of chaining forward from stale context
- the queue item's `Owner` still decides which role mindset to use for that step
- the lane brief decides the write scope and what kinds of work belong in that lane
- parallel agents should work in different lanes whenever possible

If you are a lane runner, read `.agents/lane-runner.md` and your lane brief before each item, even if you just finished the prior item moments ago.

## Work Queue Rules

The queue is the main handoff surface between agents.

Routing is not agnostic:

- the `Owner` field says which role should pick up a queue item
- the matching role guide in `.agents/roles/` defines how that agent should approach the work
- the `Lane` field says which parallel workstream owns the item when lane mode is active

- The main agent should take the first `READY` item assigned to `main-agent`.
- The scout agent should take the first `READY` item assigned to `scout-agent`, or add new items if it discovers missing work.
- The critic agent should take the first `READY` or `BLOCKED-BY-IMPLEMENTATION` item assigned to `critic-agent`.
- When a critic item explicitly gates the next parked main-agent step and the review finds no blocking issue, the critic agent may promote that named next step to `READY`.
- A lane runner should take the first actionable item in queue order for its lane, then switch into the role named by that item's `Owner`.

When updating the queue:

- Keep entries append-friendly and easy to scan.
- Use a unique ID in the format `ECO-YYYYMMDD-role-##`.
- Keep one owner per queue item.
- All new active items should include a `Lane:` field.
- Prefer small chunks with clear acceptance criteria.
- Move completed items to the `Done` section instead of deleting them.
- Keep section/status alignment strict:
  - `Ready` may contain only `READY` or `IN PROGRESS`
  - `Blocked` may contain only `BLOCKED` or `BLOCKED-BY-IMPLEMENTATION`
  - `Parked` may contain only `PARKED`
  - `Done` may contain only `DONE`

Items without a `Lane:` field are legacy or archived unless explicitly reactivated.

Queue items remain the source of truth for priority, owner, and status. Packets add structured context, ordering, and guardrails when a short queue item is not enough.

## Active Lane Intent

- `lane-1`: systems, progression, station, replay, season pages, expeditions
- `lane-2`: content density, atlas and journal richness, comparisons, close-look depth
- `lane-3`: caves, giant-tree climbing, vertical traversal, and sub-ecosystem exploration depth
- `lane-4`: gameplay-loop cohesion, Route v2 outings, tiny pre-outing support choice, notebook synthesis, and soft replay windows

## Queue Item Template

Use this shape for new queue items:

```md
### ECO-20260328-main-99

- Status: `READY`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Short action-oriented title`
- Source: `docs/reports/example.md`
- Packet: `.agents/packets/999-example.json`
- Depends on: `none`

Goal:

- One short paragraph or a few bullets describing the intended outcome.

Acceptance:

- concrete success check
- concrete success check
```

Completion notes belong only after the item moves to `Done`.

## Packet Rules

- Store packets in `.agents/packets/`.
- Use filenames in the form `NNN-short-slug.json`.
- Link the packet from every queue item that depends on it.
- Create a packet when work spans multiple queue items, carries important guardrails, or needs to be consumed by another agent system.
- Do not let packets replace the queue. If priority or ownership changes, update `.agents/work-queue.md` first.
- If a packet is superseded, create a new packet and mark the old one as superseded instead of silently repurposing it.
- Bump `version` when clarifying or extending the same packet.
- Keep `queue_refs`, `execution_order[].queue_id`, and each queue item's `Packet:` line in sync.

## Required Agent Hygiene

After finishing a task, update the relevant shared surfaces:

- `.agents/work-queue.md`: status, notes, next handoff
- `.agents/project-memory.md`: only if a durable decision changed
- `progress.md`: only for meaningful project milestones
- `docs/reports/`: when a review or decision memo would help future agents

Verification expectations:

- run `npm run validate:agents` after editing `.agents/work-queue.md` or `.agents/packets/*.json`
- run relevant tests and `npm run build` when you change runtime code
- mention what you verified in the completion note or handoff

## Current Product Direction

The current direction is:

- make the experience feel like a game-first handheld screen
- reduce outer webpage chrome
- keep guidance and controls inside the in-game UI where possible
- protect science accuracy as a hard gate
- preserve modular content, deterministic hooks, and save behavior

## Fast Prompt For Future Agents

You can point any future agent at the project with:

```text
Read AGENTS.md, then read .agents/project-memory.md and .agents/work-queue.md. Read any packet linked from your queue item in .agents/packets/. Take the next READY item assigned to your role, follow the role guide in .agents/roles, and update the queue and memory when you finish.
```

For a single multi-role lane runner, use:

```text
Read AGENTS.md, .agents/lane-runner.md, .agents/project-memory.md, and .agents/work-queue.md. Take the next actionable item in your assigned lane. Before each new item, reread the chain, then read the lane brief, the matching packet, and the matching role file for that item's Owner. Update the queue after every step and restart the chain before taking the next item.
```
