import type {
  InspectableEntry,
  NurseryExtraId,
  NurseryGrowthStage,
  NurseryProjectDefinition,
  NurseryProjectState,
  NurseryResourceKind,
  SaveState,
} from './types';
import { resolveNurseryCapstoneSupportHint, type FieldSeasonBoardState } from './field-season-board';

export type NurseryCardId = 'bench' | 'compost' | 'bed';

interface NurseryExtraDefinition {
  id: NurseryExtraId;
  title: string;
  summary: string;
}

interface NurseryGatheringRule {
  yields: Partial<Record<NurseryResourceKind, number>>;
  requiresRequestId?: string;
}

export interface NurseryProjectCatalogItem {
  definition: NurseryProjectDefinition;
  unlocked: boolean;
  affordable: boolean;
  active: boolean;
}

export interface NurseryExtraState extends NurseryExtraDefinition {
  unlocked: boolean;
}

export interface NurseryStateView {
  resources: SaveState['nurseryResources'];
  selectedProjectId: string | null;
  selectedProject: NurseryProjectCatalogItem | null;
  projects: NurseryProjectCatalogItem[];
  activeProject: {
    definition: NurseryProjectDefinition;
    state: NurseryProjectState;
    rewardClaimed: boolean;
  } | null;
  extras: NurseryExtraState[];
  routeSupportHint: string | null;
  utilityNote: string | null;
  compostRate: number;
}

export interface NurseryGatheringResult {
  note: string;
}

const NURSERY_RESOURCE_LABELS: Record<NurseryResourceKind, string> = {
  litter: 'litter',
  'seed-stock': 'seed-stock',
  cuttings: 'cuttings',
  compost: 'compost',
};

const NURSERY_EXTRA_DEFINITIONS: readonly NurseryExtraDefinition[] = [
  {
    id: 'log-pile',
    title: 'LOG PILE',
    summary: 'A small log stack keeps one corner of the station feeling sheltered and alive.',
  },
  {
    id: 'pollinator-patch',
    title: 'POLLINATOR PATCH',
    summary: 'Blooming nursery plants turn one bed into a tiny landing spot for insects.',
  },
] as const;

