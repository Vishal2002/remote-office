// game.js
class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    // Load assets
    preload() {
        // Player sprite
        this.load.spritesheet('player', 
            'https://labs.phaser.io/assets/sprites/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
        
        // Platform image
        this.load.image('platform', 
            'https://labs.phaser.io/assets/sprites/platform.png'
        );
        
        // Collectible star
        this.load.image('star', 
            'https://labs.phaser.io/assets/sprites/star.png'
        );
    }

    // Set up game objects
    create() {
        // Add background
        this.add.rectangle(400, 300, 800, 600, 0x87CEEB);

        // Create platforms group
        this.platforms = this.physics.add.staticGroup();
        
        // Create ground
        this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();
        
        // Create platforms
        this.platforms.create(600, 400, 'platform');
        this.platforms.create(50, 250, 'platform');
        this.platforms.create(750, 220, 'platform');

        // Create player
        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // Player animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Create stars
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        // Score
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { 
            fontSize: '32px', 
            fill: '#000' 
        });

        // Colliders
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        
        // Overlap check for collecting stars
        this.physics.add.overlap(
            this.player, 
            this.stars, 
            this.collectStar, 
            null, 
            this
        );

        // Input controls
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    // Game loop
    update() {
        // Handle player movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        // Handle jumping
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    // Collect star method
    collectStar(player, star) {
        star.disableBody(true, true);
        
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        // Respawn all stars when all are collected
        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate((child) => {
                child.enableBody(true, child.x, 0, true, true);
            });
        }
    }
}

// Game configuration
const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: MainScene
};

// Create game instance
const game = new Phaser.Game(config);