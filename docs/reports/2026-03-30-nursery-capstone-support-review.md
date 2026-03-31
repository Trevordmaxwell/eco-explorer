# 2026-03-30 Nursery Capstone Support Review

## Scope

Review `ECO-20260330-critic-72`: the small nursery-backed capstone support pass implemented in `ECO-20260330-main-97`.

## Result

No blocking issues.

The pass does the right small thing:

- it keeps nursery support alive through `ROOT HOLLOW` readiness and season close
- it stays inside the existing nursery clue seam
- it does not crowd the archived routes page or reopen expedition-panel growth

## What Held Up

### 1. The support stays secondary

This is the main success. The implementation does not add a new reward row, a second expedition affordance, or extra station chrome. The clue only appears where nursery support already belongs, so the routes page and expedition page keep their current calm weight.

### 2. `salmonberry` is the right carrier for this phase

The chosen clue family still belongs to the current season:

- it points back to the cooler forest return
- it connects naturally to `forest-cool-edge`, `ROOT HOLLOW`, and `Season Threads`
- it avoids stepping on the more outward-facing next-season work that `main-98` still needs to deliver

### 3. The support window lasts just long enough

The clue now survives the moment when the route board goes quiet, which was the real gap. It helps the nursery feel like part of the chapter instead of a side system that only mattered during the earlier route beats.

## Watch Item

`main-98` should keep the next-season setup distinct from this clue. The new card should be the clear outward-facing invitation, while the nursery support remains a quiet recap seam. Do not turn `mountain-avens` or other nursery rewards into a second parallel planner.

## Verification

- Focused tests: `npm test -- --run src/test/nursery.test.ts src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts`
- Full test suite: `npm test`
- Build: `npm run build`
- Queue validation: `npm run validate:agents`

## Queue Guidance

- Close `ECO-20260330-critic-72`.
- Promote `ECO-20260330-main-98` to `READY`.
