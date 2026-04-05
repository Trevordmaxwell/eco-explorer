# Work Queue

This is the shared queue for all agents working in this repo.

## How To Use

- Pull the first `READY` item assigned to your role.
- If a queue item links to a packet, read the packet before starting work.
- If you discover new work, append a new item in `Intake` or `Ready` with a unique ID.
- If you finish an item, move it to `Done` with a short completion note.
- If you cannot proceed, move it to `Blocked` and explain the blocker clearly.
- Keep section/status alignment strict:
  - `Ready` is for `READY` and `IN PROGRESS`
  - `Blocked` is for `BLOCKED` and `BLOCKED-BY-IMPLEMENTATION`
  - `Parked` is for `PARKED`
  - `Done` is for `DONE`
- Run `npm run validate:agents` after editing queue or packet files.

## Status Key

- `READY`: approved and ready to work
- `IN PROGRESS`: currently being worked
- `BLOCKED`: cannot proceed yet
- `BLOCKED-BY-IMPLEMENTATION`: waiting for implementation before critique or follow-up
- `PARKED`: useful later, not active now
- `DONE`: completed

## Lane Rules

- New active items should include a `Lane:` field.
- Lane runners should only pull items from their assigned lane.
- Before every new item, lane runners should reread `AGENTS.md`, `.agents/lane-runner.md`, `.agents/project-memory.md`, `.agents/work-queue.md`, the lane brief, the packet, and the matching role file.
- The queue item's `Owner` still decides which hat the lane runner wears for that step.
- Items without a `Lane:` field are legacy or archived unless explicitly reactivated.

## Active Lanes

- `lane-1`: systems, progression, station, replay, and expedition growth
- `lane-2`: content density, journal richness, comparisons, and atlas-facing content depth
- `lane-3`: caves, giant-tree climbing, vertical traversal, and sub-ecosystem exploration depth
- `lane-4`: gameplay-loop cohesion, Route v2 outings, tiny support choices, notebook synthesis, and soft replay windows

## Ready

## Parked

### ECO-20260327-scout-01

- Status: `PARKED`
- Owner: `scout-agent`
- Priority: `P2`
- Title: `Prepare the next viewport and safe-area recommendations`
- Source: `docs/reports/2026-03-27-initial-critique.md`
- Packet: `.agents/packets/001-foundation-pass.json`
- Depends on: `ECO-20260327-main-01`

Note:

- This recommendation pass is superseded by the newer critic-driven packet `003`.
- The scout agent already delivered more valuable near-term work through the world-travel scaffold and packet `002`.

## Blocked

### ECO-20260403-scout-242

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Prepare the coast-side destination continuation handoff`
- Source: `docs/reports/2026-04-03-destination-chain-continuation-phase.md`
- Packet: `.agents/packets/099-destination-chain-continuation-phase.json`
- Depends on: `ECO-20260403-critic-223`

Goal:

- Prepare one more memorable coast-side destination beat.

Acceptance:

- writes a concrete handoff for `ECO-20260403-main-242`
- stays cozy, recoverable, and inside current traversal seams

### ECO-20260403-main-242

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Implement the coast-side destination continuation`
- Source: `docs/reports/2026-04-03-destination-chain-continuation-phase.md`
- Packet: `.agents/packets/099-destination-chain-continuation-phase.json`
- Depends on: `ECO-20260403-scout-242`

Goal:

- Add one more front-half destination beat players remember by feel.

Acceptance:

- the coast gains another memorable place
- no travel confusion or harsher punishment appears

### ECO-20260403-critic-242

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Review the coast-side destination continuation`
- Source: `docs/reports/2026-04-03-destination-chain-continuation-phase.md`
- Packet: `.agents/packets/099-destination-chain-continuation-phase.json`
- Depends on: `ECO-20260403-main-242`

Goal:

- Review whether the new coast-side destination is memorable and readable.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260403-scout-243` if clean

### ECO-20260403-scout-243

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Prepare the high-country relief continuation handoff`
- Source: `docs/reports/2026-04-03-destination-chain-continuation-phase.md`
- Packet: `.agents/packets/099-destination-chain-continuation-phase.json`
- Depends on: `ECO-20260403-critic-242`

Goal:

- Prepare one more high-country threshold or relief continuation.

Acceptance:

- writes a concrete handoff for `ECO-20260403-main-243`
- keeps the pass readable, recoverable, and current-system only

### ECO-20260403-main-243

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Implement the high-country relief continuation`
- Source: `docs/reports/2026-04-03-destination-chain-continuation-phase.md`
- Packet: `.agents/packets/099-destination-chain-continuation-phase.json`
- Depends on: `ECO-20260403-scout-243`

Goal:

- Add another memorable high-country destination or relief beat.

Acceptance:

- exposure and threshold feel more tactile
- the pass stays cozy and recoverable

### ECO-20260403-critic-243

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Review the high-country relief continuation`
- Source: `docs/reports/2026-04-03-destination-chain-continuation-phase.md`
- Packet: `.agents/packets/099-destination-chain-continuation-phase.json`
- Depends on: `ECO-20260403-main-243`

Goal:

- Review whether the new high-country continuation is readable and memorable.

Acceptance:

- records findings or a clean review in `docs/reports/`
- leaves lane 3 ready for the next wave if clean

### ECO-20260328-main-13

- Status: `BLOCKED`
- Owner: `main-agent`
- Priority: `P3`
- Title: `Consider direct API mode for the field guide only after clipboard mode proves out`
- Source: `docs/ai-naturalist-design.md`, `docs/reports/2026-03-29-direct-api-mode-feasibility.md`
- Packet: `.agents/packets/005-ai-field-guide.json`
- Depends on: `ECO-20260328-main-12`

Note:

- Clipboard Mode A and prompt-safety follow-ups are now solid, but the repo is still a browser-only Vite client.
- Official OpenAI guidance keeps API keys off client-side code, so direct field-guide mode needs a server-side relay or equivalent secret boundary before it can be implemented safely here.

## Intake

Use this section for newly discovered work that is not yet approved or prioritized.

## Done

### ECO-20260404-scout-268

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Prepare the beach landmark or lee-space handoff`
- Source: `docs/reports/2026-04-04-beach-opening-lee-space-handoff.md`
- Packet: `.agents/packets/110-treeline-signature-and-beach-landmark-phase.json`
- Depends on: `ECO-20260404-critic-267`

