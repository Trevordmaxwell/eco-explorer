# 2026-04-03 Tundra Entry Expansion Handoff

Prepared for `ECO-20260402-scout-151` in lane 2.

## Scope Reviewed

- `docs/reports/2026-04-03-lane-2-front-half-and-parity-follow-ons.md`
- `.agents/packets/075-tundra-entry-expansion-phase.json`
- `src/content/biomes/tundra.ts`
- `src/assets/tundra-flora.ts`
- `src/assets/tundra-ambient.ts`
- `src/test/tundra-biome.test.ts`
- `src/test/content-quality.test.ts`
- `docs/science-source-ledger.md`
- `output/lane-2-main-140-browser/tundra-thaw-channel.png`
- `output/lane-2-main-140-browser/tundra-state.json`

## Read

- Tundra no longer needs a generic “more wet-edge content” pass. The recent `tussock-thaw-channel` and `cottongrass` work already made `thaw-skirt` and `meltwater-edge` the strongest authored part of the biome.
- The remaining density gap is on the exposed half: `wind-bluff`, `snow-meadow`, and the drier `frost-ridge` shoulder still read calmer than the richer inland and alpine biomes.
- The safest parity gain is a compact exposed-ground pack, not more berries or another thaw landmark. Tundra is missing one clear lichen carrier, one showy alpine cushion, one snow-edge bird, and one visible freeze-thaw landform.

## Recommendation

Treat `main-189` as one exact four-entry tundra pack:

1. `moss-campion`
2. `reindeer-lichen`
3. `white-tailed-ptarmigan`
4. `frost-heave-hummock`

This keeps the pass lane-2 scoped while spreading new discovery value back into the left half of the biome.

## Why This Pack Fits

- `moss-campion` gives tundra a collectible, bright, low cushion flower that reads differently from the existing thaw-edge blooms.
- `reindeer-lichen` adds the missing tundra lichen layer and deepens the category language the game already protects elsewhere.
- `white-tailed-ptarmigan` gives the snow-meadow and thaw-skirt one more living carrier that naturally belongs near snowfields, meadows, and alpine willows.
- `frost-heave-hummock` adds a second tundra landmark, but unlike `tussock-thaw-channel`, it teaches the dry freeze-thaw side of tundra ground.

## Exact Target For `main-189`

### `moss-campion`

- common name: `Moss Campion`
- scientific name: `Silene acaulis`
- category: `plant`
- collectible: `true`
- teaching angle: a tight pink cushion that stays low on exposed tundra

Placement:

- `wind-bluff`: one stable clump near the exposed left shoulder
- `frost-ridge`: one to two stable clumps near the ridge mats and rest ledges

### `reindeer-lichen`

- common name: `Reindeer Lichen`
- scientific name: `Cladina spp.`
- category: `lichen`
- collectible: `false`
- teaching angle: pale shrubby lichen that blankets open tundra and feeds large grazers

Placement:

- `wind-bluff`: add to a new low-count stable exposed-ground table
- `frost-ridge`: pair with the ridge mats so the drier right half looks more tundra-specific

Note:

- `Cladina spp.` is the safest source-aligned scientific label for this pass because the NPS lichen page groups reindeer lichens at the genus level.

### `white-tailed-ptarmigan`

- common name: `White-tailed Ptarmigan`
- scientific name: `Lagopus leucura`
- category: `animal`
- collectible: `false`
- teaching angle: alpine bird that uses rocky, snowy meadow edges and willow-adjacent cover

Placement:

- `snow-meadow`: one new low-count visit table
- `thaw-skirt`: optional second low-count visit table or mixed addition to the existing life table

Guardrail:

- Keep it snow-edge and meadow-adjacent. Do not spread it into the whole biome or turn it into a constant foreground bird.

### `frost-heave-hummock`

- common name: `Frost-Heave Hummock`
- category: `landmark`
- subtitle: `Freeze-thaw mound`
- subtitle label: `Ground clue`
- collectible: `false`
- teaching angle: frozen ground can shove tundra soil into small lumpy mounds

Placement:

- author one hummock in `wind-bluff`
- author one hummock in `frost-ridge`

This should be a compact inspectable mound, not a new platform or terrain system.

## Best Zone Balance

- `wind-bluff`: `moss-campion`, `reindeer-lichen`, `frost-heave-hummock`
- `snow-meadow`: `white-tailed-ptarmigan`
- `thaw-skirt`: `white-tailed-ptarmigan` only if it stays sparse
- `frost-ridge`: `moss-campion`, `reindeer-lichen`, `frost-heave-hummock`
- `meltwater-edge`: no new entry required in this pass

## What This Pass Should Avoid

- no new wet landmark beyond the existing `tussock-thaw-channel`
- no extra berry species
- no zone-boundary or platform edits
- no route-board, field-station, or notebook UI changes
- no `game.ts` or world-state changes

## Suggested File Targets

- `src/content/biomes/tundra.ts`
- `src/assets/tundra-flora.ts`
- `src/assets/tundra-ambient.ts`
- `src/test/tundra-biome.test.ts`
- `src/test/content-quality.test.ts`
- `docs/science-source-ledger.md`

## Suggested Verification

- `npm test -- --run src/test/tundra-biome.test.ts src/test/content-quality.test.ts`
- `npm run build`
- one seeded browser capture showing the left half of tundra with the new exposed-ground mix
- one state or browser proof showing the ptarmigan stays snow-edge and sparse

## Science Grounding

- `moss-campion`: [Wrangell-St. Elias wildflowers](https://www.nps.gov/wrst/learn/nature/wildflowers.htm)
- `reindeer-lichen`: [Bering Land Bridge lichens](https://www.nps.gov/bela/learn/nature/lichens.htm)
- `white-tailed-ptarmigan`: [Rocky Mountain ptarmigan](https://www.nps.gov/romo/learn/nature/ptarmigan.htm), [Glacier ptarmigan](https://www.nps.gov/thingstodo/white-tailed-ptarmigan.htm)
- `frost-heave-hummock`: [Denali permafrost landscapes](https://www.nps.gov/articles/denali-permafrost-landscapes.htm)

## Queue Outcome

- Close `ECO-20260402-scout-151`.
- Promote `ECO-20260402-main-189` to `READY`.
- Keep `ECO-20260402-critic-162` blocked until the tundra pack lands.
