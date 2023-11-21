createBathroom = () => {
    let exits = [];
    let objects = createObjectList();
    let manager = createLocationManager(loadImage("loc-bathroom"), objects, exits);

    let initialize = () => {
        objects.add({ rect: { left: 60, top: 60, width: 20, height: 20 }, description: "Well... let's just say that it does it's job." });
        objects.add({ rect: { left: 200, top: 70, width: 40, height: 20 }, description: "Old, stained and maybe not completely clean." });
        objects.add({ rect: { left: 243, top: 70, width: 3, height: 10 }, description: "You really ought to change the towel hanging next to the sink." });
        objects.add({ rect: { left: 210, top: 30, width: 30, height: 20 }, description:
            "You see a handsome figure in the mirror. At 45, you are satisfied with what you see. Your flowing red hair and strong arms are unmistakably " + 
            "celtic traits that your family has valued for centuries." });

        exits.push({ rect: { left: 160, top: 30, width: 20, height: 50 }, leadsTo: GameContext.kitchen() });
    }

     return {
        initialize: initialize,
        getName: () => "bathroom",
        update: () => manager.update(),
        render: () => manager.render(),
    }
}