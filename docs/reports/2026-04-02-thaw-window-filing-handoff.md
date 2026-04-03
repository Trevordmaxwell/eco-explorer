# 2026-04-02 Thaw-Window Filing Handoff

Scout handoff for `ECO-20260402-scout-131`.

## Scope

Prepare one compact lane-4 follow-on so `main-169` makes the new tundra process route file more like a tiny field page through the current `note-tabs` preview and recorded-notice seams, not through a new notebook page, panel, or save model.

## Best Target

Add one display-only thaw-window stamp to the filed `Short Season` return.

Why this is the right follow-on:

- The live outing now feels distinct in play. `Thaw Window` already lines up across the route board, season wrap, active request, and enter-biome replay notice.
- The notebook return is now the lagging seam. Once the route is `NOTEBOOK READY`, the filing path collapses back to the stable `SHORT SEASON` title plus the canonical filed sentence, so the return no longer carries any of the thaw-window identity that just made the outing special.
- Lane 4 already has one good shared filing seam: `field-season-board.ts` and `game.ts` both reuse the same filed-note sentence path. That is the highest-leverage place to deepen the return without widening the shell.

## Best Small Pass

### Keep the canonical filed note text stable

Do not rewrite the saved `Short Season` note itself.

Keep stable:

- `resolveRouteV2FiledNoteText()`
- the route title `Short Season`
- the clue-backed filed sentence
- the current save model

The review was right to protect that stability. The richer follow-on should live only in the display seam used by the preview and the filed notice.

### Add one shared display-only prefix

Introduce one tiny shared helper for the filed return display, for example a `resolveRouteV2FiledDisplayText()` layer that can prepend a short authored prefix while leaving the canonical filed note untouched underneath.

First live use:

- `tundra-short-season`
- display prefix: `Thaw Window.`

Target result on the live notebook-return seams:

- `note-tabs` preview label stays `SHORT SEASON`
- preview text becomes `Thaw Window. Purple Saxifrage, Cottongrass, and Cloudberry trace the tundra's short thaw window.`
- the filed notice keeps the title `SHORT SEASON`
- the filed notice reuses that same prefixed text instead of drifting into a second phrasing path

That gives the return a stronger field-page feel while keeping the actual filed route identity stable.

### Keep the change route-authored and narrow

Do not add a second helper family for every route yet.

Instead:

- add one optional authored display-prefix field near the existing route note definition
- wire the shared display helper through the two existing filing surfaces
- spend the first use only on `tundra-short-season`

That keeps the step small, reusable, and easy to extend later if another process-backed route earns the same treatment.

## Why The Alternatives Are Weaker

### Renaming the filed route to `Thaw Window`

That would blur the stable route identity the review just cleared. The route should still file as `Short Season`; the thaw-window language should deepen the page, not replace the saved title.

### Rewriting the canonical filed note sentence itself

That mixes data-layer change with display-layer polish. The cleaner move is to keep the canonical clue-backed sentence stable and add the richer field-page feel only where the player previews and files the page.

### Adding a new notebook page, subtitle row, or second strip line

That is shell growth. The existing `note-tabs` preview and recorded notice already own the right moment; they just need a slightly more authored display.

## Best Main-Agent Slice For `main-169`

1. In `src/engine/field-requests.ts`, add one optional authored display-prefix field for Route v2 filing return text plus a shared resolver that builds the preview/notice display text from the stable canonical filed note.
2. Give `tundra-short-season` the compact display prefix `Thaw Window.` and leave every other route unchanged.
3. In `src/engine/field-season-board.ts`, make `note-tabs` preview use that shared display resolver instead of the raw canonical filed sentence.
4. In `src/engine/game.ts`, make the one-press filed notice reuse that same shared display resolver instead of building its own text path.
5. In `src/test/field-requests.test.ts`, add a focused regression that the canonical filed text stays unchanged while the display text gets the thaw-window prefix.
6. In `src/test/field-season-board.test.ts` and `src/test/runtime-smoke.test.ts`, add one ready-to-file / filing proof that `SHORT SEASON` stays the title while the preview and notice text gain the shared thaw-window stamp.

## Expected File Touches

- `src/engine/field-requests.ts`
- `src/engine/field-season-board.ts`
- `src/engine/game.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not change the canonical filed note sentence returned by `resolveRouteV2FiledNoteText()`
- do not rename the filed route title away from `Short Season`
- keep the added prefix very short and route-authored
- do not add another notebook page, another strip row, or a new filing UI
- keep the first implementation scoped to `tundra-short-season`

## Queue Guidance

- close `ECO-20260402-scout-131` with this report
- bump packet `063` to version `3`
- turn `ECO-20260402-main-169` into the concrete thaw-window filing follow-on and promote it to `READY`
- leave `ECO-20260402-critic-142` blocked behind implementation
