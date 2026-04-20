import type { SaveState } from './types';

export const FIELD_STATION_HOMECOMING_COPY_LABEL = 'WELCOME BACK';
export const FIELD_STATION_HOMECOMING_COPY_LABEL_MAX = 14;
export const FIELD_STATION_HOMECOMING_COPY_TEXT_MAX = 76;

export const FIELD_STATION_HOMECOMING_COPY_MILESTONES = [
  {
    requestId: 'treeline-high-pass',
    text: 'High Pass filed. Revisit how stone, shelter, and talus connect.',
  },
  {
    requestId: 'forest-season-threads',
    text: 'Season Threads filed. The station can rest before High Pass.',
  },
  {
    requestId: 'forest-expedition-upper-run',
    text: 'Root Hollow filed. The season reaches from shore to upper run.',
  },
  {
    requestId: 'treeline-low-fell',
    text: 'Edge line filed. Coast, ridge, and low fell now connect.',
  },
  {
    requestId: 'tundra-survey-slice',
    text: 'Coast and ridge filed. The board reads like one longer path.',
  },
  {
    requestId: 'coastal-edge-moisture',
    text: 'Coast line filed. The station holds one shore-to-forest thread.',
  },
] as const;

export type FieldStationHomecomingCopyRequestId =
  typeof FIELD_STATION_HOMECOMING_COPY_MILESTONES[number]['requestId'];

export interface FieldStationHomecomingCopy {
  label: typeof FIELD_STATION_HOMECOMING_COPY_LABEL;
  requestId: FieldStationHomecomingCopyRequestId;
  text: string;
}

export function resolveFieldStationHomecomingCopy(
  save: Pick<SaveState, 'completedFieldRequestIds'>,
): FieldStationHomecomingCopy | null {
  const completedRequestIds = new Set(save.completedFieldRequestIds);
  const milestone = FIELD_STATION_HOMECOMING_COPY_MILESTONES.find(({ requestId }) =>
    completedRequestIds.has(requestId),
  );

  return milestone
    ? {
        label: FIELD_STATION_HOMECOMING_COPY_LABEL,
        requestId: milestone.requestId,
        text: milestone.text,
      }
    : null;
}
