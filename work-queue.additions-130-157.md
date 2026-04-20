# Packet 130-157 Alpha Runway Queue Additions

## Ready

### ECO-20260420-scout-326

- Status: `READY`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `none`

Goal:

- Prepare the lane-1 contract for packet 130; details live in the packet.

### ECO-20260420-scout-327

- Status: `READY`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `none`

Goal:

- Prepare the lane-2 contract for packet 130; details live in the packet.

### ECO-20260420-scout-328

- Status: `READY`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `none`

Goal:

- Prepare the lane-3 contract for packet 130; details live in the packet.

### ECO-20260420-scout-329

- Status: `READY`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `none`

Goal:

- Prepare the lane-4 contract for packet 130; details live in the packet.


## Blocked

### ECO-20260420-main-326

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `ECO-20260420-scout-326`

Goal:

- Implement the lane-1 contract for packet 130; details live in the packet.

### ECO-20260420-critic-326

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `ECO-20260420-main-326`

Goal:

- Review the lane-1 contract for packet 130; details live in the packet.

### ECO-20260420-main-327

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `ECO-20260420-scout-327`

Goal:

- Implement the lane-2 contract for packet 130; details live in the packet.

### ECO-20260420-critic-327

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `ECO-20260420-main-327`

Goal:

- Review the lane-2 contract for packet 130; details live in the packet.

### ECO-20260420-main-328

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `ECO-20260420-scout-328`

Goal:

- Implement the lane-3 contract for packet 130; details live in the packet.

### ECO-20260420-critic-328

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `ECO-20260420-main-328`

Goal:

- Review the lane-3 contract for packet 130; details live in the packet.

### ECO-20260420-main-329

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `ECO-20260420-scout-329`

Goal:

- Implement the lane-4 contract for packet 130; details live in the packet.

### ECO-20260420-critic-329

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Alpha runway setup and review-drop hygiene`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/130-alpha-runway-setup-and-review-hygiene.json`
- Depends on: `ECO-20260420-main-329`

Goal:

- Review the lane-4 contract for packet 130; details live in the packet.

### ECO-20260420-scout-330

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-critic-326`

Goal:

- Prepare the lane-1 contract for packet 131; details live in the packet.

### ECO-20260420-main-330

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-scout-330`

Goal:

- Implement the lane-1 contract for packet 131; details live in the packet.

### ECO-20260420-critic-330

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-main-330`

Goal:

- Review the lane-1 contract for packet 131; details live in the packet.

### ECO-20260420-scout-331

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-critic-327`

Goal:

- Prepare the lane-2 contract for packet 131; details live in the packet.

### ECO-20260420-main-331

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-scout-331`

Goal:

- Implement the lane-2 contract for packet 131; details live in the packet.

### ECO-20260420-critic-331

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-main-331`

Goal:

- Review the lane-2 contract for packet 131; details live in the packet.

### ECO-20260420-scout-332

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-critic-328`

Goal:

- Prepare the lane-3 contract for packet 131; details live in the packet.

### ECO-20260420-main-332

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-scout-332`

Goal:

- Implement the lane-3 contract for packet 131; details live in the packet.

### ECO-20260420-critic-332

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-main-332`

Goal:

- Review the lane-3 contract for packet 131; details live in the packet.

### ECO-20260420-scout-333

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-critic-329`

Goal:

- Prepare the lane-4 contract for packet 131; details live in the packet.

### ECO-20260420-main-333

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-scout-333`

Goal:

- Implement the lane-4 contract for packet 131; details live in the packet.

### ECO-20260420-critic-333

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Playthrough instrumentation and save snapshots`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/131-playthrough-instrumentation-and-save-snapshots.json`
- Depends on: `ECO-20260420-main-333`

Goal:

- Review the lane-4 contract for packet 131; details live in the packet.

### ECO-20260420-scout-334

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-critic-330`

Goal:

- Prepare the lane-1 contract for packet 132; details live in the packet.

### ECO-20260420-main-334

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-scout-334`

Goal:

- Implement the lane-1 contract for packet 132; details live in the packet.

### ECO-20260420-critic-334

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-main-334`

Goal:

- Review the lane-1 contract for packet 132; details live in the packet.

### ECO-20260420-scout-335

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-critic-331`

Goal:

- Prepare the lane-2 contract for packet 132; details live in the packet.

### ECO-20260420-main-335

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-scout-335`

