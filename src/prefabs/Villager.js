class Villager extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        super(scene, game.config.width + dragonWidth, Phaser.Math.Between(dragonHeight / 2, game.config.height - dragonHeight / 2), 'villager');
        this.parentScene = scene;
        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();
    }

    update() {
        this.avoidDragon();

        if (this.x < -this.width) {
            this.destroy();
        }
    }

    avoidDragon() {
        if (!dragon || dragon.destroyed) return;
    
        let moveDirection = 0;
        const safeDistance = 100;
    
        if (dragon.y < this.y && this.y - safeDistance < dragon.y) {
            moveDirection = 1;
        } else if (dragon.y > this.y && dragon.y - safeDistance > this.y) {
            moveDirection = -1;
        }

        let newY = this.y + moveDirection * 2;
        newY = Phaser.Math.Clamp(newY, 0, game.config.height - this.height);
    
        this.setY(newY);
    }
    
}
