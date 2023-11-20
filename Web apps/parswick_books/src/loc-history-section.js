var historySection = {

    getName() {
        return  "\"History\" section";
    },

    initialize() {
        this.exits = [];
        this.objects = createObjectList();
        this.manager = createLocationManager(loadImage("loc-history-section"), this.objects, this.exits);

        this.objects.add(this._keyhole);
        this.objects.add({ rect: { left: 20, top: 13, width: 41, height: 67 }, description: this._shelfDescription });

        this.exits.push({ rect: { left: 80, top: 20, width: 20, height: 70 }, leadsTo: artAndArchitectureSection });
    },

    update() {
        this.manager.update();
        if (Globals.mouse.isClicked()) {
            var o = this.manager.hoveredObject();
            if (o == this._keyhole) {
                if (Globals.inventory.activeItem() == kitchen._key) {
                    this.objects.remove(o);
                    Globals.inventory.remove(kitchen._key);
                    gameContext.message = [ "You unlock the door to your office." ];
                    gameContext.messageRemainingMs = 2000;
                    this.exits.push({ rect: bottomExitRect, leadsTo: office });
                }
            }
        }
    },

    render() {
        this.manager.render();
    },

    _keyhole: {
        rect: bottomExitRect, image: loadImage("itm-keyhole"), description: "The door to your office is locked."
    },

    _shelfDescription:                     
        "This shelf is filled with books. World War II, Christopher Columbus and the French Revolution. Operation Desert Storm, ancient Greece and Titanic. " + 
        "Creative chaos in this shelf, as well as in the rest of the shop."
}