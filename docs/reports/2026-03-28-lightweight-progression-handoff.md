# Lightweight Progression Handoff

Date: 2026-03-28
Status: Ready for implementation after the content-density pass

## Method

- read queue item `ECO-20260328-scout-11` and packet `013`
- reviewed:
  - `docs/reports/2026-03-28-post-28-roadmap.md`
  - `docs/reports/2026-03-28-five-biome-chain-review.md`
  - `src/engine/journal.ts`
  - `src/engine/overlay-render.ts`
  - `src/engine/game.ts`
  - `src/engine/save.ts`
  - `src/engine/types.ts`
  - `src/engine/world-map-render.ts`
  - `src/content/world-map.ts`
  - `src/content/biomes/beach.ts`
  - `src/content/biomes/coastal-scrub.ts`
  - `src/content/biomes/forest.ts`
  - `src/content/biomes/treeline.ts`
  - `src/content/biomes/tundra.ts`
  - `src/test/journal.test.ts`
  - `src/test/runtime-smoke.test.ts`

## Current State

The project already has the right ingredients for a small progression layer:

- save data tracks discovered entries and biome visits
- the journal already exposes per-biome totals
- the world map already has a focused-location label panel
- `render_game_to_text()` already serializes journal and map state for tests

That means the first progression pass does not need a new quest system, new save surface, or a second always-on HUD.

It also should not add another big prose card to the journal yet.

The current journal shell is readable, but still tight:

- the progress row is compact but usable
- the entry detail pane already carries sprite, taxonomy or descriptor, journal text, ecosystem note state, and shared-species sightings

So the safest first progression layer is derived status with very small UI, not another text-heavy panel.

## Option Comparison

### Option 1. Per-biome survey states

What it is:

- each biome gets one lightweight milestone state derived from discoveries
- recommended first pass states:
  - `none`
  - `surveyed` once the player finds `4` entries in that biome
  - `complete` once the biome is fully discovered
- the journal is the source of truth
- the world map can echo the same state in a very small way when a node is focused

Pros:

- fits the current journal progress row without opening a second mode
- preserves free exploration because it does not tell the player what exact thing to find next
- works cleanly with the content-density pass because richer biomes make `4` finds feel modest but real
- needs only a small helper plus calm UI hooks

Tradeoffs:

- it adds shape more than new educational text
- if the labels get too flashy, it can drift toward badge energy

Assessment:

- best option

### Option 2. Global discovery ranks

What it is:

- unlock overall titles based on total discoveries across the whole game
- examples would be ranks like `Observer` or `Explorer`

Pros:

- simple to derive from the existing save
- easy to explain

Tradeoffs:

- flattens the five-biome route into one generic total
- feels closer to score progression than ecosystem exploration
- does not reinforce habitat identity

Assessment:

- reject

### Option 3. Route goals or expedition checklists

What it is:

- add explicit goals like finding a set number of things in one biome before moving on
- or add route completion tasks across the world map

Pros:

- creates strong direction fast

Tradeoffs:

- turns the cozy exploration loop into chores
- pushes the game toward checklist pressure and heavier HUD
- needs more state, more UI, and more wording than the current shell wants

Assessment:

- reject

## Recommendation

Use Option 1.

The first progression layer should be a journal-first biome survey state.

Recommended first pass:

- `surveyed` unlocks at `4` discoveries in a biome
- `complete` unlocks when all entries in that biome are found
- the journal progress row is the primary place that shows this state
- the world map may echo the same state in tiny secondary text for the focused biome

This gives discovery more shape without creating a task log.

## Implementation Guidance

`main-30` should keep the first pass deliberately small:

1. Add a pure helper such as `src/engine/progression.ts` that derives biome survey state from discovered counts and totals.
2. Start with one shared `surveyed at 4 discoveries` rule instead of per-biome tuning.
3. Surface the state in the journal progress row with one short right-aligned label:
   - no label for `none`
   - `SURVEYED`
   - `COMPLETE`
4. Optionally echo the same label in the focused world-map info panel, but keep the map secondary.
5. Expose the progression state in `render_game_to_text()` so runtime smoke coverage can lock it down.

Recommended scope limits:

- do not add a quest log
- do not add timers, chores, or score counters
- do not add per-entry badges to the journal list
- do not add a second text-heavy milestone card to the current journal shell in this first pass

## Suggested File Touches

- `src/engine/progression.ts`
- `src/engine/game.ts`
- `src/engine/overlay-render.ts`
- `src/engine/world-map-render.ts`
- `src/engine/types.ts` only if the helper output needs explicit types
- `src/test`

## Test Focus

- survey state resolves correctly from discovered counts
- `surveyed` appears at `4` finds in a biome
- `complete` appears only at full biome completion
- the journal remains calm and list rows stay unchanged
- map feedback, if added, stays tiny and mirrors the journal state
- `render_game_to_text()` exposes the new state for smoke coverage

## Queue Outcome

- `ECO-20260328-scout-11` can close with this report.
- `ECO-20260328-main-30` should wait for `main-29`, then implement per-biome survey states instead of opening a broader progression redesign.
