# 2026-03-30 Vertical Runtime Split Handoff

## Method

- read queue item `ECO-20260330-scout-59` and packet `030`
- reviewed:
  - `docs/reports/2026-03-30-deep-caves-and-giant-trees-lane.md`
  - `src/engine/types.ts`
  - `src/engine/generation.ts`
  - `src/engine/game.ts`
  - `src/engine/biome-scene-render.ts`
  - `src/content/biomes/forest.ts`
  - `src/test/forest-biome.test.ts`
  - `src/test/runtime-smoke.test.ts`

## Current Runtime Ownership

The live vertical proof is real, but it is still narrow and heavily authored:

- `src/engine/types.ts` keeps traversal geometry to:
  - one sampled terrain surface
  - flat `Platform[]`
  - simple `Climbable[]` columns with `topExitY` and optional `canopySpriteId`
- `src/engine/generation.ts` validates and clones authored platforms and climbables; it does not build any deeper topology or vertical scene structure.
- `src/engine/game.ts` treats climbing as:
  - overlap a trunk
  - snap the player to trunk center
  - move only vertically
  - step off left or right to stop climbing
- `src/engine/biome-scene-render.ts` renders climbables as repeated trunk tiles plus one optional canopy cap.
- `src/content/biomes/forest.ts` proves the pattern with `root-hollow`, but it does so by stacking authored ledges and two trunk columns inside the normal `144`-high world.

That means the current system can support:

- one sheltered lower route
- one or two stacked ledges
- one short trunk climb

It cannot yet cleanly support:

- worlds taller than the screen
- a camera that follows vertical travel
- reusable cave or canopy chamber backdrops
- a giant-tree pocket or deeper cave chapter that feels meaningfully taller or deeper than `root-hollow`

## Hard Constraint

The biggest blocker is not the trunk data itself.

It is the camera.

The runtime currently follows only `cameraX`. There is no `cameraY`, and the live biome worlds are authored to fit inside the view. As long as that holds, a "giant tree" can only become a denser stack inside the same visible height, not a truly taller climb.

So the safest first split is:

1. add a vertical viewport seam
2. add one authored depth-feature seam for reusable chamber or canopy backdrops
3. keep traversal collision authored and surface-plus-platform based

## Option Comparison

### Option 1. Full cave-topology rewrite

What it would do:

- add ceilings, enclosed tunnel collision, and carved chambers as a new terrain model

Why not now:

- collides with current terrain sampling, render, collision, and readability assumptions
- opens a much larger engine rewrite than lane 3 needs
- makes the first giant-tree and cave chapter slower, riskier, and harder to review

Assessment:

- reject for this pass

### Option 2. Bigger authored platforms and trunks only

What it would do:

- keep the current runtime as-is and only add more ledges or taller climbable numbers

Why it is not enough:

- the camera still cannot reveal genuinely taller spaces
- cave or canopy depth still depends on one-off hardcoded shelter art
- the next chapters would still feel like "more root-hollow" instead of a new vertical family

Assessment:

- reject as too weak

### Option 3. Vertical camera plus authored depth features

What it would do:

- keep sampled ground and authored traversal
- add a `cameraY` follow/clamp seam so biome `worldHeight` can exceed the screen
- add one small authored backdrop feature layer for root chambers, stone pockets, or canopy shelves
- keep climbables, platforms, and authored entities as the real collision or discovery surfaces

Why it fits:

- matches the current engine's authored-first style
- is strong enough for both giant-tree and cave chapters
- avoids inventing procedural cave geometry
- keeps the future content pass mostly in biome data instead of another engine rewrite

Assessment:

- best option

## Recommendation For `main-91`

Treat the first runtime pass as a vertical-budget expansion, not as a cave engine.

### Recommended implementation shape

1. Add vertical camera support.

- Track `cameraY` beside `cameraX`.
- Clamp it to biome height when `worldHeight > viewportHeight`.
- Keep current biomes visually unchanged by resolving `cameraY = 0` when their height still fits.

2. Allow taller authored worlds.

- Keep `terrainRules.worldHeight` authoritative.
- Make render and scene math respect world-space `y` through `cameraY`.
- Do not change the core ground-sampling model.

3. Add one authored depth-feature seam.

- Add a small authored data type for background-only vertical features such as:
  - `root-chamber`
  - `stone-pocket`
  - `canopy-pocket`
  - `trunk-interior`
- These features should be visual framing only: backdrop, pocket, occluder, or wash.
- They should not replace platforms or climbables as the actual traversal surfaces.

4. Keep climbables incremental.

- Keep the current climb loop readable and mostly unchanged.
- If `Climbable` grows, keep it small and authored-first:
  - optional visual cap or shelf metadata is fine
  - a full branching ladder graph is not needed yet

### Smallest first pass

The smallest real `main-91` should land:

- `cameraY`
- taller biome-height support
- one generic authored depth-feature seam
- one light forest proof that shows the new seams work without trying to fully ship the later giant-tree or deeper-cave chapters yet

That is enough to make `main-92` and `main-93` practical.

## Likely File Targets For `main-91`

- `src/engine/types.ts`
- `src/engine/generation.ts`
- `src/engine/game.ts`
- `src/engine/biome-scene-render.ts`
- `src/content/biomes/forest.ts`
- `src/test/forest-biome.test.ts`
- `src/test/runtime-smoke.test.ts`

## Verification Focus

- current live biomes still read correctly when their worlds fit on screen
- a taller authored test slice can scroll vertically without losing the player
- climbables, platforms, and inspectables still line up under `cameraY`
- the new feature seam helps frame a chamber or canopy pocket without becoming a new collision system
- the pass stays readable at `256x160`

## Queue Outcome

`ECO-20260330-scout-59` can close.

`ECO-20260330-main-91` should be promoted to `READY` and interpreted narrowly as:

- a vertical viewport and authored-depth runtime pass
- not a procedural cave engine
- not the full giant-tree content chapter
- not the full deeper-cave content chapter
