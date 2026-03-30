# Phenology Readiness Audit

Date: 2026-03-28
Status: Ready for future implementation after day-part and weather land

## Method

- read queue item `ECO-20260328-scout-20`, packet `017`, and parked `main-37`
- reviewed:
  - `docs/reports/2026-03-28-living-world-sequence.md`
  - `docs/reports/2026-03-28-living-world-preproduction-sequence.md`
  - `docs/reports/2026-03-28-phenology-grounding-handoff.md`
  - `.agents/packets/015-depth-and-game-feel.json`
  - `src/content/shared-entries.ts`
  - `src/content/biomes/beach.ts`
  - `src/content/biomes/coastal-scrub.ts`
  - `src/content/biomes/forest.ts`
  - `src/content/biomes/treeline.ts`
  - `src/content/biomes/tundra.ts`
  - `src/engine/generation.ts`
  - `src/engine/types.ts`

## Core Recommendation

The live content is already strong enough to support the approved `early` / `peak` / `late` phenology model, but it is not evenly strong across all five biomes.

Current strength by biome:

- strongest: `forest`, `treeline`, `tundra`
- good but slightly thinner late cues: `coastal-scrub`
- weakest overall: `beach`

That means `main-37` should not try to force a perfectly even first pass across every biome entry.

Instead it should:

- start with the clearest visible phase anchors
- use biome-local authored profiles
- accept that `beach` may need a tiny authored support pass before its late phase feels as convincing as the inland and alpine biomes

Where a phase read below is inferred from current entry naming such as flower, berry, or seed-head cues rather than from explicitly phase-aware journal text, I am treating that as usable evidence plus an authored-support gap.

## Five-Biome Readiness Matrix

| Biome | Strong Existing Phase Hooks | Best Zones / Notes | Readiness | Gaps Before `main-37` |
| --- | --- | --- | --- | --- |
| `beach` | `sand-verbena`, `beach-grass`, `bull-kelp-wrack`, `western-snowy-plover` | `dune-edge`, `tide-line`, `shore-shelter`, `wave-edge-survivors` | Medium-low | Late-season cues are thin and more storm/tide flavored than clearly phenology flavored. |
| `coastal-scrub` | `sand-verbena`, `dune-lupine`, `beach-strawberry`, `salmonberry`, `pacific-wax-myrtle` | `back-dune`, `shrub-thicket`, `shelter-builds-here`, `thicket-cover` | Medium-high | Peak is strong, but late seed-head or shrub-turn cues are not yet very explicit in the live authored text. |
| `forest` | `western-trillium`, `redwood-sorrel`, `salal-berry`, `fir-cone`, `banana-slug` | `fern-hollow`, `log-run`, `creek-bend`, `forest-floor-cycle`, `forest-seed-travel` | High | Mostly needs visible profile choices, not new concept work. |
| `treeline` | `mountain-avens`, `moss-campion`, `bog-blueberry`, `crowberry`, `ermine` | `krummholz-belt`, `dwarf-shrub`, `lichen-fell`, `wind-shapes-trees`, `low-ground-wins` | High | Needs an explicit first-frost or shrub-turn look so late phase reads at a glance. |
| `tundra` | `purple-saxifrage`, `cottongrass`, `cloudberry`, `crowberry`, `snow-bunting`, `arctic-hare` | `snow-meadow`, `frost-ridge`, `meltwater-edge`, `staying-low`, `short-summer-rush` | Very high | Mostly needs tiny visual support for the late shift from full summer into first frost or first snow. |

## Biome Notes

### Beach

- The beach has clear early and peak hooks through flowers and dune-building plants.
- It has weaker late hooks because much of the remaining content is about shells, wrack, tide-line life, or broad habitat roles rather than visible plant timing.
- Before a broad phenology rollout, the beach would benefit from one or two more explicit phase cues such as bloom-to-seed support for `sand-verbena` or a clearer late-season dunegrass look.

### Coastal Scrub

- Coastal scrub already has a good progression story from open dunes toward denser shrubs and fruiting edges.
- `dune-lupine`, `beach-strawberry`, and `salmonberry` give strong peak-season energy.
- The biggest gap is a clearer late-season visual or text anchor for scrub drying, seed set, or berry fade rather than leaving late to feel like slightly dimmer peak.

### Forest

- Forest is already one of the best prepared biomes for phenology.
- `western-trillium` gives an early bloom anchor, `salal-berry` gives a peak fruit anchor, and `fir-cone` gives a late dry-seed anchor.
- The current ecosystem notes also already match this pattern well: soil cycle early, seed travel later.

### Treeline

- Treeline has strong alpine bloom and berry timing cues, plus a built-in harshness story through wind and exposure.
- `mountain-avens` and `moss-campion` are strong early anchors, while `bog-blueberry` and `crowberry` carry peak.
- Late phase should probably read through colder stone, lower shrub color, and first-frost hints more than through a completely new content set.

### Tundra

- Tundra is the strongest biome for a visible early / peak / late rhythm.
- `purple-saxifrage` and `snow-bunting` already point toward early return and snowmelt.
- `cloudberry`, `crowberry`, and `cottongrass` support peak.
- First frost, lingering surface snow, and changing berry emphasis can carry late without a heavy season simulator.

## Best Shared Anchors

The safest cross-biome anchors for a first phenology pass are:

- `sand-verbena`
- `arctic-willow`
- `crowberry`

These entries already support visible story changes across more than one habitat.

Useful but weaker shared anchors:

- `beach-grass`
- `sword-fern`

They help mood and texture, but they need clearer visible variants to do as much teaching work as berries, blooms, or snowmelt flowers.

## Recommended First Authored Targets For `main-37`

If `main-37` stays intentionally small, these are the best first targets:

- `beach`: `sand-verbena`, `beach-grass`
- `coastal-scrub`: `dune-lupine`, `beach-strawberry`, `salmonberry`
- `forest`: `western-trillium`, `salal-berry`, `fir-cone`
- `treeline`: `mountain-avens`, `moss-campion`, `bog-blueberry`, `crowberry`
- `tundra`: `purple-saxifrage`, `cottongrass`, `cloudberry`, `crowberry`

That is already enough to make the world feel seasonally alive without trying to give every single entry three explicit visual states at once.

## Implementation-Facing Handoff For `main-37`

Recommended first scope:

1. Keep the approved coarse `early` / `peak` / `late` shared phase.
2. Author biome-local phenology profiles around a handful of the clearest entries per biome.
3. Let zone and ecosystem-note context guide local friendly framing, especially in `fern-hollow`, `log-run`, `lichen-fell`, `snow-meadow`, and the coastal dune zones.
4. Prioritize visible plant and ground cues before any animal schedule or behavior work.
5. Treat the beach as the likely small support-biome: if its late phase still feels thin, add a tiny authored reinforcement pass instead of inflating the whole system.

Most likely file seams:

- `src/engine/world-state.ts`
- `src/engine/generation.ts`
- `src/engine/game.ts`
- `src/content/biomes/*.ts`
- `src/content/shared-entries.ts`
- `src/test`

## Scope Limits

Avoid in the first phenology pass:

- requiring every biome to have equal phase complexity
- changing all animal behavior by phase
- real calendar language
- migration or hibernation systems
- hiding core discoverables for whole phases

The first win is not perfect realism. It is visible ecological timing that still feels calm and authored.

## Queue Outcome

- `ECO-20260328-scout-20` can close with this report.
- `ECO-20260328-main-37` should now be read as a selective authored rollout that starts with the strongest live phase anchors and treats `beach` as the one biome most likely to need small extra authored support before the full chain feels even.
