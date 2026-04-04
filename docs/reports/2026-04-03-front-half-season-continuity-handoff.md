# 2026-04-03 Front-Half Season Continuity Handoff

Prepared `ECO-20260403-scout-161` against packet `083`.

## Current Read

The front-half route titles and station warmth are now solid, but the same early chapter is still described a few different ways depending on where the player looks:

- routes-board summary: `Open To Shelter carries the shore line into Coastal Scrub.`
- active journal card summary: `In Coastal Scrub, read shelter from open bloom to shore pine to edge log.`
- logged front-half atlas note: `Coast filed. Inland shelter next.`
- world-map footer already stays shell-safe through the compact `Today: Open To Shelter` label

Nothing is broken, but the coast-facing season still reads more like adjacent good lines than one carried chapter. The inland half already does this better through a tighter phrase family.

## Best Next Slice

`main-199` should spend one compact pass on continuity wording only.

Recommended shape:

1. Keep the live route titles, stage order, and current station shell unchanged.
2. Rephrase the active `COASTAL SHELTER LINE` summary so it sounds like one coast-to-forest shelter chapter instead of a standalone route step.
3. Rephrase the active `Open To Shelter` field-request summary so the journal card echoes that same chapter language rather than switching to a flatter instruction style.
4. Tighten the logged front-half atlas note so it still remembers the coast chapter before handing off to the inland shelter line.
5. Leave the world-map seam structurally unchanged; if `game.ts` needs a tiny label helper to keep the compact `Today:` footer aligned with the new phrase family, keep it title-led and one-line only.

## Guardrails For `main-199`

- no new strip, map HUD, recap card, or journal panel
- do not reopen the `NEXT STOP` / `FIELD SEASON OPEN` family from `main-182`
- do not spend this pass on `note-tabs` or another stop-point seam; that belongs to `main-200`
- keep `Open To Shelter` and `Edge Moisture` as the live route titles
- prefer one shared coast-to-forest shelter phrase family over several new labels

## Likely File Targets

- `src/engine/field-season-board.ts`
- `src/engine/field-requests.ts`
- `src/engine/game.ts` if the world-map footer needs a tiny derived-label adjustment
- `src/test/field-season-board.test.ts`
- `src/test/field-requests.test.ts`
- `src/test/runtime-smoke.test.ts`

## Acceptance For `main-199`

- the active coastal board and journal-card wording feel like one carried front-half chapter
- the logged front-half atlas note still remembers that coast chapter before handing off inland
- the map keeps the same compact footer seam with no added shell weight
- no new station, journal, or map surface appears
