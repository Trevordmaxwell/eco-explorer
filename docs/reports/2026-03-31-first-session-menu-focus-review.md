# 2026-03-31 First-Session Menu-Focus Review

## Result

No blocking lane-1 issue remains.

The follow-up stays appropriately small and targeted: guided `starter` and `station-return` menu opens now default to the taught travel or support action, while later midgame menus keep the older helper-first default. That matches the pre-playthrough goal well because the keyboard-first `M -> Enter` path now works in the exact two onboarding beats where the new copy explicitly teaches it, without turning every menu open into a broader behavior change.

## Verification Read

- Focused lane-1 tests now pass for overlay copy, guided field-season state, and the full runtime smoke file.
- Seeded browser checks at `256x160` confirm `world-map` is highlighted on a fresh starter menu and `field-station` is highlighted on the station-return world-map menu.
- The shell still stays compact and readable in those captures, with zero browser console errors.

## Watch

- Full `npm test` is still red outside lane 1 because `src/test/content-quality.test.ts` flags the lane-4 `forest-expedition-upper-run` summary as over the shared field-request budget. That is a real shared-suite issue, but it is not caused by this lane-1 follow-up and it does not reopen the onboarding blocker.
