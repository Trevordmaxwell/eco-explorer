# 2026-04-04 Route-Marker Guidance Implementation

Implemented `ECO-20260404-main-261`.

## What Changed

- Updated `src/engine/game.ts` so `route-marker` now guides world-map focus, not just the pin:
  - opening the world map from play now prefers the active outing target when `route-marker` is selected
  - closing the field station back to an already-open world map now snaps focus to that same outing target when `route-marker` is selected
- Kept the change helper-sized by reusing the existing route-marker location resolver and current world-map footer behavior instead of adding new map chrome.

## Tests

- Updated `src/test/runtime-smoke.test.ts` with focused support-guidance coverage:
  - opening the world map from Forest Trail with `route-marker` already selected now lands on `coastal-scrub`
  - buying/selecting `route-marker` from the field station on the world map now returns with focus already on the outing target
  - the focused footer still shows the live route-facing `Today:` label (`Haze Shift` on the seeded coastal follow-on)

## Verification

- `npx vitest run src/test/runtime-smoke.test.ts -t "route marker"`
- `npm run build`

## Notes

- This deepens `route-marker` without touching render chrome, support unlock order, or the other support roles.
- If the helper row still feels too thin after this, the next decision can judge simplification against a stronger final `route-marker` behavior rather than against the old decorative-pin version.
