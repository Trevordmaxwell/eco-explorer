import type { InspectableEntry } from './types';

const DEFAULT_LANDMARK_LABEL = 'Descriptor';

export function getInspectableDetail(entry: InspectableEntry): {
  label: string;
  text: string;
} {
  if (entry.category === 'landmark') {
    return {
      label: entry.subtitleLabel ?? DEFAULT_LANDMARK_LABEL,
      text: entry.subtitle,
    };
  }

  return {
    label: 'Scientific name',
    text: entry.scientificName,
  };
}
