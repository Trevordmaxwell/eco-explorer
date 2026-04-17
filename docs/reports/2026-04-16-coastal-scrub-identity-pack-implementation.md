# Coastal Scrub Identity Pack Implementation

## Queue Ref

- `ECO-20260416-main-300`

## What Landed

The Sprint 1 lane-2 pass stayed intentionally small and visual-first:

- [close-look.ts](/Users/trevormaxwell/Desktop/game/src/engine/close-look.ts) now adds two new Coastal Scrub specimen cards:
  - `beach-strawberry` for the swale pocket
  - `salmonberry` for the forest-edge transition
- [close-look.test.ts](/Users/trevormaxwell/Desktop/game/src/test/close-look.test.ts) now locks both cards into the close-look allowlist and checks their compact payloads directly.
- [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts) now opens both cards from real Coastal Scrub inspectables in one live swale-to-edge proof.

## Why This Helps

- Coastal Scrub now has a clearer remembered sequence instead of leaning on one bluff anchor alone:
  - bluff: `pacific-wax-myrtle`
  - swale: `beach-strawberry`
  - forest edge: `salmonberry`
- The pass strengthens biome feel through the existing visual-first close-look surface instead of adding denser notebook text, new note ids, or more comparison structure.
- The new cards stay inside lane-2 scope and reuse already-authored Pacific-coherent species that are live in the biome today.

## Test Coverage

Focused verification for this pass:

- [close-look.test.ts](/Users/trevormaxwell/Desktop/game/src/test/close-look.test.ts)
- the `close-look|beach-strawberry|salmonberry` slice in [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts)
- `npm run build`

Note:

- `npm test -- --run src/test/content-quality.test.ts` still trips an unrelated stale-worktree failure under `.claude/worktrees/angry-zhukovsky/` that expects `vine-maple` in a separate `close-look.ts`; the live repo lane-2 changes here do not add that entry.
