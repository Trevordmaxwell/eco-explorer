# Front-Half Tactile State Handoff

Created: 2026-04-20
Queue item: `ECO-20260420-scout-358`
Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
Lane: `lane-1`

## Recommendation

Add one debug-only save snapshot for the first front-half station handoff after the forest survey and `Trail Stride`, before Coastal Scrub has been visited.

This is the safest lane-1 contribution to packet `138` because lane 2 already refreshed the tactile Coastal Scrub copy, while existing runtime smoke already proves route-marker and support cycling on the later Coastal Scrub board. The missing proof is a named loadable state that starts future agents and reviewers directly on the early return where the station should point the player toward `Open To Shelter` in Coastal Scrub.

## Proposed Main Scope

Add a named debug snapshot, suggested id `front-half-open-to-shelter`, in `src/engine/debug-save-snapshots.ts`.

The snapshot should represent:

- completed forest starter chain: `forest-hidden-hollow`, `forest-moisture-holders`, and `forest-survey-slice`
- owned `trail-stride`
- last meaningful location `forest`
- no `route-marker` support selection
- no Coastal Scrub completion yet

Update `docs/save-snapshot-states.md` and `src/test/save-snapshots.test.ts` so the named state can be pasted through `window.get_debug_save_snapshots()` and booted through `createGame()`.

## Expected Runtime Assertions

The focused boot test should prove:

- `guidedFieldSeason.stage` is `next-habitat` and `nextBiomeId` is `coastal-scrub`
- station `seasonPage` remains `routes`
- station note is `NEXT STOP` with the existing Open To Shelter next-habitat language
- route board targets `coastal-scrub` and the active/upcoming route reads as `Open To Shelter`
- selected support is still the default `HAND LENS`
- opening the world map focuses `coastal-scrub`
- `routeMarkerLocationId` stays `null` until the player explicitly selects `Route Marker`

## Guardrails

Do not change player-facing station behavior, route definitions, lane-2 copy, support-choice behavior, world-map focus priority, save schema, or biome geometry. This pass should be debug/test/documentation only unless an existing helper has to be reused to expose the state cleanly.

## Verification Target

Recommended verification for the main step:

- `npm test -- --run src/test/save-snapshots.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "first field-season guidance|route board to coastal scrub|unlocked ecosystem-note teaching"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
