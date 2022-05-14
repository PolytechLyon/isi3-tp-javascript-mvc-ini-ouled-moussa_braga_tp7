import { GAME_SIZE, CELL_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants.js";

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

const drawCell = (x, y, value) => {
  context.fillStyle = value;
  context.fillRect(x + CELL_SIZE * x, y + CELL_SIZE * y, CELL_SIZE, CELL_SIZE);
};

export const initView = () => {
  document.getElementById("game").appendChild(canvas);
  // canvas.setAttribute("height", GAME_SIZE * CELL_SIZE + GAME_SIZE - 1);
  // canvas.setAttribute("width", GAME_SIZE * CELL_SIZE + GAME_SIZE - 1);
  canvas.setAttribute("height", CANVAS_HEIGHT);
  canvas.setAttribute("width", CANVAS_WIDTH);
};

export const drawGame = model => {
  model.state.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      drawCell(rowIndex, columnIndex, value);
    });
  });
};


export const debugGame = model => {
  let size = 10;
  context.font = size + 'px serif';
  context.fillStyle = "black";
  model.state.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      context.fillText(model.aliveNeighbours(columnIndex, rowIndex), 
      rowIndex * CELL_SIZE + rowIndex, columnIndex * CELL_SIZE + columnIndex * 2);
      // console.log(model.aliveNeighbours(columnIndex, rowIndex));
    });
  });
};