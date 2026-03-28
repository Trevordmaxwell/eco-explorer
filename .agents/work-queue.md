# Work Queue

This is the shared queue for all agents working in this repo.

## How To Use

- Pull the first `READY` item assigned to your role.
- If a queue item links to a packet, read the packet before starting work.
- If you discover new work, append a new item in `Intake` or `Ready` with a unique ID.
- If you finish an item, move it to `Done` with a short completion note.
- If you cannot proceed, move it to `Blocked` and explain the blocker clearly.

## Status Key

- `READY`: approved and ready to work
- `IN PROGRESS`: currently being worked
- `BLOCKED`: cannot proceed yet
- `BLOCKED-BY-IMPLEMENTATION`: waiting for implementation before critique or follow-up
- `PARKED`: useful later, not active now
- `DONE`: completed

## Ready

### ECO-20260327-critic-02

- Status: `READY`
- Owner: `critic-agent`
- Priority: `P2`
- Title: `Review the live world-travel integration`
- Source: `docs/reports/2026-03-27-world-travel-scout.md`
- Packet: `.agents/packets/002-world-travel-integration.json`
- Depends on: `ECO-20260327-main-03`

Goal:

- Review whether the new map travel and doorway transitions feel readable, playful, and consistent with the handheld game direction once they are live.

Acceptance:

- critique checks travel readability, pacing, and child comprehension
- notes call out any architecture drift from the scene integration
- any next-step fixes get added back to the queue

### ECO-20260327-critic-03

- Status: `READY`
- Owner: `critic-agent`
- Priority: `P2`
- Title: `Review the widened viewport and readability pass`
- Source: `docs/reports/2026-03-27-post-travel-queue-pass.md`
- Packet: `.agents/packets/003-screen-ux-and-progression.json`
- Depends on: `ECO-20260327-main-04`

Goal:

- Review the widened play surface for readability, hierarchy, and playfield protection.

Acceptance:

- critique stays practical and file-anchored
- any regressions in density or focus are called out clearly
- next-step work is added back to the queue if needed

### ECO-20260327-critic-04

- Status: `READY`
- Owner: `critic-agent`
- Priority: `P2`
- Title: `Review menu, settings, and save-reset UX`
- Source: `docs/reports/2026-03-27-post-travel-queue-pass.md`
- Packet: `.agents/packets/003-screen-ux-and-progression.json`
- Depends on: `ECO-20260327-main-05`

Goal:

- Review the new system surface for readability, kid-friendly wording, and safe persistence behavior.

Acceptance:

- critique stays practical and actionable
- save-reset and settings concerns are clearly documented
- next-step work is added back to the queue if needed

## Blocked
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

## Intake

Use this section for newly discovered work that is not yet approved or prioritized.

## Done

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
