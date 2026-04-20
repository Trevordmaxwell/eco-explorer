# Front-Half Tactile Copy Handoff

Created: 2026-04-20
Queue item: `ECO-20260420-scout-359`
Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
Lane: `lane-2`

## Recommendation

Use Coastal Scrub's existing `shelter-builds-here` ecosystem note as the lane-2 front-half tactile identity target.

This is the safest high-value seam because the note is already:

- anchored to the back-dune cluster through `beach-grass`, `sand-verbena`, and `dune-lupine`
- tied to the front-half beach-to-scrub transition without adding discoveries, route state, geometry, or a new notebook surface
- reused by journal comparisons and the `place-tab` season-wrap prompt, so a compact copy refresh is visible in real play

## Proposed Main Scope

Update only the `shelter-builds-here` copy in `src/content/biomes/coastal-scrub.ts`.

Keep stable:

- note id: `shelter-builds-here`
- title: `Shelter Builds Here`
- entry ids: `beach-grass`, `sand-verbena`, `dune-lupine`
- zone id: `back-dune`
- ecosystem-note resolver behavior and journal comparison structure

Recommended copy:

- summary: `Grass, verbena, and lupine slow wind so back-dune sand starts holding calmer life.`
- observation prompt: `Where does wind-slowed sand start feeling calmer?`

## Test/Handoff Notes

Expected touched tests:

- `src/test/ecosystem-notes.test.ts`: add or update a focused assertion proving `shelter-builds-here` resolves for the back-dune trio and carries the new wind-slowed/back-dune/calm anchors.
- `src/test/journal-comparison.test.ts`: update the beach-grass comparison expected `noteSummary`.
- `src/test/runtime-smoke.test.ts`: update the exact `place-tab` season-wrap prompt and journal ecosystem-note summary expectations that currently pin the old copy.
- `src/test/content-quality.test.ts`: should pass unchanged and protect the 110-character note summary plus 52-character prompt budgets.

No science-ledger row is needed for this pass because the existing front-half ledger already backs the involved entries, and the current note already makes the same dune-plant wind-slowing relationship claim. This pass should not add new facts, organisms, close-look cards, comparison allowlist entries, route definitions, station surfaces, geometry, or save behavior.

## Verification Target

Recommended verification for the main step:

- `npm test -- --run src/test/ecosystem-notes.test.ts src/test/journal-comparison.test.ts src/test/runtime-smoke.test.ts src/test/content-quality.test.ts`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
