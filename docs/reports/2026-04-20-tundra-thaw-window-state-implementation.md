# Tundra Thaw Window State Implementation

Created: 2026-04-20
Queue item: `ECO-20260420-main-370`
Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
Lane: `lane-1`

## Summary

Added one debug-only save snapshot, `tundra-thaw-window`, for reviewers to load the active peak-thaw Tundra state without replaying the inland route chain.

The snapshot starts in `Tundra Reach` after `Stone Shelter` is logged, keeps `tundra-short-season` incomplete and active, owns only `trail-stride`, sets `worldStep` to `4`, and sets `biomeVisits.tundra` to `2` so the existing `thaw-fringe` process window drives the live `Thaw Window` replay note.

## Changed

- Added `tundra-thaw-window` to `src/engine/debug-save-snapshots.ts`.
- Documented the new state in `docs/save-snapshot-states.md`.
- Extended `src/test/save-snapshots.test.ts` with resolver and runtime boot coverage for guided-season state, active request, route-board replay note, map focus/footer, station support/defaults, no launch card, and journal request.

## Browser Proof

Captured a direct Playwright proof under `output/web-game/tundra-main-370-snapshot/`.

- `playing.png`: Tundra boots with active `Thaw Window`.
- `journal.png`: journal field request stays on `tundra-short-season`.
- `world-map.png`: current/focused location is `tundra`, route marker is absent, footer reads `Today: Thaw Window`.
- `field-station.png`: routes page shows `HAND LENS`, `THAW WINDOW`, peak-thaw replay text, and no launch card.
- `states.json` / `errors.json`: state assertions passed and browser errors were empty.

## Verification

- `npm test -- --run src/test/save-snapshots.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "route board to tundra|thaw-window route replay"`
- `npm run build`
- `node /Users/trevormaxwell/.codex/skills/develop-web-game/scripts/web_game_playwright_client.js --url http://127.0.0.1:5173/ --actions-json '{"steps":[{"buttons":["enter"],"frames":6},{"buttons":[],"frames":12}]}' --iterations 2 --pause-ms 250 --screenshot-dir output/web-game/tundra-main-370-client`
- Direct Playwright snapshot proof against `tundra-thaw-window` with no console or page errors.

## Scope Preserved

This pass did not change `src/engine/field-requests.ts`, Route v2 slot order, process focus copy, support targeting, lane-2 Tundra copy, station layout, world-map focus priority, save schema, Tundra geometry, High Pass copy, or route-controller behavior.
