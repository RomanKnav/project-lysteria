export default class InputHandler {
  constructor(entity, canvas) {
    this.canvas = canvas;   

    this.moveLocked = (dir) => {
        if (!entity.inMotion) entity.direction = dir;
    };
 
    let keys = {"w": false, "a": false, "s": false, "d": false};

    // ONCE PLAYER IS IN MOTION, DIRECTION CAN"T BE CHANGED:
    
    document.addEventListener("keydown", (event) => {    
        if (!entity.disabled && !entity.inMotion) {
            keys[event.key] = true;

            entity.moved = true;
    
             switch (event.key) { 
                case "w":
                    entity.direction = "up";
                    break;

                case "a":
                    entity.direction = "left";
                    break;

                case "s":
                    entity.direction = "down";           
                    break;

                case "d":
                    entity.direction = "right";
                    break;
            }
            
            // if (keys["d"] && keys["w"]) {
            //   if (entity.duck) entity.angle = "diagnal-duck";
            //   else entity.angle = "diagnal";
            // }
    
            // else if (keys["a"] && keys["s"]) entity.angle = "down-back";   
            // else if (keys["a"] && keys["w"]) entity.angle = "diagnal-back";
            // else if (keys["w"] && keys["s"]) entity.angle = "down-up";
        }
    });

    // the above variables should remain true after key-up.
    document.addEventListener("keyup", (event) => {
        // lmfao
    });

    
    document.addEventListener("mousedown", function () {
      entity.mouse.clicked = true;
    });
    document.addEventListener("mouseup", function () {
      entity.mouse.clicked = false;
    });
    
    
    let canvasPosition = this.canvas.getBoundingClientRect();
    this.canvas.addEventListener("mousemove", function (e) {
      entity.mouse.x = e.x - canvasPosition.left;
      entity.mouse.y = e.y - canvasPosition.top;
    });
    this.canvas.addEventListener("mouseleave", function () {
      entity.mouse.x = undefined;
      entity.mouse.y = undefined;
    });

    
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
