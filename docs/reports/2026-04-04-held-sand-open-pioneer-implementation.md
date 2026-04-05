# 2026-04-04 Held-Sand Open-Pioneer Implementation

Implemented `ECO-20260404-main-270`.

## What Changed

- Extended `scrub-edge-pattern` so the active `Held Sand` replay window now adds `beach-grass` as a valid `open-pioneer` clue through the existing `activeSlotEntryIdsBySlotId` seam in `src/engine/field-requests.ts`.
- Added focused field-request coverage proving:
  - `beach-grass` does not fit the opening stage outside `Held Sand`
  - `beach-grass` does fit and advance that stage during active `Held Sand`
  - filed `Scrub Pattern` identity stays canonical while clue-backed text can now truthfully surface `American Dunegrass`
- Added focused runtime coverage proving the live game still frames the outing as `Held Sand` while carrying a `beach-grass`-opened first stage in progress.

## Why This Shape

- It keeps the second tactile opportunity pass inside the existing replay-aware route seam instead of adding another route-specific runtime branch.
- It changes real route opportunity on a different route family without widening the helper row, station shell, or replay UI.
- It keeps later stages and station copy stable, so the only behavior change is the live back-dune opening opportunity during `sand-capture`.

## Verification

- `npx vitest run src/test/field-requests.test.ts -t "Held Sand|beach-grass fit|scrub-edge-pattern is reframed"`
- `npx vitest run src/test/runtime-smoke.test.ts -t "Held Sand live after beach-grass|stable scrub pattern line during the Held Sand replay window"`
- `npx vitest run src/test/field-requests.test.ts src/test/runtime-smoke.test.ts -t "Held Sand|beach-grass|scrub pattern line during the Held Sand replay window"`
- `npm run build`
