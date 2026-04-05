# 2026-04-04 Held-Sand Open-Pioneer Handoff

Prepared for `ECO-20260404-main-270`.

## Recommendation

Use `scrub-edge-pattern` as the second tactile route-opportunity proof.

During the active `Held Sand` replay window, let `beach-grass` also satisfy the opening `open-pioneer` stage in `back-dune`.

## Why This Route

- It is a different route family from the beach `Wrack Shelter` proof, so the living-world opportunity system stops reading like a one-off beach trick.
- The active process moment already supports the change truthfully:
  - `scrub-edge-pattern` becomes `Held Sand` during `sand-capture`
  - coastal scrub `sand-capture` already features `beach-grass`, `dune-lupine`, and `pacific-wax-myrtle`
  - the first route stage already lives in `back-dune`, where `beach-grass` and `dune-lupine` both appear
- The seam is tactile instead of copy-only: the player can really satisfy the first route beat on a different live clue during the replay window.

## Recommended Shape

- Add `activeSlotEntryIdsBySlotId.open-pioneer = ['beach-grass']` to the `scrub-edge-pattern` `processFocus`.
- Leave notebook-ready and filed identity canonically `Scrub Pattern`.
- Do not change the later `holding-cover` or `thicker-edge` stages.
- Keep the support-row and station-board copy unchanged except for the already-live `Held Sand` framing.

## Suggested Verification

- Field-request coverage proving `Held Sand` makes `beach-grass` a valid `open-pioneer` clue while the replay window is active.
- Runtime coverage proving a live coastal-scrub outing can start on `beach-grass` during `Held Sand`, while non-replay `Scrub Pattern` still requires `dune-lupine`.

## Rejected Alternatives

- `tundra-short-season`: `thaw-fringe` truthfully surfaces `arctic-willow`, but that clue is not already part of the route's clean three-stage notebook shape and would need more explanation to stay legible than the scrub seam does.
- `forest-cool-edge`: `moisture-hold` already reinforces the same clue family as `Moist Edge`, so it is weaker as a second proof of changed route opportunity.
