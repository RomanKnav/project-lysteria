import Player from '/src/player.js';
import InputHandler from '/src/inputHandler.js';
import Button from '/src/button.js';    

// Should I make a map object?
// draw a square for the player. Lines for paths.
// forget images, focus on getting map logic done.
// make object (?) representing player. Don't think I need to make a class?

var canvas = document.getElementById('canvas1');
var cxt = canvas.getContext('2d');

var cxt = canvas.getContext("2d");
cxt.fillStyle = "green";
cxt.fillRect(0, 0, canvas.width, canvas.height);

// x, y, direction player can travel while at current point:
let levels = {'0': {'x': canvas.width / 2, 'y': canvas.height - 100, 'path': 'up'}, 
              '1': {'x': canvas.width / 2, 'y': canvas.height - 200, 'path': 'right'},
              '2': {'x': canvas.width - 200, 'y': canvas.height - 200, 'path': 'right'},
              '3': {'x': canvas.width - 200, 'y': canvas.height - 300, 'path': 'right'},
            };

let state = "START";    // should jump to GAME state

// x, y, width, text, clickable
// looks TINY!
let startButt = new Button(canvas.width / 2, canvas.height / 3, 60, "Start", true);

let player = new Player(levels['0']['x'] - 10, levels['0']['y'] - 10);

new InputHandler(player, canvas);

function handlePlayer() {
    player.draw(cxt);
    player.update();
}

let currLevel = 0
let currPoint = levels[currLevel];
let nextPoint = levels[currLevel + 1];

let inPosition = false; 

// for when player reaches next point (stop moving)
function playerCollision() {
    
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

/* 
I can possibly implement a "pinpoint" system, maybe in a dict:
let pinpoints = {start: {x: 100, y: 100}, l1: {x: 100, y: 200}, l2: {x: 200, y: 300}}
*/

/* each subdict represents a (x, y) coord. These not only represent the points to draw the
lines, but also the points player is allowed to move to: */

function drawLine(x1, y1, x2, y2) {
    cxt.beginPath();
    cxt.moveTo(x1, y1);
    cxt.lineTo(x2, y2);
    cxt.strokeStyle = 'black';
    cxt.lineWidth = 10;
    cxt.stroke();
}

// this simply DRAWS the lines, nothing more.
function drawPaths() {
    for (let i = 0; i < Object.keys(levels).length - 1; i++) {
        let x1 = levels[i.toString()]['x'];
        let y1 = levels[i.toString()]['y'];
        let x2 = levels[(i + 1).toString()]['x'];
        let y2 = levels[(i + 1).toString()]['y'];

        drawLine(x1, y1, x2, y2);
    }
}


// mouse, button, func.
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
    // cxt.fillStyle = "transparent";
    cxt.fillStyle = "green"; 
    cxt.fillRect(0, 0, canvas.width, canvas.height);

    handlePlayer();
    handleMovement();
    handleState();

    // drawLine(canvas.width / 2, canvas.height / 2, 200, 200);
    drawPaths();

    console.log(player.direction);

    window.requestAnimationFrame(animate);
}

animate();

