# 2026-04-02 Season-Two Shell Review

## Scope

Review `ECO-20260402-main-146` and decide whether the routes-first season-two shell is cleaner than the older expedition-first opener without growing another planner surface.

## Result

No blocking issue.

The routes-first opener is the better live shell now that `High Pass` already has a real outing frame on `SEASON -> ROUTES`.

It keeps the strongest next-outing cues together:

- subtitle: `High Pass continues from Treeline Pass.`
- archive strip: `Root Hollow now leads to High Pass.`
- atlas note: `Next: take the High Pass from Treeline Pass.`
- `HIGH PASS / NEXT` launch card

That makes the season feel more settled than the older expedition-first opener, while the logged `ROOT HOLLOW` expedition page still stays available one tab right as the softer future-facing seam.

## What I Re-checked

- Focused `field-season-board` and `runtime-smoke` coverage for the season-capstone, recap, and next-season opener slice
- The shared client pass in `output/lane-1-main-146-client/`
- The seeded browser proof in `output/lane-1-main-146-browser/routes-shell-opener.png`
- `output/lane-1-main-146-browser/console-errors.json`

## Watch Item

The `HIGH PASS` launch-card detail line is now close to the handheld copy ceiling in the seeded browser proof. Future season-two or expedition-approach follow-ons should keep building from the existing routes subtitle, archive strip, atlas note, and expedition teaser instead of adding another line or another shell surface here.
