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

### ECO-20260420-main-344

- Status: `READY`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-station-homecoming-visual-accent-handoff.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-scout-344`, `ECO-20260420-critic-342`

Goal:

- Add the smallest upper-frame visual accent family for lane 1's reviewed station-owned homecoming seam and prove it does not crowd the existing lower sill, side-gutter brace, or late-season lintel accents.

Acceptance:

- uses lane 1's reviewed `fieldStation.homecoming` / `homecomingMilestoneRequestId` seam instead of inventing a separate route, station, save, or copy state
- keeps the visible accent in the upper-frame / roofline / brace-cap family without lower-sill growth, side-gutter bulk, another full lintel, a new panel, or new text
- unit coverage protects default, mid-progress, archived High Pass, and new-seam accent states
- focused runtime smoke proves the representative station return exposes the accent through `render_game_to_text()` without crowding existing sill/gutter/lintel state
- if runtime drawing changes land, an ignored browser proof under `output/` captures the station shell at `256x160`
- adds `docs/reports/2026-04-20-station-homecoming-visual-accent-implementation.md`
- `npm test -- --run src/test/overlay-copy.test.ts`, a focused station-shell `runtime-smoke` slice, `npm run build`, `npm run validate:agents`, and `git diff --check` pass

### ECO-20260420-scout-417

- Status: `READY`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 scout: Field-season-board splitting wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
- Depends on: `ECO-20260420-critic-413`

Goal:

- Prepare the lane-4 contract for packet 152; details live in the packet.

## Blocked

### ECO-20260420-critic-344

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-main-344`

Goal:

- Review the lane-3 contract for packet 134; details live in the packet.

### ECO-20260420-scout-348

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-critic-344`

Goal:

- Prepare the lane-3 contract for packet 135; details live in the packet.

### ECO-20260420-main-348

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-scout-348`

Goal:

- Implement the lane-3 contract for packet 135; details live in the packet.

### ECO-20260420-critic-348

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-main-348`

Goal:

- Review the lane-3 contract for packet 135; details live in the packet.

### ECO-20260420-scout-352

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-critic-348`

Goal:

- Prepare the lane-3 contract for packet 136; details live in the packet.

### ECO-20260420-main-352

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-scout-352`

Goal:

- Implement the lane-3 contract for packet 136; details live in the packet.

### ECO-20260420-critic-352

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-main-352`

Goal:

- Review the lane-3 contract for packet 136; details live in the packet.

### ECO-20260420-scout-356

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-critic-352`

Goal:

- Prepare the lane-3 contract for packet 137; details live in the packet.

### ECO-20260420-main-356

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-scout-356`

Goal:

- Implement the lane-3 contract for packet 137; details live in the packet.

### ECO-20260420-critic-356

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-main-356`

Goal:

- Review the lane-3 contract for packet 137; details live in the packet.

### ECO-20260420-scout-360

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-critic-356`

Goal:

- Prepare the lane-3 contract for packet 138; details live in the packet.

### ECO-20260420-main-360

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-scout-360`

Goal:

- Implement the lane-3 contract for packet 138; details live in the packet.

### ECO-20260420-critic-360

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-main-360`

Goal:

- Review the lane-3 contract for packet 138; details live in the packet.

### ECO-20260420-scout-364

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-critic-360`

Goal:

- Prepare the lane-3 contract for packet 139; details live in the packet.

### ECO-20260420-main-364

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-scout-364`

Goal:

- Implement the lane-3 contract for packet 139; details live in the packet.

### ECO-20260420-critic-364

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-main-364`

Goal:

- Review the lane-3 contract for packet 139; details live in the packet.

### ECO-20260420-scout-368

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-critic-364`

Goal:

- Prepare the lane-3 contract for packet 140; details live in the packet.

### ECO-20260420-main-368

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-scout-368`

Goal:

- Implement the lane-3 contract for packet 140; details live in the packet.

### ECO-20260420-critic-368

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-main-368`

Goal:

- Review the lane-3 contract for packet 140; details live in the packet.

### ECO-20260420-scout-372

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-critic-368`

Goal:

- Prepare the lane-3 contract for packet 141; details live in the packet.

### ECO-20260420-main-372

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-scout-372`

Goal:

- Implement the lane-3 contract for packet 141; details live in the packet.

### ECO-20260420-critic-372

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-main-372`

Goal:

- Review the lane-3 contract for packet 141; details live in the packet.

### ECO-20260420-scout-376

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-critic-372`

Goal:

- Prepare the lane-3 contract for packet 142; details live in the packet.

### ECO-20260420-main-376

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-scout-376`

Goal:

- Implement the lane-3 contract for packet 142; details live in the packet.

### ECO-20260420-critic-376

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-main-376`

Goal:

- Review the lane-3 contract for packet 142; details live in the packet.

### ECO-20260420-scout-380

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-critic-376`

Goal:

- Prepare the lane-3 contract for packet 143; details live in the packet.

### ECO-20260420-main-380

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-scout-380`

Goal:

- Implement the lane-3 contract for packet 143; details live in the packet.

### ECO-20260420-critic-380

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-main-380`

Goal:

- Review the lane-3 contract for packet 143; details live in the packet.

### ECO-20260420-scout-384

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-critic-380`

Goal:

- Prepare the lane-3 contract for packet 144; details live in the packet.

### ECO-20260420-main-384

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-scout-384`

Goal:

- Implement the lane-3 contract for packet 144; details live in the packet.

### ECO-20260420-critic-384

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-main-384`

Goal:

- Review the lane-3 contract for packet 144; details live in the packet.

### ECO-20260420-scout-388

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-critic-384`

Goal:

- Prepare the lane-3 contract for packet 145; details live in the packet.

### ECO-20260420-main-388

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-scout-388`

Goal:

- Implement the lane-3 contract for packet 145; details live in the packet.

### ECO-20260420-critic-388

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-main-388`

Goal:

- Review the lane-3 contract for packet 145; details live in the packet.

### ECO-20260420-scout-392

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-critic-388`

Goal:

- Prepare the lane-3 contract for packet 146; details live in the packet.

### ECO-20260420-main-392

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-scout-392`

Goal:

- Implement the lane-3 contract for packet 146; details live in the packet.

### ECO-20260420-critic-392

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-main-392`

Goal:

- Review the lane-3 contract for packet 146; details live in the packet.

### ECO-20260420-scout-396

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-critic-392`

Goal:

- Prepare the lane-3 contract for packet 147; details live in the packet.

### ECO-20260420-main-396

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-scout-396`

Goal:

- Implement the lane-3 contract for packet 147; details live in the packet.

### ECO-20260420-critic-396

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-main-396`

Goal:

- Review the lane-3 contract for packet 147; details live in the packet.

### ECO-20260420-scout-400

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Sound, feedback, and subtle juice`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-critic-396`

Goal:

- Prepare the lane-3 contract for packet 148; details live in the packet.

### ECO-20260420-main-400

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: Sound, feedback, and subtle juice`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-scout-400`

Goal:

- Implement the lane-3 contract for packet 148; details live in the packet.

### ECO-20260420-critic-400

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: Sound, feedback, and subtle juice`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-main-400`

Goal:

- Review the lane-3 contract for packet 148; details live in the packet.

### ECO-20260420-scout-403

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-critic-399`

Goal:

- Prepare the lane-2 contract for packet 149; details live in the packet.

### ECO-20260420-main-403

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-scout-403`

Goal:

- Implement the lane-2 contract for packet 149; details live in the packet.

### ECO-20260420-critic-403

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-main-403`

Goal:

- Review the lane-2 contract for packet 149; details live in the packet.

### ECO-20260420-scout-404

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-critic-400`

Goal:

- Prepare the lane-3 contract for packet 149; details live in the packet.

### ECO-20260420-main-404

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-scout-404`

Goal:

- Implement the lane-3 contract for packet 149; details live in the packet.

### ECO-20260420-critic-404

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-main-404`

Goal:

- Review the lane-3 contract for packet 149; details live in the packet.

### ECO-20260420-scout-407

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 scout: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-critic-403`

Goal:

- Prepare the lane-2 contract for packet 150; details live in the packet.

### ECO-20260420-main-407

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-scout-407`

Goal:

- Implement the lane-2 contract for packet 150; details live in the packet.

### ECO-20260420-critic-407

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-main-407`

Goal:

- Review the lane-2 contract for packet 150; details live in the packet.

### ECO-20260420-scout-408

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 scout: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-critic-404`

Goal:

- Prepare the lane-3 contract for packet 150; details live in the packet.

### ECO-20260420-main-408

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-scout-408`

Goal:

- Implement the lane-3 contract for packet 150; details live in the packet.

### ECO-20260420-critic-408

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-main-408`

Goal:

- Review the lane-3 contract for packet 150; details live in the packet.

### ECO-20260420-scout-411

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 scout: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-critic-407`

Goal:

- Prepare the lane-2 contract for packet 151; details live in the packet.

### ECO-20260420-main-411

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-scout-411`

Goal:

- Implement the lane-2 contract for packet 151; details live in the packet.

### ECO-20260420-critic-411

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-main-411`

Goal:

- Review the lane-2 contract for packet 151; details live in the packet.

### ECO-20260420-scout-412

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 scout: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-critic-408`

Goal:

- Prepare the lane-3 contract for packet 151; details live in the packet.

### ECO-20260420-main-412

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-scout-412`

Goal:

- Implement the lane-3 contract for packet 151; details live in the packet.

### ECO-20260420-critic-412

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-main-412`

Goal:

- Review the lane-3 contract for packet 151; details live in the packet.

### ECO-20260420-scout-415

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 scout: Field-season-board splitting wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
- Depends on: `ECO-20260420-critic-411`

Goal:

- Prepare the lane-2 contract for packet 152; details live in the packet.

### ECO-20260420-main-415

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Field-season-board splitting wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
- Depends on: `ECO-20260420-scout-415`

Goal:

- Implement the lane-2 contract for packet 152; details live in the packet.

### ECO-20260420-critic-415

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Field-season-board splitting wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
- Depends on: `ECO-20260420-main-415`

Goal:

- Review the lane-2 contract for packet 152; details live in the packet.

### ECO-20260420-scout-416

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 scout: Field-season-board splitting wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
- Depends on: `ECO-20260420-critic-412`

Goal:

- Prepare the lane-3 contract for packet 152; details live in the packet.

### ECO-20260420-main-416

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: Field-season-board splitting wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
- Depends on: `ECO-20260420-scout-416`

Goal:

- Implement the lane-3 contract for packet 152; details live in the packet.

### ECO-20260420-critic-416

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: Field-season-board splitting wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
- Depends on: `ECO-20260420-main-416`

Goal:

- Review the lane-3 contract for packet 152; details live in the packet.

### ECO-20260420-main-417

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Field-season-board splitting wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
- Depends on: `ECO-20260420-scout-417`

Goal:

- Implement the lane-4 contract for packet 152; details live in the packet.

### ECO-20260420-critic-417

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Field-season-board splitting wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
- Depends on: `ECO-20260420-main-417`

Goal:

- Review the lane-4 contract for packet 152; details live in the packet.

### ECO-20260420-scout-419

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 scout: Save schema and migration hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
- Depends on: `ECO-20260420-critic-415`

Goal:

- Prepare the lane-2 contract for packet 153; details live in the packet.

### ECO-20260420-main-419

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Save schema and migration hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
- Depends on: `ECO-20260420-scout-419`

Goal:

- Implement the lane-2 contract for packet 153; details live in the packet.

### ECO-20260420-critic-419

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Save schema and migration hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
- Depends on: `ECO-20260420-main-419`

Goal:

- Review the lane-2 contract for packet 153; details live in the packet.

### ECO-20260420-scout-420

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 scout: Save schema and migration hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
- Depends on: `ECO-20260420-critic-416`

Goal:

- Prepare the lane-3 contract for packet 153; details live in the packet.

### ECO-20260420-main-420

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: Save schema and migration hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
- Depends on: `ECO-20260420-scout-420`

Goal:

- Implement the lane-3 contract for packet 153; details live in the packet.

### ECO-20260420-critic-420

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: Save schema and migration hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
- Depends on: `ECO-20260420-main-420`

Goal:

- Review the lane-3 contract for packet 153; details live in the packet.

### ECO-20260420-scout-421

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 scout: Save schema and migration hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
- Depends on: `ECO-20260420-critic-417`

Goal:

- Prepare the lane-4 contract for packet 153; details live in the packet.

### ECO-20260420-main-421

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Save schema and migration hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
- Depends on: `ECO-20260420-scout-421`

Goal:

- Implement the lane-4 contract for packet 153; details live in the packet.

### ECO-20260420-critic-421

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Save schema and migration hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
- Depends on: `ECO-20260420-main-421`

Goal:

- Review the lane-4 contract for packet 153; details live in the packet.

### ECO-20260420-scout-423

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 scout: Performance, bundle, and error hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
- Depends on: `ECO-20260420-critic-419`

Goal:

- Prepare the lane-2 contract for packet 154; details live in the packet.

### ECO-20260420-main-423

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Performance, bundle, and error hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
- Depends on: `ECO-20260420-scout-423`

Goal:

- Implement the lane-2 contract for packet 154; details live in the packet.

### ECO-20260420-critic-423

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Performance, bundle, and error hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
- Depends on: `ECO-20260420-main-423`

Goal:

- Review the lane-2 contract for packet 154; details live in the packet.

### ECO-20260420-scout-424

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 scout: Performance, bundle, and error hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
- Depends on: `ECO-20260420-critic-420`

Goal:

- Prepare the lane-3 contract for packet 154; details live in the packet.

### ECO-20260420-main-424

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: Performance, bundle, and error hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
- Depends on: `ECO-20260420-scout-424`

Goal:

- Implement the lane-3 contract for packet 154; details live in the packet.

### ECO-20260420-critic-424

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: Performance, bundle, and error hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
- Depends on: `ECO-20260420-main-424`

Goal:

- Review the lane-3 contract for packet 154; details live in the packet.

### ECO-20260420-scout-425

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 scout: Performance, bundle, and error hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
- Depends on: `ECO-20260420-critic-421`

Goal:

- Prepare the lane-4 contract for packet 154; details live in the packet.

### ECO-20260420-main-425

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Performance, bundle, and error hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
- Depends on: `ECO-20260420-scout-425`

Goal:

- Implement the lane-4 contract for packet 154; details live in the packet.

### ECO-20260420-critic-425

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Performance, bundle, and error hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
- Depends on: `ECO-20260420-main-425`

Goal:

- Review the lane-4 contract for packet 154; details live in the packet.

### ECO-20260420-scout-427

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 scout: External playtest feedback batch one`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
- Depends on: `ECO-20260420-critic-423`

Goal:

- Prepare the lane-2 contract for packet 155; details live in the packet.

### ECO-20260420-main-427

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: External playtest feedback batch one`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
- Depends on: `ECO-20260420-scout-427`

Goal:

- Implement the lane-2 contract for packet 155; details live in the packet.

### ECO-20260420-critic-427

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: External playtest feedback batch one`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
- Depends on: `ECO-20260420-main-427`

Goal:

- Review the lane-2 contract for packet 155; details live in the packet.

### ECO-20260420-scout-428

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 scout: External playtest feedback batch one`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
- Depends on: `ECO-20260420-critic-424`

Goal:

- Prepare the lane-3 contract for packet 155; details live in the packet.

### ECO-20260420-main-428

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: External playtest feedback batch one`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
- Depends on: `ECO-20260420-scout-428`

Goal:

- Implement the lane-3 contract for packet 155; details live in the packet.

### ECO-20260420-critic-428

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: External playtest feedback batch one`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
- Depends on: `ECO-20260420-main-428`

Goal:

- Review the lane-3 contract for packet 155; details live in the packet.

### ECO-20260420-scout-429

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 scout: External playtest feedback batch one`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
- Depends on: `ECO-20260420-critic-425`

Goal:

- Prepare the lane-4 contract for packet 155; details live in the packet.

### ECO-20260420-main-429

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: External playtest feedback batch one`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
- Depends on: `ECO-20260420-scout-429`

Goal:

- Implement the lane-4 contract for packet 155; details live in the packet.

### ECO-20260420-critic-429

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: External playtest feedback batch one`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
- Depends on: `ECO-20260420-main-429`

Goal:

- Review the lane-4 contract for packet 155; details live in the packet.

### ECO-20260420-scout-431

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 scout: External playtest feedback batch two`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
- Depends on: `ECO-20260420-critic-427`

Goal:

- Prepare the lane-2 contract for packet 156; details live in the packet.

### ECO-20260420-main-431

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: External playtest feedback batch two`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
- Depends on: `ECO-20260420-scout-431`

Goal:

- Implement the lane-2 contract for packet 156; details live in the packet.

### ECO-20260420-critic-431

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: External playtest feedback batch two`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
- Depends on: `ECO-20260420-main-431`

Goal:

- Review the lane-2 contract for packet 156; details live in the packet.

### ECO-20260420-scout-432

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 scout: External playtest feedback batch two`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
- Depends on: `ECO-20260420-critic-428`

Goal:

- Prepare the lane-3 contract for packet 156; details live in the packet.

### ECO-20260420-main-432

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: External playtest feedback batch two`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
- Depends on: `ECO-20260420-scout-432`

Goal:

- Implement the lane-3 contract for packet 156; details live in the packet.

### ECO-20260420-critic-432

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: External playtest feedback batch two`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
- Depends on: `ECO-20260420-main-432`

Goal:

- Review the lane-3 contract for packet 156; details live in the packet.

### ECO-20260420-scout-433

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 scout: External playtest feedback batch two`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
- Depends on: `ECO-20260420-critic-429`

Goal:

- Prepare the lane-4 contract for packet 156; details live in the packet.

### ECO-20260420-main-433

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: External playtest feedback batch two`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
- Depends on: `ECO-20260420-scout-433`

Goal:

- Implement the lane-4 contract for packet 156; details live in the packet.

### ECO-20260420-critic-433

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: External playtest feedback batch two`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
- Depends on: `ECO-20260420-main-433`

Goal:

- Review the lane-4 contract for packet 156; details live in the packet.

### ECO-20260420-main-434

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Alpha release candidate and post-alpha scope gate`
- Source: `docs/reports/2026-04-20-alpha-rc-packaging-handoff.md`
- Packet: `.agents/packets/157-alpha-release-candidate-and-scope-gate.json`
- Depends on: `ECO-20260420-scout-434`, `ECO-20260420-critic-431`, `ECO-20260420-critic-432`, `ECO-20260420-critic-433`, full `npm test` green

Goal:

- Implement the lane-1 alpha RC packaging wrapper once all packet 156 lanes are clear and the full test suite is green.

### ECO-20260420-critic-434

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Alpha release candidate and post-alpha scope gate`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/157-alpha-release-candidate-and-scope-gate.json`
- Depends on: `ECO-20260420-main-434`

Goal:

- Review the lane-1 contract for packet 157; details live in the packet.

### ECO-20260420-scout-435

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 scout: Alpha release candidate and post-alpha scope gate`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/157-alpha-release-candidate-and-scope-gate.json`
- Depends on: `ECO-20260420-critic-431`

Goal:

- Prepare the lane-2 contract for packet 157; details live in the packet.

### ECO-20260420-main-435

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Alpha release candidate and post-alpha scope gate`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/157-alpha-release-candidate-and-scope-gate.json`
- Depends on: `ECO-20260420-scout-435`

Goal:

- Implement the lane-2 contract for packet 157; details live in the packet.

### ECO-20260420-critic-435

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Alpha release candidate and post-alpha scope gate`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/157-alpha-release-candidate-and-scope-gate.json`
- Depends on: `ECO-20260420-main-435`

Goal:

- Review the lane-2 contract for packet 157; details live in the packet.

### ECO-20260420-scout-436

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 scout: Alpha release candidate and post-alpha scope gate`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/157-alpha-release-candidate-and-scope-gate.json`
- Depends on: `ECO-20260420-critic-432`

Goal:

- Prepare the lane-3 contract for packet 157; details live in the packet.

### ECO-20260420-main-436

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 implement: Alpha release candidate and post-alpha scope gate`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/157-alpha-release-candidate-and-scope-gate.json`
- Depends on: `ECO-20260420-scout-436`

Goal:

- Implement the lane-3 contract for packet 157; details live in the packet.

### ECO-20260420-critic-436

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P2`
- Title: `L3 review: Alpha release candidate and post-alpha scope gate`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/157-alpha-release-candidate-and-scope-gate.json`
- Depends on: `ECO-20260420-main-436`

Goal:

- Review the lane-3 contract for packet 157; details live in the packet.

### ECO-20260420-scout-437

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 scout: Alpha release candidate and post-alpha scope gate`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/157-alpha-release-candidate-and-scope-gate.json`
- Depends on: `ECO-20260420-critic-433`

Goal:

- Prepare the lane-4 contract for packet 157; details live in the packet.

### ECO-20260420-main-437

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Alpha release candidate and post-alpha scope gate`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/157-alpha-release-candidate-and-scope-gate.json`
- Depends on: `ECO-20260420-scout-437`

Goal:

- Implement the lane-4 contract for packet 157; details live in the packet.

### ECO-20260420-critic-437

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Alpha release candidate and post-alpha scope gate`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/157-alpha-release-candidate-and-scope-gate.json`
- Depends on: `ECO-20260420-main-437`

Goal:

- Review the lane-4 contract for packet 157; details live in the packet.



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

### ECO-20260420-main-390

- Status: `PARKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-close-look-sketchbook-state-handoff.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-scout-390`

Note:

- Parked because the lane-1 scout found no close-look/sketchbook open-close regression risk worth hardening after focused close-look, sketchbook, and runtime-smoke proofs passed.

### ECO-20260420-critic-390

- Status: `PARKED`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-close-look-sketchbook-state-handoff.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-main-390`

Note:

- Parked with `ECO-20260420-main-390`; there is no lane-1 implementation to review for packet `146`.

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

### ECO-20260420-critic-413

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-overlay-render-route-notice-implementation.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-main-413`

Completed:

- Added `docs/reports/2026-04-20-overlay-render-route-notice-review.md`.
- Confirmed the existing High Pass live talus-hold runtime-smoke test was extended in place and that filed `HIGH PASS` notice priority survives station support toggling and station close.
- Confirmed raw `render_game_to_text()` includes the filed-route notice identity and excludes `OUTING SUPPORT`.
- Marked packet `151` done and promoted `ECO-20260420-scout-417` to `READY`.
- Verification: `npm test -- --run src/test/runtime-smoke.test.ts -t "High Pass from the live talus-hold loop"`, `npm test -- --run src/test/field-notices.test.ts -t "route-critical|station support|filed-route"`, and `git diff --check` passed.

### ECO-20260420-main-413

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-overlay-render-route-notice-handoff.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-scout-413`

Completed:

- Extended the existing High Pass live talus-hold runtime-smoke path to confirm the filed `HIGH PASS` notice survives a station support toggle after returning to a drawable playing/world-map state.
- Added raw `render_game_to_text()` assertions for filed-route notice identity and absence of `OUTING SUPPORT`.
- Added `docs/reports/2026-04-20-overlay-render-route-notice-implementation.md`.
- Updated packet `151` with the lane-4 main result and promoted `ECO-20260420-critic-413` to `READY`.
- Verification: `npm test -- --run src/test/runtime-smoke.test.ts -t "High Pass from the live talus-hold loop"`, `npm test -- --run src/test/field-notices.test.ts -t "route-critical|station support|filed-route"`, `npm run build`, `npm run validate:agents` with the known work-queue-size warning, and `git diff --check` passed.

### ECO-20260420-scout-413

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 scout: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-route-notice-priority-regression-review.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-critic-409`

Completed:

- Added `docs/reports/2026-04-20-overlay-render-route-notice-handoff.md`.
- Scoped packet `151` lane 4 to a tiny runtime-smoke hardening around the existing live High Pass filing/support path after the notice-render extraction.
- Updated packet `151` with the lane-4 scout refinement and promoted `ECO-20260420-main-413` to `READY`.
- Verification: baseline focused field-notices/runtime-smoke slice passed; `npm run validate:agents` with the known work-queue-size warning and `git diff --check` passed.

### ECO-20260420-critic-409

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-route-notice-priority-regression-implementation.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-main-409`

Completed:

- Reviewed the route-critical notice-priority regression cleanly and confirmed it protects guided notice and station support/default replacement priority without runtime behavior drift.
- Added `docs/reports/2026-04-20-route-notice-priority-regression-review.md`.
- Updated packet `150` with the lane-4 critic result and promoted `ECO-20260420-scout-413` to `READY`.
- Verification: `npm test -- --run src/test/field-notices.test.ts -t "route-critical|guided|station support|filed-route"`, `npm run build`, `npm run validate:agents` with the known work-queue-size warning, and `git diff --check` passed.

### ECO-20260420-main-409

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-route-notice-priority-regression-handoff.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-scout-409`

Completed:

- Added one focused `src/test/field-notices.test.ts` regression that treats `notebook-ready` and `filed-route` as route-critical notices across the extracted guided-notice and station replacement helpers.
- Added `docs/reports/2026-04-20-route-notice-priority-regression-implementation.md`.
- Updated packet `150` with the lane-4 main result and promoted `ECO-20260420-critic-409` to `READY`.
- Verification: `npm test -- --run src/test/field-notices.test.ts -t "route-critical|guided|station support|filed-route"`, `npm run build`, `npm run validate:agents` with the known work-queue-size warning, and `git diff --check` passed.

### ECO-20260420-scout-409

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 scout: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-route-support-doc-truth-review.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-critic-405`

Completed:

- Added `docs/reports/2026-04-20-route-notice-priority-regression-handoff.md`.
- Scoped packet `150` lane 4 to one focused route-critical notice-priority regression in `src/test/field-notices.test.ts`.
- Updated packet `150` with the lane-4 scout refinement and promoted `ECO-20260420-main-409` to `READY`.
- Verification: baseline focused field-notices/runtime-smoke slice passed; `npm run validate:agents` with the known queue-size warning and `git diff --check` passed.

### ECO-20260420-critic-405

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-route-support-doc-truth-implementation.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-main-405`

Completed:

