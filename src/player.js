var canvas = document.getElementById('canvas1');

export default class Player {
    constructor() {
        this.x;
        this.y;

        this.width = 50;
        this.height = 50;

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
    } 

    draw(context) {
        
        context.fillStyle = "yellow";
        context.fillRect(this.x, this.y, this.width, this.height);

        context.fillStyle = "black";
        
        context.font = "20px Times New Roman";  
        context.textAlign = "center";
        context.fillText("player", this.x + this.width / 2, this.y + this.height / 2);
    }

    update() {
        let trueKey = Object.keys(this.directions).find(key => this.directions[key]);   
        if (this.direction == trueKey) this.pressed = true;
        else this.pressed = false;
           
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