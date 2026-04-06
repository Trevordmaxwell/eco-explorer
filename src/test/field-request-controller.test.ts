import { describe, expect, it } from 'vitest';

import { biomeRegistry } from '../content/biomes';
import { ecoWorldMap } from '../content/world-map';
import {
  getFieldRequestHintState,
  getInspectBubbleResourceNote,
  getHandLensNotebookFitForEntry,
  getOutingSupportNoticeText,
  prefersHandLensActiveEntry,
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
    expect(selection.supportBiasActive).toBe(true);
    expect(getFieldRequestHintState(controller, selection)).toMatchObject({
      label: 'NOTEBOOK J',
      title: 'Thaw Window',
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
    expect(selection.supportBiasActive).toBe(false);
    expect(getFieldRequestHintState(controller, selection)).toMatchObject({
      label: 'NOTEBOOK J',
      title: 'Thaw Window',
      variant: 'default',
    });
  });
});
