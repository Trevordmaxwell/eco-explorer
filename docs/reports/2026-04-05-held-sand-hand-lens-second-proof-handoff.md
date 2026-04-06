# Held Sand Hand-Lens Second-Proof Handoff

Scout handoff for `ECO-20260405-scout-290`.

## Scope Reviewed

- [docs/reports/2026-04-05-living-world-route-differentiation-phase.md](/Users/trevormaxwell/Desktop/game/docs/reports/2026-04-05-living-world-route-differentiation-phase.md)
- [docs/reports/2026-04-05-living-world-route-differentiation-handoff.md](/Users/trevormaxwell/Desktop/game/docs/reports/2026-04-05-living-world-route-differentiation-handoff.md)
- [docs/reports/2026-04-05-thaw-window-hand-lens-follow-on-review.md](/Users/trevormaxwell/Desktop/game/docs/reports/2026-04-05-thaw-window-hand-lens-follow-on-review.md)
- [docs/reports/2026-04-03-held-sand-replay-consequence-handoff.md](/Users/trevormaxwell/Desktop/game/docs/reports/2026-04-03-held-sand-replay-consequence-handoff.md)
- [docs/reports/2026-04-03-held-sand-note-tabs-support-handoff.md](/Users/trevormaxwell/Desktop/game/docs/reports/2026-04-03-held-sand-note-tabs-support-handoff.md)
- [field-requests.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-requests.ts)
- [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts)
- [field-season-wrap.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-wrap.ts)
- [coastal-scrub.ts](/Users/trevormaxwell/Desktop/game/src/content/biomes/coastal-scrub.ts)
- [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts)
- [field-request-controller.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-request-controller.test.ts)

## Best Target

Spend `main-290` on one Coastal Scrub reuse proof for the now-live hand-lens preference seam.

Use the already-authored `Held Sand` route state on `scrub-edge-pattern`:

- keep the route id `scrub-edge-pattern`
- keep the active replay title `Held Sand`
- keep the canonical notebook-ready and filed route identity `Scrub Pattern`
- keep the existing replay-only alternate carrier `open-pioneer -> beach-grass`

The new proof should show that the generic hand-lens rule now reuses cleanly in a second biome:

- `hand-lens` prefers the live `beach-grass` route carrier on a back-dune shelf during active `Held Sand`
- a non-`hand-lens` support still stays on the normal nearer inspectable in that same setup

## Why This Is The Right Next Move

- It proves the direction is reusable, not a one-route Tundra exception.
- The necessary route data is already live. `Held Sand` already has an active process-backed alternate carrier on the current next slot, and `note-tabs` already holds the stable notebook route underneath it.
- The live coastal shelf is already there. A quick local runtime probe found a late `coastal-scrub` revisit state in `back-dune` where `beach-grass` is in range while nearer non-fit entries such as `beach-strawberry`, `beach-pea`, or `sand-verbena` are also nearby.
- That means `main-290` can stay very small: prove the second route-feel win, and only touch route logic if the current generic preference does not survive the full end-to-end coastal comparison.

## Concrete Main-Agent Slice

### Primary goal

Add one focused Held Sand hand-lens live-proof slice.

### Expected implementation shape

- Start from a seeded late `coastal-scrub` revisit with:
  - `scrub-edge-pattern` active
  - active `sand-capture`
  - support toggled between `hand-lens` and a comparison non-`hand-lens` support
- Use a `back-dune` setup where:
  - `beach-grass` is in inspect range
  - one or more nearer non-fit inspectables are also in range
  - `dune-lupine` may still be present, but the proof should primarily show the live process-backed carrier beating ordinary inspection gravity
- Confirm:
  - `hand-lens` inspects `beach-grass`
  - the route logs `open-pioneer -> beach-grass`
  - the comparison support does not auto-snap to `beach-grass`

### Touch code only if needed

- If the current generic preference already passes the coastal end-to-end proof, keep runtime code unchanged and land the slice through focused regression coverage.
- If the live coastal proof exposes a real gap, fix it by tightening the same existing slot-local hand-lens seam. Do not add a new targeting system or a replay-special-case helper just for Coastal Scrub.

## Recommended File Touches

- [src/test/runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts)
- [src/test/field-request-controller.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-request-controller.test.ts)
- [src/engine/game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts) only if the live coastal comparison reveals a real gap
- [src/engine/field-request-controller.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-request-controller.ts) only if the live coastal comparison reveals a real gap
- [src/engine/field-requests.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-requests.ts) only if the live coastal comparison reveals a real gap

## What Should Stay Unchanged

- no new route id, replay family, or alternate carrier list
- no new support slot, station shell, route HUD, or planner chrome
- no new note-tabs or place-tab copy pass
- no wider Coastal Scrub geometry or content-density edits

## Why The Alternatives Are Weaker

### Do not spend this step on more strip wording

The packet just succeeded by making the first proof felt in actual clue targeting. Another wrap-only or prompt-only distinction would be weaker than proving the same mechanic in a second live band.

### Do not add another replay-only carrier

`Held Sand` already has the right live alternate in `beach-grass`. Adding a second carrier now would blur whether the reusable seam itself is working.

### Do not widen into a generic replay-support framework

`Held Sand` already has its route-facing `note-tabs` distinction. The next question is whether the newly tightened hand-lens seam reuses cleanly, not whether every support now needs a replay-specific rule.

## Best Main-Agent Target For `main-290`

1. Prove `Held Sand` uses the same slot-local hand-lens preference seam that now powers `Thaw Window`.
2. Protect it with one controller-level assertion and one runtime comparison on a real back-dune shelf.
3. Keep runtime logic unchanged unless the end-to-end coastal proof reveals a real gap.

## Verification Target

- focused controller and runtime slices only
- no new build-wide or browser-wide scope unless the implementation ends up touching runtime logic
