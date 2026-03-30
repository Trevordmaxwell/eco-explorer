# External Pack Reconciliation

Date: 2026-03-28

## What Was Reviewed

- `ai-naturalist-design.pdf`
- `ecotone-design.pdf`
- `eco-explorer-ecotone-update.zip`
- `eco-explorer-new-features.zip`

## What Was Actually New

### New and worth importing

- a full ecotone design layer for `Coastal Scrub` and `Treeline`
- a packet shape for scaffolding those ecotone biomes before wiring them into the live runtime
- future AI-naturalist extensions beyond the core field guide, including ecosystem pulse, day/night, weather, ambient indicators, and a field-partner concept

### Mostly overlapping with the repo already

- the core AI field-guide context and prompt plan
- clipboard-first recommendation
- direct API mode as a later step

The pure field-guide module is already implemented locally, so the external AI handoff was normalized into the repo rather than imported verbatim.

## Normalization Decisions

- External packet numbers conflicted with in-repo packet numbering, so the ecotone work was renumbered into a new local packet.
- External queue IDs also conflicted with active queue items, so new local IDs were assigned for ecotone work.
- The external direct-API field-guide idea stays parked until clipboard mode lands cleanly.
- The broader AI-naturalist “living world” ideas were documented as future extensions, not promoted ahead of current readability and runtime-seam work.

## Result

Imported into the repo:

- `docs/ecotone-design.md`
- `.agents/packets/006-ecotone-biomes.json`
- new ecotone queue items
- future-extension notes added to `docs/ai-naturalist-design.md`

Left queued or parked rather than implemented:

- Coastal Scrub biome
- Treeline biome
- five-biome world-map chain
- ecosystem pulse overlay
- day/night cycle
- weather events
- ambient ecosystem indicators
- field partner

## Why This Shape

This keeps the repo aligned with the new design material without letting external queue collisions or stretch features destabilize the current plan.
