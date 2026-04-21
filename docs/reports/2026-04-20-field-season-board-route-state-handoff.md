# Field-Season Board Route State Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-417`
Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
Lane: `lane-4`

## Verdict

Implementation-ready. Packet 152 already moved the active outing locator out of the large field-season board resolver; lane 4 should now add a route-loop regression that proves the split still keeps Route v2 state, board state, journal state, route-marker state, and replay labels aligned.

## Findings

- `field-season-board.ts` still re-exports `resolveSeasonOutingLocator`, while `field-request-state.ts` now imports it directly from `field-season-outing-locator.ts`.
- Existing coverage checks High Pass active, ready-to-file, filed, route-marker, and replay paths, but the lane-4 follow-up should tie those seams together in one route-owned regression so a future board split cannot drift from request-state behavior.
- The right main scope is test-only unless the new regression exposes a real mismatch.

## Main Scope

- Add or extend coverage in `src/test/field-requests.test.ts`.
- Import `resolveFieldSeasonBoardState` only for assertions that compare board state to `resolveFieldRequestState` output.
- Assert active High Pass with selected `route-marker` still exposes the active request, active outing, journal request, treeline marker, and `Today: High Pass`.
- Assert ready-to-file High Pass still keeps journal filing state but suppresses active outing, route marker, and replay label.
- Assert filed High Pass suppresses active request, active outing, journal request, route marker, and replay label while the board remains filed.
- Assert one replay window still lets `routeReplayLabel` follow `routeBoard.replayNote` for the focused target before falling back to the active outing label.

## Non-Goals

- Do not change `src/engine/field-season-board.ts`, `src/engine/field-season-outing-locator.ts`, route definitions, save schema, station pages, authored copy, geometry, rendering, framework code, or broad smoke coverage unless the focused regression finds a real defect.
- Do not rename canonical High Pass filing identity or replay titles.

## Suggested Verification

```bash
npm test -- --run src/test/field-requests.test.ts -t "route-marker and replay state aligned|board split"
npm test -- --run src/test/field-season-board.test.ts -t "High Pass chapter helper|keeps High Pass filed|rime-shelter replay"
npm run build
npm run validate:agents
git diff --check
```
