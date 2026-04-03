# 2026-04-02 High-Country Route V2 Handoff

Scout handoff for `ECO-20260402-scout-122`.

## Scope

Prepare one lane-4 implementation slice so `main-160` strengthens the high-country branch through the live Route v2 loop, not through another season-shell, travel, or support-system expansion.

## Best Target

Convert `tundra-short-season` into an ordered thaw-window chapter.

This is the strongest next high-country gain because:

- `treeline-stone-shelter` already reads like a real sheltered-place chapter
- `treeline-low-fell` already reads like the later exposure capstone
- `tundra-short-season` is still the loosest inland beat, with the most generic board and request language in the branch

So the best lane-4 move is not another treeline retrofit. It is to make the middle tundra outing feel like the actual high-country turn between shelter and exposure.

## Recommended Shape

Keep `tundra-short-season` on the current `assemble-evidence` seam, but make the authored sequence explicit:

- `first-bloom`
- `wet-tuft`
- `brief-fruit`

Recommended live reading:

- start in `snow-meadow` with the first bloom
- drop into `thaw-skirt` for the wet-tuft clue
- carry the route back upslope for brief fruit

That keeps the outing calm and still uses the route's current biology, while the newer tundra work now gives it a much stronger place frame:

- the `thaw-skirt` relief family is now a readable `shelf -> shoulder -> ridge` route instead of one long shelf
- `tussock-thaw-channel` and the `Between Tussocks` note make the wet middle leg feel like a real place instead of filler
- `cloudberry` patches already give the route a reliable brief-fruit finish without inventing a harsher ridge-only requirement

## Why This Is The Best Next Gain

The route does not need a new type.

It already has the right structural ingredients:

- one clear theme: the tundra's brief thaw window
- one current save seam: `routeV2Progress.evidenceSlots`
- one compact station return
- one small movement-led middle section through the live thaw-skirt family

What is still weak is authored direction.

Right now `Short Season` still reads like a correct three-clue checklist:

- request summary is generic
- board detail is generic
- the route does not teach an intended order the way `Stone Shelter`, `Low Fell`, and `Root Hollow` now do

Adding explicit order gives the high-country branch a real middle chapter without changing its shell.

## Why The Alternatives Are Weaker Right Now

### Reworking `treeline-stone-shelter` or `treeline-low-fell` again

Those are no longer the soft spots.

They already have ordered structure, stronger board detail, and clearer place identity. Another pass there would cluster polish in the same spaces instead of lifting the weaker middle beat.

### Replacing the middle slot with `tussock-thaw-channel`

That is tempting, but it is a larger compatibility step than this queue item needs.

Changing the live slot family from `wet-tuft` to a new slot id would ripple through notebook-fit copy and in-progress save compatibility. The current packet is better spent on authored sequencing and place-reading, not on slot-schema churn.

The new thaw-channel landmark should still inform the copy and feel of the route, but it does not need to become the required saved slot in this wave.

### Turning the route into a process-backed or replay-only pass

That would make the branch less stable.

The high-country middle beat should stay reliably live once unlocked. The `thaw-fringe` world-state window can keep adding warmth later, but it should not become the main requirement for this route.

## Best Main-Agent Slice For `main-160`

`main-160` should stay tightly scoped to:

1. add ordered `slotOrder` to `tundra-short-season` using the existing `first-bloom -> wet-tuft -> brief-fruit` family
2. rewrite the route summary so it teaches that order through the thaw window
3. rewrite the inland board's active and logged `Short Season` beat detail to read like one authored thaw-window chapter
4. update the inland route summary and next-direction copy so the route points through snow meadow, the thaw-skirt middle, and the brief-fruit finish more deliberately
5. add focused regressions for slot order, board copy, and one targeted inland route-board runtime path

## Save And Compatibility Guidance

No dedicated save normalization should be needed for this pass.

Reasons:

- the route can keep the same slot ids and clue family
- the live progress label can stay the generic `x/3 clues`
- the ordered guidance can use the same lighter first-missing-slot path already proven on the other ordered routes

That keeps the chunk small and truthful.

## Expected File Touches

- `src/engine/field-requests.ts`
- `src/engine/field-season-board.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add another route type
- do not widen the station shell, support row, or filed-note UI
- do not turn the route into a harsher ridge-only traversal requirement
- keep `tundra-short-season` on the current notebook-ready filing seam
- keep the route calm, readable, and clearly high-country in tone

## Queue Guidance

- close `ECO-20260402-scout-122` with this report
- bump packet `059` to version `2`
- promote `ECO-20260402-main-160` to `READY`
- leave `ECO-20260402-critic-133` blocked behind implementation
