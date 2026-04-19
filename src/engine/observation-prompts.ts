import type { ResolvedEcosystemNote } from './ecosystem-notes';
import type {
  BiomeDefinition,
  DayPart,
  ObservationPrompt,
  ObservationPromptFamily,
  WeatherProfile,
} from './types';
import type { WorldState } from './world-state';

interface ObservationPromptSeed {
  id: string;
  biomeId: string;
  family: ObservationPromptFamily;
  text: string;
  zoneIds: string[];
  requiredEntryIds: string[];
  dayParts?: DayPart[];
  weatherProfiles?: WeatherProfile[];
}

export interface ObservationPromptContext {
  biome: BiomeDefinition;
  zoneId: string | null;
  nearbyDiscoveredEntryIds: string[];
  selectedEntryId?: string | null;
  worldState: WorldState;
  ecosystemNote?: ResolvedEcosystemNote | null;
  comparisonAvailable?: boolean;
}

interface MatchedSeedCandidate {
  seed: ObservationPromptSeed;
  score: number;
  matchedNearbyIds: string[];
}

export const OBSERVATION_PROMPT_SEEDS: readonly ObservationPromptSeed[] = [
  {
    id: 'beach-low-bloom',
    biomeId: 'beach',
    family: 'comparison',
    text: 'Which bloom stays lowest where the wind still hits hard?',
    zoneIds: ['dune-edge'],
    weatherProfiles: ['clear', 'marine-haze'],
    requiredEntryIds: ['sand-verbena', 'beach-grass'],
  },
  {
    id: 'beach-soft-wind',
    biomeId: 'beach',
    family: 'shelter',
    text: 'Which plants still hold the sand in this soft coast wind?',
    zoneIds: ['dune-edge'],
    weatherProfiles: ['marine-haze'],
    requiredEntryIds: ['beach-grass', 'sand-verbena'],
  },
  {
    id: 'beach-tide-line-cover',
    biomeId: 'beach',
    family: 'neighbors',
    text: 'What in this wrack gets eaten before birds rush in?',
    zoneIds: ['tide-line'],
    weatherProfiles: ['clear', 'marine-haze'],
    requiredEntryIds: ['bull-kelp-wrack', 'beach-hopper', 'pacific-sand-crab'],
  },
  {
    id: 'coastal-ready-patch',
    biomeId: 'coastal-scrub',
    family: 'timing',
    text: 'Which patch looks ready for flowers, fruit, or seed here?',
    zoneIds: ['back-dune', 'shrub-thicket'],
    weatherProfiles: ['clear', 'marine-haze'],
    requiredEntryIds: ['dune-lupine', 'beach-strawberry', 'salmonberry'],
  },
  {
    id: 'coastal-edge-shade',
    biomeId: 'coastal-scrub',
    family: 'neighbors',
    text: 'Where does the scrub start holding forest-like shade?',
    zoneIds: ['forest-edge'],
    weatherProfiles: ['clear', 'marine-haze'],
    requiredEntryIds: ['sword-fern', 'nurse-log', 'salmonberry'],
  },
  {
    id: 'coastal-swale-shelter',
    biomeId: 'coastal-scrub',
    family: 'shelter',
    text: 'Which plants make this swale feel calmer now?',
    zoneIds: ['windbreak-swale'],
    weatherProfiles: ['clear', 'marine-haze'],
    requiredEntryIds: ['beach-strawberry', 'pacific-wax-myrtle', 'song-sparrow'],
  },
  {
    id: 'forest-water-hold',
    biomeId: 'forest',
    family: 'neighbors',
    text: 'What on this forest floor seems to hold water or food?',
    zoneIds: ['fern-hollow'],
      weatherProfiles: ['mist-drip'],
    requiredEntryIds: ['banana-slug', 'sword-fern', 'redwood-sorrel'],
  },
  {
    id: 'forest-hollow-moisture',
    biomeId: 'forest',
    family: 'neighbors',
    text: 'What here keeps moisture on bark or stone above the soil?',
    zoneIds: ['root-hollow'],
    requiredEntryIds: ['licorice-fern', 'tree-lungwort', 'ensatina'],
  },
  {
    id: 'forest-seed-travel',
    biomeId: 'forest',
    family: 'timing',
    text: 'Which seed here looks ready to travel on drier air?',
    zoneIds: ['log-run'],
    weatherProfiles: ['clear'],
    requiredEntryIds: ['fir-cone', 'salal-berry', 'steller-jay'],
  },
  {
    id: 'forest-cover-loosens',
    biomeId: 'forest',
    family: 'shelter',
    text: 'What still holds forest cover before the trail opens?',
    zoneIds: ['creek-bend'],
    requiredEntryIds: ['salmonberry', 'sword-fern', 'redwood-sorrel'],
  },
  {
    id: 'forest-middle-edge',
    biomeId: 'forest',
    family: 'comparison',
    text: 'What here still feels closest to the scrub edge?',
    zoneIds: ['creek-bend'],
    weatherProfiles: ['clear'],
    requiredEntryIds: ['salmonberry', 'sword-fern', 'redwood-sorrel'],
  },
  {
    id: 'treeline-rime-footholds',
    biomeId: 'treeline',
    family: 'neighbors',
    text: 'What here still holds on where rime reaches first?',
    zoneIds: ['lichen-fell'],
    weatherProfiles: ['ridge-wind'],
    requiredEntryIds: ['reindeer-lichen', 'talus-cushion-pocket'],
  },
  {
    id: 'treeline-lowest-wind',
    biomeId: 'treeline',
    family: 'shelter',
    text: 'What stays lowest where the wind has the longest reach?',
    zoneIds: ['lichen-fell'],
    weatherProfiles: ['ridge-wind'],
    requiredEntryIds: ['moss-campion', 'arctic-willow', 'reindeer-lichen'],
  },
  {
    id: 'treeline-protected-shapes',
    biomeId: 'treeline',
    family: 'comparison',
    text: 'Which looks more protected here: bent trees or open plants?',
    zoneIds: ['krummholz-belt'],
    dayParts: ['dusk'],
    weatherProfiles: ['clear'],
    requiredEntryIds: ['krummholz-spruce', 'mountain-hemlock', 'dwarf-birch'],
  },
  {
    id: 'treeline-stone-shelter',
    biomeId: 'treeline',
    family: 'shelter',
    text: 'What here breaks the wind before it reaches the ground?',
    zoneIds: ['dwarf-shrub'],
    weatherProfiles: ['clear', 'ridge-wind'],
    requiredEntryIds: ['frost-heave-boulder', 'hoary-marmot', 'krummholz-spruce'],
  },
  {
    id: 'treeline-fell-bloom',
    biomeId: 'treeline',
    family: 'comparison',
    text: 'Which bloom hugs the calmest ground on this fell?',
    zoneIds: ['lichen-fell'],
    weatherProfiles: ['clear', 'ridge-wind'],
    requiredEntryIds: ['mountain-avens', 'moss-campion'],
  },
  {
    id: 'tundra-short-season',
    biomeId: 'tundra',
    family: 'timing',
    text: 'What here marks the short season at the thaw edge?',
    zoneIds: ['thaw-skirt'],
    weatherProfiles: ['clear', 'light-flurry'],
    requiredEntryIds: ['purple-saxifrage', 'cottongrass', 'arctic-willow'],
  },
  {
    id: 'tundra-held-thaw',
    biomeId: 'tundra',
    family: 'neighbors',
    text: 'What here keeps thaw water low and slow?',
    zoneIds: ['thaw-skirt'],
    weatherProfiles: ['clear', 'light-flurry'],
    requiredEntryIds: ['tussock-thaw-channel', 'bigelows-sedge', 'arctic-willow'],
  },
  {
    id: 'tundra-low-shelter',
    biomeId: 'tundra',
    family: 'shelter',
    text: 'What still makes a calmer pocket close to the ground here?',
    zoneIds: ['wind-bluff'],
    weatherProfiles: ['clear', 'light-flurry'],
    requiredEntryIds: ['arctic-willow', 'purple-saxifrage', 'mountain-avens'],
  },
  {
    id: 'tundra-brief-thaw',
    biomeId: 'tundra',
    family: 'timing',
    text: 'Which bloom seems built for a very brief thaw?',
    zoneIds: ['frost-ridge'],
    weatherProfiles: ['clear', 'light-flurry'],
    requiredEntryIds: ['mountain-avens', 'woolly-lousewort'],
  },
];

