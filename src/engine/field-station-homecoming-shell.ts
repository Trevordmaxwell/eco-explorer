import type {
  FieldSeasonBoardState,
  FieldSeasonWrapState,
} from './field-season-board';
import type { FieldStationArrivalMode } from './field-station-session';
import type { NurseryStateView } from './nursery';
import { makeRect, type UiRect } from './ui-layout';
import type { BiomeDefinition } from './types';

export interface FieldStationGrowthInput {
  teachingBedStage: string | null;
  hasLogPile: boolean;
  hasPollinatorPatch: boolean;
  compostRate: number;
  loggedRouteCount: number;
  hasLateSeasonArchive?: boolean;
}

export interface FieldStationGrowthAccentState {
  showAccent: boolean;
  stageProgress: number;
  hasLogPile: boolean;
  hasPollinatorPatch: boolean;
  hasCompostUpgrade: boolean;
  loggedRouteCount: number;
  hasLeftRouteAccent: boolean;
  hasRightRouteAccent: boolean;
  hasConnectedThreshold: boolean;
  planterWidth: number;
}

export interface FieldStationBackdropAccentState {
  showAccent: boolean;
  stageProgress: number;
  loggedRouteCount: number;
  hasLeftBrace: boolean;
  hasRightBrace: boolean;
  hasCenterTie: boolean;
  hasLogPile: boolean;
  hasPollinatorPatch: boolean;
  hasCompostUpgrade: boolean;
  hasLateSeasonLintel: boolean;
}

interface FieldStationBackdropPulseState {
  renderLeftBrace: boolean;
  renderRightBrace: boolean;
  renderCenterTie: boolean;
  renderLateSeasonLintel: boolean;
}

interface FieldStationHomecomingShellSource {
  nursery: NurseryStateView;
  loggedRouteCount: number;
  seasonWrap: FieldSeasonWrapState | null;
  routeBoard: Pick<FieldSeasonBoardState, 'launchCard'> | null;
}

interface DrawFieldStationHomecomingShellOptions {
  context: CanvasRenderingContext2D;
  panelRect: UiRect;
  contentRect: UiRect;
  palette: BiomeDefinition['palette'];
  input: FieldStationGrowthInput;
  arrivalPulse: number;
  arrivalMode: FieldStationArrivalMode;
}

function getNurseryStageProgress(stage: string): number {
  switch (stage) {
    case 'stocked':
      return 1;
    case 'rooting':
      return 2;
    case 'growing':
      return 3;
    case 'mature':
      return 4;
    default:
      return 0;
  }
}

function hasLateSeasonArchiveReturn(
  seasonWrap: FieldSeasonWrapState | null,
  routeBoard: Pick<FieldSeasonBoardState, 'launchCard'> | null,
): boolean {
  return seasonWrap?.label === 'SEASON ARCHIVE' && Boolean(routeBoard?.launchCard);
}

export function buildFieldStationGrowthInput({
  nursery,
  loggedRouteCount,
  seasonWrap,
  routeBoard,
}: FieldStationHomecomingShellSource): FieldStationGrowthInput {
  return {
    teachingBedStage: nursery.activeProject?.state.stage ?? null,
    hasLogPile: nursery.extras.some((extra) => extra.id === 'log-pile' && extra.unlocked),
    hasPollinatorPatch: nursery.extras.some((extra) => extra.id === 'pollinator-patch' && extra.unlocked),
    compostRate: nursery.compostRate,
    loggedRouteCount,
    hasLateSeasonArchive: hasLateSeasonArchiveReturn(seasonWrap, routeBoard),
  };
}

export function resolveFieldStationGrowthAccentState({
  teachingBedStage,
  hasLogPile,
  hasPollinatorPatch,
  compostRate,
  loggedRouteCount,
}: FieldStationGrowthInput): FieldStationGrowthAccentState {
  const stageProgress = teachingBedStage ? getNurseryStageProgress(teachingBedStage) : 0;
  const hasCompostUpgrade = compostRate > 1;
  const safeLoggedRouteCount = Math.max(0, Math.min(3, loggedRouteCount));
  const hasLeftRouteAccent = safeLoggedRouteCount >= 1;
  const hasRightRouteAccent = safeLoggedRouteCount >= 2;
  const hasConnectedThreshold = safeLoggedRouteCount >= 3;
  const showAccent =
    stageProgress > 0
    || hasLogPile
    || hasPollinatorPatch
    || hasCompostUpgrade
    || safeLoggedRouteCount > 0;

  return {
    showAccent,
    stageProgress,
    hasLogPile,
    hasPollinatorPatch,
    hasCompostUpgrade,
    loggedRouteCount: safeLoggedRouteCount,
    hasLeftRouteAccent,
    hasRightRouteAccent,
    hasConnectedThreshold,
    planterWidth: showAccent ? 10 + stageProgress * 3 + (hasCompostUpgrade ? 3 : 0) : 0,
  };
}