const NURSERY_PROJECT_DEFINITIONS: readonly NurseryProjectDefinition[] = [
  {
    id: 'sand-verbena-bed',
    entryId: 'sand-verbena',
    title: 'Sand Verbena',
    summary: 'A low coastal bloom that helps read the sunnier dune side.',
    sourceEntryIds: ['sand-verbena'],
    sourceModes: ['cutting'],
    routeTags: ['coastal-shelter-line'],
    rewardKind: 'route-support',
    rewardId: 'nursery:sand-verbena-support',
    rewardTitle: 'Dune Bloom Clue',
    rewardSummary: 'Low yellow blooms usually hold where the dune still feels open and dry.',
    growthStages: ['stocked', 'rooting', 'growing', 'mature'],
    starterCost: { cuttings: 1 },
    unlockAfterRequestId: 'coastal-shelter-shift',
    unlockSummary: 'Log Coastal Shelter before taking cuttings for this bed.',
  },
  {
    id: 'dune-lupine-bed',
    entryId: 'dune-lupine',
    title: 'Dune Lupine',
    summary: 'A dune pioneer that helps show where brushier shelter begins.',
    sourceEntryIds: ['dune-lupine'],
    sourceModes: ['cutting'],
    routeTags: ['coastal-shelter-line', 'edge-pattern-line'],
    rewardKind: 'route-support',
    rewardId: 'nursery:dune-lupine-support',
    rewardTitle: 'Shelter Shift Clue',
    rewardSummary: 'Pioneer flowers often thin out where shrubs start making steadier cover.',
    growthStages: ['stocked', 'rooting', 'growing', 'mature'],
    starterCost: { cuttings: 1 },
    unlockAfterRequestId: 'coastal-edge-moisture',
    unlockSummary: 'Finish Edge Moisture before propagating dune lupine.',
  },
  {
    id: 'mountain-avens-bed',
    entryId: 'mountain-avens',
    title: 'Mountain Avens',
    summary: 'A low alpine bloom that echoes exposed ground along the inland line.',
    sourceEntryIds: ['mountain-avens'],
    sourceModes: ['cutting'],
    routeTags: ['treeline-shelter-line', 'edge-pattern-line'],
    rewardKind: 'route-support',
    rewardId: 'nursery:mountain-avens-support',
    rewardTitle: 'Fell Bloom Clue',
    rewardSummary: 'Brief bright bloom often holds where the ground stays open but low.',
    growthStages: ['stocked', 'rooting', 'growing', 'mature'],
    starterCost: { cuttings: 1 },
    unlockAfterRequestId: 'treeline-stone-shelter',
    unlockSummary: 'Log Treeline Shelter before carrying mountain avens into the nursery.',
  },
  {
    id: 'beach-strawberry-bed',
    entryId: 'beach-strawberry',
    title: 'Beach Strawberry',
    summary: 'A runner-forming edge plant that adds a softer edible note to the station.',
    sourceEntryIds: ['beach-strawberry'],
    sourceModes: ['seed'],
    routeTags: ['coastal-shelter-line'],
    rewardKind: 'beauty',
    rewardId: 'nursery:beach-strawberry-beauty',
    rewardTitle: 'Runner Patch',
    rewardSummary: 'Creeping runners make the station edge feel fuller and more lived in.',
    growthStages: ['stocked', 'rooting', 'growing', 'mature'],
    starterCost: { 'seed-stock': 1 },
    unlockAfterRequestId: 'coastal-shelter-shift',
    unlockSummary: 'Bring one coastal route clue home before starting a strawberry runner patch.',
  },
  {
    id: 'salmonberry-bed',
    entryId: 'salmonberry',
    title: 'Salmonberry',
    summary: 'A wet-edge shrub that helps future transition routes feel richer.',
    sourceEntryIds: ['salmonberry'],
    sourceModes: ['seed'],
    routeTags: ['edge-pattern-line'],
    rewardKind: 'route-support',
    rewardId: 'nursery:salmonberry-support',
    rewardTitle: 'Wet Edge Clue',
    rewardSummary: 'Dense berry thickets often mark the cooler, wetter side of a transition.',
    growthStages: ['stocked', 'rooting', 'growing', 'mature'],
    starterCost: { 'seed-stock': 1 },
    unlockAfterRequestId: 'forest-moisture-holders',
    unlockSummary: 'Log Moisture Holders before starting a salmonberry tray.',
  },
  {
    id: 'crowberry-bed',
    entryId: 'crowberry',
    title: 'Crowberry',
    summary: 'A small evergreen mat that makes the compost heap work a little better.',
    sourceEntryIds: ['crowberry'],
    sourceModes: ['seed'],
    routeTags: ['treeline-shelter-line'],
    rewardKind: 'utility',
    rewardId: 'nursery:crowberry-utility',
    rewardTitle: 'Cool Heap Cover',
    rewardSummary: 'Crowberry shade helps the heap hold together and finish a little more compost.',
    growthStages: ['stocked', 'rooting', 'growing', 'mature'],
    starterCost: { 'seed-stock': 1 },
    unlockAfterRequestId: 'tundra-short-season',
    unlockSummary: 'Log Short Season before saving crowberry for the nursery.',
  },
] as const;

const NURSERY_GATHERING_RULES: Readonly<Record<string, NurseryGatheringRule>> = {
  'bull-kelp-wrack': {
    yields: {
      litter: 1,
    },
  },
  'nurse-log': {
    yields: {
      litter: 1,
    },
  },
  'fir-cone': {
    yields: {
      'seed-stock': 1,
      litter: 1,
    },
  },
  'beach-strawberry': {
    yields: {
      'seed-stock': 1,
    },
  },
  salmonberry: {
    yields: {
      'seed-stock': 1,
    },
  },
  crowberry: {
    yields: {
      'seed-stock': 1,
    },
  },
  'sand-verbena': {
    yields: {
      cuttings: 1,
    },
    requiresRequestId: 'coastal-shelter-shift',
  },
  'dune-lupine': {
    yields: {
      cuttings: 1,
    },
    requiresRequestId: 'coastal-edge-moisture',
  },
  'mountain-avens': {
    yields: {
      cuttings: 1,
    },
    requiresRequestId: 'treeline-stone-shelter',
  },
};

