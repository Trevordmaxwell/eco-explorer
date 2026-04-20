# Treeline Route Transition State Handoff

Created: 2026-04-20
Queue item: `ECO-20260420-scout-366`
Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
Lane: `lane-1`

## Recommendation

Add one debug-only save snapshot for the ordinary Treeline `Stone Shelter` route state, after the coastal line is logged and before `High Pass` or filed-season closure is active.

This is the safest lane-1 contribution to packet `140` because lane 2 already refreshed the `stone-shelter` copy, existing runtime smoke already proves route-marker/support behavior on the Treeline board, and the current debug snapshots jump from front-half/season-close states straight into `High Pass`. The missing proof is a named loadable state where the station, map, and journal still say `Stone Shelter` / `TREELINE SHELTER LINE`, not filed `High Pass`.

## Proposed Main Scope

Add a named debug snapshot, suggested id `treeline-stone-shelter`, in `src/engine/debug-save-snapshots.ts`.

The snapshot should represent:

- completed forest starter chain: `forest-hidden-hollow`, `forest-moisture-holders`, and `forest-survey-slice`
- completed front-half coastal chain: `coastal-shelter-shift` and `coastal-edge-moisture`
- owned `trail-stride`
- active, incomplete `treeline-stone-shelter`
- last meaningful location `forest`
- default outing support still set to `hand-lens`
- no `route-marker`, `tundra-short-season`, `tundra-survey-slice`, `treeline-low-fell`, `forest-season-threads`, `High Pass`, filed-season archive, save-schema, or station-shell change

Update `docs/save-snapshot-states.md` and `src/test/save-snapshots.test.ts` so the named state can be pasted through `window.get_debug_save_snapshots()` and booted through `createGame()`.

## Expected Runtime Assertions

The focused boot test should prove:

- `guidedFieldSeason.stage` is `settled`, `nextBiomeId` is `treeline`, and the station note is `STONE SHELTER`
- active field request is `treeline-stone-shelter` in `treeline` with title `Stone Shelter`
- opening the world map keeps `currentLocationId` on `forest`, focuses `treeline`, and leaves `routeMarkerLocationId` `null`
- station `seasonPage` remains `routes`
- station selected support remains `hand-lens` / `HAND LENS`
- route board stays on `TREELINE SHELTER LINE`, targets `treeline`, and has active beat `treeline-shelter`
- route board summary stays `Stone Shelter starts at Treeline Pass.`
- route board does not show a `HIGH PASS` launch card or filed `High Pass` copy
- opening the journal shows the same active `treeline-stone-shelter` request

## Guardrails

Do not change player-facing station behavior, route definitions, lane-2 Treeline copy, support-choice behavior, world-map focus priority, save schema, Treeline geometry, High Pass copy, or the route controller. This pass should be debug/test/documentation only unless an existing helper has to be reused to expose the state cleanly.

## Verification Target

Recommended verification for the main step:

- `npm test -- --run src/test/save-snapshots.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "route board to treeline|High Pass"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
