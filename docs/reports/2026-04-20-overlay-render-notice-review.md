# Overlay Render Notice Review

Date: 2026-04-20
Queue: `ECO-20260420-critic-410`
Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
Lane: `lane-1`

## Review Result

No blocker found.

The extraction is mechanical and behavior-preserving. The four notice renderers now live in `src/engine/field-notice-overlays.ts`, while `src/engine/game.ts` imports them directly and `src/engine/overlay-render.ts` keeps the larger overlay/page surfaces.

## Checks

- The moved notice functions preserve the same copy, rectangles, y positions, badge pixels, pulse timing, hint-chip placement, partner-strip placement, and palette use.
- `src/engine/game.ts` is the only runtime call site for these renderers, so no compatibility re-export is needed.
- No notice policy, timers, route/support behavior, field-station behavior, save state, authored content, geometry, or `render_game_to_text()` debug shape changed for this item.
- `overlay-render.ts` is smaller and still owns title, menu, bubble, close-look, field-station, and journal rendering.

## Verification

```bash
npm test -- --run src/test/overlay-copy.test.ts src/test/field-notices.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t "field-season guidance|field-request notice timers|field-partner strip"
npm run build
npm run validate:agents
git diff --check
```

`npm run validate:agents` passed with the known work-queue-size warning only.

## Follow-Up

Packet `151` lane 1 is clear. Promote `ECO-20260420-scout-414` for packet `152`.
