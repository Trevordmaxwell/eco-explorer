# 2026-03-30 Finished Expedition Review

## Scope

Review `ECO-20260330-critic-62`: the finished `ROOT HOLLOW` expedition chapter after `ECO-20260330-main-85`.

## Result

No blocking issues.

The finished expedition now clears the bar for a durable first chapter pattern:

- the chapter still reads like one calm forest outing instead of a fourth route row
- the new support hook stays optional and off to the side
- the added notebook content deepens the live spaces instead of asking a reward system to create the feeling of depth

## What Held Up

### 1. The support hook stayed small

Reusing `Route Marker` was the right move. It helps the player re-enter `Forest Trail` when the expedition is live, but it does not add another panel, upgrade row, or expedition-specific subsystem.

### 2. The chapter now has better authored noticing support

The new `root-hollow` moisture prompt and partner cue give the lower hollow and climb pocket a stronger field-notebook identity. The upper-run timing cue also lands more reliably now that it is not dusk-only, which gives the re-entry leg a cleaner notebook echo.

### 3. The station still feels calm

The important structural win from the previous review held. `EXPEDITION` is still one card, the routes page still does the handoff work, and the new support pass did not turn the station into a dashboard.

## Watch Item

The new route-marker fallback is correctly tiny for the current single-expedition phase, but it is intentionally forest-specific. If a future pass ever introduces a second real playable expedition, this should become expedition-target driven instead of staying hard-coded to `Forest Trail`.

That is not a blocker for `main-89`, because the queued next step is only a teaser, not a second live chapter.

## Verification

- Focused tests: `npm test -- --run src/test/observation-prompts.test.ts src/test/field-partner.test.ts src/test/runtime-smoke.test.ts`
- Full test suite: `npm test`
- Build: `npm run build`
- Queue validation: `npm run validate:agents`
- Live browser pass at `http://127.0.0.1:4189/` confirmed:
  - the expedition-ready world map now reports `routeMarkerLocationId: "forest"`
  - the expedition remains `READY` with the routes page handing off into `ROOT HOLLOW`
  - browser console errors stayed at `0`

## Queue Guidance

- Close `ECO-20260330-critic-62`.
- Promote `ECO-20260330-main-89` to `READY`.
- Keep the teaser compact and notebook-like rather than turning it into a second live expedition card.
