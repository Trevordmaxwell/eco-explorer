# Prompt And Partner Surface Handoff

Date: 2026-03-28
Status: Ready for future implementation after prompt and partner planning

## Method

- read queue item `ECO-20260328-scout-24`
- reviewed:
  - `docs/reports/2026-03-28-compact-ui-handoff.md`
  - `docs/reports/2026-03-28-notebook-prompt-handoff.md`
  - `docs/reports/2026-03-28-weather-aware-notebook-prompts-handoff.md`
  - `docs/reports/2026-03-28-field-partner-tone-boundaries-handoff.md`
  - `docs/reports/2026-03-28-living-world-grounding-handoff.md`
  - `src/engine/overlay-render.ts`
  - `src/engine/game.ts`

## Core Recommendation

Do not give prompts and the partner the same surface.

The cleanest compact split is:

- `main-33` prompt surface:
  - same-pane journal companion line
  - plus field-guide copy append as a secondary export path
- `main-34` partner surface:
  - tiny transient in-biome notice strip

This keeps the prompt layer notebook-like and keeps the partner from becoming a permanent chatter bar.

## Prompt Surface Options

### Option A. Journal companion line plus field-guide append

What it is:

- show the current notebook prompt in the journal detail pane when a selected entry and evidence support it
- append the same prompt seed into the copied field-guide text when relevant

Pros:

- protects the playfield
- fits the existing journal and field-guide seams
- keeps prompts tied to selected evidence instead of ambient chatter

Recommendation:

- choose this

### Option B. In-biome prompt toast

What it is:

- show prompts during play as floating cards or notices

Tradeoffs:

- competes with inspect bubbles and traversal
- risks feeling like chores or interruptions

Recommendation:

- reject for v1

## Partner Surface Options

### Option A. Tiny transient notice strip in biome play

What it is:

- reuse the compact notice pattern rather than creating a persistent dialogue HUD
- show one brief line only when no other overlay is active

Pros:

- minimal obstruction
- easy to suppress
- feels distinct from the journal prompt surface

Recommendation:

- choose this

### Option B. Top-corner chatter chip

Tradeoffs:

- competes with menu chip and travel HUD
- feels more permanent than the partner should

Recommendation:

- reject

### Option C. Journal-only partner note

Tradeoffs:

- too close to the prompt surface
- stops feeling like a live companion

Recommendation:

- reject

## Copy Budgets

### `main-33` prompt surface

Recommended budget:

- one line in the journal detail pane
- roughly `48-60` characters
- one sentence only

Dismissal behavior:

- passive
- changes only when selected entry or evidence context changes
- hides during comparison-open state if room is too tight

### `main-34` partner strip

Recommended budget:

- one short sentence
- roughly `42-56` characters
- no portrait, no extra button labels, no stacked follow-up

Dismissal behavior:

- auto-hide after a short beat
- suppress on movement, inspect, menu, journal, map, transition, or repeat-state revisit

## Implementation-Facing Handoff

For `main-33`:

- keep the visible prompt inside the journal detail flow
- let field-guide copy export the same prompt seed without demanding a new runtime panel

For `main-34`:

- reuse a tiny transient notice seam for the partner
- do not add a permanent HUD bar or full dialogue box

## Queue Outcome

- `ECO-20260328-scout-24` can close with this report.
- `main-33` and `main-34` should now have distinct compact surfaces instead of competing for the same UI slot.
