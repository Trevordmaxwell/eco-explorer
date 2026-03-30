# Sketchbook V1 Handoff

Date: 2026-03-28
Status: Ready for future implementation after comparison pages

## Method

- read queue item `ECO-20260328-scout-15` and packet `015`
- reviewed:
  - `docs/reports/2026-03-28-depth-and-game-feel-sequence.md`
  - `docs/reports/2026-03-28-shared-species-comparison-handoff.md`
  - `src/engine/save.ts`
  - `src/engine/types.ts`
  - `src/engine/journal.ts`
  - `src/engine/overlay-render.ts`
  - `src/engine/game.ts`
  - `src/content/shared-entries.ts`
  - `src/test/journal.test.ts`
  - `src/test/runtime-smoke.test.ts`

## Core Recommendation

Do not start sketchbook mode with freehand drawing.

The safest first version is a calm journal-side composition tool:

- one sketchbook spread per biome
- a few anchored stamp slots
- discovered local entries as the source material
- optional short page title later if the surface can hold it

This keeps the system personal and art-forward without turning the game into an editor, crafting system, or inventory manager.

## Why Stamps Beat Freehand For V1

The current runtime already has:

- a compact journal shell
- pointer hit-target support
- existing sprite rendering
- a simple local save model

It does not yet have:

- drag-state editing flows
- freehand stroke storage
- a larger dedicated creation canvas

So the strongest v1 is to reuse discovered sprites as notebook stamps rather than adding a pixel drawing tool.

Freehand or silhouette tracing can stay a later embellishment once the basic authorship loop proves out.

## Recommended V1 Shape

### 1. One spread per biome

Each biome gets one sketchbook page.

Recommended unlock:

- unlock when the biome reaches `surveyed`

That keeps the mode earned by exploration while still opening early enough to matter.

### 2. Use local discovered entries only

The stamp source should be:

- entries discovered in the currently selected biome

That keeps the page local to that habitat and stays aligned with the local-sighting journal rule for shared species.

### 3. Use a tiny anchored layout

Recommended first layout:

- 3 large stamp anchors
- optionally 1 small accent slot for a shell or landmark later

Good anchor shapes:

- top-left
- top-right
- lower-center

The point is not perfect placement freedom. The point is arranging a memorable field spread.

### 4. Keep the interaction list-driven, not drag-driven

Best first interaction:

- open sketchbook mode from the journal while a biome is selected
- keep the discovered-entry list as the source column
- selecting an entry and confirming `Place` stamps it into the active slot
- let the player cycle slots, replace a stamp, or clear a slot

This reuses the current journal navigation model and avoids introducing drag physics in a tiny canvas.

### 5. Start with full sprite stamps

Best first art treatment:

- use the discovered entry sprite as a notebook stamp or pasted field cutout

Optional later embellishments:

- ink-tint stamps
- silhouette mode
- tape corners or sticker shadows

Those can come later. The first pass should prove the composition loop, not the rendering tricks.

## Best Journal Integration

The cleanest future integration is not a new top-level overlay.

Use the existing journal as the host:

- the left side stays the entry source list
- the right side becomes the sketchbook spread for the selected biome
- a tiny `Sketchbook` affordance appears only when the biome is unlocked for it

That keeps the feature feeling like notebook authorship instead of a separate minigame.

## Save Seam Recommendation

Add one compact save branch instead of a broad art system.

Recommended future shape:

- `sketchbookPages[biomeId]`

Each biome page can store:

- placed entry ids
- slot ids
- optional render mode later
- optional page title later

The key is to save composition choices, not strokes.

## Scope Limits

Avoid in v1:

- freehand pixel drawing
- drag-and-drop editing
- dozens of slots
- per-item crafting recipes
- collectible glue, stickers, or resources
- sharing or export systems
- a second progression ladder

If the player has to manage tools or materials, the scope has already drifted.

## File Seams For Future Implementation

Most likely file touches:

- `src/engine/save.ts`
- `src/engine/types.ts`
- `src/engine/journal.ts`
- `src/engine/overlay-render.ts`
- `src/engine/game.ts`
- `src/engine/sprites.ts`
- `src/content/biomes/*.ts`
- `src/test/journal.test.ts`
- `src/test/runtime-smoke.test.ts`

If a pure helper is added, it should focus on page layout and slot state rather than on rendering.

## Test Ideas

- save normalization tests for empty and partially filled sketchbook pages
- journal tests that only local discovered entries are placeable on a biome page
- runtime smoke coverage for opening sketchbook mode, placing an entry, saving, and reopening
- tests that shared species only appear on a biome page after a real local sighting in that biome

## Queue Outcome

- `ECO-20260328-scout-15` can close with this report.
- `main-40` should stay focused on:
  - anchored stamp composition
  - local discovered entries only
  - journal-hosted authorship
  - no freehand editor or crafting loop in v1
