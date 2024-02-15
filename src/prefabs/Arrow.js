class Arrow extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        super(scene, game.config.width + dragonWidth, Phaser.Math.Between(dragonHeight/2, game.config.height - dragonHeight/2), 'arrow'); 
        this.parentScene = scene;
        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();          
        this.newarrow = true;
        this.setScale(1.5);
        this.setTint(0xffffff);
    }

    update() {
        if(this.newarrow && this.x < centerX) {
            this.parentScene.addarrow(this.parent, this.velocity);
            this.newarrow = false;
        }

        if(this.x < -this.width) {
            this.destroy();
        }
    }
}