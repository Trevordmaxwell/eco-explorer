# 2026-04-02 Place Tab Interpretation Support Review

Review for `ECO-20260402-critic-118` covering `ECO-20260402-main-145`.

## Result

No blocking issue.

## What Reads Well

- `place-tab` stays inside the existing lane-4 support philosophy: one more text-only option in the current row, no new shop card, no planner shell, and no second notebook surface.
- The save seam is still clean. Locked or legacy `place-tab` states safely fall back to `hand-lens`, while the unlocked cycle stays deterministic and easy to reason about.
- The support helps interpretation instead of duplicating the other choices: `hand-lens` still points at clues, `note-tabs` still points at notebook synthesis, `route-marker` still points at travel, and `place-tab` now carries one short place-reading question.
- The three live edge-line prompts reuse authored ecosystem-note wording, so the science-facing copy stays content-owned instead of drifting into ad hoc runtime strings.

## Non-Blocking Watch Item

If `place-tab` spreads to more route families later, keep those prompts centralized on the same helper and continue running browser-safe-area checks alongside the focused runtime tests.

This pass is safe today because the copy stays short and only the `edge-pattern-line` family gets distinct authored prompts, but the `TODAY` strip is still compact enough that broader prompt growth could turn into layout drift if it spreads piecemeal.

## Verification

- `npx vitest run src/test/save.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "switches the route board to coastal scrub and can hand the outing guide to route marker|shows the treeline place-tab question once the edge line reaches Low Fell|surfaces the season capstone, then opens the next field season through the expedition seam"`
- `npm run build`
