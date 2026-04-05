# Nursery Utility Surfacing Implementation

## What Changed

The crowberry utility payoff now surfaces through the existing `COMPOST HEAP` notice instead of staying buried behind the teaching-bed card.

- `src/engine/game.ts` now lets the selected compost action prefer `nurseryState.utilityNote` when that authored utility line exists.
- The generic compost-rate notice still remains the fallback when the utility reward is not unlocked.
- `src/test/runtime-smoke.test.ts` now covers the unlocked crowberry path and confirms the compost notice uses the authored line on the live field-station flow.

## Result

- The nursery bed can stay focused on plant-state and reflection beats.
- The crowberry payoff now lands on a calmer home-loop seam the player can intentionally open.
- No new panel, badge row, or station-shell surface was added.

## Verification

- `npx vitest run src/test/runtime-smoke.test.ts -t "opens the nursery tab and starts one teaching-bed project from the field station|shows a mature teaching bed in the nursery and lets Enter clear it|prefers the authored crowberry utility line in the compost notice once unlocked"`
- `npm run build`
