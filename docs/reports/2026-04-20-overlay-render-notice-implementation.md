# Overlay Render Notice Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-410`
Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
Lane: `lane-1`

## Result

Moved the notice-render overlay family out of `src/engine/overlay-render.ts` into the dedicated `src/engine/field-notice-overlays.ts` module.

The new module now owns:

- `drawFieldGuideNotice()`
- `drawFieldRequestNotice()`
- `drawFieldRequestHintChip()`
- `drawFieldPartnerNotice()`

`src/engine/game.ts` imports those four renderers directly from the new module. `overlay-render.ts` still owns the larger overlay/page families such as title, menu, bubble, close-look, field-station, and journal rendering.

## Scope Notes

- This was a mechanical render-only extraction.
- Notice copy, dimensions, y positions, badge pixels, pulse timing, hint-chip placement, partner-strip placement, palettes, notice policy, route/support behavior, station behavior, save state, authored content, geometry, and `render_game_to_text()` stayed unchanged.
- No compatibility re-export was needed because `game.ts` was the only runtime call site.

## Verification

```bash
npm test -- --run src/test/overlay-copy.test.ts src/test/field-notices.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t "field-season guidance|field-request notice timers|field-partner strip"
npm run build
```

All passed.