- Reviewed the route/support doc truth pass cleanly and confirmed the reviewed docs now lead with Route v2 outing, notebook filing, replay, and tiny support-slot language while preserving compatibility names.
- Added `docs/reports/2026-04-20-route-support-doc-truth-review.md`.
- Updated packet `149` with the lane-4 critic result and promoted `ECO-20260420-scout-409` to `READY`.
- Verification: broad route/support wording scan, exact stale-string scan, `npm run validate:agents` with the known queue-size warning, and `git diff --check` passed.

### ECO-20260420-main-405

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-route-support-doc-truth-handoff.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-scout-405`

Completed:

- Updated README, architecture, and content-authoring docs so route/support documentation leads with the live Route v2 outing, notebook filing, replay, and tiny support-slot flow.
- Added `docs/reports/2026-04-20-route-support-doc-truth-implementation.md`.
- Updated packet `149` with the lane-4 main result and promoted `ECO-20260420-critic-405` to `READY`.
- Verification: broad route/support wording scan and exact stale-string scan passed with only intentional matches; `npm run validate:agents` with the known queue-size warning and `git diff --check` passed.

### ECO-20260420-scout-405

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-route-feedback-priority-review.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-critic-401`

Completed:

- Added `docs/reports/2026-04-20-route-support-doc-truth-handoff.md`.
- Scoped packet `149` lane 4 to a docs-only Route v2/support wording truth pass across README, architecture, and content-authoring docs.
- Updated packet `149` with the lane-4 scout refinement and promoted `ECO-20260420-main-405` to `READY`.
- Verification: `npm run validate:agents` with the known queue-size warning and `git diff --check` passed.

### ECO-20260420-critic-401

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Sound, feedback, and subtle juice`
- Source: `docs/reports/2026-04-20-route-feedback-priority-implementation.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-main-401`

Completed:

- Reviewed the route feedback-priority pass cleanly and confirmed station support/default toasts cannot replace `notebook-ready` or `filed-route` notices while `filed-route` can still replace `notebook-ready`.
- Added `docs/reports/2026-04-20-route-feedback-priority-review.md`.
- Updated packet `148` with the lane-4 critic result and promoted `ECO-20260420-scout-405` to `READY`.
- Verification: `npm test -- --run src/test/field-notices.test.ts -t "station support|field notice|filed-route"`, `npm run build`, `npm run validate:agents` with the known queue-size warning, and `git diff --check` passed.

### ECO-20260420-main-401

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Sound, feedback, and subtle juice`
- Source: `docs/reports/2026-04-20-route-feedback-priority-handoff.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-scout-401`

Completion note:

- Updated `shouldReplaceFieldNotice(...)` so station support/default toasts cannot replace `notebook-ready` or `filed-route` notices.
- Preserved filed-route replacement of notebook-ready notices when the route is filed.
- Extended focused `field-notices` coverage for notebook-ready protection, filed-route protection, outside-station replacement, and filed-over-ready replacement.
- Added `docs/reports/2026-04-20-route-feedback-priority-implementation.md`.
- Ran `npm test -- --run src/test/field-notices.test.ts -t "station support|field notice|filed-route"` and `npm run build`; full agent validation/diff checks were run after queue and packet updates.
- Updated packet `148` with the lane-4 main result and promoted `ECO-20260420-critic-401` to `READY`.

### ECO-20260420-scout-401

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Sound, feedback, and subtle juice`
- Source: `docs/reports/2026-04-20-route-support-notice-readability-review.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-critic-397`

Completion note:

- Added `docs/reports/2026-04-20-route-feedback-priority-handoff.md`.
- Confirmed lane 1 already fixed hidden notice timer lifecycle, so lane 4 should not reopen timers.
- Scoped the remaining route/support priority gap to protecting `notebook-ready` notices from station support/default toasts while preserving filed-over-ready replacement.
- Baseline-ran `npm test -- --run src/test/field-notices.test.ts -t "field notice|station support|filed-route"`.
- Updated packet `148` with the lane-4 scout refinement and promoted `ECO-20260420-main-401` to `READY`.

### ECO-20260420-critic-397

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-route-support-notice-readability-implementation.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-main-397`

Completion note:

- Added `docs/reports/2026-04-20-route-support-notice-readability-review.md` with a clean verdict.
- Confirmed support-toggle notices no longer expose `notebook-fit` or hyphenated helper terms and remain five words or fewer.
- Confirmed the change stayed inside the support notice helper and focused test, with no support behavior, route targeting, station, world-map, save, notice timer, geometry, filed-note, broad copy, or inspect-bubble `Notebook fit:` drift.
- Re-ran `npm test -- --run src/test/field-request-controller.test.ts -t "support notice copy"` and `npm run build`; full agent validation/diff checks were run after queue and packet updates.
- Updated packet `147` with the lane-4 critic result and promoted `ECO-20260420-scout-401` to `READY`.

### ECO-20260420-main-397

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-route-support-notice-readability-handoff.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-scout-397`

Completion note:

- Updated `getOutingSupportNoticeText(...)` so `hand-lens` now says `Highlights notebook clues.` instead of exposing `notebook-fit`.
- Updated `note-tabs` to `Keeps route aim visible.` for a clearer route-facing benefit.
- Extended focused support-notice coverage to keep notices at five words or fewer and reject `notebook-fit` or hyphenated helper terms.
- Added `docs/reports/2026-04-20-route-support-notice-readability-implementation.md`.
- Ran `npm test -- --run src/test/field-request-controller.test.ts -t "support notice copy"` and `npm run build`; full agent validation/diff checks were run after queue and packet updates.
- Updated packet `147` with the lane-4 main result and promoted `ECO-20260420-critic-397` to `READY`.

### ECO-20260420-scout-397

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-close-look-route-support-review.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-critic-393`

Completion note:

- Added `docs/reports/2026-04-20-route-support-notice-readability-handoff.md`.
- Confirmed Route v2 ready notices already give clear station-return filing actions.
- Scoped the implementation to the outing-support toggle toast helper, where `hand-lens` still exposes the internal `notebook-fit` phrase.
- Updated packet `147` with the lane-4 scout refinement and promoted `ECO-20260420-main-397` to `READY`.

### ECO-20260420-critic-393

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-close-look-route-support-implementation.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-main-393`

Completion note:

- Added `docs/reports/2026-04-20-close-look-route-support-review.md` with a clean verdict.
- Confirmed `shore-pine` and `root-curtain` selected close-look cards remain optional route context instead of route gates.
- Confirmed normal inspect claims `pine-cover` and `root-held` before any close-look action, and opening/closing close-look leaves route progress unchanged.
- Confirmed the scoped implementation is test-only in `src/test/runtime-smoke.test.ts`.
- Re-ran `npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter outing|forest expedition slot"`, `npm test -- --run src/test/close-look.test.ts -t "shore-pine|root-curtain|supported entries|compact payload"`, and `npm run build`; full agent validation/diff checks were run after queue and packet updates.
- Updated packet `146` with the lane-4 critic result and promoted `ECO-20260420-scout-397` to `READY`.

### ECO-20260420-main-393

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-close-look-route-support-handoff.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-scout-393`

Completion note:

- Added behavior-neutral runtime smoke coverage in `src/test/runtime-smoke.test.ts`.
- Proved `shore-pine` claims `pine-cover` on normal inspect, exposes the selected close-look bubble, opens/closes the `shore-pine` card, and leaves route progress unchanged.
- Proved `root-curtain` claims `root-held` on normal inspect, exposes the selected close-look bubble, opens/closes the `root-curtain` card, and leaves route progress unchanged.
- Added `docs/reports/2026-04-20-close-look-route-support-implementation.md`.
- Ran `npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter outing|forest expedition slot"`, `npm test -- --run src/test/close-look.test.ts -t "shore-pine|root-curtain|supported entries|compact payload"`, and `npm run build`; full agent validation/diff checks were run after queue and packet updates.
- Updated packet `146` with the lane-4 main result and promoted `ECO-20260420-critic-393` to `READY`.

### ECO-20260420-scout-393

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-route-evidence-language-review.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-critic-389`

Completion note:

- Added `docs/reports/2026-04-20-close-look-route-support-handoff.md`.
- Confirmed lane 2 already added close-look cards for selected route carriers `shore-pine` and `root-curtain`.
- Narrowed lane 4 to behavior-neutral route-context proof that close-look remains optional after normal inspect claims `pine-cover` and `root-held`.
- Explicitly kept route gates, support ids, station pages, save fields, world-map cues, geometry, and broad copy rewrites out of scope.
- Ran `npm test -- --run src/test/close-look.test.ts -t "shore-pine|root-curtain|supported entries|compact payload"` and `npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter outing|forest expedition slot"`.
- Updated packet `146` with the lane-4 scout refinement and promoted `ECO-20260420-main-393` to `READY`.

### ECO-20260420-critic-389

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-route-evidence-language-implementation.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-main-389`

Completion note:

- Added `docs/reports/2026-04-20-route-evidence-language-review.md` with a clean verdict.
- Confirmed `Shore Shelter` and `Open To Shelter` filed-note wording is now observation-led instead of causal or developmental.
- Confirmed the content-quality guard rejects the two exact overclaim phrases if they return.
- Confirmed filed-note matrix coverage protects clue-backed generated text, including the `Wrack Shelter` variant for `Shore Shelter`.
- Re-ran `npm test -- --run src/test/field-requests.test.ts -t "route-state matrix|filed-note|Shore Shelter|Open To Shelter"`, `npm run science:check`, `npm run build`, `npm run validate:agents`, and `git diff --check`.
- Updated packet `145` with the lane-4 critic result and promoted `ECO-20260420-scout-393` to `READY`.

### ECO-20260420-main-389

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-route-evidence-language-handoff.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-scout-389`

Completion note:

- Softened `beach-shore-shelter` filed-note text and `clueBackedTail` to say clues `mark shelter from dune edge to tide line` instead of `shelter grows`.
- Softened `coastal-shelter-shift` filed-note text and `clueBackedTail` to say clues `mark open coast meeting forest-edge shelter` instead of `the coast settling`.
- Updated `src/test/field-requests.test.ts` route filed-note matrix expectations and `src/test/content-quality.test.ts` route-note anchors.
- Added a content-quality guard so the two overclaim phrases cannot quietly return.
- Added `docs/reports/2026-04-20-route-evidence-language-implementation.md`.
- Verified `npm test -- --run src/test/field-requests.test.ts -t "route-state matrix|filed-note|Shore Shelter|Open To Shelter"` and `npm run science:check`; full build/agent validation/diff checks were run after queue and packet updates.
- Updated packet `145` with the lane-4 main result and promoted `ECO-20260420-critic-389` to `READY`.

### ECO-20260420-scout-389

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-journal-atlas-route-preview-review.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-critic-385`

Completion note:

- Added `docs/reports/2026-04-20-route-evidence-language-handoff.md`.
- Confirmed lane 2 already closed packet `145` source-ledger coverage; lane 4 should not add new ledger rows.
- Narrowed the lane-4 main pass to two observation-led filed-note phrase softenings: `beach-shore-shelter` and `coastal-shelter-shift`.
- Recommended focused `content-quality` and `field-requests` expectation updates while preserving route progression, support, station, world-map, save/schema, geometry, UI, filing-state, route summary, active process title, ready text, and evidence-slot behavior.
- Ran `npm test -- --run src/test/field-requests.test.ts -t "filed-note synthesis matrix|clue-backed filed note|Route v2 filed-note"` and `npm run science:check`.
- Updated packet `145` with the lane-4 scout refinement and promoted `ECO-20260420-main-389` to `READY`.

### ECO-20260420-critic-385

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-journal-atlas-route-preview-review.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-main-385`

Completion note:

- Added `docs/reports/2026-04-20-journal-atlas-route-preview-review.md` with no blocker.
- Confirmed the implementation is behavior-neutral and adds only station notebook-ready preview budget coverage.
- Confirmed the table covers the nine board-mapped ready Route v2 notes, protects canonical preview labels `<= 24`, preview text `<= 144`, and proves `note-tabs` wrap inherits the same preview text.
- Confirmed default wraps keep `NOTEBOOK READY` plus route ready text, `SHORT SEASON` remains the filing label while `Thaw Window.` stays display-prefix preview context, and Root Hollow / High Pass remain on existing expedition and chapter seams.
- Re-ran `npm test -- --run src/test/field-season-board.test.ts -t "notebook-ready|preview|copy budgets|High Pass"`, `npm test -- --run src/test/field-requests.test.ts -t "filed-note synthesis matrix|High Pass|Thaw Window"`, and `npm run build`.
- Updated packet `144` with the lane-4 critic result and promoted `ECO-20260420-scout-389` to `READY`.

### ECO-20260420-main-385

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-journal-atlas-route-preview-implementation.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-scout-385`

Completion note:

- Added a behavior-neutral table-driven station notebook-ready preview guard in `src/test/field-season-board.test.ts`.
- Covered the nine board-mapped ready Route v2 notes from `beach-shore-shelter` through `treeline-low-fell`.
- Asserted canonical preview labels stay `<= 24`, preview text stays `<= 144`, `note-tabs` wrap reuses the same preview text, and default wraps still show `NOTEBOOK READY` with route ready text.
- Preserved `SHORT SEASON` as the filing label while allowing `Thaw Window.` as display-prefix preview context.
- Left Root Hollow and High Pass on the existing expedition / High Pass chapter seams, with no production runtime, filed-note synthesis, route definition, station layout, save, world-map, corridor, traversal, support, content, or science-ledger changes.
- Added `docs/reports/2026-04-20-journal-atlas-route-preview-implementation.md`.
- Verified `npm test -- --run src/test/field-season-board.test.ts -t "notebook-ready|preview|copy budgets|High Pass"`, `npm test -- --run src/test/field-requests.test.ts -t "filed-note synthesis matrix|High Pass|Thaw Window"`, and `npm run build`.
- Updated packet `144` with the lane-4 main result and promoted `ECO-20260420-critic-385` to `READY`.

### ECO-20260420-scout-385

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-journal-atlas-route-preview-handoff.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-critic-381`

Completion note:

- Added `docs/reports/2026-04-20-journal-atlas-route-preview-handoff.md`.
- Narrowed packet `144` lane 4 to a behavior-neutral `field-season-board` test guard for route notebook-ready preview budgets and `note-tabs` wrap inheritance.
- Confirmed lane 1 left `routeBoard.notebookReady.previewText` to lane 4, lane 2 kept route filed-note logic untouched, and existing filed-note synthesis coverage already protects generated display text at `<= 144`.
- Kept Root Hollow and High Pass out of the station `notebookReady` preview table because they use expedition and High Pass chapter seams.
- Baseline-checked `npm test -- --run src/test/field-season-board.test.ts -t "notebook-ready|preview|copy budgets|High Pass"` and `npm test -- --run src/test/field-requests.test.ts -t "filed-note synthesis matrix|High Pass|Thaw Window"`.
- Updated packet `144` with the lane-4 scout refinement and promoted `ECO-20260420-main-385` to `READY`.

### ECO-20260420-critic-422

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Performance, bundle, and error hardening`
- Source: `docs/reports/2026-04-20-review-drop-scratch-ignore-implementation.md`
- Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
- Depends on: `ECO-20260420-main-422`

Completion note:

- Reviewed the review-drop scratch ignore pass cleanly and found no blocker.
- Confirmed `.tmp` is now project-ignored and the new test uses Vite raw imports so production typechecking remains clean.
- Confirmed review-drop scripts, package scripts, README, runtime code, save schema, route behavior, station behavior, content, geometry, and UI stayed unchanged.
- Added `docs/reports/2026-04-20-review-drop-scratch-ignore-review.md`, updated packet `154`, and promoted `ECO-20260420-scout-426` to `READY`.
- Verified with `npm test -- --run src/test/review-drop-hygiene.test.ts`, `node --check scripts/create-review-drop.mjs`, `node --check scripts/verify-review-drop.mjs`, and `npm run build`.

### ECO-20260420-scout-426

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 scout: External playtest feedback batch one`
- Source: `docs/reports/2026-04-20-review-drop-scratch-ignore-review.md`
- Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
- Depends on: `ECO-20260420-critic-422`

Completion note:

- Scoped packet `155` lane 1 to the fresh first-session menu-focus regression where the starter `nextBiomeId: "beach"` state still selects `world-map`.
- Documented that the durable rule says starter-stage menu focus should only default to `world-map` when the guided target differs from the current biome.
- Added `docs/reports/2026-04-20-first-session-menu-focus-feedback-handoff.md`, updated packet `155`, and promoted `ECO-20260420-main-426` to `READY`.
- Baseline-checked the existing focused runtime smoke slice with `npm test -- --run src/test/runtime-smoke.test.ts -t "surfaces the first field-season guidance from starter note to next habitat pointer"`.

### ECO-20260420-main-426

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: External playtest feedback batch one`
- Source: `docs/reports/2026-04-20-first-session-menu-focus-feedback-handoff.md`
- Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
- Depends on: `ECO-20260420-scout-426`

Completion note:

- Restored the fresh first-session menu-focus contract: starter guidance on the current `beach` opener now defaults to `field-guide` instead of `world-map`.
- Preserved the later guided defaults where post-`Shore Shelter` starter guidance selects `world-map` and station-return world-map menus select `field-station`.
- Updated focused runtime-smoke expectations for the fresh starter, sound-toggle, and notebook-prompt field-guide paths.
- Added `docs/reports/2026-04-20-first-session-menu-focus-feedback-implementation.md`, updated packet `155`, and promoted `ECO-20260420-critic-426` to `READY`.
- Verified with `npm test -- --run src/test/runtime-smoke.test.ts -t "first field-season guidance"`, `npm test -- --run src/test/runtime-smoke.test.ts -t "arms sound after input"`, `npm test -- --run src/test/runtime-smoke.test.ts -t "shows notebook prompts in the journal and reuses them in the copied field-guide prompt"`, and `npm run build`.
- Attempted full `npm test -- --run src/test/runtime-smoke.test.ts`; it remains red on broader map-focus / route-replay expectations and an unrelated High Pass rime-footing copy expectation outside this item.

### ECO-20260420-critic-426

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: External playtest feedback batch one`
- Source: `docs/reports/2026-04-20-first-session-menu-focus-feedback-implementation.md`
- Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
- Depends on: `ECO-20260420-main-426`

Completion note:

- Reviewed the first-session menu-focus fix cleanly and found no blocker.
- Confirmed fresh `stage: "starter"` / `nextBiomeId: "beach"` menus now select `field-guide`, while post-`Shore Shelter` guidance still selects `world-map` and station-return world-map menus still select `field-station`.
- Confirmed no route definition, guided copy, station layout, save schema, field-guide payload, geometry, science content, or tooling drift.
- Added `docs/reports/2026-04-20-first-session-menu-focus-feedback-review.md`, updated packet `155`, and promoted `ECO-20260420-scout-430` to `READY` for the next packet.
- Verified with `npm test -- --run src/test/runtime-smoke.test.ts -t "first field-season guidance"`, `npm test -- --run src/test/runtime-smoke.test.ts -t "arms sound after input"`, `npm test -- --run src/test/runtime-smoke.test.ts -t "shows notebook prompts in the journal and reuses them in the copied field-guide prompt"`, and `npm run build`.

### ECO-20260420-scout-430

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 scout: External playtest feedback batch two`
- Source: `docs/reports/2026-04-20-first-session-menu-focus-feedback-review.md`
- Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
- Depends on: `ECO-20260420-critic-426`

Completion note:

- Scoped packet `156` lane 1 to stale runtime-smoke navigation/replay proof expectations rather than new runtime behavior.
- Identified old world-map current-location assertions that should follow the current guided active-target rule.
- Identified one ready-to-file `Open To Shelter` replay-footer expectation that should match the existing ready-to-synthesize suppression.
- Left the unrelated High Pass rime-footing exact-copy mismatch to lane 2/content-copy ownership.
- Added `docs/reports/2026-04-20-runtime-smoke-navigation-proof-handoff.md`, updated packet `156`, and promoted `ECO-20260420-main-430` to `READY`.

### ECO-20260420-main-430

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: External playtest feedback batch two`
- Source: `docs/reports/2026-04-20-runtime-smoke-navigation-proof-handoff.md`
- Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
- Depends on: `ECO-20260420-scout-430`

Completion note:

- Refreshed stale lane-1 runtime-smoke world-map focus and ready-to-file replay-label expectations in `src/test/runtime-smoke.test.ts`.
- Kept the current guided world-map focus behavior intact by explicitly selecting `world-map` where tests need it and using coherent completed starter progress in later Forest Trail fixtures.
- Refreshed stale Shore Shelter / Open To Shelter exact filed-route smoke expectations to match existing shortened runtime text.
- Left the known High Pass rime-footing exact-copy mismatch untouched for lane 2/content-copy ownership.
- Added `docs/reports/2026-04-20-runtime-smoke-navigation-proof-implementation.md`, updated packet `156`, and promoted `ECO-20260420-critic-430` to `READY`.
- Verified with `npm test -- --run src/test/runtime-smoke.test.ts -t "covers title|surfaces surveyed|Open To Shelter|routes page|world-map field station|live replay note|same-biome anchor|current origin"` and `npm run build`.
- Attempted full `npm test -- --run src/test/runtime-smoke.test.ts`; it now fails only on the known lane-2 High Pass rime-footing exact-copy expectation.

### ECO-20260420-critic-430

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: External playtest feedback batch two`
- Source: `docs/reports/2026-04-20-runtime-smoke-navigation-proof-implementation.md`
- Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
- Depends on: `ECO-20260420-main-430`

Completion note:

- Reviewed the runtime-smoke navigation proof refresh cleanly and found no blocker.
- Confirmed the pass stayed test-only and preserved guided menu focus, route replay suppression, station/map behavior, save schema, route/controller helpers, geometry, science content, and tooling.
- During review, refreshed stale Shore Shelter / Open To Shelter exact filed-route smoke expectations to match the existing shortened runtime text.
- Added `docs/reports/2026-04-20-runtime-smoke-navigation-proof-review.md` and updated packet `156`; lane 1 for packet `156` is clear.
- Promoted `ECO-20260420-scout-434` to `READY` for packet `157`.
- Verified with `npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter"`, `npm test -- --run src/test/runtime-smoke.test.ts -t "Shore Shelter|Wrack Shelter|Open To Shelter|covers title|surfaces surveyed|routes page|world-map field station|live replay note|same-biome anchor|current origin"`, and `npm run build`.
- Attempted full `npm test -- --run src/test/runtime-smoke.test.ts`; it now fails only on the known lane-2 High Pass rime-footing exact-copy expectation.

### ECO-20260420-scout-434

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 scout: Alpha release candidate and post-alpha scope gate`
- Source: `docs/reports/2026-04-20-runtime-smoke-navigation-proof-review.md`
- Packet: `.agents/packets/157-alpha-release-candidate-and-scope-gate.json`
- Depends on: `ECO-20260420-critic-430`

Completion note:

- Scoped packet `157` lane 1 to a strict `npm run alpha:rc` wrapper around the existing source review-drop pack and clean-extract verify workflow.
- Confirmed the current review-drop foundation already includes `review:pack`, `review:verify`, README instructions, and `docs/review-drop-checklist.md`.
- Left `ECO-20260420-main-434` blocked until packet `156` lanes 2/3/4 are clear and full `npm test` is green, because the current full runtime-smoke suite still has the known lane-2 High Pass rime-footing copy mismatch.
- Added `docs/reports/2026-04-20-alpha-rc-packaging-handoff.md` and updated packet `157`.

### ECO-20260420-main-422

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Performance, bundle, and error hardening`
- Source: `docs/reports/2026-04-20-review-drop-scratch-ignore-handoff.md`
- Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
- Depends on: `ECO-20260420-scout-422`

Completion note:

- Added `.tmp` to `.gitignore` so review-drop verifier scratch workspaces are project-ignored on fresh machines.
- Added `src/test/review-drop-hygiene.test.ts` to guard the generated/local ignore list.
- Left review-drop scripts, package scripts, README, runtime code, save schema, route behavior, station behavior, content, geometry, and UI unchanged.
- Added `docs/reports/2026-04-20-review-drop-scratch-ignore-implementation.md`, updated packet `154`, and promoted `ECO-20260420-critic-422` to `READY`.
- Verified with `npm test -- --run src/test/review-drop-hygiene.test.ts`, `node --check scripts/create-review-drop.mjs`, `node --check scripts/verify-review-drop.mjs`, and `npm run build`.

### ECO-20260420-scout-422

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 scout: Performance, bundle, and error hardening`
- Source: `docs/reports/2026-04-20-save-normalization-hardening-review.md`
- Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
- Depends on: `ECO-20260420-critic-418`

Completion note:

- Audited the review-drop package hygiene flow and found the scripts/docs already largely aligned.
- Narrowed lane 1 to adding repo-local `.tmp` ignore coverage plus a focused ignore-list regression for generated/local folders.
- Added `docs/reports/2026-04-20-review-drop-scratch-ignore-handoff.md`, updated packet `154`, and promoted `ECO-20260420-main-422` to `READY`.
- Verified the existing scripts with `npm run review:pack`, `node --check scripts/create-review-drop.mjs`, and `node --check scripts/verify-review-drop.mjs`.

### ECO-20260420-critic-418

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Save schema and migration hardening`
- Source: `docs/reports/2026-04-20-save-normalization-hardening-implementation.md`
- Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
- Depends on: `ECO-20260420-main-418`

Completion note:

- Reviewed the save normalization hardening cleanly and found no blocker.
- Confirmed malformed persisted `biomeVisits` and `lastBiomeId` values are normalized without route/support/snapshot/UI/copy drift.
- Added `docs/reports/2026-04-20-save-normalization-hardening-review.md`, updated packet `153`, and promoted `ECO-20260420-scout-422` to `READY`.
- Verified with `npm test -- --run src/test/save.test.ts`, `npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|season-close|route-marker"`, and `npm run build`.

### ECO-20260420-main-418

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Save schema and migration hardening`
- Source: `docs/reports/2026-04-20-save-normalization-hardening-handoff.md`
- Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
- Depends on: `ECO-20260420-scout-418`

Completion note:

- Added safe persisted `biomeVisits` and `lastBiomeId` normalization in `src/engine/save.ts`.
- Added focused malformed localStorage-style coverage in `src/test/save.test.ts`.
- Left storage keys, world-state version, route progress migrations, support unlocks, debug snapshot builders, UI, route definitions, and player-facing copy unchanged.
- Added `docs/reports/2026-04-20-save-normalization-hardening-implementation.md`, updated packet `153`, and promoted `ECO-20260420-critic-418` to `READY`.
- Verified with `npm test -- --run src/test/save.test.ts`, `npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|season-close|route-marker"`, and `npm run build`.

