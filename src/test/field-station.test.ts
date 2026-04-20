import { describe, expect, it } from 'vitest';

import { biomeRegistry } from '../content/biomes';
import { beachBiome } from '../content/biomes/beach';
import {
  getFieldUpgradeStates,
  getJumpSpeed,
  getRecentFieldCreditSources,
  getWalkSpeed,
  purchaseFieldUpgrade,
  syncFieldStationLedger,
} from '../engine/field-station';
import {
  getFieldStationArrivalPulseValue,
  resolveFieldStationOpenState,
  type FieldStationArrivalMode,
} from '../engine/field-station-session';
import { resolveFieldStationHomecomingState, resolveFieldStationState } from '../engine/field-station-state';
import { FIELD_STATION_HOMECOMING_COPY_LABEL } from '../engine/field-station-homecoming-copy';
import { getOutingSupportStationLabel } from '../engine/outing-support';
import { createNewSaveState, recordDiscovery } from '../engine/save';

const DEFAULT_FIELD_STATION_SELECTIONS = {
  selectedFieldStationView: 'season' as const,
  selectedFieldStationSeasonPage: 'routes' as const,
  outingSupportSelected: false,
  selectedFieldStationUpgradeId: null,
  selectedNurseryCardId: 'bench' as const,
  selectedNurseryProjectId: null,
};

