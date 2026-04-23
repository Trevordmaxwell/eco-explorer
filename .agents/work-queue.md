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

### ECO-20260420-scout-403

- Status: `PARKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-critic-399`

Goal:

- Prepare the lane-2 contract for packet 149; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-main-403

- Status: `PARKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-scout-403`

Goal:

- Implement the lane-2 contract for packet 149; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-critic-403

- Status: `PARKED`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-main-403`

Goal:

- Review the lane-2 contract for packet 149; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-scout-407

- Status: `PARKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 scout: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-critic-403`

Goal:

- Prepare the lane-2 contract for packet 150; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-main-407

- Status: `PARKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-scout-407`

Goal:

- Implement the lane-2 contract for packet 150; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-critic-407

- Status: `PARKED`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-main-407`

Goal:

- Review the lane-2 contract for packet 150; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-scout-411

- Status: `PARKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 scout: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-critic-407`

Goal:

- Prepare the lane-2 contract for packet 151; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-main-411

- Status: `PARKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-scout-411`

Goal:

- Implement the lane-2 contract for packet 151; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-critic-411

- Status: `PARKED`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-main-411`

Goal:

- Review the lane-2 contract for packet 151; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-scout-415

- Status: `PARKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 scout: Field-season-board splitting wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
- Depends on: `ECO-20260420-critic-411`

Goal:

- Prepare the lane-2 contract for packet 152; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-main-415

- Status: `PARKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Field-season-board splitting wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
- Depends on: `ECO-20260420-scout-415`

Goal:

- Implement the lane-2 contract for packet 152; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-critic-415

- Status: `PARKED`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Field-season-board splitting wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
- Depends on: `ECO-20260420-main-415`

Goal:

- Review the lane-2 contract for packet 152; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-scout-419

- Status: `PARKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 scout: Save schema and migration hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
- Depends on: `ECO-20260420-critic-415`

Goal:

- Prepare the lane-2 contract for packet 153; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-main-419

- Status: `PARKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Save schema and migration hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
- Depends on: `ECO-20260420-scout-419`

Goal:

- Implement the lane-2 contract for packet 153; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-critic-419

- Status: `PARKED`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Save schema and migration hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
- Depends on: `ECO-20260420-main-419`

Goal:

- Review the lane-2 contract for packet 153; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-scout-423

- Status: `PARKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 scout: Performance, bundle, and error hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
- Depends on: `ECO-20260420-critic-419`

Goal:

- Prepare the lane-2 contract for packet 154; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-main-423

- Status: `PARKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Performance, bundle, and error hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
- Depends on: `ECO-20260420-scout-423`

Goal:

- Implement the lane-2 contract for packet 154; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-critic-423

- Status: `PARKED`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Performance, bundle, and error hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
- Depends on: `ECO-20260420-main-423`

Goal:

- Review the lane-2 contract for packet 154; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-scout-427

- Status: `PARKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 scout: External playtest feedback batch one`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
- Depends on: `ECO-20260420-critic-423`

Goal:

- Prepare the lane-2 contract for packet 155; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-main-427

- Status: `PARKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: External playtest feedback batch one`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
- Depends on: `ECO-20260420-scout-427`

Goal:

- Implement the lane-2 contract for packet 155; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-critic-427

- Status: `PARKED`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: External playtest feedback batch one`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
- Depends on: `ECO-20260420-main-427`

Goal:

- Review the lane-2 contract for packet 155; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-scout-431

- Status: `PARKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 scout: External playtest feedback batch two`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
- Depends on: `ECO-20260420-critic-427`

Goal:

- Prepare the lane-2 contract for packet 156; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-main-431

- Status: `PARKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: External playtest feedback batch two`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
- Depends on: `ECO-20260420-scout-431`

Goal:

- Implement the lane-2 contract for packet 156; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

### ECO-20260420-critic-431

- Status: `PARKED`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: External playtest feedback batch two`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
- Depends on: `ECO-20260420-main-431`

Goal:

- Review the lane-2 contract for packet 156; details live in the packet.

Note:

- Parked by packet `158` reconciliation as a stale alpha-runway tail; the current release path supersedes this blocked lane-2 chain.
- Reactivate only if packet `160` feedback triage specifically calls for this older packet scope instead of the packet `159` playtest path.

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

### ECO-20260423-scout-446

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P0`
- Title: `L1 scout: Alpha feedback gate owner override`
- Source: `docs/reports/2026-04-23-alpha-feedback-gate-owner-override.md`
- Packet: `.agents/packets/160-alpha-feedback-gate-owner-override.json`
- Depends on: `ECO-20260423-critic-445`