Goal:

- Implement the lane-2 contract for packet 132; details live in the packet.

### ECO-20260420-critic-335

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-main-335`

Goal:

- Review the lane-2 contract for packet 132; details live in the packet.

### ECO-20260420-scout-336

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-critic-332`

Goal:

- Prepare the lane-3 contract for packet 132; details live in the packet.

### ECO-20260420-main-336

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-scout-336`

Goal:

- Implement the lane-3 contract for packet 132; details live in the packet.

### ECO-20260420-critic-336

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-main-336`

Goal:

- Review the lane-3 contract for packet 132; details live in the packet.

### ECO-20260420-scout-337

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-critic-333`

Goal:

- Prepare the lane-4 contract for packet 132; details live in the packet.

### ECO-20260420-main-337

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-scout-337`

Goal:

- Implement the lane-4 contract for packet 132; details live in the packet.

### ECO-20260420-critic-337

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: First-session onboarding and wayfinding proof`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
- Depends on: `ECO-20260420-main-337`

Goal:

- Review the lane-4 contract for packet 132; details live in the packet.

### ECO-20260420-scout-338

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-critic-334`

Goal:

- Prepare the lane-1 contract for packet 133; details live in the packet.

### ECO-20260420-main-338

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-scout-338`

Goal:

- Implement the lane-1 contract for packet 133; details live in the packet.

### ECO-20260420-critic-338

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-main-338`

Goal:

- Review the lane-1 contract for packet 133; details live in the packet.

### ECO-20260420-scout-339

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-critic-335`

Goal:

- Prepare the lane-2 contract for packet 133; details live in the packet.

### ECO-20260420-main-339

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-scout-339`

Goal:

- Implement the lane-2 contract for packet 133; details live in the packet.

### ECO-20260420-critic-339

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-main-339`

Goal:

- Review the lane-2 contract for packet 133; details live in the packet.

### ECO-20260420-scout-340

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-critic-336`

Goal:

- Prepare the lane-3 contract for packet 133; details live in the packet.

### ECO-20260420-main-340

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-scout-340`

Goal:

- Implement the lane-3 contract for packet 133; details live in the packet.

### ECO-20260420-critic-340

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 review: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-main-340`

Goal:

- Review the lane-3 contract for packet 133; details live in the packet.

### ECO-20260420-scout-341

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-critic-337`

Goal:

- Prepare the lane-4 contract for packet 133; details live in the packet.

### ECO-20260420-main-341

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-scout-341`

Goal:

- Implement the lane-4 contract for packet 133; details live in the packet.

### ECO-20260420-critic-341

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Full-arc deterministic smoke matrix`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/133-full-arc-deterministic-smoke-matrix.json`
- Depends on: `ECO-20260420-main-341`

Goal:

- Review the lane-4 contract for packet 133; details live in the packet.

### ECO-20260420-scout-342

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-critic-338`

Goal:

- Prepare the lane-1 contract for packet 134; details live in the packet.

### ECO-20260420-main-342

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-scout-342`

Goal:

- Implement the lane-1 contract for packet 134; details live in the packet.

### ECO-20260420-critic-342

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-main-342`

Goal:

- Review the lane-1 contract for packet 134; details live in the packet.

### ECO-20260420-scout-343

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-critic-339`

Goal:

- Prepare the lane-2 contract for packet 134; details live in the packet.

### ECO-20260420-main-343

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-scout-343`

Goal:

- Implement the lane-2 contract for packet 134; details live in the packet.

### ECO-20260420-critic-343

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-main-343`

Goal:

- Review the lane-2 contract for packet 134; details live in the packet.

### ECO-20260420-scout-344

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 scout: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-critic-340`

Goal:

- Prepare the lane-3 contract for packet 134; details live in the packet.

### ECO-20260420-main-344

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-3`
- Priority: `P1`
- Title: `L3 implement: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-scout-344`

Goal:

- Implement the lane-3 contract for packet 134; details live in the packet.

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

### ECO-20260420-scout-345

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-critic-341`

Goal:

- Prepare the lane-4 contract for packet 134; details live in the packet.

### ECO-20260420-main-345

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-scout-345`

Goal:

- Implement the lane-4 contract for packet 134; details live in the packet.