export function resolveFieldStationBackdropAccentState({
  teachingBedStage,
  hasLogPile,
  hasPollinatorPatch,
  compostRate,
  loggedRouteCount,
  hasLateSeasonArchive = false,
}: FieldStationGrowthInput): FieldStationBackdropAccentState {
  const stageProgress = teachingBedStage ? getNurseryStageProgress(teachingBedStage) : 0;
  const hasCompostUpgrade = compostRate > 1;
  const safeLoggedRouteCount = Math.max(0, Math.min(3, loggedRouteCount));
  const hasLeftBrace = safeLoggedRouteCount >= 1 || stageProgress >= 1 || hasLogPile;
  const hasRightBrace = safeLoggedRouteCount >= 2 || stageProgress >= 3 || hasPollinatorPatch;
  const hasCenterTie = safeLoggedRouteCount >= 3 || stageProgress >= 4 || hasCompostUpgrade;
  const hasLateSeasonLintel = hasLateSeasonArchive && hasLeftBrace && hasRightBrace;

  return {
    showAccent: hasLeftBrace || hasRightBrace || hasCenterTie,
    stageProgress,
    loggedRouteCount: safeLoggedRouteCount,
    hasLeftBrace,
    hasRightBrace,
    hasCenterTie,
    hasLogPile,
    hasPollinatorPatch,
    hasCompostUpgrade,
    hasLateSeasonLintel,
  };
}

export function resolveFieldStationBackdropPulseState(
  accent: FieldStationBackdropAccentState,
  arrivalMode: FieldStationArrivalMode,
  arrivalPulse: number,
): FieldStationBackdropPulseState {
  const pulseShell = arrivalMode === 'homecoming' && arrivalPulse > 0;
  return {
    renderLeftBrace: accent.hasLeftBrace || pulseShell,
    renderRightBrace: accent.hasRightBrace || pulseShell,
    renderCenterTie: accent.hasCenterTie || pulseShell,
    renderLateSeasonLintel: accent.hasLateSeasonLintel,
  };
}

