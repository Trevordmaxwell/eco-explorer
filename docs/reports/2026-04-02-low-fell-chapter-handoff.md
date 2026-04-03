# 2026-04-02 Low-Fell Chapter Handoff

Scout handoff for `ECO-20260402-scout-138`.

## Scope

Prepare one expedition-grade Route v2 conversion that makes a live routes-page family feel like a fuller chapter without adding a new shell, touching lane-3 geometry, or reopening the expedition card itself.

## Best Target

Turn `treeline-low-fell` into a four-leg chapter on `edge-pattern-line`.

Recommended order:

1. `last-tree-shape`
2. `low-wood`
3. `fell-bloom`
4. `low-rest`

Recommended new final carrier:

- `arctic-willow`

That keeps the route on the existing `assemble-evidence` seam while making the live capstone beat read more like:

- last sheltered tree form
- lower woody cover
- first open-fell bloom
- one last low open-ground rest before the route closes

## Why This Is The Best Next Move

`treeline-low-fell` is the highest-leverage chapter target now:

- it is the last active routes-page beat before `ROOT HOLLOW`, so deepening it most clearly links the normal route loop to the expedition loop
- `edge-pattern-line` already owns the stronger support seams: `place-tab` has a live question there, the route board already frames it as the line's capstone, and the filed season hands straight from that beat into the forest expedition chapter
- recent lane-3 treeline work already gave the fell side a clearer crest-and-settle shape, so lane 4 can spend this packet on route structure rather than asking for more terrain
- the current route is already ordered and place-led, so it can grow inside proven runtime instead of needing another route type

## Why The Alternatives Are Weaker

### `treeline-stone-shelter`

This could carry more structure, but it is a weaker later-wave target:

- it sits much earlier in the live routes ladder
- the player sees it less at the point where the game is now trying to bridge ordinary routes into larger chapter feeling
- the biggest visible gain is now on the later capstone beat that already points into `ROOT HOLLOW`

### `scrub-edge-pattern`

This family is already a strong transect and would buy less with another stage:

- the coast-to-forest walk already feels intentional
- adding another stage there risks turning the middle family denser rather than more chapter-like
- it does not use the newly strengthened treeline traversal read that is already live

### `forest-cool-edge` or `ROOT HOLLOW`

Those are the wrong seams for this packet:

- `forest-cool-edge` is the tighter interpretation beat and is now already carrying process plus filing polish
- `ROOT HOLLOW` already owns the expedition page, so spending this packet there would blur route growth back into expedition growth instead of strengthening the routes page itself

## Best Main-Agent Slice For `main-176`

1. Keep `treeline-low-fell` on `assemble-evidence`.
2. Add one fourth final slot:
   - `id: low-rest`
   - `label: Low-rest clue`
   - `entryIds: ['arctic-willow']`
3. Update the slot order to:
   - `last-tree-shape -> low-wood -> fell-bloom -> low-rest`
4. Update route-facing copy in `src/engine/field-requests.ts` and `src/engine/field-season-board.ts` so the board, next-direction line, and filed note all teach the fuller four-leg drop out of treeline shelter.
5. Add one light save-compat pass in `src/engine/save.ts` for older in-progress or ready `treeline-low-fell` saves:
   - if the save already has the old three-slot route completed but is missing `low-rest`, keep the observed slots intact
   - downgrade any stale `ready-to-synthesize` state back to `gathering`
   - do not auto-fill the new `low-rest` clue for the player
6. Add focused regressions in `src/test/field-requests.test.ts`, `src/test/field-season-board.test.ts`, `src/test/save.test.ts`, and one targeted `src/test/runtime-smoke.test.ts` slice for the live low-fell station flow

## Why This Compatibility Shape Is Best

The new stage belongs at the end of the route, not in the middle.

That matters because:

- the live `treeline-low-fell` save seam is already out in the wild
- appending the new stage lets older three-slot progress stay truthful instead of pretending the player saw a missing middle clue
- a small status downgrade is cheaper and more honest than injecting a fabricated observed clue

## Route-Board Guidance

The board should now teach `treeline-low-fell` as a fuller final routes-page chapter.

Copy direction:

- route summary should still feel like the end of the edge line, but it should now name the four-leg drop into the open fell
- the `Low Fell` beat detail should teach the stronger sequence without sounding like a checklist
- the logged beat should read like one longer fall out of treeline shelter, not just a renamed three-clue finish
- keep the support strip calm and reuse the current `place-tab` seam instead of authoring another prompt family

## Expected File Touches

- `src/engine/field-requests.ts`
- `src/engine/field-season-board.ts`
- `src/engine/save.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/save.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add a new route type
- do not reopen treeline geometry or lane-3 traversal layout work
- do not widen the support row or add another notebook page
- keep the conversion readable at `256x160`
- keep the chapter place-specific and calm, not harsher or more managerial

## Queue Guidance

- close `ECO-20260402-scout-138` with this report
- bump packet `067` to version `2`
- retarget `ECO-20260402-main-176` to this handoff and promote it to `READY`
- leave `ECO-20260402-critic-149` blocked behind implementation
