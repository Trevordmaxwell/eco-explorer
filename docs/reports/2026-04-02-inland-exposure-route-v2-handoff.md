# 2026-04-02 Inland Exposure Route V2 Handoff

Scout handoff for `ECO-20260402-scout-106`.

## Scope

Prepare one compact lane-4 pass so `main-144` can make the alpine exposure outing feel like a real Route v2 chapter without adding another route type, support row, or station surface.

## Best Target

`treeline-low-fell` is the right inland exposure conversion.

Why this beat, not the other inland steps:

- `treeline-stone-shelter` already does the sheltered treeline comparison work and should stay the calmer opener on `treeline-shelter-line`.
- `tundra-short-season` already has a clear thaw-window identity plus existing `thaw-fringe` replay support, so it reads better as the softer tundra follow-on than as the main exposure conversion.
- `treeline-low-fell` is already the end of `edge-pattern-line`, already owns the "tree line drops into fell" idea, already has `Brief Bloom`, `Low Rime`, and nursery-avens replay hooks, and is the only alpine beat that still feels more like a leftover checklist than an authored outing.

## Current Live Gap

The live alpine exposure capstone still undershoots the newer lane-4 standard in three specific ways:

- In `field-requests.ts`, `treeline-low-fell` is still a plain `assemble-evidence` beat with no `slotOrder`, so the player can complete the clues in any order even though the route copy implies a real outward read from treeline into open fell.
- In `field-season-board.ts`, the beat detail is accurate but still generic: it says "match one..." instead of teaching the route as the last-tree-shape -> low-wood -> fell-bloom progression.
- The beat already has good replay seams (`Brief Bloom`, `Low Rime`, `Fell Bloom`), but those bonuses sit on top of a looser core route than the coastal transect or the four-step `ROOT HOLLOW` chapter.

## Best Small Pass

### Keep `treeline-low-fell` on the existing Route v2 model

Do not introduce another route type here.

The cleaner move is to keep `treeline-low-fell` on `edge-pattern-line` as `assemble-evidence`, but make the authored progression explicit through the existing evidence-slot save seam. The live carriers already support that read:

- `last-tree-shape` -> `krummholz-spruce`
- `low-wood` -> `dwarf-birch`
- `fell-bloom` -> `mountain-avens`

Because those clues already live in the intended treeline-to-fell order, `slotOrder` is enough to make the outing behave more like a purposeful chapter without spending a new route runtime.

### Teach the route as one exposure line

Tighten the active summary, board detail, and filed-note language so they all tell the same story:

- start with the last wind-shaped tree form in `krummholz-belt`
- then read the lower woody cover in `dwarf-shrub`
- finish on the open fell bloom in `lichen-fell`

This is the main gameplay gain: the outing should feel like the player is following the drop out of tree shelter, not just collecting three alpine clues.

### Reuse the existing replay seams

`treeline-low-fell` already has enough replay affordances through current board logic and nursery support. The main pass should keep using:

- `Brief Bloom` at peak phenology
- `Low Rime` during `frost-rime`
- `Fell Bloom` once the avens support reward is claimed

If the implementation wants a live in-biome title or summary variant, it should reuse the existing `processFocus` seam rather than inventing a second replay or route-status layer, but that is optional to the core handoff.

## Best Main-Agent Slice For `main-144`

1. In `src/engine/field-requests.ts`, narrow `treeline-low-fell` into an ordered `last-tree-shape -> low-wood -> fell-bloom` chapter using `slotOrder`, and tighten the summary plus filed-note copy around the exposure-line read.
2. In `src/engine/field-season-board.ts`, rewrite the active beat detail and adjacent route summary or direction copy so the board points at that same ordered exposure progression instead of a generic three-clue checklist.
3. In `src/test/field-requests.test.ts`, add the regression that out-of-order alpine clue attempts do not advance `treeline-low-fell` before the earlier stage is logged.
4. In `src/test/field-season-board.test.ts`, update the expected edge-line copy to match the stronger ordered treeline-to-fell read.
5. Add a small `runtime-smoke` assertion only if the copy or ready-to-file flow needs end-to-end proof after the board and request changes.

## Expected File Touches

- `src/engine/field-requests.ts`
- `src/engine/field-season-board.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts` if needed

## Guardrails

- do not convert `treeline-low-fell` into a new `transect-evidence` route
- do not expand the support row or spend this item on the later interpretation-support follow-on
- keep `treeline-stone-shelter` and `tundra-short-season` in their current calmer roles
- keep filed-note copy compact enough for `NOTEBOOK READY` preview and recorded notice budgets

## Queue Guidance

- close `ECO-20260402-scout-106` with this report
- bump packet `051` to version `2`
- promote `ECO-20260402-main-144` to `READY`
- leave `ECO-20260402-critic-117` blocked behind implementation
