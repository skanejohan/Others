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
    combinationLock.initialize();
    office.initialize();
    historySection.initialize();
    artAndArchitectureSection.initialize();
    travelAndLanguageSection.initialize();
    fictionSection.initialize();
    kitchen.initialize();
    bathroom.initialize();

    var dimensions = createDimensions(320, 180, 4);
    Globals.mouse = createMouse(dimensions, canvas);
    Globals.drawContext = createDrawContext(dimensions, canvas);
    Globals.drawContext.drawDebugRectangles(true);

    Globals.location = fictionSection;
    
    Globals.inventory = createInventory();
    
    canvas.width = dimensions.width();
    canvas.height = dimensions.height();

    window.addEventListener('resize', () => {
        handleResize();
    });
    canvas.addEventListener('click', () => {
        gameContext.click();
    });

    handleResize();
    gameLoop();
}

handleResize = () => {
    canvas.style.marginTop = `${(window.innerHeight - canvas.height) / 2}px`;
    canvas.style.marginLeft = `${(window.innerWidth - canvas.width) / 2}px`;
}

window.addEventListener('load', () => initialize()); 