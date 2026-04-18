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

### ECO-20260403-scout-242

- Status: `PARKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Prepare the coast-side destination continuation handoff`
- Source: `docs/reports/2026-04-03-destination-chain-continuation-phase.md`
- Packet: `.agents/packets/099-destination-chain-continuation-phase.json`
- Depends on: `ECO-20260403-critic-223`

Note:

- Superseded by the Sprint 1 lane-3 signature-pocket track in packet `124`.
- Keep as archival context only unless the new Sprint 1 lane-3 work is explicitly rolled back.

### ECO-20260403-main-242

- Status: `PARKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Implement the coast-side destination continuation`
- Source: `docs/reports/2026-04-03-destination-chain-continuation-phase.md`
- Packet: `.agents/packets/099-destination-chain-continuation-phase.json`
- Depends on: `ECO-20260403-scout-242`

Note:

- Superseded by the Sprint 1 lane-3 signature-pocket track in packet `124`.

### ECO-20260403-critic-242

- Status: `PARKED`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Review the coast-side destination continuation`
- Source: `docs/reports/2026-04-03-destination-chain-continuation-phase.md`
- Packet: `.agents/packets/099-destination-chain-continuation-phase.json`
- Depends on: `ECO-20260403-main-242`

Note:

- Superseded by the Sprint 1 lane-3 signature-pocket track in packet `124`.

### ECO-20260403-scout-243

- Status: `PARKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Prepare the high-country relief continuation handoff`
- Source: `docs/reports/2026-04-03-destination-chain-continuation-phase.md`
- Packet: `.agents/packets/099-destination-chain-continuation-phase.json`
- Depends on: `ECO-20260403-critic-242`

Note:

- Superseded by the Sprint 2 lane-3 high-country relief track in packet `125`.

### ECO-20260403-main-243

- Status: `PARKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Implement the high-country relief continuation`
- Source: `docs/reports/2026-04-03-destination-chain-continuation-phase.md`
- Packet: `.agents/packets/099-destination-chain-continuation-phase.json`
- Depends on: `ECO-20260403-scout-243`

Note:

- Superseded by the Sprint 2 lane-3 high-country relief track in packet `125`.

### ECO-20260403-critic-243

- Status: `PARKED`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Review the high-country relief continuation`
- Source: `docs/reports/2026-04-03-destination-chain-continuation-phase.md`
- Packet: `.agents/packets/099-destination-chain-continuation-phase.json`
- Depends on: `ECO-20260403-main-243`

Note:

- Superseded by the Sprint 2 lane-3 high-country relief track in packet `125`.

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

### ECO-20260405-main-272

- Status: `PARKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Implement one nursery layout follow-on`
- Source: `docs/reports/2026-04-05-nursery-layout-follow-on-scout.md`
- Packet: `.agents/packets/112-nursery-legibility-and-renderer-phase.json`
- Depends on: `ECO-20260405-scout-272`

Goal:

- Clean up the one remaining crowded nursery state without widening the shell or adding more text.

Acceptance:

- the targeted nursery state becomes overlap-free
- tests and browser proof cover the exact follow-on case
- the page still feels as calm as the routes shell

Note:

- Parked after `ECO-20260405-scout-272` found no distinct lane-1 layout-only failure left to hand off.
- Reopen only if later nursery edits reintroduce a structural `256x160` overlap that lane 2's copy-role tuning cannot solve.

### ECO-20260405-critic-272

- Status: `PARKED`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Review the nursery layout follow-on`
- Source: `docs/reports/2026-04-05-nursery-layout-follow-on-scout.md`
- Packet: `.agents/packets/112-nursery-legibility-and-renderer-phase.json`
- Depends on: `ECO-20260405-main-272`

Goal:

- Review whether the nursery page now matches the routes page for shell discipline and handheld readability.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the targeted state is clean at `256x160`
- leaves lane 1 ready for the next home-loop wave if clean

Note:

- Parked because the scout found no distinct lane-1 layout follow-on worth implementing after the clean renderer split review.

## Blocked

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

### ECO-20260418-critic-313

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `Review Sprint 4 High Pass chapter-side spatial payoff`
- Source: `docs/reports/2026-04-17-high-pass-rime-brow-review.md`
- Packet: `.agents/packets/127-high-pass-deepening-and-chapter-side-polish.json`
- Depends on: `ECO-20260418-main-313`

Goal:

- Review whether the new High Pass pocket gives the chapter a stronger remembered shape by feel.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the new space helps High Pass read as a real chapter
- leaves lane 3 ready for the next Treeline follow-on if clean

Completion notes:

- Added `docs/reports/2026-04-17-high-pass-rime-brow-review.md`, finding no blocker in the new `Rime Brow` overlook and confirming the chapter now reads as `Stone Shelter -> Rime Brow -> open-fell hold` without reopening travel logic or overbuilding the right-side chain.
- Rechecked the focused treeline biome/runtime proof, re-inspected the seeded browser artifact in `output/main-313-browser/`, and confirmed `errors.json` stayed empty.

### ECO-20260418-main-313

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `Implement Sprint 4 High Pass chapter-side spatial payoff`
- Source: `docs/reports/2026-04-17-high-pass-rime-brow-implementation.md`
- Packet: `.agents/packets/127-high-pass-deepening-and-chapter-side-polish.json`
- Depends on: `ECO-20260418-scout-313`

Goal:

- Give High Pass one more remembered place beyond Stone Shelter without reopening a broad geometry wave.

Acceptance:

- the chapter gains another memorable frame or reveal
- the work stays out of the current Stone Shelter density ceiling
- traversal, recovery, and readability remain calm

Completion notes:

- Added `docs/reports/2026-04-17-high-pass-rime-brow-implementation.md`, turning the live `rime-mark` crest band into one compact `Rime Brow` overlook by widening `lee-pocket-rime-cap`, tightening `lee-pocket-crest-brow`, and adding one tiny authored `reindeer-lichen` accent.
- Verified with `npm test -- --run src/test/treeline-biome.test.ts src/test/runtime-smoke.test.ts -t "adds one compact Rime Brow overlook between Stone Shelter and the open-fell hold|adds one compact Stone Shelter basin under the lee shelf|adds one compact open-fell island before the tundra handoff"`, `npm run build`, the shared browser smoke in `output/main-313-client/`, and the seeded browser proof in `output/main-313-browser/`.

### ECO-20260418-main-311

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Implement Sprint 4 High Pass chapter-state hardening`
- Source: `docs/reports/2026-04-18-high-pass-chapter-state-hardening-handoff.md`
- Packet: `.agents/packets/127-high-pass-deepening-and-chapter-side-polish.json`
- Depends on: `ECO-20260418-scout-311`

Goal:

- Harden High Pass chapter-state composition and land one more protective split before the chapter broadens again.

Acceptance:

- High Pass filed-season, atlas, and expedition state resolves through one smaller seam
- focused proof covers dormant-to-live chapter behavior
- no new station page, planner row, or broader dashboard appears

Completion notes:

- Added `src/engine/high-pass-chapter-state.ts` so filed-season `High Pass` copy now resolves once for the outing locator, routes continuity, dormant/live atlas note, launch card, and the `HIGH PASS / NEXT` expedition card.
- Updated `field-season-board.ts` to use thin adapters over the new helper, added direct seam coverage in `src/test/field-season-board.test.ts`, and re-ran focused field-season, field-request, and season-capstone runtime-smoke checks plus `npm run build`.

### ECO-20260418-critic-311

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Review Sprint 4 High Pass chapter-state hardening`
- Source: `docs/reports/2026-04-18-high-pass-deepening-phase.md`
- Packet: `.agents/packets/127-high-pass-deepening-and-chapter-side-polish.json`
- Depends on: `ECO-20260418-main-311`

Goal:

- Review whether High Pass chapter-state logic is cleaner and still keeps the shell calm.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the split reduced chapter-state concentration
- leaves lane 1 ready for the next High Pass follow-on if clean

Completion notes:

- Added `docs/reports/2026-04-18-high-pass-chapter-state-hardening-review.md`, finding no blocker in the dedicated `High Pass` chapter-state seam or its adapter-style use inside `field-season-board.ts`.
- Confirmed the split keeps the shell calm, protects the season-close dormancy beat, and leaves no remaining actionable lane-1 queue item.

### ECO-20260418-scout-311

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Prepare Sprint 4 High Pass chapter-state hardening`
- Source: `docs/reports/2026-04-18-high-pass-deepening-phase.md`
- Packet: `.agents/packets/127-high-pass-deepening-and-chapter-side-polish.json`
- Depends on: `ECO-20260416-critic-307`

Goal:

- Narrow Sprint 4 lane-1 work to one High Pass chapter-state hardening pass plus one protective split.

Acceptance:

- writes a concrete handoff for `ECO-20260418-main-311`
- keeps the work inside the current station / expedition shell
- points the split at a real chapter-state composition seam instead of another dashboard layer

Completion notes:

- Added `docs/reports/2026-04-18-high-pass-chapter-state-hardening-handoff.md`, narrowing Sprint 4 lane 1 to one dedicated High Pass chapter-state helper instead of another explicit shell state.
- Bumped packet `127` to version `3`, refined `main_311_focus`, and promoted `ECO-20260418-main-311` to `READY`.

### ECO-20260418-scout-312

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Prepare Sprint 4 High Pass relationship-teaching pack`
- Source: `docs/reports/2026-04-18-high-pass-relationship-pack-handoff.md`
- Packet: `.agents/packets/127-high-pass-deepening-and-chapter-side-polish.json`
- Depends on: `ECO-20260416-critic-308`

Goal:

- Narrow Sprint 4 lane-2 work to one compact relationship-first High Pass content pass.

Acceptance:

- writes a concrete handoff for `ECO-20260418-main-312`
- uses current chapter carriers and handheld-safe surfaces
- deepens ecology relationships instead of expanding fact density

Completion notes:

- Added `docs/reports/2026-04-18-high-pass-relationship-pack-handoff.md`, narrowing Sprint 4 lane 2 to one `rime + foothold` ecosystem-note pass in `lichen-fell` using `moss-campion`, `reindeer-lichen`, and `talus-cushion-pocket`.
- Bumped packet `127` to version `2`, tightened `main_312_focus` around the live `rime-mark` plus `talus-hold` seam, and recorded the durable rule to keep this High Pass follow-on relationship-first instead of densifying the new close-look cards.

### ECO-20260418-main-312

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Implement Sprint 4 High Pass relationship-teaching pack`
- Source: `docs/reports/2026-04-18-high-pass-relationship-pack-implementation.md`
- Packet: `.agents/packets/127-high-pass-deepening-and-chapter-side-polish.json`
- Depends on: `ECO-20260418-scout-312`

Goal:

- Add one compact relationship-first ecology pass to make High Pass teach connections, not just carriers.

Acceptance:

- the chapter teaches at least one shelter / exposure / rime relationship more clearly
- current cards and notes stay handheld-safe at `256x160`
- no broader atlas, journal, or comparison shell growth appears

Completion notes:

- Added `docs/reports/2026-04-18-high-pass-relationship-pack-implementation.md`, landing the new `Rime Footholds` note and the tiny `treeline-rime-footholds` prompt seam in the live High Pass open-fell pocket.
- Verified with `npm test -- --run src/test/ecosystem-notes.test.ts src/test/observation-prompts.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "High Pass rime|rime-footing|rime-footholds"`, and `npm run build`.

### ECO-20260418-critic-312

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Review Sprint 4 High Pass relationship-teaching pack`
- Source: `docs/reports/2026-04-18-high-pass-relationship-pack-review.md`
- Packet: `.agents/packets/127-high-pass-deepening-and-chapter-side-polish.json`
- Depends on: `ECO-20260418-main-312`

Goal:

- Review whether High Pass now teaches ecology relationships more clearly without getting wordier.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms relationship teaching deepened without card bloat
- leaves lane 2 ready for the next chapter-side richness pass if clean

Completion notes:

- Added `docs/reports/2026-04-18-high-pass-relationship-pack-review.md`, finding no blocker in the new High Pass `rime + foothold` teaching seam after tightening the note back under the handheld copy budget.
- Re-verified with focused content-quality, ecosystem-note, observation-prompt, and High Pass runtime-smoke coverage plus `npm run build`; lane 2 has no remaining actionable queue item.

### ECO-20260418-scout-313

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `Prepare Sprint 4 High Pass chapter-side spatial payoff`
- Source: `docs/reports/2026-04-18-high-pass-deepening-phase.md`
- Packet: `.agents/packets/127-high-pass-deepening-and-chapter-side-polish.json`
- Depends on: `ECO-20260416-critic-309`

Goal:

- Narrow Sprint 4 lane-3 work to one additional remembered High Pass place beyond Stone Shelter.

Acceptance:

- writes a concrete handoff for `ECO-20260418-main-313`
- stays out of the saturated Stone Shelter basin band
- gives the chapter another memorable frame without inventing a new traversal family

Completion notes:

- Added `docs/reports/2026-04-17-high-pass-rime-brow-handoff.md`, narrowing the next lane-3 spend to one compact `Rime Brow` overlook in `Treeline Pass` so the live High Pass chapter gains a distinct exposure-release frame between `Stone Shelter` and the open-fell talus hold.
- Bumped packet `127` to version `4`, refined `main_313_focus` around the crest-side `rime-mark` band, retargeted `ECO-20260418-main-313` and `ECO-20260418-critic-313`, and promoted `ECO-20260418-main-313` to `READY`.

### ECO-20260418-scout-314

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Prepare Sprint 4 High Pass route refinement`
- Source: `docs/reports/2026-04-18-high-pass-route-refinement-handoff.md`
- Packet: `.agents/packets/127-high-pass-deepening-and-chapter-side-polish.json`
- Depends on: `ECO-20260416-critic-310`

Goal:

- Narrow Sprint 4 lane-4 work to one deeper replay/support pass for the live High Pass outing.

Acceptance:

- writes a concrete handoff for `ECO-20260418-main-314`
- stays inside the existing Route v2 shell
- sharpens the live route by feel rather than by another shell or second route

Completion notes:

- Added `docs/reports/2026-04-18-high-pass-route-refinement-handoff.md`, narrowing the next lane-4 spend to one `Rimed Pass` middle-band support proof on the lee-pocket rime shelf rather than another board-copy or end-of-route pass.
- Bumped packet `127` to version `5`, refined `main_314_focus` around the live `rime-mark` shelf, retargeted `ECO-20260418-main-314` and `ECO-20260418-critic-314`, and promoted `ECO-20260418-main-314` to `READY`.

