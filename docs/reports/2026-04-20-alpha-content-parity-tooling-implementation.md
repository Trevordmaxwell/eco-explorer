# Alpha Content Parity Tooling Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-402`
Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
Lane: `lane-1`

## Summary

Updated `README.md` so the public project entrypoint now reflects the build, test, science-check, agent-validation, and review-drop commands that already exist in `package.json`.

## Changes

- Added `npm run science:check`, `npm run review:pack`, and `npm run review:verify -- <archive.tgz>` to the useful-command list.
- Split fresh local verification from source review-drop verification.
- Replaced the old generic archive-sharing note with the dedicated review-drop pack/verify flow.
- Pointed reviewers to `docs/review-drop-checklist.md` for the full checklist.

## Guardrails Kept

- No runtime code, route behavior, station state, save schema, package script behavior, verifier behavior, authored science/content, or historical reports changed.
- No new alpha promise, season-three or biome-six language, release date, direct API mode, crafting, combat, inventory, account, or planner UI was added.

## Verification

```bash
node --check scripts/create-review-drop.mjs
node --check scripts/verify-review-drop.mjs
npm run validate:agents
git diff --check
```
