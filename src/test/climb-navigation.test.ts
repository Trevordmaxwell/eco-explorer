import { describe, expect, it } from 'vitest';

import { findClimbGrabTarget, findClimbHintTarget } from '../engine/climb-navigation';
import type { Climbable } from '../engine/types';

const climbables: Climbable[] = [
  {
    id: 'left-trunk',
    spriteId: 'climb-trunk',
    x: 100,
    y: 80,
    w: 8,
    h: 72,
    topExitY: 80,
  },
  {
    id: 'right-trunk',
    spriteId: 'climb-trunk',
    x: 132,
    y: 80,
    w: 8,
    h: 72,
    topExitY: 80,
  },
];

describe('climb navigation', () => {
  it('lets a slightly offset player catch the nearest trunk without a perfect overlap', () => {
    const target = findClimbGrabTarget(climbables, {
      x: 89,
      y: 116,
      width: 10,
      height: 10,
    });

    expect(target?.id).toBe('left-trunk');
  });

  it('picks the nearest climbable when more than one trunk is in range', () => {
    const target = findClimbGrabTarget(climbables, {
      x: 102,
      y: 116,
      width: 10,
      height: 10,
    });

    expect(target?.id).toBe('left-trunk');
  });

  it('shows a climb hint a little earlier than it allows an actual grab', () => {
    const probe = {
      x: 97,
      y: 59,
      width: 10,
      height: 10,
    };

    expect(findClimbGrabTarget(climbables, probe)).toBeNull();
    expect(findClimbHintTarget(climbables, probe)?.id).toBe('left-trunk');
  });
});
