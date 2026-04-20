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

## Intake

Use this section for newly discovered work that is not yet approved or prioritized.

## Done

### ECO-20260419-critic-323

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Review High Pass end-to-end route-loop proof`
- Source: `docs/reports/2026-04-19-high-pass-route-loop-proof-review.md`
- Packet: `.agents/packets/129-high-pass-closure-and-alpha-playthrough-hardening.json`
- Depends on: `ECO-20260419-main-323`

Goal:

- Review whether the current playable arc is now smoke-proofed through High Pass completion.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms filed state is stable across station, map, journal/notice, and request state
- confirms no new Route v2 framework was added

Completion notes:

- Added `docs/reports/2026-04-19-high-pass-route-loop-proof-review.md`, finding no blocker in the final packet-129 proof.
- Confirmed the route-loop smoke now files High Pass from the live talus-hold path and verifies filed notice, completion, cleared route progress, cleared active request, cleared map replay/marker cues, and no active journal request.

### ECO-20260419-main-323

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Implement High Pass end-to-end route-loop proof`
- Source: `docs/reports/2026-04-19-high-pass-route-loop-proof-implementation.md`
- Packet: `.agents/packets/129-high-pass-closure-and-alpha-playthrough-hardening.json`
- Depends on: `ECO-20260419-scout-323`, `ECO-20260419-critic-320`, `ECO-20260419-critic-321`, `ECO-20260419-critic-322`, `ECO-20260419-critic-324`, `ECO-20260419-critic-325`

Goal:

- Add deterministic coverage proving the route loop holds from season closure into High Pass filing and filed-state feedback.

Acceptance:

- smoke coverage reaches High Pass ready-to-file and filed states
- support behavior and replay labels settle correctly after filing
- final filing notice priority uses the correct filed feedback

Completion notes:

- Added `docs/reports/2026-04-19-high-pass-route-loop-proof-implementation.md` and a focused runtime smoke that completes `talus-hold`, files `HIGH PASS` from the station routes page, and verifies the filed arc settles across notice, save, station, world map, journal, and active request state.
- Verified with `npm test -- --run src/test/runtime-smoke.test.ts -t "High Pass.*file|files High Pass|route-loop|talus-hold"`.

### ECO-20260419-critic-322

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `Review High Pass final-return readability polish`
- Source: `docs/reports/2026-04-19-high-pass-final-return-readability-review.md`
- Packet: `.agents/packets/129-high-pass-closure-and-alpha-playthrough-hardening.json`
- Depends on: `ECO-20260419-main-322`

Goal:

- Review whether the final route moment is readable without adding more High Pass density.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the final moment and return path are legible
- confirms no extra destination density was added

Completion notes:

- Added `docs/reports/2026-04-19-high-pass-final-return-readability-review.md`, finding no blocker in the proof-first lane-3 closure.
- Confirmed the final `talus-hold` moment now has deterministic coverage for open-fell arrival, `Ready To File`, no competing travel prompt, and the `NOTEBOOK READY` return-to-field-station notice without adding High Pass density.
- Re-verified with `npm test -- --run src/test/runtime-smoke.test.ts -t "lets hand lens prefer talus cushion pocket as the High Pass talus-hold clue on the live open-fell pocket"`.

### ECO-20260419-main-322

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `Implement High Pass final-return readability polish`
- Source: `docs/reports/2026-04-19-high-pass-final-return-readability-implementation.md`
- Packet: `.agents/packets/129-high-pass-closure-and-alpha-playthrough-hardening.json`
- Depends on: `ECO-20260419-scout-322`

Goal:

- Improve the final High Pass/talus-hold route moment only as needed so arrival and return are legible.

Acceptance:

- the end of High Pass feels like a place the player arrived at
- return to station or map is legible
- no new pocket, climb family, right-side lift, or alpine extension lands

Completion notes:

- Hardened the existing open-fell `talus-hold` runtime proof instead of adding new High Pass geometry, carriers, or travel anchors.
- The smoke test now asserts the final clue remains on the open-fell island, does not compete with a travel prompt, and produces the `NOTEBOOK READY` return-to-field-station notice with `Ready To File` active-request state.
- Verified with `npm test -- --run src/test/runtime-smoke.test.ts -t "lets hand lens prefer talus cushion pocket as the High Pass talus-hold clue on the live open-fell pocket"`.

