# Held Sand Hand-Lens Second-Proof Implementation

Implemented `ECO-20260405-main-290` for lane 4.

## What Changed

- Added one second-route controller regression in [field-request-controller.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-request-controller.test.ts) proving the slot-local hand-lens preference seam also marks `beach-grass` as the preferred `Held Sand` `open-pioneer` carrier while leaving non-`hand-lens` supports untouched.
- Added one deterministic Coastal Scrub runtime proof in [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts) showing:
  - `hand-lens` resolves to `beach-grass` on a live back-dune `Held Sand` shelf
  - the same shelf does not resolve to `beach-grass` for `note-tabs`
  - pressing `e` records `open-pioneer -> beach-grass` only for the hand-lens run
- Added one tiny debug-state seam in [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts): `render_game_to_text()` now exposes `nearestInspectableEntityId`, so runtime smoke can lock onto the actual inspect target chosen by the live keyboard path instead of inferring from the wider nearby list.

## Why The Runtime Needed That Tiny Seam

The live Held Sand behavior was already correct in the controller layer, but the runtime smoke harness only exposed `nearbyInspectables`, which includes entries outside the actual inspect radius. Exposing the current nearest inspect target through the existing debug hook let the test prove the real `e` target without changing the player-facing runtime.

## What Stayed Unchanged

- No new route id, replay family, or alternate carrier list.
- No new support rule beyond the already-live slot-local hand-lens preference.
- No new station shell, route HUD, or support-surface copy.

## Verification

- `npx vitest run src/test/field-request-controller.test.ts -t "Held Sand|process-only alternates|active process-only"`
- `npx vitest run src/test/runtime-smoke.test.ts -t "Held Sand clue on the live back-dune shelf|same Held Sand shelf setup|Held Sand replay window|held-sand route replay note"`
- `npx vitest run src/test/field-request-controller.test.ts src/test/runtime-smoke.test.ts -t "Held Sand|back-dune shelf|held-sand route replay note|same Held Sand shelf setup|process-only alternates"`
- `npm run build`