Goal:

- Record the packet 160 gate constraints and distinguish an owner override from real external playtest synthesis.

Acceptance:

- Gate report states no real external packet 159 session notes were available.
- Source to Shore can open only because the user explicitly approved the override and alpha RC passed.

Completion note:

- Completed in the integrated packet 160 gate pass.
- The gate report preserves the honesty boundary and selects Source to Shore beta under owner override.

### ECO-20260423-main-446

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P0`
- Title: `L1 implement: Alpha feedback gate owner override`
- Source: `docs/reports/2026-04-23-alpha-feedback-gate-owner-override.md`
- Packet: `.agents/packets/160-alpha-feedback-gate-owner-override.json`
- Depends on: `ECO-20260423-scout-446`

Goal:

- Run the alpha RC check and write the gate decision report.

Acceptance:

- `npm run alpha:rc` passes before Source to Shore implementation starts.
- The report selects one gate decision and does not fabricate playtest findings.

Completion note:

- `npm run alpha:rc` passed with `output/review-drops/eco-explorer-review-drop-20260423-124308.tgz`.
- Gate decision is `Source to Shore beta`, explicitly under user-approved override.

### ECO-20260423-critic-446

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P0`
- Title: `L1 review: Alpha feedback gate owner override`
- Source: `docs/reports/2026-04-23-alpha-feedback-gate-owner-override.md`
- Packet: `.agents/packets/160-alpha-feedback-gate-owner-override.json`
- Depends on: `ECO-20260423-main-446`

Goal:

- Review the gate decision for honesty, scope control, and Source to Shore readiness.

Acceptance:

- Confirms no external playtest evidence is claimed.
- Confirms no biome-six, broader planner, combat, crafting, inventory, economy, or direct API scope opens.

Completion note:

- Reviewed clean as an owner-overridden gate.
- Packet 166 may proceed as the narrow Source to Shore vertical slice.

### ECO-20260423-scout-447

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P0`
- Title: `L4 scout: Source to Shore vertical slice plan`
- Source: `docs/reports/2026-04-23-source-to-shore-vertical-slice-implementation.md`
- Packet: `.agents/packets/166-source-to-shore-vertical-slice.json`
- Depends on: `ECO-20260423-critic-446`

Goal:

- Narrow Source to Shore to a first vertical slice that reuses existing Route v2 and station seams.

Acceptance:

- Selects one route-grade slice instead of opening all five biomes.
- Keeps the scope inside existing route, station, map, journal, and debug snapshot seams.

Completion note:

- Completed by selecting `Source Shelter`: high rime/source clues to first shelter at Treeline Pass.

### ECO-20260423-main-447

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P0`
- Title: `L4 implement: Source to Shore vertical slice`
- Source: `docs/reports/2026-04-23-source-to-shore-vertical-slice-implementation.md`
- Packet: `.agents/packets/166-source-to-shore-vertical-slice.json`
- Depends on: `ECO-20260423-scout-447`

Goal:

- Implement the Source Shelter route, station/map/journal handoff, and debug snapshots.

Acceptance:

- Filed High Pass opens Source Shelter.
- Source Shelter can be active, ready-to-file, and filed through existing Route v2 behavior.
- Debug snapshots exist for active, ready-to-file, and filed Source to Shore states.

Completion note:

- Implemented `source-to-shore-source-shelter`, `source-to-shore-state.ts`, station/map/journal handoff, route-marker behavior, and active/ready/filed debug snapshots.
- Focused route/station/save snapshot tests passed.

### ECO-20260423-critic-447

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P0`
- Title: `L4 review: Source to Shore vertical slice`
- Source: `docs/reports/2026-04-23-source-to-shore-vertical-slice-review.md`
- Packet: `.agents/packets/166-source-to-shore-vertical-slice.json`
- Depends on: `ECO-20260423-main-447`

Goal:

- Review the slice for scope, readability, route-state stability, and future handoff clarity.

Acceptance:

- Confirms no new route framework, save schema, biome, planner, or inventory-style system landed.
- Confirms the first beta slice remains compact and test-backed.

Completion note:

- Reviewed clean in `docs/reports/2026-04-23-source-to-shore-vertical-slice-review.md`.
- Next Source to Shore work should stay small and continue only after full verification remains green.

### ECO-20260423-scout-448

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P0`
- Title: `L4 scout: Source to Shore route spine`
- Source: `docs/reports/2026-04-23-source-to-shore-route-spine-implementation.md`
- Packet: `.agents/packets/167-source-to-shore-route-spine.json`
- Depends on: `ECO-20260423-critic-447`

