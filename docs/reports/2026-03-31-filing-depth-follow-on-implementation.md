# 2026-03-31 Filing-Depth Follow-On Implementation

Implementation note for `ECO-20260331-main-137`.

## Outcome

The notebook filing return now reads like a compact filed field case instead of only replaying the static route sentence.

The implementation stays inside the current lane-4 seams:

- `field-requests.ts` now resolves clue-backed filed-note text from the saved `routeV2Progress` evidence and landmark ids
- evidence routes can opt into a compact authored `clueBackedTail`, while the existing `filedText` stays as the safe fallback
- `field-season-board.ts` now uses that shared resolver for the `note-tabs` `NOTEBOOK READY` preview
- `game.ts` now captures the same resolved note before filing clears `routeV2Progress`, so the post-file notice matches the preview

## What Changed

### Shared filed-note resolver

`src/engine/field-requests.ts` now owns one shared `resolveRouteV2FiledNoteText()` helper.

It:

- orders evidence routes by their authored slot order instead of gather order
- resolves clue names from the biome entry registry
- composes those names with route-authored `clueBackedTail` copy
- falls back to the existing `routeV2Note.filedText` when a route does not opt in or the saved clues cannot be resolved safely

That keeps filing-depth logic in one place and avoids process-window dependence.

### Live filing surfaces

The two existing filing surfaces now use the same resolved note text:

- the `note-tabs` preview on the `NOTEBOOK READY` strip
- the `TASK RECORDED` notice shown after the one-press filing action

`forest-cool-edge` now files from its saved clue carriers, not from the temporary `Moist Edge` header, so the filed note stays stable after the moisture window passes.

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "files a notebook-ready route from the routes page with one Enter press|uses the gathered clue names when note tabs previews and files a ready evidence route|turns the forest expedition slot into a single notebook-led chapter"`
- `npm run build`
