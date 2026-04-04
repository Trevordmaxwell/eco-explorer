# 2026-04-04 Threshold Support Implementation

Implemented `ECO-20260404-main-257` in lane 2.

## What Landed

- Added one new treeline close-look card in `src/engine/close-look.ts` for `krummholz-spruce`, using the scout-approved `wind-bent branches` / `needled tips` callouts and a short sentence about wind keeping the spruce low and bent.
- Added one new tundra sketchbook note in `src/content/biomes/tundra.ts` for `woolly-lousewort`: `Fuzzy bloom catching one brief thaw on open tundra.`
- Extended close-look coverage in `src/test/close-look.test.ts` so the new treeline landmark stays on the allowlist and returns the expected compact payload.
- Extended sketchbook coverage in `src/test/sketchbook.test.ts` so the new tundra note stays authored and preferred over the default short fact.

## Scope Kept Tight

- Did not add another comparison card, another ecosystem-note id, or any new route-board, station, map, or shell work.
- Left the existing `talus-cushion-pocket`, `frost-heave-hummock`, `reindeer-lichen`, and `moss-campion` support surfaces untouched.
- Kept the tundra support inside the existing sketchbook strip instead of widening the notebook layout.

## Verification

- `npm test -- --run src/test/close-look.test.ts src/test/sketchbook.test.ts src/test/content-quality.test.ts`
- `npm run build`
- Web-game client smoke in `output/lane-2-main-257-client/`
- Seeded browser proof in `output/lane-2-main-257-browser/`:
  - `krummholz-close-look.png`
  - `krummholz-close-look-state.json`
  - `woolly-lousewort-sketchbook.png`
  - `woolly-lousewort-sketchbook-state.json`
  - `console-errors.json` stayed empty

## Outcome

Treeline and tundra now each get one clearer remembered threshold cue without growing the notebook into a denser second-act pass: treeline teaches the last wind-shaped tree form directly through a local close-look, and tundra gets one short-season bloom memory strip through the existing sketchbook surface.
