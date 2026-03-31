# 2026-03-30 Multi-Chamber Cave Continuation Handoff

## Method

- read `ECO-20260330-scout-69`, packet `033`, the lane-3 brief, and the fresh canopy review
- reviewed:
  - `docs/reports/2026-03-30-canopy-and-cavern-growth-phase.md`
  - `docs/reports/2026-03-30-deeper-cave-sub-ecosystem-handoff.md`
  - `docs/reports/2026-03-30-first-deeper-cave-chapter-review.md`
  - `docs/reports/2026-03-30-first-vertical-exploration-family-review.md`
  - `src/content/biomes/forest.ts`
  - `src/test/forest-biome.test.ts`
  - `src/test/runtime-smoke.test.ts`
- checked live artifacts:
  - `output/main-93-forest-visual/seep-pocket.png`
  - `output/main-93-forest-visual/state.json`
  - `output/main-93-forest-visual/errors.json`
- reused the current science trail already logged for the live forest cave carriers:
  - `banana-slug`
  - `ensatina`
  - `tree-lungwort`
  - `licorice-fern`
  - seep and root-shelter framing

## Current Constraint

The first deeper cave chapter now works because it is still one readable family:

- `root-hollow` reads as the upper lip
- `seep-pocket` reads as the damp lower bowl
- `filtered-return` reads as the brighter way back out

That means the next cave step should not spend its budget on:

- a wider tunnel under `log-run`
- a true loop
- a crossover beat into the tree lane
- a bigger in-game wayfinding layer

Those belong to later items in packet `033` and the future packet `038`.

The cave growth pass should stay inside the current under-root footprint and make the chapter feel like a small chamber family instead of a single bowl.

## Option Comparison

### Option 1. Turn the current cave footprint into a three-chamber under-root family

What it is:

- keep `forest.worldWidth` unchanged
- keep the current `root-hollow -> old-growth` surface route intact
- keep `root-hollow` as the upper lip and `filtered-return` as the brighter recovery shelf
- insert one new deeper stone chamber between the current seep bowl and the current return shelf
- let the current `seep-pocket` become the upper damp chamber instead of the deepest room

Pros:

- builds directly on the cave proof that already reads well at handheld scale
- avoids crowding the bridge, old-growth, and corridor side of the biome
- gives the cave family a real second chamber without opening maze logic
- keeps the return path understandable because the existing climb spine and brighter shelf still anchor the route

Tradeoffs:

- the current lower pocket is already close to the safe density limit, so the implementation may need to redistribute existing authored life instead of simply adding more
- likely needs a modest `worldHeight` bump or a careful camera check to keep the deepest chamber readable

Assessment:

- best option

### Option 2. Stretch the cave farther right under `log-run`

What it is:

- continue the cave laterally under the current surface re-entry instead of deepening the existing pocket

Pros:

- offers more horizontal room
- keeps the cave moving in the same overall world direction

Tradeoffs:

- muddies the current `Lower Hollow -> Trunk Climb -> Upper Run` readability
- starts spending the future cavern-loop budget too early
- pushes cave identity toward “longer tunnel” instead of “layered chamber family”

Assessment:

- reject for this step

### Option 3. Add a true lower loop or crossover route now

What it is:

- create a multi-exit cave loop or a stronger physical link toward the canopy/old-growth side

Pros:

- would make the lane feel bigger immediately

Tradeoffs:

- collides directly with later `scout-70`, `main-105`, `main-106`, and future packet `038`
- increases navigation burden before the lane has shipped its tiny wayfinding pass
- risks turning a cozy sub-ecosystem into a puzzle layout

Assessment:

- reject for now

## Recommendation

Use Option 1.

### Recommended chamber family

Treat `main-104` as a same-footprint cave deepening pass with three readable moods:

1. `root-hollow` remains the upper lip and entry shelter
2. `seep-pocket` becomes the first damp chamber, not the absolute bottom
3. add one new deepest `stone-basin` style chamber below or just beyond the current seep bowl
4. keep `filtered-return` as the brighter recovery shelf that lifts the player back toward the live route

This gives the cave family a real second authored chamber while preserving the current expedition readability above it.

## Geometry Guidance For `main-104`

The safest geometry is still centered inside the current cave footprint at roughly `x ≈ 336-432`.

Recommended shape:

- keep the current upper lip platforms and `root-hollow-fir-trunk` readable
- keep the current `root-hollow-cave-trunk` as the main visible recovery anchor if possible
- reframe the present `seep-pocket` as an approach chamber with a clearer step down into a new lower basin
- add one new lowest chamber centered around the current center-right cave mass, using stone and seep framing rather than a second open bowl
- keep one obvious brighter shelf or step-up handing back into `filtered-return`

Good route language:

- visible drop
- lower basin
- brighter recovery shelf
- one return spine

Strong smallest implementation:

- one new deepest chamber
- one reshaped entry bowl above it
- one forgiving return shelf
- no loop
- no new HUD support

## Content Guidance For `main-104`

The chamber should deepen through placement and moisture identity more than through brand-new taxonomy.

Best current carriers:

- `seep-stone`
- `root-curtain`
- `banana-slug`
- `ensatina`
- `tree-lungwort`
- `licorice-fern`

The safest content move is:

- keep the deepest chamber sparse
- use authored life mainly to show moisture gradients across the three chambers
- add at most one small landmark-style teaching anchor if the new basin needs a clearer identity

If a new entry is needed, prefer a landmark-style cave support cue over another new species.

## Science And Tone Guardrails

- Keep the space under-root, damp, and shelter-first rather than dramatic or dangerous.
- Do not introduce bat-cave, predator, darkness, or “lost underground” language.
- Do not spend the later wayfinding pass here; geometry should stay readable on its own first.
- Do not spend the later crossover beat here; keep the cave family internally coherent before reconnecting it to the canopy side.
- If the deeper chamber starts to feel crowded at `256x160`, thin existing life before adding more.

## Recommended Implementation Shape For `main-104`

- keep `forest.terrainRules.worldWidth` unchanged
- keep edits concentrated inside the current cave slice
- allow only a modest `worldHeight` increase if browser checks need more lower-room breathing space
- add one new cave-family zone or authored pocket rather than rewriting the whole route
- prefer `forest.ts`, focused forest/runtime tests, and tiny depth-feature adjustments over broader engine work
- leave wayfinding cues, loop logic, and crossover framing for the later queued items

## Likely File Targets For `main-104`

- `src/content/biomes/forest.ts`
- `src/test/forest-biome.test.ts`
- `src/test/runtime-smoke.test.ts`
- `src/engine/biome-scene-render.ts` only if one small additional stone-pocket or root-chamber backdrop is needed to make the new basin read clearly

## Verification Focus

- the cave now reads as a chamber family instead of one damp bowl
- the deepest room is memorable without becoming visually crowded
- the player can see how to recover without blind drops or precision jumps
- the expedition spine above the cave still reads cleanly
- the cave pass stays distinct from the old-growth pocket and bridge family

## Queue Outcome

`ECO-20260330-scout-69` can close.

`ECO-20260330-main-104` can move to `READY` as the next lane-3 implementation step.
