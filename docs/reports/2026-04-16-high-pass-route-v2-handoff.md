# 2026-04-16 High Pass Route V2 Handoff

Prepared `ECO-20260416-scout-310` against packet `126`, the Sprint 3 queue translation, the filed-season `HIGH PASS` shell work, the High Pass science-pack and chapter-space reports, the live treeline biome data, and the current field-request / field-request-state seams.

## Current Read

The next chapter is already live everywhere except lane 4's route seam:

1. lane 1 now opens one real `HIGH PASS / NEXT` chapter card on the expedition page and points the archived routes shell, journal locator, and world map at `High Pass`
2. lane 2 already strengthened the chapter-facing carriers through `hoary-marmot` and `dwarf-birch`
3. lane 3 already gave `Treeline Pass` one remembered `Stone Shelter` middle plus the existing lee and open-fell continuation

What is still missing is the first actual Route v2 outing for that chapter.

Right now the filed-season locator is still carrying placeholder route language in [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts): the shell says `High Pass`, but the next-direction text is still effectively recycled `Low Fell` language.

## Main Risk To Avoid

Do not let the new High Pass request wake up before lane 1's calm season-close return finishes.

`forest-season-threads` currently sets `save.seasonCloseReturnPending = true`, and the game uses that one-beat pause to show `RETURN TO STATION` before the steady filed-season shell takes over. A new `unlockAfter: ['forest-season-threads']` route would otherwise become the live active request immediately and could replace the current journal / locator behavior too early.

`main-310` should therefore gate the new request so it becomes the live active outing only after `seasonCloseReturnPending` has cleared, while the current route-locator and station-close guidance stay intact during the return beat.

## Recommendation

Treat `main-310` as one post-season `High Pass` Route v2 request in `Treeline Pass`, not as a broader second-season board or another expedition shell.

Best shape:

- keep the chapter title stable as `High Pass`
- add one new Route v2 definition after `forest-season-threads`
- use the already-authored `Stone Shelter` basin, lee shelf, and open-fell continuation instead of inventing more geometry or a new route family
- replace the filed-season placeholder direction copy with the new route's real clue path

## Exact Main Shape

### Request target

- request id: `treeline-high-pass`
- title: `High Pass`
- unlock after: `forest-season-threads`
- activation guard: do not surface it as the active request while `seasonCloseReturnPending` is still `true`
- type: `assemble-evidence`
- zone focus: `dwarf-shrub` into `lichen-fell`

### Ordered evidence path

Use one four-leg climb that starts in the new shelter pocket and ends in the first exposed hold:

1. `stone-lift` -> `frost-heave-boulder`
2. `lee-watch` -> `hoary-marmot`
3. `rime-mark` -> `moss-campion`
4. `talus-hold` -> `talus-cushion-pocket`

Why this route:

- it spends the new `Stone Shelter` basin and the existing lee / fell continuation instead of reopening old ground
- it uses the carriers the chapter already taught this sprint
- it feels like a real next chase because it moves from sheltered lift to open alpine hold instead of repeating `Low Fell` verbatim

### Notebook and filing seam

Keep the filed note compact and clue-backed through the existing Route v2 model.

Recommended filing direction:

- ready title stays `NOTEBOOK READY`
- ready text points back to the field station to file the `High Pass` note
- filed sentence should read like one first shelter-to-pass climb beyond treeline, using the resolved clue list rather than a generic recap when possible

The existing `note-tabs` preview plus recorded-notice display seam is enough. Do not add another chapter recap panel.

### Support seam

Spend the player-felt support difference on one existing `hand-lens` clue win, not on a wider support rewrite.

Best target:

- bias the crowded final open-fell clue toward `talus-cushion-pocket` once `talus-hold` is the next slot

Why this is the right spend:

- the final fell pocket already has nearby non-fit alpine inspectables, so the `hand-lens` retarget is readable in live play
- `route-marker` already points the player at `Treeline Pass`
- `note-tabs` already owns preview / filing payoff cleanly

Do not add a new support row, new chip family, or a place-tab-only shell. If `place-tab` needs anything, prefer reusing the existing treeline note-backed question seam instead of authoring a second route-only system.

### Replay seam

Reuse the live treeline `frost-rime` process moment instead of inventing another replay system.

Best replay shape:

- process moment: `frost-rime`
- live replay title: `Rimed Pass`
- live replay summary should frame late ridge-wind rime as making the cold-ground mark easier to follow today
- active slot alternate:
  - `rime-mark` -> `reindeer-lichen`

This stays semantically tight because `moss-campion` and `reindeer-lichen` can both serve as low, exposed ground marks in the same final band, while the canonical filed route remains `High Pass`.

## Season And Locator Surfaces

Once the calm season-close return has cleared, the active-outing shell should stop using the old placeholder path.

`main-310` should update the existing next-season copy seams so they all describe the new route consistently:

- filed-season locator summary / next-direction in [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts)
- world-map `Today:` label via the active outing
- journal bottom-card active request once the route is live
- any expedition-card sentence that still points at the placeholder Low Fell-style path

Do not add another routes-page beat list or another station page. Let the archived routes shell stay archived, and let the active request plus existing `HIGH PASS` card carry the new chapter.

## Suggested File Targets

- [field-requests.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-requests.ts)
- [field-request-state.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-request-state.ts) or a nearby request-selection helper for the season-close activation guard
- [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts)
- [field-requests.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-requests.test.ts)
- [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts)

## Explicit Non-Goals

- do not add another field-station page, board, or planner shell
- do not reopen treeline geometry beyond the already-landed chapter pocket
- do not broaden the second season into multiple simultaneous routes
- do not let the new route override the `seasonCloseReturnPending` beat before the player returns to the station

## Suggested Verification

- `npx vitest run src/test/field-requests.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "High Pass|Rimed Pass|season close return|talus hold|route-locator:treeline"`
- `npm run build`

## Queue Outcome

- Close `ECO-20260416-scout-310`.
- Promote `ECO-20260416-main-310` to `READY`.
- Retarget `ECO-20260416-main-310` and `ECO-20260416-critic-310` to this handoff.