### ECO-20260418-main-314

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Implement Sprint 4 High Pass route refinement`
- Source: `docs/reports/2026-04-18-high-pass-route-refinement-implementation.md`
- Packet: `.agents/packets/127-high-pass-deepening-and-chapter-side-polish.json`
- Depends on: `ECO-20260418-scout-314`

Goal:

- Deepen the live High Pass outing so `Rimed Pass` and the current support seam feel more distinct in play.

Acceptance:

- the replay or support seam changes what the player notices or does, not just route naming
- the current filing, note-tabs, and board shell stay unchanged
- no second High Pass route appears

Completion notes:

- Added `docs/reports/2026-04-18-high-pass-route-refinement-implementation.md`, confirming the existing active-clue support seam already makes `Rimed Pass` player-felt and that this lane-4 pass only needed focused proof instead of a runtime logic change.
- Added deterministic coverage in `src/test/field-request-controller.test.ts` and `src/test/runtime-smoke.test.ts`, proving `hand-lens` prefers `reindeer-lichen` on the live `Rime Brow` shelf while `note-tabs` stays on the nearer ordinary inspectable.
- Verified with `npx vitest run src/test/field-request-controller.test.ts -t "High Pass|Rimed Pass|active-clue"` and `npx vitest run src/test/runtime-smoke.test.ts -t "Rimed Pass|reindeer-lichen|High Pass"`; promoted `ECO-20260418-critic-314` to `READY`.

### ECO-20260418-critic-314

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Review Sprint 4 High Pass route refinement`
- Source: `docs/reports/2026-04-18-high-pass-route-refinement-review.md`
- Packet: `.agents/packets/127-high-pass-deepening-and-chapter-side-polish.json`
- Depends on: `ECO-20260418-main-314`

Goal:

- Review whether the refined High Pass route now feels more chapter-grade without widening the shell.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the replay/support seam deepened live play instead of text density
- leaves lane 4 ready for the next route-side follow-on if clean

Completion notes:

- Added `docs/reports/2026-04-18-high-pass-route-refinement-review.md`, finding no blocker in the lane-4 pass: the replay/support seam is now concretely proved in live play without widening route logic or shell copy.
- Re-verified with `npx vitest run src/test/field-request-controller.test.ts src/test/runtime-smoke.test.ts -t "Rimed Pass|reindeer-lichen|High Pass|active-clue"` and recorded one non-blocking watch item to keep the deterministic `Rime Brow` shelf proof aligned with any future lane-3 geometry retune.
- Lane 4 has no remaining actionable queue item.

### ECO-20260416-main-305

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `Implement Sprint 2 high-country relief continuation`
- Source: `docs/reports/2026-04-16-high-country-relief-continuation-handoff.md`
- Packet: `.agents/packets/125-make-the-living-world-matter.json`
- Depends on: `ECO-20260416-scout-305`

Goal:

- Give the second act another unforgettable high-country place.

Acceptance:

- the second act gains another memorable location
- recovery and readability stay cozy
- no harsher traversal language appears

Completion notes:

- Added `docs/reports/2026-04-16-high-country-relief-continuation-implementation.md`, landing one compact open-fell talus island in Treeline Pass just beyond the lee family and before tundra travel takes over.
- Verified with focused treeline biome/runtime tests, `npm run build`, the shared client smoke in `output/main-305-client/`, and a seeded browser proof in `output/main-305-browser/`; promoted `ECO-20260416-critic-305` to `READY`.

### ECO-20260416-critic-305

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `Review Sprint 2 high-country relief continuation`
- Source: `docs/reports/2026-04-16-high-country-relief-continuation-implementation.md`
- Packet: `.agents/packets/125-make-the-living-world-matter.json`
- Depends on: `ECO-20260416-main-305`

Goal:

- Review whether the high-country branch now has a stronger unforgettable place.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the pass stays memorable and recoverable
- leaves lane 3 ready for chapter-grade space work if clean

Completion notes:

- Added `docs/reports/2026-04-16-high-country-relief-continuation-review.md`, finding no blocker in the new open-fell talus island and logging one non-blocking watch item to avoid stacking another lift immediately to its right.
- Rechecked the focused treeline proof slice, inspected `output/main-305-browser/`, and promoted `ECO-20260416-scout-309` to `READY`.

### ECO-20260416-scout-309

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `Prepare Sprint 3 expedition-grade chapter space`
- Source: `docs/reports/2026-04-16-high-country-relief-continuation-review.md`
- Packet: `.agents/packets/126-open-the-next-chapter-safely.json`
- Depends on: `ECO-20260416-critic-305`

Goal:

- Narrow Sprint 3 lane-3 work to one expedition-grade space built from current calm vertical and cave language.

Acceptance:

- writes a concrete handoff for `ECO-20260416-main-309`
- reuses the existing forest trunk / cave family where practical
- keeps the space chapter-grade without becoming punishing

Completion notes:

- Added `docs/reports/2026-04-16-high-pass-chapter-space-handoff.md`, narrowing the next lane-3 spend to one compact `Stone Shelter` basin in `Treeline Pass` so the live `High Pass` opener gains a remembered middle without reopening the solved open-fell or forest families.
- Updated packet `126` to version `6`, retargeted `ECO-20260416-main-309` and `ECO-20260416-critic-309` to the new handoff, and promoted `ECO-20260416-main-309` to `READY`.

### ECO-20260416-main-309

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `Implement Sprint 3 expedition-grade chapter space`
- Source: `docs/reports/2026-04-16-high-pass-chapter-space-handoff.md`
- Packet: `.agents/packets/126-open-the-next-chapter-safely.json`
- Depends on: `ECO-20260416-scout-309`

Goal:

- Build the physical expedition-grade space for the next chapter using current calm traversal language.

Acceptance:

- one chapter-grade space lands
- the space feels memorable without combat or survival drift
- calm vertical and cave language remains readable

Completion notes:

- Added `docs/reports/2026-04-16-high-pass-chapter-space-implementation.md`, landing one compact `Stone Shelter` basin plus a tiny return step in `Treeline Pass` and anchoring the new middle pocket with one authored `frost-heave-boulder` and one authored `hoary-marmot`.
- Verified with the focused treeline biome/runtime slice, `npm run build`, `npm run validate:agents`, the shared client smoke in `output/main-309-client-initial/`, and a seeded browser proof in `output/main-309-browser/`; promoted `ECO-20260416-critic-309` to `READY`.

### ECO-20260416-critic-309

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `Review Sprint 3 expedition-grade chapter space`
- Source: `docs/reports/2026-04-16-high-pass-chapter-space-implementation.md`
- Packet: `.agents/packets/126-open-the-next-chapter-safely.json`
- Depends on: `ECO-20260416-main-309`

Goal:

- Review whether the next chapter space feels expedition-grade, readable, and cozy.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the space is chapter-worthy without punishment drift
- leaves lane 3 ready for chapter-side polish if clean

Completion notes:

- Added `docs/reports/2026-04-16-high-pass-chapter-space-review.md`, finding no blocker in the new `Stone Shelter` basin and logging one non-blocking watch item to avoid spending more authored geometry in the same `x 320-372` opener band.
- Rechecked the focused treeline proof slice, inspected `output/main-309-browser/`, and confirmed lane 3 has no further actionable queue item in order after this review.

### ECO-20260416-scout-307

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Prepare Sprint 3 next-chapter shell and protective split`
- Source: `docs/reports/2026-04-16-home-place-payoff-and-session-split-review.md`
- Packet: `.agents/packets/126-open-the-next-chapter-safely.json`
- Depends on: `ECO-20260416-critic-303`

Goal:

- Narrow Sprint 3 lane-1 work to one expedition-shell extension plus one protective split before the chapter opens.

Acceptance:

- writes a concrete handoff for `ECO-20260416-main-307`
- keeps the shell one-card-first and dashboard-free
- names one further split out of a large renderer or coordinator

Completion notes:

- Added `docs/reports/2026-04-16-next-chapter-shell-and-expedition-render-split-handoff.md`, narrowing Sprint 3 lane 1 to one single-card expedition follow-on plus the next renderer safety split.
- Bumped packet `126` to version `2`, added `main_307_focus`, and promoted `ECO-20260416-main-307` to `READY`.

### ECO-20260416-main-307

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Implement Sprint 3 next-chapter shell and protective split`
- Source: `docs/reports/2026-04-16-sprint-plan-queue-translation.md`
- Packet: `.agents/packets/126-open-the-next-chapter-safely.json`
- Depends on: `ECO-20260416-scout-307`

Goal:

- Open the expedition shell just enough for one real next chapter while landing another protective split first.

Acceptance:

- one real next-chapter shell lands without dashboard creep
- another protective split lands out of a large file
- the station remains routes-first and calm

Completion notes:

- Added `docs/reports/2026-04-16-next-chapter-shell-and-expedition-render-split-implementation.md`, pivoting the filed-season expedition tab into one real `HIGH PASS / NEXT` chapter card while keeping the station routes-first.
- Extracted the expedition page body into `src/engine/field-station-expedition-page.ts`, updated expedition-state and runtime proofs, and promoted `ECO-20260416-critic-307` to `READY`.

### ECO-20260416-critic-307

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Review Sprint 3 next-chapter shell and protective split`
- Source: `docs/reports/2026-04-16-next-chapter-shell-and-expedition-render-split-implementation.md`
- Packet: `.agents/packets/126-open-the-next-chapter-safely.json`
- Depends on: `ECO-20260416-main-307`

Goal:

- Review whether the next chapter opens safely without dashboard creep or renewed coordinator risk.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the shell stays calm and future-safe
- leaves lane 1 ready for chapter-facing polish if clean

Completion notes:

- Added `docs/reports/2026-04-16-next-chapter-shell-and-expedition-render-split-review.md`, finding no blocker in the one-card `HIGH PASS` pivot or the new expedition-page renderer split.
- Lane 1 is clear again; the only watch item is to consider a dedicated filed-season chapter status if the expedition shell grows beyond this sprint.

### ECO-20260416-scout-308

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Prepare Sprint 3 chapter science pack`
- Source: `docs/reports/2026-04-16-high-pass-science-pack-handoff.md`
- Packet: `.agents/packets/126-open-the-next-chapter-safely.json`
- Depends on: `ECO-20260416-critic-304`

Goal:

- Narrow Sprint 3 lane-2 work to one science-backed content pack for the next chapter.

Acceptance:

- writes a concrete handoff for `ECO-20260416-main-308`
- keeps the pack chapter-facing rather than general richness sprawl
- stays inside current handheld copy budgets

Completion notes:

- Added `docs/reports/2026-04-16-high-pass-science-pack-handoff.md`, narrowing Sprint 3 lane 2 to one Treeline Pass-owned chapter pack that strengthens the live `High Pass` opener through `hoary-marmot` and `dwarf-birch`.
- Bumped packet `126` to version `3`, added `main_308_focus`, and recorded the durable rule to keep this first chapter science pass `Treeline Pass`-owned instead of reopening a broader alpine sweep.

### ECO-20260416-main-308

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Implement Sprint 3 chapter science pack`
- Source: `docs/reports/2026-04-16-high-pass-science-pack-implementation.md`
- Packet: `.agents/packets/126-open-the-next-chapter-safely.json`
- Depends on: `ECO-20260416-scout-308`

Goal:

- Give the next chapter its science-backed content pack without reopening general notebook density.

Acceptance:

- one chapter-facing content pack lands
- science backing remains strong
- the content supports a real next chapter rather than broader sprawl

Completion notes:

- Added `docs/reports/2026-04-16-high-pass-science-pack-implementation.md`, landing `hoary-marmot` and `dwarf-birch` as compact Treeline Pass close-look cards for the live `High Pass` chapter carriers.
- Verified with `npm test -- --run src/test/close-look.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "hoary-marmot|dwarf-birch|Treeline Pass"`, and `npm run build`.

### ECO-20260416-critic-308

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Review Sprint 3 chapter science pack`
- Source: `docs/reports/2026-04-16-high-pass-science-pack-review.md`
- Packet: `.agents/packets/126-open-the-next-chapter-safely.json`
- Depends on: `ECO-20260416-main-308`

Goal:

- Review whether the chapter science pack is accurate, compact, and chapter-serving.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the pack supports one real next chapter
- keeps lane 2 ready for targeted follow-on richness only

Completion notes:

- Added `docs/reports/2026-04-16-high-pass-science-pack-review.md`, finding no blocker in the compact `Treeline Pass` chapter pack for `hoary-marmot` and `dwarf-birch`.
- Re-verified with `npm test -- --run src/test/close-look.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "hoary-marmot|dwarf-birch|Treeline Pass"`, and `npm run build`; lane 2 has no remaining actionable queue item.

### ECO-20260416-scout-304

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Prepare Sprint 2 relationship-teaching coast pass`
- Source: `docs/reports/2026-04-16-coast-relationship-pass-handoff.md`
- Packet: `.agents/packets/125-make-the-living-world-matter.json`
- Depends on: `ECO-20260416-critic-300`

Goal:

- Narrow Sprint 2 lane-2 work to one compact relationship-teaching pass on the beach / coast branch.

Acceptance:

- writes a concrete handoff for `ECO-20260416-main-304`
- teaches ecology through connections rather than more isolated facts
- keeps copy under the current handheld ceiling

Completion notes:

- Added `docs/reports/2026-04-16-coast-relationship-pass-handoff.md`, narrowing Sprint 2 lane 2 to one late-beach wrack-chain teaching pass on the existing note and notebook-prompt surfaces.
- Bumped packet `125` to version `3`, added `main_304_focus`, and recorded the durable rule to keep this relationship pass prompt-first and shell-light.

### ECO-20260416-main-304

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Implement Sprint 2 relationship-teaching coast pass`
- Source: `docs/reports/2026-04-16-coast-relationship-pass-implementation.md`
- Packet: `.agents/packets/125-make-the-living-world-matter.json`
- Depends on: `ECO-20260416-scout-304`

Goal:

- Teach one meaningful ecological relationship on the late beach / coast branch without bloating notebook surfaces.

Acceptance:

- one relationship-focused support pass lands
- the coast branch teaches connection rather than more list depth
- handheld readability stays intact

Completion notes:

- Added `docs/reports/2026-04-16-coast-relationship-pass-implementation.md`, retuning the late-beach `wave-edge-survivors` note and the existing `beach-tide-line-cover` prompt seed around the wrack -> tiny scavengers / small beach animals relationship.
- Verified with `npm test -- --run src/test/ecosystem-notes.test.ts src/test/observation-prompts.test.ts` and `npm test -- --run src/test/runtime-smoke.test.ts -t "wrack|food line|tide line prompt"`.
- `npm run build` is still blocked by the unrelated existing `supportBiasActive` TypeScript drift in `src/test/field-request-controller.test.ts`, outside lane 2.

