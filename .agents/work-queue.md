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

### ECO-20260403-scout-161

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Prepare the front-half season continuity handoff`
- Source: `docs/reports/2026-04-03-lane-1-front-half-continuity-follow-on.md`
- Packet: `.agents/packets/083-front-half-season-continuity-phase.json`
- Depends on: `ECO-20260402-critic-155`

Goal:

- Prepare one compact continuity pass for front-half season wording across current surfaces.

Acceptance:

- writes a concrete handoff for `ECO-20260403-main-199`
- stays within board, journal-card, atlas, and map seams

### ECO-20260403-main-199

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Implement front-half season continuity wording`
- Source: `docs/reports/2026-04-03-lane-1-front-half-continuity-follow-on.md`
- Packet: `.agents/packets/083-front-half-season-continuity-phase.json`
- Depends on: `ECO-20260403-scout-161`

Goal:

- Make the front-half season read more continuously across the current board, journal, and map surfaces.

Acceptance:

- the coast-facing season language feels more unified
- no new recap shell or navigation HUD appears

### ECO-20260403-critic-172

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Review front-half season continuity`
- Source: `docs/reports/2026-04-03-lane-1-front-half-continuity-follow-on.md`
- Packet: `.agents/packets/083-front-half-season-continuity-phase.json`
- Depends on: `ECO-20260403-main-199`

Goal:

- Review whether the new continuity wording is clear without adding clutter.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260403-scout-162` if clean

### ECO-20260403-scout-162

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Prepare a front-half stop-point or recap handoff`
- Source: `docs/reports/2026-04-03-lane-1-front-half-continuity-follow-on.md`
- Packet: `.agents/packets/083-front-half-season-continuity-phase.json`
- Depends on: `ECO-20260403-critic-172`

Goal:

- Prepare one compact coast-facing stop or recap seam.

Acceptance:

- writes a concrete handoff for `ECO-20260403-main-200`
- keeps the routes shell calm and notebook-toned

### ECO-20260403-main-200

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Implement a front-half stop-point or recap seam`
- Source: `docs/reports/2026-04-03-lane-1-front-half-continuity-follow-on.md`
- Packet: `.agents/packets/083-front-half-season-continuity-phase.json`
- Depends on: `ECO-20260403-scout-162`

Goal:

- Add one calm coast-facing stop or recap seam inside the current station flow.

Acceptance:

- the early loop feels more intentionally pausable
- no new panel or management surface appears

### ECO-20260403-critic-173

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Review the front-half stop-point or recap seam`
- Source: `docs/reports/2026-04-03-lane-1-front-half-continuity-follow-on.md`
- Packet: `.agents/packets/083-front-half-season-continuity-phase.json`
- Depends on: `ECO-20260403-main-200`

Goal:

- Review whether the coast-facing stop cue stays calm and shell-safe.

Acceptance:

- records findings or a clean review in `docs/reports/`
- leaves lane 1 ready for the next wave if clean

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

### ECO-20260403-critic-179

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Review the Open To Shelter filing return`
- Source: `docs/reports/2026-04-03-open-to-shelter-filing-return-review.md`
- Packet: `.agents/packets/086-front-half-chapter-and-filing-phase.json`
- Depends on: `ECO-20260403-main-206`

Goal:

- Review whether the Open To Shelter filing return deepens notebook feeling without adding clutter.

Acceptance:

- records findings or a clean review in `docs/reports/`
- leaves lane 4 ready for the next wave if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-open-to-shelter-filing-return-review.md` with no blocking issues; the filed coastal return now turns toward `Edge Moisture`, `note-tabs` keeps the logged chapter-close even under replay overlays, and the focused board/runtime coverage guards both states.
- Re-ran `npx vitest run src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts -t "Open To Shelter|edge line"` and left lane 4 with no remaining active queue item.

### ECO-20260403-main-206

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Deepen the Open To Shelter filing return`
- Source: `docs/reports/2026-04-03-open-to-shelter-filing-return-implementation.md`
- Packet: `.agents/packets/086-front-half-chapter-and-filing-phase.json`
- Depends on: `ECO-20260403-scout-168`

Goal:

- Make the post-file `Open To Shelter` return feel like a compact page turn into `Edge Moisture`.

Acceptance:

- once `coastal-shelter-shift` is filed, the board summary and direction no longer point back at `Open To Shelter`
- `note-tabs` gets one compact `OPEN TO SHELTER LOGGED` close before `Edge Moisture` takes over

Completion notes:

- Updated `src/engine/field-season-board.ts` so the logged `coastal-shelter-shift` window now hands the board forward into `Edge Moisture`, and `note-tabs` gets a dedicated `OPEN TO SHELTER LOGGED` chapter-close strip that still wins when replay notes overlay the active beat.
- Added focused regressions in `src/test/field-season-board.test.ts` and `src/test/runtime-smoke.test.ts` for the filed coastal return, then verified with `npx vitest run src/test/field-season-board.test.ts` and `npx vitest run src/test/runtime-smoke.test.ts -t "turns the coastal front-half transition into a notebook-ready Open To Shelter outing and files it at the station|uses a note-tabs chapter-close line once the edge line is logged"`.

### ECO-20260403-scout-168

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Prepare Open To Shelter filing-return handoff`
- Source: `docs/reports/2026-04-03-open-to-shelter-filing-depth-handoff.md`
- Packet: `.agents/packets/086-front-half-chapter-and-filing-phase.json`
- Depends on: `ECO-20260403-critic-211`

Goal:

- Prepare one filing-depth follow-on for the new front-half chapter arc.

Acceptance:

- writes a concrete handoff for `ECO-20260403-main-206`
- stays inside current notebook return seams

Completion notes:

- Wrote `docs/reports/2026-04-03-open-to-shelter-filing-depth-handoff.md`, narrowing the next lane-4 step to one post-file `Open To Shelter` return pass: split the logged coastal board copy away from the pre-file transect state, then add one compact `note-tabs` `OPEN TO SHELTER LOGGED` close before `Edge Moisture` takes over.
- Bumped packet `086` to version `4`, retargeted `ECO-20260403-main-206` and `ECO-20260403-critic-179` to the coastal filing-return seam, and promoted `ECO-20260403-main-206` to `READY`.

### ECO-20260403-critic-211

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Review the front-half board summary progression fix`
- Source: `docs/reports/2026-04-03-front-half-board-summary-fix-review.md`
- Packet: `.agents/packets/086-front-half-chapter-and-filing-phase.json`
- Depends on: `ECO-20260403-main-211`

Goal:

- Review whether the front-half board copy now stays truthful as the forest-study subroute advances.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260403-scout-168` if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-board-summary-fix-review.md` with no blocking findings; the repaired front-half board now advances its supporting summary and direction with `Hidden Hollow`, `Moisture Holders`, and `Forest Survey` instead of contradicting the active beat title.
- Re-ran `npx vitest run src/test/field-season-board.test.ts` and promoted `ECO-20260403-scout-168` to `READY`.

### ECO-20260403-main-211

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Fix the front-half board summary progression`
- Source: `docs/reports/2026-04-03-front-half-board-summary-fix-implementation.md`
- Packet: `.agents/packets/086-front-half-chapter-and-filing-phase.json`
- Depends on: `ECO-20260403-critic-178`

Goal:

- Align the front-half board summary and next-direction with the active forest-study subroute once `Hidden Hollow` is no longer the current step.

Acceptance:

- after `forest-hidden-hollow`, the board summary and direction no longer point back to `Hidden Hollow`
- focused board coverage asserts the supporting copy after `forest-hidden-hollow` and after `forest-moisture-holders`

Completion notes:

- Updated `src/engine/field-season-board.ts` so the front-half board now steps from `Hidden Hollow` to `Moisture Holders` to `Forest Survey` in both the active beat title and the supporting summary/direction lines.
- Added focused assertions in `src/test/field-season-board.test.ts` for the `forest-hidden-hollow` and `forest-moisture-holders` states, closing the review gap that let the stale `Hidden Hollow` copy survive the earlier chapter-spread pass.
- Verified with `npx vitest run src/test/field-season-board.test.ts` and `npm run build`, then promoted `ECO-20260403-critic-211` to `READY`.

### ECO-20260403-critic-178

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Review the front-half route-title chapter spread`
- Source: `docs/reports/2026-04-03-front-half-route-title-chapter-review.md`
- Packet: `.agents/packets/086-front-half-chapter-and-filing-phase.json`
- Depends on: `ECO-20260403-main-205`

Goal:

- Review whether the route-title chapter spread increases place memory without adding shell weight.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260403-scout-168` if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-route-title-chapter-review.md` and found one blocker in `src/engine/field-season-board.ts`: after `forest-hidden-hollow`, the active beat title advances to `Moisture Holders` and later `Forest Survey`, but the board summary and direction can still point back to `Hidden Hollow`.
- Kept `ECO-20260403-scout-168` blocked, added the narrow repair pair `ECO-20260403-main-211` / `ECO-20260403-critic-211`, and left the rest of packet `086` waiting on that truthfulness fix.

### ECO-20260403-main-205

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Implement the front-half route-title chapter spread`
- Source: `docs/reports/2026-04-03-front-half-route-title-chapter-implementation.md`
- Packet: `.agents/packets/086-front-half-chapter-and-filing-phase.json`
- Depends on: `ECO-20260403-scout-167`

Goal:

- Spread the live front-half route titles across the current board and guided season seams so the early game reads as one clearer coast-to-forest chapter.

Acceptance:

- the chapter-facing surfaces reuse `Shore Shelter`, `Hidden Hollow`, `Moisture Holders`, and `Open To Shelter` instead of generic labels
- fresh-save guidance no longer implies an inland map hop before the beach opener

Completion notes:

- Reused the live route titles across the front-half season board and guided field-season flow, so the early chapter now reads as `Shore Shelter -> Hidden Hollow -> Moisture Holders -> Open To Shelter` instead of falling back to generic labels.
- Tightened `game.ts` starter menu focus so `world-map` only becomes the default when the guided next biome differs from the current biome, which keeps fresh saves beach-first while preserving map-first guidance once `Hidden Hollow` is next inland.
- Verified with `npx vitest run src/test/field-season-board.test.ts src/test/guided-field-season.test.ts`, `npx vitest run src/test/runtime-smoke.test.ts -t "surfaces the first field-season guidance from starter note to next habitat pointer|Shore Shelter|Open To Shelter"`, and `npm run build`, then promoted `ECO-20260403-critic-178` to `READY`.

### ECO-20260403-scout-167

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Prepare the front-half route-title chapter handoff`
- Source: `docs/reports/2026-04-03-front-half-route-title-chapter-handoff.md`
- Packet: `.agents/packets/086-front-half-chapter-and-filing-phase.json`
- Depends on: `ECO-20260403-critic-171`

Goal:

- Prepare a chapter-spread follow-on that ties the new front-half outings together.

Acceptance:

- writes a concrete handoff for `ECO-20260403-main-205`
- keeps the chapter spread inside current Route v2 seams

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-route-title-chapter-handoff.md`, narrowing the chapter-spread pass to one route-title cleanup across the front-half board and guided season seams: reuse `Shore Shelter`, `Hidden Hollow`, `Moisture Holders`, and `Open To Shelter`, and fix the stale fresh-save prompt so it starts with the beach opener instead of an inland map hop.
- Bumped packet `086` to version `2`, retargeted `ECO-20260403-main-205` and `ECO-20260403-critic-178` to the new handoff, and promoted `ECO-20260403-main-205` to `READY`.

### ECO-20260403-critic-171

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Review the Wrack Shelter replay focus`
- Source: `docs/reports/2026-04-03-wrack-shelter-replay-review.md`
- Packet: `.agents/packets/082-front-half-transition-route-v2-phase.json`
- Depends on: `ECO-20260403-main-198`

Goal:

- Review whether the beach replay pass stays subtle and notebook-first.

Acceptance:

