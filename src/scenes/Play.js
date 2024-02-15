class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding, this.p1Score, scoreConfig);
        this.scoreLeft.setDepth(1);
        this.village = this.add.tileSprite(0, 0, w, h, 'village').setOrigin(0, 0);

        this.arrowSpeed = -150;
        this.arrowSpeedMax = -500;
        this.villagerSpeed = -100;
        this.villagerSpeedMax = -400;
        level = 0;

        this.bgm = this.sound.add('Village Music', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        this.bgm.play();
        
        dragon = this.physics.add.sprite(32, centerY, 'sprite', 'sprite4').setOrigin(0.5);
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNames('sprite', {
                start: 4,
                end: 6,
                zeroPad: 0,
                prefix: 'sprite',
            }),
            frameRate: 10,
            repeat: -1
        });
        dragon.play('fly');

        dragon.setCollideWorldBounds(true);
        dragon.setImmovable();
        dragon.setMaxVelocity(0, 600);
        dragon.setDragY(1000);
        dragon.setDepth(1);
        dragon.destroyed = false;
        
        this.arrowGroup = this.add.group({
            runChildUpdate: true
        });

        this.time.delayedCall(2500, () => { 
            this.addarrow(); 
        });
        
        this.villagerGroup = this.add.group({
            runChildUpdate: true
        });

        this.time.delayedCall(3500, () => { 
            this.addVillager(); 
        });

        this.time.addEvent({
            delay: 2000,
            callback: this.addVillager,
            callbackScope: this,
            loop: true
        });

        this.difficultyTimer = this.time.addEvent({
            delay: 15000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        });

        cursors = this.input.keyboard.createCursorKeys();
    }

    addarrow() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let arrow = new Arrow(this, this.arrowSpeed - speedVariance);
        this.arrowGroup.add(arrow);
    }

    addVillager() {
        let velocity = -200;
        let villager = new Villager(this, velocity);
        
        this.villagerGroup.add(villager);
    }

    update() {
        this.village.tilePositionX += 4;

        if(!dragon.destroyed) {
            let pointer = this.input.activePointer;

            dragon.x = Phaser.Math.Clamp(pointer.x, dragon.width / 2, game.config.width - dragon.width / 2);
            dragon.y = Phaser.Math.Clamp(pointer.y, dragon.height / 2, game.config.height - dragon.height / 2);

            this.physics.world.collide(dragon, this.arrowGroup, this.dragonCollision, null, this);

            this.physics.world.collide(dragon, this.villagerGroup, this.dragonCollisionVillager, null, this);
        }
    }

    levelBump() {
        if(this.arrowSpeed >= this.arrowSpeedMax) {
            this.arrowSpeed -= 75;
            this.bgm.rate += 0.01;
        }

        if(this.villagerSpeed >= this.villagerSpeedMax) {
            this.villagerSpeed -= 75;
        }

        this.sound.play('Horn', { volume: 1 });
        
    }

    dragonCollision() {
        dragon.destroyed = true;
        this.difficultyTimer.destroy();
        this.sound.play('death', { volume: 1 });
        
        this.tweens.add({
            targets: this.bgm,
            volume: 0,
            ease: 'Linear',
            duration: 2000,
        });

        dragon.destroy();    

        this.time.delayedCall(4000, () => { this.scene.start('gameOverScene'); });
    }

    dragonCollisionVillager(dragon, villager) {
        villager.destroy();
        this.sound.play('villager death', { volume: 0.25 });
        this.p1Score += 1;
        this.scoreLeft.setText(this.p1Score);
        level++;
    }
}