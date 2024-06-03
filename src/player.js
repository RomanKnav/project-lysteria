// this class rep.s player moving around level worlds

export default class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.width = 50;
        this.height = 50;

        // this path to be changed by 'inputHandler.js'
        this.direction = "fukumean";

        // only 1 should be true at any time the player moves.
        this.directions = {"left": false, "up": false, "right": false, "down": false,};

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
        this.pos_path = "up";
        this.stop = true;
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

        // disabled during states other than map state
        if (!this.disabled && !this.stop) {
            switch(this.direction) {
                case "left":
                    this.x -= 5;
                    break;
                case "up":
                    this.y -= 5;
                    break;
                case "right":
                    this.x += 5;
                    break;
                case "down":
                    this.y += 5;
                    break;
                case "x":
                    this.y -= 5;
                    this.x -= 5;
                    break;
            }
        }
    }
}