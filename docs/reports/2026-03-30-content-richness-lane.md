# Content Richness Lane

## Summary

Lane 2 is the content-richness lane.

It exists so a second agent can work in parallel without fighting the station, progression, and expedition work in lane 1.

This lane should deepen the current world through authored content that rides on systems already in the game:

- discoveries
- ecosystem notes
- shared-species comparisons
- close-look moments
- sketchbook and journal richness
- science-source and content-quality support

## Why This Lane

- The route and station systems are already strong enough to support more content.
- The world now needs more authored richness in the places players already visit.
- The safest parallel work is mostly inside `src/content/**` and content-facing tests and docs.
- This lane can make the game feel fuller without colliding with the route and expedition lane.

## Phase Order

### 1. Coastal-front richness

Strengthen the first half of the world with more discoveries and notebook depth across:

- beach
- coastal scrub
- coast-facing forest edge

Use only existing surfaces.

### 2. Alpine richness

Deepen treeline and tundra with:

- more alpine discoveries
- stronger comparison anchors
- notebook and note richness

Keep it complementary to lane-1 expedition work.

### 3. Comparison and close-look expansion

Use existing systems to make the journal feel more rewarding:

- expand the best shared-species comparison pairs
- add a small new wave of visual-first close-look candidates

## Guardrails

- do not redesign the station
- do not change route progression
- avoid broad edits to `src/engine/game.ts` or `src/engine/overlay-render.ts`
- keep the work science-safe and kid-readable
- use existing surfaces instead of building new ones

## Success Signal

At the end of this lane, the game should feel denser, more collectible, and more educationally rich even if the player stays inside the current systems.
