# 2026-04-19 High Pass Route-Loop Proof Handoff

Prepared `ECO-20260419-scout-323` for lane 4.

## Recommendation

Make `ECO-20260419-main-323` the final packet-129 proof after the lane 1, lane 2, and lane 3 High Pass closure passes land.

The route-loop proof should not land before those gates because the current High Pass chapter helper still treats High Pass as `NEXT` without checking whether `treeline-high-pass` has been filed. A post-filed smoke that asserts station, map, journal, notice, and active request state are all settled would either fail today or lock in the pre-closure behavior that lane 1 is supposed to replace.

Recommended dependencies for `main-323`:

- `ECO-20260419-scout-323`
- `ECO-20260419-critic-320`
- `ECO-20260419-critic-321`
- `ECO-20260419-critic-322`

## Current Grounding

What already exists:

- `field-requests.test.ts` proves `treeline-high-pass` gathers `stone-lift -> lee-watch -> rime-mark -> talus-hold`, reaches `ready-to-synthesize`, and remains dormant while `seasonCloseReturnPending` is true.
- `field-request-controller.test.ts` proves the High Pass support split: `Rimed Pass` can be an active-clue retarget, while `talus-hold` remains an ordinary hand-lens retarget.
- `runtime-smoke.test.ts` already proves the live rime shelf, the live talus-hold pocket, non-hand-lens comparison behavior, and the season-close transition into active `High Pass`.
- `game.ts` already captures route filing notice text before `fileReadyRouteV2FieldRequest()` clears `routeV2Progress`, so the final filing notice can be asserted without adding a new notice framework.

What is missing:

- no single deterministic smoke files `treeline-high-pass` at the field station
- no runtime proof checks the final filed notice for `HIGH PASS`
- no runtime proof checks that filed High Pass stops surfacing as an active/replay target after filing
- no runtime proof checks station, map, journal, and request state together after the route is filed

## Concrete Main Handoff

After lane 1, lane 2, and lane 3 closure work is reviewed, `main-323` should add one focused runtime smoke rather than another Route v2 framework.

Preferred test shape:

1. Seed a save at the post-season High Pass route with:
   - completed field requests through `forest-season-threads`
   - `selectedOutingSupportId = 'hand-lens'`
   - `routeV2Progress` already holding `stone-lift`, `lee-watch`, and `rime-mark`
   - `worldStep = 6`, `biomeVisits.treeline = 2` only if the proof keeps the active rime context
2. Reuse the existing deterministic talus proof helpers:
   - `createHighPassFellHoldSave`
   - `findHighPassFellHoldStartX`
   - `treelineOpenFellIslandBand`
3. Enter `treeline`, inspect `talus-cushion-pocket`, and assert:
   - `activeFieldRequest.id === 'treeline-high-pass'`
   - `progressLabel === 'Ready To File'`
   - `routeV2Progress.status === 'ready-to-synthesize'`
4. Return to the field station and file from the routes page, then assert:
   - `fieldRequestNotice.title === 'HIGH PASS'`
   - notice text is the lane-2 finalized filed synthesis text
   - `fieldRequestNotice.variant === 'filed-route'`
   - `routeV2Progress === null`
   - `completedFieldRequestIds` includes `treeline-high-pass`
5. After the filed notice, assert the post-filed arc has settled across:
   - active request state: no live `treeline-high-pass`
   - journal field request / locator: no `route-locator:treeline` pointing back as if unstarted
   - world map: no `Today: High Pass` replay label after the route is filed
   - station/routes: lane-1 finalized filed state, not `NEXT`

## File Targets

- `/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts`
- `/Users/trevormaxwell/Desktop/game/src/test/field-requests.test.ts` only if lane 2 changes the filed-text resolver enough to need a focused unit proof
- `/Users/trevormaxwell/Desktop/game/src/test/field-request-controller.test.ts` only if lane 1 or lane 3 changes the support target shape

## Guardrails

- no second High Pass route
- no new Route v2 framework
- no new support UI chrome
- do not duplicate lane 1's chapter-state assertions in a brittle way; assert the final public state after lane 1 lands
- do not add a full first-beach-to-High-Pass playthrough smoke unless the focused seeded route-loop proof misses a real regression

## Suggested Verification

- `npx vitest run src/test/runtime-smoke.test.ts -t "High Pass.*file|file.*High Pass|route-loop"`
- `npx vitest run src/test/field-requests.test.ts src/test/field-request-controller.test.ts src/test/runtime-smoke.test.ts -t "High Pass|treeline-high-pass|filed"`
- `npm run build`
