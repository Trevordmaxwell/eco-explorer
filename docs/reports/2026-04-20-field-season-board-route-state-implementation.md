# Field-Season Board Route State Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-417`
Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
Lane: `lane-4`

## Result

Added behavior-neutral route-state regression coverage for the field-season board outing-locator split.

## Changes

- Extended `src/test/field-requests.test.ts` so the route-owned state test now compares `resolveFieldRequestState()` against `resolveFieldSeasonBoardState()` after the board split.
- Covered a board-only beach replay window where the world-map replay label follows `routeBoard.replayNote` (`Early Shelter`) instead of falling back to the active outing label (`Shore Shelter`).
- Covered active High Pass with selected `route-marker`, ready-to-file High Pass, calm season-close locator fallback, and filed High Pass suppression against the split board state.
- Confirmed High Pass ready-to-file uses the chapter launch-card filing seam rather than `routeBoard.notebookReady`.

## Scope Notes

- Test-only for runtime behavior.
- No changes to `src/engine/field-season-board.ts`, `src/engine/field-season-outing-locator.ts`, route definitions, save schema, station pages, authored copy, geometry, rendering, framework code, support behavior, or canonical High Pass filing identity.

## Verification

```bash
npm test -- --run src/test/field-requests.test.ts -t "board split|High Pass dormant|Rimed Pass"
npm test -- --run src/test/field-season-board.test.ts -t "High Pass chapter helper|keeps High Pass filed|rime-shelter replay"
npm run build
```
