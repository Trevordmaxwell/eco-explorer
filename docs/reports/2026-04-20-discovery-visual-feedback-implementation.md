# Discovery Visual Feedback Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-400`
Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
Lane: `lane-3`

## Result

Implemented the scoped first-discovery world-space feedback accent. First-time inspections now start a short-lived `discoveryFeedback` state and render a few tiny cream/tan sparkle pixels near the inspected object's world position. The accent expires automatically during visible biome play and is cleared when the scene/biome changes.

The effect is intentionally tiny: it supports the existing fact bubble and `NEW` badge without becoming a particle system or a second UI language.

## Changed Files

- `src/engine/biome-scene-render.ts`
- `src/engine/game.ts`
- `src/test/runtime-smoke.test.ts`
- `docs/reports/2026-04-20-discovery-visual-feedback-implementation.md`

## Browser Proof

Ignored artifacts:

- `output/lane-3-main-400-discovery-feedback/beach-discovery-feedback.png`
- `output/lane-3-main-400-discovery-feedback/beach-discovery-feedback-state.json`
- `output/lane-3-main-400-discovery-feedback/beach-discovery-feedback-errors.json`

The proof state shows a first-time beach discovery with `openBubble.isNewEntry: true`, `discoveryFeedback.remaining: 0.65`, one discovered journal entry, and no console/page errors. The screenshot shows the small world-space sparkle beside the discovered plant while the fact bubble remains readable.

## Scope Notes

- No audio engine, audio profile, UI cue id, music, mixer, or sound toggle changes.
- No field-request notice timing or priority changes.
- No route state, route copy, station surfaces, journal layout, save schema, biome geometry, inspect range, target priority, or science content changes.
- Repeat inspection of an already discovered entry does not recreate the accent.

## Verification

```bash
npm test -- --run src/test/runtime-smoke.test.ts -t "covers title, play, inspect|discovery feedback"
npm run build
node /Users/trevormaxwell/.codex/skills/develop-web-game/scripts/web_game_playwright_client.js --url http://127.0.0.1:4174 --screenshot-dir output/lane-3-main-400-discovery-feedback/start --iterations 1 --pause-ms 100 --actions-json '{"steps":[{"buttons":["enter"],"frames":2},{"buttons":[],"frames":10}]}'
```

Additional focused browser proof was captured with a small Playwright helper because the shared web-game client does not map the `E` inspect key.
