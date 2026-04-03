# 2026-04-03 Wrack Shelter Replay Implementation

Implemented `ECO-20260403-main-198`.

## Scope

Turn the opening beach Route v2 outing into one process-backed replay variant during the existing `wrack-hold` window without changing its stage order, notebook-ready title, or filed note identity.

## What Changed

- Added `processFocus` to `beach-shore-shelter` in `src/engine/field-requests.ts`:
  - `momentId: 'wrack-hold'`
  - active title: `Wrack Shelter`
  - active summary: `Fresh wrack makes the beach shelter line easier to follow today.`
- Kept the canonical filing seam unchanged:
  - request id remains `beach-shore-shelter`
  - notebook-ready copy still files the `Shore Shelter` note
  - clue-backed filed text still resolves through the gathered beach carriers
- Updated the existing beach replay note in `src/engine/field-season-board.ts` to the same compact `Wrack Shelter` summary so the active request, board, and season wrap all tell the same replay story.

## Test Coverage

- `src/test/field-requests.test.ts`
  - adds a focused `Wrack Shelter` process-window regression
  - verifies ready-to-file and clue-backed filed text stay canonical as `Shore Shelter`
- `src/test/field-season-board.test.ts`
  - locks the active opening beat into the explicit `Wrack Shelter` replay note on late beach revisits
- `src/test/runtime-smoke.test.ts`
  - adds one seeded beach replay proof where re-entering `beach` during `wrack-hold` aligns the active request, replay notice, route board, and season wrap around `Wrack Shelter`

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "Wrack Shelter|Thaw Window|Moist Edge|route replay note"`
- `npm run build`
