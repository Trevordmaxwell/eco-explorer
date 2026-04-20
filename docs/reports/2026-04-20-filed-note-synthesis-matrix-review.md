# Filed-Note Synthesis Matrix Review

Created: 2026-04-20

Queue item: `ECO-20260420-critic-339`

## Review Result

No lane-2 blocker found.

The filed-note synthesis matrix stays test-only and content-facing. It protects the 11 live Route v2 filed-note ids, keeps static route-note copy under explicit handheld budgets, checks ecology relationship anchors, and adds a generated filed/display sentence matrix without changing route progression, route controllers, support behavior, station filing, map travel, save schema, geometry, new content, or player-facing UI.

## Checks

- `content-quality` now fails if a Route v2 note id is added or removed without an intentional budget/anchor update.
- Static `readyText`, `filedText`, `clueBackedTail`, and `displayPrefix` copy now have explicit compact budgets.
- Relationship anchors cover the intended arc concepts: shelter growth, damp hollow, moisture holding, transition, treeline shelter, thaw window, open fell, whole hollow return, and exposed High Pass shelter pockets.
- The resolved filed-note matrix uses saved `routeV2Progress` evidence and checks generated filed/display copy length under the current-safe `144` character ceiling.
- `Thaw Window.` remains display-only: the filed identity stays `Short Season`, while display text gets the prefix.
- The change does not duplicate lane 4's route-state progression matrix; it does not advance routes, file notes, assert next requests, or test support behavior.

## Verification

Passed:

- `npx vitest run src/test/content-quality.test.ts src/test/field-requests.test.ts -t "route|filed|content quality|synthesis"`
- `npx vitest run src/test/content-quality.test.ts src/test/field-requests.test.ts`

Still blocked outside this lane:

- `npm run build` currently fails in `src/test/field-requests.test.ts` on a lane-4 route-state matrix type mismatch: `string | null` is being passed where `string | undefined` is expected near the new `resolveRouteV2FiledDisplayText(...)` assertion.

## Follow-Up

Promote `ECO-20260420-scout-343`. No lane-2 repair follow-up is needed for packet `133`.
