# 2026-04-02 Expedition-Approach Review

## Scope

Review `ECO-20260402-main-147` and decide whether the expedition-facing approach cue now makes the next chapter feel present without turning the expedition page into a second launch surface.

## Result

No blocking issue.

The new footer line is the right size and tone for this page.

`High Pass waits beyond Root Hollow.` reads like quiet anticipation instead of an instruction, which is the correct distinction now that:

- `SEASON -> ROUTES` already owns the live `High Pass` outing
- the expedition page should stay the softer future-facing seam

The page still keeps the right structure:

- subtitle: `High Pass opens the next field season.`
- one logged `ROOT HOLLOW` card
- one tiny `NEXT FIELD SEASON` strip
- the same intentional map handoff when the player explicitly opens this page and presses `Enter`

## What I Re-checked

- Focused `field-season-board` and `runtime-smoke` coverage for the season-two opener and expedition-footer slice
- The shared client pass in `output/lane-1-main-147-client/`
- The seeded browser proof in `output/lane-1-main-147-browser/expedition-approach.png`
- `output/lane-1-main-147-browser/console-errors.json`

## Watch Item

The expedition page is now at a good compact ceiling. Future lane-1 follow-ons should keep using the existing subtitle or footer strip if they need more future-facing nuance, and should avoid adding another line, another card, or a second launch affordance to this page.
