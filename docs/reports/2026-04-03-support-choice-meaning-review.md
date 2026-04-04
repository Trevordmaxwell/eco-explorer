# 2026-04-03 Support-Choice Meaning Review

Review report for `ECO-20260403-critic-225`.

## Result

No blocking issues found.

## What Holds Up

- `place-tab` now stays meaningfully distinct on the inland survey capstone by reusing an existing tundra observation prompt instead of falling back to the same detail-first text as `hand-lens`.
- The pass stays inside the current support seam: no new support type, unlock rule, route shell, or station UI was added.
- Coverage is proportionate to the risk. The board test checks the support split directly, and the seeded runtime tests prove the same question survives both generic `Tundra Survey` and peak `Bright Survey`.

## Watch Item

- If a later route needs a `place-tab` question that no longer matches a reusable ecosystem-note prompt, add a small route-owned override seam instead of warping the underlying note text just to serve the support row.

## Verification

- `npx vitest run src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts -t "tundra survey place-tab|Bright Survey route replay note when re-entering tundra during peak phenology|treeline place-tab question once the edge line reaches Low Fell|tundra survey beat while hand lens stays detail-facing"`

## Next Step

- Promote `ECO-20260403-scout-248` to `READY`.
