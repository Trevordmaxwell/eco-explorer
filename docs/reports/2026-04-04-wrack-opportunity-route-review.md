# 2026-04-04 Wrack Opportunity Route Review

Review report for `ECO-20260404-critic-260`.

## Findings

### Blocking: boundary lee-pocket hoppers can satisfy the tide-line stage

- `src/engine/field-requests.ts` widens `wrack-line` acceptance by `entryId`, but the runtime still advances the route using only the player's `currentZoneId` plus the inspected `entryId`.
- `src/engine/game.ts` currently passes only `entry.id` into both the hand-lens preview and the route-advance path, so the route never checks which zone the inspected entity actually came from.
- Beach generation makes this reachable. `lee-pocket-life` may place `beach-hopper` as far right as `x=394`, while `tide-line` begins at `x=400` and inspect range is `22`. A player who has just crossed into `tide-line` can still inspect that lee-pocket hopper and incorrectly satisfy `wrack-line`.
- Repro probe: seed `probe-1`, beach visit `2`, active `wrack-hold`, generated entity `lee-pocket-life-0-beach-hopper-380`.

## Recommendation

- Thread the inspected entity's zone into both the hand-lens notebook-fit preview and Route v2 advancement.
- Require both the player zone and the inspected entity zone to match the required slot zone before `wrack-line` can advance.
- Add a regression where the player stands in `tide-line` but inspects a lee-pocket `beach-hopper`, confirming that the route stays on `2/3 stages`.

## Outcome

- Keep `ECO-20260404-scout-261` blocked until the zone-safe follow-up lands and is reviewed cleanly.