Goal:

- Narrow one compact beach landmark or sheltered place that strengthens onboarding spatial memory.

Acceptance:

- writes a concrete handoff for `ECO-20260404-main-268`
- keeps the beat calm and easy to read on first run

Completion note:

- Added `docs/reports/2026-04-04-beach-opening-lee-space-handoff.md`, narrowing packet `110`'s beach half to one start-side `dune-edge -> dry-sand` lee shoulder that gives Sunny Beach a remembered opening before the current crest, lee-pocket, and tidepool sequence.
- Bumped packet `110` to version `3`, added a `main_268_focus` block with the exact target band, preserved beach platform family, and explicit no-driftwood / no-route-logic guardrails, then promoted `ECO-20260404-main-268` to `READY`.
- Verification: `npm run validate:agents`

### ECO-20260404-main-268

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Implement the beach landmark or lee-space beat`
- Source: `docs/reports/2026-04-04-beach-opening-lee-space-implementation.md`
- Packet: `.agents/packets/110-treeline-signature-and-beach-landmark-phase.json`
- Depends on: `ECO-20260404-scout-268`

Goal:

- Add one compact beach destination beat that strengthens onboarding place memory.

Acceptance:

- beach gains a stronger landmark or lee-space
- the opener remains readable and calm

Completion note:

- Added `dune-shoulder-entry-lip`, `dune-shoulder-rest`, and a matching `beach-grass` / `beach-pea` / `sand-verbena` carrier trio in `src/content/biomes/beach.ts`, giving Sunny Beach one compact start-side lee shoulder before the existing crest, lee-pocket, and tidepool sequence.
- Updated `src/test/beach-biome.test.ts` and `src/test/runtime-smoke.test.ts` to lock the new shoulder family and confirm the player can reach the calmer opener band before continuing into the current crest flow.
- Verification: `npm test -- --run src/test/beach-biome.test.ts src/test/runtime-smoke.test.ts -t "adds an opening dune shoulder, dune crest, and sheltered tidepool approach without disturbing the lee pocket|anchors authored beach clues at the opening shoulder, dune crest, and tidepool approach|lets the player reach the new opening dune shoulder before the crest|lets the player climb the new dune crest without colliding with the inland beach door|lets the player follow the new beach lee pocket and reach its shelter carriers|lets the player follow the new tidepool approach and recover back into the shoreline flow"`, `npm run build`, shared web-game client smoke in `output/main-268-client/`, seeded browser proof in `output/main-268-browser/`, and promoted `ECO-20260404-critic-268` to `READY`.

### ECO-20260404-critic-268

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Review the beach landmark or lee-space beat`
- Source: `docs/reports/2026-04-04-beach-opening-lee-space-review.md`
- Packet: `.agents/packets/110-treeline-signature-and-beach-landmark-phase.json`
- Depends on: `ECO-20260404-main-268`

Goal:

- Review whether the beach beat improves place memory without harming onboarding readability.

Acceptance:

- records findings or a clean review in `docs/reports/`
- leaves lane 3 ready for the next wave if clean

Completion note:

- Added `docs/reports/2026-04-04-beach-opening-lee-space-review.md`, finding no blocker in the new start-side shoulder beat.
- Rechecked the focused beach slice and the seeded browser proof, and logged one non-blocking watch item to keep the `x 120-190` opener band from getting denser in future lane-3 passes.
- Verification: focused beach biome/runtime slice plus review of `output/main-268-browser/beach-opening-shoulder.png`, `state.json`, and `errors.json`

### ECO-20260404-scout-267

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Prepare the treeline signature destination handoff`
- Source: `docs/reports/2026-04-04-treeline-signature-destination-handoff.md`
- Packet: `.agents/packets/110-treeline-signature-and-beach-landmark-phase.json`
- Depends on: `none`

Goal:

- Ground one treeline destination beat that becomes the biome's clearest remembered threshold place.

Acceptance:

- writes a concrete handoff for `ECO-20260404-main-267`
- keeps the new space recoverable and distinct from tundra and forest signatures

Completion notes:

- Wrote `docs/reports/2026-04-04-treeline-signature-destination-handoff.md`, narrowing the next lane-3 pass to one compact `krummholz-belt` last-tree shelter stop before the existing lee-pocket family instead of stacking more height into the already-rich rime perch.
- Bumped packet `110` to version `2`, added a concrete `main_267_focus` target band and carrier set for treeline, retargeted `ECO-20260404-main-267` and `ECO-20260404-critic-267` to the new handoff, and promoted `ECO-20260404-main-267` to `READY`.

### ECO-20260404-scout-265

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Prepare the coastal bluff pocket support handoff`
- Source: `docs/reports/2026-04-04-coastal-pocket-support-and-high-country-process-phase.md`
- Packet: `.agents/packets/109-coastal-pocket-support-and-high-country-process-phase.json`
- Depends on: `none`

Goal:

- Narrow one support pack that deepens the new Coastal Scrub bluff pocket.

Acceptance:

- writes a concrete handoff for `ECO-20260404-main-265`
- stays visual-first and handheld-safe

Completion notes:

- Added `docs/reports/2026-04-04-coastal-bluff-pocket-support-handoff.md`, narrowing the next pass to one `song-sparrow` close-look card instead of reopening denser Coastal Scrub note or comparison surfaces.
- Bumped packet `109` to version `2`, added `main_265_focus`, retargeted `ECO-20260404-main-265` and `ECO-20260404-critic-265` to the new handoff, and promoted `ECO-20260404-main-265` to `READY`.
- Verification: `npm run validate:agents`

