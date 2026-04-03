# 2026-04-02 Shared-Carrier Sketchbook Implementation

Implemented `ECO-20260402-main-173` in lane 2.

## What Changed

- Added compact authored `sketchbookNote` lines to the three shared habitat carriers in `src/content/shared-entries.ts`:
  - `beach-grass`
  - `salmonberry`
  - `arctic-willow`
- Extended `src/test/sketchbook.test.ts` with one focused shared-carrier memory case covering the coast, middle edge, and high-country trio through the live sketchbook page builder.

## Final Note Family

- `beach-grass`
  - `Tough grass holding the first bright dune ridge.`
- `salmonberry`
  - `Bright berries thickening the cool edge into forest.`
- `arctic-willow`
  - `Low willow resting where open fell softens to tundra.`

## Why This Shape

- The atlas pass already spent the route-shell budget on tiny filed-memory prefixes, so the sketchbook is the right place for the warmer notebook payoff.
- These three entries already do real route and habitat work across the live game, but until now the sketchbook fell back to generic fact text instead of remembered-place language.
- Keeping the pass inside `shared-entries.ts` makes it content-owned and reusable across the biomes where those carriers are actually seen.

## Verification

- `npm test -- --run src/test/sketchbook.test.ts`
- `npm test -- --run src/test/content-quality.test.ts -t "keeps authored sketchbook notes within the compact source-strip budget"`
- `npm run build`
- required web-game client smoke in `output/lane-2-main-173-client/`
- seeded browser proof in `output/lane-2-main-173-browser/`
  - `salmonberry-sketchbook.png`
  - `arctic-willow-sketchbook.png`
  - `console-errors.json`

## Notes

- The broader `npm test -- --run src/test/sketchbook.test.ts src/test/content-quality.test.ts` sweep still hits one unrelated existing field-request copy-budget failure in `content-quality.test.ts`, so this pass kept the note-budget verification focused on the sketchbook seam it actually changed.
- A first-coast browser seed remained inconsistent about opening the journal automatically, so the screenshot proof here leans on the stable forest and tundra seeded states while the direct sketchbook test covers `beach-grass`.

## Outcome

- Close `ECO-20260402-main-173`.
- Promote `ECO-20260402-critic-146` to `READY`.
