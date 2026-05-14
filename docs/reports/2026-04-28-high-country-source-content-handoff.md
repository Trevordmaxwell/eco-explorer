# High-Country Source Content Handoff

Date: 2026-04-28  
Owner: scout-agent  
Lane: lane-2  
Queue item: ECO-20260428-scout-492  
Packet: .agents/packets/185-lane-2-high-country-source-content.json

## Scope

Implement one close-look-only payoff for the existing Tundra `tussock-thaw-channel` landmark.

Treeline already has a dense, source-facing shelter lattice: the open-fell source-memory pocket uses `reindeer-lichen`, `frost-heave-boulder`, and rocky shelter carriers, and most of those entries already support close-look. The smallest useful lane-2 addition is therefore the Tundra meltwater carrier that links high-country thaw to downstream water movement without adding another route beat or journal page.

## Target

- File: `src/engine/close-look.ts`
- Entry: `tussock-thaw-channel`
- Suggested callouts: `low wet lane`, `raised tussocks`
- Suggested sentence: `Meltwater can linger in low channels between raised tundra tussocks.`
- Suggested scale: `6`

## Source Checks

- `docs/science-source-ledger.md` already contains `tussock-thaw-channel` as a Watch-backed habitat landmark.
- The row supports moist channels and low spaces between tundra tussocks holding mosses, lichens, and wet ground cover.
- Keep copy descriptive and broad: no exact hydrology, permafrost mechanics, plant-community guarantee, route-state claim, or causal downstream promise.

## Tests

- Update `src/test/close-look.test.ts` allowlist and payload assertions for `tussock-thaw-channel`.
- Run `npm test -- --run src/test/close-look.test.ts src/test/content-quality.test.ts`.
- Run `npm run build`.
- Run `npm run validate:agents` after queue or packet edits.

## Out Of Scope

- No Treeline/Tundra entry additions, authored placements, sprites, ecosystem notes, observation prompts, sketchbook rows, journal pages, station shell, route beats, route state, travel, save changes, geometry, rewards, or broad `game.ts` edits.
