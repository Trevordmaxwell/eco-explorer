# First Phenology Review

Date: 2026-03-29
Queue item: `ECO-20260329-critic-27`
Status: complete

## Method

- reviewed queue item `ECO-20260329-critic-27` and packet `015`
- read the landed phenology seams in:
  - `src/engine/world-state.ts`
  - `src/engine/phenology.ts`
  - `src/engine/generation.ts`
  - `src/engine/biome-scene-render.ts`
  - `src/content/biomes/beach.ts`
  - `src/content/biomes/coastal-scrub.ts`
  - `src/content/biomes/forest.ts`
  - `src/content/biomes/treeline.ts`
  - `src/content/biomes/tundra.ts`
- reviewed the representative seeded browser captures in `output/main-37-phenology-captures`
- ran:
  - `npm test -- --run src/test/phenology.test.ts src/test/world-state.test.ts src/test/runtime-smoke.test.ts src/test/content-quality.test.ts`
  - `npm run build`
  - `npm run validate:agents`
- checked the live browser load at `http://127.0.0.1:4182/` and confirmed zero console errors

## Findings

### P2. Beach still reads like the weakest phenology branch and should get its tiny support pass before the first corridor proof

The shared seam and render hooks are working, but the authored beach profile is still thinner than the inland and alpine branches.

In `src/content/biomes/beach.ts`, `early` and `peak` both rely on one `sand-verbena` bloom accent plus gentle wash shifts, while `late` adds seed accents for `beach-grass` and `sea-rocket` plus extra wrack emphasis. That is directionally right, but in the seeded capture set the beach change still reads more like a calm tone shift than a strong growth-timing signal.

By contrast, the forest, treeline, and tundra captures all show clearer phase identity through stronger entry accents and broader palette support. The issue is not the shared seam in `src/engine/biome-scene-render.ts`; it is that the beach authored profile is still the least legible branch of the set.

This does not invalidate `main-37`, but it does justify promoting the parked `main-44` support pass before the first `beach <-> coastal-scrub` corridor proof starts relying on phenology as one of its continuity signals.

Relevant anchors:

- `src/content/biomes/beach.ts:258`
- `src/content/biomes/beach.ts:260`
- `src/content/biomes/beach.ts:268`
- `src/content/biomes/beach.ts:276`
- `src/engine/biome-scene-render.ts:467`
- `src/engine/biome-scene-render.ts:594`

## What Landed Well

- The coarse shared `early` / `peak` / `late` seam is the right scope and stays deterministic.
- The phenology authoring model is compact and science-safe.
- The render-side wash plus per-entry accent approach works well in forest, treeline, and tundra.
- The pass stays calm and mood-first instead of drifting into heavy simulation or behavior logic.
- Readability at `256x160` is solid in the representative capture set.

## Queue Outcome

- `ECO-20260329-critic-27` can move to `DONE`.
- `ECO-20260328-main-44` should be promoted to `READY`.
- `ECO-20260329-main-46` should stay parked until the tiny beach reinforcement lands, because the first corridor proof depends on a clearer beach-side phenology read than the current pass provides.
