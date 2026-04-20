# Map And Station Travel State Handoff

Created: 2026-04-20
Queue item: `ECO-20260420-scout-378`
Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
Lane: `lane-1`

## Scout Finding

Packet `143` already has the lane-2 copy cleanup for Treeline Pass and High Pass language. Lane 1's useful systems slice should therefore stay test-first and protect completed-arc travel state, not add another station/map surface.

The strongest remaining risk is a stale support-selection save: after `High Pass` is filed, a player may still have `route-marker` selected from the active outing. Completed High Pass must still read as filed, with no route marker, no `Today: High Pass` replay label, no journal outing card, and no station activation path that redirects to travel.

## Existing Coverage

- `src/engine/high-pass-chapter-state.ts` already sets filed High Pass to `routeBoardTargetBiomeId: null` and `isActiveOuting: false`.
- `src/engine/field-request-state.ts` already suppresses route markers when there is no active outing, even if the route-marker upgrade exists.
- `src/test/save-snapshots.test.ts` boots `high-pass-filed` and confirms filed station/map/journal state, but the debug snapshot uses the normal default support selection.
- `src/test/runtime-smoke.test.ts` has a broad season-capstone flow that reaches route-marker-selected active High Pass, ready-to-file High Pass, and filed High Pass, but the proof is large and easy to miss as the specific regression guard.

## Main-Agent Scope

Add one focused test-only regression for filed High Pass with `route-marker` still selected.

Preferred implementation:

- Target `src/test/save-snapshots.test.ts`.
- Build the existing `high-pass-filed` debug snapshot save, set `selectedOutingSupportId = 'route-marker'`, boot it through `createGame()`, and assert the settled state stays filed.
- If helper shape makes that awkward, use a focused `src/test/runtime-smoke.test.ts` seed instead, but keep the proof isolated and avoid changing runtime behavior.

Acceptance:

- The focused test proves filed High Pass with `route-marker` selected has `activeFieldRequest === null`.
- Opening the world map keeps `routeMarkerLocationId === null` and `routeReplayLabel === null`; it must not restore `Today: High Pass` or force an active route-marker target.
- Opening the journal keeps `journal.fieldRequest === null`.
- The field station route board remains filed with `targetBiomeId: null`, `nextDirection: High Pass filed. This field arc is complete.`, and a filed launch card.
- The expedition page activation for filed High Pass stays in the station and shows the filed/logged notice rather than opening world-map travel.
- Do not change route definitions, High Pass copy, station layout, support cycling behavior, world-map labels, corridor geometry, save schema, or lane-2 copy.

## Verification

Scout baseline:

- `npm test -- --run src/test/save-snapshots.test.ts -t "High Pass"` passed.

Recommended main verification:

- `npm test -- --run src/test/save-snapshots.test.ts -t "High Pass"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
