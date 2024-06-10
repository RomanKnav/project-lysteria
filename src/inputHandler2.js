export default class InputHandler {
  constructor(entity, canvas) {
    this.canvas = canvas;  

    // MUST TRY: use entity.directions. This dictates which direction player can go to next.

    // this.moveLocked = (dir) => {
    //     if (!entity.inMotion) entity.direction = dir;
    // };

    // the whole point of having this dictionary is to make it possible to have 
    // multiple key presses:
    this.keys = {"w": false, "a": false, "s": false, "d": false};

    console.log(JSON.stringify(this.keys));

    this.dirs = entity.directions;

    // ONCE PLAYER IS IN MOTION, DIRECTION CAN"T BE CHANGED -good
    // WTF IS SETTING INMOTION TO TRUE???
    
    document.addEventListener("keydown", (event) => {    
        if (!entity.disabled && !entity.inMotion) {
            // event.key represents ANY key press.
            // prevents other keys from being added to the dict:
            if (event.key in Object.keys(this.keys)) this.keys[event.key] = true;

            entity.moved = true;

            console.log(JSON.stringify(this.keys));
    
            /* direction should only be changed if the direction to change to is player.trueKey,
            or currMap.path */
             switch (event.key) { 
                case "w":
                    // if (event.key == potential)
                    if (this.dirs["up"]) entity.direction = "up";
                    break;

                case "a":
                    if (this.dirs["left"]) entity.direction = "left";
                    break;

                case "s":
                    if (this.dirs["down"]) entity.direction = "down";      
                    break;

                case "d":
                    if (this.dirs["right"]) entity.direction = "right";
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
        this.keys[event.key] = false;
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
