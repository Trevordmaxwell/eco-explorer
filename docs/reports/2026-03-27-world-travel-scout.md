# World Travel Scout Report

Date: 2026-03-27

## What Was Built

The repo now has a full scaffold for the next ecosystem-travel layer without destabilizing the current beach slice.

Added:

- a second ecosystem in `src/content/biomes/forest.ts`
- forest-specific sprite assets and palette extensions
- world-map location and door-anchor content in `src/content/world-map.ts`
- map movement helpers in `src/engine/world-map.ts`
- doorway transition planning in `src/engine/door-transition.ts`
- a world-map renderer in `src/engine/world-map-render.ts`
- biome and travel tests in `src/test/forest-biome.test.ts` and `src/test/world-map.test.ts`

## Why This Shape

The live runtime is still centered in `src/engine/game.ts`, and its terrain render path is beach-specific. Wiring the forest and map directly into that loop right now would create a large mixed refactor.

The scaffolded approach keeps three things true:

- the current app stays stable
- the travel system is now concrete and testable
- the main agent gets clear seams for integration work

## Key Integration Risk

The biggest blocker is not the world map itself. It is the current biome renderer.

`src/engine/game.ts` still hardcodes:

- beach water bands
- foam lines
- sand tiles

Before `forest` can be made live, the main agent should generalize that renderer so atmosphere and terrain are biome-specific rather than beach-specific.

## Recommended Main-Agent Sequence

1. Generalize the biome renderer so beach and forest can each draw their own terrain mood.
2. Add a scene state machine that can switch between biome play, world map, and doorway transition.
3. Place and trigger biome doors using the anchors in `src/content/world-map.ts`.
4. Wire the map renderer and movement helpers into the new world-map scene.
5. Drive doorway animation with `createDoorTransitionPlan()` and `sampleDoorTransition()`.
6. Persist current biome and travel return points through the existing save model.

## Verification

- `npm test`
- `npm run build`

Both passed on 2026-03-27.