function hasUnlockedNote(ecosystemNote?: ResolvedEcosystemNote | null): ecosystemNote is ResolvedEcosystemNote & {
  state: 'unlocked';
  note: NonNullable<ResolvedEcosystemNote['note']>;
} {
  return ecosystemNote?.state === 'unlocked' && Boolean(ecosystemNote.note);
}

function matchesOptionalList<T extends string>(value: T, allowed?: readonly T[]): boolean {
  return !allowed?.length || allowed.includes(value);
}

function scoreSeedMatch(
  seed: ObservationPromptSeed,
  matchedNearbyIds: string[],
  selectedEntryId: string | null,
): number {
  const selectedMatch = selectedEntryId ? seed.requiredEntryIds.includes(selectedEntryId) : false;
  const worldStateSpecificity =
    (seed.weatherProfiles?.length ? 6 : 0) +
    (seed.dayParts?.length ? 4 : 0);

  return worldStateSpecificity + matchedNearbyIds.length * 3 + (selectedMatch ? 8 : 0);
}

function matchSeed(
  seed: ObservationPromptSeed,
  context: ObservationPromptContext,
): MatchedSeedCandidate | null {
  if (seed.biomeId !== context.biome.id || !context.zoneId || !seed.zoneIds.includes(context.zoneId)) {
    return null;
  }

  if (!matchesOptionalList(context.worldState.dayPart, seed.dayParts)) {
    return null;
  }

  if (!matchesOptionalList(context.worldState.weather, seed.weatherProfiles)) {
    return null;
  }

  const nearbySet = new Set(context.nearbyDiscoveredEntryIds);
  const matchedNearbyIds = seed.requiredEntryIds.filter((entryId) => nearbySet.has(entryId));
  const selectedMatch = context.selectedEntryId ? seed.requiredEntryIds.includes(context.selectedEntryId) : false;

  if (seed.family === 'comparison' && !context.comparisonAvailable && !hasUnlockedNote(context.ecosystemNote)) {
    return null;
  }

  if (!matchedNearbyIds.length && !selectedMatch) {
    return null;
  }

  return {
    seed,
    matchedNearbyIds,
    score: scoreSeedMatch(seed, matchedNearbyIds, context.selectedEntryId ?? null),
  };
}

