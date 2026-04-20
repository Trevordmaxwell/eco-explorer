# Support Choice Station Echo Implementation

Queue: `ECO-20260420-main-350`
Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
Role: `main-agent`
Lane: `lane-1`

## Summary

Implemented the lane-1 station echo seam for outing support choice without changing support behavior, save schema, station layout, route-marker behavior, route definitions, notice copy, geometry, or science copy.

## Changes

- Added `getOutingSupportStationLabel(...)` in `src/engine/outing-support.ts` with the exact station-facing labels: `HAND LENS`, `NOTE TABS`, `PLACE TAB`, and `ROUTE MARKER`.
- Reused that helper in the visible `SEASON -> ROUTES` support row.
- Exposed `fieldStation.selectedOutingSupportLabel` through `render_game_to_text()` alongside the normalized `selectedOutingSupportId`.
- Added focused station-state coverage proving locked `route-marker` saves echo `hand-lens` / `HAND LENS`, purchased `route-marker` echoes `route-marker` / `ROUTE MARKER`, and earned `place-tab` echoes `place-tab` / `PLACE TAB`.
- Updated the focused support-row runtime-smoke expectations to the current guided world-map focus rule, where the map opens on the active outing target before explicit route-marker support is selected.

## Verification

- `npm test -- --run src/test/save.test.ts src/test/field-station.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "route marker|outing support|locked route-marker|route board to tundra|coastal scrub and can hand"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
- Packet JSON parse for `.agents/packets/136-support-choice-in-field-differentiation.json`
- `web_game_playwright_client` smoke at `output/web-game/support-choice-station-echo-main-350/`, with state JSON showing `fieldStation.selectedOutingSupportLabel: "HAND LENS"` and no `errors-*.json`.
