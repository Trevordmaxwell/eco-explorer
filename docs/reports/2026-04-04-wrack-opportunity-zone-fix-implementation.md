# 2026-04-04 Wrack Opportunity Zone Fix Implementation

Implementation report for `ECO-20260404-main-262`.

## Scope

- `src/engine/field-requests.ts`
- `src/engine/game.ts`
- `src/test/field-requests.test.ts`
- `src/test/runtime-smoke.test.ts`

## What Landed

- Threaded the inspected entity's zone through the Route v2 inspect seam in `src/engine/game.ts`, so `hand-lens` preview and route advancement no longer rely on `entryId` plus player zone alone.
- Tightened zone-specific Route v2 slot matching in `src/engine/field-requests.ts`: when a slot requires a zone, both the player's current zone and the observed entity's zone must match before the clue can preview or advance.
- Kept the live `Wrack Shelter` opportunity intact:
  - tide-line `beach-hopper` still satisfies `wrack-line` during active `wrack-hold`
  - lee-pocket `beach-hopper` no longer leaks across the zone seam
  - notebook-ready and filed states remain canonically `Shore Shelter`

## Test Coverage

- `src/test/field-requests.test.ts`
  - added a regression that a lee-pocket `beach-hopper` does not preview or advance `wrack-line` from the tide-line boundary
- `src/test/runtime-smoke.test.ts`
  - added a live seed proof (`probe-2`) where the player crosses into `tide-line` while a lee-pocket `beach-hopper` remains in inspect range, confirming the route stays at `2/3 stages`
  - kept the valid live-window finish proof where a tide-line `beach-hopper` still completes `Wrack Shelter`

## Verification

- `npx vitest run src/test/field-requests.test.ts -t "beach-hopper|Wrack Shelter|Shore Shelter|lee-pocket beach-hopper"`
- `npx vitest run src/test/runtime-smoke.test.ts -t "Wrack Shelter finish through beach-hopper|lee-pocket beach-hopper finish Wrack Shelter"`
- `npm run build`

## Follow-On

- `ECO-20260404-critic-262` can now review whether the fix closes the cross-zone leak without making the live route opportunity feel gated or brittle.