### ECO-20260420-critic-345

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Station homecoming evolution pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Depends on: `ECO-20260420-main-345`

Goal:

- Review the lane-4 contract for packet 134; details live in the packet.

### ECO-20260420-scout-346

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-critic-342`

Goal:

- Prepare the lane-1 contract for packet 135; details live in the packet.

### ECO-20260420-main-346

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-scout-346`

Goal:

- Implement the lane-1 contract for packet 135; details live in the packet.

### ECO-20260420-critic-346

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-main-346`

Goal:

- Review the lane-1 contract for packet 135; details live in the packet.

### ECO-20260420-scout-347

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-critic-343`

Goal:

- Prepare the lane-2 contract for packet 135; details live in the packet.

### ECO-20260420-main-347

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-scout-347`

Goal:

- Implement the lane-2 contract for packet 135; details live in the packet.

### ECO-20260420-critic-347

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-main-347`

Goal:

- Review the lane-2 contract for packet 135; details live in the packet.

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

### ECO-20260420-scout-349

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-critic-345`

Goal:

- Prepare the lane-4 contract for packet 135; details live in the packet.

### ECO-20260420-main-349

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-scout-349`

Goal:

- Implement the lane-4 contract for packet 135; details live in the packet.

### ECO-20260420-critic-349

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Nursery memory and teaching-bed readability`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Depends on: `ECO-20260420-main-349`

Goal:

- Review the lane-4 contract for packet 135; details live in the packet.

### ECO-20260420-scout-350

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-critic-346`

Goal:

- Prepare the lane-1 contract for packet 136; details live in the packet.

### ECO-20260420-main-350

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-scout-350`

Goal:

- Implement the lane-1 contract for packet 136; details live in the packet.

### ECO-20260420-critic-350

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-main-350`

Goal:

- Review the lane-1 contract for packet 136; details live in the packet.

### ECO-20260420-scout-351

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-critic-347`

Goal:

- Prepare the lane-2 contract for packet 136; details live in the packet.

### ECO-20260420-main-351

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-scout-351`

Goal:

- Implement the lane-2 contract for packet 136; details live in the packet.

### ECO-20260420-critic-351

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-main-351`

Goal:

- Review the lane-2 contract for packet 136; details live in the packet.

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

### ECO-20260420-scout-353

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-critic-349`

Goal:

- Prepare the lane-4 contract for packet 136; details live in the packet.

### ECO-20260420-main-353

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-scout-353`

Goal:

- Implement the lane-4 contract for packet 136; details live in the packet.

### ECO-20260420-critic-353

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Support choice in-field differentiation`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
- Depends on: `ECO-20260420-main-353`

Goal:

- Review the lane-4 contract for packet 136; details live in the packet.

### ECO-20260420-scout-354

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-critic-350`

Goal:

- Prepare the lane-1 contract for packet 137; details live in the packet.

### ECO-20260420-main-354

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 implement: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-scout-354`

Goal:

- Implement the lane-1 contract for packet 137; details live in the packet.

### ECO-20260420-critic-354

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 review: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-main-354`

Goal:

- Review the lane-1 contract for packet 137; details live in the packet.

### ECO-20260420-scout-355

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-critic-351`

Goal:

- Prepare the lane-2 contract for packet 137; details live in the packet.

### ECO-20260420-main-355

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 implement: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-scout-355`

Goal:

- Implement the lane-2 contract for packet 137; details live in the packet.

### ECO-20260420-critic-355

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 review: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-main-355`

Goal:

- Review the lane-2 contract for packet 137; details live in the packet.

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

### ECO-20260420-scout-357

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-critic-353`

Goal:

- Prepare the lane-4 contract for packet 137; details live in the packet.

### ECO-20260420-main-357

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 implement: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-scout-357`

Goal:

- Implement the lane-4 contract for packet 137; details live in the packet.

### ECO-20260420-critic-357

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 review: Filed arc epilogue and replay intent`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Depends on: `ECO-20260420-main-357`

Goal:

- Review the lane-4 contract for packet 137; details live in the packet.

### ECO-20260420-scout-358

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-critic-354`

Goal:

- Prepare the lane-1 contract for packet 138; details live in the packet.

### ECO-20260420-main-358

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-scout-358`

Goal:

- Implement the lane-1 contract for packet 138; details live in the packet.

### ECO-20260420-critic-358

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-main-358`