### ECO-20260420-scout-418

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 scout: Save schema and migration hardening`
- Source: `docs/reports/2026-04-20-field-season-board-outing-locator-review.md`
- Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
- Depends on: `ECO-20260420-critic-414`

Completion note:

- Audited the save migration surface and found route/support snapshot coverage already strong.
- Narrowed lane 1 to hardening persisted `biomeVisits` and `lastBiomeId` normalization in `src/engine/save.ts`.
- Added `docs/reports/2026-04-20-save-normalization-hardening-handoff.md`, updated packet `153`, and promoted `ECO-20260420-main-418` to `READY`.
- Verified with `npm test -- --run src/test/save.test.ts` and `npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|season-close|route-marker"`.

### ECO-20260420-critic-414

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Field-season-board splitting wave`
- Source: `docs/reports/2026-04-20-field-season-board-outing-locator-implementation.md`
- Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
- Depends on: `ECO-20260420-main-414`

Completion note:

- Reviewed the active outing locator extraction cleanly and found no blocker.
- Confirmed `field-season-outing-locator.ts` owns the locator family, `field-season-board.ts` keeps the compatibility re-export, and `field-request-state.ts` imports the locator directly.
- Confirmed Root Hollow, Season Threads, High Pass active, ready-to-file, filed suppression, atlas notes, copy budgets, station state, save schema, rendering, content, geometry, and journal layout stayed unchanged.
- Added `docs/reports/2026-04-20-field-season-board-outing-locator-review.md`, updated packet `152`, and promoted `ECO-20260420-scout-418` to `READY`.
- Verified with `npm test -- --run src/test/field-season-board.test.ts`, `npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|season-close|route-marker"`, and `npm run build`.

### ECO-20260420-main-414

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Field-season-board splitting wave`
- Source: `docs/reports/2026-04-20-field-season-board-outing-locator-handoff.md`
- Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
- Depends on: `ECO-20260420-scout-414`

Completion note:

- Extracted `ActiveOutingLocator`, `resolveSeasonOutingLocator()`, and shared Root Hollow expedition progress helpers/constants into `src/engine/field-season-outing-locator.ts`.
- Updated `field-season-board.ts` to consume the extracted helpers while preserving its existing locator re-export, and updated `field-request-state.ts` to import the locator directly.
- Added `docs/reports/2026-04-20-field-season-board-outing-locator-implementation.md`, updated packet `152`, and promoted `ECO-20260420-critic-414` to `READY`.
- Verified with `npm test -- --run src/test/field-season-board.test.ts`, `npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|season-close|route-marker"`, `npm run build`, and a web-game client smoke against `http://127.0.0.1:5174` that produced `output/web-game/shot-0.png` / `state-0.json` with no `errors-0.json`.

### ECO-20260420-scout-414

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 scout: Field-season-board splitting wave`
- Source: `docs/reports/2026-04-20-overlay-render-notice-review.md`
- Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
- Depends on: `ECO-20260420-critic-410`

Completion note:

- Scoped packet `152` lane 1 to extracting the active outing locator family from `field-season-board.ts` into a dedicated resolver module.
- Added `docs/reports/2026-04-20-field-season-board-outing-locator-handoff.md` and updated packet `152` with the implementation contract, non-goals, and verification list.
- Promoted `ECO-20260420-main-414` to `READY`.
- Verified with `npm test -- --run src/test/field-season-board.test.ts` and `npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|season-close|route-marker"`.

### ECO-20260420-critic-410

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-overlay-render-notice-implementation.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-main-410`

Completion note:

- Reviewed the notice-render extraction cleanly and found no blocker.
- Confirmed the four notice renderers now live in `field-notice-overlays.ts`, `game.ts` imports them directly, and `overlay-render.ts` keeps the larger overlay/page surfaces.
- Confirmed notice copy, rectangles, badge pixels, pulse timing, hint-chip placement, partner-strip placement, palettes, notice policy, timers, route/support behavior, station behavior, save state, content, geometry, and debug state stayed unchanged.
- Added `docs/reports/2026-04-20-overlay-render-notice-review.md`, updated packet `151`, and promoted `ECO-20260420-scout-414` to `READY`.
- Verified with `npm test -- --run src/test/overlay-copy.test.ts src/test/field-notices.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "field-season guidance|field-request notice timers|field-partner strip"`, `npm run build`, `npm run validate:agents`, and `git diff --check`.

### ECO-20260420-main-410

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-overlay-render-notice-handoff.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-scout-410`

Completion note:

- Moved `drawFieldGuideNotice`, `drawFieldRequestNotice`, `drawFieldRequestHintChip`, and `drawFieldPartnerNotice` into the new `src/engine/field-notice-overlays.ts` module.
- Updated `game.ts` to import those renderers directly from the new module and removed them from `overlay-render.ts`.
- Left notice copy, rectangles, badge pixels, pulse timing, hint-chip placement, partner-strip placement, notice policy, route/support behavior, station behavior, save state, content, geometry, and debug state unchanged.
- Added `docs/reports/2026-04-20-overlay-render-notice-implementation.md`, updated packet `151`, and promoted `ECO-20260420-critic-410` to `READY`.
- Verified with `npm test -- --run src/test/overlay-copy.test.ts src/test/field-notices.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "field-season guidance|field-request notice timers|field-partner strip"`, and `npm run build`.

### ECO-20260420-scout-410

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 scout: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-game-controller-extraction-guided-notice-review.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-critic-406`

Completion note:

- Scoped packet `151` lane 1 to a mechanical notice-render extraction from `overlay-render.ts` into a new `field-notice-overlays.ts` module.
- Named the exact render-only family: `drawFieldGuideNotice`, `drawFieldRequestNotice`, `drawFieldRequestHintChip`, and `drawFieldPartnerNotice`.
- Added `docs/reports/2026-04-20-overlay-render-notice-handoff.md`, updated packet `151`, and promoted `ECO-20260420-main-410` to `READY`.
- Baseline-verified with `npm test -- --run src/test/overlay-copy.test.ts src/test/field-notices.test.ts` and `npm test -- --run src/test/runtime-smoke.test.ts -t "field-season guidance|field-request notice timers|field-partner strip"`.

### ECO-20260420-critic-406

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-game-controller-extraction-guided-notice-implementation.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-main-406`

Completion note:

- Reviewed the guided field-season notice extraction cleanly and confirmed `field-notices.ts` now owns the pure title/replacement policy.
- Confirmed `game.ts` passes the current notice into the helper at every previous call site and no local guided-notice helper remains.
- Confirmed notice copy, durations, field-request completion, route filing, expedition activation, station behavior, support behavior, save schema, overlay rendering, authored content, geometry, and controller framework shape stayed unchanged.
- Added `docs/reports/2026-04-20-game-controller-extraction-guided-notice-review.md`, updated packet `150`, and promoted `ECO-20260420-scout-410` to `READY`.
- Verified with `npm test -- --run src/test/field-notices.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "field-season guidance|season capstone"`, `npm run build`, `npm run validate:agents`, and `git diff --check`.

### ECO-20260420-main-406

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-game-controller-extraction-guided-notice-handoff.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-scout-406`

Completion note:

- Extracted guided field-season notice policy from `game.ts` into `field-notices.ts`.
- Added `isGuidedFieldSeasonNoticeTitle()` and `canShowGuidedFieldSeasonNotice(currentNotice, nextTitle)` with focused unit coverage.
- Updated starter, station-return, season-capstone, season-close-return, and next-habitat notice checks in `game.ts` to use the exported helper.
- Left notice copy, durations, field-request completion, route filing, expedition activation, station behavior, support behavior, save schema, overlay rendering, authored content, and geometry unchanged.
- Added `docs/reports/2026-04-20-game-controller-extraction-guided-notice-implementation.md`, updated packet `150`, and promoted `ECO-20260420-critic-406` to `READY`.
- Verified with `npm test -- --run src/test/field-notices.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "field-season guidance|season capstone"`, and `npm run build`.

### ECO-20260420-scout-406

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 scout: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-alpha-content-parity-tooling-review.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-critic-402`

Completion note:

- Scoped packet `150` lane 1 to a behavior-preserving extraction of guided field-season notice policy from `game.ts` into `field-notices.ts`.
- Identified the exact helper seam: move guided notice title classification plus `canShowGuidedFieldSeasonNotice(currentNotice, nextTitle)` to `src/engine/field-notices.ts`.
- Added `docs/reports/2026-04-20-game-controller-extraction-guided-notice-handoff.md`, updated packet `150`, and promoted `ECO-20260420-main-406` to `READY`.
- Baseline-verified with `npm test -- --run src/test/field-notices.test.ts` and `npm test -- --run src/test/runtime-smoke.test.ts -t "field-season guidance|season capstone"`.

### ECO-20260420-critic-402

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-alpha-content-parity-tooling-implementation.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-main-402`

Completion note:

- Reviewed the README command-sync pass cleanly and confirmed it exposes `science:check`, `review:pack`, and `review:verify`.
- Confirmed the README clean-extract description matches the verifier script and the pass stayed docs-only.
- Confirmed package scripts, review-drop script behavior, runtime code, tests, save schema, authored content, historical reports, and future-scope promises stayed unchanged.
- Added `docs/reports/2026-04-20-alpha-content-parity-tooling-review.md`, updated packet `149`, and promoted `ECO-20260420-scout-406` to `READY`.
- Verified with `node --check scripts/create-review-drop.mjs`, `node --check scripts/verify-review-drop.mjs`, `npm run validate:agents`, and `git diff --check`.

### ECO-20260420-main-402

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-alpha-content-parity-tooling-handoff.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-scout-402`

Completion note:

- Updated `README.md` so useful commands now include `npm run science:check`, `npm run review:pack`, and `npm run review:verify -- <archive.tgz>`.
- Split fresh local verification from source review-drop clean-extract verification and pointed reviewers to `docs/review-drop-checklist.md`.
- Left package scripts, review-drop script behavior, runtime code, tests, save schema, authored content, and historical reports unchanged.
- Added `docs/reports/2026-04-20-alpha-content-parity-tooling-implementation.md`, updated packet `149`, and promoted `ECO-20260420-critic-402` to `READY`.

### ECO-20260420-scout-402

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-critic-398`

Completion note:

- Audited the public tooling and review-drop docs for packet `149` lane 1.
- Found the scripts and review-drop checklist already match the clean-extract proof, but `README.md` still omits `science:check`, `review:pack`, and `review:verify` and uses a generic archive-sharing note.
- Added `docs/reports/2026-04-20-alpha-content-parity-tooling-handoff.md`, updated packet `149`, and promoted `ECO-20260420-main-402` to `READY`.

### ECO-20260420-critic-398

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Sound, feedback, and subtle juice`
- Source: `docs/reports/2026-04-20-sound-feedback-lifecycle-implementation.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-main-398`

Completion note:

- Reviewed the field-request notice lifecycle guard cleanly and confirmed notice timers now pause while hidden by overlays, transitions, or a visible field-guide notice.
- Confirmed timers still advance during visible play/world-map states and the focused runtime smoke proves hidden-menu survival plus visible-time clearing.
- Confirmed audio profile ids, UI cue ids, audio graph behavior, ambience tuning, save schema, route definitions, route copy, station layout, menu actions, field-season board copy, authored science content, and geometry stayed unchanged for this pass.
- Added `docs/reports/2026-04-20-sound-feedback-lifecycle-review.md`, updated packet `148`, and promoted `ECO-20260420-scout-402` to `READY`.
- Verified with `npm test -- --run src/test/field-notices.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "field-request notice"`, `npm run build`, `npm run validate:agents`, and `git diff --check`.

### ECO-20260420-main-398

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Sound, feedback, and subtle juice`
- Source: `docs/reports/2026-04-20-sound-feedback-lifecycle-implementation.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-scout-398`

Completion note:

- Added `shouldAdvanceFieldRequestNoticeTimer()` and wired it into `fieldRequestNoticeTimer` so feedback does not expire while hidden by overlays, transitions, or a visible field-guide notice.
- Added unit coverage for visible play, world-map play, hidden overlays, transitions, and field-guide-hidden cases.
- Added a focused runtime-smoke regression proving a `Moist Edge` replay notice survives a long hidden menu period and then clears after visible play time.
- Added `docs/reports/2026-04-20-sound-feedback-lifecycle-implementation.md`, updated packet `148`, and promoted `ECO-20260420-critic-398` to `READY`.
- Verified with `npm test -- --run src/test/field-notices.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "field-request notice"`, and `npm run build`.

### ECO-20260420-scout-398

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Sound, feedback, and subtle juice`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-critic-394`

Completion note:

- Audited the sound and feedback seams and found the existing audio engine/test coverage already protects optional sound and menu-toggle persistence.
- Identified the actionable lane-1 gap as field-request notice lifecycle timing: the timer currently ticks while notices are hidden by overlays or transitions.
- Added `docs/reports/2026-04-20-sound-feedback-lifecycle-handoff.md`, updated packet `148`, and promoted `ECO-20260420-main-398` to `READY`.
- Baseline-verified with `npm test -- --run src/test/audio.test.ts src/test/runtime-smoke.test.ts -t "audio|arms sound"` and `npm test -- --run src/test/field-notices.test.ts`.

### ECO-20260420-critic-394

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-kid-input-accessibility-implementation.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-main-394`

Completion note:

- Reviewed the fullscreen save-safety pass cleanly and confirmed unsupported or failed fullscreen entry no longer strands `settings.fullscreen = true`.
- Confirmed focused runtime-smoke coverage proves unsupported fullscreen activation and `Escape` recovery from the title menu.
- Confirmed menu action order, guided menu defaults, reset behavior, station/route/world-map behavior, save schema, authored copy, geometry, and UI layout stayed unchanged for this lane-1 pass.
- Added `docs/reports/2026-04-20-kid-input-accessibility-review.md`, updated packet `147`, and promoted `ECO-20260420-scout-398` to `READY`.
- Verified with `npm test -- --run src/test/runtime-smoke.test.ts -t "unsupported fullscreen"`, `npm run build`, and `git diff --check`.

### ECO-20260420-main-394

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-kid-input-accessibility-implementation.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-scout-394`

Completion note:

- Updated `toggleFullscreen()` so unsupported fullscreen entry and rejected/thrown fullscreen requests do not strand `settings.fullscreen = true`.
- Added a focused runtime-smoke regression proving a stale fullscreen-on save returns to `false` when the fake DOM lacks Fullscreen API support, and that `Escape` still recovers from the title menu.
- Preserved menu action order, guided menu defaults, reset behavior, station/route/world-map behavior, save schema, authored copy, geometry, and UI layout.
- Added `docs/reports/2026-04-20-kid-input-accessibility-implementation.md` and promoted `ECO-20260420-critic-394` to `READY`.
- Verified with `npm test -- --run src/test/runtime-smoke.test.ts -t "unsupported fullscreen"` and `npm run build`.

### ECO-20260420-scout-394

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-kid-input-accessibility-handoff.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-scout-390`

Completion note:

- Added `docs/reports/2026-04-20-kid-input-accessibility-handoff.md`.
- Identified the smallest lane-1 implementation chunk as save-safe fullscreen persistence for unsupported or failed Fullscreen API entry.
- Scoped `ECO-20260420-main-394` to `toggleFullscreen()` plus one focused runtime-smoke regression, with menu order, guided defaults, reset behavior, station/route/map behavior, save schema, copy, geometry, and UI layout out of scope.
- Noted unrelated broad runtime-smoke map-focus noise so the main item can verify with a focused unsupported-fullscreen test instead.
- Promoted `ECO-20260420-main-394` to `READY`.

### ECO-20260420-scout-390

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-close-look-sketchbook-state-handoff.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-critic-386`

Completion note:

- Added `docs/reports/2026-04-20-close-look-sketchbook-state-handoff.md`.
- Confirmed lane 2 already completed packet `146` selected-carrier work for `root-curtain` and `shore-pine`.
- Audited close-look/sketchbook state seams and found no lane-1 implementation needed because existing focused helper tests and runtime smoke cover the relevant open/close paths.
- Parked `ECO-20260420-main-390` and `ECO-20260420-critic-390`, then promoted `ECO-20260420-scout-394` to `READY`.
- Verified with focused close-look/sketchbook helper tests plus runtime smoke for close-look and sketchbook open/close paths.

### ECO-20260420-critic-386

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-science-source-ledger-tooling-review.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-main-386`

Completion note:

- Added `docs/reports/2026-04-20-science-source-ledger-tooling-review.md` with a clean verdict.
- Confirmed `npm run science:check` is focused on the source-ledger/content-quality gate and review-drop verification requires and runs it before full tests.
- Confirmed the lane-1 pass did not edit source-ledger rows, content rosters, content-quality assertions, authored science copy, route/station/map runtime behavior, save schema, geometry, or UI.
- Updated packet `145` with the lane-1 critic result and promoted `ECO-20260420-scout-390` to `READY`.
- Verified with `npm run science:check`, `node --check scripts/verify-review-drop.mjs`, `npm run build`, `npm run validate:agents`, and `git diff --check`.

### ECO-20260420-main-386

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-science-source-ledger-tooling-implementation.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-scout-386`

Completion note:

- Added `npm run science:check` as the focused source-ledger/content-quality gate.
- Updated `scripts/verify-review-drop.mjs` to require `docs/science-source-ledger.md` and `src/test/content-quality.test.ts` in review archives, then run `npm run science:check` before full `npm test`.
- Updated `docs/review-drop-checklist.md` to make source-ledger proof explicit in local pre-pack and clean extract proof steps.
- Added `docs/reports/2026-04-20-science-source-ledger-tooling-implementation.md` and promoted `ECO-20260420-critic-386` to `READY`.
- Verified with `npm run science:check`, `node --check scripts/verify-review-drop.mjs`, and `npm run build`.

### ECO-20260420-scout-386

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-science-source-ledger-tooling-handoff.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-critic-382`

Completion note:

- Added `docs/reports/2026-04-20-science-source-ledger-tooling-handoff.md`.
- Confirmed lane 2 already completed the ledger rows and generalized content-quality coverage, so lane 1 should not edit authored science copy, content, or ledger rows for this packet.
- Narrowed `ECO-20260420-main-386` to package/review-drop tooling: add a named source-ledger check, require the ledger/test files in review verification, run the focused gate before full tests, and update checklist docs.
- Updated packet `145` with lane-1 scout guidance and promoted `ECO-20260420-main-386` to `READY`.
- Verified the baseline source-ledger gate with `npm test -- --run src/test/content-quality.test.ts`.

### ECO-20260420-critic-382

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-journal-atlas-systems-budget-review.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-main-382`

Completion note:

- Added `docs/reports/2026-04-20-journal-atlas-systems-budget-review.md` with a clean verdict.
- Confirmed the lane-1 implementation is test-only for runtime source and guards season-wrap, atlas, route-board, launch-card, and active-outing strings across representative fresh-through-filed High Pass states.
- Confirmed `routeBoard.notebookReady.previewText` remains out of lane-1 scope for packet `144` lane 4.
- Rechecked focused field-season-board coverage and build.
- Updated packet `144` with the lane-1 critic result and promoted `ECO-20260420-scout-386` to `READY`.

### ECO-20260420-main-382

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-journal-atlas-systems-budget-implementation.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-scout-382`

Completion note:

- Added a test-only station/atlas/wrap/active-outing copy-budget guard in `src/test/field-season-board.test.ts`.
- Covered representative saves from fresh beach through filed High Pass, including atlas-present phases, Root Hollow evidence progress, Season Threads, High Pass active, High Pass ready-to-file, and filed High Pass.
- Left `routeBoard.notebookReady.previewText`, route filing synthesis, authored content, station layout, render coordinates, save schema, route controller behavior, world-map behavior, corridor behavior, traversal behavior, and High Pass route-state behavior unchanged.
- Added `docs/reports/2026-04-20-journal-atlas-systems-budget-implementation.md` and promoted `ECO-20260420-critic-382` to `READY`.
- Verified with `npm test -- --run src/test/field-season-board.test.ts` and `npm run build`.

### ECO-20260420-scout-382

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-journal-atlas-systems-budget-handoff.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-critic-378`

Completion note:

- Added `docs/reports/2026-04-20-journal-atlas-systems-budget-handoff.md` for packet `144`.
- Narrowed lane 1 to a test-only resolver budget guard for station route, atlas, wrap, and active-outing strings that can feed station, map, and quiet journal outing surfaces.
- Kept lane 2's content summaries and lane 4's route filing/notebook-ready preview inheritance out of scope.
- Updated packet `144` with the lane-1 scout refinement and promoted `ECO-20260420-main-382` to `READY`.
- Scout baseline `npm test -- --run src/test/field-season-board.test.ts` passed.

### ECO-20260420-scout-391

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-close-look-sketchbook-selected-handoff.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-critic-387`

Completion note:

- Added `docs/reports/2026-04-20-close-look-sketchbook-selected-handoff.md` for packet `146`.
- Selected exactly two route/place-memory carriers for lane 2's implementation: `root-curtain` for Root Hollow and `shore-pine` for Open To Shelter.
- Scoped the next main step to compact close-look seeds and focused tests only, with no new entries, sketchbook slots, comparison rules, route behavior, station surfaces, world-map cues, or geometry.
- Updated packet `146` with the lane-2 scout refinement and promoted `ECO-20260420-main-391` to `READY`.

### ECO-20260420-main-391

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-close-look-sketchbook-selected-implementation.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-scout-391`

Completion note:

- Added compact close-look support for `root-curtain` and `shore-pine` only, reusing existing entries and sprite ids.
- Extended focused close-look tests for allowlist support, payload shape, and keeping `fallen-giant-log` outside this selected pass.
- Added `docs/reports/2026-04-20-close-look-sketchbook-selected-implementation.md` and packet `146` lane-2 main result notes.
- Left entries, sketchbook slots, comparison rules, route behavior, station surfaces, world-map cues, save state, and biome geometry unchanged.
- Promoted `ECO-20260420-critic-391` to `READY`.

### ECO-20260420-critic-391

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-close-look-sketchbook-selected-review.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-main-391`

Completion note:

- Added `docs/reports/2026-04-20-close-look-sketchbook-selected-review.md` with a clean verdict.
- Confirmed exactly `root-curtain` and `shore-pine` were added to close-look support, with compact visual-first payloads tied to existing route/place memory notes.
- Confirmed `fallen-giant-log` remains outside this pass and the scoped implementation did not change route, sketchbook, station, map, comparison, save, or geometry behavior.
- Rechecked focused close-look tests, build, agent validation, and `git diff --check`.
- Promoted `ECO-20260420-scout-395` to `READY`.

### ECO-20260420-scout-395

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-kid-readability-copy-handoff.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-critic-391`

Completion note:

- Added `docs/reports/2026-04-20-kid-readability-copy-handoff.md`.
- Narrowed packet `147` lane 2 to active field-request summaries that leak internal evidence-slot ids such as `stone-lift`, `last-tree-shape`, and `seep-mark`.
- Scoped `main-395` to summary-copy edits plus a content-quality guard against exact slot ids in Route v2 summaries, with no route behavior, support behavior, station/map/save/input, geometry, or filed-note synthesis changes.
- Updated packet `147` with the lane-2 scout refinement and promoted `ECO-20260420-main-395` to `READY`.

### ECO-20260420-main-395

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-kid-readability-copy-implementation.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-scout-395`

Completion note:

- Rewrote the seven active Route v2 field-request summaries named in the scout handoff so hyphenated internal slot ids now read as kid-readable clue phrases.
- Added `content-quality` coverage that rejects hyphenated evidence-slot ids in field-request summaries while allowing ordinary single-word clue terms.
- Refreshed focused `field-requests` exact-copy expectations without changing evidence slot ids, slot order, route/support behavior, station/map/save/input behavior, geometry, or filed-note synthesis.
- Added `docs/reports/2026-04-20-kid-readability-copy-implementation.md`, updated packet `147`, and promoted `ECO-20260420-critic-395` to `READY`.
- Verification passed: `npm test -- --run src/test/content-quality.test.ts src/test/field-requests.test.ts -t "field-request|route|summary|content quality"`, `npm run build`, `npm run validate:agents` with the known queue-size warning, and `git diff --check`.

### ECO-20260420-critic-395

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-kid-readability-copy-review.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-main-395`

Completion note:

- Reviewed `ECO-20260420-main-395` cleanly and added `docs/reports/2026-04-20-kid-readability-copy-review.md`.
- Confirmed active field-request summaries no longer leak hyphenated internal evidence-slot ids and the guard still allows ordinary single-word clue terms such as `shelter`.
- Confirmed evidence slot ids, slot order, route/support behavior, station/map/save/input behavior, geometry, and filed-note synthesis stayed unchanged.
- Updated packet `147` with the lane-2 critic result and promoted `ECO-20260420-scout-399` to `READY`.
- Verification passed: `npm test -- --run src/test/content-quality.test.ts src/test/field-requests.test.ts -t "field-request|route|summary|content quality"`, `npm run build`, `npm run validate:agents` with the known queue-size warning, and `git diff --check`.

### ECO-20260420-scout-399

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Sound, feedback, and subtle juice`
- Source: `docs/reports/2026-04-20-sound-feedback-tone-handoff.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-critic-395`

Completion note:

- Audited lane-2-safe sound and feedback seams and confirmed runtime audio/profile/cue behavior should stay lane-1 owned.
- Added `docs/reports/2026-04-20-sound-feedback-tone-handoff.md` with a copy-only recommendation for the menu sound helper fallback.
- Updated packet `148` with the lane-2 scout refinement and promoted `ECO-20260420-main-399` to `READY`.
- Verification passed: packet JSON parse, `npm run validate:agents` with the known work-queue-size warning, and `git diff --check`.

