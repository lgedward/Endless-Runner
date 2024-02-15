/*
Liam Edwards
Dragon Run
15 hours
Dragon Run is a side scroller in which you control the dragon with your cusor
and try to grab as many villagers as possible while avoiding the arrows.
You are awarded points, shown by the score board at the top left, and
will have to be more careful as the speed increases, indicated by the loud horn sound,
since the speed of the villagers and arrows increase.
I'm proud of the fact that I added a 'fear' factor into the villagers that make them
go up or down based on your position to better escape. The style of the game is also
something I'm proud of since the medieval aspect blends well with the gameplay.

NOTE:
I used PaddleParkoutP3 as a framework for the GameOver.js, Title.js, Load.js and a few features in Play.js such as the levelBump
but the game still differs greatly. I just wanted to use some of the ready made mechanics such as the storage saving for the score.

PS:
Remember to dodge the arrows! It's easy to forget when you're chasing the villagers
*/

'use strict';

let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Title, Play, GameOver ]
}

let game = new Phaser.Game(config);

let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
const textSpacer = 64;
let dragon = null;
const dragonWidth = 16;
const dragonHeight = 128 * 0.75;
const dragonVelocity = 150 * 0.75;
let level;
let highScore;
let newHighScore = false;
let cursors;

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;