# 2026-03-30 Directional Travel Coherence Audit

## Scope

Complete `ECO-20260330-scout-71`: audit the live lane-1 travel chain and turn the remaining directional incoherence into one main implementation pass for `ECO-20260330-main-107`.

## Summary

The hybrid travel model is structurally sound, but the biggest remaining confusion is no longer corridor state logic. It is player orientation.

The current travel chain still asks the player to infer too much from layout alone:

- menu-open map return and post-open map return do not anchor the player the same way
- corridor doors and map posts do not expose their destination clearly at the moment of interaction
- the world-map footer describes habitat flavor, not where that destination sits in the larger gradient

That is enough to make the world feel slightly spatially slippery even though the underlying travel mechanics work.

## Key Findings

### 1. Same-biome map return depends on how the player opened the map

This is the biggest coherence gap.

- Opening the map from an authored `map-post` stores that post as `mapReturnAnchor`, so canceling back into the same biome returns near the interior post anchor.
- Opening the map from the field menu uses `openWorldMapDirect()`, which does not set `mapReturnAnchor`, so same-biome cancel falls back to the biome's `biomeDoor`.

That means the same cancel action can return the player either to a calm interior post or to an edge doorway depending on entry path, which makes the world feel less spatially trustworthy.

Grounding:

- code path: `src/engine/game.ts`
- live headless audit: from interior forest at roughly `x=110`, menu-open map cancel started the same-biome return near the left-edge door at roughly `x=32`
- existing runtime smoke already confirms the post-driven interior return path

### 2. Travel interactables are target-blind at interaction time

The code knows where each travel object goes, but the player mostly does not.

- corridor doors all use the same `travel-door` presentation
- map-return posts all use the same `map-post` presentation
- the highlighted interact state is just the existing marker, not a destination-aware cue

In middle biomes, that means the player must remember that one generic door means "back toward coast" while the other means "farther inland," even though the runtime already has `targetBiomeId` for those interactables.

Grounding:

- interactables are resolved in `src/engine/game.ts`
- rendering still uses generic door/post sprites plus a generic interact marker in `src/engine/biome-scene-render.ts`

### 3. The world-map footer does not reinforce direction

The world-map footer is one of the cheapest places to remind the player how the world connects, but the live copy is still ecology-first:

- `Shells, dunes, and shore life.`
- `Shrubs, dunes, and forest edge.`
- `Ferns, cones, and canopy life.`

Those lines are fine as flavor, but they do not answer the orientation question that this phase is trying to solve: "am I heading back toward the coast, farther inland, or higher into the alpine branch?"

Grounding:

- summaries live in `src/content/world-map.ts`
- the footer renders `focused.summary` directly in `src/engine/world-map-render.ts`

## Recommended `main-107` Pass

Keep `main-107` to one coherence pass with three linked changes:

1. Same-biome map cancel should prefer the biome's authored `mapReturnPost` when that biome has one, even when the map was opened from the field menu.
2. When the player is close to a corridor door or map-return post, show one tiny target-aware travel cue such as `TO COASTAL SCRUB`, `TO TREELINE PASS`, or `WORLD MAP`.
3. Rewrite world-map footer summaries into short direction-aware relationship copy that reinforces the coast-to-inland gradient instead of only listing habitat flavor.

This is still one pass, not three separate projects. All three changes solve the same player-facing problem: travel should tell the player where they are going and where they will come back.

## Keep Out Of Scope

Leave these for later packets:

- broader regional approach warmth and calmer map-return-post flavor from packet `036`
- new map HUDs, route planners, or navigation panels
- large geometry moves or corridor rewrites
- second-season district invitation copy

## Verification For `main-107`

- add runtime coverage for menu-open world-map cancel returning to the stable interior anchor when a biome has `mapReturnPost`
- add focused checks for the new target-aware travel cue text
- add at least one browser capture for:
  - a mid-chain biome with both corridor directions available
  - the world map with the updated directional footer copy

## Queue Guidance

- Close `ECO-20260330-scout-71`.
- Promote `ECO-20260330-main-107` to `READY`.
- Keep `ECO-20260330-critic-82` blocked until that implementation lands.
