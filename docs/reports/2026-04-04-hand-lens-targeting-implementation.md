# 2026-04-04 Hand-Lens Targeting Implementation

Implemented `ECO-20260404-main-269`.

## What Changed

- Updated `src/engine/game.ts` so `hand-lens` now changes live inspect targeting, not just fact-bubble copy:
  - `getNearestInspectable()` still falls back to the nearest entity for every other support
  - when `hand-lens` is selected, it now prefers the nearest in-range inspectable that resolves through `getHandLensNotebookFit(...)`
  - the same resolver still drives both the field inspect marker and the `E` inspect action, so the visible cue and actual pickup stay aligned
- Kept the change helper-sized:
  - no inspect-range change
  - no click-hit override
  - no new support chrome or route rules

## Tests

- Updated `src/test/runtime-smoke.test.ts` with two focused tide-line proofs on the last `Shore Shelter` stage:
  - with `hand-lens`, pressing `E` near both the stable wrack and the nearer crab now opens `bull-kelp-wrack` and completes the route
  - with `note-tabs`, the same position no longer gets pulled onto the route clue and the request stays at `2/3 stages`
- Re-ran the nearby `Wrack Shelter` smokes to confirm the existing zone-safe and live-window beach route behavior still holds.

## Verification

- `npx vitest run src/test/runtime-smoke.test.ts -t "hand lens prefer|normal nearest tide-line"`
- `npx vitest run src/test/runtime-smoke.test.ts -t "Wrack Shelter|hand lens prefer|normal nearest tide-line"`
- `npm run build`

## Notes

- This gives `hand-lens` a distinct in-field role that complements the existing support split:
  - `route-marker` guides map planning
  - `place-tab` keeps a place-reading question alive
  - `note-tabs` carries notebook framing
  - `hand-lens` now helps the player grab the right live clue in a crowded route space
