# Route-Feel Extension Implementation

Implemented `ECO-20260416-main-302` for lane 4.

## What Shipped

- The existing top-right `NOTEBOOK J` chip now reads the broader truth it was already missing: `hand-lens` can make the chip support-biased whenever it changes what `E` will inspect right now, not only on the narrower active-clue alternate path.
- The front-half proof stays on ordinary live `Shore Shelter`: on the wrack-line shelf, `hand-lens` now makes that retarget readable before inspect when it pulls from a nearer `pacific-sand-crab` to `bull-kelp-wrack`.
- The forest proof shipped on ordinary live `Moisture Holders` instead of the scout's tentative `Cool Edge` shelf: on a stable Root Hollow shelter setup, `hand-lens` now makes the chip support-biased when it pulls from a nearer non-route decoy to the live `sword-fern` shelter clue.

## Seam Shape

- `field-request-controller.ts` now separates the old overloaded meaning into two explicit signals:
  - `supportRetargetsInspect`
  - `supportPrefersActiveClue`
- The chip now keys off either truth, so earlier ordinary route retargets and the newer process-backed alternates both stay readable through the same tiny seam.
- The stronger inspect-bubble accent stays narrower: `LENS CLUE:` remains limited to the active-clue path, while ordinary retargets keep the existing `Notebook fit:` line.

## What Stayed Small

- No new HUD row, planner seam, or support-strip copy.
- No new route titles, notebook cards, or filing surface changes.
- The two new proof routes stay ordinary live outing states instead of introducing another process or replay layer.
- The forest runtime proof now uses a deterministic Root Hollow shelf rather than a search loop, which keeps the regression tight and merge-safe.

## Verification

- `npx vitest run src/test/field-request-controller.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "wrack clue over a nearer tide-line decoy|same wrack setup|sword fern as the Moisture Holders clue|same Moisture Holders shelf setup|woolly lousewort as the thaw-window bloom clue|same thaw-window bloom setup|beach grass as the Held Sand clue|same Held Sand shelf setup"`
- `npm run build`
