# Front-Half Route Proof Handoff

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-scout-361`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Lane: `lane-4`

## Scout Read

Packet `138` asks lane 4 to route-proof the front-half tactile pass so support/readiness changes what the player notices during an existing route. Lane 1 already added the `front-half-open-to-shelter` debug snapshot for the first post-forest handoff, and lane 2 sharpened Coastal Scrub's back-dune `shelter-builds-here` note around `beach-grass`, `sand-verbena`, and `dune-lupine`.

The safest lane-4 target is the already-live `coastal-shelter-shift` / `Open To Shelter` route. Its first back-dune stage is `open-bloom` on `sand-verbena`, which sits in the same tactile note cluster lane 2 refreshed. The route/support machinery already supports the desired behavior: `hand-lens` can retarget inspection toward a notebook-fit route clue, while `note-tabs` can keep the existing in-field chip progress-facing without changing the inspect target.

The gap is proof clarity, not a new route system. Existing tests prove this pattern for `Shore Shelter`, `Held Sand`, and later high-country cases, but not for the first front-half `Open To Shelter` handoff that packet `138` is trying to make memorable.

## Recommended Main Chunk

Add a focused route-proof pass for `Open To Shelter`, preferably test-only unless a deterministic runtime shelf exposes a real missing behavior.

Recommended files:

- `src/test/field-request-controller.test.ts`
- `src/test/runtime-smoke.test.ts`
- `src/test/field-requests.test.ts` only if a direct route-state contrast is useful
- `docs/reports/2026-04-20-front-half-route-proof-implementation.md`

## Suggested Assertions

- Controller-level hand-lens case: with active `coastal-shelter-shift` in `back-dune`, a nearer non-fit candidate such as `beach-pea` or `beach-grass` should give way to a farther `sand-verbena` route clue.
- That hand-lens retarget should be an ordinary notebook-fit retarget, not a process-backed active-clue alternate: expect `supportRetargetsInspect: true`, `supportPrefersActiveClue: false`, `Notebook fit: open bloom`, and a support-biased `Open To Shelter` chip, not `LENS CLUE`.
- Paired non-hand-lens case: `note-tabs` should leave the nearest physical inspectable alone while the chip stays progress-facing, for example `0/3 stages`.
- Runtime smoke should reuse the existing front-half route path or the `front-half-open-to-shelter` snapshot if practical. It only needs to prove one visible play-state outcome, such as `note-tabs` showing the progress chip during `Open To Shelter`, or hand lens retargeting to `sand-verbena` on a deterministic back-dune shelf.
- If a stable runtime shelf is too noisy, keep the main implementation to controller/direct route tests and document why; do not add geometry just to force a shelf.

## Guardrails

- Do not change route definitions, filed-note text, lane-2 copy, station pages, support order, save schema, world-map focus priority, route-marker behavior, geometry, science copy, or new UI surfaces.
- Do not add a new replay, loadout, planner, or quest surface.
- Do not turn `Open To Shelter` into a process-backed route unless a separate packet explicitly asks for that; this pass should make the existing route proof visible and regression-safe.

## Baseline Verification

- `npm test -- --run src/test/field-request-controller.test.ts -t "Open To Shelter|Shore Shelter|Held Sand|non-hand-lens|retarget"`
- `npm test -- --run src/test/field-requests.test.ts -t "coastal shelter request|Open To Shelter|Held Sand"`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter|Held Sand|front-half-open-to-shelter"`

## Main Verification

- `npm test -- --run src/test/field-request-controller.test.ts`
- `npm test -- --run src/test/field-requests.test.ts -t "coastal shelter request|Open To Shelter|Held Sand"` if route-state coverage is touched
- focused `runtime-smoke` slice if runtime expectations are touched
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