- records findings or a clean review in `docs/reports/`
- leaves lane 4 ready for the next wave if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-wrack-shelter-replay-review.md` with no blocking findings; the beach opener now reuses the existing `processFocus` seam cleanly, keeps filing identity stable as `Shore Shelter`, and stays compact across the request, replay note, and season wrap.
- Rechecked the focused field-request, season-board, and targeted runtime-smoke slices, and promoted `ECO-20260403-scout-167` to `READY`.

### ECO-20260403-main-198

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Implement the Wrack Shelter replay focus`
- Source: `docs/reports/2026-04-03-wrack-shelter-replay-implementation.md`
- Packet: `.agents/packets/082-front-half-transition-route-v2-phase.json`
- Depends on: `ECO-20260403-scout-160`

Goal:

- Let the opening beach Route v2 outing inherit the live `wrack-hold` replay window without changing its filing identity.

Acceptance:

- the active beach replay window reads as `Wrack Shelter` across current request and route-board seams
- notebook-ready and filed surfaces stay canonical as `Shore Shelter`

Completion notes:

- Added `processFocus` to `beach-shore-shelter` in `src/engine/field-requests.ts`, turning the live late-beach replay window into `Wrack Shelter` while keeping notebook-ready and filed states canonically `Shore Shelter`.
- Aligned the existing beach replay note in `src/engine/field-season-board.ts` to the same compact summary, then added focused regressions in `src/test/field-requests.test.ts`, `src/test/field-season-board.test.ts`, and `src/test/runtime-smoke.test.ts`.
- Verified with `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`, `npx vitest run src/test/runtime-smoke.test.ts -t "Wrack Shelter|Thaw Window|Moist Edge|route replay note"`, `npm run build`, and promoted `ECO-20260403-critic-171` to `READY`.

### ECO-20260403-scout-160

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Prepare the Wrack Shelter replay handoff`
- Source: `docs/reports/2026-04-03-front-half-replay-process-handoff.md`
- Packet: `.agents/packets/082-front-half-transition-route-v2-phase.json`
- Depends on: `ECO-20260403-critic-170`

Goal:

- Prepare one soft front-half replay-aware variant using the existing world-state seam.

Acceptance:

- writes a concrete handoff for `ECO-20260403-main-198`
- keeps the variation subtle and existing-surface-first

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-replay-process-handoff.md`, narrowing the replay follow-on to one in-place `processFocus` pass on `beach-shore-shelter`: let the live `wrack-hold` window temporarily reframe the opening outing as `Wrack Shelter` while keeping notebook-ready and filed states canonical as `Shore Shelter`.
- Bumped packet `082` to version `3`, retargeted `ECO-20260403-main-198` and `ECO-20260403-critic-171` to the new beach replay handoff, and promoted `ECO-20260403-main-198` to `READY`.

### ECO-20260403-scout-159

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Prepare the front-half transition Route v2 handoff`
- Source: `docs/reports/2026-04-03-front-half-transition-route-v2-handoff.md`
- Packet: `.agents/packets/082-front-half-transition-route-v2-phase.json`
- Depends on: `ECO-20260403-critic-169`

Goal:

- Prepare one stronger coast-to-forest transition outing for the front half.

Acceptance:

- writes a concrete handoff for `ECO-20260403-main-197`
- prefers existing Route v2 seams over a new route type

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-transition-route-v2-handoff.md`, narrowing the next front-half chapter pass to one in-place `coastal-shelter-shift` conversion: a `transect-evidence` walk through `back-dune -> shore-pine-stand -> forest-edge` using `sand-verbena`, `shore-pine`, and `nurse-log`.
- Bumped packet `082` to version `2`, retargeted `ECO-20260403-main-197` and `ECO-20260403-critic-170` to the new shore-pine-led handoff, and promoted `ECO-20260403-main-197` to `READY`.

### ECO-20260403-main-197

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Implement the front-half transition outing`
- Source: `docs/reports/2026-04-03-front-half-transition-route-v2-implementation.md`
- Packet: `.agents/packets/082-front-half-transition-route-v2-phase.json`
- Depends on: `ECO-20260403-scout-159`

Goal:

- Turn one front-half transition beat into a clearer comparison or transect outing.

Acceptance:

- the outing feels interpretive and place-based
- station and notebook shells remain unchanged

Completion notes:

- Converted `coastal-shelter-shift` in `src/engine/field-requests.ts` into the new in-place `Open To Shelter` Route v2 transect, walking `back-dune -> shore-pine-stand -> forest-edge` through `sand-verbena`, `shore-pine`, and `nurse-log` while keeping `coastal-edge-moisture` as the smaller next beat.
- Updated the matching front-half route-facing copy in `src/engine/field-season-board.ts` and `src/engine/guided-field-season.ts`, then added focused regressions in `src/test/field-requests.test.ts`, `src/test/field-season-board.test.ts`, `src/test/guided-field-season.test.ts`, and `src/test/runtime-smoke.test.ts`.
- Verified with `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts src/test/guided-field-season.test.ts`, `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts src/test/guided-field-season.test.ts src/test/runtime-smoke.test.ts -t "Shore Shelter|Open To Shelter|NEXT STOP|moves the board from forest logging to station return and then coastal comparison|points to coastal scrub after trail stride is owned and settles after the next visit|turns the coastal front-half transition into a notebook-ready Open To Shelter outing and files it at the station"`, and promoted `ECO-20260403-critic-170` to `READY`.

### ECO-20260403-critic-170

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Review the front-half transition outing`
- Source: `docs/reports/2026-04-03-front-half-transition-route-v2-review.md`
- Packet: `.agents/packets/082-front-half-transition-route-v2-phase.json`
- Depends on: `ECO-20260403-main-197`

Goal:

- Review whether the front-half transition outing feels like a choice and not a hidden checklist.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260403-scout-160` if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-transition-route-v2-review.md` with no blocking findings; the new `Open To Shelter` transect keeps the front-half transition authored, place-based, and notebook-first without widening the route architecture or station shell.
- Rechecked the focused field-request, season-board, guided-season, and targeted runtime-smoke slices, then promoted `ECO-20260403-scout-160` to `READY`.

### ECO-20260403-main-196

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Implement beach filing and support polish`
- Source: `docs/reports/2026-04-03-beach-filing-support-implementation.md`
- Packet: `.agents/packets/081-beach-route-v2-and-filing-phase.json`
- Depends on: `ECO-20260403-scout-158`

Goal:

- Make the beach outing return feel as intentional as the forest Route v2 pilots.

Acceptance:

- beach filing and support copy is clearer and more satisfying
- no new support shell or page appears

Completion notes:

- Updated `src/engine/game.ts` so the closing `bull-kelp-wrack` inspect still awards the nursery litter resource but no longer lets `NURSERY SUPPLY` replace the stronger `NOTEBOOK READY` cue when `Shore Shelter` becomes fileable.
- Updated `src/engine/field-season-board.ts` so `note-tabs` now gets one compact post-file beach close, `SHORE SHELTER LOGGED / Sunny Beach closes the shore shelter line. Hidden Hollow waits inland.`, while the other supports and later forest states keep their existing route copy.
- Verified with `npx vitest run src/test/field-season-board.test.ts`, `npx vitest run src/test/runtime-smoke.test.ts -t "Shore Shelter|files a notebook-ready route from the routes page with one Enter press"`, and `npm run build`, then promoted `ECO-20260403-critic-169` to `READY`.

### ECO-20260403-critic-169

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Review beach filing and support polish`
- Source: `docs/reports/2026-04-03-beach-filing-support-review.md`
- Packet: `.agents/packets/081-beach-route-v2-and-filing-phase.json`
- Depends on: `ECO-20260403-main-196`

Goal:

- Review whether the beach return payoff stays compact and notebook-first.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260403-scout-159` if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-beach-filing-support-review.md` with no blocking findings; the narrowed notice priority keeps `NOTEBOOK READY` visible on the closing wrack inspect, the litter reward still survives in the existing resource seams, and the new `SHORE SHELTER LOGGED` strip stays compact and route-specific.
- Rechecked the focused season-board suite plus the targeted Shore Shelter filing runtime smoke, then promoted `ECO-20260403-scout-159` to `READY`.

### ECO-20260403-scout-158

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Prepare beach filing and support polish`
- Source: `docs/reports/2026-04-03-beach-filing-support-handoff.md`
- Packet: `.agents/packets/081-beach-route-v2-and-filing-phase.json`
- Depends on: `ECO-20260403-critic-168`

Goal:

- Prepare one compact filing and support follow-on for the beach outing.

Acceptance:

- writes a concrete handoff for `ECO-20260403-main-196`
- reuses current support and notebook-ready seams

Completion notes:

- Wrote `docs/reports/2026-04-03-beach-filing-support-handoff.md`, narrowing the next beach pass to two existing seams: let the `NOTEBOOK READY` cue outrank the overlapping `NURSERY SUPPLY` notice on the final wrack inspect, and give `note-tabs` one short `Shore Shelter` close after filing before `Hidden Hollow` takes over.
- Bumped packet `081` to version `3`, retargeted `ECO-20260403-main-196` and `ECO-20260403-critic-169` to the new scout handoff, and promoted `ECO-20260403-main-196` to `READY`.

### ECO-20260403-main-195

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Implement the Shore Shelter beach Route v2 outing`
- Source: `docs/reports/2026-04-03-beach-route-v2-implementation.md`
- Packet: `.agents/packets/081-beach-route-v2-and-filing-phase.json`
- Depends on: `ECO-20260403-scout-157`, `ECO-20260402-critic-151`

Goal:

- Add the first dedicated beach Route v2 outing using existing front-half spaces and notebook return seams.

Acceptance:

- beach gains a clear purpose-driven outing
- the route reuses current Route v2 and filing systems

Completion notes:

- Added `beach-shore-shelter` as the new beach-first `transect-evidence` opener in `src/engine/field-requests.ts`, gated `forest-hidden-hollow` behind it, and preserved older in-progress later Route v2 saves by treating the persisted active note as already past any newly inserted prerequisite.
- Updated `src/engine/field-season-board.ts` so the first coastal-shelter beat, summary, next-direction copy, notebook-ready beat mapping, and dawn replay note now point at `Shore Shelter` before the inland hollow leg begins.
- Verified with `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`, `npx vitest run src/test/runtime-smoke.test.ts -t "Shore Shelter|Hidden Hollow notebook-ready|files a notebook-ready route from the routes page with one Enter press"`, `npx vitest run src/test/content-quality.test.ts src/test/field-requests.test.ts src/test/field-season-board.test.ts`, `npm run build`, and `npm run validate:agents`, then promoted `ECO-20260403-critic-168` to `READY`.

### ECO-20260403-critic-168

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Review the Shore Shelter beach Route v2 outing`
- Source: `docs/reports/2026-04-03-beach-route-v2-review.md`
- Packet: `.agents/packets/081-beach-route-v2-and-filing-phase.json`
- Depends on: `ECO-20260403-main-195`

Goal:

- Review whether the first beach outing feels like an authored mini-adventure.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260403-scout-158` if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-beach-route-v2-review.md` with no blocking findings; the new beach opener now reads like a clear three-step mini-adventure, the single active-note compatibility rule protects older in-progress later saves, and the first coastal-shelter beat stays coherent at the station.
- Rechecked the focused field-request/season-board suite plus the targeted runtime smoke for the live beach outing and filing path, then promoted `ECO-20260403-scout-158` to `READY`.

### ECO-20260402-scout-152

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Prepare front-half ecosystem note deepening handoff`
- Source: `docs/reports/2026-04-03-front-half-ecosystem-note-deepening-handoff.md`
- Packet: `.agents/packets/076-front-half-ecosystem-note-deepening-phase.json`
- Depends on: `ECO-20260402-critic-162`

Goal:

- Prepare one more front-half ecosystem-note pass.

Acceptance:

