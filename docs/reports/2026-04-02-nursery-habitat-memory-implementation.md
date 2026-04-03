# 2026-04-02 Nursery Habitat Memory Implementation

Implemented `ECO-20260402-main-164` in lane 2.

## What Changed

- Added one optional `memorySummary` field to `NurseryProjectDefinition`.
- Authored that field for only three mature-bed plants:
  - `sand-verbena-bed`
  - `salmonberry-bed`
  - `crowberry-bed`
- Kept the new memory line inside the existing `TEACHING BED` footer seam, replacing the mature clear-the-bed footer only when a memory line exists.

## Why This Shape

- The nursery stays secondary to the rest of the station.
- No save data, route-support rules, or station structure changed.
- The place-memory payoff now appears where the bed already feels most personal, instead of spreading across new cards or another notebook surface.

## Verification

- `npm test -- --run src/test/nursery.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t nursery`
- `npm run build`
- live browser proof in `output/lane-2-main-164-browser/`
  - `salmonberry-nursery.png`
  - `salmonberry-state.json`
  - `crowberry-nursery.png`
  - `crowberry-state.json`
  - `console-errors.json`

## Outcome

- Close `ECO-20260402-main-164`.
- Promote `ECO-20260402-critic-137` to `READY`.
