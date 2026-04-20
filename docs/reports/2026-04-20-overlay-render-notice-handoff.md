# Overlay Render Notice Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-410`
Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
Lane: `lane-1`

## Scout Finding

The safest lane-1 extraction for packet `151` is the small notice-render family currently embedded in `src/engine/overlay-render.ts`: `drawFieldGuideNotice()`, `drawFieldRequestNotice()`, `drawFieldRequestHintChip()`, and `drawFieldPartnerNotice()`.

Those functions are render-only, are called only from `src/engine/game.ts`, and already sit next to each other in `overlay-render.ts`. Moving them into a dedicated module such as `src/engine/field-notice-overlays.ts` would reduce the main overlay renderer without changing notice state, priority, timers, route filing, support selection, field partner timing, copy text, or layout geometry.

## Recommended Main Scope

- Create `src/engine/field-notice-overlays.ts` and move the four notice drawing functions there with their option interfaces and the tiny local `fitTextToWidth()` helper they need.
- Update `src/engine/game.ts` to import these four functions from the new module.
- Remove the four notice draw exports and their option interfaces from `src/engine/overlay-render.ts`.
- Keep `drawBubbleOverlay`, `drawMenuOverlay`, `drawFieldStationOverlay`, and `drawJournalOverlay` in `overlay-render.ts`; do not start a broader overlay split in this pass.
- Optionally add a tiny renderer smoke test for the new module if the move exposes an easy text-recording seam, but do not create a pixel snapshot framework.

## Guardrails

- Do not change notice copy, notice dimensions, y positions, badge pixels, pulse timing, hint-chip placement, partner-strip placement, or palette choices.
- Do not touch `src/engine/field-notices.ts` notice policy, `src/engine/field-request-controller.ts`, route/support behavior, field-station behavior, save state, authored content, geometry, or the `render_game_to_text()` debug surface.
- Do not re-export the new functions through a compatibility facade unless a build import proves it is needed; current call sites can import directly from the new module.
- Keep the extraction mechanical and behavior-preserving.

## Baseline Verification

Passed before handoff:

```bash
npm test -- --run src/test/overlay-copy.test.ts src/test/field-notices.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t "field-season guidance|field-request notice timers|field-partner strip"
```

Recommended main verification:

```bash
npm test -- --run src/test/overlay-copy.test.ts src/test/field-notices.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t "field-season guidance|field-request notice timers|field-partner strip"
npm run build
npm run validate:agents
git diff --check
```
