import { describe, expect, it } from 'vitest';
import { forestBiome } from '../content/biomes/forest';
import { generateBiomeInstance, validateBiomeDefinition } from '../engine/generation';
import { createNewSaveState } from '../engine/save';

describe('forest biome definition', () => {
  it('has valid spawn references and counts', () => {
    expect(() => validateBiomeDefinition(forestBiome)).not.toThrow();
  });

  it('provides complete fact data for every inspectable entry', () => {
    for (const entry of Object.values(forestBiome.entries)) {
      expect(entry.commonName.length).toBeGreaterThan(0);
      expect(entry.shortFact.length).toBeGreaterThan(0);
      expect(entry.journalText.length).toBeGreaterThan(0);
      expect(entry.spriteId.length).toBeGreaterThan(0);

      if (entry.category === 'landmark') {
        expect(entry.subtitle.length).toBeGreaterThan(0);
      } else {
        expect(entry.scientificName.length).toBeGreaterThan(0);
      }
    }
  });

  it('includes the new wildflower, shrub, understory bridge, amphibian, and woodpecker discoveries in live spawn tables', () => {
    const spawnEntryIds = new Set(
      forestBiome.spawnTables.flatMap((table) => table.entries.map((entry) => entry.entryId)),
    );

    expect(spawnEntryIds.has('western-trillium')).toBe(true);
    expect(spawnEntryIds.has('pileated-woodpecker')).toBe(true);
    expect(spawnEntryIds.has('salmonberry')).toBe(true);
    expect(spawnEntryIds.has('ensatina')).toBe(true);
    expect(spawnEntryIds.has('nootka-rose')).toBe(true);
    expect(spawnEntryIds.has('red-huckleberry')).toBe(true);
    expect(spawnEntryIds.has('bunchberry')).toBe(true);
  });
});

