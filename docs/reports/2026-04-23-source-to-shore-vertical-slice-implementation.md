# 2026-04-23 Source To Shore Vertical Slice Implementation

The first Source to Shore beta slice is live as a compact post-High-Pass route proof.

## What Changed

- Added `Source Shelter`, a Route v2 outing that unlocks after filed `High Pass`.
- Reused existing station, map, journal, route-marker, support, and notebook filing seams.
- Added `src/engine/source-to-shore-state.ts` for the beta slice phase helper: `active`, `ready-to-file`, and `filed`.
- Added debug save snapshots:
  - `source-to-shore-active`
  - `source-to-shore-ready-to-file`
  - `source-to-shore-filed`
- Updated station/map/atlas behavior so filed `High Pass` now opens the first Source to Shore beta thread instead of sitting at a dead end.

## Route Shape

Route id: `source-to-shore-source-shelter`

Evidence slots:

- `rime-source`: `frost-heave-boulder` or active-window `reindeer-lichen`
- `lee-watch`: `hoary-marmot`
- `talus-hold`: `talus-cushion-pocket`

Filed note:

- `Rime source, lee watch, and talus hold show water and shelter starting the Source to Shore thread.`

## Boundaries

- No biome six.
- No new route framework.
- No save schema change.
- No new planner, dashboard, inventory, economy, combat, or direct API mode.
- No geometry expansion in this first slice.

## Verification So Far

- `npm run alpha:rc` passed before the slice started.
- Focused route/station/save snapshot tests passed after implementation:
  - `npm test -- --run src/test/field-requests.test.ts src/test/field-season-board.test.ts src/test/save-snapshots.test.ts`
