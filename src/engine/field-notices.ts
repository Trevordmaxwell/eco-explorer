import { getFieldRequestDefinition } from './field-requests';

export type FieldNoticeVariant = 'default' | 'notebook-ready' | 'filed-route';

export interface FieldNoticeDescriptor {
  title: string;
  text: string;
  variant: FieldNoticeVariant;
}

const GUIDED_FIELD_SEASON_NOTICE_TITLES = new Set([
  'NOTEBOOK TASK',
  'FIELD STATION',
  'NEXT STOP',
  'SEASON THREADS',
]);

export function isGuidedFieldSeasonNoticeTitle(title: string): boolean {
  return GUIDED_FIELD_SEASON_NOTICE_TITLES.has(title);
}

export function canShowGuidedFieldSeasonNotice(
  currentNotice: FieldNoticeDescriptor | null,
  nextTitle: string,
): boolean {
  if (!currentNotice) {
    return true;
  }

  return (
    isGuidedFieldSeasonNoticeTitle(currentNotice.title) &&
    isGuidedFieldSeasonNoticeTitle(nextTitle)
  );
}

export function shouldClearFieldNoticeForHomecoming(
  notice: FieldNoticeDescriptor | null,
): boolean {
  return Boolean(notice && notice.variant !== 'filed-route');
}

function isStationProtectedRouteNotice(notice: FieldNoticeDescriptor): boolean {
  return notice.variant === 'notebook-ready' || notice.variant === 'filed-route';
}

export function shouldReplaceFieldNotice(
  currentNotice: FieldNoticeDescriptor | null,
  nextNotice: FieldNoticeDescriptor,
  context: { overlayMode: string },
): boolean {
  if (!currentNotice) {
    return true;
  }

  return !(
    context.overlayMode === 'field-station'
    && isStationProtectedRouteNotice(currentNotice)
    && nextNotice.variant !== 'filed-route'
  );
}

export function shouldAdvanceFieldRequestNoticeTimer(context: {
  overlayMode: string;
  sceneMode: string;
  hasVisibleFieldGuideNotice: boolean;
}): boolean {
  return (
    context.overlayMode === 'playing' &&
    context.sceneMode !== 'transition' &&
    !context.hasVisibleFieldGuideNotice
  );
}

export function resolveRecordedFieldRequestNotice(
  requestId: string,
  textOverride: string | null = null,
): FieldNoticeDescriptor | null {
  const definition = getFieldRequestDefinition(requestId);
  if (!definition) {
    return null;
  }

  const isRouteBackedNotice = 'routeV2Note' in definition;
  return {
    title: isRouteBackedNotice ? definition.title.toUpperCase() : 'TASK RECORDED',
    text: textOverride ?? (isRouteBackedNotice ? definition.routeV2Note.filedText : definition.title),
    variant: isRouteBackedNotice ? 'filed-route' : 'default',
  };
}

export function createNotebookReadyFieldNotice(
  title: string | null | undefined,
  text: string | null | undefined,
): FieldNoticeDescriptor {
  return {
    title: title ?? 'NOTEBOOK READY',
    text: text ?? 'Return to the field station and file this note.',
    variant: 'notebook-ready',
  };
}
