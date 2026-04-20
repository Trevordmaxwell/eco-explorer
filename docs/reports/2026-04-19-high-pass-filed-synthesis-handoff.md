# 2026-04-19 High Pass Filed Synthesis Handoff

## Queue Ref

- `ECO-20260419-scout-321`
- prepares `ECO-20260419-main-321`

## Current State

High Pass already has the right content-owned filing seam in `src/engine/field-requests.ts`.

- `treeline-high-pass.routeV2Note.filedText` is the generic filed sentence.
- `treeline-high-pass.routeV2Note.clueBackedTail` lets the route assemble a clue-backed sentence from the exact gathered evidence.
- `resolveRouteV2FiledDisplayText(...)` feeds the existing note-tabs preview and final filed notice, so one copy change can reach both player-facing filing surfaces.

The current filed text is route-complete accurate, but it still reads like a slot recap: `Stone lift, lee watch, rime mark, and talus hold now trace the first climb into High Pass.`

## Recommendation

Keep `main-321` to one compact filed-synthesis pass on the existing Route v2 note path.

Recommended exact copy target:

- `filedText`: `Stone lift, lee watch, rime mark, and talus hold show how low ridge life uses shelter pockets on exposed High Pass.`
- `clueBackedTail`: `show how low ridge life uses shelter pockets on exposed High Pass.`

That keeps the route vocabulary intact while making the filed note teach the relationship: exposed High Pass ground still has shelter pockets where low-growing alpine life and watchful animals can persist.

## Implementation Targets

- Update only the `treeline-high-pass` `routeV2Note` block in `src/engine/field-requests.ts`.
- Update the ready-to-file High Pass expectation in `src/test/field-requests.test.ts`.
- Add or update one clue-backed filed-note assertion for `treeline-high-pass` if the existing ready-to-file test feels too indirect.
- Add one `field-season-board` note-tabs preview assertion only if the implementer wants explicit coverage that the existing display seam carries the new copy.
- Run `src/test/content-quality.test.ts` to protect copy budgets.

## Boundaries

- Do not add a new journal shell, archive panel, station card, or notebook dump.
- Do not edit station, map, locator, or chapter-state behavior; lane 1 owns the post-filed closure state.
- Do not add a new observation prompt for this pass. The live `Rime Footholds` note and prompt already cover the rime-footing relationship in the journal; this pass should make filing itself land better.
- Do not add more High Pass fact volume or another close-look/content pack.

## Suggested Verification

- `npm test -- --run src/test/field-requests.test.ts -t "High Pass|clue-backed"`
- `npm test -- --run src/test/field-season-board.test.ts -t "note-tabs preview"`
- `npm test -- --run src/test/content-quality.test.ts`
