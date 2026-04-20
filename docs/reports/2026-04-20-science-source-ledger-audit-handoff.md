# Science Source-Ledger Audit Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-387`
Packet: `.agents/packets/145-science-source-ledger-audit.json`
Lane: `lane-2`

## Scout Finding

The lane-2 science audit should stay small and evidence-led. A quick coverage pass over the live biome entries found `74` inspectable entry ids across `src/content/shared-entries.ts` and the five live biome files. Every one already has a source-ledger row except `fallen-giant-log`.

The process-moment layer is thinner: `wrack-hold` already has process support, but the other live process moments do not yet have ledger rows:

- `sand-capture`
- `moisture-hold`
- `frost-rime`
- `thaw-fringe`

No high-risk unsupported player-facing science claim stood out in this scout pass. The missing items are ledger-coverage gaps, not copy blockers.

## Recommended Main Scope

Keep `ECO-20260420-main-387` to a docs-and-test source-ledger pass:

- Update `docs/science-source-ledger.md` status/date for the alpha audit.
- Add a `fallen-giant-log` row in the Forest section, marked `Watch` unless the main agent finds a more exact official source trail. Frame it as a habitat landmark, not a taxon.
- Add process-support rows or short process subsections for `sand-capture`, `moisture-hold`, `frost-rime`, and `thaw-fringe`, keeping each broad and source-backed by existing official source families already used in the ledger.
- Add or extend `src/test/content-quality.test.ts` so every live authored biome entry id and every live `processMoments[].id` has a ledger marker.
- Do not rewrite content copy unless the main pass finds a true `Risk` claim; this scout found only coverage gaps.

## Suggested Source Anchors

- `fallen-giant-log`: reuse the existing nurse-log / old-wood source family already backing `nurse-log` and `western-hemlock-seedling`; keep the note about moisture, shade, shelter, and nursery structure broad.
- `sand-capture`: reuse beach/coastal dune plant sources already backing `beach-grass`, `dune-lupine`, `sand-verbena`, and `pacific-wax-myrtle`.
- `moisture-hold`: reuse forest floor and moist-edge sources already backing `sword-fern`, `redwood-sorrel`, `salmonberry`, and seep/moisture rows.
- `frost-rime`: reuse cold-ground, low-shrub, lichen, and freeze-thaw sources already backing `dwarf-birch`, `reindeer-lichen`, and `frost-heave-boulder`; mark broad `Watch` if the wording stays a visual process rather than an exact meteorology lesson.
- `thaw-fringe`: reuse tundra thaw/moist-ground sources already backing `arctic-willow`, `purple-saxifrage`, `cottongrass`, and `tussock-thaw-channel`.

## Non-Goals

- No new species, inspectables, close-look cards, ecosystem notes, route tasks, world-map behavior, station state, save behavior, geometry, or UI.
- No broad web-source expansion unless a row cannot be supported by existing official-source families.
- No attempt to resolve lane-3 spatial placement or lane-4 route evidence claims here; those are separate packet `145` lane contracts.

## Verification

Recommended main verification:

```bash
npm test -- --run src/test/content-quality.test.ts
npm run build
npm run validate:agents
git diff --check
```
