const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

export const bird = {
    x: 50,
    y: canvas.height / 2,
    radius: 20,
    gravity: 0.5,
    velocity: 0,
    jump: -12,
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

export function startGameLoop() {
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bird.draw();
    }

    function update() {
        if (bird.alive) {
            bird.update();
        }
    }

    function gameLoop() {
        if (bird.alive) {
            draw();
            update();
            requestAnimationFrame(gameLoop);
        } else {
            ctx.font = '30px Arial';
            ctx.fillStyle = '#000';
            ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2 - 15);
            ctx.font = '20px Arial';
            ctx.fillText('Press Space to Restart', canvas.width / 2 - 110, canvas.height / 2 + 25);
        }
    }

    // Start the game when spacebar is pressed
    document.addEventListener('keydown', function (e) {
        if (!bird.alive && e.code === 'Space') {
            bird.flap();
            gameLoop();
        }
    });
}
