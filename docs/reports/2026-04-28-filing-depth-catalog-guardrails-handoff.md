# Filing Depth And Catalog Guardrails Handoff

Date: 2026-04-28
Queue: `ECO-20260428-scout-486`
Lane: `lane-4`
Owner: `scout-agent`

## Finding

Route authoring is now mostly in `src/engine/field-request-catalog.ts`, but the safety net still lives mainly in behavior matrices. That catches shipped routes after they are exercised, but it does not directly guard the catalog mistakes most likely to break future routes: active replay titles leaking into canonical filing text, slot orders drifting from evidence-slot ids, clue-backed filing tails missing from evidence routes, or active alternate clues pointing at unknown slots/entries.

## Selected Scope

Add one catalog-authoring guard test and a small authoring-doc note. This is the safer final runway step than changing filing runtime: the existing filed-note synthesis and Source to Shore behavior are stable, while the next risk is future route definitions drifting across the catalog boundary.

## Implementation Contract

- Add `src/test/field-request-catalog.test.ts` or an equivalent focused catalog test.
- Iterate `FIELD_REQUEST_DEFINITIONS` and inspect only Route v2 definitions.
- Assert route ids are unique, `routeV2Note.readyTitle` stays `NOTEBOOK READY`, and ready copy names the canonical route title.
- For evidence routes, assert evidence slot ids are unique, `slotOrder` exactly matches the evidence-slot ids when present, and evidence routes with filed synthesis keep a `clueBackedTail`.
- Assert active replay labels from `processFocus.activeTitle` / `worldStateFocus.activeTitle` do not appear in `routeV2Note.filedText`; `displayPrefix` may remain a display-only prefix but should not rewrite the canonical filed text.
- Assert `activeSlotEntryIdsBySlotId` keys point at real evidence slots and the referenced alternate entry ids exist in the route biome. Do not require alternates to be base slot entries; live process windows intentionally use nearby alternate carriers.
- Add one short `docs/content-authoring.md` bullet under Route v2/support copy naming the guardrail: canonical filed copy stays in `routeV2Note.filedText`, display-only replay emphasis belongs in `displayPrefix`, and active alternates must point to real route slots and biome entries.

## Verification

Baseline passed:

- `npm test -- --run src/test/field-requests.test.ts -t "full-arc filed-note synthesis matrix|route variants"`

Main-agent verification should include:

- the new catalog guard test
- `npm test -- --run src/test/field-requests.test.ts -t "full-arc filed-note synthesis matrix|route variants"`
- `npm run build`

If runtime code is touched unexpectedly, also run the focused route/controller/station/snapshot slices from packet `179`.

## Out Of Scope

No runtime route rewrite, new save schema, planner, route framework, support system, station shell, geometry, content pack, Source to Shore beat, route id change, evidence id change, ordered-slot change, support behavior change, or filed-state rewrite.

## Handoff

Promote `ECO-20260428-main-486` for a test/docs-only catalog guardrail implementation unless the main agent finds a failing contract that requires a smaller runtime helper.
