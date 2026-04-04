# 2026-04-04 Route Notice Descriptor Review

Reviewed `ECO-20260404-critic-254` against packet `104`.

## Findings

No blocking issues found.

## What Holds Up

- The split stayed inside the approved seam: filed-route and notebook-ready descriptor derivation moved out of `game.ts`, while timer mutation, enqueue order, guided notice priority, and save writes stayed in the runtime controller.
- The prior route-only styling regression is still covered: generic recorded notices such as `Forest Survey` remain on the default variant, while route-backed filing still resolves to `filed-route`.
- The new helper is small and pure enough to help future lane-1 controller work without pretending to absorb the guided `maybeShow*Notice` timing cluster too early.

## Watch Item

- Keep future notice follow-ons on the same boundary. If a later pass tries to move timer, priority, or guided notice orchestration into `field-notices.ts`, that should be treated as a new controller-protection decision instead of a quiet extension of this helper.

## Review Check

- Re-read `src/engine/field-notices.ts`, the updated `game.ts` call sites, and `src/test/field-notices.test.ts`
- Reused the focused verification from `main-254`: the pure helper test, the targeted `runtime-smoke` notice slice, `npm run build`, the shared client smoke artifacts in `output/lane-1-main-254-client/`, and the Playwright console recheck with 0 errors
