// Should I make a map object?
// draw a square for the player. Lines for paths.

var canvas = document.getElementById("canvas1");

const canvas = document.getElementById('canvas1');

// Get the 2D drawing context
const context = canvas.getContext('2d');

context.fillStyle = 'blue';

let player = context.fillRect(canvas.width / 2, canvas.height / 2, 20, 20);

/* 
I can possibly implement a "pinpoint" system, maybe in a dict:
let points = {start: {x: 100, y: 100}, l1: {x: 100, y: 200}, l2: {x: 200, y: 300}}
*/
