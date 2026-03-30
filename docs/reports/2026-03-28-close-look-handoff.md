# Close-Look Handoff

Date: 2026-03-28
Status: Ready for future implementation after the current phase-two work

## Method

- read queue item `ECO-20260328-scout-17` and packet `015`
- reviewed:
  - `docs/reports/2026-03-28-depth-and-game-feel-sequence.md`
  - `docs/architecture.md`
  - `src/engine/game.ts`
  - `src/engine/overlay-render.ts`
  - `src/engine/inspectables.ts`
  - `src/engine/types.ts`
  - `src/content/biomes/*.ts`
  - `src/content/shared-entries.ts`
  - `src/test/runtime-smoke.test.ts`

## Core Recommendation

Treat close-look mode as an occasional special inspect card, not as a new default inspect surface.

The best v1 shape is:

- only a few supported discoveries
- one centered vignette card
- enlarged art plus one or two short callouts
- less text than the normal fact bubble, not more

This keeps the feature delightful and explanatory without turning every inspect into a heavier reading flow.

## What Deserves A Close-Look In V1

The best candidates are discoveries where one magnified visual can teach something real right away.

Good v1 criteria:

- the teaching value is mostly about visible shape or structure
- the current sprite can be meaningfully enlarged or redrawn
- the entry teaches a concrete feature, not a broad ecosystem process
- the moment stays understandable without extra UI systems

Best initial candidate set:

- beach:
  - `moon-snail-shell`
  - or `razor-clam-shell`
- forest:
  - `fir-cone`
- treeline:
  - `reindeer-lichen`
- tundra:
  - `purple-saxifrage`

These work because the close look can directly show:

- shell whorls or long shape
- cone scales
- branching lichen form
- low flower structure

Entries to avoid in v1:

- fast animals
- broad shrubs and grasses
- most landmarks
- discoveries where the teaching point is mainly timing, shelter, or food-web context

Those are better served by notebook prompts, ecosystem notes, or comparison pages.

## Best Interaction Shape

Do not make every inspect open a full-screen card.

Recommended first interaction:

- the usual inspect action still opens the standard fact bubble
- supported entries show a tiny `Look closer` cue inside that bubble
- a second inspect press or a small click target opens the vignette
- closing the vignette returns the player to normal play without routing through the journal

This keeps the inspect loop familiar and makes the close-look moment feel earned and special.

## Best Visual Format

Use one centered card with the world dimmed behind it.

Recommended contents:

- enlarged sprite or alternate close-look art
- one short heading
- one or two tiny callout labels
- one short explanatory sentence

That is enough.

If the card starts to look like a second journal page, the scope has drifted.

## Why This Fits The Current Runtime

The current runtime already has:

- the normal inspect bubble
- a pause-friendly overlay model
- sprite rendering
- deterministic smoke hooks

So the safest future path is to extend the inspect flow with one optional vignette state rather than inventing a new notebook mode or a separate encyclopedic viewer.

## File Seams For Future Implementation

Most likely file touches:

- `src/engine/game.ts`
- `src/engine/overlay-render.ts`
- `src/engine/inspectables.ts`
- `src/engine/types.ts`
- `src/assets`
- `src/content/biomes/*.ts`
- `src/test/runtime-smoke.test.ts`

If a pure helper is added, it should answer:

- does this entry support close-look mode?
- what art or callouts should the vignette show?

The cleanest data shape is probably a small optional close-look config for supported entries only.

## Scope Limits

Avoid in v1:

- close-look support for every entry
- a full new journal tab
- long prose panels
- animated microscope or camera mechanics
- a puzzle or minigame layer
- broad art rework across the entire discovery set

If the implementation needs dozens of custom panels to feel complete, it is too large for v1.

## Test Ideas

- pure tests that only supported entries resolve close-look data
- smoke coverage for inspect -> open close-look -> close -> return to play
- tests that unsupported entries still use the standard fact bubble only
- debug output that exposes whether a close-look card is open and for which entry

## Queue Outcome

- `ECO-20260328-scout-17` can close with this report.
- `main-42` should stay focused on:
  - a handful of visual-first candidate entries
  - one centered vignette card
  - less text, not more
  - a special inspect extension rather than a second journal system