function drawFieldStationBackdropAccent(
  context: CanvasRenderingContext2D,
  panelRect: UiRect,
  palette: BiomeDefinition['palette'],
  accent: FieldStationBackdropAccentState,
  arrivalPulse: number,
  arrivalMode: FieldStationArrivalMode,
): void {
  const pulseState = resolveFieldStationBackdropPulseState(accent, arrivalMode, arrivalPulse);

  if (
    !accent.showAccent
    && !pulseState.renderLeftBrace
    && !pulseState.renderRightBrace
    && !pulseState.renderLateSeasonLintel
  ) {
    return;
  }

  const braceTop = panelRect.y + 18;
  const braceBottom = panelRect.y + panelRect.h - 24;
  const braceHeight = Math.max(20, braceBottom - braceTop);
  const leftBraceX = panelRect.x + 5;
  const rightBraceX = panelRect.x + panelRect.w - 9;

  const drawBrace = (x: number, facing: 'left' | 'right'): void => {
    const crossbarX = facing === 'left' ? x : x - 1;

    context.fillStyle = palette.cardShadow;
    context.fillRect(x + 1, braceTop, 2, braceHeight);
    context.fillRect(crossbarX, braceTop + 3, 4, 1);
    context.fillRect(crossbarX, braceBottom - 4, 4, 1);

    context.fillStyle = palette.journalSelected;
    context.fillRect(x + 1, braceTop + 1, 1, braceHeight - 2);
    context.fillRect(crossbarX + 1, braceTop + 2, 2, 1);
    context.fillRect(crossbarX + 1, braceBottom - 5, 2, 1);
  };

  if (pulseState.renderLeftBrace) {
    drawBrace(leftBraceX, 'left');
  }

  if (pulseState.renderRightBrace) {
    drawBrace(rightBraceX, 'right');
  }

  if (pulseState.renderCenterTie) {
    const tieY = braceTop + Math.floor(braceHeight / 2);
    context.fillStyle = palette.cardShadow;
    if (accent.hasLeftBrace) {
      context.fillRect(leftBraceX + 3, tieY, 3, 1);
    }
    if (accent.hasRightBrace) {
      context.fillRect(rightBraceX - 2, tieY, 3, 1);
    }
    context.fillStyle = palette.journalSelected;
    if (accent.hasLeftBrace) {
      context.fillRect(leftBraceX + 3, tieY - 1, 2, 1);
    }
    if (accent.hasRightBrace) {
      context.fillRect(rightBraceX - 1, tieY - 1, 2, 1);
    }
  }

  if (pulseState.renderLateSeasonLintel) {
    const lintelY = braceTop + 1;
    context.fillStyle = palette.cardShadow;
    context.fillRect(leftBraceX + 3, lintelY, rightBraceX - leftBraceX - 2, 1);
    context.fillStyle = palette.journalSelected;
    context.fillRect(leftBraceX + 4, lintelY - 1, rightBraceX - leftBraceX - 4, 1);
    context.fillStyle = palette.accent;
    context.fillRect(Math.floor((leftBraceX + rightBraceX) / 2), lintelY - 1, 1, 1);
  }

  if (accent.stageProgress > 0) {
    const growthPipCount = Math.min(4, accent.stageProgress);
    for (let index = 0; index < growthPipCount; index += 1) {
      const pipOnRight = accent.hasRightBrace && index % 2 === 1;
      const pipX = pipOnRight ? rightBraceX + 1 : leftBraceX + 2;
      const pipY = braceBottom - 8 - index * 4;
      context.fillStyle = palette.accent;
      context.fillRect(pipX, pipY, 1, 1);
      if (accent.stageProgress >= 3) {
        context.fillStyle = palette.text;
        context.fillRect(pipX + (pipOnRight ? -1 : 1), pipY - 1, 1, 1);
      }
    }
  }

  if (accent.hasLogPile && accent.hasLeftBrace) {
    context.fillStyle = palette.cardShadow;
    context.fillRect(leftBraceX, braceBottom - 10, 4, 1);
    context.fillRect(leftBraceX + 1, braceBottom - 12, 2, 1);
    context.fillStyle = palette.accent;
    context.fillRect(leftBraceX + 2, braceBottom - 11, 1, 1);
  }

  if (accent.hasPollinatorPatch && accent.hasRightBrace) {
    const bloomY = braceTop + 7;
    context.fillStyle = palette.accent;
    context.fillRect(rightBraceX, bloomY, 2, 2);
    context.fillRect(rightBraceX + 2, bloomY + 2, 2, 1);
    context.fillStyle = palette.text;
    context.fillRect(rightBraceX + 1, bloomY + 1, 1, 1);
  }

  if (accent.hasCompostUpgrade && accent.hasLeftBrace && accent.hasRightBrace) {
    const bandY = braceBottom - 14;
    context.fillStyle = palette.cardShadow;
    context.fillRect(leftBraceX + 3, bandY, 2, 1);
    context.fillRect(rightBraceX - 1, bandY, 2, 1);
    context.fillStyle = palette.accent;
    context.fillRect(leftBraceX + 4, bandY - 1, 1, 1);
    context.fillRect(rightBraceX, bandY - 1, 1, 1);
  }
}

