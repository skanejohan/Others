var kitchen = {
    name: "kitchen",
    image: loadImage("kitchen"),

    initialize() {
        this.objects = [
            this._closedCupboard, 
            this._tap,
            this._waterCooker,
            this._sink,
            this._chair,
            this._broomCupboard,
            this._table,
            this._fridge
        ];
        this.exits = [
            { rect: { left: 300, top: 80, right: 425, bottom: 280 }, leadsTo: fictionSection },
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
                gameContext.message = "When you take the cup, a small key becomes visible.";
                gameContext.messageRemainingMs = 2000;
            }
            if (o == this._key) {
                addObject(o, gameContext.inventory);
                removeObject(o, this.objects);
            }
        }
    },

    _cup: {
        rect: { left: 500, top: 100, right: 540, bottom: 140 }, image: loadImage("cup"), description: [ 
            "The cup is white and has the text \"Hotel del Sol,", 
            "Tenerife\" written on it. As far as you can remember,",
            "you have never been to Tenerife." ]
    },

    _key: {
        rect: { left: 500, top: 100, right: 540, bottom: 140 }, image: loadImage("office-door-key"), description: [ 
            "This is the key to the office." ]
    },

    _closedCupboard:             {
        rect: { left: 480, top: 80, right: 580, bottom: 140 }, description: [ 
            "A plain white cupboard, typical for a kitchen that", 
            "has been decorated with economy in mind." ]
    },

    _openCupboard:             {
        rect: { left: 430, top: 80, right: 630, bottom: 140 }, image: loadImage("open-cupboard"), description: [ 
            "The cupboard is open. And almost empty." ]
    },

    _sink:             {
        rect: { left: 480, top: 200, right: 610, bottom: 290 }, description: [ 
            "The stainless steel sink has a strange coloration at", 
            "one end. You have a faint memory of pouring some kind", 
            "of paint into it at an early age." ]
    },

    _tap:             {
        rect: { left: 540, top: 160, right: 580, bottom: 200 }, description: [ 
            "The tap provides cold water only." ]
    },

    _waterCooker:             {
        rect: { left: 490, top: 160, right: 530, bottom: 200 }, description: [ 
            "A small water cooker, mysteriously stained." ]
    },

    _chair:             {
        rect: { left: 200, top: 320, right: 280, bottom: 400 }, description: [ 
            "The chair looks uncomfortable and, having used it on", 
            "many occasions, you know it is." ]
    },

    _table:             {
        rect: { left: 64, top: 330, right: 184, bottom: 450 }, description: [ 
            "This table's worn surface is covered by the doodles", 
            "that you placed there in your childhood, while spending", 
            "many long hours waiting for your parents to finish their", 
            "business." ]
    },

    _broomCupboard:             {
        rect: { left: 64, top: 130, right: 184, bottom: 290 }, description: [ 
            "A plain white door. Behind it, you know you will find a", 
            "lot of cleaning utensils. Nothing that feels remotely", 
            "interesting." ]
    },

    _fridge:             {
        rect: { left: 200, top: 200, right: 270, bottom: 290 }, description: [ 
            "The white fridge is humming slightly. Once in a while it",
            "makes a strange coughing noise. You take a peek inside.", 
            "It is empty, as expected." ]
    },
}