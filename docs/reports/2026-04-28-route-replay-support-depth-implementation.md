# Route Replay And Support Depth Implementation

Date: 2026-04-28
Owner: lane-4 main-agent
Queue item: `ECO-20260428-main-497`
Packet: `.agents/packets/190-lane-4-route-replay-and-support-depth.json`

## Summary

Implemented the scoped `Held Dune` support-depth pass through the existing Route v2 `processFocus` seam.

`source-to-shore-dune-catch` now names active hand-lens carriers during the existing Coastal Scrub `sand-capture` window:

- `dune-catch`: `beach-grass`
- `swale-hold`: `pacific-wax-myrtle`

The pass does not add a `cool-edge` active carrier because `sand-capture` remains scoped to the back dune and windbreak swale.

## Stability Notes

- Ready-to-file and filed identity remain canonical `Dune Catch`.
- The three-beat Source to Shore board remains `Source Shelter`, `Forest Release`, `Dune Catch`.
- No route ids, evidence ids, ordered slots, filed text, support ids, save schema, route framework, loadout UI, station shell, geometry, content pack, or fourth Source to Shore beat changed.
- Non-hand-lens supports still use normal nearest-inspect behavior.

## Verification

- `npm test -- --run src/test/field-requests.test.ts -t "Source to Shore|Held Dune"`
- `npm test -- --run src/test/field-request-controller.test.ts -t "Source to Shore|Held Dune|support notice"`
- `npm test -- --run src/test/field-season-board.test.ts -t "Source to Shore|Dune Catch|Held Dune"`
- `npm test -- --run src/test/save-snapshots.test.ts -t "Source to Shore|Dune Catch"`
- `npm test -- --run src/test/field-request-catalog.test.ts src/test/field-requests.test.ts src/test/field-request-controller.test.ts src/test/field-season-board.test.ts src/test/save-snapshots.test.ts`
- `npm run build`

Focused sweep result: 9 files, 370 tests passing.
