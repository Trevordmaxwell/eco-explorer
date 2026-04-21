# Route Save Migration Review

Date: 2026-04-20
Queue: `ECO-20260420-critic-421`
Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
Lane: `lane-4`

## Verdict

Clean. The lane-4 implementation adds focused route-facing regression coverage for normalized mixed old High Pass saves without changing save normalization, Route v2 definitions, support behavior, station, map, copy, geometry, or screenshot output.

## Findings

- The implementation is test-only for lane-4 runtime behavior. The relevant code diff adds `resolveHighPassChapterState()` coverage in `src/test/field-requests.test.ts`; `src/engine/save.ts`, `src/engine/field-requests.ts`, `src/engine/field-request-state.ts`, `src/engine/high-pass-chapter-state.ts`, and `src/engine/field-season-board.ts` are unchanged by this item.
- The mixed old-save case proves `normalizeSaveState()` filters malformed completed ids, purchased upgrade ids, landmark ids, and evidence slots while preserving valid `treeline-high-pass` ready progress and owned `route-marker` support.
- The dormant phase is explicitly protected: `seasonCloseReturnPending` keeps High Pass in the locator beat with no active field request, while the journal/replay/route-marker state follows the active outing locator instead of jumping to filing.
- The ready-to-file transition is explicit: clearing the close flag turns the same normalized save into `ready-to-file` and suppresses active outing, route marker, and replay labels.
- Filed High Pass remains terminal for route surfaces even when stale `routeV2Progress` is still present, so the pass treats stale progress as harmless runtime state rather than adding a hidden migration.

## Decision

No blocker. Promote `ECO-20260420-scout-425` so lane 4 can continue into packet `154`.

## Verification

```bash
npm test -- --run src/test/save.test.ts -t "Route v2 progress|Low Fell|Root Hollow|outing support"
npm test -- --run src/test/field-requests.test.ts -t "mixed old High Pass|High Pass|legacy notebook-ready Root Hollow"
npm run build
npm run validate:agents
git diff --check
```

`npm run validate:agents` passed with the known work-queue-size warning.
