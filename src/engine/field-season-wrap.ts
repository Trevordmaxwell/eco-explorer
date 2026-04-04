import type {
  BiomeDefinition,
  FieldStationSeasonPage,
  FieldStationView,
  OutingSupportId,
} from './types';
import type {
  FieldAtlasState,
  FieldSeasonArchiveState,
  FieldSeasonBoardBeat,
  FieldSeasonBoardState,
  FieldSeasonWrapState,
} from './field-season-board';

function getTargetBiomeName(
  biomes: Record<string, BiomeDefinition>,
  routeBoard: FieldSeasonBoardState,
): string | null {
  return routeBoard.targetBiomeId ? biomes[routeBoard.targetBiomeId]?.name ?? null : null;
}

function getLastLoggedBeatTitle(routeBoard: FieldSeasonBoardState): string | null {
  return [...routeBoard.beats].reverse().find((beat) => beat.status === 'done')?.title ?? null;
}

function stripNextPrefix(text: string): string {
  return text.replace(/^Next:\s*/, '');
}

function capitalizeFirstLetter(text: string): string {
  return text.length ? `${text[0].toUpperCase()}${text.slice(1)}` : text;
}

function isShoreShelterLoggedReturn(routeBoard: FieldSeasonBoardState): boolean {
  return (
    routeBoard.routeId === 'coastal-shelter-line'
    && routeBoard.nextDirection === 'Next: travel inland to Forest Trail and find Hidden Hollow.'
  );
}

function isOpenToShelterLoggedReturn(routeBoard: FieldSeasonBoardState): boolean {
  return (
    routeBoard.routeId === 'coastal-shelter-line'
    && routeBoard.nextDirection === 'Next: return to Coastal Scrub and log the cooler, wetter edge at forest side.'
  );
}

function isInlandLineLoggedReturn(routeBoard: FieldSeasonBoardState): boolean {
  return (
    routeBoard.routeId === 'edge-pattern-line'
    && routeBoard.activeBeatId === 'scrub-edge-pattern'
    && routeBoard.progressLabel === '0/3 logged'
  );
}

function resolveNoteTabsReplayWrap(routeBoard: FieldSeasonBoardState): FieldSeasonWrapState | null {
  if (
    routeBoard.routeId === 'edge-pattern-line'
    && routeBoard.activeBeatId === 'scrub-edge-pattern'
    && routeBoard.replayNote?.id === 'edge-held-sand'
  ) {
    return {
      label: 'SCRUB PATTERN',
      text: 'Walk the coast-to-forest transect from pioneer scrub into lower fell.',
    };
  }

  return null;
}

function getEcosystemNotePrompt(
  biomes: Record<string, BiomeDefinition>,
  biomeId: string,
  noteId: string,
): string | null {
  return biomes[biomeId]?.ecosystemNotes?.find((note) => note.id === noteId)?.observationPrompt ?? null;
}

function resolvePlaceTabPrompt(
  biomes: Record<string, BiomeDefinition>,
  routeBoard: FieldSeasonBoardState,
  activeBeat: FieldSeasonBoardBeat | null,
): string | null {
  if (routeBoard.routeId === 'treeline-shelter-line') {
    switch (routeBoard.activeBeatId) {
      case 'tundra-short-season':
        return getEcosystemNotePrompt(biomes, 'tundra', 'thaw-edge');
      case 'tundra-survey':
        return getEcosystemNotePrompt(biomes, 'tundra', 'short-summer-rush');
      default:
        break;
    }
  }

  if (routeBoard.routeId === 'edge-pattern-line') {
    switch (routeBoard.activeBeatId) {
      case 'scrub-edge-pattern':
        return getEcosystemNotePrompt(biomes, 'coastal-scrub', 'shelter-builds-here');
      case 'forest-cool-edge':
        return getEcosystemNotePrompt(biomes, 'forest', 'creekside-shelter');
      case 'treeline-low-fell':
        return getEcosystemNotePrompt(biomes, 'treeline', 'tree-line-drops');
      default:
        break;
    }
  }

  return activeBeat?.detail ?? null;
}

