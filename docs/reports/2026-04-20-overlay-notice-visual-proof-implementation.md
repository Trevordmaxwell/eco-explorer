# Overlay Notice Visual Proof Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-412`
Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
Lane: `lane-3`

## Result

Captured after-extraction browser proof for the moved notice-render family. No runtime source, copy, layout, route, station, save, content, or geometry files changed.

The expected visual delta from the lane-1 extraction remains `none`. The lane-1 review and focused tests are the before-behavior contract; the artifacts below are the after-extraction visual proof.

## Captures

- `output/lane-3-main-412-overlay-proof/guided-field-request-notice.png`
  - Fresh beach play state with the `NOTEBOOK TASK` field-request notice visible.
  - Matching state: `output/lane-3-main-412-overlay-proof/guided-field-request-notice-state.json`
- `output/lane-3-main-412-overlay-proof/field-partner-strip.png`
  - Coastal-scrub calm play state with the field-partner strip visible after the task notice clears.
  - Matching state: `output/lane-3-main-412-overlay-proof/field-partner-strip-state.json`
- `output/lane-3-main-412-overlay-proof/client-basic/`
  - `$WEB_GAME_CLIENT` smoke artifacts for the fresh guided notice state.
- `output/lane-3-main-412-overlay-proof/errors.json`
  - Empty console/page-error list for the custom capture pass.

## Readability Notes

- The guided field-request notice stays inside the lower handheld safe area and remains readable at the raw `256x160` canvas.
- The field-partner strip remains intentionally tiny and notebook-margin-like; the active cue text is short enough to read without covering the playfield.
- The debug states match the visible world: `fieldRequestNotice.variant` is `default` for the guided notice capture, and `fieldPartner.active.cueId` is `scrub-back-dune-timing` with `fieldRequestNotice: null` for the partner-strip capture.

## Verification

```bash
node /Users/trevormaxwell/.codex/skills/develop-web-game/scripts/web_game_playwright_client.js --url http://127.0.0.1:4174 --screenshot-dir output/lane-3-main-412-overlay-proof/client-basic --actions-json '{"steps":[{"buttons":["enter"],"frames":8},{"buttons":[],"frames":30}]}' --iterations 2 --pause-ms 250
npm test -- --run src/test/overlay-copy.test.ts src/test/field-notices.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t "field-season guidance|field-request notice timers|field-partner strip"
```

`npm run validate:agents` and `git diff --check` are queued after metadata updates.
