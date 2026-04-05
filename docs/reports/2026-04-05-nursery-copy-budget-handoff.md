# 2026-04-05 Nursery Copy-Budget Handoff

Prepared for `ECO-20260405-scout-273` in lane 2.

## Recommendation

Keep this pass inside the existing nursery authoring and view-composition seams.

The smallest reliable fix is to stop asking one nursery project definition field to do multiple jobs at once.

Use this copy-role split:

- `summary`: inactive selection overview only
- `unlockSummary`: locked or not-yet-ready state only
- `stageSummaryByStage[stocked|rooting|growing|mature]`: active `TEACHING BED` body line only
- `memorySummary`: optional mature footer only
- `rewardSummary`: route-support or utility consequence only, not mature-bed body copy

That keeps the nursery teaching one idea at a time without widening the shell or leaning on runtime truncation.

## Why This Is The Right Seam

- The live card already shows the collision. In `src/engine/overlay-render.ts`, the mature bed currently renders `rewardSummary` in the body and `memorySummary` near the footer, while the same `rewardSummary` also powers `routeSupportHint` in `src/engine/nursery.ts`.
- The existing `summary` field is authored for every project but is not currently carrying the active bed state, so the page is paying for copy that is not helping the visible state model.
- Earlier lane-2 nursery passes intentionally kept `memorySummary` in the mature footer only. Those reviews already flagged that seam as near its handheld ceiling, so the next move should be cleaner beat separation, not another row.
- The immature bed states are still using one generic sentence about compost and route steps, which means the bed is not actually teaching a distinct stocked, rooting, or growing idea yet.

## State-Beat Model For `main-273`

Use the teaching bed like this:

### Locked selection

- Show only one wrapped `unlockSummary` sentence in the bed card.
- Do not pitch the reward here.

### Ready selection with no active bed

- Show one calm plant-overview sentence from `summary`.
- Keep start action and resource cost on the propagation bench where they already live.

### Active `stocked`

- Show one setup beat about what was planted or settled.
- Do not mention the reward yet.

### Active `rooting`

- Show one growth-process beat about early establishment.
- Keep the footer generic or absent.

### Active `growing`

- Show one ecological-read beat about what the bed is starting to resemble.
- Keep the footer generic or absent.

### Active `mature`

- Show one mature-state beat from `stageSummaryByStage.mature` in the body.
- Show `memorySummary` only as the quiet footer, or fall back to `ENTER clears the bed` when no memory line exists.
- Do not reuse `rewardSummary` as the mature-bed body line.

## Copy Caps

Treat these as the authored ceilings for the first pass:

- `summary`, each `stageSummaryByStage` line, and `memorySummary`: one sentence, `<= 56` characters
- `rewardSummary` and `unlockSummary`: one sentence, `<= 72` characters
- no nursery state should surface more than one dominant authored beat in the bed body
- only the mature state may use a second authored line, and only in the footer seam

## Implementation Notes For `main-273`

- Add `stageSummaryByStage` to `NurseryProjectDefinition` in `src/engine/types.ts`.
- Author the new stage beats for all six live nursery projects in `src/engine/nursery.ts`.
- Update the `TEACHING BED` render logic in `src/engine/overlay-render.ts` so it pulls body copy from the new stage-beat field instead of the generic growth sentence or `rewardSummary`.
- Leave `routeSupportHint` and utility reward plumbing in `src/engine/nursery.ts` intact unless a tiny helper makes the copy-role split clearer.
- Add focused tests in `src/test/nursery.test.ts` and, if useful, `src/test/content-quality.test.ts` so the new authored budgets are protected instead of relying on future manual trimming.

## Verification Target

- `npm test -- --run src/test/nursery.test.ts src/test/content-quality.test.ts`
- `npm run build`
- one seeded nursery browser proof that checks at least:
  - ready but inactive bed
  - active `stocked` or `rooting`
  - active `mature`

## Outcome

- Close `ECO-20260405-scout-273` as done.
- Promote `ECO-20260405-main-273` to `READY`.
