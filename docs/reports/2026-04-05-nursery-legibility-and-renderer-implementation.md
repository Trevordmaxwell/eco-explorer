# 2026-04-05 Nursery Legibility And Renderer Implementation

Implemented `ECO-20260405-main-271` against packet `112`.

## What Changed

Extracted the inline `NURSERY` page body out of `src/engine/overlay-render.ts` and into the new sibling helper `src/engine/field-station-nursery-page.ts`.

The new helper keeps `drawFieldStationOverlay(...)` responsible for:

- station shell framing
- tabs and page switching
- backdrop and arrival accent passes

The nursery helper now owns the page-body layout families and render bands for:

- locked and ready-to-plant bed states
- active-growth states with route-support clues
- mature payoff states with reward plus clear-memory footer text

The structural fix was to stop anchoring those lower nursery lines to fixed offsets inside the smallest bed card. Dense nursery states now use a slightly taller teaching-bed card plus explicit detail splits so the title row, growth or reward summary, route clue or clear-memory footer, and the home-place strip no longer paint into the same band.

## Verification

- `npx vitest run src/test/field-station-nursery-page.test.ts src/test/overlay-copy.test.ts`
- shared web-game client smoke in `output/lane-1-main-271-client/`
- seeded handheld browser proof in `output/lane-1-main-271-browser/active-growth-nursery.png`
- seeded handheld browser proof in `output/lane-1-main-271-browser/mature-nursery.png`
- `output/lane-1-main-271-browser/console-errors.json` is empty

## Known Shared-Tree Blockers

- `npx vitest run src/test/runtime-smoke.test.ts -t "opens the nursery tab and starts one teaching-bed project from the field station|shows a mature teaching bed in the nursery and lets Enter clear it|adds a season expedition page that becomes ready after the three live routes are logged"` currently fails during module load on an unrelated authored-platform expectation in the shared `runtime-smoke` file.
- `npm run build` is currently blocked by unrelated type errors in that same shared `src/test/runtime-smoke.test.ts` file.
