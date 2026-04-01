# 2026-03-31 Second-Season Opening Handoff

## Scope

Complete `ECO-20260331-scout-85` and narrow `ECO-20260331-main-123` to one compact lane-1 opening pass.

## Summary

The live season-close state is clean but still a little too final.

What already works:

- the routes page files the season as `SEASON ARCHIVE`
- the logged `ROOT HOLLOW` expedition footer already says `Take the High Pass next.`
- the world map already has the right `Treeline Pass` / `HIGH PASS` vocabulary and a readable split-origin footer

What still stalls:

- the station always opens on `SEASON -> ROUTES`
- the only concrete next-season cue lives one tab away on `SEASON -> EXPEDITION`
- pressing `Enter` on that logged expedition card still only shows a notice instead of handing off into the map
- the selected `route-marker` support goes quiet once `forest-season-threads` is logged

So the next implementation should not invent a new season card or planner. It should turn the existing logged expedition seam into one real launch path.

## Findings

### 1. The next-season cue is already authored, but it is hidden behind the wrong default page

The current station state after `forest-season-threads` is:

- routes page: calm archive strip and subtitle
- expedition page: the only explicit `NEXT FIELD SEASON` cue

That means the game already has the right words, but the player has to discover the `EXPEDITION` tab before the opening feels concrete.

### 2. The expedition card already acts like a launch surface, but not after the season is filed

`updateFieldStationState()` already routes `Enter` on `SEASON -> EXPEDITION` through `activateExpeditionCard()`.

Right now that helper always resolves to a notice-only outcome. For the logged expedition plus filed-season state, that is the wrong ceiling. This is the cleanest place to turn a static teaser into a real station-to-map handoff.

### 3. No new save flag is needed

The opening can stay fully derived from existing progress:

- `forest-expedition-upper-run` logged
- `forest-season-threads` logged

That is enough to know the first season is closed and the next season should now point toward `Treeline Pass`.

### 4. The world map already has the right destination seam

The map already knows:

- `treeline` is `Treeline Pass`
- its approach label is `HIGH PASS`
- the footer can show both the focused destination and the current origin

So `main-123` does not need a new map UI. It only needs to open or focus the existing map on the right node.

## Recommended `main-123` Pass

Keep `main-123` to one three-part change set:

1. Add one derived `next field season available` state from the existing season-close progress.
2. When the field station opens in that state, default `SEASON` to the `EXPEDITION` page instead of `ROUTES`.
3. When the logged expedition card is activated in that same state, open the world map focused on `Treeline Pass`, and let selected `route-marker` support point to that same location.

That gives the player one clear path:

- open the station
- land on the logged expedition card with the `NEXT FIELD SEASON` footer already visible
- press `Enter`
- arrive on the world map already focused on the `High Pass` launch

The older archive strip still exists one tab left, so the season close is preserved. It just no longer feels like a dead end.

## Keep Out Of Scope

Do not:

- add a new top-level station page
- add a fourth route card
- add a quest log, checklist, or persistent navigation HUD
- add a new saved progression flag just to remember that season two exists
- rewrite the current season archive subtitle into a denser recap block

## Likely File Targets

- `src/engine/game.ts`
- `src/engine/field-season-board.ts`
- `src/test/runtime-smoke.test.ts`
- `src/test/field-season-board.test.ts`

`src/engine/world-map.ts` only needs to move if the cleanest implementation wants an optional focused-location override in `createWorldMapState()`.

## Suggested Verification For `main-123`

- add `field-season-board` coverage for the derived next-season opening state and any route-marker target change
- add `runtime-smoke` coverage showing:
  - field station opens to `SEASON -> EXPEDITION` once the season is filed
  - activating the logged expedition card opens the world map focused on `Treeline Pass`
  - selected `route-marker` support points to `treeline` in that same state
- run `npm run build`
- do one seeded browser check at the filed-season station state to confirm the expedition teaser still fits cleanly at `256x160`

## Queue Guidance

- Close `ECO-20260331-scout-85`.
- Promote `ECO-20260331-main-123` to `READY`.
- Keep `ECO-20260331-critic-96` blocked until the opening pass lands.
