startGame = canvas => {
    let lastTime = Date.now();

    let update = dt => {
        GameContext.combinationLock().update();
        GameContext.inventory().update();
        GameContext.location().update();
        GameContext.message().update(dt);
        if (GameContext.mouse().isClicked()) {
            GameContext.inventory().dropActiveItem();
            GameContext.mouse().setClicked(false);
        }
    }

    let render = () => {
        GameContext.drawContext().clear();
        GameContext.location().render();
        GameContext.message().render();
        GameContext.inventory().render();
        GameContext.combinationLock().render();
    }

    let gameLoop = () => {
        let now = Date.now();
        let dt = (now - lastTime);
        update(dt);
        render();
        requestAnimationFrame(gameLoop);
        lastTime = now;
    }

    let handleResize = () => {
        canvas.style.marginTop = `${(window.innerHeight - canvas.height) / 2}px`;
        canvas.style.marginLeft = `${(window.innerWidth - canvas.width) / 2}px`;
    }

    let initialize = () => {
        var dimensions = createDimensions(320, 180, 4);
        GameContext = createGameContext(dimensions, canvas);
        canvas.width = dimensions.width();
        canvas.height = dimensions.height();
        window.addEventListener('resize', () => {
            handleResize();
        });
        canvas.addEventListener('click', () => {
            GameContext.mouse().setClicked(true);
        });
        handleResize();
        gameLoop();
    }
    
    initialize();
}