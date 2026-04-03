# 2026-04-03 Season-Two Capstone Implementation

Completed `ECO-20260402-main-180` by restoring one compact return-to-station close beat after `Season Threads` logs, while leaving the filed `High Pass` shell intact once the player actually reopens the station.

## What Changed

- [guided-field-season.ts](/Users/trevormaxwell/Desktop/game/src/engine/guided-field-season.ts) now adds one short `season-close-return` stage. When `forest-season-threads` is logged and the close beat has not yet been acknowledged, the season guidance shifts to:
  - `RETURN TO STATION`
  - `Season Threads logged. Return to the field station for a calm season close.`
  - `FIELD STATION / Season Threads logged. Field station next.`
- [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts) now persists that close beat through one new save flag, routes menu defaults through the same world-map then station path used by the earlier station-return beat, and clears the pending close the first time the station opens so the established `High Pass` routes shell can take over immediately.
- [save.ts](/Users/trevormaxwell/Desktop/game/src/engine/save.ts) and [types.ts](/Users/trevormaxwell/Desktop/game/src/engine/types.ts) now carry the compact `seasonCloseReturnPending` save seam needed to preserve the post-capstone close between sessions.

## Guardrails Kept

- No new station page, recap overlay, or ceremony shell was added.
- The filed `High Pass` routes shell still owns the routes page as soon as the player reaches the station.
- The capstone close stays notebook-toned and short instead of becoming another planner layer.

## Verification

- `npx vitest run src/test/guided-field-season.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "surfaces the season capstone, then opens the next field season on the routes shell"`
- `npm run build`
- Shared web-game client smoke in `output/lane-1-main-180-client/`
- Seeded browser spot-check at `http://127.0.0.1:4189`
