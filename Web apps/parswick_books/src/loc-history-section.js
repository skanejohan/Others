var historySection = {
    name: "\"History\" section",
    image: loadImage("history-section"),

    initialize() {
        this.objects = [
            this._keyhole,
            {
                rect: { left: 500, top: 80, width: 120, height: 210 }, description: [ 
                    "This shelf is filled with books. World War II,", 
                    "Christopher Columbus and the French Revolution.", 
                    "Operation Desert Storm, ancient Greece and Titanic.", 
                    "Creative chaos in this shelf, as well as in the", 
                    "rest of the shop." ]
            }            
        ];
        this.exits = [
            {
                rect: doorExitRect, leadsTo: artAndArchitectureSection
            },
        ]
    },

    update(mouseClickedAt) {
        if (mouseClickedAt) {
            var o = getObjectAt(mouseClickedAt, this.objects);
            if (o == this._keyhole) {
                if (gameContext.activeItem == kitchen._key) {
                    removeObject(o, this.objects);
                    Objects.remove(kitchen._key, inventory);
                    gameContext.message = [ "You unlock the door to your office." ];
                    gameContext.messageRemainingMs = 2000;
                    this.exits.push({ rect: bottomExitRect, leadsTo: office });
                }
            }
        }
    },

    _keyhole: {
        rect: { left: 300, top: 350, width: 160, height: 160 }, image: loadImage("keyhole"), description: [ 
            "The door to your office is locked." ]
    },
}