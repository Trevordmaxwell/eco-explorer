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
  spriteId: 'sand-verbena',
  collectible: false,
} satisfies InspectableEntry;

export const swordFernEntry = {
  id: 'sword-fern',
  commonName: 'Sword Fern',
  scientificName: 'Polystichum munitum',
  category: 'plant',
  shortFact: 'Sword ferns stay green through cool, damp seasons on the forest floor.',
  journalText:
    'Sword ferns grow in shady places where the soil stays moist. Their long fronds help cover the ground and shelter tiny animals.',
  spriteId: 'sword-fern',
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
  spriteId: 'mountain-avens',
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
  spriteId: 'lingonberry',
  collectible: true,
} satisfies InspectableEntry;
