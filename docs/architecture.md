# Architecture

## Runtime flow

`src/main.ts` mounts the canvas shell, loads save data, and calls `createGame(canvas, save)`.

`createGame` in `src/engine/game.ts` owns:

- player movement and jumping
- scene state (`biome`, `world-map`, `transition`)
- overlay state (`title`, `playing`, `journal`, `menu`)
- inspect interactions and fact bubbles
- journal selection state
- biome-filtered journal progress and tab state
- menu selection and reset-confirmation state
- camera follow and rendering
- fullscreen and deterministic test hooks

## Travel systems

The multi-biome travel layer is now live in the runtime:

- `src/content/biomes/forest.ts`: temperate forest biome content pack
- `src/content/biomes/tundra.ts`: Arctic tundra biome content pack
- `src/content/world-map.ts`: world-map nodes, connections, and door anchors
- `src/engine/world-map.ts`: map focus, walk routes, and avatar stepping
- `src/engine/door-transition.ts`: doorway transition beat planning and sampling
- `src/engine/world-map-render.ts`: world-map drawing helper

## Data flow

1. `loadOrCreateSave()` loads `worldSeed`, visit counts, discoveries, and settings from `localStorage`, migrating older saves forward when settings fields are added.
2. `enterBiome(biomeId)` increments the visit count and regenerates the current biome.
3. `generateBiomeInstance(definition, save, visitCount)` uses:
   - a stable seed for terrain, platforms, clouds, and stable inspectables
   - a visit seed for refreshable shells, wildlife, and sparkles
4. `world-map` scenes use the location graph in `src/content/world-map.ts` plus the stepping helpers in `src/engine/world-map.ts`.
5. Doorway travel uses `createDoorTransitionPlan()` and `sampleDoorTransition()` to stage exit, map reveal, route travel, and biome entry.
6. Inspecting an entity calls `recordDiscovery`, updates the current visit state, and persists the save.
7. Inspectable UI reads one shared detail line:
   - organism entries show `scientificName`
   - landmark or habitat entries show `subtitle`
8. Journal pages use `src/engine/journal.ts` to compute biome totals, category progress, and biome-filtered discovered entry lists from the same save data.

## Rendering model

- Internal resolution is `192x144`.
- The canvas is scaled with nearest-neighbor rendering for a handheld-era look.
- Pixel sprites are authored as text grids in separate asset modules and converted into offscreen canvases at runtime.
- Terrain is drawn from seeded samples, then tiled with biome-specific surface, fill, and platform sprites.

## Public interfaces

- `createGame(canvas, initialSaveState)`
- `loadOrCreateSave()`
- `enterBiome(biomeId)`
- `generateBiomeInstance(definition, save, visitCount)`
- `inspectEntity(entityId)`
- `createWorldMapState(definition, currentLocationId)`
- `beginWorldMapWalk(definition, state, targetLocationId)`
- `stepWorldMapState(definition, state, dt)`
- `createDoorTransitionPlan(definition, fromBiomeId, toBiomeId)`
- `sampleDoorTransition(definition, plan, elapsed)`
- `window.advanceTime(ms)`
- `window.render_game_to_text()`

## Save model

The save is intentionally simple:

- one local profile in `localStorage`
- persistent `worldSeed`
- per-biome visit counts
- discovered journal entries
- small UI settings such as fullscreen and inspect-hint visibility

This lets a biome feel stable across a save while still letting revisit content refresh.
