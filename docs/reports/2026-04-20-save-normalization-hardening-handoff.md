# Save Normalization Hardening Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-418`
Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
Lane: `lane-1`

## Scout Result

The existing save tests already cover the high-risk route seams well: Route v2 progress shape, support selection fallback, Root Hollow four-leg migration, Low Fell final-slot downgrade, and debug snapshot round-trips through `normalizeSaveState()`.

The smaller uncovered lane-1 seam is persisted visit/location normalization. `normalizeSaveState()` currently sanitizes credits, support ids, nursery ledgers, route progress, sketchbook pages, and completed ids, but it still trusts `biomeVisits` and `lastBiomeId` directly from parsed storage. A malformed old/localStorage save can therefore carry non-finite or non-integer visit counts into deterministic world-state pacing, or keep a non-string last location.

## Main Scope

- Add pure normalization helpers in `src/engine/save.ts` for persisted `biomeVisits` and `lastBiomeId`.
- `biomeVisits` should accept only object-like records with finite numeric counts, floor fractional counts, clamp negative counts to `0`, and skip non-numeric entries.
- `lastBiomeId` should preserve non-empty strings for compatibility with current or future biome ids, but fall back to `beach` for missing, empty, or non-string values.
- Wire both helpers into `normalizeSaveState()`.
- Add focused `src/test/save.test.ts` coverage for malformed localStorage-like saves proving valid counts survive safely, bad counts are removed or clamped, and invalid `lastBiomeId` falls back without changing route/support migrations.

## Guardrails

- Do not change `SAVE_STORAGE_KEY`, `CURRENT_WORLD_STATE_VERSION`, debug snapshot builders, route definitions, route progress migration rules, support unlock rules, or player-facing copy.
- Keep this pass behavior-neutral for valid saves and focused on stale/corrupt persisted data hardening.
- Leave High Pass and route snapshot behavior intact; the snapshot suite already checks representative old/new season states.

## Suggested Verification

```bash
npm test -- --run src/test/save.test.ts
npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|season-close|route-marker"
npm run build
npm run validate:agents
git diff --check
```

## Baseline Checks

```bash
npm test -- --run src/test/save.test.ts
npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|season-close|route-marker"
```