### ECO-20260404-main-265

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Implement the coastal bluff pocket support pack`
- Source: `docs/reports/2026-04-04-coastal-bluff-pocket-support-implementation.md`
- Packet: `.agents/packets/109-coastal-pocket-support-and-high-country-process-phase.json`
- Depends on: `ECO-20260404-scout-265`

Goal:

- Deepen the new bluff pocket through one compact authored support pack.

Acceptance:

- the pocket has stronger place memory beyond geometry
- the support stays visual-first and handheld-safe

Completion notes:

- Added one new `song-sparrow` close-look card in `src/engine/close-look.ts`, keeping the bluff-pocket follow-on inside one visual zoom surface instead of reopening note or comparison density.
- Extended focused close-look coverage in `src/test/close-look.test.ts`, promoted `ECO-20260404-critic-265` to `READY`, and retargeted the review step to `docs/reports/2026-04-04-coastal-bluff-pocket-support-implementation.md`.
- Verification: `npm test -- --run src/test/close-look.test.ts src/test/content-quality.test.ts`; `npm test -- --run src/test/runtime-smoke.test.ts -t "opens a close-look card from a supported inspect bubble and closes back to play"`; `npm run build`; web-game client smoke in `output/lane-2-main-265-client/`; seeded browser proof in `output/lane-2-main-265-browser/`

### ECO-20260404-critic-265

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Review the coastal bluff pocket support pack`
- Source: `docs/reports/2026-04-04-coastal-bluff-pocket-support-review.md`
- Packet: `.agents/packets/109-coastal-pocket-support-and-high-country-process-phase.json`
- Depends on: `ECO-20260404-main-265`

Goal:

- Review whether the bluff pocket now has stronger content payoff without widening the notebook.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260404-scout-266` if clean

Completion notes:

- Added `docs/reports/2026-04-04-coastal-bluff-pocket-support-review.md`, finding no blocker in the new `song-sparrow` close-look seam.
- Rechecked the seeded browser proof, confirmed the card fits cleanly on the handheld frame, and promoted `ECO-20260404-scout-266` to `READY`.
- Verification: review of `output/lane-2-main-265-browser/song-sparrow-close-look.png`, `song-sparrow-close-look-state.json`, and `console-errors.json`

### ECO-20260404-scout-266

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Prepare the high-country process support handoff`
- Source: `docs/reports/2026-04-04-high-country-process-support-handoff.md`
- Packet: `.agents/packets/109-coastal-pocket-support-and-high-country-process-phase.json`
- Depends on: `ECO-20260404-critic-265`

Goal:

- Narrow one compact living-process support pass for the new high-country threshold rest.

Acceptance:

- writes a concrete handoff for `ECO-20260404-main-266`
- keeps the second-act pass modular and non-text-heavy

Completion notes:

- Added `docs/reports/2026-04-04-high-country-process-support-handoff.md`, narrowing the follow-on to one tundra `bigelows-sedge` close-look card tied to the new `snow-meadow` drift-rest band instead of reopening comparison, sketchbook, or geometry density.
- Bumped packet `109` to version `3`, added `main_266_focus`, retargeted `ECO-20260404-main-266` and `ECO-20260404-critic-266` to the new handoff, and promoted `ECO-20260404-main-266` to `READY`.
- Verification: `npm run validate:agents`

### ECO-20260404-main-266

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Implement the high-country process support pack`
- Source: `docs/reports/2026-04-04-high-country-process-support-implementation.md`
- Packet: `.agents/packets/109-coastal-pocket-support-and-high-country-process-phase.json`
- Depends on: `ECO-20260404-scout-266`

Goal:

- Add one compact process-backed support seam to the new high-country destination family.

Acceptance:

- the second act feels more alive without more board or station copy
- the support stays handheld-safe

Completion notes:

- Added one new `bigelows-sedge` close-look card in `src/engine/close-look.ts`, keeping the tundra drift-rest follow-on inside one visual zoom surface instead of reopening notebook note or comparison density.
- Extended focused close-look coverage in `src/test/close-look.test.ts`, promoted `ECO-20260404-critic-266` to `READY`, and retargeted the review step to `docs/reports/2026-04-04-high-country-process-support-implementation.md`.
- Verification: `npm test -- --run src/test/close-look.test.ts src/test/content-quality.test.ts`; `npm run build`; shared web-game client smoke in `output/lane-2-main-266-client/`; seeded browser proof in `output/lane-2-main-266-browser/`

### ECO-20260404-critic-266

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Review the high-country process support pack`
- Source: `docs/reports/2026-04-04-high-country-process-support-review.md`
- Packet: `.agents/packets/109-coastal-pocket-support-and-high-country-process-phase.json`
- Depends on: `ECO-20260404-main-266`

Goal:

- Review whether the new support makes the high country feel more alive without getting wordy.

Acceptance:

- records findings or a clean review in `docs/reports/`
- leaves lane 2 ready for the next wave if clean

Completion notes:

- Added `docs/reports/2026-04-04-high-country-process-support-review.md`, finding no blocker in the new `bigelows-sedge` close-look seam.
- Confirmed the card fits cleanly on the handheld frame, marked packet `109` `DONE`, and left lane 2 clear again instead of queuing a denser same-band follow-on.
- Verification: review of `src/engine/close-look.ts`; `src/test/close-look.test.ts`; `output/lane-2-main-266-browser/bigelows-sedge-close-look.png`; `bigelows-sedge-close-look-state.json`; `console-errors.json`; `npm test -- --run src/test/close-look.test.ts src/test/content-quality.test.ts`

### ECO-20260404-scout-269

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Prepare the non-route-marker helper differentiation handoff`
- Source: `docs/reports/2026-04-04-helper-differentiation-and-second-route-opportunity-phase.md`
- Packet: `.agents/packets/111-helper-differentiation-and-second-route-opportunity-phase.json`
- Depends on: `none`

Goal:

- Narrow one in-field helper differentiation pass that is not route-marker.

Acceptance:

- writes a concrete handoff for `ECO-20260404-main-269`
- clearly targets field feel rather than more shell text

Completion note:

- Added `docs/reports/2026-04-04-hand-lens-targeting-handoff.md`, narrowing the helper differentiation pass to `hand-lens` inspect targeting instead of more strip-only copy.
- Bumped packet `111` to version `2`, added a `main_269_focus` block around notebook-fit clue targeting, retargeted lane-4 `main-269` / `critic-269`, and promoted `ECO-20260404-main-269` to `READY`.
- Verification: `npm run validate:agents`

### ECO-20260404-scout-270

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Prepare the second tactile route-opportunity handoff`
- Source: `docs/reports/2026-04-04-hand-lens-targeting-review.md`
- Packet: `.agents/packets/111-helper-differentiation-and-second-route-opportunity-phase.json`
- Depends on: `ECO-20260404-critic-269`

Goal:

- Narrow one more living-world opportunity seam on a different route family.

Acceptance:

- writes a concrete handoff for `ECO-20260404-main-270`
- keeps the seam route-local and tactile

Completion note:

