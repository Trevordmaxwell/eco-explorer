# 2026-04-02 Atlas-Facing Richness Implementation

Implemented `ECO-20260402-main-172` in lane 2.

## What Changed

- Tightened the pre-expedition `FIELD ATLAS` note family in `src/engine/field-season-board.ts` so the first three logged-route states now carry one short filed-memory prefix while still pointing toward the next outing.
- Left the later atlas notes unchanged for:
  - active `ROOT HOLLOW`
  - notebook-ready `ROOT HOLLOW`
  - filed `Season Threads`
  - filed `High Pass`
- Updated the station-state expectations in `src/test/field-season-board.test.ts` and the matching runtime checks in `src/test/runtime-smoke.test.ts`.

## Final Note Family

- one route logged:
  - `Coast filed. Inland shelter next.`
- two routes logged:
  - `Coast and ridge filed. Low-fell edge next.`
- three routes logged:
  - `Coast, ridge, edge filed. Root Hollow next.`

## Why This Shape

- The atlas strip still only has room for one compact note line.
- Lane 1 already established that `seasonWrap` handles recap while the atlas stays the quieter forward seam.
- A tiny filed-memory prefix gives the routes page more place memory without widening the shell or reopening archive structure.

## Verification

- `npm test -- --run src/test/field-season-board.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "switches the route board to treeline and can hand the outing guide to route marker|switches the route board to coastal scrub and can hand the outing guide to route marker|shows a route-logged stop cue in the field station once the live route is complete"`
- `npm run build`
- seeded browser proof in `output/lane-2-main-172-browser/`
  - `first-logged-route.png`
  - `root-hollow-ready.png`
  - `console-errors.json`

## Notes

- The broader `npm test -- --run src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts` sweep still hits one unrelated existing runtime-smoke failure in the field-request notice lane (`NOTEBOOK TASK` vs `FIELD STATION`), so this pass kept verification focused on the atlas-touching station states it actually changed.

## Outcome

- Close `ECO-20260402-main-172`.
- Promote `ECO-20260402-critic-145` to `READY`.
