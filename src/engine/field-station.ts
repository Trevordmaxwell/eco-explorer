import { FIELD_REQUEST_DEFINITIONS } from './field-requests';
import { buildJournalBiomeProgress } from './journal';
import { getBiomeSurveyProgress } from './progression';
import type { BiomeDefinition, SaveState } from './types';

export interface FieldCreditSource {
  id: string;
  label: string;
  credits: number;
}

export interface FieldUpgradeDefinition {
  id: string;
  title: string;
  summary: string;
  cost: number;
  walkSpeed?: number;
  jumpSpeed?: number;
  unlockAfterUpgradeId?: string;
}

export interface FieldUpgradeState extends FieldUpgradeDefinition {
  owned: boolean;
  affordable: boolean;
}

export const FIELD_STATION_UPGRADES: readonly FieldUpgradeDefinition[] = [
  {
    id: 'trail-stride',
    title: 'Trail Stride',
    summary: 'Walk a little faster between clues.',
    cost: 3,
    walkSpeed: 46,
  },
  {
    id: 'field-step',
    title: 'Field Step',
    summary: 'Jump a little higher onto roots and logs.',
    cost: 5,
    jumpSpeed: 124,
    unlockAfterUpgradeId: 'trail-stride',
  },
  {
    id: 'route-marker',
    title: 'Route Marker',
    summary: 'Mark the next route stop on the world map.',
    cost: 7,
    unlockAfterUpgradeId: 'field-step',
  },
] as const;

const BASE_WALK_SPEED = 42;
const BASE_JUMP_SPEED = 118;

function buildRequestCreditSources(
  save: SaveState,
): FieldCreditSource[] {
  return save.completedFieldRequestIds.flatMap((requestId) => {
    const definition = FIELD_REQUEST_DEFINITIONS.find((candidate) => candidate.id === requestId);
    if (!definition) {
      return [];
    }

    return [
      {
        id: `request:${requestId}`,
        label: definition.title,
        credits: 1,
      },
    ];
  });
}

function buildSurveyCreditSources(
  biomes: Record<string, BiomeDefinition>,
  save: SaveState,
): FieldCreditSource[] {
  const journalProgress = buildJournalBiomeProgress(biomes, save.discoveredEntries);
  const sources: FieldCreditSource[] = [];

  for (const biome of Object.values(biomes)) {
    const surveyProgress = getBiomeSurveyProgress(journalProgress, biome.id);
    if (!surveyProgress || surveyProgress.state === 'none') {
      continue;
    }

    if (surveyProgress.state === 'surveyed' || surveyProgress.state === 'complete') {
      sources.push({
        id: `surveyed:${biome.id}`,
        label: `${biome.name} surveyed`,
        credits: 1,
      });
    }

    if (surveyProgress.state === 'complete') {
      sources.push({
        id: `complete:${biome.id}`,
        label: `${biome.name} complete`,
        credits: 1,
      });
    }
  }

  return sources;
}

export function getEligibleFieldCreditSources(
  biomes: Record<string, BiomeDefinition>,
  save: SaveState,
): FieldCreditSource[] {
  return [
    ...buildSurveyCreditSources(biomes, save),
    ...buildRequestCreditSources(save),
  ];
}

export function syncFieldStationLedger(
  biomes: Record<string, BiomeDefinition>,
  save: SaveState,
): FieldCreditSource[] {
  const claimedIds = new Set(save.claimedFieldCreditIds);
  const newlyClaimed: FieldCreditSource[] = [];

  for (const source of getEligibleFieldCreditSources(biomes, save)) {
    if (claimedIds.has(source.id)) {
      continue;
    }

    claimedIds.add(source.id);
    save.fieldCredits += source.credits;
    newlyClaimed.push(source);
  }

  if (newlyClaimed.length) {
    save.claimedFieldCreditIds = [...save.claimedFieldCreditIds, ...newlyClaimed.map((source) => source.id)];
  }

  return newlyClaimed;
}

export function getRecentFieldCreditSources(
  biomes: Record<string, BiomeDefinition>,
  save: SaveState,
  limit = 2,
): FieldCreditSource[] {
  const sourceById = new Map(
    getEligibleFieldCreditSources(biomes, save).map((source) => [source.id, source] as const),
  );

  return save.claimedFieldCreditIds
    .map((sourceId) => sourceById.get(sourceId))
    .filter((source): source is FieldCreditSource => Boolean(source))
    .slice(-limit)
    .reverse();
}

export function hasFieldUpgrade(save: SaveState, upgradeId: string): boolean {
  return save.purchasedUpgradeIds.includes(upgradeId);
}

function isUpgradeVisible(save: SaveState, upgrade: FieldUpgradeDefinition): boolean {
  return !upgrade.unlockAfterUpgradeId || hasFieldUpgrade(save, upgrade.unlockAfterUpgradeId);
}

export function getFieldUpgradeStates(save: SaveState): FieldUpgradeState[] {
  return FIELD_STATION_UPGRADES
    .filter((upgrade) => isUpgradeVisible(save, upgrade))
    .map((upgrade) => ({
      ...upgrade,
      owned: hasFieldUpgrade(save, upgrade.id),
      affordable: save.fieldCredits >= upgrade.cost,
    }));
}

export function getSelectedFieldUpgradeId(
  save: SaveState,
  selectedUpgradeId: string | null,
): string | null {
  const upgrades = getFieldUpgradeStates(save);
  if (!upgrades.length) {
    return null;
  }

  if (selectedUpgradeId && upgrades.some((upgrade) => upgrade.id === selectedUpgradeId)) {
    return selectedUpgradeId;
  }

  return upgrades[0].id;
}

export function purchaseFieldUpgrade(save: SaveState, upgradeId: string): boolean {
  const upgrade = FIELD_STATION_UPGRADES.find(
    (candidate) => candidate.id === upgradeId && isUpgradeVisible(save, candidate),
  );
  if (!upgrade || hasFieldUpgrade(save, upgradeId) || save.fieldCredits < upgrade.cost) {
    return false;
  }

  save.fieldCredits -= upgrade.cost;
  save.purchasedUpgradeIds = [...save.purchasedUpgradeIds, upgradeId];
  return true;
}

export function getWalkSpeed(save: SaveState): number {
  const walkUpgrade = FIELD_STATION_UPGRADES.find(
    (upgrade) => typeof upgrade.walkSpeed === 'number' && hasFieldUpgrade(save, upgrade.id),
  );
  if (walkUpgrade?.walkSpeed) {
    return walkUpgrade.walkSpeed;
  }

  return BASE_WALK_SPEED;
}

export function getJumpSpeed(save: SaveState): number {
  const jumpUpgrade = FIELD_STATION_UPGRADES.find(
    (upgrade) => typeof upgrade.jumpSpeed === 'number' && hasFieldUpgrade(save, upgrade.id),
  );
  if (jumpUpgrade?.jumpSpeed) {
    return jumpUpgrade.jumpSpeed;
  }

  return BASE_JUMP_SPEED;
}
