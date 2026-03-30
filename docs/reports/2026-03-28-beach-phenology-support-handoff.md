# Beach Phenology Support Handoff

Date: 2026-03-28
Status: Ready as a tiny future support pass if beach phase contrast still feels thin

## Method

- read queue item `ECO-20260328-scout-21`, packet `015`, and the new phenology readiness audit
- reviewed:
  - `docs/reports/2026-03-28-phenology-readiness-audit.md`
  - `docs/reports/2026-03-28-phenology-grounding-handoff.md`
  - `docs/science-source-ledger.md`
  - `src/content/shared-entries.ts`
  - `src/content/biomes/beach.ts`
  - `src/engine/types.ts`

## Core Recommendation

If the first `early` / `peak` / `late` phenology pass leaves `beach` feeling thinner than the inland and alpine biomes, the right fix is a tiny authored reinforcement pass inside the current beach species set.

Do not solve the problem by:

- adding a large new beach content wave
- introducing new coastal species just for phenology
- building animal breeding or nesting systems
- turning wrack or tide timing into a fake season simulator

The safest beach support bundle is:

1. one primary flower anchor
2. one structural dune anchor
3. one secondary late-support accent

## Recommended Tiny Anchor Set

### 1. `sand-verbena` as the primary phase anchor

Use `sand-verbena` as the most explicit beach phenology read.

Recommended phase shape:

- `early`: low leaf mat or tight buds
- `peak`: bright open flower
- `late`: faded bloom or seed-set silhouette

Why this is the best primary anchor:

- it is already a verified native Pacific dune plant in the science ledger
- the current copy already describes it as a bright dune flower
- it belongs in the current `dune-edge` and `dry-sand` teaching story

Best zones and note tie-in:

- `dune-edge`
- `dry-sand`
- `shore-shelter`

### 2. `beach-grass` as the structural dune anchor

Use `beach-grass` to make the whole dune edge feel different across phases even when flowers are sparse.

Recommended phase shape:

- `early`: fresher green clumps
- `peak`: fuller blades and dense dune tufts
- `late`: drier straw-tan tops or subtle seed-head silhouette

Why it works:

- it is already a verified Pacific dune-builder in the science ledger
- it is shared across the beach-to-scrub edge, so the same support language can still scale outward later
- it changes the whole dune silhouette without requiring more collectibles or new UI

Best zones and note tie-in:

- `dune-edge`
- `shore-shelter`

### 3. `bull-kelp-wrack` as the late-support accent only

Use `bull-kelp-wrack` to help late-phase mood, but not as the main phenology teacher.

Recommended role:

- slightly stronger late-phase presence or darker washed-up shape
- a secondary support cue near `tide-line`
- a way to make the beach feel a little more used by waves and shorebirds once the plant cues have already established the phase

Why it should stay secondary:

- wrack is science-safe and already verified
- it supports a seasonal mood, but it is more storm, tide, and shoreline-process flavored than a pure plant-timing anchor
- if it becomes the main late cue, beach phenology will still read more like weather than seasonal growth

Best zones and note tie-in:

- `tide-line`
- `wave-edge-survivors`

## What Not To Use As The First Beach Support

Avoid using these as the primary phenology fix:

- `western-snowy-plover`
- `pacific-sand-crab`
- shell collectables

Reason:

- animal timing quickly turns into breeding, nesting, or behavior logic
- shell variation reads more like collectible variety than phase change
- the beach already needs clearer plant and habitat timing more than it needs more animal-state complexity

## Smallest Clean Future Pass

If a future implementation needs this support, keep it to:

- one `sand-verbena` phase treatment
- one `beach-grass` phase treatment
- one `bull-kelp-wrack` late-support accent
- optional ecosystem-note wording touch-ups only if the current beach note needs to call out bloom or seed timing more clearly

That is enough to make `beach` feel less underpowered beside `forest`, `treeline`, and `tundra` without reopening the whole coast branch.

## Implementation-Facing Handoff

Recommended future shape:

1. Let `main-37` land the coarse phenology system first.
2. Check whether beach still reads weaker than the other four biomes in browser captures and authored review.
3. If it does, apply this tiny beach-only reinforcement pass as a follow-on or a tightly scoped adjunct.

Most likely file seams:

- `src/content/shared-entries.ts`
- `src/content/biomes/beach.ts`
- `src/engine/generation.ts`
- `src/test`

## Queue Outcome

- `ECO-20260328-scout-21` can close with this report.
- A small parked follow-on is justified so future agents can reinforce the beach branch without rediscovering the same support plan during `main-37`.
