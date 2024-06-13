export default class Map {
    constructor(levels, player) {
        this.world = levels

        this.currLevel = 0;
        this.nextLevel = 1;
        this.currPoint = this.world[this.currLevel];  
        this.nextPoint = this.world[this.nextLevel];
        this.potential = this.world[this.currLevel].path;        
        this.player = player;
        this.player.x = this.world[this.currLevel].x;
        this.player.y = this.world[this.currLevel].y;

        /* REMEMBER: currPoint/nextPoint are WHOLE ASS OBJECTS:
            0: {x: canvas.width / 2, y: canvas.height - 100, path: "up", reached: false}
        */

        // returns an array of range between two nums (inclusive):
        // if player x/y in this range, player.inRange remains true.
        // func to be used for both x/y:
        // actual x should be in middle of array:
        this.currRange = (start, stop) => Array.from({length: (stop - start) + 1}, (value, index) => start + index);
    };

    cremate() {
        this.currLevel += 1, this.nextLevel += 1;       
        this.currPoint = this.world[this.currLevel];
        this.nextPoint = this.world[this.nextLevel] ? this.world[this.nextLevel] : this.world[this.currLevel];
        this.potential = this.world[this.currLevel].path 
    };

    // simply sets the next possible path in the dictionary
    nextPath() { 
        for (const dir of Object.keys(this.player.directions)) {
            if (dir == this.potential) this.player.directions[dir] = true;
            else this.player.directions[dir] = false;
        }
    }

    drawPaths(context) {
        const points = Object.keys(this.world).length;
        for (let point = 0; point < points - 1; point++) {
            // each subdict is ONE line
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
            context.closePath();
        }
    }

    // return true if player is within the GIVEN point's range:
    // this is NOT perfect. Player sometimes stops before leaving point:
    // player SHOULD NOT stop moving while still within the boundaries of current point.
    atPoint(playa, point) {
        if (Math.abs(playa.x - point.x) <= 2 && Math.abs(playa.y - point.y) <= 2) {
            return true;
        } 
    }

    // determine if player is within the range of a point (square) 
    inRange() {

    }
    
    handlePlayer(context, delta_time) {
        this.nextPath();
        this.player.draw(context);
        this.player.update(delta_time);
        
        // HERE IS WHERE (ONLY PLACE) INMOTION IS SET TO TRUE:
        this.player.inMotion = !this.atPoint(this.player, this.currPoint) && 
                               !this.atPoint(this.player, this.nextPoint);

        if (this.player.inMotion) {
            this.currPoint.reached = false; 
        } else {
            this.currPoint.reached = true; 
            this.player.inMotion = false;
        }
        
        if (!this.player.inMotion && this.player.moved) {
            this.player.direction = "null";
            this.player.pressed = false;
                    
            if (this.player.moved) { 
                this.cremate();
                this.player.moved = false;
            }
        }
        
        if (this.player.direction == "null") this.currPoint.reached = true;
    }
}