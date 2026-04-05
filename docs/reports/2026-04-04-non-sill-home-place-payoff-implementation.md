# 2026-04-04 Non-Sill Home-Place Payoff Implementation

Implemented `ECO-20260404-main-263` against packet `108`.

## What Changed

Kept the pass inside the station shell render and its focused tests.

- Added `resolveFieldStationBackdropAccentState(...)` in `src/engine/overlay-render.ts`
- Added `drawFieldStationBackdropAccent(...)` and called it from `drawFieldStationOverlay(...)` before the existing lower-sill accent
- Kept the new payoff on the station side gutters between `panelRect` and `contentRect`
- Left subtitles, board copy, map flow, arrival timing, and the existing sill family unchanged

The new backdrop seam now reads as a calmer brace family:

- no progress: no backdrop accent
- stocked bed or first logged route: left brace
- later nursery maturity or second logged route: right brace joins
- fully settled states or stronger utility progress: tiny mid-body tie marks complete the pair

Nursery extras only enrich that same brace family, so the shell feels more settled without starting a second decorative system.

## Test Surface

- Extended `src/test/overlay-copy.test.ts` with pure expectations for the new backdrop helper
- Added `fieldStation.backdropAccent` to `render_game_to_text()` in `src/engine/game.ts` so the runtime smoke can prove the new seam deterministically
- Updated focused runtime smoke expectations for:
  - no early backdrop accent on the first station-return open
  - stocked-bed left-brace payoff in nursery
  - full three-route brace pair plus tie in the later season-ready station state

## Verification

- `npx vitest run src/test/overlay-copy.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "opens the world-map field station, claims field credit, and buys trail stride|opens the nursery tab and starts one teaching-bed project from the field station|adds a season expedition page that becomes ready after the three live routes are logged"`
- `npm run build`
- shared web-game client smoke in `output/lane-1-main-263-client/`
- seeded browser proof:
  - `output/lane-1-main-263-browser/station-backdrop-routes.png`
  - `output/lane-1-main-263-browser/station-backdrop-nursery.png`
- Playwright console check at `http://127.0.0.1:4177` returned 0 errors
