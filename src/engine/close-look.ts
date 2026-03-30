import type { CloseLookPayload, InspectableEntry } from './types';

interface CloseLookSeed {
  callouts: string[];
  sentence: string;
  spriteScale: number;
}

const CLOSE_LOOK_SEEDS: Record<string, CloseLookSeed> = {
  'moon-snail-shell': {
    callouts: ['rounded whorl', 'shell opening'],
    sentence: 'Most of this shell is one big spiral turn.',
    spriteScale: 7,
  },
  'razor-clam-shell': {
    callouts: ['long shell', 'straight hinge'],
    sentence: 'Its narrow shell helps a razor clam fit deep in wet sand.',
    spriteScale: 6,
  },
  'fir-cone': {
    callouts: ['cone scales', 'seed pockets'],
    sentence: 'Seeds rest under these scales until a dry cone opens.',
    spriteScale: 6,
  },
  'reindeer-lichen': {
    callouts: ['branching tips', 'pale cushion'],
    sentence: 'This lichen is made of many tiny pale branches.',
    spriteScale: 4,
  },
  'purple-saxifrage': {
    callouts: ['flower petals', 'low leaf mat'],
    sentence: 'Staying low helps this flower face cold Arctic wind.',
    spriteScale: 4,
  },
};

export function supportsCloseLook(entryId: string | null): boolean {
  return Boolean(entryId && CLOSE_LOOK_SEEDS[entryId]);
}

export function buildCloseLookPayload(entry: InspectableEntry): CloseLookPayload | null {
  const seed = CLOSE_LOOK_SEEDS[entry.id];
  if (!seed) {
    return null;
  }

  return {
    entryId: entry.id,
    title: entry.commonName,
    spriteId: entry.spriteId,
    sentence: seed.sentence,
    callouts: [...seed.callouts],
    spriteScale: seed.spriteScale,
  };
}
