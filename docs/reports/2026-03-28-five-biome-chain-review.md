# Five-Biome Ecotone Chain Review

Date: 2026-03-28
Status: Completed against the live five-biome runtime

## Method

- read queue item `ECO-20260328-critic-08` and packet `006`
- reviewed:
  - `src/engine/game.ts`
  - `src/engine/world-map.ts`
  - `src/engine/world-map-render.ts`
  - `src/engine/journal-selector.ts`
  - `src/content/world-map.ts`
  - `src/test/world-map.test.ts`
  - `src/test/runtime-smoke.test.ts`
  - `docs/world-travel.md`
- attempted a Playwright browser pass, but the local Chrome session collision prevented the MCP browser from launching cleanly
- ran:
  - `npm test -- --run src/test/world-map.test.ts src/test/runtime-smoke.test.ts`
  - `npm run build`
  - `npm run validate:agents`

## What Holds Up

The big direction is working.

The live route now reads as a real gradient instead of disconnected levels:

- `beach -> coastal-scrub -> forest -> treeline -> tundra`

That matters because the player can now feel the ecological change over space, not just read isolated fact cards. The current world map summaries, ecotone content sets, and compact five-biome journal selector all support that direction well enough to keep building on.

## Findings

### 1. Journal open-on-map still anchors to the origin biome instead of the node the player is browsing

File anchors:

- `src/engine/game.ts:1033-1035`
- `src/engine/game.ts:635-651`

When the player presses `J` from the world map, the journal defaults to `mapOriginBiomeId` instead of the currently focused map location. That means the player can move the map focus to `Treeline Pass`, open the journal, and still land on `Beach` if that was the biome they exited from.

This is a real fit issue for the new five-biome chain because the map and journal are now part of one exploration loop. The journal should follow the place the player is actively browsing on the map, not stale origin state from a prior doorway transition.

### 2. The deterministic smoke loop still skips the actual map browsing path that the new chain depends on

File anchors:

- `src/test/runtime-smoke.test.ts:185-275`
- `src/test/world-map.test.ts:11-63`

Coverage is much better than it used to be, but the most important new player loop is still not exercised end to end:

- leave a biome through a live door
- enter the world map
- move map focus
- open the journal from the map
- choose a destination
- travel there through the live route

`runtime-smoke.test.ts` still jumps straight from menu and journal checks to `game.enterBiome('treeline')`. `world-map.test.ts` protects path math and route walking, but not the actual user-facing map-plus-journal loop.

This should be tightened after the map-aware journal fix and the multi-biome sightings pass land, so the smoke test locks the intended behavior instead of today's gaps.

### 3. `docs/world-travel.md` is now stale enough to mislead future agents

File anchors:

- `docs/world-travel.md:38-58`
- `src/content/biomes/coastal-scrub.ts:8-85`
- `src/content/biomes/treeline.ts:28-107`
- `src/content/biomes/tundra.ts:5-62`

The travel doc still lists older content such as:

- `wax myrtle berry`
- `shore pine cone`
- `alpine blueberry`
- `whitebark cone`
- `pika`

Those no longer match the live biome files. The current docs are now behind the Pacific coastal cleanup, the Treeline content pass, and the lichen-safe category update.

This is not a player-facing bug, but it is an agent-onboarding problem. The project now depends on durable file-based handoffs, so `docs/world-travel.md` should describe the live world accurately again.

## Queue Outcome

- `ECO-20260328-critic-08` can close.
- Add a main-agent follow-up for map-aware journal opening from the world map.
- Add a follow-up hardening task for a true map-loop smoke plus `docs/world-travel.md` sync after the next journal pass lands.
