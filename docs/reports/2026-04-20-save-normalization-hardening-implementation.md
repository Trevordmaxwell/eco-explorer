# Save Normalization Hardening Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-418`
Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
Lane: `lane-1`

## Result

Implemented the lane-1 save hardening scope without changing valid save behavior or route migration rules.

- Added `normalizeBiomeVisits()` in `src/engine/save.ts`.
- Added `normalizeLastBiomeId()` in `src/engine/save.ts`.
- Wired both helpers into `normalizeSaveState()`.
- Added focused `src/test/save.test.ts` coverage for malformed localStorage-like visit counts and invalid last-biome values.

## Behavior

- Valid persisted visit counts are preserved after being floored to safe integers.
- Negative visit counts clamp to `0`.
- Non-finite, non-numeric, empty-key, or non-record visit entries are ignored.
- Non-empty string `lastBiomeId` values are preserved for current and future biome compatibility.
- Missing, empty, or non-string `lastBiomeId` values fall back to `beach`.

## Guardrails Kept

- No `SAVE_STORAGE_KEY` change.
- No world-state version bump.
- No debug snapshot builder change.
- No Route v2 progress migration, support unlock, route definition, player-facing copy, UI, or station behavior change.

## Verification

```bash
npm test -- --run src/test/save.test.ts
npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|season-close|route-marker"
npm run build
```
