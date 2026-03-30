# Weather-Aware Notebook Prompt Candidate Set

Date: 2026-03-28
Status: Ready for future implementation after weather stabilizes

## Method

- read queue item `ECO-20260328-scout-22`
- reviewed:
  - `docs/reports/2026-03-28-notebook-prompt-handoff.md`
  - `docs/reports/2026-03-28-weather-readability-matrix-handoff.md`
  - `docs/reports/2026-03-28-living-world-grounding-handoff.md`
  - `docs/ai-naturalist-design.md`
  - `src/engine/field-guide.ts`
  - `src/engine/world-state.ts`
  - `src/content/biomes/beach.ts`
  - `src/content/biomes/coastal-scrub.ts`
  - `src/content/biomes/forest.ts`
  - `src/content/biomes/treeline.ts`
  - `src/content/biomes/tundra.ts`

## Core Recommendation

The first notebook-prompt pass should start from a small authored seed set, not from generic runtime prompt templates.

That seed set should:

- stay relationship-first
- use `dayPart` and `weather` only when they clearly sharpen the observation
- rotate across the live biome families without requiring a large authored matrix

The cleanest first target is a starter set of eight candidate prompts.

## Starter Candidate Set

| Context | Family | Candidate Prompt | Evidence Anchors |
| --- | --- | --- | --- |
| `beach` + `marine-haze` + `dawn` | shelter / exposure | `Which plants still seem to hold the sand when the coast feels soft and windy?` | `beach-grass`, `sand-verbena`, `dune-edge` |
| `beach` + `clear` + `dusk` | neighbors / roles | `What near the tide line could feed or shelter something smaller after the waves pull back?` | `bull-kelp-wrack`, `pacific-sand-crab`, `western-snowy-plover`, `tide-line` |
| `coastal-scrub` + `marine-haze` or `clear` | timing / change | `Which patch looks newly ready for flowers, fruit, or seed here?` | `dune-lupine`, `beach-strawberry`, `salmonberry`, `back-dune`, `shrub-thicket` |
| `forest` + `mist-drip` + `dawn` | neighbors / roles | `What on this forest floor seems to hold water or food for something else?` | `banana-slug`, `sword-fern`, `redwood-sorrel`, `fern-hollow` |
| `forest` + `clear` + `dusk` | timing / change | `Which seed here looks ready to travel when the air dries a little?` | `fir-cone`, `salal-berry`, `steller-jay`, `log-run` |
| `treeline` + `ridge-wind` + `day` | shelter / exposure | `What stays lowest where the wind has the most reach?` | `moss-campion`, `arctic-willow`, `reindeer-lichen`, `lichen-fell` |
| `treeline` + `clear` + `dusk` | comparison | `Which looks more protected here: the bent trees or the open-ground plants?` | `krummholz-spruce`, `dwarf-birch`, `mountain-hemlock`, `krummholz-belt` |
| `tundra` + `light-flurry` or `clear` | timing / change | `Which plant seems ready to use a very short bright season?` | `purple-saxifrage`, `cottongrass`, `cloudberry`, `snow-meadow` |

## Authoring Rules

Keep the first authored prompt set within these limits:

- one sentence only
- observational question or notebook-style wonder line
- no exact undiscovered names
- no checklist phrasing
- no rewards, praise, or chore language

Good shape:

- `What here...`
- `Which patch...`
- `Where does...`

Avoid:

- `Go find...`
- `Collect...`
- `Try to...`
- `You should...`

## Simple Unlock Rules

The first prompt pass should stay very easy to reason about.

Recommended unlock rules:

1. require at least one grounded evidence bundle:
   - current zone cue
   - nearby discovered entity
   - selected journal entry plus unlocked ecosystem note
2. only use exact organism names when that organism is already discovered locally
3. allow comparison prompts only when the player has real comparison evidence:
   - multi-biome sighting
   - or a strong selected-entry ecosystem-note link

## Simple Rotation Rules

Recommended first rotation behavior:

- one prompt at a time
- hold the prompt until one of these changes:
  - biome
  - zone
  - day part
  - weather
  - selected journal entry
- do not rotate on a timer
- do not emit a second prompt if the same family and same evidence bundle would repeat

This keeps the system deterministic and notebook-like instead of feeling like chatter.

## Implementation-Facing Handoff For `main-33`

Recommended first scope:

1. Store a compact authored prompt-seed set rather than deriving all copy from rules alone.
2. Let the runtime choose from that seed set using world-state, zone, nearby evidence, and optional ecosystem-note context.
3. Keep the first visible pass small enough that prompt selection logic is more important than copy volume.

Most likely file seams:

- `src/engine/observation-prompts.ts`
- `src/engine/field-guide.ts`
- `src/engine/world-state.ts`
- `src/content/biomes/*.ts` or a small authored prompt helper
- `src/test`

## Queue Outcome

- `ECO-20260328-scout-22` can close with this report.
- `main-33` should now be read as a small authored prompt-seed pass, not as a blank-slate prompt-writing task.
