# 2026-04-05 Nursery Copy-Budget Review

Reviewed `ECO-20260405-critic-273` in lane 2.

## Findings

### Blocking: the live nursery page still bypasses the new ready and mature copy roles

- The new authored beat model is present in `src/engine/nursery.ts`: each project now has `summary`, `stageSummaryByStage`, `memorySummary`, and the older support-facing `rewardSummary`.
- But the dedicated live renderer in `src/engine/field-station-nursery-page.ts` still hardcodes older copy branches for the two most important selected-bed states.
- Ready selected beds still call `getReadyBedCopy(...)`, which returns `Ready to start ... ENTER plants the bed.` for affordable projects instead of the calmer `summary` beat the packet asked for.
- Mature selected beds still render `rewardSummary` in the body and prefer `ENTER clears the bed.` over `memorySummary` in the footer, so the selected mature state never actually uses `stageSummaryByStage.mature` plus the quiet memory seam that this lane just authored.
- The seeded browser proof matches the code path: `ready-inactive-bed.png` still shows the generic start sentence instead of the project overview, and `mature-bed.png` still foregrounds the route-support reward line instead of the authored mature-state beat.

## Recommendation

- Add one narrow live-renderer correction pass before any naming or reward-copy cleanup follow-on.
- In the nursery page helper, make ready selected beds use `summary` when the bed is affordable and reserve `unlockSummary` or the supply fallback for not-yet-ready states only.
- Make mature selected beds use `stageSummaryByStage.mature` in the body and `memorySummary` in the footer when present, falling back to the clear-bed instruction only when no memory line exists.
- Extend focused tests or a small render-level assertion so the dedicated nursery page helper cannot drift away from the authored beat model again.

## Verification

- Reviewed `src/engine/nursery.ts`
- Reviewed `src/engine/field-station-nursery-page.ts`
- Re-ran `npm test -- --run src/test/nursery.test.ts src/test/content-quality.test.ts`
- Rechecked the seeded browser proof in `output/lane-2-main-273-browser/`

## Outcome

Keep `ECO-20260405-scout-274` blocked. Insert one live nursery-page copy-role correction pass before the naming or reward-copy cleanup wave continues.