Goal:

- Review the lane-1 contract for packet 138; details live in the packet.

### ECO-20260420-scout-359

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-critic-355`

Goal:

- Prepare the lane-2 contract for packet 138; details live in the packet.

### ECO-20260420-main-359

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-scout-359`

Goal:

- Implement the lane-2 contract for packet 138; details live in the packet.

### ECO-20260420-critic-359

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-main-359`

Goal:

- Review the lane-2 contract for packet 138; details live in the packet.

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

### ECO-20260420-scout-361

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-critic-357`

Goal:

- Prepare the lane-4 contract for packet 138; details live in the packet.

### ECO-20260420-main-361

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-scout-361`

Goal:

- Implement the lane-4 contract for packet 138; details live in the packet.

### ECO-20260420-critic-361

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Front-half tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Depends on: `ECO-20260420-main-361`

Goal:

- Review the lane-4 contract for packet 138; details live in the packet.

### ECO-20260420-scout-362

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-critic-358`

Goal:

- Prepare the lane-1 contract for packet 139; details live in the packet.

### ECO-20260420-main-362

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-scout-362`

Goal:

- Implement the lane-1 contract for packet 139; details live in the packet.

### ECO-20260420-critic-362

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-main-362`

Goal:

- Review the lane-1 contract for packet 139; details live in the packet.

### ECO-20260420-scout-363

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-critic-359`

Goal:

- Prepare the lane-2 contract for packet 139; details live in the packet.

### ECO-20260420-main-363

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-scout-363`

Goal:

- Implement the lane-2 contract for packet 139; details live in the packet.

### ECO-20260420-critic-363

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-main-363`

Goal:

- Review the lane-2 contract for packet 139; details live in the packet.

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

### ECO-20260420-scout-365

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-critic-361`

Goal:

- Prepare the lane-4 contract for packet 139; details live in the packet.

### ECO-20260420-main-365

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-scout-365`

Goal:

- Implement the lane-4 contract for packet 139; details live in the packet.

### ECO-20260420-critic-365

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Forest tactile identity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Depends on: `ECO-20260420-main-365`

Goal:

- Review the lane-4 contract for packet 139; details live in the packet.

### ECO-20260420-scout-366

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-critic-362`

Goal:

- Prepare the lane-1 contract for packet 140; details live in the packet.

### ECO-20260420-main-366

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-scout-366`

Goal:

- Implement the lane-1 contract for packet 140; details live in the packet.

### ECO-20260420-critic-366

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-main-366`

Goal:

- Review the lane-1 contract for packet 140; details live in the packet.

### ECO-20260420-scout-367

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-critic-363`

Goal:

- Prepare the lane-2 contract for packet 140; details live in the packet.

### ECO-20260420-main-367

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-scout-367`

Goal:

- Implement the lane-2 contract for packet 140; details live in the packet.

### ECO-20260420-critic-367

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-main-367`

Goal:

- Review the lane-2 contract for packet 140; details live in the packet.

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

### ECO-20260420-scout-369

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-critic-365`

Goal:

- Prepare the lane-4 contract for packet 140; details live in the packet.

### ECO-20260420-main-369

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-scout-369`

Goal:

- Implement the lane-4 contract for packet 140; details live in the packet.

### ECO-20260420-critic-369

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Treeline shelter and exposure pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Depends on: `ECO-20260420-main-369`

Goal:

- Review the lane-4 contract for packet 140; details live in the packet.

### ECO-20260420-scout-370

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-critic-366`

Goal:

- Prepare the lane-1 contract for packet 141; details live in the packet.

### ECO-20260420-main-370

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-scout-370`

Goal:

- Implement the lane-1 contract for packet 141; details live in the packet.

### ECO-20260420-critic-370

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-main-370`

Goal:

- Review the lane-1 contract for packet 141; details live in the packet.

### ECO-20260420-scout-371

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-critic-367`

Goal:

- Prepare the lane-2 contract for packet 141; details live in the packet.

### ECO-20260420-main-371

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-scout-371`

Goal:

- Implement the lane-2 contract for packet 141; details live in the packet.

### ECO-20260420-critic-371

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-main-371`

Goal:

- Review the lane-2 contract for packet 141; details live in the packet.

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

### ECO-20260420-scout-373

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-critic-369`

