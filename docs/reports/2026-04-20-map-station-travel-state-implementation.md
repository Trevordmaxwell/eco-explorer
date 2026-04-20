# Map And Station Travel State Implementation

Created: 2026-04-20
Queue item: `ECO-20260420-main-378`
Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
Lane: `lane-1`

## Result

Added a focused test-only regression that boots the filed `High Pass` debug snapshot with `selectedOutingSupportId = 'route-marker'` and proves the completed arc stays settled.

The test confirms:

- `activeFieldRequest` stays `null`.
- The field-station route board remains filed with `targetBiomeId: null`, the filed next-direction copy, and the filed launch card.
- Opening the world map keeps `routeMarkerLocationId` and `routeReplayLabel` null, so `Today: High Pass` does not reappear.
- Opening the journal keeps `journal.fieldRequest` null.
- Activating the filed High Pass expedition card stays in the station and shows the filed/logged notice instead of opening travel.

## Scope Check

This pass only changes `src/test/save-snapshots.test.ts` plus shared agent/report surfaces. It does not change route definitions, High Pass copy, station layout, support cycling behavior, world-map labels, corridor geometry, save schema, lane-2 copy, or runtime behavior.

## Verification

- `npm test -- --run src/test/save-snapshots.test.ts -t "High Pass"` passed.
- `npm run build` passed.
- `npm run validate:agents` passed with the known work-queue-size warning only.
- `git diff --check` passed.
