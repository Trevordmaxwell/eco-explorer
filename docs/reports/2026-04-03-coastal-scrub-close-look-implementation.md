# 2026-04-03 Coastal-Scrub Close-Look Implementation

Implemented `ECO-20260402-main-185` in lane 2.

## What Landed

- Added exactly three coastal-scrub entries to the close-look allowlist in `src/engine/close-look.ts`:
  - `nootka-rose`
  - `kinnikinnick`
  - `nurse-log`
- Kept the pass close-look-only. No journal layout, atlas copy, comparison, or broader biome-system work changed.
- Added focused guardrail coverage in `src/test/close-look.test.ts` so the new trio stays supported while nearby non-candidates like `shore-pine` and `pacific-wax-myrtle` remain out of the first pass.

## Payload Shape

- `nootka-rose`: `thorny stem`, `rose hip`
- `kinnikinnick`: `red berries`, `evergreen leaves`
- `nurse-log`: `soft old wood`, `held moisture`

All three cards keep one short sentence and handheld-scale sprite sizing.

## Verification

- `npm test -- --run src/test/close-look.test.ts src/test/content-quality.test.ts`
- `npm run build`
- required shared client smoke:
  - `output/lane-2-main-185-client/`
- seeded browser close-look captures:
  - `output/lane-2-main-185-browser/nootka-rose.png`
  - `output/lane-2-main-185-browser/kinnikinnick.png`
  - state captures:
    - `output/lane-2-main-185-browser/nootka-rose-state.json`
    - `output/lane-2-main-185-browser/kinnikinnick-state.json`

## Notes For Review

- The two plant cards now have live browser proof in their intended scrub zones.
- `nurse-log` is implemented and covered by the focused close-look tests, but the landmark sits deep enough in the forest-edge cluster that the quick browser automation used for this lane captured its nearby state more reliably than a clean close-look overlay without building a larger pathing script.

## Queue Outcome

- Close `ECO-20260402-main-185`.
- Promote `ECO-20260402-critic-158` to `READY`.