### ECO-20260416-critic-304

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Review Sprint 2 relationship-teaching coast pass`
- Source: `docs/reports/2026-04-16-coast-relationship-pass-review.md`
- Packet: `.agents/packets/125-make-the-living-world-matter.json`
- Depends on: `ECO-20260416-main-304`

Goal:

- Review whether the coast branch now teaches ecology through relationships rather than isolated facts.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the pass stays compact and science-safe
- leaves lane 2 ready for chapter-content prep if clean

Completion notes:

- Added `docs/reports/2026-04-16-coast-relationship-pass-review.md`, finding no blocker in the compact wrack-line relationship pass: the coast branch now teaches one clearer connection without widening the notebook shell.
- Promoted `ECO-20260416-scout-308` to `READY`; the only watch item is the unrelated repo-level `supportBiasActive` TypeScript drift in `src/test/field-request-controller.test.ts`.

### ECO-20260416-scout-302

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Prepare Sprint 1 route-feel extension handoff`
- Source: `docs/reports/2026-04-16-route-feel-extension-handoff.md`
- Packet: `.agents/packets/124-front-half-memorability-and-merge-safety.json`
- Depends on: `none`

Goal:

- Narrow Sprint 1 lane-4 work to one front-half route and one forest route that extend support-readable route feel without widening the shell.

Acceptance:

- writes a concrete handoff for `ECO-20260416-main-302`
- identifies whether `supportBiasActive` needs a cleaner split before more UI depends on it
- keeps the pass route-feel-first rather than text-first

Completion notes:

- Added `docs/reports/2026-04-16-route-feel-extension-handoff.md`, narrowing Sprint 1 lane 4 to one beach proof on `Shore Shelter`, one forest proof on `Cool Edge`, and one small controller split so the `NOTEBOOK J` chip can reflect broader support retargeting without widening the shell.
- Bumped packet `124` to version `7`, promoted `ECO-20260416-main-302` to `READY`, and verified with `npm run validate:agents`.

### ECO-20260416-main-302

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Implement Sprint 1 route-feel extension`
- Source: `docs/reports/2026-04-16-route-feel-extension-implementation.md`
- Packet: `.agents/packets/124-front-half-memorability-and-merge-safety.json`
- Depends on: `ECO-20260416-scout-302`

Goal:

- Extend support-readable route feel to one front-half route and one forest route without widening the shell.

Acceptance:

- one front-half route and one forest route gain a player-felt support-shaped difference
- any `supportBiasActive` split needed for safety lands first
- route feel deepens without a new HUD or planner layer

Completion notes:

- Added `docs/reports/2026-04-16-route-feel-extension-implementation.md`, splitting the overloaded controller seam into `supportRetargetsInspect` and `supportPrefersActiveClue` so the existing `NOTEBOOK J` chip can read any live hand-lens inspect retarget without widening the shell.
- Landed the two ordinary route proofs on `Shore Shelter` and `Moisture Holders`, kept the stronger `LENS CLUE:` bubble limited to active-clue alternates, and verified with focused controller/runtime coverage plus `npm run build`; promoted `ECO-20260416-critic-302` to `READY`.

### ECO-20260416-critic-302

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Review Sprint 1 route-feel extension`
- Source: `docs/reports/2026-04-16-route-feel-extension-review.md`
- Packet: `.agents/packets/124-front-half-memorability-and-merge-safety.json`
- Depends on: `ECO-20260416-main-302`

Goal:

- Review whether Sprint 1 route-feel work stays readable, tactile, and structurally disciplined.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms route feel deepened through play, not text
- promotes `ECO-20260416-scout-306` if clean

Completion notes:

- Added `docs/reports/2026-04-16-route-feel-extension-review.md`, finding no blocker in the broader support-readable chip rule, the preserved active-clue-only bubble accent, or the fixed Root Hollow `Moisture Holders` proof.
- Bumped packet `124` to version `9`, marked it `DONE`, re-ran the focused controller/runtime/build/agent-validation set, and promoted `ECO-20260416-scout-306` to `READY`.

### ECO-20260416-scout-306

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Prepare Sprint 2 living-world replay variant pass`
- Source: `docs/reports/2026-04-16-living-world-replay-variant-handoff.md`
- Packet: `.agents/packets/125-make-the-living-world-matter.json`
- Depends on: `ECO-20260416-critic-302`

Goal:

- Narrow Sprint 2 lane-4 work to one front-half route and one inland route whose replay windows change what the player does.

Acceptance:

- writes a concrete handoff for `ECO-20260416-main-306`
- ties replay to process, weather, or phenology rather than a new shell
- makes the replay variant action-changing rather than text-only

Completion notes:

- Added `docs/reports/2026-04-16-living-world-replay-variant-handoff.md`, narrowed Sprint 2 to `forest-moisture-holders` as `Moist Hollow` plus `treeline-low-fell` as `Brief Bloom`, and recorded the alternate-carrier seam in packet `125`.
- Promoted `ECO-20260416-main-306` to `READY`; verification is `npm run validate:agents`.

### ECO-20260416-main-306

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Implement Sprint 2 living-world replay variant pass`
- Source: `docs/reports/2026-04-16-living-world-replay-variant-implementation.md`
- Packet: `.agents/packets/125-make-the-living-world-matter.json`
- Depends on: `ECO-20260416-scout-306`

Goal:

- Make one front-half route and one inland route replay differently through the existing living-world seams.

Acceptance:

- the replay windows change player behavior, not just route text
- no new replay HUD or planner layer appears
- the routes still file through the existing Route v2 model

Completion notes:

- Added `docs/reports/2026-04-16-living-world-replay-variant-implementation.md`, letting `forest-moisture-holders` replay as `Moist Hollow` through `tree-lungwort` / `seep-moss-mat` and `treeline-low-fell` replay as `Brief Bloom` through `moss-campion`.
- Extended the shared Route v2 replay seam so `worldStateFocus` can add alternate clue carriers, re-ran focused `field-requests` plus runtime replay slices, built successfully, and promoted `ECO-20260416-critic-306` to `READY`.

### ECO-20260416-critic-306

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Review Sprint 2 living-world replay variant pass`
- Source: `docs/reports/2026-04-16-living-world-replay-variant-review.md`
- Packet: `.agents/packets/125-make-the-living-world-matter.json`
- Depends on: `ECO-20260416-main-306`

Goal:

- Review whether the living-world replay variants change action instead of just language.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the replay windows are tactile and restrained
- leaves lane 4 ready for next-chapter planning if clean

Completion notes:

- Added `docs/reports/2026-04-16-living-world-replay-variant-review.md`, finding no blocker in the new `Moist Hollow` and `Brief Bloom` route-local alternates or the compact `worldStateFocus` seam extension.
- Bumped packet `125` to version `11`, marked it `DONE`, and promoted `ECO-20260416-scout-310` to `READY`.

### ECO-20260416-scout-310

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Prepare Sprint 3 chapter Route v2 structure`
- Source: `docs/reports/2026-04-16-high-pass-route-v2-handoff.md`
- Packet: `.agents/packets/126-open-the-next-chapter-safely.json`
- Depends on: `ECO-20260416-critic-306`

Goal:

- Narrow Sprint 3 lane-4 work to the notebook, evidence, support, filing, and replay seams for the next chapter.

Acceptance:

- writes a concrete handoff for `ECO-20260416-main-310`
- stays inside the existing Route v2 model
- keeps the chapter feeling like a real next chase, not a new quest shell

Completion notes:

- Added `docs/reports/2026-04-16-high-pass-route-v2-handoff.md`, narrowing Sprint 3 lane-4 work to one post-season `High Pass` outing in Treeline Pass with ordered `stone-lift -> lee-watch -> rime-mark -> talus-hold` evidence, a `frost-rime` replay variant, and an explicit guard that keeps the route dormant until the calm season-close return clears.
- Bumped packet `126` to version `7`, promoted `ECO-20260416-main-310` to `READY`, and retargeted the follow-on items to the concrete High Pass handoff.

### ECO-20260416-main-310

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Implement Sprint 3 chapter Route v2 structure`
- Source: `docs/reports/2026-04-16-high-pass-route-v2-implementation.md`
- Packet: `.agents/packets/126-open-the-next-chapter-safely.json`
- Depends on: `ECO-20260416-scout-310`

Goal:

- Define the next chapter's evidence, support, filing, and replay seams using the current Route v2 model.

Acceptance:

- the chapter fits the existing Route v2 structure
- support and filing remain small and readable
- players finish with a real next chapter to chase

Completion notes:

- Added `docs/reports/2026-04-16-high-pass-route-v2-implementation.md`, landing a real post-season `treeline-high-pass` Route v2 outing with ordered `stone-lift -> lee-watch -> rime-mark -> talus-hold` evidence plus the `Rimed Pass` replay variant through treeline's existing `frost-rime` process moment.
- Kept the new route dormant while `seasonCloseReturnPending` is true, replaced the old filed-season placeholder next-direction line with the real High Pass clue path, verified the activation guard and support retarget through focused request/controller/runtime coverage plus `npm run build`, and promoted `ECO-20260416-critic-310` to `READY`.

### ECO-20260416-critic-310

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Review Sprint 3 chapter Route v2 structure`
- Source: `docs/reports/2026-04-16-high-pass-route-v2-implementation.md`
- Packet: `.agents/packets/126-open-the-next-chapter-safely.json`
- Depends on: `ECO-20260416-main-310`

Goal:

- Review whether the next chapter uses the current Route v2 model cleanly and remains worth chasing.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the chapter uses the current model instead of inventing a new shell
- keeps lane 4 ready for chapter-side refinement if clean

Completion notes:

- Added `docs/reports/2026-04-16-high-pass-route-v2-review.md`, finding no blocker in the new post-season `High Pass` outing, its season-close activation guard, or the one-step hand-lens support proof.
- Rechecked the focused High Pass request/controller/board/runtime slice, closed packet `126` at version `9`, and confirmed lane 4 has no remaining actionable queue item.

### ECO-20260416-critic-300

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Review Sprint 1 Coastal Scrub identity pack`
- Source: `docs/reports/2026-04-16-coastal-scrub-identity-pack-review.md`
- Packet: `.agents/packets/124-front-half-memorability-and-merge-safety.json`
- Depends on: `ECO-20260416-main-300`

Goal:

- Review whether Coastal Scrub gained clearer identity without breaking the handheld copy budget.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the biome reads more strongly by feel
- promotes `ECO-20260416-scout-304` if clean

Completion notes:

- Added `docs/reports/2026-04-16-coastal-scrub-identity-pack-review.md`, finding no blocker in the new Coastal Scrub identity trio: the pass stayed compact, visual-first, and science-safe.
- Promoted `ECO-20260416-scout-304` to `READY`; the only watch item is the unrelated stale-worktree `vine-maple` verification noise under `.claude/worktrees/angry-zhukovsky/`.

### ECO-20260416-main-300

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Implement Sprint 1 Coastal Scrub identity pack`
- Source: `docs/reports/2026-04-16-coastal-scrub-identity-pack-implementation.md`
- Packet: `.agents/packets/124-front-half-memorability-and-merge-safety.json`
- Depends on: `ECO-20260416-scout-300`

Goal:

- Make Coastal Scrub more memorable by feel through one tight identity cluster centered on bluff, swale, and forest-edge transition.

Acceptance:

- one compact identity pack lands for Coastal Scrub
- it uses note-backed or visual carriers instead of denser notebook blocks
- Coastal Scrub reads as a place players remember, not just a connector

Completion notes:

- Added close-look cards for `beach-strawberry` and `salmonberry` to complete the existing bluff -> swale -> forest-edge memory trio around live Coastal Scrub carriers.
- Verified with `npm test -- --run src/test/close-look.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "close-look|beach-strawberry|salmonberry"`, and `npm run build`.

### ECO-20260416-scout-301

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `Prepare Sprint 1 coast-side signature pocket`
- Source: `docs/reports/2026-04-16-coast-side-signature-pocket-handoff.md`
- Packet: `.agents/packets/124-front-half-memorability-and-merge-safety.json`
- Depends on: `none`

Goal:

- Narrow Sprint 1 lane-3 work to one memorable, recoverable coast-side signature pocket using current traversal language only.

Acceptance:

- writes a concrete handoff for `ECO-20260416-main-301`
- reuses existing traversal and recovery language
- avoids new geometry families or punitive movement

Completion note:

- Added `docs/reports/2026-04-16-coast-side-signature-pocket-handoff.md`, narrowing Sprint 1 lane 3 to one scrub-owned lee shelf inside `beach-coastal-corridor` instead of reopening the already-dense Beach opener or Coastal Scrub interior bands.
- Bumped packet `124` to version `4`, added `main_301_focus` for the corridor-owned target band and guardrails, and promoted `ECO-20260416-main-301` to `READY`.
- Verification: reviewed the current Beach, Coastal Scrub, and corridor traversal chain plus focused biome/corridor/runtime proofs; `npm run validate:agents`

### ECO-20260416-main-301

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `Implement Sprint 1 coast-side signature pocket`
- Source: `docs/reports/2026-04-16-coast-side-signature-pocket-implementation.md`
- Packet: `.agents/packets/124-front-half-memorability-and-merge-safety.json`
- Depends on: `ECO-20260416-scout-301`

Goal:

- Add one memorable, recoverable coast-side signature pocket using current traversal language only.

Acceptance:

- the front half gains one signature pocket players remember by feel
- recovery stays calm and readable
- no new traversal family or punishment appears

Completion notes:

- Added `back-dune-hold-lip` and `back-dune-hold-rest` to `beach-coastal-corridor` in `src/engine/corridor.ts`, giving the scrub-owned half one compact lee shelf without reopening the Beach opener or Coastal Scrub interior bands.
- Extended `src/test/corridor.test.ts` and `src/test/runtime-smoke.test.ts` to lock the new shelf family, carrier band, and front-half `beach -> corridor shelf -> coastal-scrub` recovery path, then promoted `ECO-20260416-critic-301` to `READY`.
- Verification: `npm test -- --run src/test/corridor.test.ts src/test/runtime-smoke.test.ts -t "held back-dune shelf|reaches the beach corridor door from the inland dune side instead of the tide edge|lets the coastal door enter the first corridor proof, switches ownership at the threshold, and keeps the map alive from the menu|does not treat corridor threshold pacing as repeated visits or world-state skips|counts a corridor traversal only when the player fully exits into the neighboring biome"`; `npm run build`; shared web-game client smoke in `output/main-301-client/`; targeted Playwright proof in `output/main-301-browser/`

### ECO-20260416-critic-301

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `Review Sprint 1 coast-side signature pocket`
- Source: `docs/reports/2026-04-16-coast-side-signature-pocket-review.md`
- Packet: `.agents/packets/124-front-half-memorability-and-merge-safety.json`
- Depends on: `ECO-20260416-main-301`