### ECO-20260419-scout-322

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `Prepare the High Pass final-return readability handoff`
- Source: `docs/reports/2026-04-19-high-pass-final-return-readability-handoff.md`
- Packet: `.agents/packets/129-high-pass-closure-and-alpha-playthrough-hardening.json`
- Depends on: `none`

Goal:

- Audit the final High Pass/talus-hold route moment and scope one small endcap or return-readability fix if needed.

Acceptance:

- identifies whether a spatial tweak is needed at the final filed route moment
- protects existing Stone Shelter, Rime Brow, and talus-hold density
- leaves `main-322` ready with clear no-new-pocket guardrails

Completion notes:

- Audited the live `treeline-high-pass` final clue and confirmed `talus-hold` already sits on the existing open-fell island, so the follow-up should be proof-first rather than another High Pass pocket.
- Added `docs/reports/2026-04-19-high-pass-final-return-readability-handoff.md`, updated packet `129` with exact `main_322` guardrails, and promoted `ECO-20260419-main-322` to `READY`.

### ECO-20260419-scout-320

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Prepare the High Pass closure and chapter-state handoff`
- Source: `docs/reports/2026-04-19-high-pass-closure-alpha-hardening-phase.md`
- Packet: `.agents/packets/129-high-pass-closure-and-alpha-playthrough-hardening.json`
- Depends on: `none`

Goal:

- Scope the post-High-Pass filed state across station, atlas, expedition, route locator, and world-map seams.

Acceptance:

- identifies the state gaps after `treeline-high-pass` is filed
- narrows the chapter-state helper changes for `main-320`
- keeps season three, biome six, and planner growth out of scope

Completion notes:

- Added `docs/reports/2026-04-19-high-pass-closure-state-handoff.md`, identifying that `resolveHighPassChapterState(...)` currently stays in `NEXT` mode after `treeline-high-pass` is filed and can keep station, journal, route-locator, and world-map surfaces pointing back to High Pass.
- Updated packet `129` to version `2`, narrowing `main-320` to a `dormant -> active -> ready-to-file -> filed` High Pass phase model plus filed-state cleanup across station routes, atlas, archive, expedition card, world-map cue, and route-locator seams.

### ECO-20260419-main-320

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Implement High Pass closure and chapter-state hardening`
- Source: `docs/reports/2026-04-19-high-pass-closure-state-implementation.md`
- Packet: `.agents/packets/129-high-pass-closure-and-alpha-playthrough-hardening.json`
- Depends on: `ECO-20260419-scout-320`

Goal:

- Extend the High Pass chapter-state helper and connected station/map surfaces so filed High Pass reads as complete instead of still upcoming.

Acceptance:

- distinguishes not-opened, active/opened, ready-to-file, and filed High Pass states
- no surface points back to High Pass as if unstarted after it is filed
- chapter/outing composition moves out of `field-season-board.ts` where practical

Completion notes:

- Added a `dormant -> active -> ready-to-file -> filed` phase model in `src/engine/high-pass-chapter-state.ts`, with filed High Pass winning over mixed save data.
- Filed High Pass now removes active outing, `route-locator:treeline`, route-marker, and `Today: High Pass` replay behavior while station route board, atlas, archive, and expedition copy read as filed.
- Added `docs/reports/2026-04-19-high-pass-closure-state-implementation.md` and focused board/request/runtime coverage for the filed state.
- Verified with focused board/request tests, the season-capstone runtime-smoke slice, `npm run build`, `npm run validate:agents`, and the shared web-game client pass in `output/web-game/high-pass-closure-main-320/`.
- Promoted `ECO-20260419-critic-320` to `READY`.

### ECO-20260419-critic-320

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Review High Pass closure and chapter-state hardening`
- Source: `docs/reports/2026-04-19-high-pass-closure-state-review.md`
- Packet: `.agents/packets/129-high-pass-closure-and-alpha-playthrough-hardening.json`
- Depends on: `ECO-20260419-main-320`

Goal:

- Review whether post-High-Pass station and map state now closes the current arc cleanly.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms filed High Pass no longer reads as upcoming
- confirms the implementation did not add a new shell

Completion notes:

- Added `docs/reports/2026-04-19-high-pass-closure-state-review.md`, finding one blocker: the filed `HIGH PASS` expedition card still inherited `STARTS` display chrome and the filed card activation notice still used a generic `Start:` prefix.
- Confirmed the phase helper, route locator suppression, atlas/archive, route board, journal, world-map, and route-marker filed behavior were otherwise aligned with the handoff.
- Queued `ECO-20260419-main-324` and `ECO-20260419-critic-324` as the narrow lane-1 follow-up before final route-loop proof can unblock.

### ECO-20260419-main-324

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Fix filed High Pass expedition-card start chrome`
- Source: `docs/reports/2026-04-19-high-pass-expedition-chrome-implementation.md`
- Packet: `.agents/packets/129-high-pass-closure-and-alpha-playthrough-hardening.json`
- Depends on: `ECO-20260419-critic-320`

