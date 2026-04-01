# 2026-03-31 Vertical-Space Memory Payoff Handoff

Prepared for `ECO-20260331-scout-95` in lane 2.

## Scope Reviewed

- `docs/reports/2026-03-31-canopy-and-cavern-content-depth-phase.md`
- `docs/reports/2026-03-31-canopy-and-cavern-content-pack-handoff.md`
- `docs/reports/2026-03-31-canopy-and-cavern-content-pack-review.md`
- `src/engine/close-look.ts`
- `src/engine/sketchbook.ts`
- `src/test/close-look.test.ts`
- `src/test/sketchbook.test.ts`
- browser artifacts:
  - `output/lane-2-main-132-browser/seep-wall-garden.png`
  - `output/lane-2-main-132-browser/canopy-moss-bed.png`

## Read

- The content pack already gave both new vertical anchors their own ecosystem-note teaching and their own sketchbook-note lines.
- That means the next memory payoff should not be "more note text." The stronger gain is one small visual revisit layer that makes these spaces feel worth a second look.
- The current comparison surface is the wrong fit because it is explicitly shared-species and note-backed across habitats, while `canopy-moss-bed` and `seep-moss-mat` are new single-biome landmark carriers.
- The sketchbook surface is also the wrong fit for the next step because it already got the authored note benefit in `main-132`; another sketchbook-specific layer would mostly duplicate work the player can already see.

## Recommendation

Treat `main-133` as one tiny close-look expansion for the two new habitat carriers.

## Why Close-Look Is The Right Payoff

- Both new entries are visual habitat structures, not text-heavy organism facts. They fit the centered vignette surface naturally.
- Close-look is already live, tested, and intentionally small. Extending the allowlist by two entries is a contained lane-2 move.
- The new carriers live in camera-sensitive places, so a second inspect is a good "you really found something special" moment without changing journal density or traversal.

## Exact Target

Add close-look support for:

1. `canopy-moss-bed`
2. `seep-moss-mat`

## Suggested Content Shape

### `canopy-moss-bed`

- callouts:
  - `soft moss bed`
  - `held water`
- sentence:
  - `This mossy branch bed can hold water and tiny plant starts high above the ground.`
- sprite scale:
  - slightly larger than `old-mans-beard`, roughly `6`

### `seep-moss-mat`

- callouts:
  - `wet stone grip`
  - `clinging moss`
- sentence:
  - `Seep water keeps this moss patch holding to rough stone above the basin floor.`
- sprite scale:
  - roughly `6`

Keep both sentences one-line and observational, not explanatory mini-paragraphs.

## What `main-133` Should Avoid

- no new close-look entries beyond these two
- no new journal layout or sketchbook work in this pass
- no comparison-mode expansion
- no broader cave or canopy species additions

## Suggested File Targets

- `src/engine/close-look.ts`
- `src/test/close-look.test.ts`
- `src/test/content-quality.test.ts` only if an extra ledger-backed guard helps

## Suggested Verification

- `npm test -- --run src/test/close-look.test.ts src/test/content-quality.test.ts`
- `npm run build`
- one seeded browser capture of `seep-moss-mat` opened in close-look
- one seeded browser capture of `canopy-moss-bed` opened in close-look

## Queue Guidance

- Close `ECO-20260331-scout-95`.
- Promote `ECO-20260331-main-133` to `READY`.
- Keep `ECO-20260331-critic-106` blocked until the close-look follow-on lands.
