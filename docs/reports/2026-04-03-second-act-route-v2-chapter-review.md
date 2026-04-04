# 2026-04-03 Second-Act Route V2 Chapter Review

Reviewed `ECO-20260403-critic-216`.

## Findings

No blocking issues.

## What Holds Up

- The inland branch now reads like a clearer second act on the two highest-leverage lane-4 seams: the route board and guided season both move through `Stone Shelter`, `Thaw Window`, and `Tundra Survey` instead of dropping back to generic settled wording.
- The implementation keeps the previously established filed-note contract intact. `tundra-short-season` still files as `Short Season`, while the live outing and board surfaces use `Thaw Window` only where the chapter framing is supposed to feel more authored.
- Focused unit and runtime coverage pin the new treeline and tundra states, so the chapter framing is now guarded where it is most visible to the player.

## Watch Item

- `src/engine/nursery.ts` still uses the older unlock summaries `Treeline Shelter` and `Short Season` for `mountain-avens-bed` and `crowberry-bed`. That mismatch does not block this queue step because the scoped implementation was intentionally limited to the board and guided-season seams, but the next second-act payoff wave should decide whether those nursery hints stay canonical or adopt the newer chapter-facing naming.

## Verification

- `npx vitest run src/test/field-season-board.test.ts src/test/guided-field-season.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "switches the route board to treeline and can hand the outing guide to route marker|switches the route board to tundra and can hand the outing guide to route marker|shows the thaw-window route replay note when re-entering tundra during the active process window"`

## Outcome

Promote `ECO-20260403-scout-217` to `READY`.
