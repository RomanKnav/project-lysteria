import Player from '/src/player.js';
import InputHandler from '/src/inputHandler.js';
import Button from '/src/button.js';    

// Should I make a map object?
// draw a square for the player. Lines for paths.
// forget images, focus on getting map logic done.
// make object (?) representing player. Don't think I need to make a class?

// there's alot here that should ONLY run in the MAP state

var canvas = document.getElementById('canvas1');
var cxt = canvas.getContext('2d');

var cxt = canvas.getContext("2d");
cxt.fillStyle = "green";
cxt.fillRect(0, 0, canvas.width, canvas.height);

// x, y, direction player can travel while at current point:
// yes, not specifying keys as strings is valid
let levels = {0: {x: canvas.width / 2 - 1, y: canvas.height - 100, path: 'up', reached: false}, 
              1: {x: canvas.width / 2 - 1, y: canvas.height - 400, path: 'right', reached: false},
              2: {x: canvas.width - 200, y: canvas.height - 400, path: 'down', reached: false},
              3: {x: canvas.width - 200, y: canvas.height - 300, path: 'end', reached: false},
            };

let state = "START";    // should jump to GAME state

// x, y, width, text, clickable
// looks TINY!
let startButt = new Button(canvas.width / 2 - 30, canvas.height / 3, 60, "Start", true);

let player = new Player(levels[0].x, levels[0].y - 50);

new InputHandler(player, canvas);

// YES, these global vars are needed.
let currLevel = 0;
let nextLevel = 1;
let currPoint = levels[currLevel];  // eg: {x: canvas.width / 2, y: canvas.height - 100...}
let nextPoint = levels[nextLevel];  

// what's this? path property of point object (up, right, etc):
let potential = levels[currLevel].path;

// this updates the current and next point (run only after player reaches next point)
function cremate() {
    // increment level vars:
    // PROBLEM FOUND: this gets incremented INDEFINITELY:
    currLevel += 1, nextLevel += 1;     // currLevel = 1, nextLevel = 2

    currPoint = levels[currLevel];

    // if levels[currLevel + 1] exists, set it to so. Otherwise, no incrementing.
    nextPoint = levels[nextLevel] ? levels[nextLevel] : levels[currLevel];

    // HERE'S WHERE POTENTIAL'S UPDATED:
    potential = levels[currLevel].path  // ex: up, down, right

    // what we doing? setting all of them to false except the current potential move:
    // by this point currPoint SHOULD be updated
    for (const dir of Object.keys(player.directions)) {
        // actual value: player.directions[dir]
        // how we get current true?

        // maybe should use ternary
        if (dir == potential) player.directions[dir] = true;
        else player.directions[dir] = false;
    }
}

// doesn't change when player.y changes
// this simply checks if player is at a point:
function atPoint(playa, point) {
   // I could use range() on the points
    return playa.x === point.x && playa.y + playa.height === point.y;
    // return (point.x <= playa.x + 5 && point.x >= playa.x) && 
    //        (point.y <= playa.y + 5 && point.y >= playa.y)
};

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
    drawPaths();
    handleState();

    // console.log(currLevel, potential);
    // console.log(currLevel, nextLevel);

    // console.log("playerCoords:", player.x, player.y, "nextCoords:", nextPoint.x, nextPoint.y);
    console.log(potential, player.pressed);

    window.requestAnimationFrame(animate);
}

animate();