# Steady Beta Foundation Megapush

Date: 2026-04-28
Role: director

## Director Read

Eco Explorer is strongest when it feels like a tiny handheld naturalist adventure: the player plans one calm outing, reads place evidence in the world, returns to the station, and files a notebook thought that makes the next place feel earned. The alpha now has enough systems to support that loop. The beta problem is no longer "can the game do routes, support choices, station pages, nursery hints, and habitat memories?" It can. The problem is steadiness.

The current pressure points all point at the same structural issue:

- The station and journal surfaces are carrying too much in the old compact shells.
- Source to Shore is now a real post-High-Pass chapter, but it is still riding on a completed first-season board identity.
- Route data and game coordination have grown through successful increments, so the next work should make the seams easier to extend before adding more breadth.

The next large push should therefore be a foundation push, not a fourth Source to Shore beat. The goal is to make the three-beat Source to Shore beta feel calm, housed, legible, and easy to build on.

## Product Shape

The game should keep moving toward:

- a first-screen game surface instead of a webpage wrapper
- station-first route planning and filing
- no heavy quest log, loadout, economy, combat, or API mode
- compact text that survives the native `256x160` viewport
- Route v2 as one notebook-first active outing seam
- Source to Shore as the first clear post-alpha chapter, not a pile of late-game exceptions

## Push Order

1. Fix the visible surface pressure immediately: station subtitle/tabs, journal progress labels, and any tiny overflow around the live beta state.
2. Give Source to Shore a dedicated station container so it stops pretending to be the old `EDGE LINE LOGGED` board.
3. Consolidate active/ready/filed Source to Shore flow through that container without adding a fourth beat.
4. Extract route catalog data from runtime-heavy route/controller code once the behavior is stable.
5. Split one narrow coordinator responsibility out of `game.ts` so future station/route work has a safer landing zone.
6. Add a small filed-memory payoff across existing notebook/station/atlas seams.
7. Polish the spatial proof around the existing three Source to Shore habitats.
8. Run a full arc signoff that proves the beta chapter feels steady end to end.

## Packet Wave

- Packet `168`: Steady beta surface triage
- Packet `169`: Source to Shore station container
- Packet `170`: Source to Shore route-flow consolidation
- Packet `171`: Route catalog extraction
- Packet `172`: Game coordinator controller split
- Packet `173`: Source to Shore filed-memory payoff
- Packet `174`: Source to Shore spatial playthrough polish
- Packet `175`: Steady beta full-arc signoff

## Standing Guardrails

- Do not add a fourth Source to Shore beat before the dedicated container and full three-beat playthrough are clean.
- Do not make a larger planner, dashboard, inventory, economy, combat system, or direct API mode.
- Keep all copy compact enough for `256x160`.
- Preserve science accuracy as a hard gate.
- Reuse existing Route v2, save, station, map, journal, atlas, nursery, and debug snapshot seams where possible.
- Prefer behavior-preserving extraction before new abstractions.
