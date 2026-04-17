# Living-World Replay Variant Handoff

Prepared `ECO-20260416-scout-306` for lane 4.

## Recommendation

Use Sprint 2 to convert two already-authored replay labels into real route behavior without adding a new shell:

- the front-half `forest-moisture-holders` replay as `Moist Hollow`
- the inland `treeline-low-fell` replay as `Brief Bloom`

This keeps the pass inside the current Route v2 model, makes the replay windows tactile, and avoids spending the sprint on a bigger planner, notice, or world-state framework.

## Why These Two Routes

### `forest-moisture-holders` is the right front-half route

The `coastal-shelter-line` board already knows how to call the active forest-study beat `Moist Hollow` during the `moisture-hold` process window, but the live request still behaves like ordinary `Moisture Holders`.

That makes it the cleanest “text into action” conversion in the early half of the game:

- the replay title and summary are already authored
- Root Hollow and the filtered return already contain damp-carrier alternates like `tree-lungwort` and `seep-moss-mat`
- the current runtime suite already has deterministic Root Hollow positions from the recent support-readable pass

### `treeline-low-fell` is the right inland route

`Brief Bloom` is already the strongest inland replay note that still reads as copy-only today. Peak phenology is already authored in Treeline Pass, and `moss-campion` is an existing low-fell bloom that can stand beside `mountain-avens` without inventing a new ecology rule.

This makes it the best inland proof because:

- the board already names the replay state `Brief Bloom`
- the lichen-fell zone already spawns `mountain-avens`, `moss-campion`, and `arctic-willow` together
- the change can stay narrow to one slot instead of redesigning the full route

## Concrete Main Handoff

`ECO-20260416-main-306` should use exactly these two replay variants.

### 1. Front-Half Replay: `forest-moisture-holders` -> `Moist Hollow`

Add a `processFocus` to `forest-moisture-holders`:

- `momentId: 'moisture-hold'`
- `activeTitle: 'Moist Hollow'`
- `activeSummary: 'Mist and damp ground make the cool hollow clues stand out again.'`
- `activeSlotEntryIdsBySlotId`:
  - `shelter`: `tree-lungwort`
  - `ground`: `seep-moss-mat`

Keep the living slot unchanged. The win here is that damp bark and damp wall growth can now complete the replay route while the filed note still resolves from whatever the player actually logged.

Proof shape:

- use the existing Root Hollow shelf start near the current `Moisture Holders` support-readable proof for the `tree-lungwort` shelter fit
- if a second proof is needed, use the filtered-return cave-mouth sill where `seep-moss-mat` is already stable for the `ground` slot

### 2. Inland Replay: `treeline-low-fell` -> `Brief Bloom`

Extend the world-state route focus seam so a route can change accepted clue carriers, not just title and summary.

Then add a `worldStateFocus` to `treeline-low-fell`:

- `phenologyPhase: 'peak'`
- `activeTitle: 'Brief Bloom'`
- `activeSummary: 'Peak avens bloom makes the low open fell easiest to spot today.'`
- `activeSlotEntryIdsBySlotId`:
  - `fell-bloom`: `moss-campion`

Keep the other low-fell slots unchanged. The phenology window should only deepen the bloom read, not rewrite the whole outing.

Proof shape:

- prefill `last-tree-shape` and `low-wood` in the save
- use a deterministic lichen-fell start near the authored avens/campion pocket
- prove that `moss-campion` can complete `fell-bloom` during peak phenology while the non-peak route stays on ordinary `mountain-avens`

## Seam Guidance

Keep the implementation tight:

- add optional `activeSlotEntryIdsBySlotId` to `FieldRequestWorldStateFocus`
- let evidence-slot matching merge world-state alternates with process alternates
- reuse the same merged slot logic for notebook-fit detection and route advancement
- do not widen the support chip or bubble rules beyond the new route fits naturally showing up

## Why Not `forest-cool-edge` For This Sprint

`Moist Edge` already has a replay title, but the authored `moisture-hold` carriers at Creek Bend overlap too closely with the base route. Turning that route tactile right now would force weaker invented alternates instead of using the stronger replay labels that already have obvious authored companions.

That makes `Moist Edge` a good later follow-on, but not the best first Sprint 2 spend.

## Guardrails

- no new replay HUD, planner, or station surface
- no new shell copy outside the route title and summary that already exist
- no broader weather/day-part framework extension in this pass
- keep filed note text clue-backed and stable when replay titles are active

## Proof Plan

- add `field-requests` coverage for `Moist Hollow` and `Brief Bloom` becoming active
- add acceptance coverage for `tree-lungwort`, `seep-moss-mat`, and `moss-campion`
- add one focused Root Hollow runtime proof and one focused lichen-fell runtime proof
- keep existing `Wrack Shelter`, `Held Sand`, and `Thaw Window` proofs green as the route-variant bar
