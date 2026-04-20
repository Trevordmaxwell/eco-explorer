# Alpha Content Parity Tooling Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-402`
Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
Lane: `lane-1`

## Scout Finding

Lane 1 should keep packet `149` focused on public tooling truth, not content pruning or route copy. The build, test, science, agent-validation, and review-drop scripts are present, and the dedicated review-drop checklist already describes the current clean-extract proof. The remaining stale public surface is `README.md`: it lists build/test/validate basics, but it does not expose `science:check`, `review:pack`, or `review:verify`, and its archive-sharing note still reads like a generic "omit node_modules" reminder instead of pointing reviewers to the verified source-drop flow.

The smallest useful implementation is a README command sync that makes the repo's public entrypoint match the packaging/tooling work that already landed.

## Recommended Main Scope

- Add `npm run science:check`, `npm run review:pack`, and `npm run review:verify -- <archive.tgz>` to the README useful-command list.
- Split the README's fresh-machine smoke instructions from source review-drop instructions so local developers still see the simple build/test/validate path, while reviewers see the pack/verify workflow.
- Replace the generic archive-sharing note with a short pointer to `docs/review-drop-checklist.md` and the `npm run review:pack` / `npm run review:verify -- output/review-drops/<archive-name>.tgz` flow.
- Keep `docs/review-drop-checklist.md`, `scripts/create-review-drop.mjs`, `scripts/verify-review-drop.mjs`, and `package.json` behavior unchanged unless the README audit reveals a direct mismatch.

## Guardrails

- Do not change runtime code, route behavior, station state, save schema, test behavior, packaging behavior, or authored science/content.
- Do not rewrite historical dated reports.
- Do not add new alpha promises, season-three/biome-six language, release dates, direct API mode, crafting, combat, inventory, accounts, or planner UI.
- Keep this as a public-doc command sync; lane 2 owns content parity language and lane 4 owns route/support documentation.

## Suggested Verification

```bash
node --check scripts/create-review-drop.mjs
node --check scripts/verify-review-drop.mjs
npm run validate:agents
git diff --check
```

No build is required if the implementation stays README/docs-only.
