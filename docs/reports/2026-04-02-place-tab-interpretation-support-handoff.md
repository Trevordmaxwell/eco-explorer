# 2026-04-02 Place Tab Interpretation Support Handoff

Scout handoff for `ECO-20260402-scout-107`.

## Scope

Prepare one tiny lane-4 follow-on so `main-145` adds interpretation help to the existing outing support row without turning the field station into a loadout, planner, or second notebook shell.

## Best Target

Add one fourth support choice: `place-tab`.

Why this is the right next support:

- `hand-lens` already covers clue fit and inspect-time evidence tagging.
- `note-tabs` already keeps the route board notebook-first.
- `route-marker` already covers travel and map approach.
- The missing support axis is "what place-reading question am I carrying into this outing?"

That makes a tiny prompt-first support a cleaner gain than another clue reward, another nursery-only hint, or a heavier planning surface.

## Best Small Pass

### Keep the support in the current row and save seam

Do not add a new shop card, inventory slot, notebook page, or planner overlay.

The clean move is to extend the existing `OutingSupportId` cycle by one text-only option:

- before `edge-pattern-line` opens, keep the current cycle unchanged
- once `tundra-survey-slice` is logged and the edge line is live, cycle as:
  - without owned `route-marker`: `hand-lens -> note-tabs -> place-tab -> hand-lens`
  - with owned `route-marker`: `hand-lens -> note-tabs -> place-tab -> route-marker -> hand-lens`

That keeps the philosophy intact: one calm support row, one extra choice only when lane 4 is ready for a more interpretive route family.

### Pin one place-reading question to `TODAY`

`place-tab` should only change the existing season-strip behavior.

When selected, the `TODAY` wrap should use one short authored question instead of:

- the clue-first `hand-lens` detail
- the notebook-summary `note-tabs` text
- the travel-first `route-marker` cue

The strongest source is the existing ecosystem-note `observationPrompt` copy already authored for the live edge-line beats:

- `scrub-edge-pattern` -> Coastal Scrub `shelter-builds-here`
  - `Where does the scrub start looking calmer?`
- `forest-cool-edge` -> Forest `creekside-shelter`
  - `What here looks held by cool, wet cover?`
- `treeline-low-fell` -> Treeline `tree-line-drops`
  - `Where does tree cover drop into low fell here?`

This keeps the text content-owned, kid-readable, and tied to the same science-safe note system already live in the journal.

### Let the support stay tiny outside the edge line

The implementation does not need a full prompt-mapping system for every earlier route.

It is enough for `place-tab` to have a distinct authored prompt on `edge-pattern-line`, where this packet is focused. Outside that route family, the safest fallback is to reuse the active beat detail rather than inventing new copy.

## Best Main-Agent Slice For `main-145`

1. In `src/engine/types.ts` and `src/engine/save.ts`, add `place-tab`, preserve it through save normalization, and gate the new cycle so it only appears once `edge-pattern-line` is open.
2. In `src/engine/field-season-board.ts`, add one tiny prompt resolver for the active `edge-pattern-line` beat and feed that question into the existing `TODAY` wrap when `place-tab` is selected.
3. In `src/engine/game.ts`, add the support-toggle notice copy for `place-tab`.
4. In `src/engine/overlay-render.ts`, label the fourth support as `PLACE TAB`.
5. In `src/test/save.test.ts`, cover the gated support cycle before and after the edge line unlocks.
6. In `src/test/field-season-board.test.ts`, add expectations that `place-tab` shows the authored prompt on the `edge-pattern-line` beats and falls back safely elsewhere.
7. In `src/test/runtime-smoke.test.ts`, add one focused station-flow assertion that the support can be selected once the edge line opens and that the `TODAY` strip shows the treeline prompt.

## Expected File Touches

- `src/engine/types.ts`
- `src/engine/save.ts`
- `src/engine/field-season-board.ts`
- `src/engine/game.ts`
- `src/engine/overlay-render.ts`
- `src/test/save.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add a new purchasable upgrade or support shop unlock
- do not pull nursery reward hints into the main support behavior
- do not open a new journal, checklist, or planner surface
- keep the support text question-first and compact enough for the current strip budget
- keep the support distinct from `note-tabs`; it should ask what to read, not summarize what to file

## Queue Guidance

- close `ECO-20260402-scout-107` with this report
- bump packet `051` to version `3`
- promote `ECO-20260402-main-145` to `READY`
- leave `ECO-20260402-critic-118` blocked behind implementation
