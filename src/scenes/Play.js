class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rocket', 'assets/ball.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('field-1', 'assets/field1.png');
        this.load.image('field-2', 'assets/field2.png');
        this.load.image('field-3', 'assets/field3.png');
        this.load.image('field-4', 'assets/field4.png');
        this.load.image('field-5', 'assets/field5.png');

        // load explosion spritesheet
        this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('dog', 'assets/Dog_Frames/spritesheet.png', {frameWidth: 62, frameHeight: 44, startFrame: 0, endFrame: 3});
        this.load.spritesheet('catch', 'assets/Dog_Frames/caught_sheet.png', {frameWidth: 62, frameHeight: 44, startFrame: 0, endFrame: 3});
    }

    create() {

        // starfield background
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // field background
        this.field1 = this.add.tileSprite(0, 0, 640, 480, 'field-1').setOrigin(0,0);
        this.field2 = this.add.tileSprite(0, 0, 640, 480, 'field-2').setOrigin(0,0);
        this.field3 = this.add.tileSprite(0, 0, 640, 480, 'field-3').setOrigin(0,0);
        this.field4 = this.add.tileSprite(0, 0, 640, 480, 'field-4').setOrigin(0,0);
        this.field5 = this.add.tileSprite(0, 0, 640, 480, 'field-5').setOrigin(0,0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'dog', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'dog', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'dog', 0, 10).setOrigin(0,0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first:0}),
            frameRate: 30
        });

        // animation config
        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNumbers('dog', { start: 0, end: 3, first:0}),
            repeat: -1,
            frameRate: 20
        });

        // animation config
        this.anims.create({
            key: 'caught',
            frames: this.anims.generateFrameNumbers('catch', { start: 0, end: 3, first:0}),
            repeat: 4,
            frameRate: 30
        });

        // Play Dog Walking Animation
        this.ship01.play('walking');
        this.ship02.play('walking');
        this.ship03.play('walking');

        // initalize score
        this.p1Score = 0;

        // display score
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
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        
        this.field1.tilePositionX -= 4;
        this.field2.tilePositionX -= 3.5;
        this.field3.tilePositionX -= 3;
        this.field4.tilePositionX -= 2.5;
        this.field5.tilePositionX -= 0.5;


        if (!this.gameOver) {
            this.p1Rocket.update();  // update rocket sprite
            this.ship01.update();    // update spaceship x3
            this.ship02.update();
            this.ship03.update();
        }


        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }
    
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        //temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'catch').setOrigin(0, 0);
        boom.anims.play('caught');              // play explode animation
        boom.on('animationcomplete', () => {     // callback after anim completes
            ship.reset();                        // reset ship position
            ship.alpha = 1;                      // make ship visible again
            boom.destroy();                      // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion', {volume: 0.5});
    }
}