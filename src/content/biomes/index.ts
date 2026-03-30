import { beachBiome } from './beach';
import { coastalScrubBiome } from './coastal-scrub';
import { forestBiome } from './forest';
import { treelineBiome } from './treeline';
import { tundraBiome } from './tundra';

export { beachBiome } from './beach';
export { coastalScrubBiome } from './coastal-scrub';
export { forestBiome } from './forest';
export { treelineBiome } from './treeline';
export { tundraBiome } from './tundra';

export const biomeRegistry = {
  beach: beachBiome,
  'coastal-scrub': coastalScrubBiome,
  forest: forestBiome,
  treeline: treelineBiome,
  tundra: tundraBiome,
};
