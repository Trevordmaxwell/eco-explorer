# 2026-04-03 Support-Choice Meaning Handoff

Scout handoff for `ECO-20260403-scout-225`.

## Scope Reviewed

- `docs/reports/2026-04-03-living-world-play-relevance-phase.md`
- `docs/reports/2026-04-03-route-aware-world-state-review.md`
- `.agents/packets/095-living-world-play-relevance-phase.json`
- `src/engine/field-season-board.ts`
- `src/engine/save.ts`
- `src/engine/game.ts`
- `src/content/biomes/tundra.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Best Target

Spend `main-225` on `place-tab` during `tundra-survey-slice`.

The current support row already has three supports with clear jobs:

- `hand-lens` is the clue-facing support through inspect bubbles and detail-led `TODAY` copy.
- `note-tabs` owns notebook-preview, filed-note, and chapter-close seams.
- `route-marker` changes world-map planning by pinning the current outing target.

`place-tab` is the soft middle support, and it is mostly working now that it has authored prompts on `tundra-short-season` plus the whole `edge-pattern-line`. The one live gap is `tundra-survey-slice`: once the player reaches the new `Bright Survey` or generic `Tundra Survey` capstone, `resolvePlaceTabPrompt()` has no `tundra-survey` branch, so `place-tab` falls back to the same route detail text that `hand-lens` already uses.

That makes `place-tab` feel least distinct at exactly the moment it should be helping the player read the second-act survey beat.

## Why This Is The Best Next Move

- It keeps the support-choice question tightly scoped to one real overlap instead of reopening the whole support row.
- It builds directly on the just-reviewed `Bright Survey` pass, so the new living-world outing also gains one support-specific way to read the route.
- It can reuse an existing authored tundra prompt instead of introducing another support system, new UI, or new content pack.

## Concrete Follow-On

### `field-season-board.ts`

Extend `resolvePlaceTabPrompt()` so `treeline-shelter-line` also covers `tundra-survey`.

Recommended prompt source:

- biome: `tundra`
- note id: `short-summer-rush`
- observation prompt: `What hints at a very short summer?`

That question is the best fit because `tundra-survey-slice` is the survey capstone after `Short Season`, and the route spans the same brief-season reading rather than a single new shelter or filing step.

Implementation shape:

- keep the existing `tundra-short-season -> thaw-edge` prompt unchanged
- add one `tundra-survey -> short-summer-rush` branch
- let it apply to both generic `Tundra Survey` and peak `Bright Survey`, since the support choice should stay distinct whether or not the phenology replay window is active

### What Should Stay Unchanged

- `hand-lens` should keep the detail or replay-note wording on the strip
- `note-tabs` should stay summary-first
- `route-marker` should keep its travel and map-pin role
- no new unlock rules, support ids, or extra field-station rows should appear

## Tests

Add focused regressions:

- `src/test/field-season-board.test.ts`
  - `place-tab` on the active `tundra-survey` beat uses `What hints at a very short summer?`
  - `hand-lens` on that same beat still uses the survey detail or replay note
- `src/test/runtime-smoke.test.ts`
  - after `tundra-short-season`, selecting `place-tab` on the live tundra survey beat changes the wrap to `What hints at a very short summer?`
  - the same prompt still appears when the beat is reframed as `Bright Survey`

## Why The Alternatives Are Weaker

### Do not spend this pass on deeper `route-marker` travel guidance

That would drift into world-map or travel-structure work that belongs closer to lane 1.

### Do not spend this pass on another `note-tabs` strip variant first

`note-tabs` already has a distinct identity through notebook preview, filed return, and logged-close beats. Another top-strip wording pass would do less to differentiate play moment-to-moment.

### Do not simplify `place-tab` away yet

The support already feels distinct on `tundra-short-season`, `scrub-edge-pattern`, `forest-cool-edge`, and `treeline-low-fell`. The cleanest move is to close the one missing `tundra-survey` gap before deciding the support is too thin.

## Best Main-Agent Slice For `main-225`

1. In `src/engine/field-season-board.ts`, add one `place-tab` survey question on `tundra-survey`.
2. Reuse the existing `short-summer-rush` authored observation prompt from `src/content/biomes/tundra.ts`.
3. Add focused board and runtime coverage showing that `place-tab` now stays distinct through both `Tundra Survey` and `Bright Survey`.

## Expected File Touches

- `src/engine/field-season-board.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add a new support type or support unlock
- do not widen into route-marker travel changes or a new map cue system
- do not add a new note or content-only pack if the existing `short-summer-rush` prompt fits
- keep the strip text compact enough for the handheld budget
