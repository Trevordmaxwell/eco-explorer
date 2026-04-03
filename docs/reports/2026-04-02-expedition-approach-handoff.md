# 2026-04-02 Expedition-Approach Handoff

## Scope

Complete `ECO-20260402-scout-109` and narrow `ECO-20260402-main-147` to one tiny expedition-facing seam.

## Summary

After `main-146`, the active `High Pass` season shell now lives where it should:

- `SEASON -> ROUTES` leads with the subtitle, archive strip, atlas note, and `HIGH PASS / NEXT` card

That means the expedition page no longer needs to carry the main next-outing job.

It only needs to make the next big chapter feel quietly present.

## Current Read

The live expedition page is now:

- subtitle: `High Pass opens the next field season.`
- one logged `ROOT HOLLOW` chapter card
- one tiny footer strip:
  - label: `NEXT FIELD SEASON`
  - text: `Follow Root Hollow into High Pass.`

The fresh browser proof in `output/lane-1-scout-109-browser/expedition-approach.png` confirms the page is already at the right structural size.

The weak spot is that the footer still reads like an action command.

That was fine when the expedition page was also the default opener, but it now competes with the routes shell:

- routes now says what the player should do next
- expedition should now say what larger chapter is waiting beyond the filed forest chapter

## Key Finding

`main-147` should touch only the expedition teaser strip.

Do not:

- add a new station page
- add another card
- rewrite the routes shell again
- make the expedition page feel like a second launch surface

The best seam is the existing logged-expedition teaser returned by `resolveNextSeasonSetupTeaser()` in `src/engine/field-season-board.ts`.

## Recommended `main-147` Pass

### 1. Keep the expedition page structure exactly as it is

Leave in place:

- subtitle: `High Pass opens the next field season.`
- the logged `ROOT HOLLOW` card
- the expedition-page `Enter` handoff into the focused world map

### 2. Turn the footer strip into an approach cue, not a command

Change only the logged-expedition teaser text so it feels future-facing but not currently playable.

Best implementation shape:

- keep the existing `NEXT FIELD SEASON` label
- reuse the existing approach-label seam already available through `nextSeasonApproach`
- use that seam for a calmer footer such as:
  - `High Pass waits beyond Root Hollow.`

That keeps the page distinct from the routes shell:

- routes = active outing
- expedition = quiet chapter approach

### 3. Keep the copy smaller, not broader

The expedition page already reads close to its handheld copy ceiling.

So `main-147` should prefer one shorter footer line over any attempt to add:

- a second teaser line
- another recap line in the card
- another launch affordance

## Best File Targets For `main-147`

- `src/engine/field-season-board.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Suggested Verification For `main-147`

- update the logged-expedition teaser expectation in `field-season-board.test.ts`
- update the season-two runtime slice so the expedition page still sits one tab right from the routes shell and now shows the calmer footer line
- keep proof that the expedition-page `Enter` handoff still focuses the world map on `Treeline Pass`
- run the focused lane-1 season-two test slice
- run `npm run build`
- capture one seeded browser proof of the expedition page at `output/lane-1-main-147-browser/`

## Queue Guidance

- close `ECO-20260402-scout-109`
- promote `ECO-20260402-main-147` to `READY`
