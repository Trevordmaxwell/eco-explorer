import { getDiscoveredEntriesForBiome } from './journal';
import type { BiomeDefinition, InspectableEntry, SaveState, SketchbookPageState, SketchbookSlotId } from './types';
import type { BiomeSurveyState } from './progression';

export const SKETCHBOOK_SLOT_IDS: SketchbookSlotId[] = ['top-left', 'top-right', 'lower-center'];
export const DEFAULT_SKETCHBOOK_SLOT_ID: SketchbookSlotId = 'top-left';

const SKETCHBOOK_SLOT_LABELS: Record<SketchbookSlotId, string> = {
  'top-left': 'TOP LEFT',
  'top-right': 'TOP RIGHT',
  'lower-center': 'LOWER CENTER',
};

export interface SketchbookSlotPlacement {
  slotId: SketchbookSlotId;
  label: string;
  entryId: string | null;
  entry: InspectableEntry | null;
}

export interface SketchbookPageView {
  biomeId: string;
  biomeName: string;
  slots: SketchbookSlotPlacement[];
}

export function normalizeSketchbookPages(raw: unknown): SaveState['sketchbookPages'] {
  if (!raw || typeof raw !== 'object') {
    return {};
  }

  const normalizedPages: SaveState['sketchbookPages'] = {};

  for (const [biomeId, rawPage] of Object.entries(raw as Record<string, unknown>)) {
    if (!rawPage || typeof rawPage !== 'object') {
      continue;
    }

    const rawSlots = (rawPage as { slots?: unknown }).slots;
    const slots: SketchbookPageState['slots'] = {};

    if (rawSlots && typeof rawSlots === 'object') {
      for (const slotId of SKETCHBOOK_SLOT_IDS) {
        const entryId = (rawSlots as Record<string, unknown>)[slotId];
        if (typeof entryId === 'string') {
          slots[slotId] = entryId;
        }
      }
    }

    if (Object.keys(slots).length) {
      normalizedPages[biomeId] = { slots };
    }
  }

  return normalizedPages;
}

export function isSketchbookUnlocked(surveyState: BiomeSurveyState): boolean {
  return surveyState === 'surveyed' || surveyState === 'complete';
}

export function getSelectedSketchbookSlotId(slotId: string | null): SketchbookSlotId {
  return SKETCHBOOK_SLOT_IDS.includes(slotId as SketchbookSlotId)
    ? (slotId as SketchbookSlotId)
    : DEFAULT_SKETCHBOOK_SLOT_ID;
}

export function changeSketchbookSlot(slotId: string | null, direction: number): SketchbookSlotId {
  const currentSlotId = getSelectedSketchbookSlotId(slotId);
  const currentIndex = SKETCHBOOK_SLOT_IDS.indexOf(currentSlotId);
  const nextIndex = (currentIndex + direction + SKETCHBOOK_SLOT_IDS.length) % SKETCHBOOK_SLOT_IDS.length;
  return SKETCHBOOK_SLOT_IDS[nextIndex];
}

export function getSketchbookPage(save: SaveState, biomeId: string): SketchbookPageState {
  const page = save.sketchbookPages[biomeId];
  return {
    slots: { ...(page?.slots ?? {}) },
  };
}

export function getSketchbookDiscoveredEntries(
  biome: BiomeDefinition,
  entriesById: Record<string, InspectableEntry>,
  save: SaveState,
): InspectableEntry[] {
  return getDiscoveredEntriesForBiome(biome, entriesById, save.discoveredEntries);
}

export function placeSketchbookEntry(
  save: SaveState,
  biome: BiomeDefinition,
  slotId: SketchbookSlotId,
  entryId: string,
): boolean {
  const entryState = save.discoveredEntries[entryId];
  if (!entryState?.biomeIds.includes(biome.id) || !biome.entries[entryId]) {
    return false;
  }

  const page = getSketchbookPage(save, biome.id);
  if (page.slots[slotId] === entryId) {
    return false;
  }

  save.sketchbookPages = {
    ...save.sketchbookPages,
    [biome.id]: {
      slots: {
        ...page.slots,
        [slotId]: entryId,
      },
    },
  };

  return true;
}

export function clearSketchbookSlot(
  save: SaveState,
  biomeId: string,
  slotId: SketchbookSlotId,
): boolean {
  const page = getSketchbookPage(save, biomeId);
  if (!page.slots[slotId]) {
    return false;
  }

  const nextSlots = { ...page.slots };
  delete nextSlots[slotId];

  if (!Object.keys(nextSlots).length) {
    const nextPages = { ...save.sketchbookPages };
    delete nextPages[biomeId];
    save.sketchbookPages = nextPages;
    return true;
  }

  save.sketchbookPages = {
    ...save.sketchbookPages,
    [biomeId]: {
      slots: nextSlots,
    },
  };

  return true;
}

export function buildSketchbookPageView(
  biome: BiomeDefinition,
  entriesById: Record<string, InspectableEntry>,
  save: SaveState,
): SketchbookPageView {
  const page = getSketchbookPage(save, biome.id);

  return {
    biomeId: biome.id,
    biomeName: biome.name,
    slots: SKETCHBOOK_SLOT_IDS.map((slotId) => {
      const entryId = page.slots[slotId] ?? null;
      return {
        slotId,
        label: SKETCHBOOK_SLOT_LABELS[slotId],
        entryId,
        entry: entryId ? entriesById[entryId] ?? null : null,
      };
    }),
  };
}