Goal:

- Remove the last start-facing expedition-card chrome from filed High Pass without widening the station shell.

Acceptance:

- filed High Pass expedition page no longer labels the filed row as `STARTS`
- activating the filed High Pass expedition card no longer emits a `Start:` notice
- no new station page, panel, or broader expedition shell appears

Completion notes:

- Added tiny expedition state display hooks, `detailLabel` and `noticeText`, so normal expedition cards keep `STARTS` while filed High Pass renders `FILED / Treeline Pass`.
- Updated filed High Pass card activation to use filed copy without a generic `Start:` prefix.
- Verified with focused expedition/capstone tests, `npm run build`, the shared web-game client pass in `output/web-game/high-pass-expedition-chrome-main-324/`, and `npm run validate:agents`.
- Promoted `ECO-20260419-critic-324` to `READY`.

### ECO-20260419-critic-324

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Review filed High Pass expedition-card start chrome fix`
- Source: `docs/reports/2026-04-19-high-pass-expedition-chrome-review.md`
- Packet: `.agents/packets/129-high-pass-closure-and-alpha-playthrough-hardening.json`
- Depends on: `ECO-20260419-main-324`

Goal:

- Confirm the filed High Pass expedition card and activation notice no longer use start-facing language.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms `FILED` expedition display no longer says `STARTS`
- confirms filed activation notice no longer says `Start:`

Completion notes:

- Added `docs/reports/2026-04-19-high-pass-expedition-chrome-review.md`, confirming the filed `HIGH PASS` expedition display now uses `FILED` and the filed activation notice no longer emits `Start:`.
- Found one adjacent note-ready activation issue: the High Pass `NOTE READY / FILE` expedition card can still be routed through the older logged-expedition map redirect before its station-filing notice is shown.
- Queued `ECO-20260419-main-325` and `ECO-20260419-critic-325` as the final narrow lane-1 follow-up before the lane-4 end-to-end proof unblocks.

### ECO-20260419-main-325

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Fix High Pass note-ready expedition activation`
- Source: `docs/reports/2026-04-19-high-pass-expedition-note-ready-implementation.md`
- Packet: `.agents/packets/129-high-pass-closure-and-alpha-playthrough-hardening.json`
- Depends on: `ECO-20260419-critic-324`

Goal:

- Make the High Pass `NOTE READY / FILE` expedition card keep the player at the station with the filing notice instead of reopening the world map toward Treeline Pass.

Acceptance:

- pressing `Enter` on note-ready High Pass expedition shows the station filing notice
- the note-ready expedition activation does not leave the field station
- active High Pass map launch and filed High Pass logged notice still behave correctly

Completion notes:

- Updated `activateExpeditionCard()` so explicit expedition `noticeText` wins before the older logged-expedition world-map redirect.
- Extended the season-capstone runtime smoke to cover active High Pass launch, note-ready High Pass station filing notice, and filed High Pass logged notice in one path.
- Verified with focused runtime and expedition/capstone tests, `npm run build`, the shared web-game client pass in `output/web-game/high-pass-note-ready-main-325/`, and `npm run validate:agents`.
- Promoted `ECO-20260419-critic-325` to `READY`.

### ECO-20260419-critic-325

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `Review High Pass note-ready expedition activation`
- Source: `docs/reports/2026-04-19-high-pass-expedition-note-ready-review.md`
- Packet: `.agents/packets/129-high-pass-closure-and-alpha-playthrough-hardening.json`
- Depends on: `ECO-20260419-main-325`

Goal:

- Confirm the note-ready High Pass expedition card no longer routes the player back to Treeline Pass when the intended action is station filing.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms note-ready High Pass expedition activation stays on the station
- confirms active High Pass and filed High Pass expedition activation behavior did not regress

Completion notes:

- Added `docs/reports/2026-04-19-high-pass-expedition-note-ready-review.md`, finding no blocker in the activation-order follow-up.
- Confirmed explicit expedition `noticeText` now keeps the `NOTE READY / FILE` High Pass card on the field station with station-filing guidance.
- Rechecked that active High Pass still launches to Treeline Pass and filed High Pass still shows a filed notice without `Start:`.