- writes a concrete handoff for `ECO-20260402-main-190`
- stays focused on observable relationships

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-ecosystem-note-deepening-handoff.md`, narrowing the next note pass to four exact moves: new local note payoffs for `sanderling` and coastal-scrub `beach-pea`, plus zone-faithful revisions to `shelter-line-start` and `thicket-cover`.
- Bumped packet `076` to version `2`, added a concrete note scope plus resolver-order guardrails, and promoted `ECO-20260402-main-190` to `READY` with the new handoff as its implementation source.

### ECO-20260402-main-190

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Implement front-half ecosystem notes`
- Source: `docs/reports/2026-04-03-front-half-ecosystem-note-implementation.md`
- Packet: `.agents/packets/076-front-half-ecosystem-note-deepening-phase.json`
- Depends on: `ECO-20260402-scout-152`

Goal:

- Add a few more front-half notes that deepen habitat relationships.

Acceptance:

- beach and scrub gain stronger observable notes
- notes deepen ecology instead of repeating facts

Completion notes:

- Added the two scoped new notes in `src/content/biomes/beach.ts` and `src/content/biomes/coastal-scrub.ts`: `surf-food-line` for tide-line `sanderling`, and `runner-hold-start` for back-dune `beach-pea`.
- Tightened the two scoped revisions by moving `shelter-line-start` onto `dune-edge` and localizing `thicket-cover` to shrub-thicket carriers, then verified the new note surfacing in `src/test/ecosystem-notes.test.ts` plus note-budget and journal coverage and `npm run build`. Promoted `ECO-20260402-critic-163` to `READY`.

### ECO-20260402-critic-163

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Review front-half ecosystem notes`
- Source: `docs/reports/2026-04-03-front-half-ecosystem-note-review.md`
- Packet: `.agents/packets/076-front-half-ecosystem-note-deepening-phase.json`
- Depends on: `ECO-20260402-main-190`

Goal:

- Review whether the new front-half notes teach relationships clearly.

Acceptance:

- records findings or a clean review in `docs/reports/`
- leaves lane 2 ready for the next wave if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-ecosystem-note-review.md` with no blocking findings; the new `sanderling` and coastal-scrub `beach-pea` notes now give the front half clearer local relationship payoffs, and the beach plus scrub revisions remove the clearest zone drift without disturbing live downstream seams.
- Rechecked the focused ecosystem-note, content-quality, and journal suites plus `npm run build`, marked packet `076` done, and promoted `ECO-20260403-scout-163` to `READY`.

### ECO-20260403-scout-163

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Prepare front-half comparison candidates`
- Source: `docs/reports/2026-04-03-front-half-comparison-candidates-handoff.md`
- Packet: `.agents/packets/084-front-half-comparison-and-memory-phase.json`
- Depends on: `ECO-20260402-critic-163`

Goal:

- Prepare a front-half comparison expansion built from shared carriers and habitat-role contrast.

Acceptance:

- writes a concrete handoff for `ECO-20260403-main-201`
- keeps the comparison layer science-safe and notebook-like

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-comparison-candidates-handoff.md`, narrowing the next pass to exactly two new beach-to-scrub comparisons: `beach-pea` and `beach-strawberry`, while explicitly deferring `dune-lupine` because its scrub-side note can shift with discovery state.
- Bumped packet `084` to version `2`, added a concrete comparison scope plus guardrails against widening the allowlist, and promoted `ECO-20260403-main-201` to `READY`.

### ECO-20260403-main-201

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Implement front-half comparison expansion`
- Source: `docs/reports/2026-04-03-front-half-comparison-implementation.md`
- Packet: `.agents/packets/084-front-half-comparison-and-memory-phase.json`
- Depends on: `ECO-20260403-scout-163`

Goal:

- Add a few stronger beach/scrub/forest comparison candidates using current journal systems.

Acceptance:

- front-half comparison coverage grows without a new shell
- added entries stay science-safe and visually or ecologically distinct

Completion notes:

- Expanded `src/engine/journal-comparison.ts` with exactly the two approved front-half additions, `beach-pea` and `beach-strawberry`, while leaving the rest of the allowlist unchanged.
- Added focused `src/test/journal-comparison.test.ts` coverage for both new pairs plus a `src/test/runtime-smoke.test.ts` journal proof for the `beach-pea` comparison, verified those suites and `npm run build`, and promoted `ECO-20260403-critic-174` to `READY`.

### ECO-20260403-critic-174

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Review front-half comparison expansion`
- Source: `docs/reports/2026-04-03-front-half-comparison-review.md`
- Packet: `.agents/packets/084-front-half-comparison-and-memory-phase.json`
- Depends on: `ECO-20260403-main-201`

Goal:

- Review whether the comparison expansion deepens transitions without drifting into clutter.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260403-scout-164` if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-comparison-review.md` with no blocking findings; the new `beach-pea` and `beach-strawberry` comparisons stay note-backed, same-pane, and habitat-specific without reopening the wider front-half allowlist.
- Rechecked focused comparison, runtime-smoke, and observation-prompt coverage plus `npm run build`, then promoted `ECO-20260403-scout-164` to `READY`.

### ECO-20260403-scout-164

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Prepare front-half memory payoff handoff`
- Source: `docs/reports/2026-04-03-front-half-memory-payoff-handoff.md`
- Packet: `.agents/packets/084-front-half-comparison-and-memory-phase.json`
- Depends on: `ECO-20260403-critic-174`

Goal:

- Prepare one compact atlas or sketchbook memory payoff for the new front-half material.

Acceptance:

- writes a concrete handoff for `ECO-20260403-main-202`
- keeps the payoff inside current archive surfaces

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-memory-payoff-handoff.md`, narrowing the next pass to a sketchbook-only note-strip cleanup for `sea-rocket` and `sword-fern`, the two front-half anchors still falling back to plain fact text.
- Bumped packet `084` to version `5`, added a concrete memory scope plus a sketchbook-only guardrail, and promoted `ECO-20260403-main-202` to `READY`.

### ECO-20260403-main-202

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Implement front-half memory payoff`
- Source: `docs/reports/2026-04-03-front-half-memory-payoff-implementation.md`
- Packet: `.agents/packets/084-front-half-comparison-and-memory-phase.json`
- Depends on: `ECO-20260403-scout-164`

Goal:

- Give the front-half branch a more remembered, notebook-like payoff inside current archive surfaces.

Acceptance:

- the payoff stays inside sketchbook or atlas seams already on screen
- the added lines feel like memory and not repeated fact cards

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-memory-payoff-implementation.md`, keeping the pass sketchbook-only and adding compact `sketchbookNote` lines for `sea-rocket` and `sword-fern` in `src/content/shared-entries.ts`.
- Added focused proof in `src/test/sketchbook.test.ts`, then verified with `npm test -- --run src/test/sketchbook.test.ts`, `npm test -- --run src/test/content-quality.test.ts -t "sketchbook notes"`, and `npm run build`.
- Promoted `ECO-20260403-critic-175` to `READY`.

### ECO-20260403-critic-175

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Review front-half memory payoff`
- Source: `docs/reports/2026-04-03-front-half-memory-payoff-review.md`
- Packet: `.agents/packets/084-front-half-comparison-and-memory-phase.json`
- Depends on: `ECO-20260403-main-202`

Goal:

- Review whether the new front-half memory layer stays calm and valuable.

Acceptance:

- records findings or a clean review in `docs/reports/`
- leaves lane 2 ready for the next wave if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-memory-payoff-review.md` with no blocking findings; the new `sea-rocket` and `sword-fern` strip lines stay notebook-like, fit the existing handheld sketchbook seam, and do not reopen atlas or station surfaces.
- Rechecked `npm test -- --run src/test/sketchbook.test.ts`, `npm test -- --run src/test/content-quality.test.ts -t "sketchbook notes"`, `npm run build`, and `npm run validate:agents`, then reviewed the live artifacts in `output/lane-2-critic-175-client/` and `output/lane-2-critic-175-browser/` with zero captured browser errors.
- Closed packet `084`; lane 2 has no remaining actionable item in this wave.

### ECO-20260403-scout-166

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Prepare a waypoint rest or recovery follow-on`
- Source: `docs/reports/2026-04-03-coastal-shore-pine-rest-handoff.md`
- Packet: `.agents/packets/085-coastal-family-and-waypoint-phase.json`
- Depends on: `ECO-20260403-critic-210`

Goal:

- Prepare one rest or recovery follow-on for the newer waypoint spaces.

Acceptance:

- writes a concrete handoff for `ECO-20260403-main-204`
- favors habitat feel over another traversal trick

Completion notes:

- Wrote `docs/reports/2026-04-03-coastal-shore-pine-rest-handoff.md`, narrowing the next lane-3 pass to one tiny right-half `coastal-scrub` rest seam in the `shore-pine-stand` instead of revisiting the repaired left gather, the already-full tundra edge, or the forest canopy.
- Bumped packet `085` to version `3` with a structured `main_204_focus` target band, preferred pine-underlayer entries, and explicit guardrails against door, corridor, or cue drift. Promoted `ECO-20260403-main-204` to `READY` and retargeted the paired implementation/review items to the new handoff report.

### ECO-20260403-main-204

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Implement the waypoint rest or recovery follow-on`
- Source: `docs/reports/2026-04-03-coastal-shore-pine-rest-implementation.md`
- Packet: `.agents/packets/085-coastal-family-and-waypoint-phase.json`
- Depends on: `ECO-20260403-scout-166`

Goal:

- Give one of the newer waypoint spaces a calmer habitat or recovery seam.

Acceptance:

- the space feels more lived-in and habitat-first
- no new cue language or HUD appears

Completion notes:

- Wrote `docs/reports/2026-04-03-coastal-shore-pine-rest-implementation.md`, adding one low `shore-pine-rest-log` plus tiny `kinnikinnick` / `song-sparrow` support so the right half of `coastal-scrub` now settles into a quieter pine pocket after the swale release.
- Updated `src/test/coastal-scrub-biome.test.ts` and `src/test/runtime-smoke.test.ts` with focused geometry and traversal coverage, then verified the pass with the targeted test slice, `npm run build`, the shared client smoke in `output/main-204-client/`, and the seeded browser proof in `output/main-204-browser/` with zero recorded browser errors.
- Repo-wide `npm test -- --run` still reports one unrelated existing `src/test/journal-list.test.ts` failure (`PLANT 3/4` vs `PLANT 3/6`) outside this lane-3 coastal runtime change.

### ECO-20260403-critic-177

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Review the waypoint rest or recovery follow-on`
- Source: `docs/reports/2026-04-03-coastal-shore-pine-rest-review.md`
- Packet: `.agents/packets/085-coastal-family-and-waypoint-phase.json`
- Depends on: `ECO-20260403-main-204`

Goal:

- Review whether the new rest or recovery seam deepens habitat feel without route noise.

Acceptance:

- records findings or a clean review in `docs/reports/`
- leaves lane 3 ready for the next wave if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-coastal-shore-pine-rest-review.md` and found no blocking issues: the new `shore-pine` pocket reads as a calmer habitat pause, stays clear of both travel-anchor bands, and keeps the right half of `coastal-scrub` broad and recoverable.
- Rechecked the focused coastal biome/runtime slice, `npm run build`, the shared client smoke in `output/main-204-client/`, and the seeded browser/state artifacts in `output/main-204-browser/`, with zero recorded browser errors and one non-blocking watch item to avoid crowding this same right-half band later.
- Lane 3 has no further actionable queue item after this clean review.

### ECO-20260402-critic-162

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Review tundra entry pack`
- Source: `docs/reports/2026-04-03-tundra-entry-pack-review.md`
- Packet: `.agents/packets/075-tundra-entry-expansion-phase.json`
- Depends on: `ECO-20260402-main-189`

Goal:

- Review whether the tundra pack stays accurate and well-placed.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260402-scout-152` if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-tundra-entry-pack-review.md` with no blocking findings; the new pack keeps the exposed tundra half denser, preserves the shared-entry seam, and stays science-safe.
- Marked packet `075` done and promoted `ECO-20260402-scout-152` to `READY`, with one non-blocking watch that the seeded snow-meadow proof stacks the new ptarmigan on another small tundra animal in one capture.

### ECO-20260402-main-189

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Implement tundra entry pack`
- Source: `docs/reports/2026-04-03-tundra-entry-expansion-implementation.md`
- Packet: `.agents/packets/075-tundra-entry-expansion-phase.json`
- Depends on: `ECO-20260402-scout-151`

