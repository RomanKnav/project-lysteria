import Player from '/src/player.js';
import InputHandler from '/src/inputHandler.js';
import Button from '/src/button.js';    

// Should I make a map object?
// draw a square for the player. Lines for paths.
// forget images, focus on getting map logic done.
// make object (?) representing player. Don't think I need to make a class?

// there's lotta shit here that should ONLY run in the MAP state

var canvas = document.getElementById('canvas1');
var cxt = canvas.getContext('2d');

var cxt = canvas.getContext("2d");
cxt.fillStyle = "green";
cxt.fillRect(0, 0, canvas.width, canvas.height);

// x, y, direction player can travel while at current point:
// yes, not specifying keys as strings is valid
let levels = {0: {x: canvas.width / 2, y: canvas.height - 100, path: 'up', reached: false}, 
              1: {x: canvas.width / 2, y: canvas.height - 400, path: 'right', reached: false},
              2: {x: canvas.width - 200, y: canvas.height - 400, path: 'right', reached: false},
              3: {x: canvas.width - 200, y: canvas.height - 300, path: 'right', reached: false},
            };

let state = "START";    // should jump to GAME state

// x, y, width, text, clickable
// looks TINY!
let startButt = new Button(canvas.width / 2, canvas.height / 3, 60, "Start", true);

let player = new Player(levels[0].x - 10, levels[0].y - 10);

new InputHandler(player, canvas);

let currLevel = 0;
let currPoint = levels[currLevel];      // yes, levels[0] is valid
let nextPoint = levels[currLevel + 1];

// for when player reaches next point (stop moving)
// point should be INSIDE player coords.

// I could use this for BOTH points player is inbetween.
function atPoint(playa, point) {
    if ((point.y > playa.y && point.y < playa.y + playa.height) &&
         point.x > playa.x && point.x < playa.x + playa.width) {
            return true;
         }
}

function handlePlayer() {
    player.draw(cxt);
    player.update();

    // when player NOT AT either points, inMotion is true. 
    if (!atPoint(player, currPoint) && !atPoint(player, nextPoint)) {
        player.inMotion = true;
    } 
    else {
        // NEW SHIT HERE:
        player.inMotion = false;
        currPoint.reached = true;
    };


    // STOPPING LOGIC HERE:
    // what exactly will stop player from moving?
    if (!player.inMotion && !nextPoint.reached) {

    }
}

// when called: atPoint(player, nextPoint)

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
        let x1 = levels[i].x;
        let y1 = levels[i].y;
        let x2 = levels[i + 1].x;
        let y2 = levels[i + 1].y;

        drawLine(x1, y1, x2, y2);
        // console.log(i, i + 1);
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
    cxt.fillStyle = "green"; 
    cxt.fillRect(0, 0, canvas.width, canvas.height);

    handlePlayer();
    handleState();

    // drawLine(canvas.width / 2, canvas.height / 2, 200, 200);
    drawPaths();

    console.log(player.inMotion);

    window.requestAnimationFrame(animate);
}

animate();