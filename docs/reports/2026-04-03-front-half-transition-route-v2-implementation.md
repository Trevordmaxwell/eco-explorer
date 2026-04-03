# 2026-04-03 Front-Half Transition Route V2 Implementation

Implemented `ECO-20260403-main-197`.

## Scope

Convert the front-half coastal transition from the old back-dune inspect gate into one compact Route v2 transect without adding a new route type, a new station shell, or cross-biome request support.

## What Changed

- Converted `coastal-shelter-shift` in `src/engine/field-requests.ts` into an in-place `transect-evidence` outing:
  - `back-dune -> shore-pine-stand -> forest-edge`
  - `sand-verbena -> shore-pine -> nurse-log`
  - notebook identity: `Open To Shelter`
- Kept `coastal-edge-moisture` as the smaller forest-edge follow-on instead of folding both front-half coastal beats together.
- Updated the matching route-facing copy in `src/engine/field-season-board.ts` so the active `Coastal Shelter` beat, route summary, next-direction line, and marine-haze replay wording all describe the new open-to-pine-to-edge walk.
- Updated the compact `NEXT STOP` guidance in `src/engine/guided-field-season.ts` so the front-half station note now points at the same three-step transition.

## Test Coverage

- `src/test/field-requests.test.ts`
  - converts the coastal follow-on into a three-stage ordered transect
  - verifies `Open To Shelter` reaches `Ready To File`
  - keeps `coastal-edge-moisture` as the next request after filing
- `src/test/field-season-board.test.ts`
  - updates the live front-half summary, next-direction copy, and active beat detail for the new transition walk
- `src/test/guided-field-season.test.ts`
  - updates the compact `NEXT STOP` note and notice copy
- `src/test/runtime-smoke.test.ts`
  - adds one seeded coastal end-to-end proof for `sand-verbena -> shore-pine -> nurse-log`
  - verifies notebook-ready, note-tabs preview text, and filing from the existing station seam

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts src/test/guided-field-season.test.ts`
- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts src/test/guided-field-season.test.ts src/test/runtime-smoke.test.ts -t "Shore Shelter|Open To Shelter|NEXT STOP|moves the board from forest logging to station return and then coastal comparison|points to coastal scrub after trail stride is owned and settles after the next visit|turns the coastal front-half transition into a notebook-ready Open To Shelter outing and files it at the station"`
