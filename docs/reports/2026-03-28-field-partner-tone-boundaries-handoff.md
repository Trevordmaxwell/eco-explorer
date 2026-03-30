# Field-Partner Tone And Boundaries Handoff

Date: 2026-03-28
Status: Ready for future implementation after notebook prompts stabilize

## Method

- read queue item `ECO-20260328-scout-23`
- reviewed:
  - `docs/reports/2026-03-28-living-world-grounding-handoff.md`
  - `docs/reports/2026-03-28-notebook-prompt-handoff.md`
  - `docs/ai-naturalist-design.md`
  - `src/engine/game.ts`
  - `src/engine/overlay-render.ts`
  - `src/engine/field-guide.ts`

## Core Recommendation

The field partner should feel like a notebook margin come to life, not like a mascot or second tutorial voice.

The first partner pass should therefore be:

- sparse
- observational
- brief
- highly suppressible

## Tone Rules

The partner voice should:

- sound warm and steady
- prefer noticing over instructing
- admit uncertainty when the evidence is thin
- stay shorter than a fact bubble or field-guide response

The partner voice should not:

- cheerlead every discovery
- give quest steps
- use constant jokes or nicknames
- pretend certainty when the evidence is weak
- narrate over the player's own inspect or journal reading

## Message Shape

Best first shape:

- one sentence
- one observation or question
- grounded in the current world-state, zone, or nearby evidence

Good examples:

- `This patch feels more sheltered than the open dune behind it.`
- `The wind keeps pushing the lowest plants into the safest shapes.`
- `I can't tell yet if that change is bloom or seed from here.`

Avoid:

- multi-line speeches
- stacked follow-up comments
- repeated `look closer` commands after every movement beat

## Cadence Rules

Recommended first cadence:

- at most one unsolicited partner line per biome visit
- plus at most one new line after a meaningful state change:
  - day part
  - weather
  - zone shift
  - new local discovery

Never emit back-to-back partner lines in the same short window.

## Suppression Rules

The partner should stay fully quiet during:

- title screen
- menu
- journal
- world map
- doorway transitions
- active fact bubbles
- field-guide copy confirmation notices
- active comparison mode

It should also stay quiet:

- while the player is actively inspecting
- during repeated revisits to the same zone with the same state and no new evidence
- immediately after another overlay just closed

## Revisit Rules

The partner should not restate the same observation every time the player re-enters a biome.

Recommended first revisit rule:

- suppress if `biome + zone + dayPart + weather + evidence family` matches the last spoken bundle
- allow a new line only when the state or evidence actually changes

This keeps the partner supportive instead of annoying.

## Implementation-Facing Handoff For `main-34`

Recommended first scope:

1. Reuse the same prompt or observation evidence helper as `main-33`.
2. Add a stricter suppression layer on top of it for partner delivery.
3. Keep the first partner line optional, rare, and disposable.

Most likely file seams:

- `src/engine/observation-prompts.ts`
- `src/engine/game.ts`
- `src/engine/overlay-render.ts`
- `src/engine/world-state.ts`
- `src/test`

## Queue Outcome

- `ECO-20260328-scout-23` can close with this report.
- `main-34` should now be read as a sparse delivery layer with strong silence rules, not as a generic companion-chat feature.