Goal:

- Prepare the lane-4 contract for packet 141; details live in the packet.

### ECO-20260420-main-373

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-scout-373`

Goal:

- Implement the lane-4 contract for packet 141; details live in the packet.

### ECO-20260420-critic-373

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Tundra thaw-window payoff pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Depends on: `ECO-20260420-main-373`

Goal:

- Review the lane-4 contract for packet 141; details live in the packet.

### ECO-20260420-scout-374

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-critic-370`

Goal:

- Prepare the lane-1 contract for packet 142; details live in the packet.

### ECO-20260420-main-374

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-scout-374`

Goal:

- Implement the lane-1 contract for packet 142; details live in the packet.

### ECO-20260420-critic-374

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-main-374`

Goal:

- Review the lane-1 contract for packet 142; details live in the packet.

### ECO-20260420-scout-375

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-critic-371`

Goal:

- Prepare the lane-2 contract for packet 142; details live in the packet.

### ECO-20260420-main-375

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-scout-375`

Goal:

- Implement the lane-2 contract for packet 142; details live in the packet.

### ECO-20260420-critic-375

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-main-375`

Goal:

- Review the lane-2 contract for packet 142; details live in the packet.

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

### ECO-20260420-scout-377

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-critic-373`

Goal:

- Prepare the lane-4 contract for packet 142; details live in the packet.

### ECO-20260420-main-377

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-scout-377`

Goal:

- Implement the lane-4 contract for packet 142; details live in the packet.

### ECO-20260420-critic-377

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Single adjacent-corridor prototype`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/142-single-adjacent-corridor-prototype.json`
- Depends on: `ECO-20260420-main-377`

Goal:

- Review the lane-4 contract for packet 142; details live in the packet.

### ECO-20260420-scout-378

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-critic-374`

Goal:

- Prepare the lane-1 contract for packet 143; details live in the packet.

### ECO-20260420-main-378

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-scout-378`

Goal:

- Implement the lane-1 contract for packet 143; details live in the packet.

### ECO-20260420-critic-378

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-main-378`

Goal:

- Review the lane-1 contract for packet 143; details live in the packet.

### ECO-20260420-scout-379

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-critic-375`

Goal:

- Prepare the lane-2 contract for packet 143; details live in the packet.

### ECO-20260420-main-379

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-scout-379`

Goal:

- Implement the lane-2 contract for packet 143; details live in the packet.

### ECO-20260420-critic-379

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-main-379`

Goal:

- Review the lane-2 contract for packet 143; details live in the packet.

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

### ECO-20260420-scout-381

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-critic-377`

Goal:

- Prepare the lane-4 contract for packet 143; details live in the packet.

### ECO-20260420-main-381

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-scout-381`

Goal:

- Implement the lane-4 contract for packet 143; details live in the packet.

### ECO-20260420-critic-381

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Map and station travel clarity pass`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
- Depends on: `ECO-20260420-main-381`

Goal:

- Review the lane-4 contract for packet 143; details live in the packet.

### ECO-20260420-scout-382

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-critic-378`

Goal:

- Prepare the lane-1 contract for packet 144; details live in the packet.

### ECO-20260420-main-382

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-scout-382`

Goal:

- Implement the lane-1 contract for packet 144; details live in the packet.

### ECO-20260420-critic-382

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-main-382`

Goal:

- Review the lane-1 contract for packet 144; details live in the packet.

### ECO-20260420-scout-383

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-critic-379`

Goal:

- Prepare the lane-2 contract for packet 144; details live in the packet.

### ECO-20260420-main-383

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-scout-383`

Goal:

- Implement the lane-2 contract for packet 144; details live in the packet.

### ECO-20260420-critic-383

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-main-383`

Goal:

- Review the lane-2 contract for packet 144; details live in the packet.

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

### ECO-20260420-scout-385

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-critic-381`

Goal:

- Prepare the lane-4 contract for packet 144; details live in the packet.

### ECO-20260420-main-385

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-scout-385`

Goal:

- Implement the lane-4 contract for packet 144; details live in the packet.

### ECO-20260420-critic-385

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Journal and atlas copy-budget sweep`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
- Depends on: `ECO-20260420-main-385`

Goal:

- Review the lane-4 contract for packet 144; details live in the packet.

### ECO-20260420-scout-386

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-critic-382`

