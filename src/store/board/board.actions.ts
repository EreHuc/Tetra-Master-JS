export const INIT_BOARD = "INIT_BOARD";

export function initBoard(width, height) {
  return {
    type: INIT_BOARD,
    payload: {
      width,
      height,
    },
  };
}
