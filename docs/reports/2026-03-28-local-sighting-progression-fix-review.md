# Local-Sighting Progression Fix Review

Date: 2026-03-28
Queue item: `ECO-20260328-critic-14`
Status: Complete

## Method

- reviewed:
  - `src/engine/journal.ts`
  - `src/engine/game.ts`
  - `src/engine/ecosystem-notes.ts`
  - `src/test/journal.test.ts`
  - `src/test/journal-selector.test.ts`
  - `src/test/runtime-smoke.test.ts`
  - `docs/reports/2026-03-28-lightweight-progression-review.md`
- ran:
  - `npm test -- --run`
  - `npm run build`

## Findings

- No material findings.

## What Looked Good

- Per-biome journal progress, survey state math, and biome-page discovery membership now consistently derive from local `JournalEntryState.biomeIds` sightings instead of global discovered entry ids.
- The ecosystem-note unlock path now follows the same local-sighting rule, so shared species no longer make later habitats feel prematurely explored.
- The new helper and runtime coverage lock down the exact regression class that `critic-13` surfaced across both beach/coastal-scrub and treeline/tundra overlap.

## Residual Watchpoint

- Future comparison-page or notebook systems should keep using local sightings as their default biome truth so multi-biome depth features do not quietly reintroduce global-entry leakage.

## Queue Outcome

- close `ECO-20260328-critic-14`
