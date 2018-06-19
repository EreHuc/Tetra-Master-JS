// @flow

import type { MonsterStats } from './stat-type';

export type Tile = {
  x: number,
  y: number,
  width: number,
  height: number,
};

export type CornerTile = {
  topLeft: Tile,
  top: Tile,
  topRight: Tile,
  right: Tile,
  bottomRight: Tile,
  bottom: Tile,
  bottomLeft: Tile,
  left: Tile,
}

export type MonsterTile = Tile & {
  id: number,
  baseStat: MonsterStats,
}

export type MonsterTileList = {
  Goblin: MonsterTile,
  Fang: MonsterTile,
  Skeleton: MonsterTile,
  Flan: MonsterTile,
  Zaghnol: MonsterTile,
  LizardMan: MonsterTile,
  Zombie: MonsterTile,
  Bomb: MonsterTile,
  Ironite: MonsterTile,
  Sahagin: MonsterTile,
  Yeti: MonsterTile,
  Mimic: MonsterTile,
  Wyerd: MonsterTile,
  Mandragora: MonsterTile,
  Crawler: MonsterTile,
  SandScorpion: MonsterTile,
  Nymph: MonsterTile,
  SandGolem: MonsterTile,
  Zuu: MonsterTile,
  Dragonfly: MonsterTile,
  CarrionWorm: MonsterTile,
  Cerberus: MonsterTile,
  Antlion: MonsterTile,
  Cactuar: MonsterTile,
  GimmeCat: MonsterTile,
  Ragtimer: MonsterTile,
  HedgehogPie: MonsterTile,
  Ralvuimago: MonsterTile,
  Ochu: MonsterTile,
  Troll: MonsterTile,
  BlazerBeetle: MonsterTile,
  Abomination: MonsterTile,
  Zemzelett: MonsterTile,
  Stroper: MonsterTile,
  Tantarian: MonsterTile,
  GrandDragon: MonsterTile,
  FeatherCircle: MonsterTile,
  Hecteyes: MonsterTile,
  Ogre: MonsterTile,
  Armstrong: MonsterTile,
  Ash: MonsterTile,
  Wraith: MonsterTile,
  Gargoyle: MonsterTile,
  Vepal: MonsterTile,
  Grimlock: MonsterTile,
  Tonberry: MonsterTile,
  Veteran: MonsterTile,
  Garuda: MonsterTile,
  Malboro: MonsterTile,
  Mover: MonsterTile,
  Abadon: MonsterTile,
  Behemoth: MonsterTile,
  IronMan: MonsterTile,
  NovaDragon: MonsterTile,
  Ozma: MonsterTile,
  Hades: MonsterTile,
  Holy: MonsterTile,
  Meteor: MonsterTile,
  Flare: MonsterTile,
  Shiva: MonsterTile,
  Ifrit: MonsterTile,
  Ramuh: MonsterTile,
  Atomos: MonsterTile,
  Odin: MonsterTile,
  Leviathan: MonsterTile,
  Bahamut: MonsterTile,
  Ark: MonsterTile,
  Fenrir: MonsterTile,
  Madeen: MonsterTile,
  Alexander: MonsterTile,
  ExcaliburII: MonsterTile,
  UltimaWeapon: MonsterTile,
  Masamune: MonsterTile,
  Elixir: MonsterTile,
  DarkMatter: MonsterTile,
  Ribbon: MonsterTile,
  TigerRacket: MonsterTile,
  SaveTheQueen: MonsterTile,
  Genji: MonsterTile,
  MythrilSword: MonsterTile,
  BlueNarciss: MonsterTile,
  HildaGarde3: MonsterTile,
  Invincible: MonsterTile,
  CargoShip: MonsterTile,
  HildaGarde1: MonsterTile,
  RedRose: MonsterTile,
  TheaterShip: MonsterTile,
  Viltgance: MonsterTile,
  Chocobo: MonsterTile,
  FatChocobo: MonsterTile,
  Mog: MonsterTile,
  Frog: MonsterTile,
  Oglop: MonsterTile,
  Alexandria: MonsterTile,
  Lindblum: MonsterTile,
  TwoMoons: MonsterTile,
  Gargant: MonsterTile,
  Namingway: MonsterTile,
  BocoTHEChocobo: MonsterTile,
  Airship: MonsterTile,
};

export type CardTile = {
  red: Tile,
  blue: Tile,
  stone1: Tile,
  stone2: Tile,
  '0': Tile,
  '1': Tile,
  '2': Tile,
  '3': Tile,
  '4': Tile,
  '5': Tile,
  '6': Tile,
  '7': Tile,
  '8': Tile,
  '9': Tile,
  A: Tile,
  B: Tile,
  C: Tile,
  D: Tile,
  E: Tile,
  F: Tile,
  P: Tile,
  M: Tile,
  X: Tile,
  monster: MonsterTileList,
  corner: CornerTile,
  back: Tile,
};

export type CursorTile = Array<Tile>;