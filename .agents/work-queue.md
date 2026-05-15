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
- Fresh lane agents should read `.agents/fresh-lane-start.md` before choosing work; it records the current director gate and copy-paste startup prompts.
- Before every new item, lane runners should reread `AGENTS.md`, `.agents/fresh-lane-start.md`, `.agents/lane-runner.md`, `.agents/project-memory.md`, `.agents/work-queue.md`, the lane brief, the packet, and the matching role file.
- The queue item's `Owner` still decides which hat the lane runner wears for that step.
- Items without a `Lane:` field are legacy or archived unless explicitly reactivated.

## Active Lanes

- `lane-1`: playability, systems, progression, station, routes, support, replay, season pages, expeditions, and integration proof
- `lane-2`: world richness, science content, atlas and journal payoff, close-look, sketchbook, spatial readability, vertical traversal, and sub-ecosystem depth

Former `lane-3` work now routes through `lane-2`. Former `lane-4` work now routes through `lane-1`. Historical done items may keep old lane labels.

## Current Director Gate

- Packet `182` is closed, and packet `192` is closed with clean route-loop cohesion signoff.
- Packet `193` is the active RC/playtest-readiness sprint.
- Lane 1 should start `ECO-20260515-scout-01`.
- Lane 2 should start `ECO-20260515-scout-02`.
- Do not start feature expansion, new routes, new content breadth, new station pages, or old external-feedback packet tails during packet `193`.
- Lane 3 and lane 4 are retired labels; route former lane 3 work through lane 2 and former lane 4 work through lane 1.

## Ready

### ECO-20260515-scout-01

- Status: `READY`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P0`
- Title: `L1 scout: RC playtest smoke contract`
- Source: `docs/reports/2026-05-15-rc-playtest-readiness-plan.md`
- Packet: `.agents/packets/193-rc-playtest-readiness.json`
- Depends on: `ECO-20260514-critic-04`
- Recommended effort: `high`

Goal:

- Scope the smallest internal RC playtest smoke pass for the current committed build, including boot, input, save setup, native `256x160` player-facing screenshots, console health, and review-drop/RC artifact expectations.

Acceptance:

- Names exact slices, proof folder, commands, screenshots/state files, and pass/fail thresholds for `ECO-20260515-main-01`.
- Keeps scope to proof and issue finding; no feature, content, station, route, save, or traversal implementation.
- Promotes `ECO-20260515-main-01` only if the contract is concrete.

### ECO-20260515-scout-02

- Status: `READY`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P0`
- Title: `L2 scout: Playtest kit refresh contract`
- Source: `docs/reports/2026-05-15-rc-playtest-readiness-plan.md`
- Packet: `.agents/packets/193-rc-playtest-readiness.json`
- Depends on: `ECO-20260514-critic-04`
- Recommended effort: `high`

Goal:

- Scope the smallest documentation refresh that makes `docs/alpha-playtest-kit.md` and `docs/playtest-comprehension-rubric.md` current for the post-packet-192 build, the active two-lane model, and external observer privacy.

Acceptance:

- Names exact doc sections that need updates and any sections that should stay unchanged.
- Keeps scope docs-only; no runtime, content, station, route, save, overlay, or progression changes.
- Promotes `ECO-20260515-main-02` only if the refresh contract is concrete.

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

### ECO-20260515-main-01

- Status: `PARKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P0`
- Title: `L1 implement: RC playtest smoke pass`
- Source: `docs/reports/2026-05-15-rc-playtest-readiness-plan.md`
- Packet: `.agents/packets/193-rc-playtest-readiness.json`
- Depends on: `ECO-20260515-scout-01`
- Recommended effort: `high`

Goal:

- Run the scoped internal RC playtest smoke pass, capture evidence, and write a severity-ordered report that says whether the current build is ready for observed external sessions.

Acceptance:

- Records RC/review-drop status, commands run, proof artifacts, screenshots/state files, console health, and any blocker findings.
- Opens only smallest explicit blocker items if a P0/P1 issue appears.
- Does not land feature, content, route, station, save, traversal, or observer-doc scope.

### ECO-20260515-critic-01

- Status: `PARKED`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P0`
- Title: `L1 review: RC playtest smoke findings`
- Source: `docs/reports/2026-05-15-rc-playtest-readiness-plan.md`
- Packet: `.agents/packets/193-rc-playtest-readiness.json`
- Depends on: `ECO-20260515-main-01`
- Recommended effort: `high`

Goal:

- Review the internal smoke pass and decide whether any player-facing blocker prevents external observed sessions.

Acceptance:

- Confirms evidence, commands, screenshots/state proof, and console/error status.
- Either clears the lane-1 smoke gate or opens the smallest explicit blocker.

### ECO-20260515-main-02

- Status: `PARKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P0`
- Title: `L2 implement: Refresh playtest kit docs`
- Source: `docs/reports/2026-05-15-rc-playtest-readiness-plan.md`
- Packet: `.agents/packets/193-rc-playtest-readiness.json`
- Depends on: `ECO-20260515-scout-02`
- Recommended effort: `high`

Goal:

- Update the playtest kit and comprehension rubric so external observers can run the current build safely and classify findings by the active two-lane model.

Acceptance:

- Updates only documentation and related handoff notes.
- Preserves privacy rules and explicitly avoids claiming real external feedback.
- Runs `npm run validate:agents` after queue or packet edits and `git diff --check`.

### ECO-20260515-critic-02

- Status: `PARKED`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Playtest kit refresh`
- Source: `docs/reports/2026-05-15-rc-playtest-readiness-plan.md`
- Packet: `.agents/packets/193-rc-playtest-readiness.json`
- Depends on: `ECO-20260515-main-02`
- Recommended effort: `high`

Goal:

- Review the refreshed observer docs for clarity, privacy, science-safe prompts, and two-lane routing.

Acceptance:

- Confirms the kit is usable by a non-developer observer and does not collect identifying child data.
- Either clears the lane-2 docs gate or opens the smallest explicit blocker.

### ECO-20260515-critic-03

- Status: `PARKED`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P0`
- Title: `L1 review: RC playtest readiness signoff`
- Source: `docs/reports/2026-05-15-rc-playtest-readiness-plan.md`
- Packet: `.agents/packets/193-rc-playtest-readiness.json`
- Depends on: `ECO-20260515-critic-01`, `ECO-20260515-critic-02`
- Recommended effort: `xhigh`

Goal:

- Make the final packet `193` readiness decision after the internal smoke proof and observer-doc refresh both have clean reviews.

Acceptance:

- Marks packet `193` done only if external observed sessions can begin without known P0/P1 blockers.
- If not clean, leaves packet `193` open and queues only the smallest blocker work.
- Records whether the next move is external playtest sessions, blocker repair, or another director decision.

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

### ECO-20260514-critic-04

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Route-loop cohesion signoff`
- Source: `docs/reports/2026-05-14-route-loop-cohesion-signoff-review.md`
- Packet: `.agents/packets/192-director-playability-sprint.json`
- Depends on: `ECO-20260514-main-07`
- Recommended effort: `high`

Goal:

- Review active outing, ready-to-file, filed closure, support choice, replay labels, and route-boundary behavior across debug saves.

Acceptance:

- Confirms route-loop work did not drift into lane 2 content/spatial scope or unscoped station architecture.
- Opens smallest explicit blockers if route identity or filed Source to Shore closure is ambiguous.

Completion note:

- Reviewed the route-loop helper extraction, filed Source to Shore revisit proof, route-boundary report, board/request/runtime/snapshot coverage, and native browser proof artifacts.
- Found no blockers: active outing, ready-to-file, filed closure, support choice, replay labels, and filed Source to Shore memories remain coherent.
- Confirmed no new route ids, fourth Source to Shore beat, route marker target after filed Dune Catch, save schema, planner/station architecture, lane-2 content/spatial scope, world-map behavior, content, or geometry drift.
- Added `docs/reports/2026-05-14-route-loop-cohesion-signoff-review.md` and marked packet `192` `DONE` at version `18`.
- Verification passed: focused route-loop board/request/runtime/snapshot tests and `npm run build`.
- Lane 1 and lane 2 have no remaining actionable packet `192` items.

### ECO-20260514-main-07

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Filed Source to Shore revisit proof`
- Source: `docs/reports/2026-05-14-filed-source-to-shore-revisit-proof.md`
- Packet: `.agents/packets/192-director-playability-sprint.json`
- Depends on: `ECO-20260514-main-06`
- Recommended effort: `high`

Goal:

- Decide whether filed Source to Shore memories need a tiny non-active surfacing pass.

Acceptance:

- Reuses existing revisit-memory seams if implementation is needed.
- Does not reopen an active outing, route marker, fourth beat, save state, planner, or new route type.

Completion note:

- Closed the item as proof-only: existing quiet filed-memory notices already surface High Source, Forest Release, and Coastal Catch when revisiting Treeline, Forest, and Coastal Scrub.
- Captured native browser proof under `output/lane-1-main-07-source-to-shore-revisit-proof/` with screenshots, paired state JSON, `assertions.json`, and empty `browser-errors.json`.
- Confirmed filed `source-to-shore-beta` remains complete with no active field request, route marker target, active beat, replay note, fourth Source to Shore beat, save, planner, station-page, route-id, world-map, content, or geometry drift.
- Added `docs/reports/2026-05-14-filed-source-to-shore-revisit-proof.md` and updated packet `192` to version `17`.
- Verification passed: focused Source-to-Shore filed-memory runtime and board tests.
- Promoted `ECO-20260514-critic-04` to `READY`.

### ECO-20260514-main-06

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Extract route replay-note helper`
- Source: `docs/reports/2026-05-14-route-replay-note-helper-extraction.md`
- Packet: `.agents/packets/192-director-playability-sprint.json`
- Depends on: `ECO-20260514-scout-04`
- Recommended effort: `high`

Goal:

- Move route replay-note resolution out of field-season board assembly into a small route-owned helper without behavior changes.

Acceptance:

- Focused tests confirm replay notes, filed identities, route titles, support behavior, and station board output are unchanged.
- Adds no new replay system, copy expansion, route breadth, or save field.

Completion note:

- Added `src/engine/field-season-replay-notes.ts` and moved route replay-note resolution plus active-beat decoration out of `src/engine/field-season-board.ts`.
- Confirmed filed Source to Shore still resolves complete with `targetBiomeId: null`, `activeBeatId: null`, and `replayNote: null`; no route ids, fourth beat, evidence slots, route marker target, save schema, station page, content, world-map behavior, or geometry changed.
- Added `docs/reports/2026-05-14-route-replay-note-helper-extraction.md` and updated packet `192` to version `16`.
- Verification passed: focused replay/Source-to-Shore/filed route tests and `npm run build`.
- Promoted `ECO-20260514-main-07` to `READY`.

### ECO-20260514-scout-04

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Post-Source-to-Shore route boundary`
- Source: `docs/reports/2026-05-14-post-source-to-shore-route-boundary.md`
- Packet: `.agents/packets/192-director-playability-sprint.json`
- Depends on: `ECO-20260514-critic-01`
- Recommended effort: `high`

Goal:

- Define how any later second-season playable route can appear without fighting filed Dune Catch as the terminal Source to Shore beat.

Acceptance:

- Produces a report or packet-first contract, with test-only guards if needed.
- Adds no playable route, route id, save schema, station shell, content pack, or geometry.

Completion note:

- Wrote `docs/reports/2026-05-14-post-source-to-shore-route-boundary.md`.
- Confirmed filed Source to Shore remains terminal after `Dune Catch`; only existing filed-arc copy and quiet revisit-memory seams are allowed.
- Updated packet `192` to version `15` with the main-06 extraction contract and promoted `ECO-20260514-main-06` to `READY`.
- No runtime code changed; `npm run validate:agents` and `git diff --check` passed after the queue and packet updates.

### ECO-20260514-critic-03

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Vertical sprint closure`
- Source: `docs/reports/2026-05-14-vertical-sprint-closure-review.md`
- Packet: `.agents/packets/192-director-playability-sprint.json`
- Depends on: `ECO-20260514-main-05`
- Recommended effort: `high`

Goal:

- Review vertical proof, prompt competition, recovery paths, and lane boundary compliance.

Acceptance:

- Confirms no visual clutter, prompt conflicts, route drift, station drift, or broad engine rewrite.
- Opens smallest explicit blockers if native proof is not clear.

Completion note:

- Reviewed tundra relief and forest giant-tree loop proof-only closures as clean.
- Confirmed empty browser-error captures, focused test coverage, controlled prompt/cue behavior, and no station, route, world-map, save, support, replay, progression, traversal-framework, or broad engine drift.
- Verification passed: focused tundra/forest biome tests, focused runtime smoke tests, `git diff --check`, and `npm run validate:agents`.
- Lane 2 has no remaining actionable packet `192` queue item after this review.

### ECO-20260514-main-05

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Forest giant-tree loop proof`
- Source: `docs/reports/2026-05-14-forest-giant-tree-loop-proof.md`
- Packet: `.agents/packets/192-director-playability-sprint.json`
- Depends on: `ECO-20260514-main-04`
- Recommended effort: `high`

Goal:

- Consolidate proof for the full old-growth climb loop from trunk foot through crown/rest pockets and return.

Acceptance:

- Treats proof-only closure as success if the loop is already readable.
- If needed, adds only one forest-local cue, carrier, or platform nudge.

Completion note:

- Closed as proof-only: the existing native lower-cave and upper-run browser proof plus current old-growth runtime/biome tests already cover the full loop.
- Added `docs/reports/2026-05-14-forest-giant-tree-loop-proof.md`.
- Verification passed: focused `forest-biome` old-growth/high-run/root-hollow tests and focused `runtime-smoke` old-growth/crown-rest/branch-nursery/return tests.
- Promoted `ECO-20260514-critic-03` to `READY` for vertical sprint closure review.

### ECO-20260514-main-04

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Tundra relief clarity pass`
- Source: `docs/reports/2026-05-14-tundra-relief-clarity-proof-closure.md`
- Packet: `.agents/packets/192-director-playability-sprint.json`
- Depends on: `ECO-20260514-scout-03`
- Recommended effort: `high`

Goal:

- Proof-close the tundra relief clarity pass without runtime changes unless a fresh issue appears.

Acceptance:

- Native proof and focused tundra/runtime tests confirm readability.
- No new route beat, species pack, station affordance, cue language, geometry, or traversal framework lands.

Completion note:

- Closed as a proof-only no-runtime pass after the scout proof found the current tundra run readable at native `256x160`.
- Added `docs/reports/2026-05-14-tundra-relief-clarity-proof-closure.md`.
- Verification passed: `npm test -- --run src/test/tundra-biome.test.ts src/test/runtime-smoke.test.ts -t "Thaw Window|thaw-window|tundra|snow-edge|thaw-skirt|meltwater"`.
- Promoted `ECO-20260514-main-05` to `READY` for forest giant-tree loop proof.

### ECO-20260514-scout-03

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Tundra snow-edge wayfinding proof`
- Source: `docs/reports/2026-05-14-tundra-snow-edge-wayfinding-proof.md`
- Packet: `.agents/packets/192-director-playability-sprint.json`
- Depends on: `ECO-20260514-critic-02`
- Recommended effort: `high`

Goal:

- Proof the current tundra snow-edge, snow-meadow, thaw-skirt, and meltwater-edge run at native `256x160`.

Acceptance:

- Decides whether proof-only closure is enough or one tiny tundra-local cue is needed.
- Leaves route, station, save, and broad traversal architecture untouched.

Completion note:

- Captured fresh native `256x160` browser proof for wind-bluff entry, snow-edge pocket, snow-meadow drift rest, thaw-skirt entry, thaw-skirt channel, and meltwater-edge bank under `output/lane-2-scout-03-tundra-wayfinding-proof/`.
- Reviewed the proof as clean: no optional tundra-local cue, geometry nudge, new cue language, route change, station change, save change, or traversal framework work is needed.
- Focused tundra/runtime tests passed, browser proof recorded zero console or page errors, packet `192` is version `11`, and `ECO-20260514-main-04` is promoted to `READY` as a proof-only no-runtime closure.

### ECO-20260514-critic-02

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Content richness science signoff`
- Source: `docs/reports/2026-05-14-content-richness-science-signoff-review.md`
- Packet: `.agents/packets/192-director-playability-sprint.json`
- Depends on: `ECO-20260514-main-03`
- Recommended effort: `high`

