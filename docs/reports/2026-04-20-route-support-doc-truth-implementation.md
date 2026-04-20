# Route Support Doc Truth Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-405`
Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
Lane: `lane-4`

## Changes

- Updated `README.md` so the completed alpha arc names route-support and notebook-return cues instead of generic request cues.
- Refreshed `docs/architecture.md` so the progression section leads with Route v2 outings, station notebook filing, replay cues, and the tiny support slot while keeping `field-request*` module/save naming explicit as compatibility language.
- Added a compact `Route v2 and support copy` section to `docs/content-authoring.md` to steer future authors toward route/outing/field-season wording and away from quest, checklist, loadout, planner, inventory, or extra-support-slot promises.
- Tightened the existing `observationPrompt` copy-budget line from "question" to "noticing prompt" so the route/support wording scan does not treat a generic authoring line as a `quest` hit.

## Scope Notes

- No runtime code, route definitions, support behavior, save schema, tests, station layout/state, authored science facts, content roster, geometry, packaging scripts, review-drop workflow, historical reports, code-module renames, or save-field renames changed.

## Verification

- `rg -n "request cues|routes and requests|Field requests and guided season flow|quest|checklist|loadout|planner" README.md docs/architecture.md docs/content-authoring.md`
- `rg -n "request cues|routes and requests|Field requests and guided season flow" README.md docs/architecture.md docs/content-authoring.md`

The broad wording scan now returns only intentional compatibility/code-name matches, the review-drop checklist reference, and the authoring warning against quest/checklist/loadout/planner promises. The exact stale strings are absent.
