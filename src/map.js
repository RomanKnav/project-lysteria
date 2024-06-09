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
    }

    cremate() {
        this.currLevel += 1, this.nextLevel += 1;       
        this.currPoint = this.world[this.currLevel];
        this.nextPoint = this.world[this.nextLevel] ? this.world[this.nextLevel] : this.world[this.currLevel];
        this.potential = this.world[this.currLevel].path 
    };

    nextPath() { 
        for (const dir of Object.keys(this.player.directions)) {
            if (dir == this.potential) this.player.directions[dir] = true;
            else this.player.directions[dir] = false;
        }
    }

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

    atPoint(playa, point) {
        if (Math.abs(playa.x - point.x) <= 1 && Math.abs(playa.y - point.y) <= 1) return true;
    }
    
    handlePlayer(context) {
        this.nextPath();
        this.player.draw(context);
        this.player.update();
        
        this.player.inMotion = !this.atPoint(this.player, this.currPoint) && 
                               !this.atPoint(this.player, this.nextPoint);

        if (this.player.inMotion) {
            this.currPoint.reached = false; 
        } else {
            this.currPoint.reached = true; 
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