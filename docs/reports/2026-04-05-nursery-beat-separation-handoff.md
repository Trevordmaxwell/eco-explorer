# Nursery Beat Separation Handoff

## Summary

The crowded nursery state is the active `TEACHING BED`, not the page shell.

Lane 4 should use the existing card-focus rhythm to separate beats before it moves any payoff into a calmer follow-on seam:

- the bed card should own plant stage and the bed-local reflection beat
- route-support payoff should stop competing with that beat while the bed is selected
- reward relocation can stay for `ECO-20260405-scout-278` / `main-278`

## Current Findings

- `selectedNurseryCardId` already gives the nursery a usable three-step interaction rhythm without adding another panel or page.
- `overlay-render.ts` currently lets the active bed stack stage, a progress or reward sentence, a memory line, and the `Route clue:` strip inside the same bed body.
- The most obvious collision happens when the player moves focus onto the bed after starting a project: the selected card is trying to explain the plant state and a route-facing payoff at the same time.
- Mature beds are the next collision point: `rewardSummary` and `memorySummary` both want to be the takeaway from the same card.

## Recommendation For `ECO-20260405-main-277`

Use a selection-aware bed-focus rule instead of a larger nursery rewrite.

### Target State

- active `TEACHING BED`
- especially when `selectedNurseryCardId === 'bed'`

### Recommended Behavior

- While the bed is selected and active, the bed should be the dominant beat.
- `stocked`, `rooting`, and `growing` should keep the stage plus growth-forward bed copy, but suppress the route-support strip for that focused moment.
- `mature` should keep the stage and the habitat-memory line as the bed-local reflection beat, and suppress the reward sentence on the bed itself.
- Non-bed selection states and no-active-bed states can stay unchanged for this pass so the reward is still available elsewhere for now.

## Implementation Shape

- Add one tiny pure helper for the selected-bed beat rule instead of spreading conditionals through the renderer.
- Keep the change local to nursery state and bed rendering.
- Do not widen the station shell, change the lane-1 nursery renderer split, or rewrite authored reward text in this pass.

## Suggested File Targets

- `src/engine/nursery.ts`
- `src/engine/overlay-render.ts`
- `src/test/nursery.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- Do not add a new dashboard, footer row, or planner seam.
- Do not move reward language into a different surface yet; reserve that for `ECO-20260405-main-278`.
- Do not turn the bed into a copy-only card; the visual home-place strip and compact stage read should stay intact.