### ECO-20260419-scout-321

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Prepare the High Pass filed synthesis handoff`
- Source: `docs/reports/2026-04-19-high-pass-filed-synthesis-handoff.md`
- Packet: `.agents/packets/129-high-pass-closure-and-alpha-playthrough-hardening.json`
- Depends on: `none`

Goal:

- Scope one compact filed/synthesis copy path that makes High Pass filing teach an ecological relationship.

Acceptance:

- picks existing surfaces instead of adding a new shell
- keeps copy kid-readable and handheld-safe
- leaves `main-321` ready with exact content/test targets

Completion notes:

- Added `docs/reports/2026-04-19-high-pass-filed-synthesis-handoff.md`, narrowing the lane-2 pass to `treeline-high-pass.routeV2Note.filedText` plus `clueBackedTail`.
- Updated packet `129` to version `5`, pointing `main-321` at the existing note-tabs preview and filed-notice display seam rather than atlas, prompt, station, or map shell changes.
- Promoted `ECO-20260419-main-321` to `READY`.

### ECO-20260419-main-321

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Implement High Pass filed synthesis copy`
- Source: `docs/reports/2026-04-19-high-pass-filed-synthesis-implementation.md`
- Packet: `.agents/packets/129-high-pass-closure-and-alpha-playthrough-hardening.json`
- Depends on: `ECO-20260419-scout-321`

Goal:

- Add or refresh compact filed/synthesis copy so High Pass filing teaches the route relationship instead of only completing slots.

Acceptance:

- filing High Pass ties together stone lift, lee watch, rime mark, talus hold, low ridge life, exposed ground, and shelter pockets
- copy stays under content-quality budgets
- no new journal shell, archive panel, or notebook dump appears

Completion notes:

- Updated the `treeline-high-pass` filed note and clue-backed tail in `src/engine/field-requests.ts` so filing teaches how low ridge life uses shelter pockets on exposed High Pass.
- Added focused `field-requests` coverage proving the ready-to-file and clue-backed filed texts use the refreshed relationship copy in route-slot order.
- Verified with focused request/content tests, a High Pass runtime-smoke slice, `npm run build`, and a web-game client smoke in `output/lane-2-main-321-client/`.
- Promoted `ECO-20260419-critic-321` to `READY`.

### ECO-20260419-critic-321

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `Review High Pass filed synthesis copy`
- Source: `docs/reports/2026-04-19-high-pass-filed-synthesis-review.md`
- Packet: `.agents/packets/129-high-pass-closure-and-alpha-playthrough-hardening.json`
- Depends on: `ECO-20260419-main-321`

Goal:

- Review whether the filed High Pass ending is educationally satisfying without becoming text-heavy.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the ending teaches a relationship
- confirms copy remains handheld-safe

Completion notes:

- Clean review with no blocking findings.
- Confirmed the filed High Pass ending now teaches a shelter-pocket relationship through the existing Route v2 filed-note seam without adding a journal, station, prompt, or archive surface.
- Rechecked focused request/content tests and the High Pass runtime-smoke slice.
- Left `ECO-20260419-main-323` blocked until lane 1 and lane 3 reviews also clear.

### ECO-20260419-scout-323

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `Prepare the High Pass end-to-end route-loop proof`
- Source: `docs/reports/2026-04-19-high-pass-route-loop-proof-handoff.md`
- Packet: `.agents/packets/129-high-pass-closure-and-alpha-playthrough-hardening.json`
- Depends on: `none`

Goal:

- Scope deterministic proof from season closure into High Pass ready-to-file and filed states.

Acceptance:

- defines the smoke path and notice-priority assertions
- confirms support and replay labels should settle after filing
- leaves `main-323` ready without adding another Route v2 framework

Completion notes:

- Added `docs/reports/2026-04-19-high-pass-route-loop-proof-handoff.md`, narrowing the lane-4 proof to one seeded runtime smoke that reuses the live talus-hold setup, files `treeline-high-pass`, and asserts filed notice plus settled request/map/journal/station state.
- Updated packet `129` to version `4` and retargeted `main-323` / `critic-323` to this handoff.
- Kept `ECO-20260419-main-323` blocked behind `critic-320`, `critic-321`, and `critic-322` so the final proof runs after lane 1 closure state, lane 2 filed synthesis text, and lane 3 final-return readability settle.

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
