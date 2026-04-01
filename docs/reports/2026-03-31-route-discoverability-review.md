# 2026-03-31 Route Discoverability Review

## Verdict

No blocker on `ECO-20260331-main-124`.

The new shared active-outing locator keeps the filed-season opener coherent across the routes tab, the journal, the world map, and `Route Marker` without growing a new planner surface or denser HUD.

## What I Checked

- `src/engine/field-season-board.ts`
- `src/engine/game.ts`
- `src/engine/overlay-render.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`
- `src/test/world-map.test.ts`
- `output/lane-1-main-124-client/`
- `output/lane-1-main-124-browser/journal-route-card.png`
- `output/lane-1-main-124-browser/high-pass-map.png`
- `output/lane-1-main-124-browser/routes-tab.png`
- `output/lane-1-main-124-browser/console-errors.json`

## Findings

### 1. Clean: the filed-season routes tab now points forward instead of backward

The archived routes page no longer sounds like season close is still pending. The atlas-note line now points at `High Pass`, and the same derived target also lands in the route-board debug state, which keeps the station surfaces aligned with the live expedition opener.

### 2. Clean: the world map reuses the right seam

The focused `Treeline Pass` node now echoes `Today: High Pass` through the existing footer-label seam. That keeps the destination easy to relocate after a break without adding a new map widget or persistent route banner.

### 3. Clean with one watch item: the journal card is helpful, but it is near the vertical ceiling

The bottom-card fallback now appears in the notebook when no active request exists, which is the right behavior. In the seeded `256x160` journal proof, the `High Pass` card is readable, but the combination of unlocked-note text plus route card is now close to the compact layout ceiling. This is not a blocker for the current pass, but future journal-copy growth in this state should keep using seeded browser checks instead of trusting text budgets alone.

## Recommendation

Close `critic-97` as clean and leave packet `040` closed for lane 1.
