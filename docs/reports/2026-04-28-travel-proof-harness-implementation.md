# Travel Proof Harness Implementation

Date: 2026-04-28
Role: main
Queue: `ECO-20260428-main-488`
Packet: `.agents/packets/181-lane-1-travel-and-proof-hardening.json`

## Summary

Implemented the scoped test-only field-station proof helper. `src/test/debug-snapshot-harness.ts` now exports `openFieldStationViaWorldMap(fakeWindow)`, composed from the existing world-map and field-station menu helpers.

## Test Updates

- `src/test/save-snapshots.test.ts` now uses `openFieldStationViaWorldMap()` for station-only snapshot checks that do not assert intermediate world-map state.
- Snapshot tests that inspect world-map focus, route markers, replay labels, or current location remain explicit two-step flows.
- `docs/architecture.md` names the helper as the preferred station proof seam when the world-map precondition matters.

## Boundaries

No runtime code, route semantics, save schema, station UI, travel labels, content, geometry, browser artifacts, or `game.ts` behavior changed.

## Verification

- `npm test -- --run src/test/save-snapshots.test.ts`
- `npm run build`
- `git diff --check -- src/test/debug-snapshot-harness.ts src/test/save-snapshots.test.ts docs/architecture.md`
