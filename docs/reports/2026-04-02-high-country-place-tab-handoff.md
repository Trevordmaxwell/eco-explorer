# 2026-04-02 High-Country Place Tab Handoff

Scout handoff for `ECO-20260402-scout-123`.

## Scope

Prepare one tiny lane-4 follow-on so `main-161` deepens the live high-country route through the existing support row instead of opening another filing shell, support type, or route system.

## Best Target

Bring `place-tab` onto the active `tundra-short-season` beat.

Why this is the right follow-on:

- `hand-lens` already covers clue fit and active-beat guidance.
- `note-tabs` already covers notebook-first summary and ready-to-file preview.
- `route-marker` already covers travel and world-map approach.
- The missing piece is one place-reading question during the actual high-country middle beat, and `place-tab` is already the approved support for that job.

Right now `place-tab` unlocks too late. It only appears once `tundra-survey-slice` is logged, which means the player cannot use it during the route that just became stronger.

## Best Small Pass

### Unlock `place-tab` one beat earlier

Move the existing `place-tab` unlock gate from `tundra-survey-slice` to `treeline-stone-shelter`.

That keeps the support row unchanged through the earlier forest and coast chapters, but it makes the support available exactly when the inland line turns from sheltered treeline into the active `Short Season` thaw-window beat.

### Reuse one authored tundra prompt

Do not invent a new runtime prompt bank.

On `treeline-shelter-line`, when `tundra-short-season` is the active beat and `place-tab` is selected, reuse the existing tundra ecosystem-note prompt from `thaw-edge`:

- `What here marks the wet edge of thaw?`

That prompt is already short, science-safe, place-first, and aligned with the new `snow-meadow -> thaw-skirt -> brief-fruit` chapter shape.

### Keep everything else unchanged

- Leave `edge-pattern-line` prompts exactly as they are.
- Leave `note-tabs` notebook behavior exactly as it is.
- Leave `route-marker` ownership and map behavior exactly as it is.
- Outside the active `tundra-short-season` beat, keep the current `place-tab` fallback behavior rather than growing a broader prompt-mapping system.

## Why The Alternatives Are Weaker

### More note-tabs or filing copy

That would duplicate the notebook-first work that already landed in the last two lane-4 passes. The current gap is not "more filing language." It is "one interpretive question during the outing itself."

### A brand-new support or support reward

That would break the lane's guardrails. The current support row already has the right shape, and `place-tab` already owns the question-first niche.

### A broader prompt spread across every route family

That is more work than this packet needs and would risk turning the tiny `TODAY` strip into a larger authored-copy surface. This step only needs to make the high-country middle beat benefit from the support that already exists.

## Best Main-Agent Slice For `main-161`

1. In `src/engine/save.ts` and `src/test/save.test.ts`, move the `place-tab` unlock gate so the support cycle opens once `treeline-stone-shelter` is logged.
2. In `src/engine/field-season-board.ts`, extend the existing `place-tab` resolver so `treeline-shelter-line` uses the tundra `thaw-edge` prompt while `tundra-short-season` is active.
3. In `src/test/field-season-board.test.ts`, add or update expectations that the `TODAY` strip shows the thaw-edge question on the active high-country beat while the old edge-line prompts still resolve unchanged.
4. In `src/test/runtime-smoke.test.ts`, add one focused station-flow proof that the high-country route board can cycle to `place-tab` and shows the thaw-edge question on the strip.

## Expected File Touches

- `src/engine/save.ts`
- `src/engine/field-season-board.ts`
- `src/test/save.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add a new support type
- do not unlock `place-tab` from the start of the game
- do not widen the support row or add a new planner shell
- do not replace the existing edge-line prompts
- keep the new high-country question on the current `TODAY` strip only

## Queue Guidance

- close `ECO-20260402-scout-123` with this report
- bump packet `059` to version `3`
- promote `ECO-20260402-main-161` to `READY`
- leave `ECO-20260402-critic-134` blocked behind implementation
