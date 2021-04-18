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


// https://freesound.org/people/CosmicEmbers/sounds/160756/
// https://freesound.org/people/apolloaiello/sounds/351876/
// https://freesound.org/people/basedMedia/sounds/548105/
