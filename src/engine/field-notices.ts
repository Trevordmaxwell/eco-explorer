import { getFieldRequestDefinition } from './field-requests';

export type FieldNoticeVariant = 'default' | 'notebook-ready' | 'filed-route';

export interface FieldNoticeDescriptor {
  title: string;
  text: string;
  variant: FieldNoticeVariant;
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
