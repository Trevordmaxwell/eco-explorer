# Living-World Sequence

Date: 2026-03-28
Status: Approved future-direction plan

## Decision

The following are now approved future features for Eco Explorer:

- day-part changes
- biome-specific weather
- gentle seasonal and phenology variation after those first two slices are stable
- naturalist observation prompts
- a lightweight field partner / companion layer
- related ambient ecosystem indicators that support those systems

These are no longer just loose ideas. They are part of the intended long-term app plan.

## Ordering

They should still land in sequence, not all at once.

Recommended order:

1. finish phase-two content density
2. finish the first lightweight progression layer
3. add a simple day-part system
4. add a simple weather ambience system
5. extend those world-state systems into gentle seasonal or phenology variation
6. add naturalist prompts that react to place, time, weather, and seasonal context
7. add a lightweight field partner layer built on those same signals

## Why This Order

### Day-Part First

This is the cleanest first living-world slice because it can:

- deepen atmosphere immediately
- teach that ecosystems change over time, not only space
- stay mostly visual and low-risk at first

It should begin as:

- palette and lighting shifts
- small ambient changes
- optional mild spawn bias only if it stays readable and deterministic

It should not begin as:

- a real-time pressure system
- sleep meters
- failure states

### Weather Second

Weather should follow day-part because it adds mood and habitat cues without needing a full simulation.

Good first scope:

- one or two weather states per biome family
- visual and ambient-only effects first
- optional small wildlife or prompt changes after the base feel works

Bad first scope:

- large simulation layers
- constant storm churn
- effects that make the game harder to read

### Naturalist Prompts Third

Once time-of-day, weather, and later phenology signals exist, naturalist prompts become much more valuable.

They can start as:

- tiny context-aware observation prompts
- journal or field-guide nudges tied to current habitat conditions
- short “look again” moments that reward revisits

They should lean toward relationship prompts such as:

- noticing shelter
- comparing one shared species across habitats
- spotting low-growth or exposure strategies

They should remain:

- optional
- warm
- non-quiz-like

### Field Partner Last

The field partner should come after the observational prompt layer, not before it.

Why:

- otherwise it risks becoming a generic talking mascot
- it will be stronger if it can comment on real world-state signals that already exist

Good first version:

- sparse
- supportive
- observation-first
- built on the same deterministic context model as the current field guide

Bad first version:

- constant chatter
- replacing the player’s own noticing
- heavyweight live AI dependency

## Guardrails

- science accuracy remains a hard gate
- these systems should deepen noticing, not distract from it
- the game should stay calm and cozy
- no feature should add punishment, urgency, or loud HUD clutter
- seasonal change should feel like the world being in a different mood, not a heavy simulation
- direct API mode is still not required for the first naturalist or field-partner pass

## Queue Outcome

- keep these as approved parked future slices until phase two is stable
- make the ordering durable now so future agents do not invent a different expansion sequence from scratch
