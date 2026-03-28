import { spriteSources } from '../assets';
import { biomeRegistry } from '../content/biomes';
import { ecoWorldMap, type DoorAnchor } from '../content/world-map';
import {
  createDoorTransitionPlan,
  sampleDoorTransition,
  type DoorTransitionPlan,
  type DoorTransitionPhaseId,
  type DoorTransitionSnapshot,
} from './door-transition';
import { generateBiomeInstance, sampleTerrainY } from './generation';
import { InputController } from './input';
import { getInspectableDetail } from './inspectables';
import {
  buildJournalBiomeProgress,
  getDiscoveredEntriesForBiome,
  type JournalBiomeProgress,
} from './journal';
import { clamp } from './random';
import {
  getDiscoveredEntryIds,
  incrementBiomeVisit,
  persistSave,
  recordDiscovery,
  resetSaveProgress,
} from './save';
import { createSpriteRegistry, drawSprite } from './sprites';
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
import type {
  BiomeDefinition,
  BiomeEntity,
  FactBubblePayload,
  Facing,
  GameApi,
  InspectableEntry,
  OverlayMode,
  Platform,
  SaveState,
} from './types';

const WIDTH = 192;
const HEIGHT = 144;
const PLAYER_WIDTH = 10;
const PLAYER_HEIGHT = 10;
const MOVE_SPEED = 42;
const JUMP_SPEED = 118;
const GRAVITY = 320;
const INSPECT_RANGE = 22;
const UI_FONT_SMALL = 'bold 7px Verdana, Geneva, sans-serif';
const UI_FONT_MEDIUM = 'bold 8px Verdana, Geneva, sans-serif';

interface PlayerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  onGround: boolean;
  facing: Facing;
}

