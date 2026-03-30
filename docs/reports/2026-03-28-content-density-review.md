# Content-Density Review

Date: 2026-03-28
Queue item: `ECO-20260328-critic-12`
Status: Complete

## Method

- reviewed:
  - `src/content/biomes/beach.ts`
  - `src/content/biomes/coastal-scrub.ts`
  - `src/content/biomes/forest.ts`
  - `src/content/biomes/treeline.ts`
  - `src/content/biomes/tundra.ts`
  - `src/content/shared-entries.ts`
  - `src/engine/overlay-render.ts`
  - `src/test/biome.test.ts`
  - `src/test/content-quality.test.ts`
  - `docs/science-source-ledger.md`
- ran:
  - `npm test -- --run`
  - `npm run build`

## Findings

### P2. Dense biome pages now outrun the journal list budget

Files:

- `src/engine/overlay-render.ts:606`
- `src/engine/overlay-render.ts:635`

What happens:

- the left journal list still uses one fixed static column
- once a biome has enough discovered entries, the renderer stops adding rows and falls back to `MORE...`
- only the visible rows get click hit targets, so later entries are no longer reachable by pointer
- keyboard selection can still move past the visible rows, but the current selection can disappear off-screen with no scrolling or windowing

Why it matters:

- `main-29` made the live five-biome world meaningfully denser
- that is good for the game, but it means late-beach, Coastal Scrub, and Treeline completion now push harder against the journal shell
- a discovery-heavy phase should not make the journal feel less usable right when the player has the most to review

Recommendation:

- keep the split-pane notebook layout
- add a tiny scrolling or windowing rule so the selected row stays visible
- preserve the calm category-header structure instead of solving this with a second dashboard surface

## What Looked Good

- I did not find a new science blocker in the density additions reviewed against the current source ledger.
- The added discoveries still read as habitat-specific rather than collapsing the five-biome chain into one generic nature mix.
- The expansion still feels like a measured second layer, not content spam.

## Queue Outcome

- close `ECO-20260328-critic-12`
- queue `ECO-20260328-main-36`
- queue `ECO-20260328-critic-15`
