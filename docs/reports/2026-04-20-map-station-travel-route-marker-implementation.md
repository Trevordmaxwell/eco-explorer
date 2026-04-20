# Map Station Travel Route Marker Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-381`
Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
Lane: `lane-4`

## Implementation

Added one small ready-to-file guard in `src/engine/field-request-state.ts`: when the active Route v2 request is already `ready-to-synthesize`, it still remains the active notebook request and journal request, but it no longer synthesizes an `activeOuting`.

That keeps the world map from showing active outing affordances after the route has shifted into the station-side filing step:

- no `activeOuting`
- no `routeMarkerLocationId`
- no world-map `routeReplayLabel`

The guard returns `null` immediately for ready-to-file active requests, so it does not fall through to the season outing locator. Ordinary active outings and the no-active-request season-close locator still work as before.

## Test Coverage

Added focused `src/test/field-requests.test.ts` coverage for the High Pass route-marker/replay state matrix:

- active High Pass with owned/selected `route-marker` still marks `treeline` and shows `Today: High Pass`
- ready-to-file High Pass keeps `activeFieldRequest` and `journalFieldRequest` for `treeline-high-pass`, but has no active outing, route marker, or replay label
- the season-close replay locator with no active field request still produces `route-locator:treeline` and `Today: High Pass`
- filed High Pass with selected `route-marker` stays fully suppressed

## Preserved

- station pages and station copy
- world-map UI and map copy
- route definitions, route titles, slot order, and filed-note copy
- support cycling and controller behavior
- save schema
- corridor state and geometry
- prompt seeds and new support surfaces

## Verification

- `npm test -- --run src/test/field-requests.test.ts -t "High Pass|route-marker|ready-to-file|filed|season outing locator"` passed.
- `npm test -- --run src/test/field-request-controller.test.ts -t "route-marker|High Pass"` passed.
- `npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|route-marker"` passed.
- `npm run build` passed.
