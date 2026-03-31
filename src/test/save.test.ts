import { describe, expect, it } from 'vitest';
import { beachBiome } from '../content/biomes/beach';
import {
  cycleSelectedOutingSupportId,
  createDefaultSettings,
  createNewSaveState,
  incrementBiomeVisit,
  normalizeSaveState,
  recordDiscovery,
  resetSaveProgress,
} from '../engine/save';

describe('save settings defaults', () => {
  it('starts with inspect hints enabled', () => {
    expect(createDefaultSettings()).toEqual({
      fullscreen: false,
      showInspectHints: true,
      soundEnabled: true,
    });
  });

  it('migrates older saves by filling the new settings field safely', () => {
    const migrated = normalizeSaveState({
      worldSeed: 'legacy-seed',
      settings: {
        fullscreen: true,
      },
    });

    expect(migrated.worldSeed).toBe('legacy-seed');
    expect(migrated.settings).toEqual({
      fullscreen: true,
      showInspectHints: true,
      soundEnabled: true,
    });
    expect(migrated.worldStateVersion).toBe(2);
    expect(migrated.worldStep).toBe(1);
  });

  it('migrates legacy single-biome discoveries into biome sighting lists', () => {
    const migrated = normalizeSaveState({
      worldSeed: 'legacy-seed',
      discoveredEntries: {
        'beach-grass': {
          entryId: 'beach-grass',
          discoveredAt: '2026-03-28T00:00:00.000Z',
          biomeId: 'beach',
        },
      },
    });

    expect(migrated.discoveredEntries['beach-grass']).toEqual({
      entryId: 'beach-grass',
      discoveredAt: '2026-03-28T00:00:00.000Z',
      biomeIds: ['beach'],
    });
  });

  it('migrates renamed coastal discoveries to the Pacific-aligned entry ids', () => {
    const migrated = normalizeSaveState({
      worldSeed: 'legacy-seed',
      discoveredEntries: {
        'coquina-shell': {
          entryId: 'coquina-shell',
          discoveredAt: '2026-03-27T19:00:00.000Z',
          biomeId: 'beach',
        },
        'auger-shell': {
          entryId: 'auger-shell',
          discoveredAt: '2026-03-27T19:01:00.000Z',
          biomeId: 'beach',
        },
        'ghost-crab': {
          entryId: 'ghost-crab',
          discoveredAt: '2026-03-27T19:02:00.000Z',
          biomeId: 'beach',
        },
        pickleweed: {
          entryId: 'pickleweed',
          discoveredAt: '2026-03-27T19:03:00.000Z',
          biomeId: 'beach',
        },
      },
    });

    expect(Object.keys(migrated.discoveredEntries)).toEqual([
      'native-littleneck-shell',
      'razor-clam-shell',
      'pacific-sand-crab',
      'sand-verbena',
    ]);
  });

  it('shifts pre-follow-up world steps forward once so existing saves keep the same visible mood', () => {
    const migrated = normalizeSaveState({
      worldSeed: 'legacy-seed',
      worldStep: 2,
    });

    expect(migrated.worldStateVersion).toBe(2);
    expect(migrated.worldStep).toBe(3);

    const alreadyCurrent = normalizeSaveState({
      worldSeed: 'current-seed',
      worldStateVersion: 2,
      worldStep: 2,
    });

    expect(alreadyCurrent.worldStep).toBe(2);
  });

  it('starts new saves with an empty completed field-request ledger', () => {
    const save = createNewSaveState('field-request-seed');

    expect(save.sketchbookPages).toEqual({});
    expect(save.completedFieldRequestIds).toEqual([]);
    expect(save.routeV2Progress).toBeNull();
    expect(save.selectedOutingSupportId).toBe('hand-lens');
    expect(save.fieldCredits).toBe(0);
    expect(save.claimedFieldCreditIds).toEqual([]);
    expect(save.purchasedUpgradeIds).toEqual([]);
    expect(save.nurseryResources).toEqual({
      litter: 0,
      'seed-stock': 0,
      cuttings: 0,
      compost: 0,
    });
    expect(save.nurseryProjects).toEqual({
      teachingBed: null,
    });
    expect(save.nurseryUnlockedExtraIds).toEqual([]);
    expect(save.nurseryClaimedRewardIds).toEqual([]);
    expect(save.nurseryLastProcessedWorldStep).toBe(1);
  });
});

