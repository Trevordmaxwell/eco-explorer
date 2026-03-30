# 2026-03-30 Season-Page Station Review

## Scope

Review `ECO-20260330-critic-60`: the first season-page station evolution in `ECO-20260330-main-83`.

## Result

No blocking issues.

The new station pattern solves the real problem from the three-route shell without drifting into dashboard energy:

- `SEASON | NURSERY` stays intact as the top-level split
- `ROUTES` still feels like the familiar home page for the live season
- `EXPEDITION` reads as one special chapter slot, not a fourth compressed route
- the whole surface still holds at `256x160`

## What Held Up

### 1. The growth pattern is finally structural instead of compressive

The old station shell was already at its safe density. This pass correctly changes the shape of the station instead of squeezing in one more board state. The small `ROUTES | EXPEDITION` row feels like a notebook page turn, which is exactly the right tone correction for this phase.

### 2. The routes page stayed readable

The important thing here is not that every old row survived untouched. It is that the routes page still preserves the working hierarchy:

- wrap strip first
- route board second
- atlas third
- support last

That keeps the current season legible while making room for future growth.

### 3. The expedition slot reads like a special chapter

The `ROOT HOLLOW` card is the right size and framing for the next step. It has one title, one short summary, one start note, and one simple state. That is enough to make expeditions feel like a different chapter class without adding a second planner, checklist wall, or station dashboard.

## Watch Item

This pass proves the station can host one special expedition slot. It does not prove that more expedition infrastructure should appear on the same page. `main-84` should keep the expedition as one authored chapter card and avoid pulling atlas, support rows, or multiple chapter cards onto that page.

## Verification

- Focused tests: `npm test -- --run src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts`
- Full test suite: `npm test`
- Build: `npm run build`
- `npm run validate:agents`
- Live browser pass at `http://127.0.0.1:4189/` confirmed:
  - `ROUTES` still reads cleanly with wrap, board, atlas, and support
  - `EXPEDITION` reads as one larger `ROOT HOLLOW` chapter slot
  - browser console errors stayed at `0`

## Queue Guidance

- Close `ECO-20260330-critic-60`.
- Promote `ECO-20260330-main-84` to `READY`.
