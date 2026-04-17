# 2026-04-16 Coast-Side Signature Pocket Implementation

Implemented `ECO-20260416-main-301` against packet `124`, the lane-3 brief, and the scout handoff in `docs/reports/2026-04-16-coast-side-signature-pocket-handoff.md`.

## What Landed

`src/engine/corridor.ts` now gives `beach-coastal-corridor` one compact scrub-owned lee shelf on the `back-dune` half:

1. `back-dune-hold-lip`
2. `back-dune-hold-rest`

The shelf sits just right of the ownership threshold, using the existing `drift-platform` language rather than inventing a new traversal family. I left the corridor roster intact, so the same nearby carriers now do the work:

- `beach-grass`
- `dune-lupine`
- `pacific-wax-myrtle`

That turns the first coast seam into one small held place before the player fully exits into Coastal Scrub, without reopening the already-dense Beach opener or Coastal Scrub interior bands.

## Guardrails Kept

- left Beach opener geometry untouched
- left Coastal Scrub bluff, swale pocket, and shore-pine rest untouched
- kept the corridor ownership threshold, visit accounting, and travel logic unchanged
- added no climbables, no new cue family, and no second route branch
- kept the corridor roster dune-to-first-scrub only, without pine, fern, tide-line, or forest-edge content

## Test Coverage

Updated `src/test/corridor.test.ts` to lock the new shelf family onto the scrub-owned half of `beach-coastal-corridor` and to confirm the held-shelf carrier band stays limited to the intended `beach-grass` / `dune-lupine` / `pacific-wax-myrtle` trio rather than pulling `coyote-brush` into the pocket itself.

Updated `src/test/runtime-smoke.test.ts` with one front-half proof that:

- reaches the Beach corridor door from the inland side
- enters `beach-coastal-corridor`
- crosses into the scrub-owned `back-dune` half
- lands on the new held shelf with the intended carrier band nearby
- exits cleanly onward into Coastal Scrub

## Browser Proof

The required shared client smoke is in `output/main-301-client/`, and the targeted browser proof is in `output/main-301-browser/`:

- `corridor-held-shelf.png`
- `state.json`
- `errors.json`

The targeted proof shows the player settled on the new shelf at `x: 181`, `y: 92` with `ownerBiomeId: "coastal-scrub"`, `zoneId: "back-dune"`, the intended dune-to-first-scrub carrier band in view, and no recorded console errors.

## Verification

- `npm test -- --run src/test/corridor.test.ts src/test/runtime-smoke.test.ts -t "held back-dune shelf|reaches the beach corridor door from the inland dune side instead of the tide edge|lets the coastal door enter the first corridor proof, switches ownership at the threshold, and keeps the map alive from the menu|does not treat corridor threshold pacing as repeated visits or world-state skips|counts a corridor traversal only when the player fully exits into the neighboring biome"`
- `npm run build`
- shared web-game client smoke in `output/main-301-client/`
- targeted Playwright corridor proof in `output/main-301-browser/`
