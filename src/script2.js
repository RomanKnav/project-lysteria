// to fuck around with map objects

import Player from '/src/player.js';
import InputHandler from '/src/inputHandler.js';
import Button from '/src/button.js'; 
import Map from '/src/map.js';    

var canvas = document.getElementById('canvas1');
var cxt = canvas.getContext('2d');
cxt.fillStyle = "green";
cxt.fillRect(0, 0, canvas.width, canvas.height);

let state = "START";

// DIMENSIONS: 854x480. 
let worlds = {
    1: 
    { 
        0: {x: canvas.width / 2, y: canvas.height - 100, path: 'up', reached: false}, 
        1: {x: canvas.width / 2, y: canvas.height - 400, path: 'right', reached: false},
        2: {x: canvas.width - 200, y: canvas.height - 400, path: 'down', reached: false},
        3: {x: canvas.width - 200, y: canvas.height - 300, path: 'end', reached: false},
    },
    2: 
    { 
        0: {x: 100, y: 100, path: 'right', reached: false}, 
        1: {x: canvas.width / 2 + 100, y: 100, path: 'down', reached: false},
        2: {x: canvas.width / 2 + 100, y: 300, path: 'left', reached: false},
        3: {x: 100, y: 300, path: 'end', reached: false},
    },
    3: 
    { 
        0: {x: canvas.width / 2 - 1, y: canvas.height - 100, path: 'up', reached: false}, 
        1: {x: canvas.width / 2 - 1, y: canvas.height - 400, path: 'right', reached: false},
        2: {x: canvas.width - 200, y: canvas.height - 400, path: 'down', reached: false},
        3: {x: canvas.width - 200, y: canvas.height - 300, path: 'end', reached: false},
    },   
}; 

// x, y, width, text, clickable
let startButt = new Button(canvas.width / 2 - 30, canvas.height / 3, 60, "Start", true);
startButt.draw(cxt);

let player = new Player();
new InputHandler(player, canvas);

// map requires: worlds sub-dictionary, player 
let worldNum = 1;
let currMap = new Map(worlds[worldNum], player);

// DONT WORK:
// player.x = worlds[worldNum][currMap.currLevel.x];
// player.y = worlds[worldNum][currMap.currLevel.y];

// maybe I should include a "handleMap" function...

function handleMap() {
    currMap.drawPaths(cxt);
    currMap.handlePlayer(cxt);
}

function handleState() {
    switch(state) {
        case "START":
            player.disabled = true;
            startButt.draw(cxt);
            mouseCollision(player.mouse, startButt, () => state = "GAME");
            break;
        case "GAME":
            player.disabled = false;
            break;
    }
}

function mouseCollision(first, second, callback) {
    if (
      first.x >= second.x &&
      first.x <= second.x + second.width &&
      first.y >= second.y &&
      first.y <= second.y + second.height
    ) {
        second.stroke = "red";
        if (first.clicked) {
            callback();
        }
    } else {
        second.stroke = "black";
    }
}

function animate() {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    cxt.fillStyle = "green"; 
    cxt.fillRect(0, 0, canvas.width, canvas.height);

    handleMap();
    handleState();

    // console.log(player.direction == player.trueKey, player.pressed);
    // console.log(player.y, worlds[worldNum][currMap.currLevel].y);   // should NOT be true.
    console.log(player.x, canvas.width - 200);

    window.requestAnimationFrame(animate);
}
animate();