# 2026-04-03 Front-Half Transition Route V2 Handoff

Scout handoff for `ECO-20260403-scout-159`.

## Scope

Prepare one stronger front-half transition outing that makes the coast-to-forest chapter feel authored without adding a new route type, a cross-biome request system, or another station surface.

## Best Target

Convert the existing `coastal-shelter-shift` request in place from a back-dune `inspect-entry-set` into one compact `transect-evidence` outing through:

1. `back-dune`
2. `shore-pine-stand`
3. `forest-edge`

Recommended request shape:

- keep `id: coastal-shelter-shift`
- change `type` to `transect-evidence`
- use `zoneIds: ['back-dune', 'shore-pine-stand', 'forest-edge']`

Recommended stages:

1. `open-bloom`
   - `label: Open-bloom clue`
   - `entryIds: ['sand-verbena']`
   - `zoneId: 'back-dune'`
2. `pine-cover`
   - `label: Pine-cover clue`
   - `entryIds: ['shore-pine']`
   - `zoneId: 'shore-pine-stand'`
3. `edge-log`
   - `label: Edge-log clue`
   - `entryIds: ['nurse-log']`
   - `zoneId: 'forest-edge'`

Recommended route-note copy:

- title:
  - `Open To Shelter`
- summary:
  - `In Coastal Scrub, read shelter from open bloom to shore pine to edge log.`
- ready text:
  - `Return to the field station and file the Open To Shelter note.`
- filed text:
  - `Sand verbena, shore pine, and nurse log show the coast settling into forest-edge shelter.`
- clue-backed tail:
  - `show the coast settling into forest-edge shelter.`

## Why This Is The Best Next Move

This is the strongest front-half transition route now because:

- it makes the front-half chapter feel like a real place transition instead of another two-of-three inspect gate
- it reuses the new `shore-pine-stand` middle seam that already reads like the missing calmer hinge between scrub and woods
- it stays inside the current single-biome Route v2 runtime instead of asking lane 4 to invent cross-biome request support
- it keeps later `edge-pattern-line` territory distinct, because the later route still owns the broader `back-dune -> windbreak-swale -> forest-edge` transect while this one uses the quieter pine hinge

## Why The Alternatives Are Weaker

### Do not convert this into a cross-biome coastal-scrub -> forest request

That would ask the current Route v2 core to support multi-biome request ownership and travel targeting in the middle of a scout-sized front-half pass. The present request model is intentionally smaller than that.

### Do not spend the pass on `coastal-edge-moisture`

A forest-edge-only upgrade would still leave the entry into the transition feeling abrupt. The bigger gain is turning the whole scrub-to-woods handoff into one remembered walk.

### Do not duplicate the later `scrub-edge-pattern` transect

Reusing `back-dune -> windbreak-swale -> forest-edge` here would blur the chapter boundary with the later edge-pattern route. The new `shore-pine-stand` gives this front-half pass its own identity.

## Best Main-Agent Slice For `main-197`

1. In `src/engine/field-requests.ts`, convert `coastal-shelter-shift` in place:
   - keep the request id for compatibility
   - move it onto `transect-evidence`
   - use `sand-verbena -> shore-pine -> nurse-log`
   - leave `coastal-edge-moisture` as the next smaller follow-on for now
2. Update the front-half routes wording in `src/engine/field-season-board.ts` only where the new route needs matching beat/detail copy:
   - the `Coastal Shelter` beat detail
   - any travel-facing or notebook-first line that still describes the old two-clue back-dune version
3. Keep the same filing seam:
   - one `NOTEBOOK READY` state
   - one routes-page file action
   - no new station card or support row
4. Add focused regressions:
   - `src/test/field-requests.test.ts`
     - assert the coastal request now starts as a three-stage transect
     - assert stage order across `back-dune -> shore-pine-stand -> forest-edge`
     - assert filing returns `coastal-shelter-shift`
   - `src/test/runtime-smoke.test.ts`
     - drive one seeded coastal-scrub run through `sand-verbena`, `shore-pine`, and `nurse-log`
     - assert the route becomes notebook-ready and files from the existing routes seam
   - `src/test/field-season-board.test.ts`
     - update only the front-half beat or summary lines that need to match the converted outing

## Guardrails

- do not add a new route id unless the existing save seam truly forces it
- do not widen the support row or field-station shell
- do not consume the later replay/process step in this task
- keep the outing grounded in current coastal-scrub evidence the player can already see
