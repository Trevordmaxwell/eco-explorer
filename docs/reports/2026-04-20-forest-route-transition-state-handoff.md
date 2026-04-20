# Forest Route Transition State Handoff

Created: 2026-04-20
Queue item: `ECO-20260420-scout-362`
Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
Lane: `lane-1`

## Recommendation

Add one debug-only save snapshot for the middle forest handoff after `Hidden Hollow` is filed and before `Moisture Holders` is complete.

This is the safest lane-1 contribution to packet `139` because lane 2 already refreshed the `root-held-shelter` copy, while existing route tests prove individual `Moisture Holders` evidence and filing behavior. The remaining useful systems proof is a named loadable state that drops future reviewers directly into the station/map/request seam where Root Hollow should still feel like the current forest destination.

## Proposed Main Scope

Add a named debug snapshot, suggested id `forest-moisture-holders`, in `src/engine/debug-save-snapshots.ts`.

The snapshot should represent:

- completed `beach-shore-shelter`
- completed `forest-hidden-hollow`
- active, incomplete `forest-moisture-holders`
- last meaningful location `forest`
- default outing support still set to `hand-lens`
- no `trail-stride`, `route-marker`, Coastal Scrub, High Pass, route filing, save-schema, or station-shell change

Update `docs/save-snapshot-states.md` and `src/test/save-snapshots.test.ts` so the named state can be pasted through `window.get_debug_save_snapshots()` and booted through `createGame()`.

## Expected Runtime Assertions

The focused boot test should prove:

- `guidedFieldSeason.stage` is `forest-study` with `stationNote.title` `MOISTURE HOLDERS`
- active field request is `forest-moisture-holders` in `forest` with title `Moisture Holders`
- opening the world map keeps both `currentLocationId` and `focusedLocationId` on `forest`
- `routeMarkerLocationId` stays `null`
- station `seasonPage` remains `routes`
- station selected support remains `hand-lens` / `HAND LENS`
- route board stays on `COASTAL SHELTER LINE`, targets `forest`, and has active beat `forest-study`
- route board summary stays `Hidden Hollow logged. Moisture Holders keeps the shelter line low in Root Hollow.`
- opening the journal shows the same active `forest-moisture-holders` request

## Guardrails

Do not change player-facing station behavior, route definitions, lane-2 forest copy, support-choice behavior, world-map focus priority, save schema, biome geometry, or the route controller. This pass should be debug/test/documentation only unless an existing helper has to be reused to expose the state cleanly.

## Verification Target

Recommended verification for the main step:

- `npm test -- --run src/test/save-snapshots.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "Moisture Holders|first field-season guidance"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
