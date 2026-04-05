# Nursery Beat Separation Implementation

## What Changed

The first home-loop beat-separation pass now treats the selected active `TEACHING BED` as the dominant nursery beat.

- `src/engine/nursery.ts` now resolves a tiny `teachingBedFocusMode` plus `showRouteSupportHint` flag from the selected card and active bed stage.
- `src/engine/field-station-state.ts` and `src/engine/game.ts` now carry that focused nursery state through the live field-station view and debug/runtime state.
- `src/engine/field-station-nursery-page.ts` now uses the resolved flag instead of always drawing the route-support strip whenever a non-mature hint exists.

## Result

- While the player is on `bench` or `compost`, route-support guidance still appears as before.
- Once the player moves onto an active `bed`, the bed owns the moment and the route-support strip stops competing with the plant-stage read.
- The pass stays inside the current station shell and does not move reward language into a new seam yet.

## Verification

- `npx vitest run src/test/nursery.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "opens the nursery tab and starts one teaching-bed project from the field station"`
- `npm run build`
