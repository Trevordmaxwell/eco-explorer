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
