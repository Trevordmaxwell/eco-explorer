# Next-Chapter Shell And Expedition Render Split Handoff

## Queue Ref

- `ECO-20260416-scout-307`
- prepares `ECO-20260416-main-307`

## Recommended Scope

Sprint 3 lane 1 should spend its first next-chapter move on one shell extension plus one render protection pass:

- keep the station `SEASON -> EXPEDITION` page as one card-first chapter surface
- open that card just enough to feel like a real next chapter instead of a parked teaser
- extract the expedition page body out of the inline branch in [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts)

That gives lane 1 a real chapter-facing step without turning the field station into a broader dashboard.

## Recommended Shell Target

The safest chapter move is to extend the existing expedition card family in [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts), not to add another station page or a second expedition panel.

The current `ROOT HOLLOW` expedition card already proves the shell shape:

- title plus compact status line
- one summary block
- one `STARTS` row
- one next-action note
- one optional teaser strip below

`main-307` should reuse that exact shell and spend the new room on one real follow-on chapter state after the logged `ROOT HOLLOW` step, likely through the existing teaser-or-follow-on seam instead of inventing more tabs, archive strips, or planner rows.

## Recommended Protective Split

The best protection pass is the inline expedition-page renderer in [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts).

Right now the routes page already lives behind [field-station-routes-page.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-station-routes-page.ts) and the nursery page already lives behind [field-station-nursery-page.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-station-nursery-page.ts), but the expedition branch is still drawn inline inside the larger station renderer.

That branch now owns:

- expedition card framing
- wrapped summary and note layout
- status-color choice
- `STARTS` row placement
- teaser strip placement

This is the next obvious renderer split before the chapter broadens again.

## Suggested Main Shape

### Data seam

Let [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts) keep owning chapter-state composition through `resolveFieldSeasonExpeditionState(...)`.

If `main-307` needs one new next-chapter status or teaser shape, add it there instead of pushing more branching into render code.

### Render seam

Extract the expedition page body into a sibling helper, for example:

- `src/engine/field-station-expedition-page.ts`

That helper should accept the already-resolved expedition state plus palette and layout rects, then draw:

- the main expedition card
- the optional teaser/footer strip

[overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts) should keep only:

- station shell framing
- season tab buttons
- page switching
- passing the expedition state into the new helper

## Why This Boundary

- It follows the same protection pattern already used for routes and nursery.
- It keeps chapter growth in the existing expedition card model instead of widening the station shell.
- It lets future lane-1 chapter polish stay in a focused expedition helper rather than re-expanding the big renderer.
- It preserves `game.ts` as coordinator glue instead of sending Sprint 3 back into station-open churn that Sprint 2 just reduced.

## Non-Goals

- do not add another field-station page
- do not add a planner, checklist, or quest-log shell
- do not turn the expedition area into multiple cards at once
- do not widen the routes-first station default

## Verification For Main

- focused expedition-page rendering coverage if a pure helper is extracted
- one focused runtime-smoke slice proving the station still opens routes-first while the expedition tab shows the new chapter-facing card cleanly
- `npm run build`
