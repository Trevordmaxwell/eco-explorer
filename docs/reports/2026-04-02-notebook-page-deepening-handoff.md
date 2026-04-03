# 2026-04-02 Notebook Page Deepening Handoff

Scout handoff for `ECO-20260402-scout-115`.

## Scope

Prepare one slightly richer lane-4 return pass so `main-153` makes filing a Route v2 note feel more like opening a tiny field page without adding another station panel, archive card, or notebook ledger.

## Best Target

Deepen the existing `note-tabs` filing seam with a route-titled page stamp.

The strongest small pass is:

- when `note-tabs` is selected and a route is `NOTEBOOK READY`, let the strip use the route's own title as the label
- keep the current clue-backed filed sentence as the strip body
- when the player files the note, let the recorded notice reuse that same route title instead of the generic `TASK RECORDED`

That gives the filing moment more authored page identity while staying inside two seams that already exist:

- `routeBoard.notebookReady`
- `showFieldRequestNotice()`

## Why This Is The Best Next Gain

The return already has the right structural shape:

- `hand-lens` keeps the ready state action-first
- `note-tabs` already swaps the strip over to the filed sentence preview
- pressing `Enter` already files the note from the routes page without a second panel

What is still thin is the page feel. Right now:

- the preview label stays the generic `NOTEBOOK READY`
- the recorded notice title stays the generic `TASK RECORDED`

So the return reads like a successful system event, but not quite like a named field page being filed.

Using the route title as the shared page stamp is the smallest change that adds that feeling without widening the shell.

## Why The Alternatives Are Weaker Right Now

### Expanding the `ROUTE LOGGED` strip

That would pull into lane 1's recap and season-shell ownership.

Lane 4 should not reopen the logged-route recap surfaces right after the route-conversion pass. The notebook-page deepening should stay on the live filing seam before the route becomes archived history.

### Adding a second body line or another panel

That would start widening the station shell.

The current strip is intentionally one small label plus one compact text body. Growing a second text block, note card, or notebook overlay would fight the packet's "slightly richer, still compact" guardrail.

### Authoring a brand-new per-route notebook-page schema

That is overkill for this step.

The route definitions already own authored titles and clue-backed filed sentences. Reusing those authored fields is enough for this wave.

## Best Main-Agent Slice For `main-153`

`main-153` should stay tightly scoped to:

1. extend `routeBoard.notebookReady` with one tiny preview label derived from the ready request title
2. make `resolveFieldSeasonWrapState()` use that label only when `note-tabs` is selected and a clue-backed preview is available
3. make `showFieldRequestNotice()` reuse the same route title when a Route v2 note is filed
4. keep non-`note-tabs` supports on the current generic `NOTEBOOK READY` strip
5. add focused tests for preview labeling, filed notice titling, and one route-page runtime flow

## Expected Behavior

### While the note is ready

If `note-tabs` is selected:

- label becomes the route title, for example `STONE SHELTER`
- body remains the clue-backed filed sentence preview

If any other support is selected:

- keep the current `NOTEBOOK READY`
- keep the current ready-text action prompt

### When the note is filed

The recorded notice should feel like the same little page being stamped into the notebook:

- title should use the route title instead of `TASK RECORDED`
- body should stay the resolved filed sentence

That keeps the effect route-authored but still compact.

## Expected File Touches

- `src/engine/field-season-board.ts`
- `src/engine/game.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

`src/engine/field-requests.ts` should only change if `main-153` decides a tiny helper belongs there for shared title resolution.

## Guardrails

- do not add a second notebook panel or filing modal
- do not change the hand-lens, place-tab, or route-marker behaviors
- do not reopen lane-1 `ROUTE LOGGED` or archive copy
- keep label widths safe for the compact strip and notice shell
- prefer existing route titles and filed sentences over new freeform prose

## Queue Guidance

- close `ECO-20260402-scout-115` with this report
- bump packet `055` to version `3`
- promote `ECO-20260402-main-153` to `READY`
- leave `ECO-20260402-critic-126` blocked behind implementation
