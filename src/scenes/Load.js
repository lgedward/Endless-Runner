class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        this.load.path = './assets/';
        this.load.atlas('sprite', 'img/dragon.png', 'sprite.json');

        // load graphics assets
        this.load.image('village', 'img/medieval village.jpg');
        this.load.image('arrow', 'img/arrow.png');
        this.load.image('villager', 'img/Villager.png');

        // load audio assets
        this.load.audio('villager death', ['audio/Death Sound.mp3']);
        this.load.audio('Village Music', ['audio/Village Music.mp3']);
        this.load.audio('death', ['audio/Dragon Dying.mp3']);
        this.load.audio('Horn', ['audio/Horn.mp3']);

        // load font
        this.load.bitmapFont('gem', 'font/gem.png', 'font/gem.xml');
    }

    create() {
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }
        this.scene.start('titleScene');
    }
}