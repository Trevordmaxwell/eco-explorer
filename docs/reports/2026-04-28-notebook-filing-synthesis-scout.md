# Notebook Filing Synthesis Scout

Date: 2026-04-28
Owner: lane-4 scout-agent
Queue item: `ECO-20260428-scout-498`
Packet: `.agents/packets/191-lane-4-notebook-filing-synthesis.json`

## Finding

The remaining safe filing-synthesis target is the filed-notice display boundary.

Current route tests already protect canonical filed notes, display-only replay prefixes, note-tabs ready previews, and catalog authoring rules. The one under-named seam is the recorded filed notice: station filing passes `resolveRouteV2FiledDisplayText(...)` into `resolveRecordedFieldRequestNotice(...)`, allowing display-only replay emphasis such as `Thaw Window.` while keeping the recorded route title canonical.

That behavior is important authoring guidance and should be pinned directly before lane 4 closes.

## Scoped Main Pass

- Add a focused test in `src/test/field-notices.test.ts` that builds a ready `tundra-short-season` / `Thaw Window` save, resolves the filed display text, and passes it into `resolveRecordedFieldRequestNotice(...)`.
- Assert the notice title remains canonical `SHORT SEASON`, the notice text starts with `Thaw Window.`, and the variant remains `filed-route`.
- Keep `resolveRouteV2FiledNoteText(...)` canonical without the display prefix; do not change filed text or save behavior.
- Add a short `docs/content-authoring.md` note explaining the filing display chain: canonical `filedText` stays stable, `displayPrefix` may decorate note-tabs preview and filed notice display, and route titles remain canonical.

## Guardrails

- No runtime behavior change unless the test reveals the current station filing path cannot be expressed.
- No route ids, evidence ids, ordered slots, filed text, support ids, save schema, route framework, station shell, planner, content pack, geometry, or fourth Source to Shore beat.
- Do not add a new filing system, note schema, or replay system.

## Suggested Verification

- `npm test -- --run src/test/field-notices.test.ts`
- `npm test -- --run src/test/field-requests.test.ts -t "full-arc filed-note synthesis matrix|Thaw Window"`
- `npm test -- --run src/test/field-season-board.test.ts -t "note-tabs ready wrap|thaw-window"`
- `npm run build`
