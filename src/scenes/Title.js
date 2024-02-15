class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        this.add.bitmapText(centerX, centerY, 'gem', 'Dragon Run', 64).setOrigin(0.5).setTint(0xff0000); 
        this.add.bitmapText(centerX, centerY + textSpacer, 'gem', 'Use your cursor to dodge arrows and grab villagers', 24).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + textSpacer*3, 'gem', 'Press UP ARROW to Start', 36).setOrigin(0.5);
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {            
            this.scene.start('playScene');
        }
    }
}