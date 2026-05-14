# Source to Shore Station Container Implementation

Date: 2026-04-28
Role: main-agent
Lane: lane-1
Packet: `.agents/packets/169-source-to-shore-station-container.json`

## Summary

Implemented a dedicated Source to Shore route-board identity for the post-High-Pass beta chapter.

- Added `routeId: 'source-to-shore-beta'` with `routeTitle: 'SOURCE TO SHORE'`.
- Added exactly three visible board beats: `source-shelter`, `forest-release`, and `dune-catch`.
- Removed the Source to Shore route-board `launchCard`, so active, ready-to-file, and filed states render as their own compact board instead of a launch card inside `EDGE LINE LOGGED`.
- Kept Source to Shore state driven by `resolveSourceToShoreState(save)` and existing Route v2 progress.
- Extended notebook-ready beat mapping so ready-to-file Source to Shore states mark the matching board beat as `ready`.

## Preservation Notes

- The first-season archive strip and `FIELD ATLAS` logged-route history remain intact while Source to Shore is active.
- The station backdrop keeps the late-season archive lintel for Source to Shore archive states even without a launch card.
- The existing salmonberry nursery capstone hint remains available while the Source to Shore board is active.
- No save schema, route framework, station tab, planner, dashboard, support system, or fourth Source to Shore beat was added.

## Files Changed

- `src/engine/field-season-board.ts`
- `src/engine/field-station-routes-page.ts`
- `src/engine/field-season-wrap.ts`
- `src/engine/field-station-homecoming-shell.ts`
- `src/engine/nursery.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`
- `src/test/save-snapshots.test.ts`

## Verification

Passed:

```bash
npm test -- --run src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts -t 'Source to Shore|journal'
npm test -- --run src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts src/test/save-snapshots.test.ts src/test/field-requests.test.ts -t 'Source to Shore|journal|debug save snapshots'
npm test -- --run src/test/field-season-board.test.ts src/test/save-snapshots.test.ts
npm test -- --run src/test/runtime-smoke.test.ts
npm run build
node /Users/trevormaxwell/.codex/skills/develop-web-game/scripts/web_game_playwright_client.js --url http://127.0.0.1:5174/ --actions-json '{"steps":[{"buttons":["enter"],"frames":2},{"buttons":[],"frames":8}]}' --iterations 1 --pause-ms 100 --screenshot-dir output/lane-1-main-450-web-game-client
```

Native `256x160` browser proof:

- `output/lane-1-main-450-browser/active-source-shelter.png`
- `output/lane-1-main-450-browser/ready-source-shelter.png`
- `output/lane-1-main-450-browser/filed-source-to-shore.png`
- `output/lane-1-main-450-browser/errors.json` is empty.

## Handoff

`ECO-20260428-critic-450` can review the new container for density, route-state continuity, first-season archive preservation, nursery/support preservation, and absence of planner or beat-count drift.
