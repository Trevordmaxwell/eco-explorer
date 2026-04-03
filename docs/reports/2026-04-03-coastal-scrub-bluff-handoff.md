# 2026-04-03 Coastal Scrub Bluff Handoff

Prepared `ECO-20260402-scout-153` against packet `077`, the lane-3 brief, the front-half follow-on report, the live `coastal-scrub` biome in `src/content/biomes/coastal-scrub.ts`, and the current generation checks in `src/test/coastal-scrub-biome.test.ts`.

## Current Read

`Coastal Scrub` already teaches the coast-to-forest gradient clearly, but it still plays almost entirely flat.

Right now the only authored traversal shape is the lowered swale bridge:

1. `windbreak-swale-entry-log`
2. `windbreak-swale-upper-log`
3. `windbreak-swale-exit-log`

That gives the biome one nice sheltered dip, but not one optional elevated place where the player can feel the difference between the calmer lee side and the more exposed bluff edge above it.

## Best Next Pass

Use `main-191` on one short optional bluff shoulder above the left half of the current swale family.

Best question:

- where can one tiny upward detour let the player feel “more exposed up here, calmer down there” without turning `coastal-scrub` into a second forest climb?

## Recommended Change For `main-191`

Keep the current world size, terrain engine, and swale route intact.

Build one compact optional bluff family over the existing `shrub-thicket -> windbreak-swale` seam:

1. keep the current three swale logs exactly as the low route
2. add three authored bluff platforms above the left half of that route
3. make them rise in one short line, then let the player step or drop back to the existing `windbreak-swale-upper-log`

Suggested family:

1. `windbreak-bluff-lee-step`
   - around `x 240-256`
   - around `y 101-103`
   - one small first lift from the thicket side
2. `windbreak-bluff-mid-step`
   - around `x 270-288`
   - around `y 93-96`
   - keeps the climb readable and recoverable
3. `windbreak-bluff-crest`
   - around `x 302-330`
   - around `y 84-88`
   - the tiny exposed viewpoint before the route settles back onto the swale bridge

Why this is the strongest next move:

- it turns the existing swale into a real two-height spatial read instead of replacing it
- it teaches shelter and exposure through one compact movement contrast
- it stays fully inside the current platform runtime and `144`-pixel biome height
- it does not need a new cue language, a camera rewrite, or a new content pack

## Ecology Read To Preserve

Let the geometry do the teaching with the entries that already belong here:

- the lower swale should keep reading as the calmer shrub pocket
- the upper crest should feel a little barer and more wind-touched
- the proof should rely on the existing zone mix (`dune-lupine`, `beach-pea`, `pacific-wax-myrtle`, `coyote-brush`, `beach-strawberry`) rather than introducing new entries just to justify the route

## Guardrails For This Beat

- do not increase `worldHeight`
- do not add a new climbable unless the platform-only version truly fails readability
- do not add a vertical cue in this first bluff pass
- do not widen the biome or move corridor/map anchors
- do not turn the bluff into a required route; it should stay optional and recoverable

## Test Guidance

`main-191` should stay focused:

- extend `src/test/coastal-scrub-biome.test.ts` so the authored platform family includes the new bluff steps in height order above the current swale bridge
- add one focused `runtime-smoke` proof that enters `coastal-scrub`, reaches the bluff crest, and returns safely to the existing swale route
- confirm the proof stays inside current traversal rules: no new movement system, no dead-end trap, no camera special case

Best proof question:

- does the player now get one clear bluff-side “wind above, shelter below” moment in `Coastal Scrub` without the biome becoming fiddly?

## Browser Guidance

Success should look like:

- the bluff fits in one screen band
- the swale still reads as the calmer low route
- the crest feels like a tiny optional lookout, not a separate level

## Queue Guidance

- Close `ECO-20260402-scout-153` as done.
- Promote `ECO-20260402-main-191` to `READY`.
- Keep `ECO-20260402-critic-164` blocked until the implementation lands.
