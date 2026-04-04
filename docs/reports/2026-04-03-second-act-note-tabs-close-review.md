# 2026-04-03 Second-Act Note-Tabs Close Review

Review for `ECO-20260403-critic-217`.

## Scope

- `docs/reports/2026-04-03-second-act-note-tabs-close-implementation.md`
- `src/engine/field-season-board.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Result

No blocking issues found.

The new inland return payoff stays inside the intended lane-4 seam:

- `note-tabs` gets one clear page turn right after `Tundra Survey`, so the second act now lands with the same compact authored feel the earlier chapter closes already have
- the live routes shell still points at `Scrub Pattern`, which keeps the station actionable instead of turning the strip into a recap layer
- the focused board and seeded runtime coverage both prove that `note-tabs` changes while `hand-lens` and the live route handoff remain intact

## Watch Item

`isInlandLineLoggedReturn()` currently keys off the edge-line opening state's structural markers (`activeBeatId === 'scrub-edge-pattern'` plus `progressLabel === '0/3 logged'`). That is a reasonable fit for this narrow pass, but future changes to the opening edge-line beat or its progress copy should update the helper and its focused tests together so the inland logged close does not silently drift.

## Verification

- `npx vitest run src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts -t "inland note-tabs|coastal scrub and can hand the outing guide to route marker|thaw-window route replay note"`

## Outcome

- `ECO-20260403-critic-217` can move to `DONE`
- lane 4 has no remaining active item in packet `091`
