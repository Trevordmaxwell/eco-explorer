# 2026-04-02 Return Recap Handoff

## Scope

Complete `ECO-20260402-scout-101` and narrow `ECO-20260402-main-139` to one compact lane-1 return-recap pass.

## Summary

The current return loop already has the right surfaces.

The station uses:

- one compact `seasonWrap` strip
- one secondary `FIELD ATLAS` strip
- one central route board

The remaining weakness is not missing structure. It is that the logged-return state spends its smallest closure seam on pure next-step language.

Right now, once a route or chapter is fully logged, the top strip and atlas note both point forward, so the player loses the tiny “what just became clear” recap that would make the station feel more intentionally closed.

## Current Read

The key shared branch is in `resolveFieldSeasonWrapState()`:

- when `routeBoard.complete` and no archive is active, the strip currently falls back to `atlas.note`
- that means the top strip duplicates the atlas instead of doing recap work

Current examples from live logic and tests:

- after `edge-pattern-line` closes, `seasonWrap` is `ROUTE LOGGED / Open Root Hollow below the forest.`
- after `forest-expedition-upper-run` closes, `seasonWrap` is `ROUTE LOGGED / Tie coast and hollow in Forest Trail.`

Both are useful next pointers, but both skip the “what changed” beat even though `routeBoard.summary` already carries a stronger closure phrase:

- `Edge line logged. Next: open the Root Hollow expedition.`
- `Root Hollow reconnects the season. Tie the threads together back in Forest Trail.`

## Key Finding

The cleanest `main-139` pass is to spend the existing `ROUTE LOGGED` strip on recap-first wording and leave the atlas strip as the quieter next-step lane.

That gives lane 1 one tiny closure beat without:

- adding a new station card
- changing the routes-page structure
- widening the map shell
- introducing another planner or archive panel

## Recommended `main-139` Pass

Keep `main-139` to one shared complete-route recap helper inside `field-season-board.ts`.

### 1. Change only the complete-route wrap branch

Touch the `routeBoard.complete` plus non-archive branch in `resolveFieldSeasonWrapState()`.

Do not change:

- `SEASON ARCHIVE`
- in-progress `TODAY`
- notebook-ready wrap states

### 2. Let the top strip recap first, then point softly forward

The strip should stop mirroring `atlas.note` verbatim.

Instead, it should use one short sentence derived from the just-finished chapter, with only a light next hint.

Good target energy:

- `Edge line logged. Root Hollow opens below the forest.`
- `Root Hollow reconnects the season. Back to Forest Trail.`

The exact wording can vary, but the pattern should be:

- first clause: what just became clear
- second clause: the next calm destination

### 3. Keep the atlas note as the pure next-step seam

Leave `atlas.note` in its current simpler next-facing shape.

That keeps the station layered correctly:

- `seasonWrap`: closure
- `atlas.note`: next direction
- `routeBoard`: main chapter surface

## Best File Targets For `main-139`

- `src/engine/field-season-board.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

`src/engine/overlay-render.ts` should only need changes if the final sentence overruns the current strip budget.

## Suggested Verification For `main-139`

- add or update `field-season-board` coverage for the two main logged-return states:
  - `edge-pattern-line` complete
  - `forest-expedition-upper-run` complete
- update the matching `runtime-smoke` expectations for those station-return states
- run the focused `field-season-board` and relevant `runtime-smoke` slices
- run `npm run build`
- run the shared web-game client
- capture one seeded field-station routes-page browser proof for a logged route state showing:
  - recap-first `ROUTE LOGGED` strip
  - atlas still handling the quieter next-step note

## Queue Guidance

- close `ECO-20260402-scout-101`
- promote `ECO-20260402-main-139` to `READY`
