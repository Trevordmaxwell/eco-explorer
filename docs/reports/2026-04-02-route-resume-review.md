# 2026-04-02 Route-Resume Review

## Verdict

No blocker.

`ECO-20260402-main-163` spends its budget in the right place. Reusing the existing replay strip on title resume makes saved route re-entry feel continuous without adding another recap layer, and the guided field-season chain still keeps the stronger priority seam.

## What Holds

- The resume cue now appears exactly where the player needs it. In the reviewed forest `Moist Edge` and tundra `Thaw Window` saves, pressing `Enter` from the title screen immediately restores the same authored replay strip instead of dropping the player back into the biome cold.
- The implementation stays inside the current lane-1 shell. It reuses the existing field-request notice strip and does not add a new station board, journal panel, planner row, or title-screen helper.
- Guided notices still behave like the main progression seam. The updated notice-priority helper lets `NOTEBOOK TASK -> FIELD STATION -> NEXT STOP -> SEASON THREADS` advance cleanly in sequence, while route replay notices still wait behind any active guided prompt instead of stealing focus.

## Watch Item

- The title-resume flow now depends on the shared field-notice priority rules a little more than before. If future lane-1 work adds another guided prompt family, keep it inside the same helper instead of layering a second priority check onto `startPlaying()`.

## Verification

- Re-ran `npx vitest run src/test/runtime-smoke.test.ts -t "route replay notice|starter note|route-logged stop cue|Root Hollow is ready to file"`
- Inspected `/Users/trevormaxwell/Desktop/game/output/lane-1-main-163-browser/resume-forest-with-notice.png`
- Inspected `/Users/trevormaxwell/Desktop/game/output/lane-1-main-163-browser/resume-tundra-with-notice.png`
- Checked `/Users/trevormaxwell/Desktop/game/output/lane-1-main-163-browser/console-messages.txt`; it still only shows the pre-existing browser-permission `not granted` noise

## Outcome

Promote `ECO-20260402-scout-132` to `READY`.
