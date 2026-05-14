import { describe, expect, it } from 'vitest';

import { biomeRegistry } from '../content/biomes';
import {
  changeFieldStationRouteSelection,
  changeFieldStationSurface,
  changeNurseryCardSelection,
  getFieldStationSurface,
  normalizeFieldStationSelections,
  resolveFieldStationPrimaryAction,
  setFieldStationSurface,
  type FieldStationSelections,
} from '../engine/field-station-session';
import { createNewSaveState, recordDiscovery } from '../engine/save';

const DEFAULT_SELECTIONS: FieldStationSelections = {
  selectedFieldStationView: 'season',
  selectedFieldStationSeasonPage: 'routes',
  outingSupportSelected: false,
  selectedFieldStationUpgradeId: null,
  selectedNurseryCardId: 'bench',
  selectedNurseryProjectId: null,
};

describe('field station session selection', () => {
  it('cycles station surfaces in the existing routes, expedition, nursery order', () => {
    const save = createNewSaveState('field-station-surface-cycle');
    const expedition = changeFieldStationSurface(save, DEFAULT_SELECTIONS, 1);
    const nursery = changeFieldStationSurface(save, expedition, 1);
    const routes = changeFieldStationSurface(save, nursery, 1);
    const wrappedNursery = changeFieldStationSurface(save, DEFAULT_SELECTIONS, -1);

    expect(getFieldStationSurface(expedition)).toBe('season-expedition');
    expect(expedition).toMatchObject({
      selectedFieldStationView: 'season',
      selectedFieldStationSeasonPage: 'expedition',
    });
    expect(getFieldStationSurface(nursery)).toBe('nursery');
    expect(nursery).toMatchObject({
      selectedFieldStationView: 'nursery',
      selectedFieldStationSeasonPage: 'routes',
    });
    expect(getFieldStationSurface(routes)).toBe('season-routes');
    expect(wrappedNursery.selectedFieldStationView).toBe('nursery');
  });

  it('normalizes the selected upgrade when entering route rows', () => {
    const save = createNewSaveState('field-station-routes-normalize');
    save.purchasedUpgradeIds = ['trail-stride'];

    const selections = setFieldStationSurface(
      save,
      {
        ...DEFAULT_SELECTIONS,
        selectedFieldStationView: 'nursery',
        outingSupportSelected: true,
        selectedFieldStationUpgradeId: 'missing-upgrade',
      },
      'season-routes',
    );

    expect(selections).toMatchObject({
      selectedFieldStationView: 'season',
      selectedFieldStationSeasonPage: 'routes',
      outingSupportSelected: false,
      selectedFieldStationUpgradeId: 'trail-stride',
    });
  });

  it('normalizes the selected nursery project when entering nursery rows', () => {
    const save = createNewSaveState('field-station-nursery-normalize');
    save.completedFieldRequestIds = ['coastal-shelter-shift'];
    recordDiscovery(save, biomeRegistry.beach.entries['sand-verbena'], 'beach');

    const selections = setFieldStationSurface(
      save,
      {
        ...DEFAULT_SELECTIONS,
        outingSupportSelected: true,
        selectedNurseryCardId: 'bed',
        selectedNurseryProjectId: 'missing-project',
      },
      'nursery',
    );

    expect(selections).toMatchObject({
      selectedFieldStationView: 'nursery',
      selectedFieldStationSeasonPage: 'routes',
      outingSupportSelected: false,
      selectedNurseryCardId: 'bed',
      selectedNurseryProjectId: 'sand-verbena-bed',
    });
  });

  it('wraps route selection between outing support and visible upgrades', () => {
    const save = createNewSaveState('field-station-route-selection-wrap');
    save.purchasedUpgradeIds = ['trail-stride'];

    const fieldStep = changeFieldStationRouteSelection(
      save,
      {
        ...DEFAULT_SELECTIONS,
        selectedFieldStationUpgradeId: 'trail-stride',
      },
      1,
    );
    const support = changeFieldStationRouteSelection(save, fieldStep, 1);
    const trailStride = changeFieldStationRouteSelection(save, support, 1);
    const supportFromTop = changeFieldStationRouteSelection(
      save,
      {
        ...DEFAULT_SELECTIONS,
        selectedFieldStationUpgradeId: 'trail-stride',
      },
      -1,
    );

    expect(fieldStep).toMatchObject({
      outingSupportSelected: false,
      selectedFieldStationUpgradeId: 'field-step',
    });
    expect(support).toMatchObject({
      outingSupportSelected: true,
      selectedFieldStationUpgradeId: 'field-step',
    });
    expect(trailStride).toMatchObject({
      outingSupportSelected: false,
      selectedFieldStationUpgradeId: 'trail-stride',
    });
    expect(supportFromTop.outingSupportSelected).toBe(true);
  });

  it('wraps nursery card selection through bench, compost, and bed', () => {
    const compost = changeNurseryCardSelection(DEFAULT_SELECTIONS, 1);
    const bed = changeNurseryCardSelection(compost, 1);
    const bench = changeNurseryCardSelection(bed, 1);
    const wrappedBed = changeNurseryCardSelection(DEFAULT_SELECTIONS, -1);

    expect(compost.selectedNurseryCardId).toBe('compost');
    expect(bed.selectedNurseryCardId).toBe('bed');
    expect(bench.selectedNurseryCardId).toBe('bench');
    expect(wrappedBed.selectedNurseryCardId).toBe('bed');
  });

  it('normalizes station selection ids without changing the active surface', () => {
    const save = createNewSaveState('field-station-selection-normalize');
    save.completedFieldRequestIds = ['coastal-shelter-shift'];
    recordDiscovery(save, biomeRegistry.beach.entries['sand-verbena'], 'beach');

    const selections = normalizeFieldStationSelections(save, {
      ...DEFAULT_SELECTIONS,
      selectedFieldStationView: 'nursery',
      selectedFieldStationUpgradeId: 'missing-upgrade',
      selectedNurseryProjectId: 'missing-project',
    });

    expect(selections).toMatchObject({
      selectedFieldStationView: 'nursery',
      selectedFieldStationUpgradeId: 'trail-stride',
      selectedNurseryProjectId: 'sand-verbena-bed',
    });
  });

  it('keeps routes-page primary action priority as file, support, then upgrade', () => {
    const save = createNewSaveState('field-station-routes-primary-action');
    save.routeV2Progress = {
      requestId: 'source-to-shore-source-shelter',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [],
    };

    expect(resolveFieldStationPrimaryAction(save, {
      ...DEFAULT_SELECTIONS,
      outingSupportSelected: true,
      selectedFieldStationUpgradeId: 'trail-stride',
    })).toEqual({
      kind: 'file-route-note',
      requestId: 'source-to-shore-source-shelter',
    });

    save.routeV2Progress = null;

    expect(resolveFieldStationPrimaryAction(save, {
      ...DEFAULT_SELECTIONS,
      outingSupportSelected: true,
      selectedFieldStationUpgradeId: 'trail-stride',
    })).toEqual({ kind: 'toggle-outing-support' });

    expect(resolveFieldStationPrimaryAction(save, {
      ...DEFAULT_SELECTIONS,
      selectedFieldStationUpgradeId: 'trail-stride',
    })).toEqual({
      kind: 'purchase-upgrade',
      upgradeId: 'trail-stride',
    });
  });

  it('keeps expedition filing specific to ready forest expeditions', () => {
    const save = createNewSaveState('field-station-expedition-primary-action');
    save.routeV2Progress = {
      requestId: 'forest-expedition-root-hollow',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [],
    };

    expect(resolveFieldStationPrimaryAction(save, {
      ...DEFAULT_SELECTIONS,
      selectedFieldStationSeasonPage: 'expedition',
    })).toEqual({
      kind: 'file-expedition-note',
      requestId: 'forest-expedition-root-hollow',
    });

    save.routeV2Progress = {
      requestId: 'source-to-shore-source-shelter',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [],
    };

    expect(resolveFieldStationPrimaryAction(save, {
      ...DEFAULT_SELECTIONS,
      selectedFieldStationSeasonPage: 'expedition',
    })).toEqual({ kind: 'activate-expedition-card' });
  });

  it('routes nursery primary action to nursery activation', () => {
    const save = createNewSaveState('field-station-nursery-primary-action');

    expect(resolveFieldStationPrimaryAction(save, {
      ...DEFAULT_SELECTIONS,
      selectedFieldStationView: 'nursery',
    })).toEqual({ kind: 'activate-nursery-card' });
  });
});
