# Lane 1: Systems And Progression

## Purpose

Lane 1 is the systems-and-progression lane.

It owns:

- field-station structure and route flow
- route replay and season-wrap work
- corridor continuity and authored route beats
- season-page evolution
- expedition runtime and structure
- broader progression and pacing changes

## Preferred Write Scope

- `src/engine/**`
- field-station and route rendering code
- progression helpers
- route and corridor runtime files
- tests tied to progression, runtime flow, and station UI

It may touch content files when a route or expedition step needs authored support, but it should avoid broad content-pack work that can live in lane 2.

## Avoid When Possible

- large content-only enrichment packs
- science-ledger bulk authoring
- broad journal richness passes that do not affect route or progression structure

## Current Focus

Lane 1 currently owns:

- season-two opening through the existing station and map seams
- active outing discoverability and route-launch clarity
- regional travel warmth and compact destination framing
- expedition and season-page growth without dashboard drift
- progression and pacing glue between finished chapters

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
- `getFieldRequestContext` / `getActiveFieldRequest` / `getFieldRequestHint` (~1200–1230)
- `showFieldNotice` / `showFieldRequestNotice` (~1231–1249)
- `maybeShow*Notice` family (~1250–1312): starter, station-return, season-capstone, world-map, habitat, route-replay
- `maybeCompleteActiveFieldRequest` (~1313–1346)

## Success Condition

Lane 1 should make the game feel more like an authored field-adventure season with stronger chapters, better pacing, and cleaner progression.
