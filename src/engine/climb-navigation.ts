import type { Climbable } from './types';

interface ClimbProbe {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ClimbSearchMargins {
  horizontal: number;
  verticalTop: number;
  verticalBottom: number;
}

const CLIMB_GRAB_MARGINS: ClimbSearchMargins = {
  horizontal: 8,
  verticalTop: 10,
  verticalBottom: 8,
};

const CLIMB_HINT_MARGINS: ClimbSearchMargins = {
  horizontal: 8,
  verticalTop: 12,
  verticalBottom: 10,
};

function getHorizontalGap(centerX: number, climbable: Climbable): number {
  if (centerX < climbable.x) {
    return climbable.x - centerX;
  }

  if (centerX > climbable.x + climbable.w) {
    return centerX - (climbable.x + climbable.w);
  }

  return 0;
}

function getVerticalGap(playerTop: number, playerBottom: number, climbable: Climbable): number {
  if (playerBottom < climbable.y) {
    return climbable.y - playerBottom;
  }

  if (playerTop > climbable.y + climbable.h) {
    return playerTop - (climbable.y + climbable.h);
  }

  return 0;
}

function findNearbyClimbable(
  climbables: Climbable[],
  probe: ClimbProbe,
  margins: ClimbSearchMargins,
): Climbable | null {
  const centerX = probe.x + probe.width / 2;
  const playerTop = probe.y;
  const playerBottom = probe.y + probe.height;
  let bestMatch: Climbable | null = null;
  let bestHorizontalGap = Number.POSITIVE_INFINITY;
  let bestVerticalGap = Number.POSITIVE_INFINITY;

  for (const climbable of climbables) {
    if (centerX < climbable.x - margins.horizontal || centerX > climbable.x + climbable.w + margins.horizontal) {
      continue;
    }

    if (
      playerBottom < climbable.y - margins.verticalTop ||
      playerTop > climbable.y + climbable.h + margins.verticalBottom
    ) {
      continue;
    }

    const horizontalGap = getHorizontalGap(centerX, climbable);
    const verticalGap = getVerticalGap(playerTop, playerBottom, climbable);

    if (
      horizontalGap < bestHorizontalGap ||
      (horizontalGap === bestHorizontalGap && verticalGap < bestVerticalGap)
    ) {
      bestMatch = climbable;
      bestHorizontalGap = horizontalGap;
      bestVerticalGap = verticalGap;
    }
  }

  return bestMatch;
}

export function findClimbGrabTarget(climbables: Climbable[], probe: ClimbProbe): Climbable | null {
  return findNearbyClimbable(climbables, probe, CLIMB_GRAB_MARGINS);
}

export function findClimbHintTarget(climbables: Climbable[], probe: ClimbProbe): Climbable | null {
  return findNearbyClimbable(climbables, probe, CLIMB_HINT_MARGINS);
}