function hasCompletedRequest(save: SaveState, requestId: string | undefined): boolean {
  return requestId ? save.completedFieldRequestIds.includes(requestId) : true;
}

function hasDiscoveredEntry(save: SaveState, entryId: string): boolean {
  return Boolean(save.discoveredEntries[entryId]);
}

function cloneNurseryResources(save: SaveState): SaveState['nurseryResources'] {
  return {
    litter: save.nurseryResources.litter,
    'seed-stock': save.nurseryResources['seed-stock'],
    cuttings: save.nurseryResources.cuttings,
    compost: save.nurseryResources.compost,
  };
}

function getProjectDefinition(projectId: string): NurseryProjectDefinition | null {
  return NURSERY_PROJECT_DEFINITIONS.find((definition) => definition.id === projectId) ?? null;
}

function getProjectStarterCost(project: NurseryProjectDefinition): Partial<Record<NurseryResourceKind, number>> {
  return project.starterCost ?? {};
}

function canAffordProject(save: SaveState, project: NurseryProjectDefinition): boolean {
  return Object.entries(getProjectStarterCost(project)).every(([kind, amount]) => {
    const safeAmount = typeof amount === 'number' ? amount : 0;
    return save.nurseryResources[kind as NurseryResourceKind] >= safeAmount;
  });
}

function isProjectUnlocked(save: SaveState, project: NurseryProjectDefinition): boolean {
  return hasDiscoveredEntry(save, project.entryId) && hasCompletedRequest(save, project.unlockAfterRequestId);
}

function getUtilityCompostRate(save: SaveState): number {
  return save.nurseryClaimedRewardIds.includes('nursery:crowberry-utility') ? 2 : 1;
}

function getNextGrowthStage(stage: NurseryGrowthStage): NurseryGrowthStage {
  switch (stage) {
    case 'stocked':
      return 'rooting';
    case 'rooting':
      return 'growing';
    case 'growing':
      return 'mature';
    case 'mature':
    default:
      return 'mature';
  }
}

function claimProjectReward(save: SaveState, project: NurseryProjectDefinition): void {
  if (!save.nurseryClaimedRewardIds.includes(project.rewardId)) {
    save.nurseryClaimedRewardIds = [...save.nurseryClaimedRewardIds, project.rewardId];
  }
}

function resolveUnlockedExtraIds(save: SaveState): NurseryExtraId[] {
  const rewardIds = new Set(save.nurseryClaimedRewardIds);
  const extras: NurseryExtraId[] = [];

  if (rewardIds.has('nursery:salmonberry-support') || rewardIds.has('nursery:crowberry-utility')) {
    extras.push('log-pile');
  }

  const bloomRewardCount = [
    'nursery:sand-verbena-support',
    'nursery:dune-lupine-support',
    'nursery:mountain-avens-support',
    'nursery:beach-strawberry-beauty',
  ].filter((rewardId) => rewardIds.has(rewardId)).length;
  if (bloomRewardCount >= 2) {
    extras.push('pollinator-patch');
  }

  return extras;
}

function syncNurseryExtras(save: SaveState): boolean {
  const unlockedExtraIds = resolveUnlockedExtraIds(save);
  const changed =
    unlockedExtraIds.length !== save.nurseryUnlockedExtraIds.length ||
    unlockedExtraIds.some((extraId, index) => save.nurseryUnlockedExtraIds[index] !== extraId);

  if (changed) {
    save.nurseryUnlockedExtraIds = unlockedExtraIds;
  }

  return changed;
}

