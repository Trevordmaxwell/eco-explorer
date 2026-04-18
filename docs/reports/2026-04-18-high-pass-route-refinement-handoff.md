# 2026-04-18 High Pass Route Refinement Handoff

Prepared `ECO-20260418-scout-314` for lane 4.

## Recommendation

Spend Sprint 4's lane-4 High Pass pass on one middle-band `Rimed Pass` support proof, not on more station copy or a second route.

Best target:

- keep the live route id `treeline-high-pass`
- keep the canonical notebook-ready and filed identity `High Pass`
- keep the existing replay title `Rimed Pass`
- spend the implementation on the current `rime-mark` slot only, using the existing replay alternate `reindeer-lichen`

The goal is to make the late-wind replay feel more distinct in actual play through the current support seam:

- `hand-lens` should clearly pull `E` toward `reindeer-lichen` when `rime-mark` is the live next slot during active `frost-rime`
- a comparison support such as `note-tabs` should stay on the physically nearer ordinary inspectable in the same shelf

## Why This Is The Right Next Move

- The final `talus-hold` clue already has its own live support proof. Repeating that on the last step would over-spend the same beat.
- `Rimed Pass` currently changes title, summary, and allowed carrier, but it still wants one player-felt middle-band consequence so the replay reads as more than naming.
- The existing lane-4 controller seam is already built for this shape:
  - ordinary notebook-fit retargets surface through `supportRetargetsInspect`
  - replay-only active-clue alternates surface through `supportPrefersActiveClue`
  - the inspect bubble already uses the stronger `LENS CLUE:` copy for the active-clue path only

That means the smallest good Sprint 4 spend is to prove and tighten the High Pass middle replay shelf, not to widen the route shell.

## Concrete Main Handoff

`ECO-20260418-main-314` should use one deterministic lee-pocket rime shelf in late `Treeline Pass`.

### Preferred live state

- route: `treeline-high-pass`
- route progress already filled through:
  - `stone-lift -> frost-heave-boulder`
  - `lee-watch -> hoary-marmot`
- next live slot:
  - `rime-mark`
- replay window active:
  - `worldStep = 6`
  - `biomeVisits.treeline = 2`
  - active process `frost-rime`

### Preferred shelf band

Use the existing lee-pocket crest / rime shelf rather than the later open-fell talus island:

- late `dwarf-shrub` into first `lichen-fell`
- roughly the `lee-pocket-rime-rest` through `lee-pocket-crest-brow` band
- authored comparison carriers already there:
  - `lee-pocket-rime-campion`
  - `lee-pocket-rime-talus`
  - `lee-pocket-crest-avens`

The proof should look for one deterministic shelf where:

- `reindeer-lichen` is in inspect range
- a nearer ordinary inspectable such as `moss-campion` or `talus-cushion-pocket` is also in range
- `hand-lens` retargets to `reindeer-lichen`
- `note-tabs` does not

## Expected Implementation Shape

### 1. Controller proof

Add one focused `field-request-controller` case for `treeline-high-pass` during active `Rimed Pass`:

- `supportRetargetsInspect` should be `true`
- `supportPrefersActiveClue` should be `true`
- the hint chip should stay the existing `NOTEBOOK J` with the `support-biased` variant

This should be the High Pass counterpart to the earlier `Thaw Window` active-clue test, not another ordinary retarget test.

### 2. Runtime proof

Add one deterministic runtime comparison on the lee-pocket rime shelf:

- `hand-lens` inspects `reindeer-lichen`
- the bubble shows `LENS CLUE: rime mark`
- the route logs `rime-mark -> reindeer-lichen`
- the live route title is `Rimed Pass`
- `note-tabs` in the same shelf does not auto-snap to `reindeer-lichen`

If the current generic preference already passes on the first deterministic shelf probe, keep runtime code unchanged and land the value through focused coverage.

If the shelf exposes a real gap, tighten only the existing slot-local hand-lens preference seam. Do not add a High Pass-specific targeting helper.

## File Targets

- `/Users/trevormaxwell/Desktop/game/src/test/field-request-controller.test.ts`
- `/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts`
- `/Users/trevormaxwell/Desktop/game/src/engine/field-request-controller.ts` only if the runtime proof reveals a real gap
- `/Users/trevormaxwell/Desktop/game/src/engine/field-requests.ts` only if the runtime proof reveals a real gap

## Guardrails

- no second High Pass route
- no new station page, planner row, or route-board shell
- no change to note-tabs filing, field-station board, or canonical filed sentence
- no wider treeline geometry or new authored carrier pack
- no new replay framework beyond the current `frost-rime` seam

## Why The Alternatives Are Weaker

### Do not spend this step on more route-board or season-strip wording

Sprint 3 already made the chapter truthful on those surfaces. Another copy-only pass would be quieter than making the middle-band replay actually change what the player inspects.

### Do not add another replay alternate

`reindeer-lichen` is already the right replay carrier for `rime-mark`. The open question is whether that replay carrier is now player-felt in live support play, not whether High Pass needs more allowed entries.

### Do not reopen the talus-hold shelf

The final open-fell proof is already doing real work for `High Pass`. Sprint 4 should deepen the earlier replay band so the chapter gets a second felt route moment instead of a second pass on the same final hold.

## Verification Target

- `npx vitest run src/test/field-request-controller.test.ts -t "High Pass|Rimed Pass|active-clue"`
- `npx vitest run src/test/runtime-smoke.test.ts -t "Rimed Pass|reindeer-lichen|High Pass"`
- `npm run build` only if runtime code changes
