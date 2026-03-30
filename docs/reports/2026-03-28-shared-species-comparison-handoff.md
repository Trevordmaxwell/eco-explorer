# Shared Species Comparison Handoff

Date: 2026-03-28
Status: Ready for future implementation after local sightings are stable

## Method

- read queue item `ECO-20260328-scout-14` and packet `015`
- reviewed:
  - `docs/reports/2026-03-28-depth-and-game-feel-sequence.md`
  - `docs/reports/2026-03-28-shared-species-handoff.md`
  - `docs/reports/2026-03-28-multi-biome-sightings-handoff.md`
  - `src/content/shared-entries.ts`
  - `src/content/biomes/beach.ts`
  - `src/content/biomes/coastal-scrub.ts`
  - `src/content/biomes/forest.ts`
  - `src/content/biomes/treeline.ts`
  - `src/content/biomes/tundra.ts`
  - `src/engine/journal.ts`
  - `src/engine/ecosystem-notes.ts`
  - `src/engine/overlay-render.ts`
  - `src/engine/game.ts`
  - `src/test/journal.test.ts`
  - `src/test/runtime-smoke.test.ts`

## Current Foundation

The project already has the two ingredients a comparison page needs:

- one canonical shared-species model via `entryId`
- one save-backed multi-biome sightings list via `JournalEntryState.biomeIds`

The current journal already surfaces that overlap through the compact `Seen in:` row in the detail pane.

So `main-39` should not start by inventing new shared-species plumbing. It should extend the current selected-entry detail view.

## Best V1 Shape

Use the existing journal detail pane as the doorway into one compact comparison mode.

Recommended interaction:

- only entries with more than one real sighting and enough authored habitat context show a tiny `Compare habitats` affordance
- selecting that affordance swaps the lower detail area into a comparison view
- the list pane stays intact
- leaving comparison mode returns to the normal entry detail

This keeps the notebook identity because the player is still reading one species entry at a time. The page gains depth without becoming a matrix, dashboard, or separate encyclopedia mode.

## What The Comparison Should Actually Compare

Do not compare repeated fact text.

Compare how the same organism fits into different habitats through:

- role
- neighbors
- shelter or exposure
- local conditions

The best source for those habitat differences is the ecosystem-note layer, not the shared species fact text.

That means each habitat card should be built from:

- the biome name
- the best local ecosystem note that includes that shared species
- the note summary
- optionally the note prompt or zone label if space allows

This works because the notes already teach things like:

- `beach-grass`
  - beach: `Shore Shelter`
  - coastal scrub: `Shelter Builds Here`
- `arctic-willow`
  - treeline: `Low Ground Wins`
  - tundra: `Staying Low`
- `crowberry`
  - treeline: `Low Ground Wins`
  - tundra: `Staying Low`

Those are real habitat-role differences, which is exactly what the page should teach.

## Recommended V1 Candidate Set

Keep the first comparison pass intentionally narrow.

Best initial entries:

- `beach-grass`
- `arctic-willow`
- `crowberry`

Why these first:

- they already have multi-biome sightings potential
- they already have strong note-backed habitat differences
- they reinforce ecotone and gradient teaching directly

Entries to leave out of v1 unless new authored habitat notes are added:

- `sea-rocket`
- `sword-fern`

Those entries are shared, but they do not yet have equally strong two-habitat note context in the current content pack.

## Recommended Layout

Inside the current right-hand journal detail pane:

1. keep the sprite, common name, and `Seen in:` line
2. swap the lower note area into a comparison view when the player chooses it
3. render two stacked habitat cards, one per biome, rather than trying to force side-by-side columns into the compact layout

Each comparison card should stay short:

- biome label
- note title
- one short summary line

If the comparison needs more than that, the scope is too large for v1.

## Implementation Guidance

Recommended future helper:

- `src/engine/journal-comparison.ts`

Recommended responsibility:

- given a selected entry id, sightings, and biome definitions
- return whether comparison is available
- return one compact card per comparable biome
- only include biomes where the shared entry has a meaningful local comparison card

Good implementation order:

1. Add a pure comparison helper that resolves comparison cards from current biomes, sightings, and ecosystem notes.
2. Keep the first card resolver deterministic and note-backed.
3. Add one tiny UI affordance in the journal detail pane when comparison is available.
4. Reuse the existing detail surface instead of adding a new top-level journal mode.
5. Add tests for the small candidate set before widening to more entries.

## Scope Limits

Avoid in v1:

- a giant shared-species matrix
- automatic comparisons for every repeated entry
- repeating the main fact text in each habitat card
- new save fields
- new map badges
- opening a second journal tab or a full-screen comparison index

If an entry does not have two good habitat cards, keep it on the normal detail page.

## File Seams For Future Implementation

Most likely file touches:

- `src/engine/journal.ts`
- `src/engine/journal-comparison.ts`
- `src/engine/ecosystem-notes.ts`
- `src/engine/overlay-render.ts`
- `src/engine/game.ts`
- `src/engine/types.ts`
- `src/content/biomes/*.ts`
- `src/test/journal.test.ts`
- `src/test/runtime-smoke.test.ts`

## Test Ideas

- pure helper tests that only `beach-grass`, `arctic-willow`, and `crowberry` are comparison-ready in v1
- tests that comparison cards use local ecosystem-note summaries instead of duplicating shared species fact text
- UI tests that the compare affordance only appears when an entry has more than one sighting and real comparison cards
- runtime smoke checks that entering and leaving comparison mode preserves the selected species and calm journal navigation

## Queue Outcome

- `ECO-20260328-scout-14` can close with this report.
- `main-39` should stay focused on:
  - note-backed shared-species comparison cards
  - the strongest initial candidate set only
  - a same-pane journal detail expansion instead of a new encyclopedia mode
