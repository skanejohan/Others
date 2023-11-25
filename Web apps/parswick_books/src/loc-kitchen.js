createKitchen = () => {
    let exits = [];
    let objects = createObjectList();
    let manager = createLocationManager(loadImage("loc-kitchen"), objects, exits);

    let initialize = () => {
        objects.add(closedCupboard); 
        objects.add(sink);
        objects.add(waterCooker);
        objects.add(tap);
        objects.add(chair);
        objects.add(broomCupboard);
        objects.add(table);
        objects.add(fridge);

        exits.push( { rect: { left: 160, top: 30, width: 20, height: 50 }, leadsTo: GameContext.fictionSection() } );
        exits.push( { rect: Constants.bottomExitRect, leadsTo: GameContext.bathroom() } );
    }

    let update = () => {
        manager.update();
        
        if (GameContext.mouse().isClicked()) {
            var o = manager.hoveredObject();
            
            if (o == closedCupboard) {
                objects.replace(o, openCupboard);
                objects.add(cup);
                GameContext.message().setMessage("You open the cupboard.", 2000);
            }

            if (o == cup) {
                GameContext.inventory().add(o);
                objects.replace(o, key);
                GameContext.message().setMessage("When you take the cup, a small key becomes visible.", 2000);
            }
            if (o == key) {
                GameContext.inventory().add(o);
                objects.remove(o);
            }
        }
    }

    let cup = {
        rect: { left: 220, top: 20, width: 10, height: 10 }, image: loadImage("itm-cup"), 
        description: 
            "The cup is white and has the text \"Hotel del Sol, Tenerife\" written on it. As far as you can remember, " +
            "you have never been to Tenerife."
    }

    let key = {
        rect: { left: 220, top: 20, width: 10, height: 10 }, image: loadImage("itm-office-door-key"), 
        description: "This is the key to the office."
    }

    let closedCupboard = {
        rect: { left: 218, top: 13, width: 40, height: 25 }, 
        description: "A plain white cupboard, typical for a kitchen that has been decorated with economy in mind."
    }

    let openCupboard = {
        rect: { left: 208, top: 13, width: 60, height: 25 }, 
        description: "The cupboard is open. And almost empty."
    }

    let sink = {
        rect: { left: 200, top: 45, width: 70, height: 35 }, 
        description:  
            "The stainless steel sink has a strange coloration at one end. You have a faint memory of pouring some kind " + 
            "of paint into it at an early age."
    }

    let tap = {
        rect: { left: 240, top: 40, width: 16, height: 16 }, 
        description: "The tap provides cold water only."
    }

    let waterCooker = {
        rect: { left: 210, top: 50, width: 16, height: 16 }, 
        description: "A small water cooker, mysteriously stained."
    }

    let chair = {
        rect: { left: 95, top: 70, width: 10, height: 10 }, 
        description: "The chair looks uncomfortable and, having used it on many occasions, you know it is."
    }

    let table = {
        rect: { left: 70, top: 60, width: 20, height: 20 }, 
        description: 
            "This table's worn surface is covered by the doodles that you placed there in your childhood, while spending " + 
            "many long hours waiting for your parents to finish their business."
    }

    let broomCupboard = {
        rect: { left: 110, top: 20, width: 30, height: 60 }, 
        description: "A plain white door. Behind it, you know you will find a lot of cleaning utensils. Nothing that feels remotely interesting."
    }

    let fridge = {
        rect: { left: 30, top: 50, width: 30, height: 30 }, 
        description:
            "The white fridge is humming slightly. Once in a while it makes a strange coughing noise. You take a peek inside. " +
            "It is empty, as expected."
    }

    return {
        initialize: initialize,
        getName: () => "kitchen",
        update: () => update(),
        render: () => manager.render(),
        key: () => key
    }
}