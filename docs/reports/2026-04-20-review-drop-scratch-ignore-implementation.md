# Review Drop Scratch Ignore Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-422`
Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
Lane: `lane-1`

## Result

Implemented the review-drop scratch hygiene guard without changing packaging scripts or runtime code.

- Added `.tmp` to the repo-local `.gitignore` so `review:verify` clean-extract workspaces are ignored on fresh machines without relying on a personal global gitignore.
- Added `src/test/review-drop-hygiene.test.ts` to keep the generated/local folder ignore list covered: `node_modules`, `dist`, `dist-ssr`, `.tmp`, `output`, and `test-results`.
- Switched the test to Vite's existing `?raw` import pattern so the production TypeScript build stays free of Node test type dependencies.

## Guardrails Kept

- No review-drop script rewrite.
- No new packaging command.
- No README or package script change.
- No runtime code, save schema, route behavior, station behavior, content, geometry, or browser UI change.

## Verification

```bash
npm test -- --run src/test/review-drop-hygiene.test.ts
node --check scripts/create-review-drop.mjs
node --check scripts/verify-review-drop.mjs
npm run build
```
