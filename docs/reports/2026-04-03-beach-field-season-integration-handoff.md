# 2026-04-03 Beach Field-Season Integration Handoff

`ECO-20260402-scout-140` narrowed the beach field-season gap to one small lane-1 implementation pass.

## What The Live Build Is Doing

- The coastal season board already frames the route as a beach-led start through its wrap text: `Beach start. Follow shelter inland.`
- The actual beat stack does not match that framing yet. The first visible beat is still `Forest Hollow`, so the board reads as if the season begins inland.
- Starter guided copy also points straight at `Forest Trail`, which reinforces that mismatch.

## Constraint To Keep

- Do not add a fourth beat to the coastal season board.
- The current station renderer gives the non-launch board a very small three-line beat budget inside the existing `SEASON` shell, and a fourth row would push this lane toward density drift at `256x160`.
- Lane 4 already owns the future beach Route v2 outing. Lane 1 should only make beach legible inside the season-board chapter flow, not author a full new beach request or filing loop here.

## Recommended `main-178` Shape

Keep the existing `coastal-shelter-line` board at three beats and rebias the first beat into a beach-to-forest opener.

Suggested implementation shape:

1. Keep the first beat slot and id as `forest-study` so replay-note and request mapping stay stable.
2. Reframe the earliest-state title and detail for that beat so the player reads a beach-led opener instead of a forest-only start.
3. Keep the later logged and replay variants intact unless the new opening copy clearly needs matching polish.
4. Tighten starter guided copy only if needed so the station note and starter notice acknowledge the beach-led opener while still sending the player toward `Forest Trail`.

## Likely File Targets

- `src/engine/field-season-board.ts`
- `src/engine/guided-field-season.ts`
- `src/test/field-season-board.test.ts`
- `src/test/guided-field-season.test.ts`
- `src/test/runtime-smoke.test.ts`

## Concrete Acceptance For `main-178`

- the coastal `SEASON` board still renders in the current three-beat shape
- a fresh save makes beach feel like part of the first season chapter instead of only the wrap text
- the starter notice and station note remain compact and travel-clear
- no new station page, recap panel, route type, or beach filing step appears
