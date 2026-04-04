# 2026-04-03 Second-Act Route V2 Chapter Implementation

Implemented `ECO-20260403-main-216`.

## Scope

- `src/engine/field-season-board.ts`
- `src/engine/guided-field-season.ts`
- `src/test/field-season-board.test.ts`
- `src/test/guided-field-season.test.ts`
- `src/test/runtime-smoke.test.ts`

## What Changed

The inland second act now reads like one authored chapter spread instead of a generic post-coast extension.

- The treeline-to-tundra route board now carries the chapter titles `Stone Shelter`, `Thaw Window`, and `Tundra Survey` directly through its active and logged beats.
- Inland board summary and next-direction copy now hand off by chapter title:
  - `Stone Shelter starts at Treeline Pass.`
  - `Stone Shelter logged. Thaw Window opens in Tundra Reach.`
  - `Thaw Window logged. Tundra Survey closes the inland chapter in Tundra Reach.`
- Guided field-season flow no longer falls back to the generic post-coast `FIELD SEASON OPEN` note once `coastal-edge-moisture` is filed. Instead, the station note and prompt notice now point directly to `STONE SHELTER`, then `THAW WINDOW`, then `TUNDRA SURVEY`.
- Runtime coverage now checks that the field-station season note and route board stay aligned on both the treeline and tundra second-act states.

## Verification

- `npx vitest run src/test/field-season-board.test.ts src/test/guided-field-season.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "switches the route board to treeline and can hand the outing guide to route marker|switches the route board to tundra and can hand the outing guide to route marker|shows the thaw-window route replay note when re-entering tundra during the active process window"`
- `npm run build`

## Next Handoff

`ECO-20260403-critic-216` can now review whether the stronger `Stone Shelter -> Thaw Window -> Tundra Survey` framing improves second-act place memory without making the station shell feel heavier or disrupting the stable filed `Short Season` path.
