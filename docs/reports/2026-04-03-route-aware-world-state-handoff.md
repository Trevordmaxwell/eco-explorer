# 2026-04-03 Route-Aware World-State Handoff

Scout handoff for `ECO-20260403-scout-224`.

## Scope Reviewed

- `docs/reports/2026-04-03-living-world-play-relevance-phase.md`
- `.agents/packets/095-living-world-play-relevance-phase.json`
- `src/engine/field-requests.ts`
- `src/engine/field-season-board.ts`
- `src/engine/world-state.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Best Target

Promote `tundra-survey-slice` into a temporary `Bright Survey` outing during peak phenology.

This is the best first route-aware world-state pass because it broadens living-world relevance beyond the earlier process-backed variants without widening the shell:

- `field-season-board.ts` already has the right replay seam. When the active beat is `tundra-survey` and `phenologyPhase === 'peak'`, the board already surfaces `Bright Survey` with `This is a good outing to finish the inland line while the short-season ground is clearest.`
- The active request is the lagging seam. Entering tundra during that peak window already changes the board and replay notice, but `resolveActiveFieldRequest()` still serves the generic `Tundra Survey` request copy, so the outing itself does not fully inherit the world-state opportunity.
- This pass broadens the living-world lane beyond process moments. `Wrack Shelter`, `Moist Edge`, and `Thaw Window` already proved the process-backed pattern; `Bright Survey` is the cleanest live phenology-backed follow-on.
- The survey beat is structurally safer than the edge-line or treeline replay variants. It has one authored world-state cue instead of a stack of weather, process, and nursery alternatives, so the main-agent slice can stay compact and unambiguous.

## Why This Is The Best Next Move

- The phase goal is to make living-world state matter to play instead of reading as flavor only. `Bright Survey` already tells the player that the short-season ground is clearest now, which is a true soft opportunity cue instead of a generic mood line.
- `tundra-survey-slice` has no notebook-ready or filed-note identity to preserve, so the implementation can focus purely on active-outing cohesion instead of also threading a filing contract.
- The pass stays inside lane 4's route/request/runtime seams and avoids overlap with the current Coastal Scrub identity work queued in lanes 2 and 3.

## Concrete Follow-On

### `field-requests.ts`

Add one tiny active world-state variant seam for field requests.

Recommended shape:

- keep it compact and declarative
- let one request opt into a single active variant based on current world state
- support the minimal fields needed for this pass:
  - `phenologyPhase`
  - `activeTitle`
  - `activeSummary`

Do not widen this into a route-history or multi-variant stack. One active variant at a time is enough.

First live use:

- request id: `tundra-survey-slice`
- variant title: `Bright Survey`
- variant summary:
  - `This is a good outing to finish the inland line while the short-season ground is clearest.`

That summary should only replace the active request and notice while peak phenology is live. The request id, completion rule, and inland chapter order should stay unchanged.

### Alignment Guardrail

Keep the following surfaces reading like one outing:

- active field request title and summary
- enter-biome field notice
- route-board replay note
- season-wrap `TODAY` cue

Those should all say `Bright Survey` during peak phenology instead of splitting between generic survey wording and the existing replay note.

## Tests

Add focused regressions:

- `src/test/field-requests.test.ts`
  - once `tundra-short-season` is done and `worldStep` resolves to peak phenology, the active request becomes `Bright Survey`
  - outside that peak window, `tundra-survey-slice` stays generic
- `src/test/field-season-board.test.ts`
  - lock the existing `Bright Survey` board-side replay note on the active `tundra-survey` beat
- `src/test/runtime-smoke.test.ts`
  - seeded peak-phenology tundra re-entry after `tundra-short-season` keeps the active request, field notice, board summary, and season wrap aligned around `Bright Survey`

## Why The Alternatives Are Weaker

### Do not spend this pass on `scrub-edge-pattern`

`scrub-edge-pattern` has interesting `Held Sand` and `Haze Edge` board cues, but it already sits beside active Coastal Scrub identity work in lanes 2 and 3 and carries multiple replay alternatives. That makes it a worse first fit for a compact, low-risk world-state handoff.

### Do not spend this pass on `treeline-stone-shelter`

`Rime Shelter` is a good replay cue, but the authored `frost-rime` process moment overlaps the broader exposed ground more than the route's exact clue family. `Bright Survey` is the tighter match for a world-state opportunity pass.

### Do not repeat another process-backed route first

The prior lane-4 wave already proved that process moments can rename and reframe an active outing. This phase should broaden the pattern into phenology so living-world relevance reads as a larger gameplay seam instead of one process trick.

## Best Main-Agent Slice For `main-224`

1. In `src/engine/field-requests.ts`, add one tiny active world-state variant seam and use it only on `tundra-survey-slice`.
2. Keep completion rules, route order, save behavior, and support-row behavior unchanged.
3. Add focused request, board, and runtime coverage so `Bright Survey` stays aligned across the active outing surfaces.

## Expected File Touches

- `src/engine/field-requests.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add a new route type, quest log, or planner seam
- do not add timers, failure states, or harsher gating
- do not pull support-row differentiation into this pass
- keep the variant active-only and world-state-truthful
- keep the copy short enough for the handheld strip

## Queue Guidance

- close `ECO-20260403-scout-224` with this report
- bump packet `095` to version `2`
- add a `main_224_focus` block for the `Bright Survey` phenology handoff
- retarget `ECO-20260403-main-224` and `ECO-20260403-critic-224` to this report
- promote `ECO-20260403-main-224` to `READY`
