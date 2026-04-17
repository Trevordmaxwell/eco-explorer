# Coast Relationship Pass Handoff

Prepared `ECO-20260416-scout-304` in lane 2.

## Read

- The beach/coast branch is no longer short on static richness. It already has strong comparison coverage for `beach-grass`, `beach-pea`, `dune-lupine`, and `beach-strawberry`, plus the new Coastal Scrub close-look trio.
- What still feels thinner is one especially clear relationship-first teaching beat on the live late beach edge. The branch already has the right carriers for it:
  - `bull-kelp-wrack`
  - `beach-hopper`
  - `pacific-sand-crab`
  - the existing shorebird notes and prompts around the tide line
- Right now that ecology is split across multiple nearby notes and prompts, so the beach teaches the pieces but not yet one especially clear "what feeds what first" chain on the strongest late-beach seam.

## Recommendation

Treat `main-304` as one late-beach relationship pass centered on the wrack-line food chain.

Exact shape:

1. tighten one existing beach ecosystem note around the sequence `wrack -> small scavengers / sand crabs -> birds`
2. add one prompt-first late-beach seed that asks the player to notice what gets eaten before birds rush in
3. keep the whole pass inside the existing note + notebook prompt surfaces

## Why This Shape

- It teaches ecology through connection rather than more isolated facts.
- It uses the branch that still needs the clearest relationship cue most: the live late beach tide line.
- It avoids spending Sprint 2 on more comparison sprawl when the front half already has multiple comparison cards working.
- It keeps the change lane-2-sized: authored content plus tests, not shell work.

## Exact Main Direction

Use the existing tide-line teaching seam, not a new feature.

Recommended targets:

- refresh `wave-edge-survivors` in [beach.ts](/Users/trevormaxwell/Desktop/game/src/content/biomes/beach.ts) so the summary points more directly at wrack feeding the first small animals before birds read that line
- add one new beach notebook-prompt seed in [observation-prompts.ts](/Users/trevormaxwell/Desktop/game/src/engine/observation-prompts.ts) for the live wrack chain
- keep the existing `surf-food-line` note as the bird-following follow-up rather than merging everything into one dense block

Suggested prompt shape:

- biome: `beach`
- zone: `tide-line`
- weather: prefer `marine-haze` and optionally `clear`
- required entries: `bull-kelp-wrack`, `beach-hopper`, `pacific-sand-crab`
- family: `neighbors`

Suggested prompt text direction:

- `What in this wrack gets eaten before birds rush in?`

Suggested note direction:

- keep it one sentence
- teach that wrack feeds the first tiny workers and small beach animals, and birds notice that line afterward

## Explicit Non-Targets

- no new shell or journal layout
- no new close-look cards
- no new comparison allowlist entries
- no route-board, field-partner, or world-map copy
- no broad beach content pack beyond the wrack-line relationship seam

## Suggested File Targets

- `src/content/biomes/beach.ts`
- `src/engine/observation-prompts.ts`
- `src/test/ecosystem-notes.test.ts`
- `src/test/observation-prompts.test.ts`
- `src/test/runtime-smoke.test.ts`

## Suggested Verification

- `npm test -- --run src/test/ecosystem-notes.test.ts src/test/observation-prompts.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "wrack|food line|tide line prompt"`
- `npm run build`

## Queue Outcome

- Close `ECO-20260416-scout-304`.
- Promote `ECO-20260416-main-304` to `READY`.
- Retarget `ECO-20260416-main-304` and `ECO-20260416-critic-304` to this handoff.
