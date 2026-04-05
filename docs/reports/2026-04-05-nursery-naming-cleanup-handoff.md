# 2026-04-05 Nursery Naming Cleanup Handoff

Prepared for `ECO-20260405-scout-274` in lane 2.

## Recommendation

Spend `main-274` on one very small unlock-summary normalization pass inside [nursery.ts](/Users/trevormaxwell/Desktop/game/src/engine/nursery.ts).

The best seam is not reward logic or another renderer tweak. It is the older nursery unlock wording that still points at route labels the live game has already retired.

## Smallest Reliable Fix

Update only the clearly stale unlock summaries:

- `sand-verbena-bed.unlockSummary`
  - from `Log Coastal Shelter before taking cuttings for this bed.`
  - to `Log Open To Shelter before taking cuttings for this bed.`
- `mountain-avens-bed.unlockSummary`
  - from `Log Treeline Shelter before carrying mountain avens into the nursery.`
  - to `Log Stone Shelter before carrying mountain avens into the nursery.`

## Why This Is The Right Slice

- The live front-half chapter naming now uses `Open To Shelter` as the active coast-to-forest transect title, so `Coastal Shelter` reads like stale pre-chapter language in the nursery gate.
- The inland second-act chapter naming now uses `Stone Shelter` on the most visible station and guided-season surfaces, so `Treeline Shelter` is the same kind of stale label family.
- Both lines surface in the compact ready-state bed body through the already-corrected `unlockSummary` seam, so this pass can clean real player-facing language without reopening layout or reward plumbing.

## Explicit Non-Goals

- Do not rename `crowberry-bed.unlockSummary` yet.
  - `Short Season` still remains the stable notebook-ready and filed-note identity, even though the live route-board framing can temporarily read as `Thaw Window`.
  - That dual-title contract is deliberate and should not be collapsed casually inside this tiny pass.
- Do not change `rewardTitle` or `rewardSummary` in this step.
  - The current remaining drift is label-family mismatch, not ecological clue quality.
- Do not reopen [field-station-nursery-page.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-station-nursery-page.ts) unless a test truly needs a helper assertion there.

## Best Main-Agent Slice For `main-274`

1. Update the two stale `unlockSummary` strings in [nursery.ts](/Users/trevormaxwell/Desktop/game/src/engine/nursery.ts).
2. Add one focused assertion that the ready-state helper surfaces the new wording for the two exact nursery projects.
3. Leave `crowberry-bed`, reward clues, and the station shell unchanged.

## Expected File Touches

- [nursery.ts](/Users/trevormaxwell/Desktop/game/src/engine/nursery.ts)
- [nursery.test.ts](/Users/trevormaxwell/Desktop/game/src/test/nursery.test.ts)
- optional: [field-station-nursery-page.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-station-nursery-page.test.ts) only if the exact helper seam is the cleanest place to pin the strings

## Verification Target

- `npm test -- --run src/test/nursery.test.ts src/test/field-station-nursery-page.test.ts -t "unlock summary|ready bed"`
- `npm run build`

## Outcome

- Close `ECO-20260405-scout-274` as done.
- Promote `ECO-20260405-main-274` to `READY`.
