# Route Loop Browser Proof Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-425`
Packet: `.agents/packets/154-performance-bundle-and-error-hardening.json`
Lane: `lane-4`

## Result

Clean. The lane-4 browser proof covered active, ready-to-file, filed, and replay-facing High Pass Route v2 surfaces from production preview using seeded debug save snapshots. No runtime code changed.

## Browser Artifacts

Ignored proof artifacts were written under `output/lane-4-main-425-browser/`:

- `client-boot/shot-0.png` and `client-boot/state-0.json` from the shared web-game client boot smoke.
- `high-pass-active-field.png` / `.json`
- `high-pass-active-journal.png` / `.json`
- `high-pass-active-world-map.png` / `.json`
- `high-pass-ready-to-file-field.png` / `.json`
- `high-pass-ready-to-file-world-map.png` / `.json`
- `high-pass-ready-to-file-station.png` / `.json`
- `high-pass-filed-field.png` / `.json`
- `high-pass-filed-world-map.png` / `.json`
- `high-pass-filed-journal.png` / `.json`
- `high-pass-filed-station.png` / `.json`
- `assertions.json`
- `console-errors.json`

`console-errors.json` is an empty array.

## Assertions

- Active `high-pass-active` keeps `treeline-high-pass` active as `Rimed Pass`.
- Active journal state carries the `treeline-high-pass` field request.
- Active world map shows `Today: Rimed Pass`.
- Ready `high-pass-ready-to-file` keeps `Ready To File` and `ready-to-synthesize`.
- Ready world map clears route replay and marker state.
- Ready station route card shows `HIGH PASS` with `NOTE` and no active target biome.
- Filed `high-pass-filed` clears active request, world-map marker, world-map replay, and journal field request.
- Filed station route card remains complete with `HIGH PASS` / `FILED`.

## Notes

The shared web-game client was used for a boot smoke. The seeded route-state proof used a one-off Playwright runner because the shared client does not seed `localStorage` from `window.get_debug_save_snapshots()`.

The first local pass captured the active world map during the fade-out transition, so the runner was tightened to wait for `scene === "world-map"` and no transition before asserting replay state. The final proof is clean.

## Verification

```bash
npm test -- --run src/test/save-snapshots.test.ts -t "High Pass|snapshot"
npm test -- --run src/test/runtime-smoke.test.ts -t "files High Pass from the live talus-hold loop and settles the completed field arc"
npm run build
node /Users/trevormaxwell/.codex/skills/develop-web-game/scripts/web_game_playwright_client.js --url http://127.0.0.1:4173/ --actions-json '{"steps":[{"buttons":["enter"],"frames":8},{"buttons":[],"frames":8}]}' --iterations 1 --pause-ms 250 --screenshot-dir output/lane-4-main-425-browser/client-boot
node --input-type=module <<'EOF'
# one-off Playwright runner used to seed debug snapshots and capture route-loop artifacts
EOF
```

Representative screenshots were opened and visually inspected for the active world-map replay label, ready station filing card, filed world-map suppression, and filed station archive card.
