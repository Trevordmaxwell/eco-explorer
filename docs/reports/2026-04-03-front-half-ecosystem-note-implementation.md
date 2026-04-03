# 2026-04-03 Front-Half Ecosystem Note Implementation

Implemented `ECO-20260402-main-190` in lane 2.

## What Landed

- Added one new beach ecosystem note in `src/content/biomes/beach.ts`:
  - `surf-food-line`
- Added one new coastal-scrub ecosystem note in `src/content/biomes/coastal-scrub.ts`:
  - `runner-hold-start`
- Revised the existing beach `shelter-line-start` note so its `zoneId` now matches the live `sea-rocket` carrier on `dune-edge`.
- Revised the existing coastal-scrub `thicket-cover` note so it now uses fully local shrub-thicket carriers instead of leaning on `forest-edge` `salmonberry`.
- Added focused resolver coverage in `src/test/ecosystem-notes.test.ts` so `sanderling` now surfaces the new beach note and coastal-scrub `beach-pea` now surfaces the new back-dune note.

## Final Note Set

- `surf-food-line`
  - biome: `beach`
  - entries: `sanderling`, `pacific-sand-crab`, `bull-kelp-wrack`
  - zone: `tide-line`
- `shelter-line-start`
  - biome: `beach`
  - entries unchanged
  - zone: `dune-edge`
- `runner-hold-start`
  - biome: `coastal-scrub`
  - entries: `beach-pea`, `beach-grass`, `dune-lupine`
  - zone: `back-dune`
- `thicket-cover`
  - biome: `coastal-scrub`
  - entries: `pacific-wax-myrtle`, `coyote-brush`, `nootka-rose`, `deer-mouse`
  - zone: `shrub-thicket`

## Why This Shape

- The pass favored entries that did not already have a local note payoff, so the new notes actually surface under the current “first unlocked matching note” resolver.
- The revisions stayed inside the existing front-half note ids that already feed other live seams, avoiding field-partner, route-board, or field-request drift.
- No new science-ledger rows were needed because the pass only reorganized already-supported front-half species into clearer local relationships.

## Verification

- `npm test -- --run src/test/ecosystem-notes.test.ts src/test/content-quality.test.ts src/test/journal.test.ts`
- `npm run build`

## Queue Outcome

- Close `ECO-20260402-main-190`.
- Promote `ECO-20260402-critic-163` to `READY`.
