# 2026-03-30 Directional Travel Coherence Review

## Scope

Review `ECO-20260330-critic-82` after `ECO-20260330-main-107`.

## Verdict

Clean pass. No blocking issues found.

The main implementation closes the three audit findings without drifting into a larger navigation layer:

- menu-open same-biome map cancel now returns through the authored interior `mapReturnPost` instead of falling back to the old edge doorway
- highlighted corridor doors and map posts now expose one tiny destination-aware cue instead of a generic marker-only travel state
- world-map footer copy now reinforces the coast-to-inland chain instead of relying on habitat flavor alone

The result feels calmer and more trustworthy, not more tutorialized.

## Evidence

- Focused tests passed:
  - `npm test -- --run src/test/world-map.test.ts`
  - `npm test -- --run src/test/runtime-smoke.test.ts -t "uses an authored map-return post to open the map and return to the same interior anchor|uses the authored map-return post as the same-biome anchor when the map opens from the field menu|exposes destination-aware travel cue labels on corridor doors"`
- `npm run build` passed.
- Stable preview-browser review was clean with zero console errors:
  - `output/lane-1-main-107-live/map-footer.png`
  - `output/lane-1-main-107-live/forest-cue.png`
  - `output/lane-1-main-107-live/console-errors.json`

## Review Notes

- The forest arrival cue reads clearly at `256x160` and stays small enough not to turn into a second HUD.
- The rewritten forest footer line, `Middle woods between scrub and treeline.`, reads as direction-first relationship copy rather than a flavor-only label.
- Same-biome map return now behaves consistently across both map entry paths, which was the biggest remaining trust issue in the travel chain.

## Follow-On Guidance

Promote `ECO-20260330-scout-72`.

The next scout pass should stay compact and polish-focused. The highest-value remaining space is not another big coherence rewrite; it is the calmer regional approach warmth already reserved for the later packet, plus any tiny naming or approach refinements that still feel worth tightening after this now-clean baseline.

## Non-Blocking Watch

`npm run validate:agents` still fails outside lane 1 because packet `033` references missing queue id `ECO-20260330-main-104`. That metadata drift is unrelated to this travel pass and should not block the lane-1 review result.
