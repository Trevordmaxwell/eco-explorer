# 2026-04-04 Wrack Opportunity Route Implementation

Implementation report for `ECO-20260404-main-260`.

## Scope

- `src/engine/field-requests.ts`
- `src/test/field-requests.test.ts`
- `src/test/runtime-smoke.test.ts`

## What Landed

- Added one compact route-local live-opportunity seam to `RouteV2ProcessFocus` in `src/engine/field-requests.ts`: a process-backed route can now widen accepted clue entry ids for a specific evidence slot while its active process window is live.
- Spent that seam only on `beach-shore-shelter`:
  - the active process stays `wrack-hold`
  - the widened slot is only `wrack-line`
  - `bull-kelp-wrack` still works always
  - `beach-hopper` now also counts during the live `Wrack Shelter` window
- Kept the rest of the route stable:
  - `dune-grass` and `lee-cover` are unchanged
  - notebook-ready and filed states still resolve through canonical `Shore Shelter`
  - clue-backed filed text still uses the actual gathered evidence, so the live window can now file through `Beach Hopper` when that is the final tide-line clue

## Test Coverage

- `src/test/field-requests.test.ts`
  - added a regression that `beach-hopper` does not fit `wrack-line` outside the live `wrack-hold` window
  - added a regression that `beach-hopper` does fit and can complete the final stage during active `wrack-hold`
  - added a regression that the route still flips back to canonical `Shore Shelter` once it is ready to file, while the filed text reflects the gathered `Beach Hopper` clue
- `src/test/runtime-smoke.test.ts`
  - added a seeded live-beach proof where `Wrack Shelter` finishes through a tide-line `beach-hopper`, then still returns to the station and files through the canonical `Shore Shelter` notice path

## Verification

- `npx vitest run src/test/field-requests.test.ts -t "beach-hopper|Wrack Shelter|Shore Shelter"`
- `npx vitest run src/test/runtime-smoke.test.ts -t "beach start into a notebook-ready Shore Shelter outing and files it at the station|Wrack Shelter finish through beach-hopper|wrack-shelter route replay note"`
- `npm run build`

## Follow-On

- `ECO-20260404-critic-260` can now review whether the new `Wrack Shelter` tide-line opportunity feels meaningfully softer in play without making the route opaque or over-specialized.
