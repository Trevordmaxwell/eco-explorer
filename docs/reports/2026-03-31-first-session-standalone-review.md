# 2026-03-31 First-Session Standalone Review

## Finding

### Blocking: menu focus still opens on `toggle-fullscreen` instead of the travel or support action

The new lane-1 copy does the right teaching work: the title now points to `MENU M`, the starter notice points through `Menu -> World map -> Forest Trail`, and the world-map menu frames field station as the next support stop. But the live keyboard path still opens the menu with focus on `toggle-fullscreen`, because `openMenu()` and `closeMenu()` reset `selectedMenuActionId` to that helper row before `ensureMenuSelection()` runs. In a fresh playthrough, `M` then `Enter` does not follow the newly taught route flow, and the same mismatch appears on the world map where the player is being taught to stop at field station. This is a small implementation issue, not a broader design problem, but it undercuts the exact self-contained onboarding this pass was meant to secure.

## Recommendation

- Default menu focus to the first route or support action when one exists.
- Keep helper toggles available, but do not put them in the keyboard-default slot on first open.
- Re-verify the fresh-save path at `256x160` for `biome -> menu -> world map` and `world map -> menu -> field station`.

## Watch

- Full `npm test` is still red outside lane 1 because `src/test/content-quality.test.ts` flags the lane-4 `forest-expedition-upper-run` summary as over the shared field-request budget. That does not change the lane-1 finding above, but the repo-wide suite is not fully green yet.