Goal:

- Review whether the new coast-side signature pocket is memorable, readable, and recoverable.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the space is memorable without new movement complexity
- promotes `ECO-20260416-scout-305` if clean

Completion notes:

- Wrote [2026-04-16-coast-side-signature-pocket-review.md](/Users/trevormaxwell/Desktop/game/docs/reports/2026-04-16-coast-side-signature-pocket-review.md), found no blocker in the new scrub-owned corridor shelf, and promoted `ECO-20260416-scout-305` to `READY`.
- Rechecked the shelf-specific corridor/runtime coverage plus the seeded browser proof in `output/main-301-browser/`; the only watch item is to keep this exact corridor family at its current density ceiling.

### ECO-20260416-scout-305

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `Prepare Sprint 2 high-country relief continuation`
- Source: `docs/reports/2026-04-16-high-country-relief-continuation-handoff.md`
- Packet: `.agents/packets/125-make-the-living-world-matter.json`
- Depends on: `ECO-20260416-critic-301`

Goal:

- Narrow Sprint 2 lane-3 work to one unforgettable high-country relief continuation.

Acceptance:

- writes a concrete handoff for `ECO-20260416-main-305`
- keeps the place memorable, readable, and recoverable
- reuses current calm traversal language

Completion notes:

- Added [2026-04-16-high-country-relief-continuation-handoff.md](/Users/trevormaxwell/Desktop/game/docs/reports/2026-04-16-high-country-relief-continuation-handoff.md), narrowing the next lane-3 spend to one early-`lichen-fell` talus-island hold in Treeline Pass instead of reopening tundra or the already-solved treeline threshold bands.
- Bumped packet `125` to version `8`, added `main_305_focus`, and promoted `ECO-20260416-main-305` to `READY`.

### ECO-20260416-scout-300

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Prepare Sprint 1 Coastal Scrub identity pack`
- Source: `docs/reports/2026-04-16-coastal-scrub-identity-pack-handoff.md`
- Packet: `.agents/packets/124-front-half-memorability-and-merge-safety.json`
- Depends on: `none`

Goal:

- Narrow Sprint 1 lane-2 work to one note-backed Coastal Scrub identity cluster centered on bluff, swale, and forest-edge memory.

Acceptance:

- writes a concrete handoff for `ECO-20260416-main-300`
- prefers close-look, sketchbook, atlas, or compact note-backed support over denser notebook prose
- keeps the pack focused on place memory rather than more total facts

Completion note:

- Added `docs/reports/2026-04-16-coastal-scrub-identity-pack-handoff.md`, narrowing Sprint 1 lane-2 work to one close-look-first Coastal Scrub identity trio: keep bluff `pacific-wax-myrtle` as the anchor, then add swale `beach-strawberry` plus forest-edge `salmonberry`.
- Bumped packet `124` to version `3` with a concrete `main_300_focus`, and recorded the durable rule that this memorability pass should avoid more notebook prose or comparison sprawl.

### ECO-20260416-scout-299

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Prepare Sprint 1 merge-safety and seam-split handoff`
- Source: `docs/reports/2026-04-16-merge-safety-and-seam-split-handoff.md`
- Packet: `.agents/packets/124-front-half-memorability-and-merge-safety.json`
- Depends on: `none`

Goal:

- Narrow Sprint 1 lane-1 work into one clean-machine guardrail pass plus one protective seam split out of `game.ts` or `field-season-board`.

Acceptance:

- writes a concrete handoff for `ECO-20260416-main-299`
- keeps CI and portability work practical rather than aspirational
- names one specific runtime seam to extract before more route/station growth lands

Completion notes:

- Wrote [2026-04-16-merge-safety-and-seam-split-handoff.md](/Users/trevormaxwell/Desktop/game/docs/reports/2026-04-16-merge-safety-and-seam-split-handoff.md), narrowed the runtime split to the remaining inspect-hint projection layer in [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts), added packet focus guidance, and promoted `ECO-20260416-main-299` to `READY`.

### ECO-20260416-main-299

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Implement Sprint 1 merge-safety and seam split`
- Source: `docs/reports/2026-04-16-merge-safety-and-seam-split-implementation.md`
- Packet: `.agents/packets/124-front-half-memorability-and-merge-safety.json`
- Depends on: `ECO-20260416-scout-299`

Goal:

- Land one practical clean-machine safeguard pass and one protective runtime seam split before the next wider wave.

Acceptance:

- clean-machine guardrails exist for build, test, and agent validation
- one targeted seam moves out of a large lane-1 coordinator file
- the repo is safer to merge and easier to review

Completion notes:

- Added [2026-04-16-merge-safety-and-seam-split-implementation.md](/Users/trevormaxwell/Desktop/game/docs/reports/2026-04-16-merge-safety-and-seam-split-implementation.md), moved the inspect-hint projection seam into [field-request-controller.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-request-controller.ts), updated [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts) to consume that shared result, added one fresh-machine verification note in [README.md](/Users/trevormaxwell/Desktop/game/README.md), and verified with focused controller tests, focused runtime-smoke support-bias slices, and `npm run build`.

### ECO-20260416-critic-299

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Review Sprint 1 merge-safety and seam split`
- Source: `docs/reports/2026-04-16-merge-safety-and-seam-split-review.md`
- Packet: `.agents/packets/124-front-half-memorability-and-merge-safety.json`
- Depends on: `ECO-20260416-main-299`

Goal:

- Review whether Sprint 1 lane-1 work actually improved clean-machine safety and merge safety.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the seam split lowered risk rather than moving clutter around
- promotes `ECO-20260416-scout-303` if clean

Completion notes:

- Wrote [2026-04-16-merge-safety-and-seam-split-review.md](/Users/trevormaxwell/Desktop/game/docs/reports/2026-04-16-merge-safety-and-seam-split-review.md), found no blocker in the controller split or README guardrail pass, and promoted `ECO-20260416-scout-303` to `READY`.

### ECO-20260416-scout-303

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Prepare Sprint 2 home-place payoff and coordinator split handoff`
- Source: `docs/reports/2026-04-16-home-place-payoff-and-session-split-handoff.md`
- Packet: `.agents/packets/125-make-the-living-world-matter.json`
- Depends on: `ECO-20260416-critic-299`

Goal:

- Narrow Sprint 2 lane-1 work to one stronger home-place return payoff plus one additional coordinator-protection split.

Acceptance:

- writes a concrete handoff for `ECO-20260416-main-303`
- keeps payoff inside the existing station shell
- names one further split out of a large coordinator file

Completion notes:

- Wrote [2026-04-16-home-place-payoff-and-session-split-handoff.md](/Users/trevormaxwell/Desktop/game/docs/reports/2026-04-16-home-place-payoff-and-session-split-handoff.md), narrowed the payoff to the existing field-station arrival pulse plus shell accents, targeted the next split at the field-station open-session cluster in [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts), and promoted `ECO-20260416-main-303` to `READY`.

### ECO-20260416-main-303

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Implement Sprint 2 home-place payoff and coordinator split`
- Source: `docs/reports/2026-04-16-home-place-payoff-and-session-split-implementation.md`
- Packet: `.agents/packets/125-make-the-living-world-matter.json`
- Depends on: `ECO-20260416-scout-303`

Goal:

- Make the station feel more earned after outings and continue coordinator decomposition without widening the shell.

Acceptance:

- one visible return payoff lands inside the current station shell
- one additional protective split lands out of a large coordinator
- the home loop feels more earned without another nursery surgery pass

Completion notes:

- Added [2026-04-16-home-place-payoff-and-session-split-implementation.md](/Users/trevormaxwell/Desktop/game/docs/reports/2026-04-16-home-place-payoff-and-session-split-implementation.md), extracted the field-station open-session seam into [field-station-session.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-station-session.ts), carried `arrivalMode` through [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts) and [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts), and verified with focused field-station tests, overlay-copy tests, the field-station runtime-smoke slice, and `npm run build`.

### ECO-20260416-critic-303

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Review Sprint 2 home-place payoff and coordinator split`
- Source: `docs/reports/2026-04-16-home-place-payoff-and-session-split-review.md`
- Packet: `.agents/packets/125-make-the-living-world-matter.json`
- Depends on: `ECO-20260416-main-303`

Goal:

- Review whether the home loop feels more earned and the coordinator risk is lower.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the payoff stays inside the current shell
- promotes `ECO-20260416-scout-307` if clean

Completion notes:

- Wrote [2026-04-16-home-place-payoff-and-session-split-review.md](/Users/trevormaxwell/Desktop/game/docs/reports/2026-04-16-home-place-payoff-and-session-split-review.md), found no blocker in the shell payoff or the station-session split, and promoted `ECO-20260416-scout-307` to `READY`.

### ECO-20260406-critic-298

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Review the support-readable route-feel pass`
- Source: `docs/reports/2026-04-06-support-readable-route-feel-review.md`
- Packet: `.agents/packets/123-support-readable-route-feel-phase.json`
- Depends on: `ECO-20260406-main-298`

Goal:

- Review whether support choice is now easier to feel in motion and whether the route-feel seam is more maintainable.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the cue stays tiny and helpful
- leaves the next route-feel wave ready only if the pass is both player-readable and structurally cleaner

Completion Notes:

- Clean review. The cue stays inside the existing top-right `NOTEBOOK J` chip, the implementation reuses the inspect-target seam cleanly, and the focused controller/runtime proof covers both `Thaw Window` and `Held Sand`.
- Logged one non-blocking watch item: split `supportBiasActive` later if a future pass needs to distinguish a true nearest-target override from the broader active preferred-clue state.
- Packet `123` is now version `4` and `DONE`; lane 4 has no remaining actionable queue item after re-running the focused vitest slice and `npm run validate:agents`.

### ECO-20260406-main-298

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Surface support-biased clue finding in play`
- Source: `docs/reports/2026-04-06-support-readable-route-feel-implementation.md`
- Packet: `.agents/packets/123-support-readable-route-feel-phase.json`
- Depends on: `ECO-20260406-scout-298`, `ECO-20260406-critic-292`

Goal:

- Make the new support-shaped route differentiation easier to feel at a glance by pairing one tiny live cue with the protected inspect-target seam.

Acceptance:

- active support-biased clue finding is readable in play without opening a new HUD
- `Thaw Window` and `Held Sand` remain the only proof routes touched in this wave
- focused tests plus one seeded browser/state proof cover the cue and route behavior together

Completion note:

- Added `docs/reports/2026-04-06-support-readable-route-feel-implementation.md`, keeping the pass inside the existing `NOTEBOOK J` chip rather than widening any board, strip, or bubble surface.
- `field-request-state.ts`, `field-request-controller.ts`, `overlay-render.ts`, and `game.ts` now share one tiny `support-biased` hint-chip variant driven by the extracted inspect-target selection seam, while `Thaw Window` and `Held Sand` remain the only live proof routes.
- Promoted `ECO-20260406-critic-298` to `READY`, bumped packet `123` to version `3`, and verified with `npx vitest run src/test/field-request-controller.test.ts`, `npx vitest run src/test/runtime-smoke.test.ts -t "woolly lousewort|Held Sand clue|thaw-window bloom|beach grass as the Held Sand clue|nearer thaw-skirt inspectable|nearer back-dune inspectable"`, and `npm run build`.

### ECO-20260406-critic-292

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Review the inspect-target helper extraction`
- Source: `docs/reports/2026-04-06-support-readable-route-feel-phase.md`
- Packet: `.agents/packets/120-inspect-target-controller-protection-phase.json`
- Depends on: `ECO-20260406-main-292`

Goal:

- Review whether the new seam lowers coordination risk without changing support-feel behavior.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the helper owns the right logic without becoming another giant wrapper
- promotes `ECO-20260406-main-298` if clean

Completion note:

- Added `docs/reports/2026-04-06-inspect-target-helper-review.md`, finding no blocker in the extracted seam: support-biased target selection plus the paired debug projection now share one compact helper in `field-request-controller.ts`.
- Marked packet `120` as `DONE` and promoted `ECO-20260406-main-298` to `READY` per the queue gate.
- Verification: reviewed the focused implementation diff and the recorded main-pass verification set; `npm run validate:agents`

### ECO-20260406-scout-294

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Prepare the compact support-cue copy and icon handoff`
- Source: `docs/reports/2026-04-06-support-cue-copy-handoff.md`
- Packet: `.agents/packets/121-support-cue-copy-and-visibility-phase.json`
- Depends on: `none`

Goal:

- Prepare one tiny player-facing cue that makes active support-biased clue finding readable at a glance without widening the station shell, route HUD, or notebook card density.

Acceptance:

- writes a concrete handoff for `ECO-20260406-main-294`
- keeps the cue inside an existing handheld-safe seam
- defines strict copy and visual budget guardrails for `256x160`

Completion note:

- Added `docs/reports/2026-04-06-support-cue-copy-handoff.md`, narrowing the first support-readable cue to the inspect bubble's existing accent line instead of the route strip, season board, or notebook shell.
- Bumped packet `121` to version `2` with a concrete `main-294` focus: use a stronger one-line label only when `hand-lens` is selected and the inspected entry is the active support-preferred clue, while generic notebook-fit bubbles stay on the calmer existing path.

### ECO-20260406-main-294

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Add one tiny support-biased clue cue`
- Source: `docs/reports/2026-04-06-support-cue-copy-implementation.md`
- Packet: `.agents/packets/121-support-cue-copy-and-visibility-phase.json`
- Depends on: `ECO-20260406-scout-294`

Goal:

- Add one tiny existing-seam cue that makes active support-biased clue finding more readable at a glance during live route play.

Acceptance:

- the cue fits comfortably at `256x160`
- it clarifies when active support is biasing clue finding without turning into a new HUD
- copy and visuals stay calmer than a route card or notebook surface

Completion note:

- Added `docs/reports/2026-04-06-support-cue-copy-implementation.md`, shipping the first support-readable cue in the inspect bubble's existing accent line instead of widening any route, board, or notebook seam.
- `src/engine/field-request-controller.ts` now formats the bubble note through `getInspectBubbleResourceNote(...)`, promoting active hand-lens winners to `LENS CLUE: <slot>` while leaving ordinary notebook fits on their calmer existing copy path.
- Verified with `npm test -- --run src/test/field-request-controller.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "woolly lousewort|Held Sand clue|thaw-window bloom|beach grass as the Held Sand clue"`, and `npm run build`.

