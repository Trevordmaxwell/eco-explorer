# 2026-04-02 Season-Two Shell Handoff

## Scope

Complete `ECO-20260402-scout-108` and narrow `ECO-20260402-main-146` to one compact lane-1 season-two shell pass.

## Summary

The live season-two shell already has the right surfaces.

`High Pass` is now clearly present on:

- the filed-season `ROUTES` page subtitle
- the archive strip
- the atlas note
- the `HIGH PASS / NEXT` launch card
- the focused world-map footer

The remaining tension is that the station still opens this state on `SEASON -> EXPEDITION`, even though the clearest active-route shell now lives on `SEASON -> ROUTES`.

That makes the season feel slightly split:

- the routes page reads like the live next outing
- the default opener still foregrounds the logged `ROOT HOLLOW` card

## Current Read

The opening behavior still comes from one narrow runtime branch in `openFieldStation()`:

- `src/engine/game.ts` currently sets `selectedFieldStationSeasonPage = resolveNextFieldSeasonTargetBiomeId(save) ? 'expedition' : 'routes';`

That behavior made sense for the earlier second-season opener, when the expedition tab was the only strong next-season cue.

It is weaker now because the live routes page already holds the cleaner season-two shell:

- subtitle: `High Pass continues from Treeline Pass.`
- strip: `SEASON ARCHIVE / Root Hollow now leads to High Pass.`
- atlas note: `Next: take the High Pass from Treeline Pass.`
- board: `HIGH PASS / NEXT`

Meanwhile the expedition page is still mostly the logged `ROOT HOLLOW` card plus a teaser:

- subtitle: `High Pass opens the next field season.`
- logged chapter summary
- `NEXT FIELD SEASON / Follow Root Hollow into High Pass.`

That is still useful, but it now reads more like the later expedition-approach seam than the main season-two shell.

## Key Finding

The cleanest `main-146` pass is to make the filed-season opener route-first again now that the routes page has a real active-outing shell.

In practice:

- keep `High Pass` visibly active on `SEASON -> ROUTES`
- keep `SEASON -> EXPEDITION` as the quieter secondary page
- leave the stronger expedition-approach work for `scout-109` / `main-147`

This is the smallest change that makes season two feel more settled without opening a new card, planner, or station layer.

## Recommended `main-146` Pass

### 1. Change only the filed-season default season page

Touch the field-station open path in `src/engine/game.ts`.

For the `next-season-open` / filed-season state, default the station to `SEASON -> ROUTES` instead of `SEASON -> EXPEDITION`.

Good implementation shape:

- derive the default from the same existing season-two state that already powers the `High Pass` routes shell
- do not add a new save flag

### 2. Keep the expedition page intact as the secondary seam

Do not remove:

- the logged `ROOT HOLLOW` expedition card
- the `NEXT FIELD SEASON` teaser
- the expedition-page `Enter` handoff into the focused world map

Those should remain available one tab right.

The point is not to kill the expedition seam. It is to stop making that quieter seam the first thing the player sees once `High Pass` is already live on the routes page.

### 3. Leave new expedition-forward copy for the next packet step

Do not turn `main-146` into a teaser rewrite or bigger expedition pass.

If more future-facing expedition language is needed, that belongs in:

- `ECO-20260402-scout-109`
- `ECO-20260402-main-147`

## Best File Targets For `main-146`

- `src/engine/game.ts`
- `src/test/runtime-smoke.test.ts`

`src/test/field-season-board.test.ts` should only change if the implementation introduces a tiny helper for the open-state decision.

## Suggested Verification For `main-146`

- update `runtime-smoke` so the filed-season station opens on `SEASON -> ROUTES`
- keep proof that:
  - the routes page still shows the active `HIGH PASS / NEXT` shell
  - the expedition page is still reachable one tab right
  - the expedition-page `Enter` handoff still focuses the world map on `Treeline Pass`
- run the focused lane-1 season-two runtime slice
- run `npm run build`
- capture one seeded browser proof for the new filed-season default opener on the routes page

## Queue Guidance

- close `ECO-20260402-scout-108`
- promote `ECO-20260402-main-146` to `READY`
