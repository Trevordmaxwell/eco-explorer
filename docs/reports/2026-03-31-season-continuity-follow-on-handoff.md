# 2026-03-31 Season Continuity Follow-On Handoff

## Scope

Complete `ECO-20260331-scout-93` and narrow `ECO-20260331-main-131` to one compact lane-1 continuity pass.

## Summary

`main-130` solved the biggest visibility problem: `High Pass` is now unmistakably live on `SEASON -> ROUTES`.

The next gap is smaller and more specific. The filed-season state still feels slightly stitched together because the three existing surfaces are not carrying the same chapter handoff with the same tone:

- the routes page still opens with an archive-first subtitle and strip
- the logged expedition card still uses a generic teaser line
- the world map already has the strongest continuity cue through `Today: High Pass` plus `FROM FOREST TRAIL`

That means `main-131` should not add another card, note, or planner seam. It should make the routes page and the logged expedition card sound like they belong to the same carried-forward adventure thread the map is already showing.

## Findings

### 1. The routes page still splits past and future too hard

In the filed-season state after `main-130`, the routes page now has the right middle focus:

- launch card: `HIGH PASS / NEXT`
- atlas note: `Next: take the High Pass from Treeline Pass.`

But the surrounding archive seams still lean backward:

- subtitle: `This season is filed. Another field season can open here later.`
- archive strip: `Coast, ridge, and Root Hollow filed.`

That makes the page read like two separate states stacked together instead of one season carrying into the next.

### 2. The logged expedition card still sounds adjacent to the handoff, not part of it

The logged `ROOT HOLLOW` card is already the right structural seam, but its footer teaser is still the loosest wording in the whole handoff:

- `NEXT FIELD SEASON`
- `Take the High Pass next.`

That is readable, but it does not reuse the more specific `Treeline Pass` / `High Pass` vocabulary already present on the routes page and world map. The result is calm, but not quite continuous.

### 3. The world map already has the right carry-forward pattern

The seeded next-season map state is the clearest current continuity seam:

- location: `TREELINE PASS`
- footer label: `Today: High Pass`
- origin: `FROM FOREST TRAIL`

This is the right ceiling. `main-131` should make routes and expedition copy echo this travel-facing structure instead of inventing a new recap sentence or broader map UI.

### 4. The smallest clean implementation seam is one shared continuity phrasing layer

`main-131` should not hardcode one more independent wording branch.

The cleanest pass is to derive one tiny continuity family from the existing next-season / active-outing state and reuse it across:

- the archived routes subtitle
- the archive strip text
- the logged expedition teaser

The world map should stay structurally the same and act as the truth source the station copy now catches up to.

## Recommended `main-131` Pass

Keep `main-131` to one three-part change set:

1. Add one small continuity helper derived from the current next-season outing state.
2. Use it on `SEASON -> ROUTES` so the archive strip and routes subtitle no longer sound like the next season is only hypothetical.
3. Use that same continuity family on the logged `ROOT HOLLOW` teaser so the expedition seam feels like the carried-forward bridge into `Treeline Pass` rather than a separate prompt voice.

## Concrete Target Surfaces

### Routes

Touch only the existing archive-facing seams:

- `seasonWrap` archive text
- filed-season routes subtitle

Do not reopen the launch-card layout or add another strip.

### Expedition

Touch only the logged expedition teaser text.

Do not add another expedition card, recap block, or extra chapter note.

### Map

Keep the current structure:

- `Today: High Pass`
- `FROM FOREST TRAIL`

If code changes are needed here at all, they should only stabilize or reuse the existing cue, not widen it.

## Keep Out Of Scope

Do not:

- add a new station page
- add a recap panel or chapter-history block
- turn the archive strip into a badge wall
- add a new map banner or planner shell
- reopen the `HIGH PASS` launch-card layout

## Likely File Targets

- `src/engine/field-season-board.ts`
- `src/engine/game.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Suggested Verification For `main-131`

- add focused `field-season-board` coverage for the filed-season archive text and subtitle path
- add `runtime-smoke` coverage showing:
  - the filed-season routes page now reads like a live continuation, not a finished dead end
  - the logged expedition teaser uses the same continuity family as the routes page
  - the `Treeline Pass` map focus still keeps the existing `Today: High Pass` plus `FROM FOREST TRAIL` pairing
- run `npm run build`
- do one seeded browser capture that shows both:
  - `SEASON -> ROUTES`
  - `SEASON -> EXPEDITION`

## Queue Guidance

- close `ECO-20260331-scout-93`
- promote `ECO-20260331-main-131` to `READY`
- keep `ECO-20260331-critic-104` blocked until the continuity pass lands
