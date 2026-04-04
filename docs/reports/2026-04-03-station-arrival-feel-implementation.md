# 2026-04-03 Station Arrival Feel Implementation

Implemented `ECO-20260403-main-231` against packet `097`.

## What Changed

The feel pass stayed inside [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts), [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts), and one focused smoke assertion in [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts).

- Added a tiny `fieldStationArrivalPulse` timer in `game.ts`.
  - `openFieldStation()` now starts it.
  - the normal update loop ticks it down.
  - `closeFieldStation()` clears it.
- Threaded one normalized pulse value into `drawFieldStationOverlay(...)` and into `render_game_to_text()` for deterministic smoke coverage.
- Reused the existing lower-shell station accent as the only animated surface:
  - on open, a short bright center line blooms across the sill
  - after a brief settle, the overlay returns to the prior static station-transformation state
- Kept the rest of the shell untouched: no new copy, no new strip, no world-map marker motion, and no save-state change.

## Why This Fits The Handoff

The new feel lives exactly on the seam the critic approved in the previous step. Arrival is now more tangible, but the routes page and nursery do not gain another decorative row or a broader transition system.

## Verification

- `npx vitest run src/test/overlay-copy.test.ts src/test/runtime-smoke.test.ts -t "opens the world-map field station, claims field credit, and buys trail stride|opens the nursery tab and starts one teaching-bed project from the field station|adds a season expedition page that becomes ready after the three live routes are logged|derives a calm field-station growth accent from nursery progress instead of new copy"`
- `npm run build`
- Web-game client smoke in [output/lane-1-main-231-client/shot-1.png](/Users/trevormaxwell/Desktop/game/output/lane-1-main-231-client/shot-1.png)
- Seeded live browser proof on:
  - [station-arrival-pulse.png](/Users/trevormaxwell/Desktop/game/output/lane-1-main-231-browser/station-arrival-pulse.png)
  - [station-arrival-settled.png](/Users/trevormaxwell/Desktop/game/output/lane-1-main-231-browser/station-arrival-settled.png)
- Browser debug check confirmed `arrivalPulse: 1` on open and `arrivalPulse: 0` after settle
- Browser console only showed the existing `not granted` permission noise
