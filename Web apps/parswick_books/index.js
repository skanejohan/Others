const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let lastTime = Date.now();

gameLoop = () => {
    let now = Date.now();
    let dt = (now - lastTime);
    gameContext.update(dt);
    gameContext.render();
    requestAnimationFrame(gameLoop);
    lastTime = now;
}

initialize = () => {
    historySection.initialize();
    artAndArchitectureSection.initialize();
    travelAndLanguageSection.initialize();
    fictionSection.initialize();
    kitchen.initialize();
    bathroom.initialize();

    canvas.width = 1920;
    canvas.height = 1080;
    window.addEventListener('resize', () => {
        handleResize();
    });
    canvas.addEventListener('click', () => {
        gameContext.click();
    });
    canvas.addEventListener("mousemove", e => {
        gameContext.mouseMove(e);
    });
    handleResize();
    gameLoop();
}

handleResize = () => {
    canvas.style.marginTop = `${(window.innerHeight - canvas.height) / 2}px`;
    canvas.style.marginLeft = `${(window.innerWidth - canvas.width) / 2}px`;
}

window.addEventListener('load', () => initialize()); 