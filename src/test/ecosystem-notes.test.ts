import { describe, expect, it } from 'vitest';

import { beachBiome } from '../content/biomes/beach';
import { coastalScrubBiome } from '../content/biomes/coastal-scrub';
import { forestBiome } from '../content/biomes/forest';
import { treelineBiome } from '../content/biomes/treeline';
import { tundraBiome } from '../content/biomes/tundra';
import { resolveEcosystemNoteForEntry } from '../engine/ecosystem-notes';

describe('ecosystem note resolution', () => {
  it('unlocks a beach note once enough linked discoveries are found', () => {
    const resolved = resolveEcosystemNoteForEntry(
      beachBiome,
      'beach-grass',
      ['beach-grass', 'pacific-sand-crab'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('shore-shelter');
    expect(resolved.discoveredCount).toBe(2);
    expect(resolved.requiredCount).toBe(2);
  });

  it('keeps forest notes locked without spoiling the note payload early', () => {
    const resolved = resolveEcosystemNoteForEntry(
      forestBiome,
      'fir-cone',
      ['fir-cone'],
    );

    expect(resolved.state).toBe('locked');
    expect(resolved.note).toBeNull();
    expect(resolved.discoveredCount).toBe(1);
    expect(resolved.requiredCount).toBe(2);
  });

  it('supports a tundra note through a different linked pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      tundraBiome,
      'cloudberry',
      ['cloudberry', 'snow-bunting'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('short-summer-rush');
  });

  it('returns none for entries without a matching ecosystem note', () => {
    const resolved = resolveEcosystemNoteForEntry(
      beachBiome,
      'razor-clam-shell',
      ['razor-clam-shell'],
    );

    expect(resolved).toEqual({
      state: 'none',
      note: null,
      discoveredCount: 0,
      requiredCount: 0,
    });
  });

  it('unlocks the new beach bloom note with the shared dune pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      beachBiome,
      'sand-verbena',
      ['sand-verbena', 'beach-grass'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('low-dune-bloom');
  });

  it('unlocks the beach shelter-line starter note through the open-sand pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      beachBiome,
      'sea-rocket',
      ['sea-rocket', 'sand-verbena'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('shelter-line-start');
  });

  it('supports the refreshed beach dry-sand runner note through the bloom-and-runner pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      beachBiome,
      'beach-pea',
      ['beach-pea', 'dune-lupine'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('low-runner-band');
  });

  it('supports the new beach lee-pocket shelter note through the tucked runner pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      beachBiome,
      'beach-strawberry',
      ['driftwood-log', 'beach-strawberry'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('lee-pocket-hold');
  });

  it('supports the refreshed beach wrack note through the new scavenger pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      beachBiome,
      'beach-hopper',
      ['bull-kelp-wrack', 'beach-hopper'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('wave-edge-survivors');
  });

  it('also gives pacific sand crab the wrack-worker note through the same tide-line pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      beachBiome,
      'pacific-sand-crab',
      ['bull-kelp-wrack', 'pacific-sand-crab'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('wave-edge-survivors');
  });

  it('gives sanderling a tide-line food note through the new surf pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      beachBiome,
      'sanderling',
      ['sanderling', 'pacific-sand-crab'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('surf-food-line');
  });

  it('supports the coastal scrub forest-edge note through the local moisture pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      coastalScrubBiome,
      'sword-fern',
      ['sword-fern', 'nurse-log'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('edge-moisture');
  });

  it('supports a windbreak-swale note through the new sheltered runner pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      coastalScrubBiome,
      'beach-strawberry',
      ['beach-strawberry', 'song-sparrow'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('swale-shelter');
  });

  it('supports the new shore-pine underlayer note once low mats overlap pine cover', () => {
    const resolved = resolveEcosystemNoteForEntry(
      coastalScrubBiome,
      'kinnikinnick',
      ['kinnikinnick', 'shore-pine'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('pine-underlayer');
  });

  it('supports the new scrub transition note once sturdier shrub cover shows up', () => {
    const resolved = resolveEcosystemNoteForEntry(
      coastalScrubBiome,
      'pacific-wax-myrtle',
      ['dune-lupine', 'pacific-wax-myrtle', 'coyote-brush'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('sturdier-cover');
  });

  it('gives beach-pea a coastal-scrub note through the back-dune runner trio', () => {
    const resolved = resolveEcosystemNoteForEntry(
      coastalScrubBiome,
      'beach-pea',
      ['beach-pea', 'dune-lupine'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('runner-hold-start');
  });

  it('supports the new forest creekside note through the inland berry pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      forestBiome,
      'salmonberry',
      ['salmonberry', 'redwood-sorrel'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('creekside-shelter');
  });

  it('supports the new forest root-held shelter note once off-ground moisture clues overlap', () => {
    const resolved = resolveEcosystemNoteForEntry(
      forestBiome,
      'root-curtain',
      ['root-curtain', 'tree-lungwort'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('root-held-shelter');
  });

  it('keeps the old-wood link locked until the player reaches a true old-growth clue', () => {
    const locked = resolveEcosystemNoteForEntry(
      forestBiome,
      'fallen-giant-log',
      ['fallen-giant-log', 'seep-stone'],
    );
    const unlocked = resolveEcosystemNoteForEntry(
      forestBiome,
      'woodpecker-cavity',
      ['fallen-giant-log', 'seep-stone', 'woodpecker-cavity'],
    );

    expect(locked.state).toBe('locked');
    expect(locked.note).toBeNull();
    expect(unlocked.state).toBe('unlocked');
    expect(unlocked.note?.id).toBe('old-wood-link');
  });

  it('supports the new old-wood nursery note once a seedling and nurse log are both found', () => {
    const resolved = resolveEcosystemNoteForEntry(
      forestBiome,
      'western-hemlock-seedling',
      ['fallen-giant-log', 'western-hemlock-seedling'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('old-wood-nursery');
  });

  it('supports the refreshed old-growth bark note through the new hanging lichen pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      forestBiome,
      'old-mans-beard',
      ['old-mans-beard', 'tree-lungwort'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('old-growth-bark-life');
  });

  it('supports the new canopy garden note once branch moss overlaps old-growth life', () => {
    const resolved = resolveEcosystemNoteForEntry(
      forestBiome,
      'canopy-moss-bed',
      ['canopy-moss-bed', 'western-hemlock-seedling'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('forests-above');
  });

  it('supports the new forest floor note once bunchberry joins the old-growth understory pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      forestBiome,
      'bunchberry',
      ['bunchberry', 'redwood-sorrel'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('forest-floor-carpet');
  });

  it('supports the new seep-wall note once moss and seep carriers overlap', () => {
    const resolved = resolveEcosystemNoteForEntry(
      forestBiome,
      'seep-moss-mat',
      ['seep-moss-mat', 'seep-stone'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('seep-wall-garden');
  });

  it('supports the treeline shelter note through the new lee-pocket pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      treelineBiome,
      'frost-heave-boulder',
      ['frost-heave-boulder', 'hoary-marmot'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('stone-shelter');
  });

  it('supports the new treeline alpine-mat note through the fell bloom pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      treelineBiome,
      'mountain-avens',
      ['mountain-avens', 'moss-campion'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('fell-bloom-window');
  });

  it('supports the new treeline bridge note once low fell and bent trees overlap', () => {
    const resolved = resolveEcosystemNoteForEntry(
      treelineBiome,
      'mountain-avens',
      ['mountain-avens', 'krummholz-spruce', 'dwarf-birch'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('tree-line-drops');
  });

  it('supports the new treeline floor note once bunchberry reaches the broken canopy band', () => {
    const resolved = resolveEcosystemNoteForEntry(
      treelineBiome,
      'bunchberry',
      ['bunchberry', 'mountain-hemlock'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('broken-canopy-floor');
  });

  it('supports the new treeline heath note once berry shrubs and heaths overlap', () => {
    const resolved = resolveEcosystemNoteForEntry(
      treelineBiome,
      'lingonberry',
      ['lingonberry', 'bog-blueberry'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('heath-berry-mats');
  });

  it('supports the new treeline cold-ground note through the low shrub and lichen pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      treelineBiome,
      'dwarf-birch',
      ['dwarf-birch', 'reindeer-lichen'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('cold-ground-works');
  });

  it('supports the new treeline talus-islands note through the shelter-pocket pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      treelineBiome,
      'talus-cushion-pocket',
      ['talus-cushion-pocket', 'moss-campion'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('talus-islands');
  });

  it('supports the new tundra thaw-bloom note through the ridge flower pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      tundraBiome,
      'mountain-avens',
      ['mountain-avens', 'woolly-lousewort'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('brief-thaw-bloom');
  });

  it('supports the new tundra tussock note once meadow structure and animal cover overlap', () => {
    const resolved = resolveEcosystemNoteForEntry(
      tundraBiome,
      'bigelows-sedge',
      ['bigelows-sedge', 'northern-collared-lemming'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('tussock-ground');
  });

  it('supports the new tundra thaw-edge note through the willow and cottongrass pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      tundraBiome,
      'arctic-willow',
      ['arctic-willow', 'cottongrass'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('thaw-edge');
  });

  it('supports the new tundra exposed-ground note through the campion and lichen pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      tundraBiome,
      'moss-campion',
      ['moss-campion', 'reindeer-lichen'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('wind-cut-cushions');
  });

  it('supports the new tundra berry-mat note through the lingonberry and crowberry pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      tundraBiome,
      'lingonberry',
      ['lingonberry', 'crowberry'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('evergreen-berry-mats');
  });

  it('supports the new tundra between-tussocks note through the wet-channel pair', () => {
    const resolved = resolveEcosystemNoteForEntry(
      tundraBiome,
      'tussock-thaw-channel',
      ['tussock-thaw-channel', 'cottongrass'],
    );

    expect(resolved.state).toBe('unlocked');
    expect(resolved.note?.id).toBe('between-tussocks');
  });
});
