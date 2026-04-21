# Spatial Save ID Stability Review

Date: 2026-04-20
Queue: `ECO-20260420-critic-420`
Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
Lane: `lane-3`

## Verdict

No blocker found.

The implementation matches the lane-3 contract: it adds a test-only guard for saved spatial/inspectable entry ids without changing save normalization, schema, migrations, routes, station behavior, map behavior, facts, geometry, rendering, or player-facing copy.

## Review Notes

- The new helper builds a live `biomeRegistry` entry-id lookup, which is the right source of truth for this lane's spatial/content stability check.
- The saved-id collection covers discovered-entry keys, discovered-entry `entryId` values, sketchbook slots, Route v2 landmark ids, and Route v2 evidence-slot ids.
- The locality assertion for discovered-entry `biomeIds` is important: it catches shared-entry drift where an entry still exists somewhere, but no longer exists in the saved sighting biome.
- No broken saved spatial ids were exposed by the guard.
- No browser proof or build was needed because the pass is test-only and does not change runtime rendering or source behavior.

## Verification

```bash
npm test -- --run src/test/save-snapshots.test.ts -t "spatial entry ids|debug save snapshots|High Pass|route-marker"
npm test -- --run src/test/forest-biome.test.ts src/test/treeline-biome.test.ts -t "Root Hollow|root-hollow|High Pass|talus|stone|canopy|cave"
npm run validate:agents
jq empty .agents/packets/153-save-schema-and-migration-hardening.json
git diff --check
```

All checks passed. `npm run validate:agents` retains only the known oversized work-queue warning.

## Handoff

Promote `ECO-20260420-scout-424` for packet `154`.