interface JournalHitTarget {
  entryId: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface JournalBiomeHitTarget {
  biomeId: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

type MenuActionId =
  | 'toggle-fullscreen'
  | 'toggle-inspect-hints'
  | 'reset-save'
  | 'close-menu'
  | 'cancel-reset'
  | 'confirm-reset';

type UiActionId = 'start-game' | 'open-menu' | MenuActionId;

interface ButtonHitTarget {
  id: UiActionId;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface TextRenderableWindow extends Window {
  advanceTime?: (ms: number) => void;
  render_game_to_text?: () => string;
}

type SceneMode = 'biome' | 'world-map' | 'transition';
type TransitionKind = 'biome-to-map' | 'map-to-biome';

interface TransitionState {
  kind: TransitionKind;
  plan: DoorTransitionPlan;
  startElapsed: number;
  elapsed: number;
  endElapsed: number;
}

function fillPixelPanel(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
  border: string,
): void {
  context.fillStyle = border;
  context.fillRect(x, y, w, h);
  context.fillStyle = fill;
  context.fillRect(x + 2, y + 2, w - 4, h - 4);
}

function fillLeafGreenPanel(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
): void {
  context.fillStyle = '#395f56';
  context.fillRect(x, y, w, h);
  context.fillStyle = '#b8d0c6';
  context.fillRect(x + 2, y + 2, w - 4, h - 4);
  context.fillStyle = '#fff7de';
  context.fillRect(x + 4, y + 4, w - 8, h - 8);
}

function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  color: string,
  maxLines = 99,
): number {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (context.measureText(candidate).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) {
    lines.push(current);
  }

  context.fillStyle = color;

  for (let index = 0; index < Math.min(lines.length, maxLines); index += 1) {
    const lineY = y + index * lineHeight;
    context.fillStyle = 'rgba(255, 247, 222, 0.9)';
    context.fillText(lines[index], Math.round(x), Math.round(lineY) + 1);
    context.fillStyle = color;
    context.fillText(lines[index], Math.round(x), Math.round(lineY));
  }

  return y + Math.min(lines.length, maxLines) * lineHeight;
}

function drawUiText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
): void {
  context.fillStyle = 'rgba(255, 247, 222, 0.9)';
  context.fillText(text, Math.round(x), Math.round(y) + 1);
  context.fillStyle = color;
  context.fillText(text, Math.round(x), Math.round(y));
}

function drawInteractMarker(
  context: CanvasRenderingContext2D,
  centerX: number,
  topY: number,
  minX: number,
  maxX: number,
): void {
  const width = 9;
  const x = clamp(Math.round(centerX - width / 2), minX, maxX - width);

  context.fillStyle = '#c98a4f';
  context.fillRect(x + 3, topY, 3, 2);
  context.fillRect(x + 2, topY + 2, 5, 2);
  context.fillRect(x + 1, topY + 4, 7, 2);
  context.fillRect(x + 4, topY + 6, 1, 3);
  context.fillStyle = '#fff7de';
  context.fillRect(x + 3, topY + 1, 3, 1);
  context.fillRect(x + 2, topY + 3, 5, 1);
  context.fillRect(x + 1, topY + 5, 7, 1);
}

function drawPanelButton(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  options: {
    fill: string;
    border: string;
    text: string;
    selected?: boolean;
  },
): void {
  const fill = options.selected ? options.border : options.fill;
  const border = options.selected ? options.text : options.border;
  const text = options.selected ? '#fff7de' : options.text;

  fillPixelPanel(context, x, y, w, h, fill, border);
  drawUiText(
    context,
    label,
    x + Math.max(3, Math.round((w - context.measureText(label).width) / 2)),
    y + Math.max(1, Math.round((h - 8) / 2)),
    text,
  );
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
  let currentBiomeDefinition: BiomeDefinition = biomeRegistry.beach;
  let currentBiome = generateBiomeInstance(currentBiomeDefinition, save, 1);
  let player: PlayerState = {
    x: currentBiomeDefinition.startPosition.x,
    y: currentBiomeDefinition.startPosition.y,
    vx: 0,
    vy: 0,
    onGround: false,
    facing: 'right',
  };
  let overlayMode: OverlayMode = 'title';
  let sceneMode: SceneMode = 'biome';
  let bubble: FactBubblePayload | null = null;
  let bubbleTimer = 0;
  let selectedJournalBiomeId = save.lastBiomeId || 'beach';
  let selectedJournalEntryId: string | null = null;
  let cameraX = 0;
  let frameCount = 0;
  let lastTime = performance.now();
  let manualTimeControl = false;
  let journalHitTargets: JournalHitTarget[] = [];
  let journalBiomeHitTargets: JournalBiomeHitTarget[] = [];
  let titleHitTargets: ButtonHitTarget[] = [];
  let hudHitTargets: ButtonHitTarget[] = [];
  let menuHitTargets: ButtonHitTarget[] = [];
  let menuReturnMode: Exclude<OverlayMode, 'menu'> = 'playing';
  let selectedMenuActionId: MenuActionId = 'toggle-fullscreen';
  let showResetConfirmation = false;
  let worldMapState = createWorldMapState(
    ecoWorldMap,
    getWorldMapLocationByBiomeId(ecoWorldMap, save.lastBiomeId || 'beach').id,
  );
  let mapOriginBiomeId = save.lastBiomeId || 'beach';
  let transitionState: TransitionState | null = null;

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

  function openMenu(returnMode: Exclude<OverlayMode, 'menu'>): void {
    menuReturnMode = returnMode;
    overlayMode = 'menu';
    selectedMenuActionId = 'toggle-fullscreen';
    showResetConfirmation = false;
    bubble = null;
    bubbleTimer = 0;
  }

  function closeMenu(): void {
    overlayMode = menuReturnMode;
    selectedMenuActionId = 'toggle-fullscreen';
    showResetConfirmation = false;
  }

  function getMenuActionIds(): MenuActionId[] {
    return showResetConfirmation
      ? ['cancel-reset', 'confirm-reset']
      : ['toggle-fullscreen', 'toggle-inspect-hints', 'reset-save', 'close-menu'];
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
    selectedMenuActionId = available[nextIndex];
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

  function getCurrentMapLocation() {
    return getWorldMapLocationByBiomeId(ecoWorldMap, currentBiomeDefinition.id);
  }

  function getCurrentBiomeDoor(): DoorAnchor {
    return getCurrentMapLocation().biomeDoor;
  }

  function getDoorInteractPoint(door: DoorAnchor): { x: number; y: number } {
    return {
      x: door.x + 4,
      y: door.y + 8,
    };
  }

  function setPlayerFromFootPosition(footX: number, footY: number, facing: Facing): void {
    player = {
      x: Math.round(footX - PLAYER_WIDTH / 2),
      y: Math.round(footY - PLAYER_HEIGHT),
      vx: 0,
      vy: 0,
      onGround: true,
      facing,
    };

    const baseGround = getGroundYAt(player.x + PLAYER_WIDTH / 2);
    player.y = Math.min(player.y, baseGround - PLAYER_HEIGHT);
    cameraX = clamp(player.x - WIDTH * 0.35, 0, currentBiome.width - WIDTH);
  }

  function setSelectedJournalEntry(defaultToFirst = false): void {
    const discovered = getDiscoveredEntriesList(selectedJournalBiomeId);
    if (!discovered.length) {
      selectedJournalEntryId = null;
      return;
    }

    if (selectedJournalEntryId && discovered.some((entry) => entry.id === selectedJournalEntryId)) {
      return;
    }

    if (defaultToFirst) {
      selectedJournalEntryId = discovered[0].id;
    }
  }

  function getJournalBiomeProgressList(): JournalBiomeProgress[] {
    return buildJournalBiomeProgress(biomeRegistry, getDiscoveredEntryIds(save));
  }

  function getDiscoveredEntriesList(biomeId = selectedJournalBiomeId): InspectableEntry[] {
    const biome = biomeRegistry[biomeId as keyof typeof biomeRegistry];
    if (!biome) {
      return [];
    }

    return getDiscoveredEntriesForBiome(biome, allEntries(), getDiscoveredEntryIds(save));
  }

  function setSelectedJournalBiome(biomeId: string, defaultToFirst = false): void {
    if (!biomeRegistry[biomeId as keyof typeof biomeRegistry]) {
      return;
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

  function enterBiome(biomeId: string): void {
    const definition = biomeRegistry[biomeId as keyof typeof biomeRegistry];
    if (!definition) {
      throw new Error(`Unknown biome "${biomeId}".`);
    }

    currentBiomeDefinition = definition;
    const visitCount = incrementBiomeVisit(save, biomeId);
    currentBiome = generateBiomeInstance(definition, save, visitCount);
    player = {
      x: definition.startPosition.x,
      y: definition.startPosition.y,
      vx: 0,
      vy: 0,
      onGround: false,
      facing: 'right',
    };

    const baseGround = getGroundYAt(player.x + PLAYER_WIDTH / 2);
    player.y = Math.min(player.y, baseGround - PLAYER_HEIGHT);
    cameraX = clamp(player.x - WIDTH * 0.35, 0, currentBiome.width - WIDTH);
    bubble = null;
    bubbleTimer = 0;
    worldMapState = createWorldMapState(
      ecoWorldMap,
      getWorldMapLocationByBiomeId(ecoWorldMap, biomeId).id,
    );
    mapOriginBiomeId = biomeId;
    persistSave(save);
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
    const point = getDoorInteractPoint(getCurrentBiomeDoor());
    return (
      distanceBetween(
        player.x + PLAYER_WIDTH / 2,
        player.y + PLAYER_HEIGHT / 2,
        point.x,
        point.y,
      ) <= INSPECT_RANGE + 6
    );
  }

  function getDoorAtPoint(worldX: number, worldY: number): DoorAnchor | null {
    const door = getCurrentBiomeDoor();
    const contains =
      worldX >= door.x &&
      worldX <= door.x + 8 &&
      worldY >= door.y &&
      worldY <= door.y + 12;

    return contains && isNearBiomeDoor() ? door : null;
  }

  function inspectEntity(entityId: string): FactBubblePayload | null {
    const entity = currentBiome.entities.find((candidate) => candidate.entityId === entityId && !candidate.removed);
    if (!entity) {
      return null;
    }

    const entry = currentBiomeDefinition.entries[entity.entryId];
    const detail = getInspectableDetail(entry);
    const isNewEntry = recordDiscovery(save, entry, currentBiomeDefinition.id);
    entity.removed = entity.collectible;
    persistSave(save);
    setSelectedJournalEntry(true);

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
      x: entity.x + entity.w / 2,
      y: entity.y,
    };

    bubble = payload;
    bubbleTimer = 6;
    return payload;
  }

  function getNearestInspectable(): BiomeEntity | null {
    let nearest: BiomeEntity | null = null;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (const entity of currentBiome.entities) {
      if (entity.removed) {
        continue;
      }

      const distance = distanceBetween(
        player.x + PLAYER_WIDTH / 2,
        player.y + PLAYER_HEIGHT / 2,
        entity.x + entity.w / 2,
        entity.y + entity.h / 2,
      );

      if (distance <= INSPECT_RANGE && distance < nearestDistance) {
        nearest = entity;
        nearestDistance = distance;
      }
    }

    return nearest;
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
    selectedJournalEntryId = discovered[nextIndex].id;
  }

  function toggleFullscreen(): void {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
      save.settings.fullscreen = false;
    } else {
      void canvas.requestFullscreen();
      save.settings.fullscreen = true;
    }
    persistSave(save);
  }

  function startPlaying(): void {
    overlayMode = 'playing';
  }

  function resetAdventure(): void {
    resetSaveProgress(save);
    sceneMode = 'biome';
    transitionState = null;
    bubble = null;
    bubbleTimer = 0;
    selectedJournalBiomeId = 'beach';
    selectedJournalEntryId = null;
    menuReturnMode = 'title';
    selectedMenuActionId = 'toggle-fullscreen';
    showResetConfirmation = false;
    enterBiome('beach');
    setSelectedJournalEntry(true);
    overlayMode = 'title';
    persistSave(save);
  }

  function activateMenuAction(actionId: MenuActionId): void {
    switch (actionId) {
      case 'toggle-fullscreen':
        toggleFullscreen();
        break;
      case 'toggle-inspect-hints':
        save.settings.showInspectHints = !save.settings.showInspectHints;
        persistSave(save);
        break;
      case 'reset-save':
        showResetConfirmation = true;
        selectedMenuActionId = 'cancel-reset';
        break;
      case 'cancel-reset':
        showResetConfirmation = false;
        selectedMenuActionId = 'reset-save';
        break;
      case 'confirm-reset':
        resetAdventure();
        break;
      case 'close-menu':
      default:
        closeMenu();
        break;
    }
  }

  function startWorldMapExitTransition(): void {
    const biomeId = currentBiomeDefinition.id;
    const location = getWorldMapLocationByBiomeId(ecoWorldMap, biomeId);
    worldMapState = createWorldMapState(ecoWorldMap, location.id);
    mapOriginBiomeId = biomeId;

    const plan = createDoorTransitionPlan(ecoWorldMap, biomeId, biomeId);
    transitionState = {
      kind: 'biome-to-map',
      plan,
      startElapsed: 0,
      elapsed: 0,
      endElapsed: getPhaseTime(plan, 'map-emerge', 'end'),
    };
    sceneMode = 'transition';
    bubble = null;
    bubbleTimer = 0;
  }

  function startBiomeEntryTransition(targetBiomeId: string): void {
    const plan = createDoorTransitionPlan(ecoWorldMap, mapOriginBiomeId, targetBiomeId);
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
    bubble = null;
    bubbleTimer = 0;
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

    if (input.consumePressed('ArrowLeft') || input.consumePressed('a') || input.consumePressed('A')) {
      changeJournalBiome(-1);
    }

    if (input.consumePressed('ArrowRight') || input.consumePressed('d') || input.consumePressed('D')) {
      changeJournalBiome(1);
    }

    if (input.consumePressed('ArrowDown') || input.consumePressed('s') || input.consumePressed('S')) {
      changeJournalSelection(1);
    }

    if (input.consumePressed('ArrowUp') || input.consumePressed('w') || input.consumePressed('W')) {
      changeJournalSelection(-1);
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
        selectedJournalEntryId = hit.entryId;
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
    bubble = null;
    bubbleTimer = 0;

    if (finishedKind === 'biome-to-map') {
      sceneMode = 'world-map';
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
      bubble = null;
      bubbleTimer = 0;
    }

    const moveLeft = input.isDown('ArrowLeft') || input.isDown('a') || input.isDown('A');
    const moveRight = input.isDown('ArrowRight') || input.isDown('d') || input.isDown('D');

    player.vx = 0;
    if (moveLeft !== moveRight) {
      player.vx = moveLeft ? -MOVE_SPEED : MOVE_SPEED;
      player.facing = moveLeft ? 'left' : 'right';
    }

    if ((input.consumePressed(' ') || input.consumePressed('Space')) && player.onGround) {
      player.vy = -JUMP_SPEED;
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

    cameraX = clamp(player.x - WIDTH * 0.35, 0, currentBiome.width - WIDTH);

    if (bubble) {
      bubbleTimer -= dt;
      if (bubbleTimer <= 0) {
        bubble = null;
      }
    }

    if (input.consumePressed('e') || input.consumePressed('E')) {
      if (isNearBiomeDoor()) {
        startWorldMapExitTransition();
        return;
      }

      const nearest = getNearestInspectable();
      if (nearest) {
        inspectEntity(nearest.entityId);
      }
    }

    const click = input.consumeClick();
    if (click) {
      if (getHitTargetAt(hudHitTargets, click)?.id === 'open-menu') {
        openMenu('playing');
        return;
      }

      const worldX = click.x + cameraX;

      if (getDoorAtPoint(worldX, click.y)) {
        startWorldMapExitTransition();
        return;
      }

      const hit = getEntityAtPoint(worldX, click.y);
      if (hit) {
        inspectEntity(hit.entityId);
      }
    }
  }

  function updateGameState(dt: number): void {
    if (input.consumePressed('f') || input.consumePressed('F')) {
      toggleFullscreen();
    }

    if (input.consumePressed('m') || input.consumePressed('M')) {
      if (overlayMode === 'menu') {
        closeMenu();
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

    if (overlayMode === 'menu') {
      updateMenuState();
      return;
    }

    if (sceneMode !== 'transition' && (input.consumePressed('j') || input.consumePressed('J'))) {
      const journalBiomeId = sceneMode === 'world-map' ? mapOriginBiomeId : currentBiomeDefinition.id;
      setSelectedJournalBiome(journalBiomeId, true);
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
  }

  function drawCloud(x: number, y: number, width: number): void {
    context.fillStyle = currentBiomeDefinition.palette.foam;
    context.fillRect(x + 2, y, width - 4, 4);
    context.fillRect(x, y + 2, width, 4);
    context.fillRect(x + 6, y - 2, width - 12, 4);
  }

  function drawBiomeGradient(): void {
    const gradient = context.createLinearGradient(0, 0, 0, HEIGHT);
    gradient.addColorStop(0, currentBiomeDefinition.palette.skyTop);
    gradient.addColorStop(1, currentBiomeDefinition.palette.skyBottom);
    context.fillStyle = gradient;
    context.fillRect(0, 0, WIDTH, HEIGHT);
  }

  function drawTerrain(): void {
    for (const layer of currentBiomeDefinition.parallaxLayers) {
      context.fillStyle = layer.color;
      for (let screenX = 0; screenX < WIDTH; screenX += 2) {
        const worldX = screenX + cameraX * layer.speed;
        const wave = Math.sin(worldX / 26) * layer.amplitude;
        const y = layer.baseY + wave;
        context.fillRect(screenX, y, 2, HEIGHT - y);
      }
    }

    currentBiome.clouds.forEach((cloud) => {
      const screenX = cloud.x - cameraX * 0.15;
      drawCloud(screenX, cloud.y, cloud.w);
    });

    if (currentBiomeDefinition.id === 'beach') {
      context.fillStyle = '#ffd65c';
      context.fillRect(WIDTH - 30, 12, 10, 10);
      context.fillStyle = '#fff5b6';
      context.fillRect(WIDTH - 28, 14, 6, 6);

      context.fillStyle = currentBiomeDefinition.palette.seaTop;
      context.fillRect(0, 92, WIDTH, 52);
      context.fillStyle = currentBiomeDefinition.palette.foam;
      for (let x = 0; x < WIDTH; x += 8) {
        context.fillRect(x, 94 + ((x + frameCount) % 16 === 0 ? 0 : 1), 6, 1);
      }
    } else {
      context.fillStyle = currentBiomeDefinition.palette.seaBottom;
      context.fillRect(0, 80, WIDTH, 64);
      context.fillStyle = currentBiomeDefinition.palette.seaTop;
      for (let x = 0; x < WIDTH; x += 14) {
        const height = 18 + ((x + frameCount) % 21 < 10 ? 6 : 0);
        context.fillRect(x, 64 - (height / 3), 6, height);
      }
      context.fillStyle = 'rgba(220, 235, 216, 0.45)';
      for (let x = 0; x < WIDTH; x += 18) {
        context.fillRect(x, 86 + ((x + frameCount) % 12 < 6 ? 0 : 1), 12, 1);
      }
    }

    const surfaceTile = currentBiomeDefinition.tileSet[0];
    const fillTile = currentBiomeDefinition.tileSet[1];

    for (let screenX = -8; screenX < WIDTH + 8; screenX += 8) {
      const worldX = screenX + cameraX;
      const surfaceY = Math.floor(sampleTerrainY(currentBiome.terrainSamples, worldX + 4) / 8) * 8;
      drawSprite(context, sprites, surfaceTile, screenX, surfaceY);

      for (let fillY = surfaceY + 8; fillY < HEIGHT; fillY += 8) {
        drawSprite(context, sprites, fillTile, screenX, fillY);
      }
    }

    for (const sparkle of currentBiome.sparkles) {
      const screenX = sparkle.x - cameraX;
      if (screenX < 0 || screenX > WIDTH) {
        continue;
      }

      const pulse = Math.sin(frameCount / 12 + sparkle.phase);
      if (pulse > 0.4) {
        context.fillStyle = currentBiomeDefinition.palette.foam;
        context.fillRect(screenX, sparkle.y, 1, 3);
        context.fillRect(screenX - 1, sparkle.y + 1, 3, 1);
      }
    }

    for (const platform of currentBiome.platforms) {
      const screenX = platform.x - cameraX;
      for (let x = 0; x < platform.w; x += 8) {
        drawSprite(context, sprites, platform.spriteId, screenX + x, platform.y);
      }
    }
  }

  function drawBiomeDoor(openAmount = 0, highlight = false): void {
    const door = getCurrentBiomeDoor();
    const screenX = door.x - cameraX;
    if (screenX < -16 || screenX > WIDTH + 16) {
      return;
    }

    drawSprite(context, sprites, door.spriteId, screenX, door.y);

    if (openAmount > 0.05) {
      const gapWidth = Math.max(1, Math.round(openAmount * 3));
      const gapX = door.facing === 'right' ? screenX + 2 : screenX + 6 - gapWidth;
      context.fillStyle = 'rgba(28, 22, 18, 0.55)';
      context.fillRect(gapX, door.y + 2, gapWidth, 7);
      context.fillStyle = currentBiomeDefinition.palette.foam;
      context.fillRect(gapX, door.y + 3, gapWidth, 4);
    }

    if (highlight) {
      drawInteractMarker(context, screenX + 4, door.y - 12, 4, WIDTH - 4);
    }
  }

  function drawEntities(showNearestMarker = true): void {
    const nearest =
      showNearestMarker &&
      save.settings.showInspectHints &&
      overlayMode === 'playing' &&
      !bubble
        ? getNearestInspectable()
        : null;

    for (const entity of currentBiome.entities) {
      if (entity.removed) {
        continue;
      }

      const screenX = entity.x - cameraX;
      if (screenX < -24 || screenX > WIDTH + 24) {
        continue;
      }

      context.fillStyle = 'rgba(32, 25, 20, 0.15)';
      context.fillRect(screenX, entity.y + entity.h - 1, entity.w, 2);
      const animated = entity.category === 'animal';
      const frameIndex = animated ? Math.floor(frameCount / 20) % 2 : 0;
      drawSprite(context, sprites, entity.spriteId, screenX, entity.y, frameIndex);

      if (nearest?.entityId === entity.entityId) {
        drawInteractMarker(
          context,
          screenX + entity.w / 2,
          Math.round(entity.y - 12),
          4,
          WIDTH - 4,
        );
      }
    }
  }

  function getPlayerAnimationFrame(): number {
    return !player.onGround
      ? 2
      : Math.abs(player.vx) > 0
        ? 1 + (Math.floor(frameCount / 10) % 2) * 2
        : 0;
  }

  function drawPlayerAt(topLeftX: number, topLeftY: number, facing: Facing, animationFrame: number): void {
    context.fillStyle = 'rgba(32, 25, 20, 0.18)';
    context.fillRect(topLeftX - cameraX + 2, topLeftY + PLAYER_HEIGHT, 7, 2);
    drawSprite(
      context,
      sprites,
      'player',
      topLeftX - cameraX,
      topLeftY - 2,
      animationFrame,
      facing === 'left',
    );
  }

  function drawPlayer(): void {
    drawPlayerAt(player.x, player.y, player.facing, getPlayerAnimationFrame());
  }

  function drawTransitionBiomeAvatar(snapshot: DoorTransitionSnapshot): void {
    if (!snapshot.avatar || snapshot.avatar.space !== 'biome') {
      return;
    }

    drawPlayerAt(
      Math.round(snapshot.avatar.x - PLAYER_WIDTH / 2),
      Math.round(snapshot.avatar.y - PLAYER_HEIGHT),
      snapshot.avatar.facing,
      1 + (Math.floor(frameCount / 10) % 2) * 2,
    );
  }

  function drawBubble(): void {
    if (!bubble) {
      return;
    }

    const bubbleX = 6;
    const bubbleY = HEIGHT - 47;
    fillLeafGreenPanel(context, bubbleX, bubbleY, WIDTH - 12, 43);
    context.font = UI_FONT_MEDIUM;
    drawUiText(context, bubble.title, bubbleX + 5, bubbleY + 6, currentBiomeDefinition.palette.text);
    context.font = UI_FONT_SMALL;
    drawWrappedText(
      context,
      bubble.detailText,
      bubbleX + 5,
      bubbleY + 16,
      WIDTH - 28,
      7,
      currentBiomeDefinition.palette.accent,
      1,
    );
    drawWrappedText(
      context,
      bubble.fact,
      bubbleX + 5,
      bubbleY + 27,
      WIDTH - 22,
      7,
      currentBiomeDefinition.palette.text,
      2,
    );

    if (bubble.isNewEntry) {
      context.fillStyle = currentBiomeDefinition.palette.accent;
      context.fillRect(WIDTH - 70, bubbleY + 6, 58, 2);
      drawUiText(context, 'New entry!', WIDTH - 70, bubbleY + 9, currentBiomeDefinition.palette.text);
    }
  }

  function drawTitleOverlay(): void {
    titleHitTargets = [];
    fillLeafGreenPanel(context, 8, 8, WIDTH - 16, 128);
    context.font = UI_FONT_MEDIUM;
    drawUiText(context, 'ECO EXPLORER', 18, 14, currentBiomeDefinition.palette.text);
    drawWrappedText(
      context,
      'Explore ecosystems, inspect nature, and build a field journal.',
      18,
      30,
      78,
      7,
      currentBiomeDefinition.palette.text,
      3,
    );
    context.fillStyle = currentBiomeDefinition.palette.accent;
    context.fillRect(16, 60, 72, 2);
    context.fillRect(100, 18, 2, 104);
    context.font = UI_FONT_SMALL;
    drawUiText(context, 'WANDER BEACHES,', 18, 68, currentBiomeDefinition.palette.text);
    drawUiText(context, 'FORESTS, AND', 18, 79, currentBiomeDefinition.palette.text);
    drawUiText(context, 'TUNDRA TRAILS.', 18, 90, currentBiomeDefinition.palette.text);
    drawUiText(context, 'FIND FIELD FACTS.', 18, 101, currentBiomeDefinition.palette.text);
    drawUiText(context, 'MOVE: A / D', 108, 24, currentBiomeDefinition.palette.text);
    drawUiText(context, 'OR ARROWS', 108, 35, currentBiomeDefinition.palette.text);
    drawUiText(context, 'JUMP: SPACE', 108, 48, currentBiomeDefinition.palette.text);
    drawUiText(context, 'FACTS / DOORS: E', 108, 61, currentBiomeDefinition.palette.text);
    drawUiText(context, 'JOURNAL: J', 108, 74, currentBiomeDefinition.palette.text);
    drawUiText(context, 'MAP: ARROWS', 108, 87, currentBiomeDefinition.palette.text);
    drawUiText(context, 'ENTER: TRAVEL', 108, 98, currentBiomeDefinition.palette.text);
    drawPanelButton(context, 106, 111, 28, 11, 'START', {
      fill: currentBiomeDefinition.palette.journalSelected,
      border: currentBiomeDefinition.palette.cardShadow,
      text: currentBiomeDefinition.palette.text,
      selected: false,
    });
    titleHitTargets.push({ id: 'start-game', x: 106, y: 111, w: 28, h: 11 });
    drawPanelButton(context, 138, 111, 28, 11, 'MENU', {
      fill: currentBiomeDefinition.palette.journalPage,
      border: currentBiomeDefinition.palette.cardShadow,
      text: currentBiomeDefinition.palette.text,
      selected: false,
    });
    titleHitTargets.push({ id: 'open-menu', x: 138, y: 111, w: 28, h: 11 });
    drawUiText(context, 'CLICK ANYWHERE TO START', 18, 118, currentBiomeDefinition.palette.accent);
  }

  function drawWorldMapHud(): void {
    fillLeafGreenPanel(context, 8, 8, WIDTH - 16, 28);
    context.font = UI_FONT_SMALL;
    if (worldMapState.mode === 'walking') {
      drawUiText(context, 'TRAVELING TO THE NEXT ECOSYSTEM...', 18, 18, currentBiomeDefinition.palette.text);
      return;
    }

    drawUiText(context, 'ARROWS: CHOOSE', 14, 14, currentBiomeDefinition.palette.text);
    drawUiText(context, 'ENTER: TRAVEL', 14, 22, currentBiomeDefinition.palette.text);
    drawUiText(context, 'ESC: RETURN', 108, 18, currentBiomeDefinition.palette.text);
  }

  function drawMenuChip(): void {
    hudHitTargets = [];

    if (overlayMode !== 'playing' || sceneMode === 'transition') {
      return;
    }

    const x = WIDTH - 42;
    const y = 8;
    drawPanelButton(context, x, y, 34, 11, 'MENU', {
      fill: currentBiomeDefinition.palette.journalPage,
      border: currentBiomeDefinition.palette.cardShadow,
      text: currentBiomeDefinition.palette.text,
    });
    hudHitTargets.push({ id: 'open-menu', x, y, w: 34, h: 11 });
  }

  function drawMenuRow(
    y: number,
    actionId: MenuActionId,
    label: string,
    value?: string,
  ): void {
    const x = 32;
    const w = 128;
    const selected = selectedMenuActionId === actionId;
    const fill = selected
      ? currentBiomeDefinition.palette.journalPage
      : currentBiomeDefinition.palette.journalSelected;
    const border = selected
      ? currentBiomeDefinition.palette.accent
      : currentBiomeDefinition.palette.cardShadow;
    const labelColor = currentBiomeDefinition.palette.text;

    fillPixelPanel(context, x, y, w, 14, fill, border);
    if (selected) {
      context.fillStyle = currentBiomeDefinition.palette.accent;
      context.fillRect(x + 4, y + 3, 2, 8);
    }
    drawUiText(context, label, x + 7, y + 3, labelColor);
    menuHitTargets.push({ id: actionId, x, y, w, h: 14 });

    if (!value) {
      return;
    }

    const valueColor = currentBiomeDefinition.palette.accent;
    drawUiText(
      context,
      value,
      x + w - context.measureText(value).width - 8,
      y + 3,
      valueColor,
    );
  }

  function drawMenuOverlay(): void {
    menuHitTargets = [];
    ensureMenuSelection();

    context.fillStyle = 'rgba(32, 25, 20, 0.55)';
    context.fillRect(0, 0, WIDTH, HEIGHT);
    fillLeafGreenPanel(context, 20, 8, 152, 128);

    context.font = UI_FONT_MEDIUM;
    drawUiText(context, 'FIELD MENU', 34, 16, currentBiomeDefinition.palette.text);
    context.font = UI_FONT_SMALL;
    drawWrappedText(
      context,
      'Change helper settings or reset your save.',
      34,
      27,
      124,
      6,
      currentBiomeDefinition.palette.text,
      2,
    );

    drawMenuRow(56, 'toggle-fullscreen', 'Big screen', save.settings.fullscreen ? 'ON' : 'OFF');
    drawMenuRow(
      70,
      'toggle-inspect-hints',
      'Hint markers',
      save.settings.showInspectHints ? 'ON' : 'OFF',
    );
    drawMenuRow(84, 'reset-save', 'Reset save');
    drawMenuRow(98, 'close-menu', menuReturnMode === 'title' ? 'Back to title' : 'Back to game');

    if (!showResetConfirmation) {
      drawWrappedText(
        context,
        'Settings stay saved in this browser.',
        34,
        118,
        124,
        6,
        currentBiomeDefinition.palette.accent,
        2,
      );
      return;
    }

    menuHitTargets = [];
    fillPixelPanel(
      context,
      28,
      86,
      136,
      44,
      currentBiomeDefinition.palette.card,
      currentBiomeDefinition.palette.cardShadow,
    );
    drawUiText(context, 'RESET SAVE?', 38, 91, currentBiomeDefinition.palette.text);
    drawWrappedText(
      context,
      'Journal and visits go back to the start.',
      38,
      99,
      118,
      6,
      currentBiomeDefinition.palette.text,
      2,
    );
    const keepSelected = selectedMenuActionId === 'cancel-reset';
    drawPanelButton(context, 38, 117, 52, 10, 'KEEP IT', {
      fill: keepSelected
        ? currentBiomeDefinition.palette.journalPage
        : currentBiomeDefinition.palette.journalSelected,
      border: keepSelected
        ? currentBiomeDefinition.palette.accent
        : currentBiomeDefinition.palette.cardShadow,
      text: currentBiomeDefinition.palette.text,
      selected: false,
    });
    if (keepSelected) {
      context.fillStyle = currentBiomeDefinition.palette.accent;
      context.fillRect(42, 119, 2, 6);
    }
    menuHitTargets.push({ id: 'cancel-reset', x: 38, y: 117, w: 52, h: 10 });
    const resetSelected = selectedMenuActionId === 'confirm-reset';
    drawPanelButton(context, 102, 117, 50, 10, 'RESET', {
      fill: resetSelected ? '#fde7d8' : '#f0c6a8',
      border: resetSelected ? '#7d2919' : currentBiomeDefinition.palette.cardShadow,
      text: '#7d2919',
      selected: false,
    });
    if (resetSelected) {
      context.fillStyle = '#7d2919';
      context.fillRect(106, 119, 2, 6);
    }
    menuHitTargets.push({ id: 'confirm-reset', x: 102, y: 117, w: 50, h: 10 });
  }

  function formatBiomeTabLabel(biomeId: string): string {
    return biomeId
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  function formatCategoryProgressLabel(progress: JournalBiomeProgress['categoryProgress'][number]): string {
    const labelByCategory: Record<InspectableEntry['category'], string> = {
      shell: 'SHELL',
      plant: 'PLANT',
      animal: 'ANIMAL',
      landmark: 'PLACE',
    };

    return `${labelByCategory[progress.category]} ${progress.discoveredCount}/${progress.totalCount}`;
  }

  function drawJournalOverlay(): void {
    const biomeProgress = getJournalBiomeProgressList();
    const selectedBiomeProgress =
      biomeProgress.find((biome) => biome.biomeId === selectedJournalBiomeId) ?? biomeProgress[0];
    const discoveredEntries = getDiscoveredEntriesList(selectedBiomeProgress.biomeId);
    journalHitTargets = [];
    journalBiomeHitTargets = [];

    if (selectedBiomeProgress.biomeId !== selectedJournalBiomeId) {
      selectedJournalBiomeId = selectedBiomeProgress.biomeId;
      setSelectedJournalEntry(true);
    }

    setSelectedJournalEntry(true);

    context.fillStyle = 'rgba(32, 25, 20, 0.45)';
    context.fillRect(0, 0, WIDTH, HEIGHT);
    fillPixelPanel(
      context,
      8,
      8,
      WIDTH - 16,
      128,
      currentBiomeDefinition.palette.journalPage,
      currentBiomeDefinition.palette.cardShadow,
    );

    context.font = UI_FONT_MEDIUM;
    drawUiText(context, 'FIELD JOURNAL', 18, 13, currentBiomeDefinition.palette.text);
    context.font = UI_FONT_SMALL;
    drawUiText(
      context,
      `${getDiscoveredEntryIds(save).length} total`,
      WIDTH - 58,
      14,
      currentBiomeDefinition.palette.text,
    );

    const tabGap = 4;
    const tabWidth = Math.floor((WIDTH - 28 - tabGap * (biomeProgress.length - 1)) / biomeProgress.length);
    let tabX = 14;

    for (const biome of biomeProgress) {
      const isSelected = biome.biomeId === selectedBiomeProgress.biomeId;
      drawPanelButton(context, tabX, 28, tabWidth, 12, formatBiomeTabLabel(biome.biomeId), {
        fill: isSelected
          ? currentBiomeDefinition.palette.journalPage
          : currentBiomeDefinition.palette.journalSelected,
        border: isSelected
          ? currentBiomeDefinition.palette.accent
          : currentBiomeDefinition.palette.cardShadow,
        text: currentBiomeDefinition.palette.text,
        selected: false,
      });
      if (isSelected) {
        context.fillStyle = currentBiomeDefinition.palette.accent;
        context.fillRect(tabX + 4, 31, 2, 6);
      }
      journalBiomeHitTargets.push({ biomeId: biome.biomeId, x: tabX, y: 28, w: tabWidth, h: 12 });
      tabX += tabWidth + tabGap;
    }

    fillPixelPanel(
      context,
      14,
      44,
      WIDTH - 28,
      12,
      currentBiomeDefinition.palette.journalSelected,
      currentBiomeDefinition.palette.cardShadow,
    );
    drawUiText(
      context,
      `${selectedBiomeProgress.name} ${selectedBiomeProgress.discoveredCount}/${selectedBiomeProgress.totalCount}`,
      18,
      47,
      currentBiomeDefinition.palette.text,
    );

    fillPixelPanel(
      context,
      14,
      60,
      58,
      62,
      currentBiomeDefinition.palette.journalSelected,
      currentBiomeDefinition.palette.card,
    );
    fillPixelPanel(
      context,
      78,
      60,
      98,
      62,
      currentBiomeDefinition.palette.journalSelected,
      currentBiomeDefinition.palette.cardShadow,
    );

    let listY = 66;
    for (const categoryProgress of selectedBiomeProgress.categoryProgress) {
      drawUiText(
        context,
        formatCategoryProgressLabel(categoryProgress),
        18,
        listY,
        currentBiomeDefinition.palette.accent,
      );
      listY += 8;

      const categoryEntries = discoveredEntries.filter((entry) => entry.category === categoryProgress.category);
      for (const entry of categoryEntries) {
        if (listY > 111) {
          break;
        }

        const isSelected = entry.id === selectedJournalEntryId;
        if (isSelected) {
          fillPixelPanel(
            context,
            16,
            listY - 1,
            54,
            10,
            currentBiomeDefinition.palette.journalPage,
            currentBiomeDefinition.palette.accent,
          );
        }

        drawUiText(context, entry.commonName, 20, listY + 1, currentBiomeDefinition.palette.text);
        journalHitTargets.push({ entryId: entry.id, x: 16, y: listY - 1, w: 54, h: 10 });
        listY += 12;
      }
    }

    if (!discoveredEntries.length) {
      drawWrappedText(
        context,
        `This ${formatBiomeTabLabel(selectedBiomeProgress.biomeId).toLowerCase()} page is still empty. Explore and inspect nature to fill it in.`,
        86,
        72,
        82,
        7,
        currentBiomeDefinition.palette.text,
        4,
      );
      return;
    }

    const selectedEntry = discoveredEntries.find((entry) => entry.id === selectedJournalEntryId) ?? discoveredEntries[0];
    const selectedEntryDetail = getInspectableDetail(selectedEntry);
    drawSprite(context, sprites, selectedEntry.spriteId, 88, 70, 0);
    context.drawImage(
      sprites[selectedEntry.spriteId][0].canvas,
      88,
      70,
      sprites[selectedEntry.spriteId][0].width * 2,
      sprites[selectedEntry.spriteId][0].height * 2,
    );

    context.font = UI_FONT_MEDIUM;
    drawUiText(context, selectedEntry.commonName, 112, 66, currentBiomeDefinition.palette.text);
    context.font = UI_FONT_SMALL;
    drawWrappedText(
      context,
      selectedEntryDetail.text,
      112,
      78,
      56,
      6,
      currentBiomeDefinition.palette.accent,
      2,
    );
    drawWrappedText(
      context,
      selectedEntry.journalText,
      86,
      94,
      84,
      6,
      currentBiomeDefinition.palette.text,
      4,
    );
  }

  function drawBiomeScene(
    highlightDoor: boolean,
    doorOpenAmount: number,
    showNearestMarkers: boolean,
    transitionSnapshot: DoorTransitionSnapshot | null = null,
  ): void {
    drawBiomeGradient();
    drawTerrain();
    drawBiomeDoor(doorOpenAmount, highlightDoor);
    drawEntities(showNearestMarkers);

    if (transitionSnapshot) {
      drawTransitionBiomeAvatar(transitionSnapshot);
      return;
    }

    drawPlayer();
  }

  function drawWorldMapState(renderState: WorldMapState): void {
    drawWorldMapScene(context, sprites, ecoWorldMap, renderState, frameCount);
    drawWorldMapHud();
  }

  function render(): void {
    frameCount += 1;
    context.clearRect(0, 0, WIDTH, HEIGHT);

    const transitionSnapshot = getTransitionSnapshot();

    if (sceneMode === 'world-map') {
      drawWorldMapState(worldMapState);
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
        drawWorldMapState(renderState);
      } else {
        if (transitionSnapshot.avatar?.space === 'biome') {
          cameraX = clamp(transitionSnapshot.avatar.x - WIDTH * 0.35, 0, currentBiome.width - WIDTH);
        }

        drawBiomeScene(
          false,
          transitionSnapshot.phaseId === 'biome-exit' || transitionSnapshot.phaseId === 'fade-out'
            ? transitionSnapshot.sourceDoorOpen
            : transitionSnapshot.destinationDoorOpen,
          false,
          transitionSnapshot,
        );
      }

      drawFade(context, transitionSnapshot.fadeAlpha);
    } else {
      drawBiomeScene(
        overlayMode === 'playing' &&
          sceneMode === 'biome' &&
          !bubble &&
          save.settings.showInspectHints &&
          isNearBiomeDoor(),
        0,
        save.settings.showInspectHints,
      );
      drawBubble();
    }

    drawMenuChip();

    if (overlayMode === 'title') {
      drawTitleOverlay();
    }

    if (overlayMode === 'journal') {
      drawJournalOverlay();
    }

    if (overlayMode === 'menu') {
      drawMenuOverlay();
    }
  }

  function renderGameToText(): string {
    const transitionSnapshot = getTransitionSnapshot();
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
              space: 'biome' as const,
            };

    return JSON.stringify({
      coordinateSystem: 'origin top-left, x right, y down',
      scene: sceneMode,
      mode: overlayMode,
      biomeId: transitionSnapshot?.activeBiomeId ?? currentBiome.biomeId,
      visitCount: currentBiome.visitCount,
      player: scenePlayer,
      worldMap:
        sceneMode === 'world-map' || transitionSnapshot?.scene === 'world-map'
          ? {
              currentLocationId: worldMapState.currentLocationId,
              focusedLocationId: worldMapState.focusedLocationId,
              mode: worldMapState.mode,
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
      nearbyInspectables: nearby,
      nearbyDoor:
        sceneMode === 'biome'
          ? {
              biomeId: currentBiomeDefinition.id,
              inRange: isNearBiomeDoor(),
            }
          : null,
      openBubble: bubble
        ? {
            title: bubble.title,
            detailLabel: bubble.detailLabel,
            detailText: bubble.detailText,
            scientificName: bubble.detailLabel === 'Scientific name' ? bubble.detailText : undefined,
            isNewEntry: bubble.isNewEntry,
          }
        : null,
      menu:
        overlayMode === 'menu'
          ? {
              returnMode: menuReturnMode,
              selectedAction: selectedMenuActionId,
              confirmReset: showResetConfirmation,
            }
          : null,
      settings: {
        fullscreen: save.settings.fullscreen,
        showInspectHints: save.settings.showInspectHints,
      },
      journal:
        overlayMode === 'journal'
          ? {
              selectedBiomeId: selectedJournalBiomeId,
              selectedEntryId: selectedJournalEntryId,
              biomeProgress: getJournalBiomeProgressList().map((biome) => ({
                biomeId: biome.biomeId,
                discoveredCount: biome.discoveredCount,
                totalCount: biome.totalCount,
              })),
            }
          : null,
      discoveredJournalCount: getDiscoveredEntryIds(save).length,
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
