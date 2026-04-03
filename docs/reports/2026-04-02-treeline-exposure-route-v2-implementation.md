# 2026-04-02 Treeline Exposure Route V2 Implementation

Implementation note for `ECO-20260402-main-144`.

## Outcome

`treeline-low-fell` now behaves like an ordered exposure chapter instead of a loose three-clue alpine checklist.

The pass stays inside the existing lane-4 seams:

- `field-requests.ts` keeps the beat on `assemble-evidence`, but now uses ordered `last-tree-shape -> low-wood -> fell-bloom` progression plus stronger exposure-line summary and filed-note copy
- `field-season-board.ts` teaches that same ordered drop out of treeline shelter on the live route board and on the later `HIGH PASS` launch card
- no new route type, support row, or station shell was introduced

## What Changed

### Ordered alpine route progression

`treeline-low-fell` now authors its clue order explicitly with `slotOrder`.

That means:

- `mountain-avens` no longer registers first from `lichen-fell`
- the player must log `krummholz-spruce` first, then `dwarf-birch`, then `mountain-avens`
- the saved filed-note text now resolves with a stronger shared sentence about treeline dropping into open fell

This reuses the current `assemble-evidence` runtime instead of opening another route type.

### Route-board and launch-card framing

The route board now frames the treeline beat as one ordered drop:

- after `forest-cool-edge`, the board summary points into the drop out of treeline shelter
- the active `Low Fell` beat names the three zones in sequence: `Krummholz Belt -> Dwarf Shrub -> Lichen Fell`
- the logged beat text and the later `HIGH PASS` launch-card detail now keep the same ordered exposure language

That keeps the chapter feel consistent even after the current edge-pattern route is already filed.

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "shows a route-logged stop cue in the field station once the live route is complete"`
- `npm run build`
