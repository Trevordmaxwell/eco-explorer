# Spatial Feedback Batch One Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-428`
Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
Lane: `lane-3`

## Scout Result

Implementation-ready, proof-first.

Packet `155` asks lane 3 to absorb spatial confusion feedback without feature growth. Lane 1 already fixed the clearest fresh-session feedback issue: a new save on the current beach opener no longer defaults the menu to `world-map`, so the first objective should now be carried by the visible beach space instead of by travel UI. Lane 4 already prepared the matching route-state guard for `Shore Shelter`.

The lane-3 question is therefore narrow: after the menu-focus fix, does the fresh beach opener still show a local physical cue for `Shore Shelter`, with no map-return or corridor travel prompt competing with it?

## Evidence

- `docs/reports/2026-04-20-first-session-menu-focus-feedback-review.md` confirms fresh `nextBiomeId: "beach"` menus now default to `field-guide`, while later next-habitat guidance still defaults to `world-map`.
- `docs/alpha-screenshot-proof-manifest.md` already defines `first-session-beach-objective` as a proof-first checkpoint and says geometry should only change if fresh proof fails.
- `output/lane-3-main-424-spatial-proof/first-session-beach-field.json` shows a fresh beach opener with active `beach-shore-shelter`, `guidedFieldSeason.nextBiomeId: "beach"`, `zoneId: "dune-edge"`, nearby `sand-verbena`, `nearbyDoor.inRange: false`, and `nearbyTravelTarget: null`.
- `src/test/beach-biome.test.ts` already anchors beach-grass, beach-pea, and sand-verbena around the opening shoulder.
- `src/test/runtime-smoke.test.ts` already proves the opening shoulder can be reached before the crest, with nearby first-objective carriers and no nearby travel target.

Baseline checks passed during scout:

```bash
npm test -- --run src/test/beach-biome.test.ts -t "opening dune shoulder|authored beach clues|upper beach"
npm test -- --run src/test/runtime-smoke.test.ts -t "first field-season guidance|opening dune shoulder"
```

## Recommended Main Scope

Capture a fresh ignored browser proof under `output/lane-3-main-428-spatial-feedback/`:

- `first-session-beach-objective.png`
- `first-session-beach-objective.json`
- `console-errors.json`

Pass conditions:

- The game is in a playing `beach` biome scene at `dune-edge`.
- `activeFieldRequest.id` is `beach-shore-shelter`.
- `guidedFieldSeason.nextBiomeId` is `beach`.
- A nearby or visible opener carrier exists, preferably `beach-grass`, `beach-pea`, or `sand-verbena`.
- `nearbyTravelTarget` is `null` and `nearbyDoor.inRange` is `false`.
- No menu, journal, open bubble, field-guide notice, or large overlay hides the physical cue.
- Console/page errors are empty.

If this proof is clean, make no runtime or geometry change. Add a dated implementation report and promote the critic item.

If this proof fails, keep the fix tiny and lane-3-owned:

- reinforce only the existing `dune-shoulder-grass` / `dune-shoulder-entry-lip` family in `src/content/biomes/beach.ts`;
- extend only focused beach/opening-shoulder coverage;
- do not add a new tutorial cue, route object, station behavior, menu behavior, save field, or broader beach branch.

## Non-Goals

- No edits to first-session menu focus, route-state logic, field station, world-map focus, save schema, support behavior, route definitions, authored science facts, journal copy, or broader UI.
- No committed browser output.
- No new geometry unless the fresh proof shows the current local cue no longer carries the first objective.
- No broad runtime-smoke rewrite; use existing focused slices only.

## Suggested Verification

If the main pass stays proof/report-only:

```bash
npm test -- --run src/test/beach-biome.test.ts -t "opening dune shoulder|authored beach clues|upper beach"
npm test -- --run src/test/runtime-smoke.test.ts -t "first field-season guidance|opening dune shoulder"
npm run validate:agents
git diff --check
```

If runtime or geometry changes land, also run `npm run build`.
