/* this game will basically be TWO in one: one for moving around the map (easy), 
and the other for when in battles. Each will require a seperate control scheme */

export default class InputHandler {
    // in map, pass player as entity. 
    constructor(entity, canvas) {
        this.canvas = canvas;

        // make function (?) that checks if given key is true in player.directions:

        this.dirs = entity.directions;

        // keys: the actual keypresses. Values: direction for player to move.
        const keyDirectionMap = {
            'ArrowLeft': 'left',
            'a': 'left',
            'ArrowUp': 'up',
            'w': 'up',
            'ArrowRight': 'right',
            'd': 'right',
            'ArrowDown': 'down',
            's': 'down'
        };

        document.addEventListener("keydown", (event) => {

            let direction = keyDirectionMap[event.key];
            console.log(direction);
            /* direction is simply a pressed key. If it's in the map, return its value. 
            Otherwise, its undefined */

            // if direction exists in map and it's value in player.directions is true...
            // note that this runs ONLY if a key is pressed down
            if (direction && this.dirs[direction] && !entity.disabled) {
                entity.direction = direction;
                entity.moved = true;        // maybe set timer to reset?
            }
        });

        // the above variables should remain true after key-up.
        document.addEventListener("keyup", (event) => {
            if (!entity.dead) { 
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

        // TOUCH INPUT:
        this.canvas.addEventListener("touchstart", function (e) {
            entity.mouse.clicked = true;
            let touch = e.touches[0];
            entity.mouse.x = touch.clientX - canvasPosition.left;
            entity.mouse.y = touch.clientY - canvasPosition.top;
        });
        this.canvas.addEventListener("touchend", function () {
            entity.mouse.clicked = false;
            entity.mouse.x = undefined;
            entity.mouse.y = undefined;
        });
    }
}