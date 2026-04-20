# 2026-04-20 Lane 1 Review-Drop Hygiene Handoff

Completed `ECO-20260420-scout-326` for packet `130`.

## Finding

The source-complete workspace is healthy, but the review-drop process is not yet reproducible.

- `npm run validate:agents` currently passes on the source-complete repo.
- `.gitignore` already excludes `node_modules`, `dist`, `output`, `test-results`, `.tmp`, and local editor clutter.
- There is no dedicated review-drop checklist or archive script yet.
- `npm pack --dry-run --json` includes the source tree and excludes generated bulk, but it does not include `package-lock.json`; that makes `npm pack` a poor proof path for a review archive that should support `npm ci`.

## Main Scope

Implement a lane-1 tooling pass that creates a reproducible source review drop and proves it can build from a clean extract.

Recommended files:

- `docs/review-drop-checklist.md`
- `scripts/create-review-drop.mjs`
- `scripts/verify-review-drop.mjs`
- `package.json`
- `.gitignore` if the scripts create a new top-level output folder instead of writing under ignored `output/`

Recommended archive contents:

- include root project files needed for install/build: `package.json`, `package-lock.json`, `tsconfig.json`, `vite*.ts`, `index.html`, `README.md`, `AGENTS.md`
- include source and handoff state: `src/`, `public/`, `scripts/`, `docs/`, `.agents/`, `progress.md`
- exclude generated or local-only bulk: `node_modules/`, `dist/`, `output/`, `test-results/`, `.git/`, `.tmp/`, `.DS_Store`, editor folders, and any generated review archive
- omit `work-queue.additions-130-157.md` from the archive unless a future reviewer explicitly needs the raw insertion scratch file; the live queue and packets are now the source of truth

Recommended command shape:

- `npm run review:pack` creates a timestamped `.tgz` under `output/review-drops/`
- `npm run review:verify -- <archive>` extracts into `.tmp/review-drop-verify/`, runs `npm ci`, then runs `npm run validate:agents`, `npm test`, and `npm run build`

## Acceptance For Main

- A documented checklist tells future agents what belongs in a clean review drop and what must be excluded.
- A script creates a source-complete archive that includes `package-lock.json` and all paths needed by `npm run validate:agents`.
- A verification script proves the archive from a clean extract with install, agent validation, tests, and build.
- The generated archive excludes `node_modules`, `dist`, `output`, `test-results`, `.git`, and other local/generated bulk.

## Verification

- `npm run validate:agents`
- `npm pack --dry-run --json` inspection to confirm why `npm pack` is not sufficient for this review-drop proof.