### ECO-20260406-critic-294

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Review the support-biased clue cue`
- Source: `docs/reports/2026-04-06-support-cue-copy-review.md`
- Packet: `.agents/packets/121-support-cue-copy-and-visibility-phase.json`
- Depends on: `ECO-20260406-main-294`

Goal:

- Review whether the new cue makes the support win easier to feel without crowding the handheld shell.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the cue is readable and light
- leaves lane 2 clear if no follow-on is needed

Completion note:

- Added `docs/reports/2026-04-06-support-cue-copy-review.md`, finding no blocker in the cue: it stays inside the inspect bubble's existing accent line, limits the stronger label to active hand-lens winners, and keeps the proof scoped to `Thaw Window` plus `Held Sand`.
- Closed packet `121` as `DONE`; lane 2 has no further actionable queue item after this review.

### ECO-20260406-main-292

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Extract inspect-target support logic into a dedicated helper seam`
- Source: `docs/reports/2026-04-06-support-readable-route-feel-phase.md`
- Packet: `.agents/packets/120-inspect-target-controller-protection-phase.json`
- Depends on: `ECO-20260406-scout-292`

Goal:

- Move support-biased inspect-target selection and its small debug export farther out of `game.ts` so future route-feel work extends a stable seam instead of the coordinator.

Acceptance:

- the chosen helper or controller owns the support-biased target-selection rules
- live `Thaw Window` and `Held Sand` behavior stays unchanged
- focused tests cover the extracted seam and `game.ts` shrinks in responsibility

### ECO-20260406-scout-292

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Prepare the inspect-target helper extraction handoff`
- Source: `docs/reports/2026-04-06-support-readable-route-feel-phase.md`
- Packet: `.agents/packets/120-inspect-target-controller-protection-phase.json`
- Depends on: `none`

Goal:

- Prepare one small controller split that moves support-biased inspect targeting and debug export farther out of `game.ts` without changing live route behavior.

Acceptance:

- writes a concrete handoff for `ECO-20260406-main-292`
- names the exact helper or controller boundary to extract
- keeps scope away from new HUD, new support systems, or broader coordinator surgery

Completion notes:

- Added `docs/reports/2026-04-06-inspect-target-helper-handoff.md`, narrowing the split to `getNearestInspectable()` plus the matching render/debug `nearestEntityId` and `nearestInspectableEntityId` projection seam.
- Bumped packet `120` to version `2` with the exact recommended hotspots so the main pass can extract one small inspect-target helper instead of widening route or overlay scope.

### ECO-20260405-main-291

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Tighten the thaw-window hand-lens difference into a player-felt live proof`
- Source: `docs/reports/2026-04-05-thaw-window-hand-lens-follow-on-implementation.md`
- Packet: `.agents/packets/119-living-world-route-differentiation-phase.json`
- Depends on: `ECO-20260405-critic-289`

Goal:

- Keep the same `Thaw Window` route and `woolly-lousewort` alternate carrier, but make the live support choice meaningfully change which thaw-window clue the player is naturally pulled toward.

Acceptance:

- `hand-lens` materially changes live clue targeting inside the active thaw-skirt window
- the behavior stays scoped to the current next slot and active live process
- runtime-smoke proves the `hand-lens` versus non-`hand-lens` difference without adding a new HUD or notebook branch

Completion note:

- Added `docs/reports/2026-04-05-thaw-window-hand-lens-follow-on-implementation.md`, tightening the existing hand-lens targeting seam so active process-only alternates can win within the current next slot without turning into a broader notebook-fit heuristic.
- The focused controller, route-fit, and runtime comparison tests now prove `hand-lens` prefers `woolly-lousewort` during active `Thaw Window`, while the non-`hand-lens` comparison support still does not auto-snap to that clue.
- Bumped packet `119` to version `5` and verified with `npx vitest run src/test/field-request-controller.test.ts src/test/field-requests.test.ts -t "thaw-window|woolly-lousewort|hand lens|Notebook fit"`, `npx vitest run src/test/runtime-smoke.test.ts -t "woolly lousewort|thaw-window bloom|thaw-window route replay note"`, and `npm run build`

### ECO-20260406-scout-296

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Prepare the light-band readability regression handoff`
- Source: `docs/reports/2026-04-06-light-band-regression-protection-handoff.md`
- Packet: `.agents/packets/122-light-band-regression-protection-phase.json`
- Depends on: `none`

Goal:

- Prepare one tiny regression-protection pass that keeps the thaw-skirt and back-dune proof bands readable while the new support cue lands.

Acceptance:

- writes a concrete handoff for `ECO-20260406-main-296`
- avoids new geometry or landmark growth
- focuses on recoverability, visibility, or proof coverage only

Completion note:

- Added `docs/reports/2026-04-06-light-band-regression-protection-handoff.md`, narrowing the lane-3 cooldown wave to runtime-smoke protection of the live `Thaw Window` thaw-skirt shelf and `Held Sand` back-dune shelf instead of more geometry.
- Bumped packet `122` to version `2`, adding a runtime-only `main_296_focus` that protects same-band readability, nearby alternatives, and recoverability before inspect.
- Verification: `npm run validate:agents` was attempted, but the queue still carries unrelated lane-4 status drift and packet `123` parse issues.

### ECO-20260406-main-296

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Protect the light-band proofs from readability regressions`
- Source: `docs/reports/2026-04-06-light-band-regression-protection-implementation.md`
- Packet: `.agents/packets/122-light-band-regression-protection-phase.json`
- Depends on: `ECO-20260406-scout-296`

Goal:

- Keep the thaw-skirt and back-dune proof bands readable and recoverable while the support-readable cue lands elsewhere.

Acceptance:

- any touched proof bands stay cozy and easy to recover through
- no new geometry or authored density is added
- focused runtime or browser proof protects the unchanged route-feel spaces

Completion note:

- Tightened the existing `Thaw Window` and `Held Sand` runtime-smoke proofs so they now lock same-band shelf position, visible nearby alternatives, and local recoverability before inspect.
- Kept the pass runtime-only with no biome geometry or authored density changes.
- Verification: `npm test -- --run src/test/runtime-smoke.test.ts -t "lets hand lens prefer woolly lousewort as the thaw-window bloom clue on the live thaw-skirt shelf|keeps non-hand-lens supports on the nearer thaw-skirt inspectable in the same thaw-window bloom setup|lets hand lens prefer beach grass as the Held Sand clue on the live back-dune shelf|keeps non-hand-lens supports on the nearer back-dune inspectable in the same Held Sand shelf setup"`; `npm run build`

### ECO-20260406-critic-296

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Review the light-band regression protection pass`
- Source: `docs/reports/2026-04-06-light-band-regression-protection-review.md`
- Packet: `.agents/packets/122-light-band-regression-protection-phase.json`
- Depends on: `ECO-20260406-main-296`

Goal:

- Review whether the proof bands stayed calm and readable while the broader route-feel work advanced.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms no fresh density or geometry creep appeared
- leaves lane 3 clear again if clean

Completion note:

- Added `docs/reports/2026-04-06-light-band-regression-protection-review.md`, finding no blocker in the runtime-only cooldown pass.
- Confirmed the proof shelves stay local, readable, and support-comparison-safe without reopening authored geometry.
- Verification: reviewed the updated runtime-smoke coverage, `npm run build`, and `npm run validate:agents`

### ECO-20260405-critic-291

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Review the thaw-window hand-lens follow-on`
- Source: `docs/reports/2026-04-05-thaw-window-hand-lens-follow-on-review.md`
- Packet: `.agents/packets/119-living-world-route-differentiation-phase.json`
- Depends on: `ECO-20260405-main-291`

Goal:

- Review whether the tightened thaw-window follow-on now makes the first living-world proof genuinely felt in play.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the support-shaped difference is now live, not only broader route permissiveness
- promotes `ECO-20260405-scout-290` if clean

Completion note:

- Added `docs/reports/2026-04-05-thaw-window-hand-lens-follow-on-review.md`, finding no blocker in the follow-on: `hand-lens` now changes the actual inspected clue during active `Thaw Window`, while non-`hand-lens` supports still keep the normal nearer-inspectable behavior.
- Promoted `ECO-20260405-scout-290` to `READY`, bumped packet `119` to version `6`, and updated project memory so the durable rule matches the now-live slot-local process-backed hand-lens preference.
- Verification: reviewed `src/engine/field-requests.ts`, `src/engine/field-request-controller.ts`, `src/engine/game.ts`, `src/test/field-request-controller.test.ts`, `src/test/field-requests.test.ts`, and `src/test/runtime-smoke.test.ts`; `npx vitest run src/test/field-request-controller.test.ts src/test/field-requests.test.ts -t "thaw-window|woolly-lousewort|hand lens|Notebook fit"`; `npx vitest run src/test/runtime-smoke.test.ts -t "woolly lousewort|thaw-window bloom|thaw-window route replay note"`

### ECO-20260405-scout-290

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Prepare the second living-world route-differentiation handoff`
- Source: `docs/reports/2026-04-05-held-sand-hand-lens-second-proof-handoff.md`
- Packet: `.agents/packets/119-living-world-route-differentiation-phase.json`
- Depends on: `ECO-20260405-critic-291`

Goal:

- Narrow the next lane-4 route-feel move to either a second lighter-weight biome proof or a cleanup that simplifies a support still not pulling its weight.

Acceptance:

- writes a concrete handoff for `ECO-20260405-main-290`
- chooses between a second proof and a simplification follow-on
- avoids another text-surface answer

Completion note:

- Added `docs/reports/2026-04-05-held-sand-hand-lens-second-proof-handoff.md`, narrowing the next pass to one Coastal Scrub reuse proof: active `Held Sand` already has the right `beach-grass` alternate, and a live back-dune shelf already exists where that carrier can compete against nearer non-fit inspectables.
- Promoted `ECO-20260405-main-290` to `READY`, retargeted `ECO-20260405-critic-290` to the same handoff, and bumped packet `119` to version `7` with a concrete `main_290_focus` around the existing Held Sand back-dune proof instead of another new route rule.
- Verification: reviewed the live Held Sand route/support/runtime seams plus an ad hoc coastal-scrub probe confirming the back-dune comparison shelf, then ran `npm run validate:agents`

### ECO-20260405-main-290

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Implement the second living-world route-differentiation proof or simplification`
- Source: `docs/reports/2026-04-05-held-sand-hand-lens-second-proof-implementation.md`
- Packet: `.agents/packets/119-living-world-route-differentiation-phase.json`
- Depends on: `ECO-20260405-scout-290`

Goal:

- Extend the route-feel direction to one second light band or simplify one weak support seam exposed by the first proof.

Acceptance:

- the second pass either broadens or sharpens route differentiation in a player-felt way
- no new HUD, route board, or support slot appears
- the implementation keeps the route system calm and compact

Completion note:

- Added `docs/reports/2026-04-05-held-sand-hand-lens-second-proof-implementation.md`, proving the now-live slot-local hand-lens preference seam reuses cleanly on Coastal Scrub's `Held Sand` route without adding another route rule.
- Added a Held Sand controller regression in `src/test/field-request-controller.test.ts`, a deterministic back-dune runtime proof in `src/test/runtime-smoke.test.ts`, and one tiny debug-state field in `src/engine/game.ts` so the smoke harness can observe the real `e` target chosen by the live keyboard path.
- Promoted `ECO-20260405-critic-290` to `READY`, bumped packet `119` to version `8`, and verified with `npx vitest run src/test/field-request-controller.test.ts -t "Held Sand|process-only alternates|active process-only"`, `npx vitest run src/test/runtime-smoke.test.ts -t "Held Sand clue on the live back-dune shelf|same Held Sand shelf setup|Held Sand replay window|held-sand route replay note"`, `npx vitest run src/test/field-request-controller.test.ts src/test/runtime-smoke.test.ts -t "Held Sand|back-dune shelf|held-sand route replay note|same Held Sand shelf setup|process-only alternates"`, and `npm run build`

### ECO-20260405-critic-290

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Review the second living-world route-differentiation proof or simplification`
- Source: `docs/reports/2026-04-05-held-sand-hand-lens-second-proof-review.md`
- Packet: `.agents/packets/119-living-world-route-differentiation-phase.json`
- Depends on: `ECO-20260405-main-290`

Goal:

- Review whether the second living-world route-differentiation proof still feels clean, tactile, and worth reusing after a second live band.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the second proof is still player-felt rather than only controller-deep
- leaves lane 4 ready for the next route-feel wave if clean

Completion note:

- Added `docs/reports/2026-04-05-held-sand-hand-lens-second-proof-review.md`, finding no blocking issues in the second living-world proof.
- Confirmed the Held Sand pass is still player-felt in the live keyboard path, that the tiny `nearestInspectableEntityId` debug export stays appropriately test-scoped, and that the deterministic back-dune shelf harness is narrow enough for this route-local proof.
- Closed packet `119` at version `9`, leaving lane 4 with no remaining active queue item after re-running the focused controller and runtime Held Sand checks plus `npm run validate:agents`.

### ECO-20260406-scout-298

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Prepare the support-readable route-feel handoff`
- Source: `docs/reports/2026-04-06-support-readable-route-feel-handoff.md`
- Packet: `.agents/packets/123-support-readable-route-feel-phase.json`
- Depends on: `none`

Goal:

- Prepare one coherent pass that surfaces active support-biased inspect behavior to the player and keeps future route-feel work off the main coordinator.

Acceptance:

- writes a concrete handoff for `ECO-20260406-main-298`
- locks the first cue seam and first route proofs to protect
- keeps the pass as one readable wave rather than three unrelated tweaks

Completion note:

- Added `docs/reports/2026-04-06-support-readable-route-feel-handoff.md`, narrowing the pass to the existing top-right `NOTEBOOK J` field-request hint chip instead of the purchase strip, bubble-only copy, or a new HUD seam.
- Bumped packet `123` to version `2`, added a concrete `main_298_focus`, and retargeted `ECO-20260406-main-298` to the new handoff so the implementation can stay route-local and pair cleanly with lane 1's extracted inspect-target seam once `ECO-20260406-critic-292` lands.
- Verification: reviewed the live field-request hint, controller, and debug-state seams plus packet alignment, then ran `npm run validate:agents`, which now fails only on unrelated lane-3 packet `122` / queue-section issues (`ECO-20260406-scout-296`, `ECO-20260406-main-296`).

