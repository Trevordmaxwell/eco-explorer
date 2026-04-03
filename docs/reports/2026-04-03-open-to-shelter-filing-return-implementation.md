# 2026-04-03 Open To Shelter Filing Return Implementation

Implemented `ECO-20260403-main-206`.

## Scope

- `src/engine/field-season-board.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## What Changed

- Split the coastal board state so the post-file `coastal-shelter-shift` return no longer reuses the pre-file `Open To Shelter` summary and direction.
- After `Open To Shelter` is filed and before `Edge Moisture` is logged, the board now points forward with:
  - `Open To Shelter logged. Edge Moisture checks the cooler forest edge next.`
  - `Next: return to Coastal Scrub and log the cooler, wetter edge at forest side.`
- Added a `note-tabs`-only `OPEN TO SHELTER LOGGED` wrap for that exact filed window:
  - `Coastal Scrub closes the shelter chapter. Edge Moisture waits at the forest edge.`
- Made the front-half logged-close checks key off the stable return direction instead of the mutable board summary so the new `note-tabs` close still wins even when a replay note like `Haze Shift` overlays the active beat.
- Added focused coverage for the post-file board state and the full notebook-ready -> filed runtime handoff.

## Verification

- `npx vitest run src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "turns the coastal front-half transition into a notebook-ready Open To Shelter outing and files it at the station|uses a note-tabs chapter-close line once the edge line is logged"`

## Next Handoff

`ECO-20260403-critic-179` can now review whether the logged `Open To Shelter` return feels notebook-like without crowding the routes shell or regressing replay-aware wraps.
