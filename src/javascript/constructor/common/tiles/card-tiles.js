// @flow

import type { CardTile, MonsterTileList, Tile } from '../../../type/tile';
import {
  aCardTile, bCardTile, cCardTile, dCardTile, eCardTile, eightCardTile, fCardTile,
  fiveCardTile,
  fourCardTile, mCardTile,
  nineCardTile, oneCardTile, pCardTile,
  sevenCardTile,
  sixCardTile, threeCardTile, twoCardTile, xCardTile,
  zeroCardTile,
} from './stat-tiles';
import { bottom, bottomLeft, bottomRight, left, right, top, topLeft, topRight } from './corner-tiles';
import {
  Abadon,
  Abomination, Airship, Alexander, Alexandria,
  Antlion, Ark,
  Armstrong,
  Ash, Atomos, Bahamut,
  Behemoth,
  BlazerBeetle, BlueNarciss, BocoTHEChocobo,
  Bomb,
  Cactuar, CargoShip,
  CarrionWorm,
  Cerberus,
  Chocobo,
  Crawler, DarkMatter,
  Dragonfly, Elixir, ExcaliburII,
  Fang, FatChocobo,
  FeatherCircle, Fenrir,
  Flan,
  Flare, Frog, Gargant,
  Gargoyle,
  Garuda, Genji,
  GimmeCat,
  Goblin,
  GrandDragon,
  Grimlock,
  Hades,
  Hecteyes,
  HedgehogPie, HildaGarde1, HildaGarde3,
  Holy,
  Ifrit, Invincible,
  Ironite,
  IronMan, Leviathan, Lindblum,
  LizardMan, Madeen,
  Malboro,
  Mandragora, Masamune,
  Meteor,
  Mimic, Mog,
  Mover, MythrilSword, Namingway,
  NovaDragon,
  Nymph,
  Ochu, Odin, Oglop,
  Ogre,
  Ozma,
  Ragtimer,
  Ralvuimago,
  Ramuh, RedRose, Ribbon,
  Sahagin,
  SandGolem,
  SandScorpion, SaveTheQueen,
  Shiva,
  Skeleton,
  Stroper,
  Tantarian, TheaterShip, TigerRacket,
  Tonberry,
  Troll, TwoMoons, UltimaWeapon,
  Vepal,
  Veteran,
  Viltgance,
  Wraith,
  Wyerd,
  Yeti,
  Zaghnol,
  Zemzelett,
  Zombie,
  Zuu,
} from './monster-tiles';

/**
 * Blue card background info
 * @type {{x: number, y: number, width: number, height: number}}
 */
export const blueCardTile: Tile = {
  x: 18,
  y: 822,
  width: 42,
  height: 51,
};

/**
 * Red card background info
 * @type {{x: number, y: number, width: number, height: number}}
 */
export const redCardTile: Tile = {
  x: 66,
  y: 822,
  width: 42,
  height: 51,
};

export const stone1CardTile: Tile = {
  x: 114,
  y: 822,
  width: 42,
  height: 51,
};

export const stone2CardTile: Tile = {
  x: 162,
  y: 822,
  width: 42,
  height: 51,
};

/**
 * List of Tetra Game's Monster
 * @type {{Goblin: MonsterTile, Fang: MonsterTile, Skeleton: MonsterTile, Flan: MonsterTile, Zaghnol: MonsterTile, LizardMan: MonsterTile, Zombie: MonsterTile, Bomb: MonsterTile, Ironite: MonsterTile, Sahagin: MonsterTile, Yeti: MonsterTile, Mimic: MonsterTile, Wyerd: MonsterTile, Mandragora: MonsterTile, Crawler: MonsterTile, SandScorpion: MonsterTile, Nymph: MonsterTile, SandGolem: MonsterTile, Zuu: MonsterTile, Dragonfly: MonsterTile, CarrionWorm: MonsterTile, Cerberus: MonsterTile, Antlion: MonsterTile, Cactuar: MonsterTile, GimmeCat: MonsterTile, Ragtimer: MonsterTile, HedgehogPie: MonsterTile, Ralvuimago: MonsterTile, Ochu: MonsterTile, Troll: MonsterTile, BlazerBeetle: MonsterTile, Abomination: MonsterTile, Zemzelett: MonsterTile, Stroper: MonsterTile, Tantarian: MonsterTile, GrandDragon: MonsterTile, FeatherCircle: MonsterTile, Hecteyes: MonsterTile, Ogre: MonsterTile, Armstrong: MonsterTile, Ash: MonsterTile, Wraith: MonsterTile, Gargoyle: MonsterTile, Vepal: MonsterTile, Grimlock: MonsterTile, Tonberry: MonsterTile, Veteran: MonsterTile, Garuda: MonsterTile, Malboro: MonsterTile, Mover: MonsterTile, Abadon: MonsterTile, Behemoth: MonsterTile, IronMan: MonsterTile, NovaDragon: MonsterTile, Ozma: MonsterTile, Hades: MonsterTile, Holy: MonsterTile, Meteor: MonsterTile, Flare: MonsterTile, Shiva: MonsterTile, Ifrit: MonsterTile, Ramuh: MonsterTile, Atomos: MonsterTile, Odin: MonsterTile, Leviathan: MonsterTile, Bahamut: MonsterTile, Ark: MonsterTile, Fenrir: MonsterTile, Madeen: MonsterTile, Alexander: MonsterTile, ExcaliburII: MonsterTile, UltimaWeapon: MonsterTile, Masamune: MonsterTile, Elixir: MonsterTile, DarkMatter: MonsterTile, Ribbon: MonsterTile, TigerRacket: MonsterTile, SaveTheQueen: MonsterTile, Genji: MonsterTile, MythrilSword: MonsterTile, BlueNarciss: MonsterTile, HildaGarde3: MonsterTile, Invincible: MonsterTile, CargoShip: MonsterTile, HildaGarde1: MonsterTile, RedRose: MonsterTile, TheaterShip: MonsterTile, Viltgance: MonsterTile, Chocobo: MonsterTile, FatChocobo: MonsterTile, Mog: MonsterTile, Frog: MonsterTile, Oglop: MonsterTile, Alexandria: MonsterTile, Lindblum: MonsterTile, TwoMoons: MonsterTile, Gargant: MonsterTile, Namingway: MonsterTile, BocoTHEChocobo: MonsterTile, Airship: MonsterTile}}
 */