### ECO-20260420-main-399

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Sound helper tone copy pass`
- Source: `docs/reports/2026-04-20-sound-feedback-tone-implementation.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-scout-399`

Completion note:

- Replaced both menu helper fallback strings with `Quiet sounds start after a key or click.` and preserved the key/click browser-audio gesture meaning.
- Added exact overlay-copy assertions for the field-guide-only and no-primary-action fallback cases.
- Left runtime audio behavior, cue/profile ids, save settings, menu actions, render coordinates, route notices, station pages, field-season board copy, and visual accents unchanged.
- Added `docs/reports/2026-04-20-sound-feedback-tone-implementation.md`, updated packet `148` with the lane-2 main result, and promoted `ECO-20260420-critic-399` to `READY`.
- Verification passed: `npm test -- --run src/test/overlay-copy.test.ts src/test/audio.test.ts -t "sound|menu|overlay|audio"`, `npm run build`, `npm run validate:agents` with the known work-queue-size warning, and `git diff --check`.

### ECO-20260420-critic-399

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Sound helper tone copy pass`
- Source: `docs/reports/2026-04-20-sound-feedback-tone-review.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-main-399`

Completion note:

- Reviewed the lane-2 sound-helper tone pass cleanly and added `docs/reports/2026-04-20-sound-feedback-tone-review.md`.
- Confirmed both fallback branches use `Quiet sounds start after a key or click.` and the old `Sound wakes after your first key or click.` string is gone from the touched source/test files.
- Confirmed exact overlay-copy coverage protects both fallback cases and the implementation did not change runtime audio behavior, profile/cue ids, save settings, menu actions, render coordinates, route notices, station pages, field-season board copy, or visual accents.
- Updated packet `148` with the lane-2 critic result. No lane-2 follow-up is needed from this packet.
- Verification passed: `npm test -- --run src/test/overlay-copy.test.ts src/test/audio.test.ts -t "sound|menu|overlay|audio"`, `npm run build`, `npm run validate:agents` with the known work-queue-size warning, and `git diff --check`.

### ECO-20260420-scout-366

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-forest-route-transition-state-review.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-critic-362`

Completion note:

- Added `docs/reports/2026-04-20-treeline-route-transition-state-handoff.md` for packet `140`.
- Narrowed lane 1 to one debug-only `treeline-stone-shelter` save snapshot plus focused guided-state, world-map, station-route-board, support-default, no-High-Pass-launch-card, and journal assertions.
- Confirmed the scoped main step should avoid player-facing station behavior, route definitions, lane-2 Treeline copy, support-choice behavior, world-map focus priority, save schema, Treeline geometry, High Pass copy, and route controller behavior.
- Updated packet `140` with the lane-1 scout refinement and promoted `ECO-20260420-main-366` to `READY`.

### ECO-20260420-main-366

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-treeline-route-transition-state-implementation.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-scout-366`

Completion note:

- Added the debug-only `treeline-stone-shelter` save snapshot and documented it in `docs/save-snapshot-states.md`.
- Extended `src/test/save-snapshots.test.ts` with resolver and booted runtime assertions for guided state, active request, world-map focus, station support/default route board, no High Pass launch card, and journal request.
- Added `docs/reports/2026-04-20-treeline-route-transition-state-implementation.md` plus ignored browser proof under `output/web-game/treeline-main-366-client/` and `output/web-game/treeline-main-366-snapshot/`.
- Verified `npm test -- --run src/test/save-snapshots.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "route board to treeline|High Pass"`, `npm run build`, web-game client smoke, and direct Playwright snapshot proof with no console/page errors.
- Promoted `ECO-20260420-critic-366` to `READY`.

### ECO-20260420-critic-366

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-treeline-route-transition-state-review.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-main-366`

Completion note:

- Added `docs/reports/2026-04-20-treeline-route-transition-state-review.md` with a clean verdict.
- Confirmed the new `treeline-stone-shelter` snapshot stays debug/test/docs only, round-trips as plain `SaveState`, and proves Stone Shelter station/map/journal state without High Pass launch or filed-copy drift.
- Verified `npm test -- --run src/test/save-snapshots.test.ts` and `npm test -- --run src/test/runtime-smoke.test.ts -t "route board to treeline"`.
- Noted the broader High Pass smoke filter currently catches unrelated dirty-tree rime-footing summary drift outside the lane-1 snapshot files.
- Promoted `ECO-20260420-scout-370` to `READY`.

### ECO-20260420-scout-370

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-tundra-thaw-window-state-handoff.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-critic-366`

Completion note:

- Added `docs/reports/2026-04-20-tundra-thaw-window-state-handoff.md` for packet `141`.
- Narrowed lane 1 to one debug-only `tundra-thaw-window` save snapshot plus focused guided-state, route-board replay-note, world-map, station support/default, no-launch-card, and journal assertions.
- Confirmed the scoped main step should avoid Route v2 definitions, process focus copy, support targeting, lane-2 Tundra copy, station layout, world-map focus priority, save schema, Tundra geometry, High Pass copy, and route-controller behavior.
- Updated packet `141` with the lane-1 scout refinement and promoted `ECO-20260420-main-370` to `READY`.

### ECO-20260420-main-370

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-tundra-thaw-window-state-implementation.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-scout-370`

Completion note:

- Added the debug-only `tundra-thaw-window` save snapshot and documented it in `docs/save-snapshot-states.md`.
- Extended `src/test/save-snapshots.test.ts` with resolver and booted runtime assertions for guided state, active `Thaw Window` request, route-board replay note, world-map focus/footer, station support/default route board, no launch card, and journal request.
- Added `docs/reports/2026-04-20-tundra-thaw-window-state-implementation.md` plus ignored browser proof under `output/web-game/tundra-main-370-client/` and `output/web-game/tundra-main-370-snapshot/`.
- Preserved `src/engine/field-requests.ts`, Route v2 slot order, process focus copy, support targeting, lane-2 Tundra copy, station layout, world-map focus priority, save schema, Tundra geometry, High Pass copy, and route-controller behavior.
- Verified `npm test -- --run src/test/save-snapshots.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "route board to tundra|thaw-window route replay"`, `npm run build`, web-game client smoke, and direct Playwright snapshot proof with no console/page errors.
- Promoted `ECO-20260420-critic-370` to `READY`.

### ECO-20260420-critic-370

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-tundra-thaw-window-state-review.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-main-370`

Completion note:

- Added `docs/reports/2026-04-20-tundra-thaw-window-state-review.md` with a clean verdict.
- Confirmed the `tundra-thaw-window` snapshot is debug/test/docs only, serializes as plain current `SaveState`, and proves active peak-thaw Thaw Window surfaces without route-marker, launch-card, or High Pass drift.
- Verified `npm test -- --run src/test/save-snapshots.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "route board to tundra|thaw-window route replay"`, and `npm run build`.
- Confirmed direct browser proof artifacts exist under `output/web-game/tundra-main-370-snapshot/` and `errors.json` is empty.
- Promoted `ECO-20260420-scout-374` to `READY`.

### ECO-20260420-scout-374

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-treeline-tundra-corridor-accounting-handoff.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-critic-370`

Completion note:

- Added `docs/reports/2026-04-20-treeline-tundra-corridor-accounting-handoff.md` for packet `142`.
- Chose `treeline <-> tundra` as the lane-1 systems proof target, matching lane 2's completed threshold-prompt seam.
- Narrowed `main-374` to focused `runtime-smoke` coverage that proves threshold owner/zone switching does not advance `worldStep`, `lastBiomeId`, or visit counts until the player fully exits into `tundra`.
- Confirmed the scoped main step should avoid new corridor frameworks, map nodes, route objectives, save fields, prompt copy, and geometry changes unless the test exposes an actual systems bug.
- Baseline checked `npm test -- --run src/test/runtime-smoke.test.ts -t "corridor threshold|corridor traversal|full adjacent corridor chain"`.
- Updated packet `142` with the lane-1 scout refinement and promoted `ECO-20260420-main-374` to `READY`.

### ECO-20260420-main-374

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-treeline-tundra-corridor-accounting-handoff.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-scout-374`

Completion note:

- Added a focused `treeline-tundra-corridor` runtime-smoke accounting proof in `src/test/runtime-smoke.test.ts`.
- Proved threshold movement switches owner/zone between `treeline` / `lichen-fell` and `tundra` / `wind-bluff` without advancing `worldStep`, `lastBiomeId`, or either biome visit count.
- Proved full far-edge exit into `tundra` clears corridor state, advances `worldStep` by exactly one, increments only `biomeVisits.tundra`, and updates `lastBiomeId` to `tundra`.
- Added `docs/reports/2026-04-20-treeline-tundra-corridor-accounting-implementation.md` and updated packet `142` with the lane-1 main result.
- Verified `npm test -- --run src/test/runtime-smoke.test.ts -t "treeline-tundra-corridor|full adjacent corridor chain|corridor threshold"`, `npm run build`, and a web-game client smoke with inspected screenshot under `output/web-game/corridor-main-374-client/`.
- Promoted `ECO-20260420-critic-374` to `READY`.

### ECO-20260420-critic-374

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-treeline-tundra-corridor-accounting-implementation.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-main-374`

Completion note:

- Added `docs/reports/2026-04-20-treeline-tundra-corridor-accounting-review.md` with a clean verdict.
- Confirmed the focused `treeline-tundra-corridor` runtime-smoke case proves threshold owner/zone changes without `worldStep`, `lastBiomeId`, or visit-count churn.
- Confirmed full far-edge exit into `tundra` advances `worldStep` exactly once, increments only `biomeVisits.tundra`, clears corridor state, and updates `lastBiomeId`.
- Confirmed the pass stayed test-only for runtime source with no corridor, world-map, prompt, route/support, station/season/High Pass, save-schema, or geometry drift.
- Verified `npm test -- --run src/test/runtime-smoke.test.ts -t "treeline-tundra-corridor|full adjacent corridor chain|corridor threshold"`, `npm run build`, and packet/queue validation.
- Left packet `142` lane 1 clear and promoted `ECO-20260420-scout-378` to `READY`; no commit/push because the workspace contains broad unrelated dirty work.

### ECO-20260420-scout-378

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-map-station-travel-state-handoff.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-critic-374`

Completion note:

- Added `docs/reports/2026-04-20-map-station-travel-state-handoff.md` for packet `143`.
- Narrowed lane 1 to one focused test-only regression for filed High Pass with `route-marker` still selected from the prior outing.
- Scoped `main-378` to prove filed High Pass keeps active field request, world-map route marker/replay, journal outing card, and expedition activation travel suppressed.
- Confirmed the scoped main step should avoid route definitions, High Pass copy, station layout, support cycling behavior, world-map labels, corridor geometry, save schema, and lane-2 copy.
- Baseline checked `npm test -- --run src/test/save-snapshots.test.ts -t "High Pass"`.
- Updated packet `143` with the lane-1 scout refinement and promoted `ECO-20260420-main-378` to `READY`.

### ECO-20260420-main-378

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-map-station-travel-state-implementation.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-scout-378`

Completion note:

- Added a focused `src/test/save-snapshots.test.ts` regression that boots filed High Pass with `selectedOutingSupportId = "route-marker"`.
- Proved filed High Pass keeps `activeFieldRequest`, world-map `routeMarkerLocationId`, world-map `routeReplayLabel`, and `journal.fieldRequest` null.
- Proved the filed station route board remains targetless/filed and the filed High Pass expedition card stays in the station with the filed/logged notice instead of opening travel.
- Added `docs/reports/2026-04-20-map-station-travel-state-implementation.md` and updated packet `143` with lane-1 main results.
- Verification passed: `npm test -- --run src/test/save-snapshots.test.ts -t "High Pass"`, `npm run build`, `npm run validate:agents` with the known work-queue-size warning, and `git diff --check`.
- Promoted `ECO-20260420-critic-378` to `READY`.

### ECO-20260420-critic-378

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-map-station-travel-state-review.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-main-378`

Completion note:

- Added `docs/reports/2026-04-20-map-station-travel-state-review.md` with a clean verdict.
- Confirmed the focused filed High Pass stale-route-marker regression mutates only a copied debug snapshot save and stays test-only for runtime source.
- Confirmed active field request, world-map route marker/replay, journal outing card, and expedition travel activation remain suppressed after filing while the selected support remains `route-marker`.
- Confirmed route definitions, High Pass copy, station layout, support cycling behavior, world-map labels, corridor geometry, save schema, lane-2 copy, and runtime behavior stayed unchanged.
- Verified `npm test -- --run src/test/save-snapshots.test.ts -t "High Pass"` and `npm run build`; packet/queue validation and `git diff --check` were clean after updates.
- Promoted `ECO-20260420-scout-382` to `READY`.

### ECO-20260420-critic-362

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-forest-route-transition-state-implementation.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-main-362`

Completion note:

- Added `docs/reports/2026-04-20-forest-route-transition-state-review.md` with a clean review.
- Confirmed the `forest-moisture-holders` snapshot is debug/test/docs only, serializes as a plain current `SaveState`, and proves the guided-state, active-request, world-map, station route-board/support-default, and journal seams.
- Confirmed player-facing station behavior, route definitions, lane-2 forest copy, support-choice behavior, world-map focus priority, save schema, forest geometry, and route controller behavior stayed unchanged.
- Verified `npm test -- --run src/test/save-snapshots.test.ts`; implementation already passed the focused runtime smoke, build, browser proof, and `git diff --check`.
- Verified `npm run validate:agents` with the known work-queue size warning only.
- Promoted `ECO-20260420-scout-366` to `READY`.

### ECO-20260420-main-362

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-forest-route-transition-state-handoff.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-scout-362`

Completion note:

- Added the debug-only `forest-moisture-holders` save snapshot and documented it in `docs/save-snapshot-states.md`.
- Extended `src/test/save-snapshots.test.ts` to prove guided state, active request, world-map focus, station route board/support default, and journal request for the snapshot.
- Added `docs/reports/2026-04-20-forest-route-transition-state-implementation.md` and updated packet `139` with the lane-1 main result.
- Preserved player-facing station behavior, route definitions, lane-2 copy, support-choice behavior, world-map focus priority, save schema, forest geometry, and route controller behavior.
- Verified `npm test -- --run src/test/save-snapshots.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "Moisture Holders|first field-season guidance"`, `npm run build`, web-game client smoke, and direct Playwright snapshot proof with no console errors.
- Promoted `ECO-20260420-critic-362` to `READY`.

### ECO-20260420-scout-362

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-front-half-tactile-state-review.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-critic-358`

Completion note:

- Added `docs/reports/2026-04-20-forest-route-transition-state-handoff.md` for packet `139`.
- Narrowed lane 1 to one debug-only `forest-moisture-holders` save snapshot plus focused guided-state, world-map, station-route-board, support-default, and journal assertions.
- Confirmed the scoped main step should avoid player-facing station behavior, route definitions, lane-2 copy, support-choice behavior, world-map focus priority, save schema, forest geometry, and route controller behavior.
- Updated packet `139` with the lane-1 scout refinement and promoted `ECO-20260420-main-362` to `READY`.

### ECO-20260420-critic-375

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-treeline-tundra-threshold-prompt-implementation.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-main-375`

Completion note:

- Added `docs/reports/2026-04-20-treeline-tundra-threshold-prompt-review.md` with a clean review.
- Confirmed the runtime source diff only refreshes the existing `treeline-lowest-wind` prompt text and the new observation-prompt test asserts exact id, family, source, text, and evidence key.
- Confirmed seed metadata, resolver/scoring behavior, field requests, routes, support behavior, save behavior, world-map behavior, corridor geometry, ecosystem-note metadata, biome rosters, and new-content scope stayed unchanged.
- Confirmed the wording is kid-readable, science-safe, gradient-focused, and does not name a new biome or add a route objective.
- Cited the passing `npm test -- --run src/test/observation-prompts.test.ts src/test/content-quality.test.ts`, `npm run build`, `npm run validate:agents`, and `git diff --check`; agent validation still reports only the known queue-size warning.
- Noted unrelated dirty files from other lanes and remaining packet `142` lane work, so this is not a safe lane-clear commit/push point.
- Promoted `ECO-20260420-scout-379` to `READY`.

### ECO-20260420-scout-379

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-treeline-tundra-threshold-prompt-review.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-critic-375`

Completion note:

- Added `docs/reports/2026-04-20-map-station-travel-copy-handoff.md` for packet `143`.
- Narrowed lane 2 to two exact-copy clarifications: Treeline Pass's world-map footer summary and the active `treeline-high-pass` route summary.
- Recommended `Wind-bent edge between forest and tundra.` and `Start in Treeline Pass; log stone-lift, lee-watch, rime-mark, and talus-hold.` to separate place language from the `High Pass` route title.
- Preserved map-return/approach labels, High Pass route identity, route-marker behavior, support behavior, save behavior, station state, world-map focus/walking, corridor geometry, and route progression.
- Updated packet `143` with the lane-2 scout refinement and promoted `ECO-20260420-main-379` to `READY`.

### ECO-20260420-main-379

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-map-station-travel-copy-handoff.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-scout-379`

Completion note:

- Updated Treeline Pass's world-map footer summary to `Wind-bent edge between forest and tundra.`
- Updated the active `treeline-high-pass` route summary to `Start in Treeline Pass; log stone-lift, lee-watch, rime-mark, and talus-hold.`
- Updated focused exact-copy expectations in `src/test/world-map.test.ts` and `src/test/field-requests.test.ts`.
- Added `docs/reports/2026-04-20-map-station-travel-copy-implementation.md` and updated packet `143` with the lane-2 main result.
- Preserved map-return/approach labels, High Pass route title/id, filed/ready/active route behavior, route-marker behavior, support behavior, save behavior, station state, world-map focus/walking, corridor geometry, and route progression.
- Verified `npm test -- --run src/test/world-map.test.ts src/test/field-requests.test.ts src/test/content-quality.test.ts`, `npm run build`, `npm run validate:agents`, and `git diff --check`; agent validation still reports only the known queue-size warning.
- Promoted `ECO-20260420-critic-379` to `READY`.

### ECO-20260420-critic-379

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-map-station-travel-copy-implementation.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-main-379`

Completion note:

- Added `docs/reports/2026-04-20-map-station-travel-copy-review.md` with a clean review.
- Confirmed the packet `143` runtime scope changes only the Treeline Pass world-map summary and active `treeline-high-pass` route summary.
- Confirmed `Treeline Pass`, `HIGH PASS MAP`, `HIGH PASS`, the `High Pass` route title/id, High Pass filed/ready/active state behavior, route-marker behavior, support behavior, save behavior, station state, world-map focus/walking, corridor geometry, and field-request progression stayed unchanged.
- Confirmed no map tutorial paragraph, HUD, station panel, route objective, save shape, corridor behavior, map-return-label rewrite, or approach-label rewrite was added.
- Noted unrelated preexisting field-request copy diffs in the shared dirty worktree, outside this packet's scope.
- Cited the passing `npm test -- --run src/test/world-map.test.ts src/test/field-requests.test.ts src/test/content-quality.test.ts`, `npm run build`, `npm run validate:agents`, and `git diff --check`; agent validation still reports only the known queue-size warning.
- Updated packet `143` with the lane-2 critic result and promoted `ECO-20260420-scout-383` to `READY`.

### ECO-20260420-scout-383

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-map-station-travel-copy-review.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-critic-379`

Completion note:

- Added `docs/reports/2026-04-20-journal-atlas-copy-budget-handoff.md`.
- Audited packet `144` lane-2 copy surfaces and narrowed the main pass to a content-only ecosystem-note summary ceiling that also protects comparison-card summaries.
- Recommended lowering `NOTE_SUMMARY_MAX` to `96` and trimming five summaries: `rime-footholds`, `broken-canopy-floor`, `forest-floor-carpet`, `edge-berry-thicket`, and `pine-underlayer`.
- Confirmed current known field-atlas strip notes are already compact at 32-43 characters, so lane 2 should not touch `field-season-board.ts` or atlas layout in this pass.
- Left route filed-note rewrites out of scope because packet `133` already added filed-note compactness and relationship-anchor guards, and lowering that ceiling now would create wide exact-copy churn.
- Updated packet `144` with the lane-2 scout refinement and promoted `ECO-20260420-main-383` to `READY`.

### ECO-20260420-main-383

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-journal-atlas-copy-budget-handoff.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-scout-383`

Completion note:

- Lowered `NOTE_SUMMARY_MAX` from `110` to `96` in `src/test/content-quality.test.ts`.
- Renamed the ecosystem-note budget test so it explicitly protects both journal notes and comparison-card copy.
- Trimmed the five named ecosystem-note summaries: `rime-footholds`, `broken-canopy-floor`, `forest-floor-carpet`, `edge-berry-thicket`, and `pine-underlayer`.
- Preserved note ids, entry ids, unlock rules, zones, observation prompts, science meaning, atlas rendering/layout, station state, route-board layout, route-controller behavior, save behavior, world-map behavior, corridor behavior, traversal behavior, route filed-note copy, and new UI scope.
- Added `docs/reports/2026-04-20-journal-atlas-copy-budget-implementation.md` and updated packet `144` with the lane-2 main result.
- Verified `npm test -- --run src/test/content-quality.test.ts src/test/journal-comparison.test.ts`, `npm run build`, `npm run validate:agents`, and `git diff --check`; agent validation still reports only the known queue-size warning.
- Promoted `ECO-20260420-critic-383` to `READY`.

### ECO-20260420-critic-383

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-journal-atlas-copy-budget-implementation.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-main-383`

Completion note:

- Added `docs/reports/2026-04-20-journal-atlas-copy-budget-review.md` with a clean review.
- Confirmed `NOTE_SUMMARY_MAX` is now `96` and the ecosystem-note test names the journal plus comparison-card budget.
- Confirmed the five packet-scoped summaries stay under the new cap while preserving note ids, entry ids, unlock rules, zones, observation prompts, and science meaning.
- Confirmed atlas layout/rendering, station state, route-board layout, route-controller behavior, save behavior, world-map behavior, corridor behavior, traversal behavior, route filed-note logic, and new UI scope stayed untouched for this packet.
- Noted unrelated earlier lane edits in the shared dirty worktree, outside packet `144`'s scoped summary-budget changes.
- Cited the passing `npm test -- --run src/test/content-quality.test.ts src/test/journal-comparison.test.ts`, `npm run build`, `npm run validate:agents`, and `git diff --check`; agent validation still reports only the known queue-size warning.
- Updated packet `144` with the lane-2 critic result and promoted `ECO-20260420-scout-387` to `READY`.

### ECO-20260420-scout-387

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-critic-383`

Completion note:

- Added `docs/reports/2026-04-20-science-source-ledger-audit-handoff.md`.
- Audited `74` live inspectable entry ids across shared entries and the five live biome files; only `fallen-giant-log` lacks a source-ledger row.
- Audited live process moments and found `wrack-hold` already covered while `sand-capture`, `moisture-hold`, `frost-rime`, and `thaw-fringe` need ledger support.
- Found no high-risk unsupported science claim in this scout pass; scoped `main-387` to ledger rows and a content-quality coverage guard, not content rewrites.
- Updated packet `145` with the lane-2 scout refinement and promoted `ECO-20260420-main-387` to `READY`.

### ECO-20260420-main-387

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-science-source-ledger-audit-handoff.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-scout-387`

Completion note:

- Updated `docs/science-source-ledger.md` to the alpha audit status/date.
- Added `Watch` source-ledger support for `fallen-giant-log` and process-support rows for `sand-capture`, `moisture-hold`, `frost-rime`, and `thaw-fringe`.
- Added generalized `src/test/content-quality.test.ts` coverage so every live authored biome entry id and every live `processMoments[].id` has a science-ledger marker.
- Preserved authored science copy, species, inspectables, close-look cards, ecosystem notes, route tasks, world-map behavior, station state, save behavior, geometry, and UI.
- Added `docs/reports/2026-04-20-science-source-ledger-audit-implementation.md` and updated packet `145` with the lane-2 main result.
- Verified `npm test -- --run src/test/content-quality.test.ts`, `npm run build`, `npm run validate:agents`, and `git diff --check`; agent validation still reports only the known queue-size warning.
- Promoted `ECO-20260420-critic-387` to `READY`.

### ECO-20260420-critic-387

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-science-source-ledger-audit-implementation.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-main-387`

Completion note:

- Added `docs/reports/2026-04-20-science-source-ledger-audit-review.md` with a clean review.
- Confirmed `fallen-giant-log`, `sand-capture`, `moisture-hold`, `frost-rime`, and `thaw-fringe` now have conservative source-ledger markers.
- Confirmed the generalized content-quality guard covers every live authored biome entry id and every live `processMoments[].id`.
- Confirmed a focused coverage audit reports `74` live inspectable entries with `0` missing ledger rows and `5` process moments with `0` missing markers.
- Confirmed authored content copy, species, inspectables, close-look cards, ecosystem notes, route tasks, world-map behavior, station state, save behavior, geometry, and UI stayed unchanged for this packet.
- Cited the passing `npm test -- --run src/test/content-quality.test.ts`, `npm run build`, `npm run validate:agents`, and `git diff --check`; agent validation still reports only the known queue-size warning.
- Updated packet `145` with the lane-2 critic result and promoted `ECO-20260420-scout-391` to `READY`.

### ECO-20260420-main-375

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-treeline-tundra-threshold-prompt-handoff.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-scout-375`

Completion note:

- Updated only the existing `treeline-lowest-wind` authored prompt text in `src/engine/observation-prompts.ts` to `Where does shelter shrink into open ground?`.
- Added focused `src/test/observation-prompts.test.ts` coverage that resolves the seed from `Treeline Pass` `lichen-fell` during `ridge-wind` with `moss-campion`, `arctic-willow`, and `reindeer-lichen`, then asserts exact prompt text and evidence key.
- Added `docs/reports/2026-04-20-treeline-tundra-threshold-prompt-implementation.md` and updated packet `142` with the lane-2 main result.
- Preserved seed metadata, resolver/scoring behavior, field requests, routes, support behavior, save behavior, world-map behavior, corridor geometry, ecosystem-note metadata, biome rosters, and new-content scope.
- Verified `npm test -- --run src/test/observation-prompts.test.ts src/test/content-quality.test.ts`, `npm run build`, `npm run validate:agents`, and `git diff --check`; agent validation still reports only the known queue-size warning.
- Promoted `ECO-20260420-critic-375` to `READY`.

