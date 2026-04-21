# Field-Season Board Route State Review

Date: 2026-04-20
Queue: `ECO-20260420-critic-417`
Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
Lane: `lane-4`

## Verdict

Clean. The implementation adds a focused route-state regression around the field-season board outing-locator split without changing runtime behavior.

## Findings

- The pass stayed test-only for runtime behavior: `src/test/field-requests.test.ts` imports `resolveFieldSeasonBoardState()` for comparison assertions, and there are no lane-4 changes to board, locator, request-state, route-definition, save, station, authored-copy, geometry, rendering, support, or High Pass identity code.
- The board-only beach replay case proves `routeReplayLabel` follows `routeBoard.replayNote` (`Early Shelter`) for the focused beach target before falling back to the active outing label (`Shore Shelter`).
- Active High Pass with selected `route-marker` still aligns active request, active outing, journal request, treeline marker, and `Today: High Pass` with the board's `HIGH PASS / NEXT` state.
- Ready-to-file High Pass keeps journal filing state while suppressing active outing, route marker, and replay label; the board remains on the chapter launch-card filing seam.
- Filed High Pass still suppresses active request, active outing, journal request, route marker, and replay label while the board remains filed.

## Decision

Packet `152` lane 4 is clear. Promote `ECO-20260420-scout-421` for packet `153`.

## Verification

```bash
npm test -- --run src/test/field-requests.test.ts -t "board split|High Pass dormant|Rimed Pass"
npm test -- --run src/test/field-season-board.test.ts -t "High Pass chapter helper|keeps High Pass filed|rime-shelter replay"
npm run build
```
