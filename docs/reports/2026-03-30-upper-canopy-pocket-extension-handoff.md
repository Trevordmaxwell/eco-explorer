# 2026-03-30 Upper-Canopy Pocket Extension Handoff

## Method

- read `ECO-20260330-scout-68`, packet `033`, the lane-3 brief, and the fresh family review
- reviewed:
  - `docs/reports/2026-03-30-canopy-and-cavern-growth-phase.md`
  - `docs/reports/2026-03-30-giant-tree-old-growth-pocket-handoff.md`
  - `docs/reports/2026-03-30-first-giant-tree-old-growth-pocket-review.md`
  - `docs/reports/2026-03-30-first-vertical-exploration-family-review.md`
  - `src/content/biomes/forest.ts`
  - `src/test/forest-biome.test.ts`
  - `src/test/runtime-smoke.test.ts`
- checked current visual references:
  - `output/main-92-forest-visual/old-growth-pocket.png`
  - `output/main-94-bridge-visual/bridge.png`
  - `output/scout-68-canopy-scout/upper-canopy.png`
- reused the existing source trail already logged for old-growth Pacific forest cues:
  - old-growth stand structure
  - epiphyte-rich bark
  - `licorice-fern`
  - `tree-lungwort`
  - `pileated-woodpecker`

## Current Constraint

The giant-tree chapter now works, but the current upper route still ends as a short right-edge finish:

- `old-growth-main-trunk` gets the player to the bark shelf
- `old-growth-upper-snag` and `old-growth-canopy-ledge` provide one compact top payoff
- the existing `old-growth-canopy-pocket` depth feature leaves a noticeable amount of unused sheltered space above and slightly left of that finish

So the next canopy step should not grow farther right or widen the biome again.

It should turn the already-authored canopy pocket into a richer destination while keeping the main trunk as the obvious recovery spine.

## Option Comparison

### Option 1. Fill the existing canopy pocket above and left of the current top route

What it is:

- keep the current `forest` width and door framing
- keep the current lower old-growth floor and bridge untouched
- add one new inner-canopy continuation inside the existing `old-growth-canopy-pocket`
- let the route bend back inward above the trunk instead of climbing farther toward the right edge

Pros:

- uses already-authored empty volume rather than demanding another world-shape rewrite
- keeps the main trunk visible as the return path
- reads as a sheltered upper pocket instead of a harsher platform tower
- protects the right-edge corridor framing from crowding

Tradeoffs:

- may need one modest feature resize or a tiny height bump if the new perch feels cramped in browser checks

Assessment:

- best option

### Option 2. Push the current top route farther right above `old-growth-rise`

What it is:

- extend the canopy route beyond the current `old-growth-canopy-ledge`
- lean into the far-right edge as the next height beat

Pros:

- straightforward continuation of the current ledge logic

Tradeoffs:

- crowds the corridor-facing side of the biome
- starts to read like a tower at the map-facing edge instead of a sheltered canopy world
- makes recovery feel less obvious because the trunk spine drops behind the player

Assessment:

- reject for this step

### Option 3. Add a dense lattice of branch steps across the whole old-growth pocket

What it is:

- spread several small branch shelves from left to right through the current canopy volume
- make the upper pocket more fully traversable in one pass

Pros:

- maximum room for future growth

Tradeoffs:

- too many small platforms will push the tree toward precision-platform language
- risks making the current forgiving chapter suddenly feel busy and gamey
- overbuilds before lane 3 has added its tiny wayfinding pass

Assessment:

- reject for now

## Recommendation

Use Option 1.

### Recommended chapter shape

Treat `main-103` as an inward-and-upward canopy continuation, not a taller edge tower.

Recommended structure:

1. keep the current ground route, bridge, and bark-shelf climb intact
2. keep the current `old-growth-upper-snag` as the approach to the upper world
3. add one inner-bark rest just left of the current top line
4. add one higher sheltered perch inside the existing canopy pocket
5. make the main trunk remain visible as the recovery spine from every new upper perch

This should make the top of the giant tree feel like a real pocket with one more discovery beat, not just a short ledge and stop.

## Geometry Guidance For `main-103`

The current content suggests the safest extension is:

- one new authored support around the upper-left side of `old-growth-trunk-interior`
- one new perch inside the current `old-growth-canopy-pocket`, above the bark shelf but not far beyond the current top camera envelope
- one short assist climbable or snag rung so the player does not need a blind jump from the current upper route

Good target language:

- inward
- sheltered
- visible return
- one more height beat, not a second tower

## Science And Tone Guardrails

- stay with the existing Pacific old-growth carrier set before adding new species
- prefer bark life, filtered light, and snag shelter over flashy canopy spectacle
- do not turn the upper canopy into a bird-only or exposed-sky scene
- keep recovery obvious and forgiving

The strongest current carriers are still:

- `licorice-fern`
- `tree-lungwort`
- `pileated-woodpecker`
- `red-huckleberry`

If `main-103` needs one more authored teaching beat, it should probably be one compact old-growth canopy note built from those existing entries rather than a brand-new taxonomic addition.

## Recommended Implementation Shape For `main-103`

- keep `forest.terrainRules.worldWidth` unchanged
- avoid touching the cave, bridge, corridor door, or route-board logic
- reuse `old-growth-trunk-interior` and `old-growth-canopy-pocket` rather than inventing a new depth-feature style
- add one new upper support and one new upper perch
- add only one short new climb assist if the current snag cannot hand the player into the new perch cleanly
- browser-check the top route at handheld scale before locking the geometry

Strong smallest pass:

- one inward canopy continuation
- one higher rest perch
- one readable return
- zero new systems

## Likely File Targets For `main-103`

- `src/content/biomes/forest.ts`
- `src/test/forest-biome.test.ts`
- `src/test/runtime-smoke.test.ts`
- `src/engine/biome-scene-render.ts` only if one tiny canopy-depth resize is needed to keep the new pocket readable

## Verification Focus

- the canopy extension reads as a real second upper beat instead of a harder version of the existing finish
- the player can see how to get back down
- the route stays friendly at `256x160`
- the right-edge corridor framing still has breathing room
- the new upper pocket feels sheltered and old-growth-specific, not like a generic platform tower

## Queue Outcome

`ECO-20260330-scout-68` can close.

`ECO-20260330-main-103` can move to `READY` as the next lane-3 implementation step.
