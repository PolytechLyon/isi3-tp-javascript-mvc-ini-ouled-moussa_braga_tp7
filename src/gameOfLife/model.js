import {
  GAME_SIZE,
  CELL_STATES,
  DEFAULT_ALIVE_PAIRS,
  RENDER_INTERVAL,
  CELL_SIZE,
  getCellAdaptiveSize,
  updateGameSize
} from "./constants.js";

import {
  initView
} from "./view.js";

export class Model {
  constructor() {
    this.width = GAME_SIZE;
    this.height = GAME_SIZE;
    this.raf = null;
    this.observers = [];
    this.isRunning = false;
  }

  init() {
    this.state = Array.from(new Array(this.height), () =>
      Array.from(new Array(this.width), () => CELL_STATES.NONE)
    );
    DEFAULT_ALIVE_PAIRS.forEach(([x, y]) => {
      this.state[y][x] = CELL_STATES.ALIVE;
    });
    this.updated();

    // DEBUG
    // for (let i = 0; i < this.height; i++) {
    //   for (let j = 0; j < this.width; j++) {
    //     const nbAlive = this.aliveNeighbours(j, i);
    //       console.log(nbAlive);
    //   }
    // }
  }

  run(date = new Date().getTime()) {
    this.stop();
      this.raf = requestAnimationFrame(() => {
        const currentTime = new Date().getTime();
        if (currentTime - date > RENDER_INTERVAL) {
          
          let buffer = JSON.parse(JSON.stringify(this.state));
          for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
              const nbAlive = this.aliveNeighbours(j, i);
              // TODO implement Game of life logic
              if(this.isCellAlive(j, i)) {
                if(nbAlive < 2 || nbAlive > 3) {
                  buffer[i][j] = CELL_STATES.DEAD;
                }
              } else if(!this.isCellAlive(j, i) && nbAlive == 3) {
                buffer[i][j] = CELL_STATES.ALIVE;
              }
            }
          }
          this.state = JSON.parse(JSON.stringify(buffer));
  
          this.updated();
          this.run(currentTime);
        } else {
          this.run(date);
        }
        
      });
      this.isRunning = true;
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = null;
    this.isRunning = false;
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
      x < this.width &&
      this.state[y][x] === CELL_STATES.ALIVE
      ? 1
      : 0;
  }
  
  aliveNeighbours(x, y) {
    let number = 0;
    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        if( (i >= 0 && i < this.height) && (j >= 0 && j < this.width) )
        {
          number += this.state[i][j] === CELL_STATES.ALIVE ? 1 : 0;
          // console.log("j : " + j + " - i : " + i + " - isAlive : " + this.state[i][j]);
        }
      }
    }
    number -= this.state[y][x] === CELL_STATES.ALIVE ? 1 : 0;
    return number;
  }

  updated() {
    // TODO update the view
    this.observers.forEach( (observer) => {
      observer(this);
    });
  }

  // BONUS

  updateCell(x, y) {
    if(this.state[y][x] != CELL_STATES.ALIVE)
    {
      this.state[y][x] = CELL_STATES.ALIVE;
    } else {
      this.state[y][x] = CELL_STATES.NONE;
    }
    this.updated();
  }

  worldPointToCell(x, y)
  {
    let pos = [];
    pos.push(Math.floor( y / getCellAdaptiveSize() ));
    pos.push(Math.floor( (x - getCellAdaptiveSize()/4) / getCellAdaptiveSize() ));
    return pos;
  }

  updateGameSize(wheel) {
    updateGameSize(-wheel);
    this.width = GAME_SIZE;
    this.height = GAME_SIZE;
    this.init();
    this.updated();
    // console.log(GAME_SIZE);
  }
}
