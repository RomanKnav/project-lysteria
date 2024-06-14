var canvas = document.getElementById('canvas1');    // used for setting movement boundaries

export default class Player {
    constructor() {
        this.x;
        this.y;

        this.width = 50;
        this.height = 50;

        // This dictates which direction player can go to next, right? YES
        this.directions = 
                {"null": false, "left": false, "up": false, "right": false, "down": false};

        this.disabled = false; 
        
        this.mouse = {
            x: 10,
            y: 10,
            width: 0.1,
            height: 0.1,
            clicked: false
        };

        this.direction = "null";       
        this.pressed = false;   
        this.moved = false; 
        this.inMotion = false; 

        // all values in this.directions are initially false. Set in update()
        this.trueKey;

        this.inRange = true;    
        // should be false when player exits current range defined by currMap.currRange().
        // if right key pressed, should invisible square disappear? No.
    } 

    draw(context) {
        
        context.fillStyle = "yellow";
        context.fillRect(this.x, this.y, this.width, this.height);

        context.fillStyle = "black";
        
        context.font = "20px Times New Roman";  
        context.textAlign = "center";
        context.fillText("player", this.x + this.width / 2, this.y + this.height / 2);
    }

    update(delta_time) {
        // finds value that is true in "directions": 
        // this.trueKey = Object.keys(this.directions).find(key => this.directions[key]);
        
        // I need to use this elsewhere, but I don't wanna have to recalculate every time.
        // must make into property:
        // let trueKey;
        let trueKey = Object.keys(this.directions).find(key => this.directions[key]);
        this.trueKey = trueKey;

        // if (this.direction == this.trueKey) this.pressed = true;
        if (this.direction == trueKey) this.pressed = true;
        else this.pressed = false;

        if (!this.disabled && this.directions[this.direction] && this.pressed) {
            switch(this.direction) {
                case "left":
                    // if (this.x > 0) this.x -= 2;
                    if (this.x > 0) this.x -= Math.floor(500 * delta_time);
                    break;
                case "up":
                    if (this.y > 0) this.y -= Math.floor(500 * delta_time);
                    break;
                case "right":
                    if (this.x + this.height < canvas.width) this.x += Math.floor(500 * delta_time);
                    break;
                case "down":
                    if (this.y + this.height < canvas.height) this.y += Math.floor(500 * delta_time);
                    break;
            }
        }
    }
}