# Coastal Branch Geography Handoff

Date: 2026-03-28
Status: Ready for implementation

## Method

- read `AGENTS.md`, `.agents/project-memory.md`, and queue item `ECO-20260328-scout-07`
- reviewed the current chain direction in:
  - `docs/science-source-ledger.md`
  - `docs/ecotone-design.md`
  - `docs/world-travel.md`
  - `src/content/world-map.ts`
- compared the live and planned species sets against the source ledger and supporting ecology references

## Current Conflict

The repo currently wants one continuous chain:

`beach -> coastal-scrub -> forest -> treeline -> tundra`

That chain is not geographically coherent yet.

- the live beach still leans Atlantic or Mid-Atlantic through `Ammophila breviligulata`, `Donax variabilis`, and `Ocypode quadrata`
- the live forest and planned later branch lean Pacific or Pacific-northwest through `Pseudotsuga menziesii`, `Gaultheria shallon`, `Rubus spectabilis`, `Pinus contorta` var. `contorta`, and `Tsuga mertensiana`
- the beach already contains one Pacific anchor, `Salicornia pacifica`, which means the current coast is mixed even before `Coastal Scrub` is scaffolded

This is acceptable only if the world map frames these places as separate locales. It is not acceptable if travel is supposed to teach one gradual coastal branch.

## Option Comparison

### Option 1. Pivot to a Pacific coastal gradient

What it means:

- keep the current forest, treeline, and tundra direction
- update the beach and `Coastal Scrub` target list so the left side of the branch also reads west-coast or Pacific

Pros:

- preserves the strongest current content direction
- matches the live map's connected-chain feel
- keeps packet `006` conceptually intact
- requires fewer total rewrites than changing the forest side

Tradeoffs:

- the live beach needs a real species pass
- `Coastal Scrub` target entries need cleanup before implementation

Assessment:

- best overall choice

### Option 2. Pivot to an Atlantic coastal branch

What it means:

- keep more of the current beach
- replace the Pacific forest and likely much of treeline planning

Pros:

- avoids some beach churn

Tradeoffs:

- would force a much larger rewrite of the already-landed forest identity
- would weaken the current forest-to-tundra progression
- would likely ripple through art, notes, and future ecotone teaching

Assessment:

- too expensive for the value gained

### Option 3. Keep mixed coasts but frame them as separate locales

What it means:

- preserve more current species choices
- reframe the map as a set of disconnected destination postcards instead of one regional gradient

Pros:

- smallest short-term content rewrite

Tradeoffs:

- undercuts the approved ecotone lesson
- conflicts with the current connected route feel in `docs/world-travel.md` and `src/content/world-map.ts`
- makes `Coastal Scrub` feel less like a needed bridge and more like a side branch

Assessment:

- viable only if the product deliberately abandons the current gradient-first direction

## Recommendation

Choose **Option 1: Pacific coastal gradient**.

This is an inference from the current live build plus the source ledger. It is the smallest path that preserves the game's strongest educational shape:

- beach to forest still teaches gradual coastal change
- forest to treeline to tundra still teaches harsher stress gradients
- the world map can keep reading as one connected journey instead of a bag of unrelated stops

## Minimum Main-Agent Change Set

### 1. Realign the live beach before `Coastal Scrub` scaffolding

Minimum goal:

- remove or replace the strongest Atlantic anchors so the beach no longer fights the Pacific forest branch

Highest-priority replacements:

- replace `beach-grass` `Ammophila breviligulata` with `Leymus mollis`
- replace `ghost-crab` `Ocypode quadrata` with a Pacific sandy-beach invertebrate such as `Emerita analoga`, or another equivalently sourced west-coast species
- replace the Atlantic shell set, especially `coquina-shell`, with Pacific-coherent beach collectibles
- the current `moon-snail-shell` slot can likely pivot cleanly to `Euspira lewisii`, which preserves the same simple child-facing role while matching the west coast

Items that can likely stay with careful wording:

- `pickleweed` because `Salicornia pacifica` already fits the Pacific branch
- `sanderling` because it is broad enough for either coast
- `sea-rocket` if the implementation intentionally follows Pacific dune references that include `Cakile edentula`

### 2. Clean the `Coastal Scrub` target list before it becomes code

Remove or replace the Atlantic-specific targets:

- `saltmeadow-cordgrass` `Spartina patens`
- `northern-bayberry` currently written as `Myrica pensylvanica`; if kept in docs at all, the accepted name is `Morella pensylvanica`

Pacific-coherent anchors to keep or use instead:

- `Lupinus littoralis`
- `Morella californica`
- `Pinus contorta` var. `contorta`
- `Rubus spectabilis`
- shared beach-facing dune grass on the left edge

### 3. Keep the bridge lesson intact

The Pacific path works best if `Coastal Scrub` explicitly teaches:

- dune stabilization and facilitation on the beach-facing side
- shrub shelter and soil-building in the middle
- shore-pine and forest-edge transition on the right side

That keeps the original ecotone teaching goal while removing the geographic contradiction.

## Candidate Source Anchors For The Pacific Pass

- Pacific foredune communities can center on `Leymus mollis`, `Cakile edentula`, and `Lupinus littoralis`, which gives the beach and scrub edge a credible west-coast plant base.
- `Morella californica` is the cleanest shrub replacement for the Atlantic bayberry slot.
- `Emerita analoga` is a direct Pacific sandy-beach animal candidate for the current active-shore invertebrate role.
- `Euspira lewisii` is the easiest moon-snail analogue if the team wants to preserve the current beach collectible rhythm.

## Queue Outcome

- `ECO-20260328-scout-07` can close with this recommendation.
- the next main-agent step should be a small coastal-branch alignment pass before `ECO-20260328-main-14`
- `ECO-20260328-main-14` should then scaffold `Coastal Scrub` from the cleaned Pacific direction instead of the current mixed-coast draft
