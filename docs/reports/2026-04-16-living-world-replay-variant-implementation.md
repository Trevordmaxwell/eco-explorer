# Living-World Replay Variant Implementation

Implemented `ECO-20260416-main-306` for lane 4.

## What Landed

### `forest-moisture-holders` now becomes `Moist Hollow`

`src/engine/field-requests.ts` now gives `forest-moisture-holders` a real `moisture-hold` process focus instead of leaving the replay label on the board only.

During the live late `mist-drip` window:

- the active outing title becomes `Moist Hollow`
- the active outing summary becomes `Mist and damp ground make the cool hollow clues stand out again.`
- `tree-lungwort` can fill the `shelter` slot
- `seep-moss-mat` can fill the `ground` slot

The canonical route identity still stays `Moisture Holders` for notebook-ready and filed states.

### `treeline-low-fell` now becomes `Brief Bloom`

The route world-state seam now supports alternate clue carriers, not just title and summary changes.

During peak phenology:

- the active outing title becomes `Brief Bloom`
- the active outing summary becomes `Peak avens bloom makes the low open fell easiest to spot today.`
- `moss-campion` can fill the `fell-bloom` slot

Outside peak phenology, the route keeps its normal `Low Fell` clue set.

## Seam Change

`FieldRequestWorldStateFocus` can now optionally provide `activeSlotEntryIdsBySlotId`, and the shared Route v2 matching path now merges:

- base route slot entries
- process-focus alternates
- world-state-focus alternates

That shared merge is now used by:

- notebook-fit detection
- hand-lens active-clue preference
- route advancement on inspect

This keeps replay variants inside one route-local evidence-slot seam instead of adding another replay system.

## Verification

- `npx vitest run src/test/field-requests.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "tree lungwort count as the Moist Hollow shelter clue|moss campion count as the Brief Bloom fell-bloom clue|woolly lousewort|beach grass as the Held Sand clue"`
- `npm run build`
