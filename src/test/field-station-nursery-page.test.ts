import { describe, expect, it } from 'vitest';

import { coastalScrubBiome } from '../content/biomes/coastal-scrub';
import { treelineBiome } from '../content/biomes/treeline';
import {
  resolveActiveBedBodyCopy,
  resolveFieldStationNurseryPageLayout,
  resolveMatureBedFooterCopy,
  resolveReadyBedCopy,
} from '../engine/field-station-nursery-page';
import { resolveNurseryStateView } from '../engine/nursery';
import { createNewSaveState, recordDiscovery } from '../engine/save';
import { makeRect } from '../engine/ui-layout';

const NURSERY_PAGE_RECT = makeRect(0, 0, 184, 98);

describe('field-station nursery page layout', () => {
  it('treats active-growth clue states as the tallest teaching-bed layout', () => {
    const save = createNewSaveState('nursery-layout-active-growth');
    save.nurseryProjects.teachingBed = {
      projectId: 'sand-verbena-bed',
      stage: 'stocked',
    };
    save.nurseryClaimedRewardIds = ['nursery:salmonberry-support'];

    const nursery = resolveNurseryStateView(
      save,
      { routeId: 'edge-pattern-line', activeBeatId: 'forest-cool-edge' },
      null,
      'compost',
    );
    const layout = resolveFieldStationNurseryPageLayout(NURSERY_PAGE_RECT, nursery);

    expect(layout).toMatchObject({
      kind: 'active-growth',
      showRouteSupportHint: true,
      showHomePlaceStrip: true,
    });
    expect(layout.benchRect.h).toBe(24);
    expect(layout.compostRect.h).toBe(12);
    expect(layout.bedRect.h).toBe(56);
    expect(layout.bedRect.h).toBeGreaterThan(layout.benchRect.h);
  });

  it('keeps mature beds in the mature layout family and hides the route clue band', () => {
    const save = createNewSaveState('nursery-layout-mature');
    save.nurseryProjects.teachingBed = {
      projectId: 'crowberry-bed',
      stage: 'mature',
    };
    save.nurseryClaimedRewardIds = ['nursery:crowberry-utility'];

    const nursery = resolveNurseryStateView(
      save,
      { routeId: 'treeline-shelter-line', activeBeatId: 'tundra-short-season' },
      null,
      'bed',
    );
    const layout = resolveFieldStationNurseryPageLayout(NURSERY_PAGE_RECT, nursery);

    expect(layout).toMatchObject({
      kind: 'mature',
      showRouteSupportHint: false,
      showHomePlaceStrip: true,
    });
    expect(layout.benchRect.h).toBe(24);
    expect(layout.compostRect.h).toBe(12);
    expect(layout.bedRect.h).toBe(56);
  });

  it('uses the authored summary for affordable ready beds instead of the old generic CTA', () => {
    const save = createNewSaveState('nursery-ready-copy');
    recordDiscovery(save, coastalScrubBiome.entries['sand-verbena'], 'coastal-scrub');
    save.completedFieldRequestIds = ['coastal-shelter-shift'];
    save.nurseryResources.cuttings = 1;

    const nursery = resolveNurseryStateView(
      save,
      { routeId: 'coastal-shelter-line', activeBeatId: 'station-return' },
      null,
      'bed',
    );

    expect(resolveReadyBedCopy(nursery)).toBe('Low coastal bloom for the sunnier dune side.');
  });

  it('uses the updated Open To Shelter unlock wording for under-supplied sand verbena beds', () => {
    const save = createNewSaveState('nursery-sand-verbena-unlock-copy');
    recordDiscovery(save, coastalScrubBiome.entries['sand-verbena'], 'coastal-scrub');
    save.completedFieldRequestIds = ['coastal-shelter-shift'];

    const nursery = resolveNurseryStateView(
      save,
      { routeId: 'coastal-shelter-line', activeBeatId: 'station-return' },
      null,
      'bed',
    );

    expect(resolveReadyBedCopy(nursery)).toBe(
      'Log Open To Shelter before taking cuttings for this bed.',
    );
  });

  it('uses the updated Stone Shelter unlock wording for under-supplied mountain avens beds', () => {
    const save = createNewSaveState('nursery-mountain-avens-unlock-copy');
    recordDiscovery(save, treelineBiome.entries['mountain-avens'], 'treeline');
    save.completedFieldRequestIds = ['treeline-stone-shelter'];

    const nursery = resolveNurseryStateView(
      save,
      { routeId: 'treeline-shelter-line', activeBeatId: 'tundra-short-season' },
      'mountain-avens-bed',
      'bed',
    );

    expect(resolveReadyBedCopy(nursery)).toBe(
      'Log Stone Shelter before carrying mountain avens into the nursery.',
    );
  });

  it('uses the authored mature body and memory footer on the live nursery page seam', () => {
    const save = createNewSaveState('nursery-mature-copy');
    save.nurseryProjects.teachingBed = {
      projectId: 'salmonberry-bed',
      stage: 'mature',
    };
    save.nurseryClaimedRewardIds = ['nursery:salmonberry-support'];

    const nursery = resolveNurseryStateView(
      save,
      { routeId: 'edge-pattern-line', activeBeatId: 'forest-cool-edge' },
      null,
      'bed',
    );

    expect(resolveActiveBedBodyCopy(nursery)).toBe('The bed now carries a calm wet-edge thicket.');
    expect(resolveMatureBedFooterCopy(nursery)).toBe('Cool wet edge tucked under taller cover.');
  });
});
