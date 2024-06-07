// ALL CANVASES WILL BE DECLARED IN MAIN SCRIPT (makes easy to keep track of them all)

export default class Map {
    // I will have multiple "levels" dictionaries in script.js, each one representing a world
    // NOTE: each "levels" object represents ONE world
    // so, each Map object reps one WORLD.

    // with "player" arg, I can just use the same Player instance in script.js
    constructor(levels, player) {
        this.levels = levels
        this.player = player

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
    };

    atPoint() {
         return this.player.x === point.x && this.player.y + this.player.height === point.y;
     };

    // funcs to actually draw map:
    drawLine(context, x1, y1, x2, y2) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.strokeStyle = 'black';
        context.lineWidth = 10;
        context.stroke();
    }
    
    drawPaths() {
        for (let i = 0; i < Object.keys(levels).length - 1; i++) {
            let x1 = levels[i].x;
            let y1 = levels[i].y;
            let x2 = levels[i + 1].x;
            let y2 = levels[i + 1].y;
    
            drawLine(x1, y1, x2, y2);
        }
    }
}