# 2026-04-03 Beach Content Parity Implementation

Implemented for `ECO-20260402-main-183` in lane 2.

## Landed

- Promoted `dune-lupine` and `beach-strawberry` into `src/content/shared-entries.ts` so beach and coastal scrub now share one journal identity for both front-half carriers.
- Added `beach-hopper` to `src/content/biomes/beach.ts` as a new wrack-line animal with a small sprite in `src/assets/ambient.ts`.
- Deepened the beach front half with:
  - one new dry-sand lupine table
  - one new lee-pocket strawberry table
  - authored beach placements for lupine, strawberry, and beach hopper
  - beach-hopper added to wrack-side visit spawns
- Raised beach sketchbook coverage by adding notebook lines to `pacific-sand-crab` and `western-snowy-plover`, while the two promoted shared plants now carry their own sketchbook notes across both biomes.
- Extended the science guardrails and parity checks in:
  - `src/test/beach-biome.test.ts`
  - `src/test/coastal-scrub-biome.test.ts`
  - `src/test/biome.test.ts`
  - `src/test/corridor.test.ts`
  - `src/test/content-quality.test.ts`

## Result

Beach now reads more like a real front-half habitat instead of mostly a shell strip:

- the upper beach shows a stronger `dry-sand -> lee-pocket` shelter transition
- the lee pocket now has visible low runners and a bloom layer
- wrack now implies tiny scavenger life instead of only washed-up material

The implementation stayed lane-2 scoped. No progression, route-board, world-map, or `game.ts` changes were needed.

## Verification

- `npm test -- --run src/test/beach-biome.test.ts src/test/coastal-scrub-biome.test.ts src/test/biome.test.ts src/test/corridor.test.ts`
- `npm test -- --run src/test/content-quality.test.ts -t "front-half richness additions|compact source-strip budget|landmark metadata|short facts"`
- `npm test -- --run src/test/journal.test.ts`
- `npm run build`
- Web-game client check via the `develop-web-game` loop with clean output and no surfaced console errors:
  - `output/lane-2-main-183-browser/shot-0.png`
  - `output/lane-2-main-183-browser-lee-pocket/shot-0.png`
  - `output/lane-2-main-183-browser-lee-pocket/state-0.json`

## Notes For `critic-156`

- The most important review question is balance, not runtime safety: does beach now feel denser without reading like coastal-scrub moved left too early?
- The lee-pocket capture is the strongest proof artifact because it shows all three new carriers together: `dune-lupine`, `beach-strawberry`, and `beach-hopper`.
