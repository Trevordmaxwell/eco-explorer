# Lightweight Progression Review

Date: 2026-03-28
Queue item: `ECO-20260328-critic-13`
Status: Complete

## Method

- reviewed:
  - `src/engine/journal.ts`
  - `src/engine/progression.ts`
  - `src/engine/game.ts`
  - `src/engine/overlay-render.ts`
  - `src/engine/world-map-render.ts`
  - `src/engine/save.ts`
  - `src/test/journal.test.ts`
  - `src/test/progression.test.ts`
  - `src/test/runtime-smoke.test.ts`
  - `docs/reports/2026-03-28-lightweight-progression-handoff.md`
- ran:
  - `npm test -- --run`
  - `npm run build`

## Findings

### P1. Per-biome survey progress is still global-entry based instead of local-sighting based

Files:

- `src/engine/journal.ts:48`
- `src/engine/journal.ts:74`
- `src/engine/game.ts:363`

What happens:

- the new survey-state system is meant to describe how much of one biome the player has actually explored
- but `buildJournalBiomeProgress()` still counts a biome entry as discovered whenever its `entryId` exists anywhere in the global discovered set
- because shared species now intentionally reuse one canonical `entryId`, finding `beach-grass` on the beach can immediately add progress to Coastal Scrub, `sword-fern` can leak from forest to scrub, and `arctic-willow` can leak between Treeline and Tundra

Why it matters:

- this is the opposite of the intended cozy progression signal
- it lets a later biome look partly explored before the player has actually noticed anything there
- the bug gets more visible now that the journal and world map both echo survey state

Recommendation:

- derive per-biome discovery counts from `JournalEntryState.biomeIds`
- keep the global shared-entry model, but make local survey math respect local sightings

### P2. Biome journal pages still treat shared species as locally discovered before they are seen there

Files:

- `src/engine/journal.ts:34`
- `src/engine/journal.ts:40`

What happens:

- `getDiscoveredEntriesForBiome()` also keys off global discovered entry ids
- that means a shared species can show up as a discovered row on a later biome page even if the player has only seen it in an earlier habitat

Why it matters:

- this weakens habitat-specific discovery
- it also makes the new per-biome survey language less trustworthy because the page and the counts are no longer describing the same thing

Recommendation:

- make biome-page membership follow local sightings too
- keep the compact `Seen in:` row for entries that have been found in more than one habitat

### P3. The shared-species progression edge is not protected by tests yet

Files:

- `src/test/progression.test.ts:9`
- `src/test/journal.test.ts:14`
- `src/test/runtime-smoke.test.ts:374`

What happens:

- the current tests cover plain survey thresholds and the happy-path map echo
- they do not assert that shared species stay local to the biome where they were actually found

Why it matters:

- the progression bug above is already live while the suite stays green
- that means future agents could keep touching journal or save logic without noticing this regression class

Recommendation:

- add one explicit beach-to-coastal and one treeline-to-tundra shared-species coverage path
- keep that check in both helper tests and one runtime-level smoke assertion

## What Looked Good

- The progression surface itself stays small and calm. It still feels like a notebook milestone, not a quest log.
- The world-map echo is restrained enough to fit the current tone.
- The survey labels are simple and readable for the intended age range.

## Queue Outcome

- close `ECO-20260328-critic-13`
- queue `ECO-20260328-main-35`
- queue `ECO-20260328-critic-14`
