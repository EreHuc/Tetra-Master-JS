// @flow

export type CoordPosition = {
  x: number,
  y: number,
}

export type GridPosition = CoordPosition & {
  value: number,
}

export type BattlegroundPositions = {
  '0': GridPosition,
  '1': GridPosition,
  '2': GridPosition,
  '3': GridPosition,
  '10': GridPosition,
  '11': GridPosition,
  '12': GridPosition,
  '13': GridPosition,
  '20': GridPosition,
  '21': GridPosition,
  '22': GridPosition,
  '23': GridPosition,
  '30': GridPosition,
  '31': GridPosition,
  '32': GridPosition,
  '33': GridPosition,
}
