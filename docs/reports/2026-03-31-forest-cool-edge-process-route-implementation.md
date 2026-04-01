# Forest Cool Edge Process Route Implementation

## Summary

`forest-cool-edge` is now the first live process-backed Route v2 outing.

The route still uses the existing `assemble-evidence` and `routeV2Progress` seam, but it now switches into a process-aware `Moist Edge` framing when the authored `moisture-hold` window is actually live.

## What Changed

- Added an optional Route v2 process-focus layer in `field-requests.ts` so live outings can swap title and summary copy when an authored habitat-process moment is active.
- Wired `forest-cool-edge` to that layer with the existing `moisture-hold` moment.
- Kept the same three evidence slots, notebook-ready flow, and filed note so this step stays outing-focused rather than drifting into filing-depth or a new save model.
- Aligned the existing `Moist Edge` replay copy in `field-season-board.ts` with the new route framing so the board, season wrap, field notice, and active request surfaces all describe the same live condition.

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "shows one route replay note when re-entering the active route biome during a live replay window|surfaces the live replay note in the world-map footer when the route target is focused"`
- `npm run build`