Goal:

- Review lane 2's content payoff for science safety, copy budgets, and journal/archive crowding.

Acceptance:

- Confirms focused content tests, science check, build, and lane independence.
- Opens smallest source or readability blockers if needed.

Completion note:

- Reviewed the sketchbook archive parity and `coyote-brush` close-look payoff as clean.
- Confirmed source safety, compact copy, focused test coverage, and no station, route, map, save, overlay, journal-shell, or progression drift.
- Verification reviewed: science check, sketchbook/content-quality tests, close-look/content-quality tests, build, and diff check passed.
- Promoted `ECO-20260514-scout-03` to `READY` for the tundra snow-edge wayfinding proof; implementation steps remain parked behind that scout proof.

### ECO-20260514-main-03

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: One close-look payoff`
- Source: `docs/reports/2026-05-14-coyote-brush-close-look-implementation.md`
- Packet: `.agents/packets/192-director-playability-sprint.json`
- Depends on: `ECO-20260514-main-02`
- Recommended effort: `high`

Goal:

- Add at most one high-value close-look card if the scout contract confirms source and copy fit.

Acceptance:

- Reuses the existing close-look seam and focused tests.
- Adds no new overlay, journal shell, route behavior, or station behavior.

Completion note:

- Added `coyote-brush` to the existing close-look seed map with compact habitat-structure copy and two callouts.
- Added focused close-look tests for support detection and payload output.
- Verification passed: close-look/content-quality tests, `npm run science:check`, `npm run build`, and `git diff --check`.
- Promoted `ECO-20260514-critic-02` to `READY` for lane-2 science/readability review.

### ECO-20260514-main-02

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Compact sketchbook archive parity`
- Source: `docs/reports/2026-05-14-sketchbook-archive-parity-implementation.md`
- Packet: `.agents/packets/192-director-playability-sprint.json`
- Depends on: `ECO-20260514-scout-02`
- Recommended effort: `high`

Goal:

- Add selected sketchbook or archive payoff lines for route-defining and habitat-defining entries only.

Acceptance:

- Stays in content, source ledger, and content-focused tests.
- Improves payoff without adding ecosystem-note crowding or new journal surfaces.

Completion note:

- Added compact authored sketchbook notes for `licorice-fern`, `banana-slug`, `fir-cone`, `hoary-marmot`, `purple-saxifrage`, and `cloudberry`; preserved the existing `coyote-brush` note.
- Added a content-quality guard so all seven selected route-memory entries keep authored sketchbook notes.
- Verification passed: `npm run science:check`, focused sketchbook/content-quality tests, and `npm run build`.
- Promoted `ECO-20260514-main-03` to `READY` for the single close-look payoff scoped to `coyote-brush`.

### ECO-20260514-scout-02

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Atlas parity and source-risk contract`
- Source: `docs/reports/2026-05-14-atlas-parity-source-risk-contract.md`
- Packet: `.agents/packets/192-director-playability-sprint.json`
- Depends on: `ECO-20260514-critic-01`
- Recommended effort: `high`

Goal:

- Scope compact archive/sketchbook payoff and source-risk checks for entries that lack strong existing atlas value.

Acceptance:

- Identifies a small content-only target set, with science-ledger risks and copy budgets called out.
- Avoids station, route, world-map, save, broad overlay, and progression files.

Completion note:

- Wrote `docs/reports/2026-05-14-atlas-parity-source-risk-contract.md` with a seven-entry sketchbook archive parity target set, source-risk notes, copy budget, allowed files, explicit station/route/save exclusions, and the optional `coyote-brush` close-look candidate for the later lane-2 payoff step.
- Verified the current content baseline with `npm run science:check`.
- Promoted `ECO-20260514-main-02` to `READY`; later lane-2 implementation/review steps remain parked behind their dependencies.

### ECO-20260514-critic-01

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P0`
- Title: `L1 review: Handheld readability gate`
- Source: `docs/reports/2026-05-14-handheld-readability-gate-review.md`
- Packet: `.agents/packets/192-director-playability-sprint.json`
- Depends on: `ECO-20260514-main-01`
- Recommended effort: `xhigh`

Goal:

- Review lane 1's visual repair and decide whether the sprint can open lane-parallel breadth.

Acceptance:

- Confirms native proof, tests, build, and no station/progression drift.
- Opens smallest explicit blockers if any key surface still overlaps or clips.

Completion note:

- Reviewed native `256x160` title, first-play, filed station, filed world-map, and Source Shelter journal proof plus paired state JSON and browser-error output.
- Confirmed the old handheld blocker is closed without route id, route breadth, station page, save schema, progression shape, content pack, or journal-surface drift.
- Verified focused runtime/station/request/journal tests and `npm run build`.
- Promoted `ECO-20260514-scout-02` and `ECO-20260514-scout-04` to `READY`; later implementation steps remain parked until their scout contracts land.

### ECO-20260514-main-01

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P0`
- Title: `L1 implement: Critical handheld readability repairs`
- Source: `docs/reports/2026-05-14-handheld-readability-repair.md`
- Packet: `.agents/packets/192-director-playability-sprint.json`
- Depends on: `ECO-20260514-scout-01`
- Recommended effort: `xhigh`

Goal:

- Repair the filed Source to Shore station overlap plus the title, first-play notice, and journal route-card fit issues at native `256x160`.

Acceptance:

- Native browser proof shows no critical overlap on title, first-play, filed Dune Catch station, filed Dune Catch world map, and Source Shelter journal states.
- Route/progression/debug state remains behaviorally stable and focused tests plus build pass.

Completion note:

- Wrapped first-play field-request notice copy, shortened the title hint, compacted the filed Source to Shore station route page, and stacked long journal route-card progress labels without changing route ids, progression, save schema, station pages, content packs, or journal surfaces.
- Captured native `256x160` proof in `output/lane-1-main-01-handheld-readability/` plus shared browser-game client proof in `output/lane-1-main-01-web-game-client/`.
- Verification passed: focused runtime/station/request/journal tests, `npm run build`, visual proof review, and zero browser console errors in the captured proof.
- Promoted `ECO-20260514-critic-01` to `READY` for the visual gate review.

### ECO-20260514-scout-01

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P0`
- Title: `L1 scout: Handheld readability repair contract`
- Source: `docs/reports/2026-05-14-handheld-readability-repair-contract.md`
- Packet: `.agents/packets/192-director-playability-sprint.json`
- Depends on: `ECO-20260428-critic-489`
- Recommended effort: `xhigh`

Goal:

- Turn the director browser proof into the smallest lane-1 repair contract for filed Source to Shore station readability, title guidance fit, and the Source Shelter journal route card.

Acceptance:

- Names exact surfaces, screenshots, and tests required for the repair.
- Keeps scope inside handheld UI clarity and avoids progression, route, content, save, or station-page expansion.

Completion note:

- Wrote `docs/reports/2026-05-14-handheld-readability-repair-contract.md` with exact proof seeds, repair targets, likely files, required native browser artifacts, and focused test/build expectations.
- Promoted `ECO-20260514-main-01` to `READY` and kept lane 2 parked behind `ECO-20260514-critic-01`.

### ECO-20260428-critic-489

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Beta expansion integration signoff`
- Source: `docs/reports/2026-05-14-beta-expansion-integration-signoff-review.md`
- Packet: `.agents/packets/182-beta-expansion-integration-signoff.json`
- Depends on: `ECO-20260428-main-489`

Goal:

- Review the integration signoff and decide whether the push is clean.

Acceptance:

- Confirms no hidden blockers remain.
- Marks packet `182` done or opens smallest explicit blockers.

Completion note:

- Reviewed the packet `182` signoff as complete but blocked: validation, science check, full tests, build, alpha RC, clean review-drop verification, paired browser state captures, and zero browser console errors all passed.
- Confirmed the native `256x160` readability gate is not clean: filed Dune Catch station crowding is the blocker, with first-play task truncation, Source Shelter journal crowding/clipping, and cramped title guidance included in the repair proof.
- Marked packet `182` `DONE` at version `5`, wrote `docs/reports/2026-05-14-beta-expansion-integration-signoff-review.md`, and promoted `ECO-20260514-scout-01` to `READY`.
- Kept lane 2 packet `192` breadth parked behind `ECO-20260514-critic-01`.
- Verification passed: `npm run validate:agents`.

### ECO-20260428-main-489

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Beta expansion integration signoff`
- Source: `docs/reports/2026-05-14-beta-expansion-integration-signoff.md`
- Packet: `.agents/packets/182-beta-expansion-integration-signoff.json`
- Depends on: `ECO-20260428-scout-489`

Goal:

- Run the final beta expansion proof and write the signoff report.

Acceptance:

- Records validation, tests, science check, build, browser proof needs, and remaining risks.
- Opens smallest blocker items if anything fails.
- Native `256x160` proof covers title, first-play task strip, filed Source to Shore/Dune Catch station, world map, and Source Shelter journal states.
- Does not mark packet `182` clean if station/title/journal readability issues still reproduce.

Completion note:

- Wrote `docs/reports/2026-05-14-beta-expansion-integration-signoff.md` with the final packet `182` proof matrix.
- Verification passed: `npm run validate:agents`; `npm run science:check`; `npm run test`; `npm run build`; `npm run alpha:rc` with review drop `output/review-drops/eco-explorer-review-drop-20260514-142048.tgz`.
- Captured native `256x160` browser proof under `output/lane-1-main-489-beta-integration-proof/` with paired state JSON and zero console errors.
- Result is blocked by handheld readability: filed Source to Shore/Dune Catch station crowding, first-play task truncation, Source Shelter journal card crowding/clipping, and cramped title guidance still reproduce.
- Promoted `ECO-20260428-critic-489` to `READY` to review the blocker handoff.

### ECO-20260428-scout-489

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Beta expansion integration signoff`
- Source: `docs/reports/2026-05-14-beta-expansion-integration-signoff-scout.md`
- Packet: `.agents/packets/182-beta-expansion-integration-signoff.json`
- Depends on: `ECO-20260428-critic-488`, `ECO-20260428-critic-492`, `ECO-20260428-critic-495`, `ECO-20260428-critic-498`

Goal:

- Define the final integration checklist after all lane runways are complete.

Acceptance:

- Covers lane 1 systems, lane 2 content, lane 3 spatial work, lane 4 routes, tests, build, science checks, and browser proof.
- Promotes `ECO-20260428-main-489` only when all lane runways are clean.

Completion note:

- Confirmed terminal lane runway gates are clean: `ECO-20260428-critic-488` for packet `181`, `ECO-20260428-critic-492` for packet `185`, `ECO-20260428-critic-495` for packet `188`, and `ECO-20260428-critic-498` for packet `191`.
- Wrote `docs/reports/2026-05-14-beta-expansion-integration-signoff-scout.md` and updated packet `182` to version `3` with the final checklist, including native `256x160` title, first-play task strip, filed Source to Shore/Dune Catch station, world map, and Source Shelter journal proof.
- Promoted `ECO-20260428-main-489` to `READY`; packet `192` remains parked behind `ECO-20260428-critic-489`.
- Verification passed: `npm run validate:agents`.

### ECO-20260428-critic-495

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: High-country vertical memory`
- Source: `docs/reports/2026-04-28-high-country-vertical-memory-review.md`
- Packet: `.agents/packets/188-lane-3-high-country-vertical-memory.json`
- Depends on: `ECO-20260428-main-495`

Goal:

- Review high-country spatial work and close lane 3's runway if clean.

Acceptance:

- Confirms proof, readability, and lane boundaries.
- Marks packet `188` done or opens smallest lane-3-local blocker.

Completion note:

- Reviewed the proof-only Treeline Source Shelter high-source/source-memory pass cleanly: native `256x160` proof walks from `rime-brow` into the source-memory pocket and out to the separated `TO TUNDRA REACH` prompt edge.
- Reran focused Treeline/runtime tests; no runtime source files changed for packet `188`, so no build was required.
- Wrote `docs/reports/2026-04-28-high-country-vertical-memory-review.md` and marked packet `188` done at version `4`.

### ECO-20260428-main-495

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: High-country vertical memory`
- Source: `docs/reports/2026-04-28-high-country-vertical-memory-implementation.md`
- Packet: `.agents/packets/188-lane-3-high-country-vertical-memory.json`
- Depends on: `ECO-20260428-scout-495`

Goal:

- Proof-close the Treeline Source Shelter high-source/source-memory pocket, applying a tiny Treeline-local placement fix only if fresh proof shows a real readability issue.

Acceptance:

- Fresh browser proof covers the Treeline `rime-brow` to source-memory pocket at native `256x160`.
- If proof stays clean, no geometry changes land; if a real issue appears, only one tiny Treeline-local geometry or existing-carrier placement fix lands.
- No route beat, station shell, save change, content-only note, physics rewrite, map-post change, cave system, traversal framework, or new biome lands.

Completion note:

- Proof-closed the existing Treeline Source Shelter high-source/source-memory pocket without runtime geometry changes.
- Fresh native `256x160` browser proof under `output/lane-3-main-495-high-country-vertical-memory-proof/` walked from `rime-brow` through source-memory lichen/stone/ptarmigan reads to the separated `TO TUNDRA REACH` prompt edge, with no failures or browser errors.
- Focused Treeline/runtime tests passed. `npm run build` was not run because no runtime source files changed. Packet `188` is version `3`, and `ECO-20260428-critic-495` is promoted to `READY`.

### ECO-20260428-scout-495

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: High-country vertical memory`
- Source: `docs/reports/2026-04-28-high-country-vertical-memory-handoff.md`
- Packet: `.agents/packets/188-lane-3-high-country-vertical-memory.json`
- Depends on: `ECO-20260428-critic-494`

Goal:

- Scope one high-country vertical-memory pass around shelter, exposure, thaw, or descent.

Acceptance:

- Names local target, habitat honesty checks, and proof plan.
- Avoids route, station, save, content-only, and physics scope.
- Promotes `ECO-20260428-main-495` with a high-country spatial contract.

Completion note:

- Scoped packet `188` to a proof-first Treeline Source Shelter high-source/source-memory pocket inside `lichen-fell`, from `rime-brow` into the `source-memory` stair.
- Fresh native `256x160` scout proof under `output/lane-3-scout-495-high-country-vertical-memory-proof/` found no new spatial issue; the prior Source Shelter Tundra-prompt competition remains fixed.
- Wrote `docs/reports/2026-04-28-high-country-vertical-memory-handoff.md`, updated packet `188` to version `2`, and promoted `ECO-20260428-main-495` to `READY`.

