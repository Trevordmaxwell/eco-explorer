# Lane 3 First-Session Visual Cue Handoff

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-scout-336`
- Unblocks: `ECO-20260420-main-336`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Lane: `lane-3`

## Scout Finding

The current first beach objective does not need another geometry or landmark spend before packet `138`.

Existing proof already shows a physical first-objective cue:

- `output/main-268-browser/beach-opening-shoulder.png` shows the player in the beach opener with the dune shoulder, beach grass, and route notice visible without the map-return post stealing the frame.
- `output/main-268-browser/state.json` records `zoneId: dune-edge`, `player.x: 95`, `camera.x: 5`, active `beach-shore-shelter`, and nearby `beach-grass` at `x: 115` plus authored `dune-shoulder-grass` at `x: 132`.
- `nearbyTravelTarget` is `null` in that state, so the first physical cue is not competing with a map-return or corridor prompt.
- `src/test/beach-biome.test.ts` already locks the authored shoulder, crest, lee-pocket, and tidepool sequence plus the shoulder beach-grass / beach-pea / sand-verbena carriers.
- `src/test/runtime-smoke.test.ts` already asserts the `Shore Shelter` runtime path can start by inspecting nearby `beach-grass`, then proceed to `lee-pocket` driftwood and tide-line wrack.

The weaker first-session surfaces are copy and focus defaults, which lane 1 and lane 2 already own in packet `132`.

## Recommended Main Slice

Do not change beach geometry by default.

For `ECO-20260420-main-336`, make a proof-focused lane-3 pass:

- Update `docs/alpha-screenshot-proof-manifest.md` with a compact `First-Session Objective Cue` note tied to `beach-opening-shoulder`.
- Name the fresh proof target `output/alpha-screenshot-proof/first-session-beach-objective.png`.
- Name the paired state target `output/alpha-screenshot-proof/first-session-beach-objective.json`.
- Name the browser-error target `output/alpha-screenshot-proof/first-session-beach-objective-errors.json`.
- State the pass condition: beach grass or the authored dune-shoulder grass is visible/nearby, `beach-shore-shelter` is active, no large overlay covers the cue, and no nearby travel target competes with the first objective.
- Add an implementation report explaining that no geometry was changed because the proof and current tests show the physical cue is present.

Only if a fresh capture contradicts this scout finding should main touch `src/content/biomes/beach.ts`, and even then the change should be limited to one tiny authored visual reinforcement near the existing `dune-shoulder-grass` / `dune-shoulder-entry-lip` family. Do not add a new platform branch, new route object, new station/menu behavior, or another tutorial cue.

## Suggested Verification

If the main step stays docs-only:

- `npm run validate:agents`
- `git diff --check`

If the main step changes runtime or biome test files:

- `npm test -- --run src/test/beach-biome.test.ts src/test/runtime-smoke.test.ts -t "opening dune shoulder|Shore Shelter|beach start"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`

## Non-Goals

- No route-state, station, menu, save schema, field-request copy, science copy, tutorial panel, or support-choice changes.
- No committed screenshot output.
- No new coastline branch, driftwood clue, route objective, or corridor/map-return behavior.

## Handoff

Promote `ECO-20260420-main-336` to `READY` with this report as the source.
