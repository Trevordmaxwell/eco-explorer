# 2026-04-03 Held Sand Note-Tabs Support Implementation

Implementation report for `ECO-20260403-main-249`.

## Scope

- `src/engine/field-season-board.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## What Landed

- Added one narrow replay-time `note-tabs` override in `src/engine/field-season-board.ts` for `edge-held-sand`.
- During the active `Held Sand` window, `hand-lens` still keeps the live process sentence on the strip:
  - `Trapped sand shows where the pioneer side is giving way to steadier scrub cover.`
- `note-tabs` now intentionally swaps that same strip to the stable notebook route:
  - label: `SCRUB PATTERN`
  - text: `Walk the coast-to-forest transect from pioneer scrub into lower fell.`
- Kept the change tightly scoped:
  - no new support type
  - no request-definition change
  - no notebook-ready or filed rewrite
  - no change to `route-marker` or `place-tab`

## Why This Version

- The live replay state sits on the same first `edge-pattern-line` board seam that previously let the older `INLAND LINE LOGGED` `note-tabs` close win by default.
- This pass intentionally lets the replay-specific notebook seam outrank that older chapter-close on `Held Sand`, so the support row now distinguishes:
  - live moment reading via `hand-lens`
  - stable notebook route identity via `note-tabs`

## Verification

- `npx vitest run src/test/field-season-board.test.ts -t "Held Sand|replay|note tabs"`
- `npx vitest run src/test/runtime-smoke.test.ts -t "held-sand route replay note when re-entering coastal scrub during the active process window|keeps note tabs on the stable scrub pattern line during the Held Sand replay window|Bright Survey route replay note when re-entering tundra during peak phenology|wrack-shelter route replay note when re-entering beach during the active process window"`
- `npm run build`

## Follow-On

- `ECO-20260403-critic-249` can now review whether the new `Held Sand` support split is clearer by feel without reopening a broader replay-support system.