### ECO-20260428-critic-494

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: Forest expedition spatial depth`
- Source: `docs/reports/2026-04-28-forest-expedition-spatial-depth-review.md`
- Packet: `.agents/packets/187-lane-3-forest-expedition-spatial-depth.json`
- Depends on: `ECO-20260428-main-494`

Goal:

- Review the forest spatial proof closure for readability, recovery, and no framework drift.

Acceptance:

- Confirms proof and focused tests are sufficient.
- Confirms no geometry change was needed and no cave framework, route-board/catalog, station, save, traversal-framework, physics, new cave, new biome, route beat, or traversal-HUD work landed.
- Promotes `ECO-20260428-scout-495` if clean.

Completion note:

- Reviewed the proof-only Forest expedition upper-run carry cleanly: native `256x160` proof walks from `filtered-return` mouth through `log-run` high carry and old-growth bridge/hinge into the `old-growth-main-trunk` foot.
- Reran focused Forest/runtime tests; no runtime source changes from `main-494` required a build.
- Wrote `docs/reports/2026-04-28-forest-expedition-spatial-depth-review.md`, marked packet `187` done, and promoted `ECO-20260428-scout-495` to `READY`.

### ECO-20260428-main-494

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: Forest expedition spatial depth`
- Source: `docs/reports/2026-04-28-forest-expedition-spatial-depth-implementation.md`
- Packet: `.agents/packets/187-lane-3-forest-expedition-spatial-depth.json`
- Depends on: `ECO-20260428-scout-494`

Goal:

- Proof-close the scoped Forest expedition upper-run carry, applying a tiny Forest-local placement fix only if fresh proof shows a real readability gap.

Acceptance:

- Fresh browser proof covers filtered-return mouth -> high-run bridge/hinge -> old-growth trunk foot at native `256x160`.
- If proof is already clean, no geometry changes land; if a real issue appears, only one tiny Forest-local geometry or existing-carrier fix lands.
- No content-only, station, route-board/catalog, save, traversal-framework, physics, new cave, new biome, route beat, or traversal-HUD work lands.

Completion note:

- Proof-closed the existing Forest expedition upper-run carry without runtime code changes: a fresh browser pass walked from the filtered-return mouth through the log-run high carry and old-growth bridge/hinge into the `old-growth-main-trunk` foot.
- Native `256x160` proof lives under `output/lane-3-main-494-forest-expedition-spatial-proof/`; `errors.json` is empty, the hinge cue is visible, and `old-growth-main-trunk` is in range at arrival.
- Focused Forest/runtime tests passed. `npm run build` was not run because no runtime source files changed. Packet `187` is version `3`, and `ECO-20260428-critic-494` is promoted to `READY`.

### ECO-20260428-scout-494

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Forest expedition spatial depth`
- Source: `docs/reports/2026-04-28-forest-expedition-spatial-depth-handoff.md`
- Packet: `.agents/packets/187-lane-3-forest-expedition-spatial-depth.json`
- Depends on: `ECO-20260428-critic-493`

Goal:

- Scope a forest expedition spatial pass from existing canopy/cave proof.

Acceptance:

- Names exact forest spatial target and browser proof plan.
- Excludes content-only, station, route, save, and traversal-framework work.
- Promotes `ECO-20260428-main-494` with a tiny spatial or proof contract.

Completion note:

- Scoped the Forest expedition spatial target to the existing upper-run carry from `filtered-return` mouth through the high-run bridge/hinge band into the `old-growth-main-trunk` foot.
- Captured fresh native `256x160` scout proof under `output/lane-3-scout-494-forest-expedition-spatial-proof/`; current frames show no real readability issue, so `main-494` is proof-first.
- Wrote `docs/reports/2026-04-28-forest-expedition-spatial-depth-handoff.md`, updated packet `187` to version `2`, and promoted `ECO-20260428-main-494` to `READY`.

### ECO-20260428-scout-498

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Notebook filing synthesis`
- Source: `docs/reports/2026-04-28-notebook-filing-synthesis-scout.md`
- Packet: `.agents/packets/191-lane-4-notebook-filing-synthesis.json`
- Depends on: `ECO-20260428-critic-497`

Goal:

- Scope one notebook filing or catalog-guardrail synthesis pass.

Acceptance:

- Names filing payoff or authoring safety target and route tests.
- Avoids station shell, planner, save schema, content pack, and geometry requirements.
- Promotes `ECO-20260428-main-498` with a route-local contract.

Completion note:

- Scoped packet `191` to a test/docs-only filing-display contract: direct proof that display-only replay prefixes can decorate filed notices while route titles and canonical filed text remain stable.
- Wrote `docs/reports/2026-04-28-notebook-filing-synthesis-scout.md`, updated packet `191` to version `2`, and promoted `ECO-20260428-main-498` to `READY`.
- Verification passed: `npm run validate:agents`.

### ECO-20260428-main-498

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Notebook filing synthesis`
- Source: `docs/reports/2026-04-28-notebook-filing-synthesis-scout.md`
- Packet: `.agents/packets/191-lane-4-notebook-filing-synthesis.json`
- Depends on: `ECO-20260428-scout-498`

Goal:

- Implement the scoped filing synthesis or guardrail pass.

Acceptance:

- Filing payoff or catalog guardrails improve without route identity drift.
- Focused route/catalog/station/snapshot tests and build pass.
- No station shell, geometry, broad content, planner, or save schema change lands.

Completion note:

- Added a focused filed-notice contract proving `tundra-short-season` keeps canonical `SHORT SEASON` notice title and filed text while the display-only `Thaw Window.` prefix decorates the filed-route notice text.
- Updated route authoring guidance for the `filedText` plus `displayPrefix` display chain; no runtime, save schema, station shell, route ids, evidence ids, support ids, or Source to Shore beat count changed.
- Verification passed: `npm test -- --run src/test/field-notices.test.ts`; `npm test -- --run src/test/field-requests.test.ts -t "full-arc filed-note synthesis matrix|Thaw Window"`; `npm test -- --run src/test/field-season-board.test.ts -t "note-tabs ready wrap|thaw-window"`; focused route/catalog/controller/station/snapshot suite; `npm run build`.
- Wrote `docs/reports/2026-04-28-notebook-filing-synthesis-implementation.md`, updated packet `191` to version `3`, and promoted `ECO-20260428-critic-498` to `READY`.

### ECO-20260428-critic-498

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Notebook filing synthesis`
- Source: `docs/reports/2026-04-28-notebook-filing-synthesis-review.md`
- Packet: `.agents/packets/191-lane-4-notebook-filing-synthesis.json`
- Depends on: `ECO-20260428-main-498`

Goal:

- Review filing synthesis and close lane 4's runway if clean.

Acceptance:

- Confirms route authoring readiness improved and lane boundaries held.
- Marks packet `191` done or opens smallest lane-4-local blocker.

Completion note:

- Reviewed the filing-display contract cleanly: the new notice test pins canonical `SHORT SEASON` filed notice title, unprefixed canonical filed text, display-only `Thaw Window.` filed notice text, and `filed-route` styling.
- Confirmed the pass stayed test/docs-only with no runtime, save schema, station shell, route id, evidence id, support id, route framework, geometry, replay system, or Source to Shore beat drift.
- Verification passed: `npm test -- --run src/test/field-notices.test.ts`; focused route/catalog/controller/station/snapshot suite with 11 test files and 389 tests passing; `npm run build`.
- Wrote `docs/reports/2026-04-28-notebook-filing-synthesis-review.md` and marked packet `191` `DONE` at version `4`. Lane 4 has no remaining actionable queue item.

### ECO-20260428-critic-497

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Route replay and support depth`
- Source: `docs/reports/2026-04-28-route-replay-support-depth-review.md`
- Packet: `.agents/packets/190-lane-4-route-replay-and-support-depth.json`
- Depends on: `ECO-20260428-main-497`

Goal:

- Review replay/support depth for clarity, save stability, and no loadout drift.

Acceptance:

- Confirms route feel improves without a new system.
- Promotes `ECO-20260428-scout-498` if clean.

Completion note:

- Reviewed the `Held Dune` support-depth pass cleanly: hand lens now prefers active sand-capture carriers through the existing process-focus seam, while non-hand-lens support and ready/filed `Dune Catch` identity stay stable.
- Wrote `docs/reports/2026-04-28-route-replay-support-depth-review.md`, marked packet `190` `DONE` at version `4`, and promoted `ECO-20260428-scout-498` to `READY`.
- Verification passed: focused route/catalog/controller/station/snapshot suite with 9 test files and 370 tests passing, `npm run build`, and `npm run validate:agents`.

### ECO-20260428-main-497

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Route replay and support depth`
- Source: `docs/reports/2026-04-28-route-replay-support-depth-implementation.md`
- Packet: `.agents/packets/190-lane-4-route-replay-and-support-depth.json`
- Depends on: `ECO-20260428-scout-497`

Goal:

- Implement the scoped replay/support depth pass.

Acceptance:

- One replay/support depth improvement lands through existing route seams.
- Canonical filed identities and save behavior remain stable.
- No new replay system, loadout UI, station shell, geometry, or content pack lands.

Completion note:

- Added `Held Dune` active hand-lens carrier preferences through the existing `source-to-shore-dune-catch.processFocus.activeSlotEntryIdsBySlotId` seam.
- Added focused route/controller tests proving `hand-lens` prefers `beach-grass` and `pacific-wax-myrtle` during the live sand-capture window while non-hand-lens support stays unchanged; ready/filed identity remains canonical `Dune Catch`.
- Verification passed: focused route/controller/station/snapshot slices, focused route/catalog/controller/station/snapshot suite with 9 test files and 370 tests passing, `npm run build`, and `npm run validate:agents`. Packet `190` is version `3`, and `ECO-20260428-critic-497` is promoted to `READY`.

### ECO-20260428-scout-497

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Route replay and support depth`
- Source: `docs/reports/2026-04-28-route-replay-support-depth-scout.md`
- Packet: `.agents/packets/190-lane-4-route-replay-and-support-depth.json`
- Depends on: `ECO-20260428-critic-496`

Goal:

- Scope one route-local replay or support-depth pass.

Acceptance:

- Names route/controller seams, tests, and stability checks.
- Excludes new replay system, loadout UI, station shell, geometry, content packs, and save schema.
- Promotes `ECO-20260428-main-497` if route-local.

Completion note:

- Scoped the implementation to the existing `source-to-shore-dune-catch.processFocus` seam so `Held Dune` can bias hand lens toward active held-sand carriers without changing ready/filed `Dune Catch` identity.
- Wrote `docs/reports/2026-04-28-route-replay-support-depth-scout.md`, updated packet `190` to version `2`, and promoted `ECO-20260428-main-497` to `READY`.
- Verification passed: `npm run validate:agents`.

### ECO-20260428-critic-496

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Second-season route design`
- Source: `docs/reports/2026-04-28-second-season-route-design-review.md`
- Packet: `.agents/packets/189-lane-4-second-season-route-design.json`
- Depends on: `ECO-20260428-main-496`

Goal:

- Review route design for save stability, station independence, and no hidden fourth beat.

Acceptance:

- Confirms the work is route-owned and no planner drift landed.
- Promotes `ECO-20260428-scout-497` if clean.

Completion note:

- Reviewed packet `189` clean: the proof-only route boundary keeps Source to Shore at exactly three beats and prevents a hidden playable route append after filed `Dune Catch` until a station route-family boundary is scoped.
- Confirmed no route id, evidence id, ordered slot, support behavior, filed identity, save schema, route framework, station shell, planner, content pack, geometry, runtime source, or test-source drift landed.
- Verification passed: `npm run validate:agents`; focused route/catalog/controller/station/snapshot suite with 9 test files and 368 tests passing. Packet `189` is `DONE`, and `ECO-20260428-scout-497` is promoted to `READY`.

### ECO-20260428-main-496

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Second-season route design`
- Source: `docs/reports/2026-04-28-second-season-route-design-proof.md`
- Packet: `.agents/packets/189-lane-4-second-season-route-design.json`
- Depends on: `ECO-20260428-scout-496`

Goal:

- Write the proof-only second-season route boundary report, adding focused test-only guards only if the proof finds a missing assertion.

Acceptance:

- The proof report explains why a playable route append after filed `Dune Catch` is not station-independent yet.
- Existing or added focused route/catalog/controller/station/snapshot tests prove filed Source to Shore leaves no hidden active route, marker, replay, or journal outing.
- Route ids, evidence ids, ordered slots, support behavior, filed states, save schema, station shell, geometry, planner UI, route framework, and Source to Shore beat count remain unchanged.

Completion note:

- Proof-closed packet `189` without runtime or test-source changes: filed `Dune Catch` remains the three-beat Source to Shore endpoint, and a later playable post-Source-to-Shore route needs an explicit station route-family boundary before a catalog append can be player-facing.
- Wrote `docs/reports/2026-04-28-second-season-route-design-proof.md`, added the durable boundary note to `.agents/project-memory.md`, updated packet `189` to version `3`, and promoted `ECO-20260428-critic-496` to `READY`.
- Verification passed: `npm run validate:agents`; focused route/catalog/controller/station/snapshot suite with 9 test files and 368 tests passing. `npm run build` was not run because there were no runtime source changes.

### ECO-20260428-critic-493

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: Coastal corridor spatial depth`
- Source: `docs/reports/2026-04-28-coastal-corridor-spatial-depth-review.md`
- Packet: `.agents/packets/186-lane-3-coastal-corridor-spatial-depth.json`
- Depends on: `ECO-20260428-main-493`

Goal:

- Review spatial depth for readability, prompt competition, and science-safe carriers.

Acceptance:

- Confirms the work is local and readable at `256x160`.
- Promotes `ECO-20260428-scout-494` if clean.

Completion note:

- Reviewed the corridor-local root/log hold cleanly: native `256x160` proof shows the hold visible with `nearbyTravelTarget: null`, and the corridor still exits into Forest Trail.
- Reran `npm test -- --run src/test/corridor.test.ts -t "sheltered-edge|coastal carriers"` and `npm test -- --run src/test/runtime-smoke.test.ts -t "walks the full adjacent corridor chain"`.
- Wrote `docs/reports/2026-04-28-coastal-corridor-spatial-depth-review.md`, marked packet `186` done, and promoted `ECO-20260428-scout-494` to `READY`.

### ECO-20260428-main-493

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: Coastal corridor spatial depth`
- Source: `docs/reports/2026-04-28-coastal-corridor-spatial-depth-implementation.md`
- Packet: `.agents/packets/186-lane-3-coastal-corridor-spatial-depth.json`
- Depends on: `ECO-20260428-scout-493`

Goal:

- Implement the scoped coastal corridor spatial pass.

Acceptance:

- One coastal/forest-edge spatial improvement lands or is proof-declined.
- Browser proof is captured if visual geometry or placement changes land.
- No station, route-board, route catalog, save schema, or physics rewrite lands.

Completion note:

- Added one tiny `coastal-forest-corridor` root/log hold using existing `log-platform` sprites: `sheltered-edge-root-lip` and `sheltered-edge-log-rest`.
- Added focused `src/test/corridor.test.ts` coverage and captured native `256x160` proof under `output/lane-3-main-493-coastal-corridor-spatial-proof/`.
- Verified `npm test -- --run src/test/corridor.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "walks the full adjacent corridor chain"`, and `npm run build`; promoted `ECO-20260428-critic-493` to `READY`.

### ECO-20260428-scout-493

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Coastal corridor spatial depth`
- Source: `docs/reports/2026-04-28-coastal-corridor-spatial-depth-handoff.md`
- Packet: `.agents/packets/186-lane-3-coastal-corridor-spatial-depth.json`
- Depends on: `none`

Goal:

- Scope one coastal corridor spatial-depth pass with local `256x160` proof.

Acceptance:

- Names local geometry, carrier, or cue opportunities plus proof expectations.
- Excludes station, route-board, route catalog, save schema, and physics rewrite work.
- Promotes `ECO-20260428-main-493` only with a small spatial contract.

Completion note:

- Captured native `256x160` browser proof under `output/lane-3-scout-493-coastal-corridor-spatial-proof/`.
- Confirmed beach-to-scrub corridor and Forest Trail arrival already read; scoped one tiny `coastal-forest-corridor` root/log hold around the existing salmonberry/nurse-log transition.
- Wrote `docs/reports/2026-04-28-coastal-corridor-spatial-depth-handoff.md`, updated packet `186` to version `2`, and promoted `ECO-20260428-main-493` to `READY`.

