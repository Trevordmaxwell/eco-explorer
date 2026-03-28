# World Travel

This document describes the staged travel systems that now power live travel between ecosystems.

## Purpose

The goal is to move Eco Explorer from a single-beach slice toward multiple ecosystems connected by a world map and readable doorway transitions.

The current implementation covers:

- two additional ecosystems: `Forest Trail` and `Tundra Reach`
- a world map with beach, forest, and tundra locations
- avatar movement between map locations
- a seven-beat doorway transition plan between ecosystems
- render helpers for the overworld scene

## Files

- `src/content/biomes/forest.ts`
- `src/content/biomes/tundra.ts`
- `src/content/world-map.ts`
- `src/engine/world-map.ts`
- `src/engine/door-transition.ts`
- `src/engine/world-map-render.ts`
- `src/test/forest-biome.test.ts`
- `src/test/tundra-biome.test.ts`
- `src/test/world-map.test.ts`

## Live biomes

The current extra ecosystems are:

- `Forest Trail`
  - plants: Douglas-fir sapling, sword fern, redwood sorrel
  - collectibles: salal berry, Douglas-fir cone
  - animals: banana slug, Steller's jay

- `Tundra Reach`
  - plants: Arctic willow, purple saxifrage, cottongrass
  - collectibles: cloudberry, crowberry
  - animals: Arctic hare, snow bunting

Both biomes use the current inspectable schema and plug into the same journal and save loop as the beach.

## World map

The map currently defines three reachable nodes:

- `beach`
- `forest`
- `tundra`

Each location includes:

- a world-map node position
- a map-door anchor
- a biome-door anchor
- label and summary text

Connections are authored as waypoint paths so the avatar can walk a readable route instead of teleporting between points.

## Doorway transition beats

The transition planner currently uses seven beats:

1. `biome-exit`
2. `fade-out`
3. `map-emerge`
4. `map-walk`
5. `map-enter`
6. `fade-in`
7. `biome-emerge`

This matches the desired feel: the character leaves a doorway, appears on the map, walks across the world, enters another doorway, and arrives in the next ecosystem.

## Live flow

1. Walk to a biome door and press `E`.
2. The game stages a short biome-to-map exit beat.
3. On the map, use arrows to choose a destination and press `Enter` or `E`.
4. The avatar walks the route, then enters the destination biome through its map-linked door.
5. Discoveries remain in the same journal across all ecosystems.

## Integration notes

- `src/engine/game.ts` now owns the live scene switch between biome play, world map, and doorway transitions.
- `src/engine/world-map.ts` remains the source of truth for focus changes and map walking.
- `src/engine/door-transition.ts` remains the source of truth for staged doorway beats.
- If another biome or UI layer lands soon, extracting scene helpers out of `src/engine/game.ts` should be the next cleanup candidate.
