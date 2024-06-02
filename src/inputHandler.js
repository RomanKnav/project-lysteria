/* this game will basically be TWO in one: one for moving around the map (easy), 
and the other for when in battles. Each will require a seperate control scheme */

export default class InputHandler {
    // in map, pass player as entity. 
    constructor(entity, canvas) {
        this.canvas = canvas;
        let keys = {"37": false, "38": false, "39": false, "40": false};

        document.addEventListener("keydown", (event) => {
            keys[event.key] = true;

            switch (event.key) {
                // left
                case '37':
                case 'a':
                    entity.direction = 'left';
                    break;
                case '38':
                case 'w':
                    entity.direction = 'up';
                    break;
                case '39':
                case 'd':
                    entity.direction = 'right';
                    break;
                case '40':
                case 's':
                    entity.direction = 'down';
                    break; 
            }
        });

        // the above variables should remain true after key-up.
        document.addEventListener("keyup", (event) => {
            if (!entity.dead) {
                // keys[event.key] = false;    
            }

        });

        // MOUSE INPUT: 
        document.addEventListener("mousedown", function () {
            entity.mouse.clicked = true;
        });
        document.addEventListener("mouseup", function () {
            entity.mouse.clicked = false;
        });
        
        // here is what actually reads the mouse's location:
        let canvasPosition = this.canvas.getBoundingClientRect();
        this.canvas.addEventListener("mousemove", function (e) {
            entity.mouse.x = e.x - canvasPosition.left;
            entity.mouse.y = e.y - canvasPosition.top;
        });
        this.canvas.addEventListener("mouseleave", function () {
            entity.mouse.x = undefined;
            entity.mouse.y = undefined;
        });
    }
}