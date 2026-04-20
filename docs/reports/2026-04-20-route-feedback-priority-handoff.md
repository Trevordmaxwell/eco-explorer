# Route Feedback Priority Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-401`
Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
Lane: `lane-4`

## Finding

Lane 1 already fixed the broad hidden-toast lifecycle gap: field-request notice timers now pause while menus, station, journal, close-look, title, transitions, or field-guide notices hide the route toast.

The remaining lane-4 feedback-priority gap is narrower. `shouldReplaceFieldNotice(...)` already prevents station support toasts from replacing a `filed-route` notice, but `notebook-ready` notices do not get the same station protection. That means a route-ready filing prompt can still be replaced by an `OUTING SUPPORT` toast inside the field station before the player files the note. This is the small route/support feedback-priority seam packet `148` should close.

## Recommended Main Scope

- Update `shouldReplaceFieldNotice(...)` in `src/engine/field-notices.ts` so station support/default toasts cannot replace route-critical notices while `overlayMode === "field-station"`.
- Treat both `notebook-ready` and `filed-route` as route-critical for this station-priority rule.
- Still allow a `filed-route` notice to replace a `notebook-ready` notice when the player files the route.
- Keep replacement behavior outside the field-station overlay unchanged.
- Extend the existing `keeps filed-route notices from being replaced by station support toasts` unit test in `src/test/field-notices.test.ts` to cover `notebook-ready` plus filed-over-ready behavior.
- Add a dated implementation report.

## Non-Goals

- No audio profile ids, UI cue ids, audio engine, music, mixer, particles, visual accents, save schema, route definitions, route copy, station layout, field-season board copy, field notice rendering, notice timers, authored science content, or biome geometry changes.
- Do not rewrite support toast copy again; packet `147` already handled that lane-4 copy slice.

## Suggested Verification

- `npm test -- --run src/test/field-notices.test.ts -t "station support|field notice|filed-route"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