Goal:

- Add a small set of new tundra entries and authored placements.

Acceptance:

- tundra gains density without changing progression or geometry
- zonation remains readable

Completion notes:

- Added the exact four-entry tundra pack in `src/content/biomes/tundra.ts`, with shared alpine `moss-campion` and `reindeer-lichen`, plus tundra-local `white-tailed-ptarmigan` and `frost-heave-hummock`, then anchored the exposed left half with authored wind-bluff and frost-ridge placements.
- Expanded the supporting science and test surfaces in `docs/science-source-ledger.md`, `src/test/tundra-biome.test.ts`, `src/test/biome.test.ts`, `src/test/journal.test.ts`, `src/test/content-quality.test.ts`, and `src/test/runtime-smoke.test.ts`, verified the shared `develop-web-game` client pass in `output/lane-2-main-189-client/`, reviewed seeded browser proof in `output/lane-2-main-189-browser/`, and promoted `ECO-20260402-critic-162` to `READY`.

### ECO-20260402-critic-156

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Review beach content parity`
- Source: `docs/reports/2026-04-03-beach-content-parity-review.md`
- Packet: `.agents/packets/071-beach-content-parity-phase.json`
- Depends on: `ECO-20260402-main-183`

Goal:

- Review the beach pack for science accuracy and density balance.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260402-scout-146` if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-beach-content-parity-review.md` with no blocking findings; the new beach pack keeps the Pacific branch coherent, reads clearly in the lee-pocket artifact, and stays lane-2 scoped.
- Promoted `ECO-20260402-scout-146` to `READY` so the next beach pass can deepen ecosystem notes on top of the now-denser front-half content.

### ECO-20260402-critic-161

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Review beach process moment`
- Source: `docs/reports/2026-04-03-beach-process-moment-review.md`
- Packet: `.agents/packets/074-beach-process-moment-phase.json`
- Depends on: `ECO-20260402-main-188`

Goal:

- Review whether the beach process cue feels readable and science-safe.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260402-scout-151` if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-beach-process-moment-review.md` with no blocking findings; the new `wrack-hold` cue stays compact, science-backed, and visually quiet on the tide line.
- Promoted `ECO-20260402-scout-151` to `READY` so lane 2 can move into the tundra-density follow-on.

### ECO-20260402-scout-151

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Prepare tundra entry expansion handoff`
- Source: `docs/reports/2026-04-03-tundra-entry-expansion-handoff.md`
- Packet: `.agents/packets/075-tundra-entry-expansion-phase.json`
- Depends on: `ECO-20260402-critic-161`

Goal:

- Prepare a compact tundra entry-density pass.

Acceptance:

- writes a concrete handoff for `ECO-20260402-main-189`
- identifies science-safe tundra entries and placements

Completion notes:

- Wrote `docs/reports/2026-04-03-tundra-entry-expansion-handoff.md`, narrowing the pack to `moss-campion`, `reindeer-lichen`, `white-tailed-ptarmigan`, and `frost-heave-hummock` so the exposed half of tundra gains density instead of piling more into the thaw edge.
- Updated packet `075` to version `2` and promoted `ECO-20260402-main-189` to `READY` with the new handoff as its implementation source.

### ECO-20260402-scout-146

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Prepare beach ecosystem-note deepening handoff`
- Source: `docs/reports/2026-04-03-beach-note-deepening-handoff.md`
- Packet: `.agents/packets/071-beach-content-parity-phase.json`
- Depends on: `ECO-20260402-critic-156`

Goal:

- Prepare the beach ecosystem-note follow-on that complements the new content pack.

Acceptance:

- writes a concrete handoff for `ECO-20260402-main-184`
- keeps the focus on observable front-half relationships

Completion notes:

- Wrote `docs/reports/2026-04-03-beach-note-deepening-handoff.md`, narrowing the follow-on to one dry-sand note revision, one new lee-pocket shelter note, and one wrack-food-web refresh built around the new `beach-hopper`.
- Updated packet `071` to version `5` and promoted `ECO-20260402-main-184` to `READY` with the new handoff as its implementation source.

### ECO-20260402-main-184

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Implement beach ecosystem-note deepening`
- Source: `docs/reports/2026-04-03-beach-note-deepening-implementation.md`
- Packet: `.agents/packets/071-beach-content-parity-phase.json`
- Depends on: `ECO-20260402-scout-146`

Goal:

- Deepen beach teaching through a few stronger ecosystem notes.

Acceptance:

- beach notes teach neighbor roles and shelter or moisture relationships
- the change stays inside current note systems

Completion notes:

- Refreshed `low-runner-band` around the new bloom-and-runner transition, added the new `lee-pocket-hold` shelter note, and repurposed `wave-edge-survivors` into the sharper `Wrack Workers` wrack-food-web card so `dune-lupine`, `beach-strawberry`, and `beach-hopper` now matter in the beach journal.
- Verified with focused ecosystem-note, content-quality, and journal tests, `npm run build`, the required `develop-web-game` client pass in `output/lane-2-main-184-client/`, and seeded browser journal captures in `output/lane-2-main-184-browser/`; promoted `ECO-20260402-critic-157` to `READY`.

### ECO-20260402-critic-157

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Review beach ecosystem-note deepening`
- Source: `docs/reports/2026-04-03-beach-note-deepening-review.md`
- Packet: `.agents/packets/071-beach-content-parity-phase.json`
- Depends on: `ECO-20260402-main-184`

Goal:

- Review whether the new beach notes deepen ecology without repeating fact text.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260402-scout-147` if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-beach-note-deepening-review.md` with no blocking findings; the new beach note layer stays calm, science-safe, and place-based while teaching the front half through shelter, calmer sand, and wrack-food-web relationships.
- Re-ran the focused lane-2 note slice plus `npm run build`, reviewed the seeded journal artifacts in `output/lane-2-main-184-browser/`, marked packet `071` done, and promoted `ECO-20260402-scout-147` to `READY`.

### ECO-20260402-scout-147

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Prepare coastal-scrub close-look candidate handoff`
- Source: `docs/reports/2026-04-03-coastal-scrub-close-look-handoff.md`
- Packet: `.agents/packets/072-coastal-scrub-close-look-phase.json`
- Depends on: `ECO-20260402-critic-157`

Goal:

- Prepare one narrow close-look pass for coastal-scrub.

Acceptance:

- writes a concrete handoff for `ECO-20260402-main-185`
- keeps close-look occasional and visually motivated

Completion notes:

- Wrote `docs/reports/2026-04-03-coastal-scrub-close-look-handoff.md`, narrowing the next pass to exactly three visual-first subjects: `nootka-rose`, `kinnikinnick`, and `nurse-log`.
- Updated packet `072` to version `2` and promoted `ECO-20260402-main-185` to `READY` with the new handoff as its implementation source.

### ECO-20260402-main-185

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Implement coastal-scrub close-look candidates`
- Source: `docs/reports/2026-04-03-coastal-scrub-close-look-implementation.md`
- Packet: `.agents/packets/072-coastal-scrub-close-look-phase.json`
- Depends on: `ECO-20260402-scout-147`

Goal:

- Add a few coastal-scrub visual-first close-look candidates.

Acceptance:

- coastal-scrub gains 2-3 close-look-worthy entries
- the change keeps callout text concise and kid-readable

Completion notes:

- Added exactly three coastal-scrub close-look cards in `src/engine/close-look.ts`: `nootka-rose`, `kinnikinnick`, and `nurse-log`, keeping the pass inside the existing close-look surface without touching journal layout, atlas copy, or comparisons.
- Verified with `npm test -- --run src/test/close-look.test.ts src/test/content-quality.test.ts`, `npm run build`, the required `develop-web-game` client pass in `output/lane-2-main-185-client/`, and seeded browser/state captures for `nootka-rose` and `kinnikinnick` in `output/lane-2-main-185-browser/`; promoted `ECO-20260402-critic-158` to `READY`.

### ECO-20260402-critic-158

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Review coastal-scrub close-look candidates`
- Source: `docs/reports/2026-04-03-coastal-scrub-close-look-review.md`
- Packet: `.agents/packets/072-coastal-scrub-close-look-phase.json`
- Depends on: `ECO-20260402-main-185`

Goal:

- Review whether coastal-scrub close-look additions are visually and scientifically strong.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260402-scout-148` if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-coastal-scrub-close-look-review.md` with no blocking findings; the new scrub trio stays occasional, readable, and detail-first while keeping scene-scale carriers like `shore-pine` and `pacific-wax-myrtle` out of the first pass.
- Re-ran the focused close-look/content-quality slice plus `npm run build`, reviewed the seeded scrub close-look artifacts in `output/lane-2-main-185-browser/`, marked packet `072` done, and promoted `ECO-20260402-scout-148` to `READY`.

### ECO-20260402-scout-148

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Prepare front-half sketchbook note handoff`
- Source: `docs/reports/2026-04-03-front-half-sketchbook-note-handoff.md`
- Packet: `.agents/packets/073-front-half-sketchbook-and-partner-phase.json`
- Depends on: `ECO-20260402-critic-158`

Goal:

- Prepare a front-half sketchbook note pass for beach and coastal-scrub.

Acceptance:

- writes a concrete handoff for `ECO-20260402-main-186`
- keeps the note style notebook-like and compact

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-sketchbook-note-handoff.md`, narrowing the next step to one exact four-entry note pack: `moon-snail-shell`, `sanderling`, `pacific-wax-myrtle`, and `song-sparrow`.
- Updated packet `073` to version `2` and promoted `ECO-20260402-main-186` to `READY` with the new handoff as its implementation source.

### ECO-20260402-main-186

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Implement front-half sketchbook notes`
- Source: `docs/reports/2026-04-03-front-half-sketchbook-note-implementation.md`
- Packet: `.agents/packets/073-front-half-sketchbook-and-partner-phase.json`
- Depends on: `ECO-20260402-scout-148`

Goal:

- Fill in sketchbook note coverage across the front-half biomes.

Acceptance:

- beach and scrub sketchbook pages feel less empty
- notes stay poetic and non-repetitive

Completion notes:

- Added exactly four local front-half `sketchbookNote` lines in `src/content/biomes/beach.ts` and `src/content/biomes/coastal-scrub.ts`: `moon-snail-shell`, `sanderling`, `pacific-wax-myrtle`, and `song-sparrow`, without reopening shared dune carriers or other journal surfaces.
- Verified with `npm test -- --run src/test/sketchbook.test.ts src/test/content-quality.test.ts`, `npm run build`, the required `develop-web-game` client pass in `output/lane-2-main-186-client/`, and seeded browser sketchbook captures in `output/lane-2-main-186-browser/`; tightened the final note wording after the first browser pass and promoted `ECO-20260402-critic-159` to `READY`.

### ECO-20260402-critic-159

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Review front-half sketchbook notes`
- Source: `docs/reports/2026-04-03-front-half-sketchbook-note-review.md`
- Packet: `.agents/packets/073-front-half-sketchbook-and-partner-phase.json`
- Depends on: `ECO-20260402-main-186`

Goal:

- Review whether the new sketchbook notes fit tone and space.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260402-scout-149` if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-sketchbook-note-review.md` with no blocking findings; the four-note pack stays notebook-like, locally distinct, and visibly cleaner after the live browser tightening pass.
- Reviewed the seeded sketchbook captures in `output/lane-2-main-186-browser/`, kept packet `073` active for the partner half of the wave, and promoted `ECO-20260402-scout-149` to `READY`.

### ECO-20260402-scout-149

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Prepare front-half field partner expansion handoff`
- Source: `docs/reports/2026-04-03-front-half-field-partner-handoff.md`
- Packet: `.agents/packets/073-front-half-sketchbook-and-partner-phase.json`
- Depends on: `ECO-20260402-critic-159`

