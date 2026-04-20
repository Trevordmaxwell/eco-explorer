# Station Homecoming Lane 1 Implementation

Queue: `ECO-20260420-main-342`
Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
Role: `main-agent`
Lane: `lane-1`

## Summary

Implemented the station-owned homecoming seam for packet `134`.

The new resolver composes the already-earned `arrivalMode: "homecoming"` signal with lane 2's reviewed `resolveFieldStationHomecomingCopy(...)` helper. The resulting `fieldStation.homecoming` debug state is present only during an earned station open with a filed-progress milestone, and it clears on calm reopens without save/schema changes.

## Runtime Shape

- `resolveFieldStationHomecomingState(...)` now lives in `src/engine/field-station-state.ts`.
- `FieldStationStateView.homecoming` carries `label`, `text`, `requestId`, and `homecomingMilestoneRequestId`.
- `game.ts` passes the current `fieldStationArrivalMode` into station state resolution and exposes `fieldStation.homecoming` through `render_game_to_text()`.
- The existing station subtitle row can show the compact `WELCOME BACK` line only during the earned homecoming state; it does not add a page, panel, card stack, or persistent subtitle.
- `FieldStationBackdropAccentState` now exposes `homecomingMilestoneRequestId` and `hasHomecomingMemory` as a non-drawing seam for lane 3. The flag does not create the lane-3 visual accent by itself.

## Guardrails Kept

- No save schema changes.
- No route definitions, filing behavior, support notices, geometry, science copy, or lane-2 copy text changed.
- No new station page or broad layout change.
- Lane 3 and lane 4 can consume the station-owned seam instead of inventing parallel homecoming state.

## Verification

- `npm test -- --run src/test/field-station.test.ts`
- `npm test -- --run src/test/overlay-copy.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "homecoming copy state"`
- `npm run build`
