# 2026-04-03 Held Sand Note-Tabs Support Review

Review report for `ECO-20260403-critic-249`.

## Result

No blocking issues found.

## What Holds Up

- The new support split is clear by feel. On active `Held Sand`, `hand-lens` now stays moment-specific while `note-tabs` holds the stable `Scrub Pattern` notebook route, so the two supports no longer compete for the same job.
- The pass stays narrow. It only adds one route-owned `note-tabs` replay exception in `field-season-board.ts`; no new support type, route-definition seam, map chrome, or station-shell layer was introduced.
- The old inland chapter-close seam is still protected. Focused board and runtime checks confirm the existing `INLAND LINE LOGGED` `note-tabs` close still works when `Held Sand` is not active.

## Watch Item

- If another replay-active `note-tabs` exception lands later, move the growing inline checks into one explicit selector helper instead of stacking more route-specific conditions directly in `resolveSupportAwareTodayWrap()`.

## Verification

- `npx vitest run src/test/field-season-board.test.ts -t "Held Sand|replay|note tabs"`
- `npx vitest run src/test/runtime-smoke.test.ts -t "held-sand route replay note when re-entering coastal scrub during the active process window|keeps note tabs on the stable scrub pattern line during the Held Sand replay window|Bright Survey route replay note when re-entering tundra during peak phenology|wrack-shelter route replay note when re-entering beach during the active process window"`
- `npx vitest run src/test/field-season-board.test.ts -t "inland note-tabs|Held Sand|note tabs"`
- `npx vitest run src/test/runtime-smoke.test.ts -t "uses a note-tabs chapter-close line once the edge line is logged|keeps note tabs on the stable scrub pattern line during the Held Sand replay window"`

## Next Step

- Lane 4 is clear for the current packet wave.
