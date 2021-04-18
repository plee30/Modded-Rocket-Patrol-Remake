// Bird prefab
class Bird extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed + 3;         // pixels per frame
    }

    update() {
        // move bird left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width - 500) {
            this.reset();
        }
    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}