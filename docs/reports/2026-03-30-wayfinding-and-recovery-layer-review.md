# 2026-03-30 Wayfinding And Recovery Layer Review

Reviewed `ECO-20260330-main-105` against packet `033`, the lane-3 brief, the wayfinding scout handoff, the focused cue/runtime tests, and the seeded browser artifacts in `output/main-105-browser/`.

## Result

No blocking findings.

The new cue layer is subtle enough to keep lane 3 cozy, useful enough to justify itself, and clean enough to promote `ECO-20260330-main-106`.

## What Holds Up

- The implementation stayed inside the approved shape from the scout handoff. It adds one tiny authored forest-only in-world cue layer instead of growing a new HUD row, text-label surface, or more aggressive climb-icon logic.
- The cave cue earns its keep. In `output/main-105-browser/stone-basin-cue.png`, the brighter return shelf reads a little sooner from `stone-basin`, but the player still has to notice the room and climb back out rather than follow a loud arrow.
- The canopy cue stays quiet enough to feel environmental instead of instructional. In `output/main-105-browser/old-growth-cue.png`, the inner-bark rest reads as a calmer opening inside the trunk family, while the climbable trunk and rung still do the main navigation work.
- The layer respects existing player control and readability rules. It disappears with `showInspectHints` off, only resolves in normal biome play, and exposes `visibleVerticalCueIds` so the cue behavior is testable instead of screenshot-only.

## Watch Item

- The cue art is right at the edge of how “authored” this support layer should feel, especially in the canopy where any second marker near the top perch could start reading like a collectible or platform-game breadcrumb. The next crossover beat should spend its coherence budget on one optional world link, not on expanding the cue vocabulary or adding more marker density.

## Verification

- Reviewed:
  - `src/engine/vertical-cues.ts`
  - `src/engine/biome-scene-render.ts`
  - `src/engine/pixel-ui.ts`
  - `src/engine/game.ts`
  - `src/content/biomes/forest.ts`
  - `src/test/vertical-cues.test.ts`
  - `src/test/forest-biome.test.ts`
  - `src/test/runtime-smoke.test.ts`
  - `output/main-105-browser/stone-basin-cue.png`
  - `output/main-105-browser/old-growth-cue.png`
  - `output/main-105-browser/errors.json`
- Re-ran:
  - `npm test -- --run src/test/vertical-cues.test.ts src/test/forest-biome.test.ts src/test/runtime-smoke.test.ts`

## Queue Guidance

- Close `ECO-20260330-critic-80`.
- Promote `ECO-20260330-main-106` to `READY`.
- Keep the “do not add a second cue language” watch item in scope for the crossover beat and the final lane-3 review.
