# 2026-04-03 Beach Note Deepening Handoff

Prepared for `ECO-20260402-scout-146` in lane 2.

## Scope Reviewed

- `docs/reports/2026-04-03-beach-content-parity-handoff.md`
- `docs/reports/2026-04-03-beach-content-parity-implementation.md`
- `docs/reports/2026-04-03-beach-content-parity-review.md`
- `.agents/packets/071-beach-content-parity-phase.json`
- `src/content/biomes/beach.ts`
- `src/test/ecosystem-notes.test.ts`
- `src/test/content-quality.test.ts`
- `output/lane-2-main-183-browser-lee-pocket/shot-0.png`
- `output/lane-2-main-183-browser-lee-pocket/state-0.json`

## Read

- The beach content pack fixed the biome’s visible density problem, but the journal note layer still mostly points at the older open-dune and shell-clue relationships.
- Beach now has a real `lee-pocket` teaching seam, yet there is still no note anchored to that zone. That is the clearest remaining gap.
- The tide line now has a better food-web carrier in `beach-hopper`, but the current `wave-edge-survivors` note still teaches the older broader wave-and-wrack lesson rather than the stronger wrack-to-scavenger-to-bird read the biome can now support.
- The dry-sand notes are still useful, but one of them should now acknowledge `dune-lupine` so the new upper-beach bloom layer actually matters in the journal.

## Recommendation

Treat `main-184` as one compact three-move beach note pass:

1. revise `low-runner-band` so it uses `dune-lupine`
2. add one new `lee-pocket` note for driftwood-sheltered runners
3. replace `wave-edge-survivors` with a wrack-food-web note built around `beach-hopper`

This deepens the new content without turning beach into the busiest note page in the game.

## Exact Note Plan

### 1. Revise `low-runner-band`

Keep the slot, but refocus it on the new dry-sand transition.

Suggested shape:

- `id`: keep `low-runner-band`
- `title`: keep `Low Runner Band`
- `entryIds`: `['beach-pea', 'dune-lupine', 'sand-verbena']`
- `minimumDiscoveries`: `2`
- `zoneId`: `dry-sand`
- summary direction: low runners and pioneer blooms show sand beginning to hold more cover
- prompt direction: ask where flowers begin to hold beside the low runners

Why:

- This upgrades an existing note instead of adding another dry-sand card, and it lets `dune-lupine` actually deepen the beach teaching layer.

### 2. Add one new lee-pocket note

Best candidate:

- `id`: `lee-pocket-hold`
- `title`: `Lee Pocket Hold`
- `entryIds`: `['driftwood-log', 'dune-lupine', 'beach-strawberry']`
- `minimumDiscoveries`: `2`
- `zoneId`: `lee-pocket`
- summary direction: driftwood and calmer sand let low runners and blooms keep holding here
- prompt direction: ask which plants look tucked into calmer sand

Why:

- This is the strongest new relationship opened by `main-183`, and it gives the beach one note that teaches shelter as a place, not only as a dune-edge idea.

### 3. Replace `wave-edge-survivors`

Swap the broader tide-line note for a sharper food-web note.

Best candidate:

- `id`: keep `wave-edge-survivors` if preserving save-safe note ids matters, or rename only if the team is comfortable with a note-id change
- preferred visible title: `Wrack Workers`
- `entryIds`: `['bull-kelp-wrack', 'beach-hopper', 'western-snowy-plover']`
- `minimumDiscoveries`: `2`
- `zoneId`: `tide-line`
- summary direction: wrack feeds tiny scavengers first, and birds read that food line fast
- prompt direction: ask what looks like food before the birds arrive

Why:

- `washed-clues` already covers the “waves leave remains here” lesson. This slot should now teach the stronger wrack-food-web idea instead of repeating the same tide-line theme at a broader level.

## Guardrails For `main-184`

- do not add more than one new note card; use one revision and one replacement so the page stays calm
- keep all titles inside the live note-title budget
- keep the tone observational and place-based, not like a mini lesson plan
- do not reopen shell-focused notes unless a science error appears
- do not add scrub-heavy entries such as `coyote-brush` or `shore-pine` to beach notes

## Suggested File Targets

- `src/content/biomes/beach.ts`
- `src/test/ecosystem-notes.test.ts`
- `src/test/content-quality.test.ts`

## Suggested Verification

- `npm test -- --run src/test/ecosystem-notes.test.ts src/test/content-quality.test.ts`
- `npm test -- --run src/test/journal.test.ts`
- one seeded journal capture showing the new `lee-pocket` note
- one seeded journal capture showing the refreshed wrack note with `beach-hopper`

## Queue Outcome

- Close `ECO-20260402-scout-146`.
- Promote `ECO-20260402-main-184` to `READY`.
- Keep `ECO-20260402-critic-157` blocked until the note pass lands.
