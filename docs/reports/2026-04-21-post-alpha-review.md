# Eco Explorer Post-Alpha-Run Review

Date: 2026-04-21  
Prepared for: director / task-splitting agent  
Inputs reviewed:

- `eco-explorer-reviewer-drop-20260421-074019.zip`
- `game(15).zip`
- bundled alpha contact sheet
- extracted `.agents`, source, reports, and queue state

## Verdict

The previous alpha-runway run mostly succeeded. The game now looks like a complete five-biome alpha arc rather than a prototype: first beach outing, station loop, field routes, Root Hollow, Season Threads, High Pass, filed return, homecoming, route/support proof, science ledger, and review-drop tooling are all present as coherent systems.

The remaining issues are not mainly design quality problems. They are release hygiene, queue reconciliation, and final gate problems:

1. The reviewer drop is the right artifact to use for source review, but it contains macOS `._*` AppleDouble files inside the `.tgz`. Those files break `validate:agents` when extracted on Linux unless removed.
2. The manually zipped `game(15).zip` is not source-complete. It contains `src/main.ts` and `src/style.css`, but not the actual `src/engine`, `src/content`, `src/test`, or `docs/reports` source tree. It also includes `.git`, `.tmp`, `node_modules`, `dist`, and `output`.
3. The queue has no `Ready` items even though some blocked items depend on already-done items. That means the work graph needs a reconciliation/passive-unblock step before more lane runners can proceed.
4. Several alpha-runway packets remain marked `READY` even though parts of them are complete or superseded. Packet status and queue status should be cleaned before opening the next campaign.
5. The `alpha:rc` wrapper described by packet 157 does not appear in `package.json` or `scripts/` yet. `review:pack` / `review:verify` exist; the strict RC wrapper is still a final lane-1 task.

## Validation observations

From a cleaned extraction of the reviewer `.tgz` with all `._*` files removed:

```text
Validated with 1 warning(s):
⚠ work-queue: file is 391KB (>200KB). Consider running "node scripts/archive-done-queue.mjs" soon.
Validated 157 packet files against 1158 queue items with no errors.
```

The unclean extraction fails only because of AppleDouble packet files such as `.agents/packets/._001-foundation-pass.json`.

I did not treat `game(15).zip` as a source-validation artifact because it is not source-complete. Use the reviewer drop as the source of truth.

## Queue and packet state snapshot

Cleaned reviewer drop queue counts:

| Status | Count |
| --- | ---: |
| `DONE` | 341 |
| `BLOCKED` | 20 |
| `BLOCKED-BY-IMPLEMENTATION` | 10 |
| `PARKED` | 11 |
| `READY` | 0 |

Lane distribution in the queue:

| Lane | Done | Blocked | Blocked by implementation | Parked | Notes |
| --- | ---: | ---: | ---: | ---: | --- |
| lane-1 | 87 | 1 | 1 | 4 | Mostly complete; RC wrapper still blocked. |
| lane-2 | 60 | 18 | 9 | 0 | Main remaining bottleneck. |
| lane-3 | 87 | 0 | 0 | 6 | Spatial signoff appears clear. |
| lane-4 | 87 | 0 | 0 | 0 | Route/support signoff appears clear. |
| no-lane / legacy | 20 | 1 | 0 | 1 | Old API-field-guide item remains blocked/parked. |

Packet status snapshot:

- `130`-`148`: mostly complete, with `151` also done.
- `149`: still `READY` — alpha content parity and dead-copy prune.
- `150`: still `READY` — game controller extraction wave.
- `152`: still `READY` — field-season-board splitting wave.
- `153`: still `READY` — save schema and migration hardening.
- `154`: still `READY` — performance, bundle, and error hardening.
- `155`: still `READY` — external playtest feedback batch one.
- `156`: still `READY` — external playtest feedback batch two.
- `157`: still `READY` — alpha release candidate and post-alpha scope gate.

Important nuance: packets `155`-`157` contain completed lane-3 and lane-4 reports/signoffs, but packet-level status was not reconciled. Do not blindly re-run all of 155-157. Reconcile first.

## Product read

The game direction looks strong. The alpha contact sheet reads clearly across the five-biome arc:

- Beach opener: readable first-session objective.
- Coastal Scrub: shelter / back-dune handoff is legible.
- Forest / Root Hollow: cave, roots, seep, and trunk still read as a coherent sub-ecosystem.
- Treeline / High Pass: Stone Shelter and Rime Brow give the chapter a remembered middle and crest.
- Tundra: thaw bench / relief beat carries the short-season shape.

The current game has a real identity: calm field exploration, compact science noticing, route filing, homecoming, and place-memory. The next strategic risk is not lack of features; it is feature growth outrunning the tactile field outing.

## Current technical concentration risks

Line counts from the cleaned reviewer source:

| File | Approx. lines | Read |
| --- | ---: | --- |
| `src/engine/game.ts` | 4101 | Still the largest coordinator risk. |
| `src/engine/overlay-render.ts` | 1758 | Still too broad, though some helper splits have landed. |
| `src/engine/field-season-board.ts` | 1175 | Still large enough to justify another careful split. |
| `src/engine/field-request-controller.ts` | 263 | Healthy size. |
| `src/engine/field-station.ts` | 224 | Healthy size. |
| `src/engine/field-station-state.ts` | 165 | Healthy size. |

The next code-maintenance push should keep reducing `game.ts`, `overlay-render.ts`, and `field-season-board.ts`, but only after the RC/review-drop hygiene is fixed.

## Immediate blockers to clear before broader beta work

1. **AppleDouble metadata in review drops.** Update `review:pack` and `review:verify` so `._*` and `__MACOSX` are excluded/forbidden. Regenerate the reviewer artifact from source.
2. **Queue deadlock.** The queue has no `READY` items. Some blocked items depend on completed items, especially the lane-2 chain beginning at `ECO-20260420-scout-403`. Run a queue reconciliation step rather than starting a new packet on top of a deadlocked queue.
3. **Packet status reconciliation.** Mark complete packets done, park superseded items, or promote the exact next intended task. Do not leave 149-157 all marked `READY` if only part of them remains active.
4. **Known High Pass rime-footing exact-copy expectation.** Multiple reports identify this as lane-2 ownership. Resolve it or explicitly retire the stale test expectation before full runtime smoke/RC.
5. **Alpha RC wrapper.** Add `npm run alpha:rc` only after the content/test blocker is clear. It should orchestrate validation, science check, full tests, build, review pack, and review verify.

## Recommended next decision

Do not launch a new 20x campaign immediately. First run a short reconciliation packet whose entire job is to make the completed alpha runway actually releasable and queue-clean.

After that, run external playtest sessions and then open a controlled beta direction. The best broader direction is still a second arc through the existing five-biome world: **Source to Shore**, focused on how high-country meltwater, shelter, seeds, soil, shade, and wrack connect the whole gradient.
