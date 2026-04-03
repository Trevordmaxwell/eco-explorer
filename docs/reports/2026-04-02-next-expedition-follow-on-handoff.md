# 2026-04-02 Next Expedition Follow-On Handoff

## Scope

Complete `ECO-20260402-scout-133` and narrow `ECO-20260402-main-171` to one tiny logged-expedition follow-on.

## Summary

The remaining lane-1 drift is now very small.

After `main-170`, the routes shell and the journal outing card already carry the stronger regional bridge:

- `Treeline Pass carries the season toward High Pass.`

The expedition page should not compete with that work.

Its only weak spot is the pre-filed logged footer:

- label: `NEXT EXPEDITION`
- text: `Another special outing can open here later.`

That line is structurally correct, but it is still generic enough to sound like placeholder UI instead of a quiet future chapter cue.

## Current Read

The live logged `ROOT HOLLOW` page before `forest-season-threads` is filed already has the right structure:

- one logged `ROOT HOLLOW` card
- one tiny footer strip
- no second launch card
- no extra planner shell

The footer is rendered as a single fitted line in `src/engine/overlay-render.ts`, so the copy budget is tight and should stay tighter than the later:

- `NEXT FIELD SEASON`
- `High Pass waits beyond Root Hollow.`

## Key Finding

`main-171` should touch only the pre-filed branch of `resolveNextSeasonSetupTeaser()` in `src/engine/field-season-board.ts`.

Do not:

- add another station page
- add another expedition card
- touch the routes shell again
- touch the journal outing card again
- rewrite the later `NEXT FIELD SEASON` footer

## Recommended `main-171` Pass

### 1. Keep the existing teaser strip structure

Leave in place:

- `label: 'NEXT EXPEDITION'`
- the logged `ROOT HOLLOW` card
- the later season-filed teaser branch:
  - `label: 'NEXT FIELD SEASON'`
  - `text: 'High Pass waits beyond Root Hollow.'`

### 2. Replace the generic placeholder line with one place-led hint

Use the future target location rather than a second active command.

Best implementation shape:

- derive the next location label from the existing next-season target seam or the `NEXT_FIELD_SEASON_TARGET_BIOME_ID` fallback
- keep the teaser text to one short line such as:
  - `Treeline Pass waits beyond Root Hollow.`

That gives the logged expedition page a softer progression:

- before the season is filed: location-led hint
- after the season is filed: outing-led `High Pass` hint

### 3. Keep the pass local to the expedition shell

The right outcome is a calmer logged-expedition footer, not a broader season rewrite.

Best file targets:

- `src/engine/field-season-board.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Suggested Verification For `main-171`

- update the logged-expedition teaser expectation in `field-season-board.test.ts`
- update the runtime-smoke assertion for the logged `ROOT HOLLOW` page before `forest-season-threads` is filed
- run the focused lane-1 expedition slice
- run `npm run build`
- capture one seeded browser proof of the logged expedition page and confirm the footer still fits as one calm line

## Queue Guidance

- close `ECO-20260402-scout-133`
- promote `ECO-20260402-main-171` to `READY`