### ECO-20260428-scout-496

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Second-season route design`
- Source: `docs/reports/2026-04-28-second-season-route-design-scout.md`
- Packet: `.agents/packets/189-lane-4-second-season-route-design.json`
- Depends on: `none`

Goal:

- Scope the next route-design step: proof-only design, existing-route deepening, or one small chapter-grade outing.

Acceptance:

- Names route/catalog/controller files and tests.
- Excludes station shell, geometry, broad content packs, planner UI, and unproven save-schema changes.
- Promotes `ECO-20260428-main-496` with a route-owned implementation or proof contract.

Completion note:

- Chose the proof-only route-design path because a plain catalog append after filed `Dune Catch` would make map/journal active outing state outrun the dedicated filed Source to Shore station board.
- Wrote `docs/reports/2026-04-28-second-season-route-design-scout.md`, updated packet `189` to version `2`, and promoted `ECO-20260428-main-496` to `READY`.
- The main contract keeps route ids, evidence ids, ordered slots, support behavior, filed states, save schema, station shell, geometry, planner UI, route framework, and Source to Shore beat count unchanged unless a focused proof exposes a missing test-only guard.

### ECO-20260428-scout-490

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Front-half ecology richness`
- Source: `docs/reports/2026-04-28-front-half-ecology-richness-handoff.md`
- Packet: `.agents/packets/183-lane-2-front-half-ecology-richness.json`
- Depends on: `none`

Goal:

- Scope a front-half content pack that reinforces beach, coastal scrub, and forest-edge relationships.

Acceptance:

- Names content files, source checks, and focused tests.
- Excludes station, route, travel, save, geometry, and broad `game.ts` work.
- Promotes `ECO-20260428-main-490` with a content-local implementation contract.

Completion note:

- Scoped the pass to `salmonberry` comparison routing through existing reviewed notes: Coastal Scrub `berry-cover-chain` and Forest Trail `berry-seed-shuttle`.
- Wrote `docs/reports/2026-04-28-front-half-ecology-richness-handoff.md`, updated packet `183` to version `2`, and promoted `ECO-20260428-main-490` to `READY`.
- No science ledger edit is needed because the implementation reuses existing note copy/source coverage; focused proof is journal-comparison/content-quality plus build.

### ECO-20260428-main-490

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Salmonberry front-half comparison routing`
- Source: `docs/reports/2026-04-28-front-half-ecology-richness-implementation.md`
- Packet: `.agents/packets/183-lane-2-front-half-ecology-richness.json`
- Depends on: `ECO-20260428-scout-490`

Goal:

- Route the existing `salmonberry` same-pane journal comparison toward the richer reviewed Coastal Scrub and Forest Trail notes.

Acceptance:

- `salmonberry` comparison prefers Coastal Scrub `berry-cover-chain` and Forest Trail `berry-seed-shuttle` when those notes are locally unlocked.
- Focused journal comparison/content-quality tests and `npm run build` pass.
- No station, route, travel, save, geometry, traversal, new page, reward economy, fourth beat, or broad `game.ts` scope lands.

Completion note:

- Added the `salmonberry` preferred comparison mapping for Coastal Scrub `berry-cover-chain` and Forest Trail `berry-seed-shuttle`.
- Updated the focused journal-comparison fixture to unlock and expect those notes.
- Verified with `npm test -- --run src/test/journal-comparison.test.ts src/test/content-quality.test.ts` and `npm run build`; packet `183` is version `3` and `ECO-20260428-critic-490` is now `READY`.

### ECO-20260428-critic-490

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Front-half ecology richness`
- Source: `docs/reports/2026-04-28-front-half-ecology-richness-review.md`
- Packet: `.agents/packets/183-lane-2-front-half-ecology-richness.json`
- Depends on: `ECO-20260428-main-490`

Goal:

- Review front-half content for science safety, readability, and lane boundaries.

Acceptance:

- Confirms the work is content-local and source-safe.
- Promotes `ECO-20260428-scout-491` if clean.

Completion note:

- Reviewed the salmonberry comparison-routing pass cleanly in `docs/reports/2026-04-28-front-half-ecology-richness-review.md`.
- Confirmed the change reuses reviewed notes, follows the existing preferred-note unlock policy, and adds no new copy, ledger, station, route, save, geometry, page, reward, or fourth-beat scope.
- Reran `npm test -- --run src/test/journal-comparison.test.ts src/test/content-quality.test.ts` and `npm run build`; packet `183` is now `DONE` at version `4`, and `ECO-20260428-scout-491` is `READY`.

### ECO-20260428-scout-491

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Forest sub-ecosystem content`
- Source: `docs/reports/2026-04-28-forest-subecosystem-content-handoff.md`
- Packet: `.agents/packets/184-lane-2-forest-subecosystem-content.json`
- Depends on: `ECO-20260428-critic-490`

Goal:

- Scope a forest sub-ecosystem content pack for old-growth, under-root, canopy, or cave-adjacent teaching.

Acceptance:

- Names source checks, content targets, and focused tests.
- Avoids traversal, station, route-board, save, and geometry work.
- Promotes `ECO-20260428-main-491` with a content-local contract.

Completion note:

- Scoped the pack to one close-look-only payoff for existing `western-hemlock-seedling`, reinforcing old-wood nursery and canopy microhabitat teaching.
- Wrote `docs/reports/2026-04-28-forest-subecosystem-content-handoff.md`, updated packet `184` to version `2`, and promoted `ECO-20260428-main-491` to `READY`.
- No ledger edit is needed because `western-hemlock-seedling` is already verified; proof is focused close-look/content-quality plus build.

### ECO-20260428-main-491

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Hemlock seedling close-look`
- Source: `docs/reports/2026-04-28-forest-subecosystem-content-implementation.md`
- Packet: `.agents/packets/184-lane-2-forest-subecosystem-content.json`
- Depends on: `ECO-20260428-scout-491`

Goal:

- Add a close-look-only payoff for the existing `western-hemlock-seedling` entry to reinforce old-wood nursery and canopy microhabitat teaching.

Acceptance:

- `western-hemlock-seedling` supports close-look with compact source-safe callouts and sentence copy.
- Focused close-look/content-quality tests and `npm run build` pass.
- No forest entries, sprites, authored placements, ecosystem notes, observation prompts, station, route-board, save, geometry, traversal, page, reward, or broad `game.ts` scope lands.

Completion note:

- Added `western-hemlock-seedling` close-look support with `tiny needles` / `nurse wood` callouts and compact old-wood nursery copy.
- Updated focused close-look allowlist and payload assertions.
- Verified with `npm test -- --run src/test/close-look.test.ts src/test/content-quality.test.ts` and `npm run build`; packet `184` is version `3` and `ECO-20260428-critic-491` is now `READY`.

### ECO-20260428-critic-491

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Forest sub-ecosystem content`
- Source: `docs/reports/2026-04-28-forest-subecosystem-content-review.md`
- Packet: `.agents/packets/184-lane-2-forest-subecosystem-content.json`
- Depends on: `ECO-20260428-main-491`

Goal:

- Review forest content for science accuracy, compactness, and no traversal drift.

Acceptance:

- Confirms content supports exploration without becoming spatial or route work.
- Promotes `ECO-20260428-scout-492` if clean.

Completion note:

- Reviewed the hemlock seedling close-look payoff cleanly in `docs/reports/2026-04-28-forest-subecosystem-content-review.md`.
- Confirmed it reuses an existing verified entry and sprite, keeps copy compact, and adds no station, route, save, geometry, traversal, page, reward, ecosystem-note, observation-prompt, or broad `game.ts` scope.
- Reran `npm test -- --run src/test/close-look.test.ts src/test/content-quality.test.ts` and `npm run build`; packet `184` is now `DONE` at version `4`, and `ECO-20260428-scout-492` is `READY`.

### ECO-20260428-scout-492

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: High-country source content`
- Source: `docs/reports/2026-04-28-high-country-source-content-handoff.md`
- Packet: `.agents/packets/185-lane-2-high-country-source-content.json`
- Depends on: `ECO-20260428-critic-491`

Goal:

- Scope a high-country source/shelter content pass using existing Treeline and Tundra surfaces.

Acceptance:

- Names content targets, source checks, and focused tests.
- Avoids route beats, station shell, geometry, save, and travel changes.
- Promotes `ECO-20260428-main-492` with a content-local contract.

Completion note:

- Scoped the pass to one close-look-only payoff for existing Tundra `tussock-thaw-channel`, reinforcing meltwater/source teaching without new notes or route surfaces.
- Wrote `docs/reports/2026-04-28-high-country-source-content-handoff.md`, updated packet `185` to version `2`, and promoted `ECO-20260428-main-492` to `READY`.
- No ledger edit is needed because `tussock-thaw-channel` is already listed; proof is focused close-look/content-quality plus build.

### ECO-20260428-main-492

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Tundra thaw-channel close-look`
- Source: `docs/reports/2026-04-28-high-country-source-content-implementation.md`
- Packet: `.agents/packets/185-lane-2-high-country-source-content.json`
- Depends on: `ECO-20260428-scout-492`

Goal:

- Add a close-look-only payoff for the existing `tussock-thaw-channel` landmark to reinforce high-country meltwater/source teaching.

Acceptance:

- `tussock-thaw-channel` supports close-look with compact source-safe callouts and sentence copy.
- Focused close-look/content-quality tests and `npm run build` pass.
- No Treeline/Tundra entries, authored placements, sprites, ecosystem notes, observation prompts, sketchbook rows, station, route, save, travel, geometry, reward, page shell, or broad `game.ts` scope lands.

Completion note:

- Added `tussock-thaw-channel` close-look support with `low wet lane` / `raised tussocks` callouts and compact meltwater-source copy.
- Updated focused close-look allowlist and payload assertions.
- Verified with `npm test -- --run src/test/close-look.test.ts src/test/content-quality.test.ts` and `npm run build`; packet `185` is version `3` and `ECO-20260428-critic-492` is now `READY`.

### ECO-20260428-critic-492

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: High-country source content`
- Source: `docs/reports/2026-04-28-high-country-source-content-review.md`
- Packet: `.agents/packets/185-lane-2-high-country-source-content.json`
- Depends on: `ECO-20260428-main-492`

Goal:

- Review high-country content and close lane 2's runway if clean.

Acceptance:

- Confirms source safety, copy fit, and no cross-lane dependency.
- Marks packet `185` done or opens smallest lane-2-local blocker.

Completion note:

- Reviewed the thaw-channel close-look payoff cleanly in `docs/reports/2026-04-28-high-country-source-content-review.md`.
- Confirmed it reuses an existing ledger-backed Tundra landmark and sprite, keeps copy compact and broad, and adds no entry, placement, note, station, route, save, travel, geometry, reward, page, or broad `game.ts` scope.
- Reran `npm test -- --run src/test/close-look.test.ts src/test/content-quality.test.ts` and `npm run build`; packet `185` is now `DONE` at version `4`, and lane 2 has no remaining actionable item in current queue order.

### ECO-20260428-main-487

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Season-two station clarity`
- Source: `docs/reports/2026-04-28-season-two-station-clarity-implementation.md`
- Packet: `.agents/packets/180-lane-1-season-two-station-clarity.json`
- Depends on: `ECO-20260428-scout-487`

Goal:

- Implement the filed Source to Shore terminal-copy/subtitle clarity pass using existing station and season seams.

Acceptance:

- Filed Source to Shore no longer lets the `SEASON -> EXPEDITION` subtitle fall back to `High Pass opens the next field season.`
- Source to Shore stays exactly three beats with no new route id, save field, route catalog entry, station page, planner, dashboard, content pack, or geometry change.
- Focused field-season board, save-snapshot/runtime station checks, and `npm run build` pass.

Completion note:

- Added `resolveSourceToShoreFiledArcCopy()` and routed filed Source to Shore terminal copy through it.
- Updated filed Source to Shore station subtitles so the routes and expedition pages now read `Source to Shore is filed for this field arc.` instead of reopening the High Pass launch subtitle.
- Verified focused board, save-snapshot, runtime station slices, `npm run build`, and a lightweight web-game client boot smoke; updated packet `180` to version `3` and promoted `ECO-20260428-critic-487` to `READY`.

### ECO-20260428-critic-487

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Season-two station clarity`
- Source: `docs/reports/2026-04-28-season-two-station-clarity-review.md`
- Packet: `.agents/packets/180-lane-1-season-two-station-clarity.json`
- Depends on: `ECO-20260428-main-487`

Goal:

- Review station clarity for fit, calmness, and stable Source to Shore closure.

Acceptance:

- Confirms the pass stays lane-1-local and compact.
- Promotes `ECO-20260428-scout-488` if clean.

Completion note:

- Reviewed clean in `docs/reports/2026-04-28-season-two-station-clarity-review.md`.
- Confirmed filed Source to Shore now resolves as current-field-arc closure while the dedicated three-beat board remains intact.
- Reran focused board, save-snapshot, runtime station slices, and `npm run build`; marked packet `180` done at version `4` and promoted `ECO-20260428-scout-488` to `READY`.

### ECO-20260428-scout-488

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Travel and proof hardening`
- Source: `docs/reports/2026-04-28-travel-proof-harness-handoff.md`
- Packet: `.agents/packets/181-lane-1-travel-and-proof-hardening.json`
- Depends on: `ECO-20260428-critic-487`

Goal:

- Scope one travel-framing or proof-harness improvement that helps future beta chapter checks.

Acceptance:

- Names a single behavior-neutral target and verification plan.
- Avoids route semantics, content, geometry, and player-facing feature drift.
- Promotes `ECO-20260428-main-488` if cleanly scoped.

Completion note:

- Scoped the pass to a test-only debug snapshot helper that opens field-station proof through the world-map route.
- The handoff keeps explicit world-map assertions as two-step flows and avoids runtime, route, save, station UI, travel-label, content, geometry, browser artifact, and `game.ts` changes.
- Updated packet `181` to version `2` and promoted `ECO-20260428-main-488` to `READY`.

### ECO-20260428-main-488

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Travel proof harness hardening`
- Source: `docs/reports/2026-04-28-travel-proof-harness-implementation.md`
- Packet: `.agents/packets/181-lane-1-travel-and-proof-hardening.json`
- Depends on: `ECO-20260428-scout-488`

Goal:

- Add the scoped test-only helper for opening field-station snapshot proof through the world-map route.

Acceptance:

- `src/test/debug-snapshot-harness.ts` exposes a reusable field-station-via-world-map helper built from existing helpers.
- `src/test/save-snapshots.test.ts` uses the helper where station proof does not need separate world-map assertions.
- No runtime, route, save, station UI, travel-label, content, geometry, browser artifact, or `game.ts` change lands.
- Focused save-snapshot tests, `git diff --check`, and `npm run build` pass.

Completion note:

- Added `openFieldStationViaWorldMap()` to the debug snapshot harness by composing the existing world-map and field-station menu helpers.
- Switched station-only snapshot proofs to the new helper while keeping map-focused assertions as explicit two-step flows.
- Verified `npm test -- --run src/test/save-snapshots.test.ts`, `npm run build`, and `git diff --check` for the touched test/docs files; updated packet `181` to version `3` and promoted `ECO-20260428-critic-488` to `READY`.

