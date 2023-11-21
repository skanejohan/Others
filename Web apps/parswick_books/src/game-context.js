createGameContext = (dimensions, canvas) => {
    let _mouse = createMouse(dimensions, canvas);
    let _drawContext = createDrawContext(dimensions, canvas);
    let _location = fictionSection;
    let _message = createMessage();
    let _inventory = createInventory();
    let _combinationLock = createCombinationLock();

    // TODO create, and include as functions in return value
    office.initialize();
    historySection.initialize();
    artAndArchitectureSection.initialize();
    travelAndLanguageSection.initialize();
    fictionSection.initialize();
    kitchen.initialize();
    bathroom.initialize();

    return {
        mouse: () => _mouse,
        location: () => _location,
        setLocation: l => _location = l,
        combinationLock: () => _combinationLock,
        drawContext: () => _drawContext,
        inventory: () => _inventory,
        message: () => _message
    }
}

