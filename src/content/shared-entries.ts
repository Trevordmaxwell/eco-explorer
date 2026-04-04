import type { InspectableEntry } from '../engine/types';

// Shared coastal edge species used by both the beach and the coastal scrub ecotone.
export const beachGrassEntry = {
  id: 'beach-grass',
  commonName: 'American Dunegrass',
  scientificName: 'Leymus mollis',
  category: 'plant',
  shortFact: 'American dunegrass roots help hold coastal dunes in place when wind blows.',
  journalText:
    'American dunegrass is a native foredune plant on Pacific coasts. Its roots trap sand and help build and hold the dunes that shelter other beach life.',
  sketchbookNote: 'Tough grass holding the first bright dune ridge.',
  spriteId: 'beach-grass',
  collectible: false,
} satisfies InspectableEntry;

export const seaRocketEntry = {
  id: 'sea-rocket',
  commonName: 'Sea Rocket',
  scientificName: 'Cakile edentula',
  category: 'plant',
  shortFact: 'On Pacific beaches, sea rocket is an introduced plant that still handles salty sand well.',
  journalText:
    'Sea rocket is a tough beach plant with thick leaves, but on Pacific coasts it arrived from another region. Native dune plants like dunegrass and sand verbena do more of the long-term dune building here.',
  sketchbookNote: 'Thick leaves braving the raw salt-front edge.',
  spriteId: 'sea-rocket',
  collectible: false,
} satisfies InspectableEntry;

export const sandVerbenaEntry = {
  id: 'sand-verbena',
  commonName: 'Yellow Sand Verbena',
  scientificName: 'Abronia latifolia',
  category: 'plant',
  shortFact: 'Yellow sand verbena spreads low over Pacific dunes where wind and salt are strong.',
  journalText:
    'Yellow sand verbena is a native Pacific beach plant with thick leaves and bright flowers. Its low stems help it handle sunny, shifting dunes near the shore.',
  sketchbookNote: 'Low bloom on bright shifting dunes.',
  spriteId: 'sand-verbena',
  collectible: false,
} satisfies InspectableEntry;

export const beachPeaEntry = {
  id: 'beach-pea',
  commonName: 'Silky Beach Pea',
  scientificName: 'Lathyrus littoralis',
  category: 'plant',
  shortFact: 'Silky beach pea creeps low across dunes and helps open sand start holding more cover.',
  journalText:
    'Silky beach pea is a native Pacific dune plant with low stems, tendrils, and purple flowers. It grows with other foredune plants where sand still moves but shelter is starting to build.',
  sketchbookNote: 'Low vine stitching bright dunes into steadier ground.',
  spriteId: 'beach-pea',
  collectible: false,
} satisfies InspectableEntry;

export const duneLupineEntry = {
  id: 'dune-lupine',
  commonName: 'Seashore Lupine',
  scientificName: 'Lupinus littoralis',
  category: 'plant',
  shortFact: 'Seashore lupine can grow in poor sand where wind and salt make life hard.',
  journalText:
    'Seashore lupine is one of the native flowers that brightens Pacific dunes. Pioneer plants like this help prepare harsh coastal ground for later shrubs.',
  sketchbookNote: 'Soft purple bloom where open sand starts to hold.',
  spriteId: 'dune-lupine',
  collectible: false,
} satisfies InspectableEntry;

export const beachStrawberryEntry = {
  id: 'beach-strawberry',
  commonName: 'Beach Strawberry',
  scientificName: 'Fragaria chiloensis',
  category: 'plant',
  shortFact: 'Beach strawberry spreads with runners, sending new plants across sandy ground.',
  journalText:
    'Beach strawberry is a low coastal plant with runners that creep outward and start new plants. Its fruits feed animals along dunes and scrub edges.',
  sketchbookNote: 'Low berries threading the calmer sand pocket.',
  spriteId: 'beach-strawberry',
  collectible: true,
} satisfies InspectableEntry;

export const swordFernEntry = {
  id: 'sword-fern',
  commonName: 'Sword Fern',
  scientificName: 'Polystichum munitum',
  category: 'plant',
  shortFact: 'Sword ferns stay green through cool, damp seasons on the forest floor.',
  journalText:
    'Sword ferns grow in shady places where the soil stays moist. Their long fronds help cover the ground and shelter tiny animals.',
  sketchbookNote: 'Cool fronds marking where shade and moisture begin.',
  spriteId: 'sword-fern',
  collectible: false,
} satisfies InspectableEntry;

export const bunchberryEntry = {
  id: 'bunchberry',
  commonName: 'Bunchberry',
  scientificName: 'Cornus unalaschkensis',
  category: 'plant',
  shortFact: 'Bunchberry stays low on cool forest and mountain ground where calmer air hugs the soil.',
  journalText:
    'Bunchberry is a low dogwood of cool northern and mountain forests. It can grow beneath shady conifers and keep going where the canopy starts to thin, because it stays close to the ground.',
  spriteId: 'bunchberry',
  collectible: false,
} satisfies InspectableEntry;

