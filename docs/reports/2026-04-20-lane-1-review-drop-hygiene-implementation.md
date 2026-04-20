# 2026-04-20 Lane 1 Review-Drop Hygiene Implementation

Completed `ECO-20260420-main-326` for packet `130`.

## Summary

Added a source-complete review-drop workflow so future reviewers can validate this repo from a clean archive without carrying `node_modules`, build output, browser proof output, or local scratch state.

## Changes

- Added `docs/review-drop-checklist.md` with the include/exclude contract and clean-extract proof steps.
- Added `scripts/create-review-drop.mjs`, exposed as `npm run review:pack`, to create timestamped archives under ignored `output/review-drops/`.
- Added `scripts/verify-review-drop.mjs`, exposed as `npm run review:verify -- <archive>`, to extract into `.tmp/review-drop-verify/`, check forbidden paths before install/build, run `npm ci`, validate agents, run tests, and build.
- Updated `package.json` with the new review-drop scripts.

## Proof

A timestamped archive under `output/review-drops/` was created and verified from a clean extract.

Verification from the clean extract passed:

- `npm ci`
- `npm run validate:agents`
- `npm test` with 41 files and 585 tests passing
- `npm run build`

## Notes

- The workflow intentionally does not rely on `npm pack`, because the scout pass found that path can omit `package-lock.json`.
- Generated archives and extracted proof workspaces stay under ignored `output/` and `.tmp/` paths.
