# Lane 2: World, Content, And Spatial Richness

## Purpose

Lane 2 is the world-richness lane.

It exists so a second agent can deepen the world in parallel without fighting lane 1's playability, station, route, and progression work.

It owns:

- new discoveries and inspectables using existing systems
- ecosystem-note and comparison expansion
- close-look candidate expansion
- sketchbook and atlas content richness
- science-source ledger expansion and content-quality guardrails
- climbable and vertical space readability when the work is biome-local
- taller tree, cave, canopy, trunk, hollow, tundra, and meltwater spatial proof
- cozy sub-ecosystem exploration depth through existing traversal systems

## Preferred Write Scope

- `src/content/**`
- `docs/science-source-ledger.md`
- content-focused tests such as `content-quality` or generation/data tests
- small helper lists or allowlists only when required to surface new authored content
- biome geometry and authored traversal slices when they stay local to a place
- focused runtime and biome tests for spatial readability
- native `256x160` browser proof for spatial or close-look changes

## Avoid When Possible

- field-station shell changes
- route-board layout
- world-map or corridor runtime orchestration
- broader progression logic
- large edits to `src/engine/game.ts` or `src/engine/overlay-render.ts`
- route catalog semantics, support behavior, replay labels, notebook filing logic, and save schema

If a content idea clearly requires those files, leave a handoff for lane 1 instead of pushing through the boundary.

## Current Focus

Lane 2 should deepen the existing world through content packs and journal-richness work that can ride on already-landed systems.

Current emphasis:

- richer old-growth, under-root, and cave-adjacent discoveries
- archive and sketchbook payoff through existing surfaces
- note-backed comparison and close-look growth for microhabitats
- science-ledger and content-quality support for new authored spaces
- content-owned follow-ons that ride behind live route and traversal systems
- tundra relief and meltwater wayfinding proof
- forest giant-tree and cave loop proof consolidation

## Watch For

- adding collectibles that do not deepen ecosystem understanding
- science claims that are too exact, causal, or source-light
- journal, atlas, sketchbook, or close-look text crowding the handheld UI
- spatial cues fighting inspect prompts, map-return posts, or route notices
- overbuilding already-solved forest/cave spaces instead of proofing them first

## Owned Functions In game.ts

Lane 2 should generally avoid large `game.ts` edits. When it must touch the file, these are the functions closest to its domain. Other lanes own the rest.

- `getJournalBiomeProgressList` / `getBiomeSurveyProgressList` (~1057–1064)
- `getDiscoveredEntriesList` (~1065–1072)
- `getJournalEntrySightingBiomeIds` (~1074–1076)
- `getJournalComparison` (~1078–1086)
- `getSelectedJournalSurveyState` / `isSelectedJournalSketchbookUnlocked` (~1087–1094)
- `getJournalSketchbookPage` / `toggleJournalSketchbook` (~1095–1117)
- `changeSelectedSketchbookSlot` / `placeSelectedJournalEntryInSketchbook` / `clearSelectedJournalSketchbookSlot` (~1118–1160)
- `setSelectedJournalEntryId` / `getDefaultJournalBiomeId` / `setSelectedJournalBiome` / `changeJournalBiome` (~1538–1575)
- `changeJournalSelection` (~1944–1954)
- `serializeObservationPrompt` / `serializeFieldPartnerNotice` / `serializeActiveFieldRequest` (~808–852)
- `getSupportingPlatform` / `getGroundYAt` / climb helpers only when a director-approved spatial item requires engine-level support; otherwise prefer biome-local content and proof.

## Success Condition

Lane 2 should make the world feel richer, more readable, more memorable, and more educationally grounded without changing the game’s overall progression shape.