### ECO-20260428-critic-488

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Travel and proof hardening`
- Source: `docs/reports/2026-04-28-travel-proof-harness-review.md`
- Packet: `.agents/packets/181-lane-1-travel-and-proof-hardening.json`
- Depends on: `ECO-20260428-main-488`

Goal:

- Review the hardening pass for behavior parity and future proof usefulness.

Acceptance:

- Confirms the helper/proof surface is reusable.
- Leaves final integration parked until the other lane runways are clean.

Completion note:

- Reviewed clean in `docs/reports/2026-04-28-travel-proof-harness-review.md`.
- Confirmed the helper composes existing menu navigation, station-only proofs use it, and map-focused assertions remain explicit two-step flows.
- Reran save-snapshot tests, `npm run build`, and `git diff --check`; marked packet `181` done at version `4` and left final integration parked behind other lane review gates.

### ECO-20260428-scout-487

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Season-two station clarity`
- Source: `docs/reports/2026-04-28-season-two-station-clarity-handoff.md`
- Packet: `.agents/packets/180-lane-1-season-two-station-clarity.json`
- Depends on: `none`

Goal:

- Scope the smallest station/season clarity pass for post-Source-to-Shore next-step readability.

Acceptance:

- Names exact station/session files, proof needs, and tests.
- Keeps Source to Shore as a clean three-beat endpoint unless separately scoped.
- Promotes `ECO-20260428-main-487` with a lane-1-local implementation contract.

Completion note:

- Scoped the lane-1-local fix to filed Source to Shore terminal copy/subtitle handling in `src/engine/source-to-shore-state.ts` and `src/engine/field-season-wrap.ts`.
- Confirmed the current board endpoint is already a dedicated three-beat `SOURCE TO SHORE` container; the clarity issue is the filed expedition subtitle falling back to `High Pass opens the next field season.`
- Updated packet `180` to version `2`, added the handoff report, and promoted `ECO-20260428-main-487` to `READY`.

### ECO-20260428-critic-477

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: High-country relief pass`
- Source: `docs/reports/2026-04-28-high-country-relief-review.md`
- Packet: `.agents/packets/178-lane-3-spatial-depth-runway.json`
- Depends on: `ECO-20260428-main-477`

Goal:

- Review high-country spatial work and close lane 3's runway if clean.

Acceptance:

- Confirms proof, readability, and lane boundaries.
- Marks packet `178` done or opens the smallest lane-3-local follow-up.

Completion note:

- Reviewed clean in `docs/reports/2026-04-28-high-country-relief-review.md`.
- Confirmed native `256x160` proof shows the shifted drift rest in `snow-meadow` and both later meltwater frames with `nearbyTravelTarget: null`.
- Reran proof assertions plus `npm test -- --run src/test/tundra-biome.test.ts -t "snow-meadow drift|thaw-window movement|meltwater-bank-rest"`.
- Updated packet `178` to version `10` and marked it `DONE`; no lane-3 follow-up is required for this runway.

### ECO-20260428-main-477

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: High-country relief pass`
- Source: `docs/reports/2026-04-28-high-country-relief-implementation.md`
- Packet: `.agents/packets/178-lane-3-spatial-depth-runway.json`
- Depends on: `ECO-20260428-scout-477`

Goal:

- Separate the Tundra snow-meadow drift rest from the `HIGH COUNTRY MAP` prompt with one tiny local geometry/carrier nudge.

Acceptance:

- Tundra drift-rest proof at native `256x160` settles with `nearbyTravelTarget: null`.
- Focused Tundra/runtime checks and `npm run build` pass if content changes land.
- No route beat, station shell, map-return post relocation, content-only pack, new pocket, or physics rewrite lands.

Completion note:

- Moved only the Tundra `snow-meadow-drift-rest` pocket from x=252 to x=268 and kept its existing sedge/ptarmigan carriers on the pocket at x=274/x=290.
- Native `256x160` browser proof under `output/lane-3-main-477-high-country-relief-proof/` shows the drift rest settles in `snow-meadow` with `nearbyTravelTarget: null`; later meltwater frames remain clean.
- Verified with `npm test -- --run src/test/tundra-biome.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t "Tundra|tundra|meltwater|thaw"`, `npm run build`, and proof assertions over `summary.json`.
- Updated packet `178` to version `9` and promoted `ECO-20260428-critic-477` to `READY`.

### ECO-20260428-scout-477

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: High-country relief pass`
- Source: `docs/reports/2026-04-28-forest-canopy-cave-loop-review.md`
- Packet: `.agents/packets/178-lane-3-spatial-depth-runway.json`
- Depends on: `ECO-20260428-critic-476`

Goal:

- Scope one Treeline/Tundra relief or sheltered-descent pass that is independent of route state.

Acceptance:

- Names the local spatial target, habitat honesty checks, and proof plan.
- Avoids route, station, journal-only, and physics scope.
- Promotes `ECO-20260428-main-477` with a tiny high-country spatial contract.

Completion note:

- Scoped one Tundra-local snow-meadow drift-rest separation in `docs/reports/2026-04-28-high-country-relief-handoff.md`.
- Browser proof under `output/lane-3-scout-477-high-country-relief-proof/` shows Treeline Source Shelter and Tundra meltwater are clean, while Tundra drift rest at x=252 shares `HIGH COUNTRY MAP` prompt range.
- Updated packet `178` to version `8` and promoted `ECO-20260428-main-477` to `READY`.

### ECO-20260428-critic-476

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: Forest canopy/cave loop`
- Source: `docs/reports/2026-04-28-forest-canopy-cave-loop-implementation.md`
- Packet: `.agents/packets/178-lane-3-spatial-depth-runway.json`
- Depends on: `ECO-20260428-main-476`

Goal:

- Review canopy/cave work for readability, recovery, and no framework drift.

Acceptance:

- Confirms browser proof and focused tests are sufficient.
- Promotes `ECO-20260428-scout-477` if clean.

Completion note:

- Reviewed clean in `docs/reports/2026-04-28-forest-canopy-cave-loop-review.md`.
- Confirmed the proof-only result has native `256x160` screenshots and state checks for the under-basin, cave-trunk cue, upper-return window, and filtered-return mouth.
- Reran proof assertions plus `npm test -- --run src/test/forest-biome.test.ts -t "root-hollow|under-basin|return"`.
- Updated packet `178` to version `7` and promoted `ECO-20260428-scout-477` to `READY`.

### ECO-20260428-main-476

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: Forest canopy/cave loop`
- Source: `docs/reports/2026-04-28-forest-canopy-cave-loop-handoff.md`
- Packet: `.agents/packets/178-lane-3-spatial-depth-runway.json`
- Depends on: `ECO-20260428-scout-476`

Goal:

- Prove the existing Forest Trail under-basin and upper-return nook at native `256x160`; only make one tiny Forest-local cave-mouth or upper-return geometry/carrier adjustment if the fresh settled proof reveals a real readability gap.

Acceptance:

- The current loop/nook is either proven readable as-is or improved with one tiny local fix.
- Focused forest/runtime checks pass, `npm run build` runs if content/runtime changes land, and browser proof is captured under `output/lane-3-main-476-forest-canopy-cave-loop-proof/`.
- No physics rewrite, cave framework, route-board, or station work lands.

Completion note:

- Completed proof-only in `docs/reports/2026-04-28-forest-canopy-cave-loop-implementation.md`.
- Native `256x160` proof under `output/lane-3-main-476-forest-canopy-cave-loop-proof/` shows the existing under-basin, cave-trunk cue, upper-return window, and filtered-return mouth route is readable and recoverable.
- No runtime geometry, carrier placement, traversal, station, route-board, journal, or physics files changed for this item.
- Verified with `npm test -- --run src/test/forest-biome.test.ts src/test/runtime-smoke.test.ts`; promoted `ECO-20260428-critic-476` to `READY`.

### ECO-20260428-critic-459

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Debug proof harness improvement`
- Source: `docs/reports/2026-04-28-debug-proof-harness-review.md`
- Packet: `.agents/packets/176-lane-1-systems-independence-runway.json`
- Depends on: `ECO-20260428-main-459`

Goal:

- Review the proof-harness change and decide whether lane 1 is ready for broader season-shell growth.

Acceptance:

- Confirms the harness improves independence for future lane work.
- Marks packet `176` done or opens the smallest lane-1-local follow-up.

Completion note:

- Reviewed clean in `docs/reports/2026-04-28-debug-proof-harness-review.md`.
- Confirmed the debug-snapshot helper extraction is test-only, reusable, and does not change runtime gameplay or debug snapshot payloads.
- Reran `git diff --check -- src/test/debug-snapshot-harness.ts src/test/save-snapshots.test.ts docs/architecture.md .agents/project-memory.md`, `npm test -- --run src/test/save-snapshots.test.ts`, and `npm run build`.
- Updated packet `176` to version `10` and marked it `DONE`; lane 1 has no remaining actionable item in packet `176`.

### ECO-20260428-main-459

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Debug proof harness improvement`
- Source: `docs/reports/2026-04-28-debug-proof-harness-implementation.md`
- Packet: `.agents/packets/176-lane-1-systems-independence-runway.json`
- Depends on: `ECO-20260428-scout-459`

Goal:

- Implement one proof-harness improvement without changing gameplay.

Acceptance:

- Proof or debug coverage becomes easier for future lane agents to reuse.
- Relevant tests/build pass.
- No player-facing behavior, route, content, geometry, or station-shell change lands unless explicitly scoped.

Completion note:

- Extracted reusable debug-snapshot boot/map/station/journal helpers into `src/test/debug-snapshot-harness.ts`.
- Updated `src/test/save-snapshots.test.ts` to import the shared helper and documented the test seam in `docs/architecture.md`.
- Did not change runtime gameplay, debug snapshot ids/payloads, route ids, station layout, world-map behavior, save schema, content, geometry, or Source to Shore beats.
- Verified with `git diff --check -- src/test/debug-snapshot-harness.ts src/test/save-snapshots.test.ts docs/architecture.md`, `npm test -- --run src/test/save-snapshots.test.ts`, and `npm run build`.
- Updated packet `176` to version `9` and promoted `ECO-20260428-critic-459` to `READY`.

### ECO-20260428-scout-459

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Debug proof harness improvement`
- Source: `docs/reports/2026-04-28-debug-proof-harness-handoff.md`
- Packet: `.agents/packets/176-lane-1-systems-independence-runway.json`
- Depends on: `ECO-20260428-critic-458`

Goal:

- Scope one proof-harness improvement for station, route, map, or debug-save states.

Acceptance:

- Names the harness gap, target files, and focused verification.
- Confirms gameplay behavior is out of scope.
- Promotes `ECO-20260428-main-459` with a test/proof-only or behavior-neutral contract.

Completion note:

- Scoped `ECO-20260428-main-459` to a test-only extraction of the debug-snapshot boot/map/station/journal helpers currently local to `src/test/save-snapshots.test.ts`.
- Targeted `src/test/debug-snapshot-harness.ts` plus `src/test/save-snapshots.test.ts`; runtime gameplay, debug snapshot payloads, route ids, station layout, world-map behavior, save schema, content, geometry, and Source to Shore beats stay out of scope.
- Updated packet `176` to version `8` and promoted `ECO-20260428-main-459` to `READY`.

### ECO-20260428-critic-458

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Travel-framing independence pass`
- Source: `docs/reports/2026-04-28-travel-framing-independence-review.md`
- Packet: `.agents/packets/176-lane-1-systems-independence-runway.json`
- Depends on: `ECO-20260428-main-458`

Goal:

- Review travel framing for clarity, compact copy, and no navigation-HUD drift.

Acceptance:

- Confirms the pass improves orientation without increasing chrome.
- Promotes `ECO-20260428-scout-459` if clean.

Completion note:

- Reviewed clean in `docs/reports/2026-04-28-travel-framing-independence-review.md`.
- Confirmed `src/engine/travel-framing.ts` owns world-map origin, map-return, focused-summary, walking-approach, and High Pass warmth label policy without adding route, station, content, geometry, save, HUD, or Source to Shore beat drift.
- Reran `npm test -- --run src/test/travel-framing.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t 'travel|world map|High Pass'`, and `npm run build`.
- Updated packet `176` to version `7` and promoted `ECO-20260428-scout-459` to `READY`.

### ECO-20260428-main-458

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Travel-framing independence pass`
- Source: `docs/reports/2026-04-28-travel-framing-independence-implementation.md`
- Packet: `.agents/packets/176-lane-1-systems-independence-runway.json`
- Depends on: `ECO-20260428-scout-458`

Goal:

- Implement the smallest travel-framing pass using existing map, station, and corridor seams.

Acceptance:

- Travel guidance is clearer without a new navigation HUD or planner.
- Focused map/runtime/build proof passes.
- No lane-2 content pack, lane-3 geometry work, or lane-4 route semantic change lands.

Completion note:

- Extracted world-map origin, map-return, focused-summary, walking-approach, and High Pass forest warmth label policy into `src/engine/travel-framing.ts`.
- Updated `src/engine/game.ts` to delegate label decisions, added `src/test/travel-framing.test.ts`, and documented the boundary in `docs/architecture.md`.
- Verified with `npm test -- --run src/test/travel-framing.test.ts`, `npm test -- --run src/test/runtime-smoke.test.ts -t 'travel|world map|High Pass'`, and `npm run build`.
- Updated packet `176` to version `6` and promoted `ECO-20260428-critic-458` to `READY`.

### ECO-20260428-scout-458

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Travel-framing independence pass`
- Source: `docs/reports/2026-04-28-travel-framing-independence-handoff.md`
- Packet: `.agents/packets/176-lane-1-systems-independence-runway.json`
- Depends on: `ECO-20260428-critic-457`

Goal:

- Audit world-map, corridor, and station-return travel framing for the next beta chapter.

Acceptance:

- Names one small travel-framing implementation target and proof plan.
- Leaves content packs, route semantics, and geometry expansion to other lanes.
- Promotes `ECO-20260428-main-458` if the scope is lane-1-local.

Completion note:

- Scoped `ECO-20260428-main-458` to a behavior-preserving travel label helper extraction.
- Targeted origin, map-return, focused-summary, and walking-approach labels currently resolved in `src/engine/game.ts`.
- Updated packet `176` to version `5` and promoted `ECO-20260428-main-458` to `READY`.

### ECO-20260428-critic-457

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Station/session independence runway`
- Source: `docs/reports/2026-04-28-station-session-independence-review.md`
- Packet: `.agents/packets/176-lane-1-systems-independence-runway.json`
- Depends on: `ECO-20260428-main-457`

Goal:

- Review the station/session extraction for simpler ownership and unchanged behavior.

Acceptance:

- Confirms the extraction improves lane-1 maintainability without widening scope.
- Promotes `ECO-20260428-scout-458` if clean.

Completion note:

- Reviewed the pure `resolveFieldStationPrimaryAction()` seam and confirmed action side effects stay in `src/engine/game.ts`.
- Reran `npm test -- --run src/test/field-station-session.test.ts` and `npm run build`.
- Updated packet `176` to version `4` and promoted `ECO-20260428-scout-458` to `READY`.

### ECO-20260428-main-457

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Station/session independence runway`
- Source: `docs/reports/2026-04-28-station-session-independence-implementation.md`
- Packet: `.agents/packets/176-lane-1-systems-independence-runway.json`
- Depends on: `ECO-20260428-scout-457`

Goal:

- Implement one behavior-preserving station/session helper or renderer-adjacent extraction.

Acceptance:

- Station behavior, route filing, purchases, support, notices, save state, and debug exports remain stable.
- Focused station/runtime/snapshot tests and build pass.
- No broad content, route catalog, traversal, or planner work lands.

Completion note:

- Added pure `resolveFieldStationPrimaryAction()` in `src/engine/field-station-session.ts` and used it from `src/engine/game.ts`.
- Kept route filing, support cycling, purchases, expedition handling, nursery actions, notices, audio, persistence, and debug behavior in the coordinator.
- Added direct station-session tests for routes-page priority, expedition filing scope, and nursery activation.
- Verification: `npm test -- --run src/test/field-station-session.test.ts`; focused runtime-smoke station/support/High Pass/Source to Shore slice; focused save-snapshot station/High Pass/Source to Shore slice; `npm run build`.
- Updated packet `176` to version `3` and promoted `ECO-20260428-critic-457` to `IN PROGRESS`.

### ECO-20260428-scout-457

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Station/session independence runway`
- Source: `docs/reports/2026-04-28-station-session-independence-handoff.md`
- Packet: `.agents/packets/176-lane-1-systems-independence-runway.json`
- Depends on: `ECO-20260428-critic-456`

