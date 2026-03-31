# 2026-03-30 Season Capstone Arc Review

## Scope

Review `ECO-20260330-critic-70`: the first season-capstone notebook arc implemented in `ECO-20260330-main-95`.

## Result

No blocking issues.

The new capstone gives the current season the chapter-ending beat it was missing:

- `Season Threads` reads like one calm recap outing, not a new errand ladder
- the station and route surfaces point cleanly into that outing and then back to station
- the season still feels notebook-first and handheld-readable instead of more dashboard-like

## What Held Up

### 1. The finale is one outing, not another progression stack

The strongest choice in this pass is restraint. `forest-season-threads` uses places and organisms the player already knows, so the capstone feels like a recap of the season's shape rather than a fresh subsystem or one more chain of chores.

### 2. The handoff uses existing guidance surfaces well

The route board, atlas, season wrap, and route marker all reinforce the same beat without fighting each other. That keeps the capstone legible on the station side while still letting Forest Trail stay the active play space.

### 3. The close lands as a return, not a cliff

Switching from the capstone outing into a simple `RETURN TO STATION` note is the right tone. It gives the season a stopping point without opening a larger closeout shell, which matches the packet guardrails well.

## Watch Item

`main-96` should preserve this quiet hierarchy. The next archive-and-handoff layer needs to sit below the live season board and below the real `ROOT HOLLOW` card, so the station still reads like a notebook page with memory, not a chapter dashboard.

## Verification

- Focused tests: `npm test -- --run src/test/field-requests.test.ts src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts`
- Prior implementation verification also covered full `npm test`, `npm run build`, `npm run validate:agents`, the shared web-game client, and seeded browser checks for both `season-capstone` and `season-close`

## Queue Guidance

- Close `ECO-20260330-critic-70`.
- Promote `ECO-20260330-scout-63` to `READY`.
- Keep `ECO-20260330-main-96` blocked until the scout handoff lands.
