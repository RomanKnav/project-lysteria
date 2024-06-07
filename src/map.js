// ALL CANVASES WILL BE DECLARED IN MAIN SCRIPT (makes easy to keep track of them all)

import Player from '/src/player.js';

export default class Map {
    // I will have multiple "levels" dictionaries in script.js, each one representing a world
    // NOTE: each "levels" object represents ONE world
    // so, each Map object reps one WORLD.

    // with "player" arg, I can just use the same Player instance in script.js
    constructor(levels) {
        this.levels = levels

        this.currLevel = 0;
        this.nextLevel = 1;
        this.currPoint = this.levels[this.currLevel];  // eg: {x: canvas.width / 2, y: canvas.height - 100...}
        this.nextPoint = this.levels[this.nextLevel];
        this.potential = this.levels[this.currLevel].path;   

        this.player = new Player(this.levels[this.currLevel].x, this.levels[this.currLevel].y);
    }

    cremate() {
        this.currLevel += 1, this.nextLevel += 1;       // increment levels
        this.currPoint = this.levels[this.currLevel];
        this.nextPoint = this.levels[this.nextLevel] ? this.levels[this.nextLevel] : this.levels[this.currLevel];
        this.potential = this.levels[this.currLevel].path 

        for (const dir of Object.keys(this.player.directions)) {
            if (dir == this.potential) this.player.directions[dir] = true;
            else this.player.directions[dir] = false;
        }
    };

    // simply used to check if player at a given point
    // Use arrow functions for class methods that do not need to bind "this":
    atPoint = (playa, point) => playa.x === point.x && playa.y + playa.height === point.y;

    drawPaths(context) {
        for (let i = 0; i < Object.keys(this.levels).length - 1; i++) {
            let x1 = this.levels[i].x;
            let y1 = this.levels[i].y;
            let x2 = this.levels[i + 1].x;
            let y2 = this.levels[i + 1].y;
    
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.strokeStyle = 'black';
            context.lineWidth = 10;
            context.stroke();
        }
    }

    // THIS REQUIRES CONTEXT TOO:
    handlePlayer(context) {
        this.player.draw(context);
        this.player.update();
    
        // when player NOT AT either points, inMotion is true. 
        if (!this.atPoint(this.player, this.currPoint) && !this.atPoint(this.player, this.nextPoint)) {
            this.player.inMotion = true;
        } 
        else {
            this.player.inMotion = false;
            this.currPoint.reached = true;
        };
    
        // PLAYER REACHED NEXTPOINT; time to increment shit:
        if (!this.player.inMotion && this.player.moved) {
            this.player.direction = "null";
            this.player.pressed = false;
            
            // cremate shit (MUST HAPPEN ONLY ONCE)
            if (this.player.moved) {
                // currLevel += 1, nextLevel += 1;
                this.cremate();
                this.player.moved = false;
            }
        }
    
        // this.player has reached current point (all are initially false)
        // think I should put this one and one above together       --TODO HERE
        if (this.player.direction == "null") this.currPoint.reached = true;
    }
}