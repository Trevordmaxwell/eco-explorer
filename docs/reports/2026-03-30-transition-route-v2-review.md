# 2026-03-30 Transition Route V2 Review

## Scope

Review for `ECO-20260330-critic-87` covering the `main-112` conversion of `scrub-edge-pattern` and `forest-cool-edge` from raw inspect-count beats into Route v2 transition outings.

## Result

No blocking lane-4 issues found.

The middle-habitat pair now reads like authored comparison work instead of another hidden checklist: `scrub-edge-pattern` asks the player to walk a real coast-to-forest transect, `forest-cool-edge` narrows the follow-up to one tighter `creek-bend` read, and both beats keep the existing notebook-return finish instead of inflating the station shell.

## What Landed Cleanly

- `main-112` reused the live `assemble-evidence` core instead of inventing a third Route v2 runtime type, which keeps lane 4 inside the approved notebook-first shape.
- The scrub beat now has a clear path and role split across `back-dune`, `windbreak-swale`, and `forest-edge`, so the outing teaches gradient reading rather than generic counting.
- The forest beat now feels distinct from the scrub transect because it stays focused on one cooler forest-side pocket at `creek-bend` with its own role-based evidence trio.
- The new board summary, beat detail, and next-direction copy point at clue roles and habitat stages, not “find any three things,” which keeps the route shell compact while making the outing feel more intentional.
- The hand-lens notebook-fit text now formats the new slot names readably, so the tiny support choice still helps interpretation instead of surfacing code-shaped labels.

## Watch Item

One non-blocking watch item remains for future UX polish:

- the replay-note layer can override the active beat detail in some live seeded states before the player sees the newly authored base instruction, as shown by the edge-pattern smoke path surfacing `Haze Edge` detail immediately. The route summary and next-direction copy still keep the outing readable, so this is not a blocker, but a later lane-4 polish pass should confirm the flavor layer is not hiding first-run teaching copy too aggressively.

## Verification Reviewed

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts src/test/content-quality.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "switches the route board to coastal scrub and can hand the outing guide to route marker"`
- `npx vitest run src/test/runtime-smoke.test.ts -t "shows one route replay note when re-entering the active route biome during a live replay window"`
- `npx tsc --noEmit`
- `npm run build`

## Recommendation

Mark `ECO-20260330-critic-87` clean and promote `ECO-20260330-scout-77` to `READY`.
