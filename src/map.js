// ALL CANVASES WILL BE DECLARED IN MAIN SCRIPT (makes easy to keep track of them all)

import Player from '/src/player.js';

export default class Map {
    // I will have multiple "levels" dictionaries in script.js, each one representing a world
    // NOTE: each "levels" object represents ONE world
    // so, each Map object reps one WORLD.

    // with "player" arg, I can just use the same Player instance in script.js

    /* example argument......Map(worlds[worldNum], player):
    1:
    { 
        0: {x: canvas.width / 2, y: canvas.height - 100, path: 'up', reached: false}, 
        1: {x: canvas.width / 2, y: canvas.height - 400, path: 'right', reached: false},
        2: {x: canvas.width - 200, y: canvas.height - 400, path: 'down', reached: false},
        3: {x: canvas.width - 200, y: canvas.height - 300, path: 'end', reached: false},
    }

    */ 
    constructor(levels, player) {
        this.world = levels

        this.currLevel = 0;
        this.nextLevel = 1;
        this.currPoint = this.world[this.currLevel];  // eg: {x: canvas.width / 2, y: canvas.height - 100...}
        this.nextPoint = this.world[this.nextLevel];
        this.potential = this.world[this.currLevel].path;   

        // this.player = new Player(this.world[this.currLevel].x, this.world[this.currLevel].y);
        this.player = player;
        this.player.x = this.currLevel.x;
        this.player.y = this.currLevel.y;
    }

    cremate() {
        this.currLevel += 1, this.nextLevel += 1;       // increment levels
        this.currPoint = this.world[this.currLevel];
        this.nextPoint = this.world[this.nextLevel] ? this.world[this.nextLevel] : this.world[this.currLevel];
        this.potential = this.world[this.currLevel].path 

        // what this? setting all directions to false except the current potential move:
        // by this point currPoint SHOULD be updated
        for (const dir of Object.keys(this.player.directions)) {
            if (dir == this.potential) this.player.directions[dir] = true;
            else this.player.directions[dir] = false;
        }
    };

    // simply used to check if player at a given point
    // Use arrow functions for class methods that do not need to bind "this":
    atPoint = (playa, point) => playa.x === point.x && playa.y + playa.height === point.y;

    drawPaths(context) {
        for (let point = 0; point < Object.keys(this.world).length - 1; point++) {
            let x1 = this.world[point].x;
            let y1 = this.world[point].y;
            let x2 = this.world[point + 1].x;
            let y2 = this.world[point + 1].y;
    
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