# 2026-04-03 Front-Half Field Partner Handoff

Prepared for `ECO-20260402-scout-149` in lane 2.

## Scope Reviewed

- `docs/reports/2026-04-03-lane-2-front-half-and-parity-follow-ons.md`
- `docs/reports/2026-04-03-front-half-sketchbook-note-review.md`
- `.agents/packets/073-front-half-sketchbook-and-partner-phase.json`
- `src/engine/field-partner.ts`
- `src/engine/observation-prompts.ts`
- `src/content/biomes/beach.ts`
- `src/content/biomes/coastal-scrub.ts`
- `src/test/field-partner.test.ts`
- `src/test/observation-prompts.test.ts`
- `src/test/ecosystem-notes.test.ts`
- `docs/reports/2026-03-29-field-partner-cue-bank-handoff.md`

## Read

- Beach still has the thinnest live partner bank. Its authored cues cover `dune-edge`, `dry-sand`, and `tide-line`, but nothing recognizes the newer `lee-pocket`, even though that sheltered front-half pocket now has its own zone, authored entities, and unlocked note seam.
- Coastal-scrub already has the cleanest unresolved prompt-to-partner mismatch in the front half: `observation-prompts.ts` can resolve `coastal-swale-shelter` in `windbreak-swale`, and the biome also has the matching `swale-shelter` ecosystem note, but `field-partner.ts` still has no cue for that state.
- The live partner design prefers prompt-linked cues over fallback chatter and defaults to silence. That means the next pass should spend its budget on exact authored seams, not on a broad fallback sweep or a general increase in talk frequency.
- A second beach line around `tidepool` is tempting, but it overlaps the upcoming packet `074` beach process-moment work. This packet should stay focused on the two clearest missing shelter/cover seams instead of drifting into the next beach parity step.

## Recommendation

Treat `main-187` as exactly two new prompt-linked partner cues and no fallback-bank changes:

1. `beach-lee-pocket-hold`
2. `scrub-swale-shelter`

That is the smallest useful expansion. Beach gains one quiet cue for its new tucked-sand shelter pocket, and coastal-scrub gains one matching cue for the already-authored swale prompt. The pass stays zone-led, weather-keyed, and notebook-like without turning the partner into a broader commentary system.

## Exact Cue Plan

### 1. `beach-lee-pocket-hold`

Why first:

- `lee-pocket` is the most obvious front-half gap in the current partner bank
- the live beach biome already teaches that calmer pocket through `lee-pocket-hold`
- it strengthens beach without needing a new prompt seed

Recommended wiring:

- biome: `beach`
- zone: `lee-pocket`
- weather: `clear` and `marine-haze`
- prompt id: `lee-pocket-hold`
- source seam: ecosystem-note fallback prompt from the live beach note

Suggested line direction:

- tucked sand and driftwood are holding a calmer pocket here

### 2. `scrub-swale-shelter`

Why second:

- `windbreak-swale` already has a live observation seed, note seam, and authored cover pair
- the missing partner line is the cleanest implementation gap in the scrub bank
- it adds a stronger middle-zone identity without spending a second cue on the same shrub-thicket language

Recommended wiring:

- biome: `coastal-scrub`
- zone: `windbreak-swale`
- weather: `clear` and `marine-haze`
- prompt id: `coastal-swale-shelter`
- source seam: authored seed prompt already present in `observation-prompts.ts`

Suggested line direction:

- the low swale is where runners and shrubs start turning wind into cover

## Explicit Non-Candidates For This Pass

- `tidepool` or `washed-clues`: better saved for packet `074`, where beach process parity can spend its budget on visible wave or wrack behavior instead of another shelter line
- `shore-pine-stand`: useful later, but there is no current prompt-to-partner mismatch there as strong as the swale gap
- fallback rewrites: unnecessary for this step because the real holes are authored prompt-linked seams, not no-prompt silence failures
- a third beach cue just to equalize counts: too easy to turn into chatter; beach only needs one strong missing pocket line here

## Guardrails For `main-187`

- add exactly two new cues
- keep both cues prompt-linked, not fallback-only
- do not add a new partner surface or change delivery cadence rules
- do not widen this pass into `observation-prompts.ts` unless implementation finds a real missing seam; both recommended cues already have live note or prompt support
- keep copy one sentence, notebook-tight, and safely inside the existing transient strip budget

## Suggested File Targets

- `src/engine/field-partner.ts`
- `src/test/field-partner.test.ts`
- `src/test/runtime-smoke.test.ts`

## Suggested Verification

- `npm test -- --run src/test/field-partner.test.ts src/test/runtime-smoke.test.ts`
- `npm run build`
- one seeded browser/state capture for a beach `lee-pocket` partner line
- one seeded browser/state capture for a coastal-scrub `windbreak-swale` partner line

## Queue Outcome

- Close `ECO-20260402-scout-149`.
- Promote `ECO-20260402-main-187` to `READY`.
- Keep `ECO-20260402-critic-160` blocked until the cue pair lands.
