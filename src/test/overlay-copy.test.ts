import { describe, expect, it } from 'vitest';

import {
  getMenuOverlayHelperText,
  getMenuOverlayIntroText,
  TITLE_ACTION_ROWS,
  TITLE_START_HINT,
} from '../engine/overlay-render';
import {
  resolveFieldStationBackdropAccentState,
  resolveFieldStationBackdropPulseState,
  resolveFieldStationGrowthAccentState,
} from '../engine/field-station-homecoming-shell';

describe('first-session overlay copy', () => {
  it('keeps the title controls focused on journal, menu, and confirmation', () => {
    expect(TITLE_ACTION_ROWS).toContainEqual(['BOOK', 'J']);
    expect(TITLE_ACTION_ROWS).toContainEqual(['MENU', 'M']);
    expect(TITLE_ACTION_ROWS).toContainEqual(['PICK', 'ENTER']);
    expect(TITLE_START_HINT).toContain('M');
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
    ).toBe('World map handles travel. Notebook stays on J.');

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
    ).toBe('Field station files notes and support.');

    expect(
      getMenuOverlayHelperText({
        showWorldMapAction: false,
        showFieldStationAction: true,
        showFieldGuideAction: false,
      }),
    ).toContain('file notes');
  });

  it('keeps sound helper copy quiet and gesture-aware for menu fallbacks', () => {
    expect(
      getMenuOverlayHelperText({
        showWorldMapAction: false,
        showFieldStationAction: false,
        showFieldGuideAction: true,
      }),
    ).toBe('Quiet sounds start after a key or click.');

    expect(
      getMenuOverlayHelperText({
        showWorldMapAction: false,
        showFieldStationAction: false,
        showFieldGuideAction: false,
      }),
    ).toBe('Quiet sounds start after a key or click.');
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
      hasHomecomingFrameAccent: false,
      hasLateSeasonLintel: false,
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
      hasHomecomingFrameAccent: false,
      hasLateSeasonLintel: false,
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
      hasHomecomingFrameAccent: false,
      hasLateSeasonLintel: false,
    });

    expect(
      resolveFieldStationBackdropAccentState({
        teachingBedStage: null,
        hasLogPile: false,
        hasPollinatorPatch: false,
        compostRate: 1,
        loggedRouteCount: 3,
        hasLateSeasonArchive: true,
      }),
    ).toMatchObject({
      showAccent: true,
      hasLeftBrace: true,
      hasRightBrace: true,
      hasCenterTie: true,
      hasHomecomingFrameAccent: false,
      hasLateSeasonLintel: true,
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
      renderLateSeasonLintel: false,
      renderHomecomingFrameAccent: false,
    });

    expect(resolveFieldStationBackdropPulseState(noAccent, 'homecoming', 1)).toMatchObject({
      renderLeftBrace: true,
      renderRightBrace: true,
      renderCenterTie: true,
      renderLateSeasonLintel: false,
      renderHomecomingFrameAccent: false,
    });

    const archivedReturn = resolveFieldStationBackdropAccentState({
      teachingBedStage: null,
      hasLogPile: false,
      hasPollinatorPatch: false,
      compostRate: 1,
      loggedRouteCount: 3,
      hasLateSeasonArchive: true,
    });

    expect(resolveFieldStationBackdropPulseState(archivedReturn, 'default', 0)).toMatchObject({
      renderLeftBrace: true,
      renderRightBrace: true,
      renderCenterTie: true,
      renderLateSeasonLintel: true,
      renderHomecomingFrameAccent: false,
    });
  });

  it('keeps homecoming memory as a tiny upper-frame accent without growing sill or braces', () => {
    const accent = resolveFieldStationBackdropAccentState({
      teachingBedStage: null,
      hasLogPile: false,
      hasPollinatorPatch: false,
      compostRate: 1,
      loggedRouteCount: 0,
      homecomingMilestoneRequestId: 'coastal-edge-moisture',
    });

    expect(accent).toMatchObject({
      showAccent: true,
      homecomingMilestoneRequestId: 'coastal-edge-moisture',
      hasHomecomingMemory: true,
      hasHomecomingFrameAccent: true,
      hasLeftBrace: false,
      hasRightBrace: false,
      hasCenterTie: false,
      hasLateSeasonLintel: false,
    });

    expect(resolveFieldStationBackdropPulseState(accent, 'default', 0)).toMatchObject({
      renderLeftBrace: false,
      renderRightBrace: false,
      renderCenterTie: false,
      renderLateSeasonLintel: false,
      renderHomecomingFrameAccent: true,
    });

    expect(resolveFieldStationGrowthAccentState({
      teachingBedStage: null,
      hasLogPile: false,
      hasPollinatorPatch: false,
      compostRate: 1,
      loggedRouteCount: 0,
      homecomingMilestoneRequestId: 'coastal-edge-moisture',
    })).toMatchObject({
      showAccent: false,
      planterWidth: 0,
      hasLeftRouteAccent: false,
      hasRightRouteAccent: false,
      hasConnectedThreshold: false,
    });

    expect(
      resolveFieldStationBackdropAccentState({
        teachingBedStage: null,
        hasLogPile: false,
        hasPollinatorPatch: false,
        compostRate: 1,
        loggedRouteCount: 0,
      }),
    ).toMatchObject({
      homecomingMilestoneRequestId: null,
      hasHomecomingMemory: false,
      hasHomecomingFrameAccent: false,
    });
  });

  it('lets archived High Pass keep its lintel while homecoming adds only frame-cap memory', () => {
    const accent = resolveFieldStationBackdropAccentState({
      teachingBedStage: null,
      hasLogPile: false,
      hasPollinatorPatch: false,
      compostRate: 1,
      loggedRouteCount: 3,
      hasLateSeasonArchive: true,
      homecomingMilestoneRequestId: 'treeline-high-pass',
    });

    expect(accent).toMatchObject({
      showAccent: true,
      loggedRouteCount: 3,
      homecomingMilestoneRequestId: 'treeline-high-pass',
      hasHomecomingMemory: true,
      hasHomecomingFrameAccent: true,
      hasLeftBrace: true,
      hasRightBrace: true,
      hasCenterTie: true,
      hasLateSeasonLintel: true,
    });

    expect(resolveFieldStationBackdropPulseState(accent, 'homecoming', 1)).toMatchObject({
      renderLeftBrace: true,
      renderRightBrace: true,
      renderCenterTie: true,
      renderLateSeasonLintel: true,
      renderHomecomingFrameAccent: true,
    });
  });
});
