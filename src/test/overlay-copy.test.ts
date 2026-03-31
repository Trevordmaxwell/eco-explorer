import { describe, expect, it } from 'vitest';

import {
  getMenuOverlayHelperText,
  getMenuOverlayIntroText,
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
});
