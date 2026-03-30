# 2026-03-29 Field-Station Credit Handoff

## Method

- read queue item `ECO-20260329-scout-33` and packet `021`
- reviewed:
  - `docs/reports/2026-03-29-functional-gameplay-sequence.md`
  - `docs/reports/2026-03-29-functional-gameplay-loop-handoff.md`
  - `src/engine/game.ts`
  - `src/engine/overlay-render.ts`
  - `src/engine/save.ts`
  - `src/engine/progression.ts`
  - `src/engine/journal.ts`
  - `src/engine/world-map-render.ts`
  - `src/content/world-map.ts`
  - `src/engine/types.ts`

## Current Constraint

The live game has:

- biome survey states
- a notebook and journal shell
- a compact field menu
- a world map that already acts like an expedition break between places

It does not have:

- request completion state
- any economy wallet
- any purchase history
- room for a large store UI inside the current in-biome menu

So the first station pass should be a tiny meta-layer, not a shop system.

## Framing Comparison

### Option 1. Literal specimen market

What it is:

- sell finds directly for currency

Pros:

- very legible as a "game loop"

Tradeoffs:

- teaches extraction-first behavior
- pressures discoveries into loot
- would require pricing rules for living or ecological finds
- clashes with the game's science tone for kids

Assessment:

- reject

### Option 2. In-biome always-available station row

What it is:

- add a field-station action directly to the normal in-biome field menu

Pros:

- quick to access
- low navigation overhead

Tradeoffs:

- the field menu is already compact and near its comfortable row budget
- invites players to optimize mid-expedition instead of exploring
- risks turning the calm menu into a dashboard

Assessment:

- workable later, but not the safest first pass

### Option 3. World-map-context field station

What it is:

- keep the field station as a tiny meta-layer that appears only from world-map context
- reuse the expedition-break rhythm that already exists between biome runs

Pros:

- keeps economy logic out of the active exploration HUD
- fits the current structure better than a permanent biome-side shop
- makes upgrades feel like support earned after fieldwork, not something bought mid-run
- stays compatible with later authored map-return posts if those ever become station flavor

Tradeoffs:

- adds one more step between earning and spending

Assessment:

- best option

## Recommendation

Use Option 3.

The first field-station loop should be:

- world-map-context only
- small ledger-style UI
- built around field credit, not inventory selling

Safest first surface:

- add a `Field station` action only when the player is on the world map and opens the existing field menu

This fits the live code better than adding:

- a new store node
- a new full-screen management mode
- a permanent in-biome shop row

## Credit Model

Use field credit from documented fieldwork, not from raw pickups.

Recommended v1 credit sources:

- `+1` the first time a biome reaches `surveyed`
- `+1` the first time a biome reaches `complete`
- `+1` for each completed notebook request

Do not award credit for:

- duplicate sightings
- simple biome visits
- raw collectibles by themselves
- turning in living finds

This keeps credit tied to learning and observation.

## Suggested Save Shape

`main-53` will need a small persistent ledger, likely in `SaveState`, such as:

- `completedRequestIds`
- `claimedSurveyMilestones`
- `fieldCredits`
- `purchasedUpgradeIds`

The key requirement is one-way claiming:

- survey milestones should only grant credit once
- completed requests should only grant credit once
- purchased upgrades should stay bought across reloads

## First Upgrade Candidates

Recommended first upgrade:

- `Trail Stride`: a small walk-speed increase
  - current baseline is `42`
  - target first boost should stay modest, around `46-47`

Second candidate only if readability still holds after critique:

- `Field Step`: a very small jump increase
  - current baseline is `118`
  - keep any first boost small, around `124`

Do not start with:

- inventory space
- collectible multipliers
- auto-hints
- movement that rewrites the game's feel

## Surface Guardrails For `main-53`

- Keep the station ledger tiny and text-light.
- Show only:
  - current credit total
  - one or two earned sources
  - one or two available upgrades
- Do not add a price list for organisms, shells, or berries.
- Do not make the active in-biome field menu into a store dashboard.
- Let later map-return posts act as flavor entry points if needed, but keep the first station logic anchored to world-map context.

## Likely File Targets

- `src/engine/types.ts`
- `src/engine/save.ts`
- `src/engine/game.ts`
- `src/engine/overlay-render.ts`
- `src/engine/world-map-render.ts`
- `src/content/world-map.ts` only if a tiny station affordance is needed
- `src/test/save.test.ts`
- `src/test/runtime-smoke.test.ts`

## Queue Outcome

`ECO-20260329-scout-33` can close.

`ECO-20260329-main-53` should now be read more narrowly as:

- a world-map-context field-station ledger
- powered by survey milestones plus completed request ids
- offering one modest movement upgrade first
- avoiding specimen selling and avoiding a bigger shop system
