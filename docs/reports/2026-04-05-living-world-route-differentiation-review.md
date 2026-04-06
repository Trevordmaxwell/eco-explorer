# Living-World Route Differentiation Review

Reviewed `ECO-20260405-critic-289` against packet `119`, the lane-4 brief, the critic brief, the scout handoff, and the landed implementation.

## Finding

### Blocking: the live support difference is still too weak

The route now truthfully accepts `woolly-lousewort` during active `thaw-fringe`, but the shipped proof does not yet satisfy the packet's stronger lane-4 goal that support choice should materially change how the player finds the clue in live play.

Why this blocks the wave:

- The packet and queue both frame this pass as a felt route-differentiation proof, not only a broader acceptance rule.
- The implementation report itself notes that the original `hand-lens` preference hypothesis did not hold in the live thaw-skirt shelf.
- The current runtime proof succeeds by directly inspecting `woolly-lousewort`, which proves route acceptance but not the intended player-facing support difference.

Concretely, the route is now more permissive, but the normal `hand-lens` discovery path is not yet clearly more tactile or different than before. That leaves the first proof short of the packet's reason for existing.

## Recommended Follow-On

Keep the same route, same slot, and same live window, but spend one more compact pass making the alternate carrier player-felt:

- prefer the active process-only alternate carrier in the existing hand-lens targeting seam when multiple valid clues compete for the same next slot
- keep the preference scoped to the current active slot and current live process window instead of inventing a broader targeting system
- add one focused runtime proof that `hand-lens` now truly changes which clue gets inspected in the thaw-skirt shelf, alongside a non-`hand-lens` comparison

## Verdict

`ECO-20260405-main-289` is directionally good but not yet a clean lane-4 close. A narrow follow-on implementation should land before packet `119` moves on to the second proof wave.
