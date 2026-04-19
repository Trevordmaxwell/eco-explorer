import { spriteSources } from '../assets';
import { biomeRegistry } from '../content/biomes';
import { ecoWorldMap, type CorridorDoor, type DoorAnchor } from '../content/world-map';
import {
  createDoorTransitionPlan,
  sampleDoorTransition,
  type DoorTransitionPlan,
  type DoorTransitionPhaseId,
  type DoorTransitionSnapshot,
} from './door-transition';
import {
  createCorridorScene,
  getCorridorEntryPoint,
  getCorridorExitBiomeId,
  getCorridorZoneForOwner,
  isCorridorConnectedBiomeId,
  resolveCorridorOwnerBiomeId,
  type CorridorBiomeId,
  type CorridorScene,
} from './corridor';
import { resolveEcosystemNoteForEntry } from './ecosystem-notes';
import {
  resolveNextFieldSeasonTargetBiomeId,
  resolveFieldSeasonBoardState,
  resolveFieldSeasonExpeditionState,
} from './field-season-board';
import {
  getJumpSpeed,
  getFieldUpgradeStates,
  getSelectedFieldUpgradeId,
  getWalkSpeed,
  purchaseFieldUpgrade,
} from './field-station';
import {
  getFieldStationArrivalPulseValue,
  resolveFieldStationOpenState,
  type FieldStationArrivalMode,
} from './field-station-session';
import {
  buildFieldStationGrowthInput,
  resolveFieldStationBackdropAccentState,
} from './field-station-homecoming-shell';
import {
  clearNurseryTeachingBed,
  getNextNurseryProjectId,
  getSelectedNurseryProjectId,
  resolveNurseryStateView,
  startNurseryProject,
  syncNurseryState,
  tryClaimNurseryGathering,
  type NurseryCardId,
} from './nursery';
import { resolveFieldStationState } from './field-station-state';
import {
  getInspectBubbleResourceNote,
  getOutingSupportNoticeText,
  resolveInspectTargetProjection,
  resolveFieldRequestController,
} from './field-request-controller';
import { getActiveHabitatProcessMoments } from './habitat-process';
import {
  buildFieldPartnerNotice,
  shouldDeliverFieldPartnerNotice,
  type FieldPartnerNotice,
  type FieldPartnerTrigger,
} from './field-partner';
import {
  createNotebookReadyFieldNotice,
  resolveRecordedFieldRequestNotice,
  type FieldNoticeDescriptor,
  type FieldNoticeVariant,
} from './field-notices';
import {
  advanceActiveFieldRequest,
  fileReadyRouteV2FieldRequest,
  resolveRouteV2FiledDisplayText,
  type ActiveFieldRequest,
} from './field-requests';
import { resolveGuidedFieldSeasonState } from './guided-field-season';
import { createAudioEngine, resolveAmbientProfileId } from './audio';
import { drawBiomeScene } from './biome-scene-render';
import { buildCloseLookPayload } from './close-look';
import { findClimbGrabTarget, findClimbHintTarget } from './climb-navigation';
import { generateBiomeInstance, sampleTerrainY } from './generation';
import { InputController } from './input';
import { getInspectableDetail } from './inspectables';
import {
  buildFieldGuideContext,
  buildFieldGuidePrompt,
  getBiomeZoneForPlayerX,
} from './field-guide';
import {
  buildJournalBiomeProgress,
  getDiscoveredEntriesForBiome,
  getJournalEntrySightings,
  type JournalBiomeProgress,
} from './journal';
import { resolveJournalComparison } from './journal-comparison';
import { resolveObservationPrompt } from './observation-prompts';
import {
  buildBiomeSurveyProgress,
  getBiomeSurveyProgress,
} from './progression';
import {
  buildSketchbookPageView,
  changeSketchbookSlot,
  clearSketchbookSlot,
  getSelectedSketchbookSlotId,
  isSketchbookUnlocked,
  placeSketchbookEntry,
} from './sketchbook';
import {
  drawCloseLookOverlay,
  drawBubbleOverlay,
  drawHabitatChip,
  drawFieldPartnerNotice,
  drawFieldGuideNotice,
  drawFieldRequestHintChip,
  drawFieldRequestNotice,
  drawFieldStationOverlay,
  drawJournalOverlay,
  drawMenuChip,
  drawMenuOverlay,
  drawTitleOverlay,
  drawWorldMapHud,
  type BubbleActionHitTarget,
  type ButtonHitTarget,
  type CloseLookActionHitTarget,
  type JournalActionHitTarget,
  type JournalBiomeHitTarget,
  type JournalHitTarget,
  type JournalSketchSlotHitTarget,
  type JournalScrollHitTarget,
  type MenuActionId,
} from './overlay-render';
import { clamp } from './random';
import { copyTextToClipboard } from './clipboard';
import {
  cycleSelectedOutingSupportId,
  getDiscoveredEntryIds,
  incrementBiomeVisit,
  persistSave,
  recordDiscovery,
  recordCompletedFieldRequest,
  resetSaveProgress,
} from './save';
import { createSpriteRegistry } from './sprites';
import { resolveVisibleVerticalCues } from './vertical-cues';
import { drawWorldMapScene } from './world-map-render';
import {
  beginWorldMapWalk,
  createWorldMapState,
  getWorldMapLocation,
  getWorldMapLocationByBiomeId,
  moveWorldMapFocus,
  stepWorldMapState,
  type WorldMapState,
} from './world-map';
import { buildWorldState } from './world-state';
import type {
  BiomeDefinition,
  BiomeEntity,
  Climbable,
  CloseLookPayload,
  FactBubblePayload,
  Facing,
  GameApi,
  InspectableEntry,
  FieldStationSeasonPage,
  FieldStationView,
  ObservationPrompt,
  OverlayMode,
  Platform,
  SaveState,
  SketchbookSlotId,
} from './types';

const WIDTH = 256;
const HEIGHT = 160;
const PLAYER_WIDTH = 10;
const PLAYER_HEIGHT = 10;
const GRAVITY = 320;
const INSPECT_RANGE = 22;
const CAMERA_X_FOCUS_RATIO = 0.35;
const CAMERA_FOOT_PADDING = 28;
const CAMERA_CLIMB_FOOT_PADDING = 18;
const FIELD_NOTICE_DEFAULT_SECONDS = 4.2;
const FIELD_NOTICE_IMPORTANT_SECONDS = 4.8;
const FIELD_NOTICE_RECORDED_SECONDS = 3.8;
const FIELD_STATION_ARRIVAL_PULSE_SECONDS = 0.45;
const FIELD_PARTNER_NOTICE_SECONDS = 3.2;
const FIELD_PARTNER_GLOBAL_COOLDOWN_SECONDS = 20;
const FIELD_PARTNER_POST_OVERLAY_QUIET_SECONDS = 2.4;
const FIELD_PARTNER_BIOME_ENTER_QUIET_SECONDS = 2.2;

interface PlayerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  onGround: boolean;
  facing: Facing;
  climbing: boolean;
  activeClimbableId: string | null;
}

interface TextRenderableWindow extends Window {
  advanceTime?: (ms: number) => void;
  render_game_to_text?: () => string;
}

type SceneMode = 'biome' | 'world-map' | 'transition';
type TransitionKind = 'biome-to-map' | 'map-to-biome';
type FieldGuideNoticeState = 'copied' | 'failed';
type FieldRequestNotice = FieldNoticeDescriptor;

interface TransitionState {
  kind: TransitionKind;
  plan: DoorTransitionPlan;
  startElapsed: number;
  elapsed: number;
  endElapsed: number;
}

interface RenderDoorState {
  anchor: DoorAnchor;
  openAmount: number;
  highlighted: boolean;
  label: string | null;
}

interface TravelInteractable {
  kind: 'corridor' | 'map-return';
  anchor: DoorAnchor;
  targetBiomeId: CorridorBiomeId | null;
  label: string;
}

interface PendingFieldPartnerTrigger {
  reason: FieldPartnerTrigger;
  entryId: string | null;
}

function getHitTargetAt<T extends { x: number; y: number; w: number; h: number }>(
  targets: T[],
  point: { x: number; y: number },
): T | null {
  for (const target of targets) {
    if (
      point.x >= target.x &&
      point.x <= target.x + target.w &&
      point.y >= target.y &&
      point.y <= target.y + target.h
    ) {
      return target;
    }
  }

  return null;
}

function distanceBetween(
  leftX: number,
  leftY: number,
  rightX: number,
  rightY: number,
): number {
  return Math.hypot(leftX - rightX, leftY - rightY);
}

function drawFade(
  context: CanvasRenderingContext2D,
  alpha: number,
): void {
  if (alpha <= 0) {
    return;
  }

  context.fillStyle = `rgba(22, 18, 14, ${clamp(alpha, 0, 1)})`;
  context.fillRect(0, 0, WIDTH, HEIGHT);
}

