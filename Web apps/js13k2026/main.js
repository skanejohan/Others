const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var lastTime = Date.now();
let gameLoop = () => {
    let now = Date.now();
    let dt = (now - lastTime);
    update(dt);
    render(canvas.width, canvas.height);
    requestAnimationFrame(gameLoop);
    lastTime = now;
}

setTimeout(() => {
    gameLoop();
}, 100);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas, false);

resizeCanvas();