### ECO-20260420-scout-375

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-tundra-short-summer-rush-copy-review.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-critic-371`

Completion note:

- Added `docs/reports/2026-04-20-treeline-tundra-threshold-prompt-handoff.md` for packet `142`.
- Chose the existing `treeline-lowest-wind` prompt seed on the `treeline <-> tundra` seam because project memory and world-continuity docs identify it as the safe one-quiet-cue threshold.
- Recommended exact prompt copy `Where does shelter shrink into open ground?` while preserving seed metadata, resolver behavior, route/support/save/world-map behavior, corridor geometry, and content rosters.
- Updated packet `142` with the lane-2 scout refinement and promoted `ECO-20260420-main-375` to `READY`.

### ECO-20260420-critic-371

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-tundra-short-summer-rush-copy-implementation.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-main-371`

Completion note:

- Added `docs/reports/2026-04-20-tundra-short-summer-rush-copy-review.md` with a clean lane-2 review.
- Confirmed the refreshed `short-summer-rush` summary and prompt stay science-safe, budget-safe, resolver-covered, and kid-readable while preserving note metadata and resolver behavior.
- Verified the place-tab exact-copy updates follow the data-owned ecosystem-note prompt and that no packet-141 lane-2 runtime source change landed.
- Re-ran `npm test -- --run src/test/ecosystem-notes.test.ts src/test/content-quality.test.ts src/test/field-season-board.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "tundra survey place-tab question"`, `npm run validate:agents`, and `git diff --check`; validation still reports only the known queue-size warning.
- Noted unrelated dirty runtime files from other lane work, so this is not a safe lane-clear commit/push point.
- Promoted `ECO-20260420-scout-375` to `READY`.

### ECO-20260420-main-371

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-tundra-short-summer-rush-copy-handoff.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-scout-371`

Completion note:

- Refreshed the existing Tundra Reach `short-summer-rush` ecosystem-note summary and observation prompt around first blooms, birds, cloudberry fruit, and the short tundra summer.
- Added focused resolver coverage for the refreshed note while preserving note metadata, entry requirements, zone, and resolver behavior.
- Updated stale exact-copy expectations in `field-season-board` and focused `runtime-smoke` tests where `place-tab` correctly reuses the refreshed ecosystem-note prompt.
- Left `src/engine/field-requests.ts`, `tundra-short-season`, `Thaw Window` route/process behavior, support targeting, station/state/save behavior, world-map focus, Tundra geometry, ledger rows, close-look cards, sketchbook notes, comparison branches, new species, and runtime source code unchanged.
- Verified `npm test -- --run src/test/ecosystem-notes.test.ts src/test/content-quality.test.ts src/test/field-season-board.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "tundra survey place-tab question"`, `npm run build`, `npm run validate:agents`, and `git diff --check`; agent validation still reports only the known queue-size warning.
- Promoted `ECO-20260420-critic-371` to `READY`.

### ECO-20260420-scout-371

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-treeline-stone-shelter-copy-review.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-critic-367`

Completion note:

- Added `docs/reports/2026-04-20-tundra-short-summer-rush-copy-handoff.md` with a narrow lane-2 target for the Tundra thaw-window payoff pass.
- Recommended refreshing only the existing `short-summer-rush` ecosystem-note summary and prompt around first blooms, birds, cloudberry fruit, and the short tundra summer.
- Explicitly left `tundra-short-season`, `Thaw Window` route/process behavior, support targeting, station/state/save behavior, world-map focus, Tundra geometry, ledger rows, close-look cards, sketchbook notes, comparison branches, and new species out of scope.
- Updated packet `141` with exact copy, file targets, guardrails, and focused verification for the main-agent pass.
- Verified `npm run validate:agents`, packet JSON parse, and `git diff --check`; validation still reports only the known queue-size warning.
- Promoted `ECO-20260420-main-371` to `READY`.

### ECO-20260420-critic-367

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-treeline-stone-shelter-copy-implementation.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-main-367`

Completion note:

- Added `docs/reports/2026-04-20-treeline-stone-shelter-copy-review.md` with a clean lane-2 review.
- Confirmed the refreshed `stone-shelter` summary and prompt stay science-safe, budget-safe, resolver-covered, and kid-readable while preserving note metadata and unlock behavior.
- Verified no Route v2 behavior, station/state/save behavior, world-map focus, Treeline geometry, High Pass copy, science-ledger rows, close-look cards, new species, or comparison branches changed.
- Re-ran `npm test -- --run src/test/ecosystem-notes.test.ts src/test/content-quality.test.ts`, `npm run validate:agents`, and `git diff --check`; validation still reports only the known queue-size warning.
- Promoted `ECO-20260420-scout-371` to `READY`.

### ECO-20260420-main-367

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-treeline-stone-shelter-copy-handoff.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-scout-367`

Completion note:

- Refreshed the existing Treeline Pass `stone-shelter` ecosystem-note summary and observation prompt around bent krummholz, raised stone, wind break, and lee pockets animals can use.
- Added focused resolver coverage for the refreshed note while preserving note metadata, entry requirements, zone, and unlock behavior.
- Left Route v2 behavior, station/state/save behavior, world-map focus, Treeline geometry, High Pass copy, science-ledger rows, close-look cards, new species, and comparison branches unchanged.
- Verified `npm test -- --run src/test/ecosystem-notes.test.ts src/test/content-quality.test.ts`, `npm run build`, `npm run validate:agents`, and `git diff --check`; agent validation still reports only the known queue-size warning.
- Promoted `ECO-20260420-critic-367` to `READY`.

### ECO-20260420-scout-367

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-forest-root-shelter-copy-review.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-critic-363`

Completion note:

- Added `docs/reports/2026-04-20-treeline-stone-shelter-copy-handoff.md` with a narrow lane-2 target for the Treeline shelter/exposure pass.
- Recommended refreshing only the existing `stone-shelter` ecosystem-note summary and prompt around bent krummholz, raised stone, wind break, and lee pockets animals can use.
- Updated packet `140` with exact copy, file targets, guardrails, and focused verification for the main-agent pass.
- Promoted `ECO-20260420-main-367` to `READY`.

### ECO-20260420-critic-363

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-forest-root-shelter-copy-implementation.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-main-363`

Completion note:

- Added `docs/reports/2026-04-20-forest-root-shelter-copy-review.md` with a clean lane-2 review.
- Confirmed the refreshed `root-held-shelter` copy stays science-safe, kid-readable, and within budget while preserving note metadata, unlock behavior, and lane boundaries.
- Re-ran `npm test -- --run src/test/ecosystem-notes.test.ts src/test/content-quality.test.ts`, `npm run validate:agents`, and `git diff --check`; validation still reports only the known queue-size warning.
- Promoted `ECO-20260420-scout-367` to `READY`.

### ECO-20260420-main-363

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-forest-root-shelter-copy-handoff.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-scout-363`

Completion note:

- Refreshed the existing forest `root-held-shelter` ecosystem-note summary and observation prompt around root curtains catching drips and shade above the seep floor.
- Added focused resolver coverage for the refreshed note while preserving note metadata, entry requirements, zone, and unlock behavior.
- Left species, routes, science-ledger rows, close-look entries, station/state/save behavior, route-controller behavior, and forest geometry unchanged.
- Verified `npm test -- --run src/test/ecosystem-notes.test.ts src/test/content-quality.test.ts`, `npm run build`, `npm run validate:agents`, and `git diff --check`; agent validation still reports only the known queue-size warning.
- Promoted `ECO-20260420-critic-363` to `READY`.

### ECO-20260420-scout-363

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-front-half-tactile-copy-review.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-critic-359`

Completion note:

- Added `docs/reports/2026-04-20-forest-root-shelter-copy-handoff.md` with a narrow lane-2 target for the forest tactile identity pass.
- Recommended refreshing only the existing `root-held-shelter` ecosystem-note summary and prompt around root curtains catching drips and shade above the seep floor.
- Updated packet `139` with exact copy, file targets, guardrails, and focused verification for the main-agent pass.
- Promoted `ECO-20260420-main-363` to `READY`.

### ECO-20260420-critic-359

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-front-half-tactile-copy-implementation.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-main-359`

Completion note:

- Added `docs/reports/2026-04-20-front-half-tactile-copy-review.md` with a clean lane-2 review.
- Confirmed the refreshed `shelter-builds-here` copy stays inside budget, preserves stable note metadata and unlock behavior, and avoids route, station, geometry, save/schema, science-ledger, close-look, and journal/atlas drift.
- Re-ran the focused content/journal/content-quality tests plus the affected journal runtime-smoke copy assertion; broad runtime-smoke noise remains the unrelated world-map focus issue already recorded in the implementation report.
- Promoted `ECO-20260420-scout-363` to `READY`.

### ECO-20260420-main-359

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-front-half-tactile-copy-handoff.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-scout-359`

Completion note:

- Refreshed Coastal Scrub's existing `shelter-builds-here` ecosystem-note summary and observation prompt around grass, verbena, lupine, wind-slowed back-dune sand, and calmer life.
- Added focused resolver coverage plus updated exact journal-comparison and affected runtime-smoke copy expectations, while leaving route definitions, station state, geometry, save/schema behavior, science ledger, close-look allowlists, and journal/atlas surfaces unchanged.
- Verified the content/journal/content-quality tests, the affected journal runtime-smoke assertion, and `npm run build`; the broad runtime-smoke-inclusive command was attempted but still fails on unrelated world-map focus assertions.
- Promoted `ECO-20260420-critic-359` to `READY`.

### ECO-20260420-scout-359

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-critic-355`

Completion note:

- Scoped the lane-2 tactile identity pass to Coastal Scrub's existing `shelter-builds-here` ecosystem-note copy, preserving its id, title, entry links, zone, resolver behavior, journal comparison, and place-tab seam.
- Added `docs/reports/2026-04-20-front-half-tactile-copy-handoff.md`, updated packet `138` with the lane-2 scout refinement, and promoted `ECO-20260420-main-359` to `READY`.

### ECO-20260420-scout-345

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-station-homecoming-route-notice-handoff.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-critic-341`

Goal:

- Prepare the lane-4 contract for packet 134; details live in the packet.

Completed:

- Added `docs/reports/2026-04-20-station-homecoming-route-notice-handoff.md`.
- Scoped lane 4 to route filing/support notice lifecycle and stale `Today:` replay cleanup around the future station homecoming seam.
- Updated packet `134` with the lane-4 scout refinement.
- Kept `ECO-20260420-main-345` blocked until `ECO-20260420-critic-342` clears.
- `npm run validate:agents` passed with the existing queue-size warning.
- `git diff --check` passed.

### ECO-20260420-main-345

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-station-homecoming-route-notice-implementation.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-scout-345`, `ECO-20260420-critic-342`

Goal:

- Implement the lane-4 route-notice/homecoming handoff from packet `134` using lane 1's reviewed station-owned seam.

Completed:

- Added `shouldClearFieldNoticeForHomecoming(...)` and `shouldReplaceFieldNotice(...)` to keep earned homecoming opens from reviving stale non-filed notices.
- Wired station opens to clear stale non-filed notices only when lane 1's reviewed `arrivalMode: "homecoming"` seam is active.
- Kept filed-route notices canonical by preventing station support-selection copy from replacing a current `filed-route` notice during the same station interaction.
- Added focused notice-helper and runtime-smoke coverage for stale homecoming notice cleanup and filed High Pass support-toggle protection.
- Added `docs/reports/2026-04-20-station-homecoming-route-notice-implementation.md`.
- Verified focused tests and `npm run build` passed; promoted `ECO-20260420-critic-345` to `READY`.

### ECO-20260420-critic-345

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-station-homecoming-route-notice-review.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-main-345`

Goal:

- Review the lane-4 route-notice/homecoming handoff from packet `134` and confirm filed-route notices, stale non-filed notices, support-selection notices, and route replay state stay inside the packet guardrails.

Completed:

- Added `docs/reports/2026-04-20-station-homecoming-route-notice-review.md` with no blocker.
- Confirmed the pass consumes lane 1's reviewed homecoming seam, leaves lane 2 copy untouched, and avoids station layout, shell visuals, route definitions, save schema, geometry, broad onboarding copy, and science content changes.
- Re-ran the focused field-notice and runtime-smoke slices plus `npm run build`.
- Recorded one narrow residual risk for future stale filed-route notice handling.
- Promoted `ECO-20260420-scout-349` to `READY`.

### ECO-20260420-scout-353

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-support-choice-in-field-handoff.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-critic-349`

Goal:

- Prepare the lane-4 contract for packet 136; details live in the packet.

Completed:

- Added `docs/reports/2026-04-20-support-choice-in-field-handoff.md`.
- Scoped lane 4 to the existing in-field `NOTEBOOK J` chip rather than a new support HUD, inventory, loadout, station page, route framework, or geometry change.
- Identified hand-lens as already in-field via inspect retargeting and `LENS CLUE`, while `note-tabs` and `place-tab` need tiny chip cues to feel distinct during outings.
- Updated packet `136` with lane-4 scout guidance and promoted `ECO-20260420-main-353` to `READY`.
- Verified `npm test -- --run src/test/field-request-controller.test.ts` and `npm test -- --run src/test/field-season-board.test.ts -t "support|note-tabs|place-tab|hand lens|route marker"`.

### ECO-20260420-main-353

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-support-choice-in-field-implementation.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-scout-353`

Goal:

- Reuse the existing in-field `NOTEBOOK J` chip as a tiny support-specific cue seam so note-tabs and place-tab feel different during active Route v2 outings without adding a loadout model or changing inspect targeting.

Completed:

- Added `docs/reports/2026-04-20-support-choice-in-field-implementation.md`.
- Added the resolved support id to the field-request controller so existing chip rendering can branch without new support state, UI, loadout, route definitions, save schema, or station pages.
- Kept hand-lens inspect retargeting and `LENS CLUE` as hand-lens-only.
- Made active Route v2 `note-tabs` chips show route progress and `place-tab` chips show compact `Place Question` copy.
- Proved `route-marker` stays map/travel-facing with default chip behavior and no inspect retargeting.
- Verified `npm test -- --run src/test/field-request-controller.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "keeps non-hand-lens supports"`, and `npm run build`; promoted `ECO-20260420-critic-353` to `READY`.

### ECO-20260420-critic-353

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-support-choice-in-field-review.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-main-353`

Goal:

- Review the lane-4 contract for packet 136; details live in the packet.

Completed:

- Added `docs/reports/2026-04-20-support-choice-in-field-review.md` with no blocker.
- Confirmed hand lens remains the only inspect-retargeting support and still owns `LENS CLUE` inspect-bubble behavior.
- Confirmed `note-tabs` uses active route progress, `place-tab` uses compact `Place Question` chip copy, and `route-marker` remains map/travel-facing with default chip behavior.
- Re-ran the focused controller test, focused non-hand-lens runtime-smoke slice, and `npm run build`.
- Updated packet `136` with the lane-4 critic result and promoted `ECO-20260420-scout-357` to `READY`.

### ECO-20260420-scout-357

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-filed-arc-replay-intent-handoff.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-critic-353`

Goal:

- Prepare the lane-4 contract for packet 137; details live in the packet.

Completed:

- Added `docs/reports/2026-04-20-filed-arc-replay-intent-handoff.md`.
- Scoped lane 4 to a regression-tightening pass that makes filed High Pass replay intent explicit without adding a replay UI, route task, save field, station page, route definition, or copy rewrite.
- Identified optional revisit intent as already living on the filed expedition surface, while `replayNote`, route marker, world-map replay label, active request, active outing, and journal request should all stay inactive after filing.
- Updated packet `137` with lane-4 scout guidance and promoted `ECO-20260420-main-357` to `READY`.
- Verified baseline slices for field-season replay/filed state, field-request High Pass state, and filed High Pass save snapshots.

### ECO-20260420-main-357

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-filed-arc-replay-intent-implementation.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-scout-357`

Goal:

- Make the filed-arc replay contract explicit as a regression guard: optional revisit copy stays on the filed expedition surface, while route replay hooks remain inactive after High Pass is filed.

Completed:

- Added test-only regression assertions for filed `High Pass` route-board state: `complete`, no target biome, no notebook-ready return, and no replay note.
- Tightened field-request state coverage so filed `High Pass` with `route-marker` selected and Treeline focused still has no active request, outing, journal request, in-field hint, marker, or world-map replay label.
- Tightened filed save-snapshot coverage so optional revisit copy stays on the expedition surface without creating a task.
- Added `docs/reports/2026-04-20-filed-arc-replay-intent-implementation.md` and updated packet `137` with the lane-4 main result.
- Verified focused filed-arc tests, `npm run build`, `npm run validate:agents`, and `git diff --check`; promoted `ECO-20260420-critic-357` to `READY`.

### ECO-20260420-critic-357

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-filed-arc-replay-intent-review.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-main-357`

Goal:

- Review the lane-4 contract for packet 137; details live in the packet.

Completed:

- Added `docs/reports/2026-04-20-filed-arc-replay-intent-review.md` with no blocker.
- Confirmed the implementation stayed test-only and did not add player-facing copy, save schema, route definitions, station UI, support behavior, geometry, new route tasks, or a replay UI.
- Confirmed filed `High Pass` no longer has active request, outing, journal request, hint, route marker, notebook-ready return, replay note, or world-map replay label while the filed expedition optional revisit invitation remains intact.
- Re-ran focused filed-arc tests and `npm run build`; agent validation and diff check passed with only the known queue-size warning.
- Updated packet `137` with the lane-4 critic result and promoted `ECO-20260420-scout-361` to `READY`.

### ECO-20260420-scout-361

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-front-half-route-proof-handoff.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-critic-357`

Goal:

- Prepare the lane-4 contract for packet 138; details live in the packet.

Completed:

- Added `docs/reports/2026-04-20-front-half-route-proof-handoff.md`.
- Scoped lane 4 to a focused `Open To Shelter` route/support proof using existing hand-lens retargeting and note-tabs chip seams.
- Identified `sand-verbena` / `open-bloom` in the back-dune `shelter-builds-here` cluster as the best first front-half route-proof target.
- Kept route definitions, lane-2 copy, station UI, support order, save schema, world-map focus, route-marker behavior, geometry, science copy, and new UI/replay/loadout surfaces out of scope.
- Updated packet `138` with lane-4 scout guidance and promoted `ECO-20260420-main-361` to `READY`.
- Verified focused controller, field-request, and runtime-smoke baseline slices for front-half route/support behavior.

### ECO-20260420-main-361

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-front-half-route-proof-implementation.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-scout-361`

Goal:

- Add focused route/support proof for `Open To Shelter` so the front-half tactile route handoff shows how existing support/readiness seams change what the player notices without new route or UI behavior.

Completed:

- Added `docs/reports/2026-04-20-front-half-route-proof-implementation.md`.
- Added controller proof that `hand-lens` retargets active `Open To Shelter` back-dune inspection from a nearer non-fit `beach-pea` candidate to the farther `sand-verbena` `open-bloom` clue.
- Confirmed the retarget is ordinary notebook-fit behavior, not a process-backed active-clue alternate: `supportRetargetsInspect` true, `supportPrefersActiveClue` false, `Notebook fit: open bloom`, and no `LENS CLUE` label.
- Added paired `note-tabs` coverage showing non-hand-lens support leaves the physical nearest inspectable alone while the in-field chip stays progress-facing with `0/3 stages`.
- Left route definitions, filed-note text, lane-2 copy, station pages, support order, save schema, world-map focus, route-marker behavior, geometry, science copy, and new UI/replay/loadout/planner surfaces unchanged.
- Verified `npm test -- --run src/test/field-request-controller.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter"`, and `npm run build`; promoted `ECO-20260420-critic-361` to `READY`.

### ECO-20260420-critic-361

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-front-half-route-proof-review.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-main-361`

Goal:

- Review the lane-4 `Open To Shelter` route/support proof for packet 138; confirm it remains controller-level, behavior-neutral, and inside lane-4 support/readiness scope.

Completed:

- Added `docs/reports/2026-04-20-front-half-route-proof-review.md` with no blocker.
- Confirmed `hand-lens` retargets active `Open To Shelter` back-dune inspection to the farther `sand-verbena` clue while preserving ordinary notebook-fit behavior and avoiding `LENS CLUE`.
- Confirmed `note-tabs` stays non-retargeting while keeping the existing progress-facing chip behavior.
- Re-ran `npm test -- --run src/test/field-request-controller.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter"`, and `npm run build`.
- Marked packet `138` done and promoted `ECO-20260420-scout-365` to `READY`.

### ECO-20260420-scout-365

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-forest-route-process-support-handoff.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-critic-361`

Goal:

- Prepare the lane-4 contract for packet 139; details live in the packet.

Completed:

- Added `docs/reports/2026-04-20-forest-route-process-support-handoff.md`.
- Scoped lane 4 to a behavior-neutral proof/repair pass around the existing forest process-route support behavior.
- Identified `forest-cool-edge` / `Moist Edge` as the best controller-level target for proving ordinary hand-lens notebook-fit retargeting to `salmonberry` in `creek-bend`.
- Identified one stale `Moist Hollow` note-tabs runtime expectation that should now assert the progress-facing `0/3 clues` support chip.
- Kept route definitions, process-focus copy, filed-note text, lane-2 forest copy, station pages, support order, save schema, world-map focus, route-marker behavior, geometry, science copy, new UI, replay/loadout/planner surfaces, and quest shells out of scope.
- Updated packet `139` with lane-4 scout guidance and promoted `ECO-20260420-main-365` to `READY`.

### ECO-20260420-main-365

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-forest-route-process-support-implementation.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-scout-365`

Goal:

- Add a focused forest process-route support proof for `Moist Edge` and repair the stale `Moist Hollow` note-tabs runtime expectation, without changing runtime behavior.

Completed:

- Added `docs/reports/2026-04-20-forest-route-process-support-implementation.md`.
- Added controller proof that `hand-lens` retargets active `Moist Edge` creek-bend inspection from the nearer non-fit `fir-cone` candidate to the farther `salmonberry` `edge-carrier` clue.
- Confirmed the retarget is ordinary notebook-fit behavior, not a process-backed active-clue alternate: `supportRetargetsInspect` true, `supportPrefersActiveClue` false, `Notebook fit: edge carrier`, and no `LENS CLUE` label.
- Added paired `note-tabs` coverage showing non-hand-lens support leaves the physical nearest inspectable alone while the in-field chip stays progress-facing with `0/3 clues`.
- Refreshed the existing `Moist Hollow` runtime-smoke note-tabs chip expectation from stale `Moist Hollow` / default to `0/3 clues` / `support-biased`.
- Left route definitions, process-focus copy, filed-note text, lane-2 forest copy, station pages, support order, save schema, world-map focus, route-marker behavior, geometry, science copy, and new UI/replay/loadout/planner surfaces unchanged.
- Verified `npm test -- --run src/test/field-request-controller.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "Moist Hollow|Moisture Holders"`, `npm test -- --run src/test/field-requests.test.ts -t "Moist Edge|Moist Hollow|forest-cool-edge|forest-moisture-holders"`, and `npm run build`.
- Updated packet `139` with the lane-4 main result and promoted `ECO-20260420-critic-365` to `READY`.

### ECO-20260420-critic-365

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-forest-route-process-support-review.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-main-365`

Goal:

- Review the lane-4 `Moist Edge` support proof and `Moist Hollow` runtime expectation repair for packet 139.

Completed:

- Added `docs/reports/2026-04-20-forest-route-process-support-review.md` with no blocker.
- Confirmed the implementation stayed behavior-neutral and test/report scoped.
- Confirmed `hand-lens` retargets `Moist Edge` creek-bend inspection from nearer non-fit `fir-cone` to farther `salmonberry` while staying ordinary notebook-fit behavior, not an active-clue alternate.
- Confirmed paired `note-tabs` coverage preserves physical nearest-inspect behavior and the progress-facing `0/3 clues` chip.
- Confirmed the `Moist Hollow` runtime-smoke expectation now matches current note-tabs chip behavior.
- Re-ran `npm test -- --run src/test/field-request-controller.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "Moist Hollow|Moisture Holders"`, `npm test -- --run src/test/field-requests.test.ts -t "Moist Edge|Moist Hollow|forest-cool-edge|forest-moisture-holders"`, and `npm run build`.
- Marked packet `139` done and promoted `ECO-20260420-scout-369` to `READY`.

### ECO-20260420-scout-369

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-treeline-route-support-handoff.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-critic-365`

Goal:

- Prepare the lane-4 contract for packet 140.

Completed:

- Added `docs/reports/2026-04-20-treeline-route-support-handoff.md`.
- Narrowed packet `140` lane 4 to a behavior-neutral controller proof for existing `Brief Bloom` support targeting on `treeline-low-fell`.
- Recommended pairing `hand-lens` retargeting from nearer `mountain-avens` to farther active `moss-campion` against `note-tabs` nearest-inspect behavior.
- Kept route definitions, world-state focus copy, filed-note copy, station pages, support order, save schema, world-map focus, route-marker behavior, Treeline geometry, High Pass copy, science copy, and new UI/replay/loadout/planner surfaces out of scope.
- Verified baseline slices: `npm test -- --run src/test/field-request-controller.test.ts -t "Brief Bloom|Rimed Pass|High Pass|non-hand-lens"`, `npm test -- --run src/test/field-requests.test.ts -t "Brief Bloom|treeline-low-fell|Low Fell"`, and `npm test -- --run src/test/runtime-smoke.test.ts -t "Brief Bloom|Low Fell|place-tab"`.
- Updated packet `140` with lane-4 scout guidance and promoted `ECO-20260420-main-369` to `READY`.

### ECO-20260420-main-369

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-treeline-route-support-implementation.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-scout-369`

Goal:

- Add the lane-4 `Brief Bloom` controller proof described in the handoff and packet, keeping this pass behavior-neutral and below High Pass.

Completed:

- Added `docs/reports/2026-04-20-treeline-route-support-implementation.md`.
- Added controller proof that active `Brief Bloom` at `treeline-low-fell` retargets `hand-lens` inspection from nearer `mountain-avens` to farther `moss-campion`.
- Confirmed `mountain-avens` stays ordinary `Notebook fit: fell bloom`, while `moss-campion` receives `LENS CLUE: fell bloom` only for the active hand-lens winner.
- Added paired `note-tabs` coverage showing non-hand-lens support keeps nearest-inspect behavior on `mountain-avens`, does not prefer the active clue, and keeps the chip progress-facing with `2/4 clues`.
- Left route definitions, world-state focus copy, filed-note copy, support order, save schema, station pages, world-map focus, route-marker behavior, Treeline geometry, High Pass copy, science copy, and new UI/replay/loadout/planner surfaces unchanged.
- Verified `npm test -- --run src/test/field-request-controller.test.ts`, `npm test -- --run src/test/field-requests.test.ts -t "Brief Bloom|treeline-low-fell|Low Fell"`, and `npm run build`.
- Updated packet `140` with the lane-4 main result and promoted `ECO-20260420-critic-369` to `READY`.

### ECO-20260420-critic-369

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-treeline-route-support-review.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-main-369`