function resolveSupportAwareTodayWrap(
  biomes: Record<string, BiomeDefinition>,
  routeBoard: FieldSeasonBoardState,
  selectedOutingSupportId: OutingSupportId,
): FieldSeasonWrapState | null {
  if (!routeBoard.targetBiomeId) {
    return null;
  }

  const activeBeat = routeBoard.beats.find((beat) => beat.status === 'active' || beat.status === 'ready') ?? null;
  const targetBiomeName = biomes[routeBoard.targetBiomeId]?.name ?? null;

  if (selectedOutingSupportId === 'hand-lens') {
    const text = routeBoard.replayNote?.text ?? activeBeat?.detail ?? null;
    return text
      ? {
          label: 'TODAY',
          text,
        }
      : null;
  }

  if (selectedOutingSupportId === 'place-tab') {
    const text = resolvePlaceTabPrompt(biomes, routeBoard, activeBeat);
    return text
      ? {
          label: 'TODAY',
          text,
        }
      : null;
  }

  if (selectedOutingSupportId === 'note-tabs') {
    const replayWrap = resolveNoteTabsReplayWrap(routeBoard);
    if (replayWrap) {
      return replayWrap;
    }
  }

  if (
    selectedOutingSupportId === 'note-tabs'
    && isOpenToShelterLoggedReturn(routeBoard)
  ) {
    return {
      label: 'OPEN TO SHELTER LOGGED',
      text: 'Coastal Scrub closes the shelter chapter. Edge Moisture waits at the forest edge.',
    };
  }

  if (
    selectedOutingSupportId === 'note-tabs'
    && isShoreShelterLoggedReturn(routeBoard)
  ) {
    return {
      label: 'SHORE SHELTER LOGGED',
      text: 'Sunny Beach closes the shore shelter line. Hidden Hollow waits inland.',
    };
  }

  if (
    selectedOutingSupportId === 'note-tabs'
    && isInlandLineLoggedReturn(routeBoard)
  ) {
    return {
      label: 'INLAND LINE LOGGED',
      text: 'Tundra Survey closes the inland line. Scrub Pattern waits in Coastal Scrub.',
    };
  }

  if (selectedOutingSupportId === 'note-tabs') {
    return routeBoard.summary
      ? {
          label: 'TODAY',
          text: routeBoard.summary,
        }
      : null;
  }

  const text = routeBoard.replayNote
    ? targetBiomeName
      ? `${routeBoard.replayNote.title} is clear. Next: ${targetBiomeName}.`
      : `${routeBoard.replayNote.title} is clear today.`
    : capitalizeFirstLetter(stripNextPrefix(routeBoard.nextDirection));
  return {
    label: 'TODAY',
    text,
  };
}

function resolveCompleteRouteStopPointText(
  routeBoard: FieldSeasonBoardState,
  seasonNote: { title: string; text: string },
): string | null {
  if (routeBoard.routeId !== 'edge-pattern-line') {
    return null;
  }

  if (routeBoard.summary.startsWith('Edge line logged.')) {
    return 'Good stopping point. Root Hollow waits below.';
  }

  if (routeBoard.summary.startsWith('Root Hollow is ready to file.')) {
    return 'Good stopping point. The note is ready.';
  }

  if (
    routeBoard.summary.startsWith('Root Hollow is underway.')
    || routeBoard.summary.startsWith('Root Hollow is nearly filed.')
  ) {
    return 'Good stopping point. Root Hollow is still open below.';
  }

  if (
    seasonNote.title === 'SEASON THREADS'
    || routeBoard.summary.startsWith('Root Hollow reconnects the season.')
  ) {
    return 'Good stopping point. Season Threads waits in Forest Trail.';
  }

  return null;
}

function resolveFrontHalfStopPointText(routeBoard: FieldSeasonBoardState): string | null {
  if (
    routeBoard.routeId === 'treeline-shelter-line'
    && routeBoard.beats[0]?.status === 'active'
    && routeBoard.beats[1]?.status === 'upcoming'
    && routeBoard.beats[2]?.status === 'upcoming'
  ) {
    return 'Good stopping point. Coast line filed.';
  }

  return null;
}

