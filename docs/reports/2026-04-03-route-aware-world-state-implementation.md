# 2026-04-03 Route-Aware World-State Implementation

Implementation report for `ECO-20260403-main-224`.

## Scope

- `src/engine/field-requests.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## What Landed

- Added one compact `worldStateFocus` seam to field-request definitions so an active request can temporarily reframe around authored living-world state without changing its id, completion rule, or filed identity.
- Wired `resolveActiveFieldRequest()` to honor that active world-state focus after ready-to-file checks and alongside the existing Route v2 process focus path.
- Authored the first live use on `tundra-survey-slice`: during peak phenology, the active request now becomes `Bright Survey` with `This is a good outing to finish the inland line while the short-season ground is clearest.`
- Left `tundra-survey-slice` otherwise unchanged: it still completes through the same survey trigger, keeps the same order in the inland chapter, and does not alter the filed `Short Season` or later `Scrub Pattern` flow.

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "shows the Bright Survey route replay note when re-entering tundra during peak phenology|shows the thaw-window route replay note when re-entering tundra during the active process window|shows one route replay note when re-entering the active route biome during a live replay window"`
- `npm run build`

## Follow-On

- `ECO-20260403-critic-224` can now review whether the new `Bright Survey` wording stays cohesive across the active request, enter-biome notice, board replay note, and `TODAY` wrap without reading like hidden gating.
