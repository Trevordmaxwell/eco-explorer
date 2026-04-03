# 2026-04-02 Place Tab Interpretation Support Implementation

Implementation note for `ECO-20260402-main-145`.

## Outcome

Lane 4's support row now has one more tiny, text-only interpretation option without opening any new shell.

`place-tab` is live as an earned support once `edge-pattern-line` opens. It keeps one authored place-reading question on the existing `TODAY` strip, so the support split now reads as:

- `hand-lens`: clue-first
- `note-tabs`: notebook-first
- `place-tab`: place-question-first
- `route-marker`: travel-first

## What Changed

### Save and support cycle

`src/engine/types.ts` and `src/engine/save.ts` now carry `place-tab` as a normal persisted `selectedOutingSupportId`.

The cycle stays unchanged before `tundra-survey-slice` is logged. Once the edge line is live, the cycle becomes:

- without owned `route-marker`: `hand-lens -> note-tabs -> place-tab -> hand-lens`
- with owned `route-marker`: `hand-lens -> note-tabs -> place-tab -> route-marker -> hand-lens`

Legacy or locked saves that point at `place-tab` safely fall back to `hand-lens`.

### `TODAY` strip prompt seam

`src/engine/field-season-board.ts` now resolves a small `place-tab` prompt path inside the existing support-aware wrap helper.

On `edge-pattern-line`, it reuses authored ecosystem-note `observationPrompt` copy instead of inventing new runtime strings:

- `scrub-edge-pattern` -> `Where does the scrub start looking calmer?`
- `forest-cool-edge` -> `What here looks held by cool, wet cover?`
- `treeline-low-fell` -> `Where does tree cover drop into low fell here?`

Outside that route family, `place-tab` safely falls back to the active beat detail so the support never needs a broader prompt system.

### Surface copy

`src/engine/game.ts` now gives `place-tab` its own support-toggle notice, and `src/engine/overlay-render.ts` labels the new option as `PLACE TAB` in the existing support row.

## Verification

- `npx vitest run src/test/save.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "switches the route board to coastal scrub and can hand the outing guide to route marker|shows the treeline place-tab question once the edge line reaches Low Fell|surfaces the season capstone, then opens the next field season through the expedition seam"`
- `npm run build`
