# Home-Place Payoff And Session-Split Review

## Queue Ref

- `ECO-20260416-critic-303`

## Verdict

Clean review. No blocker.

## What Holds Up

- [field-station-session.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-station-session.ts) is the right split boundary: station-open normalization, arrival-mode derivation, and arrival-pulse math now live together instead of stretching `game.ts` farther.
- [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts) got smaller in the intended way. The remaining station-open code now reads like coordinator glue instead of owning station policy.
- The visible payoff stays inside the approved shell. [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts) reuses the existing brace family and arrival pulse rather than adding another station row or text beat.
- The new focused tests are proportionate to the change: station-session unit coverage, overlay-copy coverage, and one field-station runtime-smoke proof are enough to keep this seam honest.

## Watch Item

If lane 1 adds another station-return nuance later, prefer extending [field-station-session.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-station-session.ts) or the existing accent resolvers instead of recreating more one-off station-open logic in [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts).
