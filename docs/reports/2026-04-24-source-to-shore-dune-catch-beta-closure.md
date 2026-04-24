# Source to Shore Dune Catch Beta Closure

Date: 2026-04-24

## Summary

- Added `Dune Catch` as the third Source to Shore beta beat after filed `Forest Release`.
- Routed the active beat to Coastal Scrub, with ready-to-file and filed states covered in save snapshots, station boards, atlas copy, map labels, journal surfaces, and Route v2 request flow.
- Staged a matching Coastal Scrub traversal pass so the route reads physically as back-dune sand catch, swale shrub hold, and cooler forest-edge cover.

## Coastal Scrub Traversal

- Added three small authored route affordances: `dune-catch-grass-shelf`, `dune-catch-swale-hold-log`, and `dune-catch-cool-edge-shelf`.
- Added eight route-specific authored placements: beach grass, dune lupine, Pacific wax myrtle, deer mouse, coyote brush, song sparrow, salmonberry, and sword fern.
- Pulled the cool-edge payoff inward from the forest doorway during browser proof so inspecting salmonberry or sword fern wins before corridor travel comes into range.

## Science And Feel

- Back-dune grass and lupine stage the factual sand-capture idea already present in Coastal Scrub.
- Pacific wax myrtle and coyote brush mark the shift toward woody coastal scrub that holds calmer shelter.
- Deer mouse and song sparrow add small-life staging around the shrub cover without turning the route into an animal checklist.
- Salmonberry and sword fern keep the final beat tied to cooler, more shaded forest-edge conditions.

## Verification

- `npm test -- --run src/test/field-requests.test.ts src/test/field-season-board.test.ts src/test/save-snapshots.test.ts -t "Source to Shore|Dune Catch|route-state matrix|debug save snapshots"`
- `npm test -- --run src/test/coastal-scrub-biome.test.ts src/test/runtime-smoke.test.ts -t "Dune Catch|coastal scrub biome generation"`
- `npm run build`
- Web-game client smoke: `output/dune-catch-web-client/`
- Browser proof at native `256x160`:
  - `output/dune-catch-browser-proof/dune-catch-back-dune-256x160.png`
  - `output/dune-catch-browser-proof/dune-catch-swale-hold-256x160.png`
  - `output/dune-catch-browser-proof/dune-catch-cool-edge-inspect-256x160.png`
- `npm run alpha:rc`

Alpha RC generated and verified `output/review-drops/eco-explorer-review-drop-20260424-095619.tgz`.

## Recommendation

Treat this as the Source to Shore beta closure point for now. The next large push should playtest the three-beat route as a complete arc before adding a fourth beat or opening a new campaign structure.
