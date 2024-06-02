import Player from '/src/player.js';
import InputHandler from '/src/inputHandler.js';
import Button from '/src/button.js';    

// Should I make a map object?
// draw a square for the player. Lines for paths.
// forget images, focus on getting map logic done.
// make object (?) representing player. Don't think I need to make a class?

var canvas = document.getElementById('canvas1');
var cxt = canvas.getContext('2d');

var ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let state = "START";    // should jump to GAME state

// x, y, width, text, clickable
// looks TINY!
let startButt = new Button(canvas.width / 2, canvas.height / 3, 60, "Start", true);
startButt.draw(cxt);

let player = new Player(canvas.width / 2, canvas.height / 2);
player.draw(cxt);

new InputHandler(player, canvas);

/* 
I can possibly implement a "pinpoint" system, maybe in a dict:
let points = {start: {x: 100, y: 100}, l1: {x: 100, y: 200}, l2: {x: 200, y: 300}}
*/

function animate() {
    // cxt.clearRect(0, 0, canvas.width, canvas.height);
    // cxt.fillStyle = "transparent";
    // cxt.fillRect(0, 0, canvas.width, canvas.height);

    console.log(player.direction);

    window.requestAnimationFrame(animate);
}

animate();

