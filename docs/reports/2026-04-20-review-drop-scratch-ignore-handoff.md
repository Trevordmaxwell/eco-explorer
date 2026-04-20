# Review Drop Scratch Ignore Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-422`
Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
Lane: `lane-1`

## Scout Result

The review-drop scripts and README flow are already in place: `review:pack` creates an ignored archive under `output/review-drops/`, and `review:verify` extracts into `.tmp/review-drop-verify/`, runs `npm ci`, agent validation, science checks, tests, and build.

The small remaining lane-1 package-hygiene gap is that `.tmp/` is not listed in the repo-local `.gitignore`, even though the verifier intentionally leaves extracted clean-workspace output there for debugging. This machine has a personal global ignore that hides `.tmp`, but a fresh reviewer should not need that global setup to avoid scratch-workspace noise.

## Main Scope

- Add `.tmp` to the project `.gitignore`.
- Add a focused `src/test/review-drop-hygiene.test.ts` guard that confirms `.gitignore` contains the local/generated folders used by review-drop and build workflows: `node_modules`, `dist`, `dist-ssr`, `.tmp`, `output`, and `test-results`.
- Keep `scripts/create-review-drop.mjs`, `scripts/verify-review-drop.mjs`, `package.json`, README wording, and runtime source unchanged unless the new test reveals a direct mismatch.

## Guardrails

- Do not rewrite the review-drop workflow.
- Do not add a new packaging command.
- Do not run or require a full clean-extract verify inside the main implementation unless the small ignore/test change exposes a problem.
- Do not touch runtime code, station behavior, save schema, route behavior, content, geometry, or browser UI.

## Baseline Checks

```bash
npm run review:pack
node --check scripts/create-review-drop.mjs
node --check scripts/verify-review-drop.mjs
```

The generated review archive landed under ignored `output/review-drops/`.

## Suggested Verification

```bash
npm test -- --run src/test/review-drop-hygiene.test.ts
node --check scripts/create-review-drop.mjs
node --check scripts/verify-review-drop.mjs
npm run build
npm run validate:agents
git diff --check
```
