/* this game will basically be TWO in one: one for moving around the map (easy), 
and the other for when in battles. Each will require a seperate control scheme */

export default class InputHandler {
    // in map, pass player as entity. 
    constructor(entity, canvas) {
        this.canvas = canvas;
        let keys = {"37": false, "38": false, "39": false, "40": false};

        // make function (?) that checks if given key is true in player.directions:

        let dirs = entity.directions;

        document.addEventListener("keydown", (event) => {
            keys[event.key] = true;

            switch (event.key) {
                // left
                case 'ArrowLeft':
                case 'a':
                    if (dirs['left']) entity.direction = 'left';
                    break;
                case 'ArrowUp':
                case 'w':
                    if (dirs['up']) entity.direction = 'up';
                    break;
                case 'ArrowRight':
                case 'd':
                    if (dirs['right']) entity.direction = 'right';
                    break;
                case 'ArrowDown':
                case 's':
                    if (dirs['down']) entity.direction = 'down';
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