Goal:

- Prepare a narrow cue-bank expansion for beach and coastal-scrub partner cues.

Acceptance:

- writes a concrete handoff for `ECO-20260402-main-187`
- keeps the partner quiet and notebook-like

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-field-partner-handoff.md`, narrowing the implementation step to exactly two prompt-linked cues: `beach-lee-pocket-hold` and `scrub-swale-shelter`.
- Updated packet `073` to version `5`, kept fallback behavior out of scope, and promoted `ECO-20260402-main-187` to `READY` with the new handoff as its implementation source.

### ECO-20260402-main-187

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Implement front-half field partner cue expansion`
- Source: `docs/reports/2026-04-03-front-half-field-partner-implementation.md`
- Packet: `.agents/packets/073-front-half-sketchbook-and-partner-phase.json`
- Depends on: `ECO-20260402-scout-149`

Goal:

- Expand the front-half partner cue bank without adding chatter.

Acceptance:

- add exactly two prompt-linked cues: `beach-lee-pocket-hold` and `scrub-swale-shelter`
- the existing transient partner strip remains the only surface

Completion notes:

- Added exactly the two scoped cues in `src/engine/field-partner.ts`: `beach-lee-pocket-hold` for the beach `lee-pocket` note seam and `scrub-swale-shelter` for the coastal-scrub `windbreak-swale` shelter prompt, without widening fallback behavior or adding another UI surface.
- Verified with focused `field-partner` and targeted `runtime-smoke` coverage, `npm run build`, the required `develop-web-game` client pass in `output/lane-2-main-187-client/`, and refreshed browser captures in `output/lane-2-main-187-browser/`; tightened `src/engine/overlay-render.ts` after the first proof so the transient strip wraps the new copy cleanly, then promoted `ECO-20260402-critic-160` to `READY`.

### ECO-20260402-critic-160

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Review front-half field partner expansion`
- Source: `docs/reports/2026-04-03-front-half-field-partner-review.md`
- Packet: `.agents/packets/073-front-half-sketchbook-and-partner-phase.json`
- Depends on: `ECO-20260402-main-187`

Goal:

- Review whether the front-half partner still feels like a notebook margin.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260402-scout-150` if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-field-partner-review.md` with no blocking findings; the cue pair stays exact, notebook-like, and visibly clean after the strip-wrap fix.
- Reviewed the seeded partner captures in `output/lane-2-main-187-browser/`, marked packet `073` done, and promoted `ECO-20260402-scout-150` to `READY`.

### ECO-20260402-scout-150

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Prepare beach process moment handoff`
- Source: `docs/reports/2026-04-03-beach-process-moment-handoff.md`
- Packet: `.agents/packets/074-beach-process-moment-phase.json`
- Depends on: `ECO-20260402-critic-160`

Goal:

- Prepare one render-first beach process moment.

Acceptance:

- writes a concrete handoff for `ECO-20260402-main-188`
- ties the process to visible beach conditions

Completion notes:

- Wrote `docs/reports/2026-04-03-beach-process-moment-handoff.md`, narrowing the next beach parity step to one `wrack-hold` tide-line process moment instead of a broader weather or route rewrite.
- Updated packet `074` to version `2`, scoped the pass to the existing `moisture-hold` visual style around `bull-kelp-wrack`, `beach-hopper`, and `pacific-sand-crab`, and promoted `ECO-20260402-main-188` to `READY`.

### ECO-20260402-main-188

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Implement beach process moment`
- Source: `docs/reports/2026-04-03-beach-process-moment-implementation.md`
- Packet: `.agents/packets/074-beach-process-moment-phase.json`
- Depends on: `ECO-20260402-scout-150`

Goal:

- Complete living-world process parity for beach.

Acceptance:

- beach gains one science-safe process cue
- the process stays visual and compact

Completion notes:

- Added exactly one beach process row in `src/content/biomes/beach.ts`: `wrack-hold`, a late `marine-haze` tide-line moment applied to `bull-kelp-wrack`, `beach-hopper`, and `pacific-sand-crab` through the existing `moisture-hold` renderer seam.
- Verified with focused habitat-process and targeted runtime-smoke coverage, `npm run build`, `npm run validate:agents`, the required `develop-web-game` client pass in `output/lane-2-main-188-client/`, and seeded browser proof in `output/lane-2-main-188-browser/`; added the source-trail note in `docs/science-source-ledger.md` and promoted `ECO-20260402-critic-161` to `READY`.

### ECO-20260402-main-183

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Implement the beach content parity pack`
- Source: `docs/reports/2026-04-03-beach-content-parity-implementation.md`
- Packet: `.agents/packets/071-beach-content-parity-phase.json`
- Depends on: `ECO-20260402-scout-145`

Goal:

- Add a first beach parity pack with richer entries, placements, and note-adjacent coverage.

Acceptance:

- beach gains denser authored content
- the pack stays science-safe and content-only

Completion notes:

- Promoted `dune-lupine` and `beach-strawberry` into shared coastal entries, added the new `beach-hopper` wrack animal, and deepened `Sunny Beach` with new dry-sand and lee-pocket carriers plus authored placements that keep the front half visibly richer without drifting into scrub shrubs or new systems.
- Verified with focused biome and corridor tests, focused content-quality checks, `npm run build`, and the `develop-web-game` browser loop, including the lee-pocket artifact in `output/lane-2-main-183-browser-lee-pocket/shot-0.png`.

### ECO-20260402-scout-145

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `Prepare a beach content parity handoff`
- Source: `docs/reports/2026-04-03-beach-content-parity-handoff.md`
- Packet: `.agents/packets/071-beach-content-parity-phase.json`
- Depends on: `none`

Goal:

- Prepare one science-safe beach enrichment pack that raises front-half content density without touching progression systems.

Acceptance:

- writes a concrete handoff for `ECO-20260402-main-183`
- identifies real Pacific-coast entries and authored placements

Completion notes:

- Wrote `docs/reports/2026-04-03-beach-content-parity-handoff.md`, narrowing the first beach parity wave to two promoted Pacific dune carriers (`dune-lupine`, `beach-strawberry`) plus one new wrack-line decomposer (`beach-hopper`) instead of adding more shell clutter or scrub-heavy shrubs.
- Updated packet `071` to version `2`, added a supporting `beach-hopper` row to `docs/science-source-ledger.md`, recorded the durable front-half coastal guardrail in project memory, and promoted `ECO-20260402-main-183` to `READY`.

### ECO-20260402-scout-153

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Prepare a coastal-scrub bluff traversal handoff`
- Source: `docs/reports/2026-04-03-coastal-scrub-bluff-handoff.md`
- Packet: `.agents/packets/077-coastal-scrub-bluff-proof-phase.json`
- Depends on: `none`

Goal:

- Prepare one short, recoverable coastal-scrub vertical proof that teaches wind exposure and shelter through space.

Acceptance:

- writes a concrete handoff for `ECO-20260402-main-191`
- stays inside the existing platform and climbable runtime

Completion Note:

- Wrote `docs/reports/2026-04-03-coastal-scrub-bluff-handoff.md`, narrowing the first coastal-scrub vertical proof to one optional three-step bluff shoulder above the current swale bridge instead of a broader biome-height rewrite.
- Grounded the handoff in the live `shrub-thicket -> windbreak-swale` geometry, the current coastal-scrub test coverage, and packet `077`'s guardrails so `main-191` can implement one calm exposed-vs-sheltered route without new traversal systems or new content pressure.

### ECO-20260402-main-191

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Implement coastal-scrub bluff traversal`
- Source: `docs/reports/2026-04-03-coastal-scrub-bluff-implementation.md`
- Packet: `.agents/packets/077-coastal-scrub-bluff-proof-phase.json`
- Depends on: `ECO-20260402-scout-153`

Goal:

- Add one short coastal-scrub bluff route using the current traversal systems.

Acceptance:

- the bluff is recoverable and teaches wind-exposure shelter
- no new traversal mechanic appears

Completion Note:

- Added a three-step `windbreak-bluff-*` shoulder above the existing `windbreak-swale` bridge in `src/content/biomes/coastal-scrub.ts`, keeping the original swale logs as the low route and using no new traversal systems.
- Extended `src/test/coastal-scrub-biome.test.ts` and `src/test/runtime-smoke.test.ts` to lock the height order, crest reach, and safe return back to the low route; verified with the focused test slice, `npm run build`, `npm run validate:agents`, the required web-game client smoke pass in `output/main-191-client-smoke/`, and seeded browser captures in `output/main-191-browser/` with zero console errors.

### ECO-20260402-scout-154

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Prepare beach spatial extension handoff`
- Source: `docs/reports/2026-04-03-beach-spatial-extension-handoff.md`
- Packet: `.agents/packets/078-beach-spatial-extension-phase.json`
- Depends on: `ECO-20260402-critic-164`

Goal:

- Prepare a gentle beach spatial-extension pass around shelter and viewpoint.

Acceptance:

- writes a concrete handoff for `ECO-20260402-main-192`
- keeps the extension broad and recoverable

Completion Note:

- Wrote `docs/reports/2026-04-03-beach-spatial-extension-handoff.md`, narrowing the next beach pass to two authored micro-families: one gentle dune-crest viewpoint to the right of the inland corridor door and one sheltered tidepool approach on the far-right seam.
- Kept packet `078` inside the current beach runtime and content pack, explicitly preserving the live lee-pocket, inland travel anchor, and forgiving recovery rule while promoting `ECO-20260402-main-192`.

### ECO-20260402-critic-164

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Review coastal-scrub bluff traversal`
- Source: `docs/reports/2026-04-03-coastal-scrub-bluff-review.md`
- Packet: `.agents/packets/077-coastal-scrub-bluff-proof-phase.json`
- Depends on: `ECO-20260402-main-191`

Goal:

- Review whether the bluff proof is readable and cozy.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260402-scout-154` if clean

Completion Note:

- Wrote `docs/reports/2026-04-03-coastal-scrub-bluff-review.md` and found no blocking issues: the bluff stays optional, recoverable, and screen-local while giving coastal scrub one clear sheltered-versus-exposed read.
- Rechecked the focused bluff test slice and the seeded browser proof in `output/main-191-browser/`, then promoted `ECO-20260402-scout-154` for the next lane-3 handoff.

### ECO-20260402-main-192

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Implement beach spatial extension`
- Source: `docs/reports/2026-04-03-beach-spatial-extension-implementation.md`
- Packet: `.agents/packets/078-beach-spatial-extension-phase.json`
- Depends on: `ECO-20260402-scout-154`

Goal:

- Extend beach spatial variety with a sheltered approach and a gentle dune viewpoint.

Acceptance:

- beach gains more movement interest without a new system
- all added spaces remain forgiving

Completion Note:

- Added two authored micro-families to `src/content/biomes/beach.ts`: a three-step `dune-crest-*` rise just right of the inland side and a three-step `tidepool-approach-*` family on the far-right seam, while keeping the live lee-pocket family intact between them.
- Extended `src/test/beach-biome.test.ts` and `src/test/runtime-smoke.test.ts` to lock the new platform order, authored clue placements, crest reach, and safe tidepool recovery; verified with the focused test slice, `npm run build`, the required web-game client smoke pass in `output/main-192-client-smoke/`, and seeded browser captures in `output/main-192-browser/` with zero console errors. The only follow-up watch item is that the broader beach `map-return` target still falls within range from the dune-crest proof state even though the inland corridor door itself stays out of range.

### ECO-20260402-critic-165

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Review beach spatial extension`
- Source: `docs/reports/2026-04-03-beach-spatial-extension-review.md`
- Packet: `.agents/packets/078-beach-spatial-extension-phase.json`
- Depends on: `ECO-20260402-main-192`

Goal:

- Review whether the beach extension stays readable and cozy.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260402-scout-155` if clean

Completion Note:

