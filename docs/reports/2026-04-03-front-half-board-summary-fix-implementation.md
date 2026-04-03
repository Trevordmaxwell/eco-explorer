# 2026-04-03 Front-Half Board Summary Fix Implementation

Implemented `ECO-20260403-main-211`.

## Scope

- `src/engine/field-season-board.ts`
- `src/test/field-season-board.test.ts`

## What Changed

- Split the front-half forest-side board copy so the supporting summary and direction advance with the active subroute instead of freezing on `Hidden Hollow`.
- After `forest-hidden-hollow`, the board now points at `Moisture Holders`.
- After `forest-moisture-holders`, the board now points at `Forest Survey`.
- Added focused board assertions for both progression states so the supporting copy stays aligned with the active beat title.

## Verification

- `npx vitest run src/test/field-season-board.test.ts`
- `npm run build`

## Next Handoff

`ECO-20260403-critic-211` can now verify that the front-half chapter board stays truthful as the forest-study beat advances.
