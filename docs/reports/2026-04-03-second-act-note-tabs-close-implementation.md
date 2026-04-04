# 2026-04-03 Second-Act Note-Tabs Close Implementation

Implemented `ECO-20260403-main-217`.

## Scope

- `src/engine/field-season-board.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## What Changed

- Added one inland logged-return detector for the first `edge-pattern-line` board state right after `tundra-survey-slice` lands and before `scrub-edge-pattern` is logged.
- Gave `note-tabs` one compact route-specific strip close for that exact state:
  - `INLAND LINE LOGGED`
  - `Tundra Survey closes the inland line. Scrub Pattern waits in Coastal Scrub.`
- Left the live route board, route marker, and other outing supports alone, so the board still points forward to `Scrub Pattern` while `hand-lens` keeps the active beat detail.
- Added focused coverage for the new inland `note-tabs` close and the seeded station visit where the board has already rolled forward into `EDGE PATTERN LINE`.

## Verification

- `npx vitest run src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "switches the route board to coastal scrub and can hand the outing guide to route marker|uses a note-tabs chapter-close line once the edge line is logged|shows the thaw-window route replay note when re-entering tundra during the active process window"`
- `npm run build`

## Next Handoff

`ECO-20260403-critic-217` can now review whether the inland logged close adds the intended notebook page-turn without blurring the live handoff into `Scrub Pattern`.
