# 2026-04-04 Coastal Scrub Identity Support Implementation

Implemented `ECO-20260404-main-256` in lane 2.

## What Landed

- Added one narrow comparison-side preferred-note seam in `src/engine/journal-comparison.ts` so a shared entry can target a stable local ecosystem note for comparison cards without changing the normal notebook note resolver.
- Added `dune-lupine` to the same-pane comparison allowlist.
- Scoped the new preference map to exactly one entry:
  - beach: `Low Runner Band`
  - coastal scrub: `Sturdier Cover`
- Added focused resolver coverage in `src/test/journal-comparison.test.ts`.
- Added one runtime smoke proving the live journal opens the new `dune-lupine` comparison once the intended scrub note is unlocked.

## Scope Kept Tight

- Did not reorder or broaden `resolveEcosystemNoteForEntry`.
- Did not add a new ecosystem-note id, a new close-look card, or another sketchbook line.
- Left route-board, station, map, and broader journal-shell behavior untouched.
- Left the existing `sturdier-cover` summary unchanged because the live browser proof already gave enough contrast against `Low Runner Band`.

## Verification

- `npm test -- --run src/test/journal-comparison.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "dune-lupine|comparison"`
- `npm run build`
- Web-game client smoke in `output/lane-2-main-256-client/`
- Seeded browser proof in `output/lane-2-main-256-browser/`:
  - `dune-lupine-comparison.png`
  - `dune-lupine-comparison-state.json`
  - `console-errors.json` stayed empty

## Outcome

Coastal Scrub now gets one stronger notebook-facing identity contrast without reopening its denser local copy surfaces: `dune-lupine` can finally teach the move from early dune hold into sturdier woody scrub through the live same-pane comparison cards.
