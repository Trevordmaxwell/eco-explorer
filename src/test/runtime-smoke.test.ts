import { afterEach, describe, expect, it } from 'vitest';

import { beachBiome, coastalScrubBiome, forestBiome } from '../content/biomes';
import { createGame } from '../engine/game';
import { createNewSaveState, loadOrCreateSave, persistSave, recordDiscovery } from '../engine/save';

class FakeEventTarget {
  private listeners = new Map<string, Set<(event: any) => void>>();

  addEventListener(type: string, listener: (event: any) => void): void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)?.add(listener);
  }

  removeEventListener(type: string, listener: (event: any) => void): void {
    this.listeners.get(type)?.delete(listener);
  }

  dispatchEvent(event: { type: string; [key: string]: unknown }): boolean {
    this.listeners.get(event.type)?.forEach((listener) => listener(event));
    return true;
  }
}

class FakeLocalStorage {
  private values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }

  removeItem(key: string): void {
    this.values.delete(key);
  }

  clear(): void {
    this.values.clear();
  }
}

class FakeCanvasContext {
  fillStyle = '#000000';
  font = '10px sans-serif';
  imageSmoothingEnabled = false;
  textBaseline: CanvasTextBaseline = 'alphabetic';

  clearRect(): void {}
  fillRect(): void {}
  fillText(): void {}
  drawImage(): void {}
  save(): void {}
  restore(): void {}
  scale(): void {}

  createLinearGradient(): CanvasGradient {
    return {
      addColorStop() {},
    } as CanvasGradient;
  }

  measureText(text: string): TextMetrics {
    return { width: text.length * 4 } as TextMetrics;
  }
}

class FakeCanvas extends FakeEventTarget {
  width = 256;
  height = 160;
  clientWidth = 256;
  clientHeight = 160;
  private readonly context = new FakeCanvasContext();

  getContext(type: string): CanvasRenderingContext2D | null {
    return type === '2d' ? (this.context as unknown as CanvasRenderingContext2D) : null;
  }

  getBoundingClientRect(): DOMRect {
    return {
      left: 0,
      top: 0,
      width: this.clientWidth,
      height: this.clientHeight,
      right: this.clientWidth,
      bottom: this.clientHeight,
      x: 0,
      y: 0,
      toJSON() {
        return {};
      },
    } as DOMRect;
  }
}

class FakeDocument {
  createElement(tagName: string): HTMLElement {
    if (tagName === 'canvas') {
      return new FakeCanvas() as unknown as HTMLElement;
    }

    return {} as HTMLElement;
  }
}

class FakeWindow extends FakeEventTarget {
  readonly localStorage = new FakeLocalStorage();
  readonly document = new FakeDocument();
  advanceTime?: (ms: number) => void;
  render_game_to_text?: () => string;
}

const originalWindow = globalThis.window;
const originalDocument = globalThis.document;
const originalRequestAnimationFrame = globalThis.requestAnimationFrame;
const originalCancelAnimationFrame = globalThis.cancelAnimationFrame;
const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator');

function installFakeDom(): { window: FakeWindow; document: FakeDocument; copiedTexts: string[] } {
  const fakeWindow = new FakeWindow();
  const fakeDocument = fakeWindow.document;
  const copiedTexts: string[] = [];

  Object.assign(globalThis, {
    window: fakeWindow,
    document: fakeDocument,
    requestAnimationFrame: () => 1,
    cancelAnimationFrame: () => {},
  });
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: {
      clipboard: {
        writeText: async (text: string) => {
          copiedTexts.push(text);
        },
      },
    },
  });

  return { window: fakeWindow, document: fakeDocument, copiedTexts };
}

function readState(fakeWindow: FakeWindow): any {
  const raw = fakeWindow.render_game_to_text?.();
  if (!raw) {
    throw new Error('Expected render_game_to_text to be available.');
  }
  return JSON.parse(raw);
}

function tapKey(fakeWindow: FakeWindow, key: string): void {
  fakeWindow.dispatchEvent({ type: 'keydown', key, preventDefault() {} });
  fakeWindow.advanceTime?.(16);
  fakeWindow.dispatchEvent({ type: 'keyup', key, preventDefault() {} });
  fakeWindow.advanceTime?.(16);
}

function tapCanvas(canvas: FakeCanvas, x: number, y: number): void {
  canvas.dispatchEvent({ type: 'pointerdown', clientX: x, clientY: y });
}

function holdKey(fakeWindow: FakeWindow, key: string, frames: number): void {
  fakeWindow.dispatchEvent({ type: 'keydown', key, preventDefault() {} });
  for (let index = 0; index < frames; index += 1) {
    fakeWindow.advanceTime?.(16);
  }
  fakeWindow.dispatchEvent({ type: 'keyup', key, preventDefault() {} });
  fakeWindow.advanceTime?.(16);
}

function advanceWhileHoldingKeyUntil(
  fakeWindow: FakeWindow,
  key: string,
  predicate: (state: any) => boolean,
  maxSteps = 120,
): any {
  fakeWindow.dispatchEvent({ type: 'keydown', key, preventDefault() {} });

  try {
    for (let index = 0; index < maxSteps; index += 1) {
      fakeWindow.advanceTime?.(16);
      const state = readState(fakeWindow);
      if (predicate(state)) {
        return state;
      }
    }
  } finally {
    fakeWindow.dispatchEvent({ type: 'keyup', key, preventDefault() {} });
    fakeWindow.advanceTime?.(16);
  }

  throw new Error(`Timed out waiting while holding ${key}.`);
}

function advanceUntil(
  fakeWindow: FakeWindow,
  predicate: (state: any) => boolean,
  maxSteps = 80,
): any {
  for (let index = 0; index < maxSteps; index += 1) {
    const state = readState(fakeWindow);
    if (predicate(state)) {
      return state;
    }

    fakeWindow.advanceTime?.(100);
  }

  throw new Error('Timed out waiting for runtime state.');
}

afterEach(() => {
  Object.assign(globalThis, {
    window: originalWindow,
    document: originalDocument,
    requestAnimationFrame: originalRequestAnimationFrame,
    cancelAnimationFrame: originalCancelAnimationFrame,
  });
  if (originalNavigator) {
    Object.defineProperty(globalThis, 'navigator', originalNavigator);
  } else {
    // @ts-expect-error test cleanup for environments without navigator
    delete globalThis.navigator;
  }
});

