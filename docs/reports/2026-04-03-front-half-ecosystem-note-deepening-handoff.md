# 2026-04-03 Front-Half Ecosystem Note Deepening Handoff

Prepared for `ECO-20260402-scout-152` in lane 2.

## Scope Reviewed

- `docs/reports/2026-04-03-lane-2-front-half-and-parity-follow-ons.md`
- `docs/reports/2026-04-03-tundra-entry-pack-review.md`
- `.agents/packets/076-front-half-ecosystem-note-deepening-phase.json`
- `src/content/biomes/beach.ts`
- `src/content/biomes/coastal-scrub.ts`
- `src/engine/ecosystem-notes.ts`
- `src/engine/field-partner.ts`
- `src/engine/field-requests.ts`
- `src/test/ecosystem-notes.test.ts`
- `src/test/content-quality.test.ts`

## Read

- The next front-half note gain should not be raw note count for its own sake. The better gain is a small zone-faithful cleanup plus two new notes anchored to entries that still have no local ecosystem-note payoff.
- `resolveEcosystemNoteForEntry()` returns the first unlocked matching note in biome order. That means adding more notes on already-overloaded anchors like `sand-verbena`, `pacific-wax-myrtle`, or `nootka-rose` can silently produce content that never actually surfaces in the journal.
- A few current front-half notes still drift away from the zone they claim to teach:
  - beach `shelter-line-start` lives in `dry-sand` but depends on `sea-rocket`, which only appears on the more exposed `dune-edge`
  - coastal-scrub `thicket-cover` lives in `shrub-thicket` but depends on `salmonberry`, which currently belongs to `forest-edge`
- Some front-half note ids already tie into live partner or field-request seams. `shore-shelter`, `shelter-builds-here`, `swale-shelter`, and `edge-moisture` should keep their existing ids so this pass stays lane-2 safe.

## Recommendation

Treat `main-190` as one exact four-move note pass:

1. add one beach tide-line note for `sanderling`
2. revise `shelter-line-start` so its zone matches the live carriers
3. add one coastal-scrub back-dune note for `beach-pea`
4. revise `thicket-cover` so it uses only shrub-thicket carriers

This gives the front half two genuinely new note payoffs while using the other two moves to fix the most obvious “note says one place but teaches another” drift.

## Exact Note Plan

### 1. Add one beach tide-line note for `sanderling`

Suggested shape:

- `id`: `surf-food-line`
- `title`: `Surf Food Line`
- `entryIds`: `['sanderling', 'pacific-sand-crab', 'bull-kelp-wrack']`
- `minimumDiscoveries`: `2`
- `zoneId`: `tide-line`
- summary direction: quick shorebirds follow the moving food line where waves uncover tiny beach animals beside wrack
- prompt direction: ask what looks uncovered just before the birds run in

Why:

- `sanderling` still has no beach ecosystem-note payoff.
- All three carriers already belong to the tide-line teaching seam, so this note will read where it unlocks.

### 2. Revise beach `shelter-line-start`

Keep the id, but make the location match the actual entry set.

Suggested shape:

- `id`: keep `shelter-line-start`
- `title`: keep `Shelter Line Start`
- `entryIds`: keep `['sea-rocket', 'sand-verbena', 'beach-grass']`
- `minimumDiscoveries`: `2`
- `zoneId`: change to `dune-edge`
- summary direction: the lowest exposed plants mark the first shelter line on open beach
- prompt direction: ask which low plants mark the first shelter line

Why:

- `sea-rocket` is a dune-edge carrier in the live biome.
- This is a clean zone-faithfulness fix without changing the note’s core teaching.

### 3. Add one coastal-scrub back-dune note for `beach-pea`

Suggested shape:

- `id`: `runner-hold-start`
- `title`: `Runner Hold`
- `entryIds`: `['beach-pea', 'beach-grass', 'dune-lupine']`
- `minimumDiscoveries`: `2`
- `zoneId`: `back-dune`
- summary direction: low runners stay on where the back dune first starts holding thicker cover
- prompt direction: ask which low runners stay with the first thicker cover

Why:

- `beach-pea` still has no coastal-scrub-local ecosystem-note payoff.
- The note cleanly deepens the beach-to-scrub transition without overlapping the later woody-shrub notes.

### 4. Revise coastal-scrub `thicket-cover`

Keep the id, but localize the evidence set.

Suggested shape:

- `id`: keep `thicket-cover`
- `title`: keep `Thicket Cover`
- `entryIds`: `['pacific-wax-myrtle', 'coyote-brush', 'nootka-rose', 'deer-mouse']`
- `zoneId`: keep `shrub-thicket`
- summary direction: woody shrubs and thorny stems turn the thicket into quick hiding cover
- prompt direction: ask which stems would hide a quick mouse

Why:

- `salmonberry` is currently a forest-edge signal, not a shrub-thicket carrier.
- This revision keeps the note visible where it claims to teach and makes the shrub-thicket page feel more internally coherent.

## Guardrails For `main-190`

- preserve note ids that already feed live seams: `shore-shelter`, `shelter-builds-here`, `swale-shelter`, `edge-moisture`
- prefer new notes that anchor on entries without a current local note payoff so journal resolution stays reachable
- do not widen field-partner, route-board, field-request, or world-state behavior in this pass
- keep all note titles, summaries, and prompts inside the current note-copy budgets
- do not add new science-ledger rows unless the wording starts making a stronger ecological claim than the current entry facts already support

## Suggested File Targets

- `src/content/biomes/beach.ts`
- `src/content/biomes/coastal-scrub.ts`
- `src/test/ecosystem-notes.test.ts`
- `src/test/content-quality.test.ts`

## Suggested Verification

- `npm test -- --run src/test/ecosystem-notes.test.ts src/test/content-quality.test.ts`
- `npm test -- --run src/test/journal.test.ts`
- add one resolver assertion proving `sanderling` now surfaces `surf-food-line`
- add one resolver assertion proving coastal-scrub `beach-pea` now surfaces `runner-hold-start`

## Queue Outcome

- Close `ECO-20260402-scout-152`.
- Promote `ECO-20260402-main-190` to `READY`.
- Keep `ECO-20260402-critic-163` blocked until the note pass lands.
