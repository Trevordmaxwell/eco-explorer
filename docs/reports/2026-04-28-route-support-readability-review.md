# Route Support Readability Review

Date: 2026-04-28
Owner: lane-4 critic-agent
Queue item: `ECO-20260428-critic-484`
Packet: `.agents/packets/179-lane-4-route-feel-runway.json`

## Verdict

Clean. The implementation keeps support readability inside the existing `OUTING SUPPORT` notice and does not widen the support row, station UI, route catalog, save shape, or Source to Shore beat structure.

## Review Notes

- Active gathering routes now name the selected support's immediate route-facing effect in short copy.
- Ready-to-file routes use `Route note is ready.` across support ids, which avoids implying a live marker, replay, or in-field hunt.
- `toggleOutingSupport()` now asks the current controller for the active request after cycling support, so the notice reflects the freshly persisted support state without moving other support behavior.
- Route marker target resolution, hand-lens retargeting, note-tabs hint bias, place-tab station wrap behavior, filed route identity, and ready-to-file map-calm behavior remain covered by focused tests.

## Verification

- `npm test -- --run src/test/field-request-controller.test.ts -t "support notice|Source to Shore support|place-tab|route-marker"`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "support row|route marker"`

## Handoff

Promote `ECO-20260428-scout-485`. The next scout should scope route-local replay variants through existing world-state, process, nursery, or route display seams while keeping canonical filed titles and saved identities stable.
