# Shared Species Handoff

Date: 2026-03-28
Status: Ready for implementation

## Method

- read queue item `ECO-20260328-scout-09` and packet `010`
- reviewed:
  - `docs/ecotone-design.md`
  - `docs/reports/2026-03-28-treeline-review.md`
  - `src/content/biomes/beach.ts`
  - `src/content/biomes/coastal-scrub.ts`
  - `src/content/biomes/forest.ts`
  - `src/content/biomes/treeline.ts`
  - `src/content/biomes/tundra.ts`
  - `src/engine/game.ts`
  - `src/engine/journal.ts`
  - `src/test/coastal-scrub-biome.test.ts`
  - `src/test/treeline-biome.test.ts`

## Current State

The project already has the right shared-ID idea.

The current duplicated edge species are:

- `beach-grass`
- `sea-rocket`
- `sword-fern`
- `arctic-willow`
- `crowberry`

Right now the ecotone files reuse them by spreading entry objects from parent biome modules:

- `coastal-scrub.ts` pulls from `beach.ts` and `forest.ts`
- `treeline.ts` pulls from `tundra.ts`

That keeps IDs aligned, but it still leaves canonical ownership ambiguous and couples biome modules to each other more than necessary.

## Canonical Shared Entry Set

These are the only entries that need the first shared-species pass:

### Coastal branch

- `beach-grass`
  - used by `beach` and `coastal-scrub`
- `sea-rocket`
  - used by `beach` and `coastal-scrub`
- `sword-fern`
  - used by `forest` and `coastal-scrub`

### Alpine branch

- `arctic-willow`
  - used by `tundra` and `treeline`
- `crowberry`
  - used by `tundra` and `treeline`

## Recommendation

Create one small shared-entry layer for only those five duplicated species.

Recommended location:

- `src/content/shared-entries.ts`

Recommended shape:

- export one canonical entry object per shared species
- group exports by branch with lightweight comments if that helps readability
- import those entries directly into both the parent biome and the ecotone biome

## Why This Pattern

It is the smallest clean move because it:

- preserves the current stable `entryId`s
- keeps save migration out of scope
- removes biome-to-biome import coupling for shared entries
- avoids a much larger “everything in one registry” refactor

## What Should Stay Local

Do not pull these into the shared layer yet:

- unique species
- landmarks
- spawn tables
- biome notes
- terrain rules
- palette or art wiring

The first pass only needs to centralize the duplicated entry definitions themselves.

## What The Main Agent Should Change

1. Create a shared-entry module with the five current duplicated species.
2. Replace the spread-copy imports in `coastal-scrub.ts` and `treeline.ts` with imports from that shared module.
3. Update the parent biome files to import the same canonical entry objects instead of owning their own duplicate definitions.
4. Keep all biome-local spawn tables and note links exactly where they are.
5. Add or refresh tests so the shared IDs stay protected without requiring object spreads between biome modules.

## What Does Not Need To Change

- `entryId`s
- save-state migration
- journal discovery keys
- field-guide category behavior
- the live biome registry strategy

## Queue Outcome

- `ECO-20260328-scout-09` can close with this report.
- `ECO-20260328-main-17` should move onto a dedicated packet so the work stays scoped to canonical shared entries instead of drifting into a broader content-system rewrite.
