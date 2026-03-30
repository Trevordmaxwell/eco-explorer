import { describe, expect, it } from 'vitest';

import { biomeRegistry } from '../content/biomes';
import { beachBiome } from '../content/biomes/beach';
import {
  getJumpSpeed,
  getFieldUpgradeStates,
  getRecentFieldCreditSources,
  getWalkSpeed,
  purchaseFieldUpgrade,
  syncFieldStationLedger,
} from '../engine/field-station';
import { createNewSaveState, recordDiscovery } from '../engine/save';

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
});
