# 2026-03-31 Note Tabs And Notebook Return Review

Review for `ECO-20260331-critic-102`.

## Result

No blocking issue found.

The lane-4 follow-on stayed inside the intended envelope:

- the third support remains tiny and text-only inside the existing `SUPPORT` row
- `hand-lens`, `note-tabs`, and `route-marker` now each own a distinct job instead of collapsing into overlapping hint styles
- the notebook return is still one press on the current `ROUTES` page
- the filing payoff is more satisfying because Route v2 beats now resolve to authored note sentences instead of title-only toasts

## What Checked Cleanly

- save normalization and support cycling stay compact: `note-tabs` adds no new persistence seam, and `route-marker` still remains ownership-gated
- the `TODAY` strip split is coherent:
  - `hand-lens` stays clue-first
  - `note-tabs` stays notebook-first
  - `route-marker` stays travel-first
- `NOTEBOOK READY` now reads route-aware by default, while `note-tabs` gives a calmer filed-note preview without reopening a second notebook surface
- post-file notices now carry the authored note result for live Route v2 beats, including the `ROOT HOLLOW` expedition chapter
- the next-season opener still works after the support-cycle change: `route-marker` just takes one extra calm step through `note-tabs` instead of silently breaking the map handoff

## Verification Reviewed

- `npx vitest run src/test/save.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "files a notebook-ready route from the routes page with one Enter press|buys route marker after the movement pair and lets the support row activate it on the world map|switches the route board to treeline and can hand the outing guide to route marker|switches the route board to coastal scrub and can hand the outing guide to route marker|surfaces the season capstone, then opens the next field season through the expedition seam|turns the forest expedition slot into a single notebook-led chapter"`
- `npm run build`

## Watch Item

`note-tabs` intentionally trades the explicit filing instruction for the filed-note preview once the strip is in `NOTEBOOK READY`. That still reads acceptably here because the label stays strong and the filing action remains one press, but future copy growth should keep that preview short so the action cue does not get too implied.

## Follow-On

Lane 4 has no remaining active queue item in this packet after `critic-102`.