describe('forest biome generation', () => {
  it('keeps stable spawns fixed while visit spawns refresh', () => {
    const save = createNewSaveState('forest-seed');
    const firstVisit = generateBiomeInstance(forestBiome, save, 1);
    const secondVisit = generateBiomeInstance(forestBiome, save, 2);

    const stableFirst = firstVisit.entities
      .filter((entity) => entity.refreshPolicy === 'stable')
      .map((entity) => ({ entryId: entity.entryId, x: entity.x, y: entity.y }));
    const stableSecond = secondVisit.entities
      .filter((entity) => entity.refreshPolicy === 'stable')
      .map((entity) => ({ entryId: entity.entryId, x: entity.x, y: entity.y }));
    const visitFirst = firstVisit.entities
      .filter((entity) => entity.refreshPolicy === 'visit')
      .map((entity) => ({ entryId: entity.entryId, x: entity.x, y: entity.y }));
    const visitSecond = secondVisit.entities
      .filter((entity) => entity.refreshPolicy === 'visit')
      .map((entity) => ({ entryId: entity.entryId, x: entity.x, y: entity.y }));

    expect(stableFirst).toEqual(stableSecond);
    expect(visitFirst).not.toEqual(visitSecond);
  });

  it('adds a deeper root-hollow family with an upper lip, seep pocket, stone basin, and filtered return', () => {
    const save = createNewSaveState('forest-proof-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);

    const terrainAtFernHollow = instance.terrainSamples.find((sample) => sample.x === 272);
    const terrainAtRootHollow = instance.terrainSamples.find((sample) => sample.x === 320);
    const terrainAtSeepPocket = instance.terrainSamples.find((sample) => sample.x === 352);
    const terrainAtUnderBasin = instance.terrainSamples.find((sample) => sample.x === 368);
    const terrainAtStoneBasin = instance.terrainSamples.find((sample) => sample.x === 384);
    const terrainAtFilteredReturn = instance.terrainSamples.find((sample) => sample.x === 416);
    const terrainAtLogRun = instance.terrainSamples.find((sample) => sample.x === 448);
    const rootPlatforms = instance.platforms.filter((platform) => platform.id.startsWith('root-hollow'));
    const midLedge = rootPlatforms.find((platform) => platform.id === 'root-hollow-mid-ledge');
    const caveSill = rootPlatforms.find((platform) => platform.id === 'root-hollow-cave-sill');
    const basinSill = rootPlatforms.find((platform) => platform.id === 'root-hollow-basin-sill');
    const underBasinRest = rootPlatforms.find((platform) => platform.id === 'root-hollow-under-basin-rest');
    const highLedge = rootPlatforms.find((platform) => platform.id === 'root-hollow-high-ledge');
    const depthFeatures = instance.depthFeatures.map((feature) => ({
      id: feature.id,
      style: feature.style,
      y: feature.y,
      h: feature.h,
    }));
    const climbables = instance.climbables.map((climbable) => ({
      id: climbable.id,
      x: climbable.x,
      h: climbable.h,
      topExitY: climbable.topExitY,
    }));

    expect(terrainAtFernHollow).toBeDefined();
    expect(terrainAtRootHollow).toBeDefined();
    expect(terrainAtSeepPocket).toBeDefined();
    expect(terrainAtUnderBasin).toBeDefined();
    expect(terrainAtStoneBasin).toBeDefined();
    expect(terrainAtFilteredReturn).toBeDefined();
    expect(terrainAtLogRun).toBeDefined();
    expect(instance.height).toBe(336);
    expect((terrainAtRootHollow?.y ?? 0) - (terrainAtFernHollow?.y ?? 0)).toBeGreaterThanOrEqual(23);
    expect((terrainAtSeepPocket?.y ?? 0) - (terrainAtRootHollow?.y ?? 0)).toBeGreaterThanOrEqual(24);
    expect((terrainAtUnderBasin?.y ?? 0) - (terrainAtSeepPocket?.y ?? 0)).toBeGreaterThanOrEqual(22);
    expect((terrainAtUnderBasin?.y ?? 0) - (terrainAtStoneBasin?.y ?? 0)).toBeGreaterThanOrEqual(10);
    expect((terrainAtStoneBasin?.y ?? 0) - (terrainAtFilteredReturn?.y ?? 0)).toBeGreaterThanOrEqual(24);
    expect((terrainAtFilteredReturn?.y ?? 0) - (terrainAtLogRun?.y ?? 0)).toBeGreaterThanOrEqual(28);
    expect(rootPlatforms.map((platform) => platform.id)).toEqual([
      'root-hollow-entry-log',
      'root-hollow-mid-ledge',
      'root-hollow-cave-sill',
      'root-hollow-under-basin-rest',
      'root-hollow-return-nook',
      'root-hollow-basin-sill',
      'root-hollow-high-ledge',
      'root-hollow-exit-log',
    ]);
    expect(depthFeatures).toEqual(expect.arrayContaining([
      { id: 'root-hollow-root-arch', style: 'root-chamber', y: 64, h: 170 },
      { id: 'root-hollow-stone-basin', style: 'stone-pocket', y: 186, h: 66 },
      { id: 'root-hollow-under-basin-pocket', style: 'stone-pocket', y: 208, h: 40 },
      { id: 'root-hollow-filtered-pocket', style: 'root-chamber', y: 100, h: 104 },
    ]));
    expect(climbables).toEqual(expect.arrayContaining([
      { id: 'root-hollow-fir-trunk', x: 332, h: 108, topExitY: 98 },
      { id: 'root-hollow-cave-trunk', x: 404, h: 186, topExitY: 78 },
      { id: 'log-run-fir-trunk', x: 446, h: 74, topExitY: 96 },
    ]));
    expect(midLedge?.y).toBeLessThan(rootPlatforms[0]?.y ?? 0);
    expect(caveSill?.y).toBeGreaterThan(midLedge?.y ?? 0);
    expect(caveSill?.y).toBeLessThan(terrainAtSeepPocket?.y ?? 0);
    expect(basinSill?.y).toBeGreaterThan(caveSill?.y ?? 0);
    expect(basinSill?.y).toBeLessThan(terrainAtStoneBasin?.y ?? 0);
    expect(underBasinRest).toMatchObject({
      id: 'root-hollow-under-basin-rest',
      x: 358,
      y: 218,
      w: 20,
    });
    expect(underBasinRest?.y).toBeGreaterThan(basinSill?.y ?? 0);
    expect(underBasinRest?.y).toBeGreaterThan(terrainAtStoneBasin?.y ?? 0);
    expect(underBasinRest?.y).toBeLessThan(terrainAtUnderBasin?.y ?? 999);
    expect(highLedge?.y).toBeLessThan(midLedge?.y ?? 0);
  });

  it('adds a far-right old-growth pocket with a taller two-stage climb route', () => {
    const save = createNewSaveState('forest-old-growth-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);

    const terrainAtCreekBend = instance.terrainSamples.find((sample) => sample.x === 608);
    const terrainAtOldGrowthPocket = instance.terrainSamples.find((sample) => sample.x === 688);
    const terrainAtOldGrowthRise = instance.terrainSamples.find((sample) => sample.x === 784);
    const oldGrowthPlatforms = instance.platforms.filter((platform) => platform.id.startsWith('old-growth'));
    const oldGrowthDepthFeatures = instance.depthFeatures
      .filter((feature) => feature.id.startsWith('old-growth'))
      .map((feature) => ({
        id: feature.id,
        style: feature.style,
        y: feature.y,
        h: feature.h,
      }));
    const oldGrowthClimbables = instance.climbables
      .filter((climbable) => climbable.id.startsWith('old-growth'))
      .map((climbable) => ({
        id: climbable.id,
        x: climbable.x,
        w: climbable.w,
        topExitY: climbable.topExitY,
      }));

    expect(instance.width).toBe(800);
    expect(instance.height).toBe(336);
    expect(terrainAtCreekBend).toBeDefined();
    expect(terrainAtOldGrowthPocket).toBeDefined();
    expect(terrainAtOldGrowthRise).toBeDefined();
    expect((terrainAtOldGrowthPocket?.y ?? 0) - (terrainAtCreekBend?.y ?? 0)).toBeGreaterThanOrEqual(28);
    expect((terrainAtOldGrowthPocket?.y ?? 0) - (terrainAtOldGrowthRise?.y ?? 0)).toBeGreaterThanOrEqual(18);
    expect(oldGrowthPlatforms.map((platform) => platform.id)).toEqual([
      'old-growth-root-log',
      'old-growth-crown-rest',
      'old-growth-crossover-limb',
      'old-growth-trunk-foot-rest',
      'old-growth-bark-shelf',
      'old-growth-crown-window',
      'old-growth-high-perch',
      'old-growth-inner-bark-rest',
      'old-growth-inner-loop-step',
      'old-growth-branch-nursery',
      'old-growth-canopy-ledge',
    ]);
    expect(oldGrowthDepthFeatures).toEqual([
      { id: 'old-growth-canopy-pocket', style: 'canopy-pocket', y: 6, h: 112 },
      { id: 'old-growth-trunk-interior', style: 'trunk-interior', y: 56, h: 134 },
      { id: 'old-growth-trunk-foot-pocket', style: 'trunk-interior', y: 124, h: 58 },
    ]);
    expect(oldGrowthClimbables).toEqual([
      { id: 'old-growth-inner-bark-snag', x: 678, w: 8, topExitY: 18 },
      { id: 'old-growth-crown-snag', x: 680, w: 8, topExitY: 4 },
      { id: 'old-growth-main-trunk', x: 686, w: 24, topExitY: 108 },
      { id: 'old-growth-canopy-rung', x: 708, w: 8, topExitY: 26 },
      { id: 'old-growth-upper-snag', x: 736, w: 8, topExitY: 48 },
    ]);
  });

  it('authors one tiny cave-return cue, one hinge-return cue, and one canopy-rest cue for the new vertical spaces', () => {
    expect(forestBiome.verticalCues).toEqual([
      {
        id: 'stone-basin-return-light',
        style: 'recovery-light',
        x: 390,
        y: 92,
        zoneIds: ['seep-pocket', 'stone-basin', 'filtered-return'],
      },
      {
        id: 'old-wood-hinge-light',
        style: 'recovery-light',
        x: 654,
        y: 122,
        zoneIds: ['old-growth-pocket'],
      },
      {
        id: 'old-growth-inner-rest-light',
        style: 'canopy-opening',
        x: 724,
        y: 46,
        zoneIds: ['old-growth-pocket'],
      },
    ]);
  });

  it('adds one cave-mouth sill and one tucked canopy crook around the live waypoint cues', () => {
    const save = createNewSaveState('forest-waypoint-shelves-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);
    const highLedge = instance.platforms.find((platform) => platform.id === 'root-hollow-high-ledge');
    const caveMouthSill = instance.platforms.find((platform) => platform.id === 'filtered-return-mouth-sill');
    const exitLog = instance.platforms.find((platform) => platform.id === 'root-hollow-exit-log');
    const innerLoopStep = instance.platforms.find((platform) => platform.id === 'old-growth-inner-loop-step');
    const canopyCrook = instance.platforms.find((platform) => platform.id === 'canopy-inner-rest-crook');
    const canopyLedge = instance.platforms.find((platform) => platform.id === 'old-growth-canopy-ledge');
    const waypointEntities = instance.entities
      .filter(
        (entity) =>
          entity.entityId.includes('filtered-return-mouth-moss') || entity.entityId.includes('canopy-inner-rest-beard'),
      )
      .map((entity) => ({
        entryId: entity.entryId,
        x: entity.x,
        y: entity.y,
        castsShadow: entity.castsShadow ?? true,
      }));

    expect(caveMouthSill).toMatchObject({
      id: 'filtered-return-mouth-sill',
      x: 406,
      y: 104,
      w: 18,
    });
    expect(caveMouthSill?.x).toBeGreaterThanOrEqual(388);
    expect(caveMouthSill?.x).toBeLessThanOrEqual(428);
    expect(caveMouthSill?.y).toBeGreaterThan(highLedge?.y ?? 0);
    expect(caveMouthSill?.y).toBeLessThan(exitLog?.y ?? 999);

    expect(canopyCrook).toMatchObject({
      id: 'canopy-inner-rest-crook',
      x: 722,
      y: 50,
      w: 18,
    });
    expect(canopyCrook?.x).toBeGreaterThanOrEqual(708);
    expect(canopyCrook?.x).toBeLessThanOrEqual(746);
    expect(canopyCrook?.y).toBeGreaterThan(innerLoopStep?.y ?? 0);
    expect(canopyCrook?.y).toBeLessThan(canopyLedge?.y ?? 999);

    expect(waypointEntities).toEqual([
      { entryId: 'seep-moss-mat', x: 408, y: 104, castsShadow: false },
      { entryId: 'old-mans-beard', x: 740, y: 38, castsShadow: false },
    ]);
  });

  it('adds one inward branch-nursery pocket in the old-growth canopy band', () => {
    const save = createNewSaveState('forest-branch-nursery-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);
    const crownWindow = instance.platforms.find((platform) => platform.id === 'old-growth-crown-window');
    const branchNursery = instance.platforms.find((platform) => platform.id === 'old-growth-branch-nursery');
    const canopyCrook = instance.platforms.find((platform) => platform.id === 'canopy-inner-rest-crook');
    const nurserySupport = instance.entities
      .filter(
        (entity) =>
          entity.entityId === 'authored-old-growth-branch-hemlock-western-hemlock-seedling' ||
          entity.entityId === 'authored-old-growth-inner-rest-moss-canopy-moss-bed',
      )
      .map((entity) => ({
        entryId: entity.entryId,
        x: entity.x,
        y: entity.y,
      }));

    expect(branchNursery).toMatchObject({
      id: 'old-growth-branch-nursery',
      x: 712,
      y: 34,
      w: 30,
    });
    expect(branchNursery?.x).toBeGreaterThanOrEqual(692);
    expect(branchNursery?.x).toBeLessThanOrEqual(742);
    expect(branchNursery?.y).toBeGreaterThanOrEqual(24);
    expect(branchNursery?.y).toBeLessThanOrEqual(50);
    expect(branchNursery?.x).toBeGreaterThan(crownWindow?.x ?? 0);
    expect(branchNursery?.x).toBeLessThan(canopyCrook?.x ?? 999);
    expect(branchNursery?.y).toBeGreaterThan(crownWindow?.y ?? 0);
    expect(branchNursery?.y).toBeLessThan(canopyCrook?.y ?? 999);

    expect(nurserySupport).toEqual([
      { entryId: 'western-hemlock-seedling', x: 726, y: 24 },
      { entryId: 'canopy-moss-bed', x: 734, y: 44 },
    ]);
  });

  it('adds one optional old-wood hinge bay between creek-bend and the old-growth pocket', () => {
    const save = createNewSaveState('forest-bridge-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);

    const terrainAtCreekBend = instance.terrainSamples.find((sample) => sample.x === 592);
    const terrainAtBridgeDrop = instance.terrainSamples.find((sample) => sample.x === 624);
    const crossoverPlatforms = instance.platforms
      .filter(
        (platform) =>
          platform.id.startsWith('forest-layer-bridge') || platform.id === 'old-wood-hinge-rest',
      )
      .map((platform) => ({
        id: platform.id,
        x: platform.x,
        y: platform.y,
        w: platform.w,
      }));
    const crossoverEntities = instance.entities
      .filter(
        (entity) =>
          entity.entityId.startsWith('authored-forest-layer-bridge') ||
          entity.entityId.startsWith('authored-old-wood-hinge-lungwort'),
      )
      .map((entity) => ({
        entryId: entity.entryId,
        x: entity.x,
        y: entity.y,
        castsShadow: entity.castsShadow ?? true,
      }));
    const bridgeNote = forestBiome.ecosystemNotes.find((note) => note.id === 'old-wood-link');

    expect(terrainAtCreekBend).toBeDefined();
    expect(terrainAtBridgeDrop).toBeDefined();
    expect(crossoverPlatforms).toEqual([
      { id: 'forest-layer-bridge-log', x: 580, y: 98, w: 36 },
      { id: 'forest-layer-bridge-span', x: 614, y: 106, w: 38 },
      { id: 'old-wood-hinge-rest', x: 632, y: 130, w: 24 },
    ]);
    expect(crossoverPlatforms[0]?.y).toBeLessThan((terrainAtCreekBend?.y ?? 0) - 8);
    expect(crossoverPlatforms[1]?.y).toBeLessThan((terrainAtBridgeDrop?.y ?? 0) - 30);
    expect(crossoverPlatforms[2]?.y).toBeGreaterThan(crossoverPlatforms[1]?.y ?? 0);
    expect(crossoverPlatforms[2]?.y).toBeLessThan((terrainAtBridgeDrop?.y ?? 0) - 4);
    expect(crossoverEntities).toEqual([
      { entryId: 'fallen-giant-log', x: 606, y: 100, castsShadow: true },
      { entryId: 'tree-lungwort', x: 632, y: 104, castsShadow: false },
      { entryId: 'tree-lungwort', x: 644, y: 126, castsShadow: false },
    ]);
    expect(bridgeNote).toMatchObject({
      title: 'Old Wood Link',
      minimumDiscoveries: 3,
      zoneId: 'creek-bend',
      entryIds: ['fallen-giant-log', 'seep-stone', 'woodpecker-cavity'],
    });
  });

  it('adds a layered forest traversal spread from fern shade to creek cover and the giant-tree foot', () => {
    const save = createNewSaveState('forest-layered-route-spread-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);
    const layeredPlatformIds = [
      'fern-shade-root-lip',
      'fern-shade-moss-log',
      'creek-cool-root-lip',
      'creek-cool-berry-rest',
      'giant-floor-seed-log',
      'giant-floor-cavity-rest',
    ];
    const layeredPlatforms = instance.platforms
      .filter((platform) => layeredPlatformIds.includes(platform.id))
      .map((platform) => ({
        id: platform.id,
        x: platform.x,
        y: platform.y,
        w: platform.w,
      }));
    const layeredCarriers = instance.entities
      .filter(
        (entity) =>
          entity.entityId.startsWith('authored-fern-shade') ||
          entity.entityId.startsWith('authored-creek-cool') ||
          entity.entityId.startsWith('authored-giant-floor'),
      )
      .map((entity) => ({
        entryId: entity.entryId,
        x: entity.x,
        y: entity.y,
        castsShadow: entity.castsShadow ?? true,
      }));

    expect(layeredPlatforms).toEqual([
      { id: 'fern-shade-root-lip', x: 174, y: 112, w: 20 },
      { id: 'fern-shade-moss-log', x: 204, y: 106, w: 24 },
      { id: 'creek-cool-root-lip', x: 532, y: 112, w: 18 },
      { id: 'creek-cool-berry-rest', x: 558, y: 108, w: 22 },
      { id: 'giant-floor-seed-log', x: 712, y: 158, w: 22 },
      { id: 'giant-floor-cavity-rest', x: 740, y: 150, w: 20 },
    ]);
    expect(layeredPlatforms[1]?.y).toBeLessThan(layeredPlatforms[0]?.y ?? 0);
    expect(layeredPlatforms[3]?.y).toBeLessThan(layeredPlatforms[2]?.y ?? 0);
    expect(layeredPlatforms[5]?.y).toBeLessThan(layeredPlatforms[4]?.y ?? 0);
    expect(layeredCarriers).toEqual([
      { entryId: 'western-trillium', x: 178, y: 104, castsShadow: true },
      { entryId: 'sword-fern', x: 204, y: 102, castsShadow: true },
      { entryId: 'redwood-sorrel', x: 222, y: 108, castsShadow: true },
      { entryId: 'steller-jay', x: 242, y: 102, castsShadow: true },
      { entryId: 'salmonberry', x: 536, y: 108, castsShadow: true },
      { entryId: 'sword-fern', x: 556, y: 108, castsShadow: true },
      { entryId: 'banana-slug', x: 574, y: 112, castsShadow: true },
      { entryId: 'redwood-sorrel', x: 592, y: 106, castsShadow: true },
      { entryId: 'western-hemlock-seedling', x: 716, y: 146, castsShadow: true },
      { entryId: 'red-huckleberry', x: 730, y: 156, castsShadow: true },
      { entryId: 'woodpecker-cavity', x: 746, y: 140, castsShadow: false },
      { entryId: 'licorice-fern', x: 758, y: 132, castsShadow: false },
    ]);
  });

  it('adds a creek-bend forest-release memory pocket after the cool root lip', () => {
    const save = createNewSaveState('forest-source-memory-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);
    const creekRest = instance.platforms.find((platform) => platform.id === 'creek-cool-berry-rest');
    const bridgeLog = instance.platforms.find((platform) => platform.id === 'forest-layer-bridge-log');
    const memoryPlatforms = instance.platforms
      .filter((platform) => platform.id.startsWith('source-memory-'))
      .map((platform) => ({
        id: platform.id,
        x: platform.x,
        y: platform.y,
        w: platform.w,
      }));
    const memoryCarriers = instance.entities
      .filter((entity) => entity.entityId.startsWith('authored-source-memory-'))
      .map((entity) => ({
        entryId: entity.entryId,
        x: entity.x,
        y: entity.y,
        castsShadow: entity.castsShadow ?? true,
      }));

    expect(memoryPlatforms).toEqual([
      { id: 'source-memory-release-root', x: 586, y: 114, w: 18 },
      { id: 'source-memory-release-log', x: 606, y: 110, w: 24 },
    ]);
    expect(memoryPlatforms[0]?.x).toBeGreaterThan((creekRest?.x ?? 0) + (creekRest?.w ?? 0));
    expect(memoryPlatforms[1]?.x).toBeGreaterThan(memoryPlatforms[0]?.x ?? 0);
    expect(memoryPlatforms[1]?.x).toBeLessThanOrEqual((bridgeLog?.x ?? 0) + (bridgeLog?.w ?? 0));
    expect(memoryPlatforms[1]?.y).toBeLessThan(memoryPlatforms[0]?.y ?? 0);
    expect(memoryCarriers).toEqual([
      { entryId: 'seep-moss-mat', x: 590, y: 112, castsShadow: false },
      { entryId: 'root-curtain', x: 610, y: 116, castsShadow: false },
      { entryId: 'banana-slug', x: 622, y: 118, castsShadow: true },
    ]);
  });

  it('authors a bunchberry patch into the late forest floor near the old-growth approach', () => {
    const authoredBunchberry = forestBiome.terrainRules.authoredEntities?.filter((entity) => entity.entryId === 'bunchberry');

    expect(authoredBunchberry).toEqual([
      {
        id: 'old-growth-bunchberry-floor',
        entryId: 'bunchberry',
        x: 650,
        y: 162,
      },
    ]);
  });

  it('authors one high-run carry from the cave-return side into the bridge family', () => {
    const save = createNewSaveState('forest-high-run-carry-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);

    const terrainAtLogRun = instance.terrainSamples.find((sample) => sample.x === 480);
    const terrainAtCreekBend = instance.terrainSamples.find((sample) => sample.x === 544);
    const carryPlatforms = instance.platforms
      .filter((platform) =>
        [
          'log-run-high-run-log',
          'creek-bend-high-run-log',
          'forest-layer-bridge-log',
          'forest-layer-bridge-span',
          'old-growth-crossover-limb',
        ].includes(platform.id),
      )
      .map((platform) => ({
        id: platform.id,
        x: platform.x,
        y: platform.y,
        w: platform.w,
      }));
    const logRunTrunk = instance.climbables.find((climbable) => climbable.id === 'log-run-fir-trunk');

    expect(terrainAtLogRun).toBeDefined();
    expect(terrainAtCreekBend).toBeDefined();
    expect(carryPlatforms).toEqual([
      { id: 'log-run-high-run-log', x: 444, y: 100, w: 68 },
      { id: 'creek-bend-high-run-log', x: 514, y: 98, w: 62 },
      { id: 'forest-layer-bridge-log', x: 580, y: 98, w: 36 },
      { id: 'forest-layer-bridge-span', x: 614, y: 106, w: 38 },
      { id: 'old-growth-crossover-limb', x: 650, y: 106, w: 36 },
    ]);
    expect(logRunTrunk).toBeDefined();
    expect((carryPlatforms[0]?.x ?? 999) - ((logRunTrunk?.x ?? 0) + (logRunTrunk?.w ?? 0))).toBeLessThanOrEqual(
      0,
    );
    expect(carryPlatforms[0]?.y).toBeLessThan((terrainAtLogRun?.y ?? 999) - 10);
    expect(carryPlatforms[1]?.y).toBeLessThanOrEqual(carryPlatforms[0]?.y ?? 999);
    expect(carryPlatforms[1]?.y).toBeLessThan((terrainAtCreekBend?.y ?? 999) - 14);
    expect((carryPlatforms[1]?.x ?? 0) + (carryPlatforms[1]?.w ?? 0)).toBeGreaterThanOrEqual(
      (carryPlatforms[2]?.x ?? 0) - 8,
    );
  });

  it('spawns moisture life and a landmark inside the deeper seep pocket', () => {
    const save = createNewSaveState('forest-root-hollow-life-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);
    const rootHollowLife = instance.entities.filter(
      (entity) =>
        entity.x >= 344 &&
        entity.x <= 432 &&
        ['banana-slug', 'sword-fern', 'redwood-sorrel', 'seep-stone'].includes(entity.entryId),
    );

    expect(rootHollowLife.length).toBeGreaterThanOrEqual(3);
    expect(rootHollowLife.some((entity) => entity.entryId === 'seep-stone')).toBe(true);
  });

  it('keeps the forest moisture-shelter physical memory chain readable from lower pocket to log run', () => {
    const save = createNewSaveState('forest-tactile-chain-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);
    const platformById = new Map(instance.platforms.map((platform) => [platform.id, platform]));
    const depthFeatureById = new Map(instance.depthFeatures.map((feature) => [feature.id, feature]));
    const climbableById = new Map(instance.climbables.map((climbable) => [climbable.id, climbable]));
    const entityById = new Map(instance.entities.map((entity) => [entity.entityId, entity]));

    const lowerRest = platformById.get('root-hollow-under-basin-rest');
    const filteredMouth = platformById.get('filtered-return-mouth-sill');
    const exitLog = platformById.get('root-hollow-exit-log');
    const highRun = platformById.get('log-run-high-run-log');
    const logRunTrunk = climbableById.get('log-run-fir-trunk');

    expect(lowerRest).toMatchObject({ id: 'root-hollow-under-basin-rest', x: 358, y: 218, w: 20 });
    expect(depthFeatureById.get('root-hollow-under-basin-pocket')).toMatchObject({
      id: 'root-hollow-under-basin-pocket',
      style: 'stone-pocket',
      x: 356,
      y: 208,
      w: 32,
      h: 40,
    });
    expect(filteredMouth).toMatchObject({ id: 'filtered-return-mouth-sill', x: 406, y: 104, w: 18 });
    expect(exitLog).toMatchObject({ id: 'root-hollow-exit-log', x: 430, y: 116, w: 24 });
    expect(highRun).toMatchObject({ id: 'log-run-high-run-log', x: 444, y: 100, w: 68 });
    expect(logRunTrunk).toMatchObject({
      id: 'log-run-fir-trunk',
      x: 446,
      y: 56,
      h: 74,
      topExitY: 96,
    });

    expect(lowerRest?.y).toBeGreaterThan(filteredMouth?.y ?? 0);
    expect(filteredMouth?.x).toBeGreaterThan(lowerRest?.x ?? 0);
    expect(filteredMouth?.y).toBeLessThan(exitLog?.y ?? 999);
    expect(highRun?.x).toBeGreaterThanOrEqual(exitLog?.x ?? 0);
    expect(highRun?.y).toBeLessThan(exitLog?.y ?? 999);
    expect(logRunTrunk?.x).toBeGreaterThanOrEqual(highRun?.x ?? 0);
    expect(logRunTrunk?.x).toBeLessThanOrEqual((highRun?.x ?? 0) + (highRun?.w ?? 0));

    expect([
      'authored-root-hollow-basin-ensatina-ensatina',
      'authored-root-hollow-basin-slug-banana-slug',
      'authored-root-hollow-under-basin-moss-seep-moss-mat',
      'authored-filtered-return-root-curtain-root-curtain',
      'authored-filtered-return-seep-moss-seep-moss-mat',
      'authored-filtered-return-mouth-moss-seep-moss-mat',
      'authored-log-run-licorice-trunk-licorice-fern',
    ].map((id) => {
      const entity = entityById.get(id);

      return {
        entityId: entity?.entityId,
        entryId: entity?.entryId,
        x: entity?.x,
        y: entity?.y,
        castsShadow: entity?.castsShadow ?? true,
      };
    })).toEqual([
      {
        entityId: 'authored-root-hollow-basin-ensatina-ensatina',
        entryId: 'ensatina',
        x: 380,
        y: 220,
        castsShadow: true,
      },
      {
        entityId: 'authored-root-hollow-basin-slug-banana-slug',
        entryId: 'banana-slug',
        x: 394,
        y: 218,
        castsShadow: true,
      },
      {
        entityId: 'authored-root-hollow-under-basin-moss-seep-moss-mat',
        entryId: 'seep-moss-mat',
        x: 374,
        y: 194,
        castsShadow: false,
      },
      {
        entityId: 'authored-filtered-return-root-curtain-root-curtain',
        entryId: 'root-curtain',
        x: 414,
        y: 124,
        castsShadow: false,
      },
      {
        entityId: 'authored-filtered-return-seep-moss-seep-moss-mat',
        entryId: 'seep-moss-mat',
        x: 394,
        y: 136,
        castsShadow: false,
      },
      {
        entityId: 'authored-filtered-return-mouth-moss-seep-moss-mat',
        entryId: 'seep-moss-mat',
        x: 408,
        y: 104,
        castsShadow: false,
      },
      {
        entityId: 'authored-log-run-licorice-trunk-licorice-fern',
        entryId: 'licorice-fern',
        x: 438,
        y: 90,
        castsShadow: false,
      },
    ]);
  });

  it('authors niche species onto trunks, ledges, and the damp cave shelf', () => {
    const save = createNewSaveState('forest-niche-species-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);
    const authoredNiches = instance.entities
      .filter((entity) => entity.entityId.startsWith('authored-'))
      .map((entity) => ({
        entryId: entity.entryId,
        x: entity.x,
        y: entity.y,
        castsShadow: entity.castsShadow ?? true,
      }));

    expect(authoredNiches).toEqual(expect.arrayContaining([
      { entryId: 'licorice-fern', x: 324, y: 118, castsShadow: false },
      { entryId: 'tree-lungwort', x: 350, y: 148, castsShadow: false },
      { entryId: 'seep-stone', x: 356, y: 172, castsShadow: true },
      { entryId: 'tree-lungwort', x: 366, y: 210, castsShadow: false },
      { entryId: 'seep-moss-mat', x: 374, y: 194, castsShadow: false },
      { entryId: 'tree-lungwort', x: 380, y: 88, castsShadow: false },
      { entryId: 'ensatina', x: 380, y: 220, castsShadow: true },
      { entryId: 'tree-lungwort', x: 384, y: 100, castsShadow: false },
      { entryId: 'seep-moss-mat', x: 394, y: 136, castsShadow: false },
      { entryId: 'banana-slug', x: 394, y: 218, castsShadow: true },
      { entryId: 'redwood-sorrel', x: 402, y: 150, castsShadow: true },
      { entryId: 'root-curtain', x: 414, y: 124, castsShadow: false },
      { entryId: 'licorice-fern', x: 410, y: 76, castsShadow: true },
      { entryId: 'licorice-fern', x: 438, y: 90, castsShadow: false },
    ]));
  });

  it('authors old-growth bark-life carriers into the far-right pocket', () => {
    const save = createNewSaveState('forest-old-growth-niches-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);
    const oldGrowthNiches = instance.entities
      .filter((entity) => entity.entityId.startsWith('authored-old-growth'))
      .map((entity) => ({
        entryId: entity.entryId,
        x: entity.x,
        y: entity.y,
        castsShadow: entity.castsShadow ?? true,
      }));

    expect(oldGrowthNiches).toEqual([
      { entryId: 'western-hemlock-seedling', x: 620, y: 88, castsShadow: true },
      { entryId: 'redwood-sorrel', x: 640, y: 164, castsShadow: true },
      { entryId: 'bunchberry', x: 650, y: 162, castsShadow: true },
      { entryId: 'red-huckleberry', x: 656, y: 152, castsShadow: true },
      { entryId: 'tree-lungwort', x: 660, y: 10, castsShadow: false },
      { entryId: 'tree-lungwort', x: 666, y: 24, castsShadow: false },
      { entryId: 'old-mans-beard', x: 672, y: 14, castsShadow: false },
      { entryId: 'western-hemlock-seedling', x: 674, y: 136, castsShadow: true },
      { entryId: 'canopy-moss-bed', x: 680, y: 22, castsShadow: false },
      { entryId: 'licorice-fern', x: 694, y: 106, castsShadow: false },
      { entryId: 'licorice-fern', x: 700, y: 30, castsShadow: false },
      { entryId: 'woodpecker-cavity', x: 702, y: 132, castsShadow: false },
      { entryId: 'tree-lungwort', x: 724, y: 54, castsShadow: false },
      { entryId: 'western-hemlock-seedling', x: 726, y: 24, castsShadow: true },
      { entryId: 'canopy-moss-bed', x: 734, y: 44, castsShadow: false },
      { entryId: 'western-hemlock-seedling', x: 736, y: 108, castsShadow: true },
      { entryId: 'tree-lungwort', x: 748, y: 74, castsShadow: false },
      { entryId: 'old-mans-beard', x: 754, y: 46, castsShadow: false },
      { entryId: 'pileated-woodpecker', x: 764, y: 64, castsShadow: true },
    ]);
  });

  it('adds canopy and seep notes while keeping the refreshed old-growth note set', () => {
    const nurseryNote = forestBiome.ecosystemNotes.find((note) => note.id === 'old-wood-nursery');
    const barkNote = forestBiome.ecosystemNotes.find((note) => note.id === 'old-growth-bark-life');
    const canopyNote = forestBiome.ecosystemNotes.find((note) => note.id === 'forests-above');
    const seepNote = forestBiome.ecosystemNotes.find((note) => note.id === 'seep-wall-garden');
    const layeredNote = forestBiome.ecosystemNotes.find((note) => note.id === 'layered-forest-path');

    expect(nurseryNote).toMatchObject({
      title: 'Old-Wood Nursery',
      minimumDiscoveries: 2,
      entryIds: ['fallen-giant-log', 'western-hemlock-seedling'],
    });
    expect(barkNote).toMatchObject({
      title: 'Hanging Bark Life',
      minimumDiscoveries: 2,
      entryIds: ['old-mans-beard', 'tree-lungwort', 'woodpecker-cavity'],
      zoneId: 'old-growth-pocket',
    });
    expect(canopyNote).toMatchObject({
      title: 'Forests Above',
      minimumDiscoveries: 2,
      entryIds: ['canopy-moss-bed', 'old-mans-beard', 'western-hemlock-seedling'],
      zoneId: 'old-growth-pocket',
    });
    expect(seepNote).toMatchObject({
      title: 'Seep Wall Garden',
      minimumDiscoveries: 2,
      entryIds: ['seep-moss-mat', 'seep-stone', 'tree-lungwort'],
      zoneId: 'stone-basin',
    });
    expect(layeredNote).toMatchObject({
      title: 'Layered Forest Path',
      minimumDiscoveries: 2,
      entryIds: ['western-trillium', 'salmonberry', 'western-hemlock-seedling'],
      zoneId: 'creek-bend',
    });
  });

  it('adds a richer berry and thorny edge to the first forest half', () => {
    const save = createNewSaveState('forest-edge-thicket-seed');
    const instance = generateBiomeInstance(forestBiome, save, 1);
    const earlyForest = instance.entities.filter(
      (entity) =>
        entity.x <= 280 && ['nootka-rose', 'red-huckleberry', 'salmonberry'].includes(entity.entryId),
    );

    expect(earlyForest.some((entity) => entity.entryId === 'nootka-rose')).toBe(true);
    expect(earlyForest.some((entity) => entity.entryId === 'red-huckleberry')).toBe(true);
  });
});
