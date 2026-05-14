# Front-Half Ecology Richness Handoff

Date: 2026-04-28  
Owner: scout-agent  
Lane: lane-2  
Queue item: ECO-20260428-scout-490  
Packet: .agents/packets/183-lane-2-front-half-ecology-richness.json

## Recommendation

Implement a comparison-routing-only pass for `salmonberry`.

`salmonberry` is already a shared front-half entry in Coastal Scrub and Forest Trail, and both biomes already contain richer reviewed notes from the coastal food-web pass:

- Coastal Scrub `berry-cover-chain` ties beach strawberry, nootka rose, salmonberry, and deer mouse into a scrub cover/food patch.
- Forest Trail `berry-seed-shuttle` ties Steller's jay, red huckleberry, and salmonberry into forest-edge berry movement.

The current same-pane journal comparison resolves to broader notes (`Edge Moisture` and `Creekside Shelter`). Those are valid, but the newer notes better reinforce the requested beach -> coastal scrub -> forest-edge relationship without adding copy or systems.

## Implementation Contract

- In `src/engine/journal-comparison.ts`, add `salmonberry` to `COMPARISON_NOTE_ID_PREFERENCES`.
- Prefer Coastal Scrub note `berry-cover-chain`.
- Prefer Forest Trail note `berry-seed-shuttle`.
- Update `src/test/journal-comparison.test.ts` so the salmonberry comparison fixture unlocks the preferred notes and expects `Berry Cover Chain` / `Berry Seed Shuttle`.
- No science ledger edit is needed because the implementation reuses existing reviewed notes and source rows.

## Proof

- `npm test -- --run src/test/journal-comparison.test.ts src/test/content-quality.test.ts`
- `npm run build`

## Out Of Scope

- No new inspectables, sprites, close-look seeds, observation prompts, ecosystem notes, atlas pages, badge/reward economy, station changes, route-state changes, travel changes, save changes, geometry, traversal, or broad `game.ts` work.
- No fourth Source to Shore beat and no new page shell.