### ECO-20260405-critic-280

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Review the route-differentiation helper seam`
- Source: `docs/reports/2026-04-05-route-differentiation-controller-phase.md`
- Packet: `.agents/packets/116-route-differentiation-controller-phase.json`
- Depends on: `ECO-20260405-main-280`

Goal:

- Review whether the helper split lowers coordination risk without changing route-feel behavior or widening docs scope.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the extracted seam is appropriately small and behavior-preserving
- leaves lane 1 ready for the next route-feel support wave if clean

Completion notes:

- Added `docs/reports/2026-04-05-route-differentiation-controller-review.md`, finding no blocker in the controller split: route-state reads, hand-lens notebook-fit gating, and outing-support notice copy now share one compact helper seam outside `game.ts`.
- Marked packet `116` as `DONE`; the only watch item is to keep future route-feel follow-ons in this helper seam instead of regrowing a second wrapper cluster in the coordinator.
- Verification: reviewed `src/engine/field-request-controller.ts`, `src/engine/game.ts`, `src/test/field-request-controller.test.ts`, and the recorded main-pass verification set; `npm run validate:agents`

### ECO-20260405-main-280

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Implement one route-differentiation helper seam and the review-drop packaging note`
- Source: `docs/reports/2026-04-05-route-differentiation-controller-phase.md`
- Packet: `.agents/packets/116-route-differentiation-controller-phase.json`
- Depends on: `ECO-20260405-scout-280`

Goal:

- Extract one small helper seam around live route differentiation and add one explicit review-drop packaging note so future external archives stay portable.

Acceptance:

- one pure or mostly-pure helper reduces route-differentiation pressure inside `game.ts`
- current live support and route behavior stay unchanged
- repo docs tell future reviewers to omit `node_modules` in shared archives

Completion notes:

- Added `src/engine/field-request-controller.ts` so route-state reads, hand-lens notebook-fit gating, and outing-support notice copy no longer have to grow inside `game.ts`.
- Updated `README.md` with the short external-review packaging note to omit `node_modules/`, and added `src/test/field-request-controller.test.ts` to lock the new helper seam.
- Verification: `npm test -- --run src/test/field-request-controller.test.ts src/test/field-requests.test.ts`; `npm test -- --run src/test/field-request-controller.test.ts src/test/field-requests.test.ts src/test/runtime-smoke.test.ts -t "opens the world map on the outing target when route marker is already selected|buys route marker after the movement pair and lets the support row activate it on the world map|switches the route board to treeline and can hand the outing guide to route marker|switches the route board to tundra and can hand the outing guide to route marker|switches the route board to coastal scrub and can hand the outing guide to route marker"`; `npm run build`

### ECO-20260405-scout-289

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Prepare the first living-world route-differentiation handoff`
- Source: `docs/reports/2026-04-05-living-world-route-differentiation-handoff.md`
- Packet: `.agents/packets/119-living-world-route-differentiation-phase.json`
- Depends on: `none`

Goal:

- Choose the first strong tactile route-feel proof in a lighter-weight biome band, defaulting to Tundra unless Coastal Scrub is clearly cleaner.

Acceptance:

- writes a concrete handoff for `ECO-20260405-main-289`
- identifies how support choice plus world-state should change in-world clue finding, reading, or approach
- keeps the station shell and route identity unchanged

Completion note:

- Added `docs/reports/2026-04-05-living-world-route-differentiation-handoff.md`, narrowing the first proof to `tundra-short-season` during `Thaw Window` by letting `woolly-lousewort` act as a same-band alternate `first-bloom` carrier only in the active thaw-fringe window.
- Bumped packet `119` to version `2`, added a concrete `main_289_focus` around that hand-lens-friendly thaw-window bloom carrier, and kept the fallback second-wave note aimed at `Held Sand` only if the first proof still leaves a support feeling thin.
- Verification: `npm run validate:agents`

### ECO-20260405-main-289

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Implement the first living-world route-differentiation proof`
- Source: `docs/reports/2026-04-05-living-world-route-differentiation-implementation.md`
- Packet: `.agents/packets/119-living-world-route-differentiation-phase.json`
- Depends on: `ECO-20260405-scout-289`

Goal:

- Make one existing outing materially more tactile in play by letting support choice plus living-world state change how the player finds, reads, or approaches a clue inside the chosen lighter-weight biome band.

Acceptance:

- the chosen route feels meaningfully different in live play, not only in strip text
- route identity and station shell stay stable
- runtime-smoke plus one browser seed protect the new behavior

Completion note:

- Added `docs/reports/2026-04-05-living-world-route-differentiation-implementation.md`, making `woolly-lousewort` a live-only `first-bloom` carrier for `tundra-short-season` during `thaw-fringe` while keeping the route titled `Thaw Window` in play and `Short Season` when filed.
- Focused coverage now proves the alternate carrier in `src/test/field-requests.test.ts`, the live route can record it from the thaw-skirt shelf in `src/test/runtime-smoke.test.ts`, and the non-`hand-lens` keyboard path still does not auto-snap to that alternate carrier.
- Bumped packet `119` to version `3` and verified with `npx vitest run src/test/field-requests.test.ts -t "woolly-lousewort|tundra-short-season|Thaw Window"`, `npx vitest run src/test/runtime-smoke.test.ts -t "woolly lousewort|thaw-window bloom|thaw-window route replay note"`, `npm run build`, seeded browser proof in `output/lane-4-main-289-browser/tundra-thaw-window.png`, clean browser console in `output/lane-4-main-289-browser/console-errors.json`, and a live Playwright state check confirming `thaw-skirt` plus nearby `woolly-lousewort` during active `thaw-fringe`.

### ECO-20260405-critic-289

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Review the first living-world route-differentiation proof`
- Source: `docs/reports/2026-04-05-living-world-route-differentiation-review.md`
- Packet: `.agents/packets/119-living-world-route-differentiation-phase.json`
- Depends on: `ECO-20260405-main-289`

Goal:

- Review whether the first tactile route-feel proof materially improves play without growing more UI or route complexity.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the change is felt in the world, not just described
- promotes `ECO-20260405-scout-290` if clean

Completion note:

- Added `docs/reports/2026-04-05-living-world-route-differentiation-review.md`, finding one blocker: the route now accepts `woolly-lousewort`, but the live proof still does not make `hand-lens` materially change how the player finds the thaw-window clue.
- Inserted the narrow follow-on pair `ECO-20260405-main-291` / `ECO-20260405-critic-291` ahead of the second-wave scout so packet `119` can finish the first player-felt proof before it expands.
- Verification: reviewed `src/engine/field-requests.ts`, `src/test/field-requests.test.ts`, `src/test/runtime-smoke.test.ts`, `docs/reports/2026-04-05-living-world-route-differentiation-implementation.md`, and the seeded browser artifact in `output/lane-4-main-289-browser/tundra-thaw-window.png`

### ECO-20260405-scout-280

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Prepare the route-differentiation controller split handoff`
- Source: `docs/reports/2026-04-05-route-differentiation-controller-phase.md`
- Packet: `.agents/packets/116-route-differentiation-controller-phase.json`
- Depends on: `none`

Goal:

- Narrow one exact helper seam so the next tactile route-feel pass does not pile more logic back into `game.ts`.

Acceptance:

- writes a concrete handoff for `ECO-20260405-main-280`
- identifies one exact seam across the live route-differentiation path
- names one short review-drop truth update if needed

Completion notes:

- Wrote the concrete seam handoff in `docs/reports/2026-04-05-route-differentiation-controller-handoff.md`, narrowing the split to the field-request wrapper cluster and inline hand-lens notebook-fit checks in `game.ts`.
- Clarified packet `116` with the recommended hotspots and the short `README.md` packaging note target for the later main pass.

### ECO-20260405-critic-278

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Review the reward-surfacing follow-on`
- Source: `docs/reports/2026-04-05-nursery-utility-surfacing-review.md`
- Packet: `.agents/packets/115-home-loop-beat-separation-phase.json`
- Depends on: `ECO-20260405-main-278`

Goal:

- Review whether the home-loop payoff is easier to feel without turning the station into a busier shell.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the payoff is clearer and the nursery card is calmer
- leaves lane 4 ready for the next route-feel wave if clean

Completion note:

- Added `docs/reports/2026-04-05-nursery-utility-surfacing-review.md`, finding no blocker in the compost-notice reward seam: the payoff moved onto one calm existing action and left the teaching-bed card focused on plant and reflection beats.
- Marked packet `115` version `7` as `DONE` and recorded the compost-notice utility rule in project memory so future nursery utility follow-ons keep landing outside the crowded bed.
- Verification: reviewed the focused diff plus `npx vitest run src/test/runtime-smoke.test.ts -t "prefers the authored crowberry utility line in the compost notice once unlocked|opens the nursery tab and starts one teaching-bed project from the field station|shows a mature teaching bed in the nursery and lets Enter clear it"`, `npm run build`, `npm run validate:agents`

### ECO-20260405-main-278

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Implement one compact reward-surfacing seam outside the crowded nursery card`
- Source: `docs/reports/2026-04-05-nursery-utility-surfacing-implementation.md`
- Packet: `.agents/packets/115-home-loop-beat-separation-phase.json`
- Depends on: `ECO-20260405-scout-278`

Goal:

- Move one home-loop reward or utility cue into a clearer, calmer seam so the nursery card can stay focused.

Acceptance:

- one payoff becomes easier to notice outside the crowded card
- no new dashboard or inventory surface appears
- the station remains calm and compact

Completion note:

- Updated `src/engine/game.ts` so the existing `COMPOST HEAP` notice now prefers the authored `utilityNote` when crowberry utility is unlocked, while the generic compost-rate line remains the fallback when no utility reward exists.
- Extended `src/test/runtime-smoke.test.ts` with a live nursery proof for the unlocked crowberry payoff and tightened the authored-platform helper typing in that shared smoke file so the focused verification and build run clean again.
- Verification: `npx vitest run src/test/runtime-smoke.test.ts -t "opens the nursery tab and starts one teaching-bed project from the field station|shows a mature teaching bed in the nursery and lets Enter clear it|prefers the authored crowberry utility line in the compost notice once unlocked"`, `npm run build`

### ECO-20260405-critic-273

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Review the nursery copy-budget pass`
- Source: `docs/reports/2026-04-05-nursery-copy-budget-review.md`
- Packet: `.agents/packets/113-nursery-reflection-and-copy-budget-phase.json`
- Depends on: `ECO-20260405-main-273`

Goal:

- Review whether the nursery now teaches clearly without crowding the handheld frame.

Acceptance:

- records findings or a clean review in `docs/reports/`
- checks stocked and mature language against the new copy caps
- promotes `ECO-20260405-scout-274` if clean

Completion note:

- Added `docs/reports/2026-04-05-nursery-copy-budget-review.md`, finding one blocking live-renderer mismatch: the dedicated nursery page still uses the older ready CTA sentence and mature reward-copy body instead of the newly authored `summary`, `stageSummaryByStage.mature`, and `memorySummary` beats.
- Bumped packet `113` to version `3`, inserted `ECO-20260405-main-279` plus `ECO-20260405-critic-279` ahead of the naming-cleanup wave, and kept `ECO-20260405-scout-274` blocked until the live nursery page reflects the authored copy-role split.
- Verification: reviewed `src/engine/nursery.ts` and `src/engine/field-station-nursery-page.ts`; `npm test -- --run src/test/nursery.test.ts src/test/content-quality.test.ts`; rechecked `output/lane-2-main-273-browser/`

### ECO-20260405-main-279

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Wire the authored copy-role split into the live nursery page`
- Source: `docs/reports/2026-04-05-live-nursery-copy-role-implementation.md`
- Packet: `.agents/packets/113-nursery-reflection-and-copy-budget-phase.json`
- Depends on: `ECO-20260405-critic-273`

Goal:

- Make the dedicated nursery page actually use the new ready and mature authored beat model instead of older fallback copy.

Acceptance:

- affordable ready selected beds use `summary` in the teaching-bed body instead of the old generic CTA sentence
- selected mature beds use `stageSummaryByStage.mature` in the body and `memorySummary` in the footer when present
- a focused renderer or runtime check proves the live nursery page matches the authored copy-role split

Completion note:

- Added `docs/reports/2026-04-05-live-nursery-copy-role-implementation.md`, correcting the live nursery page helper so ready selected beds now use `summary`, active beds use the authored stage beat, and mature selected beds now pair `stageSummaryByStage.mature` with `memorySummary` instead of the older reward-copy body.
- Extended `src/test/field-station-nursery-page.test.ts` with explicit ready and mature copy assertions on the dedicated renderer seam, keeping the narrower `src/test/nursery.test.ts` and `src/test/content-quality.test.ts` coverage intact.

### ECO-20260405-critic-279

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Review the live nursery-page copy-role correction`
- Source: `docs/reports/2026-04-05-live-nursery-copy-role-review.md`
- Packet: `.agents/packets/113-nursery-reflection-and-copy-budget-phase.json`
- Depends on: `ECO-20260405-main-279`

Goal:

- Review whether the dedicated nursery page now reflects the authored copy-role split for ready and mature bed states.

Acceptance:

- records findings or a clean review in `docs/reports/`
- checks the live ready and mature selected-bed states against the authored beat model
- promotes `ECO-20260405-scout-274` if clean

Completion note:

- Added `docs/reports/2026-04-05-live-nursery-copy-role-review.md`, finding no blocker in the live nursery renderer once the ready and mature selected-bed paths were rechecked against the authored beat model.
- Promoted `ECO-20260405-scout-274` to `READY` so lane 2 can narrow the remaining wording cleanup to one compact naming or reward-copy seam.
- Verification: reviewed `src/engine/field-station-nursery-page.ts`; `npm test -- --run src/test/field-station-nursery-page.test.ts src/test/runtime-smoke.test.ts -t "opens the nursery tab and starts one teaching-bed project from the field station|shows a mature teaching bed in the nursery and lets Enter clear it"`; `npm run build`

### ECO-20260405-scout-274

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Prepare one nursery naming or reward-copy cleanup handoff`
- Source: `docs/reports/2026-04-05-nursery-naming-cleanup-handoff.md`
- Packet: `.agents/packets/113-nursery-reflection-and-copy-budget-phase.json`
- Depends on: `ECO-20260405-critic-279`

Goal:

- Narrow the remaining home-loop wording cleanup to one compact naming or reward-copy seam.

Acceptance:

- writes a concrete handoff for `ECO-20260405-main-274`
- names one wording mismatch or older label family to clean up
- avoids broadening the station or route-board copy

Completion note:

- Added `docs/reports/2026-04-05-nursery-naming-cleanup-handoff.md`, narrowing the next lane-2 pass to two clearly stale unlock-summary labels in `src/engine/nursery.ts`: `Coastal Shelter` should become `Open To Shelter`, and `Treeline Shelter` should become `Stone Shelter`.
- Left the `Short Season` / `Thaw Window` dual-title contract explicitly out of scope for this tiny pass, since `Short Season` still remains the stable filed-note identity elsewhere in the live game.
- Promoted `ECO-20260405-main-274` to `READY` and updated packet `113` to version `5` with the narrower `main_274_focus` seam.

