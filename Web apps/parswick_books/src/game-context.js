createGameContext = (dimensions, canvas) => {
    let _mouse = createMouse(dimensions, canvas);
    let _drawContext = createDrawContext(dimensions, canvas);
    let _message = createMessage();
    let _inventory = createInventory();
    let _combinationLock = createCombinationLock();

    let _office = createOffice();
    let _fictionSection = createFictionSection();
    let _historySection = createHistorySection();
    let _artAndArchitectureSection = createArtAndArchitectureSection();
    let _travelAndLanguageSection = createTravelAndLanguageSection();
    let _bathroom = createBathroom();
    let _kitchen = createKitchen();

    let _location = _fictionSection;

    let initialize = () => {
        _office.initialize();
        _fictionSection.initialize();
        _historySection.initialize();
        _artAndArchitectureSection.initialize();
        _travelAndLanguageSection.initialize();
        _bathroom.initialize();
        _kitchen.initialize();
    }

    return {
        initialize: initialize,

        mouse: () => _mouse,
        location: () => _location,
        setLocation: l => _location = l,
        combinationLock: () => _combinationLock,
        drawContext: () => _drawContext,
        inventory: () => _inventory,
        message: () => _message,

        office : () => _office,
        fictionSection: () => _fictionSection,
        historySection: () => _historySection,
        artAndArchitectureSection: () => _artAndArchitectureSection,
        travelAndLanguageSection: () => _travelAndLanguageSection,
        bathroom: () => _bathroom,
        kitchen: () => _kitchen,
    }
}