Goal:

- Prepare the lane-1 contract for packet 145; details live in the packet.

### ECO-20260420-main-386

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-scout-386`

Goal:

- Implement the lane-1 contract for packet 145; details live in the packet.

### ECO-20260420-critic-386

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-main-386`

Goal:

- Review the lane-1 contract for packet 145; details live in the packet.

### ECO-20260420-scout-387

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-critic-383`

Goal:

- Prepare the lane-2 contract for packet 145; details live in the packet.

### ECO-20260420-main-387

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-scout-387`

Goal:

- Implement the lane-2 contract for packet 145; details live in the packet.

### ECO-20260420-critic-387

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-main-387`

Goal:

- Review the lane-2 contract for packet 145; details live in the packet.

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

### ECO-20260420-scout-389

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-critic-385`

Goal:

- Prepare the lane-4 contract for packet 145; details live in the packet.

### ECO-20260420-main-389

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-scout-389`

Goal:

- Implement the lane-4 contract for packet 145; details live in the packet.

### ECO-20260420-critic-389

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Science source-ledger audit`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/145-science-source-ledger-audit.json`
- Depends on: `ECO-20260420-main-389`

Goal:

- Review the lane-4 contract for packet 145; details live in the packet.

### ECO-20260420-scout-390

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-critic-386`

Goal:

- Prepare the lane-1 contract for packet 146; details live in the packet.

### ECO-20260420-main-390

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-scout-390`

Goal:

- Implement the lane-1 contract for packet 146; details live in the packet.

### ECO-20260420-critic-390

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-main-390`

Goal:

- Review the lane-1 contract for packet 146; details live in the packet.

### ECO-20260420-scout-391

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-critic-387`

Goal:

- Prepare the lane-2 contract for packet 146; details live in the packet.

### ECO-20260420-main-391

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-scout-391`

Goal:

- Implement the lane-2 contract for packet 146; details live in the packet.

### ECO-20260420-critic-391

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-main-391`

Goal:

- Review the lane-2 contract for packet 146; details live in the packet.

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

### ECO-20260420-scout-393

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-critic-389`

Goal:

- Prepare the lane-4 contract for packet 146; details live in the packet.

### ECO-20260420-main-393

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-scout-393`

Goal:

- Implement the lane-4 contract for packet 146; details live in the packet.

### ECO-20260420-critic-393

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Close-look and sketchbook selected refresh`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
- Depends on: `ECO-20260420-main-393`

Goal:

- Review the lane-4 contract for packet 146; details live in the packet.

### ECO-20260420-scout-394

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-critic-390`

Goal:

- Prepare the lane-1 contract for packet 147; details live in the packet.

### ECO-20260420-main-394

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-scout-394`

Goal:

- Implement the lane-1 contract for packet 147; details live in the packet.

### ECO-20260420-critic-394

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-main-394`

Goal:

- Review the lane-1 contract for packet 147; details live in the packet.

### ECO-20260420-scout-395

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-critic-391`

Goal:

- Prepare the lane-2 contract for packet 147; details live in the packet.

### ECO-20260420-main-395

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-scout-395`

Goal:

- Implement the lane-2 contract for packet 147; details live in the packet.

### ECO-20260420-critic-395

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-main-395`

Goal:

- Review the lane-2 contract for packet 147; details live in the packet.

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

### ECO-20260420-scout-397

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-critic-393`

Goal:

- Prepare the lane-4 contract for packet 147; details live in the packet.

### ECO-20260420-main-397

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-scout-397`

Goal:

- Implement the lane-4 contract for packet 147; details live in the packet.

