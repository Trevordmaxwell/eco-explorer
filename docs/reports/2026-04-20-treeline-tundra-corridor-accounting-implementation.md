# Treeline Tundra Corridor Accounting Implementation

Created: 2026-04-20
Queue item: `ECO-20260420-main-374`
Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
Lane: `lane-1`

## Summary

Added a focused `runtime-smoke` proof for the `treeline-tundra-corridor` accounting seam. The new test enters the corridor from `Treeline Pass`, crosses the ownership threshold into the `Tundra Reach` side, crosses back, and only expects save pacing to advance after the player fully exits at the far tundra edge.

## Result

- Added `keeps treeline-tundra corridor threshold pacing from advancing visits before exit` to `src/test/runtime-smoke.test.ts`.
- Proved threshold movement switches `ownerBiomeId` / `zoneId` between `treeline` / `lichen-fell` and `tundra` / `wind-bluff`.
- Proved `worldStep`, `lastBiomeId`, `biomeVisits.treeline`, and `biomeVisits.tundra` stay unchanged while pacing inside the corridor.
- Proved the full far-edge exit into `tundra` clears corridor state, advances `worldStep` by exactly one, increments only `biomeVisits.tundra`, and updates `lastBiomeId` to `tundra`.

## Scope Notes

This pass is test-only for runtime source. It does not change corridor definitions, world-map doors or nodes, threshold prompt copy, Route v2/support behavior, station/season/High Pass copy, save schema, or geometry.

## Verification

- `npm test -- --run src/test/runtime-smoke.test.ts -t "treeline-tundra-corridor|full adjacent corridor chain|corridor threshold"` passed.
- `npm run build` passed.
- Web-game client smoke passed against `http://127.0.0.1:5173/`; latest screenshot inspected at `output/web-game/corridor-main-374-client/shot-1.png`.
