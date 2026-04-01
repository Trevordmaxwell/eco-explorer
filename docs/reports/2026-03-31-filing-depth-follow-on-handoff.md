# 2026-03-31 Filing-Depth Follow-On Handoff

Scout handoff for `ECO-20260331-scout-99`.

## Scope

Prepare one compact lane-4 follow-on after the `forest-cool-edge` process pass so `main-137` can make the notebook filing return feel more like a filed field case without opening a larger station, quest, or process-history shell.

## Current Live Gap

The live outing loop is stronger now, but the filing step is still mostly static in the exact seams the player sees when closing a route:

- `routeV2Progress` already stores the actual gathered clues in `landmarkEntryIds` and `evidenceSlots`
- `applyNotebookReadyState()` still previews only the route-authored fallback sentence from `routeV2Note.filedText`
- `showFieldRequestNotice()` still reuses that same static `filedText` after filing
- `buildRouteV2ReadySummary()` still resolves to instruction-only `readyText`

That means the player can gather a real set of clues, but the notebook return does not yet read back that gathered case. The new `Moist Edge` framing also makes the next constraint clearer: the richer filing payoff should stay stable even when the temporary `moisture-hold` window is no longer active.

## Best Small Pass

### 1. Build the richer filed note from saved route evidence, not live world-state

Best core rule:

- treat `routeV2Progress.landmarkEntryIds` and `routeV2Progress.evidenceSlots` as the source for filing-depth
- resolve clue names from the live biome entry registry, not from temporary process labels such as `Moist Edge`
- keep the existing `routeV2Note.filedText` as the authored fallback when the gathered clues cannot be resolved cleanly

Why this is the right next move:

- it makes the filing step feel earned because the notebook reflects what the player actually gathered
- it avoids new save fields because the needed clue ids are already persisted
- it stays independent of the temporary process window, which is the main watch item from `critic-109`

### 2. Use that clue-backed note only in the two filing seams that already exist

Recommended surfaces:

- `note-tabs` preview on the `NOTEBOOK READY` strip while a route is ready to file
- the recorded notice shown immediately after the player presses `Enter` to file the route

Keep unchanged:

- the one-press filing loop
- the current `readyText` instruction
- the current route board structure and support row

This keeps the pass compact. The player already sees those two filing surfaces; the next gain is to make them smarter, not to add another notebook card.

### 3. Prefer one shared helper instead of per-surface copy drift

Best implementation shape:

- add one shared helper in `field-requests.ts` that can derive a filed-note sentence from:
  - the route definition
  - the saved `routeV2Progress`
  - the biome entry map
- let `field-season-board.ts` call it for `note-tabs` preview text
- let `game.ts` call it before `fileReadyRouteV2FieldRequest(save)` clears the in-progress route

That keeps filing-depth logic in one lane-4 seam instead of splitting slightly different text rules between the board and the recorded notice.

## Recommended Copy Shape

Keep the note compact and clue-backed.

Best pattern:

- use the actual gathered clue names as the front half
- keep the existing authored `filedText` as the stable interpretive half or fallback

Examples of the intended feel:

- `Moisture Holders`: `Licorice Fern, Seep Stone, and Banana Slug show the hollow holding moisture.`
- `Root Hollow`: `Seep Stone, Banana Slug, Root Curtain, and Douglas-fir Cone now map the whole hollow return.`

Important constraint:

- `forest-cool-edge` should file from its saved carriers, not from the temporary `Moist Edge` process title, so the note still reads correctly if the player files it after the moisture window has passed

## Why This Is Better Than The Other Small Options

### 1. Do not add a second notebook panel or summary card

Why not:

- the current filing loop already has the right station seam
- another panel would turn a copy upgrade into a shell expansion

### 2. Do not add process-history persistence

Why not:

- the queue item is about richer filing payoff, not a new replay ledger
- the saved evidence already provides enough stable material for the note

### 3. Do not make the ready-state depend on temporary process framing

Why not:

- `critic-109` already called out that the filing-depth follow-on must survive the moisture window ending
- the filed note should read like a durable case, not a snapshot of a transient header

## Best Main-Agent Slice For `main-137`

The cleanest implementation bundle is:

1. add one helper that resolves clue-backed filed note text from the current Route v2 progress plus biome entry names
2. keep `routeV2Note.filedText` as the fallback if the helper cannot produce a clean result
3. update `applyNotebookReadyState()` so `note-tabs` previews the clue-backed filed sentence instead of the static fallback when possible
4. update the filing path in `game.ts` so the post-file notice uses that same resolved sentence
5. add focused regressions for:
   - a variable-slot route such as `forest-moisture-holders`
   - the ordered expedition chapter `forest-expedition-upper-run`
   - the process-backed `forest-cool-edge` case proving the filed note stays stable without depending on `Moist Edge`

## Expected File Touches

- `src/engine/field-requests.ts`
- `src/engine/field-season-board.ts`
- `src/engine/game.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`
- `src/test/field-requests.test.ts`

## Guardrails

- do not add new save state or a second route ledger
- do not add another station card, notebook page, or quest shell
- keep the filing step one-screen and one-press
- prefer clue-backed synthesis over temporary process-title reuse
- keep fallback behavior safe for routes that still need static authored copy

## Queue Guidance

- close `ECO-20260331-scout-99` with this report
- bump packet `047` so the filing-depth follow-on is explicitly clue-backed and process-window-independent
- promote `ECO-20260331-main-137` to `READY`
- keep `ECO-20260331-critic-110` blocked behind implementation
