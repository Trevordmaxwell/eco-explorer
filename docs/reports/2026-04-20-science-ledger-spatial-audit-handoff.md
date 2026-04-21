# Science Ledger Spatial Audit Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-388`
Packet: `.agents/packets/145-science-source-ledger-audit.json`
Lane: `lane-3`

## Scout Finding

Lane 2 already closed the source-ledger coverage gaps for live entries and process moments, and lane 4 already softened the two overclaiming route-filed phrases. Lane 3 does not need new source rows or route wording.

The remaining lane-3 risk is physical honesty: a process such as `sand-capture`, `moisture-hold`, `frost-rime`, or `thaw-fringe` should only paint onto carriers that are actually authored in the matching habitat zones. Current `habitat-process` tests sample a few correct/incorrect x positions, but they do not guard every `processMoments[].entryIds` carrier against future spawn-table drift.

## Recommended Main Scope

Keep `ECO-20260420-main-388` to a focused spatial guard:

- Extend `src/test/habitat-process.test.ts` with a data-driven assertion over the five live process moments.
- For each process moment, confirm every linked `entryId` appears in at least one authored spawn table or planned placement whose `zoneId` is included by that process.
- Confirm the guard includes the current live processes: `wrack-hold`, `sand-capture`, `moisture-hold`, `frost-rime`, and `thaw-fringe`.
- Add a short implementation report.

## Non-Goals

- No edits to `docs/science-source-ledger.md`; lane 2 already closed ledger coverage.
- No route filed-note, support, station, world-map, save/schema, or notebook copy changes.
- No production biome geometry edits unless the new guard reveals a real failing carrier.
- No browser proof required if the main pass remains test-only and changes no runtime rendering or data.

## Verification

Recommended main verification:

```bash
npm test -- --run src/test/habitat-process.test.ts
npm run build
npm run validate:agents
git diff --check
```

Baseline scout check passed:

```bash
npm test -- --run src/test/habitat-process.test.ts
```
