# Five-Biome Journal Selector Handoff

Date: 2026-03-28
Status: Reviewed against the current codebase

## Method

- read queue item `ECO-20260328-scout-08` and packet `010`
- reviewed:
  - `docs/reports/2026-03-28-readability-pass-review.md`
  - `src/engine/journal-selector.ts`
  - `src/engine/overlay-render.ts`
  - `src/engine/game.ts`
  - `src/test/journal-selector.test.ts`
  - `src/test/journal.test.ts`
- ran `npm test -- --run src/test/journal-selector.test.ts src/test/journal.test.ts`

## Current State

The queue item was originally about escaping equal-width biome tabs before the five-biome chain went live.

That work is already effectively present in the repo.

The journal now uses:

- previous and next buttons
- one centered biome label
- a small indicator row for the full biome chain
- keyboard left and right cycling plus click targets

That pattern already lives in:

- `src/engine/journal-selector.ts`
- `src/engine/overlay-render.ts`
- `src/engine/game.ts`

## Option Comparison

### Option 1. Keep the current paged selector

What it is:

- arrows on the sides
- the selected biome name in the center
- five small indicators below

Pros:

- already landed in code
- fits the current `192x144` journal shell
- easy for kids to read in one glance
- avoids long-name clipping from `Coastal Scrub`

Tradeoffs:

- only one full biome name is visible at a time

Assessment:

- best option

### Option 2. Return to a chip or tab row with abbreviations

What it is:

- show all biome names at once with shortened labels or very small chips

Pros:

- shows the whole chain at once

Tradeoffs:

- reintroduces the exact width problem that created `main-21`
- pushes the journal top bar back toward clutter
- abbreviations are less child-friendly than a full selected label

Assessment:

- reject

### Option 3. Add a second-row selector or mode toggle

What it is:

- split the selector into more rows or another interaction mode

Pros:

- makes room for every name

Tradeoffs:

- adds more chrome to the tightest journal surface
- costs more attention than the problem needs
- solves a compactness problem with more structure instead of less

Assessment:

- reject

## Recommendation

Keep the current paged selector pattern.

That means:

- arrows stay the primary navigation affordance
- the center label stays the authoritative biome name
- the indicator row keeps the full-chain context lightweight
- do not reopen equal-width tabs for the five-biome journal

## Implementation Guidance

If any follow-on polish is needed, keep it small:

- preserve the current left and right keyboard behavior
- preserve click targets on both arrows and the indicator pips
- keep labels authored as full biome names, not abbreviations
- if the game grows past five biomes later, add paging logic to this selector instead of reverting to chips

## Queue Outcome

- `ECO-20260328-scout-08` can close with this report.
- `ECO-20260328-main-21` appears effectively satisfied by the current implementation and test coverage, so the queue should be synced to the landed state instead of reopening the selector design.
