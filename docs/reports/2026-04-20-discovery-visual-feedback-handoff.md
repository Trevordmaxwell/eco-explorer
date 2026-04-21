# Discovery Visual Feedback Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-400`
Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
Lane: `lane-3`

## Scout Finding

Packet 148's lane-3 slice should stay visual and world-space. Lane 1 has already handled hidden feedback timing, lane 2 handled sound helper tone, and lane 4 handled route-notice priority, so lane 3 should not reopen audio, notices, station feedback, route state, or copy.

The best remaining target is a tiny first-discovery accent around the inspected object. The current inspect flow already distinguishes `isNewEntry`, plays the existing `inspect-reveal` cue, and shows the fact bubble. A short sparkle at the object position would make the world feel more responsive without adding a particle system, journal UI, or another overlay.

## Recommended Main Scope

Keep `ECO-20260420-main-400` small:

- Add a short-lived discovery feedback state when `inspectEntity(...)` records a first-time discovery.
- Render a few pixel-sized cream/tan sparkle marks near the inspected object's world position through `drawBiomeScene(...)`.
- Let the accent expire automatically in visible runtime time and clear it on biome/scene changes.
- Expose the current accent through `render_game_to_text()` as a compact `discoveryFeedback` object for deterministic tests.
- Add a focused runtime-smoke assertion that a first-time `beach-grass` inspect creates the accent, the accent expires, and a repeat inspect of the same discovered entry does not recreate it.
- Capture one ignored browser proof frame if the dev server is available.

## Shared-File Note

`src/engine/game.ts` is a shared/lane-1-heavy coordinator file, but this pass needs one surgical exception because `inspectEntity(...)`, timer advancement, debug export, and the `drawBiomeScene(...)` call all currently live there. Keep the edit local to discovery feedback state and rendering handoff only. The visual drawing itself should live in `src/engine/biome-scene-render.ts`.

## Non-Goals

- No audio engine, audio profile, UI cue id, music, mixer, or sound toggle changes.
- No field-request notice timing or priority changes.
- No route state, route copy, station surfaces, journal layout, save schema, biome geometry, inspect range, target priority, or science content changes.
- No broad particle framework; this should be one tiny authored pixel accent.
- No feedback on repeat inspections, route filing, support toggles, homecoming, or station actions in this lane-3 pass.

## Verification

Baseline scout check passed:

```bash
npm test -- --run src/test/runtime-smoke.test.ts -t "covers title, play, inspect"
```

Recommended main verification:

```bash
npm test -- --run src/test/runtime-smoke.test.ts -t "covers title, play, inspect|discovery feedback"
npm run build
npm run validate:agents
git diff --check
```
