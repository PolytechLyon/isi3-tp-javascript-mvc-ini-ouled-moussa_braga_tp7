export const controller = model => {
  model.run();
};

export const stop = model => {
  model.stop();
};

export const reset = model => {
  model.reset();
};

export const updateCell = (model, e, offset) => {
  let x = e.clientX - offset.left, y = e.clientY - offset.top;
  let pos = model.worldPointToCell(x, y);
  console.log("x : " + x + " - y : " + y);
  
  console.log(pos);
  model.updateCell(pos[0], pos[1]);
};

export const updateGameSize = (model, e) => {
  let deltaScroll = e.wheelDelta/120;
  model.updateGameSize(deltaScroll);
};
