# Coastal Scrub Review

Date: 2026-03-28

## Method

- read queue item `ECO-20260328-critic-07`, packet `006`, and the coastal-branch geography handoff
- reviewed:
  - `src/content/biomes/coastal-scrub.ts`
  - `src/test/coastal-scrub-biome.test.ts`
  - `src/content/biomes/beach.ts`
  - `docs/ecotone-design.md`
  - `docs/science-source-ledger.md`
- ran `npm test -- --run`
- ran `npm run build`

## Summary

The first Coastal Scrub pass is structurally good.

The four-zone gradient reads clearly, the facilitation lesson is visible in the note design, and keeping the biome export-only for now was the right stability choice.

The blocker is still geography, not shape. The implemented biome carries forward the same mixed Atlantic and Pacific species set that the source ledger and coastal-branch handoff already warned about.

## Findings

### 1. Coastal Scrub still includes Atlantic plant anchors that conflict with the Pacific forest branch

Files:

- `src/content/biomes/coastal-scrub.ts:8-18`
- `src/content/biomes/coastal-scrub.ts:30-39`

What is true:

- The current biome still uses `Spartina patens` and `Morella pensylvanica`.
- The source ledger already marks both as coastal-branch risks because the live forest and approved later chain lean Pacific.

Why it matters:

- The biome teaches a left-to-right habitat transition, so species choice is part of the lesson, not just decoration.
- Right now the zone logic says `Pacific coastal gradient`, but two of the headline shrubs and grasses still say `Atlantic or Mid-Atlantic`.
- That keeps the ecotone science-incoherent even though the structural work is otherwise solid.

Grounded recommendation:

- Treat `ECO-20260328-main-24` as the required next coastal task.
- Replace the Atlantic anchors in the implemented biome, not only in the design doc.

### 2. The shared beach edge currently imports the same Atlantic-leaning grass from the live beach

Files:

- `src/content/biomes/coastal-scrub.ts:7`
- `src/content/biomes/beach.ts:38-47`

What is true:

- Coastal Scrub reuses `beach-grass` directly from the beach biome.
- That shared entry is still `Ammophila breviligulata`, which the science ledger already flagged as pushing the coast toward an Atlantic or Great Lakes setting rather than the Pacific branch the map now implies.

Why it matters:

- Shared IDs are the right data model choice.
- But once a shared edge species is regionally off, the mismatch spreads into both biomes and makes later shared-species work harder.

Grounded recommendation:

- Keep the shared-ID pattern.
- Fix the underlying beach/coastal shared species as part of `main-24` instead of letting later branch work proceed around a known bad coastal base.

### 3. The source doc and the implemented biome are still aligned to the old mixed-coast draft

Files:

- `docs/ecotone-design.md:47-61`
- `src/content/biomes/coastal-scrub.ts:8-63`

What is true:

- The design doc still lists `Spartina patens` and `Morella pensylvanica`.
- The implementation follows that same list closely.

Why it matters:

- This is not just an implementation slip.
- The repo still has two competing truths: the scout handoff says `pivot Pacific`, while the active biome doc and code still preserve the earlier mixed draft.
- If that split stays around, future agents will keep rebuilding the same science drift.

Grounded recommendation:

- Update both the biome code and `docs/ecotone-design.md` in the same pass.
- After that pass, treat the Pacific coastal gradient as the standing source of truth for the left side of the chain.

## What Passed

- The zone order reads clearly as `back-dune -> shrub-thicket -> shore-pine-stand -> forest-edge`.
- The biome notes support the intended facilitation lesson instead of drifting into isolated trivia.
- Shared edge IDs for `beach-grass` and `sword-fern` are the right long-term continuity pattern.
- Keeping the biome exported but out of the live registry was a disciplined way to add content without destabilizing travel.

## Queue Outcome

- `ECO-20260328-critic-07` can close.
- `ECO-20260328-main-24` should stay the next coastal-branch task, but it now needs to update the already-landed `Coastal Scrub` implementation in addition to the live beach and source docs.
- `ECO-20260328-main-15` is still a valid later step, but the queue should keep the Pacific coastal cleanup ahead of further coastal-branch expansion.
