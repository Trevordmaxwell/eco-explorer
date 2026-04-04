# 2026-04-03 Field Station State Split Implementation

Implemented `ECO-20260403-main-226` against packet `096`.

## What Changed

Kept the first controller split inside the pure field-station state assembly seam.

- Added `src/engine/field-station-state.ts`, which now resolves the composed field-station view payload from the biome registry, save, and current UI selection snapshot.
- Trimmed `src/engine/game.ts` so `getFieldStationState()` only keeps the nursery sync side-effect boundary, then delegates the season, atlas, archive, expedition, subtitle, support, upgrade, and nursery view assembly to the new helper.
- Left station input handling, activation logic, and notice flow in `src/engine/game.ts` unchanged for this first pass.

## Why This Shape

This extracts real coordinator weight without crossing the higher-risk side effects. The station still behaves exactly the same, but the big state-composition seam is now explicit and ready for future lane-1 chapter work.

## Verification

- `npx vitest run src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "opens the world-map field station, claims field credit, and buys trail stride|opens the nursery tab and starts one teaching-bed project from the field station|surfaces the season capstone, then opens the next field season on the routes shell"`
- `npm run build`
