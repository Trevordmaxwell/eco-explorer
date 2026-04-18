import { describe, expect, it } from 'vitest';

import { biomeRegistry } from '../content/biomes';
import { ecoWorldMap } from '../content/world-map';
import {
  getFieldRequestHintState,
  getInspectBubbleResourceNote,
  getHandLensNotebookFitForEntry,
  getOutingSupportNoticeText,
  prefersHandLensActiveEntry,
  resolveInspectTargetProjection,
  resolveInspectTargetSelection,
  resolveFieldRequestController,
} from '../engine/field-request-controller';
import { createNewSaveState } from '../engine/save';

describe('field request controller', () => {
  it('only exposes hand-lens notebook-fit checks when hand lens is selected', () => {
    const handLensSave = createNewSaveState('field-request-controller-hand-lens');
    const handLensController = resolveFieldRequestController(biomeRegistry, ecoWorldMap, handLensSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'beach',
      lastBiomeId: 'beach',
      sceneZoneId: 'dune-edge',
      scenePlayerX: 24,
      scenePlayerY: 48,
      hasFieldRequestNotice: false,
    });

    expect(handLensController.handLensContext).toBeTruthy();
    expect(getHandLensNotebookFitForEntry(handLensController, 'beach-grass', 'dune-edge')).toBe(
      'Notebook fit: dune grass',
    );

    const routeMarkerSave = createNewSaveState('field-request-controller-route-marker');
    routeMarkerSave.selectedOutingSupportId = 'route-marker';
    routeMarkerSave.purchasedUpgradeIds.push('route-marker');
    const routeMarkerController = resolveFieldRequestController(biomeRegistry, ecoWorldMap, routeMarkerSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'beach',
      lastBiomeId: 'beach',
      sceneZoneId: 'dune-edge',
      scenePlayerX: 24,
      scenePlayerY: 48,
      hasFieldRequestNotice: false,
    });

    expect(routeMarkerController.handLensContext).toBeNull();
    expect(getHandLensNotebookFitForEntry(routeMarkerController, 'beach-grass', 'dune-edge')).toBeNull();
  });

  it('returns the support notice copy from one helper seam', () => {
    expect(getOutingSupportNoticeText('route-marker')).toBe(
      'Route Marker will guide this outing on the world map.',
    );
    expect(getOutingSupportNoticeText('place-tab')).toBe(
      'Place Tab will keep one place-reading question on the season strip.',
    );
    expect(getOutingSupportNoticeText('note-tabs')).toBe(
      'Note Tabs will keep the notebook aim on the season strip.',
    );
    expect(getOutingSupportNoticeText('hand-lens')).toBe(
      'Hand Lens will tag notebook-fit clues in inspect bubbles.',
    );
  });

  it('prefers active process-only alternates for hand lens without widening other supports', () => {
    const handLensSave = createNewSaveState('field-request-controller-thaw-window-preference');
    handLensSave.selectedOutingSupportId = 'hand-lens';
    handLensSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
    ];
    handLensSave.worldStep = 4;
    handLensSave.biomeVisits.tundra = 2;

    const handLensController = resolveFieldRequestController(biomeRegistry, ecoWorldMap, handLensSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'tundra',
      lastBiomeId: 'tundra',
      sceneZoneId: 'thaw-skirt',
      scenePlayerX: 333,
      scenePlayerY: 100,
      hasFieldRequestNotice: false,
    });

    expect(getHandLensNotebookFitForEntry(handLensController, 'purple-saxifrage', 'thaw-skirt')).toBe(
      'Notebook fit: first bloom',
    );
    expect(getHandLensNotebookFitForEntry(handLensController, 'woolly-lousewort', 'thaw-skirt')).toBe(
      'Notebook fit: first bloom',
    );
    expect(prefersHandLensActiveEntry(handLensController, 'purple-saxifrage', 'thaw-skirt')).toBe(false);
    expect(prefersHandLensActiveEntry(handLensController, 'woolly-lousewort', 'thaw-skirt')).toBe(true);

    const noteTabsSave = createNewSaveState('field-request-controller-thaw-window-note-tabs');
    noteTabsSave.selectedOutingSupportId = 'note-tabs';
    noteTabsSave.completedFieldRequestIds = handLensSave.completedFieldRequestIds.slice();
    noteTabsSave.worldStep = 4;
    noteTabsSave.biomeVisits.tundra = 2;
    const noteTabsController = resolveFieldRequestController(biomeRegistry, ecoWorldMap, noteTabsSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'tundra',
      lastBiomeId: 'tundra',
      sceneZoneId: 'thaw-skirt',
      scenePlayerX: 333,
      scenePlayerY: 100,
      hasFieldRequestNotice: false,
    });

    expect(prefersHandLensActiveEntry(noteTabsController, 'woolly-lousewort', 'thaw-skirt')).toBe(false);
  });

  it('reuses the active process-only hand-lens preference seam on Held Sand without widening other supports', () => {
    const handLensSave = createNewSaveState('field-request-controller-held-sand-preference');
    handLensSave.selectedOutingSupportId = 'hand-lens';
    handLensSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
      'tundra-short-season',
      'tundra-survey-slice',
    ];
    handLensSave.worldStep = 6;
    handLensSave.biomeVisits['coastal-scrub'] = 2;

    const handLensController = resolveFieldRequestController(biomeRegistry, ecoWorldMap, handLensSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'coastal-scrub',
      lastBiomeId: 'coastal-scrub',
      sceneZoneId: 'back-dune',
      scenePlayerX: 61,
      scenePlayerY: 100,
      hasFieldRequestNotice: false,
    });

    expect(getHandLensNotebookFitForEntry(handLensController, 'dune-lupine', 'back-dune')).toBe(
      'Notebook fit: open pioneer',
    );
    expect(getHandLensNotebookFitForEntry(handLensController, 'beach-grass', 'back-dune')).toBe(
      'Notebook fit: open pioneer',
    );
    expect(prefersHandLensActiveEntry(handLensController, 'dune-lupine', 'back-dune')).toBe(false);
    expect(prefersHandLensActiveEntry(handLensController, 'beach-grass', 'back-dune')).toBe(true);

    const noteTabsSave = createNewSaveState('field-request-controller-held-sand-note-tabs');
    noteTabsSave.selectedOutingSupportId = 'note-tabs';
    noteTabsSave.completedFieldRequestIds = handLensSave.completedFieldRequestIds.slice();
    noteTabsSave.worldStep = 6;
    noteTabsSave.biomeVisits['coastal-scrub'] = 2;
    const noteTabsController = resolveFieldRequestController(biomeRegistry, ecoWorldMap, noteTabsSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'coastal-scrub',
      lastBiomeId: 'coastal-scrub',
      sceneZoneId: 'back-dune',
      scenePlayerX: 61,
      scenePlayerY: 100,
      hasFieldRequestNotice: false,
    });

    expect(prefersHandLensActiveEntry(noteTabsController, 'beach-grass', 'back-dune')).toBe(false);
  });

  it('marks the High Pass rime shelf as an active-clue retarget during Rimed Pass', () => {
    const handLensSave = createNewSaveState('field-request-controller-rimed-pass-preference');
    handLensSave.selectedOutingSupportId = 'hand-lens';
    handLensSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
      'tundra-short-season',
      'tundra-survey-slice',
      'scrub-edge-pattern',
      'forest-cool-edge',
      'treeline-low-fell',
      'forest-expedition-upper-run',
      'forest-season-threads',
    ];
    handLensSave.worldStep = 6;
    handLensSave.biomeVisits.treeline = 2;
    handLensSave.routeV2Progress = {
      requestId: 'treeline-high-pass',
      status: 'gathering',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'stone-lift', entryId: 'frost-heave-boulder' },
        { slotId: 'lee-watch', entryId: 'hoary-marmot' },
      ],
    };

    const controller = resolveFieldRequestController(biomeRegistry, ecoWorldMap, handLensSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'treeline',
      lastBiomeId: 'treeline',
      sceneZoneId: 'dwarf-shrub',
      scenePlayerX: 465,
      scenePlayerY: 88,
      hasFieldRequestNotice: false,
    });

    expect(getInspectBubbleResourceNote(controller, 'moss-campion', 'dwarf-shrub')).toBe(
      'Notebook fit: rime mark',
    );
    expect(getInspectBubbleResourceNote(controller, 'reindeer-lichen', 'dwarf-shrub')).toBe(
      'LENS CLUE: rime mark',
    );

    const selection = resolveInspectTargetSelection(
      controller,
      [
        {
          entityId: 'near-campion',
          entryId: 'moss-campion',
          x: 460,
          y: 84,
          w: 8,
          h: 8,
          removed: false,
        },
        {
          entityId: 'far-lichen',
          entryId: 'reindeer-lichen',
          x: 476,
          y: 84,
          w: 8,
          h: 8,
          removed: false,
        },
      ],
      { x: 465, y: 89 },
      24,
      () => 'dwarf-shrub',
    );

    expect(selection.nearestInspectableEntityId).toBe('far-lichen');
    expect(selection.nearestInspectable?.entryId).toBe('reindeer-lichen');
    expect(selection.supportRetargetsInspect).toBe(true);
    expect(selection.supportPrefersActiveClue).toBe(true);
    expect(getFieldRequestHintState(controller, selection)).toMatchObject({
      label: 'NOTEBOOK J',
      title: 'Rimed Pass',
      variant: 'support-biased',
    });
  });

  it('formats one stronger inspect-bubble cue only for the active hand-lens winner', () => {
    const handLensSave = createNewSaveState('field-request-controller-resource-note');
    handLensSave.selectedOutingSupportId = 'hand-lens';
    handLensSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
    ];
    handLensSave.worldStep = 4;
    handLensSave.biomeVisits.tundra = 2;

    const controller = resolveFieldRequestController(biomeRegistry, ecoWorldMap, handLensSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'tundra',
      lastBiomeId: 'tundra',
      sceneZoneId: 'thaw-skirt',
      scenePlayerX: 333,
      scenePlayerY: 100,
      hasFieldRequestNotice: false,
    });

    expect(getInspectBubbleResourceNote(controller, 'purple-saxifrage', 'thaw-skirt')).toBe(
      'Notebook fit: first bloom',
    );
    expect(getInspectBubbleResourceNote(controller, 'woolly-lousewort', 'thaw-skirt')).toBe(
      'LENS CLUE: first bloom',
    );
  });

  it('falls back to non-support notes when no hand-lens notebook fit exists', () => {
    const routeMarkerSave = createNewSaveState('field-request-controller-resource-note-fallback');
    routeMarkerSave.selectedOutingSupportId = 'route-marker';
    routeMarkerSave.purchasedUpgradeIds.push('route-marker');

    const controller = resolveFieldRequestController(biomeRegistry, ecoWorldMap, routeMarkerSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'beach',
      lastBiomeId: 'beach',
      sceneZoneId: 'dune-edge',
      scenePlayerX: 24,
      scenePlayerY: 48,
      hasFieldRequestNotice: false,
    });

    expect(getInspectBubbleResourceNote(controller, 'beach-grass', 'dune-edge', 'Nursery supply')).toBe(
      'Nursery supply',
    );
    expect(getInspectBubbleResourceNote(controller, 'beach-grass', 'dune-edge')).toBeNull();
  });

  it('resolves one inspect-target selection result that prefers the active hand-lens route entry', () => {
    const handLensSave = createNewSaveState('field-request-controller-target-selection');
    handLensSave.selectedOutingSupportId = 'hand-lens';
    handLensSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
    ];
    handLensSave.worldStep = 4;
    handLensSave.biomeVisits.tundra = 2;

    const controller = resolveFieldRequestController(biomeRegistry, ecoWorldMap, handLensSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'tundra',
      lastBiomeId: 'tundra',
      sceneZoneId: 'thaw-skirt',
      scenePlayerX: 349,
      scenePlayerY: 120,
      hasFieldRequestNotice: false,
    });

    const selection = resolveInspectTargetSelection(
      controller,
      [
        {
          entityId: 'near-sedge',
          entryId: 'bigelows-sedge',
          x: 344,
          y: 120,
          w: 8,
          h: 8,
          removed: false,
        },
        {
          entityId: 'far-lousewort',
          entryId: 'woolly-lousewort',
          x: 360,
          y: 120,
          w: 8,
          h: 8,
          removed: false,
        },
      ],
      { x: 354, y: 125 },
      22,
      () => 'thaw-skirt',
    );

    expect(selection.nearestInspectableEntityId).toBe('far-lousewort');
    expect(selection.nearestInspectable?.entryId).toBe('woolly-lousewort');
    expect(selection.supportRetargetsInspect).toBe(true);
    expect(selection.supportPrefersActiveClue).toBe(true);
    expect(getFieldRequestHintState(controller, selection)).toMatchObject({
      label: 'NOTEBOOK J',
      title: 'Thaw Window',
      variant: 'support-biased',
    });
  });

  it('marks an ordinary Shore Shelter retarget as support-readable without treating it as an active-clue alternate', () => {
    const handLensSave = createNewSaveState('field-request-controller-shore-shelter-retarget');
    handLensSave.selectedOutingSupportId = 'hand-lens';
    handLensSave.routeV2Progress = {
      requestId: 'beach-shore-shelter',
      status: 'gathering',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'dune-grass', entryId: 'beach-grass' },
        { slotId: 'lee-cover', entryId: 'driftwood-log' },
      ],
    };

    const controller = resolveFieldRequestController(biomeRegistry, ecoWorldMap, handLensSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'beach',
      lastBiomeId: 'beach',
      sceneZoneId: 'tide-line',
      scenePlayerX: 504,
      scenePlayerY: 100,
      hasFieldRequestNotice: false,
    });

    const selection = resolveInspectTargetSelection(
      controller,
      [
        {
          entityId: 'near-sand-crab',
          entryId: 'pacific-sand-crab',
          x: 512,
          y: 100,
          w: 8,
          h: 8,
          removed: false,
        },
        {
          entityId: 'far-wrack',
          entryId: 'bull-kelp-wrack',
          x: 486,
          y: 100,
          w: 8,
          h: 8,
          removed: false,
        },
      ],
      { x: 509, y: 105 },
      28,
      () => 'tide-line',
    );

    expect(selection.nearestInspectableEntityId).toBe('far-wrack');
    expect(selection.nearestInspectable?.entryId).toBe('bull-kelp-wrack');
    expect(selection.supportRetargetsInspect).toBe(true);
    expect(selection.supportPrefersActiveClue).toBe(false);
    expect(getFieldRequestHintState(controller, selection)).toMatchObject({
      label: 'NOTEBOOK J',
      title: 'Shore Shelter',
      variant: 'support-biased',
    });
  });

  it('marks an ordinary Moisture Holders retarget as support-readable without treating it as an active-clue alternate', () => {
    const handLensSave = createNewSaveState('field-request-controller-moisture-holders-retarget');
    handLensSave.selectedOutingSupportId = 'hand-lens';
    handLensSave.completedFieldRequestIds = ['forest-hidden-hollow'];

    const controller = resolveFieldRequestController(biomeRegistry, ecoWorldMap, handLensSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'forest',
      lastBiomeId: 'forest',
      sceneZoneId: 'root-hollow',
      scenePlayerX: 392,
      scenePlayerY: 96,
      hasFieldRequestNotice: false,
    });

    const selection = resolveInspectTargetSelection(
      controller,
      [
        {
          entityId: 'near-lungwort',
          entryId: 'tree-lungwort',
          x: 384,
          y: 100,
          w: 8,
          h: 8,
          removed: false,
        },
        {
          entityId: 'far-licorice',
          entryId: 'licorice-fern',
          x: 410,
          y: 76,
          w: 8,
          h: 8,
          removed: false,
        },
      ],
      { x: 397, y: 101 },
      32,
      () => 'root-hollow',
    );

    expect(selection.nearestInspectableEntityId).toBe('far-licorice');
    expect(selection.nearestInspectable?.entryId).toBe('licorice-fern');
    expect(selection.supportRetargetsInspect).toBe(true);
    expect(selection.supportPrefersActiveClue).toBe(false);
    expect(getFieldRequestHintState(controller, selection)).toMatchObject({
      label: 'NOTEBOOK J',
      title: 'Moisture Holders',
      variant: 'support-biased',
    });
  });

  it('marks an ordinary High Pass retarget as support-readable without treating it as an active-clue alternate', () => {
    const handLensSave = createNewSaveState('field-request-controller-high-pass-retarget');
    handLensSave.selectedOutingSupportId = 'hand-lens';
    handLensSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
      'tundra-short-season',
      'tundra-survey-slice',
      'scrub-edge-pattern',
      'forest-cool-edge',
      'treeline-low-fell',
      'forest-expedition-upper-run',
      'forest-season-threads',
    ];
    handLensSave.routeV2Progress = {
      requestId: 'treeline-high-pass',
      status: 'gathering',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'stone-lift', entryId: 'frost-heave-boulder' },
        { slotId: 'lee-watch', entryId: 'hoary-marmot' },
        { slotId: 'rime-mark', entryId: 'moss-campion' },
      ],
    };

    const controller = resolveFieldRequestController(biomeRegistry, ecoWorldMap, handLensSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'treeline',
      lastBiomeId: 'treeline',
      sceneZoneId: 'lichen-fell',
      scenePlayerX: 560,
      scenePlayerY: 96,
      hasFieldRequestNotice: false,
    });

    const selection = resolveInspectTargetSelection(
      controller,
      [
        {
          entityId: 'near-avens',
          entryId: 'mountain-avens',
          x: 556,
          y: 100,
          w: 8,
          h: 8,
          removed: false,
        },
        {
          entityId: 'far-talus',
          entryId: 'talus-cushion-pocket',
          x: 572,
          y: 102,
          w: 8,
          h: 8,
          removed: false,
        },
      ],
      { x: 561, y: 104 },
      22,
      () => 'lichen-fell',
    );

    expect(selection.nearestInspectableEntityId).toBe('far-talus');
    expect(selection.nearestInspectable?.entryId).toBe('talus-cushion-pocket');
    expect(selection.supportRetargetsInspect).toBe(true);
    expect(selection.supportPrefersActiveClue).toBe(false);
    expect(getFieldRequestHintState(controller, selection)).toMatchObject({
      label: 'NOTEBOOK J',
      title: 'High Pass',
      variant: 'support-biased',
    });
  });

  it('falls back to the physically nearest inspectable when support is not hand lens', () => {
    const noteTabsSave = createNewSaveState('field-request-controller-target-selection-note-tabs');
    noteTabsSave.selectedOutingSupportId = 'note-tabs';
    noteTabsSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
    ];
    noteTabsSave.worldStep = 4;
    noteTabsSave.biomeVisits.tundra = 2;

    const controller = resolveFieldRequestController(biomeRegistry, ecoWorldMap, noteTabsSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'tundra',
      lastBiomeId: 'tundra',
      sceneZoneId: 'thaw-skirt',
      scenePlayerX: 349,
      scenePlayerY: 120,
      hasFieldRequestNotice: false,
    });

    const selection = resolveInspectTargetSelection(
      controller,
      [
        {
          entityId: 'near-sedge',
          entryId: 'bigelows-sedge',
          x: 344,
          y: 120,
          w: 8,
          h: 8,
          removed: false,
        },
        {
          entityId: 'far-lousewort',
          entryId: 'woolly-lousewort',
          x: 360,
          y: 120,
          w: 8,
          h: 8,
          removed: false,
        },
      ],
      { x: 354, y: 125 },
      22,
      () => 'thaw-skirt',
    );

    expect(selection.nearestInspectableEntityId).toBe('near-sedge');
    expect(selection.nearestInspectable?.entryId).toBe('bigelows-sedge');
    expect(selection.supportRetargetsInspect).toBe(false);
    expect(selection.supportPrefersActiveClue).toBe(false);
    expect(getFieldRequestHintState(controller, selection)).toMatchObject({
      label: 'NOTEBOOK J',
      title: 'Thaw Window',
      variant: 'default',
    });
  });

  it('resolves one inspect-target projection that keeps hint state and debug targeting together', () => {
    const handLensSave = createNewSaveState('field-request-controller-target-projection');
    handLensSave.selectedOutingSupportId = 'hand-lens';
    handLensSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
    ];
    handLensSave.worldStep = 4;
    handLensSave.biomeVisits.tundra = 2;

    const controller = resolveFieldRequestController(biomeRegistry, ecoWorldMap, handLensSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'tundra',
      lastBiomeId: 'tundra',
      sceneZoneId: 'thaw-skirt',
      scenePlayerX: 349,
      scenePlayerY: 120,
      hasFieldRequestNotice: false,
    });

    const projection = resolveInspectTargetProjection(
      controller,
      [
        {
          entityId: 'near-sedge',
          entryId: 'bigelows-sedge',
          x: 344,
          y: 120,
          w: 8,
          h: 8,
          removed: false,
        },
        {
          entityId: 'far-lousewort',
          entryId: 'woolly-lousewort',
          x: 360,
          y: 120,
          w: 8,
          h: 8,
          removed: false,
        },
      ],
      { x: 354, y: 125 },
      22,
      () => 'thaw-skirt',
    );

    expect(projection.nearestInspectableEntityId).toBe('far-lousewort');
    expect(projection.inspectTargetSelection?.supportRetargetsInspect).toBe(true);
    expect(projection.inspectTargetSelection?.supportPrefersActiveClue).toBe(true);
    expect(projection.fieldRequestHint).toMatchObject({
      label: 'NOTEBOOK J',
      title: 'Thaw Window',
      variant: 'support-biased',
    });
  });
});