Goal:

- Review the lane-4 `Brief Bloom` controller proof for packet 140 and decide whether to close the lane-4 step or queue a narrow follow-up.

Completed:

- Added `docs/reports/2026-04-20-treeline-route-support-review.md` with no blocker.
- Confirmed the implementation stayed behavior-neutral and test/report scoped.
- Confirmed `hand-lens` active `Brief Bloom` retargets from nearer ordinary `mountain-avens` to farther active `moss-campion`.
- Confirmed the inspect-bubble cue remains distinct: `Notebook fit: fell bloom` for `mountain-avens` and `LENS CLUE: fell bloom` for the active `moss-campion` winner.
- Confirmed paired `note-tabs` coverage preserves physical nearest-inspect behavior and the progress-facing `2/4 clues` chip.
- Re-ran `npm test -- --run src/test/field-request-controller.test.ts`, `npm test -- --run src/test/field-requests.test.ts -t "Brief Bloom|treeline-low-fell|Low Fell"`, `npm test -- --run src/test/runtime-smoke.test.ts -t "Brief Bloom|Low Fell|place-tab"`, and `npm run build`.
- Updated packet `140` with the lane-4 critic result and promoted `ECO-20260420-scout-373` to `READY`.

### ECO-20260420-scout-373

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-tundra-thaw-window-payoff-handoff.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-critic-369`

Goal:

- Prepare the lane-4 contract for packet 141.

Completed:

- Added `docs/reports/2026-04-20-tundra-thaw-window-payoff-handoff.md`.
- Narrowed packet `141` lane 4 to a behavior-neutral station/notebook payoff proof for active `Thaw Window` evidence.
- Recommended adding `field-season-board` coverage that a `note-tabs` ready `Short Season` preview carries active-window carrier names: `Woolly Lousewort`, `Bigelow's Sedge`, and `Cloudberry`.
- Kept route definitions, slot order, `processFocus`, display prefix, filed-note behavior, support targeting, station layout, save schema, world-map focus, Tundra geometry, High Pass copy, science copy, runtime source, new routes, and new support surfaces out of scope.
- Verified baseline slices: `npm test -- --run src/test/field-season-board.test.ts -t "thaw-window|Short Season|note-tabs preview"`, `npm test -- --run src/test/field-requests.test.ts -t "Thaw Window|tundra-short-season|Short Season"`, and `npm test -- --run src/test/runtime-smoke.test.ts -t "Thaw Window|thaw-window|tundra survey place-tab"`.
- Updated packet `141` with lane-4 scout guidance and promoted `ECO-20260420-main-373` to `READY`.

### ECO-20260420-main-373

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-tundra-thaw-window-payoff-implementation.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-scout-373`

Goal:

- Add the lane-4 active-carrier `Thaw Window` note-tabs preview proof described in the handoff and packet, keeping this pass behavior-neutral.

Completed:

- Added a behavior-neutral `field-season-board` test proving a `note-tabs` ready `Short Season` preview can carry active `Thaw Window` evidence from `Woolly Lousewort`, `Bigelow's Sedge`, and `Cloudberry`.
- Confirmed `routeBoard.notebookReady.previewLabel` remains `SHORT SEASON`.
- Confirmed `resolveFieldSeasonWrapState(...)` with `note-tabs` returns the same active-carrier preview text.
- Kept route definitions, slot order, `processFocus`, display prefix, filed-note behavior, support targeting, station layout, save schema, world-map focus, Tundra geometry, High Pass copy, science copy, runtime source, new routes, and new support surfaces unchanged.
- Added `docs/reports/2026-04-20-tundra-thaw-window-payoff-implementation.md`.
- Verified `npm test -- --run src/test/field-season-board.test.ts -t "thaw-window|Short Season|note-tabs preview"`, `npm test -- --run src/test/field-requests.test.ts -t "Thaw Window|tundra-short-season|Short Season"`, and `npm run build`.
- Updated packet `141` with the lane-4 main result and promoted `ECO-20260420-critic-373` to `READY`.

### ECO-20260420-critic-373

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-tundra-thaw-window-payoff-review.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-main-373`

Goal:

- Review the lane-4 active-carrier `Thaw Window` note-tabs preview proof and decide whether packet `141` lane 4 is clean or needs a narrow follow-up.

Completed:

- Added `docs/reports/2026-04-20-tundra-thaw-window-payoff-review.md` with no blocker.
- Confirmed the proof covers `routeBoard.notebookReady.previewLabel` as `SHORT SEASON`.
- Confirmed the board preview and `note-tabs` wrap carry `Thaw Window. Woolly Lousewort, Bigelow's Sedge, and Cloudberry trace the tundra's short thaw window.`
- Confirmed the pass stayed behavior-neutral and did not touch route definitions, slot order, `processFocus`, display prefix, filed-note behavior, support targeting, station layout, save schema, world-map focus, Tundra geometry, High Pass copy, science copy, runtime source, new routes, or new support surfaces.
- Re-ran `npm test -- --run src/test/field-season-board.test.ts -t "thaw-window|Short Season|note-tabs preview"`, `npm test -- --run src/test/field-requests.test.ts -t "Thaw Window|tundra-short-season|Short Season"`, and `npm run build`.
- Updated packet `141` with the lane-4 critic result and promoted `ECO-20260420-scout-377` to `READY`.

### ECO-20260420-scout-377

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-treeline-tundra-corridor-route-handoff.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-critic-373`

Goal:

- Prepare the lane-4 contract for packet 142.

Completed:

- Added `docs/reports/2026-04-20-treeline-tundra-corridor-route-handoff.md`.
- Narrowed packet `142` lane 4 to adding `reindeer-lichen` as an optional `low-rest` clue on the existing `treeline-low-fell` route.
- Recommended field-request coverage for completing `low-rest` from `reindeer-lichen` while the route context is treeline / `lichen-fell` and the observed entity zone is a corridor blend zone.
- Recommended controller coverage proving `hand-lens` can retarget to corridor `reindeer-lichen` as ordinary `Notebook fit: low rest`, while `note-tabs` stays on nearest-inspect and progress-chip behavior.
- Kept new routes, route types, station pages, support types, planner layers, prompt seeds, corridor state/geometry, save schema, world-map nodes, map-marker behavior, High Pass behavior, Tundra route behavior, and lane-2 prompt copy out of scope.
- Verified baseline slices: `npm test -- --run src/test/field-requests.test.ts -t "Low Fell|treeline-low-fell|reindeer-lichen"` and `npm test -- --run src/test/field-request-controller.test.ts -t "Low Fell|Brief Bloom|reindeer-lichen|target-selection"`.
- Updated packet `142` with lane-4 scout guidance and promoted `ECO-20260420-main-377` to `READY`.

### ECO-20260420-main-377

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-treeline-tundra-corridor-route-implementation.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-scout-377`

Goal:

- Let the existing `Low Fell` route recognize the treeline-to-tundra corridor cue as optional evidence without adding a new route framework.

Completed:

- Added `reindeer-lichen` as an optional `low-rest` clue for `treeline-low-fell` while preserving ordered `last-tree-shape -> low-wood -> fell-bloom -> low-rest` progression.
- Added field-request coverage proving a `3/4 clues` Low Fell route can complete from `reindeer-lichen` when the route context is treeline / `lichen-fell` and the observed entity zone is `center-blend`.
- Added controller coverage proving `hand-lens` can retarget to corridor `reindeer-lichen` as ordinary `Notebook fit: low rest`, while `note-tabs` stays on physical nearest inspectable and the `3/4 clues` chip.
- Preserved new-route, route-type, station-page, support-type, planner-layer, prompt-seed, corridor-state, corridor-geometry, save-schema, world-map-node, map-marker, High Pass, Tundra route, and lane-2 prompt behavior.
- Verified `npm test -- --run src/test/field-requests.test.ts -t "Low Fell|treeline-low-fell|reindeer-lichen"`, `npm test -- --run src/test/field-request-controller.test.ts -t "Low Fell|Brief Bloom|reindeer-lichen|target-selection"`, and `npm run build`.
- Updated packet `142` with the lane-4 main result and promoted `ECO-20260420-critic-377` to `READY`.

### ECO-20260420-critic-377

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-treeline-tundra-corridor-route-review.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-main-377`

Goal:

- Review the lane-4 corridor route proof and decide whether packet `142` lane 4 is clean or needs a narrow follow-up.

Completed:

- Added `docs/reports/2026-04-20-treeline-tundra-corridor-route-review.md` with no blocker.
- Confirmed `reindeer-lichen` is ordinary `low-rest` evidence on `treeline-low-fell`, while `Brief Bloom` active `moss-campion` behavior remains unchanged.
- Confirmed `hand-lens` retargets to corridor `reindeer-lichen` as `Notebook fit: low rest`, not `LENS CLUE`, and `note-tabs` stays physical-nearest with the `3/4 clues` chip.
- Confirmed no route framework, corridor state/geometry, support surface, station page, save schema, world-map, High Pass, Tundra route, or lane-2 prompt drift.
- Re-ran `npm test -- --run src/test/field-requests.test.ts -t "Low Fell|treeline-low-fell|reindeer-lichen"`, `npm test -- --run src/test/field-request-controller.test.ts -t "Low Fell|Brief Bloom|reindeer-lichen|target-selection"`, and `npm run build`.
- Updated packet `142` with the lane-4 critic result and promoted `ECO-20260420-scout-381` to `READY`.

### ECO-20260420-scout-381

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-map-station-travel-route-marker-handoff.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-critic-377`

Goal:

- Prepare the lane-4 contract for packet `143`.

Completed:

- Added `docs/reports/2026-04-20-map-station-travel-route-marker-handoff.md`.
- Narrowed packet `143` lane 4 to the route-marker/replay state seam in `src/engine/field-request-state.ts` plus focused `src/test/field-requests.test.ts` coverage.
- Identified the ready-to-file seam as the main risk: notebook-ready Route v2 requests should keep `activeFieldRequest` and `journalFieldRequest` while suppressing `activeOuting`, `routeMarkerLocationId`, and world-map `routeReplayLabel`.
- Preserved station pages, world-map UI/copy, route definitions, route titles, filed-note copy, support cycling, save schema, corridor state/geometry, prompt seeds, new support surfaces, and map/route copy.
- Verified baseline slices: `npm test -- --run src/test/field-requests.test.ts -t "High Pass|route-marker|season outing locator|filed"`, `npm test -- --run src/test/field-request-controller.test.ts -t "route-marker|High Pass"`, and `npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|route-marker"`.
- Updated packet `143` with lane-4 scout guidance and promoted `ECO-20260420-main-381` to `READY`.

### ECO-20260420-main-381

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-map-station-travel-route-marker-implementation.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-scout-381`

Goal:

- Implement the lane-4 route-marker/replay contract for packet `143`.

Completed:

- Added a ready-to-file guard in `src/engine/field-request-state.ts` so active Route v2 requests with `routeV2.status === 'ready-to-synthesize'` keep notebook/journal filing state but do not synthesize an active outing.
- Because ready-to-file requests no longer emit `activeOuting`, the world-map route marker and replay label stay suppressed during the station filing step.
- Added focused `src/test/field-requests.test.ts` coverage for active High Pass route-marker state, ready-to-file suppression, season-close replay locator behavior, and filed High Pass route-marker suppression.
- Preserved station pages, world-map UI/copy, route definitions, route titles, filed-note copy, support cycling, save schema, corridor state/geometry, prompt seeds, new support surfaces, and map/route copy.
- Verified `npm test -- --run src/test/field-requests.test.ts -t "High Pass|route-marker|ready-to-file|filed|season outing locator"`, `npm test -- --run src/test/field-request-controller.test.ts -t "route-marker|High Pass"`, `npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|route-marker"`, and `npm run build`.
- Updated packet `143` with the lane-4 main result and promoted `ECO-20260420-critic-381` to `READY`.

### ECO-20260420-critic-381

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-map-station-travel-route-marker-review.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-main-381`

Goal:

- Review the lane-4 route-marker/replay implementation for packet `143`.

Completed:

- Added `docs/reports/2026-04-20-map-station-travel-route-marker-review.md` with no blocker.
- Confirmed ready-to-file Route v2 requests keep `activeFieldRequest` and `journalFieldRequest` while suppressing `activeOuting`, `routeMarkerLocationId`, and world-map `routeReplayLabel`.
- Confirmed active High Pass route-marker behavior, season-close replay locator behavior, and filed High Pass route-marker suppression remain covered and intact.
- Confirmed no station-page, world-map UI/copy, route-definition, route-title, filed-note, support-cycling, save-schema, corridor, prompt, or new-support-surface drift.
- Re-ran `npm test -- --run src/test/field-requests.test.ts -t "High Pass|route-marker|ready-to-file|filed|season outing locator"`, `npm test -- --run src/test/field-request-controller.test.ts -t "route-marker|High Pass"`, `npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|route-marker"`, and `npm run build`.
- Updated packet `143` with the lane-4 critic result and promoted `ECO-20260420-scout-385` to `READY`.

### ECO-20260420-critic-349

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-nursery-route-support-hint-review.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-main-349`

Goal:

- Review the lane-4 nursery route-support hint implementation and decide whether packet `136` lane-4 scout work can open.

Completed:

- Added `docs/reports/2026-04-20-nursery-route-support-hint-review.md` with no blocker.
- Confirmed route-support hint selection is active-beat-specific for coastal, treeline, and edge routes.
- Confirmed tests cover coastal switching, treeline no-early-avens, no-substitution, edge mapping, nursery page priority, and the no-active-beat salmonberry capstone fallback.
- Re-ran focused nursery tests, station nursery-page tests, `npm run build`, `npm run validate:agents`, and `git diff --check`.
- Promoted `ECO-20260420-scout-353` to `READY`.

### ECO-20260420-main-349

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-nursery-route-support-hint-implementation.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-scout-349`

Goal:

- Implement the lane-4 nursery route-support hint handoff from packet `135` so support clues resolve from the active route beat instead of the first claimed support for the whole route.

Completed:

- Added a beat-specific route-support resolver in `src/engine/nursery.ts` for coastal, treeline, and edge route beats.
- Updated `src/test/nursery.test.ts` to prove coastal switching, edge mapping, treeline no-early-avens, and no-substitution when the active beat's reward is missing.
- Preserved the no-active-beat salmonberry capstone fallback, mature teaching-bed priority, nursery layout, station pages, save schema, route definitions, route filing behavior, world geometry, and science content.
- Added `docs/reports/2026-04-20-nursery-route-support-hint-implementation.md` and promoted `ECO-20260420-critic-349` to `READY`.
- Verified `npm test -- --run src/test/nursery.test.ts`, `npm test -- --run src/test/field-station-nursery-page.test.ts`, and `npm run build`.

### ECO-20260420-scout-349

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-nursery-route-support-hint-handoff.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-critic-345`

Goal:

- Prepare the lane-4 contract for packet 135; details live in the packet.

Completed:

- Added `docs/reports/2026-04-20-nursery-route-support-hint-handoff.md`.
- Scoped lane 4 to beat-specific nursery route-support hint selection in `src/engine/nursery.ts` and focused nursery tests.
- Identified that `edge-pattern-line` already has active-beat hint selection, while `coastal-shelter-line` and `treeline-shelter-line` still risk flattening to the first claimed route support.
- Updated packet `135` with the lane-4 scout refinement and no-substitution acceptance.
- Verified `npm test -- --run src/test/nursery.test.ts` and `npm test -- --run src/test/field-station-nursery-page.test.ts`; promoted `ECO-20260420-main-349` to `READY`.

### ECO-20260420-critic-343

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-station-homecoming-copy-review.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-main-343`

Goal:

- Review the lane-2 homecoming copy helper and confirm it stays copy-only, compact, and safe for later station seam consumption.

Completed:

- Added `docs/reports/2026-04-20-station-homecoming-copy-review.md` with no blocker.
- Confirmed the helper stays copy-only and unwired until lane 1 provides the station seam.
- Rechecked focused homecoming-copy tests and `npm run build`.
- Promoted `ECO-20260420-scout-347` to `READY`.

### ECO-20260420-scout-347

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-nursery-memory-line-handoff.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-critic-343`

Goal:

- Prepare the lane-2 contract for packet 135 by narrowing the nursery memory pass to one science-backed teaching-bed line.

Completed:

- Added `docs/reports/2026-04-20-nursery-memory-line-handoff.md`.
- Scoped `ECO-20260420-main-347` to one `salmonberry-bed.memorySummary` refresh plus focused nursery test updates.
- Updated packet `135` with the lane-2 scout refinement and shared-file guardrail.
- Promoted `ECO-20260420-main-347` to `READY`.

### ECO-20260420-main-347

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-nursery-memory-line-implementation.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-scout-347`

Goal:

- Implement the lane-2 nursery memory contract for packet 135 by refreshing only the `salmonberry-bed` mature habitat-memory line and its focused test expectation.

Completed:

- Updated `salmonberry-bed.memorySummary` to `Cool forest edge where salmonberry thickets hold shade.`
- Updated the focused mature-bed nursery test to lock the new line and confirm `forest edge`, `salmonberry`, and `shade` remain present.
- Added `docs/reports/2026-04-20-nursery-memory-line-implementation.md`.
- Promoted `ECO-20260420-critic-347` to `READY`.

### ECO-20260420-critic-347

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-nursery-memory-line-review.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-main-347`

Goal:

- Review the lane-2 salmonberry teaching-bed memory refresh and confirm it stays copy-only, source-safe, and within packet `135` guardrails.

Completed:

- Added `docs/reports/2026-04-20-nursery-memory-line-review.md` with no blocker.
- Confirmed the update stays to one memory line plus focused test anchors.
- Confirmed source support, copy budget, and unchanged route-support behavior.
- Promoted `ECO-20260420-scout-351` to `READY`.

### ECO-20260420-scout-351

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-support-choice-copy-handoff.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-critic-347`

Goal:

- Prepare the lane-2 contract for packet 136 by narrowing support-choice differentiation to compact kid-facing notice copy.

Completed:

- Added `docs/reports/2026-04-20-support-choice-copy-handoff.md`.
- Confirmed existing station support labels are already five words or fewer.
- Scoped `ECO-20260420-main-351` to the pure support notice-copy helper and focused tests only.
- Updated packet `136` with the lane-2 scout refinement and shared-file guardrail.
- Promoted `ECO-20260420-main-351` to `READY`.

### ECO-20260420-main-351

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-support-choice-copy-implementation.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-scout-351`

Goal:

- Implement the lane-2 support-choice copy contract for packet 136 by shortening only the four support-toggle notice lines and adding a focused five-word budget test.

Completed:

- Shortened the four support-toggle notices to five words or fewer.
- Updated `src/test/field-request-controller.test.ts` to lock exact copy and word-count budget.
- Added `docs/reports/2026-04-20-support-choice-copy-implementation.md`.
- Promoted `ECO-20260420-critic-351` to `READY`.

### ECO-20260420-critic-351

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-support-choice-copy-review.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-main-351`

Goal:

- Review the lane-2 support notice-copy refresh and confirm it stays copy-only, five-word-budgeted, and inside packet `136` guardrails.

Completed:

- Added `docs/reports/2026-04-20-support-choice-copy-review.md` with no blocking findings.
- Confirmed all four support notices are exact-copy tested and five words or fewer.
- Confirmed the pass stayed copy-only and did not alter support selection, route targeting, save behavior, station layout, world-map behavior, renderer geometry, route definitions, or new UI surfaces.
- Promoted `ECO-20260420-scout-355` to `READY`.

### ECO-20260420-scout-355

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-filed-arc-epilogue-copy-handoff.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-critic-351`

Goal:

- Prepare the lane-2 contract for packet 137; details live in the packet.

Completed:

- Added `docs/reports/2026-04-20-filed-arc-epilogue-copy-handoff.md`.
- Scoped lane 2 to one copy-only `treeline-high-pass` homecoming line in the existing station homecoming copy seam.
- Recommended `High Pass filed. Revisit how stone, shelter, and talus connect.` as the compact filed-arc epilogue/revisit line.
- Updated packet `137` with the lane-2 scout refinement.
- Promoted `ECO-20260420-main-355` to `READY`.

### ECO-20260420-main-355

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-filed-arc-epilogue-copy-implementation.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-scout-355`

Goal:

- Update the `treeline-high-pass` station homecoming line to one compact filed-arc epilogue sentence family that celebrates the route relationship and treats replay as optional.

Completed:

- Updated only the `treeline-high-pass` homecoming line to `High Pass filed. Revisit how stone, shelter, and talus connect.`
- Updated `src/test/field-station-homecoming-copy.test.ts` so the chronological milestone case locks the exact line.
- Added `docs/reports/2026-04-20-filed-arc-epilogue-copy-implementation.md`.
- Promoted `ECO-20260420-critic-355` to `READY`.

### ECO-20260420-critic-355

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-filed-arc-epilogue-copy-review.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-main-355`

Goal:

- Review the lane-2 filed-arc epilogue copy change and confirm it stays to one homecoming line, preserves copy budgets, and avoids replay/state/layout drift.

Completed:

- Added `docs/reports/2026-04-20-filed-arc-epilogue-copy-review.md` with no blocking findings.
- Confirmed the new High Pass homecoming line is exact-copy tested and 63 characters against the existing 76-character budget.
- Confirmed the pass did not alter station state, route replay behavior, save schema, route definitions, map behavior, geometry, journal layout, atlas layout, or new UI surfaces.
- Promoted `ECO-20260420-scout-359` to `READY`.

### ECO-20260420-main-343

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-station-homecoming-copy-implementation.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-scout-343`

Goal:

- Add the lane-2 copy-only homecoming line family from packet `134` so later station/homecoming work can acknowledge filed progress without repeating route notes or adding a new panel.

Completed:

- Added `src/engine/field-station-homecoming-copy.ts` as a copy-only filed-progress homecoming resolver/data bank.
- Added `src/test/field-station-homecoming-copy.test.ts` for fallback, strongest-milestone selection, copy budgets, and clue-list avoidance.
- Added `docs/reports/2026-04-20-station-homecoming-copy-implementation.md`.
- Verified focused tests and `npm run build` passed.
- Promoted `ECO-20260420-critic-343` to `READY`.

### ECO-20260420-scout-342

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-station-homecoming-lane-1-handoff.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-critic-338`

Goal:

- Prepare the lane-1 contract for packet `134`; details live in the packet.

Completed:

- Added `docs/reports/2026-04-20-station-homecoming-lane-1-handoff.md`.
- Identified the missing station-owned seam between transient `arrivalMode: "homecoming"` and the reviewed lane-2 `WELCOME BACK` copy helper.
- Updated packet `134` with the lane-1 homecoming state seam target.
- Promoted `ECO-20260420-main-342` to `READY`.

### ECO-20260420-main-342

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-station-homecoming-lane-1-implementation.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-scout-342`

Goal:

- Add the smallest station-owned homecoming state seam, consume the reviewed lane-2 `WELCOME BACK` copy helper conditionally, and expose one non-sill seam key for later lane-3 visual accent work.

Completed:

- Added `resolveFieldStationHomecomingState(...)` and `fieldStation.homecoming`, conditional on `arrivalMode === "homecoming"` plus a filed-progress copy milestone.
- Exposed `homecomingMilestoneRequestId` / `hasHomecomingMemory` as a non-drawing station-shell seam for later lane-3 accent work.
- Rendered the reviewed `WELCOME BACK` line only as a transient compact station header-line during earned homecoming opens.
- Added focused station, overlay-copy, and runtime-smoke coverage proving earned open state and calm reopen clearing.
- Added `docs/reports/2026-04-20-station-homecoming-lane-1-implementation.md`.
- Verified focused tests and `npm run build` passed; promoted `ECO-20260420-critic-342` to `READY`.

### ECO-20260420-critic-342

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-station-homecoming-lane-1-review.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-main-342`

Goal:

- Review the lane-1 station-owned homecoming seam and confirm packet `134` can safely unblock the lane-3 visual accent and lane-4 notice handoff steps.

Completed:

- Added `docs/reports/2026-04-20-station-homecoming-lane-1-review.md` with no blocker.
- Confirmed `fieldStation.homecoming` is station-owned, gated by earned `arrivalMode`, and clears on calm reopen.
- Confirmed lane 3 gets a non-drawing `homecomingMilestoneRequestId` / `hasHomecomingMemory` seam and lane 4 can consume `fieldStation.homecoming` without creating route-owned station state.
- Recorded one watch item for future return-reason specificity if nursery/ledger sync needs to be distinguished from route-filed returns.
- Promoted `ECO-20260420-main-344`, `ECO-20260420-main-345`, and `ECO-20260420-scout-346` to `READY`.

### ECO-20260420-scout-346

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-nursery-page-memory-priority-handoff.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-critic-342`

Goal:

- Prepare the lane-1 contract for packet 135; details live in the packet.

Completed:

- Added `docs/reports/2026-04-20-nursery-page-memory-priority-handoff.md`.
- Found the live nursery-page seam test still expects the old salmonberry mature footer after lane 2's reviewed memory-line change.
- Scoped `ECO-20260420-main-346` to a test-first correction plus one mature-bed priority regression, with no runtime code changes unless a real helper bug appears.
- Promoted `ECO-20260420-main-346` to `READY`.

### ECO-20260420-main-346

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-nursery-page-memory-priority-implementation.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-scout-346`

Goal:

- Keep lane 1 test-first: update the live nursery-page seam test for lane 2's reviewed salmonberry memory line and add one mature-bed priority regression so habitat memory cannot overlap repeated route hints.

Completed:

- Updated the mature salmonberry live-page footer expectation to `Cool forest edge where salmonberry thickets hold shade.`
- Added a mature-bed priority regression proving an available `forest-cool-edge` route-support hint stays suppressed when another nursery card is selected.
- Kept the pass test-only with no runtime, save/schema, route-support behavior, nursery layout, station card/page, geometry, or copy-bank changes.
- Added `docs/reports/2026-04-20-nursery-page-memory-priority-implementation.md`.
- Verified `npm test -- --run src/test/field-station-nursery-page.test.ts`.
- Promoted `ECO-20260420-critic-346` to `READY`.

### ECO-20260420-critic-346

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-nursery-page-memory-priority-review.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-main-346`

