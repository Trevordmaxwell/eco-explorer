# Review Drop Checklist

Use this checklist when preparing a source review drop for another agent or reviewer.

## Commands

1. Run `npm run validate:agents` in the source workspace.
2. Run `npm run science:check` to prove the source-ledger gate before packaging.
3. Run `npm run review:pack`.
4. Run `npm run review:verify -- output/review-drops/<archive-name>.tgz`.
5. Share the verified `.tgz` from `output/review-drops/`.

`npm pack` is not the review-drop source of truth for this project because it can omit `package-lock.json`, which means a reviewer cannot prove the drop with `npm ci`.

## Include

- Root build and install files: `package.json`, `package-lock.json`, `tsconfig.json`, `vitest.config.ts`, `index.html`, `README.md`, `AGENTS.md`, and `.gitignore`.
- Runtime and content source: `src/` and `public/`.
- Agent and handoff state: `.agents/`, `docs/`, `scripts/`, and `progress.md`.
- Current queue, packet, report, and validation scripts needed by `npm run validate:agents`.

## Exclude

- Dependency folders such as `node_modules/`.
- Generated build and browser output such as `dist/`, `dist-ssr/`, `output/`, and `test-results/`.
- Local source-control and scratch state such as `.git/`, `.tmp/`, `.DS_Store`, editor folders, logs, and `work-queue.additions-130-157.md`.
- Any generated review archive or extracted review workspace.

## Clean Extract Proof

`npm run review:verify -- <archive>` extracts the archive into `.tmp/review-drop-verify/`, checks the forbidden paths before installing, runs `npm ci`, then runs `npm run validate:agents`, `npm run science:check`, `npm test`, and `npm run build`.

The source-ledger proof requires `docs/science-source-ledger.md` and `src/test/content-quality.test.ts` to be present in the archive so every live inspectable entry and habitat process stays covered by the ledger before a review drop is shared.

The verification step intentionally leaves the extracted workspace in `.tmp/` so a failing proof can be inspected without polluting the source tree.
