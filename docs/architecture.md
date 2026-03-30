# Architecture

## Overview

Eco Explorer is a single-canvas pixel-art game with a custom TypeScript runtime. The architecture is deliberately data-driven:

- engine logic lives in `src/engine`
- authored biome and world content lives in `src/content`
- sprite and palette data lives in `src/assets`
- deterministic tests and text hooks protect behavior without depending on wall-clock time

The project has grown from a single-biome prototype into a five-biome connected world with routes, corridor travel, a field station, and a nursery. The runtime still centers on one main coordinator in `src/engine/game.ts`, but most major surfaces now have dedicated helper modules.

## Runtime Layers

### Boot and shell

`src/main.ts` mounts the canvas shell, loads save data with `loadOrCreateSave()`, and starts the runtime with `createGame(canvas, save)`.

The game renders at a fixed internal resolution of `256x160` and uses nearest-neighbor scaling to preserve crisp pixel art.

### Core coordinator

`src/engine/game.ts` is the top-level state machine. It owns:

- movement, jumping, and camera follow
- scene state for biome play, world map, corridor travel, and transitions
- overlay state for title, gameplay, journal, menu, field station, and close-look views
- inspect interactions, fact bubbles, and field notices
- journal selection and comparison toggles
- field station tabs, route board state, expedition hooks, and nursery selection
- save persistence, fullscreen toggles, and audio toggles
- deterministic debug hooks used by tests

### Rendering

Rendering is split into focused helpers:

- `src/engine/biome-scene-render.ts`: terrain, platforms, parallax, weather, phenology, corridor visuals, and world-scene art
- `src/engine/overlay-render.ts`: title, journal, menu, field station, nursery, sketchbook, notices, and other overlay surfaces
- `src/engine/pixel-ui.ts`: reusable boxed text, buttons, chips, and pixel UI primitives
- `src/engine/ui-layout.ts`: handheld-safe layout math for tight screens
- `src/engine/world-map-render.ts`: world-map and travel-node rendering
- `src/engine/sprites.ts`: text-grid sprite compilation and runtime sprite lookup

## World and Content Model

### Biomes

Biome content is authored in `src/content/biomes/`:

- `beach.ts`
- `coastal-scrub.ts`
- `forest.ts`
- `treeline.ts`
- `tundra.ts`

Each biome is a `BiomeDefinition` containing:

- palette and tile ids
- parallax layers
- terrain rules
- spawn tables
- entries for inspectable organisms and landmarks
- ecosystem notes
- optional phenology profiles
- optional habitat process moments
- start position and authored placements

Shared or cross-biome entries live in `src/content/shared-entries.ts`.

### Generation

`src/engine/generation.ts` turns biome definitions into runtime instances. Generation uses deterministic seeds so:

- stable terrain and anchors stay consistent across visits
- refreshable entities can vary on revisit
- authored placements can pin route-specific or traversal-specific content

This keeps the world readable and replayable without becoming random in a way that breaks learning.

### Travel topology

Travel data is split between map-level and corridor-level systems:

- `src/content/world-map.ts`: map nodes, connections, anchors, and corridor door metadata
- `src/engine/world-map.ts`: map state, focus movement, and route stepping
- `src/engine/door-transition.ts`: staged doorway transitions
- `src/engine/corridor.ts`: adjacent biome seam scenes, ownership thresholds, entry points, and visual blending

The current world supports both:

- map-based navigation for orientation and fast travel
- authored adjacent corridors so neighboring ecosystems can blend into each other during play

## Living-World Systems

`src/engine/world-state.ts` resolves the shared deterministic world mood from saved `worldStep` data. It exposes:

- `day-part`: `dawn`, `day`, `dusk`
- `weather`: calm biome-aware profiles such as `marine-haze`, `mist-drip`, `ridge-wind`, and `light-flurry`
- `phenology phase`: `early`, `peak`, `late`

These values are intentionally divorced from real clock time. They are advanced by in-game progress, not by wall-clock hours, so tests remain deterministic and the experience stays portable.

Related modules:

- `src/engine/phenology.ts`: biome-local phase accents and spawn emphasis
- `src/engine/habitat-process.ts`: small ecological process moments layered onto current world state
- `src/engine/audio.ts`: lightweight ambient and UI sound state

## Discovery and Learning Systems

### Inspect and journal

The inspect/journal stack uses the same underlying entry data everywhere:

- `src/engine/inspectables.ts`: inspect resolution and nearby interaction helpers
- `src/engine/journal.ts`: biome progress, discovered entry lists, and survey-facing state
- `src/engine/journal-list.ts`: journal list shaping
- `src/engine/journal-selector.ts`: journal navigation state
- `src/engine/journal-comparison.ts`: shared-species comparison pages
- `src/engine/ecosystem-notes.ts`: note unlock rules and note resolution

Inspectable entries fall into these categories:

