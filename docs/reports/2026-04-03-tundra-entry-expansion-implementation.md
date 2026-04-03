# 2026-04-03 Tundra Entry Expansion Implementation

Implemented `ECO-20260402-main-189` in lane 2.

## What Landed

- Added four tundra-facing discovery entries across shared alpine content and the tundra biome:
  - `moss-campion`
  - `reindeer-lichen`
  - `white-tailed-ptarmigan`
  - `frost-heave-hummock`
- Promoted `moss-campion` and `reindeer-lichen` into `src/content/shared-entries.ts` and reused them from both `src/content/biomes/treeline.ts` and `src/content/biomes/tundra.ts` so the alpine pair keeps one shared journal identity instead of drifting into duplicate entries.
- Kept the new tundra-specific payoff on the exposed half of the biome by authoring one wind-bluff hummock and carrier cluster, one frost-ridge hummock and cushion cluster, and sparse ptarmigan presence around the snow-edge band.
- Added compact science-ledger support in `docs/science-source-ledger.md` plus focused data, journal, and runtime coverage so the pack stays source-backed and zone-readable.

## Final Pack Shape

- `moss-campion`
  - shared alpine plant entry
  - bright exposed-ground cushion used on `wind-bluff` and `frost-ridge`
- `reindeer-lichen`
  - shared alpine lichen entry
  - low-count exposed-ground carrier used on `wind-bluff` and `frost-ridge`
- `white-tailed-ptarmigan`
  - tundra-local animal entry
  - collectible tundra living carrier placed sparsely in `snow-meadow` and `thaw-skirt`
- `frost-heave-hummock`
  - tundra-local landmark entry
  - authored freeze-thaw mound used once on `wind-bluff` and once on `frost-ridge`

## Small Adjustment During Implementation

- The scout handoff initially suggested `moss-campion` as the new collectible.
- During implementation, that would have changed the shared treeline entry behavior too, so the collectible role moved to `white-tailed-ptarmigan` instead.
- This kept the new tundra pack distinct without changing existing treeline progression or journal expectations.

## Verification

- `npm test -- --run src/test/tundra-biome.test.ts src/test/biome.test.ts src/test/journal.test.ts src/test/content-quality.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "shows the new exposed tundra anchors near the wind-bluff start|turns the tundra thaw-skirt route into one fuller inland relief and snow-edge family"`
- `npm test -- --run src/test/treeline-biome.test.ts`
- `npm run build`
- required `develop-web-game` shared client pass in `output/lane-2-main-189-client/`
- seeded browser proof in `output/lane-2-main-189-browser/`:
  - `tundra-wind-bluff.png`
  - `tundra-wind-bluff-state.json`
  - `tundra-snow-edge-ptarmigan.png`
  - `tundra-snow-edge-ptarmigan-state.json`
  - `console-errors.json`

## Browser Read

- The wind-bluff proof lands in `zoneId: "wind-bluff"` with `frost-heave-hummock` and a new exposed-ground carrier visible near the left-half start, so tundra no longer opens as the thinnest live biome face.
- The snow-edge proof lands in `zoneId: "snow-meadow"` with `white-tailed-ptarmigan` staying in the intended snowy meadow band alongside the new alpine carriers instead of spreading across the full biome.
- `console-errors.json` is empty.

## Queue Outcome

- Close `ECO-20260402-main-189`.
- Promote `ECO-20260402-critic-162` to `READY`.