describe('runtime smoke loop', () => {
  it('covers title, play, inspect, menu, world-map travel, journal, and reload persistence', async () => {
    const { window: fakeWindow, document, copiedTexts } = installFakeDom();
    const seedSave = createNewSaveState('runtime-smoke-seed');
    persistSave(seedSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seedSave);

    expect(readState(fakeWindow).mode).toBe('title');

    tapKey(fakeWindow, 'm');
    let state = readState(fakeWindow);
    expect(state.mode).toBe('menu');
    expect(state.menu?.availableActions).not.toContain('field-guide');
    tapKey(fakeWindow, 'm');
    expect(readState(fakeWindow).mode).toBe('title');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('playing');

    const beachGrass = state.nearbyInspectables.find((entity: any) => entity.entryId === 'beach-grass');
    if (!beachGrass) {
      throw new Error('Expected beach grass to be near the player at the beach start.');
    }

    game.inspectEntity(beachGrass.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(state.openBubble?.title).toBeTruthy();
    expect(state.discoveredJournalCount).toBe(1);

    tapKey(fakeWindow, 'j');
    state = readState(fakeWindow);
    expect(state.mode).toBe('journal');
    expect(state.journal?.selectedBiomeId).toBe('beach');
    expect(state.journal?.selectedSurveyState).toBe('none');
    expect(state.journal?.biomeProgress).toHaveLength(5);
    expect(state.journal?.biomeProgress[0]?.surveyState).toBe('none');
    expect(state.journal?.ecosystemNote?.state).toBe('locked');
    expect(state.journal?.ecosystemNote?.title).toBeNull();

    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('coastal-scrub');
    expect(state.journal?.selectedEntryId).toBeNull();
    expect(state.journal?.selectedSurveyState).toBe('none');

    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('forest');

    tapKey(fakeWindow, 'ArrowLeft');
    state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('coastal-scrub');

    tapKey(fakeWindow, 'ArrowLeft');
    state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('beach');

    tapKey(fakeWindow, 'Escape');
    expect(readState(fakeWindow).mode).toBe('playing');

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    expect(state.mode).toBe('menu');
    expect(state.menu?.availableActions).toContain('field-guide');
    expect(state.menu?.selectedAction).toBe('toggle-fullscreen');

    tapKey(fakeWindow, 'ArrowUp');
    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('field-guide');

    tapKey(fakeWindow, 'Enter');
    await Promise.resolve();
    await Promise.resolve();
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(state.mode).toBe('playing');
    expect(state.fieldGuideNotice?.state).toBe('copied');
    expect(copiedTexts).toHaveLength(1);
    expect(copiedTexts[0]).toContain('"Sunny Beach" biome');
    expect(copiedTexts[0]).toContain('NEARBY ORGANISMS AND FEATURES');
    expect(copiedTexts[0]).toContain('STILL HIDDEN IN THIS BIOME');
    expect(copiedTexts[0]).toContain('CURRENT WORLD STATE');
    expect(copiedTexts[0]).toContain('Day part: day');
    expect(copiedTexts[0]).toContain('Weather: clear');
    expect(copiedTexts[0]).not.toContain('Ghost Crab');
    expect(copiedTexts[0]).toContain('If a food web,');
    expect(fakeWindow.render_game_to_text?.()).not.toContain('NEARBY ORGANISMS AND FEATURES');

    game.enterBiome('forest');
    state = readState(fakeWindow);
    expect(state.biomeId).toBe('forest');
    expect(state.nearbyDoor?.inRange).toBe(true);

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'ArrowUp');
    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('world-map');

    tapKey(fakeWindow, 'Enter');
    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.currentLocationId).toBe('forest');
    expect(state.worldMap?.focusedLocationId).toBe('forest');

    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.worldMap?.focusedLocationId).toBe('treeline');
    expect(state.worldMap?.focusedSurveyState).toBe('none');

    tapKey(fakeWindow, 'j');
    state = readState(fakeWindow);
    expect(state.mode).toBe('journal');
    expect(state.scene).toBe('world-map');
    expect(state.journal?.selectedBiomeId).toBe('treeline');

    tapKey(fakeWindow, 'Escape');
    state = readState(fakeWindow);
    expect(state.mode).toBe('playing');
    expect(state.scene).toBe('world-map');

    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.worldMap?.focusedLocationId).toBe('tundra');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.worldMap?.mode).toBe('walking');

    state = advanceUntil(
      fakeWindow,
      (nextState) =>
        nextState.transition?.kind === 'map-to-biome' && nextState.transition?.toBiomeId === 'tundra',
      120,
    );
    expect(state.transition?.scene).toBe('world-map');
    expect(state.transition?.toBiomeId).toBe('tundra');

    state = advanceUntil(
      fakeWindow,
      (nextState) => nextState.scene === 'biome' && nextState.biomeId === 'tundra',
      120,
    );
    expect(state.biomeId).toBe('tundra');
    expect(state.player?.space).toBe('biome');

    game.enterBiome('coastal-scrub');
    state = readState(fakeWindow);
    expect(state.biomeId).toBe('coastal-scrub');
    expect(state.visitCount).toBe(1);

    const scrubGrass = state.nearbyInspectables.find((entity: any) => entity.entryId === 'beach-grass');
    if (!scrubGrass) {
      throw new Error('Expected beach grass to be near the player at the coastal scrub start.');
    }

    game.inspectEntity(scrubGrass.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(state.openBubble?.isNewEntry).toBe(false);
    expect(state.discoveredJournalCount).toBe(1);

    tapKey(fakeWindow, 'j');
    state = readState(fakeWindow);
    expect(state.mode).toBe('journal');
    expect(state.journal?.selectedBiomeId).toBe('coastal-scrub');
    expect(state.journal?.selectedEntryId).toBe('beach-grass');
    expect(state.journal?.selectedSurveyState).toBe('none');
    expect(state.journal?.selectedEntrySightings).toEqual(['beach', 'coastal-scrub']);

    tapKey(fakeWindow, 'Escape');
    expect(readState(fakeWindow).mode).toBe('playing');

    game.enterBiome('treeline');
    state = readState(fakeWindow);
    expect(state.biomeId).toBe('treeline');
    expect(state.visitCount).toBe(1);

    const reloadedSave = loadOrCreateSave();
    const reloadedCanvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(reloadedCanvas, reloadedSave);

    state = readState(fakeWindow);
    expect(state.mode).toBe('title');
    expect(state.biomeId).toBe('treeline');
    expect(state.discoveredJournalCount).toBe(1);
  });

  it('surfaces surveyed biome states in the journal and the world map debug state', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-survey-seed');
    for (const entryId of ['beach-grass', 'sand-verbena', 'native-littleneck-shell', 'western-snowy-plover']) {
      recordDiscovery(seededSave, beachBiome.entries[entryId], 'beach');
    }
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'j');

    let state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('beach');
    expect(state.journal?.selectedSurveyState).toBe('surveyed');
    expect(state.journal?.biomeProgress.find((biome: any) => biome.biomeId === 'beach')?.surveyState).toBe('surveyed');

    tapKey(fakeWindow, 'Escape');
    game.enterBiome('forest');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.focusedLocationId).toBe('forest');
    expect(state.worldMap?.focusedSurveyState).toBe('none');

    tapKey(fakeWindow, 'ArrowLeft');
    tapKey(fakeWindow, 'ArrowLeft');
    state = readState(fakeWindow);
    expect(state.worldMap?.focusedLocationId).toBe('beach');
    expect(state.worldMap?.focusedSurveyState).toBe('surveyed');
  });

  it('opens the surveyed-biome sketchbook, places local stamps, and keeps them after reload', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-sketchbook-seed');
    for (const entryId of ['beach-grass', 'sand-verbena', 'native-littleneck-shell', 'western-snowy-plover']) {
      recordDiscovery(seededSave, beachBiome.entries[entryId], 'beach');
    }
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'j');

    let state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('beach');
    expect(state.journal?.selectedSurveyState).toBe('surveyed');
    expect(state.journal?.sketchbook).toMatchObject({
      available: true,
      open: false,
    });

    const firstEntryId = state.journal?.selectedEntryId;
    tapKey(fakeWindow, 'x');
    state = readState(fakeWindow);
    expect(state.journal?.sketchbook).toMatchObject({
      available: true,
      open: true,
      selectedSlotId: 'top-left',
    });

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.journal?.sketchbook?.slots.find((slot: any) => slot.slotId === 'top-left')).toMatchObject({
      entryId: firstEntryId,
    });

    tapKey(fakeWindow, 'ArrowRight');
    tapKey(fakeWindow, 'ArrowDown');
    state = readState(fakeWindow);
    const secondEntryId = state.journal?.selectedEntryId;
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.journal?.sketchbook?.slots.find((slot: any) => slot.slotId === 'top-right')).toMatchObject({
      entryId: secondEntryId,
    });

    tapKey(fakeWindow, 'Backspace');
    state = readState(fakeWindow);
    expect(state.journal?.sketchbook?.slots.find((slot: any) => slot.slotId === 'top-right')).toMatchObject({
      entryId: null,
    });

    tapKey(fakeWindow, 'Escape');
    const reloadedSave = loadOrCreateSave();
    const reloadedCanvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(reloadedCanvas, reloadedSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'j');
    tapKey(fakeWindow, 'x');
    state = readState(fakeWindow);
    expect(state.journal?.sketchbook).toMatchObject({
      available: true,
      open: true,
    });
    expect(state.journal?.sketchbook?.slots.find((slot: any) => slot.slotId === 'top-left')).toMatchObject({
      entryId: firstEntryId,
    });
  });

  it('arms sound after input and lets the player toggle it from the menu', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-sound-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    let state = readState(fakeWindow);
    expect(state.sound).toMatchObject({
      enabled: true,
      armed: true,
      ambientProfileId: 'shore',
    });
    expect(state.settings.soundEnabled).toBe(true);

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    expect(state.menu?.availableActions).toContain('toggle-sound');
    expect(state.menu?.selectedAction).toBe('toggle-fullscreen');

    tapKey(fakeWindow, 'ArrowDown');
    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('toggle-sound');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.settings.soundEnabled).toBe(false);
    expect(state.sound).toMatchObject({
      enabled: false,
      armed: true,
      ambientProfileId: 'shore',
    });
  });

  it('opens a close-look card from a supported inspect bubble and closes back to play', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-close-look-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    const stateWithShell = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.nearbyInspectables.some((entity: any) =>
          ['moon-snail-shell', 'razor-clam-shell'].includes(entity.entryId),
        ),
      520,
    );
    const target = stateWithShell.nearbyInspectables.find((entity: any) =>
      ['moon-snail-shell', 'razor-clam-shell'].includes(entity.entryId),
    );
    if (!target) {
      throw new Error('Expected a supported beach shell to appear near the player.');
    }

    game.inspectEntity(target.entityId);
    fakeWindow.advanceTime?.(16);

    let state = readState(fakeWindow);
    expect(state.openBubble).toMatchObject({
      entryId: target.entryId,
      closeLookAvailable: true,
    });
    expect(state.closeLook).toBeNull();

    tapKey(fakeWindow, 'E');
    state = readState(fakeWindow);
    expect(state.mode).toBe('close-look');
    expect(state.closeLook).toMatchObject({
      entryId: target.entryId,
    });

    tapKey(fakeWindow, 'Escape');
    state = readState(fakeWindow);
    expect(state.mode).toBe('playing');
    expect(state.closeLook).toBeNull();
    expect(state.openBubble).toBeNull();
  });

  it('surfaces one active field request in the journal and advances it when the player reaches root hollow', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-field-request-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    tapKey(fakeWindow, 'j');
    let state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('forest');
    expect(state.journal?.fieldRequest).toMatchObject({
      id: 'forest-hidden-hollow',
      progressLabel: 'Visit Root Hollow',
    });

    tapKey(fakeWindow, 'Escape');
    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'root-hollow',
      520,
    );
    expect(state.zoneId).toBe('root-hollow');
    expect(seededSave.completedFieldRequestIds).toContain('forest-hidden-hollow');
    expect(state.activeFieldRequest).toMatchObject({
      id: 'forest-moisture-holders',
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'TASK RECORDED',
      text: 'Hidden Hollow',
    });

    tapKey(fakeWindow, 'j');
    state = readState(fakeWindow);
    expect(state.journal?.fieldRequest).toMatchObject({
      id: 'forest-moisture-holders',
    });
  });

  it('lets the player follow the new beach lee pocket and reach its shelter carriers', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-lee-pocket-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');

    const state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'lee-pocket' &&
        nextState.player?.x >= 308 &&
        (nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'driftwood-log') ||
          nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'bull-kelp-wrack') ||
          nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'pacific-sand-crab')),
      520,
    );

    expect(state.zoneId).toBe('lee-pocket');
    expect(state.player?.y).toBeGreaterThanOrEqual(111);
    expect(
      state.nearbyInspectables.some((entity: any) =>
        ['driftwood-log', 'bull-kelp-wrack', 'pacific-sand-crab'].includes(entity.entryId),
      ),
    ).toBe(true);
  });

  it('shows climb hints and lets the player follow the deeper root-hollow cave route', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-tree-climb-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'root-hollow' && nextState.player?.x >= 326,
      520,
    );
    expect(state.zoneId).toBe('root-hollow');
    expect(state.camera?.y).toBeGreaterThan(0);
    expect(state.nearbyClimbable).toMatchObject({
      id: 'root-hollow-fir-trunk',
      inRange: true,
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.activeClimbableId === 'root-hollow-fir-trunk',
      80,
    );
    expect(state.player).toMatchObject({
      climbing: true,
      activeClimbableId: 'root-hollow-fir-trunk',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.y <= 98,
      80,
    );
    expect(state.player?.y).toBeLessThanOrEqual(98);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => !nextState.player?.climbing && nextState.player?.y <= 98 && nextState.player?.x >= 340,
      80,
    );
    expect(state.player).toMatchObject({
      climbing: false,
    });
    expect(state.player?.y).toBeLessThanOrEqual(98);
    expect(
      state.nearbyInspectables.some((entity: any) =>
        ['licorice-fern', 'tree-lungwort'].includes(entity.entryId),
      ),
    ).toBe(true);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.player?.y <= 98 &&
        nextState.nearbyClimbable?.id === 'root-hollow-cave-trunk',
      120,
    );
    expect(state.nearbyClimbable).toMatchObject({
      id: 'root-hollow-cave-trunk',
      inRange: true,
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.activeClimbableId === 'root-hollow-cave-trunk',
      80,
    );
    expect(state.player).toMatchObject({
      climbing: true,
      activeClimbableId: 'root-hollow-cave-trunk',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.y <= 80,
      80,
    );
    expect(state.player?.y).toBeLessThanOrEqual(80);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => !nextState.player?.climbing && nextState.player?.y <= 84 && nextState.player?.x >= 406,
      120,
    );
    expect(state.player).toMatchObject({
      climbing: false,
    });
    expect(state.player?.y).toBeLessThanOrEqual(84);
    expect(
      state.nearbyInspectables.some((entity: any) =>
        ['licorice-fern', 'tree-lungwort', 'ensatina'].includes(entity.entryId),
      ),
    ).toBe(true);
  });

  it('opens the world-map field station, claims field credit, and buys trail stride', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-field-station-seed');
    for (const entryId of ['beach-grass', 'sand-verbena', 'native-littleneck-shell', 'western-snowy-plover']) {
      recordDiscovery(seededSave, beachBiome.entries[entryId], 'beach');
    }
    for (const entryId of ['banana-slug', 'sword-fern', 'redwood-sorrel', 'fir-cone']) {
      recordDiscovery(seededSave, forestBiome.entries[entryId], 'forest');
    }
    seededSave.completedFieldRequestIds = ['forest-hidden-hollow', 'forest-moisture-holders'];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.focusedLocationId).toBe('forest');

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    expect(state.menu?.availableActions).toContain('field-station');

    tapKey(fakeWindow, 'ArrowUp');
    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('field-station');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation).toMatchObject({
      credits: 5,
      purchasedUpgradeIds: [],
      selectedUpgradeId: 'trail-stride',
    });
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeTitle: 'COASTAL SHELTER LINE',
      progressLabel: '1/3 logged',
      beats: [
        { id: 'forest-study', status: 'done' },
        { id: 'station-return', status: 'active' },
        { id: 'coastal-comparison', status: 'upcoming' },
      ],
    });
    expect(state.fieldStation?.upgrades.map((upgrade: any) => upgrade.id)).toEqual(['trail-stride']);
    expect(state.fieldStation?.recentSources.map((source: any) => source.id)).toEqual([
      'request:forest-survey-slice',
      'request:forest-moisture-holders',
    ]);

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation).toMatchObject({
      credits: 2,
      purchasedUpgradeIds: ['trail-stride'],
    });
    expect(state.fieldStation?.upgrades[0]).toMatchObject({
      id: 'trail-stride',
      owned: true,
    });
    expect(state.fieldStation?.upgrades[1]).toMatchObject({
      id: 'field-step',
      owned: false,
      affordable: false,
    });
    expect(state.fieldStation?.routeBoard).toMatchObject({
      progressLabel: '2/3 logged',
      beats: [
        { id: 'forest-study', status: 'done' },
        { id: 'station-return', status: 'done' },
        { id: 'coastal-comparison', status: 'active' },
      ],
    });
    expect(state.movement?.walkSpeed).toBe(46);
    expect(state.movement?.jumpSpeed).toBe(118);

    tapKey(fakeWindow, 'Escape');
    state = readState(fakeWindow);
    expect(state.mode).toBe('playing');
    expect(state.scene).toBe('world-map');
  });

  it('opens the nursery tab and starts one teaching-bed project from the field station', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-nursery-station-seed');
    recordDiscovery(seededSave, coastalScrubBiome.entries['sand-verbena'], 'coastal-scrub');
    seededSave.completedFieldRequestIds = ['coastal-shelter-shift'];
    seededSave.nurseryResources.cuttings = 1;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'ArrowRight');
    tapKey(fakeWindow, 'ArrowRight');
    let state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.view).toBe('nursery');
    expect(state.fieldStation?.nursery.selectedProject).toMatchObject({
      id: 'sand-verbena-bed',
      affordable: true,
    });
    expect(state.fieldStation?.selectedNurseryCardId).toBe('bench');

    tapKey(fakeWindow, 'ArrowDown');
    tapKey(fakeWindow, 'ArrowDown');
    state = readState(fakeWindow);
    expect(state.fieldStation?.selectedNurseryCardId).toBe('bed');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation?.nursery.activeProject).toMatchObject({
      id: 'sand-verbena-bed',
      stage: 'stocked',
    });
    expect(state.fieldStation?.nursery.resources.cuttings).toBe(0);
  });

  it('adds a season expedition page that becomes ready after the three live routes are logged', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-expedition-slot-ready-seed');
    seededSave.completedFieldRequestIds = ['coastal-edge-moisture', 'tundra-survey-slice', 'treeline-low-fell'];
    seededSave.purchasedUpgradeIds = ['trail-stride', 'field-step', 'route-marker'];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.routeMarkerLocationId).toBe('forest');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');

    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.view).toBe('season');
    expect(state.fieldStation?.seasonPage).toBe('routes');

    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.fieldStation?.view).toBe('season');
    expect(state.fieldStation?.seasonPage).toBe('expedition');
    expect(state.fieldStation?.expedition).toMatchObject({
      id: 'root-hollow-expedition',
      status: 'ready',
      title: 'ROOT HOLLOW',
    });

    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.fieldStation?.view).toBe('nursery');
  });

  it('turns the forest expedition slot into a live three-leg chapter', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-expedition-chapter-seed');
    seededSave.completedFieldRequestIds = ['coastal-edge-moisture', 'tundra-survey-slice', 'treeline-low-fell'];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = readState(fakeWindow);
    expect(state.activeFieldRequest).toMatchObject({
      id: 'forest-expedition-lower-hollow',
      progressLabel: 'Visit Root Hollow',
    });
    expect(state.fieldStation?.expedition).toMatchObject({
      status: 'ready',
      statusLabel: 'READY',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'root-hollow' &&
        nextState.player?.x >= 326 &&
        nextState.activeFieldRequest?.id === 'forest-expedition-trunk-climb',
      520,
    );
    expect(seededSave.completedFieldRequestIds).toContain('forest-expedition-lower-hollow');
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'TASK RECORDED',
      text: 'Lower Hollow',
    });
    expect(state.fieldStation?.expedition).toMatchObject({
      status: 'active',
      statusLabel: '1/3',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.activeClimbableId === 'root-hollow-fir-trunk',
      80,
    );
    expect(state.player).toMatchObject({
      climbing: true,
      activeClimbableId: 'root-hollow-fir-trunk',
    });

    advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.y <= 98,
      80,
    );

    advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => !nextState.player?.climbing && nextState.player?.y <= 98 && nextState.player?.x >= 340,
      80,
    );

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.player?.y <= 98 && nextState.nearbyClimbable?.id === 'root-hollow-cave-trunk',
      120,
    );
    expect(state.nearbyClimbable).toMatchObject({
      id: 'root-hollow-cave-trunk',
      inRange: true,
    });

    advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.activeClimbableId === 'root-hollow-cave-trunk',
      80,
    );

    advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.y <= 80,
      80,
    );

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        !nextState.player?.climbing &&
        nextState.player?.y <= 84 &&
        nextState.activeFieldRequest?.id === 'forest-expedition-upper-run',
      120,
    );
    expect(seededSave.completedFieldRequestIds).toContain('forest-expedition-trunk-climb');
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'TASK RECORDED',
      text: 'Trunk Climb',
    });
    expect(state.fieldStation?.expedition).toMatchObject({
      status: 'active',
      statusLabel: '2/3',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'log-run' && nextState.fieldStation?.expedition?.status === 'logged',
      160,
    );
    expect(seededSave.completedFieldRequestIds).toContain('forest-expedition-upper-run');
    expect(state.activeFieldRequest).toBe(null);
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'TASK RECORDED',
      text: 'Upper Run',
    });
    expect(state.fieldStation?.expedition).toMatchObject({
      status: 'logged',
      statusLabel: 'LOGGED',
    });
  });

  it('buys route marker after the movement pair and exposes the next route stop on the world map', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-route-marker-seed');
    for (const entryId of ['banana-slug', 'sword-fern', 'redwood-sorrel', 'fir-cone']) {
      recordDiscovery(seededSave, forestBiome.entries[entryId], 'forest');
    }
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
    ];
    seededSave.purchasedUpgradeIds = ['trail-stride', 'field-step'];
    seededSave.fieldCredits = 7;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.focusedLocationId).toBe('forest');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.upgrades.map((upgrade: any) => upgrade.id)).toEqual([
      'trail-stride',
      'field-step',
      'route-marker',
    ]);

    tapKey(fakeWindow, 'ArrowDown');
    tapKey(fakeWindow, 'ArrowDown');
    state = readState(fakeWindow);
    expect(state.fieldStation?.selectedUpgradeId).toBe('route-marker');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation?.purchasedUpgradeIds).toEqual([
      'trail-stride',
      'field-step',
      'route-marker',
    ]);

    tapKey(fakeWindow, 'Escape');
    state = readState(fakeWindow);
    expect(state.scene).toBe('world-map');
    expect(state.worldMap?.routeMarkerLocationId).toBe('coastal-scrub');
  });

  it('switches the route board and route marker to treeline once the coastal line is logged', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-inland-route-board-seed');
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
    ];
    seededSave.purchasedUpgradeIds = ['trail-stride', 'field-step', 'route-marker'];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.focusedLocationId).toBe('forest');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeId: 'treeline-shelter-line',
      routeTitle: 'TREELINE SHELTER LINE',
      targetBiomeId: 'treeline',
      beats: [
        { id: 'treeline-shelter', status: 'active' },
        { id: 'tundra-short-season', status: 'upcoming' },
        { id: 'tundra-survey', status: 'upcoming' },
      ],
    });
    expect(state.fieldStation?.atlas).toEqual({
      title: 'FIELD ATLAS',
      loggedRoutes: ['COASTAL SHELTER LINE logged'],
      note: 'Next: keep following the inland line.',
    });

    tapKey(fakeWindow, 'Escape');
    const mapState = readState(fakeWindow);
    expect(mapState.scene).toBe('world-map');
    expect(mapState.worldMap?.routeMarkerLocationId).toBe('treeline');
  });

  it('switches the route board and route marker to coastal scrub once the inland line is logged', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-edge-route-board-seed');
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
      'tundra-short-season',
      'tundra-survey-slice',
    ];
    seededSave.purchasedUpgradeIds = ['trail-stride', 'field-step', 'route-marker'];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('tundra');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.focusedLocationId).toBe('tundra');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeId: 'edge-pattern-line',
      routeTitle: 'EDGE PATTERN LINE',
      targetBiomeId: 'coastal-scrub',
      beats: [
        { id: 'scrub-edge-pattern', status: 'active' },
        { id: 'forest-cool-edge', status: 'upcoming' },
        { id: 'treeline-low-fell', status: 'upcoming' },
      ],
    });
    expect(state.fieldStation?.atlas).toEqual({
      title: 'FIELD ATLAS',
      loggedRoutes: ['COASTAL SHELTER LINE logged', 'TREELINE SHELTER LINE logged'],
      note: 'Next: follow the edge pattern line.',
    });

    tapKey(fakeWindow, 'Escape');
    const mapState = readState(fakeWindow);
    expect(mapState.scene).toBe('world-map');
    expect(mapState.worldMap?.routeMarkerLocationId).toBe('coastal-scrub');
  });

  it('shows one route replay note when re-entering the active route biome during a live replay window', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-route-replay-note-seed');
    seededSave.completedFieldRequestIds = [
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
    seededSave.purchasedUpgradeIds = ['trail-stride', 'field-step', 'route-marker'];
    seededSave.worldStep = 5;
    seededSave.biomeVisits['coastal-scrub'] = 1;
    seededSave.biomeVisits.forest = 1;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    const state = readState(fakeWindow);
    expect(state.scene).toBe('biome');
    expect(state.biomeId).toBe('forest');
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'Moist Edge',
      text: 'Cool wet holdovers make the forest middle edge easiest to compare again.',
    });
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeId: 'edge-pattern-line',
      replayNote: {
        id: 'edge-moist-edge',
        title: 'Moist Edge',
      },
    });
    expect(state.fieldStation?.routeBoard?.beats).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'scrub-edge-pattern', status: 'done' }),
        expect.objectContaining({ id: 'forest-cool-edge', status: 'active', title: 'Moist Edge' }),
      ]),
    );
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'TODAY',
      text: 'Moist Edge is clear. Next: Forest Trail.',
    });
  });

  it('surfaces the live replay note in the world-map footer when the route target is focused', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-route-replay-map-seed');
    seededSave.completedFieldRequestIds = [
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
    seededSave.purchasedUpgradeIds = ['trail-stride', 'field-step', 'route-marker'];
    seededSave.worldStep = 6;
    seededSave.biomeVisits.forest = 2;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.routeMarkerLocationId).toBe('forest');

    tapKey(fakeWindow, 'ArrowRight');
    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.worldMap?.focusedLocationId).toBe('forest');
    expect(state.worldMap?.routeReplayLabel).toBe('Today: Moist Edge');
  });

  it('shows a route-logged stop cue in the field station once the live route is complete', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-season-wrap-logged-seed');
    seededSave.completedFieldRequestIds = [
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
    ];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');

    const state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeId: 'edge-pattern-line',
      complete: true,
    });
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'ROUTE LOGGED',
      text: 'Open the Root Hollow expedition.',
    });
  });

  it('surfaces the first field-season guidance from starter note to next habitat pointer', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-guided-field-season-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    let state = readState(fakeWindow);
    expect(state.guidedFieldSeason).toMatchObject({
      stage: 'starter',
      nextBiomeId: 'forest',
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'NOTEBOOK TASK',
    });

    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
    ];
    for (const entryId of ['banana-slug', 'sword-fern', 'redwood-sorrel', 'fir-cone']) {
      recordDiscovery(seededSave, forestBiome.entries[entryId], 'forest');
    }

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.guidedFieldSeason).toMatchObject({
      stage: 'station-return',
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'FIELD STATION',
    });

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.seasonNote).toMatchObject({
      title: 'RETURN TO STATION',
    });
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'RETURN TO STATION',
      text: 'Forest Trail is logged. Open the world-map field station and pick up Trail Stride for longer walks.',
    });

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.guidedFieldSeason).toMatchObject({
      stage: 'next-habitat',
      nextBiomeId: 'coastal-scrub',
    });
    expect(state.fieldStation?.seasonNote).toMatchObject({
      title: 'NEXT STOP',
    });
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'TODAY',
      text: 'Trail Stride. Next: Coastal Scrub.',
    });

    tapKey(fakeWindow, 'Escape');
    state = readState(fakeWindow);
    expect(state.scene).toBe('world-map');
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'NEXT STOP',
    });
  });

  it('reports the deterministic day-part cycle through the debug hook as biomes change', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-world-state-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');

    let state = readState(fakeWindow);
    expect(state.biomeId).toBe('beach');
    expect(state.worldState).toEqual({
      worldAge: 1,
      dayPart: 'day',
      weather: 'clear',
      phenologyPhase: 'early',
    });

    game.enterBiome('forest');
    state = readState(fakeWindow);
    expect(state.worldState).toEqual({
      worldAge: 2,
      dayPart: 'dusk',
      weather: 'mist-drip',
      phenologyPhase: 'early',
    });

    game.enterBiome('treeline');
    state = readState(fakeWindow);
    expect(state.worldState).toEqual({
      worldAge: 3,
      dayPart: 'dawn',
      weather: 'clear',
      phenologyPhase: 'peak',
    });

    game.enterBiome('treeline');
    state = readState(fakeWindow);
    expect(state.worldState).toEqual({
      worldAge: 3,
      dayPart: 'dawn',
      weather: 'clear',
      phenologyPhase: 'peak',
    });
  });

  it('exposes active habitat-process moments when a late coastal revisit starts trapping sand', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-habitat-process-seed');
    seededSave.worldStep = 6;
    seededSave.lastBiomeId = 'coastal-scrub';
    seededSave.biomeVisits['coastal-scrub'] = 2;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    const state = readState(fakeWindow);

    expect(state.biomeId).toBe('coastal-scrub');
    expect(state.worldState).toMatchObject({
      weather: 'marine-haze',
      phenologyPhase: 'late',
    });
    expect(state.habitatProcesses).toEqual(['sand-capture']);
  });

  it('exposes the forest moisture-hold process during a late wet revisit', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-forest-process-seed');
    seededSave.worldStep = 6;
    seededSave.lastBiomeId = 'forest';
    seededSave.biomeVisits.forest = 2;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    const state = readState(fakeWindow);

    expect(state.biomeId).toBe('forest');
    expect(state.worldState).toMatchObject({
      weather: 'mist-drip',
      phenologyPhase: 'late',
    });
    expect(state.habitatProcesses).toEqual(['moisture-hold']);
  });

  it('exposes the treeline frost-rime process during a late windy revisit', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-treeline-process-seed');
    seededSave.worldStep = 6;
    seededSave.lastBiomeId = 'treeline';
    seededSave.biomeVisits.treeline = 2;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    const state = readState(fakeWindow);

    expect(state.biomeId).toBe('treeline');
    expect(state.worldState).toMatchObject({
      weather: 'ridge-wind',
      phenologyPhase: 'late',
    });
    expect(state.habitatProcesses).toEqual(['frost-rime']);
  });

  it('exposes the tundra thaw fringe on a revisited peak-season meadow', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-tundra-process-seed');
    seededSave.worldStep = 4;
    seededSave.lastBiomeId = 'tundra';
    seededSave.biomeVisits.tundra = 2;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    const state = readState(fakeWindow);

    expect(state.biomeId).toBe('tundra');
    expect(state.worldState).toMatchObject({
      weather: 'clear',
      phenologyPhase: 'peak',
    });
    expect(state.habitatProcesses).toEqual(['thaw-fringe']);
  });

  it('surfaces the current habitat zone in a tiny chip during coastal traversal', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-habitat-chip-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('coastal-scrub');

    let state = readState(fakeWindow);
    expect(state.zoneId).toBe('back-dune');
    expect(state.habitatChipLabel).toBe('Back Dune');

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'windbreak-swale',
      420,
    );
    expect(state.habitatChipLabel).toBe('Windbreak Swale');
  });

  it('lets the coastal door enter the first corridor proof, switches ownership at the threshold, and keeps the map alive from the menu', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-corridor-proof-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('coastal-scrub');

    let state = readState(fakeWindow);
    expect(state.biomeId).toBe('coastal-scrub');
    expect(state.nearbyDoor?.inRange).toBe(true);

    tapKey(fakeWindow, 'e');
    state = readState(fakeWindow);
    expect(state.sceneBiomeId).toBe('beach-coastal-corridor');
    expect(state.corridor?.ownerBiomeId).toBe('coastal-scrub');
    expect(state.corridor?.zoneId).toBe('back-dune');
    expect(state.worldState.weather).toBe('marine-haze');
    expect(state.nearbyDoor).toBeNull();

    holdKey(fakeWindow, 'ArrowLeft', 170);
    state = readState(fakeWindow);
    expect(state.sceneBiomeId).toBe('beach-coastal-corridor');
    expect(state.corridor?.ownerBiomeId).toBe('beach');
    expect(state.corridor?.zoneId).toBe('dune-edge');
    expect(state.worldState.dayPart).toBe('dusk');
    expect(state.worldState.weather).toBe('marine-haze');
    expect(state.worldState.phenologyPhase).toBe('early');

    tapKey(fakeWindow, 'j');
    state = readState(fakeWindow);
    expect(state.mode).toBe('journal');
    expect(state.journal?.selectedBiomeId).toBe('beach');

    tapKey(fakeWindow, 'Escape');
    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    expect(state.menu?.availableActions).toContain('world-map');

    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'ArrowUp');
    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('world-map');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.scene).toBe('world-map');
    expect(state.worldMap?.currentLocationId).toBe('beach');
    expect(state.worldMap?.focusedLocationId).toBe('beach');
    expect(state.corridor).toBeNull();

    tapKey(fakeWindow, 'Escape');
    state = advanceUntil(
      fakeWindow,
      (nextState) => nextState.scene === 'biome' && nextState.biomeId === 'beach',
      120,
    );
    expect(state.sceneBiomeId).toBe('beach');
    expect(state.corridor).toBeNull();
  });

  it('does not treat corridor threshold pacing as repeated visits or world-state skips', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-corridor-stability-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('coastal-scrub');

    tapKey(fakeWindow, 'e');
    let state = readState(fakeWindow);
    expect(state.sceneBiomeId).toBe('beach-coastal-corridor');
    expect(state.corridor?.ownerBiomeId).toBe('coastal-scrub');

    const corridorEntryWorldState = state.worldState;
    const corridorEntryWorldStep = seededSave.worldStep;
    const corridorEntryBeachVisits = seededSave.biomeVisits.beach ?? 0;
    const corridorEntryScrubVisits = seededSave.biomeVisits['coastal-scrub'] ?? 0;

    holdKey(fakeWindow, 'ArrowLeft', 170);
    state = readState(fakeWindow);
    expect(state.corridor?.ownerBiomeId).toBe('beach');
    expect(seededSave.worldStep).toBe(corridorEntryWorldStep);
    expect(seededSave.biomeVisits.beach ?? 0).toBe(corridorEntryBeachVisits);
    expect(seededSave.biomeVisits['coastal-scrub'] ?? 0).toBe(corridorEntryScrubVisits);

    holdKey(fakeWindow, 'ArrowRight', 170);
    state = readState(fakeWindow);
    expect(state.corridor?.ownerBiomeId).toBe('coastal-scrub');
    expect(state.worldState).toEqual(corridorEntryWorldState);
    expect(seededSave.worldStep).toBe(corridorEntryWorldStep);
    expect(seededSave.biomeVisits.beach ?? 0).toBe(corridorEntryBeachVisits);
    expect(seededSave.biomeVisits['coastal-scrub'] ?? 0).toBe(corridorEntryScrubVisits);
  });

  it('counts a corridor traversal only when the player fully exits into the neighboring biome', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-corridor-exit-count-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('coastal-scrub');

    const worldStepBeforeCorridor = seededSave.worldStep;
    const beachVisitsBeforeCorridor = seededSave.biomeVisits.beach ?? 0;
    const scrubVisitsBeforeCorridor = seededSave.biomeVisits['coastal-scrub'] ?? 0;

    tapKey(fakeWindow, 'e');
    const exitedState = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowLeft',
      (nextState) => nextState.scene === 'biome' && nextState.sceneBiomeId === 'beach',
      360,
    );

    expect(exitedState.biomeId).toBe('beach');
    expect(exitedState.corridor).toBeNull();
    expect(seededSave.worldStep).toBe(worldStepBeforeCorridor + 1);
    expect(seededSave.biomeVisits.beach ?? 0).toBe(beachVisitsBeforeCorridor + 1);
    expect(seededSave.biomeVisits['coastal-scrub'] ?? 0).toBe(scrubVisitsBeforeCorridor);
  });

  it('reaches the beach corridor door from the inland dune side instead of the tide edge', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-beach-corridor-door-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');

    const nearDoorState = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => Boolean(nextState.nearbyDoor?.inRange),
      120,
    );
    expect(nearDoorState.scene).toBe('biome');
    expect(nearDoorState.biomeId).toBe('beach');
    expect(nearDoorState.player.x).toBeLessThan(220);

    tapKey(fakeWindow, 'e');
    const corridorState = readState(fakeWindow);
    expect(corridorState.sceneBiomeId).toBe('beach-coastal-corridor');
    expect(corridorState.corridor?.ownerBiomeId).toBe('beach');
  });

  it('uses an authored map-return post to open the map and return to the same interior anchor', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-map-return-post-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    const nearPostState = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.nearbyTravelTarget?.kind === 'map-return',
      420,
    );
    expect(nearPostState.sceneBiomeId).toBe('forest');
    expect(nearPostState.nearbyDoor?.targetBiomeId).toBeNull();
    expect(nearPostState.nearbyTravelTarget).toEqual({
      kind: 'map-return',
      inRange: true,
      targetBiomeId: null,
    });

    const postApproachX = nearPostState.player.x;

    tapKey(fakeWindow, 'e');
    let state = readState(fakeWindow);
    expect(state.transition?.kind).toBe('biome-to-map');
    expect(state.scene).toBe('transition');

    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map', 120);
    expect(state.worldMap?.currentLocationId).toBe('forest');
    expect(state.worldMap?.focusedLocationId).toBe('forest');

    tapKey(fakeWindow, 'Escape');
    state = advanceUntil(
      fakeWindow,
      (nextState) => nextState.scene === 'biome' && nextState.sceneBiomeId === 'forest',
      120,
    );
    expect(state.nearbyTravelTarget).toEqual({
      kind: 'map-return',
      inRange: true,
      targetBiomeId: null,
    });
    expect(Math.abs(state.player.x - postApproachX)).toBeLessThanOrEqual(24);
  });

  it('walks the full adjacent corridor chain from beach to tundra', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-full-corridor-chain-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.sceneBiomeId === 'beach' &&
        nextState.nearbyDoor?.inRange &&
        nextState.nearbyDoor?.targetBiomeId === 'coastal-scrub',
      220,
    );
    expect(state.biomeId).toBe('beach');

    tapKey(fakeWindow, 'e');
    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.scene === 'biome' && nextState.sceneBiomeId === 'coastal-scrub',
      420,
    );
    expect(state.biomeId).toBe('coastal-scrub');
    expect(seededSave.lastBiomeId).toBe('coastal-scrub');

    const remainingChain = [
      {
        currentBiomeId: 'coastal-scrub',
        nextBiomeId: 'forest',
        corridorId: 'coastal-forest-corridor',
      },
      {
        currentBiomeId: 'forest',
        nextBiomeId: 'treeline',
        corridorId: 'forest-treeline-corridor',
      },
      {
        currentBiomeId: 'treeline',
        nextBiomeId: 'tundra',
        corridorId: 'treeline-tundra-corridor',
      },
    ] as const;

    for (const leg of remainingChain) {
      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          nextState.sceneBiomeId === leg.currentBiomeId &&
          nextState.nearbyDoor?.inRange &&
          nextState.nearbyDoor?.targetBiomeId === leg.nextBiomeId,
        1100,
      );
      expect(state.biomeId).toBe(leg.currentBiomeId);

      tapKey(fakeWindow, 'e');
      state = readState(fakeWindow);
      expect(state.sceneBiomeId).toBe(leg.corridorId);
      expect(state.corridor?.ownerBiomeId).toBe(leg.currentBiomeId);

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) => nextState.scene === 'biome' && nextState.sceneBiomeId === leg.nextBiomeId,
        420,
      );
      expect(state.biomeId).toBe(leg.nextBiomeId);
      expect(seededSave.lastBiomeId).toBe(leg.nextBiomeId);
    }

    expect(seededSave.worldStep).toBe(5);
    expect(seededSave.biomeVisits.beach ?? 0).toBeGreaterThanOrEqual(1);
    expect(seededSave.biomeVisits['coastal-scrub'] ?? 0).toBeGreaterThanOrEqual(1);
    expect(seededSave.biomeVisits.forest ?? 0).toBeGreaterThanOrEqual(1);
    expect(seededSave.biomeVisits.treeline ?? 0).toBeGreaterThanOrEqual(1);
    expect(seededSave.biomeVisits.tundra ?? 0).toBeGreaterThanOrEqual(1);
  });

  it('shows notebook prompts in the journal and reuses them in the copied field-guide prompt', async () => {
    const { window: fakeWindow, document, copiedTexts } = installFakeDom();
    const seededSave = createNewSaveState('runtime-notebook-prompt-seed');
    recordDiscovery(seededSave, beachBiome.entries['beach-grass'], 'beach');
    recordDiscovery(seededSave, beachBiome.entries['driftwood-log'], 'beach');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'j');

    let state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('beach');
    expect(state.journal?.selectedEntryId).toBe('beach-grass');
    expect(state.journal?.observationPrompt).toEqual({
      family: 'comparison',
      text: 'Which bloom stays lowest where the wind still hits hard?',
      source: 'seed',
      evidenceKey: 'beach-low-bloom|dune-edge|day|clear|beach-grass',
    });

    tapKey(fakeWindow, 'Escape');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    await Promise.resolve();
    await Promise.resolve();
    fakeWindow.advanceTime?.(16);

    state = readState(fakeWindow);
    expect(state.fieldGuideNotice?.state).toBe('copied');
    expect(copiedTexts).toHaveLength(1);
    expect(copiedTexts[0]).toContain('CURRENT NOTEBOOK LENS');
    expect(copiedTexts[0]).toContain('Prompt seed: Which bloom stays lowest where the wind still hits hard?');
  });

  it('keeps unlocked ecosystem-note teaching alongside a longer coastal notebook seed prompt', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-coastal-notebook-surface-seed');
    recordDiscovery(seededSave, coastalScrubBiome.entries['beach-grass'], 'coastal-scrub');
    recordDiscovery(seededSave, coastalScrubBiome.entries['sand-verbena'], 'coastal-scrub');
    recordDiscovery(seededSave, coastalScrubBiome.entries['dune-lupine'], 'coastal-scrub');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('coastal-scrub');
    tapKey(fakeWindow, 'j');

    const state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('coastal-scrub');
    expect(state.journal?.selectedEntryId).toBe('beach-grass');
    expect(state.journal?.ecosystemNote).toEqual({
      state: 'unlocked',
      discoveredCount: 3,
      requiredCount: 2,
      title: 'Shelter Builds Here',
      summary: 'Dune plants slow wind and help harsh sand start holding more life.',
    });
    expect(state.journal?.observationPrompt).toMatchObject({
      family: 'timing',
      text: 'Which patch looks ready for flowers, fruit, or seed here?',
      source: 'seed',
    });
    expect(state.journal?.observationPrompt?.evidenceKey).toContain('coastal-ready-patch|back-dune|');
    expect(state.journal?.observationPrompt?.evidenceKey).toContain('|marine-haze|dune-lupine');
  });

  it('shows a sparse field-partner strip only during calm biome play', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-field-partner-seed');
    seededSave.lastBiomeId = 'coastal-scrub';
    seededSave.biomeVisits['coastal-scrub'] = 1;
    recordDiscovery(seededSave, coastalScrubBiome.entries['beach-grass'], 'coastal-scrub');
    recordDiscovery(seededSave, coastalScrubBiome.entries['sand-verbena'], 'coastal-scrub');
    recordDiscovery(seededSave, coastalScrubBiome.entries['dune-lupine'], 'coastal-scrub');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'j');

    let state = readState(fakeWindow);
    expect(state.mode).toBe('journal');
    expect(state.fieldPartner?.active).toBeNull();

    tapKey(fakeWindow, 'j');
    state = advanceUntil(fakeWindow, (nextState) => Boolean(nextState.fieldPartner?.active), 40);
    expect(state.mode).toBe('playing');
    expect(state.fieldPartner?.active).toMatchObject({
      cueId: 'scrub-back-dune-timing',
      text: 'This patch already feels halfway between dune and scrub.',
      family: 'timing',
      source: 'seed',
      trigger: 'biome-enter',
    });
    expect(state.fieldPartner?.active?.evidenceKey).toContain('coastal-ready-patch|back-dune|');
    expect(state.fieldPartner?.globalCooldownRemaining).toBeGreaterThan(19);

    tapKey(fakeWindow, 'j');
    state = readState(fakeWindow);
    expect(state.mode).toBe('journal');
    expect(state.fieldPartner?.active).toBeNull();

    tapKey(fakeWindow, 'j');
    fakeWindow.advanceTime?.(600);
    state = readState(fakeWindow);
    expect(state.mode).toBe('playing');
    expect(state.fieldPartner?.active).toBeNull();
    expect(state.fieldPartner?.globalCooldownRemaining).toBeGreaterThan(18);

    tapKey(fakeWindow, 'e');
    state = readState(fakeWindow);
    expect(state.fieldPartner?.active).toBeNull();
    expect(state.scene).toBe('biome');
    expect(state.sceneBiomeId).toBe('beach-coastal-corridor');
    expect(state.corridor?.ownerBiomeId).toBe('coastal-scrub');
  });

  it('shows a no-prompt fallback cue when weather is carrying the observation alone', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-field-partner-fallback-seed');
    seededSave.lastBiomeId = 'forest';
    seededSave.biomeVisits.forest = 1;
    seededSave.worldStep = 2;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');

    const state = advanceUntil(fakeWindow, (nextState) => Boolean(nextState.fieldPartner?.active), 40);
    expect(state.mode).toBe('playing');
    expect(state.scene).toBe('biome');
    expect(state.worldState).toMatchObject({
      dayPart: 'dusk',
      weather: 'mist-drip',
    });
    expect(state.observationPrompt).toBeNull();
    expect(state.fieldPartner?.active).toMatchObject({
      cueId: 'forest-drip',
      text: 'The air here is carrying water almost as much as the ground is.',
      family: 'neighbors',
      source: 'fallback',
      trigger: 'biome-enter',
      evidenceKey: 'no-prompt',
    });
  });

  it('keeps dense journal selections visible for keyboard and pointer navigation', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-journal-scroll-seed');
    for (const entryId of [
      'moon-snail-shell',
      'native-littleneck-shell',
      'razor-clam-shell',
      'beach-grass',
      'sand-verbena',
      'sea-rocket',
    ]) {
      recordDiscovery(seededSave, beachBiome.entries[entryId], 'beach');
    }
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as FakeCanvas;
    createGame(canvas as unknown as HTMLCanvasElement, seededSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'j');

    let state = readState(fakeWindow);
    expect(state.journal?.selectedEntryId).toBe('moon-snail-shell');
    expect(state.journal?.visibleEntryIds).toContain('moon-snail-shell');
    expect(state.journal?.visibleEntryIds).toContain('native-littleneck-shell');
    expect(state.journal?.canScrollUp).toBe(false);
    expect(state.journal?.canScrollDown).toBe(true);
    expect(state.journal?.scrollTargets).toHaveLength(1);
    expect(state.journal?.scrollTargets[0]?.direction).toBe(1);

    tapKey(fakeWindow, 'ArrowDown');
    tapKey(fakeWindow, 'ArrowDown');
    tapKey(fakeWindow, 'ArrowDown');
    state = readState(fakeWindow);
    expect(state.journal?.selectedEntryId).toBe('beach-grass');
    expect(state.journal?.visibleEntryIds).toContain('razor-clam-shell');
    expect(state.journal?.visibleEntryIds).toContain('beach-grass');
    expect(state.journal?.canScrollUp).toBe(true);
    expect(state.journal?.canScrollDown).toBe(true);

    const downTarget = state.journal?.scrollTargets.find((target: any) => target.direction === 1);
    if (!downTarget) {
      throw new Error('Expected a down scroll target for the dense journal page.');
    }

    tapCanvas(canvas, downTarget.x + Math.floor(downTarget.w / 2), downTarget.y + Math.floor(downTarget.h / 2));
    fakeWindow.advanceTime?.(16);

    state = readState(fakeWindow);
    expect(state.journal?.selectedEntryId).toBe('sea-rocket');
    expect(state.journal?.visibleEntryIds).toContain('beach-grass');
    expect(state.journal?.visibleEntryIds).toContain('sea-rocket');

    const upTarget = state.journal?.scrollTargets.find((target: any) => target.direction === -1);
    if (!upTarget) {
      throw new Error('Expected an up scroll target after scrolling down the dense journal page.');
    }

    tapCanvas(canvas, upTarget.x + Math.floor(upTarget.w / 2), upTarget.y + Math.floor(upTarget.h / 2));
    fakeWindow.advanceTime?.(16);

    state = readState(fakeWindow);
    expect(state.journal?.selectedEntryId).toBe('beach-grass');
    expect(state.journal?.visibleEntryIds).toContain('razor-clam-shell');
    expect(state.journal?.visibleEntryIds).toContain('beach-grass');
  });

  it('opens same-pane habitat comparison cards only after local note context exists in both seen biomes', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-comparison-seed');
    recordDiscovery(seededSave, beachBiome.entries['beach-grass'], 'beach');
    recordDiscovery(seededSave, coastalScrubBiome.entries['beach-grass'], 'coastal-scrub');
    recordDiscovery(seededSave, beachBiome.entries['pacific-sand-crab'], 'beach');
    recordDiscovery(seededSave, coastalScrubBiome.entries['dune-lupine'], 'coastal-scrub');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as FakeCanvas;
    const game = createGame(canvas as unknown as HTMLCanvasElement, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('coastal-scrub');
    tapKey(fakeWindow, 'j');

    let state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('coastal-scrub');
    expect(state.journal?.selectedEntryId).toBe('beach-grass');
    expect(state.journal?.comparison?.available).toBe(true);
    expect(state.journal?.comparison?.open).toBe(false);
    expect(state.journal?.comparison?.cards.map((card: any) => card.biomeId)).toEqual(['beach', 'coastal-scrub']);
    expect(state.journal?.actionTargets.map((target: any) => target.id)).toContain('toggle-comparison');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.journal?.comparison?.open).toBe(true);
    expect(state.journal?.selectedEntryId).toBe('beach-grass');
    expect(state.journal?.comparison?.cards.map((card: any) => card.noteTitle)).toEqual([
      'Shore Shelter',
      'Shelter Builds Here',
    ]);

    const toggleTarget = state.journal?.actionTargets.find((target: any) => target.id === 'toggle-comparison');
    if (!toggleTarget) {
      throw new Error('Expected a comparison toggle target in the journal detail pane.');
    }

    tapCanvas(canvas, toggleTarget.x + Math.floor(toggleTarget.w / 2), toggleTarget.y + Math.floor(toggleTarget.h / 2));
    fakeWindow.advanceTime?.(16);

    state = readState(fakeWindow);
    expect(state.journal?.comparison?.open).toBe(false);
  });
});
