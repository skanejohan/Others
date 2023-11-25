createOffice = () => {
    let exits = [];
    let objects = createObjectList();
    let manager = createLocationManager(loadImage("loc-office"), objects, exits);

    let initialize = () => {
        objects.add(darkness);
        objects.add(lampSwitch);

        exits.push({ rect: { left: 114, top: 13, width: 20, height: 42 } , leadsTo: GameContext.historySection() });
    }

    let update = () => {
        manager.update();
        if (GameContext.mouse().isClicked()) {
            var o = manager.hoveredObject();
            if (o == lampSwitch && objects.has(darkness))
            {
                objects.replace(darkness, semiDarkness);
                objects.add(tableLampSwitch);
            }
            if (o == tableLampSwitch)
            {
                objects.remove(semiDarkness);
                objects.remove(tableLampSwitch);
                objects.add(cabinet);
                objects.add(desk);
                objects.add(safe);
                objects.add(gasBill);
                objects.add(deGaulleClipping);
                objects.add(phoneBill);
                objects.add(bennyHillClipping);
                objects.add(newspaperBill);
                objects.add(poundClipping);
                objects.add(drawer);
                    }
            if (o == drawer) {
                objects.remove(o);
                objects.addFirst(openDrawer);
                objects.addFirst(paperClip);
            }
            if (o == paperClip) {
                objects.remove(o);
                GameContext.inventory().add(o);
                openDrawer.description = "The drawer is empty.";
            }
            if (o == cabinet) {
                objects.remove(o);
                objects.addFirst(openCabinet);
                objects.addFirst(metalBox);
                objects.addFirst(magnifyingGlass);
                objects.addFirst(modelCar);
            }
            if (o == metalBox && GameContext.inventory().activeItem() == paperClip) {
                objects.remove(metalBox);
                GameContext.inventory().remove(paperClip);
                objects.addFirst(rockpick);
                objects.addFirst(stones);
                GameContext.message().setMessage("Using the paper clip, you manage to pick the lock. You remove its content.", 2000);
            }
            if (o == magnifyingGlass || o == rockpick || o == stones || o == modelCar || o == unknownBook) {
                objects.remove(o);
                GameContext.inventory().add(o);
            }
            if (o == safe) {
                GameContext.combinationLock().show(id.toString(), () => {
                    objects.remove(safe);
                    objects.add(openSafe);
                    objects.add(unknownBook);
                    GameContext.message().setMessage("You enter the correct code and open the safe.", 2000);
                }, () => {
                    GameContext.message().setMessage("If only you knew the code...", 2000);
                })
            }
        }
    }

    let darkness = { rect: Constants.fullLocationRect, image: loadImage("loc-office-dark"), isPassive: true }

    let semiDarkness = { rect: Constants.fullLocationRect, image: loadImage("loc-office-semidark"), isPassive: true }

    let lampSwitch = { rect: { left: 103, top: 26, width: 4, height: 8 } , image: loadImage("itm-lamp-switch"), description: "" }

    let tableLampSwitch = { rect: { left: 209, top: 35, width: 4, height: 7 } , description: "" }

    let cabinet = {
        rect: { left: 36, top: 11, width: 59, height: 54 }, description: "This old cabinet takes up a large portion of the wall."
    }

    let openCabinet = {
        rect: { left: 15, top: 22, width: 101, height: 57 }, isPassive: true, image: loadImage("itm-open-cabinet"), description: 
            "You remember a lot of this stuff from your childhood. Many a time have you intended to go through this stuff, keeping some of it " + 
            "and throwing away some. Likely, you would throw away most of it, which may be the reason why you haven't gotten around to the task."
    }

    let magnifyingGlass = {
        rect: { left: 67, top: 45, width: 20, height: 20 }, image: loadImage("itm-magnifying-glass"), inventoryImage: loadImage("itm-magnifying-glass-i"), description:
            "Your old magnifying glass. The thing you look at actually appears just a little bit bigger than it actually is. As you remember, it " + 
            "can also be used with insects in a rather harmful way. You feel a pang of guilt at the thought."
    }

    let metalBox = {
        rect: { left: 50, top: 27, width: 30, height: 15 }, image: loadImage("itm-metal-box"), description:
            "Some of the color has been scratched off this green metal box. You remember it vaguely, but exactly what is inside it eludes you. " + 
            "It is quite heavy and when you shake it carefully, it rattles. It has a simple lock, which at the moment seems locked."
    }

    let modelCar = {
        rect: { left: 44, top: 48, width: 20, height: 12 }, image: loadImage("itm-model-car"), inventoryImage: loadImage("itm-model-car-i"), description:
            "You remember playing with this car. It is green, and somebody once told you that it represents an Austin A30. You have no reason to doubt that."
    }

    let stones = {
        rect: { left: 47, top: 25, width: 17, height: 12 }, image: loadImage("itm-stones"), inventoryImage: loadImage("itm-stones-i"), description:
            "Your old stone collection. To be honest, you could probably go out to the square outside and pick these three rocks in just a few minutes. " + 
            "Come to think of it, that is probably exactly how they ended up in your possession."
    }

    let rockpick = {
        rect: { left: 575, top: 190, width: 40, height: 40 }, image: loadImage("itm-rock-pick"), description:
            "It looks rather like a hammer. If you were to describe it, that is probably the word you would use."
    }

    let desk = {
        rect: { left: 155, top: 45, width: 100, height: 25 }, description:
            "The mahogany desk is cluttered with papers, mostly bills and clippings from old magazines. Looking through the piles, you realise that you " + 
            "have never really cleaned out the desk after your father's death."
    }

    let gasBill = {
        rect: { left: 162, top: 51, width: 9, height: 10 }, description: "It seems that you owe the gas company pounds 19.32."
    }
    
    let deGaulleClipping = {
        rect: { left: 175, top: 49, width: 13, height: 8 }, description:
            "\"French president de Gaulle accuses the British government of lacking the necessary commitment to European integration\". " + 
            "In January of 1963. Well, well..."
    }

    let phoneBill = {
        rect: { left: 199, top: 48, width: 7, height: 7 }, description: "An old bill from the phone company, for pounds 26.53."
    }

    let bennyHillClipping = {
        rect: { left: 190, top: 55, width: 13, height: 8 }, description:
            "Who would have known that the \"Benny Hill Show\" was cancelled in 1989? You vividly remember your parents dislike of the show."
    }

    let newspaperBill = {
        rect: { left: 234, top: 53, width: 7, height: 7 }, description:
            "This unpaid bill of pounds 35 is most likely the reason why the morning paper hasn't appeared in a while"
    }

    let poundClipping = {
        rect: { left: 246, top: 53, width: 5, height: 8 }, description:
            "It seems like the pound hit a record high in December of 1957 and a record low in Febrary of 1985."
    }

    let drawer = {
        rect: { left: 229, top: 73, width: 16, height: 4 }, description: "The drawer is closed."
    }

    let openDrawer = {
        rect: { left: 227, top: 72, width: 20, height: 18 }, image: loadImage("itm-open-drawer"), isPassive: true
    }

    let paperClip = {
        rect: { left: 230, top: 74, width: 8, height: 8 }, image: loadImage("itm-paper-clip"), description: "It is a paper clip. Nothing more. Nothing less."
    }

    let safe = {
        rect: { left: 271, top: 24, width: 32, height: 46 }, description: 
            "The old safe is painted black. Its heavy steel door has golden details, and a sign saying \"Samuel Withers & Co. Ltd. West Bromwich\". " + 
            "It has a dial for entering the correct combination and a large handle for opening the door."
    }

    let openSafe = {
        rect: { left: 110, top: 80, width: 60, height: 60 }, description: "The old safe is painted black. Its heavy steel door is open."
    }

    let unknownBook = {
        rect: { left: 120, top: 90, width: 40, height: 40 }, image: loadImage("itm-unknown-book"), description:
            "The leather-bound old book is written in what you assume is latin. Although you may recognize a word here and there, you really have no way " + 
            "of telling what the book is about. You see a small map in one of the pages. You can't be sure but you have a slight feeling of recognition."
    }
    
    let houseHistoryBook = {
        rect: Constants.noRect, image: loadImage("itm-house-history-book"), description:
            "The leather-bound old book describes the history of the house in which the bookshop is located. Most of what is in the book you already know " + 
            "since your parents passed this information to you - whether as a child you wanted it or not - but you find a few nuggets of new information. " + 
            "The most interesting part is the fact that there used to be an entrance to a cellar from what is now the history section. Looking at the map, " + 
            "and reading the text surrounding it, you conclude that there must be a hidden entrance to the basement behind the eastern wall, currently covered " + 
            "by book shelves."
    }

    let id = (16 * (8 + 76 * 5) / 8) + 5 * 89 - 16 + 75 * 8 - 50 + 20 * 6 + 133 - 7 * 5 + 6;

    return {
        initialize: initialize,
        getName: () => "office",
        update: () => update(),
        render: () => manager.render(),
        unknownBook: () => unknownBook,
        houseHistoryBook: () => houseHistoryBook
    }
}