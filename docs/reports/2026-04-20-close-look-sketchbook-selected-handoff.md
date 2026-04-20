# 2026-04-20 Close-Look Sketchbook Selected Handoff

Prepared for `ECO-20260420-scout-391` in lane 2.

## Scope Reviewed

- `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- `docs/reports/2026-04-20-alpha-runway-megapush.md`
- `src/engine/close-look.ts`
- `src/test/close-look.test.ts`
- `src/test/sketchbook.test.ts`
- `src/content/biomes/forest.ts`
- `src/content/biomes/coastal-scrub.ts`
- prior close-look and sketchbook handoffs/reviews from the forest, alpine, front-half, and microhabitat waves

## Current Read

- The close-look allowlist is already broad enough for shells, alpine plants, old-growth canopy life, forest seep/canopy pockets, and coastal-scrub thicket carriers.
- The sketchbook is already carrying many one-line memory notes, including `root-curtain`, `fallen-giant-log`, `shore-pine`, and `nurse-log`.
- The strongest alpha-memory gap is not another species batch. It is making one or two already-important route/place anchors feel selected and inspect-worthy.
- Two route-defining carriers are the best fit because they are already live, source-ledger backed through their entry content, and useful to later lanes without opening new systems:
  - `root-curtain` anchors Root Hollow's `root-held` clue and already has the sketchbook note `Dim root shelter catching drips above the cave.`
  - `shore-pine` anchors Open To Shelter's `pine-cover` clue and already has the sketchbook note `Wind-shaped pine holding the sheltered edge.`

## Recommendation

Treat `main-391` as one tiny close-look selected-carrier pass.

Add close-look support for exactly:

1. `root-curtain`
2. `shore-pine`

This gives lane 2 one compact authored refresh, gives lane 3 two selected visual carriers to improve later, and gives lane 4 optional route-support context without making close-look mandatory for route progress.

## Suggested Content Shape

### `root-curtain`

- callouts: `hanging roots`, `drip shelter`
- sentence: `Root tangles slow drips and make a dim shelter above the cave floor.`
- sprite scale: `6`

Teaching goal:

- remember Root Hollow as a damp shelter made by roots, shade, and slow water rather than as a generic cave.

### `shore-pine`

- callouts: `wind-shaped crown`, `shelter edge`
- sentence: `Wind-bent shore pines mark where open sand starts settling into cover.`
- sprite scale: `6`

Teaching goal:

- remember the beach-to-scrub transition as a physical shelter edge, not only a route title.

## Guardrails

- Do not add new entries, sketchbook slots, journal layout, comparison rules, field-request behavior, route requirements, station surfaces, world-map cues, or biome geometry.
- Do not add `fallen-giant-log` in this pass. It is a good future old-wood memory candidate, but `root-curtain` and `shore-pine` are stronger because they are current route evidence carriers and cleaner handoffs to lane 3/lane 4.
- Keep `src/engine/close-look.ts` as a data-only close-look seed edit. It is technically outside packet `146` lane-2 preferred paths, but lane 2 already owns close-look candidate expansion in the lane brief and this file has precedent as a content-owned allowlist seam.

## Suggested File Targets

- `src/engine/close-look.ts`
- `src/test/close-look.test.ts`
- `docs/reports/2026-04-20-close-look-sketchbook-selected-implementation.md`

## Suggested Verification

- `npm test -- --run src/test/close-look.test.ts`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`

If the main agent has time for a visual proof, prefer one seeded `root-curtain` close-look capture over a broad multi-biome sweep.

## Queue Guidance

- Move `ECO-20260420-scout-391` to Done.
- Promote `ECO-20260420-main-391` to Ready.
- Keep `ECO-20260420-critic-391` blocked until the implementation lands.