function processNurseryWorldStep(save: SaveState): boolean {
  let changed = false;
  const compostRate = getUtilityCompostRate(save);
  const composting = Math.min(save.nurseryResources.litter, compostRate);
  if (composting > 0) {
    save.nurseryResources.litter -= composting;
    save.nurseryResources.compost += composting;
    changed = true;
  }

  const activeProject = save.nurseryProjects.teachingBed;
  if (activeProject && activeProject.stage !== 'mature' && save.nurseryResources.compost > 0) {
    save.nurseryResources.compost -= 1;
    activeProject.stage = getNextGrowthStage(activeProject.stage);
    changed = true;

    if (activeProject.stage === 'mature') {
      const definition = getProjectDefinition(activeProject.projectId);
      if (definition) {
        claimProjectReward(save, definition);
      }
    }
  }

  return syncNurseryExtras(save) || changed;
}

export function syncNurseryState(save: SaveState): boolean {
  let changed = false;

  while (save.nurseryLastProcessedWorldStep < save.worldStep) {
    save.nurseryLastProcessedWorldStep += 1;
    changed = processNurseryWorldStep(save) || changed;
  }

  return syncNurseryExtras(save) || changed;
}

export function getSelectedNurseryProjectId(
  save: SaveState,
  selectedProjectId: string | null,
): string | null {
  const unlockedProjects = NURSERY_PROJECT_DEFINITIONS.filter((project) => isProjectUnlocked(save, project));
  if (!unlockedProjects.length) {
    return null;
  }

  if (selectedProjectId && unlockedProjects.some((project) => project.id === selectedProjectId)) {
    return selectedProjectId;
  }

  return unlockedProjects[0].id;
}

export function getNextNurseryProjectId(
  save: SaveState,
  selectedProjectId: string | null,
  direction: 1 | -1,
): string | null {
  const unlockedProjects = NURSERY_PROJECT_DEFINITIONS.filter((project) => isProjectUnlocked(save, project));
  if (!unlockedProjects.length) {
    return null;
  }

  const currentId = getSelectedNurseryProjectId(save, selectedProjectId);
  const currentIndex = unlockedProjects.findIndex((project) => project.id === currentId);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const nextIndex = (safeIndex + direction + unlockedProjects.length) % unlockedProjects.length;
  return unlockedProjects[nextIndex].id;
}

export function resolveNurseryStateView(
  save: SaveState,
  routeBoard: Pick<FieldSeasonBoardState, 'routeId' | 'activeBeatId'>,
  selectedProjectId: string | null,
): NurseryStateView {
  const projects: NurseryProjectCatalogItem[] = NURSERY_PROJECT_DEFINITIONS.map((definition) => ({
    definition,
    unlocked: isProjectUnlocked(save, definition),
    affordable: canAffordProject(save, definition),
    active: save.nurseryProjects.teachingBed?.projectId === definition.id,
  }));
  const resolvedSelectedProjectId = getSelectedNurseryProjectId(save, selectedProjectId);
  const selectedProject =
    projects.find((project) => project.definition.id === resolvedSelectedProjectId) ?? null;
  const activeProjectState = save.nurseryProjects.teachingBed;
  const activeProjectDefinition = activeProjectState
    ? getProjectDefinition(activeProjectState.projectId)
    : null;
  const rewardIds = new Set(save.nurseryClaimedRewardIds);
  const routeSupportProject =
    routeBoard.routeId === 'edge-pattern-line'
      ? null
      : projects.find(
          (project) =>
            project.definition.rewardKind === 'route-support' &&
            project.definition.routeTags.includes(routeBoard.routeId) &&
            rewardIds.has(project.definition.rewardId),
        );
  let edgePatternRewardId: string | null = null;
  if (routeBoard.routeId === 'edge-pattern-line') {
    switch (routeBoard.activeBeatId) {
      case 'scrub-edge-pattern':
        edgePatternRewardId = 'nursery:dune-lupine-support';
        break;
      case 'forest-cool-edge':
        edgePatternRewardId = 'nursery:salmonberry-support';
        break;
      case 'treeline-low-fell':
        edgePatternRewardId = 'nursery:mountain-avens-support';
        break;
      default:
        edgePatternRewardId = null;
    }
  }
  const edgePatternRouteSupport =
    edgePatternRewardId && rewardIds.has(edgePatternRewardId)
      ? NURSERY_PROJECT_DEFINITIONS.find((project) => project.rewardId === edgePatternRewardId)?.rewardSummary ?? null
      : null;
  const utilityNote = rewardIds.has('nursery:crowberry-utility')
    ? 'Cool Heap Cover: the heap can finish 2 litter each route step now.'
    : null;

  return {
    resources: cloneNurseryResources(save),
    selectedProjectId: resolvedSelectedProjectId,
    selectedProject,
    projects,
    activeProject:
      activeProjectState && activeProjectDefinition
        ? {
            definition: activeProjectDefinition,
            state: {
              projectId: activeProjectState.projectId,
              stage: activeProjectState.stage,
            },
            rewardClaimed: rewardIds.has(activeProjectDefinition.rewardId),
          }
        : null,
    extras: NURSERY_EXTRA_DEFINITIONS.map((definition) => ({
      ...definition,
      unlocked: save.nurseryUnlockedExtraIds.includes(definition.id),
    })),
    routeSupportHint:
      edgePatternRouteSupport
      ?? routeSupportProject?.definition.rewardSummary
      ?? resolveNurseryCapstoneSupportHint(save),
    utilityNote,
    compostRate: getUtilityCompostRate(save),
  };
}

