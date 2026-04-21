# Map Station Travel Spatial Handoff

Created: 2026-04-20
Queue item: `ECO-20260420-scout-380`
Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
Lane: `lane-3`

## Scout Finding

Packet 143's lane-3 slice should stay visual and physical, not route-state or station-facing. The prior real blockers in this family were not copy problems: the beach dune crest and Coastal Scrub gather band both briefly read as `COAST MAP` hotspots because the map-return interaction sat inside a new physical reward band.

Most current travel-anchor coverage is healthy: door clearance is already test-backed, beach and Coastal Scrub have explicit post-to-reward clearance tests, and lane 1 / lane 4 have already hardened stale route-marker state. The remaining lane-3 cue with a clear spatial overlap is Treeline Pass:

- `src/content/world-map.ts` places the Treeline Pass `mapReturnPost` at `x: 404`.
- `src/content/biomes/treeline.ts` places `lee-pocket-upper-shelf` from `x: 294` to `x: 416` and `lee-pocket-exit-stone` at `x: 406`.
- That means the `HIGH PASS MAP` return cue lives inside the same physical shelf/return band now carrying the lower shelter-to-open-fell memory of the High Pass approach.

This is exactly the blocker class packet 143 asks lane 3 to reduce: a travel affordance visually competing with the place-reading moment.

## Recommended Main Scope

Move only the Treeline Pass map-return post out of the shelter/exposure shelf and into the quieter early Treeline interior.

Suggested target:

- `src/content/world-map.ts`: change Treeline Pass `mapReturnPost` from `{ x: 404, y: 92, facing: 'right', spriteId: 'map-post' }` to `{ x: 148, y: 92, facing: 'right', spriteId: 'map-post' }`.

Why `x: 148`:

- It keeps the post at least `96px` from both corridor doors.
- It sits before the `last-tree-approach-stone` / Stone Shelter route family.
- It keeps the existing `HIGH PASS MAP` label and same sprite without adding another cue language.
- It avoids touching route state, station logic, save schema, or High Pass copy.

## Acceptance For Main

- Treeline Pass map-return post moves to a quieter early-interior location while preserving sprite, facing, label, and corridor-door clearance.
- `src/test/world-map.test.ts` adds or extends a physical-clearance guard proving the Treeline map-return anchor is before the High Pass shelter/exposure shelf and no longer inside the `lee-pocket-upper-shelf` / `lee-pocket-exit-stone` band.
- Existing beach and Coastal Scrub clearance protections remain intact.
- Add focused runtime or browser proof showing the Treeline return cue is reachable at the new post and that a High Pass route pocket still has no nearby travel target.
- Browser proof should be ignored under `output/lane-3-main-380-browser/` if runtime behavior changes.

## Preserve

- No station page, support, route-marker, active-outing, ready-to-file, filed-state, save-schema, journal, atlas, science-copy, corridor-geometry, or world-map-copy changes.
- Do not move beach, Coastal Scrub, forest, or tundra return posts unless a fresh proof shows the same blocker class.
- Do not add a tutorial, HUD marker, route objective, or new prompt language.

## Verification Suggested

- `npm test -- --run src/test/world-map.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "map-return|High Pass|destination-aware travel cue"`
- `npm run build`
- web-game client smoke plus a focused Treeline browser capture under `output/lane-3-main-380-browser/`
- `npm run validate:agents`
- `git diff --check`

## Queue Handoff

Promote `ECO-20260420-main-380` to `READY` with this report as the source. Keep `ECO-20260420-critic-380` blocked until the implementation and proof land.
