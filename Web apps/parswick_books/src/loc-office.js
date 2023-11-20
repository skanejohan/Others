var office = {

    getName() {
        return "office";
    },

    image: loadImage("loc-office"),

    initialize() {
        this.exits = [];
        this.objects = createObjectList();
        this.manager = createLocationManager(loadImage("loc-office"), this.objects, this.exits);

        this.objects.add(this._cabinet);
        this.objects.add(this._desk);
        this.objects.add(this._safe);

        this.objects.add(this._gasBill);
        this.objects.add(this._deGaulleClipping);
        this.objects.add(this._phoneBill);
        this.objects.add(this._bennyHillClipping);
        this.objects.add(this._newspaperBill);
        this.objects.add(this._poundClipping);
        this.objects.add(this._drawer);

        this.exits.push({ rect: { left: 114, top: 13, width: 20, height: 42 } , leadsTo: historySection });
    },

    update() {
        this.manager.update();
        if (Globals.mouse.isClicked()) {
            var o = this.manager.hoveredObject();
            if (o == this._drawer) {
                this.objects.replace(o, this._openDrawer);
                this.objects.add(this._paperClip);
            }
            if (o == this._paperClip) {
                this.objects.remove(o);
                Globals.inventory.add(o);
                this._openDrawer.description = "The drawer is empty.";
            }
            if (o == this._cabinet) {
                this.objects.replace(o, this._openCabinet);
                this.objects.add(this._metalBox);
                this.objects.add(this._magnifyingGlass);
                this.objects.add(this._modelCar);
            }
            if (o == this._metalBox && Globals.inventory.activeItem() == this._paperClip) {
                this.objects.replace(this._metalBox, this._openMetalBox);
                Globals.inventory.remove(this._paperClip);
                this.objects.add(this._rockpick);
                this.objects.add(this._stones);
                gameContext.message = [ "Using the paper clip, you manage to pick the lock." ];
                gameContext.messageRemainingMs = 2000;
            }
            if (o == this._magnifyingGlass || o == this._rockpick || o == this._stones || o == this._modelCar || o == this._unknownBook) {
                this.objects.remove(o);
                Globals.inventory.add(o);
            }
            if (o == this._safe) {
                combinationLock.show(this._id.toString(), () => {
                    this.objects.remove(this._safe);
                    this.objects.add(this._openSafe);
                    this.objects.add(this._unknownBook);
                    gameContext.message = [ "You enter the correct code and open the safe." ];
                    gameContext.messageRemainingMs = 2000;
                }, () => {
                    gameContext.message = [ "If only you knew the code..." ];
                    gameContext.messageRemainingMs = 2000;
                })
            }
        }
    },

    render() {
        this.manager.render();
    },

    _cabinet: {
        rect: { left: 36, top: 11, width: 59, height: 54 }, description: "This old cabinet takes up a large portion of the wall."
    },

    _openCabinet: {
        rect: { left: 27, top: 11, width: 77, height: 54 }, description: 
            "You remember a lot of this stuff from your childhood. Many a time have you intended to go through this stuff, keeping some of it " + 
            "and throwing away some. Likely, you would throw away most of it, which may be the reason why you haven't gotten around to the task."
    },

    _magnifyingGlass: {
        rect: { left: 30, top: 15, width: 10, height: 10 }, image: loadImage("itm-magnifying-glass"), description:
            "Your old magnifying glass. The thing you look at actually appears just a little bit bigger than it actually is. As you remember, it " + 
            "can also be used with insects in a rather harmful way. You feel a pang of guilt at the thought."
    },

    _metalBox: {
        rect: { left: 50, top: 15, width: 10, height: 10 }, description:
            "Most of the color has been scratched off this once green metal box. You remember it vaguely, but exactly what is inside it eludes you. " + 
            "It is quite heavy and when you shake it carefully, it rattles. It has a simple lock, which at the moment seems locked."
    },

    _openMetalBox: {
        rect: { left: 50, top: 10, width: 10, height: 15 }, description:
            "The box contains your old rock collection. Not much of a collection really, a few small stones and your old rock pick."
    },

    _modelCar: {
        rect: { left: 40, top: 35, width: 10, height: 10 }, image: loadImage("itm-model-car"), description:
            "You remember playing with this car. It is brown, and somebody once told you that it represents a Leyland Princess. You have no reason to doubt that."
    },

    _stones: {
        rect: { left: 525, top: 190, width: 40, height: 40 }, image: loadImage("itm-stones"), description:
            "Your old stone collection. To be honest, you could probably go out to the square outside and pick these three rocks in just a few minutes. " + 
            "Come to think of it, that is probably exactly how they ended up in your possession."
    },

    _rockpick: {
        rect: { left: 575, top: 190, width: 40, height: 40 }, image: loadImage("itm-rock-pick"), description:
            "It looks rather like a hammer. If you were to describe it, that is probably the word you would use."
    },

    _desk: {
        rect: { left: 155, top: 45, width: 100, height: 25 }, description:
            "The mahogany desk is cluttered with papers, mostly bills and clippings from old magazines. Looking through the piles, you realise that you " + 
            "have never really cleaned out the desk after your father's death."
    },

    _gasBill: {
        rect: { left: 162, top: 51, width: 9, height: 10 }, description: "It seems that you owe the gas company pounds 19.32."
    },
    
    _deGaulleClipping: {
        rect: { left: 175, top: 49, width: 13, height: 8 }, description:
            "\"French president de Gaulle accuses the British government of lacking the necessary commitment to European integration\". " + 
            "In January of 1963. Well, well..."
    },

    _phoneBill: {
        rect: { left: 199, top: 48, width: 7, height: 7 }, description: "An old bill from the phone company, for pounds 26.53."
    },

    _bennyHillClipping: {
        rect: { left: 190, top: 55, width: 13, height: 8 }, description:
            "Who would have known that the \"Benny Hill Show\" was cancelled in 1989? You vividly remember your parents dislike of the show."
    },

    _newspaperBill: {
        rect: { left: 234, top: 53, width: 7, height: 7 }, description:
            "This unpaid bill of pounds 35 is most likely the reason why the morning paper hasn't appeared in a while"
    },

    _poundClipping: {
        rect: { left: 246, top: 53, width: 5, height: 8 }, description:
            "It seems like the pound hit a record high in December of 1957 and a record low in Febrary of 1985."
    },

    _drawer: {
        rect: { left: 229, top: 73, width: 16, height: 4 }, description: "The drawer is closed."
    },

    _openDrawer: {
        rect: { left: 229, top: 73, width: 16, height: 6 }, description: 
            "The drawer is, surprisingly enough, almost empty. The only thing you see is an old paper clip."
    },

    _paperClip: {
        rect: { left: 230, top: 74, width: 3, height: 3 }, image: loadImage("itm-paper-clip"), description: "It is a paper clip. Nothing more. Nothing less."
    },

    _safe:
    {
        rect: { left: 271, top: 24, width: 32, height: 46 }, description: 
            "The old safe is painted black. Its heavy steel door has golden details, and a sign saying \"Samuel Withers & Co. Ltd. West Bromwich\". " + 
            "It has a dial for entering the correct combination and a large handle for opening the door."
    },

    _openSafe:
    {
        rect: { left: 110, top: 80, width: 60, height: 60 }, description: "The old safe is painted black. Its heavy steel door is open."
    },

    _unknownBook:
    {
        rect: { left: 120, top: 90, width: 40, height: 40 }, image: loadImage("itm-unknown-book"), description:
            "The leather-bound old book is written in what you assume is latin. Although you may recognize a word here and there, you really have no way " + 
            "of telling what the book is about. You see a small map in one of the pages. You can't be sure but you have a slight feeling of recognition."
    },
    
    _houseHistoryBook: {
        rect: Constants.noRect, image: loadImage("itm-house-history-book"), description:
            "The leather-bound old book describes the history of the house in which the bookshop is located. Most of what is in the book you already know " + 
            "since your parents passed this information to you - whether as a child you wanted it or not - but you find a few nuggets of new information. " + 
            "The most interesting part is the fact that there used to be an entrance to a cellar from what is now the history section. Looking at the map, " + 
            "and reading the text surrounding it, you conclude that there must be a hidden entrance to the basement behind the eastern wall, currently covered " + 
            "by book shelves."
    },

    _id: (16 * (8 + 76 * 5) / 8) + 5 * 89 - 16 + 75 * 8 - 50 + 20 * 6 + 133 - 7 * 5 + 6,
}