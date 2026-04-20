# Field-Season Board Outing Locator Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-414`
Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
Lane: `lane-1`

## Result

Implemented the packet `152` lane-1 split by extracting the active outing locator family into `src/engine/field-season-outing-locator.ts`.

## Changes

- Added `field-season-outing-locator.ts` with `ActiveOutingLocator`, `resolveSeasonOutingLocator()`, and the shared Root Hollow expedition progress helpers/constants.
- Updated `field-season-board.ts` to import those helpers and re-export `resolveSeasonOutingLocator` / `ActiveOutingLocator` for existing callers.
- Updated `field-request-state.ts` to import the locator directly from the new module.
- Left route-board state resolution, atlas/archive state, expedition card state, station subtitle behavior, route definitions, save schema, rendering, authored copy, and layout unchanged.

## Verification

```bash
npm test -- --run src/test/field-season-board.test.ts
npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|season-close|route-marker"
npm run build
node "$HOME/.codex/skills/develop-web-game/scripts/web_game_playwright_client.js" --url http://127.0.0.1:5174 --actions-file "$HOME/.codex/skills/develop-web-game/references/action_payloads.json" --iterations 1 --pause-ms 150
```

The web-game client wrote `output/web-game/shot-0.png` and `output/web-game/state-0.json`; the sampled state booted into Sunny Beach with the starter `Shore Shelter` board and no `errors-0.json` console/page-error file.

Remaining expected closeout checks after queue/packet updates:

```bash
npm run validate:agents
git diff --check
```
