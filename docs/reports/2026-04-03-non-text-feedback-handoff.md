# 2026-04-03 Non-Text Feedback Handoff

Prepared `ECO-20260403-scout-219` against packet `092`.

## Recommendation

Spend `main-219` on route-complete punctuation inside the existing field-notice seam.

Do not start with a broader departure or arrival transition system. Those paths touch more timing, more travel modes, and more scene combinations than this wave needs.

The smallest strong lane-1 slice is the moment when a live route flips to `NOTEBOOK READY` or gets filed at the station:

- the game already centralizes those moments through `showFieldNotice()` / `showFieldRequestNotice()` in `src/engine/game.ts`
- the handheld already renders that moment through `drawFieldRequestNotice()` in `src/engine/overlay-render.ts`
- the current result is structurally clear but visually static

That makes it the best place to add feel through motion or punctuation instead of more words.

## Best Main-Agent Slice For `main-219`

Add one tiny animated/stamped feedback variant for route-complete notice moments only.

Recommended implementation shape:

1. Keep the existing notice panel and copy.
2. Add one tiny notice variant or emphasis state when:
   - a route becomes `NOTEBOOK READY`
   - a route is filed through the station
3. Render that emphasis as a small motion or visual punctuation layer inside the existing notice card:
   - a brief border pulse
   - a tiny notebook stamp
   - a short accent sweep or corner sparkle
4. Let the effect be short-lived and self-contained.
5. Leave normal guided notices, nursery notices, and travel notices unchanged unless they already use the same completion path.

## Why This Seam

- It is already the shared completion moment. The player sees it during live route completion and station filing without opening another surface.
- It fits the current product direction. The gain comes from feel, not from another text row or another panel.
- It stays lane-1 scoped. The work should mainly touch `game.ts`, `overlay-render.ts`, and focused runtime proof.
- It is safer than departure/arrival transitions for this pass. Transition work would spread into map, biome, corridor, and door timing together.

## Keep Out Of Scope

- no new global animation system
- no larger transition rewrite
- no extra route-board text
- no extra station tab, recap strip, or planner shell
- no effect that fires on every field notice

## Verification Target For `main-219`

- focused runtime proof that the new notice-variant state appears on:
  - one `NOTEBOOK READY` moment in biome play
  - one filed route moment in the station
- one seeded browser capture or short browser check showing the notice punctuation at `256x160`
- `npm run build`

## Suggested File Targets

- `src/engine/game.ts`
- `src/engine/overlay-render.ts`
- `src/test/runtime-smoke.test.ts`

## Queue Guidance

- Close `ECO-20260403-scout-219` as done.
- Promote `ECO-20260403-main-219` to `READY`.
