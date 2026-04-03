# 2026-04-02 High-Country Place Tab Review

Review for `ECO-20260402-critic-134`.

## Result

No blocking issue.

## What Reads Well

- The follow-on stays inside the existing lane-4 support philosophy: same support row, same save seam, and no new planner, notebook, or reward shell.
- Moving the `place-tab` unlock to `treeline-stone-shelter` is a clean midpoint. It arrives in time for the high-country middle beat without pulling the support farther back into the earlier forest and coast routes.
- Reusing the tundra `thaw-edge` prompt keeps the new question short, science-safe, and content-owned instead of growing a separate runtime copy path.
- The focused tests cover the real risk: earlier unlock normalization, the high-country `TODAY` strip question, and the updated support cycle that still reaches `route-marker` on the world map.

## Non-Blocking Watch Item

If `place-tab` spreads again later, keep it tied to specific active-beat prompts and avoid moving its unlock earlier than the current inland handoff without a stronger reason. The support works here because it adds one question at the exact point the route benefits from it; broadening it too early would make the row busier before the outing loop earns that complexity.

## Verification

- `npx vitest run src/test/save.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "switches the route board to treeline and can hand the outing guide to route marker|switches the route board to tundra and can hand the outing guide to route marker|shows the treeline place-tab question once the edge line reaches Low Fell|switches the route board to coastal scrub and can hand the outing guide to route marker"`
- `npm run build`