Goal:

- Review the lane-1 test-only nursery memory-priority pass and confirm it keeps mature teaching-bed memory ahead of route-support hints without runtime, layout, save, or copy-bank drift.

Completed:

- Added `docs/reports/2026-04-20-nursery-page-memory-priority-review.md` with no blocker.
- Confirmed the mature salmonberry footer expectation uses `Cool forest edge where salmonberry thickets hold shade.`
- Confirmed the new test proves an available `forest-cool-edge` route-support hint is suppressed for mature teaching-bed memory when another nursery card is selected.
- Confirmed the pass made no runtime, save/schema, route-support behavior, nursery layout, station card/page, geometry, or copy-bank changes.
- Rechecked `npm test -- --run src/test/field-station-nursery-page.test.ts`.
- Promoted `ECO-20260420-scout-350` to `READY`.

### ECO-20260420-scout-350

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-support-choice-station-echo-handoff.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-critic-346`

Goal:

- Prepare the lane-1 contract for packet 136; details live in the packet.

Completed:

- Added `docs/reports/2026-04-20-support-choice-station-echo-handoff.md`.
- Confirmed save normalization, support cycling, persistence, route-marker map behavior, and support-specific wraps already exist.
- Found the remaining lane-1 gap: the station support label mapping is private to the routes renderer, so exact station echo is not debug/testable.
- Found stale support-row runtime-smoke expectations caused by the newer guided world-map focus rule opening on the active outing target instead of the old current-location fallback.
- Scoped `ECO-20260420-main-350` to a tiny station-label/debug seam plus focused runtime-smoke expectation refresh, with no support behavior or save/schema change.
- Promoted `ECO-20260420-main-350` to `READY`.

### ECO-20260420-main-350

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-support-choice-station-echo-implementation.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-scout-350`

Goal:

- Add one tiny shared station-label seam for outing support, expose the exact support label through field-station debug state, and update stale support-row runtime expectations to the current guided world-map focus rule.

Completed:

- Added `getOutingSupportStationLabel(...)` for the exact station labels and reused it in the visible routes-page support row.
- Exposed `fieldStation.selectedOutingSupportLabel` through `render_game_to_text()` beside the normalized support id.
- Added focused station-state coverage for locked `route-marker -> hand-lens / HAND LENS`, purchased `route-marker / ROUTE MARKER`, and earned `place-tab / PLACE TAB`.
- Updated focused support-row runtime-smoke expectations to the guided active-target world-map focus rule.
- Added `docs/reports/2026-04-20-support-choice-station-echo-implementation.md`.
- Verified focused save/station tests, the focused support-row runtime-smoke slice, `npm run build`, `npm run validate:agents`, `git diff --check`, packet JSON parsing, and a clean `web_game_playwright_client` smoke in `output/web-game/support-choice-station-echo-main-350/`.
- Promoted `ECO-20260420-critic-350` to `READY`.

### ECO-20260420-critic-350

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-support-choice-station-echo-review.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-main-350`

Goal:

- Review the lane-1 support-choice station echo seam and confirm the shared label/debug mapping, locked-support fallback, route-marker activation, and guided active-target world-map focus expectations landed without support behavior, save/schema, layout, route, geometry, or science-copy drift.

Completed:

- Added `docs/reports/2026-04-20-support-choice-station-echo-review.md` with no blocker.
- Confirmed the visible routes-page support row and debug field-station state share one exact label helper.
- Confirmed locked `route-marker` saves echo `hand-lens` / `HAND LENS`, route-marker activation echoes `route-marker` / `ROUTE MARKER`, and route-marker still points the map at the active outing target.
- Confirmed the map-focus expectation refresh matches the current guided active-target rule without changing support behavior.
- Reviewed the completed test/build/validation/browser proof set.
- Promoted `ECO-20260420-scout-354` to `READY`.

### ECO-20260420-scout-354

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-filed-arc-epilogue-state-handoff.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-critic-350`

Goal:

- Prepare the lane-1 contract for packet 137; details live in the packet.

Completed:

- Added `docs/reports/2026-04-20-filed-arc-epilogue-state-handoff.md`.
- Confirmed filed High Pass already suppresses active outing, route marker, replay label, active field request, and journal field request.
- Found the remaining systems gap: filed-arc copy is repeated inline rather than separated into explicit done, optional-revisit, and filed-subtitle buckets.
- Scoped `ECO-20260420-main-354` to a tiny filed-copy resolver or equivalent subtitle seam, preserving exact visible copy and avoiding new UI, save, route, geometry, support, or science-copy work.
- Promoted `ECO-20260420-main-354` to `READY`.

### ECO-20260420-main-354

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-filed-arc-epilogue-state-implementation.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-scout-354`

Goal:

- Add a compact filed High Pass copy resolver or equivalent station subtitle seam that separates done, optional revisit, and future-scope-gated language while preserving the current filed-arc behavior and exact visible strings.

Completed:

- Added a typed filed High Pass copy resolver for filed-location, field-arc-complete, optional-revisit, filed-expedition-subtitle, and composed-notice text.
- Reused the resolver in the filed `HighPassChapterState` fields and the High Pass archive subtitle special case.
- Added focused helper/state coverage and strengthened the filed debug snapshot proof that active request, route marker, replay label, and journal field request stay cleared.
- Confirmed the lane-2 homecoming epilogue copy remains unchanged.
- Added `docs/reports/2026-04-20-filed-arc-epilogue-state-implementation.md`.
- Verified focused field-season/save-snapshot tests, focused filed High Pass runtime-smoke coverage, field-station homecoming copy tests, `npm run build`, `git diff --check`, a standard `web_game_playwright_client` smoke, and a direct filed debug-snapshot browser state capture.
- `npm run validate:agents` passes with the existing work-queue-size warning, and packet `137` parses cleanly.
- Promoted `ECO-20260420-critic-354` to `READY`.

### ECO-20260420-critic-354

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-filed-arc-epilogue-state-review.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-main-354`

Goal:

- Review the filed High Pass epilogue state seam and confirm the helper extraction preserved exact visible copy, filed-state suppression behavior, and lane boundaries.

Completed:

- Added `docs/reports/2026-04-20-filed-arc-epilogue-state-review.md` with no blocker.
- Confirmed the filed High Pass copy resolver separates completed, optional-revisit, and filed-subtitle intent without player-facing copy drift.
- Confirmed filed High Pass still suppresses active outing, active field request, route marker, route replay label, and journal field request.
- Confirmed route/archive/atlas/launch-card/expedition/notice surfaces and the lane-2 homecoming epilogue line stayed exact.
- Confirmed no save schema, route definition, support behavior, station page/UI, geometry, season-three promise, new route task, or science-copy change landed.
- Promoted `ECO-20260420-scout-358` to `READY`.

### ECO-20260420-scout-358

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-filed-arc-epilogue-state-review.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-critic-354`

Completed:

- Added `docs/reports/2026-04-20-front-half-tactile-state-handoff.md` with a narrow lane-1 debug/test/docs target for packet `138`.
- Scoped `ECO-20260420-main-358` to one named front-half Open To Shelter save snapshot and focused station/map assertions rather than player-facing station, route, support, copy, save-schema, or geometry changes.
- Updated packet `138` with the lane-1 scout refinement and promoted `ECO-20260420-main-358` to `READY`.

### ECO-20260420-main-358

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-front-half-tactile-state-implementation.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-scout-358`

Completion notes:

- Added the debug-only `front-half-open-to-shelter` save snapshot after the forest starter chain plus `trail-stride`, before Coastal Scrub completion.
- Documented the snapshot and added focused save-snapshot coverage proving the next-habitat handoff, Coastal Scrub map focus, default `HAND LENS`, `Open To Shelter` station route state, and no route marker without explicit `Route Marker`.
- Left player-facing station behavior, route definitions, lane-2 copy, support-choice behavior, world-map focus priority, save schema, and biome geometry unchanged.
- Verified focused save-snapshot tests, focused runtime-smoke handoff/support/content coverage, `npm run build`, `git diff --check`, the shared web-game client smoke, and a direct browser proof in `output/web-game/front-half-main-358-snapshot/`.
- Promoted `ECO-20260420-critic-358` to `READY`.

### ECO-20260420-critic-358

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-front-half-tactile-state-review.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-main-358`

Completion notes:

- Added `docs/reports/2026-04-20-front-half-tactile-state-review.md` with no blocker.
- Confirmed the new `front-half-open-to-shelter` snapshot is debug/test/docs only, round-trips as plain `SaveState`, and keeps the existing debug-window seam.
- Confirmed the snapshot points `guidedFieldSeason` to `next-habitat` / `coastal-scrub`, keeps default `HAND LENS`, presents `Open To Shelter` on the station routes page, and focuses Coastal Scrub without a route marker.
- Confirmed no player-facing station behavior, route definition, lane-2 copy, support-choice behavior, world-map focus priority, save schema, or biome geometry changed.
- Re-ran the focused save-snapshot tests, the focused runtime-smoke handoff/support/content slice, and `git diff --check`; cited the implementation build and browser proof.
- Promoted `ECO-20260420-scout-362` to `READY`.

### ECO-20260420-critic-338

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-lane-1-full-arc-snapshot-runtime-review.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-main-338`

Goal:

- Review the lane-1 snapshot runtime matrix for packet `133` and decide whether the lane-1 chain can advance to packet `134`.

Completion notes:

- Added `docs/reports/2026-04-20-lane-1-full-arc-snapshot-runtime-review.md` with no blocking findings.
- Confirmed the matrix is test-only, uses existing debug snapshots and fake DOM helpers, and covers the six named lane-1 station/map/journal states.
- Confirmed it does not duplicate lane-2 filed-note copy, lane-3 screenshot proof, or lane-4 route-state progression work.
- Marked packet `133` `DONE` and promoted `ECO-20260420-scout-342` to `READY`.
- Rechecked `npm test -- --run src/test/save-snapshots.test.ts`, `npm run build`, `npm run validate:agents`, and `git diff --check`.

### ECO-20260420-main-338

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-lane-1-full-arc-snapshot-runtime-implementation.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-scout-338`

Goal:

- Add a test-only runtime surface matrix for the six debug save snapshots so station, map, and journal states can be asserted through `render_game_to_text()` without browser traversal or brittle timing.

Completion notes:

- Added fake-DOM runtime matrix coverage in `src/test/save-snapshots.test.ts` for `first-session`, `station-return`, `season-close-return`, `high-pass-active`, `high-pass-ready-to-file`, and `high-pass-filed`.
- Kept the implementation test-only with no runtime hooks, new snapshots, player-facing UI, save/schema changes, route-state matrix duplication, copy-budget matrix duplication, or browser/screenshot work.
- Added `docs/reports/2026-04-20-lane-1-full-arc-snapshot-runtime-implementation.md`.
- Verified `npm test -- --run src/test/save-snapshots.test.ts`, `npm run build`, and `git diff --check`.
- Promoted `ECO-20260420-critic-338` to `READY`.

### ECO-20260420-scout-338

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-lane-1-full-arc-snapshot-runtime-handoff.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-critic-334`

Goal:

- Prepare the lane-1 contract for packet `133`; details live in the packet.

Completed:

- Added `docs/reports/2026-04-20-lane-1-full-arc-snapshot-runtime-handoff.md`.
- Confirmed existing debug save snapshots and fake DOM helpers cover the needed lane-1 seed surface.
- Updated packet `133` with the lane-1 snapshot-runtime scout refinement.
- Promoted `ECO-20260420-main-338` to `READY`.

### ECO-20260420-scout-343

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-station-homecoming-copy-handoff.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-critic-339`

Goal:

- Prepare the lane-2 contract for packet 134; details live in the packet.

Completed:

- Added `docs/reports/2026-04-20-station-homecoming-copy-handoff.md`.
- Updated packet `134` with a lane-2 copy-only homecoming line contract.
- Promoted `ECO-20260420-main-343` to `READY`.
- Kept lane 2 out of station wiring, route controller behavior, save/schema changes, geometry, and new UI panels.

### ECO-20260420-critic-339

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-filed-note-synthesis-matrix-review.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-main-339`

Goal:

- Review the lane-2 filed-note synthesis matrix and confirm the build blocker is unrelated to this lane's content guardrails.

Completed:

- Added `docs/reports/2026-04-20-filed-note-synthesis-matrix-review.md` with no lane-2 blocker.
- Confirmed the new guardrails stay test-only, content-facing, and focused on copy budgets plus ecology anchors.
- Rechecked focused and full touched-file Vitest suites.
- Confirmed `npm run build` is still blocked by a lane-4 route-state matrix type mismatch outside the lane-2 change.
- Promoted `ECO-20260420-scout-343` to `READY`.

### ECO-20260420-main-334

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-lane-1-first-session-wayfinding-implementation.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-scout-334`

Goal:

- Use guided `nextBiomeId` as the world-map focus fallback after route-marker support so first-session `M` + `Enter` points at `Forest Trail` after `Shore Shelter` and `Coastal Scrub` after `Trail Stride`.

Acceptance:

- route-marker support remains the first preferred map focus when active
- `src/test/runtime-smoke.test.ts` proves beach-beat-complete starter state opens the world map focused on `forest` with no menu cycling
- `src/test/runtime-smoke.test.ts` proves station close after `Trail Stride` returns to the world map focused on `coastal-scrub`
- station-return and season-close-return map-menu defaults still select `field-station`
- runs the focused runtime smoke slice, `npm run build`, `npm run validate:agents`, and `git diff --check`

Completion notes:

- Added guided `nextBiomeId` as the world-map focus fallback after route-marker support and before current location.
- Extended runtime smoke proof for first-session guided map focus and station-close focus.
- Added `docs/reports/2026-04-20-lane-1-first-session-wayfinding-implementation.md`.
- Verified the focused runtime smoke slice, web-game boot smoke, and a custom browser proof for completed `Shore Shelter`.
- `npm run build` is currently blocked by pre-existing unused declarations in `src/test/field-requests.test.ts`.
- Promoted `ECO-20260420-critic-334` to `READY`.

### ECO-20260420-critic-334

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-lane-1-first-session-wayfinding-review.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-main-334`

Goal:

- Review whether the lane-1 guided map-focus implementation satisfies packet `132` without adding tutorial UI or regressing route-marker priority.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms route-marker support remains the first preferred map focus when active
- confirms guided `nextBiomeId` fallback points first-session map focus at `forest` and station close focus at `coastal-scrub`
- confirms no tutorial panel, player-facing copy expansion, save schema change, station redesign, route behavior rewrite, or geometry change landed
- rechecks the focused runtime smoke slice and notes the current `npm run build` status

Completion notes:

- Added `docs/reports/2026-04-20-lane-1-first-session-wayfinding-review.md` with no blocker.
- Confirmed route-marker priority, guided `nextBiomeId` fallback behavior, first-session map focus proof, and station-close focus proof.
- Rechecked focused runtime smoke plus route-marker priority, `git diff --check`, and attempted `npm run build`.
- `npm run build` is currently blocked outside lane 1 by a concurrent `src/test/field-requests.test.ts` type issue.
- Marked packet `132` `DONE` and promoted `ECO-20260420-scout-338` to `READY`.

### ECO-20260420-main-339

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-filed-note-synthesis-matrix-implementation.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-scout-339`

Goal:

- Add a lane-2, test-only filed-note synthesis matrix for every live Route v2 filed-note route in the completed alpha arc.

Completed:

- Added Route v2 note-copy budget and relationship-anchor coverage to `src/test/content-quality.test.ts`.
- Added a table-driven resolved filed-note/display matrix to `src/test/field-requests.test.ts`.
- Added `docs/reports/2026-04-20-filed-note-synthesis-matrix-implementation.md`.
- Verified the focused and full touched-file Vitest suites passed.
- Attempted `npm run build`; it is currently blocked by unrelated in-progress lane edits documented in the implementation report.
- Promoted `ECO-20260420-critic-339` to `READY`.

### ECO-20260420-scout-339

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-filed-note-synthesis-matrix-handoff.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-critic-335`

Goal:

- Prepare the lane-2 contract for packet 133; details live in the packet.

Completed:

- Added `docs/reports/2026-04-20-filed-note-synthesis-matrix-handoff.md`.
- Scoped `ECO-20260420-main-339` to a test-only Route v2 filed-note synthesis matrix across the completed alpha arc.
- Updated packet `133` with the lane-2 route-note ids, budget/anchor contract, non-goals, and verification plan.
- Promoted `ECO-20260420-main-339` to `READY`.

### ECO-20260420-scout-334

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-lane-1-save-snapshots-review.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-critic-330`

Goal:

- Prepare the lane-1 contract for packet 132; details live in the packet.

Acceptance:

- audits title/menu/map/station focus defaults for first-session comprehension blockers
- records a narrow handoff for the main agent if a systems seam remains
- updates packet `132` with the lane-1 scout refinement
- promotes `ECO-20260420-main-334` when actionable

Completion notes:

- Added `docs/reports/2026-04-20-lane-1-first-session-wayfinding-handoff.md`.
- Found menu action defaults already point to `world-map` / `field-station`; the remaining seam is world-map focus falling back to the current location instead of guided `nextBiomeId`.
- Updated packet `132` with the lane-1 scout refinement and promoted `ECO-20260420-main-334` to `READY`.

### ECO-20260420-critic-335

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-first-session-onboarding-copy-review.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-main-335`

Goal:

- Review whether the first-session copy pass improved onboarding clarity while staying copy-only and within the handheld text budget.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms title/menu/guided-season/first-route/ready-to-file copy now reads as one `J` / `M` / `Enter` loop
- confirms no menu defaults, route behavior, station state, save schema, tutorial panel, geometry, or science facts changed
- rechecks relevant focused tests or explains any residual verification gap

Completion notes:

- Added `docs/reports/2026-04-20-first-session-onboarding-copy-review.md` with no blocker.
- Confirmed the first-session copy pass stays copy-only while improving the `J` / `M` / `Enter` loop.
- Rechecked focused copy and first-route Vitest slices, `npm run build`, and `git diff --check`.
- Added the lane-2 critic result to packet `132`.
- Promoted `ECO-20260420-scout-339` to `READY`.

### ECO-20260420-main-335

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-first-session-onboarding-copy-implementation.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-scout-335`

Goal:

- Make the first-session title, menu, guided-season notice, `Shore Shelter` route copy, and first ready-to-file note read as one kid-readable loop: `J` for notebook, `M` for map/station, and `Enter` to choose or file.

Acceptance:

- fresh-save title/menu/guided-season/first-route copy reads as one loop without adding a tutorial panel
- player-facing `Shore Shelter` text uses kid-readable clue language instead of token-like hyphenated wording where practical
- the first ready-to-file line clearly tells the player how to return to the field station and file the note
- behavior stays unchanged apart from copy and exact-copy tests
- focused exact-copy tests, `npm run validate:agents`, `git diff --check`, and `npm run build` if runtime TypeScript files change pass

Completion notes:

- Added `docs/reports/2026-04-20-first-session-onboarding-copy-implementation.md`.
- Tightened first-session title/menu/guided-season/`Shore Shelter`/ready-to-file wording around `J`, `M`, and `Enter`.
- Updated exact-copy tests for overlay, guided-season, field-request, field-season-board, and runtime-smoke expectations.
- Verified focused Vitest slices, `npm run build`, `npm run validate:agents`, and `git diff --check`; agent validation had only the existing queue-size warning.
- Promoted `ECO-20260420-critic-335` to `READY`.

### ECO-20260420-scout-335

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-first-session-onboarding-copy-handoff.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-critic-331`

Goal:

- Prepare the lane-2 contract for packet 132; details live in the packet.

Completion notes:

- Added `docs/reports/2026-04-20-first-session-onboarding-copy-handoff.md`.
- Scoped lane 2 to a copy-only first-session pass across title/menu/guided-season/first-route/ready-to-file wording.
- Updated packet `132` with the lane-2 scout refinement and exact-copy test expectations.
- Promoted `ECO-20260420-main-335` to `READY`.

### ECO-20260420-critic-330

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-lane-1-save-snapshots-review.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-main-330`

Goal:

- Review the lane-1 debug save snapshot helpers, docs, and verification for packet 131.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms all six named snapshots are present and serialize as plain current `SaveState` JSON
- confirms the localStorage workflow uses the exported save key and does not duplicate the key in docs/tests
- confirms no telemetry, analytics, network calls, player-facing UI, save-schema migration, route behavior, station layout, route copy, geometry, science content, or support behavior changed

Completion notes:

- Added `docs/reports/2026-04-20-lane-1-save-snapshots-review.md` with no blocker.
- Confirmed all six snapshots serialize as plain `SaveState` JSON, docs/tests use the exported save key path, and the runtime hook remains no-UI/debug-only.
- Rechecked `npm test -- --run src/test/save-snapshots.test.ts`, `npm run validate:agents`, and `git diff --check`.
- Marked packet `131` `DONE` and promoted `ECO-20260420-scout-334` to `READY`.

### ECO-20260420-main-330

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-lane-1-save-snapshots-implementation.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-scout-330`

Goal:

- Add debug-only named save snapshot helpers and documented localStorage states for packet 131.

Acceptance:

- adds named snapshot helpers for first-session, station-return, season-close-return, High Pass active, High Pass ready-to-file, and filed High Pass states
- documents the localStorage key and paste/reload workflow for those states
- verifies snapshots round-trip through save normalization and resolve expected guided-season, station, or High Pass phase state
- avoids telemetry, analytics, network calls, player-facing snapshot UI, save-schema migration, route behavior, station layout, route copy, geometry, science content, and support behavior

Completion notes:

- Added `src/engine/debug-save-snapshots.ts` with six named plain-`SaveState` snapshots and exported `SAVE_STORAGE_KEY` from `src/engine/save.ts`.
- Exposed `window.get_debug_save_snapshots()` beside `render_game_to_text()` and documented the paste/reload workflow in `docs/save-snapshot-states.md`.
- Added `src/test/save-snapshots.test.ts` to round-trip every payload through `normalizeSaveState()` and assert the expected guided-season, station, and High Pass states.
- Verified with focused snapshot tests, `npm run build`, a web-game client smoke, and an in-browser debug-helper check; promoted `ECO-20260420-critic-330` to `READY`.

### ECO-20260420-scout-330

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-lane-1-save-snapshot-handoff.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-critic-326`

Goal:

- Prepare the lane-1 contract for packet 131.

Acceptance:

- identifies the save/debug/test seams for named review snapshots
- narrows the main implementation files and non-goals
- keeps the work debug-only and out of telemetry, player-facing UI, and save-schema migration

Completion notes:

- Added `docs/reports/2026-04-20-lane-1-save-snapshot-handoff.md`.
- Added `main_330_focus` to packet `131` with named snapshot ids, recommended files, state recipes, verification targets, and non-goals.
- Promoted `ECO-20260420-main-330` to `READY`.

### ECO-20260420-critic-326

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-lane-1-review-drop-hygiene-review.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `ECO-20260420-main-326`

Goal:

- Review the lane-1 review-drop checklist and clean-extract proof for packet 130.

Acceptance:

- confirms the checklist and scripts create a source-complete review archive with `package-lock.json`
- confirms the verifier proves clean install, agent validation, tests, and build
- confirms generated/local bulk stays out of the archive before install/build
- records findings or a clean review in `docs/reports/`

Completion notes:

- Added `docs/reports/2026-04-20-lane-1-review-drop-hygiene-review.md` with no blocker.
- Confirmed the checklist, pack script, verify script, package scripts, and final archive contents satisfy packet `130`.
- Rechecked `npm run validate:agents` and `git diff --check`.
- Marked packet `130` `DONE` and promoted `ECO-20260420-scout-330` to `READY`.

### ECO-20260420-scout-332

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-lane-3-visual-anchor-snapshots-handoff.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-critic-328`

Goal:

- Prepare the lane-3 contract for packet 131.

Acceptance:

- identifies exact lane-3 instrumentation/snapshot targets
- narrows the lane-3 main implementation files and non-goals
- keeps the work inside spatial proof and screenshot-state review scope

Completion notes:

- Added `docs/reports/2026-04-20-lane-3-visual-anchor-snapshots-handoff.md`.
- Scoped lane 3's packet 131 work to a docs-only visual-anchor change policy in `docs/alpha-screenshot-proof-manifest.md`.
- Deferred save helpers to lane 1 and route-loop assertions to lane 4.
- Promoted `ECO-20260420-main-332` to `READY`.

### ECO-20260420-main-332

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-lane-3-visual-anchor-snapshots-implementation.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-scout-332`

Goal:

- Add the lane-3 visual-anchor change policy to the alpha screenshot manifest.

Acceptance:

- updates `docs/alpha-screenshot-proof-manifest.md`
- covers all 15 existing frame ids with an anchor class and allowed-change or recapture trigger
- marks older references without adjacent state JSON as state gaps
- documents fresh snapshot naming under ignored `output/alpha-screenshot-proof/`
- avoids runtime code, telemetry, save helpers, route assertions, browser automation, geometry, route state, station UI, save schema, science copy, and committed output
- `npm run validate:agents` and `git diff --check` pass

Completion notes:

- Added an `Anchor Change Policy` to `docs/alpha-screenshot-proof-manifest.md` covering all 15 lane-3 visual frame ids.
- Marked older screenshot references without adjacent state JSON as `State gap` and documented the ignored fresh snapshot set.
- Added `docs/reports/2026-04-20-lane-3-visual-anchor-snapshots-implementation.md`.
- Promoted `ECO-20260420-critic-332` to `READY`.

### ECO-20260420-critic-332

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-lane-3-visual-anchor-snapshots-review.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-main-332`

Goal:

- Review the lane-3 visual-anchor change policy added to the alpha screenshot manifest.

Completion notes:

- Added `docs/reports/2026-04-20-lane-3-visual-anchor-snapshots-review.md` with no blocker.
- Confirmed the manifest policy covers all 15 frame ids with anchor class, state status, and allowed-change or recapture trigger.
- Confirmed the eight older references without adjacent state remain clearly marked as state gaps.
- Promoted `ECO-20260420-scout-336` to `READY`.