- Wrote `docs/reports/2026-04-03-beach-spatial-extension-review.md` and found one blocker: the new dune-crest family currently sits inside the beach `map-return` interaction radius, so the crest reward state reads as `COAST MAP` instead of a scenic rise.
- Rechecked the beach proofs in `src/test/beach-biome.test.ts` and `src/test/runtime-smoke.test.ts`, the seeded browser captures in `output/main-192-browser/`, and a fresh shared-client pass in `output/critic-165-client/`, then queued `ECO-20260403-main-207` plus `ECO-20260403-critic-208` to separate the crest from map-return range before lane 3 continues.

### ECO-20260403-main-207

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Separate the beach dune crest from map-return range`
- Source: `docs/reports/2026-04-03-beach-crest-spacing-fix-implementation.md`
- Packet: `.agents/packets/087-beach-crest-spacing-fix.json`
- Depends on: `ECO-20260402-critic-165`

Goal:

- Keep the new dune crest as a scenic reward beat instead of a travel prompt hotspot.

Acceptance:

- the dune-crest proof state no longer shows an in-range travel target
- the beach still reads as dune rise -> lee-pocket -> tidepool approach
- the inland corridor remains the first obvious left-side travel anchor

Completion Note:

- Moved the beach `mapReturnPost` left in `src/content/world-map.ts` so the dune-crest reward state clears the map-return interaction radius without changing the beach platform families or corridor door placement.
- Extended `src/test/runtime-smoke.test.ts` and `src/test/world-map.test.ts` to require a null travel target at the crest and to keep the post left of the `dune-crest-view` by more than travel reach; verified with the focused world-map/runtime slice, `npm run build`, the required shared client pass in `output/main-207-client/`, and deterministic Playwright browser proof in `output/main-207-browser/` with zero captured console errors.

### ECO-20260403-critic-208

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Review the beach crest-spacing fix`
- Source: `docs/reports/2026-04-03-beach-crest-spacing-fix-review.md`
- Packet: `.agents/packets/087-beach-crest-spacing-fix.json`
- Depends on: `ECO-20260403-main-207`

Goal:

- Review whether the dune crest now reads as a quiet view beat without harming the rest of the beach extension.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260402-scout-155` if clean

Completion Note:

- Wrote `docs/reports/2026-04-03-beach-crest-spacing-fix-review.md` and found no blocking issues: the shifted beach map-return post stays reachable on approach while the fixed crest proof now clears all in-range travel targets.
- Rechecked the focused world-map/runtime proof slice plus the fresh artifacts in `output/main-207-client/` and `output/main-207-browser/`, then promoted `ECO-20260402-scout-155` so lane 3 can move on to the tundra handoff.

### ECO-20260402-scout-155

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Prepare tundra spatial depth handoff`
- Source: `docs/reports/2026-04-03-tundra-spatial-depth-handoff.md`
- Packet: `.agents/packets/079-tundra-spatial-depth-phase.json`
- Depends on: `ECO-20260403-critic-208`

Goal:

- Prepare one tundra spatial-depth pass for thaw-skirt and frost-ridge.

Acceptance:

- writes a concrete handoff for `ECO-20260402-main-193`
- keeps tundra open, low, and recoverable

Completion Note:

- Wrote `docs/reports/2026-04-03-tundra-spatial-depth-handoff.md`, narrowing packet `079` to one shallow `meltwater-edge` hold after the current snow lip so the top-end tundra family resolves as a wet pocket instead of another quick open strip.
- Refreshed packet `079` to version `2`, grounded the recommendation in `src/content/biomes/tundra.ts`, the focused tundra traversal tests, and the live browser baselines in `output/main-167-browser/` plus `output/main-143-browser/`, then promoted `ECO-20260402-main-193`.

### ECO-20260402-main-193

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Implement tundra spatial depth`
- Source: `docs/reports/2026-04-03-tundra-spatial-depth-handoff.md`
- Packet: `.agents/packets/079-tundra-spatial-depth-phase.json`
- Depends on: `ECO-20260402-scout-155`

Goal:

- Deepen the tundra family with a little more authored relief and placement.

Acceptance:

- thaw-skirt and frost-ridge feel more like places than corridors
- spacing stays forgiving and readable

Completion Note:

- Wrote `docs/reports/2026-04-03-tundra-spatial-depth-implementation.md`, spending the pass on one low `meltwater-bank-rest` plus two wet-edge carriers so the far-right tundra now reads as a shallow thaw pocket instead of another quick release.
- Extended `src/test/tundra-biome.test.ts` and `src/test/runtime-smoke.test.ts` to require the new rest, the authored carrier cluster, and the clean release into open ground; verified with the focused tundra slice, `npm run build`, a shared client smoke pass in `output/main-193-client-smoke/`, and a seeded browser proof in `output/main-193-browser/` with zero captured errors.
- Promoted `ECO-20260402-critic-166` to `READY`.

### ECO-20260402-critic-166

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Review tundra spatial depth`
- Source: `docs/reports/2026-04-03-tundra-spatial-depth-review.md`
- Packet: `.agents/packets/079-tundra-spatial-depth-phase.json`
- Depends on: `ECO-20260402-main-193`

Goal:

- Review whether the new tundra depth stays calm and legible.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260402-scout-156` if clean

Completion Note:

- Wrote `docs/reports/2026-04-03-tundra-spatial-depth-review.md` and found no blocking issues: the new `meltwater-bank-rest` reads as a tiny thaw pocket, the authored willow and cottongrass clarify the wet gradient, and the route still releases cleanly into open ground.
- Rechecked the focused tundra proofs plus the fresh browser artifacts in `output/main-193-browser/`, noting only a non-blocking density watch that future tundra content should avoid stacking more right-edge flora onto this same pocket.
- Promoted `ECO-20260402-scout-156` to `READY`.

### ECO-20260402-scout-156

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Prepare forest sub-canopy waypoint handoff`
- Source: `docs/reports/2026-04-03-forest-sub-canopy-waypoint-handoff.md`
- Packet: `.agents/packets/080-forest-sub-canopy-waypoint-phase.json`
- Depends on: `ECO-20260402-critic-166`

Goal:

- Prepare one habitat-first forest waypoint pass inside the current vertical family.

Acceptance:

- writes a concrete handoff for `ECO-20260402-main-194`
- keeps waypoints observational, not gating

Completion Note:

- Wrote `docs/reports/2026-04-03-forest-sub-canopy-waypoint-handoff.md`, narrowing the next forest follow-on to two cue-anchored waypoint passes: one cave-mouth observation point around `stone-basin-return-light` and one canopy rest nook around `old-growth-inner-rest-light`.
- Bumped packet `080` to version `2`, added the new handoff as its source report, extended the file targets to include focused runtime coverage, and kept the scope off new climbables, world-size changes, or extra height above the current crown-rest ceiling.
- Promoted `ECO-20260402-main-194` to `READY` and retargeted `ECO-20260402-critic-167` to the new handoff report.

### ECO-20260402-main-194

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Implement forest sub-canopy waypoints`
- Source: `docs/reports/2026-04-03-forest-sub-canopy-waypoint-implementation.md`
- Packet: `.agents/packets/080-forest-sub-canopy-waypoint-phase.json`
- Depends on: `ECO-20260402-scout-156`

Goal:

- Add one canopy nook and one cave-mouth observation point as quiet habitat waypoints.

Acceptance:

- forest vertical spaces feel more like habitats than corridors
- no new progression gates or traversal rewrites appear

Completion Note:

- Wrote `docs/reports/2026-04-03-forest-sub-canopy-waypoint-implementation.md`, adding `filtered-return-mouth-sill` plus `filtered-return-mouth-moss` on the cave-return side and `canopy-inner-rest-crook` plus `canopy-inner-rest-beard` around the upper old-growth cue without adding climbables, world width, or extra crown height.
- Extended `src/test/forest-biome.test.ts` and `src/test/runtime-smoke.test.ts` to prove both waypoint bands stay inside the existing forest route family, then verified with the focused forest biome/runtime slice and `npm run build`.
- Captured a live browser cave proof in `output/main-194-browser/cave-mouth-waypoint.png`, saved matching cave and canopy state artifacts in `output/main-194-browser/`, recorded an empty browser error buffer, and promoted `ECO-20260402-critic-167` to `READY`.

### ECO-20260402-critic-167

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Review forest sub-canopy waypoints`
- Source: `docs/reports/2026-04-03-forest-sub-canopy-waypoint-review.md`
- Packet: `.agents/packets/080-forest-sub-canopy-waypoint-phase.json`
- Depends on: `ECO-20260402-main-194`

Goal:

- Review whether the waypoints deepen habitat feel without route noise.

Acceptance:

- records findings or a clean review in `docs/reports/`
- leaves lane 3 ready for the next wave if clean

Completion Note:

- Wrote `docs/reports/2026-04-03-forest-sub-canopy-waypoint-review.md` with a clean review, confirming the new cave-mouth shelf and canopy crook deepen habitat feel without adding route noise or new traversal language.
- Reviewed the focused forest biome/runtime slice plus the fresh cave browser proof and cave/canopy state artifacts in `output/main-194-browser/`, with no browser errors recorded.
- Promoted `ECO-20260403-scout-165` to `READY` and left one watch item: require a real browser canopy frame if a future lane-3 pass spends that same upper old-growth band again.

### ECO-20260403-critic-176

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Review the coastal family follow-on`
- Source: `docs/reports/2026-04-03-coastal-family-follow-on-review.md`
- Packet: `.agents/packets/085-coastal-family-and-waypoint-phase.json`
- Depends on: `ECO-20260403-main-203`

Goal:

- Review whether the coast family reads clearly and stays broad and cozy.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260403-scout-166` if clean

Completion Note:

- Wrote `docs/reports/2026-04-03-coastal-family-follow-on-review.md` and found one blocker: the new left-hand `coastal-scrub` gather currently sits inside the biome's `COAST MAP` interaction range, so the browser proof reads as travel UI first and sheltered scrub second.
- Rechecked the focused coastal biome/runtime proofs, the shared client smoke in `output/main-203-client-smoke/`, and the seeded browser proof in `output/main-203-browser/`, where the intended gather state still reports `nearbyTravelTarget` as in-range `map-return`.
- Queued the narrow fix pair `ECO-20260403-main-209` / `ECO-20260403-critic-210` under packet `088` and kept `ECO-20260403-scout-166` blocked until the map-post spacing issue is resolved cleanly.

### ECO-20260403-critic-210

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Review the coastal map-post spacing fix`
- Source: `docs/reports/2026-04-03-coastal-map-post-spacing-fix-review.md`
- Packet: `.agents/packets/088-coastal-map-post-spacing-fix.json`
- Depends on: `ECO-20260403-main-209`

Goal:

- Review whether the coastal gather now reads as habitat first without harming the scrub map-return anchor.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260403-scout-166` if clean

Completion Note:

- Wrote `docs/reports/2026-04-03-coastal-map-post-spacing-fix-review.md` and found no blocking issues: the shifted post remains usable as a left-half interior world anchor while the new gather proof now clears `nearbyTravelTarget` and keeps the player's focus on sheltered scrub habitat.
- Rechecked the focused world-map/runtime slice, the shared client artifacts in `output/main-209-client/`, and the seeded browser proof in `output/main-209-browser/`, noting only one non-blocking watch item: avoid stacking another authored beat directly onto this same left-half post band.
- Promoted `ECO-20260403-scout-166` to `READY` so lane 3 can move on to the waypoint-rest follow-on scout pass.

