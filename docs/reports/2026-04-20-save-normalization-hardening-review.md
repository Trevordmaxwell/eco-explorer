# Save Normalization Hardening Review

Date: 2026-04-20
Queue: `ECO-20260420-critic-418`
Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
Lane: `lane-1`

## Review Result

No blocker found.

The implementation stays within the scout handoff. `normalizeSaveState()` now routes persisted `biomeVisits` and `lastBiomeId` through focused helpers, while the existing Route v2 progress migration, support unlock rules, world-state version, snapshot builders, route definitions, UI, and player-facing copy are unchanged for this item.

## Checks

- `normalizeBiomeVisits()` rejects non-record values, skips empty keys and non-numeric/non-finite counts, floors fractional counts, and clamps negative counts to `0`.
- `normalizeLastBiomeId()` preserves non-empty strings for current or future biome compatibility and falls back to `beach` for invalid values.
- The new save test covers malformed localStorage-style data without weakening existing route/support migration coverage.
- The debug snapshot slice still round-trips representative season-close and High Pass states after normalization.
- The dirty `SAVE_STORAGE_KEY` export shown in `git diff` predates this item and is already covered by snapshot-key tests; it is not a blocker for this review.

## Verification

```bash
npm test -- --run src/test/save.test.ts
npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|season-close|route-marker"
npm run build
```

## Follow-Up

Packet `153` lane 1 is clear. Promote `ECO-20260420-scout-422` for packet `154`.
