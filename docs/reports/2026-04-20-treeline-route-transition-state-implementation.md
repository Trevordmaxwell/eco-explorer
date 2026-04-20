# Treeline Route Transition State Implementation

Created: 2026-04-20
Queue item: `ECO-20260420-main-366`
Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
Lane: `lane-1`

## Summary

Added the debug-only `treeline-stone-shelter` save snapshot so reviewers can load the ordinary Treeline route seam after the coastal line is logged and before any `High Pass` closure state appears.

The snapshot is plain `SaveState` JSON with `trail-stride` owned, forest and coastal route prerequisites filed, `lastBiomeId` set to `forest`, and no `route-marker`, High Pass, season-close, or filed-archive state.

## Runtime Proof

`src/test/save-snapshots.test.ts` now proves the snapshot through resolver and booted runtime surfaces:

- guided field-season state is `settled`, points to `treeline`, and shows the `STONE SHELTER` station note
- active request and journal request are `treeline-stone-shelter`
- world map keeps current location on `forest`, focuses `treeline`, and leaves `routeMarkerLocationId` `null`
- station stays on `routes`, keeps `hand-lens` / `HAND LENS`, and shows `TREELINE SHELTER LINE`
- route board targets `treeline`, keeps `treeline-shelter` active, uses `Stone Shelter starts at Treeline Pass.`, and has `launchCard: null`

Browser proof was captured under ignored output:

- `output/web-game/treeline-main-366-client/`
- `output/web-game/treeline-main-366-snapshot/`

The inspected live screenshots show the station route board, world-map footer, and journal request all reading as `Stone Shelter` rather than `High Pass`.

## Verification

- `npm test -- --run src/test/save-snapshots.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "route board to treeline|High Pass"`
- `npm run build`
- `node /Users/trevormaxwell/.codex/skills/develop-web-game/scripts/web_game_playwright_client.js --url http://127.0.0.1:5173/ --actions-json '{"steps":[{"buttons":["enter"],"frames":6},{"buttons":[],"frames":12}]}' --iterations 2 --pause-ms 250 --screenshot-dir output/web-game/treeline-main-366-client`
- direct Playwright snapshot proof for `treeline-stone-shelter` with no console/page errors

## Scope Preserved

No player-facing station behavior, route definitions, lane-2 Treeline copy, support-choice behavior, world-map focus priority, save schema, Treeline geometry, High Pass copy, or route-controller behavior changed.
