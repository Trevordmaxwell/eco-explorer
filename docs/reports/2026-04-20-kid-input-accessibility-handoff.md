# Kid Input Accessibility Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-394`
Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
Lane: `lane-1`

## Scout Verdict

Implementation-ready. The smallest useful lane-1 pass is a save-safe fullscreen toggle guard plus a focused runtime regression for menu recovery.

## Findings

- Menu focus order is already guided: in biome play, `M` defaults to `world-map`; on the world map during station-return guidance, `M` defaults to `field-station`; title/menu helpers still default to `toggle-fullscreen`.
- Escape behavior is already centralized: `Escape` closes normal menus and cancels reset confirmation before any destructive action.
- `toggleFullscreen()` currently flips `save.settings.fullscreen` to `true` even when `canvas.requestFullscreen` is unavailable, because it persists the setting after a no-op capability check. That can leave a save claiming fullscreen is on when the browser never entered fullscreen.
- The fake DOM used by runtime smoke has no Fullscreen API, so it is a good regression harness for the unsupported-API path.

## Recommended Main Scope

- Update `toggleFullscreen()` so unsupported fullscreen entry does not persist `settings.fullscreen = true`.
- If a fullscreen request throws or rejects, keep or restore the saved fullscreen setting to `false` rather than stranding the helper row as `ON`.
- Add a focused runtime-smoke regression proving that activating the `toggle-fullscreen` menu row without Fullscreen API support leaves `settings.fullscreen` false and keeps menu recovery via `Escape` intact.
- Keep menu action order, guided menu defaults, reset behavior, station/route/world-map behavior, save schema, authored copy, geometry, and UI layout unchanged.
- Add a dated implementation report and promote `ECO-20260420-critic-394`.

## Verification Notes

Passing focused baseline:

```bash
npm test -- --run src/test/runtime-smoke.test.ts -t "arms sound"
```

Known unrelated baseline noise:

```bash
npm test -- --run src/test/runtime-smoke.test.ts -t "covers title, play|arms sound"
```

The broader selection currently fails in the existing `covers title, play, inspect, menu, world-map travel, journal, and reload persistence` test because world-map focus expects `forest` and receives `beach`. Do not make packet `147` depend on that broad smoke unless the separate map-focus issue is intentionally addressed.
