# Kid Input Accessibility Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-394`
Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
Lane: `lane-1`

## Result

Made the fullscreen helper save-safe when the Fullscreen API is unavailable or the request fails, and added a focused runtime-smoke regression for the unsupported path.

## Changes

- Added a small `setFullscreenPreference()` helper in `src/engine/game.ts` so fullscreen setting persistence is explicit.
- Updated `toggleFullscreen()` so unsupported fullscreen entry persists `settings.fullscreen = false` instead of stranding a stale `true`.
- Updated `toggleFullscreen()` so rejected or thrown fullscreen entry requests restore the saved setting to `false`.
- Added a focused runtime-smoke test that starts from a stale fullscreen-on save in the fake DOM, activates the title menu fullscreen row, confirms the saved setting returns to `false`, and confirms `Escape` recovers to the title.

## Scope Kept Out

No menu action order, guided menu defaults, reset behavior, station behavior, route behavior, world-map behavior, save schema, authored copy, geometry, or UI layout changed.

## Verification

```bash
npm test -- --run src/test/runtime-smoke.test.ts -t "unsupported fullscreen"
npm run build
```

Both checks passed.
