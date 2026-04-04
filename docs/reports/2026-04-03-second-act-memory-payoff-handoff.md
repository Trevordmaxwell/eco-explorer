# 2026-04-03 Second-Act Memory Payoff Handoff

Prepared `ECO-20260403-scout-213` in lane 2.

## Recommendation

Keep `main-213` sketchbook-first and limit it to the same two second-act anchors that just landed:

- add one shared `sketchbookNote` to `moss-campion` in `src/content/shared-entries.ts`
- add one local `sketchbookNote` to `tree-lungwort` in `src/content/biomes/forest.ts`

Recommended note lines:

- `moss-campion`: `Dense cushion bloom on cold ground.`
- `tree-lungwort`: `Leafy lichen on cool damp bark.`

## Why This Shape

- `moss-campion` now has the right note-backed comparison support, but it still leaves no sketchbook trace in either treeline or tundra because the shared entry has no authored memory line yet.
- `tree-lungwort` now has a good close-look card, but it still falls back to the plain short-fact strip because the forest entry has no `sketchbookNote`.
- The latest review already showed the comparison pane is close to its practical copy limit, so the calmest next move is to deepen memory through the existing sketchbook strip instead of adding another note or comparison layer.
- Handheld fit is part of the implementation shape: if either line clips, trim the note copy rather than widening the sketchbook surface.

## Scope For Main

- touch `src/content/shared-entries.ts`
- touch `src/content/biomes/forest.ts`
- add focused proof in `src/test/sketchbook.test.ts`
- use existing `content-quality` sketchbook guardrails, but only touch `src/test/content-quality.test.ts` if a targeted regression check is truly needed

## Guardrails

- do not add new ecosystem notes
- do not widen the comparison or close-look allowlists again
- do not touch station, route-board, map, atlas shell, or `game.ts`
- keep the pass to one shared alpine memory line and one forest vertical memory line

## Suggested Test Shape

- one sketchbook test proving `moss-campion` now carries the authored note in treeline
- one sketchbook test proving the same shared `moss-campion` note also appears in tundra
- one sketchbook test proving `tree-lungwort` now carries its authored note in forest

## Queue Outcome

- Close `ECO-20260403-scout-213`.
- Promote `ECO-20260403-main-213` to `READY`.