export const monsterList: MonsterTileList = {
  Goblin,
  Fang,
  Skeleton,
  Flan,
  Zaghnol,
  LizardMan,
  Zombie,
  Bomb,
  Ironite,
  Sahagin,
  Yeti,
  Mimic,
  Wyerd,
  Mandragora,
  Crawler,
  SandScorpion,
  Nymph,
  SandGolem,
  Zuu,
  Dragonfly,
  CarrionWorm,
  Cerberus,
  Antlion,
  Cactuar,
  GimmeCat,
  Ragtimer,
  HedgehogPie,
  Ralvuimago,
  Ochu,
  Troll,
  BlazerBeetle,
  Abomination,
  Zemzelett,
  Stroper,
  Tantarian,
  GrandDragon,
  FeatherCircle,
  Hecteyes,
  Ogre,
  Armstrong,
  Ash,
  Wraith,
  Gargoyle,
  Vepal,
  Grimlock,
  Tonberry,
  Veteran,
  Garuda,
  Malboro,
  Mover,
  Abadon,
  Behemoth,
  IronMan,
  NovaDragon,
  Ozma,
  Hades,
  Holy,
  Meteor,
  Flare,
  Shiva,
  Ifrit,
  Ramuh,
  Atomos,
  Odin,
  Leviathan,
  Bahamut,
  Ark,
  Fenrir,
  Madeen,
  Alexander,
  ExcaliburII,
  UltimaWeapon,
  Masamune,
  Elixir,
  DarkMatter,
  Ribbon,
  TigerRacket,
  SaveTheQueen,
  Genji,
  MythrilSword,
  BlueNarciss,
  HildaGarde3,
  Invincible,
  CargoShip,
  HildaGarde1,
  RedRose,
  TheaterShip,
  Viltgance,
  Chocobo,
  FatChocobo,
  Mog,
  Frog,
  Oglop,
  Alexandria,
  Lindblum,
  TwoMoons,
  Gargant,
  Namingway,
  BocoTHEChocobo,
  Airship,
};

export const backCardTile: Tile = {
  x: 210,
  y: 822,
  height: 42,
  width: 51,
};

/**
 * All tile need for drawing card
 * @type {{red: Tile, blue: Tile, '0': Tile, '1': Tile, '2': Tile, '3': Tile, '4': Tile, '5': Tile, '6': Tile, '7': Tile, '8': Tile, '9': Tile, A: Tile, B: Tile, C: Tile, D: Tile, E: Tile, F: Tile, P: Tile, M: Tile, X: Tile, monster: MonsterTileList, corner: {topLeft: Tile, top: Tile, topRight: Tile, right: Tile, bottomRight: Tile, bottom: Tile, bottomLeft: Tile, left: Tile}}}
 */
export const cardTiles: CardTile = {
  red: redCardTile,
  blue: blueCardTile,
  stone1: stone1CardTile,
  stone2: stone2CardTile,
  '0': zeroCardTile,
  '1': oneCardTile,
  '2': twoCardTile,
  '3': threeCardTile,
  '4': fourCardTile,
  '5': fiveCardTile,
  '6': sixCardTile,
  '7': sevenCardTile,
  '8': eightCardTile,
  '9': nineCardTile,
  A: aCardTile,
  B: bCardTile,
  C: cCardTile,
  D: dCardTile,
  E: eCardTile,
  F: fCardTile,
  P: pCardTile,
  M: mCardTile,
  X: xCardTile,
  monster: monsterList,
  corner: {
    topLeft,
    top,
    topRight,
    right,
    bottomRight,
    bottom,
    bottomLeft,
    left,
  },
  back: backCardTile,
};
