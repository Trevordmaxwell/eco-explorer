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

function advanceWhileHoldingKeysUntil(
  fakeWindow: FakeWindow,
  keys: string[],
  predicate: (state: any) => boolean,
  maxSteps = 120,
): any {
  for (const key of keys) {
    fakeWindow.dispatchEvent({ type: 'keydown', key, preventDefault() {} });
  }

  try {
    for (let index = 0; index < maxSteps; index += 1) {
      fakeWindow.advanceTime?.(16);
      const state = readState(fakeWindow);
      if (predicate(state)) {
        return state;
      }
    }
  } finally {
    for (const key of keys) {
      fakeWindow.dispatchEvent({ type: 'keyup', key, preventDefault() {} });
    }
    fakeWindow.advanceTime?.(16);
  }

  throw new Error(`Timed out waiting while holding ${keys.join(' + ')}.`);
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
    expect(state.menu?.selectedAction).toBe('world-map');

    tapKey(fakeWindow, 'ArrowDown');
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
    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('world-map');

    tapKey(fakeWindow, 'Enter');
    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.currentLocationId).toBe('forest');
    expect(state.worldMap?.focusedLocationId).toBe('forest');
    expect(state.worldMap?.originLabel).toBeNull();

    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.worldMap?.focusedLocationId).toBe('treeline');
    expect(state.worldMap?.focusedSurveyState).toBe('none');
    expect(state.worldMap?.originLabel).toBe('FROM FOREST TRAIL');

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
    expect(state.worldMap?.walkingLabel).toBe('HIGH COUNTRY');

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
    expect(state.menu?.selectedAction).toBe('world-map');

    tapKey(fakeWindow, 'ArrowDown');
    tapKey(fakeWindow, 'ArrowDown');
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

  it('surfaces one active field request in the journal and turns Hidden Hollow notebook-ready after the seep-stone confirm', () => {
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
      progressLabel: 'Return To Root Hollow',
      routeV2: {
        status: 'gathering',
      },
    });

    tapKey(fakeWindow, 'Escape');
    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'seep-pocket' &&
        nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'seep-stone'),
      640,
    );
    expect(state.zoneId).toBe('seep-pocket');

    const seepStone = state.nearbyInspectables.find((entity: any) => entity.entryId === 'seep-stone');
    if (!seepStone) {
      throw new Error('Expected seep stone to be available in the lower hollow pocket.');
    }

    game.inspectEntity(seepStone.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(seededSave.completedFieldRequestIds).not.toContain('forest-hidden-hollow');
    expect(seededSave.routeV2Progress).toMatchObject({
      requestId: 'forest-hidden-hollow',
      status: 'ready-to-synthesize',
      landmarkEntryIds: ['seep-stone'],
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'forest-hidden-hollow',
      progressLabel: 'Ready To File',
      routeV2: {
        status: 'ready-to-synthesize',
      },
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'NOTEBOOK READY',
      text: 'Return to the field station and file the Hidden Hollow note.',
    });
    fakeWindow.advanceTime?.(5200);
    state = readState(fakeWindow);
    expect(state.fieldRequestNotice).toBeNull();
    expect(state.fieldRequestHint).toMatchObject({
      label: 'NOTEBOOK J',
      title: 'Hidden Hollow',
    });

    tapKey(fakeWindow, 'j');
    state = readState(fakeWindow);
    expect(state.journal?.fieldRequest).toMatchObject({
      id: 'forest-hidden-hollow',
      progressLabel: 'Ready To File',
    });
  });

  it('files a notebook-ready route from the routes page with one Enter press', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-route-v2-file-seed');
    seededSave.routeV2Progress = {
      requestId: 'forest-hidden-hollow',
      status: 'ready-to-synthesize',
      landmarkEntryIds: ['seep-stone'],
      evidenceSlots: [],
    };
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');
    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.focusedLocationId).toBe('forest');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      targetBiomeId: null,
      notebookReady: {
        requestId: 'forest-hidden-hollow',
      },
      beats: [
        { id: 'forest-study', status: 'ready' },
        { id: 'station-return', status: 'upcoming' },
        { id: 'coastal-comparison', status: 'upcoming' },
      ],
    });
    expect(state.fieldStation?.seasonWrap).toMatchObject({
      label: 'NOTEBOOK READY',
      text: 'File the notebook note before the next outing.',
    });

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(seededSave.routeV2Progress).toBeNull();
    expect(seededSave.completedFieldRequestIds).toContain('forest-hidden-hollow');
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'TASK RECORDED',
      text: 'Hidden Hollow',
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'forest-moisture-holders',
      progressLabel: 'Return To Root Hollow',
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

  it('lets the player descend through the seep pocket into a deeper stone basin and recover through the brighter return', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-seep-pocket-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'seep-pocket' && nextState.player?.x >= 356,
      640,
    );
    expect(state.zoneId).toBe('seep-pocket');
    expect(state.player?.y).toBeGreaterThanOrEqual(168);
    expect(state.camera?.y).toBeGreaterThanOrEqual(48);
    expect(
      state.nearbyInspectables.some((entity: any) =>
        ['seep-stone', 'tree-lungwort', 'banana-slug'].includes(entity.entryId),
      ),
    ).toBe(true);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'stone-basin' &&
        nextState.player?.x >= 382 &&
        nextState.nearbyClimbable?.id === 'root-hollow-cave-trunk',
      180,
    );
    expect(state.zoneId).toBe('stone-basin');
    expect(state.player?.y).toBeGreaterThanOrEqual(180);
    expect(state.visibleVerticalCueIds).toContain('stone-basin-return-light');
    expect(state.nearbyClimbable).toMatchObject({
      id: 'root-hollow-cave-trunk',
      inRange: true,
    });
    expect(
      state.nearbyInspectables.some((entity: any) =>
        ['banana-slug', 'ensatina', 'seep-stone'].includes(entity.entryId),
      ),
    ).toBe(true);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'filtered-return' && nextState.player?.x >= 402,
      220,
    );
    expect(state.zoneId).toBe('filtered-return');
    expect(state.player?.y).toBeLessThanOrEqual(182);
    expect(
      state.nearbyInspectables.some((entity: any) =>
        ['redwood-sorrel', 'sword-fern', 'tree-lungwort'].includes(entity.entryId),
      ),
    ).toBe(true);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'log-run' && nextState.player?.x >= 438,
      220,
    );
    expect(state.zoneId).toBe('log-run');
    expect(state.player?.y).toBeLessThanOrEqual(126);
  });

  it('lets the player catch the cave trunk from a slightly offset recovery position', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-cave-trunk-catch-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'stone-basin' &&
        nextState.player?.x >= 382 &&
        nextState.nearbyClimbable?.id === 'root-hollow-cave-trunk',
      860,
    );
    expect(state.zoneId).toBe('stone-basin');
    expect(state.player?.x).toBeLessThanOrEqual(395);
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
  });

  it('adds a calmer upper-return nook so the cave family reads like a loop instead of a one-way corridor', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-cave-loop-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'stone-basin' &&
        nextState.player?.x >= 382 &&
        nextState.nearbyClimbable?.id === 'root-hollow-cave-trunk',
      860,
    );
    expect(state.zoneId).toBe('stone-basin');
    expect(state.visibleVerticalCueIds).toContain('stone-basin-return-light');
    expect(state.nearbyClimbable).toMatchObject({
      id: 'root-hollow-cave-trunk',
      inRange: true,
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.activeClimbableId === 'root-hollow-cave-trunk',
      120,
    );
    expect(state.player).toMatchObject({
      climbing: true,
      activeClimbableId: 'root-hollow-cave-trunk',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.y <= 80,
      220,
    );
    expect(state.player?.y).toBeLessThanOrEqual(80);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowLeft',
      (nextState) =>
        !nextState.player?.climbing &&
        nextState.zoneId === 'stone-basin' &&
        nextState.player?.x <= 396 &&
        nextState.player?.y <= 98,
      100,
    );
    expect(state.player?.y).toBeLessThanOrEqual(98);
    expect(
      state.nearbyInspectables.some((entity: any) => entity.entryId === 'tree-lungwort'),
    ).toBe(true);
    expect(state.visibleVerticalCueIds).toContain('stone-basin-return-light');

    state = advanceWhileHoldingKeysUntil(
      fakeWindow,
      ['ArrowLeft'],
      (nextState) =>
        !nextState.player?.climbing &&
        nextState.zoneId === 'root-hollow' &&
        nextState.player?.x <= 338 &&
        nextState.player?.y <= 128,
      180,
    );
    expect(state.zoneId).toBe('root-hollow');
    expect(state.player?.y).toBeLessThanOrEqual(128);
  });

  it('hides the tiny vertical cues when hint markers are turned off', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-vertical-cues-hidden-seed');
    seededSave.settings.showInspectHints = false;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    const state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'stone-basin' && nextState.player?.x >= 382,
      820,
    );

    expect(state.zoneId).toBe('stone-basin');
    expect(state.visibleVerticalCueIds).toEqual([]);
  });

  it('threads the cave-return route past a fallen old-wood bridge before old-growth', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-old-wood-bridge-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'creek-bend' && nextState.player?.x >= 600,
      1200,
    );
    expect(state.zoneId).toBe('creek-bend');
    expect(
      state.nearbyInspectables.some((entity: any) =>
        ['fallen-giant-log', 'tree-lungwort'].includes(entity.entryId),
      ),
    ).toBe(true);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'old-growth-pocket' && nextState.player?.x >= 640,
      260,
    );
    expect(state.zoneId).toBe('old-growth-pocket');
    expect(state.camera?.y).toBeGreaterThanOrEqual(18);
  });

  it('keeps one optional elevated crossover from the cave-return side into the old-growth climb', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-cave-canopy-crossover-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'creek-bend' && nextState.player?.x >= 586,
      1200,
    );
    expect(state.zoneId).toBe('creek-bend');
    expect(state.player?.y).toBeGreaterThanOrEqual(100);

    fakeWindow.dispatchEvent({ type: 'keydown', key: 'ArrowRight', preventDefault() {} });
    fakeWindow.dispatchEvent({ type: 'keydown', key: ' ', preventDefault() {} });
    for (let index = 0; index < 24; index += 1) {
      fakeWindow.advanceTime?.(16);
    }
    fakeWindow.dispatchEvent({ type: 'keyup', key: ' ', preventDefault() {} });

    state = advanceUntil(
      fakeWindow,
      (nextState) =>
        nextState.zoneId === 'old-growth-pocket' &&
        nextState.player?.x >= 694 &&
        nextState.player?.y <= 108 &&
        nextState.nearbyClimbable?.id === 'old-growth-main-trunk',
      140,
    );
    fakeWindow.dispatchEvent({ type: 'keyup', key: 'ArrowRight', preventDefault() {} });
    fakeWindow.advanceTime?.(16);

    expect(state.zoneId).toBe('old-growth-pocket');
    expect(state.player?.y).toBeLessThanOrEqual(108);
    expect(state.nearbyClimbable).toMatchObject({
      id: 'old-growth-main-trunk',
      inRange: true,
    });
  });

  it('adds an optional old-growth giant-tree climb with a sheltered upper-canopy pocket', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-old-growth-tree-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'old-growth-pocket' && nextState.player?.x >= 694,
      1500,
    );
    expect(state.zoneId).toBe('old-growth-pocket');
    expect(state.camera?.y).toBeGreaterThanOrEqual(28);
    expect(state.visibleVerticalCueIds).toContain('old-growth-inner-rest-light');
    expect(state.nearbyClimbable).toMatchObject({
      id: 'old-growth-main-trunk',
      inRange: true,
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.activeClimbableId === 'old-growth-main-trunk',
      80,
    );
    expect(state.player).toMatchObject({
      climbing: true,
      activeClimbableId: 'old-growth-main-trunk',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.y <= 108,
      120,
    );
    expect(state.player?.y).toBeLessThanOrEqual(108);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        !nextState.player?.climbing &&
        nextState.player?.y <= 110 &&
        nextState.nearbyClimbable?.id === 'old-growth-upper-snag',
      120,
    );
    expect(state.nearbyClimbable).toMatchObject({
      id: 'old-growth-upper-snag',
      inRange: true,
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.activeClimbableId === 'old-growth-upper-snag',
      80,
    );
    expect(state.player).toMatchObject({
      climbing: true,
      activeClimbableId: 'old-growth-upper-snag',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.y <= 48,
      120,
    );
    expect(state.player?.y).toBeLessThanOrEqual(48);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => !nextState.player?.climbing && nextState.player?.y <= 52 && nextState.player?.x >= 748,
      100,
    );
    expect(state.player).toMatchObject({
      climbing: false,
    });
    expect(
      state.nearbyInspectables.some((entity: any) =>
        ['tree-lungwort', 'pileated-woodpecker'].includes(entity.entryId),
      ),
    ).toBe(true);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowLeft',
      (nextState) =>
        !nextState.player?.climbing &&
        nextState.player?.x <= 724 &&
        nextState.nearbyClimbable?.id === 'old-growth-canopy-rung',
      120,
    );
    expect(state.nearbyClimbable).toMatchObject({
      id: 'old-growth-canopy-rung',
      inRange: true,
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.activeClimbableId === 'old-growth-canopy-rung',
      80,
    );
    expect(state.player).toMatchObject({
      climbing: true,
      activeClimbableId: 'old-growth-canopy-rung',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.y <= 26,
      100,
    );
    expect(state.player?.y).toBeLessThanOrEqual(26);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowLeft',
      (nextState) => !nextState.player?.climbing && nextState.player?.y <= 32 && nextState.player?.x <= 704,
      100,
    );
    expect(state.player).toMatchObject({
      climbing: false,
    });
    expect(
      state.nearbyInspectables.some((entity: any) =>
        ['licorice-fern', 'tree-lungwort'].includes(entity.entryId),
      ),
    ).toBe(true);
  });

  it('continues the upper canopy into a tiny bark-window nook and keeps the return snag readable', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-old-growth-bark-window-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'old-growth-pocket' && nextState.player?.x >= 694,
      1500,
    );
    expect(state.nearbyClimbable).toMatchObject({
      id: 'old-growth-main-trunk',
      inRange: true,
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.activeClimbableId === 'old-growth-main-trunk',
      80,
    );
    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.y <= 108,
      120,
    );
    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        !nextState.player?.climbing &&
        nextState.player?.y <= 110 &&
        nextState.nearbyClimbable?.id === 'old-growth-upper-snag',
      120,
    );
    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.activeClimbableId === 'old-growth-upper-snag',
      80,
    );
    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.y <= 48,
      120,
    );
    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowLeft',
      (nextState) =>
        !nextState.player?.climbing &&
        nextState.player?.x <= 724 &&
        nextState.nearbyClimbable?.id === 'old-growth-canopy-rung',
      120,
    );
    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.activeClimbableId === 'old-growth-canopy-rung',
      80,
    );
    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.y <= 26,
      100,
    );
    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowLeft',
      (nextState) =>
        !nextState.player?.climbing &&
        nextState.player?.y <= 28 &&
        nextState.nearbyClimbable?.id === 'old-growth-inner-bark-snag',
      120,
    );
    expect(state.nearbyClimbable).toMatchObject({
      id: 'old-growth-inner-bark-snag',
      inRange: true,
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.activeClimbableId === 'old-growth-inner-bark-snag',
      60,
    );
    expect(state.player).toMatchObject({
      climbing: true,
      activeClimbableId: 'old-growth-inner-bark-snag',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.y <= 18,
      60,
    );
    expect(state.player?.y).toBeLessThanOrEqual(18);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowLeft',
      (nextState) => !nextState.player?.climbing && nextState.player?.x <= 666 && nextState.player?.y <= 20,
      80,
    );
    expect(state.player).toMatchObject({
      climbing: false,
    });
    expect(
      state.nearbyInspectables.some((entity: any) => entity.entryId === 'tree-lungwort'),
    ).toBe(true);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        !nextState.player?.climbing &&
        nextState.player?.x >= 674 &&
        nextState.nearbyClimbable?.id === 'old-growth-inner-bark-snag',
      80,
    );
    expect(state.nearbyClimbable).toMatchObject({
      id: 'old-growth-inner-bark-snag',
      inRange: true,
    });
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
    tapKey(fakeWindow, 'Enter');
    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.focusedLocationId).toBe('forest');

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    expect(state.menu?.availableActions).toContain('field-station');
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
    seededSave.nurseryClaimedRewardIds = ['nursery:salmonberry-support'];
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
    expect(state.worldMap?.routeMarkerLocationId).toBeNull();

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
    expect(state.fieldStation?.nursery.routeSupportHint).toBe(
      'Salmonberry still marks the cooler forest return near Root Hollow.',
    );
  });

  it('turns the forest expedition slot into a single notebook-led chapter', () => {
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
      id: 'forest-expedition-upper-run',
      title: 'Root Hollow',
      progressLabel: 'Return To Root Hollow',
    });
    expect(state.fieldStation?.expedition).toMatchObject({
      status: 'ready',
      statusLabel: 'READY',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'seep-pocket' &&
        nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'seep-stone'),
      520,
    );
    const seepStone = state.nearbyInspectables.find((entity: any) => entity.entryId === 'seep-stone');
    if (!seepStone) {
      throw new Error('Expected seep stone to anchor the Root Hollow chapter.');
    }

    game.inspectEntity(seepStone.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(seededSave.routeV2Progress).toMatchObject({
      requestId: 'forest-expedition-upper-run',
      status: 'gathering',
      evidenceSlots: [{ slotId: 'seep-mark', entryId: 'seep-stone' }],
    });
    expect(state.fieldStation?.expedition).toMatchObject({
      status: 'active',
      statusLabel: '1/4',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'stone-basin' &&
        nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'banana-slug'),
      180,
    );
    const stonePocketClue = state.nearbyInspectables.find((entity: any) => entity.entryId === 'banana-slug');
    if (!stonePocketClue) {
      throw new Error('Expected stone-basin life to anchor the Root Hollow middle leg.');
    }

    game.inspectEntity(stonePocketClue.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(seededSave.routeV2Progress).toMatchObject({
      requestId: 'forest-expedition-upper-run',
      status: 'gathering',
      evidenceSlots: [
        { slotId: 'seep-mark', entryId: 'seep-stone' },
        { slotId: 'stone-pocket', entryId: 'banana-slug' },
      ],
    });
    expect(state.fieldStation?.expedition).toMatchObject({
      status: 'active',
      statusLabel: '2/4',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'stone-basin' &&
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
      (nextState) =>
        nextState.player?.climbing &&
        nextState.player?.activeClimbableId === 'root-hollow-cave-trunk',
      80,
    );
    expect(state.player).toMatchObject({
      climbing: true,
      activeClimbableId: 'root-hollow-cave-trunk',
    });

    advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.y <= 80,
      220,
    );

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'filtered-return' &&
        nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'root-curtain'),
      80,
    );
    const rootCurtain = state.nearbyInspectables.find((entity: any) => entity.entryId === 'root-curtain');
    if (!rootCurtain) {
      throw new Error('Expected root curtain to anchor the climb return clue.');
    }

    game.inspectEntity(rootCurtain.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(seededSave.routeV2Progress).toMatchObject({
      requestId: 'forest-expedition-upper-run',
      status: 'gathering',
      evidenceSlots: [
        { slotId: 'seep-mark', entryId: 'seep-stone' },
        { slotId: 'stone-pocket', entryId: 'banana-slug' },
        { slotId: 'root-held', entryId: 'root-curtain' },
      ],
    });
    expect(state.fieldStation?.expedition).toMatchObject({
      status: 'active',
      statusLabel: '3/4',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'log-run' &&
        nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'fir-cone'),
      160,
    );
    const firCone = state.nearbyInspectables.find((entity: any) => entity.entryId === 'fir-cone');
    if (!firCone) {
      throw new Error('Expected fir cone to anchor the high-run clue.');
    }

    game.inspectEntity(firCone.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(seededSave.completedFieldRequestIds).not.toContain('forest-expedition-upper-run');
    expect(seededSave.routeV2Progress).toMatchObject({
      requestId: 'forest-expedition-upper-run',
      status: 'ready-to-synthesize',
      evidenceSlots: [
        { slotId: 'seep-mark', entryId: 'seep-stone' },
        { slotId: 'stone-pocket', entryId: 'banana-slug' },
        { slotId: 'root-held', entryId: 'root-curtain' },
        { slotId: 'high-run', entryId: 'fir-cone' },
      ],
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'forest-expedition-upper-run',
      progressLabel: 'Ready To File',
    });
    expect(state.fieldStation?.expedition).toMatchObject({
      status: 'active',
      statusLabel: 'NOTE READY',
    });

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');
    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');

    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.fieldStation?.seasonPage).toBe('expedition');
    expect(state.fieldStation?.expedition).toMatchObject({
      status: 'active',
      statusLabel: 'NOTE READY',
    });

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(seededSave.completedFieldRequestIds).toContain('forest-expedition-upper-run');
    expect(seededSave.routeV2Progress).toBeNull();
    expect(state.activeFieldRequest).toMatchObject({
      id: 'forest-season-threads',
      progressLabel: '0/3 signs',
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'TASK RECORDED',
      text: 'Root Hollow',
    });
    expect(state.fieldStation?.expedition).toMatchObject({
      status: 'logged',
      statusLabel: 'LOGGED',
      teaser: {
        label: 'NEXT EXPEDITION',
        text: 'Another special outing can open here later.',
      },
    });
  });

  it('buys route marker after the movement pair and lets the support row activate it on the world map', () => {
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
    expect(state.fieldStation?.selectedOutingSupportId).toBe('hand-lens');

    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'ArrowUp');
    state = readState(fakeWindow);
    expect(state.fieldStation?.outingSupportSelected).toBe(true);

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation?.selectedOutingSupportId).toBe('route-marker');

    tapKey(fakeWindow, 'Escape');
    state = readState(fakeWindow);
    expect(state.scene).toBe('world-map');
    expect(state.worldMap?.routeMarkerLocationId).toBe('coastal-scrub');
  });

  it('switches the route board to treeline and can hand the outing guide to route marker', () => {
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
      summary: 'Leave canopy cover. Follow shelter and thaw into the inland exposure chapter.',
      nextDirection:
        'Next: travel to Treeline Pass and match one stone break, one bent cover, and one lee-life clue.',
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
      note: 'Next: follow the inland shelter line.',
    });
    expect(state.fieldStation?.selectedOutingSupportId).toBe('hand-lens');

    tapKey(fakeWindow, 'ArrowUp');
    state = readState(fakeWindow);
    expect(state.fieldStation?.outingSupportSelected).toBe(true);

    tapKey(fakeWindow, 'Enter');

    tapKey(fakeWindow, 'Escape');
    const mapState = readState(fakeWindow);
    expect(mapState.scene).toBe('world-map');
    expect(mapState.worldMap?.routeMarkerLocationId).toBe('treeline');
  });

  it('switches the route board to coastal scrub and can hand the outing guide to route marker', () => {
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
      nextDirection:
        'Next: travel to Coastal Scrub and match one clue from each stage of the edge pattern.',
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
      note: 'Next: follow the low-fell edge line.',
    });
    expect(state.fieldStation?.selectedOutingSupportId).toBe('hand-lens');

    tapKey(fakeWindow, 'ArrowUp');
    state = readState(fakeWindow);
    expect(state.fieldStation?.outingSupportSelected).toBe(true);

    tapKey(fakeWindow, 'Enter');

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
      text: 'Cool wet holdovers make the forest middle edge easiest to compare again.',
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
    expect(state.worldMap?.routeMarkerLocationId).toBeNull();

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
    tapKey(fakeWindow, 'Enter');
    advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');

    const state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeId: 'edge-pattern-line',
      complete: true,
    });
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'ROUTE LOGGED',
      text: 'Open Root Hollow below the forest.',
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
      text: 'Menu to World map, then Forest Trail.',
    });

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('world-map');
    tapKey(fakeWindow, 'Escape');

    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
    ];
    for (const entryId of ['banana-slug', 'sword-fern', 'redwood-sorrel', 'fir-cone']) {
      recordDiscovery(seededSave, forestBiome.entries[entryId], 'forest');
    }

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('world-map');
    tapKey(fakeWindow, 'Enter');
    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.guidedFieldSeason).toMatchObject({
      stage: 'station-return',
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'FIELD STATION',
      text: 'Menu to World map, then Field station.',
    });

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('field-station');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.seasonNote).toMatchObject({
      title: 'RETURN TO STATION',
    });
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'RETURN TO STATION',
      text: 'Forest Trail is logged. Use the menu for World map, then stop at the field station for Trail Stride.',
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
      text: 'Compare how the beach-facing dunes start feeling more sheltered.',
    });

    tapKey(fakeWindow, 'Escape');
    state = readState(fakeWindow);
    expect(state.scene).toBe('world-map');
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'NEXT STOP',
    });
  });

  it('surfaces the season capstone, keeps Forest Trail on the route board, and then points back to station once logged', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-season-capstone-seed');
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
      'forest-expedition-upper-run',
    ];
    seededSave.nurseryClaimedRewardIds = ['nursery:salmonberry-support'];
    seededSave.purchasedUpgradeIds = ['trail-stride', 'field-step', 'route-marker'];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = readState(fakeWindow);
    expect(state.guidedFieldSeason).toMatchObject({
      stage: 'season-capstone',
      nextBiomeId: 'forest',
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'forest-season-threads',
      title: 'Season Threads',
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'SEASON THREADS',
    });

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.routeMarkerLocationId).toBeNull();

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.seasonNote).toMatchObject({
      title: 'SEASON THREADS',
    });
    expect(state.fieldStation?.atlas).toEqual({
      title: 'FIELD ATLAS',
      loggedRoutes: [
        'COASTAL SHELTER LINE logged',
        'TREELINE SHELTER LINE logged',
        'EDGE PATTERN LINE logged',
      ],
      note: 'Next: tie coast and hollow in Forest Trail.',
    });
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'ROUTE LOGGED',
      text: 'Tie coast and hollow in Forest Trail.',
    });

    seededSave.completedFieldRequestIds = [...seededSave.completedFieldRequestIds, 'forest-season-threads'];
    tapKey(fakeWindow, 'Escape');
    tapKey(fakeWindow, 'Enter');
    advanceUntil(
      fakeWindow,
      (nextState) => nextState.scene === 'biome' && nextState.biomeId === 'forest',
      120,
    );
    fakeWindow.advanceTime?.(4000);
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.guidedFieldSeason).toMatchObject({
      stage: 'season-close',
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'RETURN TO STATION',
    });
    expect(state.worldMap?.routeMarkerLocationId).toBeNull();

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.seasonNote).toMatchObject({
      title: 'RETURN TO STATION',
    });
    expect(state.fieldStation?.subtitle).toBe('This season is filed. Another field season can open here later.');
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'SEASON ARCHIVE',
      text: 'Coast, ridge, and Root Hollow filed.',
    });

    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.fieldStation?.seasonPage).toBe('expedition');
    expect(state.fieldStation?.expedition).toMatchObject({
      teaser: {
        label: 'NEXT FIELD SEASON',
        text: 'Take the High Pass next.',
      },
    });

    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.fieldStation?.view).toBe('nursery');
    expect(state.fieldStation?.nursery.routeSupportHint).toBe(
      'Salmonberry still marks the cooler forest return tying the season together.',
    );
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

    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('world-map');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.scene).toBe('world-map');
    expect(state.transition).toBeNull();
    expect(state.corridor).toBeNull();
    expect(state.worldMap?.currentLocationId).toBe('beach');
    expect(state.worldMap?.focusedLocationId).toBe('beach');
    expect(state.worldMap?.originLabel).toBeNull();

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
      label: 'INLAND MAP',
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
      label: 'INLAND MAP',
    });
    expect(Math.abs(state.player.x - postApproachX)).toBeLessThanOrEqual(24);
  });

  it('uses the authored map-return post as the same-biome anchor when the map opens from the field menu', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-direct-map-return-anchor-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.player.x >= 110,
      240,
    );
    expect(state.player.x).toBeGreaterThanOrEqual(110);
    expect(state.player.x).toBeLessThan(180);

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('world-map');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.transition?.kind).toBe('biome-to-map');
    expect(state.scene).toBe('transition');

    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map', 120);
    expect(state.worldMap?.currentLocationId).toBe('forest');
    expect(state.worldMap?.focusedLocationId).toBe('forest');
    expect(state.worldMap?.originLabel).toBeNull();

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
      label: 'INLAND MAP',
    });
    expect(state.player.x).toBeGreaterThanOrEqual(212);
  });

  it('keeps the current origin readable on the world map when focus moves away', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-world-map-origin-label-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');

    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map', 120);
    expect(state.worldMap?.currentLocationId).toBe('beach');
    expect(state.worldMap?.focusedLocationId).toBe('beach');
    expect(state.worldMap?.originLabel).toBeNull();

    tapKey(fakeWindow, 'ArrowRight');
    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);

    expect(state.worldMap?.currentLocationId).toBe('beach');
    expect(state.worldMap?.focusedLocationId).toBe('forest');
    expect(state.worldMap?.originLabel).toBe('FROM SUNNY BEACH');
  });

  it('exposes destination-aware travel cue labels on corridor doors', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-travel-cue-label-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    const nearDoorState = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowLeft',
      (nextState) =>
        nextState.nearbyTravelTarget?.kind === 'corridor' &&
        nextState.nearbyTravelTarget?.targetBiomeId === 'coastal-scrub',
      120,
    );

    expect(nearDoorState.nearbyTravelTarget).toEqual({
      kind: 'corridor',
      inRange: true,
      targetBiomeId: 'coastal-scrub',
      label: 'TO COASTAL SCRUB',
    });
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
      if (leg.nextBiomeId === 'treeline') {
        expect(state.camera?.y).toBe(0);
      }
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
    tapKey(fakeWindow, 'ArrowDown');
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

  it('surfaces the new nootka-rose comparison once scrub and forest notes are both unlocked', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-nootka-rose-comparison-seed');
    recordDiscovery(seededSave, coastalScrubBiome.entries['nootka-rose'], 'coastal-scrub');
    recordDiscovery(seededSave, forestBiome.entries['nootka-rose'], 'forest');
    recordDiscovery(seededSave, coastalScrubBiome.entries['song-sparrow'], 'coastal-scrub');
    recordDiscovery(seededSave, forestBiome.entries['red-huckleberry'], 'forest');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as FakeCanvas;
    const game = createGame(canvas as unknown as HTMLCanvasElement, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');
    tapKey(fakeWindow, 'j');

    let state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('forest');
    expect(state.journal?.selectedEntryId).toBe('nootka-rose');
    expect(state.journal?.comparison?.available).toBe(true);
    expect(state.journal?.comparison?.open).toBe(false);
    expect(state.journal?.comparison?.cards.map((card: any) => card.biomeId)).toEqual(['coastal-scrub', 'forest']);

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.journal?.comparison?.open).toBe(true);
    expect(state.journal?.comparison?.cards.map((card: any) => card.noteTitle)).toEqual([
      'Thorny Cover',
      'Edge Berry Thicket',
    ]);
  });
});
