# Multi-Biome Sightings Handoff

Date: 2026-03-28
Status: Ready for implementation

## Method

- read queue item `ECO-20260328-scout-10` and packet `012`
- reviewed:
  - `docs/ecotone-design.md`
  - `docs/reports/2026-03-28-five-biome-journal-selector-handoff.md`
  - `docs/reports/2026-03-28-shared-species-handoff.md`
  - `docs/reports/2026-03-28-treeline-review.md`
  - `src/content/shared-entries.ts`
  - `src/engine/game.ts`
  - `src/engine/inspectables.ts`
  - `src/engine/journal.ts`
  - `src/engine/overlay-render.ts`
  - `src/engine/save.ts`
  - `src/engine/types.ts`
  - `src/test/field-guide.test.ts`
  - `src/test/journal.test.ts`
  - `src/test/runtime-smoke.test.ts`

## Current State

The five-biome chain is now live and the shared edge species already use one canonical `entryId` each.

That means the next problem is no longer "should duplicate species share IDs?" The repo already says yes.

The real remaining gap is that save data still treats discovery as one entry in one biome:

- `JournalEntryState` stores a single `biomeId`
- `recordDiscovery()` returns early for any previously seen `entryId`
- a second sighting in a new biome is not persisted anywhere

So `main-18` is not just a journal paint pass. It needs a small data-model expansion first.

## Option Comparison

### Option 1. Add one compact sightings row in the detail pane

What it is:

- keep one journal entry per `entryId`
- add a short row in the selected-entry detail pane such as `Seen in: Beach, Coastal Scrub`
- show it only when the entry has more than one recorded biome sighting

Pros:

- matches the current split-pane journal layout
- keeps the list pane clean
- teaches biome overlap at the moment the player is already reading about that species
- scales to the current five-biome chain without reopening the top-bar layout problem

Tradeoffs:

- requires a small save migration instead of being purely visual

Assessment:

- best option

### Option 2. Add chips or markers directly in the entry list

What it is:

- show per-entry biome badges, dots, or mini markers in the left list pane

Pros:

- reveals overlap before a species is selected

Tradeoffs:

- the list pane is already the tightest journal surface
- badge logic would compete with category headers and selection highlight
- turns a calm notebook list into a compact dashboard

Assessment:

- reject

### Option 3. Add a separate sightings mode or checklist grid

What it is:

- add another panel, toggle, or matrix showing where a species has been seen

Pros:

- exposes the full overlap model explicitly

Tradeoffs:

- too much structure for the current `192x144` shell
- teaches through bookkeeping instead of noticing
- bigger implementation cost than the learning gain deserves right now

Assessment:

- reject

## Recommendation

Use Option 1.

Keep shared species deduplicated by `entryId`, then add one compact sightings row in the journal detail pane for entries that have been found in more than one biome.

Recommended label:

- `Seen in:`

Recommended placement:

- below the current scientific-name or descriptor line
- above the main journal text block

That placement fits the existing panel better than trying to overload the subtitle slot or clutter the left-hand list.

## Implementation Guidance

`main-18` should do the work in this order:

1. Expand `JournalEntryState` so one discovered entry can remember more than one biome.
2. Migrate legacy save data by treating the old single `biomeId` as a one-item sightings list.
3. Update `recordDiscovery()` so a repeat sighting in a new biome appends that biome to the same entry state instead of returning early unchanged.
4. Add a journal helper that can answer "which biomes has this entry been seen in?" without duplicating the entry in the selected biome list.
5. Render one compact `Seen in:` row in the detail pane only when there is more than one biome in that sighting set.

Recommended scope notes:

- keep the storage key the same and migrate through `normalizeSaveState()`
- keep the return value of `recordDiscovery()` focused on "brand-new entry or not" so fact-bubble behavior stays calm
- do not add map badges, HUD counters, or per-biome checklist UI
- do not duplicate shared species into multiple journal list rows

## Suggested File Touches

- `src/engine/types.ts`
- `src/engine/save.ts`
- `src/engine/journal.ts`
- `src/engine/game.ts`
- `src/engine/overlay-render.ts`
- `src/test/journal.test.ts`
- `src/test/runtime-smoke.test.ts`

## Test Focus

- legacy saves with single `biomeId` still load correctly
- revisiting a shared species in a second biome updates the same discovered entry
- journal list rows stay deduplicated by `entryId`
- the selected entry detail pane shows a compact sightings row only when it has something real to say

## Queue Outcome

- `ECO-20260328-scout-10` can close with this report.
- `ECO-20260328-main-18` should stay focused on one save-backed sightings model plus one compact detail-pane treatment, not a broader journal redesign.
