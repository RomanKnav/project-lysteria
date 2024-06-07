import Player from '/src/player.js';
import InputHandler from '/src/inputHandler.js';
import Button from '/src/button.js'; 

// var canvas = document.getElementById('canvas1');

export default class InputHandler {
    // I will have multiple "levels" dictionaries in script.js, each one representing a world
    constructor(levels, playar) {
        this.levels = levels

        this.currLevel = 0;
        this.nextLevel = 1;
        this.currPoint = this.levels[currLevel];  // eg: {x: canvas.width / 2, y: canvas.height - 100...}
        this.nextPoint = this.levels[nextLevel];
        this.potential = this.levels[currLevel].path;   
        
    }

    cremate() {
        this.currLevel += 1, this.nextLevel += 1;   
        this.currPoint = this.levels[this.currLevel];
        this.nextPoint = this.levels[this.nextLevel] ? this.levels[this.nextLevel] : this.levels[this.currLevel];
        this.potential = this.levels[this.currLevel].path 

        for (const dir of Object.keys(this.player.directions)) {
            if (dir == this.potential) this.player.directions[dir] = true;
            else this.player.directions[dir] = false;
        }
    }

    atPoint() {
         return this.playar.x === point.x && this.playar.y + this.playar.height === point.y;
     };
}