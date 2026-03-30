# 2026-03-30 Vertical Runtime Expansion Review

## Scope

Review `ECO-20260330-main-91`: the first lane-3 vertical runtime pass for deeper caves and giant-tree spaces.

## Critic Read

No blocking issues.

Why this pass works:

- `cameraY` stays narrow and understandable. The runtime still uses the existing authored terrain, platform, and climbable model instead of sliding into a cave-topology rewrite.
- `depthFeatures` are clearly visual framing, not a second collision system. That keeps the new seam useful for giant trees and chambers without making content authors learn a whole new geometry model.
- The forest proof is worth using. `root-hollow` now reads as a genuinely deeper place instead of just another shallow ledge stack, and the chamber pocket gives lane 3 a real screen-language for future spaces.
- The play scale still holds at the shipped viewport. The deeper hollow remains readable in the browser capture, and the climb route still looks like exploration rather than precision-platforming.
- The changes are concentrated in the right places: engine runtime seams, one proof biome, and focused tests. That is the right amount of surface area for this phase.

Residual watch item:

- Before lane 3 ships a second tall biome, add one regression that proves the camera fully settles back to `y = 0` when the player leaves a tall forest or corridor space and re-enters a screen-height biome. The current proof covers the deep forest route well, but not a mixed-height travel hop. This is not a blocker for the next giant-tree content step.

## Verification

- Reviewed:
  - `src/engine/game.ts`
  - `src/engine/biome-scene-render.ts`
  - `src/engine/generation.ts`
  - `src/engine/types.ts`
  - `src/content/biomes/forest.ts`
  - `src/test/forest-biome.test.ts`
  - `src/test/runtime-smoke.test.ts`
- Ran:
  - `npm test -- --run src/test/forest-biome.test.ts src/test/runtime-smoke.test.ts`
  - `npm run build`
- Reviewed browser proof artifacts:
  - `output/main-91-root-hollow-browser/root-hollow.png`
  - `output/main-91-root-hollow-browser/state.json`
  - `output/main-91-root-hollow-browser/errors.json`
- Result:
  - focused tests passed
  - production build passed
  - root-hollow proof shows `camera.y: 18` with no captured console errors

## Queue Guidance

- Close `ECO-20260330-critic-66`.
- Keep `ECO-20260330-main-92` blocked only on `ECO-20260330-scout-60`.
- Do not reopen the runtime split before the first giant-tree content pass; the current seam is strong enough to build on.
