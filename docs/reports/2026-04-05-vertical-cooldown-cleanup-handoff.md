# 2026-04-05 Vertical Cooldown Cleanup Handoff

Prepared `ECO-20260405-scout-275` in lane 3 against packet `114`, the lane brief, the scout role guide, the current beach and treeline benchmark geometry, the focused traversal tests, and the latest live browser artifacts in `output/main-268-browser/`, `output/main-267-browser/`, `output/lane-3-scout-104-browser/`, and `output/main-159-browser/`.

## Current Read

The cooldown phase should not spend its budget on another new stop.

The current benchmark spaces already have the right chapter structure:

- beach now has a start-side shoulder, crest, middle lee pocket, and tidepool approach
- treeline now has a last-tree shelter, then a folded `lee-pocket` climb, then a rejoin into `lichen-fell`

The remaining lane-3 value is not another place-memory beat. It is protecting the smallest recovery seam in the newest benchmark family.

## Best Cleanup Target

Use `main-275` on the treeline right-hand return seam, not on beach.

### Exact space

- biome: `Treeline Pass`
- family: `lee-pocket` return into `lichen-fell`
- authored platforms:
  - `lee-pocket-crest-brow`
  - `lee-pocket-fell-return`
  - `lee-pocket-lee-rest`
- target band:
  - `x 506-558`
  - `y 80-104`

### Why this is the right cooldown seam

- it is already a solved destination family, so a small geometry softening protects feel without broadening scope
- the beach opener is already at its authored-density ceiling, and the last-tree shelter band is also near its own local ceiling
- the return from the brow still depends on a very tight first catch point before the player spills into open fell

The current route is fair in ideal proofs, but it is still carrying the calm hand-back on a small stone:

- `lee-pocket-fell-return` is only the first narrow landing under the brow
- `lee-pocket-lee-rest` exists and helps, but it sits after that first catch rather than softening the hand-back itself
- the live browser captures still read more like `crest -> quick drop -> open fell` than a slightly more forgiving sheltered return

That makes this the best small recoverability pass for the cooldown wave.

## Why Not Beach

Do not spend `main-275` on `Sunny Beach`.

The latest beach review already flagged the opener band at `x 120-190` as near its comfortable density ceiling. The beach crest is also already protected from the map-return seam. Another beach pass now would either:

- add more authored shape to a solved opener
- or reopen the crest and middle shelter families that already have the right proof coverage

Treeline still has a cleaner tiny geometry-only easing move.

## Recommendation For `main-275`

Keep the existing treeline route and platform ids exactly as one family:

1. `lee-pocket-rime-rest`
2. `lee-pocket-rime-cap`
3. `lee-pocket-crest-brow`
4. `lee-pocket-fell-return`
5. `lee-pocket-lee-rest`
6. open `lichen-fell`

Do one small recovery softening only:

- prefer widening `lee-pocket-fell-return` slightly and biasing that extra width toward the incoming brow side
- if needed, make a tiny companion nudge to `lee-pocket-lee-rest` so the hand-back reads as one calmer descent band
- do not add a new platform id
- do not add a new carrier, cue, landmark, or branch
- do not move the higher perch or the last-tree shelter family

## Exact Problem To Protect

Protect against this regression risk:

- a slightly late or shallow drop from `lee-pocket-crest-brow` should still settle into the sheltered return family before open fell

Right now the proofs mostly validate the ideal hand-back. The cooldown cleanup should make the return less exacting without changing the route's shape or adding more geography.

## Suggested File Targets

- `src/content/biomes/treeline.ts`
- `src/test/treeline-biome.test.ts`
- focused `src/test/runtime-smoke.test.ts`

## Suggested Verification

- update the treeline biome test so the return family still uses only the current platform ids while proving the softened landing geometry
- add one focused runtime proof that reaches the crest brow, then confirms a slightly later descent can still catch `lee-pocket-fell-return` or `lee-pocket-lee-rest` before rejoining `lichen-fell`
- keep one real-start seeded browser proof from the normal treeline start instead of only the temporary start override, because earlier treeline reviews already flagged that as the safer height-work guardrail

Suggested command target:

- `npm test -- --run src/test/treeline-biome.test.ts src/test/runtime-smoke.test.ts -t "turns the treeline lee pocket into a compact crest-and-notch loop|turns the treeline threshold into a last-tree shelter followed by the existing lee pocket"`
- `npm run build`

## Queue Outcome

- Close `ECO-20260405-scout-275` as done.
- Promote `ECO-20260405-main-275` to `READY`.
- Retarget `main-275` to this handoff instead of the broader phase note.