Goal:

- Scope the next Source to Shore push to one downstream proof beat after `Source Shelter`.

Acceptance:

- Selects exactly one follow-on beat.
- Keeps scope inside existing route, station, map, journal, atlas, and snapshot seams.

Completion note:

- Selected `Forest Release`: a Forest Trail seep/root/cool-release beat that proves Source to Shore can move shoreward without a new framework.

### ECO-20260423-main-448

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P0`
- Title: `L4 implement: Source to Shore route spine`
- Source: `docs/reports/2026-04-23-source-to-shore-route-spine-implementation.md`
- Packet: `.agents/packets/167-source-to-shore-route-spine.json`
- Depends on: `ECO-20260423-scout-448`

Goal:

- Implement `Forest Release` after filed `Source Shelter` using existing Route v2 and station/notebook behavior.

Acceptance:

- Filed `Source Shelter` opens `Forest Release`.
- `Forest Release` can be active, ready-to-file, and filed through existing Route v2 behavior.
- Debug snapshots cover the downstream ready-to-file and filed states.

Completion note:

- Implemented `source-to-shore-forest-release`, expanded the Source to Shore state helper, and added route/station/snapshot coverage.
- Focused content-quality, field-request, field-season-board, and save-snapshot tests passed; `npm run alpha:rc` passed with `output/review-drops/eco-explorer-review-drop-20260423-132343.tgz`.

### ECO-20260423-critic-448

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P0`
- Title: `L4 review: Source to Shore route spine`
- Source: `docs/reports/2026-04-23-source-to-shore-route-spine-review.md`
- Packet: `.agents/packets/167-source-to-shore-route-spine.json`
- Depends on: `ECO-20260423-main-448`

Goal:

- Review the route spine for scope, readability, route-state stability, and future handoff clarity.

Acceptance:

- Confirms no new route framework, save schema, biome, planner, inventory, economy, combat, or API mode landed.
- Confirms the two-beat Source to Shore spine remains compact and test-backed.

Completion note:

- Reviewed clean in `docs/reports/2026-04-23-source-to-shore-route-spine-review.md`.
- Browser proof found no console errors, and the final alpha RC gate passed; next Source to Shore work should remain one connective beat at a time.

### ECO-20260423-scout-442

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P0`
- Title: `L1 scout: Alpha playtest run kit plan`
- Source: `docs/reports/2026-04-23-alpha-rc-reconciliation.md`
- Packet: `.agents/packets/159-alpha-playtest-kit-and-observation-protocol.json`
- Depends on: `ECO-20260421-critic-438`

Goal:

- Prepare the run/install/save-reset handoff for external alpha playtests using the verified RC artifact and local fallback commands.

Acceptance:

- Names exact docs/files to touch for run sheet, save reset, RC artifact location, and crash/console checklist.
- Keeps the work documentation-only and avoids gameplay, content, geometry, route, station, and save behavior changes.
- Promotes `ECO-20260423-main-442` with verification expectations.

Completion note:

- Completed as part of the integrated packet `159` playtest-kit pass.
- Mapped the lane-owned playtest protocol scope into `docs/alpha-playtest-kit.md` and `docs/playtest-comprehension-rubric.md` without runtime or gameplay changes.

### ECO-20260423-main-442

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P0`
- Title: `L1 implement: Alpha playtest run kit`
- Source: `docs/reports/2026-04-23-alpha-rc-reconciliation.md`
- Packet: `.agents/packets/159-alpha-playtest-kit-and-observation-protocol.json`
- Depends on: `ECO-20260423-scout-442`

Goal:

- Implement the run sheet, save-reset instructions, RC artifact location, and crash/console checklist for an external alpha playtest observer.

Acceptance:

- A non-developer observer can start a session and know what to record if install, console, or save issues appear.
- No gameplay, content, geometry, route, station, or save behavior changes land.
- `npm run validate:agents` passes after queue/packet updates.

