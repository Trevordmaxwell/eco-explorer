# 2026-04-03 Open To Shelter Filing Return Review

Review for `ECO-20260403-critic-179`.

## Scope

- `docs/reports/2026-04-03-open-to-shelter-filing-return-implementation.md`
- `src/engine/field-season-board.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Result

No blocking issues found.

The filed `Open To Shelter` return now does the right notebook work without adding shell weight:

- the underlying coastal board state turns toward `Edge Moisture` instead of pointing back at the finished transect
- `note-tabs` gets a dedicated `OPEN TO SHELTER LOGGED` close, so the station reads like a page turn instead of a bare task clear
- that logged close still wins when a replay note overlays the active beat, which preserves the notebook payoff without discarding the existing replay-aware board behavior
- focused board and runtime coverage now guard both the plain logged state and the replay-overlaid station return

## Watch Item

The logged-close helper now keys off the stable return direction rather than the mutable summary. That is the right fix for replay overlays, but future copy edits should update the helper and its focused tests together so the route-specific `note-tabs` close does not silently drift.

## Verification

- `npx vitest run src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts -t "Open To Shelter|edge line"`

## Outcome

- `ECO-20260403-critic-179` can move to `DONE`
- lane 4 has no remaining active queue item in the current wave
