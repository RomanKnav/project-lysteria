import Button from '../classes/button.js';

export default class StartScene extends Phaser.Scene {
	constructor ()
    {
    	// Sets the string name we can use to access this scene from other scenes
		super({key:'StartScene'});
    }

    init()
    {
    	console.log('StartScene Started');
    }

    preload()
    {
        this.cameras.main.setBackgroundColor(0x42484E);


        // this.interact_point = {x: this.start_image.x, y: this.start_image.y + (this.start_image.height/2) - 42};
    }

    create()
    {
        // how to center images again?
        this.start_image = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'smiley');

        const startButton = new Button(this, this.cameras.main.centerX, this.cameras.main.centerY, 200, 50, 'Start', () => {
            console.log('Start button clicked!');
            this.scene.start('MapScene');
        });
    }
}