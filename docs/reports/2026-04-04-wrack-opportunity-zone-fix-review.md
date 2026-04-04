# 2026-04-04 Wrack Opportunity Zone Fix Review

Review report for `ECO-20260404-critic-262`.

## Outcome

- No blocking findings. The zone-safe follow-up closes the live `Wrack Shelter` seam leak without making the route feel harder or more brittle.

## What Holds

- `src/engine/game.ts` now threads the inspected entity's zone through the only live runtime caller for notebook-fit preview and Route v2 inspect advancement.
- `src/engine/field-requests.ts` now treats zone-specific slots as a two-part check: the player must be in the required zone, and the inspected entity must also belong to that zone.
- The new coverage proves both sides of the seam:
  - a valid tide-line `beach-hopper` still completes `Wrack Shelter`
  - the seeded boundary case (`probe-2`, lee-pocket hopper at `x=385`) now stays at `2/3 stages`
- Notebook-ready and filed states remain canonically `Shore Shelter`, so the fix does not blur the route's authored identity.

## Watch Item

- Future non-runtime callers should keep passing the observed entity zone when they use Route v2 preview or inspect advancement directly. The current live path is covered, and the new tests make that expectation visible.

## Result

- Promote `ECO-20260404-scout-261`.
