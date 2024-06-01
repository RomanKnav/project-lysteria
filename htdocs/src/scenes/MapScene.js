import Button from '../classes/button.js';

export default class MapScene extends Phaser.Scene {
	constructor ()
    {
    	// Sets the string name we can use to access this scene from other scenes
		super({key:'MapScene'});
    }

    init()
    {
    	console.log('MapScene Started');
    }

    preload()
    {
        this.cameras.main.setBackgroundColor(0x0000);


        // this.interact_point = {x: this.start_image.x, y: this.start_image.y + (this.start_image.height/2) - 42};
    }

    create()
    {
        // here is where I draw the map.
    }
}