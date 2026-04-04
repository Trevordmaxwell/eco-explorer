# 2026-04-03 Held Sand Note-Tabs Support Handoff

Scout handoff for `ECO-20260403-scout-249`.

## Scope Reviewed

- `docs/reports/2026-04-03-route-consequence-and-replay-phase.md`
- `docs/reports/2026-04-03-held-sand-replay-consequence-handoff.md`
- `docs/reports/2026-04-03-held-sand-replay-consequence-implementation.md`
- `docs/reports/2026-04-03-held-sand-replay-consequence-review.md`
- `.agents/packets/100-route-consequence-and-replay-phase.json`
- `src/engine/field-season-board.ts`
- `src/engine/field-requests.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Best Target

Spend `main-249` on one `note-tabs` replay follow-on for `scrub-edge-pattern` during `Held Sand`.

The current support row is almost where it needs to be:

- `place-tab` is now distinct across every live post-unlock route beat.
- `route-marker` still changes the world-map plan without needing more shell.
- `hand-lens` works well as the live clue-facing strip during replay-active outings.

The remaining overlap is `note-tabs` on replay-active routes. In `field-season-board.ts`, `resolveSupportAwareTodayWrap()` currently gives `note-tabs` the board summary, and `applyReplayNote()` overwrites that summary with the replay sentence. That means `note-tabs` collapses onto the same live `Held Sand` wording that `hand-lens` is already using.

`Held Sand` is the cleanest place to fix that:

- the replay consequence just landed, so the overlap is fresh and easy to isolate
- the active replay identity is intentionally temporary, while notebook-ready and filed states already stay canonically `Scrub Pattern`
- `note-tabs` is the notebook-first support, so it should be the one support that keeps the stable route identity visible during this replay window

## Why This Is The Best Next Move

- It proves support consequence without adding another support type, support menu row, or new map cue.
- It stays inside the current replay and season-wrap seam instead of widening into broader station-shell work.
- It uses the exact tension that already exists in the live design: `hand-lens` should feel moment-specific, while `note-tabs` should feel like the steady notebook route underneath that moment.

## Concrete Follow-On

### `field-season-board.ts`

Add one narrow `note-tabs` replay override for the active `Held Sand` state.

Recommended shape:

- keep `hand-lens` unchanged so it still shows the live replay sentence:
  - `Trapped sand shows where the pioneer side is giving way to steadier scrub cover.`
- when all of the following are true:
  - `selectedOutingSupportId === 'note-tabs'`
  - `routeBoard.routeId === 'edge-pattern-line'`
  - `routeBoard.activeBeatId === 'scrub-edge-pattern'`
  - `routeBoard.replayNote?.id === 'edge-held-sand'`
- return one canonical notebook-facing wrap instead of the replay summary, for example:
  - label: `SCRUB PATTERN`
  - text: `Walk the coast-to-forest transect from pioneer scrub into lower fell.`

That text is intentionally the route's normal board summary, not a new filed sentence. The support should feel like the notebook holding onto the stable outing while the world-state moment temporarily changes how the route reads.

### What Should Stay Unchanged

- do not change the active replay title `Held Sand`
- do not change notebook-ready or filed `Scrub Pattern` behavior
- do not widen this into `Bright Survey`, `Wrack Shelter`, `Moist Edge`, or a generic all-replay support system
- do not add new support ids, unlock rules, or world-map chrome
- leave `route-marker` and `place-tab` exactly as they are

## Tests

Add focused regressions:

- `src/test/field-season-board.test.ts`
  - `note-tabs` on the active `Held Sand` replay state returns the canonical `SCRUB PATTERN` wrap
  - `hand-lens` on that same state still returns the live `Held Sand` sentence
- `src/test/runtime-smoke.test.ts`
  - on a seeded late Coastal Scrub replay visit, cycling to `note-tabs` changes the strip from the live `Held Sand` replay sentence to the canonical `SCRUB PATTERN` route line
  - the route title, entry notice, and active outing stay `Held Sand`, so only the support strip changes

## Why The Alternatives Are Weaker

### Do not spend this pass on `route-marker`

`route-marker` already has a real job: it pins the outing destination on the world map. Making it louder now would drift toward lane-1 travel chrome or a heavier planner seam.

### Do not reopen `place-tab`

`place-tab` only unlocks after `treeline-stone-shelter`, and every live post-unlock route beat now has a distinct place-reading prompt. The old middle-gap is closed.

### Do not solve every replay-active `note-tabs` overlap in one pass

`Held Sand` is enough to prove the pattern. If it lands cleanly, later routes can either reuse the same seam or stay unchanged if the distinction is not worth the copy budget.

## Best Main-Agent Slice For `main-249`

1. In `src/engine/field-season-board.ts`, add one route-owned `note-tabs` replay override for `Held Sand`.
2. Keep the override notebook-facing by reusing the canonical `Scrub Pattern` route line instead of adding new filed or replay copy.
3. Add focused board and runtime coverage showing that:
   - `hand-lens` stays live and process-specific
   - `note-tabs` holds the stable notebook route identity

## Expected File Touches

- `src/engine/field-season-board.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not widen into a generic replay-support framework
- do not change `field-requests.ts` unless implementation finds an unavoidable missing seam
- do not add a new field-station card, notice type, or support unlock
- keep the strip text inside the existing handheld budget

## Queue Guidance

- close `ECO-20260403-scout-249` with this report
- bump packet `100` to version `3`
- add a `main_249_focus` block for the `Held Sand` `note-tabs` override
- retarget and promote `ECO-20260403-main-249` to this report
- retarget `ECO-20260403-critic-249` to the same report while leaving it blocked behind implementation
