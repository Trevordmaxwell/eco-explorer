# Ecotone Design

Date: 2026-03-28
Status: External design pack reviewed and normalized into the repo queue. Coastal Scrub and Treeline now exist in isolation, but live travel wiring is still pending.

## What This Is

Two transition-zone biomes are proposed between the current ecosystems:

- `Coastal Scrub` between beach and forest
- `Treeline` between forest and tundra

The educational goal is to teach gradients, overlap, and ecosystem change over space instead of only teaching isolated facts about single species.

## Teaching Concepts

### Coastal Scrub

Coastal scrub should teach **facilitation**.

The core idea:

- salt and wind make the beach edge harsh
- tough pioneer plants establish first
- those pioneers slowly improve soil and shelter conditions
- later shrubs and trees become possible because earlier species changed the habitat

### Treeline

Treeline should teach **stress gradients**.

The core idea:

- the same species changes form under harsher cold and wind pressure
- full canopy gives way to stunted, wind-shaped growth
- shrubs, lichens, and exposed rock take over as conditions become too severe for tall trees

## Coastal Scrub

### Zone Sequence

- `back-dune`
- `shrub-thicket`
- `shore-pine-stand`
- `forest-edge`

### Target Entries

- `sand-verbena` — *Abronia latifolia*
- `sea-rocket` — introduced *Cakile edentula*
- `dune-lupine` — *Lupinus littoralis*
- `pacific-wax-myrtle` — *Myrica californica*
- `shore-pine` — *Pinus contorta* var. *contorta*
- `salmonberry` — *Rubus spectabilis*
- `deer-mouse` — *Peromyscus maniculatus*
- `song-sparrow` — *Melospiza melodia*
- `nurse-log` — landmark

### Shared-Species Expectations

- `beach-grass` can appear near the beach-facing edge
- `sand-verbena` can appear near the beach-facing edge
- `sword-fern` can appear near the forest-facing edge

## Treeline

### Zone Sequence

- `thin-canopy`
- `krummholz-belt`
- `dwarf-shrub`
- `lichen-fell`

### Target Entries

- `mountain-hemlock` — *Tsuga mertensiana*
- `dwarf-birch` — *Betula nana*
- `bog-blueberry` — *Vaccinium uliginosum*
- `mountain-avens` — *Dryas octopetala*
- `reindeer-lichen` — *Cladonia rangiferina*
- `rock-ptarmigan` — *Lagopus muta*
- `ermine` — *Mustela erminea*
- `krummholz-spruce` — landmark
- `frost-heave-boulder` — landmark

### Shared-Species Expectations

- `arctic-willow` can appear near the tundra-facing edge
- `crowberry` can appear in the shrub transition zone

## World Map Direction

The preferred eventual chain is:

`beach -> coastal-scrub -> forest -> treeline -> tundra`

That path is worth favoring because it turns travel itself into part of the ecological lesson. The player moves through gradual change instead of jumping between disconnected habitats.

## Shared Entry Rule

If a species appears in both a parent biome and an ecotone, it should keep the same `entryId` so journal behavior stays consistent across biomes.

## Guardrails

- Science accuracy is a hard gate for all species, habitat pairings, and ecological claims.
- Ecotones should read as gradients from left to right, not as arbitrary mixed-species filler.
- Shared species should preserve IDs across biomes.
- Content-first scaffolding is preferred before world-map wiring.
- The live build should stay green at each step.

## Recommended Sequence

1. Scaffold `Coastal Scrub` as an isolated biome with tests.
2. Review `Coastal Scrub` for science and readability.
3. Scaffold `Treeline` as an isolated biome with tests.
4. Wire both ecotones into the world map and travel runtime.
5. Review the full five-biome gradient chain.
