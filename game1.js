// Game configuration
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var cursors;
var enemies;
var collectibles;
var score = 0;
var scoreText;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.image('collectible', 'assets/collectible.png');
}

function create() {
    // Background
    this.add.image(400, 300, 'background');

    // Player sprite
    player = this.physics.add.sprite(400, 500, 'player');
    player.setCollideWorldBounds(true);

    // Group of enemies
    enemies = this.physics.add.group({
        key: 'enemy',
        repeat: 5,
        setXY: { x: 12, y: 0, stepX: 150 }
    });

    enemies.children.iterate(function (enemy) {
        enemy.setVelocityY(100 + Math.random() * 100);
    });

    // Group of collectibles
    collectibles = this.physics.add.group({
        key: 'collectible',
        repeat: 3,
        setXY: { x: 50, y: 0, stepX: 200 }
    });

    // Score text
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

    // Player input control
    cursors = this.input.keyboard.createCursorKeys();

    // Collisions
    this.physics.add.collider(player, enemies, hitEnemy, null, this);
    this.physics.add.overlap(player, collectibles, collectItem, null, this);
}

function update() {
    // Player movement
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-160);
    } else if (cursors.down.isDown) {
        player.setVelocityY(160);
    } else {
        player.setVelocityY(0);
    }

    // Move enemies down
    enemies.children.iterate(function (enemy) {
        if (enemy.y > 600) {
            enemy.y = 0;
            enemy.x = Math.random() * 800;
        }
    });
}

function hitEnemy(player, enemy) {
    this.physics.pause();
    player.setTint(0xff0000);
    gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#fff' });
    gameOverText.setOrigin(0.5);
}

function collectItem(player, collectible) {
    collectible.disableBody(true, true);

    // Update score
    score += 10;
    scoreText.setText('Score: ' + score);
}
