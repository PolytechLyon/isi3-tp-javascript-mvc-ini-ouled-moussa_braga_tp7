import {
  GAME_SIZE,
  CELL_STATES,
  DEFAULT_ALIVE_PAIRS,
  RENDER_INTERVAL
} from "./constants.js";

import {
  initView,
  drawGame
} from "./view.js";

export class Model {
  constructor() {
    this.width = GAME_SIZE;
    this.height = GAME_SIZE;
    this.raf = null;
  }

  init() {
    this.state = Array.from(new Array(this.height), () =>
      Array.from(new Array(this.width), () => CELL_STATES.NONE)
    );
    DEFAULT_ALIVE_PAIRS.forEach(([x, y]) => {
      this.state[y][x] = CELL_STATES.ALIVE;
    });
    this.updated();
  }

  run(date = new Date().getTime()) {
    this.raf = requestAnimationFrame(() => {
      const currentTime = new Date().getTime();
      if (currentTime - date > RENDER_INTERVAL) {

        for (let i = 0; i < this.width; i++) {
          for (let j = 0; j < this.width; j++) {
            const nbAlive = this.aliveNeighbours(i, j);
            // TODO implement Game of life logic
            if(this.isCellAlive(i, j)) {
              if(nbAlive < 2 || nbAlive > 3) {
                this.state[i][j] = CELL_STATES.DEAD;
              }
            } else if(!this.isCellAlive(i, j) && nbAlive == 3) {
              this.state[i][j] = CELL_STATES.ALIVE;
            }
          }
        }

        this.updated();
        this.run(currentTime);
      } else {
        this.run(date);
      }
    });
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  reset() {
    this.init();
    initView();
    this.updated();
    this.stop();
  }

  isCellAlive(x, y) {
    return x >= 0 &&
      y >= 0 &&
      y < this.height &&
      x < this.height &&
      this.state[y][x] === CELL_STATES.ALIVE
      ? 1
      : 0;
  }
  aliveNeighbours(x, y) {
    let number = 0;
    // console.log(this.state);
    for (let i = y - 1; i < y + 1; i++) {
      for (let j = x - 1; j < x + 1; j++) {
        if(i > 0 && i < this.width && j > 0 && j < this.height)
          number += (this.state[i][j] == CELL_STATES.ALIVE) && (j != x && i != y) ? 1 : 0;
      }
    }
    return number;
  }

  updated() {
    // TODO update the view
    drawGame(this);
  }
}
