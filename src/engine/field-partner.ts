import type {
  DayPart,
  ObservationPrompt,
  ObservationPromptFamily,
  WeatherProfile,
} from './types';
import type { WorldState } from './world-state';

export type FieldPartnerTrigger = 'biome-enter' | 'state-change' | 'discovery';
export type FieldPartnerSource = ObservationPrompt['source'] | 'fallback';

export interface FieldPartnerNotice {
  cueId: string;
  text: string;
  family: ObservationPromptFamily;
  source: FieldPartnerSource;
  trigger: FieldPartnerTrigger;
  evidenceKey: string;
  stateKey: string;
}

export interface FieldPartnerNoticeContext {
  biomeId: string;
  zoneId: string | null;
  worldState: Pick<WorldState, 'dayPart' | 'weather'>;
  observationPrompt: ObservationPrompt | null;
  trigger: FieldPartnerTrigger;
}

interface FieldPartnerCueDefinition {
  id: string;
  text: string;
  biomeId: string;
  family: ObservationPromptFamily;
  zoneIds?: string[];
  dayParts?: DayPart[];
  weatherProfiles?: WeatherProfile[];
  promptFamilies?: ObservationPromptFamily[];
  promptIds?: string[];
}

interface FieldPartnerDeliveryState {
  trigger: FieldPartnerTrigger;
  deliveredThisVisit: number;
  lastStateKey: string | null;
  candidateStateKey: string;
  globalCooldownRemainingSeconds: number;
}

const FIELD_PARTNER_PROMPT_CUES: readonly FieldPartnerCueDefinition[] = [
  {
    id: 'beach-dune-shelter',
    biomeId: 'beach',
    zoneIds: ['dune-edge'],
    weatherProfiles: ['marine-haze'],
    family: 'shelter',
    promptFamilies: ['shelter'],
    promptIds: ['shore-shelter'],
    text: 'The first grass line is doing more work than it looks.',
  },
  {
    id: 'beach-tide-neighbors',
    biomeId: 'beach',
    zoneIds: ['tide-line'],
    dayParts: ['dusk'],
    weatherProfiles: ['clear'],
    family: 'neighbors',
    promptFamilies: ['neighbors'],
    promptIds: ['wave-edge-survivors'],
    text: 'The wrack line can feel busy before it looks busy.',
  },
  {
    id: 'beach-lee-pocket-hold',
    biomeId: 'beach',
    zoneIds: ['lee-pocket'],
    weatherProfiles: ['clear', 'marine-haze'],
    family: 'shelter',
    promptIds: ['lee-pocket-hold'],
    text: 'Driftwood keeps this tucked sand calmer.',
  },
  {
    id: 'scrub-back-dune-timing',
    biomeId: 'coastal-scrub',
    zoneIds: ['back-dune'],
    weatherProfiles: ['clear', 'marine-haze'],
    family: 'timing',
    promptFamilies: ['timing'],
    promptIds: ['coastal-ready-patch', 'shelter-builds-here'],
    text: 'This patch already feels halfway between dune and scrub.',
  },
  {
    id: 'scrub-thicket-neighbors',
    biomeId: 'coastal-scrub',
    zoneIds: ['shrub-thicket'],
    family: 'neighbors',
    promptFamilies: ['neighbors'],
    promptIds: ['thicket-cover'],
    text: 'The thicker stems here turn wind into cover.',
  },
  {
    id: 'scrub-swale-shelter',
    biomeId: 'coastal-scrub',
    zoneIds: ['windbreak-swale'],
    weatherProfiles: ['clear', 'marine-haze'],
    family: 'shelter',
    promptIds: ['coastal-swale-shelter', 'swale-shelter'],
    text: 'This swale turns low cover into shelter.',
  },
  {
    id: 'scrub-edge-shade',
    biomeId: 'coastal-scrub',
    zoneIds: ['forest-edge'],
    family: 'neighbors',
    promptFamilies: ['neighbors'],
    promptIds: ['coastal-edge-shade'],
    text: 'The first shade here is still scrub-made, not full forest yet.',
  },
  {
    id: 'forest-floor-neighbors',
    biomeId: 'forest',
    zoneIds: ['fern-hollow'],
    weatherProfiles: ['mist-drip'],
    family: 'neighbors',
    promptFamilies: ['neighbors'],
    promptIds: ['forest-floor-recycling'],
    text: 'Moist ground keeps the quiet recyclers close.',
  },
  {
    id: 'forest-hollow-moisture',
    biomeId: 'forest',
    zoneIds: ['root-hollow'],
    family: 'neighbors',
    promptFamilies: ['neighbors'],
    promptIds: ['forest-hollow-moisture'],
    text: 'The hollow keeps making wet places even above the floor.',
  },
  {
    id: 'forest-log-timing',
    biomeId: 'forest',
    zoneIds: ['log-run'],
    weatherProfiles: ['clear'],
    family: 'timing',
    promptFamilies: ['timing'],
    promptIds: ['forest-seed-travel'],
    text: 'Drier air changes how this patch lets seeds go.',
  },
  {
    id: 'treeline-low-shelter',
    biomeId: 'treeline',
    zoneIds: ['lichen-fell'],
    weatherProfiles: ['ridge-wind'],
    family: 'shelter',
    promptFamilies: ['shelter'],
    promptIds: ['low-ground-wins'],
    text: 'The lowest shapes are winning the weather here.',
  },
  {
    id: 'treeline-krummholz-comparison',
    biomeId: 'treeline',
    zoneIds: ['krummholz-belt'],
    dayParts: ['dusk'],
    weatherProfiles: ['clear'],
    family: 'comparison',
    promptFamilies: ['comparison'],
    promptIds: ['wind-shapes-trees'],
    text: 'Bent trees and low shrubs are solving the same problem.',
  },
  {
    id: 'tundra-short-season',
    biomeId: 'tundra',
    zoneIds: ['snow-meadow'],
    weatherProfiles: ['clear', 'light-flurry'],
    family: 'timing',
    promptFamilies: ['timing'],
    promptIds: ['short-summer-rush'],
    text: 'Everything bright here feels in a hurry to use the season.',
  },
  {
    id: 'tundra-low-shelter',
    biomeId: 'tundra',
    zoneIds: ['wind-bluff'],
    family: 'shelter',
    promptFamilies: ['shelter'],
    promptIds: ['staying-low', 'tundra-low-shelter'],
    text: 'Out here, staying low is almost the whole plan.',
  },
];

