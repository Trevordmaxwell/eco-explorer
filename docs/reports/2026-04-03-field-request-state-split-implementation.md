# 2026-04-03 Field-Request State Split Implementation

Implemented `ECO-20260403-main-227` against packet `096`.

## What Changed

- Added `src/engine/field-request-state.ts`, which now owns the pure lane-1 request / outing state derivation for:
  - field-request context assembly
  - active field-request resolution
  - notebook hint derivation
  - season-outing fallback
  - journal field-request fallback
  - route-marker target location
  - world-map replay label
- Exported `FieldRequestContext` from `src/engine/field-requests.ts` so the new helper can reuse the existing request resolver without duplicating that shape.
- Reduced `src/engine/game.ts` so the former request / outing cluster now delegates to the new helper while `showFieldNotice()`, `showFieldRequestNotice()`, `maybeShow*Notice()`, and `maybeCompleteActiveFieldRequest()` remain in place as the timer and side-effect boundary.
- Added focused pure-helper coverage in `src/test/field-requests.test.ts` for notebook-hint gating and season-outing fallback.

## Why This Shape

This extracts a real progression-heavy state seam without widening into timers, notice ordering, or filing logic. The field-request, journal, route-marker, and replay-label math is now explicit and reusable, while `game.ts` still owns the interactive runtime boundaries.

## Verification

- `npx vitest run src/test/field-requests.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "surfaces one active field request in the journal and turns Hidden Hollow notebook-ready after the seep-stone confirm|buys route marker after the movement pair and lets the support row activate it on the world map|shows the thaw-window route replay note when re-entering tundra during the active process window"`
- `npm run build`