export function createGame(canvas: HTMLCanvasElement, initialSaveState: SaveState): GameApi {
  const context =
    canvas.getContext('2d') ??
    (() => {
      throw new Error('Unable to create 2D canvas context.');
    })();

  context.imageSmoothingEnabled = false;
  context.textBaseline = 'top';
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const sprites = createSpriteRegistry(spriteSources);
  const input = new InputController(canvas);
  const save = initialSaveState;
  const audio = createAudioEngine(save.settings.soundEnabled);
  let currentBiomeDefinition: BiomeDefinition = biomeRegistry.beach;
  let currentBiome = generateBiomeInstance(currentBiomeDefinition, save, 1);
  let player: PlayerState = {
    x: currentBiomeDefinition.startPosition.x,
    y: currentBiomeDefinition.startPosition.y,
    vx: 0,
    vy: 0,
    onGround: false,
    facing: 'right',
    climbing: false,
    activeClimbableId: null,
  };
  let overlayMode: OverlayMode = 'title';
  let sceneMode: SceneMode = 'biome';
  let bubble: FactBubblePayload | null = null;
  let bubbleTimer = 0;
  let closeLook: CloseLookPayload | null = null;
  let selectedJournalBiomeId = save.lastBiomeId || 'beach';
  let selectedJournalEntryId: string | null = null;
  let cameraX = 0;
  let cameraY = 0;
  let frameCount = 0;
  let lastTime = performance.now();
  let manualTimeControl = false;
  let journalHitTargets: JournalHitTarget[] = [];
  let journalBiomeHitTargets: JournalBiomeHitTarget[] = [];
  let journalScrollHitTargets: JournalScrollHitTarget[] = [];
  let journalActionHitTargets: JournalActionHitTarget[] = [];
  let journalSketchSlotHitTargets: JournalSketchSlotHitTarget[] = [];
  let journalVisibleEntryIds: string[] = [];
  let journalCanScrollUp = false;
  let journalCanScrollDown = false;
  let journalComparisonOpen = false;
  let journalSketchbookOpen = false;
  let selectedSketchbookSlotId: SketchbookSlotId | null = null;
  let titleHitTargets: ButtonHitTarget[] = [];
  let hudHitTargets: ButtonHitTarget[] = [];
  let bubbleActionHitTargets: BubbleActionHitTarget[] = [];
  let closeLookHitTargets: CloseLookActionHitTarget[] = [];
  let menuHitTargets: ButtonHitTarget[] = [];
  let menuReturnMode: 'title' | 'playing' | 'journal' = 'playing';
  let selectedMenuActionId: MenuActionId = 'toggle-fullscreen';
  let showResetConfirmation = false;
  let selectedFieldStationUpgradeId: string | null = null;
  let outingSupportSelected = false;
  let selectedFieldStationView: FieldStationView = 'season';
  let selectedFieldStationSeasonPage: FieldStationSeasonPage = 'routes';
  let selectedNurseryCardId: NurseryCardId = 'bench';
  let selectedNurseryProjectId: string | null = null;
  let claimedNurseryEntityIds = new Set<string>();
  let fieldGuideNotice: FieldGuideNoticeState | null = null;
  let fieldGuideNoticeTimer = 0;
  let fieldStationArrivalPulseTimer = 0;
  let fieldStationArrivalMode: FieldStationArrivalMode = 'default';
  let fieldRequestNotice: FieldRequestNotice | null = null;
  let fieldRequestNoticeTimer = 0;
  let fieldPartnerNotice: FieldPartnerNotice | null = null;
  let fieldPartnerNoticeTimer = 0;
  let fieldPartnerQuietTimer = 0;
  let fieldPartnerGlobalCooldownTimer = 0;
  let fieldPartnerPendingTrigger: PendingFieldPartnerTrigger | null = null;
  let fieldPartnerNoticesThisVisit = 0;
  let fieldPartnerLastStateKey: string | null = null;
  let fieldPartnerContextKey = '';
  let guidedStarterNoticeShown = false;
  let guidedStationNoticeShown = false;
  let guidedSeasonCapstoneNoticeShown = false;
  let guidedSeasonCloseReturnNoticeShown = false;
  let guidedNextStopNoticeShown = false;
  let worldMapState = createWorldMapState(
    ecoWorldMap,
    getWorldMapLocationByBiomeId(ecoWorldMap, save.lastBiomeId || 'beach').id,
  );
  let mapOriginBiomeId = save.lastBiomeId || 'beach';
  let mapReturnAnchor: DoorAnchor | null = null;
  let transitionState: TransitionState | null = null;
  let activeCorridor: CorridorScene | null = null;

  function getContextBiomeId(): string {
    return activeCorridor?.ownerBiomeId ?? currentBiomeDefinition.id;
  }

  function getContextBiomeDefinition(): BiomeDefinition {
    return activeCorridor
      ? biomeRegistry[activeCorridor.ownerBiomeId as keyof typeof biomeRegistry]
      : currentBiomeDefinition;
  }

  function getContextVisitCount(): number {
    const biomeId = getContextBiomeId();
    return save.biomeVisits[biomeId] ?? currentBiome.visitCount;
  }

  function getWorldState(biomeId = getContextBiomeId()) {
    return buildWorldState(save, biomeId);
  }

  function getActiveAudioBiomeId(): string {
    if (sceneMode === 'world-map') {
      return getWorldMapLocation(ecoWorldMap, worldMapState.focusedLocationId).biomeId;
    }

    if (transitionState) {
      return transitionState.plan.toBiomeId;
    }

    return getContextBiomeId();
  }

  function syncAudioState(): void {
    if (input.hasPendingInteraction()) {
      void audio.arm();
    }

    audio.setSoundEnabled(save.settings.soundEnabled);
    audio.setAmbientProfile(resolveAmbientProfileId(getActiveAudioBiomeId()));
  }

  function getPhaseTime(
    plan: DoorTransitionPlan,
    phaseId: DoorTransitionPhaseId,
    edge: 'start' | 'end' = 'start',
  ): number {
    let elapsed = 0;

    for (const phase of plan.phases) {
      if (phase.id === phaseId) {
        return edge === 'start' ? elapsed : elapsed + phase.duration;
      }

      elapsed += phase.duration;
    }

    return edge === 'start' ? 0 : plan.totalDuration;
  }

  function openMenu(returnMode: 'title' | 'playing' | 'journal'): void {
    menuReturnMode = returnMode;
    overlayMode = 'menu';
    selectedMenuActionId = getDefaultMenuActionId();
    showResetConfirmation = false;
    clearInspectSurface();
    startFieldPartnerQuiet();
  }

  function closeMenu(): void {
    overlayMode = menuReturnMode;
    selectedMenuActionId = 'toggle-fullscreen';
    showResetConfirmation = false;
    startFieldPartnerQuiet();
  }

  function clearInspectSurface(): void {
    bubble = null;
    bubbleTimer = 0;
    closeLook = null;
  }

  function openCloseLookFromBubble(): void {
    if (!bubble) {
      return;
    }

    const entry = currentBiomeDefinition.entries[bubble.entryId];
    const payload = entry ? buildCloseLookPayload(entry) : null;
    if (!payload) {
      return;
    }

    closeLook = payload;
    bubble = null;
    bubbleTimer = 0;
    overlayMode = 'close-look';
    audio.playUiCue('inspect-reveal');
    startFieldPartnerQuiet();
  }

  function closeCloseLook(): void {
    closeLook = null;
    overlayMode = 'playing';
    audio.playUiCue('confirm');
    startFieldPartnerQuiet();
  }

  function canUseFieldGuideFromMenu(): boolean {
    return sceneMode === 'biome' && menuReturnMode === 'playing';
  }

  function canUseWorldMapFromMenu(): boolean {
    return sceneMode === 'biome' && menuReturnMode === 'playing';
  }

  function canUseFieldStationFromMenu(): boolean {
    return sceneMode === 'world-map' && menuReturnMode === 'playing';
  }

  function getGuidedFieldSeasonState() {
    return resolveGuidedFieldSeasonState(biomeRegistry, save);
  }

  function getFieldStationSelections() {
    return {
      selectedFieldStationView,
      selectedFieldStationSeasonPage,
      outingSupportSelected,
      selectedFieldStationUpgradeId,
      selectedNurseryCardId,
      selectedNurseryProjectId,
    };
  }

  function resetNurseryClaimedEntities(): void {
    claimedNurseryEntityIds = new Set<string>();
  }

  function getFieldStationState() {
    if (syncNurseryState(save)) {
      persistSave(save);
    }
    return resolveFieldStationState(biomeRegistry, save, getFieldStationSelections());
  }

  function getFieldRequestController(focusedWorldMapLocationId: string | null = null) {
    return resolveFieldRequestController(biomeRegistry, ecoWorldMap, save, {
      sceneMode,
      overlayMode,
      sceneBiomeId: getContextBiomeId(),
      lastBiomeId: save.lastBiomeId || 'beach',
      sceneZoneId: getCurrentZoneId(),
      scenePlayerX: player.x,
      scenePlayerY: player.y,
      hasFieldRequestNotice: Boolean(fieldRequestNotice),
      focusedWorldMapLocationId,
    });
  }

  function getJournalFieldRequest(): ActiveFieldRequest | null {
    return getFieldRequestController().journalFieldRequest;
  }

  function getRouteMarkerLocationId(): string | null {
    return getFieldRequestController().routeMarkerLocationId;
  }

  function getPreferredWorldMapFocusLocationId(fallbackLocationId: string): string {
    return getRouteMarkerLocationId() ?? fallbackLocationId;
  }

  function getWorldMapReplayLabel(focusedLocationId: string): string | null {
    return getFieldRequestController(focusedLocationId).routeReplayLabel;
  }

  function getWorldMapOriginLabel(
    currentLocationId: string,
    focusedLocationId: string,
  ): string | null {
    if (currentLocationId === focusedLocationId) {
      return null;
    }

    return `FROM ${getWorldMapLocation(ecoWorldMap, currentLocationId).label.toUpperCase()}`;
  }

  function getRegionalTravelWarmth(
    locationId: string,
  ): { mapReturnLabel: string; summaryLabel: string } | null {
    if (resolveNextFieldSeasonTargetBiomeId(save) !== 'treeline') {
      return null;
    }

    if (locationId !== 'forest') {
      return null;
    }

    return {
      mapReturnLabel: 'HIGH PASS MAP',
      summaryLabel: 'Last woods before High Pass.',
    };
  }

  function getWorldMapSummaryLabel(locationId: string): string {
    return getRegionalTravelWarmth(locationId)?.summaryLabel
      ?? getWorldMapLocation(ecoWorldMap, locationId).summary;
  }

  function getMapReturnLabel(locationId: string): string | null {
    return getRegionalTravelWarmth(locationId)?.mapReturnLabel
      ?? getWorldMapLocation(ecoWorldMap, locationId).mapReturnLabel
      ?? null;
  }

  function getWorldMapApproachLabel(locationId: string): string | null {
    return getWorldMapLocation(ecoWorldMap, locationId).approachLabel ?? null;
  }

  function openFieldStation(): void {
    const openState = resolveFieldStationOpenState(
      biomeRegistry,
      save,
      selectedFieldStationUpgradeId,
      selectedNurseryProjectId,
    );
    if (openState.persistNeeded) {
      persistSave(save);
    }
    selectedFieldStationView = 'season';
    selectedFieldStationSeasonPage = 'routes';
    outingSupportSelected = false;
    selectedNurseryCardId = 'bench';
    selectedFieldStationUpgradeId = openState.selectedFieldStationUpgradeId;
    selectedNurseryProjectId = openState.selectedNurseryProjectId;
    fieldStationArrivalPulseTimer = FIELD_STATION_ARRIVAL_PULSE_SECONDS;
    fieldStationArrivalMode = openState.arrivalMode;
    overlayMode = 'field-station';
  }

  function closeFieldStation(): void {
    if (sceneMode === 'world-map') {
      worldMapState.focusedLocationId = getPreferredWorldMapFocusLocationId(
        worldMapState.focusedLocationId,
      );
    }
    fieldStationArrivalPulseTimer = 0;
    fieldStationArrivalMode = 'default';
    overlayMode = 'playing';
    maybeShowNextHabitatNotice();
  }

  function getFieldStationArrivalPulse(): number {
    return getFieldStationArrivalPulseValue(
      overlayMode === 'field-station' ? 'field-station' : 'other',
      fieldStationArrivalPulseTimer,
      FIELD_STATION_ARRIVAL_PULSE_SECONDS,
    );
  }

  function getMenuActionIds(): MenuActionId[] {
    return showResetConfirmation
      ? ['cancel-reset', 'confirm-reset']
      : [
          ...(canUseWorldMapFromMenu() ? (['world-map'] as const) : []),
          ...(canUseFieldStationFromMenu() ? (['field-station'] as const) : []),
          ...(canUseFieldGuideFromMenu() ? (['field-guide'] as const) : []),
          'toggle-fullscreen',
          'toggle-sound',
          'toggle-inspect-hints',
          'reset-save',
          'close-menu',
        ];
  }

  function getDefaultMenuActionId(): MenuActionId {
    const available = getMenuActionIds();
    const guidedFieldSeason = getGuidedFieldSeasonState();
    const inBiomePlayMenu = menuReturnMode === 'playing' && sceneMode === 'biome';

    if (
      inBiomePlayMenu &&
      (
        (
          guidedFieldSeason.stage === 'starter'
          && guidedFieldSeason.nextBiomeId !== null
          && guidedFieldSeason.nextBiomeId !== getContextBiomeId()
        )
        || guidedFieldSeason.stage === 'station-return'
        || guidedFieldSeason.stage === 'season-close-return'
      ) &&
      available.includes('world-map')
    ) {
      return 'world-map';
    }

    if (
      menuReturnMode === 'playing' &&
      sceneMode === 'world-map' &&
      (
        guidedFieldSeason.stage === 'station-return'
        || guidedFieldSeason.stage === 'season-close-return'
      ) &&
      available.includes('field-station')
    ) {
      return 'field-station';
    }

    if (
      inBiomePlayMenu &&
      available.includes('world-map')
    ) {
      return 'world-map';
    }

    if (available.includes('toggle-fullscreen')) {
      return 'toggle-fullscreen';
    }

    return available[0] ?? 'toggle-fullscreen';
  }

  function ensureMenuSelection(): void {
    const available = getMenuActionIds();
    if (!available.includes(selectedMenuActionId)) {
      selectedMenuActionId = available[0];
    }
  }

  function moveMenuSelection(direction: number): void {
    const available = getMenuActionIds();
    const currentIndex = available.indexOf(selectedMenuActionId);
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex = (safeIndex + direction + available.length) % available.length;
    const nextActionId = available[nextIndex];
    if (nextActionId !== selectedMenuActionId) {
      audio.playUiCue('menu-move');
    }
    selectedMenuActionId = nextActionId;
  }

  function getTransitionSnapshot(): DoorTransitionSnapshot | null {
    if (!transitionState) {
      return null;
    }

    return sampleDoorTransition(
      ecoWorldMap,
      transitionState.plan,
      transitionState.startElapsed + transitionState.elapsed,
    );
  }

  function allEntries(): Record<string, InspectableEntry> {
    return Object.values(biomeRegistry).reduce<Record<string, InspectableEntry>>((accumulator, biome) => {
      for (const [entryId, entry] of Object.entries(biome.entries)) {
        accumulator[entryId] = entry;
      }
      return accumulator;
    }, {});
  }

  function getGroundYAt(playerX: number): number {
    return sampleTerrainY(currentBiome.terrainSamples, playerX);
  }

  function getSupportingPlatform(centerX: number, previousBottom: number, nextBottom: number): Platform | null {
    let candidate: Platform | null = null;

    for (const platform of currentBiome.platforms) {
      if (centerX < platform.x - 1 || centerX > platform.x + platform.w + 1) {
        continue;
      }

      const crossing = previousBottom <= platform.y && nextBottom >= platform.y;
      const resting = Math.abs(previousBottom - platform.y) <= 1.5;

      if (!crossing && !resting) {
        continue;
      }

      if (!candidate || platform.y < candidate.y) {
        candidate = platform;
      }
    }

    return candidate;
  }

  function getClimbableById(climbableId: string | null): Climbable | null {
    if (!climbableId) {
      return null;
    }

    return currentBiome.climbables.find((climbable) => climbable.id === climbableId) ?? null;
  }

  function getReachableClimbable(playerState = player): Climbable | null {
    return findClimbGrabTarget(currentBiome.climbables, {
      x: playerState.x,
      y: playerState.y,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
    });
  }

  function alignPlayerToClimbable(climbable: Climbable): void {
    player.x = clamp(
      Math.round(climbable.x + climbable.w / 2 - PLAYER_WIDTH / 2),
      0,
      currentBiome.width - PLAYER_WIDTH,
    );
  }

  function stopClimbing(): void {
    player.climbing = false;
    player.activeClimbableId = null;
  }

  function getActiveClimbHintClimbable(): Climbable | null {
    if (player.climbing) {
      return null;
    }

    return findClimbHintTarget(currentBiome.climbables, {
      x: player.x,
      y: player.y,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
    });
  }

  function getCurrentMapLocation() {
    return getWorldMapLocationByBiomeId(ecoWorldMap, getContextBiomeId());
  }

  function serializeObservationPrompt(observationPrompt: ObservationPrompt | null) {
    if (!observationPrompt) {
      return null;
    }

    return {
      family: observationPrompt.family,
      text: observationPrompt.text,
      source: observationPrompt.source,
      evidenceKey: observationPrompt.evidenceKey,
    };
  }

  function serializeFieldPartnerNotice(notice: FieldPartnerNotice | null) {
    if (!notice) {
      return null;
    }

    return {
      cueId: notice.cueId,
      text: notice.text,
      family: notice.family,
      source: notice.source,
      trigger: notice.trigger,
      evidenceKey: notice.evidenceKey,
      stateKey: notice.stateKey,
    };
  }

  function serializeActiveFieldRequest(fieldRequest: ActiveFieldRequest | null) {
    if (!fieldRequest) {
      return null;
    }

    return {
      id: fieldRequest.id,
      biomeId: fieldRequest.biomeId,
      biomeName: fieldRequest.biomeName,
      title: fieldRequest.title,
      summary: fieldRequest.summary,
      progressLabel: fieldRequest.progressLabel,
      routeV2: fieldRequest.routeV2,
    };
  }

  function getWorldMapBiomeDoor(): DoorAnchor {
    if (transitionState) {
      return transitionState.kind === 'biome-to-map'
        ? transitionState.plan.fromBiomeDoor
        : transitionState.plan.toBiomeDoor;
    }

    return getCurrentMapLocation().biomeDoor;
  }

  function getCurrentBiomeDoors(): CorridorDoor[] {
    if (activeCorridor) {
      return [];
    }

    return getCurrentMapLocation().corridorDoors ?? [];
  }

  function getPreferredMapReturnAnchor(biomeId: string): DoorAnchor | null {
    return getWorldMapLocationByBiomeId(ecoWorldMap, biomeId).mapReturnPost ?? null;
  }

  function getTravelInteractableLabel(
    kind: TravelInteractable['kind'],
    targetBiomeId: CorridorBiomeId | null,
    mapReturnLabel: string | null = null,
  ): string {
    if (kind === 'map-return') {
      return mapReturnLabel ?? 'WORLD MAP';
    }

    if (!targetBiomeId) {
      return 'TRAVEL';
    }

    return `TO ${getWorldMapLocationByBiomeId(ecoWorldMap, targetBiomeId).label.toUpperCase()}`;
  }

  function getCurrentTravelInteractables(): TravelInteractable[] {
    if (activeCorridor) {
      return [];
    }

    const location = getCurrentMapLocation();
    const interactables: TravelInteractable[] = (location.corridorDoors ?? []).map((door) => ({
      kind: 'corridor',
      anchor: door,
      targetBiomeId: isCorridorConnectedBiomeId(door.targetBiomeId) ? door.targetBiomeId : null,
      label: getTravelInteractableLabel(
        'corridor',
        isCorridorConnectedBiomeId(door.targetBiomeId) ? door.targetBiomeId : null,
      ),
    }));

    if (location.mapReturnPost) {
      interactables.push({
        kind: 'map-return',
        anchor: location.mapReturnPost,
        targetBiomeId: null,
        label: getTravelInteractableLabel('map-return', null, getMapReturnLabel(location.id)),
      });
    }

    return interactables;
  }

  function isSameTravelInteractable(
    left: TravelInteractable | null,
    right: TravelInteractable,
  ): boolean {
    if (!left) {
      return false;
    }

    if (left.kind !== right.kind) {
      return false;
    }

    return (
      left.anchor.x === right.anchor.x &&
      left.anchor.y === right.anchor.y &&
      left.targetBiomeId === right.targetBiomeId
    );
  }

  function getSceneDoors(highlightedTarget: TravelInteractable | null = null): RenderDoorState[] {
    if (activeCorridor) {
      return [];
    }

    if (sceneMode === 'transition') {
      return [
        {
          anchor: getWorldMapBiomeDoor(),
          openAmount: getTransitionSnapshot()?.sourceDoorOpen ?? 0,
          highlighted: false,
          label: null,
        },
      ];
    }

    return getCurrentTravelInteractables().map((target) => ({
      anchor: target.anchor,
      openAmount: 0,
      highlighted: isSameTravelInteractable(highlightedTarget, target),
      label: target.label,
    }));
  }

  function getDoorInteractPoint(door: DoorAnchor): { x: number; y: number } {
    return {
      x: door.x + 4,
      y: door.y + 8,
    };
  }

  function getNearestBiomeDoor(maxDistance = INSPECT_RANGE + 6): CorridorDoor | null {
    let nearestDoor: CorridorDoor | null = null;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (const door of getCurrentBiomeDoors()) {
      const point = getDoorInteractPoint(door);
      const distance = distanceBetween(
        player.x + PLAYER_WIDTH / 2,
        player.y + PLAYER_HEIGHT / 2,
        point.x,
        point.y,
      );

      if (distance <= maxDistance && distance < nearestDistance) {
        nearestDoor = door;
        nearestDistance = distance;
      }
    }

    return nearestDoor;
  }

  function getNearestTravelInteractable(maxDistance = INSPECT_RANGE + 6): TravelInteractable | null {
    let nearestTarget: TravelInteractable | null = null;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (const target of getCurrentTravelInteractables()) {
      const point = getDoorInteractPoint(target.anchor);
      const distance = distanceBetween(
        player.x + PLAYER_WIDTH / 2,
        player.y + PLAYER_HEIGHT / 2,
        point.x,
        point.y,
      );

      if (distance <= maxDistance && distance < nearestDistance) {
        nearestTarget = target;
        nearestDistance = distance;
      }
    }

    return nearestTarget;
  }

  function setPlayerFromFootPosition(footX: number, footY: number, facing: Facing): void {
    player = {
      x: Math.round(footX - PLAYER_WIDTH / 2),
      y: Math.round(footY - PLAYER_HEIGHT),
      vx: 0,
      vy: 0,
      onGround: true,
      facing,
      climbing: false,
      activeClimbableId: null,
    };

    const baseGround = getGroundYAt(player.x + PLAYER_WIDTH / 2);
    player.y = Math.min(player.y, baseGround - PLAYER_HEIGHT);
    syncBiomeCamera();
  }

  function syncBiomeCamera(targetX = player.x, targetY = player.y): void {
    cameraX = clamp(
      targetX - WIDTH * CAMERA_X_FOCUS_RATIO,
      0,
      Math.max(0, currentBiome.width - WIDTH),
    );
    const footPadding = player.climbing ? CAMERA_CLIMB_FOOT_PADDING : CAMERA_FOOT_PADDING;
    const focusY = targetY + PLAYER_HEIGHT - (HEIGHT - footPadding);
    cameraY = clamp(Math.round(focusY), 0, Math.max(0, currentBiome.height - HEIGHT));
  }

  function setSelectedJournalEntry(defaultToFirst = false): void {
    const discovered = getDiscoveredEntriesList(selectedJournalBiomeId);
    if (!discovered.length) {
      setSelectedJournalEntryId(null);
      return;
    }

    if (selectedJournalEntryId && discovered.some((entry) => entry.id === selectedJournalEntryId)) {
      return;
    }

    if (defaultToFirst) {
      setSelectedJournalEntryId(discovered[0].id);
    }
  }

  function getJournalBiomeProgressList(): JournalBiomeProgress[] {
    return buildJournalBiomeProgress(biomeRegistry, save.discoveredEntries);
  }

  function getBiomeSurveyProgressList() {
    return buildBiomeSurveyProgress(getJournalBiomeProgressList());
  }

  function getDiscoveredEntriesList(biomeId = selectedJournalBiomeId): InspectableEntry[] {
    const biome = biomeRegistry[biomeId as keyof typeof biomeRegistry];
    if (!biome) {
      return [];
    }

    return getDiscoveredEntriesForBiome(biome, allEntries(), save.discoveredEntries);
  }

  function getJournalEntrySightingBiomeIds(entryId: string | null): string[] {
    return getJournalEntrySightings(save.discoveredEntries, entryId, Object.keys(biomeRegistry));
  }

  function getJournalComparison(entryId: string | null = selectedJournalEntryId) {
    return resolveJournalComparison(
      biomeRegistry,
      save.discoveredEntries,
      entryId,
      getJournalEntrySightingBiomeIds(entryId),
    );
  }

  function getSelectedJournalSurveyState() {
    return getBiomeSurveyProgress(getJournalBiomeProgressList(), selectedJournalBiomeId)?.state ?? 'none';
  }

  function isSelectedJournalSketchbookUnlocked(): boolean {
    return isSketchbookUnlocked(getSelectedJournalSurveyState());
  }

  function getJournalSketchbookPage() {
    const selectedBiome = biomeRegistry[selectedJournalBiomeId as keyof typeof biomeRegistry];
    if (!selectedBiome || !isSelectedJournalSketchbookUnlocked()) {
      return null;
    }

    return buildSketchbookPageView(selectedBiome, allEntries(), save);
  }

  function toggleJournalSketchbook(): boolean {
    if (!isSelectedJournalSketchbookUnlocked()) {
      journalSketchbookOpen = false;
      return false;
    }

    journalSketchbookOpen = !journalSketchbookOpen;
    journalComparisonOpen = false;
    selectedSketchbookSlotId = journalSketchbookOpen
      ? getSelectedSketchbookSlotId(selectedSketchbookSlotId)
      : null;
    return true;
  }

  function changeSelectedSketchbookSlot(direction: number): void {
    if (!journalSketchbookOpen) {
      return;
    }

    selectedSketchbookSlotId = changeSketchbookSlot(selectedSketchbookSlotId, direction);
  }

  function placeSelectedJournalEntryInSketchbook(): boolean {
    if (!journalSketchbookOpen || !selectedJournalEntryId || !isSelectedJournalSketchbookUnlocked()) {
      return false;
    }

    const selectedBiome = biomeRegistry[selectedJournalBiomeId as keyof typeof biomeRegistry];
    if (!selectedBiome) {
      return false;
    }

    const slotId = getSelectedSketchbookSlotId(selectedSketchbookSlotId);
    if (!placeSketchbookEntry(save, selectedBiome, slotId, selectedJournalEntryId)) {
      return false;
    }

    selectedSketchbookSlotId = slotId;
    persistSave(save);
    return true;
  }

  function clearSelectedJournalSketchbookSlot(): boolean {
    if (!journalSketchbookOpen || !isSelectedJournalSketchbookUnlocked()) {
      return false;
    }

    const slotId = getSelectedSketchbookSlotId(selectedSketchbookSlotId);
    if (!clearSketchbookSlot(save, selectedJournalBiomeId, slotId)) {
      return false;
    }

    selectedSketchbookSlotId = slotId;
    persistSave(save);
    return true;
  }

  function getCurrentZoneId(): string | null {
    if (activeCorridor) {
      return getCorridorZoneForOwner(activeCorridor, getContextBiomeId()).id;
    }

    return getBiomeZoneForPlayerX(currentBiomeDefinition, player.x)?.id ?? null;
  }

  function getCurrentZoneLabel(): string | null {
    if (activeCorridor) {
      return getCorridorZoneForOwner(activeCorridor, getContextBiomeId()).label;
    }

    return getBiomeZoneForPlayerX(getContextBiomeDefinition(), player.x)?.label ?? null;
  }

  function getVisibleVerticalCuesForRender() {
    if (
      overlayMode !== 'playing' ||
      sceneMode !== 'biome' ||
      activeCorridor ||
      bubble ||
      !save.settings.showInspectHints
    ) {
      return [];
    }

    return resolveVisibleVerticalCues(
      getContextBiomeDefinition(),
      getCurrentZoneId(),
      {
        x: cameraX,
        y: cameraY,
        w: WIDTH,
        h: HEIGHT,
      },
    );
  }

  function getFieldRequestContext() {
    return getFieldRequestController().context;
  }

  function getInspectTargetProjection() {
    if (sceneMode !== 'biome' || overlayMode !== 'playing' || bubble) {
      return {
        inspectTargetSelection: null,
        fieldRequestHint: null,
        nearestInspectableEntityId: null,
      };
    }

    return resolveInspectTargetProjection(
      getFieldRequestController(),
      currentBiome.entities,
      {
        x: player.x + PLAYER_WIDTH / 2,
        y: player.y + PLAYER_HEIGHT / 2,
      },
      INSPECT_RANGE,
      (entity) => getBiomeZoneForPlayerX(currentBiomeDefinition, entity.x + entity.w / 2)?.id ?? null,
    );
  }

  function getActiveFieldRequest(): ActiveFieldRequest | null {
    return getFieldRequestController().activeFieldRequest;
  }

  function showFieldNotice(
    title: string,
    text: string,
    seconds = FIELD_NOTICE_DEFAULT_SECONDS,
    variant: FieldNoticeVariant = 'default',
  ): void {
    startFieldPartnerQuiet();
    fieldRequestNotice = {
      title,
      text,
      variant,
    };
    fieldRequestNoticeTimer = seconds;
  }

  function showFieldRequestNotice(requestId: string, textOverride: string | null = null): void {
    const notice = resolveRecordedFieldRequestNotice(requestId, textOverride);
    if (!notice) {
      return;
    }

    showFieldNotice(notice.title, notice.text, FIELD_NOTICE_RECORDED_SECONDS, notice.variant);
  }

  function maybeShowStarterFieldSeasonNotice(): void {
    const guidedFieldSeason = getGuidedFieldSeasonState();
    if (
      guidedStarterNoticeShown ||
      guidedFieldSeason.stage !== 'starter' ||
      !guidedFieldSeason.promptNotice ||
      !canShowGuidedFieldSeasonNotice(guidedFieldSeason.promptNotice.title)
    ) {
      return;
    }

    guidedStarterNoticeShown = true;
    showFieldNotice(guidedFieldSeason.promptNotice.title, guidedFieldSeason.promptNotice.text, FIELD_NOTICE_IMPORTANT_SECONDS);
  }

  function maybeShowStationReturnNotice(): void {
    const guidedFieldSeason = getGuidedFieldSeasonState();
    if (
      guidedStationNoticeShown ||
      guidedFieldSeason.stage !== 'station-return' ||
      !guidedFieldSeason.promptNotice ||
      !canShowGuidedFieldSeasonNotice(guidedFieldSeason.promptNotice.title)
    ) {
      return;
    }

    guidedStationNoticeShown = true;
    showFieldNotice(guidedFieldSeason.promptNotice.title, guidedFieldSeason.promptNotice.text, FIELD_NOTICE_IMPORTANT_SECONDS);
  }

  function maybeShowSeasonCapstoneNoticeOnBiomeEnter(biomeId: string): void {
    const guidedFieldSeason = getGuidedFieldSeasonState();
    if (
      biomeId !== 'forest' ||
      guidedSeasonCapstoneNoticeShown ||
      guidedFieldSeason.stage !== 'season-capstone' ||
      !guidedFieldSeason.promptNotice ||
      !canShowGuidedFieldSeasonNotice(guidedFieldSeason.promptNotice.title)
    ) {
      return;
    }

    guidedSeasonCapstoneNoticeShown = true;
    showFieldNotice(guidedFieldSeason.promptNotice.title, guidedFieldSeason.promptNotice.text, FIELD_NOTICE_IMPORTANT_SECONDS);
  }

  function maybeShowSeasonCloseReturnNotice(): void {
    const guidedFieldSeason = getGuidedFieldSeasonState();
    if (
      guidedSeasonCloseReturnNoticeShown ||
      guidedFieldSeason.stage !== 'season-close-return' ||
      !guidedFieldSeason.promptNotice ||
      !canShowGuidedFieldSeasonNotice(guidedFieldSeason.promptNotice.title)
    ) {
      return;
    }

    guidedSeasonCloseReturnNoticeShown = true;
    showFieldNotice(guidedFieldSeason.promptNotice.title, guidedFieldSeason.promptNotice.text, FIELD_NOTICE_IMPORTANT_SECONDS);
  }

  function maybeShowWorldMapFieldSeasonNotice(): void {
    maybeShowStationReturnNotice();
    maybeShowSeasonCloseReturnNotice();
  }

  function maybeShowNextHabitatNotice(): void {
    const guidedFieldSeason = getGuidedFieldSeasonState();
    if (
      guidedNextStopNoticeShown ||
      guidedFieldSeason.stage !== 'next-habitat' ||
      !guidedFieldSeason.promptNotice ||
      !canShowGuidedFieldSeasonNotice(guidedFieldSeason.promptNotice.title)
    ) {
      return;
    }

    guidedNextStopNoticeShown = true;
    showFieldNotice(guidedFieldSeason.promptNotice.title, guidedFieldSeason.promptNotice.text, FIELD_NOTICE_IMPORTANT_SECONDS);
  }

  function maybeShowRouteReplayNoticeOnBiomeEnter(biomeId: string): void {
    if (overlayMode !== 'playing' || fieldRequestNotice) {
      return;
    }

    const routeBoard = resolveFieldSeasonBoardState(biomeRegistry, save);
    if (routeBoard.complete || routeBoard.targetBiomeId !== biomeId || !routeBoard.replayNote) {
      return;
    }

    showFieldNotice(routeBoard.replayNote.title, routeBoard.replayNote.text, FIELD_NOTICE_IMPORTANT_SECONDS);
  }

  function canShowGuidedFieldSeasonNotice(nextTitle: string): boolean {
    if (!fieldRequestNotice) {
      return true;
    }

    return isGuidedFieldSeasonNoticeTitle(fieldRequestNotice.title)
      && isGuidedFieldSeasonNoticeTitle(nextTitle);
  }

  function isGuidedFieldSeasonNoticeTitle(title: string): boolean {
    return title === 'NOTEBOOK TASK'
      || title === 'FIELD STATION'
      || title === 'NEXT STOP'
      || title === 'SEASON THREADS';
  }

  function maybeCompleteActiveFieldRequest(
    trigger: 'zone' | 'inspect' | 'enter-biome',
    entryId?: string | null,
    observedZoneId?: string | null,
  ): boolean {
    const result = advanceActiveFieldRequest(getFieldRequestContext(), trigger, entryId, observedZoneId);
    if (!result) {
      return false;
    }

    if (result.status === 'ready-to-synthesize') {
      const notice = createNotebookReadyFieldNotice(result.noticeTitle, result.noticeText);
      persistSave(save);
      showFieldNotice(notice.title, notice.text, FIELD_NOTICE_IMPORTANT_SECONDS, notice.variant);
      return true;
    }

    if (!recordCompletedFieldRequest(save, result.requestId)) {
      return false;
    }

    if (result.requestId === 'forest-season-threads') {
      save.seasonCloseReturnPending = true;
    }
    persistSave(save);
    if (result.requestId === 'forest-expedition-upper-run') {
      const guidedFieldSeason = getGuidedFieldSeasonState();
      if (guidedFieldSeason.stage === 'season-capstone' && guidedFieldSeason.promptNotice) {
        guidedSeasonCapstoneNoticeShown = true;
        showFieldNotice(guidedFieldSeason.promptNotice.title, guidedFieldSeason.promptNotice.text, 3.6);
        return false;
      }
    }
    if (result.requestId === 'forest-season-threads') {
      const guidedFieldSeason = getGuidedFieldSeasonState();
      if (guidedFieldSeason.stage === 'season-close-return' && guidedFieldSeason.promptNotice) {
        guidedSeasonCloseReturnNoticeShown = true;
        showFieldNotice(guidedFieldSeason.promptNotice.title, guidedFieldSeason.promptNotice.text, FIELD_NOTICE_IMPORTANT_SECONDS);
        return false;
      }
    }
    showFieldRequestNotice(result.requestId);
    return false;
  }

  function getNearbyDiscoveredEntryIdsForPrompt(radius = 56): string[] {
    const discoveredEntryIds = new Set(getDiscoveredEntryIds(save));
    const playerCenterX = player.x + PLAYER_WIDTH / 2;
    const playerCenterY = player.y + PLAYER_HEIGHT / 2;

    return currentBiome.entities
      .filter((entity) => !entity.removed && discoveredEntryIds.has(entity.entryId))
      .filter((entity) => {
        const entityCenterX = entity.x + entity.w / 2;
        const entityCenterY = entity.y + entity.h / 2;
        return Math.hypot(entityCenterX - playerCenterX, entityCenterY - playerCenterY) <= radius;
      })
      .map((entity) => entity.entryId);
  }

  function getObservationPromptForCurrentBiome(
    selectedEntryId: string | null = null,
    ecosystemNote: ReturnType<typeof resolveEcosystemNoteForEntry> | null = null,
    comparisonAvailable = false,
  ): ObservationPrompt | null {
    if (sceneMode !== 'biome') {
      return null;
    }

    const zoneId = getCurrentZoneId();
    if (!zoneId) {
      return null;
    }

    return resolveObservationPrompt({
      biome: getContextBiomeDefinition(),
      zoneId,
      nearbyDiscoveredEntryIds: getNearbyDiscoveredEntryIdsForPrompt(),
      selectedEntryId,
      worldState: getWorldState(getContextBiomeId()),
      ecosystemNote,
      comparisonAvailable,
    });
  }

  function getFieldGuideObservationPrompt(): ObservationPrompt | null {
    const contextBiomeId = getContextBiomeId();
    const contextBiomeDefinition = getContextBiomeDefinition();
    const selectedEntryId =
      selectedJournalBiomeId === contextBiomeId ? selectedJournalEntryId : null;
    const localDiscoveredEntryIds = getDiscoveredEntriesList(contextBiomeId).map((entry) => entry.id);
    const ecosystemNote =
      selectedEntryId
        ? resolveEcosystemNoteForEntry(contextBiomeDefinition, selectedEntryId, localDiscoveredEntryIds)
        : null;

    return getObservationPromptForCurrentBiome(
      selectedEntryId,
      ecosystemNote,
      Boolean(selectedEntryId && getJournalComparison(selectedEntryId)),
    );
  }

  function getJournalObservationPrompt(
    biomeId: string,
    selectedEntryId: string | null,
    ecosystemNote: ReturnType<typeof resolveEcosystemNoteForEntry>,
    comparisonAvailable: boolean,
  ): ObservationPrompt | null {
    if (sceneMode !== 'biome' || biomeId !== getContextBiomeId() || ecosystemNote.state === 'locked') {
      return null;
    }

    return getObservationPromptForCurrentBiome(selectedEntryId, ecosystemNote, comparisonAvailable);
  }

  function getFieldPartnerObservationPrompt(selectedEntryId: string | null = null): ObservationPrompt | null {
    if (sceneMode !== 'biome') {
      return null;
    }

    const contextBiomeId = getContextBiomeId();
    const contextBiomeDefinition = getContextBiomeDefinition();
    const localDiscoveredEntryIds = getDiscoveredEntriesList(contextBiomeId).map((entry) => entry.id);
    const ecosystemNote =
      selectedEntryId
        ? resolveEcosystemNoteForEntry(contextBiomeDefinition, selectedEntryId, localDiscoveredEntryIds)
        : null;

    return getObservationPromptForCurrentBiome(
      selectedEntryId,
      ecosystemNote,
      Boolean(selectedEntryId && getJournalComparison(selectedEntryId)),
    );
  }

  function dismissFieldPartnerNotice(): void {
    fieldPartnerNotice = null;
    fieldPartnerNoticeTimer = 0;
  }

  function startFieldPartnerQuiet(seconds = FIELD_PARTNER_POST_OVERLAY_QUIET_SECONDS): void {
    fieldPartnerQuietTimer = Math.max(fieldPartnerQuietTimer, seconds);
    dismissFieldPartnerNotice();
  }

  function getFieldPartnerTriggerPriority(reason: FieldPartnerTrigger): number {
    switch (reason) {
      case 'discovery':
        return 3;
      case 'state-change':
        return 2;
      case 'biome-enter':
      default:
        return 1;
    }
  }

  function queueFieldPartnerTrigger(reason: FieldPartnerTrigger, entryId: string | null = null): void {
    if (
      fieldPartnerPendingTrigger &&
      getFieldPartnerTriggerPriority(fieldPartnerPendingTrigger.reason) > getFieldPartnerTriggerPriority(reason)
    ) {
      return;
    }

    fieldPartnerPendingTrigger = {
      reason,
      entryId,
    };
  }

  function getFieldPartnerContextKey(): string {
    const worldState = getWorldState();
    return [
      getContextBiomeId(),
      getCurrentZoneId() ?? 'no-zone',
      worldState.dayPart,
      worldState.weather,
    ].join('|');
  }

  function canShowFieldPartnerNotice(): boolean {
    return (
      overlayMode === 'playing' &&
      sceneMode === 'biome' &&
      !transitionState &&
      !bubble &&
      !fieldGuideNotice &&
      fieldPartnerQuietTimer <= 0 &&
      player.onGround &&
      Math.abs(player.vx) < 1 &&
      Math.abs(player.vy) < 1
    );
  }

  function tryShowFieldPartnerNotice(): void {
    if (!fieldPartnerPendingTrigger || !canShowFieldPartnerNotice()) {
      return;
    }

    const observationPrompt = getFieldPartnerObservationPrompt(fieldPartnerPendingTrigger.entryId);
    const nextNotice = buildFieldPartnerNotice({
      biomeId: getContextBiomeId(),
      zoneId: getCurrentZoneId(),
      worldState: getWorldState(getContextBiomeId()),
      observationPrompt,
      trigger: fieldPartnerPendingTrigger.reason,
    });
    if (!nextNotice) {
      fieldPartnerPendingTrigger = null;
      return;
    }

    if (
      !shouldDeliverFieldPartnerNotice({
        trigger: fieldPartnerPendingTrigger.reason,
        deliveredThisVisit: fieldPartnerNoticesThisVisit,
        lastStateKey: fieldPartnerLastStateKey,
        candidateStateKey: nextNotice.stateKey,
        globalCooldownRemainingSeconds: fieldPartnerGlobalCooldownTimer,
      })
    ) {
      fieldPartnerPendingTrigger = null;
      return;
    }

    fieldPartnerNotice = nextNotice;
    fieldPartnerNoticeTimer = FIELD_PARTNER_NOTICE_SECONDS;
    fieldPartnerGlobalCooldownTimer = FIELD_PARTNER_GLOBAL_COOLDOWN_SECONDS;
    fieldPartnerNoticesThisVisit += 1;
    fieldPartnerLastStateKey = nextNotice.stateKey;
    fieldPartnerPendingTrigger = null;
  }

  function setSelectedJournalEntryId(entryId: string | null): void {
    if (selectedJournalEntryId !== entryId) {
      journalComparisonOpen = false;
    }

    selectedJournalEntryId = entryId;
  }

  function getDefaultJournalBiomeId(): string {
    if (sceneMode === 'world-map') {
      return getWorldMapLocation(ecoWorldMap, worldMapState.focusedLocationId).biomeId;
    }

    return getContextBiomeId();
  }

  function setSelectedJournalBiome(biomeId: string, defaultToFirst = false): void {
    if (!biomeRegistry[biomeId as keyof typeof biomeRegistry]) {
      return;
    }

    if (selectedJournalBiomeId !== biomeId) {
      journalComparisonOpen = false;
      journalSketchbookOpen = false;
      selectedSketchbookSlotId = null;
    }
    selectedJournalBiomeId = biomeId;
    setSelectedJournalEntry(defaultToFirst);
  }

  function changeJournalBiome(direction: number): void {
    const biomes = getJournalBiomeProgressList();
    const currentIndex = biomes.findIndex((biome) => biome.biomeId === selectedJournalBiomeId);
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex = (safeIndex + direction + biomes.length) % biomes.length;
    setSelectedJournalBiome(biomes[nextIndex].biomeId, true);
  }

  function applyScenePlayerState(
    footX: number,
    footY: number,
    facing: Facing,
  ): void {
    player = {
      x: Math.round(footX - PLAYER_WIDTH / 2),
      y: Math.round(footY - PLAYER_HEIGHT),
      vx: 0,
      vy: 0,
      onGround: false,
      facing,
      climbing: false,
      activeClimbableId: null,
    };

    const baseGround = getGroundYAt(player.x + PLAYER_WIDTH / 2);
    player.y = Math.min(player.y, baseGround - PLAYER_HEIGHT);
    syncBiomeCamera();
  }

  function syncSceneBookkeeping(biomeId: string): void {
    clearInspectSurface();
    resetNurseryClaimedEntities();
    fieldPartnerGlobalCooldownTimer = 0;
    fieldPartnerPendingTrigger = null;
    fieldPartnerNoticesThisVisit = 0;
    fieldPartnerLastStateKey = null;
    fieldPartnerContextKey = getFieldPartnerContextKey();
    queueFieldPartnerTrigger('biome-enter');
    startFieldPartnerQuiet(FIELD_PARTNER_BIOME_ENTER_QUIET_SECONDS);
    worldMapState = createWorldMapState(
      ecoWorldMap,
      getWorldMapLocationByBiomeId(ecoWorldMap, biomeId).id,
    );
    mapOriginBiomeId = biomeId;
  }

  function loadBiomeScene(
    biomeId: string,
    options?: { countVisit?: boolean; playerFoot?: { x: number; y: number; facing: Facing } },
  ): void {
    const definition = biomeRegistry[biomeId as keyof typeof biomeRegistry];
    if (!definition) {
      throw new Error(`Unknown biome "${biomeId}".`);
    }

    activeCorridor = null;
    currentBiomeDefinition = definition;
    const visitCount = options?.countVisit === false
      ? (save.biomeVisits[biomeId] ?? 1)
      : incrementBiomeVisit(save, biomeId);
    currentBiome = generateBiomeInstance(definition, save, visitCount);
    const playerFoot = options?.playerFoot ?? {
      x: definition.startPosition.x + PLAYER_WIDTH / 2,
      y: definition.startPosition.y + PLAYER_HEIGHT,
      facing: 'right' as Facing,
    };
    applyScenePlayerState(playerFoot.x, playerFoot.y, playerFoot.facing);
    syncSceneBookkeeping(biomeId);
    persistSave(save);
    maybeCompleteActiveFieldRequest('enter-biome');
    maybeShowRouteReplayNoticeOnBiomeEnter(biomeId);
    maybeShowSeasonCapstoneNoticeOnBiomeEnter(biomeId);
  }

  function enterBiome(biomeId: string): void {
    loadBiomeScene(biomeId);
  }

  function getCorridorDoorForTarget(
    biomeId: string,
    targetBiomeId: string,
  ): CorridorDoor | null {
    const location = getWorldMapLocationByBiomeId(ecoWorldMap, biomeId);
    return (
      location.corridorDoors?.find((door) => door.targetBiomeId === targetBiomeId) ?? null
    );
  }

  function getDoorInteriorFoot(door: DoorAnchor): { x: number; y: number; facing: Facing } {
    return {
      x: door.facing === 'right' ? door.x - 5 : door.x + 13,
      y: door.y + 10,
      facing: door.facing === 'right' ? 'left' : 'right',
    };
  }

  function getCorridorArrivalFoot(
    biomeId: CorridorBiomeId,
    fromBiomeId: CorridorBiomeId,
  ): { x: number; y: number; facing: Facing } {
    const corridorDoor = getCorridorDoorForTarget(biomeId, fromBiomeId);
    if (corridorDoor) {
      return getDoorInteriorFoot(corridorDoor);
    }

    const definition = biomeRegistry[biomeId as keyof typeof biomeRegistry];
    return {
      x: definition.startPosition.x + PLAYER_WIDTH / 2,
      y: definition.startPosition.y + PLAYER_HEIGHT,
      facing: 'right',
    };
  }

  function enterCorridor(fromBiomeId: CorridorBiomeId, toBiomeId: CorridorBiomeId): void {
    activeCorridor = createCorridorScene(save, fromBiomeId, toBiomeId);
    currentBiomeDefinition = activeCorridor.definition;
    currentBiome = activeCorridor.instance;
    resetNurseryClaimedEntities();
    const entryPoint = getCorridorEntryPoint(activeCorridor, fromBiomeId);
    applyScenePlayerState(entryPoint.x, entryPoint.y, entryPoint.facing);
    clearInspectSurface();
    dismissFieldPartnerNotice();
    fieldPartnerQuietTimer = 0;
    fieldPartnerGlobalCooldownTimer = 0;
    fieldPartnerPendingTrigger = null;
    fieldPartnerNoticesThisVisit = 0;
    fieldPartnerLastStateKey = null;
    fieldPartnerContextKey = getFieldPartnerContextKey();
    worldMapState = createWorldMapState(
      ecoWorldMap,
      getWorldMapLocationByBiomeId(ecoWorldMap, fromBiomeId).id,
    );
    mapOriginBiomeId = fromBiomeId;
    startFieldPartnerQuiet(FIELD_PARTNER_BIOME_ENTER_QUIET_SECONDS);
  }

  function openWorldMapDirect(targetBiomeId: string | null = null): void {
    const defaultFocusedLocationId =
      targetBiomeId
        ? getWorldMapLocationByBiomeId(ecoWorldMap, targetBiomeId).id
        : sceneMode === 'world-map'
          ? worldMapState.currentLocationId
          : getWorldMapLocationByBiomeId(ecoWorldMap, getContextBiomeId()).id;
    const focusedLocationId =
      targetBiomeId ? defaultFocusedLocationId : getPreferredWorldMapFocusLocationId(defaultFocusedLocationId);

    if (sceneMode === 'world-map') {
      worldMapState.focusedLocationId = focusedLocationId;
      overlayMode = 'playing';
      clearInspectSurface();
      startFieldPartnerQuiet();
      return;
    }

    const biomeId = getContextBiomeId();
    const returnAnchor = !activeCorridor ? getPreferredMapReturnAnchor(biomeId) : null;
    if (returnAnchor) {
      startWorldMapExitTransition(returnAnchor, focusedLocationId);
      return;
    }

    activeCorridor = null;
    resetNurseryClaimedEntities();
    currentBiomeDefinition = biomeRegistry[biomeId as keyof typeof biomeRegistry];
    currentBiome = generateBiomeInstance(
      currentBiomeDefinition,
      save,
      save.biomeVisits[biomeId] ?? 1,
    );
    worldMapState = createWorldMapState(
      ecoWorldMap,
      getWorldMapLocationByBiomeId(ecoWorldMap, biomeId).id,
      focusedLocationId,
    );
    mapOriginBiomeId = biomeId;
    mapReturnAnchor = getPreferredMapReturnAnchor(biomeId);
    sceneMode = 'world-map';
    overlayMode = 'playing';
    clearInspectSurface();
    startFieldPartnerQuiet();
    maybeShowWorldMapFieldSeasonNotice();
  }

  function isInInspectRange(entity: BiomeEntity): boolean {
    return (
      distanceBetween(
        player.x + PLAYER_WIDTH / 2,
        player.y + PLAYER_HEIGHT / 2,
        entity.x + entity.w / 2,
        entity.y + entity.h / 2,
      ) <= INSPECT_RANGE
    );
  }

  function isNearBiomeDoor(): boolean {
    return getNearestBiomeDoor() !== null;
  }

  function isNearTravelInteractable(): boolean {
    return getNearestTravelInteractable() !== null;
  }

  function getTravelTargetAtPoint(worldX: number, worldY: number): TravelInteractable | null {
    if (activeCorridor) {
      return null;
    }

    for (const target of getCurrentTravelInteractables()) {
      const { anchor } = target;
      const contains =
        worldX >= anchor.x &&
        worldX <= anchor.x + 8 &&
        worldY >= anchor.y &&
        worldY <= anchor.y + 12;

      if (contains) {
        const nearestTarget = getNearestTravelInteractable();
        return nearestTarget && isSameTravelInteractable(nearestTarget, target) ? target : null;
      }
    }

    return null;
  }

  function activateTravelTarget(
    target: TravelInteractable | null = getNearestTravelInteractable(),
  ): void {
    if (!target) {
      return;
    }

    if (
      target.kind === 'corridor' &&
      target.targetBiomeId &&
      isCorridorConnectedBiomeId(currentBiomeDefinition.id) &&
      isCorridorConnectedBiomeId(target.targetBiomeId)
    ) {
      enterCorridor(currentBiomeDefinition.id, target.targetBiomeId);
      return;
    }

    if (target.kind === 'map-return') {
      startWorldMapExitTransition(target.anchor);
    }
  }

  function updateCorridorOwnership(): void {
    if (!activeCorridor) {
      return;
    }

    const nextOwnerBiomeId = resolveCorridorOwnerBiomeId(
      activeCorridor,
      player.x + PLAYER_WIDTH / 2,
    );
    if (nextOwnerBiomeId === activeCorridor.ownerBiomeId) {
      return;
    }

    activeCorridor.ownerBiomeId = nextOwnerBiomeId;
  }

  function maybeExitCorridor(): void {
    if (!activeCorridor) {
      return;
    }

    const exitBiomeId = getCorridorExitBiomeId(activeCorridor, player.x + PLAYER_WIDTH / 2);
    if (!exitBiomeId) {
      return;
    }

    const arrivalFoot = getCorridorArrivalFoot(
      exitBiomeId,
      exitBiomeId === activeCorridor.leftBiomeId
        ? activeCorridor.rightBiomeId
        : activeCorridor.leftBiomeId,
    );
    const shouldCountVisit = exitBiomeId !== activeCorridor.entryBiomeId;
    loadBiomeScene(exitBiomeId, {
      countVisit: shouldCountVisit,
      playerFoot: arrivalFoot,
    });
  }

  function inspectEntity(entityId: string): FactBubblePayload | null {
    const entity = currentBiome.entities.find((candidate) => candidate.entityId === entityId && !candidate.removed);
    if (!entity) {
      return null;
    }

    const entry = currentBiomeDefinition.entries[entity.entryId];
    const entityZoneId = getBiomeZoneForPlayerX(currentBiomeDefinition, entity.x + entity.w / 2)?.id ?? null;
    const detail = getInspectableDetail(entry);
    const isNewEntry = recordDiscovery(save, entry, getContextBiomeId());
    const nurseryGathering = tryClaimNurseryGathering(save, entry, entity.entityId, claimedNurseryEntityIds);
    const resourceNote = getInspectBubbleResourceNote(
      getFieldRequestController(),
      entry.id,
      entityZoneId,
      nurseryGathering?.note ?? null,
    );
    entity.removed = entity.collectible;
    persistSave(save);
    setSelectedJournalEntry(true);
    const notebookReadyNoticeShown = maybeCompleteActiveFieldRequest('inspect', entry.id, entityZoneId);

    const payload: FactBubblePayload = {
      entryId: entry.id,
      title: entry.commonName,
      detailLabel: detail.label,
      detailText: detail.text,
      fact: entry.shortFact,
      journalText: entry.journalText,
      category: entry.category,
      collectible: entry.collectible,
      isNewEntry,
      closeLookAvailable: Boolean(buildCloseLookPayload(entry)),
      resourceNote: resourceNote ?? undefined,
      x: entity.x + entity.w / 2,
      y: entity.y,
    };

    bubble = payload;
    bubbleTimer = 6;
    audio.playUiCue('inspect-reveal');
    if (isNewEntry) {
      queueFieldPartnerTrigger('discovery', entry.id);
    }
    if (nurseryGathering && !notebookReadyNoticeShown) {
      showFieldNotice('NURSERY SUPPLY', nurseryGathering.note, 1.9);
    }
    return payload;
  }

  function getNearestInspectable(): BiomeEntity | null {
    return getInspectTargetProjection().inspectTargetSelection?.nearestInspectable ?? null;
  }

  function getEntityAtPoint(worldX: number, worldY: number): BiomeEntity | null {
    for (let index = currentBiome.entities.length - 1; index >= 0; index -= 1) {
      const entity = currentBiome.entities[index];
      if (entity.removed) {
        continue;
      }

      const contains =
        worldX >= entity.x &&
        worldX <= entity.x + entity.w &&
        worldY >= entity.y &&
        worldY <= entity.y + entity.h;

      if (contains && isInInspectRange(entity)) {
        return entity;
      }
    }

    return null;
  }

  function changeJournalSelection(direction: number): void {
    const discovered = getDiscoveredEntriesList(selectedJournalBiomeId);
    if (!discovered.length) {
      return;
    }

    const currentIndex = discovered.findIndex((entry) => entry.id === selectedJournalEntryId);
    const nextIndex = currentIndex === -1 ? 0 : clamp(currentIndex + direction, 0, discovered.length - 1);
    setSelectedJournalEntryId(discovered[nextIndex].id);
  }

  function toggleFullscreen(): void {
    if (document.fullscreenElement) {
      if (typeof document.exitFullscreen === 'function') {
        void document.exitFullscreen();
      }
      save.settings.fullscreen = false;
    } else {
      if (typeof canvas.requestFullscreen === 'function') {
        void canvas.requestFullscreen();
      }
      save.settings.fullscreen = true;
    }
    persistSave(save);
  }

  function startPlaying(): void {
    const startedFromTitle = overlayMode === 'title';
    if (overlayMode === 'title') {
      audio.playUiCue('confirm');
    } else if (overlayMode === 'journal') {
      audio.playUiCue('journal-toggle');
    }
    journalComparisonOpen = false;
    journalSketchbookOpen = false;
    selectedSketchbookSlotId = null;
    overlayMode = 'playing';
    startFieldPartnerQuiet();
    if (startedFromTitle) {
      maybeShowStarterFieldSeasonNotice();
      maybeShowRouteReplayNoticeOnBiomeEnter(getContextBiomeId());
    }
  }

  function toggleJournalComparison(): boolean {
    if (!getJournalComparison()) {
      journalComparisonOpen = false;
      return false;
    }

    journalComparisonOpen = !journalComparisonOpen;
    return true;
  }

  function showFieldGuideNotice(state: FieldGuideNoticeState): void {
    startFieldPartnerQuiet();
    fieldGuideNotice = state;
    fieldGuideNoticeTimer = state === 'copied' ? 2.4 : 3.4;
  }

  function resetAdventure(): void {
    resetSaveProgress(save);
    sceneMode = 'biome';
    transitionState = null;
    clearInspectSurface();
    fieldGuideNotice = null;
    fieldGuideNoticeTimer = 0;
    fieldRequestNotice = null;
    fieldRequestNoticeTimer = 0;
    dismissFieldPartnerNotice();
    fieldPartnerQuietTimer = 0;
    fieldPartnerGlobalCooldownTimer = 0;
    fieldPartnerPendingTrigger = null;
    fieldPartnerNoticesThisVisit = 0;
    fieldPartnerLastStateKey = null;
    fieldPartnerContextKey = '';
    selectedJournalBiomeId = 'beach';
    setSelectedJournalEntryId(null);
    journalSketchbookOpen = false;
    selectedSketchbookSlotId = null;
    menuReturnMode = 'title';
    selectedMenuActionId = 'toggle-fullscreen';
    selectedFieldStationUpgradeId = null;
    selectedFieldStationView = 'season';
    selectedNurseryCardId = 'bench';
    selectedNurseryProjectId = null;
    resetNurseryClaimedEntities();
    showResetConfirmation = false;
    guidedStarterNoticeShown = false;
    guidedStationNoticeShown = false;
    guidedSeasonCapstoneNoticeShown = false;
    guidedSeasonCloseReturnNoticeShown = false;
    guidedNextStopNoticeShown = false;
    enterBiome('beach');
    setSelectedJournalEntry(true);
    overlayMode = 'title';
    persistSave(save);
  }

  async function activateFieldGuideFromMenu(): Promise<void> {
    if (!canUseFieldGuideFromMenu()) {
      return;
    }

    try {
      const observationPrompt = getFieldGuideObservationPrompt();
      const context = buildFieldGuideContext(
        getContextBiomeDefinition(),
        currentBiome,
        save,
        player.x,
        player.y,
        undefined,
        getWorldState(),
        observationPrompt,
      );
      const prompt = buildFieldGuidePrompt(context);

      closeMenu();
      const copied = await copyTextToClipboard(prompt);
      showFieldGuideNotice(copied ? 'copied' : 'failed');
    } catch {
      closeMenu();
      showFieldGuideNotice('failed');
    }
  }

  function activateMenuAction(actionId: MenuActionId): void {
    switch (actionId) {
      case 'world-map':
        audio.playUiCue('confirm');
        closeMenu();
        openWorldMapDirect();
        break;
      case 'field-station':
        audio.playUiCue('confirm');
        closeMenu();
        openFieldStation();
        break;
      case 'field-guide':
        audio.playUiCue('confirm');
        void activateFieldGuideFromMenu();
        break;
      case 'toggle-fullscreen':
        audio.playUiCue('confirm');
        toggleFullscreen();
        break;
      case 'toggle-sound':
        save.settings.soundEnabled = !save.settings.soundEnabled;
        persistSave(save);
        audio.setSoundEnabled(save.settings.soundEnabled);
        break;
      case 'toggle-inspect-hints':
        audio.playUiCue('confirm');
        save.settings.showInspectHints = !save.settings.showInspectHints;
        persistSave(save);
        break;
      case 'reset-save':
        audio.playUiCue('confirm');
        showResetConfirmation = true;
        selectedMenuActionId = 'cancel-reset';
        break;
      case 'cancel-reset':
        audio.playUiCue('confirm');
        showResetConfirmation = false;
        selectedMenuActionId = 'reset-save';
        break;
      case 'confirm-reset':
        audio.playUiCue('confirm');
        resetAdventure();
        break;
      case 'close-menu':
        audio.playUiCue('confirm');
        closeMenu();
        break;
      default:
        closeMenu();
        break;
    }
  }

  function startWorldMapExitTransition(
    sourceAnchor: DoorAnchor | null = null,
    focusedLocationId: string | null = null,
  ): void {
    const biomeId = getContextBiomeId();
    const location = getWorldMapLocationByBiomeId(ecoWorldMap, biomeId);
    const returnAnchor = sourceAnchor ?? getPreferredMapReturnAnchor(biomeId);
    worldMapState = createWorldMapState(ecoWorldMap, location.id, focusedLocationId ?? location.id);
    mapOriginBiomeId = biomeId;
    mapReturnAnchor = returnAnchor;

    const plan = createDoorTransitionPlan(ecoWorldMap, biomeId, biomeId, {
      fromBiomeDoor: returnAnchor ?? undefined,
    });
    transitionState = {
      kind: 'biome-to-map',
      plan,
      startElapsed: 0,
      elapsed: 0,
      endElapsed: getPhaseTime(plan, 'map-emerge', 'end'),
    };
    sceneMode = 'transition';
    clearInspectSurface();
    startFieldPartnerQuiet();
  }

  function startBiomeEntryTransition(targetBiomeId: string): void {
    const destinationDoor =
      targetBiomeId === mapOriginBiomeId ? mapReturnAnchor ?? undefined : undefined;
    const plan = createDoorTransitionPlan(ecoWorldMap, mapOriginBiomeId, targetBiomeId, {
      toBiomeDoor: destinationDoor,
    });
    mapReturnAnchor = null;
    const mapEnterStart = getPhaseTime(plan, 'map-enter', 'start');

    enterBiome(targetBiomeId);
    transitionState = {
      kind: 'map-to-biome',
      plan,
      startElapsed: mapEnterStart,
      elapsed: 0,
      endElapsed: plan.totalDuration,
    };
    sceneMode = 'transition';
    clearInspectSurface();
    startFieldPartnerQuiet();
  }

  function updateTitleState(): void {
    const click = input.consumeClick();
    if (click) {
      const hit = getHitTargetAt(titleHitTargets, click);
      if (hit?.id === 'open-menu') {
        openMenu('title');
        return;
      }

      startPlaying();
      return;
    }

    if (input.consumePressed('m') || input.consumePressed('M')) {
      openMenu('title');
      return;
    }

    if (
      input.consumePressed('Enter') ||
      input.consumePressed('e') ||
      input.consumePressed('E') ||
      input.consumePressed(' ') ||
      input.consumePressed('Space')
    ) {
      startPlaying();
    }
  }

  function updateJournalState(): void {
    const click = input.consumeClick();
    if (input.consumePressed('Escape') || input.consumePressed('j') || input.consumePressed('J')) {
      startPlaying();
      return;
    }

    if (
      input.consumePressed('x') ||
      input.consumePressed('X')
    ) {
      if (toggleJournalSketchbook()) {
        return;
      }
    }

    if (input.consumePressed('ArrowLeft') || input.consumePressed('a') || input.consumePressed('A')) {
      if (journalSketchbookOpen) {
        changeSelectedSketchbookSlot(-1);
      } else {
        changeJournalBiome(-1);
      }
    }

    if (input.consumePressed('ArrowRight') || input.consumePressed('d') || input.consumePressed('D')) {
      if (journalSketchbookOpen) {
        changeSelectedSketchbookSlot(1);
      } else {
        changeJournalBiome(1);
      }
    }

    if (input.consumePressed('ArrowDown') || input.consumePressed('s') || input.consumePressed('S')) {
      changeJournalSelection(1);
    }

    if (input.consumePressed('ArrowUp') || input.consumePressed('w') || input.consumePressed('W')) {
      changeJournalSelection(-1);
    }

    if (
      input.consumePressed('Enter') ||
      input.consumePressed('e') ||
      input.consumePressed('E') ||
      input.consumePressed(' ') ||
      input.consumePressed('Space')
    ) {
      if (journalSketchbookOpen) {
        if (placeSelectedJournalEntryInSketchbook()) {
          return;
        }
      } else if (toggleJournalComparison()) {
        return;
      }
    }

    if (
      input.consumePressed('Backspace') ||
      input.consumePressed('Delete')
    ) {
      if (clearSelectedJournalSketchbookSlot()) {
        return;
      }
    }

    if (input.consumePressed('c') || input.consumePressed('C')) {
      if (!journalSketchbookOpen && toggleJournalComparison()) {
        return;
      }
    }

    if (click) {
      const biomeHit = journalBiomeHitTargets.find(
        (target) =>
          click.x >= target.x &&
          click.x <= target.x + target.w &&
          click.y >= target.y &&
          click.y <= target.y + target.h,
      );

      if (biomeHit) {
        setSelectedJournalBiome(biomeHit.biomeId, true);
        return;
      }

      const hit = journalHitTargets.find(
        (target) =>
          click.x >= target.x &&
          click.x <= target.x + target.w &&
          click.y >= target.y &&
          click.y <= target.y + target.h,
      );

      if (hit) {
        setSelectedJournalEntryId(hit.entryId);
        return;
      }

      const sketchSlotHit = journalSketchSlotHitTargets.find(
        (target) =>
          click.x >= target.x &&
          click.x <= target.x + target.w &&
          click.y >= target.y &&
          click.y <= target.y + target.h,
      );

      if (sketchSlotHit) {
        selectedSketchbookSlotId = sketchSlotHit.slotId;
        return;
      }

      const scrollHit = journalScrollHitTargets.find(
        (target) =>
          click.x >= target.x &&
          click.x <= target.x + target.w &&
          click.y >= target.y &&
          click.y <= target.y + target.h,
      );

      if (scrollHit) {
        changeJournalSelection(scrollHit.direction);
        return;
      }

      const actionHit = journalActionHitTargets.find(
        (target) =>
          click.x >= target.x &&
          click.x <= target.x + target.w &&
          click.y >= target.y &&
          click.y <= target.y + target.h,
      );

      if (!actionHit) {
        return;
      }

      if (actionHit.id === 'toggle-comparison') {
        toggleJournalComparison();
        return;
      }

      if (actionHit.id === 'toggle-sketchbook') {
        toggleJournalSketchbook();
        return;
      }

      if (actionHit.id === 'place-sketch-entry') {
        placeSelectedJournalEntryInSketchbook();
        return;
      }

      if (actionHit.id === 'clear-sketch-slot') {
        clearSelectedJournalSketchbookSlot();
      }
    }
  }

  function changeFieldStationSelection(direction: number): void {
    const upgrades = getFieldUpgradeStates(save);
    if (!upgrades.length) {
      selectedFieldStationUpgradeId = null;
      outingSupportSelected = true;
      return;
    }

    const currentUpgradeId = getSelectedFieldUpgradeId(save, selectedFieldStationUpgradeId);
    const currentIndex = outingSupportSelected
      ? 0
      : Math.max(1, upgrades.findIndex((upgrade) => upgrade.id === currentUpgradeId) + 1);
    const nextIndex = (currentIndex + direction + upgrades.length + 1) % (upgrades.length + 1);

    if (nextIndex === 0) {
      outingSupportSelected = true;
      return;
    }

    outingSupportSelected = false;
    selectedFieldStationUpgradeId = upgrades[nextIndex - 1].id;
  }

  type FieldStationSurface = 'season-routes' | 'season-expedition' | 'nursery';

  function getFieldStationSurface(): FieldStationSurface {
    if (selectedFieldStationView === 'nursery') {
      return 'nursery';
    }

    return selectedFieldStationSeasonPage === 'expedition' ? 'season-expedition' : 'season-routes';
  }

  function setFieldStationSurface(surface: FieldStationSurface): void {
    if (surface === 'nursery') {
      selectedFieldStationView = 'nursery';
      selectedFieldStationSeasonPage = 'routes';
      outingSupportSelected = false;
      selectedNurseryProjectId = getSelectedNurseryProjectId(save, selectedNurseryProjectId);
      return;
    }

    selectedFieldStationView = 'season';
    selectedFieldStationSeasonPage = surface === 'season-expedition' ? 'expedition' : 'routes';
    if (selectedFieldStationSeasonPage === 'routes') {
      outingSupportSelected = false;
      selectedFieldStationUpgradeId = getSelectedFieldUpgradeId(save, selectedFieldStationUpgradeId);
    }
  }

  function changeFieldStationSurface(direction: number): void {
    const order: FieldStationSurface[] = ['season-routes', 'season-expedition', 'nursery'];
    const currentSurface = getFieldStationSurface();
    const currentIndex = order.indexOf(currentSurface);
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex = (safeIndex + direction + order.length) % order.length;
    setFieldStationSurface(order[nextIndex]);
    audio.playUiCue('menu-move');
  }

  function changeNurseryCardSelection(direction: number): void {
    const order: NurseryCardId[] = ['bench', 'compost', 'bed'];
    const currentIndex = order.indexOf(selectedNurseryCardId);
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex = (safeIndex + direction + order.length) % order.length;
    selectedNurseryCardId = order[nextIndex];
    audio.playUiCue('menu-move');
  }

  function activateNurseryCard(): void {
    const routeBoard = resolveFieldSeasonBoardState(biomeRegistry, save);
    const nurseryState = resolveNurseryStateView(
      save,
      routeBoard,
      selectedNurseryProjectId,
      selectedNurseryCardId,
    );

    if (selectedNurseryCardId === 'bench') {
      const nextProjectId = getNextNurseryProjectId(save, selectedNurseryProjectId, 1);
      if (!nextProjectId) {
        showFieldNotice('NURSERY LOCKED', 'Log more route clues before starting a nursery bed.', 2.6);
        return;
      }

      selectedNurseryProjectId = nextProjectId;
      audio.playUiCue('menu-move');
      return;
    }

    if (selectedNurseryCardId === 'compost') {
      showFieldNotice(
        'COMPOST HEAP',
        nurseryState.utilityNote ?? `The heap can finish ${nurseryState.compostRate} litter each route step.`,
        2.4,
      );
      audio.playUiCue('confirm');
      return;
    }

    if (nurseryState.activeProject?.state.stage === 'mature') {
      if (clearNurseryTeachingBed(save)) {
        persistSave(save);
        showFieldNotice('BED CLEARED', 'The teaching bed is ready for a new nursery project.', 2.4);
        audio.playUiCue('confirm');
      }
      return;
    }

    const projectId = nurseryState.selectedProjectId;
    if (!projectId || !nurseryState.selectedProject?.unlocked) {
      showFieldNotice('NURSERY LOCKED', 'Bring back more route clues before planting this bed.', 2.6);
      return;
    }

    if (!nurseryState.selectedProject.affordable) {
      showFieldNotice('NEED SUPPLIES', 'This bed still needs seed-stock or cuttings from the field.', 2.6);
      return;
    }

    if (startNurseryProject(save, projectId)) {
      persistSave(save);
      showFieldNotice('BED STARTED', nurseryState.selectedProject.definition.title, 2.2);
      audio.playUiCue('confirm');
    }
  }

  function activateExpeditionCard(): void {
    const expedition = resolveFieldSeasonExpeditionState(save);
    const expeditionRequest = getActiveFieldRequest();
    const nextFieldSeasonTargetBiomeId = resolveNextFieldSeasonTargetBiomeId(save);
    const currentExpeditionTask =
      expeditionRequest && expeditionRequest.id.startsWith('forest-expedition-')
        ? expeditionRequest
        : null;
    if (!currentExpeditionTask && expedition.status === 'logged' && nextFieldSeasonTargetBiomeId) {
      audio.playUiCue('confirm');
      openWorldMapDirect(nextFieldSeasonTargetBiomeId);
      return;
    }
    const title = currentExpeditionTask
      ? currentExpeditionTask.title.toUpperCase()
      : expedition.status === 'locked'
        ? 'EXPEDITION LOCKED'
        : expedition.status === 'ready'
          ? 'EXPEDITION READY'
          : expedition.status === 'active'
            ? 'EXPEDITION OPEN'
            : 'EXPEDITION LOGGED';
    const text =
      expedition.status === 'locked'
        ? expedition.note
        : currentExpeditionTask
          ? currentExpeditionTask.summary
          : `${expedition.summary} Start: ${expedition.startText}.`;

    showFieldNotice(title, text, 2.8);
    audio.playUiCue('confirm');
  }

  function toggleOutingSupport(): void {
    const nextSupportId = cycleSelectedOutingSupportId(save);
    persistSave(save);

    showFieldNotice('OUTING SUPPORT', getOutingSupportNoticeText(nextSupportId), 2.6);

    audio.playUiCue('confirm');
  }

  function updateFieldStationState(): void {
    selectedFieldStationUpgradeId = getSelectedFieldUpgradeId(save, selectedFieldStationUpgradeId);
    selectedNurseryProjectId = getSelectedNurseryProjectId(save, selectedNurseryProjectId);

    if (
      input.consumePressed('Escape') ||
      input.consumePressed('m') ||
      input.consumePressed('M')
    ) {
      closeFieldStation();
      return;
    }

    const moveLeft =
      input.consumePressed('ArrowLeft') || input.consumePressed('a') || input.consumePressed('A');
    const moveRight =
      input.consumePressed('ArrowRight') || input.consumePressed('d') || input.consumePressed('D');
    if (moveLeft || moveRight) {
      changeFieldStationSurface(moveLeft ? -1 : 1);
      return;
    }

    if (selectedFieldStationView === 'season' && selectedFieldStationSeasonPage === 'routes') {
      if (input.consumePressed('ArrowDown') || input.consumePressed('s') || input.consumePressed('S')) {
        changeFieldStationSelection(1);
      }

      if (input.consumePressed('ArrowUp') || input.consumePressed('w') || input.consumePressed('W')) {
        changeFieldStationSelection(-1);
      }
    } else {
      if (input.consumePressed('ArrowDown') || input.consumePressed('s') || input.consumePressed('S')) {
        changeNurseryCardSelection(1);
      }

      if (input.consumePressed('ArrowUp') || input.consumePressed('w') || input.consumePressed('W')) {
        changeNurseryCardSelection(-1);
      }
    }

    if (
      input.consumePressed('Enter') ||
      input.consumePressed('e') ||
      input.consumePressed('E') ||
      input.consumePressed(' ') ||
      input.consumePressed('Space')
    ) {
      if (selectedFieldStationView === 'season') {
        if (selectedFieldStationSeasonPage === 'routes') {
          const filedRouteNoteText = save.routeV2Progress
            ? resolveRouteV2FiledDisplayText(biomeRegistry, save, save.routeV2Progress.requestId)
            : null;
          const filedRequestId = fileReadyRouteV2FieldRequest(save);
          if (filedRequestId) {
            persistSave(save);
            showFieldRequestNotice(filedRequestId, filedRouteNoteText);
          } else if (outingSupportSelected) {
            toggleOutingSupport();
          } else if (selectedFieldStationUpgradeId && purchaseFieldUpgrade(save, selectedFieldStationUpgradeId)) {
            persistSave(save);
            selectedFieldStationUpgradeId = getSelectedFieldUpgradeId(save, selectedFieldStationUpgradeId);
          }
        } else {
          const expeditionReadyToFile =
            save.routeV2Progress?.status === 'ready-to-synthesize'
            && save.routeV2Progress.requestId.startsWith('forest-expedition-');
          if (expeditionReadyToFile) {
            const filedRouteNoteText = resolveRouteV2FiledDisplayText(
              biomeRegistry,
              save,
              save.routeV2Progress!.requestId,
            );
            const filedRequestId = fileReadyRouteV2FieldRequest(save);
            if (filedRequestId) {
              persistSave(save);
              showFieldRequestNotice(filedRequestId, filedRouteNoteText);
            }
          } else {
            activateExpeditionCard();
          }
        }
      } else {
        activateNurseryCard();
      }
    }
  }

  function updateMenuState(): void {
    ensureMenuSelection();

    if (showResetConfirmation) {
      if (input.consumePressed('Escape')) {
        activateMenuAction('cancel-reset');
        return;
      }

      if (
        input.consumePressed('ArrowLeft') ||
        input.consumePressed('ArrowRight') ||
        input.consumePressed('ArrowUp') ||
        input.consumePressed('ArrowDown') ||
        input.consumePressed('a') ||
        input.consumePressed('A') ||
        input.consumePressed('d') ||
        input.consumePressed('D') ||
        input.consumePressed('w') ||
        input.consumePressed('W') ||
        input.consumePressed('s') ||
        input.consumePressed('S')
      ) {
        selectedMenuActionId =
          selectedMenuActionId === 'confirm-reset' ? 'cancel-reset' : 'confirm-reset';
      }
    } else {
      if (input.consumePressed('Escape')) {
        closeMenu();
        return;
      }

      if (input.consumePressed('ArrowDown') || input.consumePressed('s') || input.consumePressed('S')) {
        moveMenuSelection(1);
      }

      if (input.consumePressed('ArrowUp') || input.consumePressed('w') || input.consumePressed('W')) {
        moveMenuSelection(-1);
      }
    }

    if (
      input.consumePressed('Enter') ||
      input.consumePressed('e') ||
      input.consumePressed('E') ||
      input.consumePressed(' ') ||
      input.consumePressed('Space')
    ) {
      activateMenuAction(selectedMenuActionId);
      return;
    }

    const click = input.consumeClick();
    if (!click) {
      return;
    }

    const hit = getHitTargetAt(menuHitTargets, click);
    if (!hit) {
      return;
    }

    selectedMenuActionId = hit.id as MenuActionId;
    activateMenuAction(hit.id as MenuActionId);
  }

  function updateCloseLookState(): void {
    if (
      input.consumePressed('Escape') ||
      input.consumePressed('Enter') ||
      input.consumePressed('e') ||
      input.consumePressed('E') ||
      input.consumePressed(' ') ||
      input.consumePressed('Space')
    ) {
      closeCloseLook();
      return;
    }

    const click = input.consumeClick();
    if (!click) {
      return;
    }

    if (getHitTargetAt(closeLookHitTargets, click)?.id === 'close-close-look') {
      closeCloseLook();
    }
  }

  function updateTransitionState(dt: number): void {
    if (!transitionState) {
      return;
    }

    const remainingDuration = Math.max(0, transitionState.endElapsed - transitionState.startElapsed);
    transitionState.elapsed = clamp(transitionState.elapsed + dt, 0, remainingDuration);

    if (transitionState.startElapsed + transitionState.elapsed < transitionState.endElapsed) {
      return;
    }

    const finalSnapshot = sampleDoorTransition(
      ecoWorldMap,
      transitionState.plan,
      transitionState.endElapsed,
    );
    const finishedKind = transitionState.kind;
    transitionState = null;
    clearInspectSurface();
    startFieldPartnerQuiet();

    if (finishedKind === 'biome-to-map') {
      sceneMode = 'world-map';
      maybeShowWorldMapFieldSeasonNotice();
      return;
    }

    if (finalSnapshot.avatar?.space === 'biome') {
      setPlayerFromFootPosition(
        finalSnapshot.avatar.x,
        finalSnapshot.avatar.y,
        finalSnapshot.avatar.facing,
      );
    }

    sceneMode = 'biome';
  }

  function updateWorldMapScene(dt: number): void {
    const click = input.consumeClick();
    if (click && getHitTargetAt(hudHitTargets, click)?.id === 'open-menu') {
      openMenu('playing');
      return;
    }

    if (input.consumePressed('Escape')) {
      startBiomeEntryTransition(mapOriginBiomeId);
      return;
    }

    if (worldMapState.mode === 'walking') {
      const result = stepWorldMapState(ecoWorldMap, worldMapState, dt);
      if (result.arrived && result.locationId) {
        const target = getWorldMapLocation(ecoWorldMap, result.locationId);
        startBiomeEntryTransition(target.biomeId);
      }
      return;
    }

    if (input.consumePressed('ArrowLeft') || input.consumePressed('a') || input.consumePressed('A')) {
      moveWorldMapFocus(ecoWorldMap, worldMapState, 'left');
    }

    if (input.consumePressed('ArrowRight') || input.consumePressed('d') || input.consumePressed('D')) {
      moveWorldMapFocus(ecoWorldMap, worldMapState, 'right');
    }

    if (input.consumePressed('ArrowUp') || input.consumePressed('w') || input.consumePressed('W')) {
      moveWorldMapFocus(ecoWorldMap, worldMapState, 'up');
    }

    if (input.consumePressed('ArrowDown') || input.consumePressed('s') || input.consumePressed('S')) {
      moveWorldMapFocus(ecoWorldMap, worldMapState, 'down');
    }

    if (
      input.consumePressed('Enter') ||
      input.consumePressed('e') ||
      input.consumePressed('E') ||
      input.consumePressed(' ')
    ) {
      const focusedLocation = getWorldMapLocation(ecoWorldMap, worldMapState.focusedLocationId);
      if (focusedLocation.id === worldMapState.currentLocationId) {
        startBiomeEntryTransition(focusedLocation.biomeId);
        return;
      }

      beginWorldMapWalk(ecoWorldMap, worldMapState, focusedLocation.id);
    }
  }

  function updateBiomeScene(dt: number): void {
    if (input.consumePressed('Escape')) {
      clearInspectSurface();
      startFieldPartnerQuiet();
    }

    const moveLeft = input.isDown('ArrowLeft') || input.isDown('a') || input.isDown('A');
    const moveRight = input.isDown('ArrowRight') || input.isDown('d') || input.isDown('D');
    const moveUp = input.isDown('ArrowUp') || input.isDown('w') || input.isDown('W');
    const moveDown = input.isDown('ArrowDown') || input.isDown('s') || input.isDown('S');
    const jumpPressed = input.consumePressed(' ') || input.consumePressed('Space');
    let handledClimbing = false;

    if (!player.climbing && (moveUp || moveDown)) {
      const climbable = getReachableClimbable();
      if (climbable) {
        player.climbing = true;
        player.activeClimbableId = climbable.id;
        player.vx = 0;
        player.vy = 0;
        player.onGround = false;
        alignPlayerToClimbable(climbable);
      }
    }

    if (player.climbing) {
      const climbable = getClimbableById(player.activeClimbableId) ?? getReachableClimbable();
      if (!climbable) {
        stopClimbing();
      } else if (moveLeft !== moveRight) {
        stopClimbing();
        const walkSpeed = getWalkSpeed(save) * 0.72;
        player.vx = moveLeft ? -walkSpeed : walkSpeed;
        player.facing = moveLeft ? 'left' : 'right';
      } else {
        handledClimbing = true;
        player.activeClimbableId = climbable.id;
        alignPlayerToClimbable(climbable);
        player.vx = 0;
        if (moveUp === moveDown) {
          player.vy = 0;
        } else {
          player.vy = moveUp ? -40 : 40;
        }
        const maxClimbY = Math.min(
          climbable.y + climbable.h - PLAYER_HEIGHT,
          getGroundYAt(climbable.x + climbable.w / 2) - PLAYER_HEIGHT,
        );
        player.y = clamp(player.y + player.vy * dt, climbable.topExitY, maxClimbY);
        player.onGround = false;
      }
    }

    if (!handledClimbing) {
      player.vx = 0;
      if (moveLeft !== moveRight) {
        const walkSpeed = getWalkSpeed(save);
        player.vx = moveLeft ? -walkSpeed : walkSpeed;
        player.facing = moveLeft ? 'left' : 'right';
      }

      if (jumpPressed && player.onGround) {
        player.vy = -getJumpSpeed(save);
        player.onGround = false;
      }

      const previousBottom = player.y + PLAYER_HEIGHT;
      player.x = clamp(player.x + player.vx * dt, 0, currentBiome.width - PLAYER_WIDTH);
      player.vy += GRAVITY * dt;
      player.y += player.vy * dt;

      const centerX = player.x + PLAYER_WIDTH / 2;
      const nextBottom = player.y + PLAYER_HEIGHT;
      const platform = getSupportingPlatform(centerX, previousBottom, nextBottom);
      const groundY = getGroundYAt(centerX);
      let supportY = groundY;

      if (platform) {
        supportY = Math.min(supportY, platform.y);
      }

      if (nextBottom >= supportY) {
        player.y = supportY - PLAYER_HEIGHT;
        player.vy = 0;
        player.onGround = true;
      } else {
        player.onGround = false;
      }

      if (player.climbing && !getReachableClimbable()) {
        stopClimbing();
      }
    }

    syncBiomeCamera();

    if (activeCorridor) {
      updateCorridorOwnership();
      maybeExitCorridor();
      if (!activeCorridor) {
        return;
      }
    }

    maybeCompleteActiveFieldRequest('zone');

    if (bubble) {
      bubbleTimer -= dt;
      if (bubbleTimer <= 0) {
        clearInspectSurface();
        startFieldPartnerQuiet();
      }
    }

    if (fieldPartnerNotice && (Math.abs(player.vx) > 0 || !player.onGround || Math.abs(player.vy) > 0)) {
      dismissFieldPartnerNotice();
    }

    const inspectPressed = input.consumePressed('e') || input.consumePressed('E');
    const confirmPressed = input.consumePressed('Enter');

    if ((inspectPressed || confirmPressed) && bubble?.closeLookAvailable) {
      openCloseLookFromBubble();
      return;
    }

    if (inspectPressed) {
      if (isNearTravelInteractable()) {
        activateTravelTarget();
        return;
      }

      const nearest = getNearestInspectable();
      if (nearest) {
        inspectEntity(nearest.entityId);
      }
    }

    const click = input.consumeClick();
    if (click) {
      if (bubble && getHitTargetAt(bubbleActionHitTargets, click)?.id === 'open-close-look') {
        openCloseLookFromBubble();
        return;
      }

      if (getHitTargetAt(hudHitTargets, click)?.id === 'open-menu') {
        openMenu('playing');
        return;
      }

      const worldX = click.x + cameraX;
      const worldY = click.y + cameraY;
      const target = getTravelTargetAtPoint(worldX, worldY);
      if (target) {
        activateTravelTarget(target);
        return;
      }

      const hit = getEntityAtPoint(worldX, worldY);
      if (hit) {
        inspectEntity(hit.entityId);
      }
    }
  }

  function updateGameState(dt: number): void {
    syncAudioState();

    if (fieldGuideNotice) {
      fieldGuideNoticeTimer = Math.max(0, fieldGuideNoticeTimer - dt);
      if (fieldGuideNoticeTimer <= 0) {
        fieldGuideNotice = null;
      }
    }

    if (fieldStationArrivalPulseTimer > 0) {
      fieldStationArrivalPulseTimer = Math.max(0, fieldStationArrivalPulseTimer - dt);
    }

    if (fieldRequestNotice) {
      fieldRequestNoticeTimer = Math.max(0, fieldRequestNoticeTimer - dt);
      if (fieldRequestNoticeTimer <= 0) {
        fieldRequestNotice = null;
      }
    }

    if (fieldPartnerQuietTimer > 0) {
      fieldPartnerQuietTimer = Math.max(0, fieldPartnerQuietTimer - dt);
    }

    if (fieldPartnerGlobalCooldownTimer > 0) {
      fieldPartnerGlobalCooldownTimer = Math.max(0, fieldPartnerGlobalCooldownTimer - dt);
    }

    if (fieldPartnerNotice) {
      fieldPartnerNoticeTimer = Math.max(0, fieldPartnerNoticeTimer - dt);
      if (fieldPartnerNoticeTimer <= 0) {
        dismissFieldPartnerNotice();
      }
    }

    if (input.consumePressed('f') || input.consumePressed('F')) {
      toggleFullscreen();
    }

    if (input.consumePressed('m') || input.consumePressed('M')) {
      if (overlayMode === 'menu') {
        closeMenu();
        return;
      }

      if (overlayMode === 'field-station') {
        closeFieldStation();
        return;
      }

      if (overlayMode === 'close-look') {
        closeCloseLook();
        return;
      }

      if (sceneMode !== 'transition' && (overlayMode === 'title' || overlayMode === 'playing')) {
        openMenu(overlayMode);
        return;
      }
    }

    if (overlayMode === 'title') {
      updateTitleState();
      return;
    }

    if (overlayMode === 'journal') {
      updateJournalState();
      return;
    }

    if (overlayMode === 'field-station') {
      updateFieldStationState();
      return;
    }

    if (overlayMode === 'close-look') {
      updateCloseLookState();
      return;
    }

    if (overlayMode === 'menu') {
      updateMenuState();
      return;
    }

    if (sceneMode !== 'transition' && (input.consumePressed('j') || input.consumePressed('J'))) {
      setSelectedJournalBiome(getDefaultJournalBiomeId(), true);
      journalComparisonOpen = false;
      audio.playUiCue('journal-toggle');
      startFieldPartnerQuiet();
      overlayMode = 'journal';
      return;
    }

    switch (sceneMode) {
      case 'world-map':
        updateWorldMapScene(dt);
        break;
      case 'transition':
        updateTransitionState(dt);
        break;
      case 'biome':
      default:
        updateBiomeScene(dt);
        break;
    }

    if (sceneMode === 'biome') {
      const nextContextKey = getFieldPartnerContextKey();
      if (fieldPartnerContextKey && nextContextKey !== fieldPartnerContextKey) {
        fieldPartnerContextKey = nextContextKey;
        queueFieldPartnerTrigger('state-change');
      } else if (!fieldPartnerContextKey) {
        fieldPartnerContextKey = nextContextKey;
      }
    }

    tryShowFieldPartnerNotice();
  }

  function getPlayerAnimationFrame(): number {
    return player.climbing
      ? 1 + (Math.floor(frameCount / 14) % 2) * 2
      : !player.onGround
      ? 2
      : Math.abs(player.vx) > 0
        ? 1 + (Math.floor(frameCount / 10) % 2) * 2
        : 0;
  }

  function render(): void {
    frameCount += 1;
    context.clearRect(0, 0, WIDTH, HEIGHT);
    bubbleActionHitTargets = [];
    closeLookHitTargets = [];

    const worldState = getWorldState();
    const transitionSnapshot = getTransitionSnapshot();
    const inspectTargetProjection = getInspectTargetProjection();

    if (sceneMode === 'world-map') {
      const focusedSurveyState =
        getBiomeSurveyProgress(
          getJournalBiomeProgressList(),
          getWorldMapLocation(ecoWorldMap, worldMapState.focusedLocationId).biomeId,
        )?.state ?? 'none';
      drawWorldMapScene(
        context,
        sprites,
        ecoWorldMap,
        worldMapState,
        frameCount,
        focusedSurveyState,
        getRouteMarkerLocationId(),
        getWorldMapReplayLabel(worldMapState.focusedLocationId),
        getWorldMapOriginLabel(worldMapState.currentLocationId, worldMapState.focusedLocationId),
        getWorldMapSummaryLabel(worldMapState.focusedLocationId),
      );
      drawWorldMapHud({
        context,
        width: WIDTH,
        height: HEIGHT,
        palette: currentBiomeDefinition.palette,
        mapMode: worldMapState.mode,
        walkingLabel:
          worldMapState.mode === 'walking'
            ? getWorldMapApproachLabel(worldMapState.focusedLocationId)
            : null,
      });
    } else if (sceneMode === 'transition' && transitionSnapshot) {
      if (transitionSnapshot.scene === 'world-map') {
        const renderState: WorldMapState = {
          currentLocationId: transitionSnapshot.activeLocationId ?? worldMapState.currentLocationId,
          focusedLocationId: transitionSnapshot.activeLocationId ?? worldMapState.focusedLocationId,
          avatarX: transitionSnapshot.avatar?.x ?? worldMapState.avatarX,
          avatarY: transitionSnapshot.avatar?.y ?? worldMapState.avatarY,
          facing: transitionSnapshot.avatar?.facing ?? worldMapState.facing,
          mode: 'idle',
          activeRoute: null,
        };
        const focusedSurveyState =
          getBiomeSurveyProgress(
            getJournalBiomeProgressList(),
            getWorldMapLocation(ecoWorldMap, renderState.focusedLocationId).biomeId,
          )?.state ?? 'none';
        drawWorldMapScene(
          context,
          sprites,
          ecoWorldMap,
          renderState,
          frameCount,
          focusedSurveyState,
          getRouteMarkerLocationId(),
          getWorldMapReplayLabel(renderState.focusedLocationId),
          getWorldMapOriginLabel(renderState.currentLocationId, renderState.focusedLocationId),
          getWorldMapSummaryLabel(renderState.focusedLocationId),
        );
        drawWorldMapHud({
          context,
          width: WIDTH,
          height: HEIGHT,
          palette: currentBiomeDefinition.palette,
          mapMode: renderState.mode,
          walkingLabel:
            renderState.mode === 'walking'
              ? getWorldMapApproachLabel(renderState.focusedLocationId)
              : null,
        });
      } else {
        const transitionCameraX =
          transitionSnapshot.avatar?.space === 'biome'
            ? clamp(
                transitionSnapshot.avatar.x - WIDTH * CAMERA_X_FOCUS_RATIO,
                0,
                Math.max(0, currentBiome.width - WIDTH),
              )
            : cameraX;
        const transitionCameraY =
          transitionSnapshot.avatar?.space === 'biome'
            ? clamp(
                Math.round(
                  transitionSnapshot.avatar.y + PLAYER_HEIGHT - (HEIGHT - CAMERA_FOOT_PADDING),
                ),
                0,
                Math.max(0, currentBiome.height - HEIGHT),
              )
            : cameraY;

        const transitionDoorOpenAmount =
          transitionSnapshot.phaseId === 'biome-exit' || transitionSnapshot.phaseId === 'fade-out'
            ? transitionSnapshot.sourceDoorOpen
            : transitionSnapshot.destinationDoorOpen;
        drawBiomeScene(
          {
            context,
            width: WIDTH,
            height: HEIGHT,
            sprites,
            biomeDefinition: currentBiomeDefinition,
            biomeInstance: currentBiome,
            doors: [
              {
                anchor: getWorldMapBiomeDoor(),
                openAmount: transitionDoorOpenAmount,
                highlighted: false,
                label: null,
              },
            ],
            cameraX: transitionCameraX,
            cameraY: transitionCameraY,
            frameCount,
            nearestEntityId: null,
            verticalCues: [],
            player: {
              x: player.x,
              y: player.y,
              facing: player.facing,
              animationFrame: getPlayerAnimationFrame(),
              climbing: player.climbing,
            },
            playerHeight: PLAYER_HEIGHT,
            worldState,
            transitionSnapshot,
          },
        );
      }

      drawFade(context, transitionSnapshot.fadeAlpha);
    } else {
      const nearestEntityId =
        save.settings.showInspectHints ? inspectTargetProjection.nearestInspectableEntityId : null;
      const highlightedDoor =
        overlayMode === 'playing' &&
        sceneMode === 'biome' &&
        !activeCorridor &&
        !bubble &&
        save.settings.showInspectHints
          ? getNearestTravelInteractable()
          : null;
      const visibleVerticalCues = getVisibleVerticalCuesForRender();

      drawBiomeScene(
        {
          context,
          width: WIDTH,
          height: HEIGHT,
          sprites,
          biomeDefinition: currentBiomeDefinition,
          biomeInstance: currentBiome,
          doors: getSceneDoors(highlightedDoor),
          cameraX,
          cameraY,
          frameCount,
          nearestEntityId,
          verticalCues: visibleVerticalCues,
          player: {
            x: player.x,
            y: player.y,
            facing: player.facing,
            animationFrame: getPlayerAnimationFrame(),
            climbing: player.climbing,
          },
          playerHeight: PLAYER_HEIGHT,
          worldState,
        },
      );
      bubbleActionHitTargets = drawBubbleOverlay({
        context,
        width: WIDTH,
        height: HEIGHT,
        palette: currentBiomeDefinition.palette,
        bubble,
      });
    }

    hudHitTargets = drawMenuChip({
      context,
      width: WIDTH,
      height: HEIGHT,
      palette: currentBiomeDefinition.palette,
      isVisible: overlayMode === 'playing' && sceneMode !== 'transition',
    });
    drawHabitatChip({
      context,
      width: WIDTH,
      height: HEIGHT,
      palette: currentBiomeDefinition.palette,
      label: getCurrentZoneLabel(),
      isVisible: overlayMode === 'playing' && sceneMode === 'biome',
    });
    const fieldRequestHint = inspectTargetProjection.fieldRequestHint;
    drawFieldRequestHintChip({
      context,
      width: WIDTH,
      height: HEIGHT,
      palette: currentBiomeDefinition.palette,
      title: fieldRequestHint?.title ?? null,
      isVisible: fieldRequestHint !== null,
      variant: fieldRequestHint?.variant ?? 'default',
    });

    if (fieldGuideNotice && overlayMode === 'playing' && sceneMode === 'biome') {
      drawFieldGuideNotice({
        context,
        width: WIDTH,
        height: HEIGHT,
        palette: currentBiomeDefinition.palette,
        state: fieldGuideNotice,
      });
    } else if (fieldRequestNotice && overlayMode === 'playing' && sceneMode !== 'transition') {
      drawFieldRequestNotice({
        context,
        width: WIDTH,
        height: HEIGHT,
        palette: currentBiomeDefinition.palette,
        frameCount,
        title: fieldRequestNotice.title,
        text: fieldRequestNotice.text,
        variant: fieldRequestNotice.variant,
      });
    } else if (fieldPartnerNotice && overlayMode === 'playing' && sceneMode === 'biome') {
      drawFieldPartnerNotice({
        context,
        width: WIDTH,
        height: HEIGHT,
        palette: currentBiomeDefinition.palette,
        notice: fieldPartnerNotice,
      });
    }

    if (overlayMode === 'title') {
      titleHitTargets = drawTitleOverlay({
        context,
        width: WIDTH,
        height: HEIGHT,
        palette: currentBiomeDefinition.palette,
      });
    } else {
      titleHitTargets = [];
    }

    if (overlayMode === 'close-look') {
      closeLookHitTargets = drawCloseLookOverlay({
        context,
        width: WIDTH,
        height: HEIGHT,
        palette: currentBiomeDefinition.palette,
        sprites,
        closeLook,
      });
    }

    if (overlayMode === 'journal') {
      const discoveredEntryIds = getDiscoveredEntryIds(save);
      const biomeProgress = getJournalBiomeProgressList();
      const biomeSurveyProgress = getBiomeSurveyProgressList();
      let selectedBiomeProgress =
        biomeProgress.find((biome) => biome.biomeId === selectedJournalBiomeId) ?? biomeProgress[0];

      if (selectedBiomeProgress.biomeId !== selectedJournalBiomeId) {
        selectedJournalBiomeId = selectedBiomeProgress.biomeId;
        setSelectedJournalEntry(true);
        selectedBiomeProgress = biomeProgress.find((biome) => biome.biomeId === selectedJournalBiomeId) ?? biomeProgress[0];
      }

      setSelectedJournalEntry(true);
      const discoveredEntries = getDiscoveredEntriesList(selectedBiomeProgress.biomeId);
      const selectedEntry = discoveredEntries.find((entry) => entry.id === selectedJournalEntryId) ?? discoveredEntries[0] ?? null;
      const selectedEntryDetailText = selectedEntry ? getInspectableDetail(selectedEntry).text : null;
      const selectedEntrySightings = getJournalEntrySightingBiomeIds(selectedEntry?.id ?? null);
      const selectedBiomeDefinition = biomeRegistry[selectedBiomeProgress.biomeId as keyof typeof biomeRegistry];
      const selectedBiomeDiscoveredEntryIds = discoveredEntries.map((entry) => entry.id);
      const selectedBiomeSurveyState =
        biomeSurveyProgress.find((biome) => biome.biomeId === selectedBiomeProgress.biomeId)?.state ?? 'none';
      const sketchbook = isSketchbookUnlocked(selectedBiomeSurveyState)
        ? getJournalSketchbookPage()
        : null;
      if (!sketchbook) {
        journalSketchbookOpen = false;
        selectedSketchbookSlotId = null;
      }
      const ecosystemNote = resolveEcosystemNoteForEntry(
        selectedBiomeDefinition,
        selectedEntry?.id ?? null,
        selectedBiomeDiscoveredEntryIds,
      );
      const fieldRequest = getJournalFieldRequest();
      const comparison = getJournalComparison(selectedEntry?.id ?? null);
      const observationPrompt = getJournalObservationPrompt(
        selectedBiomeProgress.biomeId,
        selectedEntry?.id ?? null,
        ecosystemNote,
        Boolean(comparison),
      );
      if (!comparison) {
        journalComparisonOpen = false;
      }
      const journalOverlay = drawJournalOverlay({
        context,
        width: WIDTH,
        height: HEIGHT,
        palette: currentBiomeDefinition.palette,
        sprites,
        totalDiscoveredCount: discoveredEntryIds.length,
        biomeProgress,
        selectedBiomeProgress,
        selectedBiomeSurveyState,
        discoveredEntries,
        selectedEntryId: selectedJournalEntryId,
        selectedEntry,
        selectedEntryDetailText,
        selectedEntrySightings,
        ecosystemNote,
        observationPrompt,
        fieldRequest,
        comparison,
        isComparisonOpen: journalComparisonOpen,
        sketchbook,
        isSketchbookOpen: journalSketchbookOpen,
        selectedSketchbookSlotId,
      });
      journalHitTargets = journalOverlay.entryTargets;
      journalScrollHitTargets = journalOverlay.scrollTargets;
      journalBiomeHitTargets = journalOverlay.biomeTargets;
      journalActionHitTargets = journalOverlay.actionTargets;
      journalSketchSlotHitTargets = journalOverlay.sketchSlotTargets;
      journalVisibleEntryIds = journalOverlay.visibleEntryIds;
      journalCanScrollUp = journalOverlay.canScrollUp;
      journalCanScrollDown = journalOverlay.canScrollDown;
    } else {
      journalHitTargets = [];
      journalScrollHitTargets = [];
      journalBiomeHitTargets = [];
      journalActionHitTargets = [];
      journalSketchSlotHitTargets = [];
      journalVisibleEntryIds = [];
      journalCanScrollUp = false;
      journalCanScrollDown = false;
    }

    if (overlayMode === 'field-station') {
      const fieldStationState = getFieldStationState();
      drawFieldStationOverlay({
        context,
        width: WIDTH,
        height: HEIGHT,
        palette: currentBiomeDefinition.palette,
        view: fieldStationState.view,
        seasonPage: fieldStationState.seasonPage,
        subtitle: fieldStationState.subtitle,
        credits: fieldStationState.credits,
        selectedOutingSupportId: fieldStationState.selectedOutingSupportId,
        outingSupportSelected: fieldStationState.outingSupportSelected,
        upgrades: fieldStationState.upgrades,
        selectedUpgradeId: fieldStationState.selectedUpgradeId,
        atlas: fieldStationState.atlas,
        routeBoard: fieldStationState.routeBoard,
        expedition: fieldStationState.expedition,
        seasonWrap: fieldStationState.seasonWrap,
        selectedNurseryCardId: fieldStationState.selectedNurseryCardId,
        nursery: fieldStationState.nursery,
        arrivalPulse: getFieldStationArrivalPulse(),
        arrivalMode: fieldStationArrivalMode,
      });
    }

    if (overlayMode === 'menu') {
      ensureMenuSelection();
      menuHitTargets = drawMenuOverlay({
        context,
        width: WIDTH,
        height: HEIGHT,
        palette: currentBiomeDefinition.palette,
        selectedMenuActionId,
        showResetConfirmation,
        isFullscreen: save.settings.fullscreen,
        soundEnabled: save.settings.soundEnabled,
        showInspectHints: save.settings.showInspectHints,
        showWorldMapAction: canUseWorldMapFromMenu(),
        showFieldStationAction: canUseFieldStationFromMenu(),
        showFieldGuideAction: canUseFieldGuideFromMenu(),
        menuReturnMode,
      });
    } else {
      menuHitTargets = [];
    }
  }

  function renderGameToText(): string {
    const transitionSnapshot = getTransitionSnapshot();
    const discoveredEntryIds = getDiscoveredEntryIds(save);
    const worldStateBiomeId =
      sceneMode === 'world-map' || transitionSnapshot?.scene === 'world-map'
        ? getWorldMapLocation(
            ecoWorldMap,
            transitionSnapshot?.activeLocationId ?? worldMapState.focusedLocationId,
          ).biomeId
        : transitionSnapshot?.activeBiomeId ?? getContextBiomeId();
    const worldState = getWorldState(worldStateBiomeId);
    const observationPrompt = getFieldGuideObservationPrompt();
    const activeFieldRequest = getActiveFieldRequest();
    const inspectTargetProjection = getInspectTargetProjection();
    const fieldRequestHint = inspectTargetProjection.fieldRequestHint;
    const journalFieldRequest = getJournalFieldRequest();
    const guidedFieldSeason = getGuidedFieldSeasonState();
    const fieldStationState = getFieldStationState();
    const audioState = audio.getDebugState();
    const visibleVerticalCueIds = getVisibleVerticalCuesForRender().map((cue) => cue.id);
    const currentSceneBiomeDefinition = biomeRegistry[currentBiome.biomeId as keyof typeof biomeRegistry];
    const habitatProcessIds =
      sceneMode === 'biome' && currentSceneBiomeDefinition
        ? getActiveHabitatProcessMoments(currentSceneBiomeDefinition, currentBiome.visitCount, worldState).map(
            (moment) => moment.id,
          )
        : [];
    const nearby = sceneMode === 'biome'
      ? currentBiome.entities
          .filter((entity) => !entity.removed)
          .filter((entity) => Math.abs(entity.x - (player.x + PLAYER_WIDTH / 2)) < 64)
          .map((entity) => ({
            entityId: entity.entityId,
            entryId: entity.entryId,
            x: Math.round(entity.x),
            y: Math.round(entity.y),
            category: entity.category,
          }))
      : [];

    const scenePlayer =
      transitionSnapshot?.avatar
        ? {
            x: Math.round(transitionSnapshot.avatar.x),
            y: Math.round(transitionSnapshot.avatar.y),
            facing: transitionSnapshot.avatar.facing,
            space: transitionSnapshot.avatar.space,
          }
        : sceneMode === 'world-map'
          ? {
              x: Math.round(worldMapState.avatarX),
              y: Math.round(worldMapState.avatarY),
              facing: worldMapState.facing,
              space: 'world-map' as const,
            }
          : {
              x: Math.round(player.x),
              y: Math.round(player.y),
              vx: Math.round(player.vx),
              vy: Math.round(player.vy),
              facing: player.facing,
              climbing: player.climbing,
              activeClimbableId: player.activeClimbableId,
              space: 'biome' as const,
            };

    return JSON.stringify({
      coordinateSystem: 'origin top-left, x right, y down',
      scene: sceneMode,
      mode: overlayMode,
      biomeId: transitionSnapshot?.activeBiomeId ?? getContextBiomeId(),
      sceneBiomeId: currentBiome.biomeId,
      zoneId: sceneMode === 'biome' ? getCurrentZoneId() : null,
      habitatChipLabel: sceneMode === 'biome' ? getCurrentZoneLabel() : null,
      visibleVerticalCueIds,
      visitCount: getContextVisitCount(),
      worldState,
      habitatProcesses: habitatProcessIds,
      observationPrompt: serializeObservationPrompt(observationPrompt),
      activeFieldRequest: serializeActiveFieldRequest(activeFieldRequest),
      fieldRequestHint,
      guidedFieldSeason: {
        stage: guidedFieldSeason.stage,
        stationNote: guidedFieldSeason.stationNote,
        nextBiomeId: guidedFieldSeason.nextBiomeId,
      },
      camera: {
        x: Math.round(cameraX),
        y: Math.round(cameraY),
      },
      player: scenePlayer,
      worldMap:
        sceneMode === 'world-map' || transitionSnapshot?.scene === 'world-map'
          ? {
              currentLocationId: worldMapState.currentLocationId,
              focusedLocationId: worldMapState.focusedLocationId,
              originLabel: getWorldMapOriginLabel(
                worldMapState.currentLocationId,
                worldMapState.focusedLocationId,
              ),
              mode: worldMapState.mode,
              walkingLabel:
                worldMapState.mode === 'walking'
                  ? getWorldMapApproachLabel(worldMapState.focusedLocationId)
                  : null,
              routeMarkerLocationId: getRouteMarkerLocationId(),
              routeReplayLabel: getWorldMapReplayLabel(worldMapState.focusedLocationId),
              focusedSummaryLabel: getWorldMapSummaryLabel(worldMapState.focusedLocationId),
              focusedSurveyState:
                getBiomeSurveyProgress(
                  getJournalBiomeProgressList(),
                  getWorldMapLocation(ecoWorldMap, worldMapState.focusedLocationId).biomeId,
                )?.state ?? 'none',
            }
          : null,
      transition: transitionSnapshot && transitionState
        ? {
            kind: transitionState.kind,
            phaseId: transitionSnapshot.phaseId,
            scene: transitionSnapshot.scene,
            toBiomeId: transitionState.plan.toBiomeId,
          }
        : null,
      corridor:
        activeCorridor
          ? {
              id: activeCorridor.id,
              ownerBiomeId: activeCorridor.ownerBiomeId,
              thresholdX: activeCorridor.thresholdX,
              leftBiomeId: activeCorridor.leftBiomeId,
              rightBiomeId: activeCorridor.rightBiomeId,
              zoneId: getCorridorZoneForOwner(activeCorridor, activeCorridor.ownerBiomeId).id,
            }
          : null,
      nearbyInspectables: nearby,
      nearestInspectableEntityId: inspectTargetProjection.nearestInspectableEntityId,
      nearbyDoor:
        sceneMode === 'biome' && !activeCorridor
          ? {
              biomeId: getContextBiomeId(),
              inRange: isNearBiomeDoor(),
              targetBiomeId: getNearestBiomeDoor()?.targetBiomeId ?? null,
            }
          : null,
      nearbyTravelTarget:
        sceneMode === 'biome' && !activeCorridor
          ? (() => {
              const target = getNearestTravelInteractable();
              return target
                ? {
                    kind: target.kind,
                    inRange: true,
                    targetBiomeId: target.targetBiomeId,
                    label: target.label,
                  }
                : null;
            })()
          : null,
      nearbyClimbable:
        sceneMode === 'biome'
          ? (() => {
              const climbable = getActiveClimbHintClimbable();
              return climbable
                ? {
                    id: climbable.id,
                    inRange: true,
                  }
                : null;
            })()
          : null,
      openBubble: bubble
        ? {
            entryId: bubble.entryId,
            title: bubble.title,
            detailLabel: bubble.detailLabel,
            detailText: bubble.detailText,
            scientificName: bubble.detailLabel === 'Scientific name' ? bubble.detailText : undefined,
            isNewEntry: bubble.isNewEntry,
            closeLookAvailable: bubble.closeLookAvailable,
            resourceNote: bubble.resourceNote,
          }
        : null,
      closeLook: closeLook
        ? {
            entryId: closeLook.entryId,
            title: closeLook.title,
            callouts: [...closeLook.callouts],
          }
        : null,
      menu:
        overlayMode === 'menu'
          ? {
              returnMode: menuReturnMode,
              selectedAction: selectedMenuActionId,
              availableActions: getMenuActionIds(),
              confirmReset: showResetConfirmation,
            }
          : null,
      fieldGuideNotice: fieldGuideNotice
        ? {
            state: fieldGuideNotice,
          }
        : null,
      fieldRequestNotice: fieldRequestNotice
        ? {
            title: fieldRequestNotice.title,
            text: fieldRequestNotice.text,
            variant: fieldRequestNotice.variant,
          }
        : null,
      fieldPartner: {
        active: serializeFieldPartnerNotice(fieldPartnerNotice),
        pendingTrigger: fieldPartnerPendingTrigger
          ? {
              reason: fieldPartnerPendingTrigger.reason,
              entryId: fieldPartnerPendingTrigger.entryId,
            }
          : null,
        noticesThisVisit: fieldPartnerNoticesThisVisit,
        quiet: fieldPartnerQuietTimer > 0,
        globalCooldownRemaining: Number(fieldPartnerGlobalCooldownTimer.toFixed(2)),
      },
      settings: {
        fullscreen: save.settings.fullscreen,
        showInspectHints: save.settings.showInspectHints,
        soundEnabled: save.settings.soundEnabled,
      },
      sound: audioState,
      movement: {
        walkSpeed: fieldStationState.walkSpeed,
        jumpSpeed: fieldStationState.jumpSpeed,
      },
      fieldStation: {
        backdropAccent:
          typeof resolveFieldStationBackdropAccentState === 'function'
            ? resolveFieldStationBackdropAccentState(
                buildFieldStationGrowthInput({
                  nursery: fieldStationState.nursery,
                  loggedRouteCount: fieldStationState.atlas?.loggedRoutes.length ?? 0,
                  seasonWrap: fieldStationState.seasonWrap,
                  routeBoard: fieldStationState.routeBoard,
                }),
              )
            : null,
        view: fieldStationState.view,
        seasonPage: fieldStationState.seasonPage,
        subtitle: fieldStationState.subtitle,
        credits: fieldStationState.credits,
        selectedOutingSupportId: fieldStationState.selectedOutingSupportId,
        outingSupportSelected: fieldStationState.outingSupportSelected,
        recentSources: fieldStationState.recentSources,
        selectedUpgradeId: fieldStationState.selectedUpgradeId,
        arrivalPulse: Number(getFieldStationArrivalPulse().toFixed(2)),
        arrivalMode: fieldStationArrivalMode,
        selectedNurseryCardId: fieldStationState.selectedNurseryCardId,
        selectedNurseryProjectId: fieldStationState.nursery.selectedProjectId,
        seasonNote: fieldStationState.seasonNote,
        seasonWrap: fieldStationState.seasonWrap,
        atlas: fieldStationState.atlas,
        routeBoard: fieldStationState.routeBoard,
        expedition: fieldStationState.expedition,
        nursery: {
          resources: fieldStationState.nursery.resources,
          selectedProject: fieldStationState.nursery.selectedProject
            ? {
                id: fieldStationState.nursery.selectedProject.definition.id,
                title: fieldStationState.nursery.selectedProject.definition.title,
                entryId: fieldStationState.nursery.selectedProject.definition.entryId,
                unlocked: fieldStationState.nursery.selectedProject.unlocked,
                affordable: fieldStationState.nursery.selectedProject.affordable,
              }
            : null,
          activeProject: fieldStationState.nursery.activeProject
            ? {
                id: fieldStationState.nursery.activeProject.definition.id,
                title: fieldStationState.nursery.activeProject.definition.title,
                stage: fieldStationState.nursery.activeProject.state.stage,
                rewardClaimed: fieldStationState.nursery.activeProject.rewardClaimed,
              }
            : null,
          teachingBedFocusMode: fieldStationState.nursery.teachingBedFocusMode,
          routeSupportHint: fieldStationState.nursery.routeSupportHint,
          showRouteSupportHint: fieldStationState.nursery.showRouteSupportHint,
          utilityNote: fieldStationState.nursery.utilityNote,
          compostRate: fieldStationState.nursery.compostRate,
          extras: fieldStationState.nursery.extras.map((extra) => ({
            id: extra.id,
            title: extra.title,
            unlocked: extra.unlocked,
          })),
        },
        purchasedUpgradeIds: [...save.purchasedUpgradeIds],
        upgrades: fieldStationState.upgrades.map((upgrade) => ({
          id: upgrade.id,
          title: upgrade.title,
          cost: upgrade.cost,
          owned: upgrade.owned,
          affordable: upgrade.affordable,
          walkSpeed: upgrade.walkSpeed,
        })),
      },
      journal:
        overlayMode === 'journal'
          ? (() => {
              const selectedBiome = biomeRegistry[selectedJournalBiomeId as keyof typeof biomeRegistry];
              const selectedBiomeDiscoveredEntryIds = getDiscoveredEntriesList(selectedJournalBiomeId).map((entry) => entry.id);
              const noteState = resolveEcosystemNoteForEntry(
                selectedBiome,
                selectedJournalEntryId,
                selectedBiomeDiscoveredEntryIds,
              );
              const comparison = getJournalComparison(selectedJournalEntryId);
              const selectedSurveyState = getSelectedJournalSurveyState();
              const sketchbook = isSketchbookUnlocked(selectedSurveyState)
                ? getJournalSketchbookPage()
                : null;
              const journalObservationPrompt = getJournalObservationPrompt(
                selectedJournalBiomeId,
                selectedJournalEntryId,
                noteState,
                Boolean(comparison),
              );

              return {
                selectedBiomeId: selectedJournalBiomeId,
                selectedEntryId: selectedJournalEntryId,
                selectedSurveyState,
                selectedEntrySightings: getJournalEntrySightingBiomeIds(selectedJournalEntryId),
                visibleEntryIds: journalVisibleEntryIds,
                canScrollUp: journalCanScrollUp,
                canScrollDown: journalCanScrollDown,
                scrollTargets: journalScrollHitTargets.map((target) => ({
                  direction: target.direction,
                  x: target.x,
                  y: target.y,
                  w: target.w,
                  h: target.h,
                })),
                actionTargets: journalActionHitTargets.map((target) => ({
                  id: target.id,
                  x: target.x,
                  y: target.y,
                  w: target.w,
                  h: target.h,
                })),
                sketchSlotTargets: journalSketchSlotHitTargets.map((target) => ({
                  slotId: target.slotId,
                  x: target.x,
                  y: target.y,
                  w: target.w,
                  h: target.h,
                })),
                biomeProgress: getJournalBiomeProgressList().map((biome) => ({
                  biomeId: biome.biomeId,
                  discoveredCount: biome.discoveredCount,
                  totalCount: biome.totalCount,
                  surveyState:
                    getBiomeSurveyProgress(getJournalBiomeProgressList(), biome.biomeId)?.state ?? 'none',
                })),
                ecosystemNote:
                  noteState.state === 'none'
                    ? null
                    : {
                        state: noteState.state,
                        discoveredCount: noteState.discoveredCount,
                        requiredCount: noteState.requiredCount,
                        title: noteState.note?.title ?? null,
                        summary: noteState.note?.summary ?? null,
                      },
                fieldRequest: serializeActiveFieldRequest(journalFieldRequest),
                observationPrompt: serializeObservationPrompt(journalObservationPrompt),
                sketchbook: sketchbook
                  ? {
                      available: true,
                      open: journalSketchbookOpen,
                      selectedSlotId: selectedSketchbookSlotId,
                      slots: sketchbook.slots.map((slot) => ({
                        slotId: slot.slotId,
                        label: slot.label,
                        entryId: slot.entryId,
                        entryName: slot.entry?.commonName ?? null,
                      })),
                    }
                  : {
                      available: false,
                      open: false,
                      selectedSlotId: null,
                      slots: [],
                    },
                comparison: comparison
                  ? {
                      available: true,
                      open: journalComparisonOpen,
                      cards: comparison.cards.map((card) => ({
                        biomeId: card.biomeId,
                        biomeName: card.biomeName,
                        noteTitle: card.noteTitle,
                        noteSummary: card.noteSummary,
                      })),
                    }
                  : {
                      available: false,
                      open: false,
                      cards: [],
                    },
              };
            })()
          : null,
      discoveredJournalCount: discoveredEntryIds.length,
    });
  }

  function step(dt: number): void {
    updateGameState(dt);
    input.flushFrame();
  }

  function tick(now: number): void {
    const dt = clamp((now - lastTime) / 1000, 1 / 240, 1 / 20);
    lastTime = now;

    if (!manualTimeControl) {
      step(dt);
    }
    render();
    requestAnimationFrame(tick);
  }

  enterBiome(save.lastBiomeId || 'beach');
  setSelectedJournalEntry(true);

  const externalWindow = window as TextRenderableWindow;
  externalWindow.advanceTime = (ms: number) => {
    manualTimeControl = true;
    const frames = Math.max(1, Math.round(ms / (1000 / 60)));
    for (let index = 0; index < frames; index += 1) {
      step(1 / 60);
    }
    render();
  };
  externalWindow.render_game_to_text = renderGameToText;

  requestAnimationFrame(tick);

  return {
    enterBiome,
    inspectEntity,
  };
}
