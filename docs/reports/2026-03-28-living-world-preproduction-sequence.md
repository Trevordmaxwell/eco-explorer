# Living-World Preproduction Sequence

Date: 2026-03-28
Status: Approved scout downtime backlog

## Decision

The scout has cleared the current depth-and-feel planning queue.

While the main agent continues near-term implementation work, the best next scout use is preproduction support for the already-approved living-world line:

- day-part
- weather
- phenology

These should stay planning-only for now. The point is to make later implementation faster, more grounded, and less improvisational.

## Why This Is The Best Downtime Use

These systems are already approved and parked.

The missing value is no longer whether they belong in the game. It is:

- concrete biome-by-biome mood direction
- readability guardrails
- species- and zone-specific content candidates
- implementation-ready scope limits

That is exactly the kind of work the scout can do well without destabilizing the live build.

## Recommended Scout Order

### 1. Day-Part Mood Matrix

Build one compact reference for the live biome chain:

- dawn
- midday
- dusk
- night or moonlit evening if still readable

For each biome, define:

- sky and palette mood
- silhouette or contrast risks
- ambient motion or emphasis opportunities
- hard readability no-go zones

This should directly support `main-31`.

### 2. Weather Readability Matrix

Build one calm weather plan by biome:

- coast fog
- light rain or drip mood in forest
- exposed wind at treeline
- light snow or blowing surface snow in tundra

For each weather family, define:

- what changes visually
- what must not change for readability
- whether it is purely atmospheric or also changes emphasis or spawn feel

This should directly support `main-32`.

### 3. Phenology Readiness Audit

Map the live species and authored content against the already-approved early / peak / late phenology model.

For each biome, identify:

- which current entries already support phase variation
- which visual or text changes are safest
- which species need more authored support before phenology can feel real

This should directly support `main-37`.

## Guardrails

- keep all three tasks planning-only
- no new implementation queue should open automatically from these unless the work is clearly scoped
- keep the focus on mood, readability, and authored content support
- do not turn this into a simulation or systems-design rabbit hole

## Queue Outcome

- queue `ECO-20260328-scout-18`
- queue `ECO-20260328-scout-19`
- queue `ECO-20260328-scout-20`
- leave `main-31`, `main-32`, and `main-37` parked until the current implementation wave is stable
