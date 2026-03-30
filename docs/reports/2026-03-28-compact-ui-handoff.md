# Compact UI Handoff

Date: 2026-03-28
Status: Ready for implementation

## Method

- read `AGENTS.md`, `.agents/project-memory.md`, and queue item `ECO-20260328-scout-05`
- reviewed the latest critique reports:
  - `docs/reports/2026-03-28-readability-pass-review.md`
  - `docs/reports/2026-03-28-ecosystem-note-review.md`
- reviewed the current live UI code in:
  - `src/engine/title-copy.ts`
  - `src/engine/overlay-render.ts`
  - `src/engine/ui-layout.ts`
- checked the current title-copy tests and note tests

## Current Constraints

Two compact surfaces matter here:

- the title card left column is now stabilized around authored lines in `src/engine/title-copy.ts`
- the journal detail content area is only about `82x58` pixels after padding

The important difference is that the title problem is already solved in a good way, while the journal note panel still needs a fit pass.

## Title Copy Budget Options

### Option 1. Keep the authored line-budget module

What it is:

- keep title onboarding copy in `src/engine/title-copy.ts`
- keep explicit short lines plus tests that protect the `field journal` promise
- do not ask the renderer to improvise or truncate core onboarding concepts

Pros:

- already landed cleanly through `main-20`
- easy to review and test
- keeps the stable `192x144` title geometry intact

Tradeoffs:

- copy edits stay manual
- future wording changes need a small authoring pass instead of freeform strings

Recommendation:

- keep this as the settled pattern

### Option 2. Reintroduce dynamic wrapping with keyword-aware truncation

What it is:

- allow longer subtitle strings again
- add logic to wrap or truncate while trying to preserve important phrases

Pros:

- more flexible for future copy changes

Tradeoffs:

- recreates the exact class of silent-drop bug `main-20` just fixed
- adds complexity to a surface that now behaves predictably

Recommendation:

- do not choose this unless the title card is being redesigned for other reasons

### Option 3. Rebalance title geometry for more copy room

What it is:

- widen the left column, shrink the controls column, or move CTA elements

Pros:

- creates more theoretical text room

Tradeoffs:

- reopens a stabilized layout without a strong reason
- risks knocking the controls and CTA back out of balance

Recommendation:

- not worth it for the current queue wave

## Journal Detail Plus Note Options

### Option A. Keep the current note-replaces-body layout

What it is:

- if a note exists, replace the selected entry body with the note box

Pros:

- no extra layout work

Tradeoffs:

- loses the selected entry's own species/place teaching
- still clips short current note copy
- wastes authored fields because the player mostly sees generic headings and truncated text

Recommendation:

- reject

### Option B. Use a companion note card inside the same detail pane

What it is:

- keep the current sprite/name/detail header
- preserve a short excerpt of `selectedEntry.journalText`
- add a smaller note card below it
- use the authored note title and one short observation cue as the note's visible teaching payload

Suggested layout shape:

- header band stays as-is
- reserve `2` lines for the selected entry body when a note exists
- reserve the bottom `24-26px` for the note card
- unlocked note card shows:
  - authored note title
  - one short observation prompt line
- locked note card shows:
  - a shorter spoiler-safe unlock sentence than the current one

Pros:

- keeps both `what this is` and `how it connects` visible at once
- adds no new input model
- fits the current `192x144` journal structure best
- surfaces authored note structure instead of a generic `ECO NOTE` label only

Tradeoffs:

- needs tighter copy budgets than the current generic note box
- may require prioritizing `title + prompt` over always showing the full summary

Recommendation:

- choose this

### Option C. Add an `ABOUT / ECO NOTE` toggle inside the detail pane

What it is:

- make the player switch between the selected entry body and the ecosystem note

Pros:

- gives each body more room

Tradeoffs:

- adds interaction complexity to a child-facing compact surface
- creates more input, hit-target, and testing work
- slows the journal down right when the project is trying to stay calm and quick to scan

Recommendation:

- keep this only as a fallback if the companion-card version proves impossible

## Recommended Combined Direction

Use a split recommendation:

1. Treat the title-copy-budget pattern from `main-20` as settled precedent.
2. Implement `main-22` with the same-pane companion note card.

That means:

- do not reopen title geometry or reintroduce dynamic truncation
- preserve the current authored title-copy module and its tests
- in the journal, keep the selected entry body visible
- use the note title plus a short observation prompt as the compact note payload
- shorten the locked note copy so it fits the compact card cleanly

## Specific Main-Agent Guardrails

- Keep the title solution content-led, not geometry-led.
- Do not hide `selectedEntry.journalText` when a note is present.
- Prefer the authored note title over generic labels like `ECO NOTE` when space is tight.
- If only one authored note body line fits, prioritize the observation prompt over repeating the full summary.
- Keep the locked note state spoiler-safe and shorter than the current sentence.
- Avoid adding a new mode toggle unless the same-pane companion layout clearly fails.

## Queue Outcome

- `ECO-20260328-scout-05` can close with this handoff.
- `ECO-20260328-main-22` should move to a dedicated compact-UI packet rather than staying on the broader ecosystem-layer packet.
