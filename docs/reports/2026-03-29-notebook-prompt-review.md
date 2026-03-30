# 2026-03-29 Notebook Prompt Review

## Findings

### P1. Representative seeded notebook prompts still clip in the live journal surface

Files:

- `src/engine/overlay-render.ts:875`
- `src/engine/overlay-render.ts:953`

The new notebook prompt layer is live and directionally good, but the current compact note card still clips a representative authored seed in the journal at `192x144`.

In a live coastal-scrub browser pass, the prompt `Which patch looks ready for flowers, fruit, or seed here?` rendered as a truncated two-line fragment instead of a complete question. That means the new feature can fail its core job in a normal seed-backed state even though the logic and tests are green.

This is a real player-facing readability bug, not just a polish preference.

### P2. The prompt currently displaces unlocked ecosystem-note teaching instead of sitting alongside it

Files:

- `src/engine/overlay-render.ts:875`
- `src/engine/overlay-render.ts:955`

When an entry has an unlocked ecosystem note and an active notebook prompt, the prompt takes over the companion panel entirely. The stable note summary is no longer visible; only the prompt question remains.

That weakens the intended learning shape:

- ecosystem notes should explain a stable relationship
- notebook prompts should ask what to notice about that relationship right now

The live beach `Shore Shelter` state shows this clearly. The heading remains note-backed, but the note summary itself disappears and the card only shows the prompt question. This makes the prompt feel like a replacement, not a deepening layer.

## What Still Looks Good

- The pass stayed authored and evidence-aware rather than drifting into generic chatter.
- The prompt logic is grounded in biome, zone, world-state, nearby discoveries, and note/comparison state.
- Field-guide copy reuse remains aligned with the same deterministic prompt helper.
- The surface stays journal-first and avoids turning into an always-on playfield HUD.

## Verification

- `npm test -- --run src/test/observation-prompts.test.ts src/test/field-guide.test.ts src/test/runtime-smoke.test.ts src/test/content-quality.test.ts`
- `npm run build`
- `npm run validate:agents`
- live Playwright pass at `http://127.0.0.1:4177/`
  - confirmed clipped prompt in a representative seeded `coastal-scrub` journal state
  - confirmed prompt-over-note replacement in a seeded beach `Shore Shelter` journal state
  - confirmed zero browser console errors during the review pass
