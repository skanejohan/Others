createHistorySection = () => {
    let exits = [];
    let objects = createObjectList();
    let manager = createLocationManager(loadImage("loc-history-section"), objects, exits);

    let initialize = () => {
        objects.add(keyhole);
        objects.add({ rect: { left: 20, top: 13, width: 41, height: 67 }, description: shelfDescription });
        exits.push({ rect: { left: 80, top: 20, width: 20, height: 70 }, leadsTo: GameContext.artAndArchitectureSection() });
    }

    let update = () => {
        manager.update();
        if (GameContext.mouse().isClicked()) {
            var o = manager.hoveredObject();
            if (o == keyhole) {
                if (GameContext.inventory().activeItem() == GameContext.kitchen().key()) {
                    objects.remove(o);
                    GameContext.inventory().remove(GameContext.kitchen().key());
                    GameContext.message().setMessage("You unlock the door to your office.", 2000);
                    exits.push({ rect: Constants.bottomExitRect, leadsTo: GameContext.office() });
                }
            }
        }
    }

    let keyhole = {
        rect: Constants.bottomExitRect, image: loadImage("itm-keyhole"), description: "The door to your office is locked."
    };

    let shelfDescription =                     
        "This shelf is filled with books. World War II, Christopher Columbus and the French Revolution. Operation Desert Storm, ancient Greece and Titanic. " + 
        "Creative chaos in this shelf, as well as in the rest of the shop.";

    return {
        initialize: initialize,
        getName: () => "\"History\" section",
        update: () => update(),
        render: () => manager.render(),
    }
}