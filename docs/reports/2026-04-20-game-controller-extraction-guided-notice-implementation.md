# Game Controller Extraction Guided-Notice Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-406`
Packet: `.agents/packets/150-game-controller-extraction-wave.json`
Lane: `lane-1`

## Summary

Extracted guided field-season notice policy from `src/engine/game.ts` into `src/engine/field-notices.ts` without changing notice text, timing, dispatch order, route filing, station behavior, save state, or rendering.

## Changes

- Added `isGuidedFieldSeasonNoticeTitle()` and `canShowGuidedFieldSeasonNotice(currentNotice, nextTitle)` to `src/engine/field-notices.ts`.
- Updated `src/engine/game.ts` to pass the current `fieldRequestNotice` into the exported helper for starter, station-return, season-capstone, season-close-return, and next-habitat notices.
- Removed the local guided-notice helper functions from `game.ts`.
- Added focused unit coverage for guided title recognition and guided notice stacking/replacement rules.

## Guardrails Kept

- No notice copy, notice duration, field-request completion, route filing, expedition activation, station behavior, support behavior, save schema, overlay rendering, authored science/content, or biome geometry changed.
- No class, framework, subscription, or global mutable notice controller was introduced.

## Verification

```bash
npm test -- --run src/test/field-notices.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t "field-season guidance|season capstone"
npm run build
```
