# Sound Feedback Lifecycle Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-398`
Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
Lane: `lane-1`

## Result

Added a small field-request notice lifecycle guard so feedback timers only tick while the notice is eligible to be seen. This keeps notebook-ready, filed-route, and replay feedback from expiring while hidden behind menus, station, close-look, journal, title, or transition states.

## Changes

- Added `shouldAdvanceFieldRequestNoticeTimer()` in `src/engine/field-notices.ts`.
- Used the helper in `src/engine/game.ts` before decrementing `fieldRequestNoticeTimer`.
- Added unit coverage for visible play, world-map play, hidden menu/station overlays, transition scenes, and field-guide-hidden toast cases.
- Added a focused runtime-smoke regression proving a `Moist Edge` route replay notice survives a long hidden menu period and then clears after visible play time.

## Scope Kept Out

No audio profile ids, UI cue ids, audio graph behavior, ambience tuning, music, mixer, particles, visual accents, save schema, route definitions, route copy, station layout, menu actions, field-season board copy, authored science content, or biome geometry changed.

## Verification

```bash
npm test -- --run src/test/field-notices.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t "field-request notice"
npm run build
```

All checks passed.
