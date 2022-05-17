export const CANVAS_WIDTH = window.innerWidth * 1;
export const CANVAS_HEIGHT = window.innerHeight * 0.75;
export var GAME_SIZE = 50;
export const CELL_SIZE = 20;
export const RENDER_INTERVAL = 50;

export const CELL_STATES = {
  NONE: "#99AAB5",
  ALIVE: "#5562EA",
  DEAD: "#23272A"
};

export const DEFAULT_ALIVE_PAIRS = [
  [3, 4],
  [5, 6],
  [7, 1],
  [7, 2],
  [8, 5],
  [4, 4],
  [5, 4],
  [6, 4],
  [8, 4]
];

export const getCellAdaptiveSize = () => { return CANVAS_WIDTH / GAME_SIZE};
export const updateGameSize = (delta) => {GAME_SIZE += delta};