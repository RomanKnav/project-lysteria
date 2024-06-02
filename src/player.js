// this class rep.s player moving around level worlds

export default class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.width = 50;
        this.height = 50;

        // this path to be changed by 'inputHandler.js'
        this.direction = "fukumean";

        this.diabled = false;

        // what's used for? Determine mouse coords and if it's clicked or not.
        this.mouse = {
            x: 10,
            y: 10,
            width: 0.1,
            height: 0.1,
            clicked: false
        };
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

    update(context) {
        // different angle will have to be drawn as player faces different directions.
    }
}