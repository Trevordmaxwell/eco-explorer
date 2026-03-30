import type {
  BiomeDefinition,
  PhenologyEntryAccent,
  PhenologyPhase,
  PhenologyPhaseProfile,
  SpawnTable,
} from './types';

const PHENOLOGY_SEQUENCE: readonly PhenologyPhase[] = ['early', 'peak', 'late'];
const PHENOLOGY_PHASE_SPAN = 3;

const EMPTY_PHASE_PROFILE: PhenologyPhaseProfile = {
  entryAccents: [],
  spawnEmphasis: [],
};

export function resolvePhenologyPhase(worldAge: number): PhenologyPhase {
  const safeWorldAge = Number.isFinite(worldAge) ? Math.max(0, Math.floor(worldAge)) : 0;
  const sequenceIndex = Math.floor(safeWorldAge / PHENOLOGY_PHASE_SPAN) % PHENOLOGY_SEQUENCE.length;
  return PHENOLOGY_SEQUENCE[sequenceIndex];
}

export function getPhenologyPhaseProfile(
  definition: BiomeDefinition,
  phase: PhenologyPhase,
): PhenologyPhaseProfile {
  const authored = definition.phenology?.phases[phase];
  if (!authored) {
    return EMPTY_PHASE_PROFILE;
  }

  return {
    ...EMPTY_PHASE_PROFILE,
    ...authored,
    entryAccents: authored.entryAccents ?? [],
    spawnEmphasis: authored.spawnEmphasis ?? [],
  };
}

export function getPhenologyAccentMap(
  definition: BiomeDefinition,
  phase: PhenologyPhase,
): ReadonlyMap<string, PhenologyEntryAccent> {
  return new Map(
    getPhenologyPhaseProfile(definition, phase).entryAccents?.map((accent) => [accent.entryId, accent]) ?? [],
  );
}

export function applyPhenologyToSpawnTable(
  table: SpawnTable,
  definition: BiomeDefinition,
  phase: PhenologyPhase,
): SpawnTable {
  const emphasis = getPhenologyPhaseProfile(definition, phase).spawnEmphasis?.find(
    (candidate) => candidate.tableId === table.id,
  );

  if (!emphasis) {
    return table;
  }

  return {
    ...table,
    minCount: Math.max(0, table.minCount + (emphasis.minCountDelta ?? 0)),
    maxCount: Math.max(
      table.minCount + (emphasis.minCountDelta ?? 0),
      table.maxCount + (emphasis.maxCountDelta ?? 0),
    ),
    entries: table.entries.map((entry) => ({
      ...entry,
      weight: Math.max(1, entry.weight + (emphasis.weightAdjustments?.[entry.entryId] ?? 0)),
    })),
  };
}
