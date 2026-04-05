# 2026-04-05 Nursery Layout Follow-On Scout

Reviewed `ECO-20260405-scout-272` against packet `112`.

## Decision

Do not create a new lane-1 layout handoff.

## Why No Follow-On Is Warranted

- The two highest-risk handheld proofs are now clean: active-growth plus route clue, and mature payoff plus clear-memory footer both fit at `256x160`.
- The dedicated `src/engine/field-station-nursery-page.ts` seam already solved the structural overlap problem the packet was created for.
- The next remaining pressure is live copy-role alignment, and lane 2 already owns that active follow-on in packet `113` through `ECO-20260405-main-279`.

## Recommendation

Park `ECO-20260405-main-272` and `ECO-20260405-critic-272` instead of forcing a speculative layout pass.

Only reopen a lane-1 nursery layout follow-on if one of these becomes true:

- a fresh `256x160` browser proof shows a new structural overlap after later nursery edits
- lane 2's live copy-role correction lands and reveals a still-distinct layout-only failure that cannot be solved inside the authored copy budget
