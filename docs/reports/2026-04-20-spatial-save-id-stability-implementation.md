# Spatial Save ID Stability Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-420`
Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
Lane: `lane-3`

## Result

Implemented the lane-3 scope as a test-only regression.

`src/test/save-snapshots.test.ts` now walks every debug save snapshot and collects save-backed inspectable entry ids from:

- discovered-entry record keys
- discovered-entry `entryId` values
- sketchbook page slots
- `routeV2Progress.landmarkEntryIds`
- `routeV2Progress.evidenceSlots[].entryId`

The test asserts every collected entry id still exists in the live `biomeRegistry`, and each discovered entry's saved `biomeIds` still point to live biomes that contain that entry. This catches silent spatial/content id drift without changing save normalization, route behavior, geometry, or player-facing content.

## Scope Notes

- No `src/engine/save.ts` changes.
- No save schema, migration, route definition, High Pass phase, station, map, copy, fact, geometry, rendering, or browser-proof changes.
- No broken saved spatial entry ids were found.

## Verification

```bash
npm test -- --run src/test/save-snapshots.test.ts -t "spatial entry ids|debug save snapshots|High Pass|route-marker"
npm test -- --run src/test/forest-biome.test.ts src/test/treeline-biome.test.ts -t "Root Hollow|root-hollow|High Pass|talus|stone|canopy|cave"
```

Both checks passed.
