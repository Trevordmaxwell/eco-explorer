# 2026-04-03 Second-Act Note-Tabs Close Handoff

Scout handoff for `ECO-20260403-scout-217`.

## Scope Reviewed

- `docs/reports/2026-04-03-lane-4-second-act-route-v2-phase.md`
- `docs/reports/2026-04-03-second-act-route-v2-chapter-handoff.md`
- `docs/reports/2026-04-03-second-act-route-v2-chapter-implementation.md`
- `docs/reports/2026-04-03-second-act-route-v2-chapter-review.md`
- `src/engine/field-season-board.ts`
- `src/engine/guided-field-season.ts`
- `src/engine/nursery.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Best Target

Spend the second-act payoff pass on one `note-tabs`-only inland chapter close.

The strongest narrow move is:

- keep the stronger `Stone Shelter -> Thaw Window -> Tundra Survey` opening intact
- let `note-tabs` acknowledge that the inland line just closed when `tundra-survey-slice` rolls the board forward into `edge-pattern-line`
- avoid reopening the filed `Short Season` identity, nursery wording, or a broader guided-season rewrite

## Why This Is The Best Next Move

- The chapter opening is now clear, but the return beat is still thin. Once `tundra-survey-slice` logs, `resolveFieldSeasonBoardState()` immediately pivots the board into `EDGE PATTERN LINE`, so the player loses any compact sense that the inland chapter just got filed.
- The notebook strip already has the right pattern. `resolveSupportAwareTodayWrap()` and `resolveNoteTabsChapterCloseWrap()` already give `note-tabs` route-specific closes for `SHORE SHELTER LOGGED`, `OPEN TO SHELTER LOGGED`, and `EDGE LINE LOGGED`. The inland line is the obvious remaining chapter without that tiny logged close.
- The review watch item about nursery unlock wording is real, but it is weaker than this seam for the next lane-4 step. Nursery copy lives outside the approved payoff seams for this queue item, while a note-tabs close stays directly inside the notebook return lane the packet asked for.
- A broader guided-season push toward `Scrub Pattern` would improve next-step alignment, but it is more of a routing pass than a return payoff. The compact strip close is the smaller and more notebook-like move.

## Concrete Follow-On

### `field-season-board.ts`

Add one inland logged-return detector for the first `edge-pattern-line` state:

- trigger only after `tundra-survey-slice`
- trigger only before `scrub-edge-pattern`
- key it off the current `edge-pattern-line` opening state, similar to the existing logged-return helpers

Then add one `note-tabs` wrap for that exact state:

- label:
  - `INLAND LINE LOGGED`
- text direction:
  - `Tundra Survey closes the inland line. Scrub Pattern waits in Coastal Scrub.`

This should only affect `note-tabs`. Keep the live board, atlas, route marker, and other supports pointed at `Scrub Pattern`.

### Tests

Add focused regressions:

- `src/test/field-season-board.test.ts`
  - once `tundra-survey-slice` is logged and `note-tabs` is selected, the strip uses `INLAND LINE LOGGED`
  - non-`note-tabs` supports still keep the current `TODAY` / next-route behavior
- `src/test/runtime-smoke.test.ts`
  - a seeded post-`tundra-survey-slice` station visit with `note-tabs` selected shows the new inland close while the route board itself still points at `Scrub Pattern`

## Why The Alternatives Are Weaker

### Do not spend this pass on nursery unlock summaries

`Treeline Shelter` / `Short Season` nursery wording is the clean review's one real watch item, but it is outside the notebook, note-tabs, guided, and support-row seams this queue item is meant to use.

### Do not widen this into a broader guided-season rewrite

Pointing the station note directly at `Scrub Pattern` could help later, but it is more of a next-route guidance pass than a second-act return payoff. The smaller notebook-strip close is the better immediate move.

### Do not change the filed `Short Season` identity

That stable filed-note contract was explicitly preserved by the chapter pass and the review. This follow-on should deepen the return feeling without renaming the saved note path.

## Best Main-Agent Slice For `main-217`

1. In `src/engine/field-season-board.ts`, add one `note-tabs`-only inland logged close on the first `edge-pattern-line` state after `tundra-survey-slice`.
2. Keep `hand-lens`, `place-tab`, `route-marker`, the board summary, and the filed `Short Season` note identity unchanged.
3. Add focused board and runtime-smoke coverage for the new `INLAND LINE LOGGED` strip state.

## Expected File Touches

- `src/engine/field-season-board.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add another station page, card, or support row
- do not rename `Short Season`, `Thaw Window`, or `Scrub Pattern`
- keep the payoff notebook-first and compact
- leave nursery wording, broader guided-season routing, and route-marker behavior alone in this pass

## Queue Guidance

- close `ECO-20260403-scout-217` with this report
- bump packet `091` to version `3`
- retarget `ECO-20260403-main-217` and `ECO-20260403-critic-217` to this handoff
- promote `ECO-20260403-main-217` to `READY`
