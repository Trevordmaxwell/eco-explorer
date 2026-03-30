# Nursery-Forward Field Adventure

## Summary

The first nursery-forward gameplay wave is now live as a compact field-station subview instead of a separate hub or management screen. The station now splits into `SEASON | NURSERY`, keeping route progression primary while adding a calmer teaching-garden loop that makes the game feel more game-like without drifting into farming or selling.

## Landed Scope

- Added a nursery state model to save data with `nurseryResources`, `nurseryProjects`, `nurseryUnlockedExtraIds`, `nurseryClaimedRewardIds`, and a deterministic `nurseryLastProcessedWorldStep` sync seam.
- Added `src/engine/nursery.ts` as the main nursery logic surface for:
  - safe gathering rules
  - project definitions
  - automatic compost processing
  - project growth across world steps
  - reward claiming
  - habitat-extra unlocks
- Added safe direct gathering from clearly limited sources:
  - `bull-kelp-wrack` and `nurse-log` for `litter`
  - `fir-cone`, `beach-strawberry`, `salmonberry`, and `crowberry` for `seed-stock`
  - `sand-verbena`, `dune-lupine`, and `mountain-avens` for `cuttings` only after route gates
- Added one compact nursery UI in the field station with:
  - `Propagation Bench`
  - `Compost Heap`
  - `Teaching Bed`
- Added the first six growable projects:
  - `sand-verbena`
  - `dune-lupine`
  - `mountain-avens`
  - `beach-strawberry`
  - `salmonberry`
  - `crowberry`
- Added low-maintenance growth through the short stage ladder:
  - `stocked -> rooting -> growing -> mature`
- Added the first reward mix:
  - route-support clues from mature route plants
  - beauty-oriented station growth from mature edible/coastal plants
  - one small utility via `crowberry`, which improves compost throughput
- Added the first habitat extras:
  - `Log Pile`
  - `Pollinator Patch`

## Design Calls

- The nursery stays a **field-station subview**, not a separate walkable location.
- Nursery collection stays **science-safe and selective**, not broad harvesting.
- Compost stays **automatic between world steps**, not a repeated chore.
- The teaching bed stays **single-project** in v1.
- Route support currently lands as **field-station clue text**, not a larger progression shell or comparison override.

## Follow-On

- `critic-agent` should review the nursery as one combined gameplay pass instead of trying to reconstruct the original wave-by-wave plan after implementation.
- `scout-agent` can now prep `Edge Pattern Line` with nursery hooks.
- `main-agent` should wait for the nursery review before opening the next live route.