- Added `docs/reports/2026-04-04-held-sand-open-pioneer-handoff.md`, narrowing the second tactile opportunity pass to `scrub-edge-pattern` during active `Held Sand`.
- Bumped packet `111` to version `4`, added a `main_270_focus` block around `beach-grass` satisfying the `open-pioneer` stage during `sand-capture`, retargeted lane-4 `main-270` / `critic-270`, and promoted `ECO-20260404-main-270` to `READY`.
- Verification: `npm run validate:agents`

### ECO-20260404-main-269

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Implement the non-route-marker helper differentiation pass`
- Source: `docs/reports/2026-04-04-hand-lens-targeting-handoff.md`
- Packet: `.agents/packets/111-helper-differentiation-and-second-route-opportunity-phase.json`
- Depends on: `ECO-20260404-scout-269`

Goal:

- Make one non-route-marker helper feel materially different in the field.

Acceptance:

- the helper changes how a live outing feels
- no new support-row sprawl appears

Completion note:

- Added `docs/reports/2026-04-04-hand-lens-targeting-implementation.md`, implementing the helper pass in `src/engine/game.ts` by letting `hand-lens` prefer the nearest in-range notebook-fit clue while leaving other supports on the normal nearest inspectable.
- Added focused tide-line runtime coverage in `src/test/runtime-smoke.test.ts`, proving that `hand-lens` now grabs `bull-kelp-wrack` over a nearer decoy on the last `Shore Shelter` stage while `note-tabs` does not.
- Verification: `npx vitest run src/test/runtime-smoke.test.ts -t "hand lens prefer|normal nearest tide-line"`; `npx vitest run src/test/runtime-smoke.test.ts -t "Wrack Shelter|hand lens prefer|normal nearest tide-line"`; `npm run build`

### ECO-20260404-main-270

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Implement the second tactile route-opportunity seam`
- Source: `docs/reports/2026-04-04-held-sand-open-pioneer-handoff.md`
- Packet: `.agents/packets/111-helper-differentiation-and-second-route-opportunity-phase.json`
- Depends on: `ECO-20260404-scout-270`

Goal:

- Add one more living-world opportunity seam on a route outside the beach wrack proof.

Acceptance:

- a second route family gains real opportunity variation in play
- route identity stays clear

Completion note:

- Added `docs/reports/2026-04-04-held-sand-open-pioneer-implementation.md`, implementing the second tactile route-opportunity seam by letting active `Held Sand` treat `beach-grass` as a valid `open-pioneer` clue on `scrub-edge-pattern`.
- Added focused field-request and runtime coverage proving the new back-dune clue only works during the replay window and that canonical `Scrub Pattern` identity still holds once the route is ready to file.
- Verification: `npx vitest run src/test/field-requests.test.ts -t "Held Sand|beach-grass fit|scrub-edge-pattern is reframed"`; `npx vitest run src/test/runtime-smoke.test.ts -t "Held Sand live after beach-grass|stable scrub pattern line during the Held Sand replay window"`; `npx vitest run src/test/field-requests.test.ts src/test/runtime-smoke.test.ts -t "Held Sand|beach-grass|scrub pattern line during the Held Sand replay window"`; `npm run build`

### ECO-20260404-critic-270

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Review the second tactile route-opportunity seam`
- Source: `docs/reports/2026-04-04-held-sand-open-pioneer-implementation.md`
- Packet: `.agents/packets/111-helper-differentiation-and-second-route-opportunity-phase.json`
- Depends on: `ECO-20260404-main-270`

Goal:

- Review whether the second tactile seam deepens replay without confusing route identity.

Acceptance:

- records findings or a clean review in `docs/reports/`
- leaves lane 4 ready for the next wave if clean

Completion note:

- Added `docs/reports/2026-04-04-held-sand-open-pioneer-review.md`, finding no blocker in the new same-zone `Held Sand` opening opportunity.
- Bumped packet `111` to version `5`, recorded the durable same-stage process-carrier rule in project memory, and cleared lane 4 with no remaining active queue item.
- Verification: `npx vitest run src/test/field-requests.test.ts -t "Held Sand|beach-grass fit|scrub-edge-pattern is reframed"`; `npx vitest run src/test/runtime-smoke.test.ts -t "Held Sand live after beach-grass|stable scrub pattern line during the Held Sand replay window"`; `npx vitest run src/test/field-requests.test.ts src/test/runtime-smoke.test.ts -t "Held Sand|beach-grass|scrub pattern line during the Held Sand replay window"`; `npm run build`; `npm run validate:agents`

### ECO-20260404-critic-269

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Review the non-route-marker helper differentiation pass`
- Source: `docs/reports/2026-04-04-hand-lens-targeting-implementation.md`
- Packet: `.agents/packets/111-helper-differentiation-and-second-route-opportunity-phase.json`
- Depends on: `ECO-20260404-main-269`

Goal:

- Review whether the helper now creates a real in-field difference.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260404-scout-270` if clean

Completion note:

- Added `docs/reports/2026-04-04-hand-lens-targeting-review.md`, finding no blocker in the new `hand-lens` targeting seam.
- Promoted `ECO-20260404-scout-270` to `READY`, bumped packet `111` to version `3`, and recorded the durable rule that helper differentiation should favor in-field clue targeting over more strip-only copy.
- Verification: `npx vitest run src/test/runtime-smoke.test.ts -t "hand lens prefer|normal nearest tide-line"`; `npx vitest run src/test/runtime-smoke.test.ts -t "Wrack Shelter|hand lens prefer|normal nearest tide-line"`; `npm run build`; `npm run validate:agents`

### ECO-20260404-main-267

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Implement the treeline signature destination`
- Source: `docs/reports/2026-04-04-treeline-signature-destination-implementation.md`
- Packet: `.agents/packets/110-treeline-signature-and-beach-landmark-phase.json`
- Depends on: `ECO-20260404-scout-267`

Goal:

- Add one stronger remembered treeline threshold place.

Acceptance:

- treeline gains a clearer signature destination
- traversal remains cozy and recoverable

Completion notes:

- Added one compact `krummholz-belt` last-tree shelter family in `src/content/biomes/treeline.ts` through `last-tree-approach-stone`, `last-tree-shelter-rest`, a shifted `krummholz-bunchberry`, and one deterministic `last-tree-spruce`, while leaving the existing higher lee-pocket family intact.
- Verified with focused treeline biome/runtime coverage, `npm run build`, the shared web-game client smoke in `output/main-267-client/`, and seeded browser proof in `output/main-267-browser/` with empty console errors.

