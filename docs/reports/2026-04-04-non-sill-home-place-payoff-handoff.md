# 2026-04-04 Non-Sill Home-Place Payoff Handoff

Prepared `ECO-20260404-scout-263` against packet `108`.

## Recommended Seam

Use the field-station backdrop side gutters as the next payoff seam, not the lower sill and not another text surface.

Grounding from the current render:

- `drawFieldStationOverlay(...)` already gives the station a stable outer shell through `panelRect` and an inner working area through `contentRect`
- the leaf-green gutter between those two rectangles is visible on both `SEASON` and `NURSERY`
- the current visible payoff work is concentrated in `drawFieldStationGrowthAccent(...)` on the lower sill family
- the nursery bed already has its own local `drawNurseryHomePlaceStrip(...)`, so spending more payoff there would read as bed-specific growth rather than as the whole home place becoming more settled

That makes the side gutters the cleanest next seam: they are visible before the player parses cards, they belong to the station shell rather than one page, and they do not require a new row, subtitle, or planner layer.

## Recommended Main Shape

Keep `ECO-20260404-main-263` inside `src/engine/overlay-render.ts` and the focused overlay/runtime tests.

### Implementation target

- add one pure helper such as `resolveFieldStationBackdropAccentState(...)`
- add one narrow draw helper such as `drawFieldStationBackdropAccent(...)`
- call it from `drawFieldStationOverlay(...)` after `fillLeafGreenPanel(...)` and before the lower-sill growth accent

### Visual target

- draw two compact upright brace or post reads inside the left and right station gutters
- let route progress unlock them in a calm sequence:
  - first logged route: left-side brace appears
  - second logged route: right-side brace mirrors it
  - third logged route: add one tiny center tie or cap so the shell feels more settled, not more decorated
- let nursery progress or unlocked extras only enrich that same brace family with tiny fills or tint shifts rather than introducing a second independent motif

### Keep out of scope

- no new copy
- no map changes
- no new nursery row or subtitle work
- no further lower-sill growth
- no animation beyond the existing arrival pulse system

## Why This Is Safer Than The Other Nearby Options

- Extending the sill would spend the exact seam the last review marked as saturated.
- Extending the nursery bed strip would mostly read on the nursery page and would not solve the broader station-return payoff need.
- Adding more board or subtitle treatment would spend scarce handheld text budget instead of earning a visual read.

## Suggested Verification For Main

- extend the pure overlay state expectations in `src/test/overlay-copy.test.ts`
- add or adjust one focused field-station runtime smoke assertion in `src/test/runtime-smoke.test.ts`
- run `npm run build`
- run the shared `develop-web-game` client smoke on the station open flow
- capture one seeded station screenshot on `SEASON` and one on `NURSERY` to confirm the new seam reads without crowding the shell