function drawFieldStationGrowthAccent(
  context: CanvasRenderingContext2D,
  panelRect: UiRect,
  contentRect: UiRect,
  palette: BiomeDefinition['palette'],
  accent: FieldStationGrowthAccentState,
  arrivalPulse: number,
): void {
  if (!accent.showAccent && arrivalPulse <= 0) {
    return;
  }

  const sillRect = makeRect(contentRect.x + 8, panelRect.y + panelRect.h - 8, contentRect.w - 16, 4);
  if (accent.showAccent) {
    context.fillStyle = palette.cardShadow;
    context.fillRect(sillRect.x, sillRect.y + sillRect.h - 1, sillRect.w, 1);
    context.fillStyle = palette.journalSelected;
    context.fillRect(sillRect.x, sillRect.y + 1, sillRect.w, 2);
  }

  if (accent.hasLogPile) {
    context.fillStyle = palette.cardShadow;
    context.fillRect(sillRect.x + 2, sillRect.y + 2, 7, 1);
    context.fillRect(sillRect.x + 3, sillRect.y + 1, 5, 1);
    context.fillStyle = palette.accent;
    context.fillRect(sillRect.x + 4, sillRect.y + 2, 1, 1);
    context.fillRect(sillRect.x + 6, sillRect.y + 1, 1, 1);
  }

  const planterRect = makeRect(
    sillRect.x + Math.floor((sillRect.w - accent.planterWidth) / 2),
    sillRect.y,
    accent.planterWidth,
    4,
  );

  if (accent.hasLeftRouteAccent) {
    const leftPatchX = sillRect.x + 12;
    context.fillStyle = palette.cardShadow;
    context.fillRect(leftPatchX, sillRect.y + 3, 5, 1);
    context.fillRect(leftPatchX + 1, sillRect.y + 2, 4, 1);
    context.fillStyle = palette.journalSelected;
    context.fillRect(leftPatchX + 1, sillRect.y + 1, 3, 1);
    context.fillStyle = palette.accent;
    context.fillRect(leftPatchX + 2, sillRect.y + 1, 1, 1);
  }

  if (accent.hasRightRouteAccent) {
    const rightPatchX = sillRect.x + sillRect.w - 18;
    context.fillStyle = palette.cardShadow;
    context.fillRect(rightPatchX, sillRect.y + 3, 5, 1);
    context.fillRect(rightPatchX + 1, sillRect.y + 2, 4, 1);
    context.fillStyle = palette.journalSelected;
    context.fillRect(rightPatchX + 1, sillRect.y + 1, 3, 1);
    context.fillStyle = palette.accent;
    context.fillRect(rightPatchX + 2, sillRect.y + 1, 1, 1);
  }

  if (accent.hasConnectedThreshold) {
    context.fillStyle = palette.cardShadow;
    context.fillRect(planterRect.x - 5, sillRect.y + 3, 4, 1);
    context.fillRect(planterRect.x + planterRect.w + 1, sillRect.y + 3, 4, 1);
    context.fillStyle = palette.journalSelected;
    context.fillRect(planterRect.x - 4, sillRect.y + 2, 2, 1);
    context.fillRect(planterRect.x + planterRect.w + 2, sillRect.y + 2, 2, 1);
  }

  context.fillStyle = accent.hasCompostUpgrade ? palette.cardShadow : palette.journalSelected;
  context.fillRect(planterRect.x, planterRect.y + 2, planterRect.w, 2);
  const sproutCount = Math.max(1, accent.stageProgress);
  const sproutSpacing = Math.max(2, Math.floor((planterRect.w - 4) / Math.max(1, sproutCount)));
  for (let index = 0; index < sproutCount; index += 1) {
    const sproutX = Math.min(planterRect.x + 2 + index * sproutSpacing, planterRect.x + planterRect.w - 3);
    context.fillStyle = palette.accent;
    context.fillRect(sproutX, planterRect.y + 1, 1, 1);
    context.fillRect(sproutX + 1, planterRect.y, 1, 1);
    if (accent.stageProgress >= 3) {
      context.fillStyle = palette.text;
      context.fillRect(sproutX, planterRect.y, 1, 1);
    }
  }

  if (accent.hasPollinatorPatch) {
    const bloomX = sillRect.x + sillRect.w - 9;
    context.fillStyle = palette.accent;
    context.fillRect(bloomX + 1, sillRect.y, 2, 2);
    context.fillRect(bloomX + 4, sillRect.y + 2, 2, 1);
    context.fillRect(bloomX + 2, sillRect.y + 3, 2, 1);
    context.fillStyle = palette.text;
    context.fillRect(bloomX + 3, sillRect.y + 1, 1, 1);
  }

  if (arrivalPulse > 0) {
    const pulseWidth = Math.max(8, Math.floor((sillRect.w - 18) * arrivalPulse));
    const pulseX = sillRect.x + Math.floor((sillRect.w - pulseWidth) / 2);
    context.fillStyle = palette.accent;
    context.fillRect(pulseX, sillRect.y + 1, pulseWidth, 1);
    context.fillStyle = palette.text;
    context.fillRect(pulseX + 1, sillRect.y, Math.max(2, pulseWidth - 2), 1);
  }
}

export function drawFieldStationHomecomingShell({
  context,
  panelRect,
  contentRect,
  palette,
  input,
  arrivalPulse,
  arrivalMode,
}: DrawFieldStationHomecomingShellOptions): void {
  const backdropAccent = resolveFieldStationBackdropAccentState(input);
  drawFieldStationBackdropAccent(context, panelRect, palette, backdropAccent, arrivalPulse, arrivalMode);
  const growthAccent = resolveFieldStationGrowthAccentState(input);
  drawFieldStationGrowthAccent(context, panelRect, contentRect, palette, growthAccent, arrivalPulse);
}