### ECO-20260403-main-209

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Separate the coastal gather from map-return range`
- Source: `docs/reports/2026-04-03-coastal-map-post-spacing-fix-implementation.md`
- Packet: `.agents/packets/088-coastal-map-post-spacing-fix.json`
- Depends on: `ECO-20260403-critic-176`

Goal:

- Keep the new left-hand `coastal-scrub` gather as a habitat beat instead of a travel hotspot.

Acceptance:

- the gather proof no longer shows an in-range `COAST MAP` target
- the map-return post is still reachable from the same coastal-scrub interior approach
- no coastal-scrub geometry or corridor runtime changes are introduced

Completion Note:

- Wrote `docs/reports/2026-04-03-coastal-map-post-spacing-fix-implementation.md`, moving only the `coastal-scrub` `mapReturnPost` left of the new gather band in `src/content/world-map.ts` and leaving the gather, bluff, swale, and corridor geometry untouched.
- Extended `src/test/world-map.test.ts` and `src/test/runtime-smoke.test.ts` so the intended gather state now requires a null `nearbyTravelTarget` while the shifted post still supports the same-biome map round-trip from the left-half interior approach.
- Verified with the focused world-map/runtime slice, `npm run build`, the required shared client pass in `output/main-209-client/`, and a seeded browser proof in `output/main-209-browser/` with zero recorded browser errors. Promoted `ECO-20260403-critic-210` to `READY`.

### ECO-20260403-main-203

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Implement the coastal family follow-on`
- Source: `docs/reports/2026-04-03-coastal-family-follow-on-implementation.md`
- Packet: `.agents/packets/085-coastal-family-and-waypoint-phase.json`
- Depends on: `ECO-20260403-scout-165`

Goal:

- Connect the new front-half coast spaces into a more coherent sheltered rise family.

Acceptance:

- the coast feels more like one spatial family
- no new traversal engine or harsher difficulty appears

Completion Note:

- Wrote `docs/reports/2026-04-03-coastal-family-follow-on-implementation.md`, keeping the pass entirely inside `src/content/biomes/coastal-scrub.ts` and adding one compact left-hand gather into the live windbreak family with `windbreak-gather-log`, `windbreak-gather-lift`, plus authored `nootka-rose` and `dune-lupine`.
- Updated the focused biome/runtime proofs in `src/test/coastal-scrub-biome.test.ts` and `src/test/runtime-smoke.test.ts` so the new gather lands before the preserved `windbreak-*` chain and still flows into the optional bluff shoulder and low recovery line.
- Verified with `npm test -- --run src/test/coastal-scrub-biome.test.ts src/test/runtime-smoke.test.ts src/test/vertical-cues.test.ts`, `npm run build`, the required shared client smoke in `output/main-203-client-smoke/`, and a seeded browser proof in `output/main-203-browser/` with no recorded browser errors. Promoted `ECO-20260403-critic-176` to `READY`.

### ECO-20260403-scout-165

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `Prepare a coastal family follow-on handoff`
- Source: `docs/reports/2026-04-03-coastal-family-follow-on-handoff.md`
- Packet: `.agents/packets/085-coastal-family-and-waypoint-phase.json`
- Depends on: `ECO-20260402-critic-167`

Goal:

- Prepare a front-half coastal family continuation after the bluff and beach extension wave.

Acceptance:

- writes a concrete handoff for `ECO-20260403-main-203`
- keeps the family recoverable and cozy

Completion Note:

- Wrote `docs/reports/2026-04-03-coastal-family-follow-on-handoff.md`, narrowing the next coast pass to one compact left-side gather into the existing `coastal-scrub` windbreak family instead of spending more geometry on beach or corridor runtime.
- Bumped packet `085` to version `2`, added the new handoff as a source report, and locked `main-203` onto the `shrub-thicket -> windbreak-swale` band with preserved `windbreak-*` ids and current shared coastal carriers.
- Promoted `ECO-20260403-main-203` to `READY` and retargeted `ECO-20260403-critic-176` to the new handoff report.

### ECO-20260403-scout-157

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `Prepare the first beach Route v2 outing handoff`
- Source: `docs/reports/2026-04-03-beach-route-v2-handoff.md`
- Packet: `.agents/packets/081-beach-route-v2-and-filing-phase.json`
- Depends on: `none`

Goal:

- Prepare one clear front-half beach outing that uses the live Route v2 seam and the existing notebook return flow.

Acceptance:

- writes a concrete handoff for `ECO-20260403-main-195`
- keeps the outing notebook-first and readable

Completion Note:

- Wrote `docs/reports/2026-04-03-beach-route-v2-handoff.md`, narrowing the first beach Route v2 step to one `transect-evidence` outing through `dune-edge -> lee-pocket -> tide-line` using `beach-grass`, `driftwood-log`, and `bull-kelp-wrack`.
- Kept the handoff on already-shipped beach spaces and the current notebook-return seam, and explicitly directed `main-195` to extend the beach beat lane 1 lands in place instead of creating a second overlapping beach request.
- Bumped packet `081` to version `2` and retargeted `ECO-20260403-main-195` plus `ECO-20260403-critic-168` to this scout report. `main-195` remains blocked only on `ECO-20260402-critic-151`.

### ECO-20260402-scout-140

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Prepare a beach field-season integration handoff`
- Source: `docs/reports/2026-04-03-lane-1-front-half-and-season-follow-ons.md`
- Packet: `.agents/packets/068-beach-field-season-integration-phase.json`
- Depends on: `none`

Goal:

- Prepare one compact beach season-board beat that brings the front half into the field-season loop without adding a new shell.

Acceptance:

- writes a concrete handoff for `ECO-20260402-main-178`
- stays inside the current board and notice seams

Completion notes:

- Wrote `docs/reports/2026-04-03-beach-field-season-integration-handoff.md`, narrowing `main-178` to one shell-safe pass: keep the coastal board at three beats, make the first beat visibly beach-led on fresh saves, and only tighten starter guided copy if that helps the opener read cleanly.
- Updated packet `068` to version `2` with the handoff report, concrete file targets, and an explicit no-fourth-beat guardrail; promoted `ECO-20260402-main-178` to `READY`.

### ECO-20260402-main-178

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Implement the beach season-board beat`
- Source: `docs/reports/2026-04-03-beach-field-season-integration-handoff.md`
- Packet: `.agents/packets/068-beach-field-season-integration-phase.json`
- Depends on: `ECO-20260402-scout-140`

Goal:

- Add one starter-grade beach beat to the existing field-season board without changing the shell.

Acceptance:

- beach appears in the current season-board flow
- the change stays inside current board and notice seams

Completion notes:

- Landed the fresh-save beach-led opener in `src/engine/field-season-board.ts` and `src/engine/guided-field-season.ts`: the first coastal season beat now reads `Beach To Hollow`, the clue-facing wrap and travel-facing next step both use `inland` language, and the starter station note plus prompt notice now acknowledge the beach-to-forest opener without changing the live route structure.
- Updated the focused starter-season expectations in `src/test/field-season-board.test.ts`, `src/test/guided-field-season.test.ts`, and `src/test/runtime-smoke.test.ts`; wrote `docs/reports/2026-04-03-beach-field-season-implementation.md`; and promoted `ECO-20260402-critic-151` to `READY`.

### ECO-20260402-critic-151

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Review the beach season-board integration`
- Source: `docs/reports/2026-04-03-beach-field-season-implementation.md`
- Packet: `.agents/packets/068-beach-field-season-integration-phase.json`
- Depends on: `ECO-20260402-main-178`

Goal:

- Review whether beach now fits the season board cleanly and calmly.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260402-scout-141` if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-beach-field-season-review.md`. Review is clean: the fresh-save board now reads like one beach-to-forest chapter, the guidance stays travel-clear, and the three-beat shell remains intact.
- Promoted `ECO-20260402-scout-141` to `READY`. Non-blocking watch: the fresh-save clue-facing `TODAY` strip is near the current handheld width ceiling, so future front-half warmth copy should tighten rather than lengthen that line.

### ECO-20260402-scout-141

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Prepare a beach station-return warmth handoff`
- Source: `docs/reports/2026-04-03-beach-field-season-review.md`
- Packet: `.agents/packets/068-beach-field-season-integration-phase.json`
- Depends on: `ECO-20260402-critic-151`

Goal:

- Prepare one compact front-half station-return warmth follow-on for beach.

Acceptance:

- writes a concrete handoff for `ECO-20260402-main-179`
- stays in existing notice and routes-board seams

Completion notes:

- Wrote `docs/reports/2026-04-03-beach-station-return-warmth-handoff.md`, narrowing `main-179` to one compact copy family across the coastal board summary, `RETURN TO STATION` note, and `FIELD STATION` prompt notice.
- Bumped packet `068` to version `3`, kept the pass inside the existing station-return seam, and promoted `ECO-20260402-main-179` to `READY`.

### ECO-20260402-main-179

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Implement beach station-return warmth`
- Source: `docs/reports/2026-04-03-beach-station-return-warmth-handoff.md`
- Packet: `.agents/packets/068-beach-field-season-integration-phase.json`
- Depends on: `ECO-20260402-scout-141`

Goal:

- Make station return from beach feel as guided as the inland half.

Acceptance:

- beach return copy is compact and warm
- no new station page or recap surface appears

Completion notes:

- Landed the compact station-return warmth family in `src/engine/field-season-board.ts` and `src/engine/guided-field-season.ts`: the coastal board summary now keeps the beach-led chapter alive, while the station note and world-map notice point cleanly at `Trail Stride` without changing menu behavior or the upgrade flow.
- Updated the focused station-return expectations in `src/test/field-season-board.test.ts`, `src/test/guided-field-season.test.ts`, and `src/test/runtime-smoke.test.ts`; wrote `docs/reports/2026-04-03-beach-station-return-warmth-implementation.md`; and promoted `ECO-20260402-critic-152` to `READY`.

### ECO-20260402-critic-152

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Review beach station-return warmth`
- Source: `docs/reports/2026-04-03-beach-station-return-warmth-implementation.md`
- Packet: `.agents/packets/068-beach-field-season-integration-phase.json`
- Depends on: `ECO-20260402-main-179`

Goal:

- Review whether beach return warmth stays calm and shell-safe.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260402-scout-142` if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-beach-station-return-warmth-review.md`. Review is clean: the routes summary, station note, and world-map notice now work together without opening a new surface, and the live notice bubble fits the handheld shell.
- Promoted `ECO-20260402-scout-142` to `READY`. Non-blocking watch: future front-half warmth should keep using the short summary-plus-note-plus-notice family rather than trying to add warmth through a longer active beat title.

### ECO-20260402-scout-142

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Prepare a season-two capstone handoff`
- Source: `docs/reports/2026-04-03-beach-station-return-warmth-review.md`
- Packet: `.agents/packets/069-season-two-capstone-and-wrap-phase.json`
- Depends on: `ECO-20260402-critic-152`

Goal:

- Prepare one compact season-two capstone beat for the existing board and notice flow.

Acceptance:

- writes a concrete handoff for `ECO-20260402-main-180`
- keeps the capstone notebook-toned and compact

Completion notes:

- Wrote `docs/reports/2026-04-03-season-two-capstone-handoff.md`, narrowing `main-180` to one compact return-to-station close cue after `Season Threads` logs instead of another post-capstone shell.
- Bumped packet `069` to version `2`, grounded the handoff in the now-stale calm-season-close seam, and promoted `ECO-20260402-main-180` to `READY`.

### ECO-20260402-main-180

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Implement season capstone notice and board state`
- Source: `docs/reports/2026-04-03-season-two-capstone-handoff.md`
- Packet: `.agents/packets/069-season-two-capstone-and-wrap-phase.json`
- Depends on: `ECO-20260402-scout-142`

Goal:

- Add a season-two closing beat that makes inland completion feel intentional.

Acceptance:

- completed season-two states no longer end silently
- the change stays inside current board and notice seams

Completion notes:

- Landed one persisted post-capstone return seam in `src/engine/guided-field-season.ts`, `src/engine/game.ts`, `src/engine/save.ts`, and `src/engine/types.ts`: after `Season Threads` logs, lane 1 now keeps a short `RETURN TO STATION` guidance beat until the first station reopen, then clears it so the routes-first `High Pass` shell takes over immediately.
- Updated the focused season-flow expectations in `src/test/guided-field-season.test.ts`, `src/test/field-season-board.test.ts`, and `src/test/runtime-smoke.test.ts`, wrote `docs/reports/2026-04-03-season-two-capstone-implementation.md`, and promoted `ECO-20260402-critic-153` to `READY`.