### ECO-20260404-critic-267

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Review the treeline signature destination`
- Source: `docs/reports/2026-04-04-treeline-signature-destination-review.md`
- Packet: `.agents/packets/110-treeline-signature-and-beach-landmark-phase.json`
- Depends on: `ECO-20260404-main-267`

Goal:

- Review whether treeline now carries a stronger remembered place by feel.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260404-scout-268` if clean

Completion notes:

- Wrote `docs/reports/2026-04-04-treeline-signature-destination-review.md`, finding no blocking issue in the new `krummholz-belt` shelter: the added stop now gives Treeline Pass a clearer last-tree threshold place without turning the lee-pocket continuation into a denser climb.
- Rechecked the seeded browser proof in `output/main-267-browser/`, confirmed the right half of `krummholz-belt` is at its comfortable handheld-density ceiling but still readable, and promoted `ECO-20260404-scout-268` to `READY`.

### ECO-20260404-scout-263

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Prepare the non-sill home-place payoff handoff`
- Source: `docs/reports/2026-04-04-home-place-seam-shift-and-overlay-protection-phase.md`
- Packet: `.agents/packets/108-home-place-seam-shift-and-overlay-protection-phase.json`
- Depends on: `none`

Goal:

- Narrow one visible station or nursery payoff seam that does not spend more of the current sill family.

Acceptance:

- writes a concrete handoff for `ECO-20260404-main-263`
- keeps the home-place pass calm, compact, and non-text-heavy

Completion note:

- Added `docs/reports/2026-04-04-non-sill-home-place-payoff-handoff.md`, narrowing the next pass to the field-station backdrop side gutters rather than the saturated sill or the bed-local nursery strip.
- Bumped packet `108` to version `2`, grounding `main-263` around one pure backdrop-accent state helper plus one draw helper in `src/engine/overlay-render.ts`, and promoted `ECO-20260404-main-263` to `READY`.
- Verification: `npm run validate:agents`

### ECO-20260404-main-263

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Implement the non-sill home-place payoff pass`
- Source: `docs/reports/2026-04-04-home-place-seam-shift-and-overlay-protection-phase.md`
- Packet: `.agents/packets/108-home-place-seam-shift-and-overlay-protection-phase.json`
- Depends on: `ECO-20260404-scout-263`

Goal:

- Add one visible station or nursery payoff on a new seam without widening the shell.

Acceptance:

- the home place feels more changed without using more of the sill
- no new row, subtitle, or planner layer appears

Completion note:

- Added `docs/reports/2026-04-04-non-sill-home-place-payoff-implementation.md`, keeping the change inside `src/engine/overlay-render.ts`: the station now uses side-gutter backdrop braces as the new home-place payoff seam, while the existing lower sill stays unchanged.
- Added the pure `resolveFieldStationBackdropAccentState(...)` helper, exposed the new state through `render_game_to_text()` for deterministic verification, and updated the focused overlay/runtime tests instead of widening station copy or progression logic.
- Verified with `npx vitest run src/test/overlay-copy.test.ts`, `npx vitest run src/test/runtime-smoke.test.ts -t "opens the world-map field station, claims field credit, and buys trail stride|opens the nursery tab and starts one teaching-bed project from the field station|adds a season expedition page that becomes ready after the three live routes are logged"`, `npm run build`, the shared client smoke in `output/lane-1-main-263-client/`, seeded browser proof in `output/lane-1-main-263-browser/`, and a Playwright console check with 0 errors. Packet `108` is now version `3`, and `ECO-20260404-critic-263` is promoted to `READY`.

### ECO-20260404-critic-263

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Review the non-sill home-place payoff pass`
- Source: `docs/reports/2026-04-04-home-place-seam-shift-and-overlay-protection-phase.md`
- Packet: `.agents/packets/108-home-place-seam-shift-and-overlay-protection-phase.json`
- Depends on: `ECO-20260404-main-263`

Goal:

- Review whether the new home-place payoff feels earned without crowding the shell.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260404-scout-264` if clean

Completion note:

- Added `docs/reports/2026-04-04-non-sill-home-place-payoff-review.md`, finding no blocker in the new side-gutter brace seam: the payoff now lives off the saturated sill while staying inside the station shell and existing progression inputs.
- Confirmed the new `backdropAccent` test hook is still a small render-observability seam rather than a new gameplay layer, bumped packet `108` to version `4`, and promoted `ECO-20260404-scout-264` to `READY`.
- Verification: inspected the focused helper/runtime coverage and seeded browser proof in `output/lane-1-main-263-browser/`

### ECO-20260404-scout-264

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Prepare the overlay-render protection handoff`
- Source: `docs/reports/2026-04-04-home-place-seam-shift-and-overlay-protection-phase.md`
- Packet: `.agents/packets/108-home-place-seam-shift-and-overlay-protection-phase.json`
- Depends on: `ECO-20260404-critic-263`

Goal:

- Narrow one pure render or station-board composition seam for extraction from `overlay-render.ts`.

Acceptance:

- writes a concrete handoff for `ECO-20260404-main-264`
- keeps timers and input logic out of scope

Completion note:

- Added `docs/reports/2026-04-04-overlay-render-protection-handoff.md`, narrowing the next split to the `SEASON -> ROUTES` page body inside `drawFieldStationOverlay(...)` rather than the shorter expedition page or the already-protected notice family.
- Bumped packet `108` to version `5`, added a concrete `main_264_focus` target around the season-wrap strip, route board, atlas strip, and support rows, retargeted `main-264` / `critic-264`, and promoted `ECO-20260404-main-264` to `READY`.
- Verification: `npm run validate:agents`

### ECO-20260404-main-264

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Implement the overlay-render protection split`
- Source: `docs/reports/2026-04-04-overlay-render-protection-handoff.md`
- Packet: `.agents/packets/108-home-place-seam-shift-and-overlay-protection-phase.json`
- Depends on: `ECO-20260404-scout-264`

Goal:

- Extract one pure station or board render seam from `overlay-render.ts`.

Acceptance:

- the render file gets safer to extend
- visuals and behavior remain stable

Completion note:

