# Nursery Page Memory Priority Implementation

Queue: `ECO-20260420-main-346`
Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
Role: `main-agent`
Lane: `lane-1`

## Result

Updated the live nursery-page seam test so the mature salmonberry teaching-bed footer now expects the reviewed lane-2 memory line:

`Cool forest edge where salmonberry thickets hold shade.`

Added one regression proving mature teaching-bed memory keeps priority even when the player has another nursery card selected. The test now confirms a route-support hint is available for `edge-pattern-line` / `forest-cool-edge`, but `showRouteSupportHint` remains false and the mature layout stays in the same dense `56px` bed family.

## Scope

- Changed `src/test/field-station-nursery-page.test.ts` only.
- No runtime code changed.
- No save/schema, route-support behavior, nursery shell layout, station card, station page, geometry, or copy-bank changes.

## Verification

- `npm test -- --run src/test/field-station-nursery-page.test.ts`
