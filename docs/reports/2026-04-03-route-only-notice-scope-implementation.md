# 2026-04-03 Route-Only Notice Scope Implementation

Implemented `ECO-20260403-main-250` against packet `101`.

## What Changed

Kept the follow-up inside the same shared field-notice seam instead of reopening the badge art or adding a second recorded-notice path.

- `src/engine/game.ts` now scopes the `filed-route` notice variant to definitions that actually carry `routeV2Note`, while generic recorded completions continue to use the existing default notice style.
- `src/test/runtime-smoke.test.ts` now adds a focused `Forest Survey` regression so a non-route completion still surfaces `TASK RECORDED / Forest Survey / variant: 'default'`.

## Why This Shape

The blocker was not in the art layer. It was a scope leak in the shared helper. Narrowing that one branch keeps the new tactile route punctuation on real route-backed moments while restoring the older generic styling for survey-style notebook completions.

## Verification

- `npx vitest run src/test/runtime-smoke.test.ts -t "turns the beach start into a notebook-ready Shore Shelter outing and files it at the station|turns the coastal front-half transition into a notebook-ready Open To Shelter outing and files it at the station|keeps Forest Survey on the default recorded notice style"`
- `npm run build`
