import { describe, expect, it } from 'vitest';

import {
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
      }),
    ).toMatchObject({
      showAccent: false,
      stageProgress: 0,
      planterWidth: 0,
    });

    expect(
      resolveFieldStationGrowthAccentState({
        teachingBedStage: 'growing',
        hasLogPile: true,
        hasPollinatorPatch: true,
        compostRate: 2,
      }),
    ).toMatchObject({
      showAccent: true,
      stageProgress: 3,
      hasLogPile: true,
      hasPollinatorPatch: true,
      hasCompostUpgrade: true,
      planterWidth: 22,
    });
  });
});
