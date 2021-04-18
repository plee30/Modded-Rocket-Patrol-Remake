class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', 'assets/blip_select12.wav');
        this.load.audio('sfx_bark', 'assets/bark.wav');
        this.load.audio('sfx_ball', 'assets/throw.wav');
        this.load.audio('sfx_bird', 'assets/squawk.wav');


        this.load.image('menu', 'assets/menu.png');
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Verdana',
            fontSize: '24px',
            backgroundColor: '#F3AC5E',
            color: '#000000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            left: 5,
            right: 5
            },
            fixedWidth: 0
        }

        this.menu = this.add.tileSprite(0, 0, 640, 480, 'menu').setOrigin(0, 0);

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding + 150, 'CATCH!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 150, 'Use <--> arrows to move & (F) to throw', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFFFFF';
        menuConfig.color = '#000000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 150, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select', {volume: 0.1});
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select', {volume: 0.1});
          this.scene.start('playScene');    
        }
      }
}