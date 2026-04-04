# 2026-04-03 Second-Act Route V2 Chapter Handoff

Scout handoff for `ECO-20260403-scout-216`.

## Scope Reviewed

- `docs/reports/2026-04-03-lane-4-second-act-route-v2-phase.md`
- `src/engine/field-season-board.ts`
- `src/engine/guided-field-season.ts`
- `src/engine/field-requests.ts`
- `src/test/field-season-board.test.ts`
- `src/test/guided-field-season.test.ts`
- `src/test/runtime-smoke.test.ts`

## Best Target

Spend the second-act chapter pass on the inland opening, not on the later filing seams.

The strongest narrow move is:

- make the `treeline-shelter-line` read with the same authored chapter clarity the front half now has
- let the route board and guided season use the live inland chapter names already implied by Route v2
- leave `Low Fell` and `Season Threads` alone for now, because those later seams already read more like real chapter beats than the inland opener does

## Why This Is The Best Next Move

- The inland board is still using broader labels than the live Route v2 notes. `field-requests.ts` already defines `treeline-stone-shelter` as `Stone Shelter`, while `field-season-board.ts` still titles the beat `Treeline Shelter`. `tundra-short-season` is already partially reframed by Route v2 as `Thaw Window` through its display prefix and replay note, but the default route-board beat still reads only as `Short Season`.
- The guided season goes generic exactly when the second act should become the new live chapter. After the coastal line lands, `guided-field-season.ts` falls back to `FIELD SEASON OPEN` and never explicitly points at `Stone Shelter`, `Thaw Window`, or the closing tundra survey steps.
- The later second-act seams are already stronger. `Low Fell` already has a route-specific close, and `Season Threads` already has explicit capstone framing. The inland opener is the part still reading like a checklist extension instead of a distinct second act.

## Concrete Follow-On

### `field-season-board.ts`

Tighten the inland route into a title-led chapter spread:

- rename the active treeline beat from `Treeline Shelter` to `Stone Shelter`
- rename the active tundra beat from `Short Season` to `Thaw Window`
- update the inland summary and direction lines so they hand off by chapter title instead of by generic description

Recommended direction:

- initial inland state:
  - summary:
    - `Stone Shelter starts at Treeline Pass.`
  - nextDirection:
    - `Next: travel to Treeline Pass and read Stone Shelter through bent cover, stone break, and lee life.`
- after `treeline-stone-shelter`:
  - summary:
    - `Stone Shelter logged. Thaw Window opens in Tundra Reach.`
  - nextDirection:
    - `Next: travel to Tundra Reach and follow Thaw Window from first bloom to brief fruit.`
- after `tundra-short-season`:
  - summary:
    - `Thaw Window logged. Tundra Survey closes the inland chapter in Tundra Reach.`
  - nextDirection:
    - `Next: stay in Tundra Reach and finish Tundra Survey before the route turns back downslope.`

The exact sentences can tighten, but the important part is that the inland route should now feel like an authored chapter opening rather than a second list of beats after the coast.

### `guided-field-season.ts`

Add one inland-specific second-act guidance ladder before the generic settled note:

- after `coastal-edge-moisture` and before `treeline-stone-shelter`:
  - point to `STONE SHELTER`
- after `treeline-stone-shelter` and before `tundra-short-season`:
  - point to `THAW WINDOW`
- after `tundra-short-season` and before `tundra-survey-slice`:
  - point to `TUNDRA SURVEY`

This keeps the guided season aligned with the live board and notebook path instead of flattening the inland branch into `FIELD SEASON OPEN`.

### Tests

Add focused regressions:

- `src/test/field-season-board.test.ts`
  - initial inland board uses `Stone Shelter`
  - post-treeline board points at `Thaw Window`
  - post-thaw board points at `Tundra Survey`
- `src/test/guided-field-season.test.ts`
  - after the coast is filed, the guided season points to `Stone Shelter`
  - after `treeline-stone-shelter`, it points to `Thaw Window`
  - after `tundra-short-season`, it points to `Tundra Survey`
- `src/test/runtime-smoke.test.ts`
  - field-station inland route shell reflects the new title-led copy on the treeline and tundra states

## Why The Alternatives Are Weaker

### Do not spend this pass on `Low Fell`

`Low Fell` already has a more authored chapter feel than the inland opener: the beat title is specific, the route close is specific, and the follow-on into `Root Hollow` is already readable.

### Do not spend this pass on a filing payoff yet

That is the next planned scout/main pair in packet `091`. The bigger gap right now is the chapter framing itself, not the return payoff.

### Do not widen this into atlas or map copy

The second-act weakness is already visible on the route board and guided season. Those are the right seams to fix first, and widening into atlas or map language would push into lane-1 travel structure.

## Best Main-Agent Slice For `main-216`

1. In `src/engine/field-season-board.ts`, switch the inland branch to a title-led chapter spread around `Stone Shelter`, `Thaw Window`, and `Tundra Survey`.
2. In `src/engine/guided-field-season.ts`, add the matching inland guidance beats so the second act no longer falls back to the generic `FIELD SEASON OPEN` note.
3. Add focused board, guided-season, and runtime coverage for the treeline and tundra chapter states.

## Expected File Touches

- `src/engine/field-season-board.ts`
- `src/engine/guided-field-season.ts`
- `src/test/field-season-board.test.ts`
- `src/test/guided-field-season.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add another station page, panel, or support row
- do not change the existing note-tabs filing behavior in this pass
- keep the second act place-led and notebook-first
- prefer clearer chapter framing over new mechanics or recap layers