### ECO-20260420-critic-397

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Kid readability and input accessibility`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
- Depends on: `ECO-20260420-main-397`

Goal:

- Review the lane-4 contract for packet 147; details live in the packet.

### ECO-20260420-scout-398

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Sound, feedback, and subtle juice`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-critic-394`

Goal:

- Prepare the lane-1 contract for packet 148; details live in the packet.

### ECO-20260420-main-398

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Sound, feedback, and subtle juice`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-scout-398`

Goal:

- Implement the lane-1 contract for packet 148; details live in the packet.

### ECO-20260420-critic-398

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Sound, feedback, and subtle juice`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-main-398`

Goal:

- Review the lane-1 contract for packet 148; details live in the packet.

### ECO-20260420-scout-399

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-2`
- Priority: `P1`
- Title: `L2 scout: Sound, feedback, and subtle juice`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-critic-395`

Goal:

- Prepare the lane-2 contract for packet 148; details live in the packet.

### ECO-20260420-main-399

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 implement: Sound, feedback, and subtle juice`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-scout-399`

Goal:

- Implement the lane-2 contract for packet 148; details live in the packet.

### ECO-20260420-critic-399

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-2`
- Priority: `P2`
- Title: `L2 review: Sound, feedback, and subtle juice`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-main-399`

Goal:

- Review the lane-2 contract for packet 148; details live in the packet.

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

### ECO-20260420-scout-401

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Sound, feedback, and subtle juice`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-critic-397`

Goal:

- Prepare the lane-4 contract for packet 148; details live in the packet.

### ECO-20260420-main-401

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Sound, feedback, and subtle juice`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-scout-401`

Goal:

- Implement the lane-4 contract for packet 148; details live in the packet.

### ECO-20260420-critic-401

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Sound, feedback, and subtle juice`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/148-sound-feedback-and-subtle-juice.json`
- Depends on: `ECO-20260420-main-401`

Goal:

- Review the lane-4 contract for packet 148; details live in the packet.

### ECO-20260420-scout-402

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P1`
- Title: `L1 scout: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-critic-398`

Goal:

- Prepare the lane-1 contract for packet 149; details live in the packet.

### ECO-20260420-main-402

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-scout-402`

Goal:

- Implement the lane-1 contract for packet 149; details live in the packet.

### ECO-20260420-critic-402

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-main-402`

Goal:

- Review the lane-1 contract for packet 149; details live in the packet.

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

### ECO-20260420-scout-405

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P1`
- Title: `L4 scout: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-critic-401`

Goal:

- Prepare the lane-4 contract for packet 149; details live in the packet.

### ECO-20260420-main-405

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-scout-405`

Goal:

- Implement the lane-4 contract for packet 149; details live in the packet.

### ECO-20260420-critic-405

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Alpha content parity and dead-copy prune`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Depends on: `ECO-20260420-main-405`

Goal:

- Review the lane-4 contract for packet 149; details live in the packet.

### ECO-20260420-scout-406

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 scout: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-critic-402`

Goal:

- Prepare the lane-1 contract for packet 150; details live in the packet.

### ECO-20260420-main-406

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-scout-406`

Goal:

- Implement the lane-1 contract for packet 150; details live in the packet.

### ECO-20260420-critic-406

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-main-406`

Goal:

- Review the lane-1 contract for packet 150; details live in the packet.

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

### ECO-20260420-scout-409

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 scout: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-critic-405`

Goal:

- Prepare the lane-4 contract for packet 150; details live in the packet.

### ECO-20260420-main-409

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-scout-409`

Goal:

- Implement the lane-4 contract for packet 150; details live in the packet.

### ECO-20260420-critic-409

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Game controller extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/150-game-controller-extraction-wave.json`
- Depends on: `ECO-20260420-main-409`

Goal:

- Review the lane-4 contract for packet 150; details live in the packet.

### ECO-20260420-scout-410

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 scout: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-critic-406`

Goal:

- Prepare the lane-1 contract for packet 151; details live in the packet.

### ECO-20260420-main-410

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-scout-410`

Goal:

- Implement the lane-1 contract for packet 151; details live in the packet.

### ECO-20260420-critic-410

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-main-410`

Goal:

- Review the lane-1 contract for packet 151; details live in the packet.

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

### ECO-20260420-scout-413

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 scout: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-critic-409`

Goal:

- Prepare the lane-4 contract for packet 151; details live in the packet.

### ECO-20260420-main-413

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 implement: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-scout-413`

Goal:

- Implement the lane-4 contract for packet 151; details live in the packet.

