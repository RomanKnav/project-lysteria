export default class Button extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height, text, onClick) {
        super(scene, x, y);

        // Create the button graphic
        this.graphics = scene.add.graphics();
        this.graphics.fillStyle(0x808080, 1); // gray color
        this.graphics.fillRect(-width / 2, -height / 2, width, height);

        // Create the button text
        // wtf are those buttons relative to?
        this.buttonText = scene.add.text(0, 0, text, {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Add the graphics and text to the container
        this.add(this.graphics);
        this.add(this.buttonText);

        // Make the button interactive
        this.setSize(width, height);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);

        // Add event listeners
        this.on('pointerover', () => {
            this.graphics.clear();
            this.graphics.fillStyle(0x999999, 1); // lighter gray on hover
            this.graphics.fillRect(-width / 2, -height / 2, width, height);
        });

        this.on('pointerout', () => {
            this.graphics.clear();
            this.graphics.fillStyle(0x808080, 1); // gray color
            this.graphics.fillRect(-width / 2, -height / 2, width, height);
        });

        this.on('pointerdown', onClick);

        // Add this container to the scene
        scene.add.existing(this);
    }
}
