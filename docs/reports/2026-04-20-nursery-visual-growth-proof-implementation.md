# Nursery Visual Growth Proof Implementation

Created: 2026-04-20

Queue: `ECO-20260420-main-348`
Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
Role: `main-agent`
Lane: `lane-3`

## Summary

Exposed the existing nursery teaching-bed home-place strip as a tiny pure state seam:
`resolveNurseryHomePlaceStripState(nursery)`.

The renderer now uses that helper to drive the already-existing bottom strip, preserving the current
pixel recipe while making the visual contract testable. This pass does not add nursery copy, layout,
save state, route-support behavior, station pages, geometry, route definitions, or science content.

## What Changed

- Added `NurseryHomePlaceStripState` in `src/engine/field-station-nursery-page.ts`.
- Added `resolveNurseryHomePlaceStripState(...)` with:
  - `showStrip`
  - `stageProgress`
  - `hasLogPile`
  - `hasPollinatorPatch`
- Reused the helper inside `drawFieldStationNurseryPage(...)` so drawing remains visually equivalent.
- Added focused nursery-page tests for:
  - locked and ready states hiding the strip
  - `stocked`, `rooting`, `growing`, and `mature` mapping to progress `1`, `2`, `3`, and `4`
  - existing reward-backed extras lighting log-pile and pollinator-patch motifs
  - mature-bed memory priority and page dimensions staying intact

## Guardrails

- No nursery layout changes.
- No player-facing nursery copy changes.
- No route-support resolver changes.
- No station page, save schema, route definition, route filing, geometry, or science content changes.
- No browser proof was added because the draw code is behavior-equivalent and only reads the same strip inputs through the new pure seam.

## Verification

- `npm test -- --run src/test/field-station-nursery-page.test.ts`
- `npm run build`
