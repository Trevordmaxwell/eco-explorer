# Old-Growth And Under-Root Content Handoff

Date: 2026-04-28
Role: scout-agent
Lane: lane-2
Packet: `.agents/packets/177-lane-2-content-richness-runway.json`

## Summary

Scope the next lane-2 implementation as a compact Forest Trail content pack, not a system or route pass.

The strongest small target is decomposition and old-wood recycling across two existing forest spaces:

- under-root damp litter in `Root Hollow` / `Stone Basin`
- shelf fungus on old wood in the `Old-Growth Pocket`

This complements the current seep, root-curtain, canopy-moss, woodpecker-cavity, and hemlock-seedling content without adding a station surface, route beat, world-map step, or traversal change.

## Implementation Contract

Add exactly two new forest landmark entries in `src/content/biomes/forest.ts`:

- `leaf-litter-pocket`
  - common name: `Leaf-Litter Pocket`
  - category: `landmark`
  - subtitle: `Damp decomposer layer`
  - sprite id: `leaf-litter-pocket`
  - role: under-root damp litter and hidden fungal breakdown
- `shelf-fungus`
  - common name: `Shelf Fungus`
  - category: `landmark`
  - subtitle: `Wood-decay fungus`
  - sprite id: `shelf-fungus`
  - role: visible old-wood fungus and nutrient recycling

Use authored placements only, not new spawn tables:

- place `leaf-litter-pocket` in the existing under-root / stone-basin area near the `seep-stone`, `seep-moss-mat`, `ensatina`, and `banana-slug` cluster
- place `shelf-fungus` on an existing old-growth trunk, hinge, or log surface near `fallen-giant-log`, `woodpecker-cavity`, or the old-growth trunk-foot pocket
- set `castsShadow: false` for bark/log-attached fungus; use ground shadow only if the leaf-litter pocket reads as floor material

Add small sprites in `src/assets/forest-ambient.ts`, then register no new asset module.

Add one close-look seed in `src/engine/close-look.ts`:

- `shelf-fungus`
  - callouts: `wood shelf`, `pale edge`
  - sentence should say the visible shelf marks hidden fungal work in old wood
  - do not add close-look for `leaf-litter-pocket` unless the implementation needs it for readability

Add two ecosystem notes in `forestBiome.ecosystemNotes`:

- `old-wood-recyclers`
  - title: `Old-Wood Recyclers`
  - entry ids: `shelf-fungus`, `fallen-giant-log`, `western-hemlock-seedling`
  - summary should connect fungi softening old wood with damp logs giving seedlings a start
  - zone: `old-growth-pocket`
- `leaf-litter-shelter`
  - title: `Leaf-Litter Shelter`
  - entry ids: `leaf-litter-pocket`, `seep-moss-mat`, `ensatina`
  - summary should connect damp leaf litter, moss, and cool under-root shelter
  - zone: `stone-basin`

## Copy Guardrails

Candidate copy should stay within the existing content budgets:

- `leaf-litter-pocket.shortFact`: `Damp leaf litter is a soft layer where fungi break old leaves and wood apart.`
- `leaf-litter-pocket.journalText`: `This under-root pocket holds wet leaves, bark bits, and crumbly wood. Hidden fungi help break that old material into forest soil.`
- `leaf-litter-pocket.sketchbookNote`: `Wet leaf bits feeding the hollow.`
- `shelf-fungus.shortFact`: `Shelf fungi are visible parts of a larger fungus working through old wood.`
- `shelf-fungus.journalText`: `This shelf fungus grows from old wood while hidden threads work inside. By breaking wood down, fungi help nutrients return to the forest.`
- `shelf-fungus.sketchbookNote`: `Shelf fungus working through old wood.`

Avoid:

- naming an exact fungus species unless a new source row supports it
- edible, poisonous, medicinal, or collecting guidance
- claims that fungi instantly create soil, plants create groundwater, or decomposition works on a visible timescale
- adding animals, a cave route, station archive, field request, world-map cue, route-board copy, or new page

## Science Sources

Use existing ledger style and cite official sources:

- NPS Shenandoah, "Mushrooms and Other Fungi": supports fungi on dead wood and leaf litter, nutrient recycling, and visible fruiting bodies backed by hidden mycelium. https://www.nps.gov/shen/learn/nature/mushrooms.htm
- NPS Muir Woods, "Decomposing Fungi": supports decomposing fungi in a moist forest context, including fallen wood, leaves, debris, and nutrient recycling. https://www.nps.gov/muwo/learn/nature/decomposing-fungi.htm

The ledger rows should keep both new entries broad:

- `shelf-fungus`: `Watch`, because it is a general landmark rather than a named species
- `leaf-litter-pocket`: `Watch`, because it is a habitat/ground-layer landmark rather than a taxonomic entry

## Tests

Update focused coverage:

- `src/test/forest-biome.test.ts`
  - proves both authored entities appear in the intended existing spaces
  - extends old-growth / under-root content expectations without changing geometry assertions
- `src/test/ecosystem-notes.test.ts`
  - proves `old-wood-recyclers` unlocks from `shelf-fungus` plus one old-wood partner
  - proves `leaf-litter-shelter` unlocks from `leaf-litter-pocket` plus one damp-hollow partner
- `src/test/close-look.test.ts`
  - adds `shelf-fungus` to the allowlist and payload assertions
- `src/test/content-quality.test.ts`
  - adds both new ids to a ledger-marker guard

Run:

```bash
npm test -- --run src/test/forest-biome.test.ts src/test/ecosystem-notes.test.ts src/test/close-look.test.ts src/test/content-quality.test.ts
npm run build
```

If implementation edits only content, assets, close-look seeds, tests, and the ledger, no browser proof is required.

## Out Of Scope

- station shell, route board, route catalog, field requests, support behavior, world map, corridor travel, save schema, and `game.ts`
- new cave route, new old-growth route, new comparison shell, new atlas page, or fourth Source to Shore beat
- geometry or traversal edits; use existing authored placements only