- `shell`
- `plant`
- `lichen`
- `animal`
- `landmark`

Organism entries carry scientific names. Landmark entries use subtitles instead.

### Field guide, prompts, and partner

The game now layers several lightweight teaching systems on top of the journal:

- `src/engine/field-guide.ts`: copies a grounded clipboard prompt for external AI or notebook use
- `src/engine/observation-prompts.ts`: calm notebook-style prompt selection
- `src/engine/field-partner.ts`: sparse companion cues
- `src/engine/close-look.ts`: deeper close-look surface for selected discoveries
- `src/engine/sketchbook.ts`: discovery-backed notebook page state

These systems are designed to deepen pattern noticing without turning the game into a quiz HUD.

## Progression and Home-Base Systems

### Field requests and guided season flow

Exploration is increasingly structured around routes and requests:

- `src/engine/field-requests.ts`: authored request definitions and request state
- `src/engine/guided-field-season.ts`: onboarding and route guidance
- `src/engine/progression.ts`: survey and completion state helpers
- `src/engine/field-season-board.ts`: field-station route board, replay notes, and expedition-facing season summaries

The field station uses these systems to present one current route, logged route progress, replay guidance, and expedition unlock cues.

### Field station

`src/engine/field-station.ts` owns the station economy and upgrade seam:

- field credit sources
- upgrade visibility and affordability
- movement-related upgrade effects
- route-marker and station utility unlocks

The station currently includes:

- `SEASON` routes page
- `SEASON` expedition page
- `NURSERY` page

### Nursery

`src/engine/nursery.ts` powers the nursery / teaching-garden loop. It includes:

- compact resources: `litter`, `seed-stock`, `cuttings`, `compost`
- propagation-safe gathering rules
- one active `teachingBed` slot in v1
- growth stages: `stocked -> rooting -> growing -> mature`
- route-support, beauty, and utility rewards
- habitat extras like `log-pile` and `pollinator-patch`

The nursery is deliberately small and secondary. It is meant to enrich route play and habitat teaching, not become a management sim.

## Data Flow

The common runtime flow is:

1. `loadOrCreateSave()` loads and migrates persistent save state from `localStorage`.
2. `createGame(...)` initializes runtime state, world state, overlays, audio, and deterministic hooks.
3. Entering a biome or corridor resolves the relevant content definition and generates a runtime instance.
4. `buildWorldState(save, biomeId)` resolves current day-part, weather, and phenology.
5. Rendering combines biome content, world-state effects, and the active overlay surface.
6. Inspecting entities records discoveries, updates journal state, and can trigger notebook, sketchbook, nursery, or route-adjacent progression.
7. Returning to the field station resolves route-board state, expedition state, upgrades, and nursery progress from the same save.

## Save Model

The save lives in one local `localStorage` profile and is normalized by `src/engine/save.ts`.

Core saved fields include:

- `worldSeed`
- `worldStateVersion`
- `worldStep`
- `biomeVisits`
- `discoveredEntries`
- `sketchbookPages`
- `completedFieldRequestIds`
- `fieldCredits`
- `claimedFieldCreditIds`
- `purchasedUpgradeIds`
- `nurseryResources`
- `nurseryProjects`
- `nurseryUnlockedExtraIds`
- `nurseryClaimedRewardIds`
- `nurseryLastProcessedWorldStep`
- `settings`
- `lastBiomeId`

This model lets the world feel persistent while still supporting revisit variation, long-term progression, and gentle migrations as systems are added.

## Public Interfaces and Test Hooks

Key entry points used across runtime or tests include:

- `createGame(canvas, initialSaveState)`
- `loadOrCreateSave()`
- `enterBiome(biomeId)`
- `generateBiomeInstance(definition, save, visitCount)`
- `inspectEntity(entityId)`
- world-map helpers from `src/engine/world-map.ts`
- corridor helpers from `src/engine/corridor.ts`
- transition helpers from `src/engine/door-transition.ts`
- `window.advanceTime(ms)`
- `window.render_game_to_text()`

`render_game_to_text()` is a core verification seam. It exposes enough world, overlay, route, and prompt state for runtime-smoke tests without depending on screenshots alone.

## Verification Surfaces

The codebase protects behavior through several layers:

- focused unit tests in `src/test`
- deterministic runtime-smoke coverage in `src/test/runtime-smoke.test.ts`
- content-quality and science-shape checks
- save migration tests
- queue and packet validation via `npm run validate:agents`

This combination is what makes the project workable for both humans and autonomous agents.

## Coordination Surfaces

The game also ships with its own in-repo coordination layer for future work:

- `AGENTS.md`
- `.agents/project-memory.md`
- `.agents/work-queue.md`
- `.agents/lane-runner.md`
- `.agents/lanes/`
- `.agents/roles/`
- `.agents/packets/`

Those files are not part of the runtime, but they are part of the project architecture: they keep implementation, critique, and planning work durable even when chat context drops away.
