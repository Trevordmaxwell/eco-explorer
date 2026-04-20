# Runtime Smoke Navigation Proof Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-430`
Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
Lane: `lane-1`

## Result

Refreshed the stale lane-1 runtime-smoke navigation, replay, and filed-route proof expectations in `src/test/runtime-smoke.test.ts` without changing runtime behavior.

The update keeps the current guided world-map focus rule intact:
- fresh starter/current-biome menus default to `field-guide`
- tests that intentionally need the world map now select `world-map` explicitly
- seeded later-route states use coherent completed starter progress when the test needs the current Forest Trail map focus
- route-ready states that suppress active outing labels now expect `routeReplayLabel` to be `null`
- replay-footer checks move focus from the current guided target to the route target before expecting the footer
- route filing exact-copy assertions now match the existing shortened Shore Shelter / Open To Shelter display text already emitted by runtime

## Files Changed

- `src/test/runtime-smoke.test.ts`

## Verification

Passed:
```bash
npm test -- --run src/test/runtime-smoke.test.ts -t "covers title|surfaces surveyed|Open To Shelter|routes page|world-map field station|live replay note|same-biome anchor|current origin"
npm test -- --run src/test/runtime-smoke.test.ts -t "Shore Shelter|Wrack Shelter|Open To Shelter|covers title|surfaces surveyed|routes page|world-map field station|live replay note|same-biome anchor|current origin"
npm run build
```

Attempted:
```bash
npm test -- --run src/test/runtime-smoke.test.ts
```

The full runtime-smoke file now fails only on the known lane-2 High Pass rime-footing exact-copy expectation:
`Rime favors low life on exposed High Pass ground, while tiny rock pockets give footholds.`

That copy mismatch was explicitly out of scope for packet `156` lane 1 and should remain with lane 2/content-copy ownership.

## Non-Goals Held

- No `src/engine/game.ts` or route/controller behavior changes.
- No guided-season copy, route definition, station layout, save schema, map UI, support behavior, geometry, science content, or tooling changes.
- Did not update the High Pass rime-footing copy expectation.
