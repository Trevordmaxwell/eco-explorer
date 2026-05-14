# Coastal Food-Web Content Handoff

Date: 2026-04-28
Role: scout-agent
Lane: lane-2
Packet: `.agents/packets/177-lane-2-content-richness-runway.json`

## Summary

Scope the next lane-2 implementation as a notes-only coastal food-web pass. The current Beach, Coastal Scrub, and Forest Trail content already has the right physical carriers: kelp wrack, beach hoppers, snowy plover, dune berries, thorny shrubs, small mammals, forest-edge berries, and Steller's jay.

The smallest useful payoff is to add three ecosystem notes that connect those existing entries:

- wrack feeds small invertebrates, and shorebirds use the wrack line
- dune and scrub fruits sit close to protective cover for small animals
- forest-edge berries feed birds, and some seeds can move away from the edge

This should not add inspectables, sprites, close-look seeds, comparison shells, route beats, station UI, or geometry.

## Implementation Contract

Add exactly three ecosystem notes through existing biome `ecosystemNotes` arrays.

Beach note:

- id: `wrack-bird-line`
- title: `Wrack Bird Line`
- entry ids: `bull-kelp-wrack`, `beach-hopper`, `western-snowy-plover`
- minimum discoveries: `2`
- zone: `tide-line`
- summary: `Kelp wrack feeds hoppers and other tiny animals that small shorebirds watch for.`
- observation prompt: `Where does wrack become bird food?`

Coastal Scrub note:

- id: `berry-cover-chain`
- title: `Berry Cover Chain`
- entry ids: `beach-strawberry`, `nootka-rose`, `salmonberry`, `deer-mouse`
- minimum discoveries: `3`
- zone: none, because this deliberately spans the swale, thicket, and forest-edge pockets
- summary: `Low fruit, rose hips, and edge berries give small mammals food beside cover.`
- observation prompt: `Where do berries sit close to cover?`

Forest note:

- id: `berry-seed-shuttle`
- title: `Berry Seed Shuttle`
- entry ids: `steller-jay`, `red-huckleberry`, `salmonberry`
- minimum discoveries: `2`
- zone: `trailhead`
- summary: `Berries feed forest birds, and some seeds travel away from the edge.`
- observation prompt: `Which berries might a bird carry next?`

## Why These Surfaces

Use existing authored placements and entries:

- Beach already stages `bull-kelp-wrack`, `beach-hopper`, `pacific-sand-crab`, and `western-snowy-plover` together in the wrack pocket. Existing notes cover wrack workers and surf food, but plover has no note-level tie yet.
- Coastal Scrub already stages `beach-strawberry`, `nootka-rose`, `salmonberry`, and `deer-mouse` across the back-dune, thicket, and forest-edge spaces. Existing notes emphasize shelter; this adds one compact food-and-cover relationship.
- Forest Trail already carries `steller-jay`, `red-huckleberry`, and `salmonberry` near the trailhead / forest-edge after the front-half continuity pass. Existing notes cover edge berries; this adds a compact seed-movement payoff.

## Science Guardrails

Keep the copy broad:

- say wrack feeds beach hoppers and other tiny animals, then birds watch/use that food line
- say small mammals use berry-and-cover places, not that deer mice specialize on one berry
- say birds or animals can move some seeds, not that Steller's jays always disperse these exact berries
- avoid new species-specific diet claims, nest claims, migration claims, or causal certainty

Existing ledger rows should be enough if the implementation keeps to this wording. Update `docs/science-source-ledger.md` only if the copy adds a new relationship beyond those broad claims.

Sources already represented by current ledger coverage:

- NOAA Greater Farallones kelp and wrack: https://farallones.noaa.gov/eco/kelp/
- NPS Golden Gate beaches and wrack-line invertebrates: https://www.nps.gov/goga/learn/nature/beaches.htm
- NPS Point Reyes western snowy plover: https://www.nps.gov/pore/learn/nature/birds_snowyplover.htm
- USDA Nootka rose plant guide: https://plants.usda.gov/DocumentLibrary/plantguide/pdf/pg_ronu.pdf
- USDA beach strawberry plant guide: https://plants.usda.gov/DocumentLibrary/plantguide/pdf/cs_frchc.pdf
- USFS salmonberry species review: https://research.fs.usda.gov/feis/species-reviews/rubspe

## Tests

Update focused note and biome coverage:

- `src/test/ecosystem-notes.test.ts`
  - proves `wrack-bird-line` unlocks from `western-snowy-plover` plus one wrack partner
  - proves `berry-cover-chain` unlocks from three of its berry / cover entries
  - proves `berry-seed-shuttle` unlocks from `steller-jay` plus one berry
- `src/test/beach-biome.test.ts`
  - asserts the beach note id, entry ids, zone, and compact copy
- `src/test/coastal-scrub-biome.test.ts`
  - asserts the scrub note id, entry ids, no zone id, and compact copy
- `src/test/forest-biome.test.ts`
  - asserts the forest note id, entry ids, zone, and compact copy
- `src/test/content-quality.test.ts`
  - no new mandatory guard is required if all note entries are already ledger-backed, but add a small note-support guard if implementation expands the claims

Run:

```bash
npm test -- --run src/test/ecosystem-notes.test.ts src/test/beach-biome.test.ts src/test/coastal-scrub-biome.test.ts src/test/forest-biome.test.ts src/test/content-quality.test.ts
npm run build
```

No browser proof is required for this notes-only content pass.

## Out Of Scope

- new inspectables, sprites, asset modules, close-look seeds, comparison allowlists, or comparison shells
- station shell, route board, route catalog, field requests, support behavior, world map, corridor travel, save schema, and `game.ts`
- geometry, traversal, new route beats, fourth Source to Shore beat, new page, badge, or reward economy
