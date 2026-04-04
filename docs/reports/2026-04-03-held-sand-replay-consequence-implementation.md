# 2026-04-03 Held Sand Replay-Consequence Implementation

Implementation report for `ECO-20260403-main-248`.

## Scope

- `src/engine/field-requests.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## What Landed

- Added one `processFocus` seam to `scrub-edge-pattern`, so the active route now reframes as `Held Sand` during the late `sand-capture` window while keeping the same route id, evidence slots, and filing identity.
- Kept the replay copy aligned across the active request, enter-biome notice, board summary, and `TODAY` wrap by reusing the existing board-side line `Trapped sand shows where the pioneer side is giving way to steadier scrub cover.`
- Left notebook-ready and filed states canonical: even during the replay window, the route still resolves through `Scrub Pattern` once it is ready to file or filed.

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts -t "Held Sand|Scrub Pattern|Wrack Shelter|Thaw Window"`
- `npx vitest run src/test/field-season-board.test.ts -t "held-sand replay note|wrack-shelter replay note|Bright Survey replay note"`
- `npx vitest run src/test/runtime-smoke.test.ts -t "held-sand route replay note when re-entering coastal scrub during the active process window|wrack-shelter route replay note when re-entering beach during the active process window|Bright Survey route replay note when re-entering tundra during peak phenology"`
- `npm run build`

## Follow-On

- `ECO-20260403-critic-248` can now review whether `Held Sand` is strong enough to count as a route consequence while still keeping `Haze Edge` and `Pioneer Clue` intentionally lightweight board-only follow-ons.
