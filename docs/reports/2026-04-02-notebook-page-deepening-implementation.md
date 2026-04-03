# 2026-04-02 Notebook Page Deepening Implementation

Implementation note for `ECO-20260402-main-153`.

## Outcome

The live `note-tabs` filing return now reads more like a tiny named field page instead of a generic system event.

The pass stayed inside the existing lane-4 seams:

- `field-season-board.ts` now carries a route-title preview label on notebook-ready Route v2 returns
- the ready strip only swaps to that route title when `note-tabs` is selected and a clue-backed preview exists
- `game.ts` now reuses the same route title for the filed Route v2 notice
- no second panel, filing modal, archive card, or broader station shell was added

## What Changed

### Route-titled `note-tabs` preview

Notebook-ready Route v2 states now keep one tiny `previewLabel` alongside the existing preview text.

That means:

- `hand-lens`, `place-tab`, and the generic ready state still read `NOTEBOOK READY`
- `note-tabs` now uses the route title itself as the strip stamp when the player is previewing the filed sentence
- the strip body still stays on the compact clue-backed filed sentence rather than adding another line or a new note schema

### Matching filed notice title

Filing the note now reuses that same route title for the recorded notice instead of falling back to `TASK RECORDED`.

This keeps the preview and the filed result feeling like the same little page being stamped into the notebook, while non-Route-v2 request notices keep their current generic behavior.

## Verification

- `npx vitest run src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "files a notebook-ready route from the routes page with one Enter press|uses the gathered clue names when note tabs previews and files a ready evidence route|turns the forest expedition slot into a single notebook-led chapter"`
- `npm run build`
