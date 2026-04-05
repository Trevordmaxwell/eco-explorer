# 2026-04-04 Hand-Lens Targeting Review

Reviewed `ECO-20260404-main-269`.

## Result

No blocking issues found.

## What Holds Up

- The pass stays inside the intended lane-4 seam. `hand-lens` now changes live outing feel through inspect targeting, not through another station strip variant or a wider helper row.
- The behavior is support-specific and reversible:
  - `hand-lens` prefers the nearest in-range notebook-fit clue
  - other supports keep the normal nearest-entity inspect path
  - explicit click-to-inspect behavior remains unchanged
- The chosen live proof is strong and truthful. The beach tide-line already carries a route clue plus nearby non-route distractors, so the helper difference is felt inside real route play instead of a synthetic UI-only setup.
- The focused runtime coverage is proportionate to the risk:
  - one seed proves `hand-lens` can pull the last `Shore Shelter` stage onto `bull-kelp-wrack`
  - one seed proves a non-`hand-lens` support does not get that targeting boost
  - the broader wrack-family smoke still keeps the existing zone-safe and live-window route behavior intact

## Watch Item

- If a later helper follow-on wants to go further, keep it in the same existing inspect-targeting seam. Do not grow this into another floating chip, planner cue, or support-specific click override.

## Verification Reviewed

- `npx vitest run src/test/runtime-smoke.test.ts -t "hand lens prefer|normal nearest tide-line"`
- `npx vitest run src/test/runtime-smoke.test.ts -t "Wrack Shelter|hand lens prefer|normal nearest tide-line"`
- `npm run build`

## Result

- Promote `ECO-20260404-scout-270`.
