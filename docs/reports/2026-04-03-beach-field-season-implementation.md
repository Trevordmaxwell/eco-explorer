# 2026-04-03 Beach Field-Season Implementation

`ECO-20260402-main-178` is complete.

## What Changed

- The fresh-save first beat on `COASTAL SHELTER LINE` now reads `Beach To Hollow` instead of `Forest Hollow`.
- The fresh-save clue-facing wrap now says `Follow shelter inland and confirm the seep stone in the lower hollow.`
- The travel-facing next step now says `Travel inland to Forest Trail and find Hidden Hollow.`
- Starter guided copy now acknowledges the beach opener while still sending the player toward `Forest Trail`.

## Scope Kept

- The coastal season board still uses the existing three-beat shape.
- The underlying request id, beat id, replay-note hooks, and filing flow stayed unchanged.
- No new station page, filing step, or route type was added.

## Verification

- `npx vitest run src/test/field-season-board.test.ts src/test/guided-field-season.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "surfaces the first field-season guidance from starter note to next habitat pointer|uses a clue-facing today wrap when hand lens is the active outing support|keeps the today wrap travel-facing when route marker is the active outing support|keeps the today wrap notebook-first when note tabs is the active outing support|falls back to the active beat detail when place tab is selected outside the edge line|starts with the forest hollow beat active and the coastal line queued behind it"`
- `npm run build`
- Fresh-save browser proof at `output/lane-1-main-178-browser/starter-season-board.png`
- Browser console check at `output/lane-1-main-178-browser/console-errors.json` with `0` errors
