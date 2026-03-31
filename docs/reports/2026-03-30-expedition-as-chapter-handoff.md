# 2026-03-30 Expedition-As-Chapter Handoff

## Scope

Scout handoff for `ECO-20260330-scout-78`: narrow `main-114` so `ROOT HOLLOW` can be rebuilt as the first full Route v2 chapter without reopening the station shell, the forest geometry, or a second expedition system.

## Current Live Gap

Lane 4 now has the right outing foundation:

- Route v2 already supports notebook-ready `assemble-evidence` beats
- the expedition page already works as one calm `ROOT HOLLOW` card
- the route-marker fallback, `root-hollow` notebook cue, and `log-run` return cue are already live

What still reads old-shaped is the expedition request spine:

- `forest-expedition-lower-hollow` is still an `enter-zone` checkpoint
- `forest-expedition-trunk-climb` is still a `reach-area` checkpoint
- `forest-expedition-upper-run` is still an `enter-zone` checkpoint

So the project's strongest chapter-like space still logs as three separate movement check-ins instead of one notebook-led outing with one real filing finish.

## Best Conversion Rule

Do not add a new expedition runtime type.

Do not keep the current three-checkpoint shell and layer notebook-ready state on top of it.

Instead, collapse `ROOT HOLLOW` into one chapter-scale `assemble-evidence` request that carries all four target qualities at once:

- one clear purpose
- one short traversal problem
- one place-based evidence set
- one notebook synthesis finish

Why this is the right shape:

- it keeps `main-114` inside the live Route v2 core instead of reopening request architecture
- it makes the expedition feel newer than the old season routes it now follows
- it preserves the one-card expedition page and existing route-marker support behavior

## Recommended Chapter Pack

### `ROOT HOLLOW`

Recommended backing request id:

- reuse `forest-expedition-upper-run` if possible, so fully logged legacy saves still read as completed and `forest-season-threads` can keep unlocking from the same stored id

Recommended active request title:

- `Root Hollow`

Recommended Route v2 type:

- chapter-scale `assemble-evidence`

Best live path:

- `root-hollow -> filtered-return -> log-run`

Recommended slot family:

- `seep-mark`
- `root-held`
- `high-run`

Recommended carriers:

- `seep-mark`: `seep-stone`
- `root-held`: `root-curtain`
- `high-run`: `fir-cone`

Why this works:

- `seep-stone` keeps the expedition's strongest place-memory anchor
- `root-curtain` forces the player through the short climb / filtered-return leg instead of letting the chapter resolve at the hollow lip
- `fir-cone` gives the upper-run re-entry one distinct forest-open clue and reuses the live `forest-seed-travel` support language
- all three carriers already exist in the current chapter spaces, so `main-114` can stay runtime-first instead of opening a lane-2 content pass

Recommended summary shift:

- from three separate lower/climb/upper checkpoint summaries
- toward one chapter summary such as:
  - `In Root Hollow, confirm the seep mark, climb to one root-held clue, and carry one high-run clue back into Log Run before filing the chapter.`

## Expedition Card Guidance

Keep `EXPEDITION` as one card.

Update it to mirror the single chapter request rather than the old three-leg checklist:

- `READY`: one deeper forest chapter is staged from seep mark to high run
- `ACTIVE`: show `0/3`, `1/3`, or `2/3` from the live `routeV2Progress.evidenceSlots`
- `NOTE READY`: once the chapter request reaches `ready-to-synthesize`, keep the page as one card but change the status label or note so the player knows to file the chapter at the station
- `LOGGED`: preserve the current calm filed summary plus the tiny logged-only teaser behavior

This is important: the chapter's notebook closure should happen on the expedition itself, not only after the later `Season Threads` follow-up.

## Save-Compatibility Guidance

`main-114` should keep old saves recoverable.

Recommended approach:

- preserve `forest-expedition-upper-run` as the logged chapter id if possible
- treat legacy `forest-expedition-lower-hollow` / `forest-expedition-trunk-climb` completions as compatibility hints, not as a reason to lock or duplicate the expedition card
- avoid any migration that would strand a save between the old three-leg shell and the new single-chapter request

The simplest acceptable tradeoff is:

- fully logged legacy saves still read as logged
- partially progressed legacy saves fall back to the new active chapter cleanly instead of crashing or hiding the expedition

## Support Guidance

Keep the already-landed support seams unless a precise gap appears during implementation:

- keep the route-marker expedition fallback
- keep the one-card expedition page
- keep the live `forest-hollow-moisture` and `forest-seed-travel` prompt / partner support unless one tiny text retune is truly needed

Do not spend `main-114` on:

- new expedition rewards
- a second expedition card
- new station rows
- new forest geometry
- a new traversal or checkpoint system

## Best Main-Agent Slice

`main-114` should stay tightly scoped to:

1. replace the old three-request expedition spine with the single chapter request above
2. retarget `forest-season-threads` so it unlocks after the filed chapter request
3. update expedition-card, atlas, and route-handoff copy so they describe one chapter instead of three logged checkpoints
4. add focused tests for request progression, expedition-card states, notebook-ready expedition behavior, and the live runtime chapter flow

## Expected File Touches

- `src/engine/field-requests.ts`
- `src/engine/field-season-board.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add a new expedition runtime type when `assemble-evidence` can already carry this chapter
- do not keep three separate completion checkpoints plus a new note-ready layer on top
- do not insert a mid-chapter station filing step
- do not add a second expedition card, support row, or expedition inventory
- do not reopen forest geometry or lane-2 content just to make the chapter feel richer

## Queue Guidance

- close `ECO-20260330-scout-78` with this report
- bump packet `035` so the chapter handoff is part of the lane record
- promote `ECO-20260330-main-114` to `READY`
- keep `ECO-20260330-critic-89` blocked behind implementation
