# 2026-03-31 Microhabitat Archive Payoff Handoff

Prepared for `ECO-20260330-scout-82` in lane 2.

## Scope Reviewed

- `src/engine/sketchbook.ts`
- `src/test/sketchbook.test.ts`
- `src/content/biomes/forest.ts`
- `docs/content-authoring.md`
- `docs/reports/2026-03-30-atlas-and-sketchbook-archive-richness-handoff.md`
- `docs/reports/2026-03-31-microhabitat-content-pack-review.md`

## Current Read

- The field-atlas strip is already at its safe density and is deliberately secondary to the route board.
- The sketchbook note strip is the stronger archive seam for lane 2 because it already turns a discovered entry into one compact remembered-place line without reopening station or route shells.
- The new microhabitat pack left the best next archive hooks in `forest`, but the fresh anchors still do not carry `sketchbookNote` copy:
  - `western-hemlock-seedling`
  - `old-mans-beard`
- The under-root side already has remembered-place lines on `seep-stone`, `root-curtain`, and `woodpecker-cavity`, but the living-animal side still lacks one compact memory line for the damp-shelter read.

## Recommendation

Treat `main-118` as one sketchbook-first memory pass.

### 1. Do Not Reopen The Atlas

Leave the station atlas strip and related station copy exactly as they are.

Reason:

- lane 2 already has the standing guardrail to keep atlas and station shells unchanged
- the earlier archive-richness pass already spent the atlas budget
- the microhabitat follow-on should feel like a notebook payoff, not another station-text tweak

### 2. Add A Tiny Forest Microhabitat Sketchbook Allowlist

Best three-entry set:

- `western-hemlock-seedling`
- `old-mans-beard`
- `ensatina`

Why this trio is the strongest compact payoff:

- it completes the new old-growth lesson with one regeneration line and one hanging-canopy line
- it gives the under-root half one living-animal memory line without reopening cave density work
- it complements existing landmark notes instead of duplicating them

Recommended note direction:

- `western-hemlock-seedling`: tiny tree starting from damp old wood
- `old-mans-beard`: pale lichen trailing from the giant crown
- `ensatina`: small salamander hiding in cool wet bark shelter

Keep the lines within the existing sketchbook-note budget and lean evocative rather than explanatory.

### 3. Keep The Implementation Narrow

`main-118` should only:

- add `sketchbookNote` copy to the three entries above
- add one focused `sketchbook.test.ts` case for the new forest microhabitat notes
- rely on the existing sketchbook-note budget guard in `content-quality`

Avoid:

- new sketchbook slots
- atlas wording changes
- comparison or close-look work from packet `041`
- broader old-growth or cave content density changes

## Acceptance Focus For `main-118`

- the microhabitat archive payoff lands entirely through the existing sketchbook note strip
- the new old-growth pack becomes more memorable after filing discoveries
- the under-root side gains one small living-memory line without reopening systems or station copy

## Suggested Verification

- `npm test -- --run src/test/sketchbook.test.ts src/test/content-quality.test.ts`
- `npm run build`
- one seeded forest sketchbook capture at `256x160` showing a new microhabitat note

## Queue Guidance

- Close `ECO-20260330-scout-82`.
- Promote `ECO-20260330-main-118` to `READY`.
- Keep `ECO-20260330-critic-93` blocked until the sketchbook payoff lands.