const FIELD_PARTNER_FALLBACK_CUES: readonly FieldPartnerCueDefinition[] = [
  {
    id: 'beach-open-morning',
    biomeId: 'beach',
    zoneIds: ['dry-sand'],
    dayParts: ['dawn'],
    weatherProfiles: ['clear'],
    family: 'neighbors',
    text: 'The open sand reads differently before the day gets louder.',
  },
  {
    id: 'scrub-haze-edge',
    biomeId: 'coastal-scrub',
    weatherProfiles: ['marine-haze'],
    family: 'shelter',
    text: 'Even the haze makes this place feel more sheltered than the beach.',
  },
  {
    id: 'forest-drip',
    biomeId: 'forest',
    weatherProfiles: ['mist-drip'],
    family: 'neighbors',
    text: 'The air here is carrying water almost as much as the ground is.',
  },
  {
    id: 'treeline-wind',
    biomeId: 'treeline',
    weatherProfiles: ['ridge-wind'],
    family: 'shelter',
    text: 'The wind is explaining the shape of almost everything here.',
  },
  {
    id: 'tundra-flurry',
    biomeId: 'tundra',
    weatherProfiles: ['light-flurry'],
    family: 'shelter',
    text: 'A light flurry can make the whole ground feel even shorter and closer.',
  },
];

function matchesOptionalList<T extends string>(value: T, allowed?: readonly T[]): boolean {
  return !allowed?.length || allowed.includes(value);
}

function matchesCueLocation(
  cue: FieldPartnerCueDefinition,
  biomeId: string,
  zoneId: string | null,
  worldState: Pick<WorldState, 'dayPart' | 'weather'>,
): boolean {
  return (
    cue.biomeId === biomeId &&
    matchesOptionalList(zoneId ?? 'no-zone', cue.zoneIds) &&
    matchesOptionalList(worldState.dayPart, cue.dayParts) &&
    matchesOptionalList(worldState.weather, cue.weatherProfiles)
  );
}

function matchesPromptCue(
  cue: FieldPartnerCueDefinition,
  observationPrompt: ObservationPrompt,
): boolean {
  const matchesFamily = cue.promptFamilies?.includes(observationPrompt.family) ?? false;
  const matchesPromptId = cue.promptIds?.includes(observationPrompt.id) ?? false;
  return matchesFamily || matchesPromptId;
}

function buildFieldPartnerStateKey(
  cue: FieldPartnerCueDefinition,
  biomeId: string,
  zoneId: string | null,
  worldState: Pick<WorldState, 'dayPart' | 'weather'>,
  evidenceKey: string,
): string {
  return [
    biomeId,
    zoneId ?? 'no-zone',
    worldState.dayPart,
    worldState.weather,
    evidenceKey,
    cue.id,
  ].join('|');
}

export function buildFieldPartnerNotice({
  biomeId,
  zoneId,
  worldState,
  observationPrompt,
  trigger,
}: FieldPartnerNoticeContext): FieldPartnerNotice | null {
  if (observationPrompt) {
    for (const cue of FIELD_PARTNER_PROMPT_CUES) {
      if (
        matchesCueLocation(cue, biomeId, zoneId, worldState) &&
        matchesPromptCue(cue, observationPrompt)
      ) {
        return {
          cueId: cue.id,
          text: cue.text,
          family: cue.family,
          source: observationPrompt.source,
          trigger,
          evidenceKey: observationPrompt.evidenceKey,
          stateKey: buildFieldPartnerStateKey(cue, biomeId, zoneId, worldState, observationPrompt.evidenceKey),
        };
      }
    }

    return null;
  }

  for (const cue of FIELD_PARTNER_FALLBACK_CUES) {
    if (!matchesCueLocation(cue, biomeId, zoneId, worldState)) {
      continue;
    }

    return {
      cueId: cue.id,
      text: cue.text,
      family: cue.family,
      source: 'fallback',
      trigger,
      evidenceKey: 'no-prompt',
      stateKey: buildFieldPartnerStateKey(cue, biomeId, zoneId, worldState, 'no-prompt'),
    };
  }

  return null;
}

export function shouldDeliverFieldPartnerNotice({
  trigger,
  deliveredThisVisit,
  lastStateKey,
  candidateStateKey,
  globalCooldownRemainingSeconds,
}: FieldPartnerDeliveryState): boolean {
  if (candidateStateKey === lastStateKey) {
    return false;
  }

  if (deliveredThisVisit === 0) {
    return true;
  }

  if (deliveredThisVisit >= 2) {
    return false;
  }

  if (trigger === 'biome-enter') {
    return false;
  }

  return globalCooldownRemainingSeconds <= 0;
}