export const salmonberryEntry = {
  id: 'salmonberry',
  commonName: 'Salmonberry',
  scientificName: 'Rubus spectabilis',
  category: 'plant',
  shortFact: 'Salmonberry fruits feed birds and mammals along cool, wet coasts.',
  journalText:
    'Salmonberry is a shrub of moist coastal forests and edges. Its bright fruit feeds wildlife, and dense stems help build sheltered thickets.',
  sketchbookNote: 'Bright berries thickening the cool edge into forest.',
  spriteId: 'salmonberry',
  collectible: true,
} satisfies InspectableEntry;

export const nootkaRoseEntry = {
  id: 'nootka-rose',
  commonName: 'Nootka Rose',
  scientificName: 'Rosa nutkana',
  category: 'plant',
  shortFact: 'Nootka rose grows in thorny thickets that shelter birds and small mammals on Pacific edges.',
  journalText:
    'Nootka rose is a native Pacific shrub of coastal thickets and forest edges. Its thorny stems build cover, and its flowers and red hips help support insects and wildlife.',
  sketchbookNote: 'Thorny cover along scrub and forest edges.',
  spriteId: 'nootka-rose',
  collectible: false,
} satisfies InspectableEntry;

// Shared alpine edge species used by both treeline and tundra.
export const arcticWillowEntry = {
  id: 'arctic-willow',
  commonName: 'Arctic Willow',
  scientificName: 'Salix arctica',
  category: 'plant',
  shortFact: 'Arctic willow grows low to the ground so strong wind blows over it.',
  journalText:
    'Arctic willow is one of the tiniest woody plants in the far north. Staying close to the soil helps it keep warmer air around its stems and leaves.',
  sketchbookNote: 'Low willow resting where open fell softens to tundra.',
  spriteId: 'arctic-willow',
  collectible: false,
} satisfies InspectableEntry;

export const crowberryEntry = {
  id: 'crowberry',
  commonName: 'Crowberry',
  scientificName: 'Empetrum nigrum',
  category: 'plant',
  shortFact: 'Crowberry keeps tiny evergreen leaves so it can start growing quickly after winter.',
  journalText:
    'Crowberry is a low Arctic shrub with dark berries. Its small leaves help the plant hold on to water when cold wind sweeps across the tundra.',
  sketchbookNote: 'Dark berry mat staying low across cold alpine ground.',
  spriteId: 'crowberry',
  collectible: true,
} satisfies InspectableEntry;

export const mountainAvensEntry = {
  id: 'mountain-avens',
  commonName: 'Mountain Avens',
  scientificName: 'Dryas octopetala',
  category: 'plant',
  shortFact: 'Mountain avens forms low mats that help it handle windy alpine ground.',
  journalText:
    'Mountain avens is a low Arctic-alpine plant with bright flowers. Growing in tight mats helps it stay close to warmer ground.',
  sketchbookNote: 'Bright mats hugging cold open ground.',
  spriteId: 'mountain-avens',
  collectible: false,
} satisfies InspectableEntry;

export const mossCampionEntry = {
  id: 'moss-campion',
  commonName: 'Moss Campion',
  scientificName: 'Silene acaulis',
  category: 'plant',
  shortFact: 'Moss campion grows in tight cushions that hold warmer air near the ground.',
  journalText:
    'Moss campion is a tiny alpine wildflower that forms a dense cushion on windy slopes. Its packed shape helps it keep heat close in cold mountain weather.',
  sketchbookNote: 'Dense cushion bloom on cold ground.',
  spriteId: 'moss-campion',
  collectible: false,
} satisfies InspectableEntry;

export const reindeerLichenEntry = {
  id: 'reindeer-lichen',
  commonName: 'Reindeer Lichen',
  scientificName: 'Cladonia rangiferina',
  category: 'lichen',
  shortFact: 'Reindeer lichen grows slowly on open, well-drained ground in cold places.',
  journalText:
    'Reindeer lichen is a pale branching lichen of cold open ground. It grows slowly where soil is thin and wind is strong.',
  sketchbookNote: 'Pale branches holding on across cold open ground.',
  spriteId: 'reindeer-lichen',
  collectible: false,
} satisfies InspectableEntry;

export const lingonberryEntry = {
  id: 'lingonberry',
  commonName: 'Lingonberry',
  scientificName: 'Vaccinium vitis-idaea',
  category: 'plant',
  shortFact: 'Lingonberry keeps evergreen leaves and bright berries through cold alpine and tundra weather.',
  journalText:
    'Lingonberry is a low northern berry shrub of alpine heaths and tundra. Its evergreen leaves and bright red fruit help it make the most of short cool seasons.',
  sketchbookNote: 'Evergreen berry mats for short cool seasons.',
  spriteId: 'lingonberry',
  collectible: true,
} satisfies InspectableEntry;
