# Lane 1 Full-Arc Snapshot Runtime Implementation

Queue: `ECO-20260420-main-338`
Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
Role: `main-agent`
Lane: `lane-1`

## Summary

Added a test-only runtime surface matrix to `src/test/save-snapshots.test.ts` for all six debug save snapshots. The matrix boots each snapshot through `createGame()` and the fake DOM helpers, then asserts stable coordinator state through `render_game_to_text()` without adding runtime hooks, new snapshots, browser traversal, save schema changes, or player-facing UI.

## Coverage Added

- `first-session`: starter guidance, active `beach-shore-shelter`, and beach route-board target
- `station-return`: `M` -> `Enter` opens the world map, world-map `M` defaults to `field-station`, and the station-return beat is active
- `season-close-return`: station open clears the close beat into the next-season High Pass routes shell and returns to the map focused on `treeline`
- `high-pass-active`: active `treeline-high-pass` state is visible in active request, journal request, route board, and world-map focus; the current deterministic world state correctly labels the replay as `Rimed Pass`
- `high-pass-ready-to-file`: route board exposes the High Pass filing state with no traversal required
- `high-pass-filed`: station, route board, and journal show a settled filed arc with no active outing/request

## Verification

- `npm test -- --run src/test/save-snapshots.test.ts`
- `npm run build`
- `git diff --check`

All passed.
