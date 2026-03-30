# 2026-03-29 Forest Traversal Proof Handoff

## Method

- read queue item `ECO-20260329-scout-32` and packet `021`
- reviewed:
  - `docs/reports/2026-03-29-functional-gameplay-sequence.md`
  - `docs/reports/2026-03-29-functional-gameplay-loop-handoff.md`
  - `src/content/biomes/forest.ts`
  - `src/content/world-map.ts`
  - `src/engine/generation.ts`
  - `src/engine/biome-scene-render.ts`
  - `src/engine/game.ts`
  - `src/engine/types.ts`
  - `src/assets/tiles.ts`
  - `src/assets/forest-flora.ts`

## Current Constraint

The live forest is the right biome for the first traversal proof, but the runtime still represents terrain as:

- one sampled ground surface
- simple platforms
- lightweight biome decor and doors

That means the safest first "cave" is not a true carved-overhang cave system.

It should be a sheltered forest detour:

- root-hollow
- log-underpass
- shallow creek-bank cut

Those shapes preserve the current renderer and collision model much better than a brand-new cave topology system.

## Pattern Comparison

### Option 1. Late `fern-hollow` into `log-run` root-hollow loop

What it is:

- keep `trailhead` readable as the flat onboarding zone
- start the proof in late `fern-hollow`
- add one clearer upper log route across the hollow
- drop into a short sheltered lower lane under a root arch or hollow log
- rejoin in early or mid `log-run`

Pros:

- uses the forest's strongest existing shelter language
- keeps the proof away from the left start area
- avoids crowding the live forest map-return post around `x ≈ 236`
- rejoins well before the right-side corridor door at `x ≈ 608`
- supports a clear "go down, notice something, come back up" shape

Tradeoffs:

- likely needs one authored shelter sprite or local terrain feature rule

Assessment:

- best option

### Option 2. `creek-bend` ravine or right-edge cave

What it is:

- place the first deeper route near the far-right creek zone

Pros:

- creek terrain already feels like a lower space
- water-adjacent life fits a damp detour

Tradeoffs:

- too close to the current corridor exit flow
- risks crowding the far-right travel identity
- makes the first proof compete with travel instead of exploration

Assessment:

- reject for v1

### Option 3. Early `trailhead` canopy staircase

What it is:

- build the proof as a taller upper-platform chain near the biome start

Pros:

- simple to stage with current platform rules

Tradeoffs:

- turns the onboarding stretch into a challenge gate
- does not deliver the desired "short hidden lower route" feeling
- drifts closer to platform-game energy than sheltered exploration

Assessment:

- reject for v1

## Recommendation

Use Option 1.

Recommended proof zone:

- start around late `fern-hollow` after the map-return post
- center the lower-route proof roughly in the `x ≈ 280-430` band
- rejoin before `creek-bend` becomes the active travel/exit area

Recommended traversal shape:

1. Keep the main surface route intact and readable.
2. Add one slightly clearer upper log chain above the hollow.
3. Add one optional lower route entered by a gentle drop, not a blind fall.
4. Use a root arch, hollow log, or shallow bank to make the lower lane feel sheltered.
5. Bring the player back up into `log-run` with a forgiving step-up, not a precision jump.

## Science And Tone Guardrails

- Keep the proof forest-like and sheltered, not rocky or dungeon-like.
- Use the lower route to reinforce moisture, decomposition, and cover:
  - `banana-slug`
  - `sword-fern`
  - `redwood-sorrel`
- Do not put danger, enemies, timers, or punishing misses in the detour.
- The detour should reward curiosity with a better observation spot, one compact collectible placement, or a request clue, not currency.

## Implementation Guidance For `main-51`

Preferred implementation shape:

- treat this as one authored forest-only traversal feature, not a generic cave engine
- if a new visual is needed, add one simple shelter sprite such as a root arch or hollow log
- keep collision rules close to the current surface-plus-platform model

Likely file targets:

- `src/content/biomes/forest.ts`
- `src/engine/types.ts`
- `src/engine/generation.ts`
- `src/engine/biome-scene-render.ts`
- `src/engine/game.ts`
- `src/assets/tiles.ts`
- `src/assets/forest-flora.ts`
- `src/test/forest-biome.test.ts`
- `src/test/runtime-smoke.test.ts`

Suggested verification focus:

- the lower route stays optional and readable
- the player can always continue on the surface route
- the detour does not interfere with start, map-return post, or corridor travel anchors
- the proof still reads clearly at `256x160`

## Queue Outcome

`ECO-20260329-scout-32` can close.

`ECO-20260329-main-51` should now be read more narrowly as:

- a forest-only traversal proof
- centered in late `fern-hollow` into `log-run`
- using an upper log route plus one short sheltered lower lane
- avoiding a true cave-engine rewrite in v1
