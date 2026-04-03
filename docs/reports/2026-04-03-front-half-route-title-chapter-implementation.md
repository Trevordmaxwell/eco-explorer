# 2026-04-03 Front-Half Route-Title Chapter Implementation

Implemented `ECO-20260403-main-205`.

## Scope

- `src/engine/field-season-board.ts`
- `src/engine/guided-field-season.ts`
- `src/engine/game.ts`
- `src/test/field-season-board.test.ts`
- `src/test/guided-field-season.test.ts`
- `src/test/runtime-smoke.test.ts`

## What Changed

The front-half chapter now reuses the actual filed route titles instead of older generic labels.

- The season board now carries `Shore Shelter`, `Hidden Hollow`, `Moisture Holders`, and `Open To Shelter` through the front-half beats and summary lines.
- Fresh-save guided season flow now starts on `Sunny Beach` with `Shore Shelter`, then pivots to `Hidden Hollow` once the beach opener is filed.
- The forest follow-up and `Trail Stride` handoff now name `Moisture Holders` and `Open To Shelter` directly so the chapter reads like one coast-to-forest family.
- Starter-stage menu defaulting in `game.ts` now only favors `world-map` when the guided next biome differs from the current biome, so a fresh save no longer implies an inland map hop before the beach opener.

## Verification

- `npx vitest run src/test/field-season-board.test.ts src/test/guided-field-season.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "surfaces the first field-season guidance from starter note to next habitat pointer|Shore Shelter|Open To Shelter"`
- `npm run build`

## Next Handoff

`ECO-20260403-critic-178` can now review whether the stronger route-title chapter language improves place memory without making the station shell feel heavier.
