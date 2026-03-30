# World Travel

This document describes the live five-biome travel loop that now connects Eco Explorer's ecosystems.

## Purpose

The travel layer turns the game into one continuous habitat gradient instead of a stack of disconnected levels.

The current implementation covers:

- a live five-biome chain: `beach -> coastal-scrub -> forest -> treeline -> tundra`
- two ecotone transition biomes: `Coastal Scrub` and `Treeline Pass`
- four dedicated walkable corridor seams across the full adjacent chain
- one authored map-return post in every corridor-enabled biome
- a world map with focus movement and authored route walking
- a seven-beat doorway transition plan between biome and map scenes
- journal behavior that stays aligned with the biome the player is currently browsing on the map
- deterministic smoke coverage for biome exit, corridor ownership switching, full-chain corridor walking, map-return posts, map browsing, map-journal opening, and live destination travel

## Files

- `src/content/biomes/beach.ts`
- `src/content/biomes/coastal-scrub.ts`
- `src/content/biomes/forest.ts`
- `src/content/biomes/treeline.ts`
- `src/content/biomes/tundra.ts`
- `src/content/world-map.ts`
- `src/engine/corridor.ts`
- `src/engine/game.ts`
- `src/engine/world-map.ts`
- `src/engine/door-transition.ts`
- `src/engine/world-map-render.ts`
- `src/test/corridor.test.ts`
- `src/test/coastal-scrub-biome.test.ts`
- `src/test/forest-biome.test.ts`
- `src/test/treeline-biome.test.ts`
- `src/test/tundra-biome.test.ts`
- `src/test/world-map.test.ts`
- `src/test/runtime-smoke.test.ts`

## Live biome chain

The current live route is:

1. `Sunny Beach`
2. `Coastal Scrub`
3. `Forest Trail`
4. `Treeline Pass`
5. `Tundra Reach`

Representative live content by biome:

- `Sunny Beach`
  - shells: Pacific littleneck shell, Lewis' moon snail shell, Pacific razor clam shell
  - plants: beach grass, yellow sand verbena, introduced sea rocket
  - animals and places: Pacific sand crab, sanderling, western snowy plover, driftwood, bull kelp wrack

- `Coastal Scrub`
  - shared edge plants: beach grass, yellow sand verbena, introduced sea rocket, sword fern
  - scrub species: seashore lupine, coyote brush, Pacific wax myrtle, shore pine
  - other finds: beach strawberry, salmonberry, deer mouse, song sparrow, nurse log

- `Forest Trail`
  - plants: Douglas-fir sapling, sword fern, redwood sorrel, western trillium
  - collectibles: salal berry, Douglas-fir cone
  - animals: banana slug, Steller's jay, pileated woodpecker

- `Treeline Pass`
  - plants and lichen: mountain hemlock, dwarf birch, mountain avens, moss campion, reindeer lichen, Arctic willow
  - collectibles: bog blueberry, crowberry
  - animals and places: rock ptarmigan, ermine, hoary marmot, krummholz spruce, frost-heave boulder

- `Tundra Reach`
  - plants: Arctic willow, purple saxifrage, cottongrass, woolly lousewort
  - collectibles: cloudberry, crowberry
  - animals: Arctic hare, snow bunting, northern collared lemming

All five biomes use the same inspectable schema, save model, journal, and discovery loop.

## Live corridor chain

The full adjacent corridor chain is now live:

1. `Sunny Beach <-> Coastal Scrub`
2. `Coastal Scrub <-> Forest Trail`
3. `Forest Trail <-> Treeline Pass`
4. `Treeline Pass <-> Tundra Reach`

Current shape:

