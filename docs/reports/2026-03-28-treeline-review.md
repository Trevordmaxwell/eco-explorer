# Treeline Review

Date: 2026-03-28

## Method

- read queue item `ECO-20260328-main-15` and packet `006`
- reviewed:
  - `src/content/biomes/treeline.ts`
  - `src/test/treeline-biome.test.ts`
  - `src/engine/types.ts`
  - `src/engine/journal.ts`
  - `src/engine/field-guide.ts`
  - `docs/science-source-ledger.md`
- ran `npm test -- --run`
- ran `npm run build`
- ran `npm run validate:agents`

## Summary

Treeline is a strong isolated scaffold.

The zone gradient reads clearly, the shared tundra-facing IDs are the right continuity move, and the biome notes teach the intended stress-gradient lesson without drifting into trivia.

There is one real science-model mismatch left: the current content model still forces `reindeer-lichen` into the `plant` bucket.

## Findings

### 1. Reindeer lichen is currently mislabeled as a plant by the shared content model

Files:

- `src/content/biomes/treeline.ts:50-58`
- `src/engine/types.ts:3-4`
- `src/engine/journal.ts:7-8`
- `src/engine/field-guide.ts:25-32`

What is true:

- `reindeer-lichen` is authored with `category: 'plant'`.
- The shared type system only allows `shell | plant | animal | landmark`.
- The journal sort/progress model and field-guide hidden-entry labels both inherit that same category list.

Why it matters:

- The entry text correctly calls it a lichen, but the UI model still places it under `plant`.
- Once Treeline is live, the journal and clipboard field-guide will sometimes tell players they have found a `plant` when the content itself is trying to teach a lichen.
- That is a small but real science-accuracy miss, and this project has already treated science accuracy as a hard gate.

Grounded recommendation:

- Add a lichen-safe category or an equally clear neutral presentation path before Treeline is wired into live travel.
- The fix does not need to explode the UI. A lightweight `lichen` category or a grouped `plants & lichens` presentation is enough as long as the game stops calling lichens plants.

## What Passed

- The four-zone sequence reads cleanly as `thin-canopy -> krummholz-belt -> dwarf-shrub -> lichen-fell`.
- The stress-gradient lesson is visible through both placement and note structure.
- Shared IDs for `arctic-willow` and `crowberry` are the right tundra-edge continuity pattern.
- The source ledger and implemented species list are aligned for the main treeline organisms and landmarks.
- The isolated rollout strategy stays disciplined: the biome is exportable and testable without destabilizing live travel yet.

## Queue Outcome

- `ECO-20260328-critic-11` can close with this report.
- Add one main follow-up before ecotones are wired live so lichens are not mislabeled in journal or field-guide surfaces.
- Parallel scout prep is now worthwhile for the next two main tasks: the five-biome journal selector and shared-species structure.
