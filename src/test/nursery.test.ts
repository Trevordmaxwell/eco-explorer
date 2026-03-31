import { describe, expect, it } from 'vitest';

import { beachBiome } from '../content/biomes/beach';
import { coastalScrubBiome } from '../content/biomes/coastal-scrub';
import { treelineBiome } from '../content/biomes/treeline';
import {
  getNurseryProjectDefinitions,
  getSelectedNurseryProjectId,
  resolveNurseryStateView,
  startNurseryProject,
  syncNurseryState,
  tryClaimNurseryGathering,
} from '../engine/nursery';
import { createNewSaveState, recordDiscovery } from '../engine/save';

describe('nursery gathering', () => {
  it('keeps the first nursery project pack small, route-aligned, and propagation-safe', () => {
    const definitions = getNurseryProjectDefinitions();

    expect(definitions.map((definition) => definition.entryId)).toEqual([
      'sand-verbena',
      'dune-lupine',
      'mountain-avens',
      'beach-strawberry',
      'salmonberry',
      'crowberry',
    ]);
    for (const definition of definitions) {
      expect(definition.sourceEntryIds).toEqual([definition.entryId]);
      expect(definition.growthStages).toEqual(['stocked', 'rooting', 'growing', 'mature']);
      expect(definition.routeTags.length).toBeGreaterThanOrEqual(1);
      expect(definition.sourceModes.length).toBe(1);
    }
  });

  it('only awards safe gathering after the right route gate and only once per entity', () => {
    const save = createNewSaveState('nursery-gathering-seed');
    const claimed = new Set<string>();

    const gatedCutting = tryClaimNurseryGathering(
      save,
      coastalScrubBiome.entries['sand-verbena'],
      'sand-verbena-1',
      claimed,
    );
    expect(gatedCutting).toBeNull();

    save.completedFieldRequestIds = ['coastal-shelter-shift'];
    const firstCutting = tryClaimNurseryGathering(
      save,
      coastalScrubBiome.entries['sand-verbena'],
      'sand-verbena-1',
      claimed,
    );
    expect(firstCutting).toEqual({
      note: '+1 cuttings',
    });
    expect(save.nurseryResources.cuttings).toBe(1);

    const repeatedCutting = tryClaimNurseryGathering(
      save,
      coastalScrubBiome.entries['sand-verbena'],
      'sand-verbena-1',
      claimed,
    );
    expect(repeatedCutting).toBeNull();

    const wrackGather = tryClaimNurseryGathering(
      save,
      beachBiome.entries['bull-kelp-wrack'],
      'wrack-1',
      claimed,
    );
    expect(wrackGather).toEqual({
      note: '+1 litter',
    });
    expect(save.nurseryResources.litter).toBe(1);
  });
});

describe('nursery growth and rewards', () => {
  it('advances projects between world steps, auto-composts litter, and unlocks the utility reward', () => {
    const save = createNewSaveState('nursery-growth-seed');
    recordDiscovery(save, treelineBiome.entries.crowberry, 'treeline');
    save.completedFieldRequestIds = ['tundra-short-season'];
    save.nurseryResources['seed-stock'] = 1;
    save.nurseryResources.litter = 3;

    const selectedProjectId = getSelectedNurseryProjectId(save, null);
    expect(selectedProjectId).toBe('crowberry-bed');
    expect(startNurseryProject(save, 'crowberry-bed')).toBe(true);
    expect(save.nurseryResources['seed-stock']).toBe(0);
    expect(save.nurseryProjects.teachingBed).toMatchObject({
      projectId: 'crowberry-bed',
      stage: 'stocked',
    });

    save.worldStep = 4;
    expect(syncNurseryState(save)).toBe(true);
    expect(save.nurseryProjects.teachingBed).toMatchObject({
      projectId: 'crowberry-bed',
      stage: 'mature',
    });
    expect(save.nurseryResources.litter).toBe(0);
    expect(save.nurseryResources.compost).toBe(0);
    expect(save.nurseryClaimedRewardIds).toContain('nursery:crowberry-utility');

    save.nurseryResources.litter = 2;
    save.worldStep = 5;
    expect(syncNurseryState(save)).toBe(true);
    expect(save.nurseryResources.litter).toBe(0);
    expect(save.nurseryResources.compost).toBe(2);
  });

  it('surfaces route support and habitat extras once mature nursery rewards are claimed', () => {
    const save = createNewSaveState('nursery-route-support-seed');
    save.nurseryClaimedRewardIds = [
      'nursery:sand-verbena-support',
      'nursery:dune-lupine-support',
      'nursery:salmonberry-support',
    ];

    syncNurseryState(save);

    const view = resolveNurseryStateView(save, { routeId: 'coastal-shelter-line', activeBeatId: 'coastal-comparison' }, null);
    expect(view.routeSupportHint).toBe(
      'Low yellow blooms usually hold where the dune still feels open and dry.',
    );
    expect(view.extras.filter((extra) => extra.unlocked).map((extra) => extra.id)).toEqual([
      'log-pile',
      'pollinator-patch',
    ]);
  });

  it('uses the active edge-route beat to pick the nursery support hint', () => {
    const save = createNewSaveState('nursery-edge-route-support-seed');
    save.nurseryClaimedRewardIds = [
      'nursery:dune-lupine-support',
      'nursery:mountain-avens-support',
      'nursery:salmonberry-support',
    ];

    syncNurseryState(save);

    const forestBeatView = resolveNurseryStateView(
      save,
      { routeId: 'edge-pattern-line', activeBeatId: 'forest-cool-edge' },
      null,
    );
    expect(forestBeatView.routeSupportHint).toBe(
      'Dense berry thickets often mark the cooler, wetter side of a transition.',
    );

    const treelineBeatView = resolveNurseryStateView(
      save,
      { routeId: 'edge-pattern-line', activeBeatId: 'treeline-low-fell' },
      null,
    );
    expect(treelineBeatView.routeSupportHint).toBe(
      'Brief bright bloom often holds where the ground stays open but low.',
    );
  });

  it('keeps the salmonberry clue alive once the route is logged and the season moves into root hollow', () => {
    const save = createNewSaveState('nursery-capstone-support-seed');
    save.nurseryClaimedRewardIds = ['nursery:salmonberry-support'];
    save.completedFieldRequestIds = ['coastal-edge-moisture', 'tundra-survey-slice', 'treeline-low-fell'];

    syncNurseryState(save);

    const expeditionReadyView = resolveNurseryStateView(
      save,
      { routeId: 'edge-pattern-line', activeBeatId: null },
      null,
    );
    expect(expeditionReadyView.routeSupportHint).toBe(
      'Salmonberry still marks the cooler forest return near Root Hollow.',
    );

    save.completedFieldRequestIds = [...save.completedFieldRequestIds, 'forest-expedition-upper-run'];
    const capstoneView = resolveNurseryStateView(
      save,
      { routeId: 'edge-pattern-line', activeBeatId: null },
      null,
    );
    expect(capstoneView.routeSupportHint).toBe(
      'Salmonberry still marks the cooler forest return tying the season together.',
    );
  });
});
