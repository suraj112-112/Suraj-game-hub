const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

// Game variables
let ship;
let bullets = [];
let enemies = [];
let score = 0;
let gameOver = false;

// Event listeners for controls
window.addEventListener("keydown", keyDownHandler);
window.addEventListener("keyup", keyUpHandler);

// Create spaceship object
class Ship {
    constructor() {
        this.width = 40;
        this.height = 20;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 20;
        this.speed = 5;
        this.movingLeft = false;
        this.movingRight = false;
    }

    draw() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        if (this.movingLeft && this.x > 0) {
            this.x -= this.speed;
        }
        if (this.movingRight && this.x + this.width < canvas.width) {
            this.x += this.speed;
        }
    }
}

// Create bullet object
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 10;
        this.speed = 7;
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.y -= this.speed;
    }

    outOfBounds() {
        return this.y < 0;
    }
}

// Create enemy object
class Enemy {
    constructor(x, y) {
        this.width = 40;
        this.height = 20;
        this.x = x;
        this.y = y;
        this.speed = 2;
    }

    draw() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.y += this.speed;
    }

    outOfBounds() {
        return this.y > canvas.height;
    }
}

// Functions for controls
function keyDownHandler(e) {
    if (e.key === "ArrowLeft") {
        ship.movingLeft = true;
    }
    if (e.key === "ArrowRight") {
        ship.movingRight = true;
    }
    if (e.key === " ") {
        bullets.push(new Bullet(ship.x + ship.width / 2 - 2.5, ship.y));
    }
}

function keyUpHandler(e) {
    if (e.key === "ArrowLeft") {
        ship.movingLeft = false;
    }
    if (e.key === "ArrowRight") {
        ship.movingRight = false;
    }
}

// Function to generate enemies at intervals
function spawnEnemy() {
    const x = Math.random() * (canvas.width - 40);
    enemies.push(new Enemy(x, 0));
}

function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move and draw ship
    ship.move();
    ship.draw();

    // Move and draw bullets
    bullets.forEach((bullet, index) => {
        bullet.move();
        bullet.draw();

        if (bullet.outOfBounds()) {
            bullets.splice(index, 1);
        }
    });

    // Move and draw enemies
    enemies.forEach((enemy, index) => {
        enemy.move();
        enemy.draw();

        if (enemy.outOfBounds()) {
            gameOver = true;
        }

        // Collision detection between bullets and enemies
        bullets.forEach((bullet, bIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                enemies.splice(index, 1);
                bullets.splice(bIndex, 1);
                score += 10;
            }
        });
    });

    // Display score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    if (!gameOver) {
        requestAnimationFrame(update);
    } else {
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
    }
}

function startGame() {
    ship = new Ship();
    setInterval(spawnEnemy, 1000); // Spawn an enemy every second
    update();
}

startGame();
