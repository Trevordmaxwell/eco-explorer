# Lane 4: Gameplay Loop And Route V2

## Purpose

Lane 4 is the gameplay-loop cohesion lane.

It exists so one agent can make outings feel more like a real cozy naturalist adventure without colliding with the station-shell work in lane 1, the content-density work in lane 2, or the vertical-exploration work in lane 3.

It owns:

- route semantics and Route v2 conversion work
- evidence-backed outing beats
- tiny pre-outing support choice
- station-side notebook synthesis and route completion
- soft replay windows tied to existing world-state

## Preferred Write Scope

- `src/engine/field-requests.ts`
- new Route v2 helpers in `src/engine/**`
- small route-facing additions inside existing field-station season surfaces
- save/runtime/tests tied to outing progress and notebook completion

## Avoid When Possible

- broad content-only packs that can live in lane 2
- giant-tree and cave traversal geometry that belongs in lane 3
- large station-shell restructures, season-page layout work, archive work, or travel-orientation work already owned by lane 1
- bigger inventory, loadout, or quest-log systems

If lane 4 discovers a content-only need, leave it for lane 2. If it discovers a bigger station or travel-structure need, leave it for lane 1.

## Current Focus

Lane 4 currently owns:

- Route v2 core runtime and rollout to stronger outing shapes
- evidence-slot, landmark-backed, and future transect or process-backed requests
- tiny pre-outing support choice growth, one calm step at a time
- station-side notebook synthesis and route-completion payoff
- replay-aware route framing tied to existing world-state
- chapter-grade outings that feel like authored mini-adventures

## Owned Functions In game.ts

These are the functions in `src/engine/game.ts` that lane 4 primarily owns. Other lanes should leave handoffs rather than editing these directly.

- `getNearbyDiscoveredEntryIdsForPrompt` (~1348–1361)
- `getObservationPromptForCurrentBiome` / `getFieldGuideObservationPrompt` (~1363–1404)
- `getJournalObservationPrompt` / `getFieldPartnerObservationPrompt` (~1406–1438)
- `dismissFieldPartnerNotice` / `startFieldPartnerQuiet` (~1439–1448)
- `getFieldPartnerTriggerPriority` / `queueFieldPartnerTrigger` / `getFieldPartnerContextKey` (~1449–1484)
- `canShowFieldPartnerNotice` / `tryShowFieldPartnerNotice` (~1485–1537)
- `updateBiomeScene` (~2803–2966)
- `updateWorldMapScene` (~2750–2801)
- `updateTransitionState` (~2711–2748)
- `updateMenuState` (~2622–2687)
- `updateCloseLookState` (~2688–2710)
- `updateTitleState` / `updateJournalState` (~2167–2351)
- `inspectEntity` / `getNearestInspectable` / `getEntityAtPoint` (~1851–1943)
- `isInInspectRange` / `isNearBiomeDoor` / `isNearTravelInteractable` (~1749–1767)
- `getTravelTargetAtPoint` / `activateTravelTarget` (~1768–1811)
- `updateCorridorOwnership` / `maybeExitCorridor` (~1812–1850)
- `openMenu` / `closeMenu` / `clearInspectSurface` / `openCloseLookFromBubble` / `closeCloseLook` (~426–473)
- `activateMenuAction` / `resetAdventure` (~1999–2117)
- `loadBiomeScene` / `enterBiome` / `enterCorridor` / `openWorldMapDirect` (~1614–1748)
- `startWorldMapExitTransition` / `startBiomeEntryTransition` (~2119–2166)

## Success Condition

Lane 4 should make each outing feel like:

- one clear goal
- one small choice
- one light observational or traversal challenge
- one satisfying notebook-style return payoff

without changing the game into a quest RPG, combat game, or management sim.