### ECO-20260402-critic-153

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Review season capstone wrap`
- Source: `docs/reports/2026-04-03-lane-1-front-half-and-season-follow-ons.md`
- Packet: `.agents/packets/069-season-two-capstone-and-wrap-phase.json`
- Depends on: `ECO-20260402-main-180`

Goal:

- Review whether the capstone closes the season without bloat.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260402-scout-143` if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-season-two-capstone-review.md`. Review is clean: the new return beat closes `Season Threads` without adding a second station shell, and the routes-first `High Pass` opener still takes over as soon as the station reopens.
- Promoted `ECO-20260402-scout-143` to `READY`. Non-blocking watch: seeded reloads still read the close most clearly through menu default plus station note, so later follow-ons should not spend their only clarity budget assuming the world-map notice bubble will always carry the re-entry alone.

### ECO-20260402-scout-143

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Prepare post-capstone atlas reflection handoff`
- Source: `docs/reports/2026-04-03-lane-1-front-half-and-season-follow-ons.md`
- Packet: `.agents/packets/069-season-two-capstone-and-wrap-phase.json`
- Depends on: `ECO-20260402-critic-153`

Goal:

- Prepare one tiny post-capstone atlas or station reflection beat.

Acceptance:

- writes a concrete handoff for `ECO-20260402-main-181`
- keeps the reflection to a strip or small state change

Completion notes:

- Wrote `docs/reports/2026-04-03-post-capstone-atlas-reflection-handoff.md`, narrowing `main-181` to one atlas-strip reflection after the return beat is acknowledged instead of another archive or recap surface.
- Bumped packet `069` to version `3`, grounded the follow-on in the existing `SEASON ARCHIVE`, `HIGH PASS`, and expedition seams, and promoted `ECO-20260402-main-181` to `READY`.

### ECO-20260402-main-181

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Implement post-capstone atlas reflection`
- Source: `docs/reports/2026-04-03-lane-1-front-half-and-season-follow-ons.md`
- Packet: `.agents/packets/069-season-two-capstone-and-wrap-phase.json`
- Depends on: `ECO-20260402-scout-143`

Goal:

- Leave a visible but compact station-side mark after the season capstone.

Acceptance:

- a tiny atlas or station reflection appears
- no summary page or ceremony shell is added

Completion notes:

- Wrote `docs/reports/2026-04-03-post-capstone-atlas-reflection-implementation.md`. The filed-season routes atlas now swaps to `Filed season: High Pass from Treeline Pass.` only after the one-time season-close return beat has been acknowledged, so the atlas becomes a quiet memory seam instead of repeating the imperative next-step line.
- Verified with `npx vitest run src/test/field-season-board.test.ts`, `npx vitest run src/test/runtime-smoke.test.ts -t "surfaces the season capstone, then opens the next field season on the routes shell"`, `npm run build`, and the shared client pass in `output/lane-1-main-181-client/`. Promoted `ECO-20260402-critic-154` to `READY`.

### ECO-20260402-critic-154

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Review post-capstone reflection`
- Source: `docs/reports/2026-04-03-lane-1-front-half-and-season-follow-ons.md`
- Packet: `.agents/packets/069-season-two-capstone-and-wrap-phase.json`
- Depends on: `ECO-20260402-main-181`

Goal:

- Review whether the capstone reflection is warm but not overbuilt.

Acceptance:

- records findings or a clean review in `docs/reports/`
- promotes `ECO-20260402-scout-144` if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-post-capstone-atlas-reflection-review.md`. Review is clean: the filed atlas note keeps the immediate capstone return, archive strip, `HIGH PASS` card, and expedition footer in their existing jobs while turning the atlas into a quieter season-memory seam.
- Re-verified with `npx vitest run src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts -t "surfaces the season capstone, then opens the next field season on the routes shell"` plus a live filed-season browser proof in `output/lane-1-critic-154-browser/`. Promoted `ECO-20260402-scout-144` to `READY`. Non-blocking watch: the atlas line now fits cleanly, but future lane-1 atlas follow-ons should stay at or below this copy width.

### ECO-20260402-scout-144

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Prepare front-half station warmth handoff`
- Source: `docs/reports/2026-04-03-lane-1-front-half-and-season-follow-ons.md`
- Packet: `.agents/packets/070-front-half-station-warmth-phase.json`
- Depends on: `ECO-20260402-critic-154`

Goal:

- Prepare one station-language pass that makes beach and scrub feel as guided as inland.

Acceptance:

- writes a concrete handoff for `ECO-20260402-main-182`
- keeps the work copy-only and compact

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-station-warmth-handoff.md`, narrowing the remaining front-half gap to the `Trail Stride -> Coastal Scrub` summary plus note plus notice family instead of another broader station rewrite.
- Bumped packet `070` to version `2`, retargeted its file scope to `field-season-board`, `guided-field-season`, and their focused tests, and promoted `ECO-20260402-main-182` to `READY`.

### ECO-20260402-main-182

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Implement front-half station warmth`
- Source: `docs/reports/2026-04-03-lane-1-front-half-and-season-follow-ons.md`
- Packet: `.agents/packets/070-front-half-station-warmth-phase.json`
- Depends on: `ECO-20260402-scout-144`

Goal:

- Add a front-half warmth pass to the existing station language.

Acceptance:

- beach and scrub station phrasing feels warmer and more guided
- no new station surface appears

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-station-warmth-implementation.md`. The front-half warmth now lives in the approved summary plus note plus notice family: `COASTAL SHELTER LINE` gets a beach-to-scrub chapter summary, `NEXT STOP` gets a shorter shelter-shift pair, and the first scrub-visit `FIELD SEASON OPEN` note stays front-half-specific until the coastal line is filed.
- Verified with focused `field-season-board`, `guided-field-season`, and `runtime-smoke` coverage, `npm run build`, the shared client pass in `output/lane-1-main-182-client/`, and seeded runtime/browser checks. Promoted `ECO-20260402-critic-155` to `READY`.

### ECO-20260402-critic-155

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `Review front-half station warmth`
- Source: `docs/reports/2026-04-03-lane-1-front-half-and-season-follow-ons.md`
- Packet: `.agents/packets/070-front-half-station-warmth-phase.json`
- Depends on: `ECO-20260402-main-182`

Goal:

- Review whether the front-half station copy stays warm without becoming tutorial-heavy.

Acceptance:

- records findings or a clean review in `docs/reports/`
- leaves lane 1 ready for the next wave if clean

Completion notes:

- Wrote `docs/reports/2026-04-03-front-half-station-warmth-review.md`. Review is clean: the coastal summary, `NEXT STOP` pair, and pre-inland settled note all spend their budget in the right compact seams without widening the beat title or reopening the station shell.
- Reviewed the focused lane-1 test pass, build, shared client smoke, and seeded runtime/browser checks. Non-blocking watch: future front-half guidance should keep using the summary plus note plus notice family instead of adding more words to the active beat title or another recap strip.

### ECO-20260328-main-23

- Status: `DONE`
- Owner: `main-agent`
- Priority: `P2`
- Title: `Tighten field-guide prompt safety and fallback messaging`
- Source: `docs/reports/2026-03-28-field-guide-review.md`
- Packet: `.agents/packets/005-ai-field-guide.json`
- Depends on: `ECO-20260328-main-22`

Goal:

- Keep clipboard Mode A, but remove spoiler and hallucination pressure from the copied prompt and make the failure notice feel a little more player-facing.

Acceptance:

- the copied prompt does not expose exact undiscovered species names
- the prompt instructions ask for grounded ecological relationships without pressuring the model to invent unsupported processes
- the failed-copy notice gives one short next-step hint without adding heavy UI
- build and tests stay green

Completion note:

- Updated `src/engine/field-guide.ts` so the copied prompt now hides undiscovered exact names, summarizes hidden biome content by category counts, and explicitly tells the model to stay within relationships the current context can actually support.
- Refined the field-guide failure toast in `src/engine/overlay-render.ts` and `src/engine/game.ts` so copy failures show a short retry hint instead of a debug-sounding warning, while keeping the lightweight in-canvas notice pattern.
- Added stricter prompt-safety assertions in `src/test/field-guide.test.ts` and `src/test/runtime-smoke.test.ts`, refreshed `docs/ai-naturalist-design.md`, then re-verified with `npm test -- --run`, `npm run build`, and headless browser captures for both successful copy and failed-copy notice states with zero console errors.


### ECO-20260328-main-20

- Status: `DONE`
- Owner: `main-agent`
- Priority: `P3`
- Title: `Tighten title-screen copy budgets so key onboarding text never truncates silently`
- Source: `docs/reports/2026-03-28-readability-pass-review.md`
- Packet: `.agents/packets/004-readability-runtime-ecology.json`
- Depends on: `ECO-20260328-main-12`

Goal:

- Preserve the clean `192x144` title layout while making sure the onboarding copy still communicates the journal loop and other core ideas.

Acceptance:

- the title subtitle keeps the `field journal` idea visible inside the current safe area
- the solution uses a real copy budget or equivalent guardrail, not a one-off nudge
- build and tests stay green

Completion note:

- Replaced wrapped title subtitle text with explicit budgeted subtitle/flavor lines in `src/engine/title-copy.ts`, so the title screen keeps the `field journal` concept without relying on silent wrap truncation.
- Updated `src/engine/overlay-render.ts` to render the budgeted lines directly, preserving the current shell layout while removing the previous wrap-and-clip risk.
- Added `src/test/title-copy.test.ts` to guard the title copy budgets, then re-verified with `npm test -- --run`, `npm run build`, and a fresh headless title-screen screenshot with no console errors.


### ECO-20260328-main-12

- Status: `DONE`
- Owner: `main-agent`
- Priority: `P2`
- Title: `Wire the field guide into the menu with clipboard Mode A`
- Source: `docs/ai-naturalist-design.md`
- Packet: `.agents/packets/005-ai-field-guide.json`
- Depends on: `ECO-20260328-main-11`

Goal:

- Add a `Field guide` action to the in-game menu that assembles the current field-guide prompt, copies it to the clipboard, and shows a short confirmation state.

Acceptance:

- the action is available only in biome play, not on the world map or during transitions
- activating it copies the generated prompt to the clipboard
- the game shows a brief confirmation without heavy new chrome
- build and tests stay green

Completion note:

- Added a biome-only `Field guide` menu action, a small clipboard helper, and a lightweight in-game copy toast without exposing prompt contents in `render_game_to_text()`.
- Wired safe menu metadata into the debug state so title and play menus can verify the action appears only when expected, while the actual copied prompt stays out of runtime text surfaces.
- Added clipboard coverage plus expanded runtime smoke coverage, then re-verified with `npm test -- --run`, `npm run build`, and headless browser screenshots for title menu, play menu, and copied-toast states with zero console errors.


### ECO-20260328-critic-06

- Status: `DONE`
- Owner: `critic-agent`
- Priority: `P2`
- Title: `Review field-guide prompt quality and clipboard UX`
- Source: `docs/reports/2026-03-28-field-guide-review.md`
- Packet: `.agents/packets/005-ai-field-guide.json`
- Depends on: `ECO-20260328-main-12`

Goal:

- Review whether the field-guide prompt and confirmation flow are readable, science-safe, and worthwhile for kids and co-players.

Acceptance:

- critique checks prompt quality, wording, and menu fit
- notes call out hallucination or overclaim risk in the prompt framing
- any next-step fixes get added back to the queue if needed

Completion note:

- Confirmed that clipboard Mode A is a good fit for the current menu flow: the action appears only during biome play, the success toast is lightweight, and the copied prompt stays out of debug surfaces.
- Logged the main prompt-quality risk in `docs/reports/2026-03-28-field-guide-review.md`: the copied prompt currently reveals exact undiscovered species names and asks the model for stronger ecological claims than the current local context can safely support.
- Added one focused follow-up task so prompt safety and the failed-copy toast can be tightened before any direct API field-guide mode is revisited.


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
