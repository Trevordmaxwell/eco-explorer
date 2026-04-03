# 2026-04-02 Stop-Point Rhythm Handoff

Prepared for `ECO-20260402-scout-124` in lane 1.

## Recommendation

Use the existing routes-page top strip as the stop-point seam again once a route is fully logged, and let the atlas keep owning the explicit next-action sentence.

That is the smallest lane-1 move that improves pause-and-resume rhythm without opening another recap screen, planner strip, or support row.

## Why This Seam

The current later-season states are already carrying the next step in two places:

- the atlas note on the routes page
- the routes-page top strip

That duplication is exactly where the soft "you can stop here" rhythm got lost.

The code already hints at the right mood in [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts): the complete-route wrap still has a fallback `Good stopping point. Rest here or tend the nursery.` line, but the newer atlas note now fills the branch first, so the later lane-1 states no longer reach that softer stop cue.

## Current Live Gap

I checked the current state in two ways:

- direct state audit with `npx tsx` against `resolveFieldSeasonWrapState()`
- live browser `render_game_to_text()` checks on the local build at `http://127.0.0.1:4189`

The same pattern shows up in both:

### 1. Route-logged state duplicates the next step instead of granting a pause beat

Current routes-shell state after `EDGE PATTERN LINE` is logged:

- wrap: `Edge line logged. Root Hollow opens below.`
- atlas: `Next: open Root Hollow below the forest.`
- expedition card note: `Start when you want a longer forest outing.`

The expedition card already does the calm permission job. The wrap does not need to repeat the action line again.

### 2. Ready-to-file expedition state is even more direct and more redundant

Current routes-shell state when `Root Hollow` is notebook-ready:

- wrap: `File the Root Hollow note.`
- atlas: `Next: file the Root Hollow note.`
- expedition card: `NOTE READY`

This is the clearest stop-point miss in the current shell. The strip and atlas say the same thing, so the routes page loses any softer sense of chapter closure.

### 3. The filed `High Pass` shell should stay out of scope

The new filed-season routes shell is already near its calm handheld ceiling:

- subtitle
- archive strip
- one-line `HIGH PASS / NEXT` card
- atlas note

Do not spend the stop-point pass there. That state already reads correctly and just finished the board-calm review.

## Best Main-Agent Slice For `main-162`

Keep the change inside [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts) and the focused lane-1 tests.

Recommended implementation shape:

1. Add one helper for complete-route, non-archive stop-point wrap text.
2. Use that helper only when `routeBoard.complete` is `true` and no season archive is active.
3. Leave active `TODAY`, `NOTEBOOK READY`, and filed `SEASON ARCHIVE` states unchanged.
4. Keep the atlas note as the explicit next step.

## Suggested Copy Direction

The wrap should feel like permission to pause, not a second task prompt.

Good targets:

- route just logged: `Good stopping point. Root Hollow waits below.`
- expedition active: `Good stopping point. Root Hollow is still open below.`
- expedition note ready: `Good stopping point. Root Hollow note is ready when you return.`
- season capstone open: `Good stopping point. Season Threads waits in Forest Trail.`

These do not need to be exact final strings, but the family should stay:

- calm
- chapter-aware
- non-managerial
- shorter than the atlas line

## Keep Out Of Scope

Leave these for later:

- changing the filed `High Pass` archive shell
- adding a new resume card to the journal
- adding another world-map footer state
- changing expedition-page layout
- adding more support-row behavior

Those belong to later follow-ons, especially `scout-125` and `main-163`.

## Verification Target For `main-162`

- focused `field-season-board` coverage for complete-route stop cues
- focused `runtime-smoke` checks for:
  - route logged before `Root Hollow`
  - `Root Hollow` ready to file
  - season-capstone-open routes shell
- `npm run build`
- one seeded browser proof that the routes page still feels calm at `256x160`

## Queue Guidance

- Close `ECO-20260402-scout-124` with this handoff.
- Bump packet `060` to version `2` so the stop-point pass explicitly restores the top-strip stop cue while the atlas keeps the action line.
- Promote `ECO-20260402-main-162` to `READY`.
