# Game Controller Extraction Guided-Notice Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-406`
Packet: `.agents/packets/150-game-controller-extraction-wave.json`
Lane: `lane-1`

## Scout Finding

The safest packet `150` lane-1 extraction is the guided field-season notice policy currently embedded in `src/engine/game.ts`. The local `canShowGuidedFieldSeasonNotice()` and `isGuidedFieldSeasonNoticeTitle()` helpers decide when `NOTEBOOK TASK`, `FIELD STATION`, `NEXT STOP`, and `SEASON THREADS` guidance notices may replace an existing notice. That policy belongs with the nearby notice helpers in `src/engine/field-notices.ts`, where notice replacement, homecoming cleanup, recorded notices, notebook-ready notices, and hidden-timer policy already live.

This is a small but real controller cleanup: it removes notice-classification and replacement policy from the large coordinator without changing dispatch timing, save state, route filing, station behavior, authored copy, or UI rendering.

## Recommended Main Scope

- Move the guided field-season notice title classification into `src/engine/field-notices.ts`.
- Export a pure helper such as `canShowGuidedFieldSeasonNotice(currentNotice, nextTitle)` that mirrors the current `game.ts` behavior.
- Replace the local `game.ts` helper calls with the exported helper, passing the current `fieldRequestNotice`.
- Delete the local `canShowGuidedFieldSeasonNotice()` and `isGuidedFieldSeasonNoticeTitle()` functions from `game.ts`.
- Add focused unit coverage in `src/test/field-notices.test.ts` proving:
  - guided notice titles can stack/replace other guided notice titles
  - a guided notice can show when no current notice exists
  - a guided notice does not replace non-guided or filed-route notices
  - non-guided titles are not treated as guided

## Guardrails

- Do not change notice text, notice durations, field-request completion, route filing, expedition activation, station behavior, support behavior, save schema, overlay render behavior, authored science/content, or biome geometry.
- Do not move route filing or expedition activation in this pass; keep the extraction to guided notice policy only.
- Do not introduce classes, a new controller framework, subscriptions, or global mutable notice state.
- Keep the change behavior-preserving and covered by unit tests plus the existing field-season guidance runtime-smoke slice.

## Baseline Verification

Passed before handoff:

```bash
npm test -- --run src/test/field-notices.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t "field-season guidance|season capstone"
```

Recommended main verification:

```bash
npm test -- --run src/test/field-notices.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t "field-season guidance|season capstone"
npm run build
npm run validate:agents
git diff --check
```
