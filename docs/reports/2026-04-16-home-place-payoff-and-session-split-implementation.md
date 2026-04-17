# Home-Place Payoff And Session-Split Implementation

## Queue Ref

- `ECO-20260416-main-303`

## What Landed

The Sprint 2 lane-1 pass paired one small return payoff with one station-owned split:

- [field-station-session.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-station-session.ts) now owns the field-station open-session normalization seam: ledger/nursery-driven arrival mode, selected upgrade normalization, selected nursery project normalization, and the arrival-pulse value helper
- [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts) now treats station open/close more like coordinator glue, carrying a compact `arrivalMode` through render and debug state instead of owning the whole open-session rule bundle
- [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts) now lets earned `homecoming` returns reuse the existing backdrop brace family during the arrival pulse, so meaningful station returns feel warmer without adding a new text seam

## Why This Fits

- The payoff stays inside the existing shell: same sill, same side braces, same arrival pulse, no new strip or recap text.
- The split reduces future change risk where station-return behavior is likely to keep growing.
- Ordinary station opens stay calm, while earned return opens now feel slightly more settled.

## Verification

- `npm test -- --run src/test/field-station.test.ts src/test/overlay-copy.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "opens the world-map field station, claims field credit, and buys trail stride"`
- `npm run build`
