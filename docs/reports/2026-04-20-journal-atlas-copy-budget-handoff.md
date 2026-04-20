# Journal And Atlas Copy-Budget Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-383`
Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
Lane: `lane-2`

## Recommendation

Use lane 2 for a narrow content-only pruning pass: tighten ecosystem-note summaries to a 96-character ceiling so journal notes and comparison cards stay readable at the handheld size. Do not add panels, scroll behavior, station layout changes, or route-state logic.

Why this slice:

- `src/test/content-quality.test.ts` already guards ecosystem notes, field requests, filed Route v2 notes, prompts, sketchbook notes, nursery copy, and source-ledger anchors.
- Comparison cards reuse ecosystem-note summaries from `resolveJournalComparison(...)`, so long ecosystem summaries become long comparison-card summaries.
- Atlas strip notes are already compact: the current known atlas note family is 32-43 characters. Leave atlas rendering/layout and any broader atlas helper work to lane 1's packet `144` chain.
- Filed Route v2 notes already have a dedicated compactness and relationship-anchor test from packet `133`; lowering that ceiling now would create wide exact-copy churn across route-state/runtime tests. Keep filed-note changes out of this small lane-2 pass unless a later critic finds an actual overflow.

## Main-Agent Scope

Update only:

- `src/test/content-quality.test.ts`
  - lower `NOTE_SUMMARY_MAX` from `110` to `96`
  - optionally clarify in the test name or nearby comment that this protects both journal notes and comparison cards because comparison cards reuse note summaries
- `src/content/biomes/treeline.ts`
  - trim `rime-footholds.summary`
  - trim `broken-canopy-floor.summary`
- `src/content/biomes/forest.ts`
  - trim `forest-floor-carpet.summary`
  - trim `edge-berry-thicket.summary`
- `src/content/biomes/coastal-scrub.ts`
  - trim `pine-underlayer.summary`
- focused expectations only if exact-copy tests fail

Recommended replacement copy:

```text
Rime favors low life on exposed High Pass ground, while tiny rock pockets give footholds.
Under the last mountain trees, low floor plants mix with shrubs and brighter wind.
Near the last big trees, cool shade still stacks low leaves and tiny tree starts.
The first forest edge stacks thorny stems and berries into a shadier thicket.
Under shore pines, low mats and quiet cover show steadier sand than open scrub.
```

These replacements preserve the relationship anchors while bringing each summary under the 96-character cap.

## Preserve

- no edits to `src/engine/game.ts`
- no edits to `src/engine/overlay-render.ts`
- no edits to `src/engine/field-season-board.ts`
- no edits to `src/engine/field-season-wrap.ts`
- no field-station shell, route-board layout, save, route-controller, world-map, corridor, or traversal changes
- no new notebook, atlas, comparison, HUD, or station panel
- no route filed-note rewrites in this slice
- no science-source-ledger churn unless a touched claim changes meaning

## Verification

Expected checks after implementation:

```bash
npm test -- --run src/test/content-quality.test.ts src/test/journal-comparison.test.ts
npm run build
npm run validate:agents
git diff --check
```

If the lower note budget uncovers more overages than the five listed above, prefer another scout split instead of widening this handoff into a broad copy rewrite.
