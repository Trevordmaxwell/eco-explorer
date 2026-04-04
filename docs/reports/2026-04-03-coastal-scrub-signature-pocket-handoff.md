# 2026-04-03 Coastal Scrub Signature Pocket Handoff

Prepared `ECO-20260403-scout-222` against packet `094`, the lane-3 brief, the scout role guide, the current `coastal-scrub` implementation in `src/content/biomes/coastal-scrub.ts`, the focused coastal traversal tests, and the latest lane-3 coastal browser artifacts in `output/main-191-browser/`, `output/main-203-browser/`, and `output/main-204-browser/`.

## Current Read

`Coastal Scrub` is no longer missing small traversal beats.

Right now the player can already feel:

1. a denser left `shrub-thicket` gather
2. one optional bluff rise above the `windbreak-swale`
3. one quiet `shore-pine` rest before the forestward release

Those fixes made the biome broader and calmer, but they did not yet give it one unmistakable signature pocket.

The strongest place candidate is already in the middle:

- lane 3 geometry already sinks the player into `windbreak-swale`
- lane 2 notes and prompts already point there through `sturdier-cover`, `swale-shelter`, and `scrub-swale-shelter`
- the live space still reads more like a useful through-lane than a place the player remembers by feel

That makes the middle swale the highest-value next move. The left gather and right pine rest are working as approach and release seams already.

## Ruled-Out Candidates

### Not the repaired left map-post band

The recent gather fix and map-post spacing repair already spent the safe budget around the left `shrub-thicket` entry. Another strong beat there would risk reopening the exact travel/readability band lane 3 just stabilized.

### Not another `shore-pine-stand` beat

The clean review in `docs/reports/2026-04-03-coastal-shore-pine-rest-review.md` already left the right-half watch item: do not stack another strong authored beat into the same `shore-pine-stand` pocket.

### Not the forest-edge release

Pushing the signature move into `forest-edge` would blur this pass into travel handoff and route territory. Packet `094` wants a memorable `Coastal Scrub` place, not an earlier forest preview.

## Best Next Pass

Use `main-222` on one tucked middle-swale pocket inside the existing bluff-and-swale family.

Spend the pass on the center of `windbreak-swale`, letting the current geometry read more like:

1. gathered thicket entry
2. optional exposed bluff above
3. tucked swale pocket below
4. quieter pine rest
5. forestward release

That is the smallest move that can turn the biome from “nice sequence” into “one place I remember.”

## Recommended Change For `main-222`

Stay inside:

- `src/content/biomes/coastal-scrub.ts`
- `src/test/coastal-scrub-biome.test.ts`
- focused `runtime-smoke` coverage

Keep the current authored family intact:

- `windbreak-gather-log`
- `windbreak-gather-lift`
- `windbreak-bluff-lee-step`
- `windbreak-bluff-mid-step`
- `windbreak-bluff-crest`
- `windbreak-swale-entry-log`
- `windbreak-swale-upper-log`
- `windbreak-swale-exit-log`
- `shore-pine-rest-log`

### Preferred target band

- roughly `x 316-366`
- roughly `y 108-118`
- zone focus: middle `windbreak-swale`

### Suggested authored shape

Prefer one tucked low rest under the current upper swale log, not another branch:

1. `windbreak-pocket-rest-log`
   - around `x 332-356`
   - around `y 113-115`
   - width around `22-28px`
   - reads as the first true settled pocket inside the swale instead of another exposed perch
2. optional `windbreak-pocket-lee-step`
   - only if needed to make the approach into the pocket read clearly
   - keep it low and short, around `y 116-118`
   - use it as a settle-in lip, not as a staircase

If the single low rest already makes the middle swale feel tucked and memorable, stop there.

### Preferred carriers

Use only entries that already belong to the live swale family:

- `beach-strawberry`
- `pacific-wax-myrtle`
- `song-sparrow`
- `deer-mouse`

Best read:

- one low runner or shrub accent to make the pocket feel held
- optionally one quick animal accent so the space feels used, not decorative
- no new species, cue markers, climbables, or notebook systems

## Desired Read

The signature memory should become:

- the bluff is where the player briefly feels the wind
- the middle swale pocket is where the scrub actually feels held
- the shore-pine rest is where that held feeling quiets down further

That keeps the current family broad and cozy while giving `Coastal Scrub` one center-of-biome place players can name by feel.

## Guardrails

- do not touch the repaired left map-return post band again
- do not add another strong authored beat inside `shore-pine-stand`
- do not edit corridor runtime, corridor ownership, or world-map anchors
- do not move the forest corridor door
- do not add a climbable, vertical cue, or another bluff crest
- do not turn the new pocket into a reward perch or hidden route branch
- keep the whole beat inside the current one-camera-band readability budget

## Test Guidance

### `src/test/coastal-scrub-biome.test.ts`

- assert the new pocket piece lands inside the middle `windbreak-swale` band
- assert it stays between the bluff family and the pine-rest family
- assert it remains below the current upper swale log and above the terrain floor
- assert any authored support stays within the existing swale roster only

### `src/test/runtime-smoke.test.ts`

- enter `coastal-scrub` from the normal start
- reach the new middle swale pocket first
- confirm the player can still climb or recover through the current bluff/low-route family
- continue onward into the existing pine rest without trap geometry or travel-label interference

Best proof question:

- does the middle swale finally feel like the biome's signature sheltered place instead of just the stretch between the bluff and the pines?

### Browser Guidance

Capture one seeded browser frame that shows:

- the new swale pocket centered
- the bluff family still readable above or to the left
- the pine rest hinted to the right
- no map-post or corridor-door clutter stealing the read

## Queue Guidance

- Close `ECO-20260403-scout-222`.
- Promote `ECO-20260403-main-222` to `READY`.
- Retarget `ECO-20260403-main-222` and `ECO-20260403-critic-222` to this handoff report.
