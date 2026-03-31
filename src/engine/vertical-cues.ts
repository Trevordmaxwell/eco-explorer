import type { BiomeDefinition, VerticalCue } from './types';

interface ViewportBounds {
  x: number;
  y: number;
  w: number;
  h: number;
}

const CUE_MARGIN = 12;

export function resolveVisibleVerticalCues(
  biomeDefinition: BiomeDefinition,
  zoneId: string | null,
  viewport: ViewportBounds,
): VerticalCue[] {
  if (!zoneId) {
    return [];
  }

  return (biomeDefinition.verticalCues ?? []).filter((cue) => {
    if (!cue.zoneIds.includes(zoneId)) {
      return false;
    }

    return (
      cue.x >= viewport.x - CUE_MARGIN &&
      cue.x <= viewport.x + viewport.w + CUE_MARGIN &&
      cue.y >= viewport.y - CUE_MARGIN &&
      cue.y <= viewport.y + viewport.h + CUE_MARGIN
    );
  });
}
