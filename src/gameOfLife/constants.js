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
  [6, 4],
  [6, 5],
  [7, 5],
  [7, 4],

  [6, 14],
  [7, 14],
  [8, 14],
  [5, 15],
  [4, 16],
  [4, 17],
  [9, 15],
  [10, 16],
  [10, 17],
  [7, 18],
  [5, 19],
  [6, 20],
  [7, 20],
  [8, 20],
  [9, 19],
  [7, 21],

  [6, 24],
  [6, 25],
  [5, 25],
  [5, 24],
  [4, 24],
  [4, 25],
  [3, 26],
  [7, 26],
  [2, 28],
  [3, 28],
  [7, 28],
  [8, 28],

  [4, 38],
  [4, 39],
  [5, 39],
  [5, 38]
];
export var SAVED_ALIVE_PAIRS = JSON.parse(JSON.stringify(DEFAULT_ALIVE_PAIRS)) ;

export const getCellAdaptiveSize = () => { return CANVAS_WIDTH / GAME_SIZE};
export const updateGameSize = (delta) => {GAME_SIZE += delta};

