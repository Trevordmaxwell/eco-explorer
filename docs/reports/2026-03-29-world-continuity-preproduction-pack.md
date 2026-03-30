# World Continuity Preproduction Pack

Date: 2026-03-29
Status: Ready for future implementation planning

## Method

- read queue item `ECO-20260329-scout-30` and packet `020`
- reviewed:
  - `docs/reports/2026-03-29-world-continuity-preproduction-sequence.md`
  - `docs/reports/2026-03-29-continuous-corridor-travel-sequence.md`
  - `docs/reports/2026-03-29-hybrid-corridor-travel-handoff.md`
  - `docs/reports/2026-03-29-corridor-edge-content-matrix-handoff.md`
  - `docs/reports/2026-03-29-corridor-threshold-state-audit.md`
  - `docs/reports/2026-03-29-beach-orientation-fix-options.md`
  - `docs/reports/2026-03-28-living-world-sequence.md`
  - `docs/reports/2026-03-28-phenology-grounding-handoff.md`
  - `docs/reports/2026-03-28-phenology-readiness-audit.md`
  - `docs/reports/2026-03-28-soundscape-direction-handoff.md`
  - `docs/reports/2026-03-29-field-partner-cue-bank-handoff.md`
  - `docs/world-travel.md`
  - `docs/science-source-ledger.md`
  - live biome and travel docs already reflected in `project-memory`

## Core Synthesis

Eco Explorer should become a more continuous world by deepening one adjacent seam at a time, not by turning every future system on at once.

The strongest future shape is:

1. keep the world map
2. let adjacent habitats feel more walkable and more seasonal
3. keep notebook prompts and partner cues quiet enough that the world itself still does most of the teaching
4. let sound reinforce habitat drift only after the visual seam is proven

That means the game should not jump from the current five-biome map straight into:

- a full stitched super-level
- a global season simulator
- a broad audio pass tuned in the abstract
- constant corridor chatter from prompts or the partner

Instead, it should grow through one narrow continuity bundle at a time.

## Recommended Later Order

After the active authored field-partner cleanup:

1. `main-50`
   - finish the authored field-partner follow-up
2. `critic-26`
   - confirm the partner is quiet and worth building on
3. `main-37`
   - land the first coarse `early / peak / late` phenology pass
4. `main-46`
   - use the first `beach <-> coastal-scrub` corridor proof as the first true world-continuity bundle
5. `critic-23`
   - review the first continuity proof before spreading it
6. `main-41`
   - build the broader sound system after the seam is proven, so ambience drift is tuned against a real corridor instead of guessed globally
7. `main-47`
   - generalize to the full chain only after the first proof survives critique
8. `critic-24`
   - review the full chain
9. `main-48`
   - add map-return posts after the walkable chain feels trustworthy

## Most Useful Future Grouping

The most useful implementation grouping after `main-50` and the first phenology pass is not a general audio pass.

It is one continuity-focused corridor bundle built around `main-46`.

That bundle should combine:

- one adjacent walkable seam
- one strong threshold rule
- one or two clear visual carriers
- one readable phenology read
- quiet notebook and partner opportunity windows only where the seam is already legible

It should not yet combine:

- the full chain
- map-return posts
- a full audio engine rollout
- multi-link corridor tooling

In other words: prove one living seam first, then tune sound and broader travel around the proof.

## Five-Transition Matrix