### ECO-20260405-main-274

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Implement one compact nursery naming or reward-copy cleanup`
- Source: `docs/reports/2026-04-05-nursery-naming-cleanup-implementation.md`
- Packet: `.agents/packets/113-nursery-reflection-and-copy-budget-phase.json`
- Depends on: `ECO-20260405-scout-274`

Goal:

- Clean up one remaining nursery naming or reward-copy seam so the calmer home loop stays coherent.

Acceptance:

- the targeted naming or reward-copy mismatch is resolved
- the pass stays within the authored copy budgets
- the nursery card remains compact and readable

Completion note:

- Added `docs/reports/2026-04-05-nursery-naming-cleanup-implementation.md`, updating the two clearly stale unlock-summary labels in `src/engine/nursery.ts` so the nursery now points at `Open To Shelter` and `Stone Shelter` instead of the retired `Coastal Shelter` and `Treeline Shelter` names.
- Added focused ready-bed assertions in `src/test/field-station-nursery-page.test.ts` and left the deliberate `Short Season` / `Thaw Window` dual-title contract untouched.
- Promoted `ECO-20260405-critic-274` to `READY`.
- Verification: `npm test -- --run src/test/nursery.test.ts src/test/field-station-nursery-page.test.ts`; `npm run build`

### ECO-20260405-critic-274

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Review the nursery naming or reward-copy cleanup`
- Source: `docs/reports/2026-04-05-nursery-naming-cleanup-review.md`
- Packet: `.agents/packets/113-nursery-reflection-and-copy-budget-phase.json`
- Depends on: `ECO-20260405-main-274`

Goal:

- Review whether the nursery language now feels intentional, calm, and consistent with the newer chapter-facing shell.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the targeted language seam is cleaner and still science-safe
- leaves lane 2 ready for the next support pass if clean

Completion note:

- Added `docs/reports/2026-04-05-nursery-naming-cleanup-review.md`, finding no blocker in the tiny unlock-summary cleanup: the nursery now uses the live `Open To Shelter` and `Stone Shelter` names while the deliberate `Short Season` exception remains stable.
- Closed packet `113` as `DONE`; lane 2 has no remaining actionable item in the queue after this review.
- Verification: reviewed `src/engine/nursery.ts` and `src/test/field-station-nursery-page.test.ts`; `npm test -- --run src/test/nursery.test.ts src/test/field-station-nursery-page.test.ts`; `npm run build`
- Verification: `npm test -- --run src/test/field-station-nursery-page.test.ts src/test/nursery.test.ts src/test/content-quality.test.ts`; `npm run build`; web-game smoke in `output/lane-2-main-279-client/`; `npm run validate:agents`

### ECO-20260405-scout-283

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Prepare the light-band route-support carrier handoff`
- Source: `docs/reports/2026-04-05-thaw-window-support-carrier-handoff.md`
- Packet: `.agents/packets/117-light-band-route-support-phase.json`
- Depends on: `none`

Goal:

- Narrow one compact Tundra or Coastal Scrub support-content pack for the next tactile route-feel proof.

Acceptance:

- writes a concrete handoff for `ECO-20260405-main-283`
- picks one lighter-weight route band and its exact carrier family
- avoids more notebook or close-look density

Completion note:

- Added `docs/reports/2026-04-05-thaw-window-support-carrier-handoff.md`, narrowing the next lane-2 pass to Tundra's `thaw-skirt` band on `tundra-short-season` instead of reopening the denser Coastal Scrub branch.
- Chose one same-band support family around the live `Thaw Window` route: `arctic-willow`, `bigelows-sedge`, and `tussock-thaw-channel`, with no new notebook, close-look, or sketchbook surface.
- Promoted `ECO-20260405-main-283` to `READY` and updated packet `117` to version `2` with the exact route, band, and carrier-family focus.

### ECO-20260405-main-283

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Implement one compact route-support carrier pack`
- Source: `docs/reports/2026-04-05-thaw-window-support-carrier-implementation.md`
- Packet: `.agents/packets/117-light-band-route-support-phase.json`
- Depends on: `ECO-20260405-scout-283`

Goal:

- Add one small authored carrier pack in a lighter-weight route band so the next tactile route-feel proof has a stronger in-world clue family.

Acceptance:

- the chosen route band gains one compact support-content pack
- no new comparison, close-look, or sketchbook surfaces are added
- the pass stays inside Tundra or Coastal Scrub and avoids current density ceilings

Completion note:

- Added `docs/reports/2026-04-05-thaw-window-support-carrier-implementation.md`, spending the pass on Tundra's `thaw-skirt` band with one authored support cluster built from `arctic-willow`, `bigelows-sedge`, and the existing `tussock-thaw-channel`.
- Kept `Short Season` / `Thaw Window` route behavior unchanged and extended `src/test/tundra-biome.test.ts` so the thaw band now proves the richer same-band carrier family.
- Promoted `ECO-20260405-critic-283` to `READY`.
- Verification: `npm test -- --run src/test/tundra-biome.test.ts`; `npm test -- --run src/test/runtime-smoke.test.ts -t "turns the tundra thaw-skirt route into one fuller inland relief and snow-edge family|adds one compact snow-meadow drift hold before a shorter thaw-skirt approach catch"`; `npm run build` is still blocked by an unrelated existing TypeScript syntax error in `src/test/field-request-controller.test.ts`

### ECO-20260405-critic-283

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Review the light-band route-support carrier pack`
- Source: `docs/reports/2026-04-05-thaw-window-support-carrier-review.md`
- Packet: `.agents/packets/117-light-band-route-support-phase.json`
- Depends on: `ECO-20260405-main-283`

Goal:

- Review whether the support-content pack deepens route feel without reopening notebook density or crowding the biome band.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the chosen band still reads calmly at handheld scale
- leaves lane 2 ready for a later follow-on if clean

Completion note:

- Added `docs/reports/2026-04-05-thaw-window-support-carrier-review.md`, finding no blocker in the thaw-skirt support pack: the new authored carriers deepen Tundra's live `Thaw Window` band without adding another text surface or destabilizing route identity.
- Closed packet `117` as `DONE`; lane 2 has no remaining actionable queue item after this review.
- Verification: reviewed `src/content/biomes/tundra.ts`, `src/test/tundra-biome.test.ts`, and the focused implementation verification; `npm run validate:agents`

### ECO-20260405-scout-278

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Prepare the reward-surfacing follow-on handoff`
- Source: `docs/reports/2026-04-05-nursery-utility-surfacing-handoff.md`
- Packet: `.agents/packets/115-home-loop-beat-separation-phase.json`
- Depends on: `ECO-20260405-critic-277`

Goal:

- Narrow the next home-loop payoff pass to one compact seam outside the most crowded nursery card.

Acceptance:

- writes a concrete handoff for `ECO-20260405-main-278`
- identifies one better reward or utility surfacing seam
- avoids adding another station row or panel

Completion note:

- Added `docs/reports/2026-04-05-nursery-utility-surfacing-handoff.md`, narrowing the follow-on to the existing `COMPOST HEAP` notice path instead of the bench or another persistent row.
- Bumped packet `115` to version `5`, added `main_278_focus` around the crowberry utility payoff, retargeted `ECO-20260405-main-278` to the new handoff, and promoted it to `READY`.
- Verification: `npm run validate:agents`

### ECO-20260405-critic-277

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Review the nursery beat-separation pass`
- Source: `docs/reports/2026-04-05-nursery-beat-separation-review.md`
- Packet: `.agents/packets/115-home-loop-beat-separation-phase.json`
- Depends on: `ECO-20260405-main-277`

Goal:

- Review whether the home loop now reads as cleaner and more satisfying instead of merely thinner.

Acceptance:

- records findings or a clean review in `docs/reports/`
- checks that the player reads one dominant beat at a time
- promotes `ECO-20260405-scout-278` if clean

Completion note:

- Reviewed the live nursery renderer seam and confirmed the selected active `TEACHING BED` now owns the moment while route-support guidance still returns on the calmer non-bed cards.
- Found no blocker after the renderer-split correction landed on `src/engine/field-station-nursery-page.ts`, recorded the clean review in `docs/reports/2026-04-05-nursery-beat-separation-review.md`, and promoted `ECO-20260405-scout-278` to `READY`.
- Verification: reviewed the focused code diff plus `npx vitest run src/test/nursery.test.ts`, `npx vitest run src/test/runtime-smoke.test.ts -t "teaching-bed project|mature teaching bed"`, `npm run build`

### ECO-20260405-main-277

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Implement one beat-separation pass for nursery interaction state`
- Source: `docs/reports/2026-04-05-nursery-beat-separation-implementation.md`
- Packet: `.agents/packets/115-home-loop-beat-separation-phase.json`
- Depends on: `ECO-20260405-scout-277`

Goal:

- Make one nursery interaction state read as a sequence of clearer beats instead of a crowded single-card explanation.

Acceptance:

- plant state, ecological reflection, and reward no longer all compete in the same moment
- the home loop feels cleaner without adding a new dashboard seam
- the pass stays inside the existing station shell

Completion note:

- Added a selection-aware nursery focus seam in `src/engine/nursery.ts`, then threaded it through `src/engine/field-station-state.ts`, `src/engine/game.ts`, and `src/engine/overlay-render.ts` so an active selected `TEACHING BED` suppresses the route-support strip instead of stacking two beats at once.
- Covered the new state in `src/test/nursery.test.ts` and extended the live nursery runtime smoke in `src/test/runtime-smoke.test.ts` so bed focus now flips from `none` to `selected-active` and back as the player moves through the cards.
- Verification: `npx vitest run src/test/nursery.test.ts`, `npx vitest run src/test/runtime-smoke.test.ts -t "opens the nursery tab and starts one teaching-bed project from the field station"`, `npm run build`

### ECO-20260405-scout-277

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Prepare the nursery beat-separation handoff`
- Source: `docs/reports/2026-04-05-nursery-beat-separation-handoff.md`
- Packet: `.agents/packets/115-home-loop-beat-separation-phase.json`
- Depends on: `none`

Goal:

- Shape one cleaner home-loop interaction so the player reads one nursery idea at a time instead of a stacked card.

Acceptance:

- writes a concrete handoff for `ECO-20260405-main-277`
- identifies which beats should be separated first
- stays inside the existing station and nursery shell

Completion note:

- Added `docs/reports/2026-04-05-nursery-beat-separation-handoff.md`, narrowing the first lane-4 home-loop pass to the active selected `TEACHING BED` state instead of the broader nursery shell.
- Bumped packet `115` to version `2`, corrected the likely file targets to the live nursery seam, and added `main_277_focus` so the next pass suppresses route-facing payoff while the bed itself is the selected beat.
- Verification: `npm run validate:agents`

### ECO-20260405-scout-271

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Prepare the nursery legibility audit and renderer-split handoff`
- Source: `docs/reports/2026-04-05-nursery-legibility-and-renderer-phase.md`
- Packet: `.agents/packets/112-nursery-legibility-and-renderer-phase.json`
- Depends on: `none`

Goal:

- Narrow the nursery cleanup to the exact handheld-overlap states and the cleanest dedicated renderer seam.

Acceptance:

- writes a concrete handoff for `ECO-20260405-main-271`
- identifies the highest-risk stocked through mature layouts at `256x160`
- names a renderer split that does not widen the station shell

Completion note:

- Added `docs/reports/2026-04-05-nursery-legibility-and-renderer-handoff.md`, narrowing the next pass to the inline nursery page body inside `drawFieldStationOverlay(...)` and recommending a sibling helper such as `src/engine/field-station-nursery-page.ts`.
- Grounded the handoff in the current bed-card rect math: active-growth states with a route clue are the worst overlap family, mature payoff states are the next-highest risk, and bench/compost are not the limiting shell.
- Bumped packet `112` to version `2`, added a concrete `main_271_focus` block for the nursery renderer split plus the highest-risk layout families, and promoted `ECO-20260405-main-271` to `READY`.
- Verification: `npm run validate:agents`

### ECO-20260405-main-271

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Implement a dedicated nursery-page renderer plus overlap-proof state layouts`
- Source: `docs/reports/2026-04-05-nursery-legibility-and-renderer-implementation.md`
- Packet: `.agents/packets/112-nursery-legibility-and-renderer-phase.json`
- Depends on: `ECO-20260405-scout-271`

Goal:

- Make the nursery page fit cleanly at `256x160` while extracting a dedicated renderer seam away from `overlay-render.ts`.

Acceptance:

- nursery stocked through mature states render without overlap in seeded checks
- a dedicated nursery-page renderer owns the page body
- the station shell stays compact and unchanged in scope

Completion note:

- Added `docs/reports/2026-04-05-nursery-legibility-and-renderer-implementation.md`, extracting the inline nursery page body into `src/engine/field-station-nursery-page.ts` while leaving `src/engine/overlay-render.ts` in charge of the station shell, top tabs, page switching, and accent passes.
- Rebalanced dense nursery states structurally instead of hiding the issue behind font changes: active-growth and mature teaching-bed states now use a slightly taller bed card plus explicit lower-band splits for route clues, reward or clear text, and the home-place strip.
- Added focused layout coverage in `src/test/field-station-nursery-page.test.ts`, refreshed the shared client smoke in `output/lane-1-main-271-client/`, captured fresh handheld proofs in `output/lane-1-main-271-browser/`, and promoted `ECO-20260405-critic-271` to `READY`.
- `npx vitest run src/test/runtime-smoke.test.ts -t "opens the nursery tab and starts one teaching-bed project from the field station|shows a mature teaching bed in the nursery and lets Enter clear it|adds a season expedition page that becomes ready after the three live routes are logged"` plus `npm run build` are currently blocked by unrelated shared-tree issues inside `src/test/runtime-smoke.test.ts`.

### ECO-20260405-critic-271

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Review nursery legibility and the renderer split`
- Source: `docs/reports/2026-04-05-nursery-legibility-and-renderer-review.md`
- Packet: `.agents/packets/112-nursery-legibility-and-renderer-phase.json`
- Depends on: `ECO-20260405-main-271`

Goal:

- Review whether the nursery page is now clearly readable and whether the new renderer seam protects future home-loop growth.

Acceptance:

- records findings or a clean review in `docs/reports/`
- checks handheld readability across multiple nursery states
- promotes `ECO-20260405-scout-272` if clean

Completion note:

- Added `docs/reports/2026-04-05-nursery-legibility-and-renderer-review.md` and found no blocker in the nursery split: `src/engine/field-station-nursery-page.ts` is the right render-only boundary, and both active-growth and mature handheld proofs now fit cleanly at `256x160`.
- Confirmed the station still reads as one compact shell rather than a new planner layer, and that the remaining pressure is authored copy budget rather than structural overlap.
- Promoted `ECO-20260405-scout-272` to `READY` so the next lane-1 pass can decide whether any truly layout-only follow-on remains distinct from lane 2's copy-role work.

