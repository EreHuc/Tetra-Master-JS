// @flow

import type { AssaultBatteClass, FlexibleBattleClass, MagicalBattleClass, PhysicalBattleClass } from '../type/stat';

export const GAME_SPRITE:HTMLImageElement = (document.getElementById('game-sprite'): any);
export const BLUE_CARD: number = 0;
export const RED_CARD: number = 1;
export const ZOOM_LEVEL: number = 2;
export const TOP_LEFT_CORNER: number = 0;
export const TOP_CORNER: number = 1;
export const TOP_RIGHT_CORNER: number = 2;
export const RIGHT_CORNER: number = 3;
export const BOTTOM_RIGHT_CORNER: number = 4;
export const BOTTOM_CORNER: number = 5;
export const BOTTOM_LEFT_CORNER: number = 6;
export const LEFT_CORNER: number = 7;
export const ASSAULT_BATTLE_CLASS: AssaultBatteClass = 'A';
export const PHYSICAL_BATTLE_CLASS: PhysicalBattleClass = 'P';
export const MAGICAL_BATTLE_CLASS: MagicalBattleClass = 'M';
export const FLEXIBLE_BATTLE_CLASS: FlexibleBattleClass = 'X';
export const CANVAS_WIDTH:number = 320;
export const CANVAS_HEIGHT:number = 240;
export const BATTLEGROUND_COORD_X: number = 72;
export const BATTLEGROUND_COORD_Y: number = 8;
export const CARD_WIDTH: number = 42;
export const CARD_HEIGHT: number = 51;
export const UP: number = 38;
export const DOWN: number = 40;
export const LEFT: number = 37;
export const RIGHT: number = 39;
