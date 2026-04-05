# Nursery Utility Surfacing Handoff

## Summary

The next payoff seam should target the nursery utility reward, not the route-support line.

After the selected-bed split, the cleanest place to surface one payoff outside the crowded `TEACHING BED` is the existing `COMPOST HEAP` notice path:

- `utilityNote` already exists in `src/engine/nursery.ts`
- the compost card already has an `Enter` action in `src/engine/game.ts`
- this avoids the propagation bench ambiguity between the active bed and the currently selected project

## Findings

- The bed-focus pass works because it lets the selected bed own one moment instead of sharing it with a second clue band.
- A bench-based reward seam is riskier for the next pass because the bench can cycle to a different project while another bed is already active.
- `utilityNote` is already authored and runtime-ready, but the live compost action still shows only the generic compost-rate sentence.
- Surfacing the utility reward through the compost notice stays outside the crowded bed card, uses an existing seam, and does not add another row or panel.

## Recommendation For `ECO-20260405-main-278`

Use the selected compost notice as the first reward-surfacing follow-on.

### Target

- selected `COMPOST HEAP`
- only when `nursery.utilityNote` exists

### Behavior

- Keep the existing `COMPOST HEAP` title and action path.
- When `utilityNote` exists, the notice body should prefer that authored utility line instead of the generic `finish X litter each route step` sentence.
- When no utility reward is unlocked, keep the current compost-rate fallback unchanged.

## Why This Seam Wins

- It reuses a calm existing action instead of adding another visible card row.
- It is semantically correct for the crowberry utility payoff.
- It keeps the selected-bed split intact instead of leaking more text back into the bed.
- It is smaller and less ambiguous than trying to make the bench speak for whichever project is active.

## Suggested File Targets

- `src/engine/game.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- Do not add a new footer, badge row, or extra station panel.
- Do not move the route-support strip onto the bench in this pass.
- Do not rewrite the compost card layout; use the existing notice seam first.