Completion note:

- Implemented by adding the packet `159` alpha playtest kit and expanding the comprehension rubric with lane-specific observer checklists.
- No gameplay, content implementation, geometry, route behavior, station state, save schema, or support behavior changed.

### ECO-20260423-critic-442

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P0`
- Title: `L1 review: Alpha playtest run kit`
- Source: `docs/reports/2026-04-23-alpha-rc-reconciliation.md`
- Packet: `.agents/packets/159-alpha-playtest-kit-and-observation-protocol.json`
- Depends on: `ECO-20260423-main-442`

Goal:

- Review the playtest run kit for practical repeatability and handoff clarity.

Acceptance:

- Confirms an observer can run the session from the RC artifact or local fallback.
- Flags any missing install/save/console capture step before packet `159` closes.

Completion note:

- Reviewed clean in `docs/reports/2026-04-23-alpha-playtest-kit-review.md`.
- The kit is ready for real sessions; packet `160` should wait until actual playtest notes exist.

### ECO-20260423-scout-443

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P0`
- Title: `L2 scout: Alpha science comprehension protocol plan`
- Source: `docs/reports/2026-04-23-alpha-rc-reconciliation.md`
- Packet: `.agents/packets/159-alpha-playtest-kit-and-observation-protocol.json`
- Depends on: `ECO-20260421-critic-438`

Goal:

- Prepare the kid-facing comprehension and adult observer science prompts for 6-10 alpha sessions.

Acceptance:

- Identifies the smallest docs/rubric sections to edit for science understanding, copy load, and adult observer notes.
- Keeps the work out of gameplay, route behavior, geometry, station state, and new content implementation.
- Promotes `ECO-20260423-main-443` with content-quality expectations if needed.

Completion note:

- Completed as part of the integrated packet `159` playtest-kit pass.
- Mapped the lane-owned playtest protocol scope into `docs/alpha-playtest-kit.md` and `docs/playtest-comprehension-rubric.md` without runtime or gameplay changes.

### ECO-20260423-main-443

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P0`
- Title: `L2 implement: Alpha science comprehension protocol`
- Source: `docs/reports/2026-04-23-alpha-rc-reconciliation.md`
- Packet: `.agents/packets/159-alpha-playtest-kit-and-observation-protocol.json`
- Depends on: `ECO-20260423-scout-443`

Goal:

- Implement the science comprehension prompts and adult observer notes for consistent alpha sessions.

Acceptance:

- Questions are age-appropriate, non-leading, science-safe, and compact.
- No gameplay, route behavior, geometry, station state, or new content implementation lands.

Completion note:

- Implemented by adding the packet `159` alpha playtest kit and expanding the comprehension rubric with lane-specific observer checklists.
- No gameplay, content implementation, geometry, route behavior, station state, save schema, or support behavior changed.

### ECO-20260423-critic-443

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P0`
- Title: `L2 review: Alpha science comprehension protocol`
- Source: `docs/reports/2026-04-23-alpha-rc-reconciliation.md`
- Packet: `.agents/packets/159-alpha-playtest-kit-and-observation-protocol.json`
- Depends on: `ECO-20260423-main-443`

Goal:

- Review the science comprehension protocol for age fit and accuracy.

Acceptance:

- Confirms prompts capture ecosystem understanding without coaching answers.
- Hands off any post-playtest science question to packet `160` rather than blocking packet `159`.

Completion note:

- Reviewed clean in `docs/reports/2026-04-23-alpha-playtest-kit-review.md`.
- The kit is ready for real sessions; packet `160` should wait until actual playtest notes exist.

### ECO-20260423-scout-444

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Alpha spatial observation checklist plan`
- Source: `docs/reports/2026-04-23-alpha-rc-reconciliation.md`
- Packet: `.agents/packets/159-alpha-playtest-kit-and-observation-protocol.json`
- Depends on: `ECO-20260421-critic-438`

Goal:

- Prepare the spatial/place-memory observation checklist for watching where players hesitate, explore, and remember places.

Acceptance:

- Names exact docs/report surfaces to touch for visual readability, place memory, and traversal hesitation observations.
- Avoids new geometry, screenshots, source-tracked generated output, and route behavior changes.
- Promotes `ECO-20260423-main-444` with review expectations.

Completion note:

- Completed as part of the integrated packet `159` playtest-kit pass.
- Mapped the lane-owned playtest protocol scope into `docs/alpha-playtest-kit.md` and `docs/playtest-comprehension-rubric.md` without runtime or gameplay changes.

### ECO-20260423-main-444

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: Alpha spatial observation checklist`
- Source: `docs/reports/2026-04-23-alpha-rc-reconciliation.md`
- Packet: `.agents/packets/159-alpha-playtest-kit-and-observation-protocol.json`
- Depends on: `ECO-20260423-scout-444`

