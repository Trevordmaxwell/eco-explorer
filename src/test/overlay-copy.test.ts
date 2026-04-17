import { describe, expect, it } from 'vitest';

import {
  resolveFieldStationBackdropAccentState,
  resolveFieldStationBackdropPulseState,
  getMenuOverlayHelperText,
  getMenuOverlayIntroText,
  resolveFieldStationGrowthAccentState,
  TITLE_ACTION_ROWS,
  TITLE_START_HINT,
} from '../engine/overlay-render';

describe('first-session overlay copy', () => {
  it('keeps the title controls focused on journal, menu, and confirmation', () => {
    expect(TITLE_ACTION_ROWS).toContainEqual(['BOOK', 'J']);
    expect(TITLE_ACTION_ROWS).toContainEqual(['MENU', 'M']);
    expect(TITLE_ACTION_ROWS).toContainEqual(['PICK', 'ENTER']);
    expect(TITLE_START_HINT).toContain('MENU');
    expect(TITLE_START_HINT).toContain('MAP');
    expect(TITLE_START_HINT).toContain('STATION');
  });

  it('explains the biome menu as the route step and the world-map menu as the station step', () => {
    expect(
      getMenuOverlayIntroText({
        showWorldMapAction: true,
        showFieldStationAction: false,
        showFieldGuideAction: true,
      }),
    ).toBe('World map handles travel. Journal stays on J.');

    expect(
      getMenuOverlayHelperText({
        showWorldMapAction: true,
        showFieldStationAction: false,
        showFieldGuideAction: true,
      }),
    ).toContain('World map');

    expect(
      getMenuOverlayIntroText({
        showWorldMapAction: false,
        showFieldStationAction: true,
        showFieldGuideAction: false,
      }),
    ).toBe('Field station handles support and route upgrades.');

    expect(
      getMenuOverlayHelperText({
        showWorldMapAction: false,
        showFieldStationAction: true,
        showFieldGuideAction: false,
      }),
    ).toContain('Trail Stride');
  });

  it('derives a calm field-station growth accent from nursery progress instead of new copy', () => {
    expect(
      resolveFieldStationGrowthAccentState({
        teachingBedStage: null,
        hasLogPile: false,
        hasPollinatorPatch: false,
        compostRate: 1,
        loggedRouteCount: 0,
      }),
    ).toMatchObject({
      showAccent: false,
      stageProgress: 0,
      planterWidth: 0,
      hasLeftRouteAccent: false,
      hasRightRouteAccent: false,
      hasConnectedThreshold: false,
    });

    expect(
      resolveFieldStationGrowthAccentState({
        teachingBedStage: 'growing',
        hasLogPile: true,
        hasPollinatorPatch: true,
        compostRate: 2,
        loggedRouteCount: 2,
      }),
    ).toMatchObject({
      showAccent: true,
      stageProgress: 3,
      hasLogPile: true,
      hasPollinatorPatch: true,
      hasCompostUpgrade: true,
      loggedRouteCount: 2,
      hasLeftRouteAccent: true,
      hasRightRouteAccent: true,
      hasConnectedThreshold: false,
      planterWidth: 22,
    });

    expect(
      resolveFieldStationGrowthAccentState({
        teachingBedStage: null,
        hasLogPile: false,
        hasPollinatorPatch: false,
        compostRate: 1,
        loggedRouteCount: 3,
      }),
    ).toMatchObject({
      showAccent: true,
      loggedRouteCount: 3,
      hasLeftRouteAccent: true,
      hasRightRouteAccent: true,
      hasConnectedThreshold: true,
      planterWidth: 10,
    });
  });

  it('derives a non-sill backdrop accent from the same calm home-place inputs', () => {
    expect(
      resolveFieldStationBackdropAccentState({
        teachingBedStage: null,
        hasLogPile: false,
        hasPollinatorPatch: false,
        compostRate: 1,
        loggedRouteCount: 0,
      }),
    ).toMatchObject({
      showAccent: false,
      stageProgress: 0,
      hasLeftBrace: false,
      hasRightBrace: false,
      hasCenterTie: false,
    });

    expect(
      resolveFieldStationBackdropAccentState({
        teachingBedStage: 'stocked',
        hasLogPile: false,
        hasPollinatorPatch: false,
        compostRate: 1,
        loggedRouteCount: 0,
      }),
    ).toMatchObject({
      showAccent: true,
      stageProgress: 1,
      loggedRouteCount: 0,
      hasLeftBrace: true,
      hasRightBrace: false,
      hasCenterTie: false,
    });

    expect(
      resolveFieldStationBackdropAccentState({
        teachingBedStage: 'mature',
        hasLogPile: true,
        hasPollinatorPatch: true,
        compostRate: 2,
        loggedRouteCount: 3,
      }),
    ).toMatchObject({
      showAccent: true,
      stageProgress: 4,
      loggedRouteCount: 3,
      hasLeftBrace: true,
      hasRightBrace: true,
      hasCenterTie: true,
      hasLogPile: true,
      hasPollinatorPatch: true,
      hasCompostUpgrade: true,
    });
  });

  it('lets earned return pulses reuse the existing backdrop brace family without new copy', () => {
    const noAccent = resolveFieldStationBackdropAccentState({
      teachingBedStage: null,
      hasLogPile: false,
      hasPollinatorPatch: false,
      compostRate: 1,
      loggedRouteCount: 0,
    });

    expect(resolveFieldStationBackdropPulseState(noAccent, 'default', 1)).toMatchObject({
      renderLeftBrace: false,
      renderRightBrace: false,
      renderCenterTie: false,
    });

    expect(resolveFieldStationBackdropPulseState(noAccent, 'homecoming', 1)).toMatchObject({
      renderLeftBrace: true,
      renderRightBrace: true,
      renderCenterTie: true,
    });
  });
});
