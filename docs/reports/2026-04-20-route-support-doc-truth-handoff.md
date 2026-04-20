# Route Support Doc Truth Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-405`
Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
Lane: `lane-4`

## Finding

The live route/support systems are already aligned in code, but a few source-tracked docs still read like older field-request wording:

- `README.md` describes the filed alpha arc as having "request cues" after filing, which undersells the current Route v2, support-choice, and notebook-return flow.
- `docs/architecture.md` uses the heading "Field requests and guided season flow" and says exploration is structured around "routes and requests" without explaining that the live Route v2 outing loop still uses `field-request*` module and save names for compatibility.
- `docs/content-authoring.md` documents entries, world-map locations, and ecosystem notes, but does not give future editors a compact route/support wording rule, so legacy quest/checklist/request language can sneak back in.

## Recommended Main Scope

- Update the README alpha-arc bullet so it names route/support/notebook cues instead of generic request cues.
- Refresh `docs/architecture.md` prose around the progression section so player-facing language leads with Route v2 outings, field-season routes, notebook filing, replay labels, and the tiny support slot, while keeping `field-requests.ts`, `field-request-state.ts`, and `completedFieldRequestIds` as accurate code/save names.
- Add one short `Route v2 and support copy` guidance section to `docs/content-authoring.md` that tells authors to use routes/outings/field season/notebook filing language, keep support to one tiny slot, and avoid quest/checklist/loadout/planner promises.
- Keep this docs-only unless a direct typo in a doc link requires a tiny correction.

## Non-Goals

- No runtime code, route definitions, support behavior, save schema, tests, station layout, station state, authored science facts, content roster, geometry, packaging scripts, review-drop workflow, or historical report rewrites.
- Do not rename code modules or save fields just because they still contain `field-request` for compatibility.
- Do not edit lane-1 station copy, lane-2 science/content copy, or lane-3 screenshot/proof docs beyond the named doc surfaces.

## Suggested Verification

- `rg -n "request cues|routes and requests|Field requests and guided season flow|quest|checklist|loadout|planner" README.md docs/architecture.md docs/content-authoring.md`
- `npm run validate:agents`
- `git diff --check`
