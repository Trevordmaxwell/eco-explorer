# Sound Feedback Lifecycle Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-398`
Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
Lane: `lane-1`

## Scout Finding

Lane 1 should not add more sound content or visual juice for this step. The existing sparse audio engine is already optional, no-op safe without Web Audio, and covered by focused audio plus runtime-smoke tests. The useful systems gap is feedback lifecycle: `fieldRequestNoticeTimer` currently ticks every update even when the notice is hidden behind menus, field station, close-look, journal, title, or a transition.

Rendering only shows field-request notices while `overlayMode === "playing"` and `sceneMode !== "transition"`, so a notebook-ready, filed-route, or replay notice can be consumed while the player cannot see it. That is the small "feedback dispatch" edge case packet `148` is asking lane 1 to protect.

## Recommended Main Scope

Add the smallest lifecycle guard for field-request notices:

- Add a tiny pure helper, preferably in `src/engine/field-notices.ts`, that decides when a field-request notice timer should advance.
- The helper should return true only when the notice is actually eligible to display: `overlayMode === "playing"`, `sceneMode !== "transition"`, and no field-guide notice is currently taking the toast slot.
- Use that helper in `src/engine/game.ts` before decrementing `fieldRequestNoticeTimer`.
- Add unit coverage in `src/test/field-notices.test.ts` for playing, menu/station overlay, transition, and field-guide-hidden cases.
- Add one focused `src/test/runtime-smoke.test.ts` regression where a route replay or notebook notice is shown, a menu hides it for longer than its normal duration, then closing the menu still leaves the notice available; after visible play time advances, it should clear normally.

## Guardrails

- Do not change audio profile ids, UI cue ids, `createAudioEngine()`, Web Audio graph behavior, or ambience tuning.
- Do not add music, particles, new visual accents, or a mixer.
- Do not change save schema, route definitions, route copy, station layout, menu actions, field-season board copy, authored science content, or biome geometry.
- Keep the behavior to notice lifecycle only; existing notice priority helpers should keep their current filed-route/homecoming behavior.

## Verification

Baseline checks passed before this handoff:

```bash
npm test -- --run src/test/audio.test.ts src/test/runtime-smoke.test.ts -t "audio|arms sound"
npm test -- --run src/test/field-notices.test.ts
```

Recommended main verification:

```bash
npm test -- --run src/test/field-notices.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t "field-request notice"
npm run build
npm run validate:agents
git diff --check
```
