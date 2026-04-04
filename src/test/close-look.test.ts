import { describe, expect, it } from 'vitest';

import { beachBiome, coastalScrubBiome, forestBiome, treelineBiome, tundraBiome } from '../content/biomes';
import { buildCloseLookPayload, supportsCloseLook } from '../engine/close-look';

describe('close-look helpers', () => {
  it('only supports the small allowlisted entry set', () => {
    expect(supportsCloseLook('sand-dollar-test')).toBe(true);
    expect(supportsCloseLook('moon-snail-shell')).toBe(true);
    expect(supportsCloseLook('fir-cone')).toBe(true);
    expect(supportsCloseLook('reindeer-lichen')).toBe(true);
    expect(supportsCloseLook('purple-saxifrage')).toBe(true);
    expect(supportsCloseLook('lingonberry')).toBe(true);
    expect(supportsCloseLook('frost-heave-boulder')).toBe(true);
    expect(supportsCloseLook('talus-cushion-pocket')).toBe(true);
    expect(supportsCloseLook('cottongrass')).toBe(true);
    expect(supportsCloseLook('nootka-rose')).toBe(true);
    expect(supportsCloseLook('kinnikinnick')).toBe(true);
    expect(supportsCloseLook('nurse-log')).toBe(true);
    expect(supportsCloseLook('pacific-wax-myrtle')).toBe(true);
    expect(supportsCloseLook('canopy-moss-bed')).toBe(true);
    expect(supportsCloseLook('seep-moss-mat')).toBe(true);
    expect(supportsCloseLook('tree-lungwort')).toBe(true);
    expect(supportsCloseLook('old-mans-beard')).toBe(true);
    expect(supportsCloseLook('woodpecker-cavity')).toBe(true);
    expect(supportsCloseLook('beach-grass')).toBe(false);
    expect(supportsCloseLook('shore-pine')).toBe(false);
    expect(supportsCloseLook(null)).toBe(false);
  });

  it('builds a compact payload for supported entries only', () => {
    const sandDollarPayload = buildCloseLookPayload(beachBiome.entries['sand-dollar-test']);
    expect(sandDollarPayload).toMatchObject({
      entryId: 'sand-dollar-test',
      title: 'Pacific Sand Dollar Test',
      spriteId: 'sand-dollar-test',
    });
    expect(sandDollarPayload?.callouts).toContain('star pattern');

    const shellPayload = buildCloseLookPayload(beachBiome.entries['moon-snail-shell']);
    expect(shellPayload).toMatchObject({
      entryId: 'moon-snail-shell',
      title: "Lewis' Moon Snail Shell",
      spriteId: 'moon-snail-shell',
    });
    expect(shellPayload?.callouts).toHaveLength(2);

    const unsupportedPayload = buildCloseLookPayload(beachBiome.entries['beach-grass']);
    expect(unsupportedPayload).toBeNull();

    const conePayload = buildCloseLookPayload(forestBiome.entries['fir-cone']);
    expect(conePayload?.callouts).toContain('cone scales');

    const lingonberryPayload = buildCloseLookPayload(treelineBiome.entries.lingonberry);
    expect(lingonberryPayload).toMatchObject({
      entryId: 'lingonberry',
      title: 'Lingonberry',
      spriteId: 'lingonberry',
    });
    expect(lingonberryPayload?.callouts).toContain('evergreen leaves');

    const boulderPayload = buildCloseLookPayload(treelineBiome.entries['frost-heave-boulder']);
    expect(boulderPayload).toMatchObject({
      entryId: 'frost-heave-boulder',
      title: 'Frost-Heave Boulder',
      spriteId: 'frost-heave-boulder',
    });
    expect(boulderPayload?.callouts).toContain('cold-worked ground');

    const talusPayload = buildCloseLookPayload(treelineBiome.entries['talus-cushion-pocket']);
    expect(talusPayload).toMatchObject({
      entryId: 'talus-cushion-pocket',
      title: 'Talus Cushion Pocket',
      spriteId: 'talus-cushion-pocket',
    });
    expect(talusPayload?.callouts).toContain('stone gap');

    const cottongrassPayload = buildCloseLookPayload(tundraBiome.entries.cottongrass);
    expect(cottongrassPayload).toMatchObject({
      entryId: 'cottongrass',
      title: 'Cottongrass',
      spriteId: 'cottongrass',
    });
    expect(cottongrassPayload?.callouts).toContain('white tuft');

    const rosePayload = buildCloseLookPayload(coastalScrubBiome.entries['nootka-rose']);
    expect(rosePayload).toMatchObject({
      entryId: 'nootka-rose',
      title: 'Nootka Rose',
      spriteId: 'nootka-rose',
    });
    expect(rosePayload?.callouts).toContain('thorny stem');

    const kinnikinnickPayload = buildCloseLookPayload(coastalScrubBiome.entries.kinnikinnick);
    expect(kinnikinnickPayload).toMatchObject({
      entryId: 'kinnikinnick',
      title: 'Kinnikinnick',
      spriteId: 'kinnikinnick',
    });
    expect(kinnikinnickPayload?.callouts).toContain('evergreen leaves');

    const nurseLogPayload = buildCloseLookPayload(coastalScrubBiome.entries['nurse-log']);
    expect(nurseLogPayload).toMatchObject({
      entryId: 'nurse-log',
      title: 'Nurse Log',
      spriteId: 'nurse-log',
    });
    expect(nurseLogPayload?.callouts).toContain('soft old wood');

    const waxMyrtlePayload = buildCloseLookPayload(coastalScrubBiome.entries['pacific-wax-myrtle']);
    expect(waxMyrtlePayload).toMatchObject({
      entryId: 'pacific-wax-myrtle',
      title: 'Pacific Wax Myrtle',
      spriteId: 'pacific-wax-myrtle',
    });
    expect(waxMyrtlePayload?.callouts).toContain('waxy berries');

    const canopyMossPayload = buildCloseLookPayload(forestBiome.entries['canopy-moss-bed']);
    expect(canopyMossPayload).toMatchObject({
      entryId: 'canopy-moss-bed',
      title: 'Canopy Moss Bed',
      spriteId: 'canopy-moss-bed',
    });
    expect(canopyMossPayload?.callouts).toContain('soft moss bed');

    const seepMossPayload = buildCloseLookPayload(forestBiome.entries['seep-moss-mat']);
    expect(seepMossPayload).toMatchObject({
      entryId: 'seep-moss-mat',
      title: 'Seep Moss Mat',
      spriteId: 'seep-moss-mat',
    });
    expect(seepMossPayload?.callouts).toContain('wet stone grip');

    const treeLungwortPayload = buildCloseLookPayload(forestBiome.entries['tree-lungwort']);
    expect(treeLungwortPayload).toMatchObject({
      entryId: 'tree-lungwort',
      title: 'Tree Lungwort',
      spriteId: 'tree-lungwort',
    });
    expect(treeLungwortPayload?.callouts).toContain('leafy lobes');

    const beardPayload = buildCloseLookPayload(forestBiome.entries['old-mans-beard']);
    expect(beardPayload).toMatchObject({
      entryId: 'old-mans-beard',
      title: "Old-Man's-Beard Lichen",
      spriteId: 'old-mans-beard',
    });
    expect(beardPayload?.callouts).toContain('hanging strands');

    const cavityPayload = buildCloseLookPayload(forestBiome.entries['woodpecker-cavity']);
    expect(cavityPayload).toMatchObject({
      entryId: 'woodpecker-cavity',
      title: 'Woodpecker Cavity',
      spriteId: 'woodpecker-cavity',
    });
    expect(cavityPayload?.callouts).toContain('carved opening');
  });
});
