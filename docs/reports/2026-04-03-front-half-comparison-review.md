# 2026-04-03 Front-Half Comparison Review

Reviewed `ECO-20260403-critic-174` in lane 2.

## Findings

No blocking findings.

## Why This Pass Holds

- The implementation stayed disciplined. It added only the two scout-approved beach-to-scrub entries and did not reopen the wider front-half allowlist.
- Both new comparisons are note-backed and habitat-specific. `beach-pea` now contrasts open-sand runner cover against back-dune hold, while `beach-strawberry` contrasts tucked beach lee pockets against shrub-backed swale shelter.
- The same-pane journal behavior still holds. The new comparisons reuse the live note-card pattern instead of adding a second comparison shell or duplicating fact text.
- The comparison-side effects stayed calm. Observation-prompt tests still pass, so widening the allowlist did not accidentally break prompt gating or push unrelated comparison chatter into the notebook flow.

## Residual Watch

- The allowlist is now broad enough across the front half that future additions should keep the same “stable note pair first” discipline. `dune-lupine` remains the right deferral until scrub-side note selection is made more predictable.

## Verification Reviewed

- `npm test -- --run src/test/journal-comparison.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "comparison"`
- `npm test -- --run src/test/observation-prompts.test.ts`
- `npm run build`

## Queue Outcome

- Close `ECO-20260403-critic-174`.
- Promote `ECO-20260403-scout-164` to `READY`.