Goal:

- Implement the visual/spatial observation checklist for place memory, hesitation, and traversal readability.

Acceptance:

- Checklist entries are observable during a live session.
- No new geometry, screenshots, source-tracked generated output, or route behavior changes land.

Completion note:

- Implemented by adding the packet `159` alpha playtest kit and expanding the comprehension rubric with lane-specific observer checklists.
- No gameplay, content implementation, geometry, route behavior, station state, save schema, or support behavior changed.

### ECO-20260423-critic-444

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: Alpha spatial observation checklist`
- Source: `docs/reports/2026-04-23-alpha-rc-reconciliation.md`
- Packet: `.agents/packets/159-alpha-playtest-kit-and-observation-protocol.json`
- Depends on: `ECO-20260423-main-444`

Goal:

- Review the spatial checklist for concrete place-memory and hesitation signals.

Acceptance:

- Confirms an observer can record where players remember, miss, or hesitate without needing developer knowledge.
- Leaves geometry and screenshot proof out unless a later playtest finding requires it.

Completion note:

- Reviewed clean in `docs/reports/2026-04-23-alpha-playtest-kit-review.md`.
- The kit is ready for real sessions; packet `160` should wait until actual playtest notes exist.

### ECO-20260423-scout-445

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Alpha route and support observation plan`
- Source: `docs/reports/2026-04-23-alpha-rc-reconciliation.md`
- Packet: `.agents/packets/159-alpha-playtest-kit-and-observation-protocol.json`
- Depends on: `ECO-20260421-critic-438`

Goal:

- Prepare the route/support/replay observation checklist for active, ready-to-file, filed, support-choice, and motivation states.

Acceptance:

- Identifies exact docs/rubric surfaces to touch for route clarity and support-choice observations.
- Avoids new Route v2 framework, support HUD, station shell changes, geometry, and runtime behavior changes.
- Promotes `ECO-20260423-main-445` with targeted proof expectations if needed.

Completion note:

- Completed as part of the integrated packet `159` playtest-kit pass.
- Mapped the lane-owned playtest protocol scope into `docs/alpha-playtest-kit.md` and `docs/playtest-comprehension-rubric.md` without runtime or gameplay changes.

### ECO-20260423-main-445

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Alpha route and support observation checklist`
- Source: `docs/reports/2026-04-23-alpha-rc-reconciliation.md`
- Packet: `.agents/packets/159-alpha-playtest-kit-and-observation-protocol.json`
- Depends on: `ECO-20260423-scout-445`

Goal:

- Implement the route/support/replay observation checklist for active, ready-to-file, filed, support choice, and motivation signals.

Acceptance:

- Checklist distinguishes active outing, notebook-ready, filed, replay, and support-choice comprehension.
- No route framework, support behavior, station shell, runtime, or geometry change lands.

Completion note:

- Implemented by adding the packet `159` alpha playtest kit and expanding the comprehension rubric with lane-specific observer checklists.
- No gameplay, content implementation, geometry, route behavior, station state, save schema, or support behavior changed.

### ECO-20260423-critic-445

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Alpha route and support observation checklist`
- Source: `docs/reports/2026-04-23-alpha-rc-reconciliation.md`
- Packet: `.agents/packets/159-alpha-playtest-kit-and-observation-protocol.json`
- Depends on: `ECO-20260423-main-445`

Goal:

- Review the route/support checklist for practical observation and motivation signals.

Acceptance:

- Confirms the protocol will catch active/ready/filed/support confusion.
- Keeps beta Route v2 expansion blocked until packet `160` feedback triage.

Completion note:

- Reviewed clean in `docs/reports/2026-04-23-alpha-playtest-kit-review.md`.
- The kit is ready for real sessions; packet `160` should wait until actual playtest notes exist.
