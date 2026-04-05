# 2026-04-04 Non-Sill Home-Place Payoff Review

Reviewed `ECO-20260404-critic-263` against packet `108`.

## Result

Clean review. No blocker found.

## What Holds

- The new payoff lands on a genuinely different seam from the sill, so the station feels more settled without stacking yet another ornament onto the lower threshold family.
- `resolveFieldStationBackdropAccentState(...)` stays a small render-facing helper built from the same calm nursery and logged-route inputs the station already owns, which keeps progression logic out of the new seam.
- The draw change is local to `src/engine/overlay-render.ts`, and the station body, route board, nursery copy, map flow, and save behavior all stay unchanged.
- The test surface is proportionate: `render_game_to_text()` exposes one compact `backdropAccent` shape for regression coverage, and the focused runtime states prove the seam at the early, stocked-bed, and later settled station moments.

## Watch Item

- Keep `backdropAccent` as a render-observability seam, not a new gameplay dependency. If future work starts branching gameplay or station copy from this derived shape instead of the underlying nursery and route facts, the test hook will have grown into the wrong layer.

## Verification

- Rechecked the new helper and draw call placement in `src/engine/overlay-render.ts`
- Rechecked the `render_game_to_text()` exposure in `src/engine/game.ts`
- Rechecked the focused expectations in `src/test/overlay-copy.test.ts` and `src/test/runtime-smoke.test.ts`
- Inspected the seeded browser proof in `output/lane-1-main-263-browser/`
