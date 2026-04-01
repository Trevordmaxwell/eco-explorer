# 2026-03-31 Active-Outing Discoverability Handoff

## Scope

Complete `ECO-20260331-scout-86` and narrow `ECO-20260331-main-124` to one compact lane-1 pass that makes the current outing easier to relocate across existing station, journal, and world-map seams.

## Summary

`main-123` fixed the front door into season two.

The game now has one clear opener:

- field station defaults to `SEASON -> EXPEDITION`
- the logged `ROOT HOLLOW` card says `Take the High Pass next.`
- `Enter` hands off to the `Treeline Pass` focus
- `Route Marker` can point to that same node

The next risk is not missing progression. It is losing that thread after a short break or one extra tab switch.

Right now the active outing is still easy to lose in three places:

1. the archive `ROUTES` tab still carries season-close language
2. the world map drops back to generic location summary text unless the player already knows where to look
3. the journal has no route-facing card when there is no active notebook task, even though the next field season is already derived

That makes `main-124` a small discoverability pass, not a new planner feature.

## Findings

### 1. The routes tab is now the most obviously stale surface

After `forest-season-threads` is logged, the routes tab still says:

- atlas note: `Next: file the season at the station.`
- route-board summary: `Return to the field station for a calm season close.`

That is one step behind the live opener.

The expedition tab now points forward cleanly, but the routes tab still sounds like the season is unfinished.

### 2. The world map already has a reusable active-outing footer seam

The world map renderer already supports `routeReplayLabel`.

At the moment that footer only lights up for replay-note states. In the season-two opener state, the focused `treeline` node falls back to its generic summary text instead of echoing the active outing.

That means `main-124` does not need a new map widget. It can reuse the existing footer label seam with one short destination-aware line.

### 3. The journal already has a compact bottom-card seam, but it goes empty here

The journal detail pane already draws a bottom `fieldRequest` card when there is an active notebook task.

In the season-two opener state:

- `activeFieldRequest` is `null`
- `fieldRequestHint` is `null`
- the notebook therefore loses the only compact route card it already knows how to show

That makes the journal the quietest surface precisely when the player may open it to remember what comes next.

### 4. One shared derived helper is the smallest clean implementation seam

`main-124` should not grow three separate special cases.

The smallest clean implementation is one derived active-outing locator helper that resolves:

- a short title
- one compact summary line
- a target biome / map node
- one optional world-map footer label

Priority should stay progression-first:

1. active field request target
2. season-capstone forest return
3. second-season `Treeline Pass` opener
4. expedition-ready / expedition-active forest return

That keeps station, journal, map, and `Route Marker` language aligned without adding saved state.

## Recommended `main-124` Pass

Keep `main-124` to one three-part change set:

1. Add one shared active-outing locator helper derived from current save/progression state.
2. Reuse that helper on `SEASON -> ROUTES` so archive-facing copy no longer talks like season close is still pending.
3. Reuse that same helper on:
   - the journal bottom card seam when no active notebook task exists
   - the world-map footer label seam when the focused location matches the current outing target

## Concrete Target Surfaces

### Station

Touch only the existing routes-page copy seams:

- route-board summary
- route-board next-direction text if needed
- atlas note

Do not add another strip, card, or station page.

### Journal

Reuse the existing bottom card seam that already shows active notebook tasks.

When there is no active request but there is a derived outing locator, show one compact route pointer there instead of leaving the slot empty.

### World Map

Reuse the existing footer label seam that currently shows replay-note copy.

When the focused node matches the derived outing target, show one short active-outing label there instead of the generic location summary.

## Keep Out Of Scope

Do not:

- add a new HUD banner
- add a quest log or checklist
- add another station tab
- add a new saved progression flag
- turn the journal into a route dashboard

## Likely File Targets

- `src/engine/field-season-board.ts`
- `src/engine/game.ts`
- `src/engine/overlay-render.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

`src/engine/world-map-render.ts` should only change if the current footer label seam cannot be reused as-is.

## Suggested Verification For `main-124`

- add focused coverage for the archive-routes copy in the filed-season state
- add runtime-smoke coverage showing:
  - the routes tab no longer points back to season close after the season is already filed
  - the journal shows one compact active-outing card in the next-season opener state
  - the world map echoes the current outing through its existing footer label seam
- run `npm run build`
- do one seeded browser pass that captures:
  - `SEASON -> ROUTES`
  - the journal in the same opener state
  - the focused `Treeline Pass` map footer

## Queue Guidance

- close `ECO-20260331-scout-86`
- promote `ECO-20260331-main-124` to `READY`
- keep `ECO-20260331-critic-97` blocked until the discoverability pass lands
