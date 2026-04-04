# 2026-04-03 Station Arrival Feel Handoff

Prepared `ECO-20260403-scout-231` against packet `097`.

## Recommendation

Spend `main-231` on field-station arrival feel, not on a world-map departure pulse.

The review made the right constraint explicit: the lower shell edge is now the approved home-place seam. The next non-text feedback pass should therefore animate that same seam when the station opens, instead of adding a second decorative band or widening the world-map travel system.

## Best Main-Agent Slice For `main-231`

Add one tiny station-arrival settle motion when the field station opens from the world map.

Recommended implementation shape:

1. Keep the runtime boundary in [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts):
   - set a short `fieldStationArrivalPulse` timer or progress value inside `openFieldStation()`
   - tick it down in the normal update loop
   - clear it on close
2. Reuse the existing lower-shell accent in [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts) as the only animated surface.
3. Let the motion be tiny and fast:
   - a brief reveal, widen, or brighten pass across the sill / planter
   - settling back to the current static accent in well under a second
4. If test coverage needs it, expose one small debug-facing pulse value through `render_game_to_text()` while the station is open. Do not turn it into a new saved state or user-facing label.

## Why This Seam

- It reuses the exact station-warmth seam the critic just approved.
- It makes arrival feel tangible without touching route text, support rows, or a broader world-map animation system.
- It stays compact and reversible if the live browser proof feels too busy.

## Better Than The Alternatives

Why not world-map departure:

- it would spread the phase across another surface before the new station seam has been fully used
- it risks pulling lane 1 into map-marker or travel-animation work that the queue did not ask for

Why not another station decoration:

- the routes page is already near the calm shell-punctuation ceiling at `256x160`
- motion around the existing sill is safer than another strip, badge, or caption

## Keep Out Of Scope

- no new copy or notice
- no second decorative band
- no world-map marker pulse or travel rewrite
- no audio-only solution
- no saved arrival-state field

## Verification Target For `main-231`

- focused runtime proof that opening the field station starts the arrival pulse and that it settles after a short deterministic advance
- browser captures at `256x160` for:
  - the arrival pulse frame
  - the settled station frame
- `npm run build`

## Queue Guidance

- Close `ECO-20260403-scout-231` as done.
- Promote `ECO-20260403-main-231` to `READY`.
