# 2026-04-19 Thaw Window Wet-Tuft Implementation

Completed `ECO-20260419-main-318` for lane 4.

## Outcome

`Thaw Window` now has a second active-window route consequence on its middle leg without widening the route shell.

What shipped:

- extended `tundra-short-season` so active `Thaw Window` can treat `bigelows-sedge` as the `wet-tuft` carrier
- kept the canonical filed identity stable as `Thaw Window` / `Short Season` instead of adding a new route or notebook surface
- added focused request, controller, and runtime proof that `hand-lens` now retargets to `bigelows-sedge` once `first-bloom` is already logged, while non-hand-lens supports do not auto-snap there

## Files

- `src/engine/field-requests.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-request-controller.test.ts`
- `src/test/runtime-smoke.test.ts`

## Notes

- the active-clue support seam already handled middle-slot alternates cleanly, so the only runtime change was the `processFocus` definition for `tundra-short-season`
- filed note and display text stay clue-backed and route-local: if the player files `bigelows-sedge`, the note still stamps as `Thaw Window. ...`
- the deterministic runtime proof reuses the thaw-skirt upper shelf at start `(380, 100)` rather than adding new tundra geometry

## Verification

- `npx vitest run src/test/field-requests.test.ts -t "thaw-window|Bigelow|bigelows-sedge|wet-tuft"`
- `npx vitest run src/test/field-request-controller.test.ts -t "Thaw Window|wet-tuft|bigelows-sedge|Bigelow"`
- `npx vitest run src/test/runtime-smoke.test.ts -t "Thaw Window|wet-tuft|bigelows-sedge|thaw-window wet-tuft|thaw-window bloom"`
- `npx vitest run src/test/field-requests.test.ts src/test/field-request-controller.test.ts src/test/runtime-smoke.test.ts -t "Thaw Window|wet-tuft|bigelows-sedge|thaw-window bloom"`
- `npm run build`
