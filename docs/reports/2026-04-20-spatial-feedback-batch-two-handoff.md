# Spatial Feedback Batch Two Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-432`
Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
Lane: `lane-3`

## Scout Result

Implementation-ready, proof-first.

Packet `156` asks lane 3 to handle repeated missed-landmark or confusing-traversal feedback without expanding the game. The concrete batch-two feedback already resolved by lane 1 and lane 4 is around stale `Open To Shelter` map/replay expectations: active route cues are allowed, but ready-to-file route pressure should clear so station filing stays canonical.

Lane 3 should therefore not add more route behavior or another spatial fix by default. The useful lane-3 check is a fresh browser proof that the already-authored Coastal Scrub opening still has a physical place-memory anchor for `Open To Shelter`: the back-dune shelter shelf and local `beach-grass` / `sand-verbena` carriers should be visible before the player reaches the larger windbreak and forest-edge family.

## Evidence

- `docs/reports/2026-04-20-runtime-smoke-navigation-proof-review.md` clears the lane-1 runtime-smoke navigation/replay proof refresh and leaves no spatial request.
- `docs/reports/2026-04-20-open-to-shelter-route-state-review.md` clears the lane-4 route-state split for active versus ready-to-file `Open To Shelter`.
- `docs/reports/2026-04-20-front-half-tactile-identity-review.md` confirms lane 3 already added and reviewed the small Coastal Scrub `back-dune` shelter shelf with stable `beach-grass` and `sand-verbena` carriers.
- `src/test/coastal-scrub-biome.test.ts` pins the `back-dune-shelter-*` shelf, windbreak swale, shore-pine rest, and carrier placement.
- `src/test/runtime-smoke.test.ts` already walks `Open To Shelter` from `sand-verbena` through `shore-pine` to `nurse-log`, and has focused traversal coverage for the Coastal Scrub family.

Baseline checks passed during scout:

```bash
npm test -- --run src/test/coastal-scrub-biome.test.ts -t "back-dune shelter|windbreak swale|shore-pine rest|gradient anchors"
npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter|front-half-open-to-shelter|held back-dune shelf|coastal-scrub family|shore-pine rest"
```

## Recommended Main Scope

Capture a fresh ignored browser proof under `output/lane-3-main-432-spatial-feedback/`.

Required artifacts:

- `open-to-shelter-back-dune-shelf.png`
- `open-to-shelter-back-dune-shelf.json`
- `console-errors.json`

Optional, if the quick proof path can reach it without brittle input timing:

- `open-to-shelter-windbreak-swale.png`
- `open-to-shelter-windbreak-swale.json`

Pass conditions for the required frame:

- The game is in a playing `coastal-scrub` biome scene.
- `activeFieldRequest.id` is `coastal-shelter-shift`.
- The player is in the `back-dune` opening shelf area, ideally near `x=88..122`.
- Nearby inspectables include `beach-grass` and/or `sand-verbena`; `sand-verbena` is the preferred `open-bloom` route carrier.
- `nearbyTravelTarget` is `null` and `nearbyDoor.inRange` is `false`.
- No menu, journal, open bubble, close-look card, field-guide notice, or large overlay hides the shelf or plant carrier.
- Browser console/page errors are empty.

If this proof is clean, make no runtime or geometry change. Add an implementation report and promote the critic item.

If the proof fails, keep the fix tiny and lane-3-owned:

- adjust only the existing `back-dune-shelter-*` or `windbreak-*` family in `src/content/biomes/coastal-scrub.ts`;
- extend only focused `coastal-scrub-biome` or `runtime-smoke` coverage;
- do not touch route-state logic, station pages, support behavior, world-map focus, save schema, authored science facts, journal copy, or broader UI.

## Suggested Verification

If the main pass stays proof/report-only:

```bash
npm test -- --run src/test/coastal-scrub-biome.test.ts -t "back-dune shelter|windbreak swale|shore-pine rest|gradient anchors"
npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter|front-half-open-to-shelter|held back-dune shelf|coastal-scrub family|shore-pine rest"
npm run validate:agents
git diff --check
```

If geometry or runtime code changes land, also run `npm run build`.
