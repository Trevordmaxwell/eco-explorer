import type { OutingSupportId } from './types';

export type OutingSupportStationLabel =
  | 'HAND LENS'
  | 'NOTE TABS'
  | 'PLACE TAB'
  | 'ROUTE MARKER';

export function getOutingSupportStationLabel(
  selectedOutingSupportId: OutingSupportId,
): OutingSupportStationLabel {
  switch (selectedOutingSupportId) {
    case 'route-marker':
      return 'ROUTE MARKER';
    case 'place-tab':
      return 'PLACE TAB';
    case 'note-tabs':
      return 'NOTE TABS';
    default:
      return 'HAND LENS';
  }
}