| Link | Strength at `192x144` | Primary transition carriers | Biggest readability risk | Map-return guidance |
| --- | --- | --- | --- | --- |
| `beach <-> coastal-scrub` | Strongest | `beach-grass`, `sand-verbena`, `dune-lupine`, firmer dune shelter, less open sky | over-mixing beach tide content with scrub or forest cues | eventual posts should live in stable interior zones, not the seam: `beach` in `dry-sand`, `coastal-scrub` in `shrub-thicket` |
| `coastal-scrub <-> forest` | Medium-high | `sword-fern`, `salmonberry`, `nurse-log`, shore-pine to deeper canopy, cooler floor light | pushing the seam too quickly into deep forest darkness or letting scrub stay too open too long | keep `coastal-scrub` post in `shrub-thicket` or early `shore-pine-stand`; keep `forest` post in `fern-hollow` |
| `forest <-> treeline` | Weakest | canopy thinning, more stone and wind exposure, first berry shrubs, first bent or low conifer shapes | there are fewer obvious shared species, so generic blending will look muddy or arbitrary | keep `forest` post in `log-run` or a stable interior `fern-hollow`; keep `treeline` post in `dwarf-shrub`, not `lichen-fell` |
| `treeline <-> tundra` | Strong | `arctic-willow`, `crowberry`, open ground, colder stone, `cottongrass` or `purple-saxifrage`, first snow traces | pushing full snowfield or full tundra openness too early before the threshold | keep `treeline` post in `dwarf-shrub`; keep `tundra` post in `snow-meadow` |
| `map-return posts` | Global rule, not a seam | one authored post per corridor-enabled biome, tied to stable interior habitat identity | posts placed in blend bands will make the seams feel cluttered and gamey | place posts roughly `96-128` world units from the nearest corridor threshold and outside the blend band; do not put posts at the threshold itself |

## Cue And Opportunity Matrix

| Link | Corridor art drift | Day-part and weather read | Phenology hook | Sound opportunity | Notebook / partner window |
| --- | --- | --- | --- | --- | --- |
| `beach <-> coastal-scrub` | open sand to rooted dune to first scrub silhouettes | `marine-haze` should read gradually; `dawn` and `dusk` make shelter contrast strongest | `sand-verbena` bloom-to-seed plus `dune-lupine` arrival | gradual surf hush to brush-wind shift later, not a hard threshold snap in v1 | strongest prompt or partner window is just after the threshold, once `dune-lupine` and stronger shelter read clearly |
| `coastal-scrub <-> forest` | scrub density, pine silhouettes, darker understory, more fallen wood | `mist-drip` should feel like a destination-owned deepening, while `clear` keeps the seam more open | `beach-strawberry` or `salmonberry` into richer understory timing | later sound should drift from coastal brush-wind into hush plus sparse bird or wood cues | use cues only on anchor slices; mid-band should stay mostly silent so the moisture and shelter shift does the work |
| `forest <-> treeline` | tree height loss, exposed roots to stone, cooler ridge, more wind-shaped growth | `ridge-wind` and `dusk` can make this link much clearer than neutral midday | `western-trillium` / `salal` fade into `mountain-avens`, `bog-blueberry`, and first-frost mood | later sound should be the clearest gradual thinning test: forest hush out, alpine wind in | keep cues rare here; this is the seam most likely to need silence until the visual read is strong enough |
| `treeline <-> tundra` | low shrubs to wider open ground, more snow traces, softer tree memory | `light-flurry` and `dawn` make the shift feel strong without extra UI | `crowberry`, `arctic-willow`, `purple-saxifrage`, `cottongrass`, first frost | later sound should drift from thin wind plus rare bird cue to colder open-ground wind | good window for one quiet line after threshold because the shared species plus open-ground shift are already legible |

## What Should Stay Separate

Do not combine these in the first continuity bundle:

- `main-46` and `main-48`
  - map-return posts should wait until on-foot corridor travel feels trustworthy
- `main-46` and `main-47`
  - the first proof needs its own critique before the chain expands
- `main-46` and full `main-41`
  - the corridor proof should reserve audio opportunity, not force the whole sound system to ship before the seam is understood

## Design Rules That Should Stay Durable

- The first world-continuity pass should make the world feel more connected by strengthening one seam, not by expanding every subsystem.
- `beach <-> coastal-scrub` remains the best first continuity proof.
- `forest <-> treeline` is the weakest later link and will need the most authored per-link shaping.
- Sound should mostly follow a proven seam instead of leading it.
- Notebook prompts and partner cues should speak on anchor slices or just after threshold ownership, not in the middle of blend bands.
- Map-return posts should serve convenience and orientation, not explain the ecology.

## Queue Outcome

- `ECO-20260329-scout-30` can close with this report.
- The queue should now treat `main-46` as the preferred first world-continuity bundle after `main-50` and `main-37`, not as an isolated corridor prototype detached from the living-world lane.
- The broader audio pass should stay separate and follow the first corridor proof instead of preceding it.
