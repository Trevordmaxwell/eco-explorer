# High Pass Chapter-State Hardening Implementation

## Queue Ref

- `ECO-20260418-main-311`

## What Landed

Lane 1 now resolves the filed-season `High Pass` chapter through one dedicated helper in [high-pass-chapter-state.ts](/Users/trevormaxwell/Desktop/game/src/engine/high-pass-chapter-state.ts) instead of recomposing the same chapter facts across several `field-season-board.ts` branches.

The helper now owns the shared `High Pass` chapter copy for:

- the outing locator
- the routes subtitle and archive continuity copy
- the dormant vs live atlas note
- the routes launch card
- the filed-season expedition card

[field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts) now keeps thin adapters over that helper and leaves the existing `treeline-high-pass` dormancy guard in [field-requests.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-requests.ts) unchanged.

## Verification

- `npm test -- --run src/test/field-season-board.test.ts`
- `npm test -- --run src/test/field-requests.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "surfaces the season capstone, then opens the next field season on the routes shell"`
- `npm run build`

## Result

The live station shell stays routes-first and one-card-first, but the filed-season `High Pass` state now has a smaller home before more chapter-side growth lands.