### ECO-20260420-critic-413

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 review: Overlay render extraction wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/151-overlay-render-extraction-wave.json`
- Depends on: `ECO-20260420-main-413`

Goal:

- Review the lane-4 contract for packet 151; details live in the packet.

### ECO-20260420-scout-414

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 scout: Field-season-board splitting wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
- Depends on: `ECO-20260420-critic-410`

Goal:

- Prepare the lane-1 contract for packet 152; details live in the packet.

### ECO-20260420-main-414

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Field-season-board splitting wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
- Depends on: `ECO-20260420-scout-414`

Goal:

- Implement the lane-1 contract for packet 152; details live in the packet.

### ECO-20260420-critic-414

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Field-season-board splitting wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
- Depends on: `ECO-20260420-main-414`

Goal:

- Review the lane-1 contract for packet 152; details live in the packet.

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

### ECO-20260420-scout-417

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-4`
- Priority: `P2`
- Title: `L4 scout: Field-season-board splitting wave`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/152-field-season-board-splitting-wave.json`
- Depends on: `ECO-20260420-critic-413`

Goal:

- Prepare the lane-4 contract for packet 152; details live in the packet.

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

### ECO-20260420-scout-418

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 scout: Save schema and migration hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
- Depends on: `ECO-20260420-critic-414`

Goal:

- Prepare the lane-1 contract for packet 153; details live in the packet.

### ECO-20260420-main-418

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Save schema and migration hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
- Depends on: `ECO-20260420-scout-418`

Goal:

- Implement the lane-1 contract for packet 153; details live in the packet.

### ECO-20260420-critic-418

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Save schema and migration hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
- Depends on: `ECO-20260420-main-418`

Goal:

- Review the lane-1 contract for packet 153; details live in the packet.

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

### ECO-20260420-scout-422

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 scout: Performance, bundle, and error hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
- Depends on: `ECO-20260420-critic-418`

Goal:

- Prepare the lane-1 contract for packet 154; details live in the packet.

### ECO-20260420-main-422

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Performance, bundle, and error hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
- Depends on: `ECO-20260420-scout-422`

Goal:

- Implement the lane-1 contract for packet 154; details live in the packet.

### ECO-20260420-critic-422

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: Performance, bundle, and error hardening`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
- Depends on: `ECO-20260420-main-422`

Goal:

- Review the lane-1 contract for packet 154; details live in the packet.

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

### ECO-20260420-scout-426

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 scout: External playtest feedback batch one`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
- Depends on: `ECO-20260420-critic-422`

Goal:

- Prepare the lane-1 contract for packet 155; details live in the packet.

### ECO-20260420-main-426

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: External playtest feedback batch one`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
- Depends on: `ECO-20260420-scout-426`

Goal:

- Implement the lane-1 contract for packet 155; details live in the packet.

### ECO-20260420-critic-426

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: External playtest feedback batch one`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/155-external-playtest-feedback-batch-one.json`
- Depends on: `ECO-20260420-main-426`

Goal:

- Review the lane-1 contract for packet 155; details live in the packet.

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

### ECO-20260420-scout-430

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 scout: External playtest feedback batch two`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
- Depends on: `ECO-20260420-critic-426`

Goal:

- Prepare the lane-1 contract for packet 156; details live in the packet.

### ECO-20260420-main-430

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: External playtest feedback batch two`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
- Depends on: `ECO-20260420-scout-430`

Goal:

- Implement the lane-1 contract for packet 156; details live in the packet.

### ECO-20260420-critic-430

- Status: `BLOCKED-BY-IMPLEMENTATION`
- Owner: `critic-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 review: External playtest feedback batch two`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/156-external-playtest-feedback-batch-two.json`
- Depends on: `ECO-20260420-main-430`

Goal:

- Review the lane-1 contract for packet 156; details live in the packet.

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

### ECO-20260420-scout-434

- Status: `BLOCKED`
- Owner: `scout-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 scout: Alpha release candidate and post-alpha scope gate`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/157-alpha-release-candidate-and-scope-gate.json`
- Depends on: `ECO-20260420-critic-430`

Goal:

- Prepare the lane-1 contract for packet 157; details live in the packet.

### ECO-20260420-main-434

- Status: `BLOCKED`
- Owner: `main-agent`
- Lane: `lane-1`
- Priority: `P2`
- Title: `L1 implement: Alpha release candidate and post-alpha scope gate`
- Source: `docs/reports/2026-04-20-alpha-runway-megapush.md`
- Packet: `.agents/packets/157-alpha-release-candidate-and-scope-gate.json`
- Depends on: `ECO-20260420-scout-434`

Goal:

- Implement the lane-1 contract for packet 157; details live in the packet.

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
