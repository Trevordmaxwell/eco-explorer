# Lane Collision Rules and File Ownership

Date: 2026-04-21  
Use for: queue generation, scout reports, and long-running lane execution.

## Principle

The four lanes can run for a long time only if each lane owns a narrow kind of change. File ownership is not absolute, but shared files require explicit handoff.

## Default lane ownership

| Lane | Owns | Preferred files | Avoids |
| --- | --- | --- | --- |
| lane-1 | systems, progression, station state, save, tooling, release | `src/engine/game.ts`, `src/engine/field-season-board.ts`, `src/engine/field-station*.ts`, `src/engine/save.ts`, `src/engine/high-pass-chapter-state.ts`, `scripts/`, `package.json`, `README.md`, `.agents/work-queue.md`, `.agents/project-memory.md` | science facts, broad authored copy, geometry density, route prose |
| lane-2 | science, content, copy budgets, source ledger, journal/atlas text | `src/content/`, `src/engine/ecosystem-notes.ts`, `src/engine/observation-prompts.ts`, copy-only sections of `src/engine/field-requests.ts`, `src/test/content-quality.test.ts`, `docs/science-source-ledger.md` | state machines, route controller behavior, biome geometry implementation |
| lane-3 | physical spaces, traversal feel, screenshots, visual place memory | spatial bands in `src/content/biomes/*`, `src/assets/*`, `src/engine/biome-scene-render.ts`, biome tests, ignored `output/` browser proof | route definitions, station state, save schema, broad copy |
| lane-4 | Route v2, support behavior, replay, field notices, filing proof | `src/engine/field-request-controller.ts`, `src/engine/field-request-state.ts`, `src/engine/field-notices.ts`, route-structure sections of `src/engine/field-requests.ts`, `src/test/field-request*.test.ts`, route slices in `src/test/runtime-smoke.test.ts` | broad station UI, route-unrelated copy, new geometry, new route framework |

## Shared-file protocols

### `src/engine/game.ts`

- Default owner: lane-1.
- Other lanes may only touch it through a scout-approved, function-local seam.
- If lane-3 or lane-4 needs behavior currently trapped in `game.ts`, prefer asking lane-1 to extract a helper first.

### `src/engine/overlay-render.ts`

- Default owner: lane-1 for extraction and rendering contracts.
- lane-2 may request copy placement but should not reshape rendering.
- lane-3 may request visual proof but should not directly expand overlay complexity.

### `src/engine/field-season-board.ts`

- Default owner: lane-1 for board state and extraction.
- lane-2 may provide copy strings or budget checks.
- lane-4 may request route-state display requirements.
- Do not let lane-2 and lane-4 simultaneously edit this file.

### `src/engine/field-requests.ts`

- Copy/content owner: lane-2.
- Route structure owner: lane-4.
- If both need it in the same packet, lane-2 should define evidence/copy IDs first, then lane-4 wires behavior.

### `src/content/biomes/*`

- Science/copy owner: lane-2.
- Spatial placement owner: lane-3.
- If both need the same biome file, split the packet into ordered queue items:
  1. lane-2 defines or approves entries/facts/copy.
  2. lane-3 places the physical carriers.
  3. lane-2 or lane-4 verifies content/route behavior if needed.

### `src/test/runtime-smoke.test.ts`

- lane-1 owns broad install/build/state smoke.
- lane-4 owns route-loop smoke.
- lane-2 owns exact copy expectations only when a content/copy change caused the mismatch.
- lane-3 owns screenshot/spatial proof, not broad runtime smoke.

## Scout requirements

Every scout report must include:

- exact file list;
- exact functions/sections if touching a shared file;
- lane ownership risks;
- dependencies on other lanes;
- non-goals;
- proof commands or browser-proof requirements;
- whether generated artifacts are source-tracked or ignored.

## Main implementation requirements

Every main item must:

- stay inside the scout-approved file list;
- stop and write a handoff if it discovers broader scope;
- avoid opportunistic cleanup outside the lane;
- update tests/reports for the actual change;
- leave the next queue promotion explicit.

## Critic requirements

Every critic item must check:

- lane ownership was respected;
- compact 256x160 readability was preserved;
- science-source coverage remains intact for content changes;
- route active/ready/filed behavior remains intact for route changes;
- generated output was not accidentally committed;
- follow-ups are narrow and assigned to the owning lane.

## Long-running campaign rule

Do not let all lanes start implementing the same packet at once if they share files. For shared modules, run the scout items in parallel, then have the director sequence main items.

Safe parallel work examples:

- lane-1 release tooling + lane-3 screenshot report;
- lane-2 source-ledger preproduction + lane-4 route-state matrix design;
- lane-3 ignored visual proof + lane-4 route tests that do not touch geometry.

Unsafe parallel work examples:

- lane-2 and lane-3 both editing `src/content/biomes/treeline.ts`;
- lane-1 and lane-4 both editing `field-season-board.ts`;
- lane-2 and lane-4 both editing `field-requests.ts` without a copy/route split;
- lane-1 packaging changes while other lanes are generating source review archives.
