// to fuck around with map objects

import Player from '/src/player.js';
import InputHandler from '/src/inputHandler.js';
import Button from '/src/button.js'; 
import Map from '/src/map.js';    

var canvas = document.getElementById('canvas1');
var cxt = canvas.getContext('2d');

var cxt = canvas.getContext("2d");
cxt.fillStyle = "green";
cxt.fillRect(0, 0, canvas.width, canvas.height);

let worlds = {
    1: 
    { 
        0: {x: canvas.width / 2 - 1, y: canvas.height - 100, path: 'up', reached: false}, 
        1: {x: canvas.width / 2 - 1, y: canvas.height - 400, path: 'right', reached: false},
        2: {x: canvas.width - 200, y: canvas.height - 400, path: 'down', reached: false},
        3: {x: canvas.width - 200, y: canvas.height - 300, path: 'end', reached: false},
    },
    2: 
    { 
        0: {x: canvas.width / 2 - 1, y: canvas.height - 100, path: 'up', reached: false}, 
        1: {x: canvas.width / 2 - 1, y: canvas.height - 400, path: 'right', reached: false},
        2: {x: canvas.width - 200, y: canvas.height - 400, path: 'down', reached: false},
        3: {x: canvas.width - 200, y: canvas.height - 300, path: 'end', reached: false},
    },
    3: 
    { 
        0: {x: canvas.width / 2 - 1, y: canvas.height - 100, path: 'up', reached: false}, 
        1: {x: canvas.width / 2 - 1, y: canvas.height - 400, path: 'right', reached: false},
        2: {x: canvas.width - 200, y: canvas.height - 400, path: 'down', reached: false},
        3: {x: canvas.width - 200, y: canvas.height - 300, path: 'end', reached: false},
    },   
};

let state = "START"; 

// x, y, width, text, clickable
let startButt = new Button(canvas.width / 2 - 30, canvas.height / 3, 60, "Start", true);

// **********TODO: initiate first game object**********

// seems I'll have to remove player's x/y args. To be determined by current world

// let player = new Player(levels[0].x, levels[0].y - 50);
let player = new Player();
new InputHandler(player, canvas);

// map requires: worlds sub-dictionary, player 
let worldNum = 1;
let currMap = new Map(worlds[worldNum]);

// player start point in the world at point 0:
player.x = currMap[0].x;
player.y = currMap[0].y;

function handlePlayer() {
    player.draw(cxt);
    player.update();

    // when player NOT AT either points, inMotion is true. 
    if (!atPoint(player, currPoint) && !atPoint(player, nextPoint)) {
        player.inMotion = true;
    } 
    else {
        player.inMotion = false;
        currPoint.reached = true;
    };

    // PLAYER REACHED NEXTPOINT; time to increment shit:
    if (!player.inMotion && player.moved) {
        player.direction = "null";
        player.pressed = false;
        
        // cremate shit (MUST HAPPEN ONLY ONCE)
        if (player.moved) {
            // currLevel += 1, nextLevel += 1;
            cremate();
            player.moved = false;
        }
    }

    // player has reached current point (all are initially false)
    // think I should put this one and one above together       --TODO HERE
    if (player.direction == "null") currPoint.reached = true;
}