# Route Feedback Priority Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-401`
Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
Lane: `lane-4`

## Changes

- Updated `shouldReplaceFieldNotice(...)` so station support/default toasts cannot replace route-critical notices while the field station overlay is open.
- Treats both `notebook-ready` and `filed-route` notices as station-protected route feedback.
- Preserves filed-over-ready behavior so a `filed-route` notice can still replace a `notebook-ready` notice when the route is filed.
- Extended the focused field-notices unit test to cover notebook-ready protection, filed-route protection, outside-station replacement, and filed-over-ready replacement.

## Scope Notes

- No audio engine/profile/cue, route definition/copy, save schema, station layout, rendering, notice timer, support-toast copy, visual accent, science content, or geometry changed.
- Lane 1's hidden-notice lifecycle helper was left unchanged.

## Verification

- `npm test -- --run src/test/field-notices.test.ts -t "station support|field notice|filed-route"`
- `npm run build`
