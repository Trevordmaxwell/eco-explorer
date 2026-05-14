# Season-Two Station Clarity Implementation

Date: 2026-04-28
Role: main
Queue: `ECO-20260428-main-487`
Packet: `.agents/packets/180-lane-1-season-two-station-clarity.json`

## Summary

Implemented the filed Source to Shore station clarity pass as a terminal-copy cleanup on existing station seams. Filed Source to Shore now has a centralized filed-arc copy helper, and `SEASON -> ROUTES` plus `SEASON -> EXPEDITION` subtitles use the filed Source to Shore closure line instead of falling through to the older High Pass launch subtitle.

## Changes

- Added `resolveSourceToShoreFiledArcCopy()` in `src/engine/source-to-shore-state.ts`.
- Routed the filed `Dune Catch` / `SOURCE TO SHORE` terminal state through that helper.
- Updated `src/engine/field-season-wrap.ts` so the filed Source to Shore archive subtitle resolves to `Source to Shore is filed for this field arc.`
- Tightened station-board and debug snapshot tests around filed Source to Shore closure.

## Guardrails Kept

- No fourth Source to Shore beat.
- No new route id, route catalog entry, save field, save migration, station page, planner, dashboard, content pack, geometry, or rendering layout change.
- The filed endpoint still shows exactly `Source Shelter`, `Forest Release`, and `Dune Catch`.

## Verification

- `npm test -- --run src/test/field-season-board.test.ts -t "Source to Shore|subtitle|filed arc"`
- `npm test -- --run src/test/save-snapshots.test.ts -t "Dune Catch"`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "Source to Shore station|Dune Catch|season capstone"`
- `npm run build`
- Lightweight web-game client smoke against `http://127.0.0.1:5173/`, with the boot screenshot reviewed at `output/web-game/shot-0.png`.