export function startNurseryProject(save: SaveState, projectId: string): boolean {
  const project = getProjectDefinition(projectId);
  if (!project || !isProjectUnlocked(save, project) || !canAffordProject(save, project)) {
    return false;
  }

  if (save.nurseryProjects.teachingBed) {
    return false;
  }

  for (const [kind, amount] of Object.entries(getProjectStarterCost(project))) {
    if (!amount) {
      continue;
    }
    save.nurseryResources[kind as NurseryResourceKind] -= amount;
  }

  save.nurseryProjects = {
    teachingBed: {
      projectId: project.id,
      stage: 'stocked',
    },
  };
  return true;
}

export function clearNurseryTeachingBed(save: SaveState): boolean {
  if (!save.nurseryProjects.teachingBed || save.nurseryProjects.teachingBed.stage !== 'mature') {
    return false;
  }

  save.nurseryProjects = {
    teachingBed: null,
  };
  return true;
}

function formatGatheringNote(yields: Partial<Record<NurseryResourceKind, number>>): string {
  const parts = (Object.keys(NURSERY_RESOURCE_LABELS) as NurseryResourceKind[])
    .filter((kind) => typeof yields[kind] === 'number' && (yields[kind] ?? 0) > 0)
    .map((kind) => `+${yields[kind]} ${NURSERY_RESOURCE_LABELS[kind]}`);

  return parts.join(' • ');
}

export function tryClaimNurseryGathering(
  save: SaveState,
  entry: InspectableEntry,
  entityId: string,
  claimedEntityIds: Set<string>,
): NurseryGatheringResult | null {
  const rule = NURSERY_GATHERING_RULES[entry.id];
  if (!rule || claimedEntityIds.has(entityId) || !hasCompletedRequest(save, rule.requiresRequestId)) {
    return null;
  }

  let awarded = false;
  for (const [kind, amount] of Object.entries(rule.yields)) {
    if (!amount || amount <= 0) {
      continue;
    }
    save.nurseryResources[kind as NurseryResourceKind] += amount;
    awarded = true;
  }

  if (!awarded) {
    return null;
  }

  claimedEntityIds.add(entityId);
  return {
    note: formatGatheringNote(rule.yields),
  };
}

export function getNurseryProjectDefinitions(): readonly NurseryProjectDefinition[] {
  return NURSERY_PROJECT_DEFINITIONS;
}
