# Lane 3 First-Session Visual Cue Implementation

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-main-336`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Lane: `lane-3`

## Change

Added a `First-Session Objective Cue` section to `docs/alpha-screenshot-proof-manifest.md`.

The new proof row ties packet `132` to the existing `beach-opening-shoulder` frame and names the fresh ignored capture set:

- `output/alpha-screenshot-proof/first-session-beach-objective.png`
- `output/alpha-screenshot-proof/first-session-beach-objective.json`
- `output/alpha-screenshot-proof/first-session-beach-objective-errors.json`

## Result

No beach geometry changed.

The current proof and tests already show the physical first-objective cue is present:

- `output/main-268-browser/state.json` has active `beach-shore-shelter`, nearby `beach-grass`, authored `dune-shoulder-grass`, and `nearbyTravelTarget: null`.
- `output/main-268-browser/beach-opening-shoulder.png` shows the opening shoulder and grass cue without a map-return prompt stealing focus.
- `src/test/beach-biome.test.ts` already locks the authored shoulder, crest, lee-pocket, and tidepool sequence.
- `src/test/runtime-smoke.test.ts` already proves the live `Shore Shelter` route can begin from nearby `beach-grass`.

## Pass Conditions

The first-session proof should pass only when:

- beach grass or authored dune-shoulder grass is visible or nearby
- `beach-shore-shelter` is active in paired state
- no large overlay covers the cue
- no nearby travel target competes with the first objective

If a fresh capture fails those conditions, the manifest points future work toward one tiny authored reinforcement near the existing shoulder family instead of a new coastline branch, route object, tutorial panel, or station/menu change.

## Verification

- `npm run validate:agents`
- `git diff --check`
