# 2026-04-03 Beach Crest Spacing Fix Implementation

Implemented `ECO-20260403-main-207` against packet `087`, the lane-3 brief, and `docs/reports/2026-04-03-beach-spatial-extension-review.md`.

## What Landed

The fix stays inside the existing beach travel and traversal systems:

- `src/content/world-map.ts` moves the beach `mapReturnPost` from `x: 260` to `x: 228`
- `src/test/runtime-smoke.test.ts` now requires the dune-crest proof state to have `nearbyTravelTarget: null`
- `src/test/world-map.test.ts` now locks the beach `mapReturnPost` left of the `dune-crest-view` by more than the current travel interaction reach

This keeps the corridor door as the earlier left-side travel anchor while clearing the dune-crest reward perch so it reads as a small scenic rise again instead of a map-return pad.

## Guardrails Kept

- did not change beach world size, height, camera band, or traversal systems
- left the dune-crest, lee-pocket, and tidepool-approach platform families intact
- kept the beach map-return post safely separated from the corridor door
- did not touch corridor ownership, save behavior, or the broader world-map runtime

## Test And Proof Coverage

Updated `src/test/runtime-smoke.test.ts` so the dune-crest proof now fails if any travel target is still in range from the crest state.

Updated `src/test/world-map.test.ts` so the authored beach map-return post must stay left of the dune-crest reward family with more than the current interaction clearance.

## Verification

- `npm test -- --run src/test/world-map.test.ts src/test/runtime-smoke.test.ts -t "keeps the beach map-return post clear of the dune-crest reward family|lets the player climb the new dune crest without colliding with the inland beach door|uses an authored map-return post to open the map and return to the same interior anchor|uses the authored map-return post as the same-biome anchor when the map opens from the field menu"`
- `npm run build`
- required shared client pass in `output/main-207-client/`
- deterministic Playwright browser proof in `output/main-207-browser/`

The new browser proof captures the intended fixed crest state with no in-range travel target and no console errors:

- `dune-crest-fixed.png`
- `dune-crest-fixed.json`
- `errors.json`
