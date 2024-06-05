// this class rep.s player moving around level worlds

// NEED TO IMPORT CANVAS
var canvas = document.getElementById('canvas1');

export default class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.width = 50;
        this.height = 50;

        // this path to be changed by 'inputHandler.js'

        // lists POSSIBLE paths player can take at current point:
        this.directions = 
                {"null": false, "left": false, "up": true, "right": false, "down": false};

        /* on moving question: inputHandler should only register those that are TRUE */

        this.disabled = false; 

        // what's used for? Determine mouse coords and if it's clicked or not.
        this.mouse = {
            x: 10,
            y: 10,
            width: 0.1,
            height: 0.1,
            clicked: false
        };

        // MAP SHIT:
        // current direction key being pressed (can ONLY be any of the directions in this.directions)
        // this should ONLY change the true direction:
        this.direction = "null";    // this should turn to "up" after 1st keypress.
        this.atPoint = true;        // this can become false while player in motion.
        
        // this was created to stop player from moving on own.
        // not ONLY used for that, but also indicates when correct key was pressed 
        this.pressed = false;   

        // this could potentially be reseted after current level beaten.
        // as soon as button's pressed, this turns to false. When destination reached, true.
        // dont think it's necessary. Can just use if (player.direction == "null")
        this.moved = true; // false when moving. True again when certain coords reached.

        // player in motion when NOT within the boundaries of any two points.
        // this should turn TRUE after keypress.
        this.inMotion = false; 
    } 

    draw(context) {
        // REMEMBER: take preloading into consideration
        context.fillStyle = "yellow";
        context.fillRect(this.x, this.y, this.width, this.height);

        context.fillStyle = "black";
        // specifying font and size slightly improves text quality.
        context.font = "20px Times New Roman";  // You can change the font size and type here
        context.textAlign = "center";
        context.fillText("player", this.x + this.width / 2, this.y + this.height / 2);
    }

    update() {
        // different angle will have to be drawn as player faces different directions.

        // this ensures player doesn't move on own when starting Game state. 
        let trueKey = Object.keys(this.directions).find(key => this.directions[key] == true);
        // ^ this returns "up"
        if (this.direction == trueKey) this.pressed = true;

        // this disables all directions except "true" one in this.directions. this.pressed added
        if (!this.disabled && this.directions[this.direction] && this.pressed) {
            this.atPoint = false;
            switch(this.direction) {
                case "left":
                    if (this.x > 0) this.x -= 5;
                    break;
                case "up":
                    if (this.y > 0) this.y -= 5;
                    break;
                case "right":
                    if (this.x + this.height < canvas.width) this.x += 5;
                    break;
                case "down":
                    if (this.y + this.height < canvas.height) this.y += 5;
                    break;
            }
        }
    }
}