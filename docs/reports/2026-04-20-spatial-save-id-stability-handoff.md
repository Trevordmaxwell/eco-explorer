# Spatial Save ID Stability Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-420`
Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
Lane: `lane-3`

## Scout Result

Implementation-ready.

Lane 1 already hardened raw save normalization for `biomeVisits` and `lastBiomeId`. Lane 4 already covered route-facing mixed old High Pass saves. The remaining lane-3 seam is simpler: saved spatial/inspectable entry ids should not silently drift away from live authored biome content as cave, canopy, and high-country place edits continue.

Existing biome tests cover many concrete placements, and the debug save snapshot suite proves snapshot shape and state behavior. What is missing is one focused guard that walks saved entry ids and asserts they are still backed by live biome entries.

## Recommended Main Scope

Add a test-only regression to `src/test/save-snapshots.test.ts`.

Recommended shape:

- Build all debug snapshots with `buildDebugSaveSnapshots()`.
- Build a lookup of live entry ids from `biomeRegistry`.
- Collect save-backed entry ids from:
  - `save.discoveredEntries` record keys
  - each discovered entry state's `entryId`
  - each discovered entry state's `biomeIds`
  - `save.sketchbookPages` slot values
  - `save.routeV2Progress.landmarkEntryIds`
  - `save.routeV2Progress.evidenceSlots[].entryId`
- Assert every collected entry id exists in at least one live biome entry map.
- For discovered entries with live `biomeIds`, assert that the entry id exists in each named live biome's `entries` map so shared-species sightings stay local and stable.

## Non-Goals

- No changes to `src/engine/save.ts`, save schema versions, `SAVE_STORAGE_KEY`, or migration behavior.
- No changes to route definitions, route progress behavior, High Pass phase logic, field station, map, copy, content facts, geometry, or rendering unless the focused test exposes a real broken reference.
- No browser proof required unless the test reveals an actual spatial/content drift.

## Baseline Checks

Passed before handoff:

```bash
npm test -- --run src/test/save-snapshots.test.ts -t "debug save snapshots|High Pass|route-marker"
npm test -- --run src/test/forest-biome.test.ts src/test/treeline-biome.test.ts -t "Root Hollow|root-hollow|High Pass|talus|stone|canopy|cave"
```

## Suggested Verification

```bash
npm test -- --run src/test/save-snapshots.test.ts -t "spatial entry ids|debug save snapshots|High Pass|route-marker"
npm test -- --run src/test/forest-biome.test.ts src/test/treeline-biome.test.ts -t "Root Hollow|root-hollow|High Pass|talus|stone|canopy|cave"
npm run validate:agents
git diff --check
```

Run `npm run build` only if the implementation changes runtime source.
