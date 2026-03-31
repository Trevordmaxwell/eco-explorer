# 2026-03-30 Tiny Outing Support Slot Handoff

## Scope

Scout handoff for `ECO-20260330-scout-74`: lock one tiny pre-outing support choice that lives inside the current `SEASON` surface without creating a new loadout or hint system.

## Current Live Gap

The station already has a support language, but it is the wrong shape for Route v2 choice:

- `field-station.ts` only models persistent upgrades
- the `ROUTES` page already uses the safe upper density of:
  - season strip
  - route board
  - atlas strip
  - flat `SUPPORT` rows
- `route-marker` already exists, but it is a permanent upgrade, not an outing-by-outing choice
- inspect bubbles already exist, but there is no route-aware way to say "this clue fits the notebook beat you picked"

So the best support slot is not a new system. It is one small selection that reuses those two seams.

## Best V1 Support Pair

Keep the first support set to exactly two options:

1. `hand-lens`
2. owned `route-marker`

That gives the player one simple tradeoff:

- `hand-lens`: clue-reading help
- `route-marker`: travel-facing help

Nothing else should join the set in v1.

## Option 1. `hand-lens`

Availability:

- available by default once Route v2 core state exists

Behavior:

- when the active Route v2 beat has missing evidence slots, inspecting a valid clue adds one tiny route-aware annotation inside the existing inspect bubble
- that annotation should be short and role-shaped, for example:
  - `Notebook fit: shelter`
  - `Notebook fit: ground`
  - `Notebook fit: living`

Why this is the right support:

- it helps the player interpret what they are seeing without adding off-screen arrows or another overlay strip
- it reuses the inspect bubble the game already trusts
- it makes the choice feel different from `route-marker` instead of becoming two versions of navigation help

Important limit:

- `hand-lens` should only label clues that actually fit a missing slot for the active beat
- it should not reveal unseen targets, draw a trail, or auto-complete the notebook

## Option 2. owned `route-marker`

Availability:

- only if the player already owns the existing `route-marker` upgrade

Behavior:

- selecting this support keeps the current world-map marker as the active outing aid for the Route v2 beat
- it should continue to point at the active outing biome using the existing `getRouteMarkerLocationId()` seam
- the season-facing `TODAY` or route note copy can then stay travel-first for that outing

Why this is the right support:

- it reuses a live upgrade instead of inventing a new travel arrow
- it keeps the support choice inside lane 4 without expanding station structure
- it gives the player a clean "navigation help vs clue-reading help" decision

Important limit:

- do not add an in-biome arrow, pulsing beacon, or second map marker
- the support should remain the existing world-map emphasis only

## Best Station Placement

Keep the support slot inside the existing `SUPPORT` block on `SEASON -> ROUTES`.

Recommended layout rule:

- reserve the first row of the current support block for `OUTING SUPPORT`
- keep the permanent upgrade rows underneath it
- if the player does not own `route-marker`, show `hand-lens` as the only active support and do not grow a second explanatory panel

That preserves the compact station shell:

- no new tab
- no new page
- no inventory grid
- no larger loadout list

## Best State Model

### `main-109`

Add one tiny selected support value to Route v2 core state:

- default: `hand-lens`
- allowed values:
  - `hand-lens`
  - `route-marker`

Safety rules:

- if `route-marker` is selected but no longer owned, fall back to `hand-lens`
- do not track quantities, charges, or unlock trees
- expose the selection in debug state so runtime smoke can assert it

### `main-111`

Use the visible support choice in the station shell:

1. surface the `OUTING SUPPORT` row
2. let the player toggle the slot without opening another page
3. tune the `TODAY` note copy so:
   - `route-marker` stays travel-facing
   - `hand-lens` can be clue-facing

## Expected File Touches

- `src/engine/types.ts`
- `src/engine/save.ts`
- `src/engine/game.ts`
- `src/engine/field-season-board.ts`
- `src/engine/overlay-render.ts`
- `src/test/save.test.ts`
- `src/test/runtime-smoke.test.ts`
- `src/test/field-season-board.test.ts`

## Guardrails

- keep the support set to `hand-lens` and owned `route-marker` only
- do not add a new hint strip, quest arrow, or inventory screen
- do not turn the support area into a second upgrade catalog
- keep `hand-lens` inside the inspect bubble, not as a permanent HUD banner
- keep `route-marker` as reuse of the existing world-map marker only

## Queue Guidance

- close `ECO-20260330-scout-74` with this handoff
- keep `ECO-20260330-scout-75` active next
- do not promote `ECO-20260330-main-109` until the notebook synthesis handoff also lands
