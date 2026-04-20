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
    const supportNoticeCases = [
      ['route-marker', 'Marks next map stop.'],
      ['place-tab', 'Keeps one place question.'],
      ['note-tabs', 'Keeps route aim visible.'],
      ['hand-lens', 'Highlights notebook clues.'],
    ] as const;

    for (const [supportId, expectedNotice] of supportNoticeCases) {
      const notice = getOutingSupportNoticeText(supportId);
      expect(notice).toBe(expectedNotice);
      expect(notice.trim().split(/\s+/).length).toBeLessThanOrEqual(5);
      expect(notice).not.toMatch(/notebook-fit|[a-z]+-[a-z]+/i);
    }
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

  it('marks the Low Fell bloom pocket as an active-clue retarget during Brief Bloom', () => {
    const completedRouteRequests = [
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
    ];
    const createLowFellProgress = () => ({
      requestId: 'treeline-low-fell',
      status: 'gathering' as const,
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'last-tree-shape', entryId: 'krummholz-spruce' },
        { slotId: 'low-wood', entryId: 'dwarf-birch' },
      ],
    });
    const inspectCandidates = [
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
        entityId: 'far-campion',
        entryId: 'moss-campion',
        x: 572,
        y: 100,
        w: 8,
        h: 8,
        removed: false,
      },
    ];

    const handLensSave = createNewSaveState('field-request-controller-brief-bloom-preference');
    handLensSave.selectedOutingSupportId = 'hand-lens';
    handLensSave.completedFieldRequestIds = completedRouteRequests.slice();
    handLensSave.worldStep = 4;
    handLensSave.biomeVisits.treeline = 2;
    handLensSave.routeV2Progress = createLowFellProgress();

    const handLensController = resolveFieldRequestController(biomeRegistry, ecoWorldMap, handLensSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'treeline',
      lastBiomeId: 'treeline',
      sceneZoneId: 'lichen-fell',
      scenePlayerX: 560,
      scenePlayerY: 104,
      hasFieldRequestNotice: false,
    });

    expect(handLensController.activeFieldRequest).toMatchObject({
      id: 'treeline-low-fell',
      title: 'Brief Bloom',
      progressLabel: '2/4 clues',
    });
    expect(getHandLensNotebookFitForEntry(handLensController, 'mountain-avens', 'lichen-fell')).toBe(
      'Notebook fit: fell bloom',
    );
    expect(getHandLensNotebookFitForEntry(handLensController, 'moss-campion', 'lichen-fell')).toBe(
      'Notebook fit: fell bloom',
    );
    expect(getInspectBubbleResourceNote(handLensController, 'mountain-avens', 'lichen-fell')).toBe(
      'Notebook fit: fell bloom',
    );
    expect(getInspectBubbleResourceNote(handLensController, 'moss-campion', 'lichen-fell')).toBe(
      'LENS CLUE: fell bloom',
    );
    expect(prefersHandLensActiveEntry(handLensController, 'mountain-avens', 'lichen-fell')).toBe(false);
    expect(prefersHandLensActiveEntry(handLensController, 'moss-campion', 'lichen-fell')).toBe(true);

    const handLensSelection = resolveInspectTargetSelection(
      handLensController,
      inspectCandidates,
      { x: 560, y: 104 },
      22,
      () => 'lichen-fell',
    );

    expect(handLensSelection.nearestInspectableEntityId).toBe('far-campion');
    expect(handLensSelection.nearestInspectable?.entryId).toBe('moss-campion');
    expect(handLensSelection.supportRetargetsInspect).toBe(true);
    expect(handLensSelection.supportPrefersActiveClue).toBe(true);
    expect(getFieldRequestHintState(handLensController, handLensSelection)).toMatchObject({
      label: 'NOTEBOOK J',
      title: 'Brief Bloom',
      variant: 'support-biased',
    });

    const noteTabsSave = createNewSaveState('field-request-controller-brief-bloom-note-tabs');
    noteTabsSave.selectedOutingSupportId = 'note-tabs';
    noteTabsSave.completedFieldRequestIds = completedRouteRequests.slice();
    noteTabsSave.worldStep = 4;
    noteTabsSave.biomeVisits.treeline = 2;
    noteTabsSave.routeV2Progress = createLowFellProgress();

    const noteTabsController = resolveFieldRequestController(biomeRegistry, ecoWorldMap, noteTabsSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'treeline',
      lastBiomeId: 'treeline',
      sceneZoneId: 'lichen-fell',
      scenePlayerX: 560,
      scenePlayerY: 104,
      hasFieldRequestNotice: false,
    });

    expect(noteTabsController.selectedSupportId).toBe('note-tabs');
    expect(noteTabsController.activeFieldRequest).toMatchObject({
      id: 'treeline-low-fell',
      title: 'Brief Bloom',
      progressLabel: '2/4 clues',
    });
    expect(getHandLensNotebookFitForEntry(noteTabsController, 'moss-campion', 'lichen-fell')).toBeNull();
    expect(prefersHandLensActiveEntry(noteTabsController, 'moss-campion', 'lichen-fell')).toBe(false);

    const noteTabsSelection = resolveInspectTargetSelection(
      noteTabsController,
      inspectCandidates,
      { x: 560, y: 104 },
      22,
      () => 'lichen-fell',
    );

    expect(noteTabsSelection.nearestInspectableEntityId).toBe('near-avens');
    expect(noteTabsSelection.nearestInspectable?.entryId).toBe('mountain-avens');
    expect(noteTabsSelection.supportRetargetsInspect).toBe(false);
    expect(noteTabsSelection.supportPrefersActiveClue).toBe(false);
    expect(getFieldRequestHintState(noteTabsController, noteTabsSelection)).toMatchObject({
      label: 'NOTEBOOK J',
      title: '2/4 clues',
      variant: 'support-biased',
    });
  });

  it('retargets Low Fell low rest to the corridor reindeer-lichen cue only for hand lens', () => {
    const completedRouteRequests = [
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
    ];
    const createLowFellLowRestProgress = () => ({
      requestId: 'treeline-low-fell',
      status: 'gathering' as const,
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'last-tree-shape', entryId: 'krummholz-spruce' },
        { slotId: 'low-wood', entryId: 'dwarf-birch' },
        { slotId: 'fell-bloom', entryId: 'mountain-avens' },
      ],
    });
    const inspectCandidates = [
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
        entityId: 'corridor-lichen',
        entryId: 'reindeer-lichen',
        x: 572,
        y: 100,
        w: 8,
        h: 8,
        removed: false,
      },
    ];
    const getObservedZoneId = (entity: (typeof inspectCandidates)[number]) =>
      entity.entryId === 'reindeer-lichen' ? 'center-blend' : 'lichen-fell';

    const handLensSave = createNewSaveState('field-request-controller-low-fell-corridor-retarget');
    handLensSave.selectedOutingSupportId = 'hand-lens';
    handLensSave.completedFieldRequestIds = completedRouteRequests.slice();
    handLensSave.routeV2Progress = createLowFellLowRestProgress();

    const handLensController = resolveFieldRequestController(biomeRegistry, ecoWorldMap, handLensSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'treeline',
      lastBiomeId: 'treeline',
      sceneZoneId: 'lichen-fell',
      scenePlayerX: 560,
      scenePlayerY: 104,
      hasFieldRequestNotice: false,
    });

    expect(handLensController.activeFieldRequest).toMatchObject({
      id: 'treeline-low-fell',
      title: 'Low Fell',
      progressLabel: '3/4 clues',
    });
    expect(getHandLensNotebookFitForEntry(handLensController, 'reindeer-lichen', 'center-blend')).toBe(
      'Notebook fit: low rest',
    );
    expect(getInspectBubbleResourceNote(handLensController, 'reindeer-lichen', 'center-blend')).toBe(
      'Notebook fit: low rest',
    );
    expect(prefersHandLensActiveEntry(handLensController, 'reindeer-lichen', 'center-blend')).toBe(false);

    const handLensSelection = resolveInspectTargetSelection(
      handLensController,
      inspectCandidates,
      { x: 560, y: 104 },
      22,
      getObservedZoneId,
    );

    expect(handLensSelection.nearestInspectableEntityId).toBe('corridor-lichen');
    expect(handLensSelection.nearestInspectable?.entryId).toBe('reindeer-lichen');
    expect(handLensSelection.supportRetargetsInspect).toBe(true);
    expect(handLensSelection.supportPrefersActiveClue).toBe(false);
    expect(getFieldRequestHintState(handLensController, handLensSelection)).toMatchObject({
      label: 'NOTEBOOK J',
      title: 'Low Fell',
      variant: 'support-biased',
    });

    const noteTabsSave = createNewSaveState('field-request-controller-low-fell-corridor-note-tabs');
    noteTabsSave.selectedOutingSupportId = 'note-tabs';
    noteTabsSave.completedFieldRequestIds = completedRouteRequests.slice();
    noteTabsSave.routeV2Progress = createLowFellLowRestProgress();

    const noteTabsController = resolveFieldRequestController(biomeRegistry, ecoWorldMap, noteTabsSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'treeline',
      lastBiomeId: 'treeline',
      sceneZoneId: 'lichen-fell',
      scenePlayerX: 560,
      scenePlayerY: 104,
      hasFieldRequestNotice: false,
    });

    expect(noteTabsController.selectedSupportId).toBe('note-tabs');
    expect(noteTabsController.activeFieldRequest).toMatchObject({
      id: 'treeline-low-fell',
      title: 'Low Fell',
      progressLabel: '3/4 clues',
    });
    expect(getHandLensNotebookFitForEntry(noteTabsController, 'reindeer-lichen', 'center-blend')).toBeNull();

    const noteTabsSelection = resolveInspectTargetSelection(
      noteTabsController,
      inspectCandidates,
      { x: 560, y: 104 },
      22,
      getObservedZoneId,
    );

    expect(noteTabsSelection.nearestInspectableEntityId).toBe('near-avens');
    expect(noteTabsSelection.nearestInspectable?.entryId).toBe('mountain-avens');
    expect(noteTabsSelection.supportRetargetsInspect).toBe(false);
    expect(noteTabsSelection.supportPrefersActiveClue).toBe(false);
    expect(getFieldRequestHintState(noteTabsController, noteTabsSelection)).toMatchObject({
      label: 'NOTEBOOK J',
      title: '3/4 clues',
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

  it('retargets the thaw-skirt wet-tuft shelf to bigelows-sedge during the active Thaw Window middle leg', () => {
    const handLensSave = createNewSaveState('field-request-controller-thaw-window-wet-tuft');
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
    handLensSave.routeV2Progress = {
      requestId: 'tundra-short-season',
      status: 'gathering',
      landmarkEntryIds: [],
      evidenceSlots: [{ slotId: 'first-bloom', entryId: 'purple-saxifrage' }],
    };

    const controller = resolveFieldRequestController(biomeRegistry, ecoWorldMap, handLensSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'tundra',
      lastBiomeId: 'tundra',
      sceneZoneId: 'thaw-skirt',
      scenePlayerX: 380,
      scenePlayerY: 100,
      hasFieldRequestNotice: false,
    });

    expect(getInspectBubbleResourceNote(controller, 'cottongrass', 'thaw-skirt')).toBe(
      'Notebook fit: wet tuft',
    );
    expect(getInspectBubbleResourceNote(controller, 'bigelows-sedge', 'thaw-skirt')).toBe(
      'LENS CLUE: wet tuft',
    );

    const selection = resolveInspectTargetSelection(
      controller,
      [
        {
          entityId: 'near-cottongrass',
          entryId: 'cottongrass',
          x: 376,
          y: 100,
          w: 8,
          h: 8,
          removed: false,
        },
        {
          entityId: 'far-sedge',
          entryId: 'bigelows-sedge',
          x: 390,
          y: 96,
          w: 8,
          h: 8,
          removed: false,
        },
      ],
      { x: 380, y: 100 },
      22,
      () => 'thaw-skirt',
    );

    expect(selection.nearestInspectableEntityId).toBe('far-sedge');
    expect(selection.nearestInspectable?.entryId).toBe('bigelows-sedge');
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

  it('retargets Open To Shelter to the back-dune bloom clue only for hand lens', () => {
    const completedForestRequests = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
    ];
    const inspectCandidates = [
      {
        entityId: 'near-beach-pea',
        entryId: 'beach-pea',
        x: 58,
        y: 100,
        w: 8,
        h: 8,
        removed: false,
      },
      {
        entityId: 'far-verbena',
        entryId: 'sand-verbena',
        x: 72,
        y: 100,
        w: 8,
        h: 8,
        removed: false,
      },
    ];

    const handLensSave = createNewSaveState('field-request-controller-open-to-shelter-retarget');
    handLensSave.selectedOutingSupportId = 'hand-lens';
    handLensSave.completedFieldRequestIds = completedForestRequests.slice();

    const handLensController = resolveFieldRequestController(biomeRegistry, ecoWorldMap, handLensSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'coastal-scrub',
      lastBiomeId: 'coastal-scrub',
      sceneZoneId: 'back-dune',
      scenePlayerX: 64,
      scenePlayerY: 104,
      hasFieldRequestNotice: false,
    });

    expect(getHandLensNotebookFitForEntry(handLensController, 'sand-verbena', 'back-dune')).toBe(
      'Notebook fit: open bloom',
    );
    expect(getInspectBubbleResourceNote(handLensController, 'sand-verbena', 'back-dune')).toBe(
      'Notebook fit: open bloom',
    );
    expect(prefersHandLensActiveEntry(handLensController, 'sand-verbena', 'back-dune')).toBe(false);

    const handLensSelection = resolveInspectTargetSelection(
      handLensController,
      inspectCandidates,
      { x: 64, y: 104 },
      20,
      () => 'back-dune',
    );

    expect(handLensSelection.nearestInspectableEntityId).toBe('far-verbena');
    expect(handLensSelection.nearestInspectable?.entryId).toBe('sand-verbena');
    expect(handLensSelection.supportRetargetsInspect).toBe(true);
    expect(handLensSelection.supportPrefersActiveClue).toBe(false);
    expect(getFieldRequestHintState(handLensController, handLensSelection)).toMatchObject({
      label: 'NOTEBOOK J',
      title: 'Open To Shelter',
      variant: 'support-biased',
    });

    const noteTabsSave = createNewSaveState('field-request-controller-open-to-shelter-note-tabs');
    noteTabsSave.selectedOutingSupportId = 'note-tabs';
    noteTabsSave.completedFieldRequestIds = completedForestRequests.slice();

    const noteTabsController = resolveFieldRequestController(biomeRegistry, ecoWorldMap, noteTabsSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'coastal-scrub',
      lastBiomeId: 'coastal-scrub',
      sceneZoneId: 'back-dune',
      scenePlayerX: 64,
      scenePlayerY: 104,
      hasFieldRequestNotice: false,
    });

    expect(noteTabsController.selectedSupportId).toBe('note-tabs');
    expect(getHandLensNotebookFitForEntry(noteTabsController, 'sand-verbena', 'back-dune')).toBeNull();

    const noteTabsSelection = resolveInspectTargetSelection(
      noteTabsController,
      inspectCandidates,
      { x: 64, y: 104 },
      20,
      () => 'back-dune',
    );

    expect(noteTabsSelection.nearestInspectableEntityId).toBe('near-beach-pea');
    expect(noteTabsSelection.nearestInspectable?.entryId).toBe('beach-pea');
    expect(noteTabsSelection.supportRetargetsInspect).toBe(false);
    expect(noteTabsSelection.supportPrefersActiveClue).toBe(false);
    expect(getFieldRequestHintState(noteTabsController, noteTabsSelection)).toMatchObject({
      label: 'NOTEBOOK J',
      title: '0/3 stages',
      variant: 'support-biased',
    });
  });

  it('retargets Moist Edge to the creek-bend edge carrier only for hand lens', () => {
    const completedRouteRequests = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
      'tundra-short-season',
      'tundra-survey-slice',
      'scrub-edge-pattern',
    ];
    const inspectCandidates = [
      {
        entityId: 'near-fir-cone',
        entryId: 'fir-cone',
        x: 58,
        y: 100,
        w: 8,
        h: 8,
        removed: false,
      },
      {
        entityId: 'far-salmonberry',
        entryId: 'salmonberry',
        x: 72,
        y: 100,
        w: 8,
        h: 8,
        removed: false,
      },
    ];

    const handLensSave = createNewSaveState('field-request-controller-moist-edge-retarget');
    handLensSave.selectedOutingSupportId = 'hand-lens';
    handLensSave.completedFieldRequestIds = completedRouteRequests.slice();
    handLensSave.worldStep = 6;
    handLensSave.biomeVisits.forest = 2;

    const handLensController = resolveFieldRequestController(biomeRegistry, ecoWorldMap, handLensSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'forest',
      lastBiomeId: 'forest',
      sceneZoneId: 'creek-bend',
      scenePlayerX: 64,
      scenePlayerY: 104,
      hasFieldRequestNotice: false,
    });

    expect(handLensController.activeFieldRequest).toMatchObject({
      id: 'forest-cool-edge',
      title: 'Moist Edge',
    });
    expect(getHandLensNotebookFitForEntry(handLensController, 'fir-cone', 'creek-bend')).toBeNull();
    expect(getHandLensNotebookFitForEntry(handLensController, 'salmonberry', 'creek-bend')).toBe(
      'Notebook fit: edge carrier',
    );
    expect(getInspectBubbleResourceNote(handLensController, 'salmonberry', 'creek-bend')).toBe(
      'Notebook fit: edge carrier',
    );
    expect(prefersHandLensActiveEntry(handLensController, 'salmonberry', 'creek-bend')).toBe(false);

    const handLensSelection = resolveInspectTargetSelection(
      handLensController,
      inspectCandidates,
      { x: 64, y: 104 },
      20,
      () => 'creek-bend',
    );

    expect(handLensSelection.nearestInspectableEntityId).toBe('far-salmonberry');
    expect(handLensSelection.nearestInspectable?.entryId).toBe('salmonberry');
    expect(handLensSelection.supportRetargetsInspect).toBe(true);
    expect(handLensSelection.supportPrefersActiveClue).toBe(false);
    expect(getFieldRequestHintState(handLensController, handLensSelection)).toMatchObject({
      label: 'NOTEBOOK J',
      title: 'Moist Edge',
      variant: 'support-biased',
    });

    const noteTabsSave = createNewSaveState('field-request-controller-moist-edge-note-tabs');
    noteTabsSave.selectedOutingSupportId = 'note-tabs';
    noteTabsSave.completedFieldRequestIds = completedRouteRequests.slice();
    noteTabsSave.worldStep = 6;
    noteTabsSave.biomeVisits.forest = 2;

    const noteTabsController = resolveFieldRequestController(biomeRegistry, ecoWorldMap, noteTabsSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'forest',
      lastBiomeId: 'forest',
      sceneZoneId: 'creek-bend',
      scenePlayerX: 64,
      scenePlayerY: 104,
      hasFieldRequestNotice: false,
    });

    expect(noteTabsController.selectedSupportId).toBe('note-tabs');
    expect(noteTabsController.activeFieldRequest).toMatchObject({
      id: 'forest-cool-edge',
      title: 'Moist Edge',
      progressLabel: '0/3 clues',
    });
    expect(getHandLensNotebookFitForEntry(noteTabsController, 'salmonberry', 'creek-bend')).toBeNull();

    const noteTabsSelection = resolveInspectTargetSelection(
      noteTabsController,
      inspectCandidates,
      { x: 64, y: 104 },
      20,
      () => 'creek-bend',
    );

    expect(noteTabsSelection.nearestInspectableEntityId).toBe('near-fir-cone');
    expect(noteTabsSelection.nearestInspectable?.entryId).toBe('fir-cone');
    expect(noteTabsSelection.supportRetargetsInspect).toBe(false);
    expect(noteTabsSelection.supportPrefersActiveClue).toBe(false);
    expect(getFieldRequestHintState(noteTabsController, noteTabsSelection)).toMatchObject({
      label: 'NOTEBOOK J',
      title: '0/3 clues',
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

    expect(controller.selectedSupportId).toBe('note-tabs');
    expect(getHandLensNotebookFitForEntry(controller, 'woolly-lousewort', 'thaw-skirt')).toBeNull();
    expect(getInspectBubbleResourceNote(controller, 'woolly-lousewort', 'thaw-skirt', 'Nearby clue')).toBe(
      'Nearby clue',
    );

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
      title: '0/3 clues',
      variant: 'support-biased',
    });
  });

  it('uses a compact place-tab chip on active Route v2 without retargeting inspectables', () => {
    const placeTabSave = createNewSaveState('field-request-controller-place-tab-chip');
    placeTabSave.selectedOutingSupportId = 'place-tab';
    placeTabSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
    ];
    placeTabSave.worldStep = 4;
    placeTabSave.biomeVisits.tundra = 2;

    const controller = resolveFieldRequestController(biomeRegistry, ecoWorldMap, placeTabSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'tundra',
      lastBiomeId: 'tundra',
      sceneZoneId: 'thaw-skirt',
      scenePlayerX: 349,
      scenePlayerY: 120,
      hasFieldRequestNotice: false,
    });

    expect(controller.selectedSupportId).toBe('place-tab');
    expect(controller.handLensContext).toBeNull();
    expect(getHandLensNotebookFitForEntry(controller, 'woolly-lousewort', 'thaw-skirt')).toBeNull();
    expect(getInspectBubbleResourceNote(controller, 'woolly-lousewort', 'thaw-skirt')).toBeNull();

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
      title: 'Place Question',
      variant: 'support-biased',
    });
  });

  it('keeps route-marker map-facing during active Route v2 without notebook-chip bias', () => {
    const routeMarkerSave = createNewSaveState('field-request-controller-route-marker-chip');
    routeMarkerSave.selectedOutingSupportId = 'route-marker';
    routeMarkerSave.purchasedUpgradeIds.push('route-marker');
    routeMarkerSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
    ];
    routeMarkerSave.worldStep = 4;
    routeMarkerSave.biomeVisits.tundra = 2;

    const controller = resolveFieldRequestController(biomeRegistry, ecoWorldMap, routeMarkerSave, {
      sceneMode: 'biome',
      overlayMode: 'playing',
      sceneBiomeId: 'tundra',
      lastBiomeId: 'tundra',
      sceneZoneId: 'thaw-skirt',
      scenePlayerX: 349,
      scenePlayerY: 120,
      hasFieldRequestNotice: false,
    });

    expect(controller.selectedSupportId).toBe('route-marker');
    expect(controller.handLensContext).toBeNull();
    expect(getHandLensNotebookFitForEntry(controller, 'woolly-lousewort', 'thaw-skirt')).toBeNull();
    expect(getInspectBubbleResourceNote(controller, 'woolly-lousewort', 'thaw-skirt', 'Nearby clue')).toBe(
      'Nearby clue',
    );

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