function buildSeedEvidenceKey(
  seed: ObservationPromptSeed,
  context: ObservationPromptContext,
  matchedNearbyIds: string[],
): string {
  const entryKey = matchedNearbyIds.length ? matchedNearbyIds.join(',') : context.selectedEntryId ?? 'zone-only';
  return [
    seed.id,
    context.zoneId ?? 'no-zone',
    context.worldState.dayPart,
    context.worldState.weather,
    entryKey,
  ].join('|');
}

function resolveSeedPrompt(context: ObservationPromptContext): ObservationPrompt | null {
  let best: MatchedSeedCandidate | null = null;

  for (const seed of OBSERVATION_PROMPT_SEEDS) {
    const match = matchSeed(seed, context);
    if (!match) {
      continue;
    }

    if (!best || match.score > best.score) {
      best = match;
    }
  }

  if (!best) {
    return null;
  }

  return {
    id: best.seed.id,
    family: best.seed.family,
    text: best.seed.text,
    source: 'seed',
    evidenceKey: buildSeedEvidenceKey(best.seed, context, best.matchedNearbyIds),
  };
}

function resolveNoteFallbackPrompt(context: ObservationPromptContext): ObservationPrompt | null {
  if (!context.selectedEntryId || !context.zoneId || !hasUnlockedNote(context.ecosystemNote)) {
    return null;
  }

  const note = context.ecosystemNote.note;
  if (note.zoneId !== context.zoneId || !note.entryIds.includes(context.selectedEntryId)) {
    return null;
  }

  return {
    id: note.id,
    family: 'neighbors',
    text: note.observationPrompt,
    source: 'ecosystem-note',
    evidenceKey: [note.id, context.zoneId, context.worldState.dayPart, context.worldState.weather].join('|'),
  };
}

export function resolveObservationPrompt(context: ObservationPromptContext): ObservationPrompt | null {
  return resolveSeedPrompt(context) ?? resolveNoteFallbackPrompt(context);
}
