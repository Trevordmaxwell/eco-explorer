# 2026-04-16 Coastal Scrub Identity Pack Handoff

Prepared `ECO-20260416-scout-300` in lane 2.

## Read

- Coastal Scrub is not short on notebook-note coverage anymore. `shelter-builds-here`, `sturdier-cover`, `swale-shelter`, and `edge-moisture` already explain the biome well in compact note-backed form.
- The bluff side also already has the right visual anchor: `pacific-wax-myrtle` now carries both a sketchbook note and a close-look card, which makes the upper scrub body feel more specific than it used to.
- The weaker remaining gap is the rest of that same place-memory chain. `windbreak-swale` and `forest-edge` still read more as useful route bands than as memorable visual stops, because their best local carriers do not yet get the same specimen-style payoff that bluff `pacific-wax-myrtle` does.

## Recommendation

Treat `main-300` as one compact close-look-first Coastal Scrub identity pack that completes a bluff -> swale -> forest-edge trio.

Exact target:

1. keep `pacific-wax-myrtle` as the existing bluff anchor
2. add one `beach-strawberry` close-look card for the swale pocket
3. add one `salmonberry` close-look card for the forest-edge transition

## Why This Shape

- It strengthens Coastal Scrub as a place players remember in sequence instead of as one long connector band.
- It spends the pass on the lightest strong surface available: small visual-first cards instead of more ecosystem-note text or comparison expansion.
- It reuses already-authored carriers that match the current geography:
  - bluff: woody hold and dark berries
  - swale: low runner pocket and fruit close to cover
  - forest edge: brighter berry thicket and cooler edge shift
- It avoids reopening the comparison lattice, route board, field partner, or station shell.

## Exact Content Direction

### `beach-strawberry`

Use it as the swale-memory card.

- callouts:
  - `runner stem`
  - `red fruit`
- sentence direction:
  - `Low runners and fruit help this swale stay busy close to shelter.`
- sprite scale:
  - `5`

Teaching goal:

- remember the swale as a tucked low-cover pocket, not just a lower lane between bluff and pines

### `salmonberry`

Use it as the forest-edge-memory card.

- callouts:
  - `soft berry`
  - `thicket stem`
- sentence direction:
  - `Bright berries and thick stems mark where the scrub starts leaning into forest edge.`
- sprite scale:
  - `5`

Teaching goal:

- remember the cooler edge as a berry-thicket transition, not just the route's final right side

## Explicit Non-Targets

- no new ecosystem-note ids
- no new comparison allowlist entries
- no route-board or field-partner copy
- no new authored geometry or new entities in `coastal-scrub.ts`
- no new sketchbook-note wave unless a later review finds one of these two cards still too weak

## Suggested File Targets

- `src/engine/close-look.ts`
- `src/test/close-look.test.ts`
- `src/test/content-quality.test.ts`
- `src/test/runtime-smoke.test.ts`

## Suggested Verification

- `npm test -- --run src/test/close-look.test.ts src/test/content-quality.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "beach-strawberry|salmonberry|close-look"`
- `npm run build`

## Queue Outcome

- Close `ECO-20260416-scout-300`.
- Promote `ECO-20260416-main-300` to `READY`.
- Retarget `ECO-20260416-main-300` and `ECO-20260416-critic-300` to this handoff.