- Added `docs/reports/2026-04-04-overlay-render-protection-implementation.md`, extracting the inline `SEASON -> ROUTES` station page body into the new sibling renderer `src/engine/field-station-routes-page.ts` while leaving shell framing, page switching, expedition rendering, nursery rendering, and accent passes in `src/engine/overlay-render.ts`.
- Kept the split pure and render-only: rect math, copy budgets, gameplay state, save mutation, input handling, and the existing runtime text seam all stayed unchanged. Packet `108` is now version `6`, and `ECO-20260404-critic-264` is promoted to `READY`.
- Verified with `npx vitest run src/test/overlay-copy.test.ts`, `npx vitest run src/test/runtime-smoke.test.ts -t "opens the world-map field station, claims field credit, and buys trail stride|adds a season expedition page that becomes ready after the three live routes are logged"`, `npm run build`, the shared client smoke in `output/lane-1-main-264-client/`, and a live browser console check at `http://127.0.0.1:4177` with 0 errors.

### ECO-20260404-critic-264

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Review the overlay-render protection split`
- Source: `docs/reports/2026-04-04-overlay-render-protection-implementation.md`
- Packet: `.agents/packets/108-home-place-seam-shift-and-overlay-protection-phase.json`
- Depends on: `ECO-20260404-main-264`

Goal:

- Review whether the render split reduces risk while keeping the shell visually stable.

Acceptance:

- records findings or a clean review in `docs/reports/`
- leaves lane 1 ready for the next wave if clean

Completion note:

- Added `docs/reports/2026-04-04-overlay-render-protection-review.md`, finding no blocker in the new sibling routes-page seam: `field-station-routes-page.ts` stays render-only while `overlay-render.ts` keeps shell ownership and branch selection.
- Marked packet `108` version `7` as `DONE` and recorded the new routes-page render seam in project memory. Lane 1 now has no remaining actionable queue items.
- Verification: rechecked the extracted renderer, the parent call site, and `npm run validate:agents`

### ECO-20260328-main-10

- Status: `DONE`
- Owner: `main-agent`
- Priority: `P2`
- Title: `Implement journal-first ecosystem notes for relationship teaching`
- Source: `docs/reports/2026-03-28-ecosystem-relationship-scout.md`
- Packet: `.agents/packets/007-ecosystem-relationship-layer.json`
- Depends on: `ECO-20260328-scout-03`, `ECO-20260328-main-08`

Goal:

- Add one lightweight system that helps players understand how discoveries relate to habitat, shelter, food, decomposition, seed spread, or zones across the live biomes.

Acceptance:

- discovered journal entries can surface authored ecosystem notes tied to related discoveries in beach, forest, and tundra
- the relationship logic lives in content plus a small helper, not only as hardcoded journal strings
- the system keeps the cozy exploration feel, avoids species-name spoilers for locked notes, and leaves build/tests green

Completion note:

- Added authored `ecosystemNotes` to beach, forest, and tundra biome content, plus a small pure resolver in `src/engine/ecosystem-notes.ts` so unlock logic stays data-driven instead of living in renderer strings.
- Wired the journal detail pane and `render_game_to_text()` to surface unlocked or spoiler-safe locked note states for discovered entries without adding a new overlay or quiz system.
- Added helper and runtime coverage in `src/test/ecosystem-notes.test.ts` and `src/test/runtime-smoke.test.ts`, then re-verified with `npm test -- --run`, `npm run build`, the shared web-game client, and a headless journal screenshot pass with zero console errors.



### ECO-20260328-critic-09

- Status: `DONE`
- Owner: `critic-agent`
- Priority: `P2`
- Title: `Review the first ecosystem-note teaching pass`
- Source: `docs/reports/2026-03-28-ecosystem-note-review.md`
- Packet: `.agents/packets/007-ecosystem-relationship-layer.json`
- Depends on: `ECO-20260328-main-10`

Goal:

- Review whether the first journal-first relationship layer is science-safe, readable, and worth keeping as the template for future biome teaching.

Acceptance:

- critique checks note wording, ecological claims, and child readability
- critique checks that locked-note behavior does not spoil undiscovered exact names
- any follow-up fixes get added back to the queue clearly

Completion note:

- Confirmed that the first ecosystem-note pass is worth keeping: the science claims are modest and sound, and the locked state remains spoiler-safe.
- Logged one main follow-up in `docs/reports/2026-03-28-ecosystem-note-review.md`: the note currently replaces the selected entry’s own journal teaching and still clips live copy in both unlocked and locked states.
- Left the note-selection heuristic in `src/engine/ecosystem-notes.ts` as a watchlist item rather than queueing a rewrite, since the current overlap is still small.



### ECO-20260328-scout-03

- Status: `DONE`
- Owner: `scout-agent`
- Priority: `P2`
- Title: `Prepare the first ecosystem-relationship teaching packet`
- Source: `docs/reports/2026-03-28-ecosystem-relationship-scout.md`
- Packet: `.agents/packets/007-ecosystem-relationship-layer.json`
- Depends on: `none`

Goal:

- Turn the next education layer into a small, science-accurate, implementable packet that connects discoveries to habitat roles and relationships across the live biome set.

Acceptance:

- the report or packet recommends a small slice the main agent can actually build next
- science claims are accurate and age-appropriate
- recommendations avoid quizzes, achievement-first framing, or content bloat

Completion note:

- Wrote `docs/reports/2026-03-28-ecosystem-relationship-scout.md` and packet `007` to turn the generic “relationship teaching” idea into a concrete next implementation slice.
- Recommended a journal-first `ecosystem notes` system backed by authored biome note data and a small pure helper instead of a new overlay, quiz layer, or AI-dependent feature.
- Added a critic follow-up item so the first relationship pass gets reviewed for science accuracy, readability, and spoiler safety after implementation.



### ECO-20260328-critic-05

- Status: `DONE`
- Owner: `critic-agent`
- Priority: `P2`
- Title: `Review the text-layout stabilization pass`
- Source: `docs/reports/2026-03-28-readability-pass-review.md`
- Packet: `.agents/packets/004-readability-runtime-ecology.json`
- Depends on: `ECO-20260328-main-07`

Goal:

- Review first-screen readability and any remaining overflow after the structural layout pass.

Acceptance:

- critique checks title, menu, journal, and fact surfaces
- notes call out any remaining clipping, density, or child-comprehension issues
- next-step work is added back to the queue if needed

Completion note:

- Confirmed that the original title CTA clipping is fixed and that the extracted layout/render seams are the right direction.
- Logged two concrete follow-ons in `docs/reports/2026-03-28-readability-pass-review.md`: the title subtitle still silently drops the `field journal` promise, and the equal-width journal tabs will not scale to the planned five-biome chain.
- Also noted that the live visual pass was interrupted by an active in-progress `ecosystemNotes` runtime regression from current main-agent work, so the next screenshot-heavy critique should happen after `main-12` settles again.



### ECO-20260328-main-09

- Status: `DONE`
- Owner: `main-agent`
- Priority: `P2`
- Title: `Add deterministic runtime smoke coverage for the lived game loop`
- Source: `docs/reports/2026-03-28-current-state-review.md`
- Packet: `.agents/packets/004-readability-runtime-ecology.json`
- Depends on: `ECO-20260328-main-08`

Goal:

- Cover the main player path using the existing debug hooks and save reloads, not just helper-level tests.

Acceptance:

- smoke coverage exercises title -> play -> inspect -> journal or menu -> travel or reload
- coverage checks persistence-sensitive behavior
- critical-loop verification no longer depends only on manual browser memory

Completion note:

- Added `src/test/runtime-smoke.test.ts`, a deterministic fake-DOM harness that drives `createGame`, `window.advanceTime(ms)`, and `window.render_game_to_text()` through title, movement, inspect, journal, menu, biome enter, and reload persistence.
- The smoke test uses a fixed save seed plus `loadOrCreateSave()` to verify discovery persistence and last-biome continuity without depending on a real browser or brittle helper-only assertions.
- Verified again with `npm test -- --run`, `npm run build`, and a fresh shared web-game Playwright-client title pass after the new test landed.



### ECO-20260328-main-08

- Status: `DONE`
- Owner: `main-agent`
- Priority: `P1`
- Title: `Extract scene and overlay seams out of src/engine/game.ts`
- Source: `docs/reports/2026-03-28-current-state-review.md`
- Packet: `.agents/packets/004-readability-runtime-ecology.json`
- Depends on: `ECO-20260328-main-07`

Goal:

- Reduce the concentration risk in `src/engine/game.ts` by extracting coherent scene, overlay, or UI modules without changing behavior.

Acceptance:

- `src/engine/game.ts` is meaningfully smaller and easier to scan
- scene and overlay boundaries are clearer for future biome and menu work
- build and existing tests stay green

Completion note:

- Extracted shared pixel-UI primitives into `src/engine/pixel-ui.ts`, overlay rendering into `src/engine/overlay-render.ts`, and biome scene drawing into `src/engine/biome-scene-render.ts`.
- Reduced `src/engine/game.ts` from 2157 lines to 1326 lines while keeping it focused on simulation, input, save state, and orchestration instead of raw rendering details.
- Verified with `npm test -- --run`, `npm run build`, the shared web-game Playwright client, and fresh browser captures for title, journal, and menu with matching `render_game_to_text()` output and no console-error artifacts.



### ECO-20260328-main-07

- Status: `DONE`
- Owner: `main-agent`
- Priority: `P1`
- Title: `Stabilize text layout and title-screen readability after the 192x144 expansion`
- Source: `docs/reports/2026-03-28-current-state-review.md`
- Packet: `.agents/packets/004-readability-runtime-ecology.json`
- Depends on: `none`

Goal:

- Remove clipping and overlap across the current title screen and other text-heavy in-canvas surfaces using shared layout rules instead of one-off nudges.

Acceptance:

- title controls and CTA fit cleanly at `192x144`
- long text in title, menu, journal, and fact surfaces respects safe areas
- the solution leaves behind clearer reusable layout helpers, constants, or structure

Completion note:

- Added a shared `src/engine/ui-layout.ts` helper module for inset/split/wrap rules and refit the title, menu, journal, and fact-card overlays around explicit panel/content rectangles instead of ad hoc coordinates.
- Tightened the title CTA lane, menu rows, journal panes, and fact badge/layout so the `192x144` screen reads cleanly with fewer collisions and better button/text alignment.
- Verified with `npm test -- --run`, `npm run build`, the shared web-game Playwright client, and fresh browser captures for title, journal, menu, and inspected fact panels with no console-error artifacts.



### ECO-20260328-main-11

- Status: `DONE`
- Owner: `main-agent`
- Priority: `P2`
- Title: `Create field-guide context builder and prompt assembler`
- Source: `docs/ai-naturalist-design.md`
- Packet: `.agents/packets/005-ai-field-guide.json`
- Depends on: `none`

Completion note:

- Added a new pure module in `src/engine/field-guide.ts` with zone detection, current-context assembly, and naturalist prompt generation.
- Added supporting field-guide types to `src/engine/types.ts` and new unit coverage in `src/test/field-guide.test.ts`, including discovery flags, distance sorting, zone boundaries, and landmark handling.
- Verified the work with a green `npm test` and `npm run build`.



### ECO-20260327-critic-04

- Status: `DONE`
- Owner: `critic-agent`
- Priority: `P2`
- Title: `Review menu, settings, and save-reset UX`
- Source: `docs/reports/2026-03-27-post-travel-queue-pass.md`
- Packet: `.agents/packets/003-screen-ux-and-progression.json`
- Depends on: `ECO-20260327-main-05`

Completion note:

- Reviewed the post-menu runtime using the current code, a green build/test pass, and the live screen baseline available in this critique turn.
- The menu direction and persistence wording are sound overall, with no new blocker on save-reset behavior, but the same text-layout brittleness that shows up on the title card should be treated as a shared UI concern.
- Added packet `004` and queued the next work so readability stabilization happens before more copy-heavy surfaces accumulate.



### ECO-20260327-critic-03

- Status: `DONE`
- Owner: `critic-agent`
- Priority: `P2`
- Title: `Review the widened viewport and readability pass`
- Source: `docs/reports/2026-03-27-post-travel-queue-pass.md`
- Packet: `.agents/packets/003-screen-ux-and-progression.json`
- Depends on: `ECO-20260327-main-04`

Completion note:

- Reviewed the widened-screen direction against the current code, green verification, and a fresh headless title-screen capture.
- The `192x144` frame is the right baseline, but the live title layout still clips and overlaps copy, so the next queue wave now starts with a structural readability pass instead of more feature layering.
- Logged that follow-on work in `docs/reports/2026-03-28-current-state-review.md` and packet `004`.



### ECO-20260327-critic-02

- Status: `DONE`
- Owner: `critic-agent`
- Priority: `P2`
- Title: `Review the live world-travel integration`
- Source: `docs/reports/2026-03-27-world-travel-scout.md`
- Packet: `.agents/packets/002-world-travel-integration.json`
- Depends on: `ECO-20260327-main-03`

Completion note:

- Reviewed the integrated world-travel runtime through current code, green build/tests, and the post-integration project state after travel, journal, menu, and tundra work landed.
- The travel direction is correct and worth preserving, but it increases the concentration risk inside `src/engine/game.ts`, which is now the next technical pressure point.
- Added that architecture follow-up into the new queue wave and packet `004`.



### ECO-20260327-main-05

- Status: `DONE`
- Owner: `main-agent`
- Priority: `P1`
- Title: `Add a player-facing menu, settings, and save-management surface`
- Source: `docs/reports/2026-03-27-post-travel-queue-pass.md`
- Packet: `.agents/packets/003-screen-ux-and-progression.json`
- Depends on: `ECO-20260327-main-04`

Completion note:

- Added a visible `MENU` surface reachable from the title screen and active play, with calm in-canvas settings rows instead of bringing back heavy page chrome.
- Expanded the save model safely so old saves gain `showInspectHints`, and added unit coverage for settings migration plus reset-save behavior.
- Verified menu open/close, reset confirmation, and confirmed reset with build/tests plus live browser checks using `render_game_to_text()` and zero console errors.



### ECO-20260327-main-06

- Status: `DONE`
- Owner: `main-agent`
- Priority: `P2`
- Title: `Add cross-biome collection progress and richer journal navigation`
- Source: `docs/reports/2026-03-27-post-travel-queue-pass.md`
- Packet: `.agents/packets/003-screen-ux-and-progression.json`
- Depends on: `ECO-20260327-main-03`

Completion note:

- Reworked the journal into biome-specific field pages with clickable biome tabs, per-biome totals, and category progress headers that do not spoil undiscovered entry names.
- Moved journal progress math into a small pure helper module and added tests for biome/category counts plus biome-filtered entry lists.
- Verified journal state and persistence with build/tests, a Playwright smoke run, and live browser checks showing the journal reload with saved beach and forest discoveries and no console errors.



### ECO-20260327-main-04

- Status: `DONE`
- Owner: `main-agent`
- Priority: `P1`
- Title: `Adopt a wider rectangular viewport and rebalance in-canvas safe areas`
- Source: `docs/reports/2026-03-27-post-travel-queue-pass.md`
- Packet: `.agents/packets/003-screen-ux-and-progression.json`
- Depends on: `ECO-20260327-main-03`

Completion note:

- Moved the internal viewport to a deliberate `192x144` screen shape and updated the shell to a matching `4:3` presentation.
- Rebalanced the title screen, fact dialogue, journal layout, world-map HUD, and overworld node spacing for the wider frame.
- Verified the new shape with build/tests plus live browser screenshots for title, dialogue, journal, and map, all with zero console errors.



### ECO-20260327-main-03

- Status: `DONE`
- Owner: `main-agent`
- Priority: `P2`
- Title: `Integrate forest travel, world map movement, and doorway transitions into the live runtime`
- Source: `docs/reports/2026-03-27-world-travel-scout.md`
- Packet: `.agents/packets/002-world-travel-integration.json`
- Depends on: `ECO-20260327-main-02`

Completion note:

- Generalized the runtime so beach and forest now render with biome-aware terrain and atmosphere instead of one beach-only draw path.
- Added live scene switching for biome play, world map, and doorway transitions, with playable beach-to-forest and forest-to-beach travel.
- Verified the round trip in the browser, kept save/journal behavior intact, and restored a clean `npm run build` plus `npm run test`.



### ECO-20260327-main-02

- Status: `DONE`
- Owner: `main-agent`
- Priority: `P1`
- Title: `Fix inspectable metadata so science accuracy stays valid`
- Source: `docs/reports/2026-03-27-initial-critique.md`
- Packet: `.agents/packets/001-foundation-pass.json`
- Depends on: `none`

Completion note:

- Split inspectable metadata so organism entries keep scientific names while landmark entries use a subtitle plus optional label.
- Replaced the beach driftwood placeholder Latin with accurate landmark text and kept the fact bubble and journal rendering on one shared detail-line path.
- Added validation/tests for the new rule and verified live that plants still show scientific names while driftwood now shows a landmark-safe subtitle.



### ECO-20260327-main-01

- Status: `DONE`
- Owner: `main-agent`
- Priority: `P1`
- Title: `Shift the app from landing page to game-first screen`
- Source: `docs/reports/2026-03-27-initial-critique.md`
- Packet: `.agents/packets/001-foundation-pass.json`
- Depends on: `none`

Completion note:

- Removed the external masthead and controls card so the browser now presents as a game-first frame instead of a landing page.
- Moved onboarding and controls into the in-canvas title overlay and verified desktop plus smaller-width behavior in the browser.
- Preserved save behavior, deterministic hooks, and the current internal render resolution.



### ECO-20260327-scout-02

- Status: `DONE`
- Owner: `scout-agent`
- Priority: `P2`
- Title: `Scaffold the next ecosystem, overworld travel, and doorway transition system`
- Source: `manual`

Completion note:

- Added the `Forest Trail` biome scaffold, world-map content, world-map state and render helpers, doorway transition planning, tests, docs, and packet `002` for live integration.



### ECO-20260328-scout-01

- Status: `DONE`
- Owner: `scout-agent`
- Priority: `P2`
- Title: `Add a live tundra ecosystem and map destination`
- Source: `manual`

Completion note:

- Added the live `Tundra Reach` biome with dedicated tundra plants, berries, animals, tiles, and map-door art.
- Extended the overworld map and biome registry so tundra is reachable through the existing travel flow.
- Expanded biome and world-map tests, then verified the repo again with `npm test` and `npm run build`.



### ECO-20260327-critic-01

- Status: `DONE`
- Owner: `critic-agent`
- Priority: `P2`
- Title: `Review the game-first shell refactor`
- Source: `manual`
- Packet: `.agents/packets/001-foundation-pass.json`
- Depends on: `ECO-20260327-main-01`

Completion note:

- Reviewed the post-shell-refactor app direction against the live start screen, current runtime code, and tests available at that point.
- Added the next post-travel queue layer in `docs/reports/2026-03-27-post-travel-queue-pass.md` and packet `003`.
