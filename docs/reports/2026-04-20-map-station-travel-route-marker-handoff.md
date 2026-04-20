# Map Station Travel Route Marker Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-381`
Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
Lane: `lane-4`

## Scout Finding

Packet `143` has already covered filed High Pass stale-support state in lane 1 and place-vs-route copy in lane 2. Lane 4's useful slice should stay on the route/support/replay seam and prove one pure state contract across active, ready-to-file, replay-locator, filed, and no-active-route cases.

The main risk is the ready-to-file seam. `resolveActiveOuting(...)` currently treats any active field request as an active outing, even when Route v2 progress is `ready-to-synthesize`. The station correctly says to return and file the note, but world-map route marker or replay state can still read like an outing is active unless the route-state resolver explicitly suppresses outing synthesis for notebook-ready routes.

## Existing Coverage

- `src/test/field-requests.test.ts` already covers the season-close outing locator, active post-season High Pass, and filed High Pass suppression as separate tests.
- `src/test/save-snapshots.test.ts` covers active High Pass, ready-to-file High Pass station filing state, filed High Pass, and filed High Pass with `route-marker` selected.
- `src/test/runtime-smoke.test.ts` has broad full-flow coverage that reaches active route-marker High Pass, ready-to-file station return, and filed suppression.
- `src/test/field-request-controller.test.ts` confirms `route-marker` remains map-facing and does not bias notebook chip/inspect behavior.

## Main-Agent Scope

Implement the smallest route-state guard in `src/engine/field-request-state.ts` so a Route v2 request with `routeV2.status === 'ready-to-synthesize'` still exposes `activeFieldRequest` and `journalFieldRequest`, but no longer emits:

- `activeOuting`
- `routeMarkerLocationId`
- world-map `routeReplayLabel`

Preferred shape:

- Add a tiny helper near `resolveActiveOuting(...)`, for example `isNotebookReadyRoute(...)`.
- Return `null` from `resolveActiveOuting(...)` when the active request is notebook-ready instead of falling through to the season outing locator.
- Keep ordinary active High Pass and season-close locator behavior intact.

Add one focused `src/test/field-requests.test.ts` state-matrix test near the existing field-request-state tests. It should prove:

- active High Pass with owned/selected `route-marker` and focused `treeline` still has `activeOuting`, `routeMarkerLocationId: 'treeline'`, and `routeReplayLabel: 'Today: High Pass'`
- ready-to-file High Pass still has `activeFieldRequest` / `journalFieldRequest` for `treeline-high-pass`, but has `activeOuting`, `routeMarkerLocationId`, and `routeReplayLabel` all `null`
- season-close replay locator with no active field request still creates the `route-locator:treeline` journal card and `Today: High Pass` replay label
- filed High Pass with `route-marker` selected remains fully suppressed

## Do Not Include

- no station-page or world-map UI changes
- no map copy, route title, filed-note, prompt, or support-toggle copy rewrites
- no route definition, route slot, support-cycling, save-schema, corridor-state, or geometry changes
- no new support type, planner, route framework, HUD, or replay ledger

## Verification

Scout baseline:

- `npm test -- --run src/test/field-requests.test.ts -t "High Pass|route-marker|season outing locator|filed"` passed.
- `npm test -- --run src/test/field-request-controller.test.ts -t "route-marker|High Pass"` passed.
- `npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|route-marker"` passed.

Recommended main verification:

```bash
npm test -- --run src/test/field-requests.test.ts -t "High Pass|route-marker|ready-to-file|filed|season outing locator"
npm test -- --run src/test/field-request-controller.test.ts -t "route-marker|High Pass"
npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|route-marker"
npm run build
npm run validate:agents
git diff --check
```