Goal:

- Scope the next station/session boundary after the Steady Beta Foundation tail is fully signed off.

Acceptance:

- Chooses one behavior-preserving station/session or renderer-adjacent boundary.
- Names focused tests and files while excluding content, geometry, and route-authoring scope.
- Promotes `ECO-20260428-main-457` only after `ECO-20260428-critic-456` is clean.

Completion note:

- Scoped `ECO-20260428-main-457` to a pure station primary-action intent helper in `src/engine/field-station-session.ts`.
- Kept side effects in `src/engine/game.ts`: route filing, purchases, support toggles, nursery actions, expedition activation, notices, audio, persistence, and debug behavior.
- Updated packet `176` to version `2` and promoted `ECO-20260428-main-457` to `READY`.

### ECO-20260428-critic-456

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Steady beta full-arc signoff`
- Source: `docs/reports/2026-04-28-steady-beta-full-arc-signoff-review.md`
- Packet: `.agents/packets/175-steady-beta-full-arc-signoff.json`
- Depends on: `ECO-20260428-main-456`

Goal:

- Review the full-arc proof and decide whether the big beta-foundation push is complete.

Acceptance:

- Marks the wave clean only if the three-beat chapter, station container, surface fixes, route flow, payoff, spatial proof, tests, build, and browser evidence hold together.
- Names the smallest remaining blockers if signoff is not clean.
- Updates the queue direction for the next director decision.

Completion note:

- Reviewed `docs/reports/2026-04-28-steady-beta-full-arc-signoff.md`, the browser proof directory, `summary.json`, `errors.json`, and PNG dimensions.
- Confirmed the seven-state proof spine, empty browser errors, native `256x160` captures, final filed no-marker/no-request/no-replay state, recorded full verification set, and RC archive.
- Marked packet `175` done, recorded the no-fourth-beat handoff, and promoted `ECO-20260428-scout-457` to `READY`.

### ECO-20260428-main-456

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Steady beta full-arc signoff`
- Source: `docs/reports/2026-04-28-steady-beta-full-arc-signoff.md`
- Packet: `.agents/packets/175-steady-beta-full-arc-signoff.json`
- Depends on: `ECO-20260428-scout-456`, `ECO-20260428-critic-449`, `ECO-20260428-critic-450`, `ECO-20260428-critic-451`, `ECO-20260428-critic-452`, `ECO-20260428-critic-453`, `ECO-20260428-critic-454`, `ECO-20260428-critic-455`

Goal:

- Run and record the final proof for the steady beta foundation wave.

Acceptance:

- Source to Shore is proven from post-High-Pass station entry through filed chapter payoff.
- Station, journal, atlas, map, support, debug snapshots, browser proof, build, and alpha-RC expectations are recorded.
- Any remaining blocker becomes a small explicit queue item rather than hidden follow-up.

Completion note:

- Wrote `docs/reports/2026-04-28-steady-beta-full-arc-signoff.md` with packet gate table, seven-state debug-save matrix, exact command results, alpha RC archive path, and remaining-risk note.
- Captured native `256x160` browser proof under `output/lane-1-main-456-full-arc/` with paired state JSON, `summary.json`, and empty `errors.json`.
- Verification: `npm run validate:agents`; focused Source to Shore/High Pass matrix; `npm test`; `npm run science:check`; `npm run build`; `npm run alpha:rc`.
- `npm run alpha:rc` passed with `output/review-drops/eco-explorer-review-drop-20260428-091554.tgz`.
- Promoted `ECO-20260428-critic-456` to `READY`.

### ECO-20260428-scout-476

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Forest canopy/cave loop`
- Source: `docs/reports/2026-04-28-forest-canopy-cave-loop-handoff.md`
- Packet: `.agents/packets/178-lane-3-spatial-depth-runway.json`
- Depends on: `ECO-20260428-critic-475`

Completion notes:

- Scoped `main-476` as a proof-first Forest Trail upper-return nook pass, not another cave chamber or canopy shelf.
- Named the editable files, read-only engine context, proof directory, and conditional one-tiny-fix ceiling.
- Updated packet `178` to version `5` and promoted `ECO-20260428-main-476`.

### ECO-20260428-critic-475

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: Front-half physical continuity`
- Source: `docs/reports/2026-04-28-front-half-physical-continuity-review.md`
- Packet: `.agents/packets/178-lane-3-spatial-depth-runway.json`
- Depends on: `ECO-20260428-main-475`

Completion notes:

- Reviewed the Forest Trail trailhead anchor as clean: local to trailhead, visible at native `256x160`, science-safe for existing entries, and no travel prompt in range at the first-cover proof frame.
- Re-ran focused trailhead-edge biome coverage and reviewed the focused test/build/proof artifacts.
- Updated packet `178` to version `4` and promoted `ECO-20260428-scout-476`.

### ECO-20260428-main-475

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: Front-half physical continuity`
- Source: `docs/reports/2026-04-28-front-half-physical-continuity-implementation.md`
- Packet: `.agents/packets/178-lane-3-spatial-depth-runway.json`
- Depends on: `ECO-20260428-scout-475`

Completion notes:

- Added one small Forest Trail trailhead log at `x=116`, `y=106`, before fern-hollow, plus authored salmonberry, sword fern, and red huckleberry carriers.
- Added focused Forest biome coverage proving the anchor stays inside the trailhead band before `fern-hollow`.
- Verified focused Beach/Coastal Scrub/Forest/runtime tests, `npm run build`, and native `256x160` browser proof under `output/lane-3-main-475-front-half-continuity-proof/`.
- Updated packet `178` to version `3` and promoted `ECO-20260428-critic-475`.

### ECO-20260428-critic-453

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Game coordinator controller split`
- Source: `docs/reports/2026-04-28-game-coordinator-controller-split-review.md`
- Packet: `.agents/packets/172-game-coordinator-controller-split.json`
- Depends on: `ECO-20260428-main-453`

Goal:

- Review the controller split for simpler ownership and unchanged gameplay behavior.

Acceptance:

- Confirms this was one useful extraction, not a broad rewrite.
- Verifies tests/build cover the touched runtime seam.
- Names any follow-up architecture debt as future queue work rather than widening this wave.

Completion note:

- Reviewed the station/session split cleanly with no blocking findings.
- Confirmed `src/engine/field-station-session.ts` owns only pure station surface/selection calculations while side effects stay in `src/engine/game.ts`.
- Reran focused session, runtime, snapshot, and build verification.
- Marked packet `172` done and promoted `ECO-20260428-main-456` to `READY`.

### ECO-20260428-main-453

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Game coordinator controller split`
- Source: `docs/reports/2026-04-28-game-coordinator-controller-split-implementation.md`
- Packet: `.agents/packets/172-game-coordinator-controller-split.json`
- Depends on: `ECO-20260428-scout-453`, `ECO-20260428-critic-452`

Goal:

- Extract one narrow coordinator responsibility from `game.ts` with behavior-preserving tests.

Acceptance:

- Only the scout-approved responsibility moves or gets isolated.
- Runtime, input, station, route, save, and debug behavior remain unchanged.
- Focused tests and build pass.

Completion note:

- Extracted station surface cycling, route/support row selection, nursery-card cycling, and selection normalization into `src/engine/field-station-session.ts`.
- Kept input polling, audio cues, route filing, upgrade purchases, support toggles, expedition activation, nursery actions, notices, saves, and debug export behavior in `src/engine/game.ts`.
- Added focused `src/test/field-station-session.test.ts` coverage and updated architecture/project-memory handoff notes.
- Verification: `npm test -- --run src/test/field-station-session.test.ts`; `npm test -- --run src/test/runtime-smoke.test.ts -t 'field station|outing support|season capstone|High Pass|Source to Shore'`; `npm test -- --run src/test/save-snapshots.test.ts -t 'station|High Pass|Source to Shore'`; `npm run build`.
- Promoted `ECO-20260428-critic-453` to `READY`.

### ECO-20260428-scout-466

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Old-growth and under-root content pack`
- Source: `docs/reports/2026-04-28-old-growth-under-root-content-handoff.md`
- Packet: `.agents/packets/177-lane-2-content-richness-runway.json`
- Depends on: `none`

Completion notes:

- Scoped packet `177` step 1 to a content-only Forest Trail decomposition pack with two landmark entries, two ambient sprites, one close-look seed, two ecosystem notes, science-ledger rows, and focused content tests.
- Promoted `ECO-20260428-main-466` to `READY`.

### ECO-20260428-main-466

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Old-growth and under-root content pack`
- Source: `docs/reports/2026-04-28-old-growth-under-root-content-implementation.md`
- Packet: `.agents/packets/177-lane-2-content-richness-runway.json`
- Depends on: `ECO-20260428-scout-466`

Completion notes:

- Implemented the scoped Forest Trail decomposition pack with `leaf-litter-pocket` and `shelf-fungus` landmark entries, two small forest ambient sprites, one `shelf-fungus` close-look seed, and two ecosystem notes.
- Updated the science ledger with broad `Watch` rows backed by official NPS fungi/decomposition sources.
- Verification: `npm test -- --run src/test/forest-biome.test.ts src/test/ecosystem-notes.test.ts src/test/close-look.test.ts src/test/content-quality.test.ts`; `npm run build`.
- Promoted `ECO-20260428-critic-466` to `READY`.

### ECO-20260428-critic-466

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Old-growth and under-root content pack`
- Source: `docs/reports/2026-04-28-old-growth-under-root-content-review.md`
- Packet: `.agents/packets/177-lane-2-content-richness-runway.json`
- Depends on: `ECO-20260428-main-466`

Completion notes:

- Reviewed the old-growth and under-root content pack with no blockers: claims are source-safe, copy stays compact and kid-readable, and the work stays inside existing content, close-look, ecosystem-note, sprite, test, and ledger seams.
- Verification: `npm test -- --run src/test/forest-biome.test.ts src/test/ecosystem-notes.test.ts src/test/close-look.test.ts src/test/content-quality.test.ts`; `npm run build`.
- Promoted `ECO-20260428-scout-467` to `READY`.

### ECO-20260428-scout-467

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Coastal food-web content pack`
- Source: `docs/reports/2026-04-28-coastal-food-web-content-handoff.md`
- Packet: `.agents/packets/177-lane-2-content-richness-runway.json`
- Depends on: `ECO-20260428-critic-466`

Completion notes:

- Scoped a notes-only coastal food-web pack around existing wrack, dune, scrub, and forest-edge carriers.
- Handoff selects three ecosystem notes: `wrack-bird-line`, `berry-cover-chain`, and `berry-seed-shuttle`, with compact science guardrails and no new inspectables, sprites, close-look seeds, comparison shells, station/route/world-map/save changes, geometry, reward economy, or fourth Source to Shore beat.
- Promoted `ECO-20260428-main-467` to `READY`.

### ECO-20260428-main-467

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Coastal food-web content pack`
- Source: `docs/reports/2026-04-28-coastal-food-web-content-implementation.md`
- Packet: `.agents/packets/177-lane-2-content-richness-runway.json`
- Depends on: `ECO-20260428-scout-467`

Completion notes:

- Implemented the scoped coastal food-web pack as three ecosystem notes only: Beach `wrack-bird-line`, Coastal Scrub `berry-cover-chain`, and Forest Trail `berry-seed-shuttle`.
- No new inspectables, sprites, close-look seeds, comparison shell work, station/route/world-map/save changes, geometry, page, badge, reward economy, or fourth Source to Shore beat were added.
- Verification: `npm test -- --run src/test/ecosystem-notes.test.ts src/test/beach-biome.test.ts src/test/coastal-scrub-biome.test.ts src/test/forest-biome.test.ts src/test/content-quality.test.ts`; `npm run build`.
- Promoted `ECO-20260428-critic-467` to `READY`.

### ECO-20260428-critic-467

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Coastal food-web content pack`
- Source: `docs/reports/2026-04-28-coastal-food-web-content-review.md`
- Packet: `.agents/packets/177-lane-2-content-richness-runway.json`
- Depends on: `ECO-20260428-main-467`

Completion notes:

- Reviewed the coastal food-web content pack with no blockers: the three notes are compact, source-safe, and lane-local.
- Verification: `npm test -- --run src/test/ecosystem-notes.test.ts src/test/beach-biome.test.ts src/test/coastal-scrub-biome.test.ts src/test/forest-biome.test.ts src/test/content-quality.test.ts`; `npm run build`.
- Promoted `ECO-20260428-scout-468` to `READY`.

### ECO-20260428-scout-468

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: High-country season content pack`
- Source: `docs/reports/2026-04-28-high-country-season-shelter-content-handoff.md`
- Packet: `.agents/packets/177-lane-2-content-richness-runway.json`
- Depends on: `ECO-20260428-critic-467`

Completion notes:

- Scoped the high-country pass down to one Tundra close-look seed for `woolly-lousewort`.
- The handoff avoids additional ecosystem-note copy because Treeline/Tundra already have dense shelter and season notes; the gap is making the woolly stem adaptation visible through the existing close-look seam.
- Promoted `ECO-20260428-main-468` to `READY`.

### ECO-20260428-main-468

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: High-country season content pack`
- Source: `docs/reports/2026-04-28-high-country-season-shelter-content-implementation.md`
- Packet: `.agents/packets/177-lane-2-content-richness-runway.json`
- Depends on: `ECO-20260428-scout-468`

Completion notes:

- Implemented the scoped close-look-only high-country pass by adding exactly one `woolly-lousewort` close-look seed.
- Updated focused close-look helper coverage while relying on the existing verified science-ledger row for `woolly-lousewort`.
- Verification: `npm test -- --run src/test/close-look.test.ts src/test/content-quality.test.ts`; `npm run build`.
- Promoted `ECO-20260428-critic-468` to `READY`.

### ECO-20260428-critic-468

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: High-country season content pack`
- Source: `docs/reports/2026-04-28-high-country-season-shelter-content-review.md`
- Packet: `.agents/packets/177-lane-2-content-richness-runway.json`
- Depends on: `ECO-20260428-main-468`

Completion notes:

- Reviewed the `woolly-lousewort` close-look seed with no blockers: copy is compact, source-backed, and kid-readable.
- Confirmed no new inspectables, sprites, ecosystem notes, comparison shell work, station/route/world-map/save changes, geometry, or broad runtime work landed.
- Verification: `npm test -- --run src/test/close-look.test.ts src/test/content-quality.test.ts`; `npm run build`.
- Marked packet `177` done; lane 2 has no remaining actionable item in the current queue order.

### ECO-20260428-scout-475

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Front-half physical continuity`
- Source: `docs/reports/2026-04-28-front-half-physical-continuity-handoff.md`
- Packet: `.agents/packets/178-lane-3-spatial-depth-runway.json`
- Depends on: `none`

Completion notes:

- Captured native `256x160` proof across Beach dune-edge, Coastal Scrub back-dune, Coastal Scrub forest-edge, and Forest Trail arrival/first-cover frames under `output/lane-3-scout-475-front-half-continuity-proof/`.
- Found beach and Coastal Scrub continuity already readable; scoped only one tiny Forest Trail trailhead anchor before fern-hollow and promoted `ECO-20260428-main-475`.
- Updated packet `178` to version `2` with the local implementation contract.

### ECO-20260428-scout-484

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Route support readability`
- Source: `docs/reports/2026-04-28-route-support-readability-handoff.md`
- Packet: `.agents/packets/179-lane-4-route-feel-runway.json`
- Depends on: `none`

Goal:

