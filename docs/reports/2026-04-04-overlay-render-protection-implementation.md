# 2026-04-04 Overlay-Render Protection Implementation

Implemented `ECO-20260404-main-264` against packet `108`.

## What Changed

Extracted the inline `SEASON -> ROUTES` station page body out of `src/engine/overlay-render.ts` and into a new sibling render helper:

- added `src/engine/field-station-routes-page.ts`
- moved the routes-page strip, route board, atlas strip, and support-row rendering into `drawFieldStationRoutesPage(...)`
- kept `drawFieldStationOverlay(...)` responsible for shell framing, top tabs, page switching, expedition rendering, nursery rendering, and the home-place accent passes

The split intentionally preserved the current rect math, copy budgets, and already-derived render inputs. No gameplay, save, input, or station-state logic changed.

## Verification

- `npx vitest run src/test/overlay-copy.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "opens the world-map field station, claims field credit, and buys trail stride|adds a season expedition page that becomes ready after the three live routes are logged"`
- `npm run build`
- shared web-game client smoke in `output/lane-1-main-264-client/`
- live dev-server browser console check at `http://127.0.0.1:4177` returned 0 errors