describe('field station ledger', () => {
  it('awards field credit once for surveyed biomes and completed notebook requests', () => {
    const save = createNewSaveState('field-station-ledger-seed');
    for (const entryId of ['beach-grass', 'sand-verbena', 'native-littleneck-shell', 'western-snowy-plover']) {
      recordDiscovery(save, beachBiome.entries[entryId], 'beach');
    }
    save.completedFieldRequestIds = ['forest-hidden-hollow'];

    const newlyClaimed = syncFieldStationLedger(biomeRegistry, save);

    expect(newlyClaimed.map((source) => source.id)).toEqual([
      'surveyed:beach',
      'request:forest-hidden-hollow',
    ]);
    expect(save.fieldCredits).toBe(2);
    expect(save.claimedFieldCreditIds).toEqual([
      'surveyed:beach',
      'request:forest-hidden-hollow',
    ]);
    expect(syncFieldStationLedger(biomeRegistry, save)).toEqual([]);
    expect(save.fieldCredits).toBe(2);
  });

  it('returns the newest claimed support sources first', () => {
    const save = createNewSaveState('field-station-recent-seed');
    save.completedFieldRequestIds = ['forest-hidden-hollow', 'forest-moisture-holders'];
    syncFieldStationLedger(biomeRegistry, save);

    expect(getRecentFieldCreditSources(biomeRegistry, save)).toMatchObject([
      { id: 'request:forest-moisture-holders', label: 'Moisture Holders' },
      { id: 'request:forest-hidden-hollow', label: 'Hidden Hollow' },
    ]);
  });

  it('unlocks field step only after trail stride and applies both movement boosts safely', () => {
    const save = createNewSaveState('field-station-upgrade-seed');
    save.fieldCredits = 3;

    expect(getWalkSpeed(save)).toBe(42);
    expect(getJumpSpeed(save)).toBe(118);
    expect(getFieldUpgradeStates(save).map((upgrade) => upgrade.id)).toEqual(['trail-stride']);
    expect(getFieldUpgradeStates(save)[0]).toMatchObject({
      id: 'trail-stride',
      affordable: true,
      owned: false,
    });
    expect(purchaseFieldUpgrade(save, 'trail-stride')).toBe(true);
    expect(save.fieldCredits).toBe(0);
    expect(save.purchasedUpgradeIds).toEqual(['trail-stride']);
    expect(getWalkSpeed(save)).toBe(46);
    expect(getFieldUpgradeStates(save).map((upgrade) => upgrade.id)).toEqual([
      'trail-stride',
      'field-step',
    ]);
    save.fieldCredits = 5;
    expect(purchaseFieldUpgrade(save, 'field-step')).toBe(true);
    expect(save.fieldCredits).toBe(0);
    expect(save.purchasedUpgradeIds).toEqual(['trail-stride', 'field-step']);
    expect(getJumpSpeed(save)).toBe(124);
    expect(getFieldUpgradeStates(save).map((upgrade) => upgrade.id)).toEqual([
      'trail-stride',
      'field-step',
      'route-marker',
    ]);
    expect(getFieldUpgradeStates(save)[2]).toMatchObject({
      id: 'route-marker',
      owned: false,
      affordable: false,
    });
    save.fieldCredits = 7;
    expect(purchaseFieldUpgrade(save, 'route-marker')).toBe(true);
    expect(save.fieldCredits).toBe(0);
    expect(save.purchasedUpgradeIds).toEqual(['trail-stride', 'field-step', 'route-marker']);
    expect(getWalkSpeed(save)).toBe(46);
    expect(getJumpSpeed(save)).toBe(124);
    expect(purchaseFieldUpgrade(save, 'trail-stride')).toBe(false);
    expect(purchaseFieldUpgrade(save, 'field-step')).toBe(false);
    expect(purchaseFieldUpgrade(save, 'route-marker')).toBe(false);
  });

  it('derives a homecoming field-station open state only when return progress changed something', () => {
    const save = createNewSaveState('field-station-open-earned');
    save.completedFieldRequestIds = ['forest-hidden-hollow'];

    const earnedOpen = resolveFieldStationOpenState(biomeRegistry, save, null, null);

    expect(earnedOpen.arrivalMode).toBe<FieldStationArrivalMode>('homecoming');
    expect(earnedOpen.persistNeeded).toBe(true);
    expect(earnedOpen.selectedFieldStationUpgradeId).toBe('trail-stride');

    const calmOpen = resolveFieldStationOpenState(biomeRegistry, save, 'trail-stride', null);
    expect(calmOpen.arrivalMode).toBe<FieldStationArrivalMode>('default');
    expect(calmOpen.persistNeeded).toBe(false);
    expect(calmOpen.selectedFieldStationUpgradeId).toBe('trail-stride');
  });

  it('keeps station homecoming copy behind earned arrival mode and filed milestones', () => {
    const save = createNewSaveState('field-station-homecoming-state');
    save.completedFieldRequestIds = ['coastal-edge-moisture'];

    expect(resolveFieldStationHomecomingState(save, 'default')).toBeNull();
    expect(resolveFieldStationHomecomingState(createNewSaveState('field-station-homecoming-empty'), 'homecoming'))
      .toBeNull();

    expect(resolveFieldStationHomecomingState(save, 'homecoming')).toEqual({
      label: FIELD_STATION_HOMECOMING_COPY_LABEL,
      requestId: 'coastal-edge-moisture',
      homecomingMilestoneRequestId: 'coastal-edge-moisture',
      text: 'Coast line filed. The station holds one shore-to-forest thread.',
    });

    expect(resolveFieldStationHomecomingState(save, 'default')).toBeNull();
  });

  it('reports arrival pulse only while the field station is open', () => {
    expect(getFieldStationArrivalPulseValue('field-station', 0.2, 0.4)).toBe(0.5);
    expect(getFieldStationArrivalPulseValue('other', 0.2, 0.4)).toBe(0);
    expect(getFieldStationArrivalPulseValue('field-station', 0, 0.4)).toBe(0);
  });

  it('shares exact station outing-support labels with normalized support state', () => {
    expect(getOutingSupportStationLabel('hand-lens')).toBe('HAND LENS');
    expect(getOutingSupportStationLabel('note-tabs')).toBe('NOTE TABS');
    expect(getOutingSupportStationLabel('place-tab')).toBe('PLACE TAB');
    expect(getOutingSupportStationLabel('route-marker')).toBe('ROUTE MARKER');

    const lockedRouteMarkerSave = createNewSaveState('field-station-locked-route-marker-label');
    lockedRouteMarkerSave.selectedOutingSupportId = 'route-marker';

    expect(
      resolveFieldStationState(
        biomeRegistry,
        lockedRouteMarkerSave,
        DEFAULT_FIELD_STATION_SELECTIONS,
      ),
    ).toMatchObject({
      selectedOutingSupportId: 'hand-lens',
      selectedOutingSupportLabel: 'HAND LENS',
    });

    lockedRouteMarkerSave.purchasedUpgradeIds = ['route-marker'];

    expect(
      resolveFieldStationState(
        biomeRegistry,
        lockedRouteMarkerSave,
        DEFAULT_FIELD_STATION_SELECTIONS,
      ),
    ).toMatchObject({
      selectedOutingSupportId: 'route-marker',
      selectedOutingSupportLabel: 'ROUTE MARKER',
    });

    const unlockedPlaceTabSave = createNewSaveState('field-station-place-tab-label');
    unlockedPlaceTabSave.completedFieldRequestIds = ['treeline-stone-shelter'];
    unlockedPlaceTabSave.selectedOutingSupportId = 'place-tab';

    expect(
      resolveFieldStationState(
        biomeRegistry,
        unlockedPlaceTabSave,
        DEFAULT_FIELD_STATION_SELECTIONS,
      ),
    ).toMatchObject({
      selectedOutingSupportId: 'place-tab',
      selectedOutingSupportLabel: 'PLACE TAB',
    });
  });
});
