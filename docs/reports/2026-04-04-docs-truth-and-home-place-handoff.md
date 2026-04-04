# 2026-04-04 Docs Truth And Home-Place Handoff

Prepared `ECO-20260404-scout-252` for packet `103`.

## Audit Summary

The command story is mostly truthful already: [package.json](/Users/trevormaxwell/Desktop/game/package.json) exposes `dev`, `build`, `preview`, `test`, and `validate:agents`, and [README.md](/Users/trevormaxwell/Desktop/game/README.md) only names those commands. The needed sync is narrower and more useful:

1. Public docs still use a few stale labels for the home place and menu.
2. Architecture notes lag behind the recent `field-station-state` and `field-request-state` helper splits.
3. Content-authoring notes for world-map locations no longer describe the full live shape.

## Concrete Drift To Fix

### README

- Change `field menu` wording to plain `menu` so the controls read like the current handheld UI instead of an older prototype label.
- Tighten the field-station bullet so it matches the live shell vocabulary:
  - keep `field station`
  - keep `SEASON` / `EXPEDITION` route framing
  - describe the nursery as a compact nursery with a single teaching-bed loop, not a broader `teaching garden`
- Keep the command list tied to the actual scripts in [package.json](/Users/trevormaxwell/Desktop/game/package.json). No new script is required for this pass.

### Architecture

- In [docs/architecture.md](/Users/trevormaxwell/Desktop/game/docs/architecture.md), split the current ownership notes so:
  - [field-request-state.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-request-state.ts) owns derived request, outing-locator, route-marker, and replay-label state
  - [field-station-state.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-station-state.ts) owns composed field-station view state
  - [field-requests.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-requests.ts) stays the authored-definition layer instead of pretending it still owns all request-state composition
- Keep the field-station section aligned with the live shell terms:
  - `SEASON -> ROUTES`
  - `SEASON -> EXPEDITION`
  - `NURSERY`

### Content Authoring

- Expand the world-map location checklist in [docs/content-authoring.md](/Users/trevormaxwell/Desktop/game/docs/content-authoring.md) so it matches the live [world-map.ts](/Users/trevormaxwell/Desktop/game/src/content/world-map.ts) schema:
  - `mapReturnLabel`
  - `approachLabel`
  - `previewColor`
  - optional `corridorDoors`
  - optional `mapReturnPost`
- Keep the existing `mapDoor` / `biomeDoor` guidance, but mention authored interior return posts explicitly because corridor-enabled travel now depends on them.

## Naming Seams Worth Fixing

- `field menu` in public docs is the clearest stale term; the live UI is just `MENU`.
- `nursery / teaching garden` in public docs is broader than the live system. The live loop is a compact `NURSERY` with one `teaching bed`, not a general garden-management surface.
- The chapter language should stay season-first and route-first. Public docs should prefer `routes`, `expedition`, `outings`, and `season` over vaguer base-management wording.

## Implementation Scope For `main-252`

- Edit:
  - [README.md](/Users/trevormaxwell/Desktop/game/README.md)
  - [docs/architecture.md](/Users/trevormaxwell/Desktop/game/docs/architecture.md)
  - [docs/content-authoring.md](/Users/trevormaxwell/Desktop/game/docs/content-authoring.md)
- Do not edit runtime code unless a doc claim turns out to be impossible to make truthful without it.
- Do not add aspirational systems or commands that are not already in the repo.
- After doc edits, run `npm run validate:agents`. No runtime test sweep is needed unless implementation crosses into code.