- each adjacent pair uses a dedicated seam scene, not a stitched mega-level and not a saved corridor biome
- every live seam uses one centered ownership threshold
- visual blending begins before the threshold, but journal, field-guide, prompt, note, save ownership, and visible world-state context still switch once
- biome visits and `worldStep` only advance when the player fully exits the seam into the neighboring biome, not while pacing back and forth inside the corridor
- the beach seam keeps its dedicated inland-facing corridor door so the route still reads as dune-to-scrub continuity instead of tide-edge inversion
- the inland pairs stay narrowly edge-authored instead of mixing full biome rosters; `forest <-> treeline` uses the strongest uphill shaping of the four seams
- each corridor-enabled biome now also has one calm interior map-return post that opens the world map without forcing the player back to an edge door first

Corridor door layout:

- `beach` has one inland corridor door toward `coastal-scrub`
- `coastal-scrub`, `forest`, and `treeline` each have a left and right corridor door for their adjacent neighbors
- `tundra` has one return corridor door toward `treeline`

Map-return post layout:

- each corridor-enabled biome has one authored `map-post` in a stable interior zone
- posts are separate from corridor thresholds and do not replace adjacent walking
- opening the map from a post returns you to that same interior anchor if you cancel back into the origin biome
- the world map is still available from the in-game menu as a secondary access path

## World map

The map defines five reachable nodes:

- `beach`
- `coastal-scrub`
- `forest`
- `treeline`
- `tundra`

Each location includes:

- a world-map node position
- a map-door anchor
- a biome-door anchor
- label and summary text

Connections are authored as waypoint paths so the avatar walks a readable route instead of teleporting across the map.

## Doorway transition beats

The transition planner uses seven beats:

1. `biome-exit`
2. `fade-out`
3. `map-emerge`
4. `map-walk`
5. `map-enter`
6. `fade-in`
7. `biome-emerge`

This gives the intended handheld-RPG feel: leave a biome door, appear on the map, move across the route, enter the next doorway, and emerge inside the destination habitat.

## Live player flow

There are now two travel paths:

1. Corridor path
2. Map path

Corridor path:

1. In any live biome, walk to the corridor door for the neighboring habitat and press `E`.
2. The game opens the matching adjacent seam scene instead of forcing the map.
3. Walk across the blend band.
4. The ownership threshold switches journal, field-guide, prompt, note, and visible world-state context once.
5. Walk out of the seam edge to continue into the destination biome, which is the moment the visit counter and `worldStep` actually commit.

Map path:

1. In a corridor-enabled biome, either walk to the authored map-return post and press `E`, or open the field menu and choose `World map`.
2. On the map, use arrows to move focus through the habitat chain.
3. Press `J` on the map to open the journal for the currently focused biome, not the doorway origin biome.
4. Press `Enter` or `E` on a focused destination to start the live route walk.
5. The avatar travels the authored path and enters the destination biome through its linked doorway.
6. Press `Esc` to return to the biome you exited from; if you opened the map from a map-return post, you re-enter near that same post instead of the old edge doorway.

Current map-side controls:

- `Arrow keys` or `A/D/W/S`: move map focus
- `Enter` or `E`: walk to the focused destination
- `J`: open the journal for the focused biome
- `Esc`: return to the biome you last exited from if you do not want to travel onward

## Integration notes

- `src/engine/game.ts` owns the live scene switch between biome play, the corridor chain, world map, journal, and doorway transitions.
- `src/engine/corridor.ts` is the source of truth for all four adjacent seam scenes, threshold ownership, pair-specific corridor visuals, and edge-exit rules.
- `src/engine/world-map.ts` is the source of truth for map focus changes and authored route walking.
- `src/engine/door-transition.ts` is the source of truth for the staged doorway beats.
- `src/test/corridor.test.ts` protects the seam threshold, pair coverage, and edge-content rules.
- `src/test/world-map.test.ts` protects route structure and world-map path math.
- `src/test/runtime-smoke.test.ts` protects the player-facing loop from title to full-chain corridor walking, threshold ownership switching, interior map-return posts, menu-open map access, live map browsing, and destination arrival.
- `src/engine/game.ts` is still the main concentration point for orchestration, so future travel/UI work should keep extracting helpers instead of growing one giant runtime file.
