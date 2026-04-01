# 2026-03-31 Giant-Tree Destination Continuation Handoff

Prepared `ECO-20260331-scout-88` for packet `042` after re-checking the current `forest` old-growth geometry, the existing canopy smoke coverage, and a fresh seeded browser pass on the live top route.

## Current Read

The old-growth side is now coherent and recoverable:

- `old-growth-main-trunk` gets the player into the giant tree cleanly
- `old-growth-upper-snag` and `old-growth-canopy-rung` make the upper route readable
- `old-growth-inner-bark-snag` keeps the bark-window side recoverable

What it still lacks is one clear destination. The current top route resolves mainly into `old-growth-rise`, the treeline corridor lip, and a few nice inspectables. In the live browser proof at `output/scout-88-giant-tree/current-top-route.png`, the player reaches the highest readable route and the strongest feeling is still "I found the biome exit," not "I arrived at the giant tree's special place."

## Recommendation

Spend `main-126` on one crown-rest destination above and slightly left of the current high old-growth perch, not on another generic rightward ledge.

### The target shape

- Keep the existing `old-growth-main-trunk -> old-growth-upper-snag -> old-growth-high-perch` spine.
- Add one short final climbable from the current high-perch zone into a new crown-rest shelf tucked into the upper-left side of `old-growth-canopy-pocket`.
- Treat that crown rest as the destination. It should feel like the player climbed into the protected top of the giant tree, not just one more platform in a staircase.

### Why this specific location

- The right side already has a job: it frames the treeline corridor and the rise out of forest.
- The left side of the upper canopy still has emotional budget. It is visually inside the giant-tree silhouette and can feel sheltered, high, and separate from travel flow.
- Reaching the new shelf from the current high perch keeps the route compact and recoverable. It builds on the existing climb the player already understands instead of asking them to learn a new branch language.

## Implementation Notes For `main-126`

### Geometry

- Prefer one new compact destination shelf such as `old-growth-crown-rest`.
- Prefer one short new climbable such as `old-growth-crown-snag` instead of a longer multi-part rung chain.
- It is acceptable to nudge `old-growth-canopy-pocket` upward or leftward a little so the crown rest feels visually enclosed by the tree.
- Do not widen the corridor lip or turn the destination into a second route across the whole top edge.

### Recovery and fairness

- The crown rest should not be leap-only.
- A missed step should still resolve onto an existing upper shelf or the current high-perch band, not dump the player all the way back to the lower forest floor.
- Keep `old-growth-inner-bark-snag` readable as the return/downward seam.
- Reuse the existing canopy-opening cue language only if one tiny support is needed; do not add labels or a new HUD marker family.

### Place feel

- The destination should feel quieter and more sheltered than the corridor lip.
- If one authored anchor is needed to sell the place, reuse an existing old-growth language item such as `tree-lungwort`, `licorice-fern`, or one woodpecker-related anchor rather than opening a new content pack.
- The result should read like "the top of the giant tree" rather than "another bark-window nook."

## Suggested Acceptance For `main-126`

- the player can climb from the current old-growth route into one distinct crown-rest destination
- the destination reads as separate from the treeline corridor lip
- the way back down is readable and recoverable without a harsher drop
- the pass stays inside one new shelf / one short climbable scale

## Test Suggestions

- extend `runtime-smoke` from the existing old-growth route to:
  - reach the new crown-rest destination
  - confirm at least one existing upper return seam stays catchable on the way back down
- add or update a focused `forest-biome` assertion if the new shelf or climbable needs a structural guard
- re-run a seeded browser pass at the new destination and compare it against `output/scout-88-giant-tree/current-top-route.png`

## Queue Guidance

- Close `ECO-20260331-scout-88`.
- Promote `ECO-20260331-main-126` to `READY`.
- Update `ECO-20260331-main-126` and `ECO-20260331-critic-99` to use this handoff as their source report.
