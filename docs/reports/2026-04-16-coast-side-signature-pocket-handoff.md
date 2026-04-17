# 2026-04-16 Coast-Side Signature Pocket Handoff

Prepared `ECO-20260416-scout-301` against packet `124`, the lane-3 brief, the scout role guide, the current front-half traversal reports, the live `beach`, `coastal-scrub`, and `beach-coastal-corridor` geometry in `src/content/biomes/beach.ts`, `src/content/biomes/coastal-scrub.ts`, and `src/engine/corridor.ts`, plus the focused coastal traversal and corridor proofs in `src/test/coastal-scrub-biome.test.ts`, `src/test/corridor.test.ts`, and `src/test/runtime-smoke.test.ts`.

## Current Read

The front half is no longer missing memorable stops inside the live biomes themselves.

Right now the player can already remember:

1. the Beach opening lee shoulder before the crest
2. the Beach middle `lee-pocket`
3. the Coastal Scrub upper-bluff lookout
4. the Coastal Scrub middle swale pocket
5. the Coastal Scrub quieter shore-pine rest

Those were the right spends, but they also used most of the safe authored-density budget inside the live Beach and Coastal Scrub bands. The remaining front-half spatial gap is now the seam between them:

- `beach-coastal-corridor` is functional, science-safe, and directionally coherent
- it teaches exposed dune to first scrub shelter correctly
- but it still reads more like a smooth blend than one small place the player remembers by feel

That makes the corridor the best remaining coast-side continuation for Sprint 1.

## What Is Already Spent

### Not the Beach opener again

`docs/reports/2026-04-04-beach-opening-lee-space-review.md` already logged the watch item: the `x 120-190` opener band is near its comfortable authored-density ceiling. Another shoulder or carrier cluster there would mostly crowd the onboarding lane.

### Not the Coastal Scrub bluff/swale again

`docs/reports/2026-04-04-coastal-scrub-signature-pocket-review.md` already logged the `x 320-360` bluff/swale band as near ceiling. Reopening it would mostly stack more ledges into the biome's strongest solved family.

### Not the shore-pine rest again

`docs/reports/2026-04-03-coastal-shore-pine-rest-review.md` already called out the right-half `shore-pine-stand` as a finished quiet release seam. Another strong beat there would blur the current release instead of deepening front-half memory.

## Best Next Pass

Use `main-301` on one compact scrub-owned lee shelf inside `beach-coastal-corridor`.

Best question:

- where can the first dune-to-scrub seam stop feeling like only a threshold and become one tiny held place before the player exits into the full Coastal Scrub interior?

Why this is the strongest remaining move:

- it adds front-half memorability without reopening the already-dense live biome bands
- it reuses the current corridor, platform, and recovery language instead of inventing a new traversal family
- it makes the hybrid world feel more authored right where the coast first turns from open dune into held scrub

## Recommended Change For `main-301`

Stay inside:

- `src/engine/corridor.ts`
- `src/test/corridor.test.ts`
- focused `src/test/runtime-smoke.test.ts`

Keep the current corridor content matrix intact:

- `beach-grass`
- `sand-verbena`
- `sea-rocket`
- `dune-lupine`
- `pacific-wax-myrtle`
- `coyote-brush`

Do not widen the corridor into fuller Coastal Scrub or Beach rosters.

### Preferred target band

- corridor: `beach-coastal-corridor`
- owner side: scrub-owned half only
- zone read: `back-dune`
- roughly `x 156-210`
- roughly `y 94-102`

### Suggested authored shape

Prefer one tiny lee-held shelf pair on the scrub-owned half, not a second route:

1. `back-dune-hold-lip`
   - around `x 160-176`
   - around `y 99-101`
   - width around `14-18px`
   - job: make the transition into the held shelf feel authored instead of abrupt
2. `back-dune-hold-rest`
   - around `x 184-208`
   - around `y 94-98`
   - width around `22-28px`
   - job: give the corridor one first sheltered stop before the player fully exits into Coastal Scrub

If the rest alone already reads clearly, stop there and do not spend the extra lip.

Use existing low platform language only:

- no climbables
- no new cue family
- no second upper branch
- no new corridor UI

### Preferred carriers

Keep support local to the first scrub-hold moment:

- `dune-lupine`
- `beach-grass`
- optional one `pacific-wax-myrtle`

Best read:

- dune plants still visible around the threshold
- one sturdier scrub signal just after the new held shelf
- `coyote-brush` stays the far-right accent, not the main pocket anchor

## Desired Read

The front-half coast should become:

1. Beach opener
2. Beach middle shelter
3. Dune-to-scrub corridor
4. one tiny first held back-dune shelf
5. Coastal Scrub bluff / swale / pine sequence

That gives the front half one more remembered coast-side place without reopening the already-solved interior bands.

## Guardrails

- do not touch Beach opener geometry
- do not touch Coastal Scrub bluff, swale pocket, or shore-pine rest geometry
- keep the corridor ownership threshold exactly where it is
- do not change corridor visit accounting, travel labels, or map-return logic
- do not add notebook, field-partner, route-board, or station surfaces
- do not add pine, fern, tide-line, or forest-edge content to this corridor
- keep the pass recoverable from both directions with the existing movement rules

## Test Guidance

### `src/test/corridor.test.ts`

- assert the new shelf family lands on the scrub-owned side of `beach-coastal-corridor`
- assert it stays between the threshold and the destination exit band
- assert authored support stays within the existing dune-to-first-scrub carrier roster only

### `src/test/runtime-smoke.test.ts`

- enter the corridor from Beach
- reach the new held shelf before the Coastal Scrub exit
- confirm the player is on the scrub-owned `back-dune` half there
- confirm the shelf is calm and not in travel-door range
- continue onward into Coastal Scrub without trap geometry

Best proof question:

- does the first coast seam now have one tiny held-scrub stop players can remember, without turning the corridor into a second mini-level?

## Browser Guidance

Capture one seeded frame that shows:

- the new shelf centered on the scrub-owned side
- dune carriers still visible to the left
- first sturdier scrub signal to the right
- no door or map clutter stealing the read

Success should look like:

- one small lee-held place inside the corridor
- a stronger sense that the coast is changing shape, not only species
- no new route branch or difficulty spike

## Queue Guidance

- Close `ECO-20260416-scout-301`.
- Promote `ECO-20260416-main-301` to `READY`.
- Retarget `ECO-20260416-main-301` and `ECO-20260416-critic-301` to this handoff report.
