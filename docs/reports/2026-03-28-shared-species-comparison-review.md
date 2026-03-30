# Shared-Species Comparison Review

Date: 2026-03-28
Queue item: `ECO-20260328-critic-16`
Status: Complete

## Method

- reviewed:
  - `src/engine/journal-comparison.ts`
  - `src/engine/overlay-render.ts`
  - `src/engine/game.ts`
  - `src/test/journal-comparison.test.ts`
  - `src/test/runtime-smoke.test.ts`
  - `docs/reports/2026-03-28-shared-species-comparison-handoff.md`
- ran:
  - `npm test -- --run src/test/journal-comparison.test.ts src/test/runtime-smoke.test.ts`
  - `npm run build`
  - `npm run validate:agents`
- live verification:
  - seeded a browser save with unlocked `beach-grass` comparison context across `beach` and `coastal-scrub`
  - opened the journal and toggled the comparison pane in the live app

## Findings

### P2. The live comparison view is too vertically tight for the current notebook shell and clips the teaching text

Files:

- `src/engine/overlay-render.ts:754`
- `src/engine/overlay-render.ts:767`
- `src/engine/overlay-render.ts:818`
- `src/engine/overlay-render.ts:189`

What happens:

- the comparison-open branch keeps the normal header, detail line, sightings line, and journal excerpt, then squeezes all habitat cards into the remaining lower space
- each card then renders both its title and its summary as single lines
- in the live seeded browser pass, the beach/coastal-scrub comparison view becomes visibly cramped: card copy crowds the borders and the lower lines lose readability instead of reading like calm notebook cards

Why it matters:

- this feature is supposed to deepen cross-habitat learning, so the comparison text needs to be the clearest part of the pane
- the current layout technically works, but it makes the new teaching layer feel cramped at exactly the screen size the packet promised to protect
- if this stays as the pattern, future comparison pairs or longer note titles will be even harder to read

Recommendation:

- rebalance the comparison-open layout specifically for `192x144`
- give the cards more vertical budget, even if that means shrinking or removing the entry excerpt while comparison mode is open
- keep the first pass same-pane and compact, but prioritize readable two-card comparisons over preserving every normal-detail line in comparison mode

## What Looked Good

- The unlock logic is properly narrow and spoiler-safe.
- The first candidate set is still wisely constrained to note-backed entries with real habitat contrast.
- The feature builds on local sightings and ecosystem-note context instead of reopening the old global-entry leakage problem.
- The same-pane journal approach still feels like the right product direction.

## Queue Outcome

- close `ECO-20260328-critic-16`
- queue `ECO-20260328-main-43`
- queue `ECO-20260328-critic-17`
