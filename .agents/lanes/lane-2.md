# Lane 2: Content And Atlas Richness

## Purpose

Lane 2 is the content-richness lane.

It exists so a second agent can deepen the world in parallel without fighting the systems-and-progression lane.

It owns:

- new discoveries and inspectables using existing systems
- ecosystem-note and comparison expansion
- close-look candidate expansion
- sketchbook and atlas content richness
- science-source ledger expansion and content-quality guardrails

## Preferred Write Scope

- `src/content/**`
- `docs/science-source-ledger.md`
- content-focused tests such as `content-quality` or generation/data tests
- small helper lists or allowlists only when required to surface new authored content

## Avoid When Possible

- field-station shell changes
- route-board layout
- world-map or corridor runtime orchestration
- broader progression logic
- large edits to `src/engine/game.ts` or `src/engine/overlay-render.ts`

If a content idea clearly requires those files, leave a handoff for lane 1 instead of pushing through the boundary.

## Current Focus

Lane 2 should deepen the existing world through content packs and journal-richness work that can ride on already-landed systems.

Current emphasis:

- richer old-growth, under-root, and cave-adjacent discoveries
- archive and sketchbook payoff through existing surfaces
- note-backed comparison and close-look growth for microhabitats
- science-ledger and content-quality support for new authored spaces
- content-owned follow-ons that ride behind live route and traversal systems

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

## Success Condition

Lane 2 should make the world feel denser, more collectible, and more educationally rich without changing the game’s overall progression shape.
