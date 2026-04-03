# 2026-04-02 High-Country Place Tab Implementation

Implementation note for `ECO-20260402-main-161`.

## Outcome

`place-tab` now arrives in time for the live `tundra-short-season` beat, so the high-country route can carry one place-reading question during its thaw-window middle chapter without adding another support type or notebook shell.

## What Changed

### Earlier `place-tab` unlock

`src/engine/save.ts` now unlocks `place-tab` once `treeline-stone-shelter` is logged instead of waiting until `tundra-survey-slice`.

That keeps the earlier forest and coast routes unchanged, but it lets the support cycle open on the exact handoff from sheltered treeline into the active high-country middle beat. Save normalization and support cycling tests were updated to keep locked and legacy states deterministic.

### High-country question on the current strip

`src/engine/field-season-board.ts` now reuses the existing tundra `thaw-edge` ecosystem-note prompt when `place-tab` is selected on `treeline-shelter-line` and `tundra-short-season` is the active beat:

- `What here marks the wet edge of thaw?`

Outside that one high-country beat, `place-tab` keeps its prior behavior:

- edge-line prompts still use the existing authored note questions
- non-mapped routes still fall back safely to the active beat detail

### Focused coverage

The update is covered in:

- `src/test/save.test.ts` for the earlier unlock and cycle
- `src/test/field-season-board.test.ts` for the high-country `TODAY` strip question
- `src/test/runtime-smoke.test.ts` for the station flow that now passes through `place-tab` before `route-marker` on the tundra route board

## Verification

- `npx vitest run src/test/save.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "switches the route board to treeline and can hand the outing guide to route marker|switches the route board to tundra and can hand the outing guide to route marker|shows the treeline place-tab question once the edge line reaches Low Fell|switches the route board to coastal scrub and can hand the outing guide to route marker"`
- `npm run build`