describe('reset save progress', () => {
  it('clears discoveries and visits while preserving player settings', () => {
    const save = createNewSaveState('seed-before-reset');
    save.biomeVisits.beach = 3;
    save.worldStep = 4;
    save.discoveredEntries['native-littleneck-shell'] = {
      entryId: 'native-littleneck-shell',
      discoveredAt: '2026-03-27T19:00:00.000Z',
      biomeIds: ['beach'],
    };
    save.lastBiomeId = 'forest';
    save.settings.fullscreen = true;
    save.settings.showInspectHints = false;

    resetSaveProgress(save);

    expect(save.worldSeed).not.toBe('seed-before-reset');
    expect(save.biomeVisits).toEqual({});
    expect(save.discoveredEntries).toEqual({});
    expect(save.sketchbookPages).toEqual({});
    expect(save.completedFieldRequestIds).toEqual([]);
    expect(save.fieldCredits).toBe(0);
    expect(save.claimedFieldCreditIds).toEqual([]);
    expect(save.purchasedUpgradeIds).toEqual([]);
    expect(save.nurseryResources).toEqual({
      litter: 0,
      'seed-stock': 0,
      cuttings: 0,
      compost: 0,
    });
    expect(save.nurseryProjects).toEqual({
      teachingBed: null,
    });
    expect(save.nurseryUnlockedExtraIds).toEqual([]);
    expect(save.nurseryClaimedRewardIds).toEqual([]);
    expect(save.nurseryLastProcessedWorldStep).toBe(1);
    expect(save.lastBiomeId).toBe('beach');
    expect(save.worldStateVersion).toBe(2);
    expect(save.worldStep).toBe(1);
    expect(save.settings).toEqual({
      fullscreen: true,
      showInspectHints: false,
      soundEnabled: true,
    });
  });

  it('appends a second biome sighting without creating a second journal entry', () => {
    const save = createNewSaveState('shared-sighting-seed');
    const entry = beachBiome.entries['beach-grass'];

    expect(recordDiscovery(save, entry, 'beach')).toBe(true);
    expect(recordDiscovery(save, entry, 'coastal-scrub')).toBe(false);

    expect(save.discoveredEntries['beach-grass']).toMatchObject({
      entryId: 'beach-grass',
      biomeIds: ['beach', 'coastal-scrub'],
    });
    expect(Object.keys(save.discoveredEntries)).toEqual(['beach-grass']);
  });

  it('advances the deterministic world step only when the player enters a different biome', () => {
    const save = createNewSaveState('world-step-seed');

    expect(save.worldStep).toBe(1);

    expect(incrementBiomeVisit(save, 'beach')).toBe(1);
    expect(save.worldStep).toBe(1);

    expect(incrementBiomeVisit(save, 'forest')).toBe(1);
    expect(save.worldStep).toBe(2);

    expect(incrementBiomeVisit(save, 'forest')).toBe(2);
    expect(save.worldStep).toBe(2);

    expect(incrementBiomeVisit(save, 'tundra')).toBe(1);
    expect(save.worldStep).toBe(3);
  });

  it('migrates persisted completed request ids safely', () => {
    const migrated = normalizeSaveState({
      worldSeed: 'legacy-seed',
      sketchbookPages: {
        beach: {
          slots: {
            'top-left': 'beach-grass',
            wrong: 'sand-verbena',
          },
        },
      },
      completedFieldRequestIds: ['forest-hidden-hollow', 2 as unknown as string, null as unknown as string],
      fieldCredits: 4,
      claimedFieldCreditIds: ['surveyed:forest', null as unknown as string],
      purchasedUpgradeIds: ['trail-stride', 3 as unknown as string],
      nurseryResources: {
        litter: 2,
        'seed-stock': 1,
        cuttings: 3,
        compost: 1,
      },
      nurseryProjects: {
        teachingBed: {
          projectId: 'sand-verbena-bed',
          stage: 'growing',
        },
      },
      nurseryUnlockedExtraIds: ['log-pile', 'wrong-id' as unknown as string],
      nurseryClaimedRewardIds: ['nursery:sand-verbena-support', 3 as unknown as string],
      nurseryLastProcessedWorldStep: 5,
    } as unknown as Parameters<typeof normalizeSaveState>[0]);

    expect(migrated.sketchbookPages).toEqual({
      beach: {
        slots: {
          'top-left': 'beach-grass',
        },
      },
    });
    expect(migrated.completedFieldRequestIds).toEqual(['forest-hidden-hollow']);
    expect(migrated.fieldCredits).toBe(4);
    expect(migrated.claimedFieldCreditIds).toEqual(['surveyed:forest']);
    expect(migrated.purchasedUpgradeIds).toEqual(['trail-stride']);
    expect(migrated.nurseryResources).toEqual({
      litter: 2,
      'seed-stock': 1,
      cuttings: 3,
      compost: 1,
    });
    expect(migrated.nurseryProjects).toEqual({
      teachingBed: {
        projectId: 'sand-verbena-bed',
        stage: 'growing',
      },
    });
    expect(migrated.nurseryUnlockedExtraIds).toEqual(['log-pile']);
    expect(migrated.nurseryClaimedRewardIds).toEqual(['nursery:sand-verbena-support']);
    expect(migrated.nurseryLastProcessedWorldStep).toBe(5);
  });

  it('normalizes Route v2 progress and outing support safely', () => {
    const migrated = normalizeSaveState({
      worldSeed: 'legacy-route-v2-seed',
      purchasedUpgradeIds: ['route-marker'],
      selectedOutingSupportId: 'route-marker',
      routeV2Progress: {
        requestId: 'forest-hidden-hollow',
        status: 'ready-to-synthesize',
        landmarkEntryIds: ['fallen-log-marker', 3 as unknown as string],
        evidenceSlots: [
          {
            slotId: 'cover',
            entryId: 'sword-fern',
          },
          {
            slotId: 2 as unknown as string,
            entryId: 'banana-slug',
          },
        ],
      },
    } as unknown as Parameters<typeof normalizeSaveState>[0]);

    expect(migrated.selectedOutingSupportId).toBe('route-marker');
    expect(migrated.routeV2Progress).toEqual({
      requestId: 'forest-hidden-hollow',
      status: 'ready-to-synthesize',
      landmarkEntryIds: ['fallen-log-marker'],
      evidenceSlots: [
        {
          slotId: 'cover',
          entryId: 'sword-fern',
        },
      ],
    });

    const fallback = normalizeSaveState({
      worldSeed: 'legacy-route-v2-fallback-seed',
      selectedOutingSupportId: 'route-marker',
      routeV2Progress: {
        requestId: 'forest-hidden-hollow',
        status: 'gathering',
        landmarkEntryIds: [],
        evidenceSlots: [],
      },
    } as unknown as Parameters<typeof normalizeSaveState>[0]);

    expect(fallback.selectedOutingSupportId).toBe('hand-lens');
    expect(fallback.routeV2Progress).toEqual({
      requestId: 'forest-hidden-hollow',
      status: 'gathering',
      landmarkEntryIds: [],
      evidenceSlots: [],
    });
  });

  it('cycles outing support only when route marker is owned', () => {
    const save = createNewSaveState('outing-support-cycle-seed');

    expect(cycleSelectedOutingSupportId(save)).toBe('hand-lens');
    expect(save.selectedOutingSupportId).toBe('hand-lens');

    save.purchasedUpgradeIds = ['route-marker'];
    expect(cycleSelectedOutingSupportId(save)).toBe('route-marker');
    expect(save.selectedOutingSupportId).toBe('route-marker');

    expect(cycleSelectedOutingSupportId(save)).toBe('hand-lens');
    expect(save.selectedOutingSupportId).toBe('hand-lens');

    save.selectedOutingSupportId = 'route-marker';
    save.purchasedUpgradeIds = [];
    expect(cycleSelectedOutingSupportId(save)).toBe('hand-lens');
    expect(save.selectedOutingSupportId).toBe('hand-lens');
  });
});
