createArtAndArchitectureSection = () => {
    let exits = [];
    let objects = createObjectList();
    let manager = createLocationManager(loadImage("loc-art-and-architecture-section"), objects, exits);

    let initialize = () => {
        objects.add({ rect: { left: 20, top: 13, width: 41, height: 67 }, description: shelfDescription });
        objects.add({ rect: { left: 100, top: 13, width: 41, height: 67 }, description: shelfDescription });
        objects.add({ rect: { left: 180, top: 13, width: 41, height: 67 }, description: shelfDescription });
        objects.add({ rect: { left: 260, top: 13, width: 41, height: 67 }, description: shelfDescription });

        exits.push({ rect: Constants.leftExitRect, leadsTo: GameContext.fictionSection() });
        exits.push({ rect: Constants.bottomExitRect, leadsTo: GameContext.historySection() });
    }

    let shelfDescription = "Many of the books in these shelves are of the \"coffee table book\" variety.";

    return {
        initialize: initialize,
        getName: () => "\"Art and Architecture\" section",
        update: () => manager.update(),
        render: () => manager.render(),
    }
}