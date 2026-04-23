# Task-Splitting Brief for the Next Director Agent

Date: 2026-04-21  
Purpose: tell the agent responsible for dividing work into lanes how to proceed after the alpha-runway run.

## Mission

Prepare Eco Explorer for a credible alpha release candidate, gather real external feedback, then plan the next beta-scale product move from evidence.

Do not open a new biome, season three, a broad planner/dashboard, crafting, combat, inventory, or direct in-game API field guide during this next phase.

## Core strategy

Run the next work in three stages:

1. **Reconcile and release the alpha.** Clean the review-drop artifact, unblock/reconcile the queue, resolve the final content/test mismatch, and add a strict `alpha:rc` command.
2. **Playtest the complete alpha arc.** Use 6-10 observed sessions and record comprehension/motivation patterns.
3. **Open the beta direction only after the feedback gate.** Preferred direction: **Source to Shore**, a second arc through the existing five biomes that teaches cross-biome ecosystem relationships rather than adding biome six.

## First packet to create

Create a short packet before any broader campaign:

### Packet 158 — Alpha RC reconciliation and queue unlock

Goal: turn the completed alpha-runway work into a clean, releasable, validated RC path.

Initial lane split:

| Lane | Role | Scope | Avoid |
| --- | --- | --- | --- |
| lane-1 | systems/tooling/queue | review-drop metadata filter, queue/status reconciliation, `alpha:rc` wrapper after blockers clear | gameplay changes, copy rewrites, geometry |
| lane-2 | content/science/tests | resolve High Pass rime-footing exact-copy mismatch, content parity/dead-copy prune, final science signoff | route behavior, station state, geometry |
| lane-3 | spatial proof | confirm final contact sheet paths and note whether a fresh recapture is needed | new geometry, new route objectives |
| lane-4 | route proof | confirm route/support RC signoff remains valid after lane-2 fix | new route framework, new HUD |

Recommended queue shape for packet 158:

- `scout` items for all four lanes start `READY`.
- `main` items start `BLOCKED` on their lane scout.
- `critic` items start `BLOCKED-BY-IMPLEMENTATION` on their lane main.
- lane-1 `main` should also depend on lane-2 `critic` if full `npm test` is still blocked by copy/test mismatch.
- lane-1 `critic` is the final gate and should run `alpha:rc`.

Packet 158 completion gate:

- source review `.tgz` contains no `._*`, `__MACOSX`, `.DS_Store`, `.git`, `.tmp`, `node_modules`, `dist`, or `output` content.
- `npm run validate:agents`, `npm run science:check`, `npm test`, `npm run build`, and `npm run alpha:rc` pass locally from a clean extract.
- packets/queue statuses match reality.
- done queue is archived or reduced so the active work queue is readable again.

## Stage 2 packets to create after packet 158

### Packet 159 — Alpha playtest kit and observation protocol

Goal: prepare the external alpha sessions without touching gameplay.

Lane split:

- lane-1: build/playable handoff, save-reset instructions, RC artifact location, crash/console checklist.
- lane-2: comprehension questions, science-understanding prompts, adult observer notes.
- lane-3: visual/spatial observation checklist: where players hesitate, which places they remember.
- lane-4: route/support observation checklist: do players know active vs ready-to-file vs filed?

Completion gate: a non-developer can run a session and record feedback using the same rubric every time.

### Packet 160 — Alpha feedback triage and beta direction gate

Goal: classify 6-10 sessions into actionable buckets and choose the next direction.

Lane split:

- lane-1: bugs, install/build issues, save issues, confusing state transitions.
- lane-2: science misunderstandings, copy overload, learning receipts.
- lane-3: spatial confusion, unreadable traversal, weak place memory.
- lane-4: route/replay/support confusion, motivation drop-offs.

Completion gate: one written gate decision: `harden alpha`, `onboarding pass`, `Source to Shore beta`, or `new region/biome`. Default to `Source to Shore beta` only if the alpha arc is understandable and motivating.

## Stage 3 preferred beta campaign

Preferred direction: **Source to Shore**.

The second arc should reuse the current five-biome gradient and teach connected ecosystem relationships:

- high-country snow/rime/melt
- tundra thaw windows and sedge/willow holding patterns
- treeline shelter and talus/lee effects
- forest seep, root, nurse-log, and shade storage
- coastal scrub shelter, windbreaks, seed movement
- beach wrack, dune edge, and shore return

This should feel like revisiting a known world and seeing connections, not like unlocking a larger dashboard.

## Lane ownership for the beta campaign

| Lane | Owns | Strong next work | Must not own |
| --- | --- | --- | --- |
| lane-1 | state, station, save, RC tooling, world-map/station phase | second-arc shell, replay/homecoming progression, save migration | science facts, geometry density, broad route prose |
| lane-2 | science, copy, source ledger, journal/atlas, learning synthesis | watershed/source-to-shore content spine, notebook prompts, adult-facing field report if needed | movement geometry, state machines |
| lane-3 | physical place, traversal, screenshots/contact sheets | one remembered spatial beat per biome, fresh recapture proof | route logic, station state, broad copy |
| lane-4 | Route v2, support choices, replay, notices, filing proof | second-arc route chain, support consequences, active/ready/filed clarity | new route framework, broad station UI |

## Required anti-collision rules

- Every scout item must list exact files/functions the lane may touch.
- Main items may not edit outside the scout-approved file list without stopping and writing a handoff note.
- If two lanes need `src/content/biomes/*`, lane-2 owns facts/copy and lane-3 owns spatial bands; one lane must go first and leave a named handoff for the other.
- If two lanes need `src/engine/field-requests.ts`, lane-2 owns copy-only text and lane-4 owns route structure; do not combine in one unscoped main.
- lane-1 is the only lane that should touch release scripts, `package.json`, queue archival, or cross-lane status reconciliation.
- lane-3 screenshots/output are review artifacts unless a packet explicitly adds source-tracked tooling.
- Full `alpha:rc` or release packaging is never a lane-2/3/4 task.

## Queue generation rules

For each packet, generate 12 queue items unless the packet is deliberately single-lane:

- 4 scouts: one per lane.
- 4 mains: each blocked on its scout.
- 4 critics: each blocked on its main.

Use lane-local chains where possible so lanes can run independently for a long time. Use cross-lane dependencies only when a lane truly needs another lane's output, such as:

- lane-1 final RC depends on lane-2 content/test signoff.
- lane-4 route implementation depends on lane-2 route-copy/content IDs when route text or evidence IDs are new.
- lane-3 spatial implementation depends on lane-1 save/debug snapshot when exact screenshot capture is required.

## Stop conditions

Stop and ask for direction if:

- the plan requires biome six or a new world-map region before playtest evidence exists;
- the second arc requires a new dashboard or planner page;
- the same shared file needs simultaneous edits from multiple lanes;
- source accuracy cannot be supported in the ledger;
- the compact 256x160 screen would require longer copy or smaller text to make the feature work.