function resolveNoteTabsChapterCloseWrap(
  routeBoard: FieldSeasonBoardState,
  selectedOutingSupportId: OutingSupportId,
): FieldSeasonWrapState | null {
  if (selectedOutingSupportId !== 'note-tabs') {
    return null;
  }

  if (
    routeBoard.routeId === 'edge-pattern-line'
    && routeBoard.summary.startsWith('Edge line logged.')
  ) {
    return {
      label: 'EDGE LINE LOGGED',
      text: 'Low Fell closes the edge line. Root Hollow waits below.',
    };
  }

  return null;
}

export function resolveFieldSeasonWrapState(
  biomes: Record<string, BiomeDefinition>,
  routeBoard: FieldSeasonBoardState,
  seasonNote: { title: string; text: string },
  atlas: FieldAtlasState | null,
  archive: FieldSeasonArchiveState | null = null,
  selectedOutingSupportId: OutingSupportId = 'hand-lens',
): FieldSeasonWrapState {
  const targetBiomeName = getTargetBiomeName(biomes, routeBoard);

  if (routeBoard.notebookReady) {
    if (
      selectedOutingSupportId === 'note-tabs'
      && routeBoard.notebookReady.previewLabel
      && routeBoard.notebookReady.previewText
    ) {
      return {
        label: routeBoard.notebookReady.previewLabel,
        text: routeBoard.notebookReady.previewText,
      };
    }

    return {
      label: 'NOTEBOOK READY',
      text: routeBoard.notebookReady.text,
    };
  }

  if (routeBoard.complete) {
    if (archive) {
      return archive;
    }

    const noteTabsChapterCloseWrap = resolveNoteTabsChapterCloseWrap(
      routeBoard,
      selectedOutingSupportId,
    );
    if (noteTabsChapterCloseWrap) {
      return noteTabsChapterCloseWrap;
    }

    const completeRouteStopPointText = resolveCompleteRouteStopPointText(routeBoard, seasonNote);
    if (completeRouteStopPointText) {
      return {
        label: 'ROUTE LOGGED',
        text: completeRouteStopPointText,
      };
    }

    return {
      label: 'ROUTE LOGGED',
      text: 'Good stopping point. Rest here or tend the nursery.',
    };
  }

  if (!routeBoard.targetBiomeId) {
    return {
      label: seasonNote.title,
      text: seasonNote.text,
    };
  }

  const frontHalfStopPointText = resolveFrontHalfStopPointText(routeBoard);
  if (frontHalfStopPointText && atlas) {
    return {
      label: 'ROUTE LOGGED',
      text: frontHalfStopPointText,
    };
  }

  const supportAwareWrap = resolveSupportAwareTodayWrap(
    biomes,
    routeBoard,
    selectedOutingSupportId,
  );
  if (supportAwareWrap) {
    return supportAwareWrap;
  }

  const lastLoggedBeatTitle = getLastLoggedBeatTitle(routeBoard);
  if (lastLoggedBeatTitle) {
    return {
      label: 'TODAY',
      text: targetBiomeName ? `${lastLoggedBeatTitle}. Next: ${targetBiomeName}.` : lastLoggedBeatTitle,
    };
  }

  return {
    label: 'NEXT OUTING',
    text: targetBiomeName ? `Start with ${targetBiomeName}.` : seasonNote.text,
  };
}

export function resolveFieldStationSubtitle(
  view: FieldStationView,
  seasonPage: FieldStationSeasonPage,
  seasonWrap: FieldSeasonWrapState,
  archiveSubtitle: string | null = null,
): string {
  if (view === 'nursery') {
    return 'Nursery beds and quiet station care.';
  }

  if (seasonWrap.label === 'SEASON ARCHIVE') {
    return seasonPage === 'expedition'
      ? 'High Pass opens the next field season.'
      : archiveSubtitle ?? 'This season is filed. Another field season can open here later.';
  }

  if (seasonPage === 'expedition') {
    return 'Deeper forest chapter beyond the routes.';
  }

  return 'Route board and calm field support.';
}
