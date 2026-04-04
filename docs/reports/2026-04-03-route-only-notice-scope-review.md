# 2026-04-03 Route-Only Notice Scope Review

Reviewed `ECO-20260403-critic-250` against packet `101`.

## Findings

No blocking issues.

## Review Notes

- `src/engine/game.ts` keeps the fix at the right seam: `showFieldRequestNotice()` now assigns `filed-route` only when the request definition actually carries `routeV2Note`, so the route-only badge no longer leaks into generic recorded completions.
- `src/test/runtime-smoke.test.ts` now protects both sides of the behavior: Shore Shelter and Open To Shelter still assert the route-backed variants, while Forest Survey now asserts `TASK RECORDED / Forest Survey / variant: 'default'`.
- The follow-up stays inside packet `101`'s guardrails. It does not widen copy, touch the badge art, or add another notice path.

## Verification

- Reviewed the `src/engine/game.ts` helper branch and the new `Forest Survey` regression in `src/test/runtime-smoke.test.ts`
- Rechecked `npx vitest run src/test/runtime-smoke.test.ts -t "turns the beach start into a notebook-ready Shore Shelter outing and files it at the station|turns the coastal front-half transition into a notebook-ready Open To Shelter outing and files it at the station|keeps Forest Survey on the default recorded notice style"`
- Rechecked `npm run build`
