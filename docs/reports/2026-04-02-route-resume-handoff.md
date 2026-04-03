# 2026-04-02 Route-Resume Handoff

Prepared for `ECO-20260402-scout-125` in lane 1.

## Recommendation

Use the existing in-biome field-request notice strip as the route-resume seam when a player resumes from the title screen into a saved mid-route biome.

That is the smallest lane-1 move that improves return-session confidence without adding another recap panel, planner row, journal page, or station shell.

## Why This Seam

The runtime already has the right authored cue family for active route re-entry:

- [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts) already calls `maybeShowRouteReplayNoticeOnBiomeEnter()` when the player actively enters the live target biome.
- That helper already reuses the current field-request notice strip and the current `routeBoard.replayNote` title/text pair.

So the missing piece is not copy or another surface. The missing piece is that the same resume strip does not fire when a player reloads into that biome after a break.

## Current Live Gap

I checked the live build at `http://127.0.0.1:4189` with saved mid-route resumes in two representative states:

1. Forest replay window:
   - `Moist Edge` active
   - saved directly in `Forest Trail`
   - resume screenshot: [resume-forest-no-notice.png](/Users/trevormaxwell/Desktop/game/output/lane-1-scout-125-browser/resume-forest-no-notice.png)
2. Tundra process replay window:
   - `Thaw Window` active
   - saved directly in `Tundra Reach`
   - resume screenshot: [resume-tundra-no-notice.png](/Users/trevormaxwell/Desktop/game/output/lane-1-scout-125-browser/resume-tundra-no-notice.png)

In both cases, after pressing `Enter` from the title screen:

- `activeFieldRequest` is present
- `routeBoard.replayNote` is present
- the small `NOTEBOOK J` hint appears
- but `fieldRequestNotice` stays `null`

That means the player lands in the correct place with the correct active route, but the one calm “resume here” strip never appears unless they trigger a fresh biome-entry transition.

## Best Main-Agent Slice For `main-163`

Keep the change inside [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts) plus focused runtime coverage.

Recommended implementation shape:

1. Reuse the existing replay-notice helper instead of inventing new copy or state.
2. In `startPlaying()`, after the title-screen transition flips to `playing`, attempt the same replay notice for the current biome context.
3. Let the existing `fieldRequestNotice` guard keep starter or other higher-priority notices from being overwritten.
4. Leave station layout, journal layout, and world-map structure unchanged.

## Why Not Other Seams

- Do not add another routes-page wrap variant just for resume.
- Do not add another journal card or bottom strip.
- Do not change `FIELD ATLAS` copy again in this pass.

Those would widen the shell. The current gap is specifically at the moment of re-entry after loading a save, and the existing field-request notice strip is already the right surface for that moment.

## Verification Target For `main-163`

- focused `runtime-smoke` coverage for:
  - resume from title into a saved forest `Moist Edge` state now shows the replay notice
  - resume from title into a saved tundra `Thaw Window` state now shows the replay notice
  - starter and stop-point paths still keep their own notice priority
- `npm run build`
- one seeded browser proof that the resumed forest or tundra state now shows the strip without adding new HUD chrome

## Queue Guidance

- Close `ECO-20260402-scout-125` with this handoff.
- Bump packet `060` to version `3` so the route-resume follow-on explicitly targets title-screen resume into saved replay states.
- Promote `ECO-20260402-main-163` to `READY`.
