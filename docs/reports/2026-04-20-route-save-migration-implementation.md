# Route Save Migration Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-421`
Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
Lane: `lane-4`

## Summary

Added a test-only regression for normalized mixed old High Pass saves. The pass leaves save normalization, Route v2 progression, support behavior, station surfaces, map behavior, copy, and geometry unchanged.

## What Changed

- `src/test/field-requests.test.ts` now imports `resolveHighPassChapterState()` for route-phase assertions.
- Added `normalizes mixed old High Pass saves without skipping route phases`.
- The test builds a malformed persisted save through `normalizeSaveState()` and proves invalid completed ids, purchased upgrade ids, landmark ids, and evidence slots are filtered while valid High Pass progress and owned `route-marker` support survive.
- While `seasonCloseReturnPending` is true, the normalized ready High Pass progress resolves as the dormant locator beat: no active field request, locator journal state, `Today: High Pass` replay, and the selected route marker on Treeline Pass.
- After clearing `seasonCloseReturnPending`, the same save resolves as ready-to-file High Pass and suppresses active outing, route marker, and replay labels.
- A filed High Pass save with stale ready progress and selected `route-marker` remains filed and does not rehydrate active request, outing, journal, marker, or replay state.

## Verification

```bash
npm test -- --run src/test/field-requests.test.ts -t "mixed old High Pass|High Pass|legacy notebook-ready Root Hollow"
```

```bash
npm test -- --run src/test/save.test.ts -t "Route v2 progress|Low Fell|Root Hollow|outing support"
npm run build
npm run validate:agents
git diff --check
```

`npm run validate:agents` passed with the known work-queue-size warning.