### ECO-20260420-scout-336

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-lane-3-first-session-visual-cue-handoff.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-critic-332`

Goal:

- Prepare the lane-3 contract for packet 132; details live in the packet.

Completion notes:

- Added `docs/reports/2026-04-20-lane-3-first-session-visual-cue-handoff.md`.
- Found the existing beach opener already has a physical first-objective cue through nearby beach grass and the authored dune shoulder.
- Scoped `ECO-20260420-main-336` to proof/documentation first, with beach geometry changes allowed only if fresh screenshot/state evidence contradicts the scout finding.
- Promoted `ECO-20260420-main-336` to `READY`.

### ECO-20260420-main-336

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-lane-3-first-session-visual-cue-implementation.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-scout-336`

Goal:

- Harden the first-session beach objective proof without changing geometry unless fresh screenshot/state evidence shows the player lacks a physical first cue.

Acceptance:

- updates `docs/alpha-screenshot-proof-manifest.md` with a first-session objective cue note or capture target tied to `beach-opening-shoulder`
- documents fresh proof targets under ignored `output/alpha-screenshot-proof/first-session-beach-objective.*`
- records pass conditions for visible/nearby beach grass, active `beach-shore-shelter`, no large overlay covering the cue, and no competing nearby travel target
- adds an implementation report explaining why geometry was not changed, unless fresh proof contradicts the scout finding
- avoids route state, station/menu behavior, save schema, field-request copy, science copy, tutorial panels, support-choice behavior, committed screenshot output, new coastline branches, and new route objectives
- `npm run validate:agents` and `git diff --check` pass; if runtime or biome test files change, focused beach/start tests plus `npm run build` pass

Completion notes:

- Added a `First-Session Objective Cue` section to `docs/alpha-screenshot-proof-manifest.md`.
- Added `docs/reports/2026-04-20-lane-3-first-session-visual-cue-implementation.md`.
- Documented the ignored `first-session-beach-objective` screenshot, state, and errors targets plus pass conditions.
- Kept the pass docs-only with no geometry, route, station/menu, save, copy, support, or committed-output changes.
- Promoted `ECO-20260420-critic-336` to `READY`.

### ECO-20260420-critic-336

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-lane-3-first-session-visual-cue-review.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-main-336`

Goal:

- Review the lane-3 first-session beach objective proof note and confirm no unnecessary geometry was added.

Completion notes:

- Added `docs/reports/2026-04-20-lane-3-first-session-visual-cue-review.md` with no blocker.
- Confirmed the proof row ties `first-session-beach-objective` to `beach-opening-shoulder` and ignored fresh capture targets.
- Confirmed no geometry, route state, station/menu behavior, save schema, tutorial UI, support behavior, science copy, or committed screenshot output changed.
- Promoted `ECO-20260420-scout-340` to `READY`.

### ECO-20260420-scout-340

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-lane-3-full-arc-spatial-proof-handoff.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-critic-336`

Goal:

- Prepare the lane-3 contract for packet 133; details live in the packet.

Completion notes:

- Added `docs/reports/2026-04-20-lane-3-full-arc-spatial-proof-handoff.md`.
- Scoped `ECO-20260420-main-340` to a manifest bridge between packet `133` route-matrix checkpoints and existing spatial frame ids.
- Found existing `output/main-150-browser/*.json` state files for the four forest vertical frames currently marked as state gaps.
- Promoted `ECO-20260420-main-340` to `READY`.

### ECO-20260420-main-340

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-lane-3-full-arc-spatial-proof-implementation.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-scout-340`

Goal:

- Bridge the screenshot-proof manifest to packet `133` by naming full-arc spatial checkpoints and crediting existing forest frame state JSON, without generating screenshots or adding places.

Completion notes:

- Added the `Full-Arc Smoke Matrix Spatial Checkpoints` section to `docs/alpha-screenshot-proof-manifest.md`.
- Mapped first beach objective, beach shelter, forest vertical/cave, High Pass, and tundra relief checkpoints to existing frame ids and ignored `output/alpha-screenshot-proof/` targets.
- Updated the four forest vertical anchor/frame rows to reference existing `output/main-150-browser/*.json` state paths.
- Added `docs/reports/2026-04-20-lane-3-full-arc-spatial-proof-implementation.md`.
- Kept the pass docs-only with no geometry, places, route behavior, route state, support behavior, station/menu behavior, save snapshots, save schema, science copy, journal copy, player-facing UI, committed screenshot output, committed state dumps, or screenshot automation framework changes.
- Promoted `ECO-20260420-critic-340` to `READY`.

### ECO-20260420-critic-340

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-lane-3-full-arc-spatial-proof-review.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-main-340`

Goal:

- Review the lane-3 full-arc spatial proof manifest bridge and confirm no new places, route-state ownership, save snapshots, player-facing UI, or committed proof output leaked into lane 3.

Completion notes:

- Added `docs/reports/2026-04-20-lane-3-full-arc-spatial-proof-review.md` with no blocker.
- Confirmed the full-arc checkpoint table maps required beach, forest, High Pass, and tundra proof moments to existing frame ids and ignored fresh targets.
- Confirmed the four forest vertical rows now reference existing `output/main-150-browser/*.json` state paths instead of state gaps.
- Confirmed no runtime, geometry, route/support, station/menu, save/schema, science copy, journal copy, player-facing UI, committed proof output, or screenshot automation changes were introduced by lane 3.
- Promoted `ECO-20260420-scout-344` to `READY`.

### ECO-20260420-scout-344

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-station-homecoming-visual-accent-handoff.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-critic-340`

Goal:

- Prepare the lane-3 contract for packet 134.

Completion notes:

- Added `docs/reports/2026-04-20-station-homecoming-visual-accent-handoff.md`.
- Scoped lane 3 to the smallest upper-frame / roofline / brace-cap accent family inside the existing station shell helper.
- Kept station resolver and non-sill seam wiring owned by lane 1.
- Left `ECO-20260420-main-344` `BLOCKED` until `ECO-20260420-critic-342` clears, to avoid racing lane 1 in the shared station shell files.

### ECO-20260420-critic-331

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-playtest-comprehension-rubric-review.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-main-331`

Goal:

- Review the lane-2 contract for packet 131; details live in the packet.

Completion notes:

- Added `docs/reports/2026-04-20-playtest-comprehension-rubric-review.md` with no blocker.
- Confirmed `docs/playtest-comprehension-rubric.md` stays docs-only, privacy-safe, relationship-focused, and useful for sorting friction by lane.
- Rechecked `npm run validate:agents` and `git diff --check`.
- Promoted `ECO-20260420-scout-335` to `READY`.

### ECO-20260420-critic-328

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-lane-3-alpha-screenshot-manifest-review.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `ECO-20260420-main-328`

Goal:

- Review the lane-3 alpha screenshot-proof manifest for packet 130.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms stable frame ids and fresh capture paths cover the representative lane-3 physical-memory beats
- confirms generated screenshots remain ignored output and the source manifest does not authorize runtime or geometry changes

Completion notes:

- Added `docs/reports/2026-04-20-lane-3-alpha-screenshot-manifest-review.md` with no blocker.
- Confirmed the source-tracked manifest covers 15 representative lane-3 physical-memory frames with fresh capture paths and state expectations.
- Confirmed generated screenshot/state/error artifacts remain under ignored `output/` paths.
- Promoted `ECO-20260420-scout-332` to `READY`.

### ECO-20260420-main-328

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-lane-3-alpha-screenshot-manifest-implementation.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `ECO-20260420-scout-328`

Goal:

- Add the lane-3 alpha screenshot-proof manifest for named spatial comparison frames.

Acceptance:

- adds `docs/alpha-screenshot-proof-manifest.md`
- names stable frame ids across beach, corridor, forest climb/cave, treeline High Pass, and tundra relief beats
- records existing ignored proof paths plus fresh recapture paths under `output/alpha-screenshot-proof/`
- includes state fields and pass/fail criteria for 256x160 spatial regression review
- checks that all existing proof paths named by the manifest are present locally
- avoids runtime, geometry, route state, station UI, save schema, science-copy, and committed-output changes

Completion notes:

- Added `docs/alpha-screenshot-proof-manifest.md`.
- Added `docs/reports/2026-04-20-lane-3-alpha-screenshot-manifest-implementation.md`.
- Confirmed all 15 existing screenshot reference paths named by the manifest exist locally.
- Docs-only pass; no runtime, geometry, route, station, save, science-copy, test, or generated-output changes.
- Promoted `ECO-20260420-critic-328` to `READY`.

### ECO-20260420-main-326

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-lane-1-review-drop-hygiene-implementation.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `ECO-20260420-scout-326`

Goal:

- Add the review-drop checklist and reproducible source archive proof for packet 130.

Acceptance:

- documents what belongs in a clean review drop and what must be excluded
- creates a source-complete archive including `package-lock.json`
- verifies the archive from a clean extract with install, agent validation, tests, and build
- excludes `node_modules`, `dist`, `output`, `test-results`, `.git`, and local/generated bulk

Completion notes:

- Added `docs/review-drop-checklist.md`.
- Added `npm run review:pack` and `npm run review:verify -- <archive>` via `scripts/create-review-drop.mjs` and `scripts/verify-review-drop.mjs`.
- Verified a timestamped `output/review-drops/` archive from a clean extract with `npm ci`, `npm run validate:agents`, `npm test`, and `npm run build`.
- Promoted `ECO-20260420-critic-326` to `READY`.

### ECO-20260420-main-329

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-alpha-route-playthrough-checklist.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `ECO-20260420-scout-329`

Goal:

- Add the lane-4 alpha route playthrough checklist from first beach outing through filed High Pass.

Acceptance:

- adds `docs/reports/2026-04-20-alpha-route-playthrough-checklist.md`
- covers the full route spine from `Shore Shelter` through filed `High Pass`
- separates currently proven route states from proof gaps and later packet handoffs
- avoids runtime, station UI, broad copy, geometry, support-system, and test changes

Completion notes:

- Added `docs/reports/2026-04-20-alpha-route-playthrough-checklist.md`.
- Mapped the current alpha route spine from fresh `Shore Shelter` through filed `High Pass`.
- Separated existing scattered proof areas from deferred packet `131` instrumentation and packet `133` route-state matrix work.
- Promoted `ECO-20260420-critic-329` to `READY`.

### ECO-20260420-critic-329

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-alpha-route-playthrough-checklist-review.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `ECO-20260420-main-329`

Goal:

- Review the lane-4 alpha route playthrough checklist for packet 130.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms the checklist covers the route spine through filed `High Pass`
- confirms the checklist stays docs-only and defers instrumentation/matrix work to later packets

Completion notes:

- Added `docs/reports/2026-04-20-alpha-route-playthrough-checklist-review.md` with no blocking findings.
- Confirmed the checklist covers the route spine from fresh `Shore Shelter` through filed `High Pass`.
- Confirmed packet `130` lane 4 stayed docs-only and leaves instrumentation/save snapshots to packet `131` plus the deterministic route-state matrix to packet `133`.
- Promoted `ECO-20260420-scout-333` to `READY`.

### ECO-20260420-scout-333

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-route-loop-instrumentation-handoff.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-critic-329`

Goal:

- Prepare the lane-4 contract for packet 131; details live in the packet.

Completion notes:

- Added `docs/reports/2026-04-20-route-loop-instrumentation-handoff.md`.
- Confirmed `render_game_to_text()` already exposes enough route-loop state for packet `131` lane 4.
- Scoped the main pass to test-only High Pass runtime smoke assertions for active request, support behavior, ready-to-file, filed notice, and post-filed replay-cleared states.
- Promoted `ECO-20260420-main-333` to `READY`.

### ECO-20260420-main-333

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-route-loop-instrumentation-implementation.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-scout-333`

Goal:

- Add test-only route-loop instrumentation assertions for active request, support behavior, ready-to-file, filed notice, and post-filed replay-cleared states.

Acceptance:

- extends `src/test/runtime-smoke.test.ts` around the existing High Pass route-loop path
- proves the required route-loop checkpoints through `render_game_to_text()` output
- avoids runtime telemetry, UI, save schema, route behavior, station layout, broad copy, geometry, screenshot, and science-content changes
- focused High Pass runtime smoke coverage, `npm run validate:agents`, and `git diff --check` pass

Completion notes:

- Added `docs/reports/2026-04-20-route-loop-instrumentation-implementation.md`.
- Tightened the High Pass runtime smoke to assert serialized `activeFieldRequest.routeV2`, `fieldRequestHint`, `fieldStation.selectedOutingSupportId`, notebook-ready notice, filed notice, and post-filed map/journal cleared state through `render_game_to_text()`.
- Verified `npm test -- src/test/runtime-smoke.test.ts -t "High Pass"`.
- Promoted `ECO-20260420-critic-333` to `READY`.

### ECO-20260420-critic-333

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-route-loop-instrumentation-review.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-main-333`

Goal:

- Review the lane-4 contract for packet 131; details live in the packet.

Completion notes:

- Added `docs/reports/2026-04-20-route-loop-instrumentation-review.md` with no blocker.
- Confirmed the High Pass assertions stay test-only and prove active request state, support contrast, ready-to-file, filed notice, and post-filed cleared map/journal/request state through existing debug output.
- Rechecked `npm test -- src/test/runtime-smoke.test.ts -t "High Pass"`.
- Promoted `ECO-20260420-scout-337` to `READY`.

### ECO-20260420-scout-337

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-first-session-route-loop-handoff.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-critic-333`

Goal:

- Prepare the lane-4 contract for packet 132; details live in the packet.

Completion notes:

- Added `docs/reports/2026-04-20-first-session-route-loop-handoff.md`.
- Confirmed existing `Shore Shelter` runtime smoke already plays and files the first route; scoped the main pass to structural debug-output assertions for activation, clue progress, ready-to-file, station preview, filed notice, and next-route handoff.
- Updated packet `132` with the lane-4 scout refinement and coordination notes for lane 1 focus, lane 2 copy, and lane 3 visual proof ownership.
- Promoted `ECO-20260420-main-337` to `READY`.

### ECO-20260420-main-337

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-first-session-route-loop-implementation.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-scout-337`

Goal:

- Add test-only first-route loop assertions so `Shore Shelter` activation, clue progress, station filing preview, filed notice, and next-route handoff are visible through existing debug output.

Acceptance:

- tightens the existing `Shore Shelter` runtime smoke path in `src/test/runtime-smoke.test.ts`
- proves the route-loop checkpoints through `render_game_to_text()` output instead of new telemetry or UI
- avoids route behavior, route definitions, station layout, menu focus, save schema, support-choice behavior, beach geometry, science content, onboarding copy, screenshots, and packet `133` matrix work
- focused `Shore Shelter` runtime smoke coverage, `npm run validate:agents`, and `git diff --check` pass

Completion notes:

- Added `docs/reports/2026-04-20-first-session-route-loop-implementation.md`.
- Tightened `src/test/runtime-smoke.test.ts` so `render_game_to_text()` proves first-route activation, routeV2 evidence progress, ready-to-file state, station preview, filed notice, and next-route handoff.
- Rechecked `npm test -- src/test/runtime-smoke.test.ts -t "Shore Shelter"`.
- Promoted `ECO-20260420-critic-337` to `READY`.

### ECO-20260420-critic-337

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-first-session-route-loop-review.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-main-337`

Goal:

- Review the lane-4 contract for packet 132; details live in the packet.

Completion notes:

- Added `docs/reports/2026-04-20-first-session-route-loop-review.md` with no blocker.
- Confirmed the Shore Shelter proof stays test-only and covers activation, routeV2 evidence progress, ready-to-file state, station preview, filed notice, cleared route progress, and next-route handoff through existing debug output.
- Rechecked `npm test -- src/test/runtime-smoke.test.ts -t "Shore Shelter"`.
- Promoted `ECO-20260420-scout-341` to `READY`.

### ECO-20260420-scout-341

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-full-arc-route-state-matrix-handoff.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-critic-337`

Goal:

- Prepare the lane-4 contract for packet 133; details live in the packet.

Completion notes:

- Added `docs/reports/2026-04-20-full-arc-route-state-matrix-handoff.md`.
- Scoped the main pass to a compact table-driven `src/test/field-requests.test.ts` matrix for all live Route v2 notebook routes, with non-Route-v2 requests treated as handoff states only.
- Baseline `npm test -- src/test/field-requests.test.ts` passed.
- Promoted `ECO-20260420-main-341` to `READY`.

### ECO-20260420-main-341

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-full-arc-route-state-matrix-implementation.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-scout-341`

Goal:

- Add a compact deterministic Route v2 matrix in `src/test/field-requests.test.ts` that walks every live notebook route from active state through clue progress, ready-to-file, filing, and next-state handoff.

Acceptance:

- covers `beach-shore-shelter`, `forest-hidden-hollow`, `forest-moisture-holders`, `coastal-shelter-shift`, `treeline-stone-shelter`, `tundra-short-season`, `scrub-edge-pattern`, `forest-cool-edge`, `treeline-low-fell`, `forest-expedition-upper-run`, and `treeline-high-pass`
- treats `forest-survey-slice`, `coastal-edge-moisture`, `tundra-survey-slice`, and `forest-season-threads` as handoff states, not Route v2 matrix routes
- asserts active route id/title/progress, `routeV2.status`, `selectedSupportId`, clue-slot progression, ready-to-file state, filing clear/completion behavior, and expected next request or final filed state
- includes live-only process/world-state variant checks for `Wrack Shelter`, `Moist Hollow`, `Held Sand`, `Moist Edge`, `Thaw Window`, `Brief Bloom`, and `Rimed Pass` without changing canonical ready/filed route identity
- avoids new route frameworks, station pages, browser automation, committed screenshots, save schema changes, science/copy rewrites, geometry changes, lane-1 debug snapshot duplication, and lane-3 screenshot-proof duplication
- adds `docs/reports/2026-04-20-full-arc-route-state-matrix-implementation.md`
- `npm test -- src/test/field-requests.test.ts`, `npm run validate:agents`, and `git diff --check` pass; `npm run build` only if runtime TypeScript changes

Completion notes:

- Added `docs/reports/2026-04-20-full-arc-route-state-matrix-implementation.md`.
- Added a table-driven `field-requests` matrix covering all 11 live Route v2 notebook routes through active state, clue progress, ready-to-file, filing, and next-state handoff.
- Added live-only variant checks for `Wrack Shelter`, `Moist Hollow`, `Held Sand`, `Moist Edge`, `Thaw Window`, `Brief Bloom`, and `Rimed Pass` while keeping canonical ready/filed route identity stable.
- Verified `npm test -- src/test/field-requests.test.ts`.
- Rechecked `npm run build` after widening the local filed-text assertion helper to accept nullable display text from optional route-state lookups.
- Promoted `ECO-20260420-critic-341` to `READY`.

### ECO-20260420-critic-341

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-full-arc-route-state-matrix-review.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-main-341`

Goal:

- Review the lane-4 full-arc route-state matrix and confirm it stays test-only, route-focused, and aligned with packet `133`.

Acceptance:

- records findings or a clean review in `docs/reports/`
- confirms all 11 live Route v2 notebook routes are covered from active state through filing handoff
- confirms handoff-only ids stay out of the Route v2 matrix route list
- confirms process/world-state variants stay live-only and preserve canonical ready/filed route identity
- confirms no runtime route behavior, save schema, station page, browser automation, screenshot output, science/copy rewrite, geometry, or new route framework changed
- rechecks `npm test -- src/test/field-requests.test.ts`, `npm run validate:agents`, and `git diff --check`

Completion notes:

- Added `docs/reports/2026-04-20-full-arc-route-state-matrix-review.md` with no blocking findings.
- Confirmed the full-arc matrix covers all 11 live Route v2 notebook routes, treats survey/season requests as handoff-only, and keeps live-only variant titles from changing canonical ready/filed identity.
- Rechecked `npm test -- src/test/field-requests.test.ts`, `npm run build`, `npm run validate:agents`, and `git diff --check`.
- Promoted `ECO-20260420-scout-345` to `READY`.

### ECO-20260420-critic-327

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-alpha-runway-doc-sync-review.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `ECO-20260420-main-327`

Goal:

- Review the lane-2 contract for packet 130; details live in the packet.

Completion notes:

- Added `docs/reports/2026-04-20-alpha-runway-doc-sync-review.md` with no blocker.
- Confirmed README/project-memory wording names the filed `High Pass` alpha arc without promising season three, biome six, release dates, direct API mode, crafting, combat, inventory, or a broader planner.
- Rechecked `npm run validate:agents` and `git diff --check`.
- Promoted `ECO-20260420-scout-331` to `READY`.

### ECO-20260420-scout-331

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-playtest-comprehension-rubric-handoff.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-critic-327`

Goal:

- Prepare the lane-2 contract for packet 131.

Acceptance:

- identifies the playtest rubric target file and non-goals
- keeps the work focused on comprehension, emotional memory, science takeaways, and friction patterns
- avoids telemetry, analytics, runtime code, save schema, route logic, station behavior, and personal child data collection

Completion notes:

- Added `docs/reports/2026-04-20-playtest-comprehension-rubric-handoff.md`.
- Updated packet `131` with the lane-2 scout refinement.
- Promoted `ECO-20260420-main-331` to `READY`.

### ECO-20260420-main-331

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-playtest-comprehension-rubric-implementation.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-scout-331`

Goal:

- Add a docs-only playtest comprehension rubric for kids and adult observers.

Acceptance:

- creates `docs/playtest-comprehension-rubric.md`
- focuses on comprehension, emotional memory, science takeaways, and friction patterns rather than feature requests
- includes a feature-request parking-lot rule and a simple green/yellow/red follow-up triage
- avoids runtime code, telemetry, analytics, UI, save schema, route logic, station behavior, and personal child data collection
- `npm run validate:agents` and `git diff --check` pass

Completion notes:

- Added `docs/playtest-comprehension-rubric.md`.
- Added `docs/reports/2026-04-20-playtest-comprehension-rubric-implementation.md`.
- Kept the pass docs-only with no runtime, telemetry, analytics, UI, save schema, route logic, station behavior, content pack, or personal child data changes.
- Promoted `ECO-20260420-critic-331` to `READY`.

### ECO-20260420-scout-328

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-lane-3-alpha-screenshot-manifest-handoff.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `none`

Goal:

- Prepare the lane-3 contract for packet 130.

Acceptance:

- identifies exact screenshot-proof manifest targets
- narrows the lane-3 main implementation file and non-goals
- keeps the work out of runtime, geometry, route state, station UI, save schema, science-copy, and committed-output changes

Completion notes:

- Added `docs/reports/2026-04-20-lane-3-alpha-screenshot-manifest-handoff.md`.
- Confirmed existing spatial proof frames are scattered under ignored `output/` folders, so the main pass should add a source-tracked manifest instead of committing screenshots.
- Scoped the manifest to representative physical-memory frames across beach, corridor, forest climb/cave, treeline High Pass, and tundra relief.
- Promoted `ECO-20260420-main-328` to `READY`.

### ECO-20260420-main-327

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-alpha-runway-doc-sync-implementation.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `ECO-20260420-scout-327`

Goal:

- Sync README/progress/project-memory language to the completed High Pass alpha arc without inflating product promises.

Acceptance:

- README current-state language names the completed alpha arc through filed High Pass without promising season three, biome six, release dates, crafting, combat, inventory, or a broader planner
- progress/project-memory updates stay concise and non-duplicative
- dated historical reports are left intact
- `npm run validate:agents` and `git diff --check` pass

Completion notes:

- Updated `README.md` to name the completed current alpha arc through Root Hollow and filed `High Pass`.
- Updated `README.md` product direction to frame the next work as alpha hardening, playthrough review, and regression proof for the current five-biome world.
- Updated `.agents/project-memory.md` product summary with the same completed-arc framing.
- Added `docs/reports/2026-04-20-alpha-runway-doc-sync-implementation.md`.
- Promoted `ECO-20260420-critic-327` to `READY`.

### ECO-20260420-scout-329

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-lane-4-alpha-playthrough-checklist-handoff.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `none`

Goal:

- Prepare the lane-4 contract for packet 130.

Acceptance:

- identifies exact alpha route checklist targets
- narrows the lane-4 main implementation file and non-goals
- keeps the work out of runtime, station UI, broad copy, geometry, support behavior, and tests

Completion notes:

- Added `docs/reports/2026-04-20-lane-4-alpha-playthrough-checklist-handoff.md`.
- Confirmed packet `129` already provides strong final High Pass route-loop proof, so packet `130` lane 4 should create a reviewer-facing checklist rather than add new route behavior.
- Scoped proof gaps to documentation only, with instrumentation deferred to packet `131` and the deterministic route-state matrix deferred to packet `133`.
- Promoted `ECO-20260420-main-329` to `READY`.

### ECO-20260420-scout-327

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-alpha-runway-lane-2-doc-sync-handoff.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `none`

Goal:

- Prepare the lane-2 contract for packet 130.

Acceptance:

- identifies exact doc-sync targets for the completed High Pass alpha arc
- narrows the lane-2 main implementation files and non-goals
- keeps the work out of runtime, station state, route behavior, and dated report rewrites

Completion notes:

- Added `docs/reports/2026-04-20-alpha-runway-lane-2-doc-sync-handoff.md`.
- Confirmed `README.md` is broadly current but does not yet name the completed High Pass alpha arc.
- Confirmed `.agents/project-memory.md` already has the durable no-season-three/no-biome-six alpha runway guardrails.
- Promoted `ECO-20260420-main-327` to `READY`.

### ECO-20260420-scout-326

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-lane-1-review-drop-hygiene-handoff.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `none`

Goal:

- Prepare the lane-1 contract for packet 130.

Acceptance:

- identifies exact review-drop hygiene gaps
- narrows the lane-1 main implementation files and acceptance criteria
- keeps the work in lane-1 tooling/checklist scope

Completion notes:

- Added `docs/reports/2026-04-20-lane-1-review-drop-hygiene-handoff.md`.
- Confirmed `npm run validate:agents` passes in the source-complete workspace.
- Confirmed `npm pack --dry-run --json` is not enough for this repo's review-drop proof because it omits `package-lock.json`; the main pass should add an explicit archive and verification script instead.
- Promoted `ECO-20260420-main-326` to `READY`.

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