- Scope one route-support readability pass that makes the tiny support choice easier to feel without adding loadout or station UI.

Acceptance:

- Names the exact route/controller seams and tests.
- Excludes broad content packs, geometry changes, station shell restructuring, save-schema changes, and planner UI.
- Promotes `ECO-20260428-main-484` with a route-owned implementation contract.

Completion note:

- Scoped the pass to contextualizing the existing `OUTING SUPPORT` notice through `src/engine/field-request-controller.ts` and `toggleOutingSupport()` in `src/engine/game.ts`.
- Kept hand-lens inspect retargeting, note-tabs hint bias, place-tab station wrap, route-marker map targets, route catalog shape, station row UI, save schema, route ids, evidence ids, and ready-to-file map-calm behavior out of scope.
- Wrote the handoff report and packet scout contract, then promoted `ECO-20260428-main-484` to `READY`.
- Verification: `npm run validate:agents` passed after the packet and queue updates.

### ECO-20260428-main-484

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Route support readability`
- Source: `docs/reports/2026-04-28-route-support-readability-implementation.md`
- Packet: `.agents/packets/179-lane-4-route-feel-runway.json`
- Depends on: `ECO-20260428-scout-484`

Goal:

- Implement the scoped support-readability improvement through route/controller seams.

Acceptance:

- The existing `OUTING SUPPORT` feedback becomes contextual for active and ready-to-file routes without adding a loadout, planner, or station UI.
- Focused route/controller/runtime tests and build pass.
- No broad content, geometry, station shell, route catalog, support-system, or save-schema change lands.

Completion notes:

- Extended `getOutingSupportNoticeText(...)` so active gathering routes can explain the selected support's immediate route effect and ready-to-file routes use calm note-ready copy.
- Updated `toggleOutingSupport()` to pass the current active request into the support notice helper.
- Preserved support mechanics, route ids, evidence ids, ordered slots, route catalog shape, save schema, station UI, and ready-to-file map-calm behavior.
- Verification: focused controller/runtime/route/station/snapshot tests plus `npm run build` passed.
- Promoted `ECO-20260428-critic-484` to `READY`.

### ECO-20260428-critic-484

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Route support readability`
- Source: `docs/reports/2026-04-28-route-support-readability-review.md`
- Packet: `.agents/packets/179-lane-4-route-feel-runway.json`
- Depends on: `ECO-20260428-main-484`

Goal:

- Review support readability for clarity, no HUD drift, and stable support behavior.

Acceptance:

- Confirms support remains tiny and route-facing.
- Promotes `ECO-20260428-scout-485` if clean.

Completion notes:

- Found no blocking issue in the contextual `OUTING SUPPORT` notice pass.
- Confirmed ready-to-file routes keep calm note-ready support copy with no marker, replay, or in-field hunt implication.
- Verification: focused controller support tests and route-marker runtime smoke slices passed.
- Promoted `ECO-20260428-scout-485` to `READY`.

### ECO-20260428-scout-485

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Route-local replay variants`
- Source: `docs/reports/2026-04-28-route-local-replay-variants-handoff.md`
- Packet: `.agents/packets/179-lane-4-route-feel-runway.json`
- Depends on: `ECO-20260428-critic-484`

Goal:

- Scope route-local replay variants tied to existing world-state, process, or nursery seams.

Acceptance:

- Selects one or two route variants with stable filed identity.
- Excludes a new replay system, save schema, content pack, geometry, and station shell.
- Promotes `ECO-20260428-main-485` with a route-owned implementation contract.

Completion notes:

- Selected one active-only Source to Shore variant: `Held Dune` for active `Dune Catch` during the existing Coastal Scrub `sand-capture` process window.
- Scoped the implementation to `field-request-catalog.ts`, `source-to-shore-state.ts`, and focused route/board/snapshot/runtime tests as needed.
- Kept canonical `Dune Catch` ready/filed identity, Source to Shore beat count, route ids, evidence ids, slot order, support behavior, save schema, station shell, content, and geometry out of scope.
- Verification: `npm run validate:agents` passed after the in-progress claim.
- Promoted `ECO-20260428-main-485` to `READY`.

### ECO-20260428-main-485

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Route-local replay variants`
- Source: `docs/reports/2026-04-28-route-local-replay-variants-implementation.md`
- Packet: `.agents/packets/179-lane-4-route-feel-runway.json`
- Depends on: `ECO-20260428-scout-485`

Goal:

- Implement the scoped route-local replay variants through existing route fields and tests.

Acceptance:

- Live replay flavor improves while canonical filed route titles and saved identities remain stable.
- Focused route/controller/snapshot tests and build pass.
- No new route type, planner, save schema, content pack, or geometry work lands.

Completion notes:

- Added active-only `Held Dune` for active `source-to-shore-dune-catch` during the existing Coastal Scrub `sand-capture` process window.
- Mirrored the variant through Source to Shore station, atlas, active outing, and world-map surfaces while keeping ready/filed `Dune Catch` canonical.
- Preserved the three-beat Source to Shore endpoint, route ids, evidence ids, slot order, support behavior, save schema, station shell, content, geometry, and replay-framework boundaries.
- Verification: focused route/controller/station/snapshot tests plus `npm run build` passed.
- Promoted `ECO-20260428-critic-485` to `READY`.

### ECO-20260428-critic-485

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Route-local replay variants`
- Source: `docs/reports/2026-04-28-route-local-replay-variants-review.md`
- Packet: `.agents/packets/179-lane-4-route-feel-runway.json`
- Depends on: `ECO-20260428-main-485`

Goal:

- Review route replay variants for canonical filing stability and no hidden progression drift.

Acceptance:

- Confirms replay is soft, route-local, and test-backed.
- Promotes `ECO-20260428-scout-486` if clean.

Completion notes:

- Found no blocking issue in the active-only `Held Dune` variant.
- Confirmed ready/filed `Dune Catch` identity, Source to Shore beat count, route ids, evidence ids, ordered slots, support behavior, save schema, station shell, content, geometry, and replay-framework boundaries stayed stable.
- Verification: focused route, station/atlas, and snapshot slices passed; implementation report records the controller slice and `npm run build` passing.
- Promoted `ECO-20260428-scout-486` to `READY`.

### ECO-20260428-scout-486

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Filing depth and catalog guardrails`
- Source: `docs/reports/2026-04-28-filing-depth-catalog-guardrails-handoff.md`
- Packet: `.agents/packets/179-lane-4-route-feel-runway.json`
- Depends on: `ECO-20260428-critic-485`

Goal:

- Scope one notebook filing-depth or route-catalog guardrail pass.

Acceptance:

- Names the authoring gap, tests, and exact route-owned files.
- Avoids new station shell, planner, save schema, content pack, or geometry requirements.
- Promotes `ECO-20260428-main-486` with a narrow route implementation contract.

Completion notes:

- Scoped a test/docs-only route catalog authoring guard around canonical filed text, display-only replay prefixes, exact evidence-slot order, clue-backed filing tails, and active alternate clue references.
- Kept runtime filing behavior, saved route identity, route ids, evidence ids, ordered slots, support behavior, save schema, station shell, content, geometry, and Source to Shore beat count out of scope.
- Verification: baseline filed-note synthesis and route-variant matrix slice passed.
- Promoted `ECO-20260428-main-486` to `READY`.

### ECO-20260428-main-486

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Filing depth and catalog guardrails`
- Source: `docs/reports/2026-04-28-filing-depth-catalog-guardrails-implementation.md`
- Packet: `.agents/packets/179-lane-4-route-feel-runway.json`
- Depends on: `ECO-20260428-scout-486`

Goal:

- Implement one notebook filing-depth or catalog-guardrail improvement with focused route tests.

Acceptance:

- Route authorship becomes safer or filed-note payoff becomes clearer without changing saved route identity.
- Focused route/controller/station/snapshot tests and build pass.
- No station shell, geometry, broad content pack, planner, or save-schema change lands.

Completion notes:

- Added `src/test/field-request-catalog.test.ts` as a direct Route v2 catalog authoring guard for route ids, ready copy, evidence-slot order, clue-backed filing tails, active replay labels, and active alternate clue references.
- Updated `docs/content-authoring.md` with the canonical filed text, display-only replay prefix, and active-alternate route slot/entry rule.
- Kept the pass test/docs-only with no route runtime, save schema, support behavior, station shell, content, geometry, route framework, or Source to Shore beat-count change.
- Verification: new catalog guard, focused filed-note/route-variant matrix, and `npm run build` passed.
- Promoted `ECO-20260428-critic-486` to `READY`.

### ECO-20260428-critic-486

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Filing depth and catalog guardrails`
- Source: `docs/reports/2026-04-28-filing-depth-catalog-guardrails-review.md`
- Packet: `.agents/packets/179-lane-4-route-feel-runway.json`
- Depends on: `ECO-20260428-main-486`

Goal:

- Review the route-feel runway and decide whether lane 4 is ready for a new chapter-grade outing.

Acceptance:

- Confirms route semantics are cleaner and lane boundaries held.
- Marks packet `179` done or opens the smallest lane-4-local follow-up.

Completion notes:

- Found no blocking issue in the test/docs-only route catalog guardrail.
- Confirmed the new guard protects canonical filed text, display-only replay prefixes, exact evidence-slot ordering, clue-backed filing tails, and active alternate clue references without runtime drift.
- Verification: new catalog guard, focused filed-note/route-variant matrix, and `npm run build` passed.
- Marked packet `179` done; lane 4 has no remaining actionable work in this runway.

### ECO-20260428-critic-452

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Route catalog extraction`
- Source: `docs/reports/2026-04-28-route-catalog-extraction-review.md`
- Packet: `.agents/packets/171-route-catalog-extraction.json`
- Depends on: `ECO-20260428-main-452`

Goal:

- Review the route catalog extraction for behavior parity and authoring clarity.

Acceptance:

- Confirms the extraction makes future route authoring easier without moving complexity into a murkier place.
- Verifies focused parity tests and any docs updates are sufficient.
- Promotes the coordinator split if the codebase is steadier.

Completion note:

- Reviewed the catalog extraction as clean: definitions and shape types moved to `src/engine/field-request-catalog.ts`, while runtime resolution, support behavior, evidence progression, filing, and filed-note synthesis stayed in `field-requests.ts`.
- Confirmed compatibility re-exports, docs, and parity tests cover the new boundary with no route id, evidence id, slot-order, save, route-framework, planner, or support drift.
- Re-ran route/controller/content/station/snapshot/save tests and `npm run build`; both passed.
- Marked packet `171` clean and promoted lane-1 `ECO-20260428-main-453` to `READY`.

### ECO-20260428-main-452

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Route catalog extraction`
- Source: `docs/reports/2026-04-28-route-catalog-extraction-implementation.md`
- Packet: `.agents/packets/171-route-catalog-extraction.json`
- Depends on: `ECO-20260428-scout-452`, `ECO-20260428-critic-451`

Goal:

- Extract authored route definitions toward a clearer catalog boundary without changing route behavior.

Acceptance:

- Route ids, evidence ids, ordered slots, support behavior, and filed states remain unchanged.
- Focused route/controller/content tests pass.
- Authoring or architecture docs are updated only if a durable boundary changed.

Completion note:

- Added `src/engine/field-request-catalog.ts` for request definition shape types and the ordered `FIELD_REQUEST_DEFINITIONS` catalog.
- Kept active request resolution, support behavior, evidence progression, filed-note synthesis, and notebook filing in `src/engine/field-requests.ts`.
- Preserved compatibility re-exports from `field-requests.ts`, and updated architecture/content-authoring docs plus project memory with the new boundary.
- Verification passed: route/controller/content parity tests, Source to Shore/High Pass snapshot-board slice, `npm run build`, and `src/test/save.test.ts`.
- Promoted `ECO-20260428-critic-452` to `READY`.

### ECO-20260428-critic-451

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Source to Shore route-flow consolidation`
- Source: `docs/reports/2026-04-28-source-to-shore-route-flow-consolidation-review.md`
- Packet: `.agents/packets/170-source-to-shore-route-flow-consolidation.json`
- Depends on: `ECO-20260428-main-451`

Goal:

- Review Source to Shore route flow for state consistency and clean beta-chapter behavior.

Acceptance:

- Confirms station, map, journal, atlas, support, filed state, and debug snapshots agree.
- Confirms the three-beat chapter ends calmly rather than implying hidden breadth.
- Promotes route catalog extraction if behavior is stable.

Completion note:

- Reviewed the explicit Source to Shore beat-flow matrix, station-board consumption, ready-to-file route-marker/replay calm behavior, and final filed closure as clean.
- Confirmed no fourth beat, route framework, planner, dashboard, support-system expansion, or save-schema drift landed.
- Re-ran touched route/controller/station/snapshot tests and `npm run build`; both passed.
- Marked packet `170` clean and promoted `ECO-20260428-main-452` to `READY`.

### ECO-20260428-main-451

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Source to Shore route-flow consolidation`
- Source: `docs/reports/2026-04-28-source-to-shore-route-flow-consolidation-implementation.md`
- Packet: `.agents/packets/170-source-to-shore-route-flow-consolidation.json`
- Depends on: `ECO-20260428-scout-451`, `ECO-20260428-critic-450`

Goal:

- Consolidate active, ready, filed, station, map, journal, atlas, support, and snapshot behavior for the current Source to Shore beta.

Acceptance:

- All three existing Source to Shore beats agree across the core route surfaces.
- Representative active, ready, and filed states are covered by focused regression tests.
- No fourth beat, route framework, planner, or save-schema change lands.

Completion note:

- Added the explicit `SOURCE_TO_SHORE_BEAT_FLOW` matrix and beat-surface helper in `src/engine/source-to-shore-state.ts`.
- Updated the dedicated `source-to-shore-beta` station board to consume that beat surface state while preserving route ids, evidence ids, ordered slots, support behavior, save schema, and final filed closure.
- Added ready-to-file route-marker/replay calm coverage across Source Shelter, Forest Release, and Dune Catch plus Source to Shore support projection coverage.
- Verification passed: focused route/controller tests, focused station-board tests, focused debug-snapshot tests, full touched route/station/snapshot test files, and `npm run build`.
- Promoted `ECO-20260428-critic-451` to `READY`.

### ECO-20260428-critic-454

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Source to Shore filed-memory payoff`
- Source: `docs/reports/2026-04-28-source-to-shore-filed-memory-payoff-review.md`
- Packet: `.agents/packets/173-source-to-shore-filed-memory-payoff.json`
- Depends on: `ECO-20260428-main-454`

Goal:

- Review the filed-memory payoff for science accuracy, copy fit, and chapter-end tone.

Acceptance:

- Confirms the payoff feels satisfying without implying a hidden fourth beat.
- Confirms all ecological claims are source-safe and kid-readable.
- Promotes final signoff inputs if no content blocker remains.

Completion note:

- Reviewed the filed atlas payoff `Filed: high source -> forest release -> coastal catch.` as clean: 54 characters, source-safe, kid-readable, and limited to the three existing Source to Shore beats.
- Confirmed no new page, badge, reward economy, atlas mode, notebook prompt, route state, save schema, or fourth beat landed.
- Re-ran the focused Source to Shore/Dune Catch board and snapshot test slice; packet `173` is now done. Full-arc signoff remains parked until the remaining packet reviews clear.

### ECO-20260428-main-454

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Source to Shore filed-memory payoff`
- Source: `docs/reports/2026-04-28-source-to-shore-filed-memory-payoff-implementation.md`
- Packet: `.agents/packets/173-source-to-shore-filed-memory-payoff.json`
- Depends on: `ECO-20260428-scout-454`, `ECO-20260428-critic-450`

Goal:

- Add one compact filed-memory payoff for the completed Source to Shore chapter using existing surfaces.

Acceptance:

