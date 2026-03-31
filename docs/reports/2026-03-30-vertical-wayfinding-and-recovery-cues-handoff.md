# 2026-03-30 Vertical Wayfinding And Recovery Cues Handoff

## Method

- read `ECO-20260330-scout-70`, packet `033`, the lane-3 brief, and the scout role file
- reviewed the latest lane-3 reports:
  - `docs/reports/2026-03-30-canopy-and-cavern-growth-phase.md`
  - `docs/reports/2026-03-30-upper-canopy-pocket-review.md`
  - `docs/reports/2026-03-30-multi-chamber-cave-continuation-review.md`
- inspected the live forest geometry and current cue seams in:
  - `src/content/biomes/forest.ts`
  - `src/engine/biome-scene-render.ts`
  - `src/engine/pixel-ui.ts`
  - `src/engine/game.ts`
  - `src/test/forest-biome.test.ts`
  - `src/test/runtime-smoke.test.ts`
- checked the seeded live artifacts:
  - `output/main-103-canopy-visual/canopy-pocket.png`
  - `output/main-103-canopy-visual/state.json`
  - `output/main-104-cave-visual/stone-basin.png`
  - `output/main-104-cave-visual/errors.json`

## Current Constraint

Lane 3 now has the right vertical family shape, but its current readability help is uneven.

The game already has three lightweight cue surfaces:

- the existing climb hint icon when the player is already aligned with a climbable
- the habitat chip naming the current zone
- tiny travel labels on highlighted doors and map posts

Those are enough UI language for now. The next pass should not add a fourth surface such as a new HUD row, text tag, or always-on direction arrow.

What is still missing is one tiny in-world support layer for the two newest vertical payoffs:

- the cave recovery from `stone-basin` into `filtered-return`
- the inward canopy continuation around `old-growth-inner-bark-rest` and the sheltered high perch

In both places, the route is already fair. The gain now should be “notice the brighter or safer continuation a little sooner,” not “teach the player with text.”

## What The Live Forest Already Shows

### Cave

- The `stone-basin` screenshot already has the right geometry: darker basin low point, visible recovery trunk, and a brighter return pocket to the right.
- The current climb hint only appears once the player is already aligned with `root-hollow-cave-trunk`.
- That means the room reads correctly once the player is close to the answer, but it still lacks one early recovery cue that quietly says “the brighter right shelf is the way back up.”

### Canopy

- The upper canopy pocket now feels like a real destination, not a single ledge.
- The existing climb hint already works when the player is close to `old-growth-canopy-rung`.
- The remaining readability gap is not “where is the trunk”; it is “which inward shelf is the calm continuation and recovery route once I am already high?”

## Option Comparison

### Option 1. Add a tiny authored in-world cue layer

What it is:

- add a small authored cue list to the live biome definition
- render those cues in world space, not in the overlay layer
- gate them behind the existing `showInspectHints` setting and normal play state
- use tiny environmental cue art, not text

Pros:

- reuses the current hint language instead of inventing a new UI surface
- stays science-forward and cozy because the cues can look like light, openings, or bark guidance instead of signage
- keeps the pass small and forest-only while still being data-driven

Tradeoffs:

- needs one small new authored seam in types/render/debug
- the art has to stay restrained or it will read like platform-game collectibles

Assessment:

- best option

### Option 2. Expand the current climb hint into a farther-reaching icon

What it is:

- show the existing climb hint earlier or from farther away

Pros:

- technically cheap

Tradeoffs:

- does not help the cave return shelf much because the real gain there is destination readability, not climbable detection
- risks making tall spaces feel more gamey and signposted
- spends the current icon language too loudly

Assessment:

- reject

### Option 3. Add text labels or a dedicated vertical HUD cue

What it is:

- add words like `UP`, `RETURN`, or a persistent direction marker

Pros:

- very explicit

Tradeoffs:

- breaks the quiet handheld tone
- duplicates the travel-label surface in a space where text is not the right answer
- pushes lane 3 toward signposted platforming

Assessment:

- reject

## Recommendation For `main-105`

Implement one tiny authored forest-only cue layer that reuses the existing hint toggle and current playfield language.

### Scope

Ship only a few authored cues in `forest`, not a broad all-biome system pass.

Recommended first authored cues:

1. One cave recovery-light cue near the brighter `filtered-return` pocket.
2. One inward canopy-rest cue near `old-growth-inner-bark-rest`.
3. Optionally one tiny second canopy cue near the sheltered `old-growth-high-perch` only if the first canopy cue still reads too low or too subtle in browser checks.

### What the cues should feel like

- pale light or opening cues
- tiny bark or shelter glints
- no words
- no collectible sparkle language
- no persistent arrow floating over the player

The cue should read like “this pocket is brighter / safer / more open” rather than “the game is telling you where to go.”

## Smallest Implementation Shape

### Data shape

Add one compact authored cue list to biome content, something like:

- `id`
- `x`
- `y`
- `style`
- `zoneIds`

That is enough for this pass. Avoid a large generalized traversal-guidance schema.

### Runtime shape

- resolve visible cues only during normal biome play
- hide them during bubble, journal, menu, close-look, transition, map, and corridor states
- respect `save.settings.showInspectHints` so the existing menu toggle controls this layer too

### Render shape

- draw in world space from `drawBiomeScene(...)`
- add at most one small helper in `pixel-ui.ts` for cue art
- keep the current climb hint unchanged; this pass should complement it, not replace it

### Debug shape

Expose visible cue ids in `render_game_to_text()` so the smoke tests can assert the layer without screenshot-only checking.

## Recommended File Targets For `main-105`

- `src/engine/types.ts`
- `src/content/biomes/forest.ts`
- `src/engine/biome-scene-render.ts`
- `src/engine/pixel-ui.ts`
- `src/engine/game.ts`
- `src/test/forest-biome.test.ts`
- `src/test/runtime-smoke.test.ts`

## Acceptance Focus For `main-105`

- the cave now gives one tiny earlier recovery read from `stone-basin` without adding text or louder signage
- the upper canopy now gives one tiny inward continuation read without adding more raw height
- cues disappear with hint markers off
- the pass stays forest-only and does not open a broader HUD layer

## Verification Focus

- browser capture from `stone-basin` should show the recovery destination reading sooner than before
- browser capture from the upper old-growth pocket should show the inward continuation reading sooner than before
- `render_game_to_text()` should expose visible cue ids in those seeded states
- no new overlay clipping or cue noise should appear in calm ground-level forest play

## Queue Outcome

`ECO-20260330-scout-70` can close.

`ECO-20260330-main-105` can move to `READY` as the next lane-3 implementation step.
