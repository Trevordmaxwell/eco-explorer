# Alpha Runway Lane 2 Doc-Sync Handoff

Created: 2026-04-20

Queue item: `ECO-20260420-scout-327`

## Recommendation

Lane 2 should keep packet `130` doc-sync work narrow and source-of-truth oriented: update the public/current docs so they say the completed alpha arc now reaches filed `High Pass`, while leaving future runway items framed as internal hardening and feedback readiness.

The strongest target is `README.md`. It is broadly accurate about the five-biome build and live systems, but it does not yet name the closed `High Pass` proof chapter or the new alpha runway posture. A small addition to `What Is Live Now` and a small retune of `Current Product Direction` should be enough.

## Current Findings

- `README.md` already matches the live controls, Vite commands, fixed `256x160` viewport, field station, nursery, journal, close-look, and deterministic save basics.
- `.agents/project-memory.md` already contains the durable packet `130` guardrails: completed `High Pass`, no immediate season three / biome six / planner / crafting / combat / inventory expansion, and strict four-lane ownership.
- `progress.md` already records packet `129` closure and the packet `130`-`157` mega-push load; it should only get a short completion note after the main doc-sync lands.
- Older dated reports still contain pre-closure `High Pass` language. Treat those as historical reports, not stale current docs to rewrite.

## Main-327 Scope

Recommended files:

- `README.md`
- `.agents/project-memory.md` only if one current summary sentence needs the same completed-arc wording
- `progress.md` for one concise completion entry after implementation

Recommended edits:

- In `README.md`, add one compact current-state line that the live alpha arc now runs through the first field-season/Root Hollow path into filed `High Pass`, with station/map/journal/request cues settling afterward.
- In `README.md`, retune `Current Product Direction` so the active priority reads as alpha runway hardening of the current five-biome arc, not a promise of immediate new regions.
- Preserve the existing fresh-machine verification instructions and agent workflow notes.
- If editing `.agents/project-memory.md`, replace or sharpen an existing current-summary sentence rather than stacking another duplicate strategic reminder.

Non-goals:

- Do not touch runtime code, route behavior, station state, movement geometry, or content packs.
- Do not promise season three, biome six, release dates, player accounts, direct API field-guide mode, crafting, combat, inventory, or a bigger planner.
- Do not rewrite dated reports that are accurate snapshots of earlier work.
- Do not create a new roadmap table; packet `130` already points to the larger runway.

## Suggested Checks

- `npm run validate:agents`
- `git diff --check`
- No build is required if the implementation stays doc-only.
