# 2026-04-03 Beach Station-Return Warmth Handoff

`ECO-20260402-scout-141` narrowed the next lane-1 step to one compact station-return copy pass.

## What The Live Build Is Doing

- The opener now reads like a beach-to-forest chapter on a fresh save.
- Once the forest survey logs, that tone drops away quickly:
  - route-board summary: `Forest logged. Back to station.`
  - station note: `Forest Trail is logged. Use the menu for World map, then stop at the field station for Trail Stride.`
  - prompt notice: `Menu to World map, then Field station.`
- The support flow and menu default are already correct. The remaining gap is tone and continuity, not behavior.

## Constraint To Keep

- Do not add a new station step, route beat, or support surface.
- Do not change menu routing or notice timing.
- Keep the active `station-return` row title short; the current handheld board is already close to its safe width, and the prior review flagged the fresh-save `TODAY` strip as near the ceiling.

## Recommended `main-179` Shape

Keep the current station-return structure and warm only the compact copy family that bridges the beach-led opener into `Trail Stride`.

Suggested implementation shape:

1. Tighten the coastal board's station-return summary so it still echoes the beach-to-forest line instead of snapping to a generic `Back to station.` sentence.
2. Tighten the `RETURN TO STATION` note so it feels like the beach chapter is being carried back to the station, while still clearly instructing the player to take `Trail Stride`.
3. Tighten the `FIELD STATION` prompt notice so it points at the same return beat without getting longer than the current shell comfortably supports.
4. Leave the `station-return` beat id, menu default, and upgrade flow unchanged.

## Likely File Targets

- `src/engine/field-season-board.ts`
- `src/engine/guided-field-season.ts`
- `src/test/guided-field-season.test.ts`
- `src/test/runtime-smoke.test.ts`

## Concrete Acceptance For `main-179`

- the forest-to-station handoff keeps a little beach-chapter warmth instead of sounding purely generic
- `Trail Stride` remains the clear action
- no new board row, notice type, or station page appears
- station-return copy stays within the current handheld copy budget
