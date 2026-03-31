# 2026-03-30 Second-Season District Invitation Review

## Scope

Review `ECO-20260330-critic-91` after `ECO-20260330-main-116`.

## Result

No blocking issues.

The invitation now lands at the right scale:

- it stays on the existing logged `ROOT HOLLOW` footer
- it echoes the new regional travel language instead of inventing another naming seam
- it reads cleanly at the live handheld budget

Lane 1 can close this packet without reopening station density or map-planner drift.

## What Held Up

### 1. The invitation stayed singular

Keeping the next-season pull on the logged expedition footer was still the right restraint. The player gets one clear forward nudge, but the station does not grow another card, subtitle layer, or route panel.

### 2. The copy now matches the travel lane

`Take the High Pass next.` is a better fit than the older inland-approach sentence:

- it is shorter
- it is more spatially concrete
- it matches the live `HIGH PASS` map language the player already sees during travel

That makes the station and map feel like they belong to the same chapter vocabulary.

### 3. The handheld read is now safe

The new browser artifact shows the footer fitting comfortably inside the logged expedition strip at `256x160`. This is the most important practical win in the pass because the previous sentence was already too close to the text budget edge.

## Evidence

- Focused test passed:
  - `npm test -- --run src/test/field-season-board.test.ts`
- Targeted season-close runtime test passed:
  - `npm test -- --run src/test/runtime-smoke.test.ts -t "points back to station once logged"`
- Full suite passed:
  - `npm test`
- Build passed:
  - `npm run build`
- Seeded browser artifact was clean:
  - `output/lane-1-main-116-browser/expedition-state.json`
  - `output/lane-1-main-116-browser/expedition-teaser.png`
  - `output/lane-1-main-116-browser/console-errors.json`

## Watch Item

If a future lane turns the next season into a larger playable chapter, keep that work separate from this teaser. This footer is now doing the right small job; it should not be stretched into a mini planner or a second route board.

## Queue Guidance

- Close `ECO-20260330-critic-91`.
- Do not promote another lane-1 packet automatically from this review; the active lane-1 chain is cleanly drained.
