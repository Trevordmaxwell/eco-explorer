# 2026-04-03 Coastal-Scrub Close-Look Handoff

Prepared for `ECO-20260402-scout-147` in lane 2.

## Scope Reviewed

- `docs/reports/2026-04-03-lane-2-front-half-and-parity-follow-ons.md`
- `docs/reports/2026-04-03-beach-note-deepening-review.md`
- `.agents/packets/072-coastal-scrub-close-look-phase.json`
- `src/content/biomes/coastal-scrub.ts`
- `src/engine/close-look.ts`
- `src/test/close-look.test.ts`
- `src/assets/coastal-flora.ts`
- `src/assets/coastal-ambient.ts`
- `docs/science-source-ledger.md`

## Read

- Coastal-scrub still has zero close-look support, but it does not need a broad candidate sweep. The strongest gain is one tiny trio that teaches how the scrub changes from thorny cover into pine-underlayer and then toward wetter forest edge.
- The best first candidates are the entries that already read clearly as distinct sprites at small size: `nootka-rose`, `kinnikinnick`, and `nurse-log`.
- `pacific-wax-myrtle`, `coyote-brush`, and `shore-pine` are useful scene-scale cover carriers, but they are weaker first close-look subjects because they mostly read as scrub mass or tree silhouette instead of detail-first vignette material.
- This step should stay close-look-only. Coastal-scrub already has healthy note and comparison support, so the packet's broader atlas-facing wording does not need to turn into a second journal or atlas pass here.

## Recommendation

Treat `main-185` as one compact close-look allowlist pass with exactly three coastal-scrub subjects:

1. `nootka-rose`
2. `kinnikinnick`
3. `nurse-log`

This gives the biome one thorny thicket card, one low evergreen underlayer card, and one moist forest-edge landmark card without making close-look feel common.

## Exact Candidate Plan

### 1. `nootka-rose`

Why first:

- already ledger-backed
- strong visual detail in the live sprite: bloom plus thorny stem shape
- teaches thorny cover as a habitat feature, not just a flower

Suggested payload shape:

- callouts: `thorny stem`, `rose hip`
- sentence direction: thorny stems help this rose turn scrub into safer cover
- sprite scale: `5` or `6`

Best teaching tie:

- complements `thorny-cover`

### 2. `kinnikinnick`

Why second:

- already ledger-backed
- clear visual detail in the live sprite: low mat, evergreen leaves, berries
- teaches the quieter under-pine ground layer better than another shrub card

Suggested payload shape:

- callouts: `red berries`, `evergreen leaves`
- sentence direction: staying low helps this mat hold sandy ground beneath shore pines
- sprite scale: `5`

Best teaching tie:

- complements `pine-underlayer`

### 3. `nurse-log`

Why third:

- already ledger-backed
- the ambient sprite has clear texture and a different silhouette from the plant cards
- gives coastal-scrub one landmark close-look that points toward the wetter forest edge

Suggested payload shape:

- callouts: `soft old wood`, `held moisture`
- sentence direction: old wood can hold water and give new plants a gentler start
- sprite scale: `6`

Best teaching tie:

- complements `edge-moisture`

## Explicit Non-Candidates For First Pass

- `shore-pine`: better as a scene-scale silhouette than a first close-look card
- `pacific-wax-myrtle`: useful scrub carrier, but too close to general shrub mass for the first tiny trio
- `coyote-brush`: same problem as wax myrtle, with less obvious tiny-detail payoff
- `sword-fern`: already doing strong comparison and note work elsewhere, so it is not the best coastal-scrub-only gain

## Guardrails For `main-185`

- keep the allowlist growth to exactly three entries
- do not add journal layout, atlas copy, or comparison changes in this pass
- keep callout text concrete and visible, not ecological summary text broken into fragments
- keep sentences one line of kid-readable explanation, not a second journal paragraph
- do not spend the pass on shell-like beach carryovers; keep it distinctly scrub-facing

## Suggested File Targets

- `src/engine/close-look.ts`
- `src/test/close-look.test.ts`
- `src/test/content-quality.test.ts`

## Suggested Verification

- `npm test -- --run src/test/close-look.test.ts src/test/content-quality.test.ts`
- `npm run build`
- one seeded close-look capture each for:
  - `nootka-rose`
  - `kinnikinnick`
  - `nurse-log`

## Queue Outcome

- Close `ECO-20260402-scout-147`.
- Promote `ECO-20260402-main-185` to `READY`.
- Keep `ECO-20260402-critic-158` blocked until the scrub close-look pass lands.
