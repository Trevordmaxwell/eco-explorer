# Lane 1: Playability, Systems, And Routes

## Purpose

Lane 1 is the player-facing coherence lane.

It owns:

- handheld readability and visual clarity on core UI surfaces
- field-station structure and route flow
- Route v2 semantics, support choice, replay labels, and notebook filing behavior
- route replay and season-wrap work
- corridor continuity and authored route beats
- season-page evolution
- expedition runtime and structure
- broader progression and pacing changes
- integration proof across station, map, journal, route, save, and debug surfaces

## Preferred Write Scope

- `src/engine/**`
- field-station and route rendering code
- progression helpers
- route and corridor runtime files
- tests tied to progression, runtime flow, and station UI
- focused browser proof for native `256x160` readability

It may touch content files when a route or expedition step needs authored support, but it should avoid broad content-pack work that can live in lane 2.

## Avoid When Possible

- large content-only enrichment packs
- science-ledger bulk authoring
- broad journal richness passes that do not affect route or progression structure
- vertical/spatial content passes that can be handled as lane 2 world-readability work

## Current Focus

Lane 1 currently owns:

- packet `182` beta integration signoff and any critical native `256x160` readability blocker it confirms
- season-two opening through the existing station and map seams
- active outing discoverability and route-launch clarity
- regional travel warmth and compact destination framing
- expedition and season-page growth without dashboard drift
- progression and pacing glue between finished chapters
- post-Source-to-Shore route-family boundaries before any new playable route breadth
- behavior-preserving helper extraction when station board code absorbs route semantics

## Watch For

- station, title, journal, route-card, and notice text clipping at native `256x160`
- route and station copy promising a new outing before the route-family boundary is designed
- filed Source to Shore accidentally reopening as an active route, route marker, or hidden fourth beat
- support/replay text becoming too dense for the handheld screen
- save or debug-hook changes that break deterministic proof

## Owned Functions In game.ts

These are the functions in `src/engine/game.ts` that lane 1 primarily owns. Other lanes should leave handoffs rather than editing these directly.

- `getGuidedFieldSeasonState` (~486)
- `getFieldStationState` (~494–542)
- `resetNurseryClaimedEntities` (~490)
- `openFieldStation` / `closeFieldStation` (~630–649)
- `changeFieldStationSelection` (~2353–2377)
- `getFieldStationSurface` / `setFieldStationSurface` / `changeFieldStationSurface` (~2378–2412)
- `changeNurseryCardSelection` / `activateNurseryCard` (~2413–2474)
- `activateExpeditionCard` (~2475–2507)
- `toggleOutingSupport` (~2508–2534)
- `updateFieldStationState` (~2535–2620)
- `getActiveOutingLocator` (~543–557)
- `getJournalFieldRequest` (~558–579)
- `getRouteMarkerLocationId` (~580–596)
- `getNearbyDiscoveredEntryIdsForPrompt` (~1348–1361)
- `getObservationPromptForCurrentBiome` / `getFieldGuideObservationPrompt` (~1363–1404)
- `getJournalObservationPrompt` / `getFieldPartnerObservationPrompt` (~1406–1438)
- `getFieldRequestContext` / `getActiveFieldRequest` / `getFieldRequestHint` (~1200–1230)
- `showFieldNotice` / `showFieldRequestNotice` (~1231–1249)
- `maybeShow*Notice` family (~1250–1312): starter, station-return, season-capstone, world-map, habitat, route-replay
- `maybeCompleteActiveFieldRequest` (~1313–1346)
- Route-facing update and interaction paths previously documented under lane 4 are now lane 1 when they affect outing, support, replay, filing, station, map, or journal coherence.

## Success Condition

Lane 1 should make the game feel coherent, readable, and playable as an authored handheld field-adventure season.
