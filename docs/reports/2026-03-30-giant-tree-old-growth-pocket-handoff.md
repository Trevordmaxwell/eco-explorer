# 2026-03-30 Giant-Tree Old-Growth Pocket Handoff

## Method

- read queue item `ECO-20260330-scout-60` and packet `030`
- reviewed:
  - `docs/reports/2026-03-30-deep-caves-and-giant-trees-lane.md`
  - `docs/reports/2026-03-30-vertical-runtime-expansion-review.md`
  - `src/content/biomes/forest.ts`
  - `src/content/world-map.ts`
  - `src/assets/forest-flora.ts`
  - `src/engine/types.ts`
  - `docs/science-source-ledger.md`
- checked supporting science references for old-growth rainforest cues:
  - [Glacier Bay forests](https://www.nps.gov/glba/learn/nature/forests.htm)
  - [Olympic mosses and epiphytes](https://www.nps.gov/olym/learn/nature/mosses.htm)
  - [Glacier Bay nurse log](https://www.nps.gov/places/nurse-log-in-bartlett-cove.htm)
  - [Pileated woodpecker](https://www.nps.gov/bith/learn/nature/pileated-woodpecker.htm)
  - [Forest Service old-growth stand note](https://www.fs.usda.gov/pnw/pubs/pnw_gtr876.pdf)

## Current Constraint

`main-91` solved the real runtime blocker: lane 3 now has `cameraY`, taller biome heights, and visual depth features. The next risk is not engine capability. It is content placement.

The first giant-tree chapter needs to feel clearly different from `root-hollow` without:

- turning the current forest expedition into a side effect
- crowding the live `forest -> treeline` corridor door
- inventing a brand-new map node or special-biome pipeline
- drifting into California redwood tourism instead of the game's existing Pacific forest branch

So the safest next move is a forest-hosted old-growth pocket that uses scale cheats and old-growth clues, not a literal redwood biome swap.

## Option Comparison

### Option 1. Far-right forest old-growth extension

What it is:

- keep `trailhead -> creek-bend` intact
- extend the forest to the right with one new `old-growth-pocket`
- move the `forest -> treeline` corridor door farther right
- keep the ground path continuous while making the climb optional

Pros:

- protects the live `root-hollow` expedition and the current mid-forest proof
- gives lane 3 a clearly new chapter instead of reusing the hollow again
- lets the tree dominate one new pocket without turning the entire biome into a tower
- keeps the implementation mostly in forest content, one world-map anchor update, and focused tests

Tradeoffs:

- needs a moderate `worldWidth` increase
- needs corridor anchor and runtime-smoke updates for the moved right-side exit

Assessment:

- best option

### Option 2. Rebuild `log-run` or `creek-bend` into the giant-tree chapter

What it is:

- keep the current `640`-wide forest
- replace an existing right-half zone with the giant tree

Pros:

- avoids changing forest width or door anchors

Tradeoffs:

- crowds the existing expedition's `Upper Run`
- weakens the `creek-bend` note and route-support content already using that space
- makes the new giant-tree chapter feel like a remix of existing forest beats instead of a new vertical identity

Assessment:

- reject for v1

### Option 3. New standalone giant-tree biome or special travel scene

What it is:

- treat the old-growth pocket like a separate biome, map node, or one-off route scene

Pros:

- maximum room and cleanest fiction

Tradeoffs:

- too expensive for this phase
- would reopen world-map, save, progression, and travel scope when lane 3 only needs one forest-hosted proof

Assessment:

- reject for now

## Recommendation

Use Option 1.

### Recommended chapter shape

Host the first giant-tree chapter inside `forest` as a far-right old-growth extension.

Recommended structure:

1. keep the current lower forest route readable and intact through `creek-bend`
2. add one new `old-growth-pocket` zone beyond it
3. move the `forest -> treeline` corridor door to the far side of that pocket
4. keep the floor route continuous so corridor travel still works without climbing
5. make the climb optional and curiosity-driven:
   - one wide giant trunk
   - one mid bark shelf
   - one short upper snag or inner-trunk climb
   - one canopy pocket payoff

This gives `main-92` a real giant-tree chapter without making lane 3 solve a new travel system first.

## Science And Tone Guardrails

- Sell "redwood-like" through feel, not through literal redwood taxonomy.
  - Good cues: enormous conifer trunk, buttressed base, fibrous bark, hanging moss or lichen, epiphytes, nurse logs, broken snags, filtered canopy light.
  - Avoid: adding a named coast-redwood species just to justify the scale.
- Keep the old-growth pocket in the live Pacific forest branch.
  - `Glacier Bay` supports old-growth coastal forests with massive evergreen trees, lichens, mosses, and nurse logs.
  - `Olympic` supports moss-and-lichen substrate high on living trees and epiphytic growth above the ground.
- Bias the pocket toward damp bark, dead wood, and epiphyte life instead of young bright forest-floor growth.
  - The Forest Service old-growth note supports `licorice fern` on epiphyte-rich old-growth structure and keeps `red huckleberry` as a minor shrub in that setting.
  - `Pileated woodpecker` remains a strong dead-wood cue because its rectangular feeding holes and cavity use reinforce old-growth structure.
- Keep the climb forgiving and wonder-first.
  - no precision ladder graph
  - no blind falls
  - no combat or danger framing

## Best Existing Content Carriers

The safest first old-growth pocket can reuse mostly live forest teaching:

- `licorice-fern`
- `tree-lungwort`
- `pileated-woodpecker`
- `red-huckleberry`
- `sword-fern`
- `redwood-sorrel`

If `main-92` needs one extra grounded floor cue, `nurse-log` is the best candidate. It is already source-backed and live elsewhere in the chain, but the first implementation does not require it.

## Recommended Implementation Shape For `main-92`

Treat the first giant-tree chapter as a forest-content expansion, not another runtime rewrite.

Recommended scope:

- extend `forest.terrainRules.worldWidth` moderately
- raise `forest.terrainRules.worldHeight` enough to feel clearly taller than `root-hollow`
- add one new far-right zone such as `old-growth-pocket`
- move the forest right corridor door anchor in `src/content/world-map.ts`
- add authored platforms, climbables, depth features, and authored entity placements for the pocket
- use the existing `canopy-pocket` and `trunk-interior` depth-feature styles rather than inventing a new rendering system
- only add new sprites if the current `climb-trunk` / canopy visuals cannot sell the scale clearly enough

Strong smallest pass:

- one wide trunk climbable
- one short second climb or snag assist
- one canopy pocket payoff shelf
- no new request chain
- no new field-station logic
- no separate biome

## Likely File Targets For `main-92`

- `src/content/biomes/forest.ts`
- `src/content/world-map.ts`
- `src/assets/forest-flora.ts` only if one larger canopy or bark-support visual proves necessary
- `src/test/forest-biome.test.ts`
- `src/test/runtime-smoke.test.ts`
- `src/test/corridor.test.ts` if the forest right-door move changes the forest-to-treeline seam expectations

## Verification Focus

- the old-growth pocket reads as a new vertical chapter, not just `root-hollow` moved right
- the ground path still reaches the treeline corridor door without requiring the climb
- the climb is visibly taller than the current forest proof
- the old-growth cues stay science-safe and Pacific-branch friendly
- `root-hollow` expedition beats still work
- the new pocket remains readable at `256x160`

## Queue Outcome

`ECO-20260330-scout-60` can close.

`ECO-20260330-main-92` can move to `READY` now that both `ECO-20260330-critic-66` and this handoff are complete.
