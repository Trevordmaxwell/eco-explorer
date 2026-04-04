# 2026-04-03 Field-Request State Split Review

Reviewed `ECO-20260403-critic-227` against packet `096`.

## Result

No blocker.

## What Holds

- `src/engine/field-request-state.ts` keeps the second split inside the intended pure derivation seam: request context, notebook hint, journal fallback, route marker, and replay-label state are now explicit without pulling timer writes or filing logic out of `game.ts`.
- The wrapper calls left in `src/engine/game.ts` stay thin and behavior-preserving, so the runtime still owns `showFieldNotice()`, `showFieldRequestNotice()`, `maybeShow*Notice()`, and `maybeCompleteActiveFieldRequest()` exactly where packet `096` wanted the side-effect boundary to stay.
- The new helper coverage plus the focused runtime-smoke slice lock the three highest-risk surfaces for this pass: notebook hint visibility, route-marker world-map targeting, and route replay label behavior.

## Follow-Through

Close packet `096` and promote `ECO-20260403-scout-230`. Lane 1 can move from controller protection back into the visible station-transformation wave.
