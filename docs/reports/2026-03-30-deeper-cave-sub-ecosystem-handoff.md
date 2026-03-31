# 2026-03-30 Deeper Cave Sub-Ecosystem Handoff

## Method

- read queue item `ECO-20260330-scout-61`, packet `030`, and the lane-3 brief
- reviewed:
  - `docs/reports/2026-03-30-deep-caves-and-giant-trees-lane.md`
  - `docs/reports/2026-03-30-vertical-runtime-expansion-review.md`
  - `docs/reports/2026-03-30-forest-expedition-beat-sheet-handoff.md`
  - `docs/reports/2026-03-29-forest-traversal-proof-handoff.md`
  - `docs/reports/2026-03-29-forest-traversal-proof-review.md`
  - `src/content/biomes/forest.ts`
  - `src/engine/biome-scene-render.ts`
  - `src/test/forest-biome.test.ts`
  - `src/test/runtime-smoke.test.ts`
  - existing browser artifacts in `output/main-91-root-hollow-browser/`, `output/web-game/caves-climb-v2/`, and `output/main-92-forest-visual/`
- reused the current source trail already logged in `docs/science-source-ledger.md` for:
  - `ensatina`
  - `banana-slug`
  - `tree-lungwort`
  - `licorice-fern`
  - nurse-log and old-growth moisture framing

## Current Constraint

`main-91` and `main-92` proved the lane-3 runtime is strong enough for:

- taller authored biome heights
- `cameraY` settling into deeper spaces
- authored climbables
- render-only depth framing through `root-chamber`, `stone-pocket`, `trunk-interior`, and `canopy-pocket`

The next cave step should not spend that budget on a new cave engine.

The current forest already has a good vertical family shape:

- `root-hollow` is the sheltered, damp lower lane
- the expedition shell already teaches `Lower Hollow -> Trunk Climb -> Upper Run`
- the new old-growth pocket now owns the far-right “big wonder” space

So the safest next move is not a wider forest or a darker standalone cave.

It is a deeper under-root chamber that hangs beneath the current `root-hollow` route and makes the cave feel like a layered sub-ecosystem instead of just a lowered lane.

## Option Comparison

### Option 1. Deepen `root-hollow` downward beneath the current lower lane

What it is:

- keep the live `trailhead -> old-growth-rise` forest chain intact
- keep the existing `Lower Hollow`, trunk climb, and `Upper Run` expedition route readable above
- add one deeper under-root chamber below the current `root-hollow` floor
- use one gentle drop or step-in, one damp stone or seep shelf, and one forgiving return

Pros:

- builds directly on the best existing cave proof instead of starting over
- stays far away from the new far-right old-growth pocket and moved treeline door
- keeps the cave identity distinct from the giant-tree identity: downward, dimmer, wetter, and stone-root mixed
- reuses the current runtime and renderer seams without needing ceiling collision or maze logic

Tradeoffs:

- likely needs one more modest `forest` height increase
- must avoid turning the current expedition route into a confusing two-level pile

Assessment:

- best option

### Option 2. Continue the cave rightward under `log-run`

What it is:

- stretch the cave chapter laterally under the current `log-run` re-entry
- make the deeper chamber more of a longer tunnel than a vertical drop

Pros:

- gives a little more room than the current `root-hollow` basin
- keeps the player moving in the same overall forest direction

Tradeoffs:

- muddies the current expedition structure, because `Upper Run` stops feeling like a clean re-entry
- risks crowding the mid-right forest that now has to hand off cleanly toward the old-growth pocket
- makes the cave chapter read like “more tunnel length” instead of a real layered chamber

Assessment:

- reject for v1

### Option 3. Standalone deep cave node or true dark-cave system

What it is:

- add a separate cave-like chapter or a more complete cave runtime with heavier darkness and enclosed space

Pros:

- maximum room and cleanest fiction

Tradeoffs:

- too expensive for this phase
- would reopen collision, rendering, onboarding, and likely progression scope
- drifts away from the project’s current calm, evidence-first forest exploration tone

Assessment:

- reject for now

## Recommendation

Use Option 1.

### Recommended chapter shape

Host the first deeper cave chapter inside the existing forest as a downward extension of `root-hollow`.

Recommended structure:

1. keep the current lower hollow route readable as the upper cave lip
2. add one deeper chamber mostly under the current `x ≈ 336-430` band
3. make the drop into the chamber gentle and visible, not a blind pit
4. split the lower space into two readable sub-areas:
   - one damp stone seep pocket
   - one root-shadow return shelf with a little more filtered light
5. return the player to the live route through one forgiving climb or step-up, not a precision platform chain

This gives `main-93` a real cave chapter while keeping the expedition shell and normal forest traversal legible.

## Science And Tone Guardrails

- Keep the chapter as an under-root, seep, and shelter space, not a heroic cavern.
- Favor moisture, bark, stone, and filtered light gradients over darkness or danger.
- Reuse already grounded forest carriers before inventing cave-specialist fauna.
- Do not add bats, predators, hazards, or “lost in the cave” framing in this first pass.
- Keep the chamber readable at `256x160`; if a room cannot be read quickly, it is too ambitious for this step.

## Best Existing Content Carriers

The safest first deeper chamber can stay mostly inside already-verified forest science:

- `ensatina`
- `banana-slug`
- `tree-lungwort`
- `licorice-fern`
- `redwood-sorrel` only near brighter upper lips, not as the deepest chamber anchor

If `main-93` needs one extra non-taxonomic support cue, the safest addition is a simple landmark-style seep or root-curtain inspectable rather than a new named species.

## Recommended Implementation Shape For `main-93`

Treat the deeper cave as a forest-content expansion plus one more authored vertical pocket, not another runtime rewrite.

Recommended scope:

- keep `forest.worldWidth` unchanged
- raise `forest.terrainRules.worldHeight` only as much as needed to sell one lower chamber clearly
- deepen the current `root-hollow` slice instead of touching the far-right old-growth chapter
- add one new deeper sub-zone below the current lower lane rather than replacing `root-hollow` entirely
- reuse `root-chamber` and `stone-pocket` depth features wherever possible
- use authored platforms and climbables to make the return leg readable
- avoid new station, route-board, expedition, or request logic in this pass

Strong smallest pass:

- one visible step-down into a deeper chamber
- one seep-side lower pocket
- one calmer return shelf with filtered light
- one short authored return climb
- one compact ecosystem note or authored observation carrier if needed

## Likely File Targets For `main-93`

- `src/content/biomes/forest.ts`
- `src/engine/biome-scene-render.ts` only if the current `root-chamber` / `stone-pocket` language needs one tiny refinement
- `src/test/forest-biome.test.ts`
- `src/test/runtime-smoke.test.ts`

## Verification Focus

- the deeper cave reads as a new sub-ecosystem, not just a lower duplicate of the hollow
- the current expedition legs remain understandable
- the player can always recover without a blind fall or precision jump
- the cave chapter stays visually distinct from the far-right old-growth pocket
- the chamber remains readable at the shipped handheld scale

## Queue Outcome

`ECO-20260330-scout-61` can close.

After `ECO-20260330-critic-67` reviews the old-growth pocket, `ECO-20260330-main-93` should implement:

- a forest-hosted deeper cave layer
- centered under the current `root-hollow` route
- built from seep, root, stone, and filtered-light identities
- without reopening station, route-board, or cave-engine scope
