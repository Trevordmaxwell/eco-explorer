# Overlay Notice Visual Proof Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-412`
Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
Lane: `lane-3`

## Scout Result

Implementation-ready.

Lane 1 has already moved the field-guide, field-request, hint-chip, and field-partner notice renderers into `src/engine/field-notice-overlays.ts` and reviewed that extraction as behavior-preserving. Lane 4 then hardened the route-notice priority path in runtime smoke. Lane 3 does not need a new geometry or renderer pass here; the remaining value is visual proof that the extracted notice family still reads cleanly in world-space at the handheld viewport.

## Main Scope

- Capture current after-extraction browser screenshots under ignored `output/lane-3-main-412-overlay-proof/`.
- Include at least two representative notice-family states:
  - a guided field-season or field-request notice in play/world-map context
  - the calm in-biome field-partner strip or, if that is not browser-reachable without broad setup, a debug/runtime-state note explaining why it was covered by the existing smoke instead
- Save matching `render_game_to_text()` JSON/text artifacts beside the screenshots when possible.
- Write `docs/reports/2026-04-20-overlay-notice-visual-proof-implementation.md` summarizing what was captured and whether there were any intentional visual deltas.

## Visual Delta Policy

- Expected result: no intentional visual deltas from the extraction.
- Treat the lane-1 review and focused notice/runtime tests as the "before" behavior contract.
- Treat the new screenshots as the "after" visual proof.
- If a screenshot shows an actual readability regression, stop and document it instead of making opportunistic layout edits.

## Non-Goals

- No changes to `src/engine/field-notice-overlays.ts`, `src/engine/overlay-render.ts`, or `src/engine/game.ts` unless a real visual regression is found.
- No notice copy, dimensions, y positions, badge pixels, pulse timing, hint-chip placement, partner-strip placement, palette, route/support behavior, station state, save schema, authored content, or biome geometry changes.
- No new screenshot framework or broad runtime-smoke scenario.

## Baseline Checks

Passed before handoff:

```bash
npm test -- --run src/test/overlay-copy.test.ts src/test/field-notices.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t "field-season guidance|field-request notice timers|field-partner strip"
```

## Suggested Verification

```bash
npm test -- --run src/test/overlay-copy.test.ts src/test/field-notices.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t "field-season guidance|field-request notice timers|field-partner strip"
npm run validate:agents
git diff --check
```

Run `npm run build` only if the implementation changes runtime source.
