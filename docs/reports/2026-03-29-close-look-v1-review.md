# Close-Look V1 Review

Date: 2026-03-29
Reviewer: critic-agent
Status: Clean pass

## Scope

Reviewed `ECO-20260328-main-42`, the first close-look inspect vignette pass.

Primary files checked:

- `src/engine/close-look.ts`
- `src/engine/game.ts`
- `src/engine/overlay-render.ts`
- `src/engine/types.ts`
- `src/test/close-look.test.ts`
- `src/test/runtime-smoke.test.ts`

## Findings

No blocking findings.

## What holds up

- The feature stays tightly allowlisted to a few visual-first entries instead of spreading a second inspect mode across the whole catalog.
- The normal fact bubble still comes first, so close look reads like an earned follow-up rather than a replacement for inspect.
- The vignette card stays visual-first: enlarged sprite, short callouts, one short sentence, and no journal detour.
- Runtime state stays smoke-testable through `openBubble.closeLookAvailable` plus a dedicated `closeLook` branch in `render_game_to_text()`.

## Review notes

- The first browser pass exposed one real layout issue at `256x160`: the callout chips were too tight, and their labels sat against the top border.
- That spacing issue was fixed in `src/engine/overlay-render.ts` by increasing chip height and padding, then re-verified through focused tests, build output, the shared web-game client, and a seeded live browser pass.

## Verification

- `npm test -- --run src/test/close-look.test.ts src/test/runtime-smoke.test.ts`
- `npm test`
- `npm run build`
- `npm run validate:agents`
- Web-game client run: `node "$HOME/.codex/skills/develop-web-game/scripts/web_game_playwright_client.js" --url http://127.0.0.1:4188/ --actions-json '{"steps":[{"buttons":["enter"],"frames":2},{"buttons":["right"],"frames":20},{"buttons":[],"frames":10}]}' --iterations 2 --pause-ms 200 --screenshot-dir output/main-42-web-game-client`
- Seeded live browser pass at `http://127.0.0.1:4188/`, confirming:
  - a supported shell still opens the normal fact bubble first
  - a second inspect opens the close-look card
  - the close-look card shows the enlarged art plus callouts cleanly at `256x160`
  - `Esc` or `E` returns cleanly to play
  - browser console errors stayed at zero

## Queue outcome

- `ECO-20260329-critic-34` can close cleanly.
- Packet `015` no longer has an active main/critic implementation lane.
