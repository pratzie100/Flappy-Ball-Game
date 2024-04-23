const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

export const obstacles = [];

export function createObstacle() {
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
            this.x -= 2;
        }
    };
    obstacles.push(obstacle);

    function updateObstacles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < obstacles.length; i++) {
            obstacles[i].draw();
            obstacles[i].update();
        }
    }

    requestAnimationFrame(updateObstacles);
}
