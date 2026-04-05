# 2026-04-05 Nursery Copy-Budget Implementation

Implemented `ECO-20260405-main-273` in lane 2.

## What Landed

- Added `stageSummaryByStage` to `NurseryProjectDefinition` in `src/engine/types.ts` so nursery authoring can separate inactive selection copy from active teaching-bed copy.
- Reauthored all six nursery project definitions in `src/engine/nursery.ts` around the approved beat split:
  - `summary` for ready-but-inactive selection
  - `stageSummaryByStage` for active `stocked`, `rooting`, `growing`, and `mature` body copy
  - `memorySummary` for the mature footer only
  - `rewardSummary` and `unlockSummary` kept as support or gating language, not bed-body fallback
- Updated the `TEACHING BED` render path in `src/engine/overlay-render.ts` so selected inactive beds show the project overview, active beds use the stage-specific beat, and mature beds keep the quieter footer seam instead of stacking reward copy into the same compact card.
- Extended coverage in `src/test/nursery.test.ts` and `src/test/content-quality.test.ts` so stage beats exist for every growth state and nursery copy stays inside the approved handheld budgets.

## Scope Kept Tight

- Did not widen the station shell, add a new nursery panel, or reopen route-board copy.
- Kept reward plumbing and unlock logic inside the existing nursery systems instead of inventing a new state model.
- Left the adjacent renderer-split work in lane 1 alone; this pass only changed the authored beat model and the copy that the selected bed surfaces.

## Verification

- `npm test -- --run src/test/nursery.test.ts src/test/content-quality.test.ts`
- `npm run build`
- `npm run validate:agents`
- Web-game client smoke in `output/lane-2-main-273-client/`
- Seeded browser proof in `output/lane-2-main-273-browser/`:
  - `ready-inactive-bed.png`
  - `stocked-bed.png`
  - `mature-bed.png`
  - `console-errors.json` stayed empty

## Outcome

The nursery now teaches one idea at a time. Ready beds introduce the plant, active beds describe the current growth state, and mature beds keep the quieter memory footer without reusing route-support reward copy as the main teaching sentence.
