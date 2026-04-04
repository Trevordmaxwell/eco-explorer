# 2026-04-03 Microhabitat Support Handoff

Prepared `ECO-20260403-scout-237` in lane 2.

## Recommendation

Spend `main-237` on one note-backed same-pane comparison for `reindeer-lichen` across `Treeline Pass` and `Tundra Reach`.

## Why This Is The Right Next Gap

- The new coastal shelter pocket is already well supported by local ecosystem notes (`thorny-cover`, `thicket-cover`, `swale-shelter`) plus the existing `pacific-wax-myrtle` close-look.
- The recent memory wave already gave `reindeer-lichen` a shared sketchbook strip, and the live close-look allowlist already supports it.
- `reindeer-lichen` also already has real local note context in both biomes:
  - `Treeline Pass`: `low-ground-wins` and `cold-ground-works`
  - `Tundra Reach`: `wind-cut-cushions`
- That makes `reindeer-lichen` the cleanest remaining microhabitat bridge that can deepen process and exposure teaching without inventing a new surface or widening lane-2 scope.

## Main-Agent Scope

- Add `reindeer-lichen` to the note-backed comparison allowlist in `src/engine/journal-comparison.ts`.
- Add focused comparison coverage in `src/test/journal-comparison.test.ts`.
- Add one runtime journal comparison smoke for the treeline-to-tundra pair in `src/test/runtime-smoke.test.ts`.
- Only adjust note wording in `src/content/biomes/treeline.ts` or `src/content/biomes/tundra.ts` if the existing card contrast reads too similar once tested live.

## Guardrails

- Stay inside existing notebook-facing seams.
- Do not add a new ecosystem note id, new sketchbook lines, or a new close-look card unless testing proves the comparison cannot read clearly without it.
- Prefer one shared exposed-ground contrast over a broader alpine quantity wave.
- Keep the card pair focused on exposure and micro-shelter differences, not repeated species facts.

## Suggested Comparison Read

- `Treeline Pass`: reindeer lichen belongs to the last-shrub / cold-ground note family where low growth still shares space with woody edges and lifted stone.
- `Tundra Reach`: reindeer lichen belongs to the more fully exposed bluff note family where cushion plants and lichens stay low against skimming wind.

## Defer

- `frost-heave-hummock` close-look expansion
- extra coastal-scrub shelter copy
- new local-only alpine notes

## Result

Promote `ECO-20260403-main-237` with a narrow `reindeer-lichen` comparison-first scope.
