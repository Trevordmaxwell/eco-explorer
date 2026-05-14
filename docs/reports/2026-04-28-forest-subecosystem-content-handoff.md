# Forest Sub-Ecosystem Content Handoff

Date: 2026-04-28  
Owner: scout-agent  
Lane: lane-2  
Queue item: ECO-20260428-scout-491  
Packet: .agents/packets/184-lane-2-forest-subecosystem-content.json

## Recommendation

Implement a close-look-only payoff for `western-hemlock-seedling`.

The forest already has strong under-root, old-growth, bark-life, canopy, and decomposition notes. Adding another note or landmark would start to crowd the same compact journal surfaces. The cleanest next content layer is a small visual close-look for the existing seedling entry that anchors both `Old-Wood Nursery` and `Forests Above`.

## Implementation Contract

- In `src/engine/close-look.ts`, add a `western-hemlock-seedling` close-look seed.
- Suggested callouts: `tiny needles`, `nurse wood`.
- Suggested sentence: `A tiny hemlock can start on damp old wood before its roots reach soil.`
- Use the existing `western-hemlock-seedling` sprite; no new asset or forest placement is needed.
- Update `src/test/close-look.test.ts` to cover allowlist support and payload details.
- Run `src/test/content-quality.test.ts` to prove the new close-look id is already ledger-backed.

## Science Check

No new science ledger row is needed. `western-hemlock-seedling` already has a verified ledger row citing USFS western hemlock silvics and NPS nurse-log guidance, supporting rotten logs and decayed wood as favorable seedbeds.

## Proof

- `npm test -- --run src/test/close-look.test.ts src/test/content-quality.test.ts`
- `npm run build`

## Out Of Scope

- No new forest entries, sprites, authored placements, ecosystem notes, observation prompts, station surfaces, route-board work, save changes, geometry, traversal, cave system, reward, page shell, or broad `game.ts` edits.
- Keep `fallen-giant-log` as a normal inspectable rather than adding another close-look landmark in this pass.
