const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;

const bird = {
    x: 50,
    y: canvas.height / 2,
    radius: 20,
    gravity: 0.5,
    velocity: 0,
    jump: -8, // Adjusting jump height
    alive: false,
    draw: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ff5733';
        ctx.fill();
        ctx.closePath();
    },
    update: function () {
        if (this.alive) {
            this.velocity += this.gravity;
            this.y += this.velocity;
        }
    },
    flap: function () {
        if (this.alive) {
            this.velocity = this.jump;
        } else {
            this.alive = true; // Start the game on space press
            this.velocity = this.jump;
        }
    }
};

const obstacles = [];

function createObstacle() {
    const minHeight = 50;
    const maxHeight = canvas.height - 200;
    const gapHeight = Math.random() * (maxHeight - minHeight) + minHeight;
    const obstacle = {
        x: canvas.width,
        width: 50,
        gap: gapHeight,
        color: '#000',
        draw: function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, 0, this.width, this.gap);
            ctx.fillRect(this.x, this.gap + 150, this.width, canvas.height - this.gap - 150);
        },
        update: function () {
            this.x -= 2 + Math.floor(score / 10); // Increase speed based on score
            if (this.x + this.width < 0) {
                obstacles.shift(); // Remove obstacle from array if it goes off-screen
                score++; // Increment score when the obstacle is passed
            }
        }
    };
    obstacles.push(obstacle);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.draw();
    for (let obstacle of obstacles) {
        obstacle.draw();
    }
    // Display score
    ctx.font = '20px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText('Score: ' + score, 20, 30);
}

function update() {
    if (bird.alive) {
        bird.update();
        for (let obstacle of obstacles) {
            obstacle.update();
            if (
                bird.x + bird.radius > obstacle.x && bird.x - bird.radius < obstacle.x + obstacle.width &&
                (bird.y - bird.radius < obstacle.gap || bird.y + bird.radius > obstacle.gap + 150)
            ) {
                bird.alive = false;
                break;
            }
        }
    }
}

function gameLoop() {
    if (bird.alive) {
        draw();
        update();
        requestAnimationFrame(gameLoop);
    } else {
        // Display game over message and score
        ctx.font = '30px Arial';
        ctx.fillStyle = '#000';
        ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2 - 15);
        ctx.font = '20px Arial';
        ctx.fillText('Press Space to Restart', canvas.width / 2 - 110, canvas.height / 2 + 25);
        score = 0; // Reset score to 0
    }
}

function startGame() {
    bird.alive = true;
    bird.y = canvas.height / 2;
    bird.velocity = 0; // Reset bird's velocity
    obstacles.length = 0; // Clear obstacles array
    score = 0; // Reset score to 0
    gameLoop();
}

document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        if (bird.alive) {
            bird.flap();
        } else {
            startGame();
        }
    }
});

setInterval(createObstacle, 2000);