### ECO-20260405-scout-272

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Prepare one nursery layout follow-on handoff`
- Source: `docs/reports/2026-04-05-nursery-layout-follow-on-scout.md`
- Packet: `.agents/packets/112-nursery-legibility-and-renderer-phase.json`
- Depends on: `ECO-20260405-critic-271`

Goal:

- Narrow any remaining nursery crowding to one compact follow-on state or layout seam.

Acceptance:

- writes a concrete handoff for `ECO-20260405-main-272`
- names one remaining crowded state only
- preserves the station shell and copy-budget guardrails

Completion note:

- Added `docs/reports/2026-04-05-nursery-layout-follow-on-scout.md` and found no distinct lane-1 layout-only follow-on worth handing off after the clean renderer split review.
- Marked packet `112` `DONE`, because the structural overlap problem is solved and the remaining nursery pressure is already owned by lane 2's live copy-role pass in packet `113`.
- Parked `ECO-20260405-main-272` and `ECO-20260405-critic-272`; reopen them only if later nursery edits reintroduce a proven `256x160` layout break.

### ECO-20260405-scout-276

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Prepare the vertical regression-guardrail handoff`
- Source: `docs/reports/2026-04-05-vertical-regression-guardrail-handoff.md`
- Packet: `.agents/packets/114-vertical-cooldown-and-regression-phase.json`
- Depends on: `ECO-20260405-critic-275`

Goal:

- Turn the most fragile part of the current vertical family into a better-protected regression seam for future waves.

Acceptance:

- writes a concrete handoff for `ECO-20260405-main-276`
- names one exact regression risk and how to guard it
- stays inside current benchmark spaces only

Completion note:

- Added `docs/reports/2026-04-05-vertical-regression-guardrail-handoff.md`, narrowing the next lane-3 pass to one deterministic treeline return-band guardrail derived from the authored `lee-pocket-fell-return` and `lee-pocket-lee-rest` family rather than another geometry change.
- Bumped packet `114` to version `3`, added a `main_276_focus` block for the exact regression risk and preferred smoke-helper shape, and promoted `ECO-20260405-main-276` to `READY`.
- Verification: `npm run validate:agents`

### ECO-20260405-main-276

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Implement one vertical regression-guardrail pass`
- Source: `docs/reports/2026-04-05-vertical-regression-guardrail-implementation.md`
- Packet: `.agents/packets/114-vertical-cooldown-and-regression-phase.json`
- Depends on: `ECO-20260405-scout-276`

Goal:

- Add one small protection seam so later vertical expansion is less likely to break the newest benchmark spaces.

Acceptance:

- a concrete regression case is now protected by tests or runtime guard logic
- no new geometry family is added
- the pass keeps lane 3 in cooldown rather than expansion mode

Completion note:

- Added `docs/reports/2026-04-05-vertical-regression-guardrail-implementation.md` and tightened the treeline loop smoke proof around the authored `lee-pocket-fell-return -> lee-pocket-lee-rest` hand-back instead of the older broad right-hand settle box.
- Kept the pass test-only: `src/test/runtime-smoke.test.ts` now derives one `treelineShelteredReturnBand` from the authored return platforms and proves the route stabilizes there before continuing into open `lichen-fell`, without changing treeline geometry.
- Verification: `npm test -- --run src/test/treeline-biome.test.ts src/test/runtime-smoke.test.ts -t "adds a tucked backside notch and upper cap for the treeline loop|turns the treeline lee pocket into a compact crest-and-notch loop|turns the treeline threshold into a last-tree shelter followed by the existing lee pocket"`

### ECO-20260405-critic-276

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Review the vertical regression-guardrail pass`
- Source: `docs/reports/2026-04-05-vertical-regression-guardrail-review.md`
- Packet: `.agents/packets/114-vertical-cooldown-and-regression-phase.json`
- Depends on: `ECO-20260405-main-276`

Goal:

- Review whether the guardrail pass makes the current vertical family safer without spending more handheld density.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the protected case is real and future-facing
- leaves lane 3 ready for a later destination wave if clean

Completion note:

- Added `docs/reports/2026-04-05-vertical-regression-guardrail-review.md`, finding no blocking issue in the treeline guardrail pass and confirming the new sheltered-return band protects the authored `fell-return -> lee-rest` family without reopening geometry growth.
- Resolved the earlier treeline browser watch item too: with the shared build issue now cleared, a fresh live Playwright pass from the normal treeline start reached `krummholz-belt` and then the lee-pocket approach with the expected cue family visible and no console errors.
- Verification: `npm test -- --run src/test/treeline-biome.test.ts src/test/runtime-smoke.test.ts -t "adds a tucked backside notch and upper cap for the treeline loop|turns the treeline lee pocket into a compact crest-and-notch loop|turns the treeline threshold into a last-tree shelter followed by the existing lee pocket"`; `npm run build`; live Playwright browser proof on `http://127.0.0.1:4173/`

### ECO-20260405-scout-286

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Prepare the light-band route-approach handoff`
- Source: `docs/reports/2026-04-05-light-band-route-approach-handoff.md`
- Packet: `.agents/packets/118-light-band-route-approach-phase.json`
- Depends on: `none`

Goal:

- Narrow one tiny spatial or approach seam in Tundra or Coastal Scrub that can make an existing route feel more tactile without becoming a new destination.

Acceptance:

- writes a concrete handoff for `ECO-20260405-main-286`
- identifies one route band with room for a small approach/readability pass
- stays away from the already-dense beach opener and treeline family

Completion note:

- Added `docs/reports/2026-04-05-light-band-route-approach-handoff.md`, narrowing the next lane-3 support move to Tundra's `Short Season / Thaw Window` route instead of the denser Coastal Scrub bluff-swale cluster.
- Bumped packet `118` to version `2`, added `main_286_focus` for the exact `snow-meadow-drift-rest -> thaw-skirt-entry-heave` handoff seam, and retargeted `ECO-20260405-main-286` to the new handoff.
- Verification: `npm run validate:agents`

### ECO-20260405-main-286

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Implement one light-band route-approach pass`
- Source: `docs/reports/2026-04-05-light-band-route-approach-implementation.md`
- Packet: `.agents/packets/118-light-band-route-approach-phase.json`
- Depends on: `ECO-20260405-scout-286`

Goal:

- Add one tiny spatial or approach seam that makes an existing Tundra or Coastal Scrub route feel more tactile without becoming a new destination wave.

Acceptance:

- the chosen route band gets a clearer micro-approach or recoverable spatial read
- no new signature pocket or landmark family appears
- the pass stays low-density and cozy

Completion note:

- Pulled `thaw-skirt-entry-heave` left and widened it so the `snow-meadow-drift-rest -> thaw-skirt` handoff catches earlier without adding a new pocket or branch.
- Tightened the authored-geometry and runtime-smoke proofs around the shorter thaw-skirt approach seam.
- Verification: `npm test -- --run src/test/tundra-biome.test.ts src/test/runtime-smoke.test.ts -t "adds one compact snow-meadow drift hold before a shorter thaw-skirt approach catch|adds one compact snow-meadow drift hold before the thaw-skirt family|turns the tundra thaw-skirt route into one fuller inland relief and snow-edge family"`; `npm run build`

### ECO-20260405-critic-286

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Review the light-band route-approach pass`
- Source: `docs/reports/2026-04-05-light-band-route-approach-review.md`
- Packet: `.agents/packets/118-light-band-route-approach-phase.json`
- Depends on: `ECO-20260405-main-286`

Goal:

- Review whether the new approach seam improves route feel without reading like another destination push.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the pass stays below the current density ceiling
- leaves lane 3 ready for a later destination-family reactivation if clean

Completion note:

- Added `docs/reports/2026-04-05-light-band-route-approach-review.md`, finding no blocking issue in the tighter Tundra drift-hold to thaw-entry seam.
- Confirmed the pass stays geometry-first and below the current density ceiling, with one standing watch item to avoid spending more geometry in this exact strip.
- Verification: reviewed the targeted tundra tests, `npm run build`, and `npm run validate:agents`

### ECO-20260405-critic-275

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Review the vertical cooldown cleanup`
- Source: `docs/reports/2026-04-05-vertical-cooldown-cleanup-review.md`
- Packet: `.agents/packets/114-vertical-cooldown-and-regression-phase.json`
- Depends on: `ECO-20260405-main-275`

Goal:

- Review whether the cleanup protects readability and recoverability without reopening destination growth.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the pass stays small and behavior-preserving
- promotes `ECO-20260405-scout-276` if clean

Completion note:

- Added `docs/reports/2026-04-05-vertical-cooldown-cleanup-review.md`, finding no blocking lane-3 issue in the treeline return softening and confirming the pass stayed geometry-only and inside the intended `lee-pocket` family.
- Kept one non-blocking watch item: rerun the real stepped browser proof for this treeline seam once the unrelated shared-tree nursery runtime/build error is cleared.
- Verification: reviewed the treeline geometry/test changes and reran `npm test -- --run src/test/treeline-biome.test.ts src/test/runtime-smoke.test.ts -t "adds a tucked backside notch and upper cap for the treeline loop|turns the treeline lee pocket into a compact crest-and-notch loop|turns the treeline threshold into a last-tree shelter followed by the existing lee pocket"`; promoted `ECO-20260405-scout-276` to `READY`.

### ECO-20260405-main-275

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Implement one small readability or recovery cleanup in a current vertical benchmark space`
- Source: `docs/reports/2026-04-05-vertical-cooldown-cleanup-implementation.md`
- Packet: `.agents/packets/114-vertical-cooldown-and-regression-phase.json`
- Depends on: `ECO-20260405-scout-275`

Goal:

- Protect one current benchmark space with a small readability or recovery cleanup instead of adding another destination.

Acceptance:

- the chosen beach or treeline space becomes easier to read or recover through
- no new landmark family or route branch is introduced
- the change is covered by focused tests or seeded proof

Completion note:

- Softened the treeline `lee-pocket` return by widening `lee-pocket-fell-return` toward the incoming brow side in `src/content/biomes/treeline.ts`, keeping the same platform family and avoiding any new landing, cue, or branch.
- Updated `src/test/treeline-biome.test.ts` to lock the widened return geometry against the existing `crest-brow` and `lee-rest`, while the focused `runtime-smoke` treeline loop path still passes after the geometry easing.
- Verification: `npm test -- --run src/test/treeline-biome.test.ts src/test/runtime-smoke.test.ts -t "adds a tucked backside notch and upper cap for the treeline loop|turns the treeline lee pocket into a compact crest-and-notch loop|turns the treeline threshold into a last-tree shelter followed by the existing lee pocket"`; `npm run build` is currently blocked by unrelated shared-tree nursery errors in `src/engine/nursery.ts`, and fresh stepped browser proof is blocked by the same unrelated runtime issue.

### ECO-20260405-scout-275

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Prepare the vertical cooldown cleanup handoff`
- Source: `docs/reports/2026-04-05-vertical-cooldown-cleanup-handoff.md`
- Packet: `.agents/packets/114-vertical-cooldown-and-regression-phase.json`
- Depends on: `none`

Goal:

- Choose one small readability or recovery cleanup in the current beach or treeline benchmark spaces instead of opening another destination pass.

Acceptance:

- writes a concrete handoff for `ECO-20260405-main-275`
- keeps the wave scoped to cleanup, not new geography
- names one current benchmark space and the exact recoverability problem to protect

Completion note:

- Added `docs/reports/2026-04-05-vertical-cooldown-cleanup-handoff.md`, narrowing the cooldown pass to the treeline `lee-pocket-crest-brow -> lee-pocket-fell-return -> lee-pocket-lee-rest` return seam instead of reopening the now-saturated beach opener or last-tree shelter bands.
- Bumped packet `114` to version `2`, added a `main_275_focus` block with the exact treeline target band and no-new-platform-id guardrails, and promoted `ECO-20260405-main-275` to `READY`.
- Verification: reviewed the current treeline and beach geometry/tests plus seeded browser artifacts in `output/main-268-browser/`, `output/main-267-browser/`, `output/lane-3-scout-104-browser/`, and `output/main-159-browser/`; `npm run validate:agents`

### ECO-20260405-main-273

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Implement authored per-state nursery copy caps and reflection splits`
- Source: `docs/reports/2026-04-05-nursery-copy-budget-implementation.md`
- Packet: `.agents/packets/113-nursery-reflection-and-copy-budget-phase.json`
- Depends on: `ECO-20260405-scout-273`

Goal:

- Rewrite nursery state copy so each state teaches one idea at a time instead of stacking plant, reflection, and reward language together.

Acceptance:

- each nursery state has a clear copy cap and one dominant beat
- ecological reflection and reward language no longer collide on the same card
- the pass stays science-safe and compact

Completion note:

- Added `docs/reports/2026-04-05-nursery-copy-budget-implementation.md`, landing the approved state-beat model so inactive selected beds use `summary`, active beds use new per-stage body copy, and mature beds keep the quieter footer seam instead of reusing reward language as the bed body.
- Reauthored all six nursery projects in `src/engine/nursery.ts`, added `stageSummaryByStage` in `src/engine/types.ts`, updated the teaching-bed render path in `src/engine/overlay-render.ts`, and extended `src/test/nursery.test.ts` plus `src/test/content-quality.test.ts` to protect authored stage coverage and copy-budget ceilings.
- Verification: `npm test -- --run src/test/nursery.test.ts src/test/content-quality.test.ts`; `npm run build`; web-game client smoke in `output/lane-2-main-273-client/`; seeded browser proof in `output/lane-2-main-273-browser/`; `npm run validate:agents`

### ECO-20260405-scout-273

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Prepare the nursery copy-budget and state-beat handoff`
- Source: `docs/reports/2026-04-05-nursery-copy-budget-handoff.md`
- Packet: `.agents/packets/113-nursery-reflection-and-copy-budget-phase.json`
- Depends on: `none`

Goal:

- Break the nursery copy problem into authored state beats so layout work is not fighting stacked language.

Acceptance:

- writes a concrete handoff for `ECO-20260405-main-273`
- caps what each nursery state is allowed to say
- separates plant state, ecological reflection, and reward language into distinct authored beats

Completion note:

- Added `docs/reports/2026-04-05-nursery-copy-budget-handoff.md`, narrowing the nursery fix to one authored state-beat model: `summary` for inactive selection, a new per-stage bed body field for active states, `memorySummary` for the mature footer only, and `rewardSummary` for route-support or utility consequences only.
- Bumped packet `113` to version `2`, added a concrete `main_273_focus` block with copy-role splits, state caps, and authoring budgets, retargeted `ECO-20260405-main-273` and `ECO-20260405-critic-273` to the new handoff, and promoted `ECO-20260405-main-273` to `READY`.
- Verification: `npm run validate:agents`

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
