let config = { 
    type: Phaser.CANVAS, 
    width: 640, 
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;


// Ball throw sound effect:     https://freesound.org/people/CosmicEmbers/sounds/160756/
// Dog bark sound effect:       https://freesound.org/people/apolloaiello/sounds/351876/
// Bird squawking sound effect: https://freesound.org/people/basedMedia/sounds/548105/

// Paul Lee
// Catch!
// 4/19/2021
// Took about 10 hours to complete the project

// Point Breakdown:
// 60 - Redesigned artwork, UI, and sounds to change theme
// 20 - New spaceship type that is smaller, faster, and worth more points
// 10 - New animated sprite for Spaceship enemies
// 10 - Implemented parallax scrolling
