import type { CloseLookPayload, InspectableEntry } from './types';

interface CloseLookSeed {
  callouts: string[];
  sentence: string;
  spriteScale: number;
}

const CLOSE_LOOK_SEEDS: Record<string, CloseLookSeed> = {
  'sand-dollar-test': {
    callouts: ['star pattern', 'petal grooves'],
    sentence: 'This hard sand dollar test shows where the living animal once was.',
    spriteScale: 7,
  },
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
  'lingonberry': {
    callouts: ['berry cluster', 'evergreen leaves'],
    sentence: 'Evergreen leaves help lingonberry stay ready for short cool seasons.',
    spriteScale: 5,
  },
  'frost-heave-boulder': {
    callouts: ['lifted edge', 'cold-worked ground'],
    sentence: 'Freeze and thaw can slowly lift this stone from cold ground.',
    spriteScale: 5,
  },
  cottongrass: {
    callouts: ['white tuft', 'wet stem base'],
    sentence: 'These fluffy fibers help cottongrass seeds ride the wind.',
    spriteScale: 5,
  },
  'nootka-rose': {
    callouts: ['thorny stem', 'rose hip'],
    sentence: 'Thorny stems help this rose turn coastal scrub into safer cover.',
    spriteScale: 5,
  },
  kinnikinnick: {
    callouts: ['red berries', 'evergreen leaves'],
    sentence: 'Staying low helps this mat hold sandy ground beneath shore pines.',
    spriteScale: 5,
  },
  'nurse-log': {
    callouts: ['soft old wood', 'held moisture'],
    sentence: 'Old wood can hold water and give new plants a gentler start.',
    spriteScale: 6,
  },
  'canopy-moss-bed': {
    callouts: ['soft moss bed', 'held water'],
    sentence: 'This mossy bed holds water high on an old branch.',
    spriteScale: 6,
  },
  'seep-moss-mat': {
    callouts: ['wet stone grip', 'clinging moss'],
    sentence: 'Seep water keeps this moss patch clinging to wet stone.',
    spriteScale: 6,
  },
  'old-mans-beard': {
    callouts: ['hanging strands', 'branch grip'],
    sentence: 'Pale strands hang where damp forest air reaches the high branches.',
    spriteScale: 5,
  },
  'woodpecker-cavity': {
    callouts: ['carved opening', 'bark edge'],
    sentence: 'A woodpecker cut this opening, and later other animals may shelter inside.',
    spriteScale: 6,
  },
};

export const CLOSE_LOOK_ENTRY_IDS = Object.freeze(Object.keys(CLOSE_LOOK_SEEDS));

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
