# 2026-04-03 Beach Content Parity Handoff

Prepared for `ECO-20260402-scout-145` in lane 2.

## Scope Reviewed

- `docs/reports/2026-04-03-lane-2-front-half-and-parity-follow-ons.md`
- `.agents/packets/071-beach-content-parity-phase.json`
- `src/content/biomes/beach.ts`
- `src/content/biomes/coastal-scrub.ts`
- `src/content/shared-entries.ts`
- `src/assets/coastal-flora.ts`
- `src/assets/coastal-collectibles.ts`
- `src/assets/ambient.ts`
- `src/test/beach-biome.test.ts`
- `src/test/content-quality.test.ts`
- `docs/science-source-ledger.md`

## Read

- Beach is still the thinnest live biome for authored content density. It already teaches washed-in shell clues well, but the upper beach still feels sparse compared with the stronger front-half inland and scrub spaces.
- The best parity gain is not more shell clutter. The real gap is the `dune-edge -> dry-sand -> lee-pocket` teaching band, where beach currently has only the first grass-and-runner layer and very little authored shelter-side payoff.
- The safest next pass is to reuse two already-ledgered Pacific dune carriers that already have art in the coastal-scrub lane, then pair them with one small wrack-line decomposer that explains why the shore feels alive even before the player notices birds.

## Recommendation

Treat `main-183` as one compact three-entry beach parity pack:

1. promote `dune-lupine` into the beach-facing branch
2. promote `beach-strawberry` into shared beach-and-scrub front-half content
3. add `beach-hopper` as the first wrack-line decomposer animal

That gives beach one better upper-beach flower, one better sheltered runner, and one better tide-line food-web carrier without reopening progression, notes, or UI.

## Why This Is The Right Pack

- `dune-lupine` and `beach-strawberry` already fit the live Pacific branch and already have sprite support in the coastal asset lane, so this pass can deepen beach without inventing a whole new art family.
- Both plants belong in `src/content/shared-entries.ts` if beach adopts them, which keeps the multi-biome journal model clean and avoids duplicate beach-vs-scrub entries.
- `beach-hopper` is the right new animal because it teaches the wrack line directly. Official NPS sandy-beach monitoring already tracks beachhoppers as a standard fauna group, and GGNRA beach guidance explicitly ties wrack to amphipods and shorebird food webs. This is a safer first wrack animal than choosing a single fly species with shakier naming.
- The pack stays lane-2: content, shared entries, one small ambient sprite, science-ledger support, and focused content tests.

## Exact Target For `main-183`

### Shared-entry promotions

Move these from scrub-only content into `src/content/shared-entries.ts`:

- `dune-lupine`
- `beach-strawberry`

Use them in both:

- `src/content/biomes/beach.ts`
- `src/content/biomes/coastal-scrub.ts`

### New beach-only entry

Add:

- `beach-hopper`

Recommended shape:

- common name: `Beach Hopper`
- scientific name: `Megalorchestia spp.`
- category: `animal`
- collectible: `false`
- teaching angle: tiny wrack-line scavenger and shorebird food source

The genus-level scientific name is intentional here. It matches the monitoring language more safely than pretending the live beach is teaching one exact local species.

## Suggested Placement Plan

The first seeded state should always show the new front-half read without crowding the beach.

### `dune-lupine`

Use as a dry upper-beach facilitator:

- one authored clump at the late `dry-sand` shoulder, just before the `lee-pocket`
- one stable spawn or authored clump near the `lee-pocket` entry where driftwood begins to create shelter

Teaching role:

- shows where the beach is starting to support richer bloom than the open foredune alone

### `beach-strawberry`

Use as the sheltered low runner:

- one authored patch beneath or just beside the `lee-pocket-drift-span`
- optional second patch at the calmer `dry-sand` side of the shelter transition

Teaching role:

- makes the lee pocket feel like a place where low runners can spread once the sand is a little steadier

### `beach-hopper`

Use as wrack-side life, not a roaming star:

- add to `lee-pocket-life`
- add to `wrack-line`
- favor positions beside `bull-kelp-wrack` and driftwood rather than the open dry crest

Teaching role:

- turns wrack from “washed-up thing” into “food and shelter line”

## Sketchbook Coverage To Fold Into The Same Pass

`main-183` should also raise the beach sketchbook floor while it is already touching the entries.

Best existing-entry additions:

- `pacific-sand-crab`
- `western-snowy-plover`

Optional third if budget allows:

- `native-littleneck-shell`

Keep the new sketchbook lines notebook-like and place-remembering, not fact restatements.

## What This Pass Should Avoid

- no extra shell collectibles
- no scrub-heavy shrubs such as `coyote-brush`, `pacific-wax-myrtle`, or `shore-pine`
- no process-moment work yet; that belongs to packet `074`
- no ecosystem-note deepening yet; that belongs to `ECO-20260402-scout-146` and `main-184`
- no route, station, field-request, or `game.ts` changes

## Suggested File Targets

- `src/content/shared-entries.ts`
- `src/content/biomes/beach.ts`
- `src/content/biomes/coastal-scrub.ts`
- `src/assets/ambient.ts`
- `src/test/beach-biome.test.ts`
- `src/test/content-quality.test.ts`
- `docs/science-source-ledger.md`

## Science Grounding

Already ledger-backed and safe to reuse:

- `dune-lupine`: [USFWS Crook Point story](https://www.fws.gov/story/2021-09/crook-point-invasives), [NPS Point Reyes dunes](https://home.nps.gov/pore/learn/nature/sanddunes.htm)
- `beach-strawberry`: [Redwood plants](https://www.nps.gov/redw/learn/nature/plants.htm), [USDA plant guide](https://plants.usda.gov/DocumentLibrary/plantguide/pdf/cs_frchc.pdf)

New supporting source for the wrack animal:

- `beach-hopper`: [Channel Islands sandy beaches monitoring](https://www.nps.gov/im/chis/monitor/sandy-beaches-and-lagoons.htm), [Golden Gate beaches](https://www.nps.gov/goga/learn/nature/beaches.htm)

## Suggested Verification

- `npm test -- --run src/test/beach-biome.test.ts src/test/content-quality.test.ts`
- `npm run build`
- one seeded browser capture that shows the `dry-sand -> lee-pocket` new plant read
- one seeded browser capture that shows wrack-side `beach-hopper` presence without crowding the tide line

## Queue Outcome

- Close `ECO-20260402-scout-145`.
- Promote `ECO-20260402-main-183` to `READY`.
- Keep `ECO-20260402-critic-156` blocked until the implementation lands.
