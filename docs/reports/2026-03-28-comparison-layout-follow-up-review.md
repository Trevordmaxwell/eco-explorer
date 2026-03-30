# Comparison Layout Follow-Up Review

Date: 2026-03-28
Queue item: `ECO-20260328-critic-17`
Status: Complete

## Method

- reviewed:
  - `src/engine/overlay-render.ts`
  - `src/engine/game.ts`
  - `src/test/journal-comparison.test.ts`
  - `src/test/runtime-smoke.test.ts`
  - `docs/reports/2026-03-28-shared-species-comparison-review.md`
- ran:
  - `npm test -- --run`
  - `npm run build`
  - `npm run validate:agents`
- live verification:
  - seeded a browser save with unlocked `beach-grass` comparison context across `beach` and `coastal-scrub`
  - opened the journal and toggled the comparison pane in the live app

## Findings

- No material findings.

## What Looked Good

- The comparison-open view now trims back to a minimal header and gives the habitat cards most of the available vertical space, which is the right priority for this notebook shell.
- The same-pane comparison model still feels compact and calm instead of turning into a second encyclopedia mode.
- The unlock logic remains spoiler-safe and narrow around the current note-backed candidate set.
- The live seeded browser pass now reads clearly enough to support the intended ecology comparison teaching.

## Residual Watchpoint

- The current comparison cards are in a good place for the small allowlisted set, but any later expansion to more species or longer habitat-note titles should keep getting browser-level layout checks before the candidate set widens.

## Queue Outcome

- close `ECO-20260328-critic-17`
