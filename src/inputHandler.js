/* this game will basically be TWO in one: one for moving around the map (easy), 
and the other for when in battles. Each will require a seperate control scheme */

export default class InputHandler {
    // in map, pass player as entity. 
    constructor(entity, canvas) {
        this.canvas = canvas;
        let keys = {"37": false, "37": false, "37": false, "37": false};

        document.addEventListener("keydown", (event) => {
            keys[event.key] = true;

            switch (event.key) {
                // left
                case '37':
                    entity.direction = 'left';
                    break;
                case '38':
                    entity.direction = 'up';
                    break;
                case '39':
                    entity.direction = 'right';
                    break;
                case '40':
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
    }
}