if (!document.getElementById) document.write('<link rel="stylesheet" type="text/css" href="./style.css">');
import { initView, drawGame } from "./gameOfLife/view.js";
import { Model } from "./gameOfLife/model.js";
import { controller, stop, reset } from "./gameOfLife/controller.js";

initView();

const model = new Model();

model.init();
drawGame(model);


let startButton = document.querySelector("#start");
let stopButton = document.querySelector("#stop");
let resetButton = document.querySelector("#reset");

startButton.addEventListener("click", () => {
    controller(model);
});

stopButton.addEventListener("click", () => {
    stop(model);
});

resetButton.addEventListener("click", () => {
    reset(model);
});