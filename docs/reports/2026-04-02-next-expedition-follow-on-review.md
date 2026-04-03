# 2026-04-02 Next Expedition Follow-On Review

## Scope

Review `ECO-20260402-main-171` and decide whether the logged-expedition footer now makes the next chapter feel present without adding noise or false readiness.

## Verdict

No blocker.

## What Holds

- The logged `ROOT HOLLOW` page now reads like a real progression seam instead of placeholder UI. `Treeline Pass waits beyond Root Hollow.` keeps the footer future-facing while still sounding softer than an action command.
- The escalation is cleaner across the two expedition states. Before the season is filed, the footer is location-led; after the season is filed, the existing `High Pass waits beyond Root Hollow.` line still upgrades that hint into the later outing-led version.
- The expedition page stays shell-light. The fresh handheld proof in [expedition-teaser.png](/Users/trevormaxwell/Desktop/game/output/lane-1-main-171-browser/expedition-teaser.png) shows the line fitting inside the existing footer strip without forcing another row, card, or recap seam.

## Watch Item

- The logged-expedition footer is now using about as much calm copy budget as this strip can safely hold. Future lane-1 follow-ons should keep reusing this location-led to outing-led progression instead of adding another intermediary teaser or another expedition-facing helper row.

## Verification

- Re-ran `npx vitest run src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts -t "expedition"`
- Reviewed [expedition-teaser.png](/Users/trevormaxwell/Desktop/game/output/lane-1-main-171-browser/expedition-teaser.png)
- Rechecked browser console output: only repeated `not granted` permission noise, no new app errors

## Outcome

Close `ECO-20260402-critic-144`. Packet `064` is complete for lane 1.
