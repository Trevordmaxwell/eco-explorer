# 2026-03-29 First Corridor Proof Review

## Method

- Reviewed packet `019` plus the corridor handoff docs and live travel doc.
- Read the corridor runtime and tests in `src/engine/corridor.ts`, `src/engine/game.ts`, `src/engine/save.ts`, `src/test/corridor.test.ts`, and `src/test/runtime-smoke.test.ts`.
- Reviewed the representative captures in `output/main-46-corridor-browser`.
- Ran focused verification:
  - `npm test -- --run src/test/corridor.test.ts src/test/runtime-smoke.test.ts src/test/world-map.test.ts`
  - `npm run build`
  - `npm run validate:agents`
- Ran one live Playwright pass using `window.advanceTime()` and `window.render_game_to_text()` to reproduce corridor entry, threshold crossing, menu-open map access, and repeated threshold oscillation.

## Findings

### P1. Corridor threshold crossing currently mutates visit counts and world-state every time the player paces across the seam

Relevant anchors:

- `src/engine/game.ts:907`
- `src/engine/game.ts:920`
- `src/engine/save.ts:148`

What happens:

- `updateCorridorOwnership()` switches `ownerBiomeId` correctly, but it also calls `incrementBiomeVisit(save, nextOwnerBiomeId)` on every threshold crossing.
- `incrementBiomeVisit()` advances `worldStep` whenever `lastBiomeId` changes, so simply pacing back and forth across the seam rotates the living-world state and inflates biome visit counts.

Live reproduction from the deterministic browser pass:

1. Start on `Sunny Beach`.
2. Walk to the corridor door and enter the proof.
3. Cross into the scrub side once.
4. Walk back across the threshold.
5. Walk across it again.

Observed save/runtime drift without ever leaving the seam:

- `worldStep`: `1 -> 2 -> 3 -> 4`
- `biomeVisits.beach`: `32 -> 33`
- `biomeVisits.coastal-scrub`: `0 -> 1 -> 2`
- visible world-state drift on the same seam: `day/clear/early -> dusk/marine-haze/early -> dawn/clear/peak -> day/clear/peak`

Why it matters:

- This quietly turns corridor pacing into a time/weather/phenology skip mechanic.
- It makes biome visit counts less meaningful.
- It will get much worse if the corridor system spreads to the full chain.

Recommended fix:

- Separate corridor ownership switching from save visit accounting.
- Count corridor traversal as a biome visit only once per seam session, or only on full biome exit, but not on every threshold oscillation.
- Add explicit tests for repeated threshold crossing inside one live corridor session.

### P3. The beach-side corridor entry still reads as an ocean-edge exit instead of inland continuity

Relevant anchors:

- `src/content/world-map.ts:93`
- `docs/world-travel.md:92`

What happens:

- The proof still uses the existing beach travel door at the live beach right edge.
- In the current beach strip, that right edge is the tide-side / seaward end of the habitat.
- The corridor scene itself is composed correctly as a dune-edge-to-back-dune seam, but the player still enters it from the beach's ocean-side doorway.

Why it matters:

- The seam looks good once inside, but the act of entering it still undercuts the “walk between neighboring ecosystems” fantasy.
- This is a travel-readability issue, not a science blocker, but it should be cleaned up before the corridor model spreads across the whole chain.

Recommended fix:

- Keep the dedicated seam scene, but give the beach side a more inland-facing entry convention.
- That can be a small authored pre-door route, a corridor-specific entry anchor, or another proof-safe framing fix.
- Do not generalize the full chain until the first proof stops feeling spatially backward on the beach side.

## What Landed Well

- The proof stays edge-focused and avoids dumping whole-biome rosters into a narrow seam.
- The corridor art reads clearly in the representative captures.
- The world map still coexists cleanly through the field menu.
- Journal and context ownership do switch cleanly at the seam in the happy path.

## Queue Outcome

- Do not promote `main-47` yet.
- Add one stabilization follow-up for the first corridor proof.
- Re-review that stabilization pass before any full-chain corridor expansion.
