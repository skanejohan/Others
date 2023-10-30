var kitchen = {
    name: "kitchen",
    image: loadImage("kitchen"),

    initialize() {
        this.objects = [
            this._closedCupboard, 
            this._sink 
        ];
        this.exits = [
            { rect: { left: 343, top: 83, right: 365, bottom: 278 }, leadsTo: fictionSection },
            { rect: bottomExitRect, leadsTo: bathroom }
        ]
    },

    update(mouseClickedAt) {
        if (mouseClickedAt) {
            var o = getObjectAt(mouseClickedAt, this.objects);
            if (o == this._closedCupboard) {
                replaceObject(o, this._openCupboard, this.objects);
                addObject(this._cup, this.objects);
                gameContext.message = "You open the cupboard";
                gameContext.messageRemainingMs = 2000;
            }
            if (o == this._cup) {
                addObject(o, gameContext.inventory);
                replaceObject(o, this._key, this.objects);
                gameContext.message = "When you take the cup, a key appears.";
                gameContext.messageRemainingMs = 2000;
            }
            if (o == this._key) {
                addObject(o, gameContext.inventory);
                removeObject(o, this.objects);
            }
        }
    },

    _cup: {
        rect: { left: 390, top: 85, right: 420, bottom: 115 }, image: loadImage("cup"), description: [ 
            "The cup is white and has the text \"Hotel del Sol,", 
            "Tenerife\" written on it. As far as you can remember,",
            "you have never been to Tenerife." ]
    },

    _key:             {
        rect: { left: 390, top: 85, right: 420, bottom: 115 }, image: loadImage("office-door-key"), description: [ 
            "This is the key to the office." ]
    },

    _closedCupboard:             {
        rect: { left: 365, top: 80, right: 445, bottom: 210 }, image: loadImage("closed-cupboard"), description: [ 
            "It is a plain white cupboard, typical for a kitchen", 
            "that has been decorated with economy in mind." ]
    },

    _openCupboard:             {
        rect: { left: 345, top: 80, right: 445, bottom: 210 }, image: loadImage("open-cupboard"), description: [ 
            "It is a plain white cupboard, typical for a kitchen", 
            "that has been decorated with economy in mind. It is",
            "also open." ]
    },

    _sink:             {
        rect: { left: 345, top: 220, right: 445, bottom: 380 }, description: [ 
            "The stainless steel sink has a strange coloration at", 
            "one end. You have a faint memory of pouring some kind", 
            "of paint into it at an early age. The tap provides cold", 
            "water only. On the sink there is a small water cooker." ]
    },

    // "broomCupboard":  { x: 55, y: 55, w: 140, h: 40 },

    // "chair":  { x: 210, y: 180, w: 40, h: 40 },

    // "table":  { x: 100, y: 150, w: 100, h: 100 },

    // "fridge":  { x: 55, y: 318, w: 80, h: 80 },

    // "waterCooker": { x: 370, y: 230, w: 55, h: 55, layerIndex: 2 },

}