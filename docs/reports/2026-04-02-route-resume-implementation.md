# 2026-04-02 Route-Resume Implementation

## Scope

Complete `ECO-20260402-main-163` by restoring the existing replay notice strip when a player resumes from the title screen into a saved active-route biome.

## What Changed

- [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts) now reuses `maybeShowRouteReplayNoticeOnBiomeEnter()` from `startPlaying()` when the player leaves the title screen, so saved `Moist Edge` and `Thaw Window` replay states now surface their authored notice strip immediately on resume.
- The same file now lets guided field-season notices replace earlier guided notices in sequence, so the `NOTEBOOK TASK -> FIELD STATION -> NEXT STOP` chain does not depend on the old notice timer expiring first.
- [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts) now covers forest and tundra title-resume replay states while the existing starter and route-logged stop-cue checks continue to guard notice priority and the calmer later-season strip.

## Result

Mid-route resumes now feel like a continuation instead of a cold drop back into the biome. The player lands in the right place and immediately gets the same small authored replay strip they would have seen on a fresh biome-entry transition.

## Verification

- `npx vitest run src/test/runtime-smoke.test.ts -t "route replay notice|starter note|route-logged stop cue"`
- `npm run build`
- shared client run in [output/lane-1-main-163-client](/Users/trevormaxwell/Desktop/game/output/lane-1-main-163-client)
- seeded browser proof in [resume-forest-with-notice.png](/Users/trevormaxwell/Desktop/game/output/lane-1-main-163-browser/resume-forest-with-notice.png) and [resume-tundra-with-notice.png](/Users/trevormaxwell/Desktop/game/output/lane-1-main-163-browser/resume-tundra-with-notice.png)

## Notes

Playwright MCP still emitted the same browser-permission `not granted` noise seen in earlier lane checks. I did not treat that as a regression in the route-resume seam itself.
