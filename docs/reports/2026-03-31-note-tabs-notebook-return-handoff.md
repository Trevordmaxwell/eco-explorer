# 2026-03-31 Note Tabs And Notebook Return Handoff

Scout handoff for `ECO-20260331-scout-91`.

## Scope

Prepare one calm lane-4 follow-on after the coastal transect pass so `main-129` can add a tiny new support choice and a richer notebook filing payoff without opening a larger loadout, quest, or station shell.

## Current Live Gap

The outing loop is stronger now, but the next gain is still missing in two specific places:

- the `SUPPORT` row only offers `hand-lens` and owned `route-marker`, so the player can choose clue help or travel help, but not a closure- or notebook-facing aid
- the notebook return payoff is still generic in the station shell:
  - `applyNotebookReadyState()` uses the same `File the notebook note before the next outing.` text for every live Route v2 beat
  - `showFieldRequestNotice()` still resolves a filed Route v2 note as `TASK RECORDED` plus the route title instead of the authored note result

That means the route runtime is now more authored than the station return it feeds.

## Best Small Pass

### 1. Add one third support choice: `note-tabs`

Best id and row label:

- save/runtime id: `note-tabs`
- station label: `NOTE TABS`

Why this is the best third option:

- it fills the one missing support axis:
  - `hand-lens` = clue-reading help
  - `note-tabs` = notebook-shaping help
  - `route-marker` = travel help
- it can live entirely inside the existing `SUPPORT` row and current strip logic
- it does not need a new in-biome marker, another inspect overlay, or a new upgrade tier

Availability:

- keep default support as `hand-lens`
- if `route-marker` is not owned, cycle between `hand-lens` and `note-tabs`
- if `route-marker` is owned, cycle `hand-lens -> note-tabs -> route-marker`

This keeps the support slot tiny while avoiding another unlock rule.

### 2. Let `note-tabs` reuse the current season strip instead of adding a new panel

Recommended behavior while a route is still active:

- `hand-lens`: keep the current clue-first `TODAY` strip behavior
- `route-marker`: keep the current travel-first `TODAY` strip behavior
- `note-tabs`: make the `TODAY` strip notebook-first by showing the active route summary instead of beat-detail or travel-direction copy

Best data source:

- reuse `routeBoard.summary`

That keeps the support calm and distinct:

- `hand-lens` says what kind of clue to notice
- `note-tabs` says what the notebook is trying to prove
- `route-marker` says where to go

### 3. Make the notebook return route-authored instead of generic

`main-129` should keep the one-press filing loop, but make the payoff read like a filed note instead of a generic task toast.

Recommended behavior:

- use each route's existing `routeV2Note.readyText` on the station `NOTEBOOK READY` strip by default instead of the shared generic line
- add compact authored `filedText` sentences for the live Route v2 routes so the payoff reads like a finished field note
- when `note-tabs` is selected and the route is `ready-to-synthesize`, let the strip preview that filed sentence rather than only repeating the filing instruction
- after filing, use the authored `filedText` in the recorded notice instead of only the route title

This is the right filing upgrade because it stays:

- one press
- notebook-first
- authored
- compact enough for the existing shell

## Why This Is Better Than The Other Small Options

### 1. Do not add another travel aid

Why not:

- `route-marker` already owns the travel side
- a second marker or in-biome arrow would start to feel like a bigger HUD lane

### 2. Do not add a prompt-card or second clue helper

Why not:

- that duplicates `hand-lens` too closely
- it would still leave the notebook return generic

### 3. Do not tie the new support to a new unlock, inventory, or nursery branch

Why not:

- the queue item asks for a tiny support-slot growth step, not another reward tree
- lane 4 should stay inside existing support, route, and filing seams

## Best Main-Agent Slice For `main-129`

The cleanest implementation bundle is:

1. extend the support union and save normalization to include `note-tabs`
2. update support cycling and station row labeling without adding another selector surface
3. teach `resolveSupportAwareTodayWrap()` one notebook-first branch for `note-tabs`
4. make `applyNotebookReadyState()` route-aware so notebook-ready copy stops being generic
5. author compact `filedText` lines for the live Route v2 beats and use them in the filed notice path
6. add focused regressions for:
   - support cycling with and without owned `route-marker`
   - `note-tabs` changing the `TODAY` strip to notebook-first route summary text
   - `NOTEBOOK READY` using route-authored text
   - filing surfacing the authored note result instead of title-only `TASK RECORDED` copy

## Expected File Touches

- `src/engine/types.ts`
- `src/engine/save.ts`
- `src/engine/field-requests.ts`
- `src/engine/field-season-board.ts`
- `src/engine/game.ts`
- `src/engine/overlay-render.ts`
- `src/test/save.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add a new station page, notebook page, quest log, or inventory shell
- keep the new support calm and text-only
- keep filing to one press on the existing `ROUTES` page
- keep filed note copy short enough for the current notice and strip budget
- do not let the support row grow into a second catalog or explanation panel

## Queue Guidance

- close `ECO-20260331-scout-91` with this report
- bump packet `043` so the support and filing recommendation is part of the structured lane record
- promote `ECO-20260331-main-129` to `READY`
- keep `ECO-20260331-critic-102` blocked behind implementation
