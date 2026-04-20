# Map Station Travel Route Marker Review

Date: 2026-04-20
Queue: `ECO-20260420-critic-381`
Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
Lane: `lane-4`

## Verdict

Clean review. The implementation keeps the lane-4 change narrowly on the route-state seam and does not drift into station pages, map UI, copy, save shape, route definitions, support cycling, prompts, or corridor geometry.

## Confirmed

- `src/engine/field-request-state.ts` now suppresses `activeOuting` only when an active Route v2 request is `ready-to-synthesize`.
- Ready-to-file requests still remain `activeFieldRequest` and `journalFieldRequest`, so the notebook filing step stays visible.
- The guard returns `null` instead of falling through to the season outing locator, so notebook-ready High Pass does not revive `routeMarkerLocationId` or a world-map replay label.
- Ordinary active High Pass still supports the selected `route-marker` map pin and `Today: High Pass` focused replay label.
- The no-active-request season-close locator still produces `route-locator:treeline` and `Today: High Pass`.
- Filed High Pass with `route-marker` selected remains suppressed.

## Risk Check

No blocker found. The one watch item is already covered by the new matrix: if later routes add a new ready-to-file world-map affordance, it should use an explicit filing/return surface rather than reusing `activeOuting`.

## Verification

- `npm test -- --run src/test/field-requests.test.ts -t "High Pass|route-marker|ready-to-file|filed|season outing locator"` passed.
- `npm test -- --run src/test/field-request-controller.test.ts -t "route-marker|High Pass"` passed.
- `npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|route-marker"` passed.
- `npm run build` passed.