- The payoff reinforces the high-source to forest-release to coastal-catch relationship.
- Science/copy checks pass and player-facing text stays compact.
- No new page, badge, reward economy, fourth beat, or route-state expansion lands.

Completion note:

- Updated the filed Source to Shore `FIELD ATLAS` note to `Filed: high source -> forest release -> coastal catch.` on the existing `resolveDuneCatchState('filed')` seam.
- Updated exact-copy expectations in `src/test/field-season-board.test.ts` and `src/test/save-snapshots.test.ts`; focused Source to Shore/Dune Catch tests and `npm run build` passed.
- Promoted `ECO-20260428-critic-454` to `READY`.

### ECO-20260428-scout-450

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P0`
- Title: `L1 scout: Source to Shore station container`
- Source: `docs/reports/2026-04-28-source-to-shore-station-container-handoff.md`
- Packet: `.agents/packets/169-source-to-shore-station-container.json`
- Depends on: `none`

Goal:

- Design the smallest dedicated station/board container for the three-beat Source to Shore beta so it no longer rides inside the completed `EDGE LINE LOGGED` shell.

Acceptance:

- Defines active, ready-to-file, and filed container states with target files and proof expectations.
- Protects the first-season completed board identity and avoids planner/dashboard drift.
- Promotes `ECO-20260428-main-450` only after the surface-triage gate is named.

Completion note:

- Wrote the implementation contract in `docs/reports/2026-04-28-source-to-shore-station-container-handoff.md` and packet `169` version `2`.
- Named the clean surface gate from packet `168`, the dedicated `source-to-shore-beta` board shape, exact three-beat scope, target files, and proof expectations.
- Promoted `ECO-20260428-main-450` to `READY`.

### ECO-20260428-main-450

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P0`
- Title: `L1 implement: Source to Shore station container`
- Source: `docs/reports/2026-04-28-source-to-shore-station-container-implementation.md`
- Packet: `.agents/packets/169-source-to-shore-station-container.json`
- Depends on: `ECO-20260428-scout-450`, `ECO-20260428-critic-449`

Goal:

- Implement a dedicated compact Source to Shore station/board container for the existing three-beat beta.

Acceptance:

- Post-High-Pass Source to Shore no longer appears as a launch card inside the completed `EDGE LINE LOGGED` board.
- Active, ready-to-file, and filed beta states still use existing Route v2 seams.
- Focused station/board/runtime tests and visual proof pass.

Completion note:

- Added the dedicated `source-to-shore-beta` route board with exactly three Source to Shore beats and `launchCard: null`, while preserving Route v2 state and save behavior.
- Kept the first-season archive strip, atlas logged-route history, late-season station lintel, and salmonberry nursery capstone hint intact.
- Verified focused Source to Shore/runtime/snapshot tests, full `runtime-smoke`, full `field-season-board` plus save snapshots, `npm run build`, web-game client smoke, and native `256x160` browser proof under `output/lane-1-main-450-browser/`.
- Promoted `ECO-20260428-critic-450` to `READY`.

### ECO-20260428-critic-450

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P0`
- Title: `L1 review: Source to Shore station container`
- Source: `docs/reports/2026-04-28-source-to-shore-station-container-review.md`
- Packet: `.agents/packets/169-source-to-shore-station-container.json`
- Depends on: `ECO-20260428-main-450`

Goal:

- Review the Source to Shore station container for density, state continuity, and future extensibility.

Acceptance:

- Confirms the new container is compact, game-first, and separate from the completed first-season board identity.
- Verifies no fourth beat, planner, dashboard, save expansion, or route-framework drift landed.
- Promotes the downstream route-flow, content-payoff, and spatial-polish implementation steps if clean.

Completion note:

- Wrote clean review report `docs/reports/2026-04-28-source-to-shore-station-container-review.md`.
- Confirmed the dedicated `source-to-shore-beta` board stays compact at native `256x160`, shows exactly three Source to Shore beats, keeps active/ready/filed Route v2 continuity, and preserves first-season archive/atlas/lintel/nursery seams.
- Verified focused Source to Shore/journal/snapshot route tests and `npm run build`.
- Marked packet `169` done and promoted `ECO-20260428-main-451`, `ECO-20260428-main-454`, and `ECO-20260428-main-455` to `READY`.

### ECO-20260428-scout-453

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Game coordinator controller split`
- Source: `docs/reports/2026-04-28-game-coordinator-controller-split-handoff.md`
- Packet: `.agents/packets/172-game-coordinator-controller-split.json`
- Depends on: `none`

Goal:

- Identify one narrow `game.ts` coordinator responsibility that can move behind a clearer controller boundary without changing gameplay.

Acceptance:

- Chooses exactly one extraction target, such as station/menu input or debug serialization.
- Names the behavior tests and files that must stay stable.
- Promotes `ECO-20260428-main-453` only behind the route-flow and route-catalog gates.

Completion note:

- Selected the existing `src/engine/field-station-session.ts` seam for one narrow station selection/navigation split.
- Wrote `docs/reports/2026-04-28-game-coordinator-controller-split-handoff.md` and packet `172` version `2` with target helpers, non-goals, and proof plan.
- Left `ECO-20260428-main-453` parked because the route-flow and route-catalog gates are not clean yet.

### ECO-20260428-scout-456

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Steady beta full-arc signoff`
- Source: `docs/reports/2026-04-28-steady-beta-full-arc-signoff-handoff.md`
- Packet: `.agents/packets/175-steady-beta-full-arc-signoff.json`
- Depends on: `none`

Goal:

- Design the final proof checklist for the full Steady Beta Foundation wave.

Acceptance:

- Names the required end-to-end proof path from post-High-Pass station entry through filed Source to Shore payoff.
- Includes station, journal, atlas, map, support, debug snapshot, browser proof, build, and alpha-RC expectations.
- Promotes `ECO-20260428-main-456` only after packets `168` through `174` have clean critic signoff.

Completion note:

- Wrote `docs/reports/2026-04-28-steady-beta-full-arc-signoff-handoff.md` and packet `175` version `2`.
- Defined the seven-state debug-save proof spine, station/journal/atlas/map/support/browser matrix, required command set, browser artifact expectations, and final report shape.
- Left `ECO-20260428-main-456` parked because packets `170` through `174` still need clean critic signoff.

### ECO-20260428-scout-455

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Source to Shore spatial playthrough polish`
- Source: `docs/reports/2026-04-28-source-to-shore-spatial-playthrough-handoff.md`
- Packet: `.agents/packets/174-source-to-shore-spatial-playthrough-polish.json`
- Depends on: `none`

Goal:

- Play the three existing Source to Shore habitats as a physical route and identify only real spatial readability issues.

Acceptance:

- Names the representative `256x160` proof points for Source Shelter, Forest Release, and Coastal Catch.
- Allows tiny local geometry/carrier fixes only if proof shows a real readability problem.
- Promotes `ECO-20260428-main-455` only behind the station-container gate.

Completion note:

- Captured native `256x160` browser proof for Source Shelter, Forest Release, and Coastal Catch under `output/lane-3-scout-455-source-to-shore-spatial-proof/`.
- Found one real local issue: the Source Shelter right-edge ptarmigan memory can overlap the `TO TUNDRA REACH` prompt range; Forest Release and Coastal Catch read cleanly with no travel prompt competition.
- Left `ECO-20260428-main-455` parked until `ECO-20260428-critic-450` clears the station-container gate, with the tiny Treeline-only implementation contract recorded in packet `174` version `2`.

### ECO-20260428-main-455

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: Source to Shore spatial playthrough polish`
- Source: `docs/reports/2026-04-28-source-to-shore-spatial-playthrough-implementation.md`
- Packet: `.agents/packets/174-source-to-shore-spatial-playthrough-polish.json`
- Depends on: `ECO-20260428-scout-455`, `ECO-20260428-critic-450`

Goal:

- Apply only the smallest spatial polish needed for the existing Source Shelter, Forest Release, and Coastal Catch playthrough.

Acceptance:

- Representative `256x160` proof or focused tests show the three existing beats are spatially readable.
- Any geometry or carrier edits are tiny, local, and science-safe.
- No new traversal system, biome, cave, physics pass, or fourth beat lands.

Completion note:

- Nudged only the Treeline Source Shelter high-source source-memory platform/carriers a few pixels left so the memory reads before the `TO TUNDRA REACH` prompt edge.
- Left Forest Release and Coastal Catch geometry unchanged, with fresh `256x160` browser proof for all three spaces under `output/lane-3-main-455-source-to-shore-spatial-proof/`.
- Verified `npm test -- --run src/test/treeline-biome.test.ts src/test/forest-biome.test.ts src/test/coastal-scrub-biome.test.ts src/test/runtime-smoke.test.ts`, `npm run build`, and web-game smoke; promoted `ECO-20260428-critic-455`.

### ECO-20260428-critic-455

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: Source to Shore spatial playthrough polish`
- Source: `docs/reports/2026-04-28-source-to-shore-spatial-playthrough-review.md`
- Packet: `.agents/packets/174-source-to-shore-spatial-playthrough-polish.json`
- Depends on: `ECO-20260428-main-455`

Goal:

- Review spatial polish for real readability improvement, honest carrier placement, and no traversal-system drift.

Acceptance:

- Confirms proof covers Source Shelter, Forest Release, and Coastal Catch.
- Confirms any spatial changes are local and science-safe.
- Promotes final signoff inputs if no spatial blocker remains.

Completion note:

- Reviewed the Treeline-only source-memory nudge cleanly; no blocking issue or science/geometry/system drift found.
- Confirmed browser proof covers Source Shelter before prompt, Source Shelter prompt-edge separation, Forest Release, and Coastal Catch with empty browser errors.
- Marked packet `174` done; left `ECO-20260428-main-456` parked until its other non-spatial review dependencies are also clean.

### ECO-20260428-critic-449

- Status: `DONE`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P0`
- Title: `L1 review: Steady beta surface triage`
- Source: `docs/reports/2026-04-28-steady-beta-surface-triage-review.md`
- Packet: `.agents/packets/168-steady-beta-surface-triage.json`
- Depends on: `ECO-20260428-main-449`

Goal:

- Review the surface triage for handheld fit, copy legibility, and absence of route-state drift.

Acceptance:

- Confirms the subtitle/tabs and journal progress label no longer collide or clip.
- Names any remaining visual blocker before station-container implementation starts.
- Promotes `ECO-20260428-main-450` if no blocker remains.

Completion note:

- Reviewed clean: the station subtitle/tab row and fresh journal `0/3 stages` label are readable at `256x160`, and the change stayed limited to surface rendering plus runtime-smoke guards.
- Surface gate is clear, but `ECO-20260428-main-450` remains parked until `ECO-20260428-scout-450` finishes the station-container scope contract.

### ECO-20260428-main-449

- Status: `DONE`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P0`
- Title: `L1 implement: Steady beta surface triage`
- Source: `docs/reports/2026-04-28-steady-beta-surface-triage-implementation.md`
- Packet: `.agents/packets/168-steady-beta-surface-triage.json`
- Depends on: `ECO-20260428-scout-449`

Goal:

- Implement the scoped station subtitle/tab spacing and journal route progress label fixes without changing route behavior.

Acceptance:

- Station Source to Shore state and fresh journal route card fit cleanly at `256x160`.
- Focused layout/station/journal proof or tests pass.
- No Source to Shore container, route-state, save-state, or new system work is included.

Completion note:

- Fixed `src/engine/overlay-render.ts` so the station subtitle row sits clear of `SEASON` / `NURSERY` tabs and journal route progress labels use the same measured trimmed text that is right-aligned.
- Added runtime-smoke guards for Source to Shore station tab spacing and a fresh journal `0/3 stages` route card; captured native `256x160` browser proof under ignored `output/lane-1-main-449-browser/`.
- Verified with focused Source to Shore/journal tests, the web-game client, targeted browser proof, and `npm run build`.
- Promoted `ECO-20260428-critic-449`.

### ECO-20260428-scout-452

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Route catalog extraction`
- Source: `docs/reports/2026-04-28-route-catalog-extraction-handoff.md`
- Packet: `.agents/packets/171-route-catalog-extraction.json`
- Depends on: `none`

Goal:

- Find the safest behavior-preserving route-data boundary so future Route v2 and Source to Shore authoring is easier.

Acceptance:

- Identifies the exact current route-definition pressure point and the preferred module boundary.
- Lists focused parity tests that protect route ids, evidence ids, ordered slots, support behavior, and filed states.
- Promotes `ECO-20260428-main-452` only after route-flow consolidation is clean.

Completion note:

- Scoped packet `171` version `2` to a behavior-preserving `src/engine/field-request-catalog.ts` extraction with compatibility re-exports from `src/engine/field-requests.ts`.
- Left `ECO-20260428-main-452` parked because route-flow consolidation and `ECO-20260428-critic-451` are not complete.

### ECO-20260428-scout-451

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Source to Shore route-flow consolidation`
- Source: `docs/reports/2026-04-28-source-to-shore-route-flow-consolidation-handoff.md`
- Packet: `.agents/packets/170-source-to-shore-route-flow-consolidation.json`
- Depends on: `none`

Goal:

- Map every Source to Shore active, ready, filed, station, map, journal, atlas, support, and debug-snapshot touchpoint around the new container.

Acceptance:

- Produces a narrow implementation contract for consolidating current three-beat behavior.
- Explicitly blocks a fourth beat, route framework change, and save-schema expansion.
- Promotes `ECO-20260428-main-451` only behind the station-container review gate.

Completion note:

- Wrote the touchpoint map and implementation contract into packet `170` version `2` and `docs/reports/2026-04-28-source-to-shore-route-flow-consolidation-handoff.md`.
- Left `ECO-20260428-main-451` parked because it is still gated by `ECO-20260428-critic-450`.

### ECO-20260428-scout-454

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Source to Shore filed-memory payoff`
- Source: `docs/reports/2026-04-28-source-to-shore-filed-memory-payoff-handoff.md`
- Packet: `.agents/packets/173-source-to-shore-filed-memory-payoff.json`
- Depends on: `none`

Goal:

- Scope one compact filed-state payoff that makes the completed Source to Shore chapter feel remembered without creating a new system.

Acceptance:

- Selects the existing surface seam for the payoff and names the science/copy checks.
- Keeps the payoff to the three existing beats and avoids badge, reward, atlas-mode, or fourth-beat implications.
- Promotes `ECO-20260428-main-454` only after the station-container gate is clean.

Completion note:

- Selected the filed `FIELD ATLAS` note from `resolveDuneCatchState('filed')` as the one-line payoff seam, with candidate copy `Filed: high source -> forest release -> coastal catch.`.
- Recorded the science/copy checks and verification plan in packet `173` version `2`; `ECO-20260428-main-454` remains parked until `ECO-20260428-critic-450` clears the station-container gate.

### ECO-20260428-scout-449

- Status: `DONE`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P0`
- Title: `L1 scout: Steady beta surface triage`
- Source: `docs/reports/2026-04-28-steady-beta-surface-triage-handoff.md`
- Packet: `.agents/packets/168-steady-beta-surface-triage.json`
- Depends on: `none`

Goal:

- Scope the smallest visible UI/layout pass for the live Source to Shore station subtitle/tab collision and the journal route progress clipping.

Acceptance:

- Names the exact layout files, tests, and browser proof needed for the station and journal fixes.
- Confirms Source to Shore container work, route-state changes, and new copy systems are out of scope.
- Promotes `ECO-20260428-main-449` only with a tight implementation contract.

Completion note:

- Scoped the packet to `src/engine/overlay-render.ts` plus focused runtime/field-season proof; `src/engine/field-season-board.ts` Source to Shore container work remains read-only context for packet `169`.
- Promoted `ECO-20260428-main-449` with the implementation contract recorded in packet `168` and the handoff report.

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
