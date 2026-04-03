# 2026-04-02 Nursery Habitat Memory Review

Review for `ECO-20260402-critic-137` in lane 2.

## Findings

No blocking findings.

## What Holds Up

- The pass stayed inside the intended seam. The nursery did not gain a new card, page, reward lane, or save field; the extra warmth sits only in the mature `TEACHING BED` footer.
- The allowlist stayed disciplined. `sand-verbena-bed`, `salmonberry-bed`, and `crowberry-bed` are enough to teach three distinct remembered places without turning the nursery into another comparison surface.
- The route and utility seams still read correctly. `salmonberry` keeps its existing clue logic in tests, and `crowberry` still surfaces the compost utility note while the new habitat-memory line reads as a separate payoff.
- The handheld proof still works. The trimmed crowberry line now fits cleanly in the live nursery card, and the browser captures show no new console errors.

## Watch Item

- Future nursery-memory follow-ons should keep the new copy in this same single-line mature-bed seam unless a later review proves kids are missing the clear-bed action too often. Do not solve future growth by adding another row or widening the nursery shell.

## Verification

- `npm test -- --run src/test/nursery.test.ts`
- `npm run build`
- reviewed `output/lane-2-main-164-browser/`
  - `salmonberry-nursery.png`
  - `crowberry-nursery.png`
  - `console-errors.json`

## Outcome

- Close `ECO-20260402-critic-137` as clean.
- Promote `ECO-20260402-scout-127` to `READY`.
