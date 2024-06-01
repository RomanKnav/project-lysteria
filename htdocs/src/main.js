import InitScene from './scenes/InitScene.js';
import StartScene from './scenes/StartScene.js';
import MapScene from './scenes/MapScene.js';

const MainConfig = (() => {

    // Configuration object
    const config = {};

    // Class/file names of all our scenes
    config.scene_names = [
        InitScene,
        StartScene,
        MapScene
    ];

    function startGame() {
        config.game = new Phaser.Game({
            width: 854,
            height: 480,
            type: Phaser.AUTO,   // Render mode, could also be Phaser.CANVAS or Phaser.WEBGL
            scene: config.scene_names, // the code below will set this for us
			// this helps background appear less blurry
			render: {
				pixelArt: true, // Ensures pixel-perfect rendering for pixel art
				antialias: false, // Disables antialiasing for sharp images
			}
        });
    }

    startGame();

    return config;
})();

export default MainConfig;