// this class rep.s player moving around level worlds

// NEED TO IMPORT CANVAS
var canvas = document.getElementById('canvas1');

export default class Player {
    constructor() {
        this.x;
        this.y;

        this.width = 50;
        this.height = 50;

        // this path to be changed by 'inputHandler.js'

        // lists POSSIBLE paths player can take at current point:
        this.directions = 
                {"null": false, "left": false, "up": false, "right": false, "down": false};

        // this.directions[this.direction].....example: false

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
        this.direction = "null";    // this should turn to "up" after 1st keypress.
        
        // this was created to stop player from moving on own.
        // not ONLY used for that, but also indicates when correct key was pressed 
        this.pressed = false;   

        // why's this initially set to true?
        this.moved = false; // false when moving. True again when certain coords reached.

        // player in motion when NOT within the boundaries of any two points.
        // this should turn TRUE after keypress.
        this.inMotion = false; 

        // this ensures player doesn't move on own when starting Game state. 

        // this doesn't work with script.js:
        // this.trueKey = Object.keys(this.directions).find(key => this.directions[key]);
        // ^ this returns "up"
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

        let trueKey = Object.keys(this.directions).find(key => this.directions[key]);
        // console.log(this.inMotion);  should NOT turn to true

        // player.direction == player.trueKey
        if (this.direction == trueKey) this.pressed = true;
        else this.pressed = false;

        // this disables all directions except "true" one in this.directions. this.pressed added
        // this.directions[this.direction]....example: 
        if (!this.disabled && this.directions[this.direction] && this.pressed) {
            switch(this.direction) {
                case "left":
                    if (this.x > 0) this.x -= 2;
                    break;
                case "up":
                    if (this.y > 0) this.y -= 2;
                    break;
                case "right":
                    if (this.x + this.height < canvas.width) this.x += 2;
                    break;
                case "down":
                    if (this.y + this.height < canvas.height) this.y += 2;
                    break;
            }
        }
    }
}