# Forest Route Transition State Implementation

Created: 2026-04-20
Queue item: `ECO-20260420-main-362`
Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
Lane: `lane-1`

## Summary

Added the debug-only `forest-moisture-holders` save snapshot and focused proof that the mid-forest route seam still points to Root Hollow after the forest tactile copy pass.

The snapshot represents a player who has filed `Shore Shelter` and `Hidden Hollow`, is back in `Forest Trail`, has not completed `Moisture Holders`, and still has the default `hand-lens` support. It does not add a new UI, route, station shell, save field, content fact, or geometry change.

## Changes

- Added `forest-moisture-holders` to `DEBUG_SAVE_SNAPSHOT_IDS`.
- Added a plain current-`SaveState` builder with `beach-shore-shelter` and `forest-hidden-hollow` completed, `lastBiomeId` `forest`, and no upgrades or route filing progress.
- Documented the snapshot in `docs/save-snapshot-states.md`.
- Extended `src/test/save-snapshots.test.ts` to prove resolver state and booted runtime surfaces.

## Proof

The focused tests prove:

- `guidedFieldSeason.stage` is `forest-study` with the existing `MOISTURE HOLDERS` station note.
- `activeFieldRequest` and the journal request are `forest-moisture-holders`.
- Opening the world map keeps current and focused location on `forest` with no route-marker pin.
- The station opens to `routes`, keeps `hand-lens` / `HAND LENS`, and leaves `COASTAL SHELTER LINE` targeting `forest` with `forest-study` active.
- The route board summary remains `Hidden Hollow logged. Moisture Holders keeps the shelter line low in Root Hollow.`

## Browser Proof

Captured ignored browser proof under `output/web-game/forest-main-362-snapshot/`:

- `playing.png` / `playing.json`
- `journal.png` / `journal.json`
- `world-map.png` / `world-map.json`
- `field-station.png` / `field-station.json`

The captured state showed `forest-moisture-holders`, Forest Trail map focus, no route-marker pin, `Today: Moisture Holders`, the `MOISTURE HOLDERS` station note, and `HAND LENS` selected. No browser console errors were recorded.

## Verification

- `npm test -- --run src/test/save-snapshots.test.ts` passed.
- `npm test -- --run src/test/runtime-smoke.test.ts -t "Moisture Holders|first field-season guidance"` passed.
- `npm run build` passed.
- `node /Users/trevormaxwell/.codex/skills/develop-web-game/scripts/web_game_playwright_client.js --url http://127.0.0.1:5173/ --actions-json '{"steps":[{"buttons":["enter"],"frames":6},{"buttons":[],"frames":12}]}' --iterations 2 --pause-ms 250 --screenshot-dir output/web-game/forest-main-362-client` passed and screenshots were reviewed.
- Direct Playwright snapshot proof for `forest-moisture-holders` passed with no console errors.
