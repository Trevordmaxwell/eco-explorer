# Next-Chapter Shell And Expedition Render Split Review

## Queue Ref

- `ECO-20260416-critic-307`

## Verdict

Clean review. No blocker.

## What Holds Up

- The filed-season chapter pivot stays inside the approved shell. [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts) turns the old `NEXT FIELD SEASON` footer into one real `HIGH PASS / NEXT` card instead of adding another station page, planner strip, or second expedition card.
- The protection pass lands in the right place. [field-station-expedition-page.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-station-expedition-page.ts) now owns the expedition card body, and [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts) is back to shell framing plus page switching, matching the earlier routes and nursery splits.
- The activation path still reads cleanly. Keeping the internal expedition status on the existing logged branch lets [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts) preserve the current “press Enter to go to the next season target” behavior without reopening a broader coordinator decision in this sprint.
- The tests are proportionate to the change: [field-season-board.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-season-board.test.ts), [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts), and the build together cover the new chapter card plus the render split without bloating the review surface.

## Watch Item

If lane 1 broadens the expedition shell again, consider giving the filed-season chapter card its own explicit status instead of continuing to piggyback on the internal `logged` state. It is fine for this sprint because it keeps the activation path stable, but a future richer chapter flow could make that overloading harder to read.
