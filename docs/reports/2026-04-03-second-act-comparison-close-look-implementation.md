# 2026-04-03 Second-Act Comparison And Close-Look Implementation

Implemented `ECO-20260403-main-212` in lane 2.

## What Changed

- Added one new tundra ecosystem note in `src/content/biomes/tundra.ts`: `Wind-Cut Cushions` now gives `moss-campion` a tundra-local teaching card through `moss-campion`, `reindeer-lichen`, and `frost-heave-hummock`.
- Extended `src/engine/journal-comparison.ts` so `moss-campion` now participates in the same-pane comparison seam once both treeline and tundra note context exist.
- Extended `src/engine/close-look.ts` with one new close-look payload for `tree-lungwort`, keeping the second-act close-look wave limited to one damp-bark lichen card.
- Added focused coverage in `src/test/ecosystem-notes.test.ts`, `src/test/journal-comparison.test.ts`, and `src/test/close-look.test.ts` for the new note, comparison pair, and close-look card.

## Why This Holds

- The pass stays inside the narrowed scout handoff. It adds one inland comparison anchor and one forest vertical close-look anchor without reopening the already-supported `reindeer-lichen`, `seep-stone`, or `seep-moss-mat` seams.
- The journal remains notebook-first. `moss-campion` now reads as a treeline-versus-tundra exposed-ground comparison instead of a generic extra alpine card.
- The close-look expansion stays visual-first and calm. `tree-lungwort` adds one humid-bark lichen card that fits the existing forest vertical family rather than widening the allowlist into a general seep-wall set.

## Verification

- `npm test -- --run src/test/journal-comparison.test.ts src/test/close-look.test.ts src/test/ecosystem-notes.test.ts src/test/content-quality.test.ts`
- `npm run build`
- shared web-game client pass in `output/lane-2-main-212-client`
- seeded browser verification with clean console output in:
  - `output/lane-2-main-212-browser/moss-campion-comparison-state.json`
  - `output/lane-2-main-212-browser/moss-campion-comparison.png`
  - `output/lane-2-main-212-browser/tree-lungwort-close-look-state.json`
  - `output/lane-2-main-212-browser/tree-lungwort-close-look.png`
  - `output/lane-2-main-212-browser/console-errors.json`

## Queue Outcome

- Close `ECO-20260403-main-212`.
- Promote `ECO-20260403-critic-212` to `READY`.
